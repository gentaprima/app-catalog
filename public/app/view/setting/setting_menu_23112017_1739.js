valid_script = true;
// alert(pageid);
Ext.define('ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ViewMasterBankController',
    
    onAddClick: function(pageid) {
        Ext.Msg.alert('Add', 'The Add button was clicked'+pageid);
    },
    clickHandler: function(item, e, args)
    {
        
    },
    onRemoveClick: function (view, recIndex, cellIndex, item, e, record) {
        record.drop();
    },

});

Ext.application({
    name: 'APP',
    controllers: [
        'MasterBankController'
    ],
    stores:[
        // 'StoreMasterTemplate'
    ],
    requires: [
        // 'Ext.selection.CellModel'
        // 'Ext.util.Point',
        // 'Ext.util.History',
        // 'APP.domain.Proxy'
    ],
    launch: function(){

        var handler_select = 'js';

        /** listView File * */
        var storeHanlder = new Ext.data.JsonStore({
            url : '/rest_url',
            root : 'filelist',
            baseParams : {
                task : 'handlerList'
            },
            fields : ['name', 'url', {
                name : 'size',
                type : 'float'
            }, {
                name : 'lastmod',
                type : 'date',
                dateFormat : 'timestamp'
            }]
        });
// storeHanlder.load();

        var listView = new Ext.ListView({
            store : storeHanlder,
            singleSelect : true,
            emptyText : 'No File To display',
            reserveScrollOffset : true,
            loadingText : 'loading filelist',
            columns : [{
                header : 'File',
                width : .5,
                dataIndex : 'name',
                tpl : '<img class="x-panel-inline-icon js-file" src="images/s.gif" />{name}'
            }, {
                header : 'Last Modified',
                width : .35,
                dataIndex : 'lastmod',
                tpl : '{lastmod:date("m-d h:i a")}'
            }, {
                header : 'Size',
                dataIndex : 'size',
                tpl : '{size:fileSize}',
                align : 'right'
            }]
        });


        winHanlder = new Ext.Window({
            id : 'winHanlder',
            title : 'Select Handler File',
            iconCls : 'js-file',
            autoScroll : true,
            closeAction : 'hide',
            modal : true,
            layout : 'fit',
            bodyStyle : 'background-color:white;',
            width : 425,
            height : 300,
            items : [listView],
            listeners : {
                show : function() {
                    if (handler_select == 'js')
                        task = 'handlerList';
                    if (handler_select == 'php')
                        task = 'ajaxList';
                    if (handler_select == 'pdf')
                        task = 'reportList';
                    storeHanlder.baseParams = {
                        task : task
                    };
                    storeHanlder.load();
                }
            },
            buttons : [{
                text : 'Select File',
                iconCls : 'js-file',
                tooltip : 'Select File Handler',
                handler : function() {
                    // dataku = listView.getSelectedRecords();
                    /*if (dataku.length) {
                        if (handler_select == 'js')
                            Ext.getCmp('detailMenu').findByType('trigger')[0]
                                .setValue(dataku[0].data.name);
                        if (handler_select == 'php')
                            Ext.getCmp('detailMenu').findByType('trigger')[1]
                                .setValue(dataku[0].data.name);
                        if (handler_select == 'pdf')
                            Ext.getCmp('detailMenu').findByType('trigger')[2]
                                .setValue(dataku[0].data.name);
                        winHanlder.hide();
                        Ext.getCmp('detailMenu').body.highlight();
                    }*/
                }
            }, {
                text : 'Close',
                iconCls : 'row-delete',
                handler : function() {
                    winHanlder.hide();
                }
            }]
        });

        function showHandler(btn) {
            handler_select = btn.mod_handler;
            column_select = (handler_select == 'js') ? 'js-file' : 'php-file';
            if (handler_select =='pdf')
                column_select = 'report-pdf';
            // winHanlder.setIconClass(column_select);
            winHanlder.setTitle('Select ' + btn.fieldLabel);
            //winHanlder.show(btn.id);
            winHanlder.show();
        }
        ///////////////////////
        // Store Master Template //
        ///////////////////////
        // var store_master_template = Ext.getStore('StoreMasterTemplate');
        var StoreEventMenuDetailModel = Ext.define('StoreEventMenuDetailModel', {
            extend: 'Ext.data.Model',
            fields: [
                {
                    name: 'rowid',
                    type: 'string',
                    useNull: true
                },
                {
                    name: 'menu_id',
                    type: 'string',
                },
                {
                    name: 'event_name',
                    type: 'string',
                },
            ]
        });

        var StoreEventMenuDetail = Ext.create('Ext.data.Store', {
            model:'StoreEventMenuDetailModel',
            autoLoad: true,
            remoteSort: true,
            autoSave : true,
            proxy: {
                type: 'rest',
                url: '/EventMenuDetail',
                // method: 'GET',
                autoSave: true,
                autoSync:true,
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'data',
                    messageProperty: 'message'
                },
                writer: {
                    type: 'json'
                },

            },
            sorters: [
                {
                    property: 'rowid',
                    direction: 'ASC'
                }
            ],
            listeners: {
                beforeload: function(store){
                    store.getProxy().setExtraParam("_token", csrf_token);
                },
                afterload:function(store){

                }
            },
        });

        Ext.define('Writer.EventMenuDetail', {
            extend: 'Ext.data.Model',
            fields: [
                {
                    name: 'rowid',
                    type: 'string',
                    useNull: true
                },
                {
                    name: 'menu_id',
                    type: 'string',
                },
                {
                    name: 'event_name',
                    type: 'string',
                },
            ],
            /*validators: {
                email: {
                    type: 'length',
                    min: 1
                },
                first: {
                    type: 'length',
                    min: 1
                },
                last: {
                    type: 'length',
                    min: 1
                }
            }*/
        });

        var TreeStoreMenuSetting = Ext.create('Ext.data.TreeStore', {
            autoLoad: true,
            autoSync: true,
            storeId: 'Base',
            remoteSort: true,
            remoteFilter: true,
            remoteGroup: true,
            /*proxy: {
                type: 'ajax',
                url: '/SettingTreeMenu',
                extraParams:{
                    action : 'getData',
                    source_data :'menu'
                }
            },*/
            proxy: {
                type: 'ajax',
                api: {
                    read   : '/SettingTreeMenuRead',
                    create : '/SettingTreeMenuStore',
                    update : '/SettingTreeMenuUpdate',
                    destroy: '/SettingTreeMenuDestroy'
                },
                extraParams:{
                    action : 'getData',
                    source_data :'menu'
                }
            },
            root: {
                text: 'Main Menu',
                id: 0,
                iconCls:'base',
                expanded: true
            },
            sorters: [{
                property: 'sort_id',
                direction: 'ASC'
            }],
            listeners: {
                beforeload: function(store){
                    store.getProxy().setExtraParam("_token", csrf_token);
                },
                afterload:function(store){

                }
            },

        });


        var model_template = Ext.define('model_template', {
            extend: 'Ext.data.Model',
            fields: [

            ]
        });


        var main_content = {
            id: MainTabId,
            ui: 'blue-panel',
            title: title,
            closable: true,
            iconCls: iconCls,
            layout:'fit',
            autoHeight : true,
            border:false,
            items:[
                {
                    xtype:'panel',
                    layout:'border',
                    id:'MainPanel_'+MainTabId,
                    // padding : '3 3 3 3',
                    items:[
                        Ext.create('Ext.panel.Panel', {
                            border:false,
                            layout: 'fit',
                            region: 'center',
                            id:'MainContentPanel_'+MainTabId,
                            dockedItems: [
                                {
                                    xtype: 'header',
                                    style: ' backgroundColor:#FFFFFF; backgroundImage:none;text-align: right;font-color:white;font-weight: bold;font-size:25px;font-family: "Comic Sans MS", cursive, sans-serif',
                                    html: 'Menu Event Manager',
                                    id:'titleHeader'+pageid,
                                    padding : '5 5 15 5 ',
                                    frame: false,
                                    // dock: 'top' //top
                                }
                            ],
                            items:[
                                Ext.create('Ext.tab.Panel', {
                                    id:'main_content_tab'+pageid,
                                    items: [
                                        {
                                            border: false,
                                            id: 'ContentTabPanelLst_' + pageid,
                                            tabConfig: {
                                                title: 'Data ' + title,
                                                tooltip: 'Data ' + title,
                                            },
                                            layout:'border',

                                            items:[
                                                {
                                                    xtype:'panel',
                                                    id:'menu-manager'+pageid,
                                                    title:'Menut List',
                                                    region:'center',
                                                    layout:'border',
                                                    border:true,
                                                    flex:4,
                                                    tools : [
                                                        {
                                                            id : 'plus',
                                                            qtip : 'Expand Menu All',
                                                            handler : function() {
                                                                // treeMenu.root.expand(true);
                                                            }
                                                        }, 
                                                        {
                                                            id : 'minus',
                                                            qtip : 'Collapse Menu All',
                                                            handler : function() {
                                                                // treeMenu.root.collapse(true);
                                                            }
    
                                                        }
                                                    ],
                                                    items:[
                                                        {
                                                            xtype: 'treepanel',
                                                            region:'center',
                                                            id:'TreeMenuSetting',
                                                            flex:3,
                                                            iconCls:'mymenu',
                                                            border:false,
                                                            autoScroll: true,
                                                            rootVisible: false,
                                                            lines: true,
                                                            useArrows:true,
                                                            header:false,
                                                            singleExpand: false,
                                                            bufferedRenderer: false,
                                                            animate: true,
                                                            multiSelect: true,
                                                            rootVisible: true,
                                                            enableDD: true,
                                                            dropConfig: {appendOnly:true},
                                                            store: TreeStoreMenuSetting,
                                                            tbar : [
                                                                {
                                                                    text : 'Add Menu',
                                                                    id:'btnAddMenu'+pageid,
                                                                    // disabled:true,
                                                                    iconCls : 'menu-add',
                                                                    tooltip : 'Add New Menu in Selected Menu',
                                                                    handler : function(){
                                                                        var TreeMenuSetting = Ext.getCmp('TreeMenuSetting');
                                                                        var node = TreeMenuSetting.getSelection()[0];
                                                                        // console.log(node);
                                                                        if(node){
                                                                            var main_content_tab = Ext.getCmp('main_content_tab' + pageid);
                                                                            var tabForm = Ext.getCmp('ContentTabPanelLstFormEntryMenu' + pageid);
                                                                            // console.log(form);
                                                                            tabForm.tab.show();
                                                                            main_content_tab.setActiveTab('ContentTabPanelLstFormEntryMenu'+ pageid);

                                                                            Ext.getCmp('FormMenuManager'+MainTabId).getForm().setValues({
                                                                                parent_id : node.id,
                                                                                // isMenu : !disableTrigger
                                                                            });
                                                                        }else{
                                                                            Ext.MessageBox.show({
                                                                                title : 'Alert',
                                                                                msg : 'Please Select Menu Item First',
                                                                                buttons : Ext.MessageBox.OK,
                                                                                icon : Ext.MessageBox.WARNING,
                                                                                animEl : this.id
                                                                            });
                                                                        }

                                                                        // FormEntryMenu.show();
                                                                        /*var az = main_content_tab.child('#ContentTabPanelLstFormEntryMenu'+page);
                                                                        az.tab.show();
                                                                        main_content_tab.setActiveTab(az);*/
                                                                    }
                                                                },
                                                                '-',
                                                                {
                                                                    text : 'Add Sub Menu',
                                                                    id:'btnAddSubMenu'+pageid,
                                                                    // disabled:true,
                                                                    iconCls : 'submenu-add',
                                                                    tooltip : 'Add New Sub Menu in Selected Sub Menu',
                                                                    // handler : addMenu
                                                                },
                                                                '-',
                                                                {
                                                                    text : 'Remove Menu',
                                                                    id:'btnAddRemoveMenu'+pageid,
                                                                    // disabled:true,
                                                                    iconCls : 'menu-remove',
                                                                    tooltip : 'Remove Menu Item or Sub Menu Item Selected',
                                                                    handler : function() {
                                                                    }
                                                                },
                                                                '-',
                                                                {
                                                                    text : 'Publish Checked Item',
                                                                    id:'btnAddPublishMenu'+pageid,
                                                                    iconCls : 'accept',
                                                                    tooltip : 'Save checked item to published menu',
                                                                    handler : function() {
                                                                    }
                                                                }
                                                            ],
                                                            bbar: [
                                                                {
                                                                    text:'Edit Menu',
                                                                    id:'btnEditMenu'+pageid,
                                                                    // disabled:true,
                                                                    iconCls:'form',
                                                                    tooltip:'Edit Selected Menu',
                                                                    handler:function(){
                                                                        var TreeMenuSetting = Ext.getCmp('TreeMenuSetting');
                                                                        var node = TreeMenuSetting.getSelection()[0].data;
                                                                        if(node){
                                                                            var main_content_tab = Ext.getCmp('main_content_tab' + pageid);
                                                                            var tabForm = Ext.getCmp('ContentTabPanelLstFormEntryMenu' + pageid);
                                                                            // console.log(form);
                                                                            tabForm.tab.show();
                                                                            main_content_tab.setActiveTab('ContentTabPanelLstFormEntryMenu'+ pageid);
                                                                            console.log(node);
                                                                            Ext.getCmp('FormMenuManager'+MainTabId).getForm().setValues({
                                                                                menu_id:node.id,
                                                                                parent_id : node.parent_id,
                                                                                text : node.text,
                                                                            });
                                                                        }else{
                                                                            Ext.MessageBox.show({
                                                                                title : 'Alert',
                                                                                msg : 'Please Select Menu Item First',
                                                                                buttons : Ext.MessageBox.OK,
                                                                                icon : Ext.MessageBox.WARNING,
                                                                                animEl : this.id
                                                                            });
                                                                        }
                                                                    }
                                                                },
                                                                '-',
                                                                {
                                                                    text:'Reorder Menu',
                                                                    id:'btnReorderMenu'+pageid,
                                                                    // disabled:true,
                                                                    iconCls:'sort',
                                                                    tooltip:'Reorder Selected Menu',
                                                                    handler: function() {
                                                                        /*node = treeMenu.getSelectionModel().getSelectedNode();
                                                                        if (!node)
                                                                            return false;
                                                                        parentNode = (node.getDepth()>1)?node.parentNode:node;
                                                                        if (!parentNode)
                                                                            return false;
                                                                        winSort.setTitle('Items Of ' + parentNode.text);
                                                                        winSort.setIconClass(parentNode.attributes.iconCls);
                                                                        dsSort.baseParams.parent_id = parentNode.id.split(".")[1];
                                                                        dsSort.baseParams.update =0;
                                                                        dsSort.load({params:{start:0,limit:10000}});
                                                                        winSort.show(this.id);*/
                                                                    }

                                                                }
                                                            ],
                                                            listeners:{
                                                                itemclick   : function(view,rec)
                                                                {

                                                                    var n = rec ;
                                                                    var leaf = rec.get('leaf');
                                                                    var pageid = rec.get('id');
                                                                    var title = rec.get('text');
                                                                    var iconCls = rec.get('iconCls');
                                                                    var handler = rec.get('handler');
                                                                    var winId = 'Window'+pageid;
                                                                    var MainTabId = 'MainTabId'+pageid;
                                                                    // console.log(pageid);
                                                                    // Ext.getCmp('btnAddMenu'+pageid).setDisabled = false;
                                                                    // Ext.getCmp('mainpanel').body.mask('Loading Menu '+ title +' ....','x-mask-loading');

                                                                    if(leaf && handler !== "") {
                                                                        // console.log(pageid);
                                                                        StoreEventMenuDetail.proxy.extraParams = {
                                                                            action :'getData',
                                                                            source_data :'menu_event',
                                                                            menu_id : pageid,
                                                                        };
                                                                        StoreEventMenuDetail.reload({
                                                                            params:{
                                                                                start:0,
                                                                                limit:25
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            },
                                                            viewConfig: {
                                                                plugins: [{
                                                                    ptype: 'treeviewdragdrop',
                                                                    ddGroup: 'selDD'

                                                                }],
                                                                listeners: {
                                                                    /*beforedrop: function (node, data) {
                                                                        data.records[0].set('leaf', false);
                                                                        data.records[0].set('checked', null);
                                                                    },*/
                                                                    drop: function (node, data, dropRec, dropPosition) {
                                                                        TreeStoreMenuSetting.remove(data.records[0]);
                                                                    },
                                                                    beforedrop: function(node, data, overModel, dropPosition, dropHandlers) {
                                                                        dropHandlers.wait = true;
                                                                        Ext.MessageBox.confirm('Move Node', 'Are you sure?', function(btn) {
                                                                            if (btn === 'yes') {
                                                                                // The delayed drop here triggers the following error:
                                                                                // Uncaught TypeError: Cannot read property 'isExpanded' of null
                                                                                // Line 248,559 of ext-all-debug.js (Ext JS 6.2.0)
                                                                                // dropHandlers.processDrop();
                                                                                data.records[0].set('leaf', false);
                                                                                data.records[0].set('checked', null);
                                                                            } else {
                                                                                dropHandlers.cancelDrop();
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            }

                                                        },
                                                        {
                                                            xtype:'gridpanel',
                                                            region:'east',
                                                            title:'Event Menu Details',
                                                            id:'eventPanel',
                                                            flex:1,
                                                            border:true,
                                                            header:false,
                                                            store:StoreEventMenuDetail,
                                                            viewConfig : {
                                                                emptyText : 'No Record Found',
                                                            },
                                                            selModel: 'cellmodel',
                                                            plugins: [
                                                                Ext.create('Ext.grid.plugin.CellEditing', {
                                                                    clicksToEdit: 1,
                                                                    pluginId: 'cellEditing'
                                                                })
                                                            ],
                                                            columns : [
                                                                {
                                                                    dataIndex : 'rowid',
                                                                    hidden : true,
                                                                    hideable : false,
                                                                    menuDisabled : true
                                                                },
                                                                {
                                                                    dataIndex : 'menu_id',
                                                                    hidden : true,
                                                                    hideable : false,
                                                                    menuDisabled : true
                                                                },
                                                                {
                                                                    dataIndex : 'event_name',
                                                                    header : 'Event Name',
                                                                    sortable : true,
                                                                    editor : {
                                                                        xtype : 'textfield',
                                                                        vtype:'alphanum',
                                                                        allowBlank : false
                                                                    }
                                                                }

                                                            ],
                                                            tbar : [
                                                                'Event Menu Detail', '->', '-', {
                                                                    iconCls : 'add-data',
                                                                    tooltip : 'Add Event Menu',
                                                                    handler : function() {
                                                                        var TreeMenuSetting = Ext.getCmp('TreeMenuSetting');
                                                                        var grid = Ext.getCmp('eventPanel');
                                                                        var node = TreeMenuSetting.getSelection()[0];

                                                                        // cellEditing = Ext.create('Ext.grid.plugin.CellEditing');
                                                                        // var grid = this.getView();
                                                                        var cellEditing = grid.getPlugin('cellEditing');

                                                                        var rec = new Writer.EventMenuDetail({
                                                                            menu_id: node.id,
                                                                        });
                                                                        cellEditing.cancelEdit();
                                                                        StoreEventMenuDetail.insert(0,rec);
                                                                        cellEditing.startEditByPosition({
                                                                            row: rec,
                                                                            column: 1
                                                                        });
                                                                    }
                                                                },
                                                                {
                                                                    iconCls : 'deleted-data',
                                                                    tooltip : 'Remove Selected Event',
                                                                    handler : function() {
                                                                    }

                                                                }
                                                            ],
                                                            bbar : [
                                                                {
                                                                    text : 'Save',
                                                                    iconCls : 'icon-save',
                                                                    id : 'saveevent',
                                                                    tooltip : 'Save Changed',
                                                                    handler : function() {
                                                                        StoreEventMenuDetail.save();
                                                                    }
                                                                },
                                                                '-',
                                                                {
                                                                    text : 'Auto Save',
                                                                    iconCls : 'autosave',
                                                                    tooltip : 'Quick Save when finish Editing',
                                                                    enableToggle : true,
                                                                    pressed : false,
                                                                    /*toggleHandler : function(btn, press) {
                                                                        if (press)
                                                                            // Ext.getCmp('saveevent').disable();
                                                                        else
                                                                            // Ext.getCmp('saveevent').enable();
                                                                        // dsEvent.autoSave = press;
                                                                        if (press)
                                                                            // dsEvent.save();
                                                                    }*/

                                                                },
                                                                '-',
                                                                {
                                                                    text : 'Reset',
                                                                    iconCls : 'drop',
                                                                    tooltip : 'Reload Event Manager',
                                                                    handler : function() {
                                                                        // node = treeMenu.getSelectionModel().getSelectedNode();
                                                                        // if (node)
                                                                        //     dsEvent.reload();
                                                                    }
                                                                }
                                                            ]


                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype:'gridpanel',
                                                    region:'east',
                                                    title:'Icon Cls Manager',
                                                    width:275,
                                                    border:true,
                                                    split:true,
                                                    iconCls : 'image-add',
                                                    tbar : [
                                                        {
                                                            // text:'Add',
                                                            iconCls : 'add-data',
                                                            tooltip : 'Add New Icon',
                                                            handler : function() {
                                                                /*var u = new dsIcon.recordType({
                                                                    title : '',
                                                                    clsname : '',
                                                                    icon : 'help.png'
                                                                });
                                                                Ext.getCmp('iconPanel').stopEditing();
                                                                dsIcon.insert(0, u);
                                                                Ext.getCmp('iconPanel').startEditing(0, 2);*/

                                                            }
                                                        },
                                                        '-',
                                                        {
                                                            // text:'Delete',
                                                            iconCls : 'deleted-data',
                                                            tooltip : 'Remove Icon',
                                                            handler : function() {
                                                                /*var index = Ext.getCmp('iconPanel').getSelectionModel()
                                                                    .getSelectedCell();
                                                                if (!index) {
                                                                    return false;
                                                                }
                                                                var rec = Ext.getCmp('iconPanel').store.getAt(index[0]);
                                                                Ext.getCmp('iconPanel').store.remove(rec);
                                                                if (dsIcon.getCount() > 0) {
                                                                    if (index[0] > 0)
                                                                        Ext.getCmp('iconPanel').getSelectionModel().select(
                                                                            index[0] - 1, index[1]);
                                                                    else
                                                                        Ext.getCmp('iconPanel').getSelectionModel().select(
                                                                            index[0], index[1]);
                                                                }
                                                                if (!dsIcon.autoSave)
                                                                    dsIcon.save();*/

                                                            }
                                                        },
                                                        '-',
                                                        {
                                                            // text:'Save',
                                                            iconCls : 'icon-save',
                                                            id : 'saveicon',
                                                            tooltip : 'Save Changed Icon',
                                                            handler : function() {
                                                                // dsIcon.save();
                                                            }
                                                        },
                                                        '-',
                                                        {
                                                            // text:'Auto Save',
                                                            iconCls : 'autosave',
                                                            tooltip : 'Quick Save when finish Editing',
                                                            enableToggle : true,
                                                            pressed : false,
                                                            /*toggleHandler : function(btn, press) {
                                                                if (press)
                                                                    Ext.getCmp('saveicon').disable();
                                                                else
                                                                    Ext.getCmp('saveicon').enable();
                                                                dsIcon.autoSave = press;
                                                                if (press)
                                                                    dsIcon.save();
                                                            }*/

                                                        },
                                                        '->',
                                                        {
                                                            iconCls : 'css-refresh',
                                                            tooltip : 'Refresh Change Icon On Application',
                                                            handler : function() {
                                                                /*reloadIcon = true;
                                                                iconStore.reload();*/
                                                            }
                                                        },
                                                        '-',
                                                        'Limit ',
                                                        // {}
                                                    ],
                                                    bbar : new Ext.PagingToolbar({
                                                        id : 'pagingBar',
                                                        // store : dsIcon,
                                                        // pageSize : parseInt(limit_combo.getValue()),
                                                        // plugins : filterIcon,
                                                        displayInfo : false,
                                                        // displayMsg: 'Icon {0} - {1} of {2}',
                                                        // emptyMsg: "No Data to display",
                                                        items : ['-', {
                                                            tooltip : {
                                                                title : 'Clear Filter',
                                                                text : 'Clear Searching Filter'
                                                            },
                                                            iconCls : 'drop',
                                                            handler : function() {
                                                                // filterIcon.clearFilters();
                                                            }
                                                        }]
                                                    }),
                                                }

                                            ]

                                        },
                                        {
                                            border: false,
                                            itemId: 'ContentTabPanelLstFormEntryMenu' + pageid,
                                            id: 'ContentTabPanelLstFormEntryMenu' + pageid,
                                            tabConfig: {
                                                title: 'Form Entry Menu',
                                                tooltip: 'Form Entry Menu',
                                            },
                                            layout:'border',
                                            hidden:true,
                                            items:[
                                                {
                                                    xtype:'form',
                                                    id:'FormMenuManager'+MainTabId,
                                                    border:true,
                                                    frame : true,
                                                    labelAlign : 'left',
                                                    labelWidth : 150,
                                                    defaultType : 'textfield',
                                                    defaults : {
                                                        labelSeparator : ''
                                                    },
                                                    bodyStyle : 'padding:5px',
                                                    items : [
                                                        {
                                                            xtype : 'hidden',
                                                            name : 'menu_id'
                                                        },
                                                        {
                                                            xtype : 'hidden',
                                                            name : 'isMenu'
                                                        },
                                                        {
                                                            xtype : 'hidden',
                                                            name : 'parent_id'
                                                        },
                                                        {
                                                            fieldLabel : 'Title',
                                                            name : 'text',
                                                            anchor : '95%',
                                                            allowBlank : false
                                                        },
                                                        {
                                                            xtype : 'trigger',
                                                            fieldLabel : 'User Interface File',
                                                            anchor : '95%',
                                                            name : 'handler',
                                                            mod_handler:'js',
                                                            allowBlank : true,
                                                            triggerConfig : {
                                                                tag : "img",
                                                                src : Ext.BLANK_IMAGE_URL,
                                                                cls : "x-form-trigger js-file"
                                                            },
                                                            onTriggerClick : function() {

                                                                showHandler(this);
                                                            }
                                                        },
                                                        {
                                                            xtype : 'trigger',
                                                            fieldLabel : 'Controller File',
                                                            anchor : '95%',
                                                            name : 'ajax',
                                                            mod_handler:'php',
                                                            allowBlank : true,
                                                            triggerConfig : {
                                                                tag : "img",
                                                                src : Ext.BLANK_IMAGE_URL,
                                                                cls : "x-form-trigger php-file " + this.triggerClass
                                                            },
                                                            onTriggerClick : function() {
                                                                showHandler(this);
                                                            }
                                                        },
                                                        {
                                                            xtype : 'trigger',
                                                            fieldLabel : 'Report File',
                                                            anchor : '95%',
                                                            name : 'report',
                                                            mod_handler:'pdf',
                                                            allowBlank : true,
                                                            triggerConfig : {
                                                                tag : "img",
                                                                src : Ext.BLANK_IMAGE_URL,
                                                                cls : "x-form-trigger report-pdf " + this.triggerClass
                                                            },
                                                            onTriggerClick : function() {
                                                                showHandler(this);
                                                            }
                                                        },
                                                        /*{
                                                            xtype:'htmleditor'
                                                        }*/

                                                    ],
                                                    bbar : [
                                                        {
                                                            text : 'Save',
                                                            iconCls : 'icon-save',
                                                            tooltip : 'Save Changed',
                                                            handler : function() {
                                                                var main_content_tab = Ext.getCmp('main_content_tab' + pageid);
                                                                var tabForm = Ext.getCmp('ContentTabPanelLstFormEntryMenu' + pageid);
                                                                tabForm.tab.hide();
                                                                main_content_tab.setActiveTab('ContentTabPanelLst_'+ pageid);

                                                                Ext.getCmp('FormMenuManager'+MainTabId).form.submit({
                                                                    //scope:this,
                                                                    url : '/SettingTreeMenu',
                                                                    params: {
                                                                        _token: csrf_token,
                                                                        source_data:'menu'
                                                                    },
                                                                    success: function(response, request) {
                                                                        Ext.MessageBox.show({
                                                                            title: 'Please wait',
                                                                            msg: 'Loading items...',
                                                                            progressText: 'Initializing...',
                                                                            width: 300,
                                                                            progress: true,
                                                                            closable: false,
                                                                            animateTarget: 'mb6'
                                                                        });
                                                                        // this hideous block creates the bogus progress
                                                                        var f = function(v) {
                                                                            return function() {
                                                                                if (v == 12) {
                                                                                    Ext.MessageBox.hide();
                                                                                    Ext.MessageBox.show(
                                                                                        {
                                                                                            title: 'Message',
                                                                                            msg: 'Process Successfully !',
                                                                                            buttons: Ext.MessageBox.YESNO,
                                                                                            icon: Ext.MessageBox.INFO
                                                                                        }
                                                                                    );
                                                                                } else {
                                                                                    var i = v / 11;
                                                                                    Ext.MessageBox.updateProgress(i, Math.round(100 * i) + '% completed');
                                                                                }
                                                                            };
                                                                        };
                                                                        for (var i = 1; i < 13; i++) {
                                                                            setTimeout(f(i), i * 50);
                                                                        }
                                                                        // Ext.getCmp('btn_print_inquiry_document'+page).setDisabled(false);
                                                                        // Ext.getCmp('btn_inquiry_save'+page).setText("New");
                                                                        //Ext.getCmp('btn_inquiry_save'+page).setDisabled(true);
                                                                    },
                                                                    failure:function(response, request){
                                                                        if(typeof request.response != 'undefined')
                                                                            var mess = request.response.responseText;
                                                                        else
                                                                            var mess = 'Fields marked in red can not be blank !' ;
                                                                        Ext.MessageBox.show(
                                                                            {
                                                                                title: 'Message',
                                                                                msg: mess,
                                                                                buttons: Ext.MessageBox.OK,
                                                                                icon: Ext.MessageBox.ERROR
                                                                            }
                                                                        );

                                                                    },
                                                                });

                                                            }
                                                        },
                                                        '-',
                                                        {
                                                            text : 'Reset',
                                                            iconCls : 'drop',
                                                            tooltip : 'Reload Detail Menu',
                                                            handler : function() {


                                                            }
                                                        }
                                                    ]
                                                }
                                            ]

                                        }

                                    ]

                                }),

                            ]
                        }),
                    ]
                }

            ],
            listeners:{

                
                destroy:function(){

                }
            }

        }


        OpenTab(main_content,MainTabId);



        
        // genItems(myitems);
        // Ext.getCmp('formTemplate'+pageid).add(widget);
        // Ext.getCmp('formTemplate'+pageid).add(Ext.create("Ext.form.field.Text", {fieldLabel:"Last Name"}));

        


    }
});
