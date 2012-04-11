package org.paramecium.aop.cglib;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.paramecium.aop.asm.ClassVisitor;
import org.paramecium.aop.asm.Label;
import org.paramecium.aop.asm.Type;
@SuppressWarnings({"unused","unchecked","static-access"})
public class Enhancer extends AbstractClassGenerator {
	private static final CallbackFilter ALL_ZERO = new CallbackFilter() {
		public int accept(Method method) {
			return 0;
		}
	};

	private static final Source SOURCE = new Source(Enhancer.class.getName());
	private static final EnhancerKey KEY_FACTORY = (EnhancerKey) KeyFactory
			.create(EnhancerKey.class);

	private static final String BOUND_FIELD = "CGLIB$BOUND";
	private static final String THREAD_CALLBACKS_FIELD = "CGLIB$THREAD_CALLBACKS";
	private static final String STATIC_CALLBACKS_FIELD = "CGLIB$STATIC_CALLBACKS";
	private static final String SET_THREAD_CALLBACKS_NAME = "CGLIB$SET_THREAD_CALLBACKS";
	private static final String SET_STATIC_CALLBACKS_NAME = "CGLIB$SET_STATIC_CALLBACKS";
	private static final String CONSTRUCTED_FIELD = "CGLIB$CONSTRUCTED";

	private static final Type FACTORY = TypeUtils
			.parseType("org.paramecium.aop.cglib.Factory");
	private static final Type ILLEGAL_STATE_EXCEPTION = TypeUtils
			.parseType("IllegalStateException");
	private static final Type ILLEGAL_ARGUMENT_EXCEPTION = TypeUtils
			.parseType("IllegalArgumentException");
	private static final Type THREAD_LOCAL = TypeUtils.parseType("ThreadLocal");
	private static final Type CALLBACK = TypeUtils
			.parseType("org.paramecium.aop.cglib.Callback");
	private static final Type CALLBACK_ARRAY = Type.getType(Callback[].class);
	private static final Signature CSTRUCT_NULL = TypeUtils
			.parseConstructor("");
	private static final Signature SET_THREAD_CALLBACKS = new Signature(
			SET_THREAD_CALLBACKS_NAME, Type.VOID_TYPE,
			new Type[] { CALLBACK_ARRAY });
	private static final Signature SET_STATIC_CALLBACKS = new Signature(
			SET_STATIC_CALLBACKS_NAME, Type.VOID_TYPE,
			new Type[] { CALLBACK_ARRAY });
	private static final Signature NEW_INSTANCE = new Signature("newInstance",
			Constants.TYPE_OBJECT, new Type[] { CALLBACK_ARRAY });
	private static final Signature MULTIARG_NEW_INSTANCE = new Signature(
			"newInstance", Constants.TYPE_OBJECT, new Type[] {
					Constants.TYPE_CLASS_ARRAY, Constants.TYPE_OBJECT_ARRAY,
					CALLBACK_ARRAY, });
	private static final Signature SINGLE_NEW_INSTANCE = new Signature(
			"newInstance", Constants.TYPE_OBJECT, new Type[] { CALLBACK });
	private static final Signature SET_CALLBACK = new Signature("setCallback",
			Type.VOID_TYPE, new Type[] { Type.INT_TYPE, CALLBACK });
	private static final Signature GET_CALLBACK = new Signature("getCallback",
			CALLBACK, new Type[] { Type.INT_TYPE });
	private static final Signature SET_CALLBACKS = new Signature(
			"setCallbacks", Type.VOID_TYPE, new Type[] { CALLBACK_ARRAY });
	private static final Signature GET_CALLBACKS = new Signature(
			"getCallbacks", CALLBACK_ARRAY, new Type[0]);
	private static final Signature THREAD_LOCAL_GET = TypeUtils
			.parseSignature("Object get()");
	private static final Signature THREAD_LOCAL_SET = TypeUtils
			.parseSignature("void set(Object)");
	private static final Signature BIND_CALLBACKS = TypeUtils
			.parseSignature("void CGLIB$BIND_CALLBACKS(Object)");

	/** Internal interface, only public due to ClassLoader issues. */
	public interface EnhancerKey {
		public Object newInstance(String type, String[] interfaces,
				CallbackFilter filter, Type[] callbackTypes,
				boolean useFactory, boolean interceptDuringConstruction,
				Long serialVersionUID);
	}

