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
        // Random Karakter
        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }

        var chartran = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        var MaterialMetaDataModel = Ext.define('MaterialMetaDataModel', {
            extend: 'Ext.data.Model',
            fields: ['id','mrcode', 'transaction_type','characteristic','status']
        });

        var store_material_characteristics_m = Ext.create('Ext.data.Store', {
            storeId: 'store_material_characteristics_m',
            model: MaterialMetaDataModel,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/getCharacteristicsM',//action=getInc
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
                beforeload: function(store, operation, options){

                },
                load: function(store, records, success, operation, options){
                    Ext.getCmp('grid_material_characteristicsM'+page).body.mask('Loading Data ....','x-mask-loading');
                    if(success){
                        Ext.getCmp('grid_material_characteristicsM'+page).body.unmask();
                    }
                    // this.myMask.hide();
                    //
                }
            }
        });

        var filters = [];

        var entity_name = new Ext.util.Filter({
            operator: 'eq',
            value: 'Material',
            property: "transaction_type",
            type: "string",
        });

        filters.push(entity_name['initialConfig']) ;
        store_material_characteristics_m.filter(filters);
        store_material_characteristics_m.proxy.extraParams = {
            action :'getCharacteristicsM'
        };

        store_material_characteristics_m.reload({
            params:{
                start:0,
                limit:25
            }
        });

        // Bikin Cart Product Item di dalam Grid
        var editor_grid_material_characteristicsM =  Ext.create('Ext.grid.plugin.RowEditing', {
            licksToMoveEditor: 1,
            autoCancel: true,
            saveBtnText    : "Update",//My Save Button Text&quot;,
            saveBtnIcon: 'add-data',
            cancelBtnText: "Cancel", //Cancel Button Text&quot;,
            clicksToEdit: 2, //this changes from the default double-click activation to single click activation
            errorSummary: false //disables display of validation messages if the row is invalid

        });

        var grid_material_characteristicsM = Ext.create('Ext.grid.Panel', {
            title: 'List '+title,
            id:'grid_material_characteristicsM'+page,
            border:false,
            region: 'center',
            store: store_material_characteristics_m,
            frame:true,
            columns: [
                {
                    text: 'Code',
                    dataIndex: 'mrcode',
                    filter:{
                        type:'string',
                        // operator:'lt'
                    },
                },
                {
                    text: 'Characteristics',
                    dataIndex: 'characteristic',
                    autoSizeColumn:true,
                    flex: 1,
                    filter:'string',
                    editor:{
                        xtype: 'textfield',
                        id:'material_characteristics_m'+page,
                    },
                },
                {
                    text: 'Status',
                    dataIndex: 'status',
                    align: 'center',
                    filter:{
                        type:'string',
                        // operator:'lt'
                    },
                },

            ],
            tbar:[
                {
                    xtype:'button',
                    text: 'Add Char',
                    iconCls: 'add-data',
                    disabled:!ROLE.AddCharacteristicsM,
                    handler: function() {
                        var data = [];
                        var order = 1 ;
                        var index = 0 ;
                        var str = randomString(4, chartran);
                        var mrcode = str.toUpperCase();
                        var transaction_type = 'Material';
                        store_material_characteristics_m.each(function(r,i){
                            data.push(r.data);
                            order++ ;
                            index++ ;
                        });
                        // Create a model instance
                        var r = Ext.create('MaterialMetaDataModel', {
                            flag :'insert_char',
                            characteristic :'',
                            mrcode: mrcode,
                            transaction_type : transaction_type,
                        });

                        store_material_characteristics_m.insert(index, r);
                        editor_grid_material_characteristicsM.startEdit(r, 0);

                    }
                },
                {
                    xtype:'button',
                    text: 'Remove Char',
                    iconCls: 'row-delete',
                    disabled:!ROLE.RemoveCharacteristicsM,
                    handler: function() {
                        var records = grid_material_characteristicsM.getSelectionModel().getSelection()[0];
                        if (records) {
                            // console.log(records);
                            Ext.MessageBox.show({
                                title:'Warning',
                                msg:'Sure to delete this data?',
                                buttons : Ext.MessageBox.YESNO,
                                //animEl:bt.id,
                                icon :Ext.MessageBox.WARNING,
                                fn:function(b){
                                    if (b =='yes'){
                                        Ext.each(records,function(r){
                                            // console.log(r.data.status)
                                            if(r.data.status !=='Not Used'){

                                                Ext.MessageBox.show({
                                                    title:'Warning',
                                                    msg:'Sorry the data characteristics have been used',
                                                    buttons : Ext.MessageBox.OK,
                                                    icon :Ext.MessageBox.WARNING,
                                                });
                                            }else{
                                                Ext.Ajax.request({
                                                    url: 'RemoveCharacteristicsM',
                                                    params:{
                                                        _token : csrf_token,
                                                        id :r.data.id,
                                                    },

                                                    success:function(response, request){
                                                        // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                                                        store_material_characteristics_m.load({
                                                            // params:{
                                                            //     start:0,
                                                            //     limit:25
                                                            // }
                                                        });

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
                                                                    Ext.MessageBox.hide();
                                                                    Ext.MessageBox.show(
                                                                        {
                                                                            title : 'Message',
                                                                            msg:'Process Successfully !' ,
                                                                            buttons: Ext.MessageBox.OK,
                                                                            icon :  Ext.MessageBox.INFO
                                                                        }
                                                                    );
                                                                    removeData = [];
                                                                }else{
                                                                    var i = v/11;
                                                                    Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% completed');
                                                                }
                                                            };
                                                        };
                                                        for(var i = 1; i < 13; i++){
                                                            setTimeout(f(i), i*50);
                                                        }
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
                                        });
                                    }
                                }
                            });
                            // records.set('flag','Delete');
                            // store_material_characteristics_m.remove(records);
                        }
                    }
                },
            ],
            bbar:[
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_material_characteristics_m,
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
                editor_grid_material_characteristicsM
            ],
            listeners: {
                select: function(selModel, record, index, options){

                },

                beforeedit: function(plugin, context) {
					return (ROLE.EditCharacteristicsM ? true : false);
                }  				
            }
        });

        editor_grid_material_characteristicsM.on({
            scope: this,
            beforeedit: function(roweditor, context) {

            },
            afteredit: function(roweditor, context) {
                var row = grid_material_characteristicsM.getSelectionModel().getSelection()[0];
                var data = [] ;
                data.push(Ext.encode(row.data));
                // console.log(row.get('sequence'));
                Ext.Ajax.request({
                    scope:this,
                    // url : base_url+'singleview/process' ,
                    url: '/SaveCharacteristicsM',
                    method: 'POST',
                    dataType: 'json',
                    params:{
                        _token : csrf_token,
                        transaction_type : 'Material',
                        data_items :'['+data+']',
                    },
                    success:function(response, request){
                        // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                        store_material_characteristics_m.load({
                            // params:{
                            // start:0,
                            // limit:25
                            // }
                        });

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
                                    Ext.MessageBox.hide();
                                    Ext.MessageBox.show(
                                        {
                                            title : 'Message',
                                            msg:'Process Successfully !' ,
                                            buttons: Ext.MessageBox.OK,
                                            icon :  Ext.MessageBox.INFO
                                        }
                                    );
                                    removeData = [];
                                }else{
                                    var i = v/11;
                                    Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% completed');
                                }
                            };
                        };
                        for(var i = 1; i < 13; i++){
                            setTimeout(f(i), i*50);
                        }
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
                if (grid_material_characteristicsM.getSelectionModel().hasSelection()) {
                    var row = grid_material_characteristicsM.getSelectionModel().getSelection()[0];
                }
                store_material_characteristics_m.load({
                    // params:{
                    // start:0,
                    // limit:25
                    // }
                });
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
                                                grid_material_characteristicsM
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
