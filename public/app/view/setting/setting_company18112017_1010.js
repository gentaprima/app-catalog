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
                            dockedItems: [
                                {
                                    xtype: 'header',
                                    style: ' backgroundColor:#FFFFFF; backgroundImage:none;text-align: right;font-color:white;font-weight: bold;font-size:25px;font-family: "Comic Sans MS", cursive, sans-serif',
                                    html: 'List '+title,
                                    id:'titleHeader'+pageid,
                                    padding : '5 5 15 5 ',
                                    frame: false,
                                    // dock: 'top' //top
                                }
                            ],
                            items:[

                                {
                                    xtype: 'form',
                                    layout: 'form',
                                    columnWidth: 0.2,
                                    labelAlign: 'top',
                                    border:false,
                                    hidden:true,
                                    height:400,
                                    width:340,
                                    id:'formTemplate'+pageid,
                                    defaults: {
                                        xtype: 'container',
                                        layout: 'form',
                                        padding : '5 5 5 5 ',

                                    },
                                    listeners:{

                                    },
                                    dockedItems: [ ],

                                    // items: genItems(myitems),
                                    buttons: [

                                        {
                                            text: 'Reset',
                                            iconCls:'reset-form',
                                            handler: function()
                                            {
                                                this.up('form').getForm().reset();
                                                // console.log('Reset not coded yet');
                                            }
                                        },
                                        {
                                            text: 'Cancle',
                                            iconCls:'cancle',
                                            handler: function()
                                            {
                                                Ext.getCmp('gridId_'+pageid+'_m').setVisible(true);
                                                Ext.getCmp('formTemplate'+pageid).setVisible(false);
                                                Ext.getCmp('titleHeader'+pageid).update('List '+title);
                                            }
                                        },
                                        {
                                            text: 'Submit',
                                            formBind: true, //only enabled once the form is valid
                                            disabled: true,
                                            iconCls:'icon-save',
                                            handler: function()
                                            {
                                                Ext.getCmp('formTemplate'+pageid).form.submit({
                                                    scope:this,
                                                    url: '/FormSchema',
                                                    method: 'POST',
                                                    dataType: 'html',
                                                    params:{
                                                        action:'Save',
                                                        _token : csrf_token,
                                                        // adr_d_items_id : Ext.getCmp('service_adr_d_items_id'+page).getValue(),
                                                        // catalog_no : Ext.getCmp('service_no'+page).getValue(),
                                                    },
                                                    success:function(response, request){
                                                        /*store_service_document.load({
                                                         params:{
                                                         start:0,
                                                         limit:25
                                                         }
                                                         });*/

                                                        // Ext.MessageBox.hide();

                                                        // winDetailServiceDocument.hide();

                                                        Ext.MessageBox.show(
                                                            {
                                                                title : 'Message',
                                                                msg:'Process Successfully !' ,
                                                                buttons: Ext.MessageBox.OK,
                                                                icon :  Ext.MessageBox.INFO
                                                            }
                                                        );
                                                    },
                                                    failure:function(response, request){
                                                        // winDetailServiceDocument.hide();
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
                                        }   //  end submit
                                    ],  // end buttons

                                }
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
        /*Model Grid M & D*/
        window['modelStoreGrid_'+pageid+'_m'] = Ext.define('model_template', {
            extend: 'Ext.data.Model',
            fields: []
        });

        window['storeGrid_'+pageid+'_m'] = Ext.create('Ext.data.Store', {
            model: window['modelStoreGrid_'+pageid+'_m'],
            // groupField: 'group_header',
            autoLoad: true,
            remoteSort:true,
            remoteFilter:true,
            pageSize:2,
            proxy: {
                type: 'ajax',
                url: '/Company',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'data',
                    messageProperty: 'message'
                }
            },
            sorters: [
                {
                    property : 'rowid',
                    direction: 'ASC'
                },
            ],
            listeners: {
                metachange: function(store, meta) {
                    window['grid_'+pageid+'_m'].reconfigure(meta.columns)

                }
            },
        });
        var filter = [];


        window['storeGrid_'+pageid+'_m'].proxy.extraParams= {
            Action: 'GridStore',
            link_id: 'getdep()',
        };


        window['storeGrid_'+pageid+'_m'].load({
            callback : function(records, options, success) {
                if (success) {
                    /*var form = formPanel.getForm();
                     var jsonStr = Ext.JSON.encode(records[0].raw);
                     var jsonObj = Ext.JSON.decode(jsonStr);
                     form.loadRecord(jsonObj);*/
                    // console.log(records);
                }
            }
        });

        window['grid_'+pageid+'_m'] = Ext.create('Ext.grid.Panel', {
            id:'gridId_'+pageid+'_m',
            plugins: [
                'gridfilters'
            ],
            region:'center',
            /*features	: [
             filterconfig
             ],*/
            autoHeight : true,
            columnLines: true,
            autoScroll : true,
            viewConfig : {
                emptyText : 'No Record Found',
            },
            layout:'fit',
            flex:3,
            // width: 500,
            // height: 330,
            header:false,
            frame: false,
            border:false,
            store: window['storeGrid_'+pageid+'_m'],
            iconCls: iconCls,
            columns: [],

            bbar:[
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: window['storeGrid_'+pageid+'_m'],
                    displayInfo: false,
                    displayMsg: 'Displaying record {0} - {1} of {2}',
                    emptyMsg: "No records to display"
                }),
            ],
        });
        window['ContentTabPanel_'+pageid] = Ext.create('Ext.tab.Panel', {
            id:'ContentTabPanel_'+pageid,
            border:false,
            dockedItems: [
                {
                    xtype: 'toolbar',
                    ui: 'footer',
                    fixed: true,
                    items: [
                        {
                            xtype:'button',
                            text: 'Add',
                            iconCls: 'add-data',
                            handler: function(){
                                Ext.getCmp('gridId_'+pageid+'_m').setVisible(false);
                                Ext.getCmp('formTemplate'+pageid).setVisible(true);
                                Ext.getCmp('titleHeader'+pageid).update('Entry Form '+title);
                            }
                        },
                        {
                            xtype:'button',
                            text: 'Deleted',
                            iconCls: 'deleted-data',
                            handler: function(){
                                Ext.getCmp('gridId_'+pageid+'_m').setVisible(false);
                                Ext.getCmp('formTemplate'+pageid).setVisible(true);
                                Ext.getCmp('titleHeader'+pageid).update('Entry Form '+title);
                            }
                        },
                        {
                            xtype:'button',
                            text: 'Download',
                            iconCls: 'arrow-down',
                            items:[
                                {text:'Print PDF',iconCls:'ico-pdf',mode:'pdf',},
                                {text:'Print XLS',iconCls:'ico-xls',mode:'xls',}
                            ],
                        },
                        {
                            xtype:'button',
                            text: 'Export',
                            iconCls: 'report-xls',
                            items:[
                                {text:'Print PDF',iconCls:'ico-pdf',mode:'pdf',},
                                {text:'Print XLS',iconCls:'ico-xls',mode:'xls',}
                            ],
                        },
                        {
                            xtype:'button',
                            text: 'Print',
                            iconCls: 'printer',
                            handler: function(){
                                Ext.getCmp('gridId_'+pageid+'_m').setVisible(false);
                                Ext.getCmp('formTemplate'+pageid).setVisible(true);
                                Ext.getCmp('titleHeader'+pageid).update('Entry Form '+title);
                            }
                        },

                    ]
                }
            ],
            items: [
                {
                    border:false,
                    tabConfig: {
                        title: 'Data '+title,
                        tooltip: 'Data '+title,
                    },
                    items:window['grid_'+pageid+'_m']
                }
            ]
        });
        Ext.getCmp('MainContentPanel_'+MainTabId).add(window['ContentTabPanel_'+pageid]);

        window['searchMainPanel_'+pageid] = Ext.create('Ext.panel.Panel',{
            id:'searchMainPanel_'+pageid,
            border:true,
            layout: 'fit',
            region: 'west',
            title : 'Searching',
            header:false,
            width:300,
            margin : '3 3 3 3',
            split:true,
            collapsible: true,
            animCollapse: true,
            items:[
                {
                    xtype: 'fieldset',
                    id:'fieldsetSearchMainPanel_'+pageid,
                    title: 'Searching',
                    collapsible: false,
                    region: 'west',
                    frame:false,
                    width:250,
                    margin : '3 3 3 3',
                    defaults: {
                        labelWidth: 89,
                        anchor: '100%',
                        layout: {
                            type: 'hbox',
                            defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                        }
                    },
                    items:[
                        {
                            xtype: 'fieldcontainer',
                            // fieldLabel: 'Phone',
                            combineErrors: true,
                            msgTarget: 'under',
                            defaults: {
                                hideLabel: true
                            },
                            items: [

                                {
                                    xtype: 'button',
                                    // text: 'Search',
                                    iconCls: 'search1',
                                    margin: '5 5 5 5',
                                    handler: function () {

                                        // Ext.getCmp('gridId_' + pageid + '_m').setVisible(false);
                                        // Ext.getCmp('formTemplate' + pageid).setVisible(true);
                                        // Ext.getCmp('titleHeader' + pageid).update('Entry Form ' + title);
                                    }
                                },

                                {
                                    xtype: 'button',
                                    // text: 'Clear',
                                    iconCls: 'drop',
                                    margin: '5 5 5 5',
                                    handler: function () {
                                        // Ext.getCmp('gridId_' + pageid + '_m').setVisible(false);
                                        // Ext.getCmp('formTemplate' + pageid).setVisible(true);
                                        // Ext.getCmp('titleHeader' + pageid).update('Entry Form ' + title);
                                    }
                                },

                                {
                                    xtype: 'button',
                                    // text: 'Clear',
                                    iconCls: 'drop',
                                    margin: '5 5 5 5',
                                    handler: function () {
                                        // Ext.getCmp('gridId_' + pageid + '_m').setVisible(false);
                                        // Ext.getCmp('formTemplate' + pageid).setVisible(true);
                                        // Ext.getCmp('titleHeader' + pageid).update('Entry Form ' + title);
                                    }
                                },

                            ]
                        },

                        // searchLst
                    ]
                },
            ]
        });
        // console.log('MainPanel_'+MainTabId);
        Ext.getCmp('MainPanel_'+MainTabId).add(window['searchMainPanel_'+pageid]);


        
        // genItems(myitems);
        // Ext.getCmp('formTemplate'+pageid).add(widget);
        // Ext.getCmp('formTemplate'+pageid).add(Ext.create("Ext.form.field.Text", {fieldLabel:"Last Name"}));

        


    }
});