	private Class[] interfaces;
	private CallbackFilter filter;
	private Callback[] callbacks;
	private Type[] callbackTypes;
	private boolean classOnly;
	private Class superclass;
	private Class[] argumentTypes;
	private Object[] arguments;
	private boolean useFactory = true;
	private Long serialVersionUID;
	private boolean interceptDuringConstruction = true;

	public Enhancer() {
		super(SOURCE);
	}

	public void setSuperclass(Class superclass) {
		if (superclass != null && superclass.isInterface()) {
			setInterfaces(new Class[] { superclass });
		} else if (superclass != null && superclass.equals(Object.class)) {
			// affects choice of ClassLoader
			this.superclass = null;
		} else {
			this.superclass = superclass;
		}
	}

	public void setInterfaces(Class[] interfaces) {
		this.interfaces = interfaces;
	}

	public void setCallbackFilter(CallbackFilter filter) {
		this.filter = filter;
	}

	public void setCallback(final Callback callback) {
		setCallbacks(new Callback[] { callback });
	}

	public void setCallbacks(Callback[] callbacks) {
		if (callbacks != null && callbacks.length == 0) {
			throw new IllegalArgumentException("Array cannot be empty");
		}
		this.callbacks = callbacks;
	}

	public void setUseFactory(boolean useFactory) {
		this.useFactory = useFactory;
	}

	public void setInterceptDuringConstruction(
			boolean interceptDuringConstruction) {
		this.interceptDuringConstruction = interceptDuringConstruction;
	}

	public void setCallbackType(Class callbackType) {
		setCallbackTypes(new Class[] { callbackType });
	}

	public void setCallbackTypes(Class[] callbackTypes) {
		if (callbackTypes != null && callbackTypes.length == 0) {
			throw new IllegalArgumentException("Array cannot be empty");
		}
		this.callbackTypes = CallbackInfo.determineTypes(callbackTypes);
	}

	public Object create() {
		classOnly = false;
		argumentTypes = null;
		return createHelper();
	}

	public Object create(Class[] argumentTypes, Object[] arguments) {
		classOnly = false;
		if (argumentTypes == null || arguments == null
				|| argumentTypes.length != arguments.length) {
			throw new IllegalArgumentException(
					"Arguments must be non-null and of equal length");
		}
		this.argumentTypes = argumentTypes;
		this.arguments = arguments;
		return createHelper();
	}

	public Class createClass() {
		classOnly = true;
		return (Class) createHelper();
	}

	public void setSerialVersionUID(Long sUID) {
		serialVersionUID = sUID;
	}

	private void validate() {
		if (classOnly ^ (callbacks == null)) {
			if (classOnly) {
				throw new IllegalStateException(
						"createClass does not accept callbacks");
			} else {
				throw new IllegalStateException("Callbacks are required");
			}
		}
		if (classOnly && (callbackTypes == null)) {
			throw new IllegalStateException("Callback types are required");
		}
		if (callbacks != null && callbackTypes != null) {
			if (callbacks.length != callbackTypes.length) {
				throw new IllegalStateException(
						"Lengths of callback and callback types array must be the same");
			}
			Type[] check = CallbackInfo.determineTypes(callbacks);
			for (int i = 0; i < check.length; i++) {
				if (!check[i].equals(callbackTypes[i])) {
					throw new IllegalStateException("Callback " + check[i]
							+ " is not assignable to " + callbackTypes[i]);
				}
			}
		} else if (callbacks != null) {
			callbackTypes = CallbackInfo.determineTypes(callbacks);
		}
		if (filter == null) {
			if (callbackTypes.length > 1) {
				throw new IllegalStateException(
						"Multiple callback types possible but no filter specified");
			}
			filter = ALL_ZERO;
		}
		if (interfaces != null) {
			for (int i = 0; i < interfaces.length; i++) {
				if (interfaces[i] == null) {
					throw new IllegalStateException("Interfaces cannot be null");
				}
				if (!interfaces[i].isInterface()) {
					throw new IllegalStateException(interfaces[i]
							+ " is not an interface");
				}
			}
		}
	}

