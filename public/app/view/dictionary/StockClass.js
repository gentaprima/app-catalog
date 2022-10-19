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
        ////////////////////////
        // Material Category //
        //////////////////////

        var model_stock_class = Ext.define('model_stock_class', {
            extend: 'Ext.data.Model',
            fields: ['entity_name','code', 'description']
        });

        var store_stock_class = Ext.create('Ext.data.Store', {
            storeId: 'store_stock_class'+page,
            model: model_stock_class,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: 'getStockClass',//action=getInc
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
                beforeload: function(store) {

                }
            }
        });

        var filters = [];

        var entity_name = new Ext.util.Filter({
            operator: 'like',
            value: 'stockclass',
            property: "entity_name",
            type: "string",
        });

        filters.push(entity_name['initialConfig']) ;

        store_stock_class.filter(filters);
        store_stock_class.proxy.extraParams = {
            // filter: Ext.encode(filters),
            action :'getEntity'
        };

        store_stock_class.reload({
            params:{
                start:0,
                limit:25
            }
        });

        // Bikin Cart Product Item di dalam Grid
        var editor_grid_stock_class =  Ext.create('Ext.grid.plugin.RowEditing', {
            licksToMoveEditor: 1,
            autoCancel: true,
            saveBtnText    : "Update",//My Save Button Text&quot;,
            saveBtnIcon: 'add-data',
            cancelBtnText: "Cancel", //Cancel Button Text&quot;,
            clicksToEdit: 2, //this changes from the default double-click activation to single click activation
            errorSummary: false //disables display of validation messages if the row is invalid

        });
        var grid_stock_class = Ext.create('Ext.grid.Panel', {
            title: 'List '+title,
            border:false,
            region: 'center',
            store: store_stock_class,
            frame:true,
            columns: [
                {
                    text: 'Code',
                    dataIndex: 'code',
                    editor:{
                        xtype: 'textfield',
                    },
                    filter:{
                        type:'string',
                        // operator:'lt'
                    },
                },
                {
                    text: 'Description',
                    dataIndex: 'description',
                    autoSizeColumn:true,
                    flex: 1,
                    filter:'string',
                    editor:{
                        xtype: 'textfield',
                    },
                },

            ],
            tbar:[
                {
                    xtype:'button',
                    text: 'Add',
                    iconCls: 'add-data',
                    disabled:!ROLE.AddDictionary,
                    handler: function() {
                        var data = [];
                        var order = 1 ;
                        var index = 0 ;
                        store_stock_class.each(function(r,i){
                            data.push(r.data);
                            order++ ;
                            index++ ;
                        });
                        // Create a model instance
                        var r = Ext.create('model_stock_class', {
                            flag :'Insert' ,
                            // entity_name:'itemcategory'
                            // sequence : sequence,
                            // inc : Ext.getCmp('detail_inc'+page).getValue() ,
                            // type: 'O',
                        });

                        store_stock_class.insert(index, r);
                        editor_grid_stock_class.startEdit(r, 0);

                    }
                },
                {
                    xtype:'button',
                    text: 'Remove',
                    iconCls: 'row-delete',
                    disabled:!ROLE.RemoveDictionary,
                    handler: function() {
                        var records = grid_stock_class.getSelectionModel().getSelection()[0];
                        if (records) {
                            Ext.MessageBox.show({
                                title:'Warning',
                                msg:'Sure to delete this data?',
                                buttons : Ext.MessageBox.YESNO,
                                //animEl:bt.id,
                                icon :Ext.MessageBox.WARNING,
                                fn:function(b){
                                    if (b =='yes'){
                                        Ext.each(records,function(r){
                                            Ext.Ajax.request({
                                                url: 'RemoveEntityM',
                                                params:{
                                                    _token : csrf_token,
                                                    id :r.data.id,
                                                },
                                                success:function(res){
                                                    result = Ext.decode(res.responseText);
                                                    if (result.success){
                                                        store_stock_class.reload();
                                                    }else{
                                                        Ext.MessageBox.alert('Error',result.message);
                                                    }

                                                },
                                                scope:this
                                            });
                                            // }
                                        });
                                    }
                                }
                            });
                        }
                    }
                },
            ],
            bbar:[
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_stock_class,
                    displayInfo: true,
                    displayMsg: 'Displaying record {0} - {1} of {2}',
                    emptyMsg: "No records to display"
                }),
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
            plugins:[
                'gridfilters',
                editor_grid_stock_class
            ],
            listeners: {
                select: function(selModel, record, index, options){

                },

                beforeedit: function(plugin, context) {
					return (ROLE.EditDictionary ? true : false);
                }  				
            }
        });

        editor_grid_stock_class.on({
            scope: this,
            beforeedit: function(roweditor, context) {

            },
            afteredit: function(roweditor, context) {
                var row = grid_stock_class.getSelectionModel().getSelection()[0];
                var data = [] ;
                data.push(Ext.encode(row.data));
                Ext.MessageBox.show({
                    title: 'Please wait',
                    msg: 'Loading items...',
                    progressText: 'Initializing...',
                    width:300,
                    progress:true,
                    closable:false,
                    animateTarget: 'mb6'
                });
                // this hideous block creates the bogus progress
                var f = function(v){
                    return function(){
                        if(v == 12){

                            removeData = [];
                        }else{
                            var i = v/11;
                            Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% completed');
                        }
                    };
                };

                for(var i = 1; i < 13; i++){
                    setTimeout(f(i), i*100);
                }

                Ext.Ajax.request({
                    scope:this,
                    url: 'SaveEntityM',
                    method: 'POST',
                    dataType: 'json',
                    params:{
                        _token : csrf_token,
                        entity_name:'stockclass',
                        data_items :'['+data+']',
                    },
                    success:function(response, request){
                        // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                        store_stock_class.load({
                            params:{
                                start:0,
                                limit:25
                            }
                        });
                        Ext.MessageBox.hide();
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
                // prdChange();
            },
            canceledit : function(){
                if (grid_stock_class.getSelectionModel().hasSelection()) {
                    var row = grid_stock_class.getSelectionModel().getSelection()[0];
                }
            }
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
                            ], */
                            items:[
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
                                            items:[ */
                                                grid_stock_class
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
