(function() {
	var bT, a0 = bT = a0 || {
		version : "1.3.4"
	};
	a0.guid = "$BAIDU$";
	window[a0.guid] = window[a0.guid] || {};
	a0.object = a0.object || {};
	a0.extend = a0.object.extend = function(cC, T) {
		for ( var cB in T) {
			if (T.hasOwnProperty(cB)) {
				cC[cB] = T[cB]
			}
		}
		return cC
	};
	a0.dom = a0.dom || {};
	a0.dom.g = function(T) {
		if ("string" == typeof T || T instanceof String) {
			return document.getElementById(T)
		} else {
			if (T && T.nodeName && (T.nodeType == 1 || T.nodeType == 9)) {
				return T
			}
		}
		return null
	};
	a0.g = a0.G = a0.dom.g;
	a0.dom.hide = function(T) {
		T = a0.dom.g(T);
		T.style.display = "none";
		return T
	};
	a0.hide = a0.dom.hide;
	a0.lang = a0.lang || {};
	a0.lang.isString = function(T) {
		return "[object String]" == Object.prototype.toString.call(T)
	};
	a0.isString = a0.lang.isString;
	a0.dom._g = function(T) {
		if (a0.lang.isString(T)) {
			return document.getElementById(T)
		}
		return T
	};
	a0._g = a0.dom._g;
	a0.dom.contains = function(T, cB) {
		var cC = a0.dom._g;
		T = cC(T);
		cB = cC(cB);
		return T.contains ? T != cB && T.contains(cB) : !!(T
				.compareDocumentPosition(cB) & 16)
	};
	a0.browser = a0.browser || {};
	if (/msie (\d+\.\d)/i.test(navigator.userAgent)) {
		a0.browser.ie = a0.ie = document.documentMode || +RegExp["\x241"]
	}
	a0.dom._NAME_ATTRS = (function() {
		var T = {
			cellpadding : "cellPadding",
			cellspacing : "cellSpacing",
			colspan : "colSpan",
			rowspan : "rowSpan",
			valign : "vAlign",
			usemap : "useMap",
			frameborder : "frameBorder"
		};
		if (a0.browser.ie < 8) {
			T["for"] = "htmlFor";
			T["class"] = "className"
		} else {
			T.htmlFor = "for";
			T.className = "class"
		}
		return T
	})();
	a0.dom.setAttr = function(cB, T, cC) {
		cB = a0.dom.g(cB);
		if ("style" == T) {
			cB.style.cssText = cC
		} else {
			T = a0.dom._NAME_ATTRS[T] || T;
			cB.setAttribute(T, cC)
		}
		return cB
	};
	a0.setAttr = a0.dom.setAttr;
	a0.dom.setAttrs = function(cC, T) {
		cC = a0.dom.g(cC);
		for ( var cB in T) {
			a0.dom.setAttr(cC, cB, T[cB])
		}
		return cC
	};
	a0.setAttrs = a0.dom.setAttrs;
	a0.string = a0.string || {};
	(function() {
		var T = new RegExp(
				"(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g");
		a0.string.trim = function(cB) {
			return String(cB).replace(T, "")
		}
	})();
	a0.trim = a0.string.trim;
	a0.string.format = function(cC, T) {
		cC = String(cC);
		var cB = Array.prototype.slice.call(arguments, 1), cD = Object.prototype.toString;
		if (cB.length) {
			cB = cB.length == 1 ? (T !== null
					&& (/\[object Array\]|\[object Object\]/.test(cD.call(T))) ? T
					: cB)
					: cB;
			return cC.replace(/#\{(.+?)\}/g, function(cE, cG) {
				var cF = cB[cG];
				if ("[object Function]" == cD.call(cF)) {
					cF = cF(cG)
				}
				return ("undefined" == typeof cF ? "" : cF)
			})
		}
		return cC
	};
	a0.format = a0.string.format;
	a0.dom.removeClass = function(cF, cG) {
		cF = a0.dom.g(cF);
		var cD = cF.className.split(/\s+/), cH = cG.split(/\s+/), cB, T = cH.length, cC, cE = 0;
		for (; cE < T; ++cE) {
			for (cC = 0, cB = cD.length; cC < cB; ++cC) {
				if (cD[cC] == cH[cE]) {
					cD.splice(cC, 1);
					break
				}
			}
		}
		cF.className = cD.join(" ");
		return cF
	};
	a0.removeClass = a0.dom.removeClass;
	a0.dom.insertHTML = function(cD, T, cC) {
		cD = a0.dom.g(cD);
		var cB, cE;
		if (cD.insertAdjacentHTML) {
			cD.insertAdjacentHTML(T, cC)
		} else {
			cB = cD.ownerDocument.createRange();
			T = T.toUpperCase();
			if (T == "AFTERBEGIN" || T == "BEFOREEND") {
				cB.selectNodeContents(cD);
				cB.collapse(T == "AFTERBEGIN")
			} else {
				cE = T == "BEFOREBEGIN";
				cB[cE ? "setStartBefore" : "setEndAfter"](cD);
				cB.collapse(cE)
			}
			cB.insertNode(cB.createContextualFragment(cC))
		}
		return cD
	};
	a0.insertHTML = a0.dom.insertHTML;
	a0.dom.show = function(T) {
		T = a0.dom.g(T);
		T.style.display = "";
		return T
	};
	a0.show = a0.dom.show;
	a0.dom.getDocument = function(T) {
		T = a0.dom.g(T);
		return T.nodeType == 9 ? T : T.ownerDocument || T.document
	};
	a0.dom.addClass = function(cF, cG) {
		cF = a0.dom.g(cF);
		var cB = cG.split(/\s+/), T = cF.className, cE = " " + T + " ", cD = 0, cC = cB.length;
		for (; cD < cC; cD++) {
			if (cE.indexOf(" " + cB[cD] + " ") < 0) {
				T += " " + cB[cD]
			}
		}
		cF.className = T;
		return cF
	};
	a0.addClass = a0.dom.addClass;
	a0.dom._styleFixer = a0.dom._styleFixer || {};
	a0.dom._styleFilter = a0.dom._styleFilter || [];
	a0.dom._styleFilter.filter = function(cB, cE, cF) {
		for ( var T = 0, cD = a0.dom._styleFilter, cC; cC = cD[T]; T++) {
			if (cC = cC[cF]) {
				cE = cC(cB, cE)
			}
		}
		return cE
	};
	a0.string.toCamelCase = function(T) {
		if (T.indexOf("-") < 0 && T.indexOf("_") < 0) {
			return T
		}
		return T.replace(/[-_][^-_]/g, function(cB) {
			return cB.charAt(1).toUpperCase()
		})
	};
	a0.dom.getStyle = function(cC, cB) {
		var cF = a0.dom;
		cC = cF.g(cC);
		cB = a0.string.toCamelCase(cB);
		var cE = cC.style[cB];
		if (!cE) {
			var T = cF._styleFixer[cB], cD = cC.currentStyle
					|| (a0.browser.ie ? cC.style : getComputedStyle(cC, null));
			cE = T && T.get ? T.get(cC, cD) : cD[T || cB]
		}
		if (T = cF._styleFilter) {
			cE = T.filter(cB, cE, "get")
		}
		return cE
	};
	a0.getStyle = a0.dom.getStyle;
	if (/opera\/(\d+\.\d)/i.test(navigator.userAgent)) {
		a0.browser.opera = +RegExp["\x241"]
	}
	a0.browser.isWebkit = /webkit/i.test(navigator.userAgent);
	a0.browser.isGecko = /gecko/i.test(navigator.userAgent)
			&& !/like gecko/i.test(navigator.userAgent);
	a0.browser.isStrict = document.compatMode == "CSS1Compat";
	a0.dom.getPosition = function(T) {
		T = a0.dom.g(T);
		var cJ = a0.dom.getDocument(T), cD = a0.browser, cG = a0.dom.getStyle, cC = cD.isGecko > 0
				&& cJ.getBoxObjectFor
				&& cG(T, "position") == "absolute"
				&& (T.style.top === "" || T.style.left === ""), cH = {
			left : 0,
			top : 0
		}, cF = (cD.ie && !cD.isStrict) ? cJ.body : cJ.documentElement, cK, cB;
		if (T == cF) {
			return cH
		}
		if (T.getBoundingClientRect) {
			cB = T.getBoundingClientRect();
			cH.left = Math.floor(cB.left)
					+ Math.max(cJ.documentElement.scrollLeft,
							cJ.body.scrollLeft);
			cH.top = Math.floor(cB.top)
					+ Math.max(cJ.documentElement.scrollTop, cJ.body.scrollTop);
			cH.left -= cJ.documentElement.clientLeft;
			cH.top -= cJ.documentElement.clientTop;
			var cI = cJ.body, cL = parseInt(cG(cI, "borderLeftWidth")), cE = parseInt(cG(
					cI, "borderTopWidth"));
			if (cD.ie && !cD.isStrict) {
				cH.left -= isNaN(cL) ? 2 : cL;
				cH.top -= isNaN(cE) ? 2 : cE
			}
		} else {
			cK = T;
			do {
				cH.left += cK.offsetLeft;
				cH.top += cK.offsetTop;
				if (cD.isWebkit > 0 && cG(cK, "position") == "fixed") {
					cH.left += cJ.body.scrollLeft;
					cH.top += cJ.body.scrollTop;
					break
				}
				cK = cK.offsetParent
			} while (cK && cK != T);
			if (cD.opera > 0
					|| (cD.isWebkit > 0 && cG(T, "position") == "absolute")) {
				cH.top -= cJ.body.offsetTop
			}
			cK = T.offsetParent;
			while (cK && cK != cJ.body) {
				cH.left -= cK.scrollLeft;
				if (!cD.opera || cK.tagName != "TR") {
					cH.top -= cK.scrollTop
				}
				cK = cK.offsetParent
			}
		}
		return cH
	};
	if (/firefox\/(\d+\.\d)/i.test(navigator.userAgent)) {
		a0.browser.firefox = +RegExp["\x241"]
	}
	(function() {
		var T = navigator.userAgent;
		if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(T)
				&& !/chrome/i.test(T)) {
			a0.browser.safari = +(RegExp["\x241"] || RegExp["\x242"])
		}
	})();
	if (/chrome\/(\d+\.\d)/i.test(navigator.userAgent)) {
		a0.browser.chrome = +RegExp["\x241"]
	}
	a0.array = a0.array || {};
	a0.array.each = function(cF, cD) {
		var cC, cE, cB, T = cF.length;
		if ("function" == typeof cD) {
			for (cB = 0; cB < T; cB++) {
				cE = cF[cB];
				cC = cD.call(cF, cE, cB);
				if (cC === false) {
					break
				}
			}
		}
		return cF
	};
	a0.each = a0.array.each;
	a0.lang.guid = function() {
		return "TANGRAM__" + (window[a0.guid]._counter++).toString(36)
	};
	window[a0.guid]._counter = window[a0.guid]._counter || 1;
	window[a0.guid]._instances = window[a0.guid]._instances || {};
	a0.lang.isFunction = function(T) {
		return "[object Function]" == Object.prototype.toString.call(T)
	};
	a0.lang.Class = function(T) {
		this.guid = T || a0.lang.guid();
		window[a0.guid]._instances[this.guid] = this
	};
	window[a0.guid]._instances = window[a0.guid]._instances || {};
	a0.lang.Class.prototype.dispose = function() {
		delete window[a0.guid]._instances[this.guid];
		for ( var T in this) {
			if (!a0.lang.isFunction(this[T])) {
				delete this[T]
			}
		}
		this.disposed = true
	};
	a0.lang.Class.prototype.toString = function() {
		return "[object " + (this._className || "Object") + "]"
	};
	a0.lang.Event = function(T, cB) {
		this.type = T;
		this.returnValue = true;
		this.target = cB || null;
		this.currentTarget = null
	};
	a0.lang.Class.prototype.addEventListener = function(cD, cC, cB) {
		if (!a0.lang.isFunction(cC)) {
			return
		}
		!this.__listeners && (this.__listeners = {});
		var T = this.__listeners, cE;
		if (typeof cB == "string" && cB) {
			if (/[^\w\-]/.test(cB)) {
				throw ("nonstandard key:" + cB)
			} else {
				cC.hashCode = cB;
				cE = cB
			}
		}
		cD.indexOf("on") != 0 && (cD = "on" + cD);
		typeof T[cD] != "object" && (T[cD] = {});
		cE = cE || a0.lang.guid();
		cC.hashCode = cE;
		T[cD][cE] = cC
	};
	a0.lang.Class.prototype.removeEventListener = function(cC, cB) {
		if (a0.lang.isFunction(cB)) {
			cB = cB.hashCode
		} else {
			if (!a0.lang.isString(cB)) {
				return
			}
		}
		!this.__listeners && (this.__listeners = {});
		cC.indexOf("on") != 0 && (cC = "on" + cC);
		var T = this.__listeners;
		if (!T[cC]) {
			return
		}
		T[cC][cB] && delete T[cC][cB]
	};
	a0.lang.Class.prototype.dispatchEvent = function(cD, T) {
		if (a0.lang.isString(cD)) {
			cD = new a0.lang.Event(cD)
		}
		!this.__listeners && (this.__listeners = {});
		T = T || {};
		for ( var cC in T) {
			cD[cC] = T[cC]
		}
		var cC, cB = this.__listeners, cE = cD.type;
		cD.target = cD.target || this;
		cD.currentTarget = this;
		cE.indexOf("on") != 0 && (cE = "on" + cE);
		a0.lang.isFunction(this[cE]) && this[cE].apply(this, arguments);
		if (typeof cB[cE] == "object") {
			for (cC in cB[cE]) {
				cB[cE][cC].apply(this, arguments)
			}
		}
		return cD.returnValue
	};
	a0.lang.inherits = function(cG, cE, cD) {
		var cC, cF, T = cG.prototype, cB = new Function();
		cB.prototype = cE.prototype;
		cF = cG.prototype = new cB();
		for (cC in T) {
			cF[cC] = T[cC]
		}
		cG.prototype.constructor = cG;
		cG.superClass = cE.prototype;
		if ("string" == typeof cD) {
			cF._className = cD
		}
	};
	a0.inherits = a0.lang.inherits;
	a0.lang.instance = function(T) {
		return window[a0.guid]._instances[T] || null
	};
	a0.platform = a0.platform || {};
	a0.platform.isMacintosh = /macintosh/i.test(navigator.userAgent);
	a0.platform.isWindows = /windows/i.test(navigator.userAgent);
	a0.platform.isX11 = /x11/i.test(navigator.userAgent);
	a0.platform.isAndroid = /android/i.test(navigator.userAgent);
	a0.platform.isIpad = /ipad/i.test(navigator.userAgent);
	a0.platform.isIphone = /iphone/i.test(navigator.userAgent);
	a0.lang.Event.prototype.inherit = function(cC) {
		var cB = this;
		this.domEvent = cC = window.event || cC;
		cB.clientX = cC.clientX || cC.pageX;
		cB.clientY = cC.clientY || cC.pageY;
		cB.offsetX = cC.offsetX || cC.layerX;
		cB.offsetY = cC.offsetY || cC.layerY;
		cB.screenX = cC.screenX;
		cB.screenY = cC.screenY;
		cB.ctrlKey = cC.ctrlKey || cC.metaKey;
		cB.shiftKey = cC.shiftKey;
		cB.altKey = cC.altKey;
		if (cC.touches) {
			cB.touches = [];
			for ( var T = 0; T < cC.touches.length; T++) {
				cB.touches.push({
					clientX : cC.touches[T].clientX,
					clientY : cC.touches[T].clientY,
					screenX : cC.touches[T].screenX,
					screenY : cC.touches[T].screenY,
					pageX : cC.touches[T].pageX,
					pageY : cC.touches[T].pageY,
					target : cC.touches[T].target,
					identifier : cC.touches[T].identifier
				})
			}
		}
		if (cC.changedTouches) {
			cB.changedTouches = [];
			for ( var T = 0; T < cC.changedTouches.length; T++) {
				cB.changedTouches.push({
					clientX : cC.changedTouches[T].clientX,
					clientY : cC.changedTouches[T].clientY,
					screenX : cC.changedTouches[T].screenX,
					screenY : cC.changedTouches[T].screenY,
					pageX : cC.changedTouches[T].pageX,
					pageY : cC.changedTouches[T].pageY,
					target : cC.changedTouches[T].target,
					identifier : cC.changedTouches[T].identifier
				})
			}
		}
		if (cC.targetTouches) {
			cB.targetTouches = [];
			for ( var T = 0; T < cC.targetTouches.length; T++) {
				cB.targetTouches.push({
					clientX : cC.targetTouches[T].clientX,
					clientY : cC.targetTouches[T].clientY,
					screenX : cC.targetTouches[T].screenX,
					screenY : cC.targetTouches[T].screenY,
					pageX : cC.targetTouches[T].pageX,
					pageY : cC.targetTouches[T].pageY,
					target : cC.targetTouches[T].target,
					identifier : cC.targetTouches[T].identifier
				})
			}
		}
		cB.rotation = cC.rotation;
		cB.scale = cC.scale;
		return cB
	};
	a0.lang.decontrol = function(cB) {
		var T = window[a0.guid];
		T._instances && (delete T._instances[cB])
	};
	a0.event = {};
	a0.on = a0.event.on = function(cC, cB, T) {
		if (!(cC = a0.g(cC))) {
			return cC
		}
		cB = cB.replace(/^on/, "");
		if (cC.addEventListener) {
			cC.addEventListener(cB, T, false)
		} else {
			if (cC.attachEvent) {
				cC.attachEvent("on" + cB, T)
			}
		}
		return cC
	};
	a0.un = a0.event.un = function(cC, cB, T) {
		if (!(cC = a0.g(cC))) {
			return cC
		}
		cB = cB.replace(/^on/, "");
		if (cC.removeEventListener) {
			cC.removeEventListener(cB, T, false)
		} else {
			if (cC.detachEvent) {
				cC.detachEvent("on" + cB, T)
			}
		}
		return cC
	};
	a0.dom.hasClass = function(cC, cB) {
		if (!cC || !cC.className || typeof cC.className != "string") {
			return false
		}
		var T = -1;
		try {
			T = cC.className == cB
					|| cC.className.search(new RegExp("(\\s|^)" + cB
							+ "(\\s|$)"))
		} catch (cD) {
			return false
		}
		return T > -1
	};
	window.BMap = window.BMap || {};
	window.BMap.version = "1.3";
	window.BMap._register = [];
	window.BMap.register = function(T) {
		this._register.push(T)
	};
	window.BMap.apiLoad = window.BMap.apiLoad || function() {
	};
	function br(cD, cF) {
		cD = a0.g(cD);
		if (!cD) {
			return
		}
		var cE = this;
		a0.lang.Class.call(cE);
		cE.config = {
			clickInterval : 200,
			enableDragging : true,
			enableKeyboard : false,
			enableDblclickZoom : true,
			enableContinuousZoom : false,
			enableWheelZoom : false,
			enableMouseDown : true,
			enablePinchToZoom : true,
			enableAutoResize : true,
			fps : 25,
			zoomerDuration : 240,
			actionDuration : 450,
			defaultCursor : b2.defaultCursor,
			draggingCursor : b2.draggingCursor,
			isOverviewMap : false,
			minZoom : 1,
			maxZoom : 18,
			mapType : BMAP_NORMAL_MAP,
			restrictBounds : false,
			drawer : BMAP_SYS_DRAWER,
			enableInertialDragging : false,
			drawMargin : 500,
			enableHighResolution : false
		};
		a0.extend(cE.config, cF || {});
		if (cE.highResolutionEnabled()) {
			var cH = document.querySelector("meta[name=viewport]");
			cH.content = "initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5, user-scalable=no, target-densitydpi=high-dpi"
		}
		cE.container = cD;
		cE._setStyle(cD);
		cD.unselectable = "on";
		cD.innerHTML = "";
		cD.appendChild(cE.render());
		var cB = cE.getSize();
		cE.width = cB.width;
		cE.height = cB.height;
		cE.offsetX = 0;
		cE.offsetY = 0;
		cE.platform = cD.firstChild;
		cE.maskLayer = cE.platform.firstChild;
		cE.maskLayer.style.width = cE.width + "px";
		cE.maskLayer.style.height = cE.height + "px";
		cE._panes = {};
		cE.centerPoint = new b3(0, 0);
		cE.mercatorCenter = new b3(0, 0);
		cE.zoomLevel = 1;
		cE.lastLevel = 0;
		cE.defaultZoomLevel = null;
		cE.defaultCenter = null;
		cE.currentCity = "";
		cE.cityCode = "";
		cE._hotspots = {};
		cE.currentOperation = 0;
		cF = cF || {};
		var cG = cE.mapType = cE.config.mapType;
		cE.projection = cG.getProjection();
		if (cG === BMAP_PERSPECTIVE_MAP) {
			_addStat(5002)
		}
		if (cG === BMAP_SATELLITE_MAP || cG === BMAP_HYBRID_MAP) {
			_addStat(5003)
		}
		var T = cE.config;
		T.userMinZoom = cF.minZoom;
		T.userMaxZoom = cF.maxZoom;
		cE._checkZoom();
		cE.temp = {
			operating : false,
			arrow : 0,
			lastDomMoveTime : 0,
			lastLoadTileTime : 0,
			lastMovingTime : 0,
			canKeyboard : false,
			registerIndex : -1,
			curSpots : []
		};
		cE.platform.style.cursor = cE.config.defaultCursor;
		for ( var cC = 0; cC < BMap._register.length; cC++) {
			BMap._register[cC](cE)
		}
		cE.temp.registerIndex = cC;
		cE._bind();
		cq.load("map", function() {
			cE._draw()
		});
		if (bF()) {
			cq.load("oppc", function() {
				cE._asyncRegister()
			})
		}
		if (au()) {
			cq.load("opmb", function() {
				cE._asyncRegister()
			})
		}
		cD = null
	}
	a0.lang.inherits(br, a0.lang.Class, "Map");
	a0
			.extend(
					br.prototype,
					{
						render : function() {
							var T = V("div");
							var cD = T.style;
							cD.overflow = "visible";
							cD.position = "absolute";
							cD.zIndex = "0";
							cD.top = cD.left = "0px";
							var cB = V("div", {
								"class" : "BMap_mask"
							});
							var cC = cB.style;
							cC.position = "absolute";
							cC.top = cC.left = "0px";
							cC.zIndex = "9";
							cC.overflow = "hidden";
							cC.WebkitUserSelect = "none";
							T.appendChild(cB);
							return T
						},
						_setStyle : function(cB) {
							var T = cB.style;
							T.overflow = "hidden";
							if (aC(cB).position != "absolute") {
								T.position = "relative";
								T.zIndex = 0
							}
							T.backgroundColor = "#F3F1EC";
							T.color = "#000";
							T.textAlign = "left"
						},
						_bind : function() {
							var T = this;
							T._watchSize = function() {
								var cB = T.getSize();
								if (T.width != cB.width
										|| T.height != cB.height) {
									var cD = new aA(T.width, T.height);
									var cE = new a8("onbeforeresize");
									cE.size = cD;
									T.dispatchEvent(cE);
									T._updateCenterPoint(
											(cB.width - T.width) / 2,
											(cB.height - T.height) / 2);
									T.maskLayer.style.width = (T.width = cB.width)
											+ "px";
									T.maskLayer.style.height = (T.height = cB.height)
											+ "px";
									var cC = new a8("onresize");
									cC.size = cB;
									T.dispatchEvent(cC)
								}
							};
							if (T.config.enableAutoResize) {
								T.temp.autoResizeTimer = setInterval(
										T._watchSize, 80)
							}
						},
						_updateCenterPoint : function(cD, cB, cH, cG) {
							var cE = this.getMapType().getZoomUnits(
									this.getZoom());
							var cI = this.projection;
							var cF = true;
							if (cH && b3.isInRange(cH)) {
								this.centerPoint = new b3(cH.lng, cH.lat);
								cF = false
							}
							var cC = (cH && cG) ? cI.lngLatToMercator(cH,
									this.currentCity) : this.mercatorCenter;
							if (cC) {
								this.mercatorCenter = new b3(cC.lng + cD * cE,
										cC.lat - cB * cE);
								var T = cI.mercatorToLngLat(
										this.mercatorCenter, this.currentCity);
								if (T && cF) {
									this.centerPoint = T
								}
							}
						},
						zoomTo : function(cD, cB) {
							if (!aD(cD)) {
								return
							}
							cD = this._getProperZoom(cD).zoom;
							if (cD == this.zoomLevel) {
								return
							}
							this.lastLevel = this.zoomLevel;
							this.zoomLevel = cD;
							var cC;
							if (cB) {
								cC = cB
							} else {
								if (this.getInfoWindow()) {
									cC = this.getInfoWindow().getPosition()
								}
							}
							if (cC) {
								var T = this.pointToPixel(cC, this.lastLevel);
								this._updateCenterPoint(this.width / 2 - T.x,
										this.height / 2 - T.y,
										this.pixelToPoint(T, this.lastLevel),
										true)
							}
							this.dispatchEvent(new a8("onzoomstart"));
							this.dispatchEvent(new a8("onzoomstartcode"))
						},
						setZoom : function(T) {
							this.zoomTo(T)
						},
						zoomIn : function(T) {
							this.zoomTo(this.zoomLevel + 1, T)
						},
						zoomOut : function(T) {
							this.zoomTo(this.zoomLevel - 1, T)
						},
						panTo : function(T, cB) {
							if (!(T instanceof b3)) {
								return
							}
							this.mercatorCenter = this.projection
									.lngLatToMercator(T, this.currentCity);
							if (b3.isInRange(T)) {
								this.centerPoint = new b3(T.lng, T.lat)
							} else {
								this.centerPoint = this.projection
										.mercatorToLngLat(this.mercatorCenter,
												this.currentCity)
							}
						},
						panBy : function(cB, T) {
							cB = Math.round(cB) || 0;
							T = Math.round(T) || 0;
							this._updateCenterPoint(-cB, -T)
						},
						addControl : function(T) {
							if (T && F(T._i)) {
								T._i(this);
								this.dispatchEvent(new a8("onaddcontrol", T))
							}
						},
						removeControl : function(T) {
							if (T && F(T.remove)) {
								T.remove();
								this
										.dispatchEvent(new a8(
												"onremovecontrol", T))
							}
						},
						addContextMenu : function(T) {
							if (T && F(T.initialize)) {
								T.initialize(this);
								this
										.dispatchEvent(new a8(
												"onaddcontextmenu", T))
							}
						},
						removeContextMenu : function(T) {
							if (T && F(T.remove)) {
								this.dispatchEvent(new a8(
										"onremovecontextmenu", T));
								T.remove()
							}
						},
						addOverlay : function(T) {
							if (T && F(T._i)) {
								T._i(this);
								this.dispatchEvent(new a8("onaddoverlay", T))
							}
						},
						removeOverlay : function(T) {
							if (T && F(T.remove)) {
								T.remove();
								this
										.dispatchEvent(new a8(
												"onremoveoverlay", T))
							}
						},
						clearOverlays : function() {
							this.dispatchEvent(new a8("onclearoverlays"))
						},
						addTileLayer : function(T) {
							if (T) {
								this.dispatchEvent(new a8("onaddtilelayer", T))
							}
						},
						removeTileLayer : function(T) {
							if (T) {
								this.dispatchEvent(new a8("onremovetilelayer",
										T))
							}
						},
						setMapType : function(cB) {
							if (this.mapType === cB) {
								return
							}
							var cC = new a8("onsetmaptype");
							var T = this.mapType;
							cC.preMapType = T;
							this.mapType = this.config.mapType = cB;
							this.projection = this.mapType.getProjection();
							this._updateCenterPoint(0, 0, this.getCenter(),
									true);
							this._checkZoom();
							var cD = this._getProperZoom(this.getZoom()).zoom;
							this.zoomTo(cD);
							this.dispatchEvent(cC);
							var cC = new a8("onmaptypechange");
							cC.zoomLevel = cD;
							cC.mapType = cB;
							this.dispatchEvent(cC);
							if (cB === BMAP_SATELLITE_MAP
									|| cB === BMAP_HYBRID_MAP) {
								_addStat(5003)
							}
						},
						setCenter : function(T) {
							var cC = this;
							if (T instanceof b3) {
								cC.panTo(T, {
									noAnimation : true
								})
							} else {
								if (bU(T)) {
									var cB = this._getLocal();
									cB.setSearchCompleteCallback(function(cD) {
										if (cB.getStatus() == 0
												&& cB._json.result.type == 2) {
											cC.setCenter(cD.getPoi(0).point);
											if (BMAP_PERSPECTIVE_MAP
													.getCityName(T)) {
												cC.setCurrentCity(T)
											}
										}
									});
									cB.search(T)
								}
							}
						},
						centerAndZoom : function(T, cC) {
							var cB = this;
							if (bU(T)) {
								var cF = cB._getLocal();
								cF
										.setSearchCompleteCallback(function(cG) {
											if (cF.getStatus() == 0
													&& cF._json.result.type == 2) {
												var cI = cG.getPoi(0).point;
												var cH = cC
														|| O
																.getBestLevel(
																		cF._json.content.level,
																		cB);
												cB.centerAndZoom(cI, cH);
												if (BMAP_PERSPECTIVE_MAP
														.getCityName(T)) {
													cB.setCurrentCity(T)
												}
											}
										});
								cF.search(T);
								return
							}
							if (!(T instanceof b3) || !cC) {
								return
							}
							cC = cB._getProperZoom(cC).zoom;
							cB.lastLevel = cB.zoomLevel || cC;
							cB.zoomLevel = cC;
							cB.centerPoint = new b3(T.lng, T.lat);
							cB.mercatorCenter = cB.projection.lngLatToMercator(
									cB.centerPoint, cB.currentCity);
							cB.defaultZoomLevel = cB.defaultZoomLevel
									|| cB.zoomLevel;
							cB.defaultCenter = cB.defaultCenter
									|| cB.centerPoint;
							var cE = new a8("onload");
							var cD = new a8("onloadcode");
							cE.point = new b3(T.lng, T.lat);
							cE.pixel = cB.pointToPixel(cB.centerPoint,
									cB.zoomLevel);
							cE.zoom = cC;
							if (!cB.loaded) {
								cB.loaded = true;
								cB.dispatchEvent(cE)
							}
							cB.dispatchEvent(cD);
							cB.dispatchEvent(new a8("onmoveend"));
							if (cB.lastLevel != cB.zoomLevel) {
								cB.dispatchEvent(new a8("onzoomend"))
							}
						},
						_getLocal : function() {
							if (!this.temp.local) {
								this.temp.local = new aW(1)
							}
							return this.temp.local
						},
						reset : function() {
							this.centerAndZoom(this.defaultCenter,
									this.defaultZoomLevel, true)
						},
						enableDragging : function() {
							this.config.enableDragging = true
						},
						disableDragging : function() {
							this.config.enableDragging = false
						},
						enableInertialDragging : function() {
							this.config.enableInertialDragging = true
						},
						disableInertialDragging : function() {
							this.config.enableInertialDragging = false
						},
						enableScrollWheelZoom : function() {
							this.config.enableWheelZoom = true
						},
						disableScrollWheelZoom : function() {
							this.config.enableWheelZoom = false
						},
						enableContinuousZoom : function() {
							this.config.enableContinuousZoom = true
						},
						disableContinuousZoom : function() {
							this.config.enableContinuousZoom = false
						},
						enableDoubleClickZoom : function() {
							this.config.enableDblclickZoom = true
						},
						disableDoubleClickZoom : function() {
							this.config.enableDblclickZoom = false
						},
						enableKeyboard : function() {
							this.config.enableKeyboard = true
						},
						disableKeyboard : function() {
							this.config.enableKeyboard = false
						},
						enablePinchToZoom : function() {
							this.config.enablePinchToZoom = true
						},
						disablePinchToZoom : function() {
							this.config.enablePinchToZoom = false
						},
						enableAutoResize : function() {
							this.config.enableAutoResize = true;
							this._watchSize();
							if (!this.temp.autoResizeTimer) {
								this.temp.autoResizeTimer = setInterval(
										this._watchSize, 80)
							}
						},
						disableAutoResize : function() {
							this.config.enableAutoResize = false;
							if (this.temp.autoResizeTimer) {
								clearInterval(this.temp.autoResizeTimer);
								this.temp.autoResizeTimer = null
							}
						},
						getSize : function() {
							return new aA(this.container.clientWidth,
									this.container.clientHeight)
						},
						getCenter : function() {
							return this.centerPoint
						},
						getZoom : function() {
							return this.zoomLevel
						},
						checkResize : function() {
							this._watchSize()
						},
						_getProperZoom : function(cC) {
							var cB = this.config.minZoom, T = this.config.maxZoom, cD = false;
							if (cC < cB) {
								cD = true;
								cC = cB
							}
							if (cC > T) {
								cD = true;
								cC = T
							}
							return {
								zoom : cC,
								exceeded : cD
							}
						},
						getContainer : function() {
							return this.container
						},
						pointToPixel : function(T, cB) {
							cB = cB || this.getZoom();
							return this.projection.pointToPixel(T, cB,
									this.mercatorCenter, this.getSize(),
									this.currentCity)
						},
						pixelToPoint : function(T, cB) {
							cB = cB || this.getZoom();
							return this.projection.pixelToPoint(T, cB,
									this.mercatorCenter, this.getSize(),
									this.currentCity)
						},
						pointToOverlayPixel : function(T, cC) {
							if (!T) {
								return
							}
							var cD = new b3(T.lng, T.lat);
							var cB = this.pointToPixel(cD, cC);
							cB.x -= this.offsetX;
							cB.y -= this.offsetY;
							return cB
						},
						overlayPixelToPoint : function(T, cC) {
							if (!T) {
								return
							}
							var cB = new bm(T.x, T.y);
							cB.x += this.offsetX;
							cB.y += this.offsetY;
							return this.pixelToPoint(cB, cC)
						},
						getBounds : function() {
							if (!this.isLoaded()) {
								return new bE()
							}
							var cB = arguments[0] || {}, cD = cB.margins
									|| [ 0, 0, 0, 0 ], T = cB.zoom || null, cE = this
									.pixelToPoint({
										x : cD[3],
										y : this.height - cD[2]
									}, T), cC = this.pixelToPoint({
								x : this.width - cD[1],
								y : cD[0]
							}, T);
							return new bE(cE, cC)
						},
						isLoaded : function() {
							return !!this.loaded
						},
						_getBestLevel : function(cB, cC) {
							var cF = this.getMapType();
							var cH = cC.margins || [ 10, 10, 10, 10 ], cE = cC.zoomFactor || 0, cI = cH[1]
									+ cH[3], cG = cH[0] + cH[2], T = cF
									.getMinZoom(), cK = cF.getMaxZoom();
							for ( var cD = cK; cD >= T; cD--) {
								var cJ = this.getMapType().getZoomUnits(cD);
								if (cB.toSpan().lng / cJ < this.width - cI
										&& cB.toSpan().lat / cJ < this.height
												- cG) {
									break
								}
							}
							cD += cE;
							if (cD < T) {
								cD = T
							}
							if (cD > cK) {
								cD = cK
							}
							return cD
						},
						getViewport : function(cJ, cB) {
							var cN = {
								center : this.getCenter(),
								zoom : this.getZoom()
							};
							if (!cJ || !cJ instanceof bE && cJ.length == 0
									|| cJ instanceof bE && cJ.isEmpty()) {
								return cN
							}
							var cL = [];
							if (cJ instanceof bE) {
								cL.push(cJ.getNorthEast());
								cL.push(cJ.getSouthWest())
							} else {
								cL = cJ.slice(0)
							}
							cB = cB || {};
							var cF = [];
							for ( var cG = 0, cE = cL.length; cG < cE; cG++) {
								cF.push(this.projection.lngLatToMercator(
										cL[cG], this.currentCity))
							}
							var cC = new bE();
							for ( var cG = cF.length - 1; cG >= 0; cG--) {
								cC.extend(cF[cG])
							}
							if (cC.isEmpty()) {
								return cN
							}
							var T = cC.getCenter();
							var cM = this._getBestLevel(cC, cB);
							if (cB.margins) {
								var cI = cB.margins, cH = (cI[1] - cI[3]) / 2, cK = (cI[0] - cI[2]) / 2, cD = this
										.getMapType().getZoomUnits(cM);
								T.lng = T.lng + cD * cH;
								T.lat = T.lat + cD * cK
							}
							T = this.projection.mercatorToLngLat(T,
									this.currentCity);
							return {
								center : T,
								zoom : cM
							}
						},
						setViewport : function(cB, cE) {
							var T;
							if (cB && cB.center) {
								T = cB
							} else {
								T = this.getViewport(cB, cE)
							}
							cE = cE || {};
							var cC = cE.delay || 200;
							if (T.zoom == this.zoomLevel
									&& cE.enableAnimation != false) {
								var cD = this;
								setTimeout(function() {
									cD.panTo(T.center, {
										duration : 210
									})
								}, cC)
							} else {
								this.centerAndZoom(T.center, T.zoom)
							}
						},
						getPanes : function() {
							return this._panes
						},
						getInfoWindow : function() {
							if (this.temp.infoWin && this.temp.infoWin.isOpen()) {
								return this.temp.infoWin
							}
							return null
						},
						getDistance : function(cC, T) {
							if (!cC || !T) {
								return
							}
							var cB = 0;
							cB = a2.getDistanceByLL(cC, T);
							return cB
						},
						getOverlays : function() {
							var cD = [], cE = this._overlays, cC = this._customOverlays;
							if (cE) {
								for ( var cB in cE) {
									if (cE[cB] instanceof S) {
										cD.push(cE[cB])
									}
								}
							}
							if (cC) {
								for ( var cB = 0, T = cC.length; cB < T; cB++) {
									cD.push(cC[cB])
								}
							}
							return cD
						},
						getMapType : function() {
							return this.mapType
						},
						_asyncRegister : function() {
							for ( var T = this.temp.registerIndex; T < BMap._register.length; T++) {
								BMap._register[T](this)
							}
							this.temp.registerIndex = T
						},
						setCurrentCity : function(T) {
							this.currentCity = BMAP_PERSPECTIVE_MAP
									.getCityName(T);
							this.cityCode = BMAP_PERSPECTIVE_MAP
									.getCityCode(this.currentCity)
						},
						setDefaultCursor : function(T) {
							this.config.defaultCursor = T;
							if (this.platform) {
								this.platform.style.cursor = this.config.defaultCursor
							}
						},
						getDefaultCursor : function() {
							return this.config.defaultCursor
						},
						setDraggingCursor : function(T) {
							this.config.draggingCursor = T
						},
						getDraggingCursor : function() {
							return this.config.draggingCursor
						},
						highResolutionEnabled : function() {
							return this.config.enableHighResolution
									&& window.devicePixelRatio > 1
						},
						addHotspot : function(cB) {
							if (cB instanceof cc) {
								this._hotspots[cB.guid] = cB;
								cB.initialize(this)
							}
							var T = this;
							cq.load("hotspot", function() {
								T._asyncRegister()
							})
						},
						removeHotspot : function(T) {
							if (this._hotspots[T.guid]) {
								delete this._hotspots[T.guid]
							}
						},
						clearHotspots : function() {
							this._hotspots = {}
						},
						_checkZoom : function() {
							var cB = this.mapType.getMinZoom();
							var cC = this.mapType.getMaxZoom();
							var T = this.config;
							T.minZoom = T.userMinZoom || cB;
							T.maxZoom = T.userMaxZoom || cC;
							if (T.minZoom < cB) {
								T.minZoom = cB
							}
							if (T.maxZoom > cC) {
								T.maxZoom = cC
							}
						},
						setMinZoom : function(T) {
							if (T > this.config.maxZoom) {
								T = this.config.maxZoom
							}
							this.config.userMinZoom = T;
							this._updateZoom()
						},
						setMaxZoom : function(T) {
							if (T < this.config.minZoom) {
								T = this.config.minZoom
							}
							this.config.userMaxZoom = T;
							this._updateZoom()
						},
						_updateZoom : function() {
							this._checkZoom();
							var T = this.config;
							if (this.zoomLevel < T.minZoom) {
								this.setZoom(T.minZoom)
							} else {
								if (this.zoomLevel > T.maxZoom) {
									this.setZoom(T.maxZoom)
								}
							}
							var cB = new a8("onzoomspanchange");
							cB.minZoom = T.minZoom;
							cB.maxZoom = T.maxZoom;
							this.dispatchEvent(cB)
						}
					});
	window.BMAP_API_VERSION = "1.3";
	window.BMAP_COORD_LNGLAT = 0;
	window.BMAP_COORD_MERCATOR = 1;
	window.BMAP_SYS_DRAWER = 0;
	window.BMAP_SVG_DRAWER = 1;
	window.BMAP_VML_DRAWER = 2;
	window.BMAP_CANVAS_DRAWER = 3;
	window._addStat = function(cF, cE) {
		if (!cF) {
			return
		}
		cE = cE || {};
		var cD = "";
		for ( var cB in cE) {
			cD = cD + "&" + cB + "=" + encodeURIComponent(cE[cB])
		}
		var cG = function(cH) {
			if (!cH) {
				return
			}
			_addStat._sending = true;
			setTimeout(function() {
				_addStat._img.src = b2.imgPath + "blank.gif?" + cH.src
			}, 50)
		};
		var T = function() {
			var cH = _addStat._reqQueue.shift();
			if (cH) {
				cG(cH)
			}
		};
		var cC = (Math.random() * 100000000).toFixed(0);
		if (_addStat._sending) {
			_addStat._reqQueue.push({
				src : "t=" + cC + "&code=" + cF + cD
			})
		} else {
			cG({
				src : "t=" + cC + "&code=" + cF + cD
			})
		}
		if (!_addStat._binded) {
			a0.on(_addStat._img, "load", function() {
				_addStat._sending = false;
				T()
			});
			a0.on(_addStat._img, "error", function() {
				_addStat._sending = false;
				T()
			});
			_addStat._binded = true
		}
	};
	window._addStat._reqQueue = [];
	window._addStat._img = new Image();
	_addStat(5000);
	function g(cD) {
		var T = {
			duration : 1000,
			fps : 30,
			delay : 0,
			transition : ap.linear,
			onStop : function() {
			}
		};
		this._anis = [];
		if (cD) {
			for ( var cB in cD) {
				T[cB] = cD[cB]
			}
		}
		this._opts = T;
		if (aD(T.delay)) {
			var cC = this;
			setTimeout(function() {
				cC.start()
			}, T.delay)
		} else {
			if (T.delay != g.INFINITE) {
				this.start()
			}
		}
	}
	g.INFINITE = "INFINITE";
	g.prototype.start = function() {
		this._beginTime = ay();
		this._endTime = this._beginTime + this._opts.duration;
		this._launch()
	};
	g.prototype.add = function(T) {
		this._anis.push(T)
	};
	g.prototype._launch = function() {
		var cC = this;
		var T = ay();
		if (T >= cC._endTime) {
			if (F(cC._opts.render)) {
				cC._opts.render(cC._opts.transition(1))
			}
			if (F(cC._opts.finish)) {
				cC._opts.finish()
			}
			if (cC._anis.length > 0) {
				var cB = cC._anis[0];
				cB._anis = [].concat(cC._anis.slice(1));
				cB.start()
			}
			return
		}
		cC.schedule = cC._opts.transition((T - cC._beginTime)
				/ cC._opts.duration);
		if (F(cC._opts.render)) {
			cC._opts.render(cC.schedule)
		}
		if (!cC.terminative) {
			cC._timer = setTimeout(function() {
				cC._launch()
			}, 1000 / cC._opts.fps)
		}
	};
	g.prototype.stop = function(cB) {
		this.terminative = true;
		for ( var T = 0; T < this._anis.length; T++) {
			this._anis[T].stop();
			this._anis[T] = null
		}
		this._anis.length = 0;
		if (this._timer) {
			clearTimeout(this._timer);
			this._timer = null
		}
		this._opts.onStop(this.schedule);
		if (cB) {
			this._endTime = this._beginTime;
			this._launch()
		}
	};
	g.prototype.cancel = function() {
		if (this._timer) {
			clearTimeout(this._timer)
		}
		this._endTime = this._beginTime;
		this.schedule = 0
	};
	g.prototype.setFinishCallback = function(T) {
		if (this._anis.length > 0) {
			this._anis[this._anis.length - 1]._opts.finish = T
		} else {
			this._opts.finish = T
		}
	};
	var ap = {
		linear : function(T) {
			return T
		},
		reverse : function(T) {
			return 1 - T
		},
		easeInQuad : function(T) {
			return T * T
		},
		easeInCubic : function(T) {
			return Math.pow(T, 3)
		},
		easeOutQuad : function(T) {
			return -(T * (T - 2))
		},
		easeOutCubic : function(T) {
			return Math.pow((T - 1), 3) + 1
		},
		easeInOutQuad : function(T) {
			if (T < 0.5) {
				return T * T * 2
			} else {
				return -2 * (T - 2) * T - 1
			}
			return
		},
		easeInOutCubic : function(T) {
			if (T < 0.5) {
				return Math.pow(T, 3) * 4
			} else {
				return Math.pow(T - 1, 3) * 4 + 1
			}
		},
		easeInOutSine : function(T) {
			return (1 - Math.cos(Math.PI * T)) / 2
		}
	};
	ap["ease-in"] = ap.easeInQuad;
	ap["ease-out"] = ap.easeOutQuad;
	var b2 = {
		imgPath : "http://api.map.baidu.com/images/",
		cityNames : {
			"北京" : "bj",
			"上海" : "sh",
			"深圳" : "sz",
			"广州" : "gz"
		},
		fontFamily : "arial,sans-serif"
	};
	if (a0.browser.firefox) {
		a0.extend(b2, {
			distCursor : "url(" + b2.imgPath + "ruler.cur),crosshair",
			defaultCursor : "-moz-grab",
			draggingCursor : "-moz-grabbing"
		});
		if (a0.platform.isWindows) {
			b2.fontFamily = "arial,simsun,sans-serif"
		}
	} else {
		if (a0.browser.chrome || a0.browser.safari) {
			a0.extend(b2, {
				distCursor : "url(" + b2.imgPath + "ruler.cur) 2 6,crosshair",
				defaultCursor : "url(" + b2.imgPath
						+ "openhand.cur) 8 8,default",
				draggingCursor : "url(" + b2.imgPath
						+ "closedhand.cur) 8 8,move"
			})
		} else {
			a0.extend(b2, {
				distCursor : "url(" + b2.imgPath + "ruler.cur),crosshair",
				defaultCursor : "url(" + b2.imgPath + "openhand.cur),default",
				draggingCursor : "url(" + b2.imgPath + "closedhand.cur),move"
			})
		}
	}
	function ao(cC, cB, T) {
		this.id = cC;
		this.bounds = cB;
		this.content = T
	}
	var bf = {
		undo : 1,
		redo : 2,
		zoom : 4,
		drag : 8,
		move : 16,
		mousewheel : 32,
		toolbarOperation : 64,
		stdMapCtrlDrag : 128,
		dblclick : 256
	};
	function bA(cC, T) {
		var cB = cC.style;
		cB.left = T[0] + "px";
		cB.top = T[1] + "px"
	}
	function cm(T) {
		if (a0.browser.ie > 0) {
			T.unselectable = "on"
		} else {
			T.style.MozUserSelect = "none"
		}
	}
	function v(T) {
		return T && T.parentNode && T.parentNode.nodeType != 11
	}
	function am(cB, T) {
		a0.dom.insertHTML(cB, "beforeEnd", T);
		return cB.lastChild
	}
	function bP(T) {
		var cB = {
			left : 0,
			top : 0
		};
		while (T && T.offsetParent) {
			cB.left += T.offsetLeft;
			cB.top += T.offsetTop;
			T = T.offsetParent
		}
		return cB
	}
	function aI(T) {
		var T = window.event || T;
		T.stopPropagation ? T.stopPropagation() : T.cancelBubble = true
	}
	function cs(T) {
		var T = window.event || T;
		T.preventDefault ? T.preventDefault() : T.returnValue = false;
		return false
	}
	function ce(T) {
		aI(T);
		return cs(T)
	}
	function cw() {
		var T = document.documentElement, cB = document.body;
		if (T && (T.scrollTop || T.scrollLeft)) {
			return [ T.scrollTop, T.scrollLeft ]
		} else {
			if (cB) {
				return [ cB.scrollTop, cB.scrollLeft ]
			} else {
				return [ 0, 0 ]
			}
		}
	}
	function cj(cB, T) {
		if (!cB || !T) {
			return
		}
		return Math.round(Math.sqrt(Math.pow(cB.x - T.x, 2)
				+ Math.pow(cB.y - T.y, 2)))
	}
	function L(T, cC) {
		var cB = [];
		cC = cC || function(cE) {
			return cE
		};
		for ( var cD in T) {
			cB.push(cD + "=" + cC(T[cD]))
		}
		return cB.join("&")
	}
	function V(cB, T, cC) {
		var cD = document.createElement(cB);
		if (cC) {
			cD = document.createElementNS(cC, cB)
		}
		return a0.dom.setAttrs(cD, T || {})
	}
	function aC(T) {
		if (T.currentStyle) {
			return T.currentStyle
		} else {
			if (T.ownerDocument && T.ownerDocument.defaultView) {
				return T.ownerDocument.defaultView.getComputedStyle(T, null)
			}
		}
	}
	function F(T) {
		return typeof T == "function"
	}
	function aD(T) {
		return typeof T == "number"
	}
	function bU(T) {
		return typeof T == "string"
	}
	function b7(T) {
		return typeof T != "undefined"
	}
	function cz(T) {
		return typeof T == "object"
	}
	function aR(T) {
		return "[object Array]" == Object.prototype.toString.call(T)
	}
	var b5 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	function bM(cD) {
		var cB = "";
		var cK, cI, cG = "";
		var cJ, cH, cF, cE = "";
		var cC = 0;
		var T = /[^A-Za-z0-9\+\/\=]/g;
		if (!cD || T.exec(cD)) {
			return cD
		}
		cD = cD.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		do {
			cJ = b5.indexOf(cD.charAt(cC++));
			cH = b5.indexOf(cD.charAt(cC++));
			cF = b5.indexOf(cD.charAt(cC++));
			cE = b5.indexOf(cD.charAt(cC++));
			cK = (cJ << 2) | (cH >> 4);
			cI = ((cH & 15) << 4) | (cF >> 2);
			cG = ((cF & 3) << 6) | cE;
			cB = cB + String.fromCharCode(cK);
			if (cF != 64) {
				cB = cB + String.fromCharCode(cI)
			}
			if (cE != 64) {
				cB = cB + String.fromCharCode(cG)
			}
			cK = cI = cG = "";
			cJ = cH = cF = cE = ""
		} while (cC < cD.length);
		return cB
	}
	var a8 = a0.lang.Event;
	function au() {
		return !!(a0.platform.isIphone || a0.platform.isIpad || a0.platform.isAndroid)
	}
	function bF() {
		return !!(a0.platform.isWindows || a0.platform.isMacintosh || a0.platform.isX11)
	}
	function ay() {
		return (new Date).getTime()
	}
	var cn = {
		request : function(cB) {
			var T = V("script", {
				src : cB,
				type : "text/javascript",
				charset : "utf-8"
			});
			if (T.addEventListener) {
				T.addEventListener("load", function(cD) {
					var cC = cD.target;
					cC.parentNode.removeChild(cC)
				}, false)
			} else {
				if (T.attachEvent) {
					T
							.attachEvent(
									"onreadystatechange",
									function(cD) {
										var cC = window.event.srcElement;
										if (cC
												&& (cC.readyState == "loaded" || cC.readyState == "complete")) {
											cC.parentNode.removeChild(cC)
										}
									})
				}
			}
			setTimeout(function() {
				document.getElementsByTagName("head")[0].appendChild(T);
				T = null
			}, 1)
		}
	};
	function cq() {
	}
	a0.object.extend(cq, {
		Request : {
			INITIAL : -1,
			WAITING : 0,
			COMPLETED : 1
		},
		Dependency : {
			control : [],
			marker : [],
			poly : [ "marker" ],
			infowindow : [ "marker" ],
			menu : [],
			oppc : [],
			opmb : [],
			scommon : [],
			local : [ "scommon" ],
			route : [ "scommon" ],
			othersearch : [ "scommon" ],
			autocomplete : [ "scommon" ],
			buslinesearch : [ "route" ],
			hotspot : []
		},
		preLoaded : {},
		Config : {
			_baseUrl : "http://api.map.baidu.com/getmodules?v=1.3",
			_timeout : 5000
		},
		delayFlag : false,
		Module : {
			_modules : {},
			_arrMdls : []
		},
		load : function(cB, cD) {
			var T = this.current(cB);
			if (T._status == this.Request.COMPLETED) {
				return
			} else {
				if (T._status == this.Request.INITIAL) {
					this.combine(cB);
					this.pushUniqueMdl(cB);
					var cC = this;
					if (cC.delayFlag == false) {
						cC.delayFlag = true;
						window.setTimeout(function() {
							var cE = cC.Config._baseUrl + "&mod="
									+ cC.Module._arrMdls.join(",");
							cn.request(cE);
							cC.Module._arrMdls.length = 0;
							cC.delayFlag = false
						}, 1)
					}
					T._status = this.Request.WAITING
				}
				T._callbacks.push(cD)
			}
		},
		combine : function(T) {
			if (T && this.Dependency[T]) {
				var cC = this.Dependency[T];
				for ( var cB = 0; cB < cC.length; cB++) {
					this.combine(cC[cB]);
					if (!this.Module._modules[cC[cB]]) {
						this.pushUniqueMdl(cC[cB])
					}
				}
			}
		},
		pushUniqueMdl : function(cB) {
			for ( var T = 0; T < this.Module._arrMdls.length; T++) {
				if (this.Module._arrMdls[T] == cB) {
					return
				}
			}
			this.Module._arrMdls.push(cB)
		},
		run : function(cC, cE) {
			var cB = this.current(cC);
			try {
				eval(cE)
			} catch (cF) {
				return
			}
			cB._status = this.Request.COMPLETED;
			for ( var cD = 0, T = cB._callbacks.length; cD < T; cD++) {
				cB._callbacks[cD]()
			}
			cB._callbacks.length = 0
		},
		check : function(cB, cC) {
			var T = this;
			T.timeout = setTimeout(function() {
				var cD = T.Module._modules[cB]._status;
				if (cD != T.Request.COMPLETED) {
					T.remove(cB);
					T.load(cB, cC)
				} else {
					clearTimeout(T.timeout)
				}
			}, T.Config._timeout)
		},
		current : function(cB) {
			var T;
			if (!this.Module._modules[cB]) {
				this.Module._modules[cB] = {};
				this.Module._modules[cB]._status = this.Request.INITIAL;
				this.Module._modules[cB]._callbacks = []
			}
			T = this.Module._modules[cB];
			return T
		},
		remove : function(cB) {
			var T = this.current(cB);
			delete T
		}
	});
	window._jsload = function(T, cB) {
		cq.run(T, cB)
	};
	function bm(T, cB) {
		this.x = T || 0;
		this.y = cB || 0
	}
	bm.prototype.equals = function(T) {
		return T && T.x == this.x && T.y == this.y
	};
	function aA(cB, T) {
		this.width = cB || 0;
		this.height = T || 0
	}
	aA.prototype.equals = function(T) {
		return T && this.width == T.width && this.height == T.height
	};
	function cc(T, cB) {
		if (!T) {
			return
		}
		this._position = T;
		this.guid = "spot" + (cc.guid++);
		cB = cB || {};
		this._text = cB.text || "";
		this._offsets = cB.offsets ? cB.offsets.slice(0) : [ 5, 5, 5, 5 ];
		this._userData = cB.userData || null;
		this._minZoom = cB.minZoom || null;
		this._maxZoom = cB.maxZoom || null
	}
	cc.guid = 0;
	a0.extend(cc.prototype, {
		initialize : function(T) {
			if (this._minZoom == null) {
				this._minZoom = T.config.minZoom
			}
			if (this._maxZoom == null) {
				this._maxZoom = T.config.maxZoom
			}
		},
		setPosition : function(T) {
			if (T instanceof b3) {
				this._position = T
			}
		},
		getPosition : function() {
			return this._position
		},
		setText : function(T) {
			this._text = T
		},
		getText : function() {
			return this._text
		},
		setUserData : function(T) {
			this._userData = T
		},
		getUserData : function() {
			return this._userData
		}
	});
	function cf() {
		this._map = null;
		this._container;
		this._type = "control";
		this.blockInfoWindow = true;
		this._visible = true
	}
	a0.lang.inherits(cf, a0.lang.Class, "Control");
	a0
			.extend(
					cf.prototype,
					{
						initialize : function(T) {
							this._map = T;
							if (this._container) {
								T.container.appendChild(this._container);
								return this._container
							}
							return
						},
						_i : function(T) {
							if (!this._container && this.initialize
									&& F(this.initialize)) {
								this._container = this.initialize(T)
							}
							this._opts = this._opts || {
								printable : false
							};
							this._setStyle();
							this._setPosition();
							if (this._container) {
								this._container._jsobj = this
							}
						},
						_setStyle : function() {
							var cB = this._container;
							if (cB) {
								var T = cB.style;
								T.position = "absolute";
								T.zIndex = this._cZIndex || "10";
								T.MozUserSelect = "none";
								T.WebkitTextSizeAdjust = "none";
								if (!this._opts.printable) {
									a0.dom.addClass(cB, "BMap_noprint")
								}
								a0.on(cB, "contextmenu", ce)
							}
						},
						remove : function() {
							this._map = null;
							if (!this._container) {
								return
							}
							this._container.parentNode
									&& this._container.parentNode
											.removeChild(this._container);
							this._container._jsobj = null;
							this._container = null
						},
						_render : function() {
							this._container = am(this._map.container,
									"<div unselectable='on'></div>");
							if (this._visible == false) {
								a0.dom.hide(this._container)
							}
							return this._container
						},
						_setPosition : function() {
							this.setAnchor(this._opts.anchor)
						},
						setAnchor : function(cD) {
							if (this.anchorFixed || !aD(cD) || isNaN(cD)
									|| cD < BMAP_ANCHOR_TOP_LEFT
									|| cD > BMAP_ANCHOR_BOTTOM_RIGHT) {
								cD = this.defaultAnchor
							}
							this._opts = this._opts || {
								printable : false
							};
							this._opts.offset = this._opts.offset
									|| this.defaultOffset;
							var cC = this._opts.anchor;
							this._opts.anchor = cD;
							if (!this._container) {
								return
							}
							var cF = this._container;
							var T = this._opts.offset.width;
							var cE = this._opts.offset.height;
							cF.style.left = cF.style.top = cF.style.right = cF.style.bottom = "auto";
							switch (cD) {
							case BMAP_ANCHOR_TOP_LEFT:
								cF.style.top = cE + "px";
								cF.style.left = T + "px";
								break;
							case BMAP_ANCHOR_TOP_RIGHT:
								cF.style.top = cE + "px";
								cF.style.right = T + "px";
								break;
							case BMAP_ANCHOR_BOTTOM_LEFT:
								cF.style.bottom = cE + "px";
								cF.style.left = T + "px";
								break;
							case BMAP_ANCHOR_BOTTOM_RIGHT:
								cF.style.bottom = cE + "px";
								cF.style.right = T + "px";
								break;
							default:
								break
							}
							var cB = [ "TL", "TR", "BL", "BR" ];
							a0.dom.removeClass(this._container, "anchor"
									+ cB[cC]);
							a0.dom.addClass(this._container, "anchor" + cB[cD])
						},
						getAnchor : function() {
							return this._opts.anchor
						},
						setOffset : function(T) {
							if (!(T instanceof aA)) {
								return
							}
							this._opts = this._opts || {
								printable : false
							};
							this._opts.offset = new aA(T.width, T.height);
							if (!this._container) {
								return
							}
							this.setAnchor(this._opts.anchor)
						},
						getOffset : function() {
							return this._opts.offset
						},
						getDom : function() {
							return this._container
						},
						show : function() {
							if (this._visible == true) {
								return
							}
							this._visible = true;
							if (this._container) {
								a0.dom.show(this._container)
							}
						},
						hide : function() {
							if (this._visible == false) {
								return
							}
							this._visible = false;
							if (this._container) {
								a0.dom.hide(this._container)
							}
						},
						isPrintable : function() {
							return !!this._opts.printable
						},
						isVisible : function() {
							if (!this._container && !this._map) {
								return false
							}
							return !!this._visible
						}
					});
	window.BMAP_ANCHOR_TOP_LEFT = 0;
	window.BMAP_ANCHOR_TOP_RIGHT = 1;
	window.BMAP_ANCHOR_BOTTOM_LEFT = 2;
	window.BMAP_ANCHOR_BOTTOM_RIGHT = 3;
	window.BMAP_NAVIGATION_CONTROL_LARGE = 0;
	window.BMAP_NAVIGATION_CONTROL_SMALL = 1;
	window.BMAP_NAVIGATION_CONTROL_PAN = 2;
	window.BMAP_NAVIGATION_CONTROL_ZOOM = 3;
	function I(T) {
		cf.call(this);
		T = T || {};
		this._opts = {
			printable : false,
			showZoomInfo : true
		};
		a0.object.extend(this._opts, T);
		this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
		this.defaultOffset = new aA(10, 10);
		this.setAnchor(T.anchor);
		this.setType(T.type);
		this._asyncLoadCode()
	}
	a0.lang.inherits(I, cf, "NavigationControl");
	a0.extend(I.prototype, {
		initialize : function(T) {
			this._map = T;
			return this._container
		},
		setType : function(T) {
			if (aD(T) && T >= BMAP_NAVIGATION_CONTROL_LARGE
					&& T <= BMAP_NAVIGATION_CONTROL_ZOOM) {
				this._opts.type = T
			} else {
				this._opts.type = BMAP_NAVIGATION_CONTROL_LARGE
			}
		},
		getType : function() {
			return this._opts.type
		},
		_asyncLoadCode : function() {
			var T = this;
			cq.load("control", function() {
				T._asyncDraw()
			})
		}
	});
	function ah(T) {
		cf.call(this);
		T = T || {};
		this._opts = {
			printable : false
		};
		a0.object.extend(this._opts, T);
		this._copyrightCollection = [];
		this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
		this.defaultOffset = new aA(5, 2);
		this.setAnchor(T.anchor);
		this._canShow = true;
		this.blockInfoWindow = false;
		this._asyncLoadCode()
	}
	a0.lang.inherits(ah, cf, "CopyrightControl");
	a0.object
			.extend(
					ah.prototype,
					{
						initialize : function(T) {
							this._map = T;
							return this._container
						},
						addCopyright : function(cC) {
							if (!cC || !aD(cC.id) || isNaN(cC.id)) {
								return
							}
							var T = {
								bounds : null,
								content : ""
							};
							for ( var cB in cC) {
								T[cB] = cC[cB]
							}
							var cD = this.getCopyright(cC.id);
							if (cD) {
								for ( var cE in T) {
									cD[cE] = T[cE]
								}
							} else {
								this._copyrightCollection.push(T)
							}
						},
						getCopyright : function(cC) {
							for ( var cB = 0, T = this._copyrightCollection.length; cB < T; cB++) {
								if (this._copyrightCollection[cB].id == cC) {
									return this._copyrightCollection[cB]
								}
							}
						},
						getCopyrightCollection : function() {
							return this._copyrightCollection
						},
						removeCopyright : function(cC) {
							for ( var cB = 0, T = this._copyrightCollection.length; cB < T; cB++) {
								if (this._copyrightCollection[cB].id == cC) {
									r = this._copyrightCollection.splice(cB, 1);
									cB--;
									T = this._copyrightCollection.length
								}
							}
						},
						_asyncLoadCode : function() {
							var T = this;
							cq.load("control", function() {
								T._asyncDraw()
							})
						}
					});
	function cA(T) {
		cf.call(this);
		T = T || {};
		this._opts = {
			printable : false
		};
		this._opts = a0.extend(a0.extend(this._opts, {
			size : new aA(150, 150),
			padding : 5,
			isOpen : false,
			zoomInterval : 4
		}), T);
		this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
		this.defaultOffset = new aA(0, 0);
		this._btnWidth = 13;
		this._btnHeight = 13;
		this.setAnchor(T.anchor);
		this.setSize(this._opts.size);
		this._asyncLoadCode()
	}
	a0.lang.inherits(cA, cf, "OverviewMapControl");
	a0.extend(cA.prototype, {
		initialize : function(T) {
			this._map = T;
			return this._container
		},
		setAnchor : function(T) {
			cf.prototype.setAnchor.call(this, T)
		},
		changeView : function() {
			this.changeView._running = true;
			this._opts.isOpen = !this._opts.isOpen;
			if (!this._container) {
				this.changeView._running = false
			}
		},
		setSize : function(T) {
			if (!(T instanceof aA)) {
				T = new aA(150, 150)
			}
			T.width = T.width > 0 ? T.width : 150;
			T.height = T.height > 0 ? T.height : 150;
			this._opts.size = T
		},
		getSize : function() {
			return this._opts.size
		},
		isOpen : function() {
			return this._opts.isOpen
		},
		_asyncLoadCode : function() {
			var T = this;
			cq.load("control", function() {
				T._asyncDraw()
			})
		}
	});
	function bB(T) {
		cf.call(this);
		T = T || {};
		this._opts = {
			printable : false
		};
		this._opts = a0.object.extend(a0.object.extend(this._opts, {
			color : "black",
			unit : "metric"
		}), T);
		this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
		this.defaultOffset = new aA(81, 18);
		this.setAnchor(T.anchor);
		this._units = {
			metric : {
				name : "metric",
				conv : 1,
				incon : 1000,
				u1 : "米",
				u2 : "公里"
			},
			us : {
				name : "us",
				conv : 3.2808,
				incon : 5280,
				u1 : "英尺",
				u2 : "英里"
			}
		};
		if (!this._units[this._opts.unit]) {
			this._opts.unit = "metric"
		}
		this._scaleText = null;
		this._numberArray = {};
		this._asyncLoadCode()
	}
	window.BMAP_UNIT_METRIC = "metric";
	window.BMAP_UNIT_IMPERIAL = "us";
	a0.lang.inherits(bB, cf, "ScaleControl");
	a0.object.extend(bB.prototype, {
		initialize : function(T) {
			this._map = T;
			return this._container
		},
		setColor : function(T) {
			this._opts.color = T + ""
		},
		getColor : function() {
			return this._opts.color
		},
		setUnit : function(T) {
			this._opts.unit = this._units[T] && this._units[T].name
					|| this._opts.unit
		},
		getUnit : function() {
			return this._opts.unit
		},
		_asyncLoadCode : function() {
			var T = this;
			cq.load("control", function() {
				T._asyncDraw()
			})
		}
	});
	window.BMAP_MAPTYPE_CONTROL_HORIZONTAL = 0;
	window.BMAP_MAPTYPE_CONTROL_DROPDOWN = 1;
	function aE(T) {
		cf.call(this);
		T = T || {};
		this._opts = {
			printable : false,
			mapTypes : [ BMAP_NORMAL_MAP, BMAP_SATELLITE_MAP, BMAP_HYBRID_MAP,
					BMAP_PERSPECTIVE_MAP ],
			type : BMAP_MAPTYPE_CONTROL_HORIZONTAL
		};
		this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
		this.defaultOffset = new aA(10, 10);
		this.setAnchor(T.anchor);
		this._opts = a0.extend(a0.extend(this._opts, {
			offset : this.defaultOffset,
			enableSwitch : true
		}), T);
		if (aR(T.mapTypes)) {
			this._opts.mapTypes = T.mapTypes.slice(0)
		}
		this._asyncLoadCode()
	}
	a0.lang.inherits(aE, cf, "MapTypeControl");
	a0.object.extend(aE.prototype, {
		initialize : function(T) {
			this._map = T;
			return this._container
		},
		_asyncLoadCode : function() {
			var T = this;
			cq.load("control", function() {
				T._asyncDraw()
			})
		}
	});
	function cp(cB) {
		a0.lang.Class.call(this);
		this._opts = {
			container : null,
			cursor : "default"
		};
		this._opts = a0.extend(this._opts, cB);
		this._type = "contextmenu";
		this._map = null;
		this._container;
		this._shadow;
		this._left = 0;
		this._top = 0;
		this._items = [];
		this._rItems = [];
		this._dividers = [];
		this.curPixel = null;
		this.curPoint = null;
		this._isOpen = false;
		var T = this;
		cq.load("menu", function() {
			T._draw()
		})
	}
	a0.lang.inherits(cp, a0.lang.Class, "ContextMenu");
	a0.object.extend(cp.prototype, {
		initialize : function(cB, T) {
			this._map = cB;
			this._overlay = T || null
		},
		remove : function() {
			this._map = this._overlay = null
		},
		addItem : function(cC) {
			if (!cC || cC._type != "menuitem" || cC._text == ""
					|| cC._width <= 0) {
				return
			}
			for ( var cB = 0, T = this._items.length; cB < T; cB++) {
				if (this._items[cB] === cC) {
					return
				}
			}
			this._items.push(cC);
			this._rItems.push(cC)
		},
		removeItem : function(cC) {
			if (!cC || cC._type != "menuitem") {
				return
			}
			for ( var cB = 0, T = this._items.length; cB < T; cB++) {
				if (this._items[cB] === cC) {
					this._items[cB].remove();
					this._items.splice(cB, 1);
					T--
				}
			}
			for ( var cB = 0, T = this._rItems.length; cB < T; cB++) {
				if (this._rItems[cB] === cC) {
					this._rItems[cB].remove();
					this._rItems.splice(cB, 1);
					T--
				}
			}
		},
		addSeparator : function() {
			this._items.push({
				_type : "divider",
				_dIndex : this._dividers.length
			});
			this._dividers.push({
				dom : null
			})
		},
		removeSeparator : function(cB) {
			if (!this._dividers[cB]) {
				return
			}
			for ( var cC = 0, T = this._items.length; cC < T; cC++) {
				if (this._items[cC] && this._items[cC]._type == "divider"
						&& this._items[cC]._dIndex == cB) {
					this._items.splice(cC, 1);
					T--
				}
				if (this._items[cC] && this._items[cC]._type == "divider"
						&& this._items[cC]._dIndex > cB) {
					this._items[cC]._dIndex--
				}
			}
			this._dividers.splice(cB, 1)
		},
		getDom : function() {
			return this._container
		},
		show : function() {
			if (this._isOpen == true) {
				return
			}
			this._isOpen = true
		},
		hide : function() {
			if (this._isOpen == false) {
				return
			}
			this._isOpen = false
		},
		setCursor : function(T) {
			if (!T) {
				return
			}
			this._opts.cursor = T
		},
		getItem : function(T) {
			return this._rItems[T]
		}
	});
	function a6(cC, cD, cB) {
		if (!cC || !F(cD)) {
			return
		}
		a0.lang.Class.call(this);
		this._opts = {
			width : 100,
			id : ""
		};
		cB = cB || {};
		this._opts.width = (cB.width * 1) ? cB.width : 100;
		this._opts.id = cB.id ? cB.id : "";
		this._text = cC + "";
		this._callback = cD;
		this._map = null;
		this._type = "menuitem";
		this._contextmenu = null;
		this._container = null;
		this._enabled = true;
		var T = this;
		cq.load("menu", function() {
			T._draw()
		})
	}
	a0.lang.inherits(a6, a0.lang.Class, "MenuItem");
	a0.object.extend(a6.prototype, {
		initialize : function(T, cB) {
			this._map = T;
			this._contextmenu = cB
		},
		remove : function() {
			this._contextmenu = null;
			this._map = null
		},
		setText : function(T) {
			if (!T) {
				return
			}
			this._text = T + ""
		},
		getDom : function() {
			return this._container
		},
		enable : function() {
			this._enabled = true
		},
		disable : function() {
			this._enabled = false
		}
	});
	function bE(T, cB) {
		if (T && !cB) {
			cB = T
		}
		this._sw = this._ne = null;
		this._swLng = this._swLat = null;
		this._neLng = this._neLat = null;
		if (T) {
			this._sw = new b3(T.lng, T.lat);
			this._ne = new b3(cB.lng, cB.lat);
			this._swLng = T.lng;
			this._swLat = T.lat;
			this._neLng = cB.lng;
			this._neLat = cB.lat
		}
	}
	a0.object.extend(bE.prototype, {
		isEmpty : function() {
			return !this._sw || !this._ne
		},
		equals : function(T) {
			if (!(T instanceof bE) || this.isEmpty()) {
				return false
			}
			return this.getSouthWest().equals(T.getSouthWest())
					&& this.getNorthEast().equals(T.getNorthEast())
		},
		getSouthWest : function() {
			return this._sw
		},
		getNorthEast : function() {
			return this._ne
		},
		containsBounds : function(T) {
			if (!(T instanceof bE) || this.isEmpty() || T.isEmpty()) {
				return false
			}
			return (T._swLng > this._swLng && T._neLng < this._neLng
					&& T._swLat > this._swLat && T._neLat < this._neLat)
		},
		getCenter : function() {
			if (this.isEmpty()) {
				return null
			}
			return new b3((this._swLng + this._neLng) / 2,
					(this._swLat + this._neLat) / 2)
		},
		intersects : function(cC) {
			if (!(cC instanceof bE)) {
				return null
			}
			if (Math.max(cC._swLng, cC._neLng) < Math.min(this._swLng,
					this._neLng)
					|| Math.min(cC._swLng, cC._neLng) > Math.max(this._swLng,
							this._neLng)
					|| Math.max(cC._swLat, cC._neLat) < Math.min(this._swLat,
							this._neLat)
					|| Math.min(cC._swLat, cC._neLat) > Math.max(this._swLat,
							this._neLat)) {
				return null
			}
			var cE = Math.max(this._swLng, cC._swLng);
			var cB = Math.min(this._neLng, cC._neLng);
			var cD = Math.max(this._swLat, cC._swLat);
			var T = Math.min(this._neLat, cC._neLat);
			return new bE(new b3(cE, cD), new b3(cB, T))
		},
		containsPoint : function(T) {
			if (!(T instanceof b3) || this.isEmpty()) {
				return false
			}
			return (T.lng >= this._swLng && T.lng <= this._neLng
					&& T.lat >= this._swLat && T.lat <= this._neLat)
		},
		extend : function(T) {
			if (!(T instanceof b3)) {
				return
			}
			var cB = T.lng, cC = T.lat;
			if (!this._sw) {
				this._sw = new b3(0, 0)
			}
			if (!this._ne) {
				this._ne = new b3(0, 0)
			}
			if (!this._swLng || this._swLng > cB) {
				this._sw.lng = this._swLng = cB
			}
			if (!this._neLng || this._neLng < cB) {
				this._ne.lng = this._neLng = cB
			}
			if (!this._swLat || this._swLat > cC) {
				this._sw.lat = this._swLat = cC
			}
			if (!this._neLat || this._neLat < cC) {
				this._ne.lat = this._neLat = cC
			}
		},
		toSpan : function() {
			if (this.isEmpty()) {
				return new b3(0, 0)
			}
			return new b3(Math.abs(this._neLng - this._swLng), Math
					.abs(this._neLat - this._swLat))
		}
	});
	function b3(T, cB) {
		if (isNaN(T)) {
			T = bM(T);
			T = isNaN(T) ? 0 : T
		}
		if (bU(T)) {
			T = parseFloat(T)
		}
		if (isNaN(cB)) {
			cB = bM(cB);
			cB = isNaN(cB) ? 0 : cB
		}
		if (bU(cB)) {
			cB = parseFloat(cB)
		}
		this.lng = T;
		this.lat = cB
	}
	b3.isInRange = function(T) {
		return T && T.lng <= 180 && T.lng >= -180 && T.lat <= 74
				&& T.lat >= -74
	};
	b3.prototype.equals = function(T) {
		return T && this.lat == T.lat && this.lng == T.lng
	};
	function a5() {
	}
	a5.prototype.lngLatToPoint = function() {
		throw "lngLatToPoint方法未实现"
	};
	a5.prototype.pointToLngLat = function() {
		throw "pointToLngLat方法未实现"
	};
	function bW() {
	}
	a0
			.extend(
					bW,
					{
						num : {
							bj : {
								num : Math.sin(Math.PI / 4),
								num2 : Math.sin(Math.PI / 6)
							},
							gz : {
								num : Math.sin(Math.PI / 4),
								num2 : Math.sin(Math.PI / 4)
							},
							sz : {
								num : Math.sin(Math.PI / 4),
								num2 : Math.sin(Math.PI / 4)
							},
							sh : {
								num : Math.sin(Math.PI / 4),
								num2 : Math.sin(Math.PI / 4)
							}
						},
						correct_pts : {
							bj : [ {
								j : 116.305687,
								w : 39.990912,
								utm_x : 12947230.73,
								utm_y : 4836903.65,
								x : 630412,
								y : 547340
							}, {
								j : 116.381837,
								w : 40.000198,
								utm_x : 12955707.8,
								utm_y : 4838247.62,
								x : 667412,
								y : 561832
							}, {
								j : 116.430651,
								w : 39.995216,
								utm_x : 12961141.81,
								utm_y : 4837526.55,
								x : 686556,
								y : 573372
							}, {
								j : 116.474111,
								w : 39.976323,
								utm_x : 12965979.81,
								utm_y : 4834792.55,
								x : 697152,
								y : 586816
							}, {
								j : 116.280328,
								w : 39.953159,
								utm_x : 12944407.75,
								utm_y : 4831441.53,
								x : 603272,
								y : 549976
							}, {
								j : 116.316117,
								w : 39.952496,
								utm_x : 12948391.8,
								utm_y : 4831345.64,
								x : 618504,
								y : 557872
							}, {
								j : 116.350477,
								w : 39.938107,
								utm_x : 12952216.78,
								utm_y : 4829264.65,
								x : 627044,
								y : 568220
							}, {
								j : 116.432025,
								w : 39.947158,
								utm_x : 12961294.76,
								utm_y : 4830573.59,
								x : 666280,
								y : 584016
							}, {
								j : 116.46873,
								w : 39.949516,
								utm_x : 12965380.79,
								utm_y : 4830914.63,
								x : 683328,
								y : 591444
							}, {
								j : 116.280077,
								w : 39.913823,
								utm_x : 12944379.8,
								utm_y : 4825753.62,
								x : 586150,
								y : 558552
							}, {
								j : 116.308625,
								w : 39.91374,
								utm_x : 12947557.79,
								utm_y : 4825741.62,
								x : 598648,
								y : 564732
							}, {
								j : 116.369853,
								w : 39.912979,
								utm_x : 12954373.73,
								utm_y : 4825631.62,
								x : 624561,
								y : 578039
							}, {
								j : 116.433552,
								w : 39.914694,
								utm_x : 12961464.75,
								utm_y : 4825879.53,
								x : 652972,
								y : 591348
							}, {
								j : 116.457034,
								w : 39.914273,
								utm_x : 12964078.78,
								utm_y : 4825818.67,
								x : 663028,
								y : 596444
							}, {
								j : 116.490927,
								w : 39.914127,
								utm_x : 12967851.77,
								utm_y : 4825797.57,
								x : 677968,
								y : 604188
							}, {
								j : 116.483839,
								w : 39.877198,
								utm_x : 12967062.73,
								utm_y : 4820460.67,
								x : 658596,
								y : 610312
							}, {
								j : 116.405777,
								w : 39.864461,
								utm_x : 12958372.82,
								utm_y : 4818620.62,
								x : 619256,
								y : 596088
							}, {
								j : 116.35345,
								w : 39.859774,
								utm_x : 12952547.74,
								utm_y : 4817943.6,
								x : 594633,
								y : 585851
							}, {
								j : 116.403818,
								w : 39.9141,
								utm_x : 12958154.74,
								utm_y : 4825793.66,
								x : 639699,
								y : 585226
							}, {
								j : 116.318111,
								w : 39.891101,
								utm_x : 12948613.78,
								utm_y : 4822469.56,
								x : 592856,
								y : 571480
							}, {
								j : 116.413047,
								w : 39.907238,
								utm_x : 12959182.12,
								utm_y : 4824801.76,
								x : 640680,
								y : 588704
							}, {
								j : 116.390843,
								w : 39.906113,
								utm_x : 12956710.35,
								utm_y : 4824639.16,
								x : 630620,
								y : 584108
							}, {
								j : 116.446527,
								w : 39.899438,
								utm_x : 12962909.14,
								utm_y : 4823674.4,
								x : 651752,
								y : 597416
							}, {
								j : 116.388665,
								w : 39.95527,
								utm_x : 12956467.9,
								utm_y : 4831746.87,
								x : 650656,
								y : 572800
							}, {
								j : 116.398343,
								w : 39.939704,
								utm_x : 12957545.26,
								utm_y : 4829495.6,
								x : 648036,
								y : 578452
							}, {
								j : 116.355101,
								w : 39.973581,
								utm_x : 12952731.53,
								utm_y : 4834395.82,
								x : 643268,
								y : 560944
							}, {
								j : 116.380727,
								w : 39.88464,
								utm_x : 12955584.23,
								utm_y : 4821535.94,
								x : 616920,
								y : 586496
							}, {
								j : 116.360843,
								w : 39.946452,
								utm_x : 12953370.73,
								utm_y : 4830471.48,
								x : 635293,
								y : 568765
							}, {
								j : 116.340955,
								w : 39.973421,
								utm_x : 12951156.79,
								utm_y : 4834372.67,
								x : 638420,
								y : 558632
							}, {
								j : 116.322585,
								w : 40.023941,
								utm_x : 12949111.83,
								utm_y : 4841684.79,
								x : 652135,
								y : 543802
							}, {
								j : 116.356486,
								w : 39.883341,
								utm_x : 12952885.71,
								utm_y : 4821348.24,
								x : 606050,
								y : 581443
							}, {
								j : 116.339592,
								w : 39.992259,
								utm_x : 12951005.06,
								utm_y : 4837098.59,
								x : 645664,
								y : 554400
							}, {
								j : 116.3778,
								w : 39.86392,
								utm_x : 12955258.4,
								utm_y : 4818542.48,
								x : 606848,
								y : 590328
							}, {
								j : 116.377354,
								w : 39.964124,
								utm_x : 12955208.75,
								utm_y : 4833027.64,
								x : 649911,
								y : 568581
							}, {
								j : 116.361837,
								w : 39.963897,
								utm_x : 12953481.39,
								utm_y : 4832994.8,
								x : 643286,
								y : 565175
							}, {
								j : 116.441397,
								w : 39.939403,
								utm_x : 12962338.06,
								utm_y : 4829452.07,
								x : 666772,
								y : 587728
							}, {
								j : 116.359176,
								w : 40.006631,
								utm_x : 12953185.16,
								utm_y : 4839178.78,
								x : 660440,
								y : 555411
							} ],
							sz : [ {
								j : 113.88099,
								w : 22.58884,
								utm_x : 12677311.76,
								utm_y : 2565810.52,
								x : 569078,
								y : 532290
							}, {
								j : 113.902002,
								w : 22.566098,
								utm_x : 12679650.83,
								utm_y : 2563084.58,
								x : 568318,
								y : 545457
							}, {
								j : 113.869843,
								w : 22.577711,
								utm_x : 12676070.87,
								utm_y : 2564476.5,
								x : 561115,
								y : 532494
							}, {
								j : 113.943387,
								w : 22.555192,
								utm_x : 12684257.84,
								utm_y : 2561777.5,
								x : 579437,
								y : 558427
							}, {
								j : 113.899505,
								w : 22.577052,
								utm_x : 12679372.86,
								utm_y : 2564397.51,
								x : 571923,
								y : 540181
							}, {
								j : 113.900376,
								w : 22.596431,
								utm_x : 12679469.82,
								utm_y : 2566720.51,
								x : 580142,
								y : 535463
							}, {
								j : 113.92101,
								w : 22.528931,
								utm_x : 12681766.81,
								utm_y : 2558630.58,
								x : 560296,
								y : 559780
							}, {
								j : 113.919672,
								w : 22.517839,
								utm_x : 12681617.86,
								utm_y : 2557301.57,
								x : 555296,
								y : 562549
							}, {
								j : 113.938716,
								w : 22.505569,
								utm_x : 12683737.86,
								utm_y : 2555831.55,
								x : 557349,
								y : 571072
							}, {
								j : 113.919203,
								w : 22.483494,
								utm_x : 12681565.66,
								utm_y : 2553187.17,
								x : 540853,
								y : 572118
							}, {
								j : 113.942875,
								w : 22.492046,
								utm_x : 12684200.84,
								utm_y : 2554211.57,
								x : 553296,
								y : 575994
							}, {
								j : 113.9567,
								w : 22.530183,
								utm_x : 12685739.85,
								utm_y : 2558780.59,
								x : 573378,
								y : 568442
							}, {
								j : 113.989102,
								w : 22.52697,
								utm_x : 12689346.86,
								utm_y : 2558395.61,
								x : 584796,
								y : 578728
							}, {
								j : 114.015467,
								w : 22.533746,
								utm_x : 12692281.83,
								utm_y : 2559207.53,
								x : 597126,
								y : 584075
							}, {
								j : 113.972977,
								w : 22.55702,
								utm_x : 12687551.81,
								utm_y : 2561996.58,
								x : 591204,
								y : 565924
							}, {
								j : 113.990368,
								w : 22.561133,
								utm_x : 12689487.79,
								utm_y : 2562489.51,
								x : 599240,
								y : 569528
							}, {
								j : 114.143745,
								w : 22.580535,
								utm_x : 12706561.83,
								utm_y : 2564815,
								x : 663830,
								y : 605622
							}, {
								j : 114.150374,
								w : 22.557704,
								utm_x : 12707299.77,
								utm_y : 2562078.56,
								x : 657016,
								y : 613828
							}, {
								j : 114.106905,
								w : 22.541858,
								utm_x : 12702460.77,
								utm_y : 2560179.58,
								x : 634284,
								y : 606528
							}, {
								j : 114.083927,
								w : 22.535065,
								utm_x : 12699902.85,
								utm_y : 2559365.58,
								x : 623132,
								y : 602096
							}, {
								j : 114.049584,
								w : 22.517997,
								utm_x : 12696079.76,
								utm_y : 2557320.5,
								x : 603390,
								y : 597564
							}, {
								j : 114.056304,
								w : 22.542425,
								utm_x : 12696827.84,
								utm_y : 2560247.52,
								x : 615980,
								y : 592534
							}, {
								j : 114.051552,
								w : 22.551321,
								utm_x : 12696298.84,
								utm_y : 2561313.59,
								x : 617887,
								y : 588719
							}, {
								j : 114.096377,
								w : 22.559064,
								utm_x : 12701288.79,
								utm_y : 2562241.55,
								x : 637568,
								y : 598739
							}, {
								j : 114.135858,
								w : 22.575851,
								utm_x : 12705683.84,
								utm_y : 2564253.55,
								x : 659024,
								y : 604806
							}, {
								j : 114.092029,
								w : 22.575592,
								utm_x : 12700804.77,
								utm_y : 2564222.51,
								x : 642776,
								y : 592932
							}, {
								j : 114.054795,
								w : 22.570617,
								utm_x : 12696659.85,
								utm_y : 2563626.21,
								x : 626988,
								y : 584142
							}, {
								j : 114.03075,
								w : 22.553687,
								utm_x : 12693983.15,
								utm_y : 2561597.14,
								x : 611068,
								y : 582552
							}, {
								j : 114.074153,
								w : 22.554124,
								utm_x : 12698814.8,
								utm_y : 2561649.51,
								x : 627380,
								y : 594008
							}, {
								j : 113.926721,
								w : 22.546028,
								utm_x : 12682402.56,
								utm_y : 2560679.29,
								x : 569340,
								y : 556468
							}, {
								j : 113.938125,
								w : 22.538296,
								utm_x : 12683672.07,
								utm_y : 2559752.74,
								x : 570548,
								y : 561748
							} ],
							gz : [ {
								j : 113.335098,
								w : 23.147289,
								utm_x : 12616542.68,
								utm_y : 2632892.7,
								x : 1129109,
								y : 1073920
							}, {
								j : 113.320932,
								w : 23.146956,
								utm_x : 12614965.71,
								utm_y : 2632852.62,
								x : 1125620,
								y : 1071640
							}, {
								j : 113.321435,
								w : 23.140119,
								utm_x : 12615021.7,
								utm_y : 2632029.65,
								x : 1124032,
								y : 1072882
							}, {
								j : 113.321471,
								w : 23.119165,
								utm_x : 12615025.71,
								utm_y : 2629507.68,
								x : 1118932,
								y : 1076530
							}, {
								j : 113.340201,
								w : 23.118616,
								utm_x : 12617110.75,
								utm_y : 2629441.61,
								x : 1123238,
								y : 1079667
							}, {
								j : 113.358068,
								w : 23.116323,
								utm_x : 12619099.71,
								utm_y : 2629165.66,
								x : 1126968,
								y : 1083116
							}, {
								j : 113.357529,
								w : 23.131271,
								utm_x : 12619039.71,
								utm_y : 2630964.68,
								x : 1130508,
								y : 1080440
							}, {
								j : 113.365811,
								w : 23.150595,
								utm_x : 12619961.67,
								utm_y : 2633290.66,
								x : 1137205,
								y : 1078567
							}, {
								j : 113.294145,
								w : 23.118467,
								utm_x : 12611983.76,
								utm_y : 2629423.68,
								x : 1112245,
								y : 1072043
							}, {
								j : 113.28615,
								w : 23.121525,
								utm_x : 12611093.75,
								utm_y : 2629791.7,
								x : 1110993,
								y : 1070197
							}, {
								j : 113.307152,
								w : 23.055497,
								utm_x : 12613431.71,
								utm_y : 2621847.21,
								x : 1100144,
								y : 1085123
							}, {
								j : 113.333445,
								w : 23.052687,
								utm_x : 12616358.66,
								utm_y : 2621509.2,
								x : 1105784,
								y : 1089948
							}, {
								j : 113.347476,
								w : 23.048755,
								utm_x : 12617920.6,
								utm_y : 2621036.24,
								x : 1108099,
								y : 1093064
							}, {
								j : 113.385774,
								w : 23.036574,
								utm_x : 12622183.96,
								utm_y : 2619571.12,
								x : 1113850,
								y : 1101834
							}, {
								j : 113.364185,
								w : 22.89798,
								utm_x : 12619780.66,
								utm_y : 2602910.64,
								x : 1073186,
								y : 1123374
							}, {
								j : 113.404577,
								w : 22.906481,
								utm_x : 12624277.13,
								utm_y : 2603932.06,
								x : 1084888,
								y : 1128692
							}, {
								j : 113.430856,
								w : 22.913156,
								utm_x : 12627202.52,
								utm_y : 2604734.12,
								x : 1092892,
								y : 1131761
							}, {
								j : 113.384554,
								w : 22.933021,
								utm_x : 12622048.15,
								utm_y : 2607121.32,
								x : 1086975,
								y : 1120403
							}, {
								j : 113.263566,
								w : 23.146333,
								utm_x : 12608579.68,
								utm_y : 2632777.63,
								x : 1111742,
								y : 1062098
							}, {
								j : 113.239213,
								w : 23.152996,
								utm_x : 12605868.69,
								utm_y : 2633579.69,
								x : 1107616,
								y : 1056740
							}, {
								j : 113.253865,
								w : 23.131628,
								utm_x : 12607499.76,
								utm_y : 2631007.65,
								x : 1105912,
								y : 1062966
							}, {
								j : 113.240767,
								w : 23.088434,
								utm_x : 12606041.68,
								utm_y : 2625809.7,
								x : 1092270,
								y : 1068184
							}, {
								j : 113.279628,
								w : 23.088284,
								utm_x : 12610367.72,
								utm_y : 2625791.65,
								x : 1101412,
								y : 1074883
							}, {
								j : 113.462271,
								w : 23.107058,
								utm_x : 12630699.66,
								utm_y : 2628050.7,
								x : 1148752,
								y : 1101736
							}, {
								j : 113.401618,
								w : 23.052957,
								utm_x : 12623947.73,
								utm_y : 2621541.68,
								x : 1121925,
								y : 1101535
							}, {
								j : 113.422504,
								w : 23.05905,
								utm_x : 12626272.77,
								utm_y : 2622274.61,
								x : 1128470,
								y : 1104049
							}, {
								j : 113.362506,
								w : 23.107149,
								utm_x : 12619593.75,
								utm_y : 2628061.65,
								x : 1125835,
								y : 1085505
							}, {
								j : 113.419629,
								w : 23.143176,
								utm_x : 12625952.73,
								utm_y : 2632397.61,
								x : 1148133,
								y : 1089052
							}, {
								j : 113.23315,
								w : 23.062251,
								utm_x : 12605193.75,
								utm_y : 2622659.67,
								x : 1084184,
								y : 1071368
							}, {
								j : 113.314525,
								w : 23.101412,
								utm_x : 12614252.48,
								utm_y : 2627371.29,
								x : 1113011,
								y : 1078426
							}, {
								j : 113.307947,
								w : 23.131369,
								utm_x : 12613520.21,
								utm_y : 2630976.47,
								x : 1118622,
								y : 1072198
							} ],
							sh : [ {
								j : 121.524411,
								w : 31.245875,
								utm_x : 13528182.75,
								utm_y : 3642354.51,
								x : 1086581,
								y : 1065728
							}, {
								j : 121.419229,
								w : 31.244887,
								utm_x : 13516473.81,
								utm_y : 3642226.51,
								x : 1032616,
								y : 1029148
							}, {
								j : 121.405637,
								w : 31.237871,
								utm_x : 13514960.74,
								utm_y : 3641317.54,
								x : 1022724,
								y : 1027244
							}, {
								j : 121.415348,
								w : 31.222879,
								utm_x : 13516041.78,
								utm_y : 3639375.47,
								x : 1018548,
								y : 1036980
							}, {
								j : 121.422561,
								w : 31.224261,
								utm_x : 13516844.73,
								utm_y : 3639554.48,
								x : 1022976,
								y : 1038908
							}, {
								j : 121.412581,
								w : 31.204148,
								utm_x : 13515733.75,
								utm_y : 3636949.48,
								x : 1006568,
								y : 1043696
							}, {
								j : 121.443025,
								w : 31.206202,
								utm_x : 13519122.8,
								utm_y : 3637215.49,
								x : 1022656,
								y : 1053704
							}, {
								j : 121.524061,
								w : 31.246917,
								utm_x : 13528143.79,
								utm_y : 3642489.52,
								x : 1082052,
								y : 1064124
							}, {
								j : 121.529343,
								w : 31.217769,
								utm_x : 13528731.78,
								utm_y : 3638713.59,
								x : 1072696,
								y : 1079064
							}, {
								j : 121.530268,
								w : 31.210341,
								utm_x : 13528834.75,
								utm_y : 3637751.53,
								x : 1068748,
								y : 1082416
							}, {
								j : 121.511601,
								w : 31.227303,
								utm_x : 13526756.73,
								utm_y : 3639948.53,
								x : 1069276,
								y : 1068716
							}, {
								j : 121.4966,
								w : 31.243614,
								utm_x : 13525086.81,
								utm_y : 3642061.58,
								x : 1071220,
								y : 1056805
							}, {
								j : 121.485021,
								w : 31.26138,
								utm_x : 13523797.82,
								utm_y : 3644363.54,
								x : 1075708,
								y : 1045540
							}, {
								j : 121.465114,
								w : 31.278803,
								utm_x : 13521581.76,
								utm_y : 3646621.48,
								x : 1073740,
								y : 1031268
							}, {
								j : 121.454784,
								w : 31.266566,
								utm_x : 13520431.82,
								utm_y : 3645035.58,
								x : 1063591,
								y : 1033191
							}, {
								j : 121.46851,
								w : 31.24951,
								utm_x : 13521959.81,
								utm_y : 3642825.48,
								x : 1060200,
								y : 1044520
							}, {
								j : 121.446384,
								w : 31.248422,
								utm_x : 13519496.73,
								utm_y : 3642684.51,
								x : 1048784,
								y : 1037750
							}, {
								j : 121.509499,
								w : 31.246469,
								utm_x : 13526522.73,
								utm_y : 3642431.47,
								x : 1079309,
								y : 1060105
							}, {
								j : 121.481643,
								w : 31.283943,
								utm_x : 13523421.78,
								utm_y : 3647287.68,
								x : 1087096,
								y : 1035304
							}, {
								j : 121.508054,
								w : 31.280609,
								utm_x : 13526361.87,
								utm_y : 3646855.56,
								x : 1098432,
								y : 1045648
							}, {
								j : 121.493854,
								w : 31.19121,
								utm_x : 13524781.12,
								utm_y : 3635274.07,
								x : 1039624,
								y : 1077288
							}, {
								j : 121.500079,
								w : 31.185541,
								utm_x : 13525474.09,
								utm_y : 3634540.04,
								x : 1039960,
								y : 1081640
							}, {
								j : 121.484482,
								w : 31.202846,
								utm_x : 13523737.82,
								utm_y : 3636780.87,
								x : 1041388,
								y : 1069232
							}, {
								j : 121.480877,
								w : 31.189587,
								utm_x : 13523336.51,
								utm_y : 3635063.92,
								x : 1032484,
								y : 1073640
							}, {
								j : 121.502652,
								w : 31.195209,
								utm_x : 13525760.52,
								utm_y : 3635791.9,
								x : 1046384,
								y : 1078728
							} ]
						},
						getLnglatIndex : function(cD, cH, cG) {
							var cC = 0;
							var cB = 0;
							var cI = 10000000, cF = 1000000000;
							for ( var cE = 0; cE < this.correct_pts[cD].length; cE++) {
								var T = this.getDis(this.correct_pts[cD][cE].x,
										this.correct_pts[cD][cE].y, cH, cG);
								if (T < cF) {
									if (T < cI) {
										cF = cI;
										cI = T;
										cB = cC;
										cC = cE
									} else {
										sedMinDis = T;
										cB = cE
									}
								}
							}
							return {
								lt : cC,
								rb : cB
							}
						},
						getOMapIndex_mm : function(cD, cI, cH) {
							var cC = 0;
							var cB = 0;
							var cG = 1294723000, cF = 1294723000;
							for ( var cE = 0; cE < this.correct_pts[cD].length; cE++) {
								var T = this.getDis(
										this.correct_pts[cD][cE].utm_x,
										this.correct_pts[cD][cE].utm_y, cI, cH);
								if (T < cF) {
									if (T < cG) {
										cF = cG;
										cG = T;
										cB = cC;
										cC = cE
									} else {
										sedMinDis = T;
										cB = cE
									}
								}
							}
							return {
								lt : cC,
								rb : cB
							}
						},
						getDis : function(T, cD, cB, cC) {
							return Math.abs(T - cB) + Math.abs(cD - cC)
						},
						toMap : function(cD, T, cE) {
							var cB = (T - cE) * this.num[cD].num;
							var cC = (T + cE) * this.num[cD].num
									* this.num[cD].num2;
							return {
								x : cB,
								y : cC
							}
						},
						fromMap : function(cD, T, cE) {
							cE = cE / this.num[cD].num2;
							var cB = (T + cE) / (this.num[cD].num * 2);
							var cC = (cE - T) / (this.num[cD].num * 2);
							return {
								x : cB,
								y : cC
							}
						},
						getDgPix_mm : function(cE, cJ, cF) {
							var cI = this.fromMap(cE,
									this.correct_pts[cE][cJ].x,
									this.correct_pts[cE][cJ].y);
							var cG = this.fromMap(cE,
									this.correct_pts[cE][cF].x,
									this.correct_pts[cE][cF].y);
							var cO = cI.x, cB = cI.y;
							var cN = cG.x, T = cG.y;
							var cL = this.correct_pts[cE][cJ].utm_x, cD = this.correct_pts[cE][cJ].utm_y;
							var cH = this.correct_pts[cE][cF].utm_x, cC = this.correct_pts[cE][cF].utm_y;
							var cM = Math.abs((cH - cL) * 100000 / (cN - cO));
							var cK = Math.abs((cC - cD) * 100000 / (T - cB));
							return {
								j : cM,
								w : cK,
								x : 100000 / cM,
								y : 100000 / cK
							}
						},
						getPx_mm : function(cR, cN, cM, cE, cD) {
							var cC = this.correct_pts[cR][cE];
							var T = this.correct_pts[cR][cE];
							var cK = this.getDgPix_mm(cR, cE, cD);
							var cG = this.fromMap(cR, cC.x, cC.y);
							var cF = T.utm_x, cT = T.utm_y;
							var cS = cN, cL = cM;
							var cQ = cG.x;
							var cB = cG.y;
							var cI = cS - cF, cP = cL - cT;
							var cJ = cI * cK.x + cQ;
							var cH = -cP * cK.y + cB;
							var cO = this.toMap(cR, cJ, cH);
							return cO
						},
						getJw_mm : function(cP, cK, cJ, cF, cE) {
							var cI = this.correct_pts[cP][cF];
							var cB = this.correct_pts[cP][cF];
							var cL = this.getDgPix_mm(cP, cF, cE);
							var cN = this.fromMap(cP, cK, cJ);
							var cD = this.fromMap(cP, cI.x, cI.y);
							var cG = cB.utm_x, cQ = cB.utm_y;
							var cO = cD.x;
							var cC = cD.y;
							var cR = cN.x - cO, cM = cC - cN.y;
							var cH = cR / cL.x + cG;
							var T = cM / cL.y + cQ;
							return {
								lng : cH,
								lat : T
							}
						},
						getOMap_pts : function(cB, T) {
							return this.getOMap_index(cB, T.lng, T.lat, T.lt,
									T.rb)
						},
						getMapJw_pts : function(cB, T) {
							return this.getMapJw_index(cB, T.lng,
									9998336 - T.lat, T.lt, T.rb)
						},
						getOMap_index : function(cG, cF, cE, T, cD) {
							if (!T || !cD) {
								var cB = this.getOMapIndex_mm(cG, cF, cE)
							} else {
								var cB = {
									lt : T,
									rb : cD
								}
							}
							var cC = this.getPx_mm(cG, cF, cE, cB.lt, cB.rb);
							return {
								x : Math.floor(cC.x),
								y : 9998336 - Math.floor(cC.y),
								lt : cB.lt,
								rb : cB.rb
							}
						},
						getMapJw_index : function(cF, cC, cG, cB, cE) {
							if (!cB || !cE) {
								var cD = this.getLnglatIndex(cF, cC, cG)
							} else {
								var cD = {
									lt : cB,
									rb : cE
								}
							}
							var T = this.getJw_mm(cF, cC, cG, cD.lt, cD.rb);
							return {
								lng : T.lng,
								lat : T.lat,
								lt : cD.lt,
								rb : cD.rb
							}
						}
					});
	function a2() {
	}
	a2.prototype = new a5();
	a0.extend(a2,
			{
				EARTHRADIUS : 6370996.81,
				MCBAND : [ 12890594.86, 8362377.87, 5591021, 3481989.83,
						1678043.12, 0 ],
				LLBAND : [ 75, 60, 45, 30, 15, 0 ],
				MC2LL : [
						[ 1.410526172116255e-8, 0.00000898305509648872,
								-1.9939833816331, 200.9824383106796,
								-187.2403703815547, 91.6087516669843,
								-23.38765649603339, 2.57121317296198,
								-0.03801003308653, 17337981.2 ],
						[ -7.435856389565537e-9, 0.000008983055097726239,
								-0.78625201886289, 96.32687599759846,
								-1.85204757529826, -59.36935905485877,
								47.40033549296737, -16.50741931063887,
								2.28786674699375, 10260144.86 ],
						[ -3.030883460898826e-8, 0.00000898305509983578,
								0.30071316287616, 59.74293618442277,
								7.357984074871, -25.38371002664745,
								13.45380521110908, -3.29883767235584,
								0.32710905363475, 6856817.37 ],
						[ -1.981981304930552e-8, 0.000008983055099779535,
								0.03278182852591, 40.31678527705744,
								0.65659298677277, -4.44255534477492,
								0.85341911805263, 0.12923347998204,
								-0.04625736007561, 4482777.06 ],
						[ 3.09191371068437e-9, 0.000008983055096812155,
								0.00006995724062, 23.10934304144901,
								-0.00023663490511, -0.6321817810242,
								-0.00663494467273, 0.03430082397953,
								-0.00466043876332, 2555164.4 ],
						[ 2.890871144776878e-9, 0.000008983055095805407,
								-3.068298e-8, 7.47137025468032,
								-0.00000353937994, -0.02145144861037,
								-0.00001234426596, 0.00010322952773,
								-0.00000323890364, 826088.5 ] ],
				LL2MC : [
						[ -0.0015702102444, 111320.7020616939,
								1704480524535203, -10338987376042340,
								26112667856603880, -35149669176653700,
								26595700718403920, -10725012454188240,
								1800819912950474, 82.5 ],
						[ 0.0008277824516172526, 111320.7020463578,
								647795574.6671607, -4082003173.641316,
								10774905663.51142, -15171875531.51559,
								12053065338.62167, -5124939663.577472,
								913311935.9512032, 67.5 ],
						[ 0.00337398766765, 111320.7020202162,
								4481351.045890365, -23393751.19931662,
								79682215.47186455, -115964993.2797253,
								97236711.15602145, -43661946.33752821,
								8477230.501135234, 52.5 ],
						[ 0.00220636496208, 111320.7020209128,
								51751.86112841131, 3796837.749470245,
								992013.7397791013, -1221952.21711287,
								1340652.697009075, -620943.6990984312,
								144416.9293806241, 37.5 ],
						[ -0.0003441963504368392, 111320.7020576856,
								278.2353980772752, 2485758.690035394,
								6070.750963243378, 54821.18345352118,
								9540.606633304236, -2710.55326746645,
								1405.483844121726, 22.5 ],
						[ -0.0003218135878613132, 111320.7020701615,
								0.00369383431289, 823725.6402795718,
								0.46104986909093, 2351.343141331292,
								1.58060784298199, 8.77738589078284,
								0.37238884252424, 7.45 ] ],
				getDistanceByMC : function(cF, cD) {
					if (!cF || !cD) {
						return 0
					}
					var cB, cE, T, cC;
					cF = this.convertMC2LL(cF);
					if (!cF) {
						return 0
					}
					cB = this.toRadians(cF.lng);
					cE = this.toRadians(cF.lat);
					cD = this.convertMC2LL(cD);
					if (!cD) {
						return 0
					}
					T = this.toRadians(cD.lng);
					cC = this.toRadians(cD.lat);
					return this.getDistance(cB, T, cE, cC)
				},
				getDistanceByLL : function(cF, cD) {
					if (!cF || !cD) {
						return 0
					}
					cF.lng = this.getLoop(cF.lng, -180, 180);
					cF.lat = this.getRange(cF.lat, -74, 74);
					cD.lng = this.getLoop(cD.lng, -180, 180);
					cD.lat = this.getRange(cD.lat, -74, 74);
					var cB, T, cE, cC;
					cB = this.toRadians(cF.lng);
					cE = this.toRadians(cF.lat);
					T = this.toRadians(cD.lng);
					cC = this.toRadians(cD.lat);
					return this.getDistance(cB, T, cE, cC)
				},
				convertMC2LL : function(cB) {
					var cC, cE;
					cC = new b3(Math.abs(cB.lng), Math.abs(cB.lat));
					for ( var cD = 0; cD < this.MCBAND.length; cD++) {
						if (cC.lat >= this.MCBAND[cD]) {
							cE = this.MC2LL[cD];
							break
						}
					}
					var T = this.convertor(cB, cE);
					var cB = new b3(T.lng.toFixed(6), T.lat.toFixed(6));
					return cB
				},
				convertLL2MC : function(T) {
					var cB, cD;
					T.lng = this.getLoop(T.lng, -180, 180);
					T.lat = this.getRange(T.lat, -74, 74);
					cB = new b3(T.lng, T.lat);
					for ( var cC = 0; cC < this.LLBAND.length; cC++) {
						if (cB.lat >= this.LLBAND[cC]) {
							cD = this.LL2MC[cC];
							break
						}
					}
					if (!cD) {
						for ( var cC = this.LLBAND.length - 1; cC >= 0; cC--) {
							if (cB.lat <= -this.LLBAND[cC]) {
								cD = this.LL2MC[cC];
								break
							}
						}
					}
					var cE = this.convertor(T, cD);
					var T = new b3(cE.lng.toFixed(2), cE.lat.toFixed(2));
					return T
				},
				convertor : function(cC, cD) {
					if (!cC || !cD) {
						return
					}
					var T = cD[0] + cD[1] * Math.abs(cC.lng);
					var cB = Math.abs(cC.lat) / cD[9];
					var cE = cD[2] + cD[3] * cB + cD[4] * cB * cB + cD[5] * cB
							* cB * cB + cD[6] * cB * cB * cB * cB + cD[7] * cB
							* cB * cB * cB * cB + cD[8] * cB * cB * cB * cB
							* cB * cB;
					T *= (cC.lng < 0 ? -1 : 1);
					cE *= (cC.lat < 0 ? -1 : 1);
					return new b3(T, cE)
				},
				getDistance : function(cB, T, cD, cC) {
					return this.EARTHRADIUS
							* Math.acos((Math.sin(cD) * Math.sin(cC) + Math
									.cos(cD)
									* Math.cos(cC) * Math.cos(T - cB)))
				},
				toRadians : function(T) {
					return Math.PI * T / 180
				},
				toDegrees : function(T) {
					return (180 * T) / Math.PI
				},
				getRange : function(cC, cB, T) {
					if (cB != null) {
						cC = Math.max(cC, cB)
					}
					if (T != null) {
						cC = Math.min(cC, T)
					}
					return cC
				},
				getLoop : function(cC, cB, T) {
					while (cC > T) {
						cC -= T - cB
					}
					while (cC < cB) {
						cC += T - cB
					}
					return cC
				}
			});
	a0.extend(a2.prototype, {
		lngLatToMercator : function(T) {
			return a2.convertLL2MC(T)
		},
		lngLatToPoint : function(T) {
			var cB = a2.convertLL2MC(T);
			return new bm(cB.lng, cB.lat)
		},
		mercatorToLngLat : function(T) {
			return a2.convertMC2LL(T)
		},
		pointToLngLat : function(T) {
			var cB = new b3(T.x, T.y);
			return a2.convertMC2LL(cB)
		},
		pointToPixel : function(cB, cF, cE, cD, cG) {
			if (!cB) {
				return
			}
			cB = this.lngLatToMercator(cB, cG);
			var cC = this.getZoomUnits(cF);
			var T = Math.round((cB.lng - cE.lng) / cC + cD.width / 2);
			var cH = Math.round((cE.lat - cB.lat) / cC + cD.height / 2);
			return new bm(T, cH)
		},
		pixelToPoint : function(T, cI, cE, cC, cB) {
			if (!T) {
				return
			}
			var cH = this.getZoomUnits(cI);
			var cF = cE.lng + cH * (T.x - cC.width / 2);
			var cD = cE.lat - cH * (T.y - cC.height / 2);
			var cG = new b3(cF, cD);
			return this.mercatorToLngLat(cG, cB)
		},
		getZoomUnits : function(T) {
			return Math.pow(2, (18 - T))
		}
	});
	function cu() {
	}
	cu.prototype = new a2();
	a0.extend(cu.prototype, {
		lngLatToMercator : function(cB, T) {
			return this._convert2DTo3D(T, a2.convertLL2MC(cB))
		},
		mercatorToLngLat : function(cB, T) {
			return a2.convertMC2LL(this._convert3DTo2D(T, cB))
		},
		lngLatToPoint : function(cC, T) {
			var cB = this._convert2DTo3D(T, a2.convertLL2MC(cC));
			return new bm(cB.lng, cB.lat)
		},
		pointToLngLat : function(cB, T) {
			var cC = new b3(cB.x, cB.y);
			return a2.convertMC2LL(this._convert3DTo2D(T, cC))
		},
		_convert2DTo3D : function(cC, T) {
			var cB = bW.getOMap_pts(cC || "bj", T);
			return new b3(cB.x, cB.y)
		},
		_convert3DTo2D : function(cC, T) {
			var cB = bW.getMapJw_pts(cC || "bj", T);
			return new b3(cB.lng, cB.lat)
		},
		getZoomUnits : function(T) {
			return Math.pow(2, (20 - T))
		}
	});
	function by() {
		this._type = "overlay"
	}
	a0.lang.inherits(by, a0.lang.Class, "Overlay");
	by.getZIndex = function(T) {
		T = T * 1;
		if (!T) {
			return 0
		}
		return (T * -100000) << 1
	};
	a0.extend(by.prototype, {
		_i : function(T) {
			if (!this.domElement && F(this.initialize)) {
				this.domElement = this.initialize(T);
				if (this.domElement) {
					this.domElement.style.WebkitUserSelect = "none"
				}
			}
			this.draw()
		},
		initialize : function(T) {
			throw "initialize方法未实现"
		},
		draw : function() {
			throw "draw方法未实现"
		},
		remove : function() {
			if (this.domElement && this.domElement.parentNode) {
				this.domElement.parentNode.removeChild(this.domElement)
			}
			this.domElement = null;
			this.dispatchEvent(new a8("onremove"))
		},
		hide : function() {
			if (this.domElement) {
				a0.dom.hide(this.domElement)
			}
		},
		show : function() {
			if (this.domElement) {
				a0.dom.show(this.domElement)
			}
		},
		isVisible : function() {
			if (!this.domElement) {
				return false
			}
			if (this.domElement.style.display == "none"
					|| this.domElement.style.visibility == "hidden") {
				return false
			}
			return true
		}
	});
	BMap.register(function(cC) {
		var T = cC.temp;
		T.overlayDiv = cC.overlayDiv = cB(cC.platform, 200);
		cC._panes.floatPane = cB(T.overlayDiv, 800);
		cC._panes.markerMouseTarget = cB(T.overlayDiv, 700);
		cC._panes.floatShadow = cB(T.overlayDiv, 600);
		cC._panes.labelPane = cB(T.overlayDiv, 500);
		cC._panes.markerPane = cB(T.overlayDiv, 400);
		cC._panes.markerShadow = cB(T.overlayDiv, 300);
		cC._panes.mapPane = cB(T.overlayDiv, 200);
		function cB(cD, cG) {
			var cF = V("div"), cE = cF.style;
			cE.position = "absolute";
			cE.top = cE.left = cE.width = cE.height = "0";
			cE.zIndex = cG;
			cD.appendChild(cF);
			return cF
		}
	});
	function S() {
		a0.lang.Class.call(this);
		by.call(this);
		this.map = null;
		this._visible = true;
		this.infoWindow = null;
		this._dblclickTime = 0
	}
	a0.lang.inherits(S, by, "OverlayInternal");
	a0.extend(S.prototype, {
		initialize : function(T) {
			this.map = T;
			a0.lang.Class.call(this, this.guid);
			return null
		},
		getMap : function() {
			return this.map
		},
		draw : function() {
		},
		remove : function() {
			this.map = null;
			a0.lang.decontrol(this.guid);
			by.prototype.remove.call(this)
		},
		hide : function() {
			if (this._visible == false) {
				return
			}
			this._visible = false
		},
		show : function() {
			if (this._visible == true) {
				return
			}
			this._visible = true
		},
		isVisible : function() {
			if (!this.domElement) {
				return false
			}
			return !!this._visible
		},
		getContainer : function() {
			return this.domElement
		},
		setConfig : function(cB) {
			cB = cB || {};
			for ( var T in cB) {
				this._config[T] = cB[T]
			}
		},
		setZIndex : function(T) {
			this.zIndex = T
		},
		enableMassClear : function() {
			this._config.enableMassClear = true
		},
		disableMassClear : function() {
			this._config.enableMassClear = false
		},
		addContextMenu : function(T) {
			this._menu = T
		},
		removeContextMenu : function(T) {
			this._menu = null
		}
	});
	function ci() {
		this.map = null;
		this._overlays = {};
		this._customOverlays = []
	}
	BMap
			.register(function(cB) {
				var T = new ci();
				T.map = cB;
				cB._overlays = T._overlays;
				cB._customOverlays = T._customOverlays;
				cB.addEventListener("load", function(cC) {
					T.draw(cC)
				});
				cB.addEventListener("moveend", function(cC) {
					T.draw(cC)
				});
				if (a0.browser.ie && a0.browser.ie < 8
						|| document.compatMode == "BackCompat") {
					cB.addEventListener("zoomend", function(cC) {
						setTimeout(function() {
							T.draw(cC)
						}, 20)
					})
				} else {
					cB.addEventListener("zoomend", function(cC) {
						T.draw(cC)
					})
				}
				cB.addEventListener("maptypechange", function(cC) {
					T.draw(cC)
				});
				cB
						.addEventListener(
								"addoverlay",
								function(cG) {
									var cD = cG.target;
									if (cD instanceof S) {
										if (!T._overlays[cD.guid]) {
											T._overlays[cD.guid] = cD
										}
									} else {
										var cF = false;
										for ( var cE = 0, cC = T._customOverlays.length; cE < cC; cE++) {
											if (T._customOverlays[cE] === cD) {
												cF = true;
												break
											}
										}
										if (!cF) {
											T._customOverlays.push(cD)
										}
									}
								});
				cB
						.addEventListener(
								"removeoverlay",
								function(cF) {
									var cD = cF.target;
									if (cD instanceof S) {
										delete T._overlays[cD.guid]
									} else {
										for ( var cE = 0, cC = T._customOverlays.length; cE < cC; cE++) {
											if (T._customOverlays[cE] === cD) {
												T._customOverlays.splice(cE, 1);
												break
											}
										}
									}
								});
				cB
						.addEventListener(
								"clearoverlays",
								function(cF) {
									this.closeInfoWindow();
									for ( var cE in T._overlays) {
										if (T._overlays[cE]._config.enableMassClear) {
											T._overlays[cE].remove();
											delete T._overlays[cE]
										}
									}
									for ( var cD = 0, cC = T._customOverlays.length; cD < cC; cD++) {
										if (T._customOverlays[cD].enableMassClear != false) {
											T._customOverlays[cD].remove();
											T._customOverlays[cD] = null;
											T._customOverlays.splice(cD, 1);
											cD--;
											cC--
										}
									}
								});
				cB.addEventListener("infowindowopen", function(cD) {
					var cC = this.infoWindow;
					if (cC) {
						a0.dom.hide(cC.popDom);
						a0.dom.hide(cC.shadowDom)
					}
				});
				cB.addEventListener("movestart", function() {
					if (this.getInfoWindow()) {
						this.getInfoWindow()._setOverflow()
					}
				});
				cB.addEventListener("moveend", function() {
					if (this.getInfoWindow()) {
						this.getInfoWindow()._resetOverflow()
					}
				})
			});
	ci.prototype.draw = function(cC) {
		for ( var cB in this._overlays) {
			this._overlays[cB].draw()
		}
		a0.array.each(this._customOverlays, function(cD) {
			cD.draw()
		});
		if (this.map.temp.infoWin) {
			this.map.temp.infoWin.setPosition()
		}
		if (BMap.DrawerSelector) {
			var T = BMap.DrawerSelector.getDrawer(this.map);
			T.setPalette()
		}
	};
	function cv(T) {
		S.call(this);
		this._config = {
			strokeColor : "#3a6bdb",
			strokeWeight : 5,
			strokeOpacity : 0.65,
			strokeStyle : "solid",
			enableMassClear : true,
			getParseTolerance : null,
			getParseCacheIndex : null,
			enableEditing : false,
			mouseOverTolerance : 15,
			use3DCoords : false,
			clickable : true
		};
		T = T || {};
		this.setConfig(T);
		if (this._config.strokeWeight <= 0) {
			this._config.strokeWeight = 5
		}
		if (this._config.strokeOpacity < 0 || this._config.strokeOpacity > 1) {
			this._config.strokeOpacity = 0.65
		}
		if (this._config.fillOpacity < 0 || this._config.fillOpacity > 1) {
			this._config.fillOpacity = 0.65
		}
		if (this._config.strokeStyle != "solid"
				&& this._config.strokeStyle != "dashed") {
			this._config.strokeStyle = "solid"
		}
		if (b7(T.enableClicking)) {
			this._config.clickable = T.enableClicking
		}
		this.domElement = null;
		this._bounds = new BMap.Bounds(0, 0, 0, 0);
		this._parseCache = [];
		this.vertexMarkers = [];
		this._temp = {}
	}
	a0.lang.inherits(cv, S, "Graph");
	cv.getGraphPoints = function(cB) {
		var T = [];
		if (!cB) {
			return T
		}
		if (bU(cB)) {
			var cC = cB.split(";");
			a0.array.each(cC, function(cE) {
				var cD = cE.split(",");
				T.push(new b3(cD[0], cD[1]))
			})
		}
		if (cB.constructor == Array && cB.length > 0) {
			T = cB
		}
		return T
	};
	cv.parseTolerance = [ 0.09, 0.005, 0.0001, 0.00001 ];
	a0.extend(cv.prototype, {
		initialize : function(T) {
			this.map = T;
			return null
		},
		draw : function() {
			return;
			if (!this.domElement) {
				return
			}
			if (this._drawer) {
				this._drawer.setPath(this.domElement, this
						._getDisplayPixels(this.points))
			}
		},
		setPath : function(T) {
			this._parseCache.length = 0;
			this.points = cv.getGraphPoints(T).slice(0);
			this._calcBounds()
		},
		_calcBounds : function() {
			if (!this.points) {
				return
			}
			var T = this;
			T._bounds = new bE();
			a0.array.each(this.points, function(cB) {
				T._bounds.extend(cB)
			})
		},
		getPath : function() {
			return this.points
		},
		setPositionAt : function(cB, T) {
			if (!T || !this.points[cB]) {
				return
			}
			this._parseCache.length = 0;
			this.points[cB] = new b3(T.lng, T.lat);
			this._calcBounds()
		},
		setStrokeColor : function(T) {
			this._config.strokeColor = T
		},
		getStrokeColor : function() {
			return this._config.strokeColor
		},
		setStrokeWeight : function(T) {
			if (T > 0) {
				this._config.strokeWeight = T
			}
		},
		getStrokeWeight : function() {
			return this._config.strokeWeight
		},
		setStrokeOpacity : function(T) {
			if (!T || T > 1 || T < 0) {
				return
			}
			this._config.strokeOpacity = T
		},
		getStrokeOpacity : function() {
			return this._config.strokeOpacity
		},
		setFillOpacity : function(T) {
			if (T > 1 || T < 0) {
				return
			}
			this._config.fillOpacity = T
		},
		getFillOpacity : function() {
			return this._config.fillOpacity
		},
		setStrokeStyle : function(T) {
			if (T != "solid" && T != "dashed") {
				return
			}
			this._config.strokeStyle = T
		},
		getStrokeStyle : function() {
			return this._config.strokeStyle
		},
		setFillColor : function(T) {
			this._config.fillColor = T || ""
		},
		getFillColor : function() {
			return this._config.fillColor
		},
		getBounds : function() {
			return this._bounds
		},
		remove : function() {
			if (this.map) {
				this.map.removeEventListener("onmousemove",
						this._graphMouseEvent)
			}
			S.prototype.remove.call(this);
			this._parseCache.length = 0
		},
		enableEditing : function() {
			this._config.enableEditing = true
		},
		disableEditing : function() {
			this._config.enableEditing = false
		}
	});
	function k(T) {
		S.call(this);
		this.map = null;
		this.domElement = null;
		this._config = {
			width : 0,
			height : 0,
			offset : new aA(0, 0),
			opacity : 1,
			background : "transparent",
			lineStroke : 1,
			lineColor : "#000",
			lineStyle : "solid",
			point : null
		};
		this.setConfig(T);
		this.point = this._config.point
	}
	a0.lang.inherits(k, S, "Division");
	a0
			.extend(
					k.prototype,
					{
						_addDom : function() {
							var T = this._config;
							var cC = this.content;
							var cB = [ '<div class="BMap_Division" style="position:absolute;' ];
							cB.push("width:" + T.width + "px;display:block;");
							cB.push("overflow:hidden;");
							if (T.borderColor != "none") {
								cB
										.push("border:" + T.lineStroke + "px "
												+ T.lineStyle + " "
												+ T.lineColor + ";")
							}
							cB.push("opacity:" + T.opacity
									+ "; filter:(opacity=" + T.opacity * 100
									+ ")");
							cB.push("background:" + T.background + ";");
							cB.push('z-index:60;">');
							cB.push(cC);
							cB.push("</div>");
							this.domElement = am(
									this.map.getPanes().markerMouseTarget, cB
											.join(""))
						},
						initialize : function(T) {
							this.map = T;
							this._addDom();
							if (this.domElement) {
								a0.on(this.domElement, "mousedown",
										function(cB) {
											aI(cB)
										})
							}
							return this.domElement
						},
						draw : function() {
							var T = this.map
									.pointToOverlayPixel(this._config.point);
							this._config.offset = new aA(
									-Math.round(this._config.width / 2)
											- Math
													.round(this._config.lineStroke),
									-Math.round(this._config.height / 2)
											- Math
													.round(this._config.lineStroke));
							this.domElement.style.left = T.x
									+ this._config.offset.width + "px";
							this.domElement.style.top = T.y
									+ this._config.offset.height + "px"
						},
						getPosition : function() {
							return this._config.point
						},
						_getPixel : function(T) {
							return this.map.pointToPixel(this.getPosition())
						},
						setPosition : function(T) {
							this._config.point = T;
							this.draw()
						},
						setDimension : function(T, cB) {
							this._config.width = Math.round(T);
							this._config.height = Math.round(cB);
							if (this.domElement) {
								this.domElement.style.width = this._config.width
										+ "px";
								this.domElement.style.height = this._config.height
										+ "px";
								this.draw()
							}
						}
					});
	function J(cB, cC, cD) {
		if (!cB || !cC) {
			return
		}
		this.imageUrl = cB;
		this.size = cC;
		var T = new aA(Math.floor(cC.width / 2), Math.floor(cC.height / 2));
		var cE = {
			anchor : T,
			imageOffset : new aA(0, 0)
		};
		cD = cD || {};
		a0.extend(cE, cD);
		this.anchor = cE.anchor;
		this.imageOffset = cE.imageOffset;
		this.infoWindowAnchor = cD.infoWindowAnchor || this.anchor;
		this.printImageUrl = cD.printImageUrl || ""
	}
	var bv = J.prototype;
	bv.setImageUrl = function(T) {
		if (!T) {
			return
		}
		this.imageUrl = T
	};
	bv.setPrintImageUrl = function(T) {
		if (!T) {
			return
		}
		this.printImageUrl = T
	};
	bv.setSize = function(T) {
		if (!T) {
			return
		}
		this.size = new aA(T.width, T.height)
	};
	bv.setAnchor = function(T) {
		if (!T) {
			return
		}
		this.anchor = new aA(T.width, T.height)
	};
	bv.setImageOffset = function(T) {
		if (!T) {
			return
		}
		this.imageOffset = new aA(T.width, T.height)
	};
	bv.setInfoWindowAnchor = function(T) {
		if (!T) {
			return
		}
		this.infoWindowAnchor = new aA(T.width, T.height)
	};
	bv.toString = function() {
		return "Icon"
	};
	function bG(cC, cB) {
		a0.lang.Class.call(this);
		this.content = cC;
		this.map = null;
		this._config = {
			width : 0,
			height : 0,
			maxWidth : 600,
			offset : new aA(0, 0),
			title : "",
			maxContent : "",
			enableMaximize : false,
			enableAutoPan : true,
			enableCloseOnClick : true,
			margin : [ 10, 10, 40, 10 ],
			collisions : [ [ 10, 10 ], [ 10, 10 ], [ 10, 10 ], [ 10, 10 ] ],
			ifMaxScene : false,
			onClosing : function() {
				return true
			}
		};
		a0.extend(this._config, cB || {});
		if (this._config.width != 0) {
			if (this._config.width < 220) {
				this._config.width = 220
			}
			if (this._config.width > 730) {
				this._config.width = 730
			}
		}
		if (this._config.height != 0) {
			if (this._config.height < 60) {
				this._config.height = 60
			}
			if (this._config.height > 650) {
				this._config.height = 650
			}
		}
		if (this._config.maxWidth != 0) {
			if (this._config.maxWidth < 220) {
				this._config.maxWidth = 220
			}
			if (this._config.maxWidth > 730) {
				this._config.maxWidth = 730
			}
		}
		this.isWinMax = false;
		this.IMG_PATH = b2.imgPath;
		this.overlay = null;
		var T = this;
		cq.load("infowindow", function() {
			T._draw()
		})
	}
	a0.lang.inherits(bG, a0.lang.Class, "InfoWindow");
	a0.extend(bG.prototype, {
		setWidth : function(T) {
			if (!T && T != 0 || isNaN(T) || T < 0) {
				return
			}
			if (T != 0) {
				if (T < 220) {
					T = 220
				}
				if (T > 730) {
					T = 730
				}
			}
			this._config.width = T
		},
		setHeight : function(T) {
			if (!T && T != 0 || isNaN(T) || T < 0) {
				return
			}
			if (T != 0) {
				if (T < 60) {
					T = 60
				}
				if (T > 650) {
					T = 650
				}
			}
			this._config.height = T
		},
		setMaxWidth : function(T) {
			if (!T && T != 0 || isNaN(T) || T < 0) {
				return
			}
			if (T != 0) {
				if (T < 220) {
					T = 220
				}
				if (T > 730) {
					T = 730
				}
			}
			this._config.maxWidth = T
		},
		setTitle : function(T) {
			this._config.title = T
		},
		getTitle : function() {
			return this._config.title
		},
		setContent : function(T) {
			this.content = T
		},
		getContent : function() {
			return this.content
		},
		setMaxContent : function(T) {
			this._config.maxContent = T + ""
		},
		redraw : function() {
		},
		enableAutoPan : function() {
			this._config.enableAutoPan = true
		},
		disableAutoPan : function() {
			this._config.enableAutoPan = false
		},
		enableCloseOnClick : function() {
			this._config.enableCloseOnClick = true
		},
		disableCloseOnClick : function() {
			this._config.enableCloseOnClick = false
		},
		enableMaximize : function() {
			this._config.enableMaximize = true
		},
		disableMaximize : function() {
			this._config.enableMaximize = false
		},
		show : function() {
			this._visible = true
		},
		hide : function() {
			this._visible = false
		},
		close : function() {
			this.hide()
		},
		maximize : function() {
			this.isWinMax = true
		},
		restore : function() {
			this.isWinMax = false
		},
		isVisible : function() {
			return this.isOpen()
		},
		isOpen : function() {
			return false
		},
		getPosition : function() {
			if (this.overlay && this.overlay.getPosition) {
				return this.overlay.getPosition()
			}
		},
		getOffset : function() {
			return this._config.offset
		}
	});
	br.prototype.openInfoWindow = function(cD, T) {
		if (!(cD instanceof bG) || !(T instanceof b3)) {
			return
		}
		var cB = this.temp;
		if (!cB.marker) {
			var cC = new J(b2.imgPath + "blank.gif", {
				width : 1,
				height : 1
			});
			cB.marker = new Y(T, {
				icon : cC,
				width : 1,
				height : 1,
				offset : new aA(0, 0),
				infoWindowOffset : new aA(0, 0),
				clickable : false
			});
			cB.marker._fromMap = 1
		} else {
			cB.marker.setPosition(T)
		}
		this.addOverlay(cB.marker);
		cB.marker.openInfoWindow(cD)
	};
	br.prototype.closeInfoWindow = function() {
		var T = this.temp.infoWin || this.temp._infoWin;
		if (T && T.overlay) {
			T.overlay.closeInfoWindow()
		}
	};
	S.prototype.openInfoWindow = function(T) {
		if (this.map) {
			this.map.closeInfoWindow();
			T._visible = true;
			this.map.temp._infoWin = T;
			T.overlay = this;
			a0.lang.Class.call(T, T.guid)
		}
	};
	S.prototype.closeInfoWindow = function() {
		if (this.map && this.map.temp._infoWin) {
			this.map.temp._infoWin._visible = false;
			a0.lang.decontrol(this.map.temp._infoWin.guid);
			this.map.temp._infoWin = null
		}
	};
	function ab(cC, cB) {
		S.call(this);
		this.content = cC;
		this.map = null;
		this.domElement = null;
		this._config = {
			width : 0,
			offset : new aA(0, 0),
			styles : {
				backgroundColor : "#fff",
				border : "1px solid #f00",
				padding : "1px",
				whiteSpace : "nowrap",
				font : "12px " + b2.fontFamily,
				zIndex : "80",
				MozUserSelect : "none"
			},
			position : null,
			enableMassClear : true,
			clickable : true
		};
		cB = cB || {};
		this.setConfig(cB);
		if (this._config.width < 0) {
			this._config.width = 0
		}
		if (b7(cB.enableClicking)) {
			this._config.clickable = cB.enableClicking
		}
		this.point = this._config.position;
		var T = this;
		cq.load("marker", function() {
			T._draw()
		})
	}
	a0.lang.inherits(ab, S, "Label");
	a0.extend(ab.prototype, {
		getPosition : function() {
			if (this._marker) {
				return this._marker.getPosition()
			}
			return this.point
		},
		setPosition : function(T) {
			if (T instanceof b3 && !this.getMarker()) {
				this.point = this._config.position = new b3(T.lng, T.lat)
			}
		},
		setContent : function(T) {
			this.content = T
		},
		setOpacity : function(T) {
			if (T >= 0 && T <= 1) {
				this._config.opacity = T
			}
		},
		setOffset : function(T) {
			if (!(T instanceof aA)) {
				return
			}
			this._config.offset = new aA(T.width, T.height)
		},
		getOffset : function() {
			return this._config.offset
		},
		setStyle : function(T) {
			T = T || {};
			this._config.styles = a0.extend(this._config.styles, T)
		},
		setStyles : function(T) {
			return this.setStyle(T)
		},
		setTitle : function(T) {
			this._config.title = T || ""
		},
		getTitle : function() {
			return this._config.title
		},
		setMarker : function(T) {
			this._marker = T;
			if (T) {
				this.point = this._config.position = T.getPosition()
			} else {
				this.point = this._config.position = null
			}
		},
		getMarker : function() {
			return this._marker || null
		}
	});
	window.BMAP_ANIMATION_DROP = 1;
	window.BMAP_ANIMATION_BOUNCE = 2;
	var an = new J(b2.imgPath + "marker_red_sprite.png", new aA(19, 25), {
		anchor : new aA(10, 25),
		infoWindowAnchor : new aA(10, 0)
	});
	var al = new J(b2.imgPath + "marker_red_sprite.png", new aA(20, 11), {
		anchor : new aA(6, 11),
		imageOffset : new aA(-19, -13)
	});
	function Y(T, cC) {
		S.call(this);
		cC = cC || {};
		this.point = T;
		this.map = null;
		this._animation = null;
		this._config = {
			offset : new aA(0, 0),
			icon : an,
			shadow : al,
			title : "",
			label : null,
			baseZIndex : 0,
			clickable : true,
			zIndexFixed : false,
			isTop : false,
			enableMassClear : true,
			enableDragging : false,
			raiseOnDrag : false,
			restrictDraggingArea : false,
			draggingCursor : b2.draggingCursor
		};
		this.setConfig(cC);
		if (cC.icon && !cC.shadow) {
			this._config.shadow = null
		}
		if (b7(cC.enableClicking)) {
			this._config.clickable = cC.enableClicking
		}
		var cB = this;
		cq.load("marker", function() {
			cB._draw()
		})
	}
	Y.TOP_ZINDEX = by.getZIndex(-90) + 1000000;
	Y.DRAG_ZINDEX = Y.TOP_ZINDEX + 1000000;
	a0.lang.inherits(Y, S, "Marker");
	a0.extend(Y.prototype, {
		setIcon : function(T) {
			if (T instanceof J) {
				this._config.icon = T
			}
		},
		getIcon : function() {
			return this._config.icon
		},
		setShadow : function(T) {
			if (T instanceof J) {
				this._config.shadow = T
			}
		},
		getShadow : function() {
			return this._config.shadow
		},
		setLabel : function(T) {
			this._config.label = T || null
		},
		getLabel : function() {
			return this._config.label
		},
		enableDragging : function() {
			this._config.enableDragging = true
		},
		disableDragging : function() {
			this._config.enableDragging = false
		},
		getPosition : function() {
			return this.point
		},
		setPosition : function(T) {
			if (T instanceof b3) {
				this.point = new b3(T.lng, T.lat)
			}
		},
		setTop : function(cB, T) {
			this._config.isTop = !!cB;
			if (cB) {
				this._addi = T || 0
			}
		},
		setTitle : function(T) {
			this._config.title = T + ""
		},
		getTitle : function() {
			return this._config.title
		},
		setOffset : function(T) {
			if (T instanceof aA) {
				this._config.offset = T
			}
		},
		getOffset : function() {
			return this._config.offset
		},
		setAnimation : function(T) {
			this._animation = T
		}
	});
	function cd(T, cC) {
		cv.call(this, cC);
		cC = cC || {};
		this._config.fillOpacity = cC.fillOpacity ? cC.fillOpacity : 0.65;
		if (cC.fillColor == "") {
			this._config.fillColor = ""
		} else {
			this._config.fillColor = cC.fillColor ? cC.fillColor : "#fff"
		}
		this.setPath(T);
		var cB = this;
		cq.load("poly", function() {
			cB._draw()
		})
	}
	a0.lang.inherits(cd, cv, "Polygon");
	a0.extend(cd.prototype, {
		setPath : function(cB, T) {
			this._userPoints = cv.getGraphPoints(cB).slice(0);
			var cC = cv.getGraphPoints(cB).slice(0);
			if (cC.length > 1 && !cC[0].equals(cC[cC.length - 1])) {
				cC.push(new b3(cC[0].lng, cC[0].lat))
			}
			cv.prototype.setPath.call(this, cC, T)
		},
		setPositionAt : function(cB, T) {
			if (!this._userPoints[cB]) {
				return
			}
			this._userPoints[cB] = new b3(T.lng, T.lat);
			this.points[cB] = new b3(T.lng, T.lat);
			if (cB == 0
					&& !this.points[0]
							.equals(this.points[this.points.length - 1])) {
				this.points[this.points.length - 1] = new b3(T.lng, T.lat)
			}
			this._calcBounds()
		},
		getPath : function() {
			var T = this._userPoints;
			if (T.length == 0) {
				T = this.points
			}
			return T
		}
	});
	function f(T, cC) {
		cv.call(this, cC);
		this.setPath(T);
		var cB = this;
		cq.load("poly", function() {
			cB._draw()
		})
	}
	a0.lang.inherits(f, cv, "Polyline");
	function a(cB, T, cC) {
		this.point = cB;
		this.radius = Math.abs(T);
		cd.call(this, [], cC)
	}
	a.parseTolerance = [ 0.01, 0.0001, 0.00001, 0.000004 ];
	a0.lang.inherits(a, cd, "Circle");
	a0
			.extend(
					a.prototype,
					{
						initialize : function(T) {
							this.map = T;
							this.points = this._getPerimeterPoints(this.point,
									this.radius);
							this._calcBounds();
							return null
						},
						getCenter : function() {
							return this.point
						},
						setCenter : function(T, cB) {
							if (!T) {
								return
							}
							this.point = T
						},
						getRadius : function() {
							return this.radius
						},
						setRadius : function(T) {
							this.radius = Math.abs(T)
						},
						_getPerimeterPoints : function(T, cI) {
							if (!T || !cI || !this.map) {
								return []
							}
							var cB = this.map;
							var cF = T.lng, cD = T.lat;
							var cP = [];
							var cK = cI / 6378800, cH = (Math.PI / 180) * cD, cN = (Math.PI / 180)
									* cF;
							for ( var cG = 0; cG < 360; cG += 9) {
								var cE = (Math.PI / 180) * cG, cL = Math
										.asin(Math.sin(cH) * Math.cos(cK)
												+ Math.cos(cH) * Math.sin(cK)
												* Math.cos(cE)), cJ = Math
										.atan2(Math.sin(cE) * Math.sin(cK)
												* Math.cos(cH), Math.cos(cK)
												- Math.sin(cH) * Math.sin(cL)), cM = ((cN
										- cJ + Math.PI) % (2 * Math.PI))
										- Math.PI, cO = new b3(cM
										* (180 / Math.PI), cL * (180 / Math.PI));
								cP.push(cO)
							}
							var cC = cP[0];
							cP.push(new b3(cC.lng, cC.lat));
							return cP
						}
					});
	function bI(T) {
		this.map = T;
		this.mapTypeLayers = [];
		this.tileLayers = [];
		this.bufferNumber = 300;
		this.realBufferNumber = 0;
		this.mapTiles = {};
		this.bufferTiles = {};
		this.numLoading = 0;
		this._mapTypeLayerContainer = this._createDiv(1);
		this._normalLayerContainer = this._createDiv(2);
		T.platform.appendChild(this._mapTypeLayerContainer);
		T.platform.appendChild(this._normalLayerContainer)
	}
	BMap.register(function(cB) {
		var T = new bI(cB);
		T.initialize()
	});
	a0.extend(bI.prototype, {
		initialize : function() {
			var T = this, cB = T.map;
			cB.addEventListener("loadcode", function() {
				T.loadTiles()
			});
			cB.addEventListener("addtilelayer", function(cC) {
				T.addTileLayer(cC)
			});
			cB.addEventListener("removetilelayer", function(cC) {
				T.removeTileLayer(cC)
			});
			cB.addEventListener("setmaptype", function(cC) {
				T.setMapType(cC)
			});
			cB.addEventListener("zoomstartcode", function(cC) {
				T._zoom(cC)
			})
		},
		loadTiles : function() {
			var T = this;
			if (a0.browser.ie) {
				try {
					document.execCommand("BackgroundImageCache", false, true)
				} catch (cB) {
				}
			}
			if (!this.loaded) {
				T.initMapTypeTiles()
			}
			T.moveGridTiles();
			if (!this.loaded) {
				this.loaded = true;
				cq.load("tile", function() {
					T._asyncLoadTiles()
				})
			}
		},
		initMapTypeTiles : function() {
			var cB = this.map.getMapType();
			var cC = cB.getTileLayers();
			for ( var T = 0; T < cC.length; T++) {
				var cD = new m();
				a0.extend(cD, cC[T]);
				this.mapTypeLayers.push(cD);
				cD.initialize(this.map, this._mapTypeLayerContainer)
			}
		},
		_createDiv : function(cB) {
			var T = V("div");
			T.style.position = "absolute";
			T.style.left = T.style.top = "0";
			T.style.zIndex = cB;
			return T
		},
		showTile : function(cF, cE, cI) {
			var cL = this;
			cL.centerPos = cE;
			var cH = this.map.getMapType();
			var cC = cL.getTileName(cF, cI);
			var cP = cH.getTileSize();
			var cD = (cF[0] * cP) + cE[0];
			var cO = 0;
			if (cH === BMAP_PERSPECTIVE_MAP && cL.map.getZoom() == 15) {
				cO = 0.5
			}
			var cB = (cO - 1 - cF[1]) * cP + cE[1];
			var cJ = [ cD, cB ];
			var cK = this.mapTiles[cC];
			if (cK && cK.img) {
				bA(cK.img, cJ);
				if (cK.loaded) {
					this._checkTilesLoaded()
				} else {
					cK._addLoadCbk(function() {
						cL._checkTilesLoaded()
					})
				}
				return
			}
			cK = this.bufferTiles[cC];
			if (cK && cK.img) {
				cI.tilesDiv.insertBefore(cK.img, cI.tilesDiv.lastChild);
				this.mapTiles[cC] = cK;
				bA(cK.img, cJ);
				if (cK.loaded) {
					this._checkTilesLoaded()
				} else {
					cK._addLoadCbk(function() {
						cL._checkTilesLoaded()
					})
				}
				return
			}
			var cN = 256 * Math.pow(2, (cH.getMaxZoom() - cF[2]));
			var cM = new b3(cF[0] * cN, cF[1] * cN);
			var cG = new bm(cF[0], cF[1]);
			var T = cI.getTilesUrl(cG, cF[2]);
			cK = new bL(this, T, cJ, cF, cI);
			cK._addLoadCbk(function() {
				cL._checkTilesLoaded()
			});
			cK._load();
			this.mapTiles[cC] = cK
		},
		_checkTilesLoaded : function() {
			this.numLoading--;
			var T = this;
			if (this.numLoading == 0) {
				if (this._checkLoadedTimer) {
					clearTimeout(this._checkLoadedTimer);
					this._checkLoadedTimer = null
				}
				this._checkLoadedTimer = setTimeout(function() {
					if (T.numLoading == 0) {
						T.map.dispatchEvent(new a8("ontilesloaded"))
					}
					T._checkLoadedTimer = null
				}, 80)
			}
		},
		getTileName : function(T, cB) {
			if (this.map.getMapType() === BMAP_PERSPECTIVE_MAP) {
				return "TILE-" + cB.guid + "-" + this.map.cityCode + "-" + T[0]
						+ "-" + T[1] + "-" + T[2]
			} else {
				return "TILE-" + cB.guid + "-" + T[0] + "-" + T[1] + "-" + T[2]
			}
		},
		hideTile : function(cB) {
			var T = cB.img;
			if (T) {
				G(T);
				if (v(T)) {
					T.parentNode.removeChild(T)
				}
			}
			delete this.mapTiles[cB.name];
			if (!cB.loaded) {
				G(T);
				T = null;
				cB._callCbks();
				cB.img = null;
				cB.mgr = null
			}
		},
		moveGridTiles : function() {
			var c0 = this.mapTypeLayers;
			var cM = c0.concat(this.tileLayers);
			var cS = cM.length;
			for ( var cU = 0; cU < cS; cU++) {
				var cF = cM[cU];
				if (cF.baseLayer) {
					this.tilesDiv = cF.tilesDiv
				}
				var c6 = this.map;
				var c2 = c6.getMapType();
				var c7 = c2.getProjection();
				var cT = c6.zoomLevel;
				var cW = c6.mercatorCenter;
				this.mapCenterPoint = cW;
				var cK = c2.getZoomUnits(cT);
				var cN = c2.getZoomFactor(cT);
				var cL = Math.ceil(cW.lng / cN);
				var cG = Math.ceil(cW.lat / cN);
				var cR = c2.getTileSize();
				var cE = [ cL, cG, (cW.lng - cL * cN) / cN * cR,
						(cW.lat - cG * cN) / cN * cR ];
				var c1 = cE[0] - Math.ceil((c6.width / 2 - cE[2]) / cR);
				var cD = cE[1] - Math.ceil((c6.height / 2 - cE[3]) / cR);
				var cX = cE[0] + Math.ceil((c6.width / 2 + cE[2]) / cR);
				var cP = 0;
				if (c2 === BMAP_PERSPECTIVE_MAP && c6.getZoom() == 15) {
					cP = 1
				}
				var cO = cE[1] + Math.ceil((c6.height / 2 + cE[3]) / cR) + cP;
				this.areaCenter = new b3(cW.lng, cW.lat);
				var cC = this.mapTiles;
				var cJ = -this.areaCenter.lng / cK;
				var cI = this.areaCenter.lat / cK;
				var c4 = [ Math.round(cJ), Math.round(cI) ];
				var cB = c6.getZoom();
				for ( var c5 in cC) {
					var c8 = cC[c5];
					var c3 = c8.info;
					if (c3[2] != cB
							|| (c3[2] == cB && (c1 > c3[0] || cX <= c3[0]
									|| cD > c3[1] || cO <= c3[1]))) {
						this.hideTile(c8)
					}
				}
				var cH = -c6.offsetX + c6.width / 2;
				var cQ = -c6.offsetY + c6.height / 2;
				cF.tilesDiv.style.left = Math.round(cJ + cH) - c4[0] + "px";
				cF.tilesDiv.style.top = Math.round(cI + cQ) - c4[1] + "px";
				var T = [];
				for ( var cZ = c1; cZ < cX; cZ++) {
					for ( var cY = cD; cY < cO; cY++) {
						T.push([ cZ, cY ])
					}
				}
				T.sort((function(c9) {
					return function(da, db) {
						return ((0.4 * Math.abs(da[0] - c9[0]) + 0.6 * Math
								.abs(da[1] - c9[1])) - (0.4 * Math.abs(db[0]
								- c9[0]) + 0.6 * Math.abs(db[1] - c9[1])))
					}
				})([ cE[0] - 1, cE[1] - 1 ]));
				this.numLoading += T.length;
				for ( var cZ = 0, cV = T.length; cZ < cV; cZ++) {
					this.showTile([ T[cZ][0], T[cZ][1], cB ], c4, cF)
				}
			}
			return
		},
		addTileLayer : function(cD) {
			var cC = this;
			var T = cD.target;
			for ( var cB = 0; cB < cC.tileLayers.length; cB++) {
				if (cC.tileLayers[cB] == T) {
					return
				}
			}
			T.initialize(this.map, this._normalLayerContainer);
			cC.tileLayers.push(T)
		},
		removeTileLayer : function(cE) {
			var cD = this;
			var cB = cE.target;
			for ( var cC = 0, T = cD.tileLayers.length; cC < T; cC++) {
				if (cB == cD.tileLayers[cC]) {
					cD.tileLayers.splice(cC, 1)
				}
			}
			cB.remove()
		},
		setMapType : function() {
			var cC = this;
			var cD = this.mapTypeLayers;
			for ( var cB = 0, T = cD.length; cB < T; cB++) {
				cD[cB].remove()
			}
			delete this.tilesDiv;
			this.mapTypeLayers = [];
			this.bufferTiles = this.mapTiles = {};
			this.initMapTypeTiles();
			this.moveGridTiles()
		},
		_zoom : function() {
			var T = this;
			if (T.zoomsDiv) {
				a0.dom.hide(T.zoomsDiv)
			}
			setTimeout(function() {
				T.moveGridTiles();
				T.map.dispatchEvent(new a8("onzoomend"))
			}, 10)
		}
	});
	function bL(cH, T, cE, cB, cD) {
		this.mgr = cH;
		this.position = cE;
		this._cbks = [];
		this.name = cH.getTileName(cB, cD);
		this.info = cB;
		this._transparentPng = cD.isTransparentPng();
		var cI = V("img");
		cm(cI);
		cI.galleryImg = false;
		var cG = cI.style;
		var cC = cH.map.getMapType();
		cG.position = "absolute";
		cG.border = "none";
		cG.width = cC.getTileSize() + "px";
		cG.height = cC.getTileSize() + "px";
		cG.left = cE[0] + "px";
		cG.top = cE[1] + "px";
		this.img = cI;
		this.src = T;
		if (B) {
			this.img.style.opacity = 0
		}
		var cF = this;
		this.img.onload = function(cO) {
			cF.loaded = true;
			if (!cF.mgr) {
				return
			}
			var cK = cF.mgr;
			var cJ = cK.bufferTiles;
			if (!cJ[cF.name]) {
				cK.realBufferNumber++;
				cJ[cF.name] = cF
			}
			if (cF.img && !v(cF.img)) {
				if (cD.tilesDiv) {
					cD.tilesDiv.appendChild(cF.img);
					if (a0.browser.ie <= 6 && a0.browser.ie > 0
							&& cF._transparentPng) {
						cF.img.style.cssText += ';filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'
								+ cF.src + '",sizingMethod=scale);'
					}
				}
			}
			var cM = cK.realBufferNumber - cK.bufferNumber;
			for ( var cN in cJ) {
				if (cM <= 0) {
					break
				}
				if (!cK.mapTiles[cN]) {
					cJ[cN].mgr = null;
					var cL = cJ[cN].img;
					if (cL && cL.parentNode) {
						cL.parentNode.removeChild(cL);
						G(cL)
					}
					cL = null;
					cJ[cN].img = null;
					delete cJ[cN];
					cK.realBufferNumber--;
					cM--
				}
			}
			if (B) {
				new g({
					fps : 20,
					duration : 200,
					render : function(cP) {
						if (cF.img && cF.img.style) {
							cF.img.style.opacity = cP * 1
						}
					},
					finish : function() {
						if (cF.img && cF.img.style) {
							delete cF.img.style.opacity
						}
					}
				})
			}
			cF._callCbks()
		};
		this.img.onerror = function() {
			cF._callCbks();
			if (!cF.mgr) {
				return
			}
			var cJ = cF.mgr;
			var cK = cJ.map.getMapType();
			if (cK.getErrorImageUrl()) {
				cF.error = true;
				cF.img.src = cK.getErrorImageUrl();
				if (cF.img && !v(cF.img)) {
					cD.tilesDiv.appendChild(cF.img)
				}
			}
		};
		cI = null
	}
	bL.prototype._addLoadCbk = function(T) {
		this._cbks.push(T)
	};
	bL.prototype._load = function() {
		if (a0.browser.ie > 0 && a0.browser.ie <= 6 && this._transparentPng) {
			this.img.src = b2.imgPath + "blank.gif"
		} else {
			this.img.src = this.src
		}
	};
	bL.prototype._callCbks = function() {
		var cB = this;
		for ( var T = 0; T < cB._cbks.length; T++) {
			cB._cbks[T]()
		}
		cB._cbks.length = 0
	};
	function G(cD) {
		if (!cD) {
			return
		}
		cD.onload = cD.onerror = null;
		var cB = cD.attributes, cC, T, cE;
		if (cB) {
			T = cB.length;
			for (cC = 0; cC < T; cC += 1) {
				cE = cB[cC].name;
				if (F(cD[cE])) {
					cD[cE] = null
				}
			}
		}
		cB = cD.children;
		if (cB) {
			T = cB.length;
			for (cC = 0; cC < T; cC += 1) {
				G(cD.children[cC])
			}
		}
	}
	var B = (!a0.browser.ie || a0.browser.ie > 8);
	function m(T) {
		this.opts = T || {};
		this.copyright = this.opts.copyright || null;
		this.transparentPng = this.opts.transparentPng || false;
		this.baseLayer = this.opts.baseLayer || false;
		this.zIndex = this.opts.zIndex || 0;
		this.guid = m._guid++
	}
	m._guid = 0;
	a0.lang.inherits(m, a0.lang.Class, "TileLayer");
	a0.extend(m.prototype, {
		initialize : function(cC, T) {
			if (this.baseLayer) {
				this.zIndex = -100
			}
			this.map = cC;
			if (!this.tilesDiv) {
				var cD = V("div");
				var cB = cD.style;
				T.style.WebkitBackfaceVisibility = "hidden";
				cB.position = "absolute";
				cB.zIndex = this.zIndex;
				cB.left = Math.ceil(-cC.offsetX + cC.width / 2) + "px";
				cB.top = Math.ceil(-cC.offsetY + cC.height / 2) + "px";
				T.appendChild(cD);
				this.tilesDiv = cD
			}
		},
		remove : function() {
			if (this.tilesDiv && this.tilesDiv.parentNode) {
				this.tilesDiv.innerHTML = "";
				this.tilesDiv.parentNode.removeChild(this.tilesDiv)
			}
			delete this.tilesDiv
		},
		isTransparentPng : function() {
			return this.transparentPng
		},
		getTilesUrl : function(cB, cC) {
			var T = "";
			if (this.opts.tileUrlTemplate) {
				T = this.opts.tileUrlTemplate.replace(/\{X\}/, cB.x);
				T = T.replace(/\{Y\}/, cB.y);
				T = T.replace(/\{Z\}/, cC)
			}
			return T
		},
		getCopyright : function() {
			return this.copyright
		},
		getMapType : function() {
			return this.mapType || BMAP_NORMAL_MAP
		}
	});
	function aw(T) {
		m.call(this, T);
		this._opts = {};
		T = T || {};
		this._opts = a0.object.extend(this._opts, T);
		if (this._opts.predictDate) {
			if (this._opts.predictDate.weekday < 1
					|| this._opts.predictDate.weekday > 7) {
				this._opts.predictDate = 1
			}
			if (this._opts.predictDate.hour < 0
					|| this._opts.predictDate.hour > 23) {
				this._opts.predictDate.hour = 0
			}
		}
		this._tileUrl = "http://its.map.baidu.com:8002/traffic/"
	}
	aw.prototype = new m();
	aw.prototype.initialize = function(cB, T) {
		m.prototype.initialize.call(this, cB, T);
		this._map = cB
	};
	aw.prototype.isTransparentPng = function() {
		return true
	};
	aw.prototype.getTilesUrl = function(cG, cB) {
		var cH = "";
		if (this._opts.predictDate) {
			cH = "HistoryService?day=" + (this._opts.predictDate.weekday - 1)
					+ "&hour=" + this._opts.predictDate.hour + "&t="
					+ new Date().getTime() + "&"
		} else {
			cH = "TrafficTileService?time=" + new Date().getTime() + "&"
		}
		var cC = this._map, cI = cG.x, cD = cG.y, cF = Math.floor(cI / 200), cE = Math
				.floor(cD / 200), T = this._tileUrl + cH + "level=" + cB
				+ "&x=" + cI + "&y=" + cD;
		return T.replace(/-(\d+)/gi, "M$1")
	};
	function ck(T, cB, cC) {
		this._name = T;
		this._layers = cB instanceof m ? [ cB ] : cB.slice(0);
		this._opts = {
			tips : "",
			labelText : "",
			minZoom : 1,
			maxZoom : 19,
			tileSize : 256,
			textColor : "black",
			errorImageUrl : "",
			projection : new a2()
		};
		if (this._layers.length == 1) {
			this._layers[0].baseLayer = true
		}
		a0.extend(this._opts, cC || {})
	}
	a0.extend(ck.prototype, {
		getName : function() {
			return this._name
		},
		getTips : function() {
			return this._opts.tips
		},
		getLabelText : function() {
			return this._opts.labelText
		},
		getTileLayer : function() {
			return this._layers[0]
		},
		getTileLayers : function() {
			return this._layers
		},
		getTileSize : function() {
			return this._opts.tileSize
		},
		getMinZoom : function() {
			return this._opts.minZoom
		},
		getMaxZoom : function() {
			return this._opts.maxZoom
		},
		getTextColor : function() {
			return this._opts.textColor
		},
		getProjection : function() {
			return this._opts.projection
		},
		getErrorImageUrl : function() {
			return this._opts.errorImageUrl
		},
		getZoomUnits : function(T) {
			return Math.pow(2, (18 - T))
		},
		getZoomFactor : function(T) {
			return this.getZoomUnits(T) * 256
		}
	});
	var bX = [ "http://q1.baidu.com/it/", "http://q2.baidu.com/it/",
			"http://q3.baidu.com/it/", "http://q4.baidu.com/it/",
			"http://q5.baidu.com/it/", "http://q6.baidu.com/it/",
			"http://q7.baidu.com/it/", "http://q8.baidu.com/it/" ];
	var aM = new m();
	aM.getTilesUrl = function(cC, cF) {
		var cG = cC.x;
		var cD = cC.y;
		var cE = "44", T = "010";
		if (this.map.highResolutionEnabled()) {
			cE = "41";
			T = "009"
		}
		var cB = bX[Math.abs(cG + cD) % bX.length] + "u=x=" + cG + ";y=" + cD
				+ ";z=" + cF + ";v=" + T + ";type=web&fm=" + cE;
		return cB.replace(/-(\d+)/gi, "M$1")
	};
	window.BMAP_NORMAL_MAP = new ck("地图", aM, {
		tips : "显示普通地图"
	});
	var bk = new m();
	bk.tileUrls = [ "http://d0.map.baidu.com/resource/mappic/",
			"http://d1.map.baidu.com/resource/mappic/",
			"http://d2.map.baidu.com/resource/mappic/",
			"http://d3.map.baidu.com/resource/mappic/" ];
	bk.getTilesUrl = function(T, cC) {
		var cE = T.x;
		var cB = T.y;
		var cD = Math.pow(2, (20 - cC)) * 256;
		cB = Math.round((9998336 - cD * (cB)) / cD) - 1;
		url = this.tileUrls[Math.abs(cE + cB) % this.tileUrls.length]
				+ this.map.currentCity + "/" + this.map.cityCode + "/3/lv"
				+ (21 - cC) + "/" + cE + "," + cB + ".jpg";
		return url
	};
	window.BMAP_PERSPECTIVE_MAP = new ck("三维", bk, {
		tips : "显示三维地图",
		minZoom : 15,
		maxZoom : 20,
		textColor : "white",
		projection : new cu()
	});
	BMAP_PERSPECTIVE_MAP.getZoomUnits = function(T) {
		return Math.pow(2, (20 - T))
	};
	BMAP_PERSPECTIVE_MAP.getCityName = function(T) {
		if (!T) {
			return ""
		}
		var cB = b2.cityNames;
		for ( var cC in cB) {
			if (T.search(cC) > -1) {
				return cB[cC]
			}
		}
		return ""
	};
	BMAP_PERSPECTIVE_MAP.getCityCode = function(T) {
		return ({
			bj : 2,
			gz : 1,
			sz : 14,
			sh : 4
		})[T]
	};
	var bH = new m({
		baseLayer : true
	});
	bH.getTilesUrl = function(cB, cD) {
		var cE = cB.x;
		var cC = cB.y;
		var T = bX[Math.abs(cE + cC) % bX.length] + "u=x=" + cE + ";y=" + cC
				+ ";z=" + cD + ";v=009;type=sate&fm=46";
		return T.replace(/-(\d+)/gi, "M$1")
	};
	window.BMAP_SATELLITE_MAP = new ck("卫星", bH, {
		tips : "显示卫星影像",
		minZoom : 1,
		maxZoom : 19,
		textColor : "white"
	});
	var l = new m({
		transparentPng : true
	});
	l.getTilesUrl = function(cB, cD) {
		var cE = cB.x;
		var cC = cB.y;
		var T = bX[Math.abs(cE + cC) % bX.length] + "u=x=" + cE + ";y=" + cC
				+ ";z=" + cD + ";v=010;type=trans&fm=47";
		return T.replace(/-(\d+)/gi, "M$1")
	};
	window.BMAP_HYBRID_MAP = new ck("混合", [ bH, l ], {
		tips : "显示带有街道的卫星影像",
		labelText : "路网",
		minZoom : 1,
		maxZoom : 19,
		textColor : "white"
	});
	window.BMAP_POI_TYPE_NORMAL = 0;
	window.BMAP_POI_TYPE_BUSSTOP = 1;
	window.BMAP_POI_TYPE_BUSLINE = 2;
	window.BMAP_POI_TYPE_SUBSTOP = 3;
	window.BMAP_POI_TYPE_SUBLINE = 4;
	var E = 0;
	var a9 = 1;
	var ai = {};
	function t(cB, T) {
		a0.lang.Class.call(this);
		this._loc = {};
		this.setLocation(cB);
		this._opts = {
			renderOptions : {
				panel : null,
				map : null,
				autoViewport : true
			},
			onSearchComplete : function() {
			},
			onMarkersSet : function() {
			},
			onInfoHtmlSet : function() {
			},
			onResultsHtmlSet : function() {
			},
			onGetBusListComplete : function() {
			},
			onGetBusLineComplete : function() {
			},
			onBusListHtmlSet : function() {
			},
			onBusLineHtmlSet : function() {
			},
			onPolylinesSet : function() {
			},
			reqFrom : ""
		};
		a0.extend(this._opts, T);
		if (typeof T != "undefined" && typeof T.renderOptions != "undefined"
				&& typeof T.renderOptions.autoViewport != "undefined") {
			this._opts.renderOptions.autoViewport = T.renderOptions.autoViewport
		} else {
			this._opts.renderOptions.autoViewport = true
		}
		this._opts.renderOptions.panel = a0.G(this._opts.renderOptions.panel)
	}
	a0.inherits(t, a0.lang.Class);
	a0.extend(t.prototype, {
		getResults : function() {
			if (!this._isMultiKey) {
				return this._results
			} else {
				return this._arrResults
			}
		},
		enableAutoViewport : function() {
			this._opts.renderOptions.autoViewport = true
		},
		disableAutoViewport : function() {
			this._opts.renderOptions.autoViewport = false
		},
		setLocation : function(T) {
			if (!T) {
				return
			}
			this._loc.src = T
		},
		setSearchCompleteCallback : function(T) {
			this._opts.onSearchComplete = T || function() {
			}
		},
		setMarkersSetCallback : function(T) {
			this._opts.onMarkersSet = T || function() {
			}
		},
		setPolylinesSetCallback : function(T) {
			this._opts.onPolylinesSet = T || function() {
			}
		},
		setInfoHtmlSetCallback : function(T) {
			this._opts.onInfoHtmlSet = T || function() {
			}
		},
		setResultsHtmlSetCallback : function(T) {
			this._opts.onResultsHtmlSet = T || function() {
			}
		},
		getStatus : function() {
			return this._status
		}
	});
	var a3 = {
		REQ_BASE_URL : "http://api.map.baidu.com/",
		request : function(cB, cH, T, cG) {
			var cC = (Math.random() * 100000).toFixed(0);
			BMap._rd["_cbk" + cC] = function(cI) {
				T = T || {};
				cB && cB(cI, T);
				delete BMap._rd["_cbk" + cC]
			};
			cG = cG || "";
			var cE;
			if (T && T.useEncodeURI) {
				cE = L(cH, encodeURI)
			} else {
				cE = L(cH, encodeURIComponent)
			}
			var cF = this, cD = cF.REQ_BASE_URL + cG + "?" + cE
					+ "&ie=utf-8&oue=1&res=api&callback=BMap._rd._cbk" + cC;
			cn.request(cD)
		}
	};
	BMap._rd = {};
	var O = {};
	O.removeHtml = function(T) {
		return T.replace(/<\/?b>/g, "")
	};
	O.parseGeoExtReg1 = function(T) {
		return T
				.replace(
						/([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0|[1-9]\d*),([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0|[1-9]\d*)(,)/g,
						"$1,$2;")
	};
	O.parseGeoExtReg2 = function(cB, T) {
		var cC = new RegExp(
				"(((-?\\d+)(\\.\\d+)?),((-?\\d+)(\\.\\d+)?);)(((-?\\d+)(\\.\\d+)?),((-?\\d+)(\\.\\d+)?);){"
						+ T + "}", "ig");
		return cB.replace(cC, "$1")
	};
	window.BMAP_STATUS_SUCCESS = 0;
	window.BMAP_STATUS_CITY_LIST = 1;
	window.BMAP_STATUS_UNKNOWN_LOCATION = 2;
	window.BMAP_STATUS_UNKNOWN_ROUTE = 3;
	window.BMAP_STATUS_INVALID_KEY = 4;
	window.BMAP_STATUS_INVALID_REQUEST = 5;
	window.BMAP_STATUS_PERMISSION_DENIED = 6;
	window.BMAP_STATUS_SERVICE_UNAVAILABLE = 7;
	window.BMAP_STATUS_TIMEOUT = 8;
	window.BMAP_ROUTE_TYPE_WALKING = 2;
	window.BMAP_ROUTE_TYPE_DRIVING = 3;
	var cl = "cur";
	var c = "cen";
	var b9 = "s";
	var M = "con";
	var ag = "bd";
	var b1 = "nb";
	var C = "bt";
	var bD = "nav";
	var bn = "walk";
	var bs = "gc";
	var d = "rgc";
	var P = "dec";
	var aJ = "bse";
	var e = "nse";
	var D = "bl";
	var a7 = "bsl";
	var az = "bda";
	var ad = "sa";
	var aT = "nba";
	var b8 = "drag";
	var o = 2;
	var aX = 4;
	var bl = 7;
	var R = 11;
	var aG = 12;
	var ba = 14;
	var aU = 15;
	var co = 18;
	var q = 20;
	var N = 21;
	var ak = 26;
	var bw = 28;
	var w = 31;
	var bi = 35;
	var bu = 44;
	var aq = 45;
	var Z = 46;
	var bJ = 47;
	var aS = -1;
	var W = 0;
	var cg = 1;
	var aY = 2;
	var y = 3;
	var cy = "http://map.baidu.com/";
	var u = "http://api.map.baidu.com/";
	BMap.I = window.Instance = a0.lang.instance;
	var aW = function(cC, cB) {
		t.call(this, cC, cB);
		cB = cB || {};
		cB.renderOptions = cB.renderOptions || {};
		this.setPageCapacity(cB.pageCapacity);
		if (typeof cB.renderOptions.selectFirstResult != "undefined"
				&& !cB.renderOptions.selectFirstResult) {
			this.disableFirstResultSelection()
		} else {
			this.enableFirstResultSelection()
		}
		this._overlays = [];
		this._arrPois = [];
		this._curIndex = -1;
		this._queryList = [];
		var T = this;
		cq.load("local", function() {
			T._check()
		})
	};
	a0.inherits(aW, t, "LocalSearch");
	aW.DEFAULT_PAGE_CAPACITY = 10;
	aW.MIN_PAGE_CAPACITY = 1;
	aW.MAX_PAGE_CAPACITY = 100;
	aW.DEFAULT_RADIUS = 2000;
	aW.MAX_RADIUS = 100000;
	a0.extend(aW.prototype, {
		search : function(T) {
			this._queryList.push({
				method : "search",
				arguments : [ T ]
			})
		},
		searchInBounds : function(T, cB) {
			this._queryList.push({
				method : "searchInBounds",
				arguments : [ T, cB ]
			})
		},
		searchNearby : function(cC, cB, T) {
			this._queryList.push({
				method : "searchNearby",
				arguments : [ cC, cB, T ]
			})
		},
		clearResults : function() {
			delete this._json;
			delete this._status;
			delete this._results;
			delete this._ud;
			this._curIndex = -1;
			this._setStatus();
			if (this._opts.renderOptions.panel) {
				this._opts.renderOptions.panel.innerHTML = ""
			}
		},
		gotoPage : function() {
		},
		enableFirstResultSelection : function() {
			this._opts.renderOptions.selectFirstResult = true
		},
		disableFirstResultSelection : function() {
			this._opts.renderOptions.selectFirstResult = false
		},
		setPageCapacity : function(T) {
			if (typeof T == "number" && !isNaN(T)) {
				this._opts.pageCapacity = T < 1 ? aW.DEFAULT_PAGE_CAPACITY
						: (T > aW.MAX_PAGE_CAPACITY ? aW.DEFAULT_PAGE_CAPACITY
								: T)
			} else {
				this._opts.pageCapacity = aW.DEFAULT_PAGE_CAPACITY
			}
		},
		getPageCapacity : function() {
			return this._opts.pageCapacity
		},
		toString : function() {
			return "LocalSearch"
		}
	});
	var bV = function(cB, T) {
		t.call(this, cB, T)
	};
	a0.inherits(bV, t, "BaseRoute");
	a0.extend(bV.prototype, {
		clearResults : function() {
		}
	});
	window.BMAP_TRANSIT_POLICY_LEAST_TIME = 0;
	window.BMAP_TRANSIT_POLICY_LEAST_TRANSFER = 2;
	window.BMAP_TRANSIT_POLICY_LEAST_WALKING = 3;
	window.BMAP_TRANSIT_POLICY_AVOID_SUBWAYS = 4;
	window.BMAP_LINE_TYPE_BUS = 0;
	window.BMAP_LINE_TYPE_SUBWAY = 1;
	window.BMAP_LINE_TYPE_FERRY = 2;
	function aN(cC, cB) {
		bV.call(this, cC, cB);
		cB = cB || {};
		this.setPolicy(cB.policy);
		this.setPageCapacity(cB.pageCapacity);
		this.QUERY_TYPE = C;
		this.RETURN_TYPE = ba;
		this.ROUTE_TYPE = a9;
		this._overlays = [];
		this._curIndex = -1;
		this._queryList = [];
		var T = this;
		cq.load("route", function() {
			T._asyncSearch()
		})
	}
	aN.MAX_PAGE_CAPACITY = 100;
	aN.LINE_TYPE_MAPPING = [ 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 1 ];
	a0.inherits(aN, bV, "TransitRoute");
	a0.extend(aN.prototype, {
		setPolicy : function(T) {
			if (T >= BMAP_TRANSIT_POLICY_LEAST_TIME
					&& T <= BMAP_TRANSIT_POLICY_AVOID_SUBWAYS) {
				this._opts.policy = T
			} else {
				this._opts.policy = BMAP_TRANSIT_POLICY_LEAST_TIME
			}
		},
		_internalSearch : function(cB, T) {
			this._queryList.push({
				method : "_internalSearch",
				arguments : [ cB, T ]
			})
		},
		search : function(cB, T) {
			this._queryList.push({
				method : "search",
				arguments : [ cB, T ]
			})
		},
		setPageCapacity : function(T) {
			if (typeof T == "string") {
				T = parseInt(T);
				if (isNaN(T)) {
					this._opts.pageCapacity = aN.MAX_PAGE_CAPACITY;
					return
				}
			}
			if (typeof T != "number") {
				this._opts.pageCapacity = aN.MAX_PAGE_CAPACITY;
				return
			}
			if (T >= 1 && T <= aN.MAX_PAGE_CAPACITY) {
				this._opts.pageCapacity = Math.round(T)
			} else {
				this._opts.pageCapacity = aN.MAX_PAGE_CAPACITY
			}
		},
		toString : function() {
			return "TransitRoute"
		},
		_shortTitle : function(T) {
			return T.replace(/\(.*\)/, "")
		}
	});
	window.BMAP_HIGHLIGHT_STEP = 1;
	window.BMAP_HIGHLIGHT_ROUTE = 2;
	var bc = function(T, cD) {
		bV.call(this, T, cD);
		this._overlays = [];
		this._curIndex = -1;
		this._queryList = [];
		var cC = this;
		var cB = this._opts.renderOptions;
		if (cB.highlightMode != BMAP_HIGHLIGHT_STEP
				&& cB.highlightMode != BMAP_HIGHLIGHT_ROUTE) {
			cB.highlightMode = BMAP_HIGHLIGHT_STEP
		}
		this._enableDragging = this._opts.renderOptions.enableDragging ? true
				: false;
		cq.load("route", function() {
			cC._asyncSearch()
		})
	};
	bc.ROAD_TYPE = [ "", "环岛", "无属性道路", "主路", "高速连接路", "交叉点内路段", "连接道路",
			"停车场内部道路", "服务区内部道路", "桥", "步行街", "辅路", "匝道", "全封闭道路", "未定义交通区域",
			"POI连接路", "隧道", "步行道", "公交专用道", "提前右转道" ];
	a0.inherits(bc, bV, "DWRoute");
	a0.extend(bc.prototype, {
		search : function(cB, T) {
			this._queryList.push({
				method : "search",
				arguments : [ cB, T ]
			})
		}
	});
	window.BMAP_DRIVING_POLICY_LEAST_TIME = 0;
	window.BMAP_DRIVING_POLICY_LEAST_DISTANCE = 1;
	window.BMAP_DRIVING_POLICY_AVOID_HIGHWAYS = 2;
	function n(T, cB) {
		bc.call(this, T, cB);
		cB = cB || {};
		this.setPolicy(cB.policy);
		this.QUERY_TYPE = bD;
		this.RETURN_TYPE = q;
		this.ROUTE_TYPE = BMAP_ROUTE_TYPE_DRIVING
	}
	a0.inherits(n, bc, "DrivingRoute");
	a0.extend(n.prototype, {
		setPolicy : function(T) {
			if (T >= BMAP_DRIVING_POLICY_LEAST_TIME
					&& T <= BMAP_DRIVING_POLICY_AVOID_HIGHWAYS) {
				this._opts.policy = T
			} else {
				this._opts.policy = BMAP_DRIVING_POLICY_LEAST_TIME
			}
		}
	});
	function ct(T, cB) {
		bc.call(this, T, cB);
		this.QUERY_TYPE = bn;
		this.RETURN_TYPE = w;
		this.ROUTE_TYPE = BMAP_ROUTE_TYPE_WALKING;
		this._enableDragging = false
	}
	a0.inherits(ct, bc, "WalkingRoute");
	function aQ(cB) {
		this._opts = {};
		a0.extend(this._opts, cB);
		this._queryList = [];
		var T = this;
		cq.load("othersearch", function() {
			T._asyncSearch()
		})
	}
	a0.inherits(aQ, a0.lang.Class, "Geocoder");
	a0.extend(aQ.prototype, {
		getPoint : function(T, cC, cB) {
			this._queryList.push({
				method : "getPoint",
				arguments : [ T, cC, cB ]
			})
		},
		getLocation : function(T, cC, cB) {
			this._queryList.push({
				method : "getLocation",
				arguments : [ T, cC, cB ]
			})
		},
		toString : function() {
			return "Geocoder"
		}
	});
	function af(cB) {
		this._opts = {};
		a0.extend(this._opts, cB);
		this._queryList = [];
		var T = this;
		cq.load("othersearch", function() {
			T._asyncSearch()
		})
	}
	a0.extend(af.prototype, {
		getCurrentPosition : function(cB, T) {
			this._queryList.push({
				method : "getCurrentPosition",
				arguments : [ cB, T ]
			})
		},
		getStatus : function() {
			return this._status
		}
	});
	function bZ(cB) {
		this._opts = {
			renderOptions : {
				map : null
			}
		};
		a0.extend(this._opts, cB);
		this._queryList = [];
		var T = this;
		cq.load("othersearch", function() {
			T._asyncSearch()
		})
	}
	a0.inherits(bZ, a0.lang.Class, "LocalCity");
	a0.extend(bZ.prototype, {
		get : function(T) {
			this._queryList.push({
				method : "get",
				arguments : [ T ]
			})
		},
		toString : function() {
			return "LocalCity"
		}
	});
	function be(cC, cB) {
		t.call(this, cC, cB);
		this.QUERY_TYPE_BUSLIST = D;
		this.RETURN_TYPE_BUSLIST = aU;
		this.QUERY_TYPE_BUSLINE = a7;
		this.RETURN_TYPE_BUSLINE = co;
		this._queryList = [];
		var T = this;
		cq.load("buslinesearch", function() {
			T._asyncSearch()
		})
	}
	be._iconOpen = b2.imgPath + "iw_plus.gif";
	be._iconClose = b2.imgPath + "iw_minus.gif";
	be._stopUrl = b2.imgPath + "stop_icon.png";
	a0.inherits(be, t);
	a0.extend(be.prototype, {
		getBusList : function(T) {
			this._queryList.push({
				method : "getBusList",
				arguments : [ T ]
			})
		},
		getBusLine : function(T) {
			this._queryList.push({
				method : "getBusLine",
				arguments : [ T ]
			})
		},
		setGetBusListCompleteCallback : function(T) {
			this._opts.onGetBusListComplete = T || function() {
			}
		},
		setGetBusLineCompleteCallback : function(T) {
			this._opts.onGetBusLineComplete = T || function() {
			}
		},
		setBusListHtmlSetCallback : function(T) {
			this._opts.onBusListHtmlSet = T || function() {
			}
		},
		setBusLineHtmlSetCallback : function(T) {
			this._opts.onBusLineHtmlSet = T || function() {
			}
		},
		setPolylinesSetCallback : function(T) {
			this._opts.onPolylinesSet = T || function() {
			}
		}
	});
	function bq(cB) {
		t.call(this, cB);
		cB = cB || {};
		this._options = {
			input : null,
			types : [],
			onSearchComplete : function() {
			}
		};
		a0.extend(this._options, cB);
		this._loc.src = cB.location || "全国";
		this._word = "";
		this._show = false;
		this._suggestion = null;
		this._inputValue = "";
		_addStat(5011);
		var T = this;
		cq.load("autocomplete", function() {
			T._asyncSearch()
		})
	}
	a0.inherits(bq, t, "Autocomplete");
	a0.extend(bq.prototype, {
		show : function() {
			this._show = true
		},
		hide : function() {
			this._show = false
		},
		setTypes : function(T) {
			this._options.types = T
		},
		setLocation : function(T) {
			this._loc.src = T
		},
		search : function(T) {
			this._word = T
		},
		setInputValue : function(T) {
			this._inputValue = T
		}
	});
	function ae(T, cB) {
		window.BMap[T] = cB
	}
	ae("Map", br);
	ae("Hotspot", cc);
	ae("MapType", ck);
	ae("Point", b3);
	ae("Pixel", bm);
	ae("Size", aA);
	ae("Bounds", bE);
	ae("TileLayer", m);
	ae("Projection", a5);
	ae("MercatorProjection", a2);
	ae("PerspectiveProjection", cu);
	ae("Copyright", ao);
	ae("Overlay", by);
	ae("Label", ab);
	ae("Marker", Y);
	ae("Icon", J);
	ae("Polyline", f);
	ae("Polygon", cd);
	ae("InfoWindow", bG);
	ae("Circle", a);
	ae("Control", cf);
	ae("NavigationControl", I);
	ae("OverviewMapControl", cA);
	ae("CopyrightControl", ah);
	ae("ScaleControl", bB);
	ae("MapTypeControl", aE);
	ae("TrafficLayer", aw);
	ae("ContextMenu", cp);
	ae("MenuItem", a6);
	ae("LocalSearch", aW);
	ae("TransitRoute", aN);
	ae("DrivingRoute", n);
	ae("WalkingRoute", ct);
	ae("Autocomplete", bq);
	ae("Geocoder", aQ);
	ae("LocalCity", bZ);
	ae("Geolocation", af);
	ae("BusLineSearch", be);
	window.BMap.apiLoad();
})();
var _key = ""