	private Object createHelper() {
		validate();
		if (superclass != null) {
			setNamePrefix(superclass.getName());
		} else if (interfaces != null) {
			setNamePrefix(interfaces[ReflectUtils
					.findPackageProtected(interfaces)].getName());
		}
		return super.create(KEY_FACTORY.newInstance(
				(superclass != null) ? superclass.getName() : null,
				ReflectUtils.getNames(interfaces), filter, callbackTypes,
				useFactory, interceptDuringConstruction, serialVersionUID));
	}

	protected ClassLoader getDefaultClassLoader() {
		if (superclass != null) {
			return superclass.getClassLoader();
		} else if (interfaces != null) {
			return interfaces[0].getClassLoader();
		} else {
			return null;
		}
	}

	private Signature rename(Signature sig, int index) {
		return new Signature("CGLIB$" + sig.getName() + "$" + index, sig
				.getDescriptor());
	}

	public static void getMethods(Class superclass, Class[] interfaces,
			List methods) {
		getMethods(superclass, interfaces, methods, null, null);
	}

	private static void getMethods(Class superclass, Class[] interfaces,
			List methods, List interfaceMethods, Set forcePublic) {
		ReflectUtils.addAllMethods(superclass, methods);
		List target = (interfaceMethods != null) ? interfaceMethods : methods;
		if (interfaces != null) {
			for (int i = 0; i < interfaces.length; i++) {
				if (interfaces[i] != Factory.class) {
					ReflectUtils.addAllMethods(interfaces[i], target);
				}
			}
		}
		if (interfaceMethods != null) {
			if (forcePublic != null) {
				forcePublic.addAll(MethodWrapper.createSet(interfaceMethods));
			}
			methods.addAll(interfaceMethods);
		}
		CollectionUtils.filter(methods, new RejectModifierPredicate(
				Constants.ACC_STATIC));
		CollectionUtils.filter(methods, new VisibilityPredicate(superclass,
				true));
		CollectionUtils.filter(methods, new DuplicatesPredicate());
		CollectionUtils.filter(methods, new RejectModifierPredicate(
				Constants.ACC_FINAL));
	}

	public void generateClass(ClassVisitor v) throws Exception {
		Class sc = (superclass == null) ? Object.class : superclass;

		if (TypeUtils.isFinal(sc.getModifiers()))
			throw new IllegalArgumentException("Cannot subclass final class "
					+ sc);
		List constructors = new ArrayList(Arrays.asList(sc
				.getDeclaredConstructors()));
		filterConstructors(sc, constructors);

		// Order is very important: must add superclass, then
		// its superclass chain, then each interface and
		// its superinterfaces.
		List actualMethods = new ArrayList();
		List interfaceMethods = new ArrayList();
		final Set forcePublic = new HashSet();
		getMethods(sc, interfaces, actualMethods, interfaceMethods, forcePublic);

		List methods = CollectionUtils.transform(actualMethods,
				new Transformer() {
					public Object transform(Object value) {
						Method method = (Method) value;
						int modifiers = Constants.ACC_FINAL
								| (method.getModifiers()
										& ~Constants.ACC_ABSTRACT
										& ~Constants.ACC_NATIVE & ~Constants.ACC_SYNCHRONIZED);
						if (forcePublic.contains(MethodWrapper.create(method))) {
							modifiers = (modifiers & ~Constants.ACC_PROTECTED)
									| Constants.ACC_PUBLIC;
						}
						return ReflectUtils.getMethodInfo(method, modifiers);
					}
				});

		ClassEmitter e = new ClassEmitter(v);
		e.begin_class(Constants.V1_2, Constants.ACC_PUBLIC, getClassName(),
				Type.getType(sc), (useFactory ? TypeUtils.add(TypeUtils
						.getTypes(interfaces), FACTORY) : TypeUtils
						.getTypes(interfaces)), Constants.SOURCE_FILE);
		List constructorInfo = CollectionUtils.transform(constructors,
				MethodInfoTransformer.getInstance());

		e.declare_field(Constants.ACC_PRIVATE, BOUND_FIELD, Type.BOOLEAN_TYPE,
				null);
		if (!interceptDuringConstruction) {
			e.declare_field(Constants.ACC_PRIVATE, CONSTRUCTED_FIELD,
					Type.BOOLEAN_TYPE, null);
		}
		e.declare_field(Constants.PRIVATE_FINAL_STATIC, THREAD_CALLBACKS_FIELD,
				THREAD_LOCAL, null);
		e.declare_field(Constants.PRIVATE_FINAL_STATIC, STATIC_CALLBACKS_FIELD,
				CALLBACK_ARRAY, null);
		if (serialVersionUID != null) {
			e
					.declare_field(Constants.PRIVATE_FINAL_STATIC,
							Constants.SUID_FIELD_NAME, Type.LONG_TYPE,
							serialVersionUID);
		}

		for (int i = 0; i < callbackTypes.length; i++) {
			e.declare_field(Constants.ACC_PRIVATE, getCallbackField(i),
					callbackTypes[i], null);
		}

		emitMethods(e, methods, actualMethods);
		emitConstructors(e, constructorInfo);
		emitSetThreadCallbacks(e);
		emitSetStaticCallbacks(e);
		emitBindCallbacks(e);

		if (useFactory) {
			int[] keys = getCallbackKeys();
			emitNewInstanceCallbacks(e);
			emitNewInstanceCallback(e);
			emitNewInstanceMultiarg(e, constructorInfo);
			emitGetCallback(e, keys);
			emitSetCallback(e, keys);
			emitGetCallbacks(e);
			emitSetCallbacks(e);
		}

		e.end_class();
	}

