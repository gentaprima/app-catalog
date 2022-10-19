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
        // alert(pageid);
        ///////////////////////
        // Store Master Template //
        ///////////////////////
        // var store_master_template = Ext.getStore('StoreMasterTemplate');
        
        var model_template = Ext.define('model_template', {
            extend: 'Ext.data.Model',
            fields: []
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
                            border:true,
                            layout: 'fit',
                            region: 'center',
                            id:'MainContentPanel_'+MainTabId,
                            items:[
                                Ext.create('Ext.tab.Panel', {
                                    items: [
                                        {
                                            border: false,
                                            id: 'ContentTabPanelLst_' + pageid,
                                            tabConfig: {
                                                title: 'Data ' + title,
                                                tooltip: 'Data ' + title,
                                            },
                                            layout: 'border',

                                            items: [
                                                {
                                                    xtype:'panel',
                                                    region:'center',
                                                    layout:'border',
                                                    header:false,
                                                    flex:4,
                                                    items:[
                                                        {
                                                            xtype:'gridpanel',
                                                            region:'center',
                                                            title:'Group Manager',
                                                            iconCls:'group-manager',                                                            flex:2,
                                                            tbar : [
                                                                {
                                                                    text:'Add Group',
                                                                    iconCls : 'group-add',
                                                                    tooltip : 'Add New Group',
                                                                    handler : function() {

                                                                    }
                                                                }, '-',
                                                                {
                                                                    text:'Delete Group',
                                                                    iconCls : 'group-delete',
                                                                    tooltip : 'Remove Group',
                                                                    handler : function() {


                                                                    }
                                                                },
                                                                '-',
                                                                {
                                                                    text:'Save',
                                                                    iconCls : 'icon-save',
                                                                    id : 'savegroup',
                                                                    tooltip : 'Save Changed User',
                                                                    handler : function() {

                                                                    }
                                                                },
                                                                '-',
                                                                {
                                                                    text:'Auto Save',
                                                                    iconCls : 'autosave',
                                                                    tooltip : 'Quick Save when finish Editing',
                                                                    enableToggle : true,
                                                                    pressed : false,


                                                                }
                                                            ],
                                                            bbar : new Ext.PagingToolbar({
                                                                id : 'pagingBar1',
                                                                // store : dsGroup,
                                                                // pageSize : parseInt(limit_combo1.getValue()),
                                                                // plugins : filterGroup,
                                                                displayInfo : true,
                                                                displayMsg: 'Display {0} - {1} of {2}',
                                                                emptyMsg: "No Data to display",
                                                                items : [
                                                                    '-',
                                                                    {
                                                                        tooltip : {
                                                                            title : 'Clear Filter',
                                                                            text : 'Clear Searching Filter'
                                                                        },
                                                                        iconCls : 'drop',
                                                                        handler : function() {
                                                                            // filterGroup.clearFilters();
                                                                        }
                                                                    },
                                                                    '-',
                                                                    'Display Per Page ',
                                                                ]
                                                            }),

                                                        },
                                                        {
                                                            xtype:'gridpanel',
                                                            region:'south',
                                                            title:'User Manager',
                                                            flex:2,
                                                            tbar : [
                                                                {
                                                                    text:'Add User',
                                                                    iconCls : 'user-add',
                                                                    tooltip : 'Add New User',
                                                                    handler : function() {

                                                                    }
                                                                },
                                                                '-',
                                                                {
                                                                    text:'Delete User',
                                                                    iconCls : 'user-delete',
                                                                    tooltip : 'Remove User',
                                                                    handler : function() {


                                                                    }
                                                                },
                                                                '-',
                                                                {
                                                                    text:'Save',
                                                                    iconCls : 'icon-save',
                                                                    id : 'saveuser',
                                                                    tooltip : 'Save Changed User',
                                                                    handler : function() {

                                                                    }
                                                                },
                                                                '-',

                                                                {
                                                                    text:'Auto Save',
                                                                    iconCls : 'autosave',
                                                                    tooltip : 'Quick Save when finish Editing',
                                                                    enableToggle : true,
                                                                    pressed : false,


                                                                }
                                                            ],
                                                            bbar : new Ext.PagingToolbar({
                                                                id : 'pagingBar',
                                                                // store : dsUser,
                                                                // pageSize : parseInt(limit_combo.getValue()),
                                                                // plugins : filterUser,
                                                                displayInfo : true,
                                                                displayMsg: 'Display {0} - {1} of {2}',
                                                                emptyMsg: "No Data to display",
                                                                items : [
                                                                    '-',
                                                                    {
                                                                        tooltip : {
                                                                            title : 'Clear Filter',
                                                                            text : 'Clear Searching Filter'
                                                                        },
                                                                        iconCls : 'drop',
                                                                        handler : function() {
                                                                            // filterUser.clearFilters();
                                                                        }
                                                                    },

                                                                    '-',
                                                                    'Display Per Page ',
                                                                ]
                                                            }),

                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype:'panel',
                                                    region:'east',
                                                    width:280,
                                                    layout:'border',
                                                    header:false,
                                                    items:[
                                                        {
                                                            xtype:'gridpanel',
                                                            region:'center',
                                                            title: 'Menu Manager',
                                                            split:true,
                                                            minWidth: 280,
                                                            maxWidth: 280,
                                                            collapsible:true,
                                                            iconCls:'app',
                                                            flex:2,
                                                            tbar : [
                                                                {
                                                                    text : 'Check All',
                                                                    iconCls : 'accept',
                                                                    tooltip : 'Checked All Menu',
                                                                    handler : function(){


                                                                    }
                                                                },
                                                                '-',
                                                                {
                                                                    text : 'Check None',
                                                                    iconCls : 'check-none',
                                                                    tooltip : 'Unchecked All Menu ',
                                                                    handler : function(){


                                                                    }
                                                                },
                                                                '-',
                                                                {
                                                                    text : 'Save',
                                                                    iconCls : 'icon-save',
                                                                    tooltip : 'Save checked item to published Menu In Group',
                                                                    handler : function() {


                                                                    }
                                                                }
                                                            ],
                                                        },
                                                        {
                                                            xtype:'gridpanel',
                                                            region:'south',
                                                            title: 'Event Menu',
                                                            split       : true,
                                                            frame: false,
                                                            plain:false,
                                                            border:false,
                                                            collapsible:true,
                                                            iconCls:'conf',
                                                            flex:1,
                                                            tbar: [
                                                                {
                                                                    text:'Save',
                                                                    iconCls : 'icon-save',
                                                                    id : 'saveevent',
                                                                    tooltip : 'Save Changed Event',
                                                                    handler : function() {
                                                                        // dsEvent.save();
                                                                    }
                                                                },
                                                                '-',
                                                                {
                                                                    text:'Auto Save',
                                                                    iconCls : 'autosave',
                                                                    tooltip : 'Quick Save when finish Editing',
                                                                    enableToggle : true,
                                                                    pressed : false,
                                                                    toggleHandler : function(btn, press) {
                                                                        if (press)
                                                                            Ext.getCmp('saveevent').disable();
                                                                        else
                                                                            Ext.getCmp('saveevent').enable();
                                                                        dsEvent.autoSave = press;
                                                                        /*if (press)
                                                                            dsEvent.save();*/
                                                                    }
                                                                },
                                                                '->',
                                                                {
                                                                    iconCls : 'accept',
                                                                    tooltip : 'Activate All Event',
                                                                    handler : function(){
                                                                        /*dsEvent.each(function(r,i){
                                                                            r.set('is_active',true)
                                                                        });*/
                                                                    }
                                                                },
                                                                '-',
                                                                {
                                                                    iconCls : 'check-none',
                                                                    tooltip : 'Deactive All Event ',
                                                                    handler : function(){
                                                                        /*dsEvent.each(function(r,i){
                                                                            r.set('is_active',false)
                                                                        });*/
                                                                    }
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                })


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
