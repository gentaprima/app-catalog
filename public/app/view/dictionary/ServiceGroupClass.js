ROLE = Ext.decode('{"RemoveCategory":true,"EditCategory":true,"AddCategory":true}');
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
        /////////////////////////
// Service Group Class //
/////////////////////////
        var model_service_group_class = Ext.define('model_service_group_class', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'group_header', type: 'string'},
                {name: 'groups', type: 'string'},
                {name: 'groupclass', type: 'string'},
                {name: 'group_name', type: 'string'},
            ]
        });

        var store_service_group_class = Ext.create('Ext.data.Store', {
            storeId: 'store_service_group_class'+page,
            model: model_service_group_class,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: true,
            groupField: 'group_header',
            proxy: {
                type: 'ajax',
                url: '/getGroupClassM',//action=getInc
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    messageProperty: 'message',
                    rootProperty: 'data',
                    totalProperty:'total',
                    root:'data'
                }
            },
            listeners: {
                metachange: function(store, meta) {
                    // columns = meta.columns ;
                    // grid_material_group_class.reconfigure(store,columns);
                },
                beforeload: function(store) {

                }
            }
        });
        var filters = [];
        var transaction_type = new Ext.util.Filter({
            operator: 'eq',
            value: 'Service',
            property: "transaction_type",
            type: "string",
        });

        filters.push(transaction_type['initialConfig']) ;
        store_service_group_class.filter(filters);
        store_service_group_class.proxy.extraParams = {
            action :'getGroup',
        };

        store_service_group_class.load({
            params:{
                start:0,
                limit:3000
            }
        });

        var grid_service_group_class = Ext.create('Ext.grid.Panel', {
            frame: true,
            title: 'List '+title,
            iconCls: 'icon-grid',
            store: store_service_group_class,
            features: [
                {
                    id: 'group',
                    ftype: 'groupingsummary',
                    groupHeaderTpl: '{group_header}',
                    hideGroupedHeader: true,
                    enableGroupingMenu: true,
                    toggleSummaryRow:false,
                }
            ],
            plugins:[
                'gridfilters',
            ],
            columns: [
                {
                    header:'Group',
                    dataIndex:'groups',
                    filter:{
                        type:'string',
                        // operator:'lt'
                    },
                },
                {
                    header:'Group Class',
                    dataIndex:'groupclass',
                    filter:{
                        type:'string',
                        // operator:'lt'
                    },
                },
                {
                    header:'Name',
                    dataIndex:'group_name',
                    filter:{
                        type:'string',
                        // operator:'lt'
                    },
                    autoSizeColumn:true
                }
            ],
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true,
                listeners: {
                    refresh: function(dataview) {
                        Ext.each(dataview.panel.columns, function(column) {
                            if (column.autoSizeColumn === true)
                                column.autoSize();
                            Ext.grid.ColumnModel(column);
                        })
                    }
                }
            },
            bbar:[
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_service_group_class,
                    displayInfo: true,
                    displayMsg: 'Displaying record {0} - {1} of {2}',
                    emptyMsg: "No records to display"
                }),
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
            // padding : '1 1 1 1',
            items:[
                {
                    xtype:'panel',
                    layout:'border',
                    id:'MainPanel_'+MainTabId,
                    border:false,
                    // padding : '3 3 3 3',
                    items:[
                        Ext.create('Ext.panel.Panel', {
                            border:false,
                            layout: 'fit',
                            region: 'center',
                            id:'MainContentPanel_'+MainTabId,
/*                             dockedItems: [
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
 */                            items:[
/*                                 {
                                    xtype:'tabpanel',
                                    border:false,
                                    padding : '1 1 1 1',
                                    items:[
                                        {
                                            title:'Material',
                                            layout:'fit',
                                            border:false,
                                            padding : '1 1 1 1',
                                            items:[
 */                                                grid_service_group_class
/*                                             ]

                                        },

                                    ]
                                } */

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
    }
});