	protected void filterConstructors(Class sc, List constructors) {
		CollectionUtils.filter(constructors, new VisibilityPredicate(sc, true));
		if (constructors.size() == 0)
			throw new IllegalArgumentException("No visible constructors in "
					+ sc);
	}

	protected Object firstInstance(Class type) throws Exception {
		if (classOnly) {
			return type;
		} else {
			return createUsingReflection(type);
		}
	}

	protected Object nextInstance(Object instance) {
		Class protoclass = (instance instanceof Class) ? (Class) instance
				: instance.getClass();
		if (classOnly) {
			return protoclass;
		} else if (instance instanceof Factory) {
			if (argumentTypes != null) {
				return ((Factory) instance).newInstance(argumentTypes,
						arguments, callbacks);
			} else {
				return ((Factory) instance).newInstance(callbacks);
			}
		} else {
			return createUsingReflection(protoclass);
		}
	}

	public static void registerCallbacks(Class generatedClass,
			Callback[] callbacks) {
		setThreadCallbacks(generatedClass, callbacks);
	}

	public static void registerStaticCallbacks(Class generatedClass,
			Callback[] callbacks) {
		setCallbacksHelper(generatedClass, callbacks, SET_STATIC_CALLBACKS_NAME);
	}

	public static boolean isEnhanced(Class type) {
		try {
			getCallbacksSetter(type, SET_THREAD_CALLBACKS_NAME);
			return true;
		} catch (NoSuchMethodException e) {
			return false;
		}
	}

	private static void setThreadCallbacks(Class type, Callback[] callbacks) {
		setCallbacksHelper(type, callbacks, SET_THREAD_CALLBACKS_NAME);
	}

	private static void setCallbacksHelper(Class type, Callback[] callbacks,
			String methodName) {
		try {
			Method setter = getCallbacksSetter(type, methodName);
			setter.invoke(null, new Object[] { callbacks });
		} catch (Exception x) {
			x.printStackTrace();
		}
	}

	private static Method getCallbacksSetter(Class type, String methodName)
			throws NoSuchMethodException {
		return type.getDeclaredMethod(methodName,
				new Class[] { Callback[].class });
	}

	private Object createUsingReflection(Class type) {
		setThreadCallbacks(type, callbacks);
		try {

			if (argumentTypes != null) {

				return ReflectUtils.newInstance(type, argumentTypes, arguments);

			} else {

				return ReflectUtils.newInstance(type);

			}
		} finally {
			// clear thread callbacks to allow them to be gc'd
			setThreadCallbacks(type, null);
		}
	}

	public static Object create(Class type, Callback callback) {
		Enhancer e = new Enhancer();
		e.setSuperclass(type);
		e.setCallback(callback);
		return e.create();
	}

