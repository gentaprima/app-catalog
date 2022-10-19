valid_script = true;
ROLE = Ext.decode('{"ProcApp":true,"StdApp":true,"RemoveRequestRevision":true,"AddRequestRevision":true,"Plant":true,"RemoveCrossReferences":true,"RemoveFuncLoctaion":true,"StockClass":true,"StockType":true,"UOM":true,"Category":true,"MaterialType":true,"ViewNotes":true,"ApplyChangeMaterial":true,"Cataloguer":true,"AddCrossReferences":true,"MovingType":true,"MaxStock":true,"RemoveMaterial":false,"AddMaterial":false,"AddRequestDeletion":true,"AppRequestDeletion":false,"AddAdditionSubmit":true,"AddFuncLocation":true,"ApproveRevisionReq":false,"INC":true,"MGC":true,"ApprovalRevision":false,"InvButtonCatalogNoHis":false}');
// HEAD FILE
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
        var model_cleansing_duplication = Ext.define('model_cleansing_duplication', {
            extend: 'Ext.data.Model',
            // fields: ['itemnbr', 'sap_nbr', 'shortdesc', 'longdesc']
        });

        var store_cleansing_duplication = Ext.create('Ext.data.Store', {
            model: model_cleansing_duplication,
            proxy: {
                type: 'ajax',
                // url: 'cb_inc.php?',
                url: '/getCleansingDuplicate',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message',
                    rootProperty: 'data',
                    totalProperty:'total',				
                }
            },
            listeners: {
                metachange: function(store, meta) {
                    columns = meta.columns ;
                    grid_cleansing_duplication_desc.reconfigure(store,columns);
                },
                'beforeload': function(store) {
                    // store.proxy.extraParams.cb_inc = 'bolt';
                }
            }
        });

        var grid_cleansing_duplication_desc = Ext.create('Ext.grid.Panel', {
            store: store_cleansing_duplication,
            frame: true,
            region: 'center',
            columns: [
            ],
            viewConfig: {
                listeners: {
                    refresh: function(dataview) {
                        Ext.each(dataview.panel.columns, function(column) {
                            if (column.autoSizeColumn === true)
                                column.autoSize();
                            // if (column.dataIndex.created_at)
                            // console.log(column.dataIndex.created_at);
                        });

                        // my_date = Ext.Date.parse("2012-01-03 5:43:21 PM", "Y-m-d g:i:s A");
                        // console.log(my_date);
                    }
                }
            },
            tbar: [
                {
                    text: 'Search By',
                    iconCls:'printer',
                    id:'btnSearchDuplication'+page,
                    iconCls:'search',
                    // itemId : 'btnSearchDuplication'+page,
                    disabled: false,
                    menu    : [
                        {
                            text    : 'Long Desc',
                            iconCls:'ico-xls',
                            handler    : function() {
                                Ext.getCmp('btnSearchDuplication'+page).setText('Search By long Desc');
                                var filters = [];
                                store_cleansing_duplication.proxy.extraParams = {
                                    filter: Ext.encode(filters),
                                    transaction_type:'Service',
                                    action : 'ByLongDesc',
                                };
                                store_cleansing_duplication.load({
                                    params:{
                                        start:0,
                                        limit:25
                                    }
                                });
                            }
                        },
                        {
                            text    : 'Ref No',
                            iconCls:'ico-pdf',
                            handler    : function() {
                                Ext.getCmp('btnSearchDuplication'+page).setText('Search By Ref No');
                                var filters = [];
                                store_cleansing_duplication.proxy.extraParams = {
                                    filter: Ext.encode(filters),
                                    transaction_type:'Service',
                                    action : 'ByRefno',
                                };
                                store_cleansing_duplication.load({
                                    params:{
                                        start:0,
                                        limit:25
                                    }
                                });
                            }
                        },
                        {
                            text    : 'Old Service',
                            iconCls:'ico-pdf',
                            handler    : function() {
                                Ext.getCmp('btnSearchDuplication'+page).setText('Search By Old Material');
                                var filters = [];
                                store_cleansing_duplication.proxy.extraParams = {
                                    filter: Ext.encode(filters),
                                    transaction_type:'Service',
                                    action : 'ByOldMaterialCode',
                                };
                                store_cleansing_duplication.load({
                                    params:{
                                        start:0,
                                        limit:25
                                    }
                                });
                            }
                        },

                    ]

                },
                {
                    xtype: 'button',
                    text: 'Export to spreadsheet',
                    iconCls:'report-xls',
                    hidden:true,
                    handler: function() {
                        window.open('xlsx_cleansing_duplication.php', '_blank');
                    }
                }
            ],
            bbar: [
                {
                    xtype: 'resizer.pagingtoolbar',
                    store: store_cleansing_duplication,
                    pageSize: 25,
                    // id: 'paging_multi',
                    displayInfo: true,
                    displayMsg: '{0} - {1} of {2}',
                    emptyMsg: "No records to display",
                    border:false,
                },
            ],
        });

        var cleaning_panel = Ext.create('Ext.Panel', {
            layout: {
                type: 'vbox',
                align: 'stretch',
            },
            bodyStyle: {
                background: '#D9D9D9'
            },
            items: [
                {
                    xtype: 'panel',
                    title: 'Duplicate by description',
                    flex: 1,
                    margin: '3 3 3 3',
                    layout: 'border',
                    items: [grid_cleansing_duplication_desc]
                },
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
            padding : '1 1 1 1',
            items:[
                {
                    xtype:'panel',
                    layout:'border',
                    id:'MainPanel_'+MainTabId,
                    border:false,
                    items:[
                        Ext.create('Ext.panel.Panel', {
                            border:false,
                            layout: 'fit',
                            region: 'center',
                            id:'MainContentPanel_'+MainTabId,
                            items:[
                                Ext.create('Ext.tab.Panel', {
                                    id: 'ContentTabPanel_' + pageid,
                                    border: false,
                                    items:[
                                        {
                                            title :'Service',
                                            iconCls: iconCls,
                                            border:false,
                                            layout: 'fit',
                                            items:[
                                                {
                                                    xtype:'form',
                                                    layout: 'border',
                                                    border:false,
                                                    id:'formServiceDuplication'+pageid,
                                                    items:[grid_cleansing_duplication_desc]
                                                    // items:adr_grid
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
                    winCharacteristicValue= Ext.getCmp('winCharacteristicValue'+page);
                    if (winCharacteristicValue)
                        winCharacteristicValue.destroy();
                }
            }

        }

        OpenTab(main_content,MainTabId);
        Ext.getCmp('mainpanel').body.unmask();



    }
});
