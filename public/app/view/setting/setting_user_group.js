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
        'UsersStore',
        'UsersGroupStore',
        'CBUsersGroupStore'

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
        var store_users = Ext.getStore('UsersStore');
        var store_users_group = Ext.getStore('UsersGroupStore');
        var store_cb_users_group = Ext.getStore('CBUsersGroupStore');


        window['UsersRowEditing'+pageid]  = Ext.create('Ext.grid.plugin.RowEditing', {
            listeners: {
                cancelEdit: function(rowEditing, context) {
                    // Canceling editing of a locally added, unsaved record: remove it
                    if (context.record.phantom) {
                        store_users.remove(context.record);
                    }
                },
                beforeedit:function(editor, e, eOpts){
                    store_users.suspendAutoSync();
                },
                afteredit: function( oEditor, oOptions ) {
                    // console.log(oEditor)
                    /*Ext.MessageBox.show({
                     msg: 'Processing, please wait...',
                     progressText: 'Saving...',
                     width:300,
                     wait:true,
                     waitConfig: {interval:200},
                     icon:'ext-mb-download',
                     animEl: 'buttonID'
                     });*/
                    store_users.sync({
                        success: function (batch, options) {
                            // Ext.MessageBox.hide();
                            /*store_master_area.load({
                             params:{
                             start:0,
                             limit:25
                             }
                             });*/

                            /*Ext.MessageBox.show(
                             {
                             title: 'Message',
                             msg: "Processing Succes",
                             buttons: Ext.MessageBox.OK,
                             icon: Ext.MessageBox.INFO
                             }
                             );*/
                            Ext.MessageBox.hide();
                        },
                        failure: function (batch, options){
                            Ext.MessageBox.hide();
                        }
                    });
                    store_users.resumeAutoSync();
                }
            }
        });
        
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
                                    id:'main_content_tab'+pageid,
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
                                                            id:'group-manager'+pageid,
                                                            region:'center',
                                                            title:'Group Manager',
                                                            iconCls:'group-manager',
                                                            flex:2,
                                                            store:store_users_group,
                                                            columns : [
                                                                {
                                                                    dataIndex : 'group_id',
                                                                    hidden : true,
                                                                    hideable : false,
                                                                    menuDisabled : true
                                                                },
                                                                {
                                                                    dataIndex:'group_name',
                                                                    header:'Group Name',
                                                                    editor: {
                                                                        xtype:'textfield',
                                                                        allowBlank:false
                                                                    }
                                                                },
                                                                {
                                                                    dataIndex:'group_description',
                                                                    header:'Description',
                                                                    editor: {
                                                                        xtype:'textfield',
                                                                        allowBlank:true
                                                                    }
                                                                }
                                                            ],
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
                                                                    tooltip : 'Save Changed Group',
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
                                                                id : 'GroupManagerpagingBar1'+pageid,
                                                                store : store_users_group,
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
                                                            id:'menu-manager'+pageid,
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
                                                            id:'event-menu'+pageid,
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
        Ext.getCmp('mainpanel').body.unmask();


        
        // genItems(myitems);
        // Ext.getCmp('formTemplate'+pageid).add(widget);
        // Ext.getCmp('formTemplate'+pageid).add(Ext.create("Ext.form.field.Text", {fieldLabel:"Last Name"}));

        


    }
});