	public static Object create(Class superclass, Class interfaces[],
			Callback callback) {
		Enhancer e = new Enhancer();
		e.setSuperclass(superclass);
		e.setInterfaces(interfaces);
		e.setCallback(callback);
		return e.create();
	}

	public static Object create(Class superclass, Class[] interfaces,
			CallbackFilter filter, Callback[] callbacks) {
		Enhancer e = new Enhancer();
		e.setSuperclass(superclass);
		e.setInterfaces(interfaces);
		e.setCallbackFilter(filter);
		e.setCallbacks(callbacks);
		return e.create();
	}

	private void emitConstructors(ClassEmitter ce, List constructors) {
		boolean seenNull = false;
		for (Iterator it = constructors.iterator(); it.hasNext();) {
			MethodInfo constructor = (MethodInfo) it.next();
			CodeEmitter e = EmitUtils.begin_method(ce, constructor,
					Constants.ACC_PUBLIC);
			e.load_this();
			e.dup();
			e.load_args();
			Signature sig = constructor.getSignature();
			seenNull = seenNull || sig.getDescriptor().equals("()V");
			e.super_invoke_constructor(sig);
			e.invoke_static_this(BIND_CALLBACKS);
			if (!interceptDuringConstruction) {
				e.load_this();
				e.push(1);
				e.putfield(CONSTRUCTED_FIELD);
			}
			e.return_value();
			e.end_method();
		}
		if (!classOnly && !seenNull && arguments == null)
			throw new IllegalArgumentException(
					"Superclass has no null constructors but no arguments were given");
	}

	private int[] getCallbackKeys() {
		int[] keys = new int[callbackTypes.length];
		for (int i = 0; i < callbackTypes.length; i++) {
			keys[i] = i;
		}
		return keys;
	}

	private void emitGetCallback(ClassEmitter ce, int[] keys) {
		final CodeEmitter e = ce.begin_method(Constants.ACC_PUBLIC,
				GET_CALLBACK, null);
		e.load_this();
		e.invoke_static_this(BIND_CALLBACKS);
		e.load_this();
		e.load_arg(0);
		e.process_switch(keys, new ProcessSwitchCallback() {
			public void processCase(int key, Label end) {
				e.getfield(getCallbackField(key));
				e.goTo(end);
			}

			public void processDefault() {
				e.pop(); // stack height
				e.aconst_null();
			}
		});
		e.return_value();
		e.end_method();
	}

	private void emitSetCallback(ClassEmitter ce, int[] keys) {
		final CodeEmitter e = ce.begin_method(Constants.ACC_PUBLIC,
				SET_CALLBACK, null);
		e.load_arg(0);
		e.process_switch(keys, new ProcessSwitchCallback() {
			public void processCase(int key, Label end) {
				e.load_this();
				e.load_arg(1);
				e.checkcast(callbackTypes[key]);
				e.putfield(getCallbackField(key));
				e.goTo(end);
			}

			public void processDefault() {
			}
		});
		e.return_value();
		e.end_method();
	}

	private void emitSetCallbacks(ClassEmitter ce) {
		CodeEmitter e = ce.begin_method(Constants.ACC_PUBLIC, SET_CALLBACKS,
				null);
		e.load_this();
		e.load_arg(0);
		for (int i = 0; i < callbackTypes.length; i++) {
			e.dup2();
			e.aaload(i);
			e.checkcast(callbackTypes[i]);
			e.putfield(getCallbackField(i));
		}
		e.return_value();
		e.end_method();
	}

	private void emitGetCallbacks(ClassEmitter ce) {
		CodeEmitter e = ce.begin_method(Constants.ACC_PUBLIC, GET_CALLBACKS,
				null);
		e.load_this();
		e.invoke_static_this(BIND_CALLBACKS);
		e.load_this();
		e.push(callbackTypes.length);
		e.newarray(CALLBACK);
		for (int i = 0; i < callbackTypes.length; i++) {
			e.dup();
			e.push(i);
			e.load_this();
			e.getfield(getCallbackField(i));
			e.aastore();
		}
		e.return_value();
		e.end_method();
	}

	private void emitNewInstanceCallbacks(ClassEmitter ce) {
		CodeEmitter e = ce.begin_method(Constants.ACC_PUBLIC, NEW_INSTANCE,
				null);
		e.load_arg(0);
		e.invoke_static_this(SET_THREAD_CALLBACKS);
		emitCommonNewInstance(e);
	}

