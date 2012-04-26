﻿Jxstar.currentPage = function() {
	var config = {param:{},initpage:function(page, define){},eventcfg:{}};

	var cols = [
	{col:{header:'功能名称', width:162, sortable:true}, field:{name:'fun_base__fun_name',type:'string'}},
	{col:{header:'编辑权限', width:75, sortable:true, defaultval:'0', editable:true, hcss:'color:#3039b4;',
		editor:new Ext.form.Checkbox(),
		renderer:function(value) {
			return value=='1' ? jx.base.yes : jx.base.no;
		}}, field:{name:'sys_role_fun__is_edit',type:'string'}},
	{col:{header:'打印权限', width:69, sortable:true, defaultval:'0', editable:true, hcss:'color:#3039b4;',
		editor:new Ext.form.Checkbox(),
		renderer:function(value) {
			return value=='1' ? jx.base.yes : jx.base.no;
		}}, field:{name:'sys_role_fun__is_print',type:'string'}},
	{col:{header:'审批权限', width:75, sortable:true, defaultval:'0', editable:true, hcss:'color:#3039b4;',
		editor:new Ext.form.Checkbox(),
		renderer:function(value) {
			return value=='1' ? jx.base.yes : jx.base.no;
		}}, field:{name:'sys_role_fun__is_audit',type:'string'}},
	{col:{header:'设置ID', width:100, sortable:true, hidden:true}, field:{name:'sys_role_fun__role_fun_id',type:'string'}},
	{col:{header:'角色ID', width:100, sortable:true, hidden:true}, field:{name:'sys_role_fun__role_id',type:'string'}},
	{col:{header:'功能ID', width:100, sortable:true, hidden:true}, field:{name:'sys_role_fun__fun_id',type:'string'}},
	{col:{header:'其它权限', width:74, sortable:true, defaultval:'0', editable:true, hcss:'color:#3039b4;',
		editor:new Ext.form.Checkbox(),
		renderer:function(value) {
			return value=='1' ? jx.base.yes : jx.base.no;
		}}, field:{name:'sys_role_fun__is_other',type:'string'}}
	];
	
	config.param = {
		cols: cols,
		sorts: null,
		hasQuery: '1',
		isedit: '1',
		isshow: '0',
		funid: 'sys_role_fun'
	};
	
	config.eventcfg = {		
		dataImportParam: function() {
			var roleId = this.grid.fkValue;

		setData: function(){
			var records = this.grid.getSelectionModel().getSelections();
			if (!JxUtil.selectone(records)) return;

		},
	};
		
	return new Jxstar.GridNode(config);
}