	private void emitCommonNewInstance(CodeEmitter e) {
		e.new_instance_this();
		e.dup();
		e.invoke_constructor_this();
		e.aconst_null();
		e.invoke_static_this(SET_THREAD_CALLBACKS);
		e.return_value();
		e.end_method();
	}

	private void emitNewInstanceCallback(ClassEmitter ce) {
		CodeEmitter e = ce.begin_method(Constants.ACC_PUBLIC,
				SINGLE_NEW_INSTANCE, null);
		switch (callbackTypes.length) {
		case 0:
			break;
		case 1:
			e.push(1);
			e.newarray(CALLBACK);
			e.dup();
			e.push(0);
			e.load_arg(0);
			e.aastore();
			e.invoke_static_this(SET_THREAD_CALLBACKS);
			break;
		default:
			e.throw_exception(ILLEGAL_STATE_EXCEPTION,
					"More than one callback object required");
		}
		emitCommonNewInstance(e);
	}

	private void emitNewInstanceMultiarg(ClassEmitter ce, List constructors) {
		final CodeEmitter e = ce.begin_method(Constants.ACC_PUBLIC,
				MULTIARG_NEW_INSTANCE, null);
		e.load_arg(2);
		e.invoke_static_this(SET_THREAD_CALLBACKS);
		e.new_instance_this();
		e.dup();
		e.load_arg(0);
		EmitUtils.constructor_switch(e, constructors,
				new ObjectSwitchCallback() {
					public void processCase(Object key, Label end) {
						MethodInfo constructor = (MethodInfo) key;
						Type types[] = constructor.getSignature()
								.getArgumentTypes();
						for (int i = 0; i < types.length; i++) {
							e.load_arg(1);
							e.push(i);
							e.aaload();
							e.unbox(types[i]);
						}
						e.invoke_constructor_this(constructor.getSignature());
						e.goTo(end);
					}

					public void processDefault() {
						e.throw_exception(ILLEGAL_ARGUMENT_EXCEPTION,
								"Constructor not found");
					}
				});
		e.aconst_null();
		e.invoke_static_this(SET_THREAD_CALLBACKS);
		e.return_value();
		e.end_method();
	}

	private void emitMethods(final ClassEmitter ce, List methods,
			List actualMethods) {
		CallbackGenerator[] generators = CallbackInfo
				.getGenerators(callbackTypes);

		Map groups = new HashMap();
		final Map indexes = new HashMap();
		final Map originalModifiers = new HashMap();
		final Map positions = CollectionUtils.getIndexMap(methods);

		Iterator it1 = methods.iterator();
		Iterator it2 = (actualMethods != null) ? actualMethods.iterator()
				: null;

		while (it1.hasNext()) {
			MethodInfo method = (MethodInfo) it1.next();
			Method actualMethod = (it2 != null) ? (Method) it2.next() : null;
			int index = filter.accept(actualMethod);
			if (index >= callbackTypes.length) {
				throw new IllegalArgumentException(
						"Callback filter returned an index that is too large: "
								+ index);
			}
			originalModifiers.put(method, new Integer(
					(actualMethod != null) ? actualMethod.getModifiers()
							: method.getModifiers()));
			indexes.put(method, new Integer(index));
			List group = (List) groups.get(generators[index]);
			if (group == null) {
				groups.put(generators[index], group = new ArrayList(methods
						.size()));
			}
			group.add(method);
		}

		Set seenGen = new HashSet();
		CodeEmitter se = ce.getStaticHook();
		se.new_instance(THREAD_LOCAL);
		se.dup();
		se.invoke_constructor(THREAD_LOCAL, CSTRUCT_NULL);
		se.putfield(THREAD_CALLBACKS_FIELD);

		final Object[] state = new Object[1];
		CallbackGenerator.Context context = new CallbackGenerator.Context() {
			public ClassLoader getClassLoader() {
				return Enhancer.this.getClassLoader();
			}

			public int getOriginalModifiers(MethodInfo method) {
				return ((Integer) originalModifiers.get(method)).intValue();
			}

			public int getIndex(MethodInfo method) {
				return ((Integer) indexes.get(method)).intValue();
			}

			public void emitCallback(CodeEmitter e, int index) {
				emitCurrentCallback(e, index);
			}

			public Signature getImplSignature(MethodInfo method) {
				return rename(method.getSignature(), ((Integer) positions
						.get(method)).intValue());
			}

			public CodeEmitter beginMethod(ClassEmitter ce, MethodInfo method) {
				CodeEmitter e = EmitUtils.begin_method(ce, method);
				if (!interceptDuringConstruction
						&& !TypeUtils.isAbstract(method.getModifiers())) {
					Label constructed = e.make_label();
					e.load_this();
					e.getfield(CONSTRUCTED_FIELD);
					e.if_jump(e.NE, constructed);
					e.load_this();
					e.load_args();
					e.super_invoke();
					e.return_value();
					e.mark(constructed);
				}
				return e;
			}
		};
		for (int i = 0; i < callbackTypes.length; i++) {
			CallbackGenerator gen = generators[i];
			if (!seenGen.contains(gen)) {
				seenGen.add(gen);
				final List fmethods = (List) groups.get(gen);
				if (fmethods != null) {
					try {
						gen.generate(ce, context, fmethods);
						gen.generateStatic(se, context, fmethods);
					} catch (Exception x) {
						x.printStackTrace();
					}
				}
			}
		}
		se.return_value();
		se.end_method();
	}

	private void emitSetThreadCallbacks(ClassEmitter ce) {
		CodeEmitter e = ce.begin_method(Constants.ACC_PUBLIC
				| Constants.ACC_STATIC, SET_THREAD_CALLBACKS, null);
		e.getfield(THREAD_CALLBACKS_FIELD);
		e.load_arg(0);
		e.invoke_virtual(THREAD_LOCAL, THREAD_LOCAL_SET);
		e.return_value();
		e.end_method();
	}

	private void emitSetStaticCallbacks(ClassEmitter ce) {
		CodeEmitter e = ce.begin_method(Constants.ACC_PUBLIC
				| Constants.ACC_STATIC, SET_STATIC_CALLBACKS, null);
		e.load_arg(0);
		e.putfield(STATIC_CALLBACKS_FIELD);
		e.return_value();
		e.end_method();
	}

	private void emitCurrentCallback(CodeEmitter e, int index) {
		e.load_this();
		e.getfield(getCallbackField(index));
		e.dup();
		Label end = e.make_label();
		e.ifnonnull(end);
		e.pop(); // stack height
		e.load_this();
		e.invoke_static_this(BIND_CALLBACKS);
		e.load_this();
		e.getfield(getCallbackField(index));
		e.mark(end);
	}

	private void emitBindCallbacks(ClassEmitter ce) {
		CodeEmitter e = ce.begin_method(Constants.PRIVATE_FINAL_STATIC,
				BIND_CALLBACKS, null);
		Local me = e.make_local();
		e.load_arg(0);
		e.checkcast_this();
		e.store_local(me);

		Label end = e.make_label();
		e.load_local(me);
		e.getfield(BOUND_FIELD);
		e.if_jump(e.NE, end);
		e.load_local(me);
		e.push(1);
		e.putfield(BOUND_FIELD);

		e.getfield(THREAD_CALLBACKS_FIELD);
		e.invoke_virtual(THREAD_LOCAL, THREAD_LOCAL_GET);
		e.dup();
		Label found_callback = e.make_label();
		e.ifnonnull(found_callback);
		e.pop();

		e.getfield(STATIC_CALLBACKS_FIELD);
		e.dup();
		e.ifnonnull(found_callback);
		e.pop();
		e.goTo(end);

		e.mark(found_callback);
		e.checkcast(CALLBACK_ARRAY);
		e.load_local(me);
		e.swap();
		for (int i = callbackTypes.length - 1; i >= 0; i--) {
			if (i != 0) {
				e.dup2();
			}
			e.aaload(i);
			e.checkcast(callbackTypes[i]);
			e.putfield(getCallbackField(i));
		}

		e.mark(end);
		e.return_value();
		e.end_method();
	}

	private static String getCallbackField(int index) {
		return "CGLIB$CALLBACK_" + index;
	}
}