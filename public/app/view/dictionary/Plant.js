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
        var model_plant = Ext.define('model_plant', {
            extend: 'Ext.data.Model',
            fields: ['company_code','companies_m_id','plant_code', 'plant_description']
        });

        var store_plant = Ext.create('Ext.data.Store', {
            storeId: 'store_plant'+page,
            model: model_plant,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/getPlant',//action=getInc
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
            value: 'itemcategory',
            property: "entity_name",
            type: "string",
        });

        filters.push(entity_name['initialConfig']) ;

        store_plant.proxy.extraParams = {
            // filter: Ext.encode(filters),
            // action :'getPlant'
        };

        store_plant.reload({
            params:{
                start:0,
                limit:25
            }
        });

        var model_companies_m = Ext.define('model_companies_m', {
            extend: 'Ext.data.Model',
            fields: ['code', 'description']
        });

        var store_companies_m= Ext.create('Ext.data.Store', {
            storeId: 'store_companies_m'+page,
            model: model_companies_m,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/getCompaniesM',//action=getInc
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

// Bikin Cart Product Item di dalam Grid
        var editor_grid_plant =  Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: true,
            saveBtnText    : "Update",//My Save Button Text&quot;,
            saveBtnIcon: 'add-data',
            cancelBtnText: "Cancel", //Cancel Button Text&quot;,
            clicksToEdit: 2, //this changes from the default double-click activation to single click activation
            errorSummary: false //disables display of validation messages if the row is invalid

        });

        editor_grid_plant.on({
            scope: this,
            beforeedit: function(roweditor, context) {
				return (ROLE.EditPlant ? true : false);
            },
            afteredit: function(roweditor, context) {
                var row = grid_plant.getSelectionModel().getSelection()[0];
                var data = [] ;
                data.push(Ext.encode(row.data));
                // console.log(row.get('sequence'));
                Ext.Ajax.request({
                    scope:this,
                    // url : base_url+'singleview/process' ,
                    url: '/SavePlant',
                    method: 'POST',
                    dataType: 'json',
                    params:{
                        _token : csrf_token,
                        data_items :'['+data+']',
                    },
                    success:function(response, request){
                        // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                        store_plant.load({
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
                if (grid_plant.getSelectionModel().hasSelection()) {
                    var row = grid_plant.getSelectionModel().getSelection()[0];
                }
                store_plant.load({
                    // params:{
                    // start:0,
                    // limit:25
                    // }
                });
            }
        });
        var grid_plant = Ext.create('Ext.grid.Panel', {
            title: 'List '+title,
            border:false,
            region: 'center',
            store: store_plant,
            frame:true,
            columns: [
                {
                    dataIndex: 'companies_m_id',
                    editor:{
                        xtype: 'textfield',
                        readOnly:true,
                        id:'companies_m_id'+pageid,
                    },
                    hidden:true
                },
                {
                    text: 'Company Code',
                    dataIndex: 'company_code',
                    editor:{
                        xtype: 'textfield',
                        readOnly:true,
                        id:'company_code'+pageid,
                    },
                    filter:{
                        type:'string',
                        // operator:'lt'
                    },
                },
                {
                    text: 'Company',
                    dataIndex: 'plant_description',
                    autoSizeColumn:true,
                    flex: 2,
                    filter:'string',
                    editor:{
                        xtype: 'combo',
                        id: 'combo_plant_name'+page,
                        allowBlank: true,
                        store: store_companies_m,
                        matchFieldWidth: false,
                        forceSelection: false,
                        editable:true,
                        selectOnFocus:true,
                        minChars : 0,
                        pageSize:15,
                        displayField: 'name',
                        valueField: 'name',
                        listConfig: {
                            getInnerTpl: function() {
                                return '<span style=" ">{name}</span>';//font-size: xx-small;
                            }
                        },
                        listeners: {
                            beforequery: function(queryEvent, eOpts ,value) {
                                var filters = [];
                                var company_name_filter = new Ext.util.Filter({
                                    operator: 'like',
                                    value: queryEvent.query.toLowerCase(),
                                    property: "name",
                                    type: "string",
                                });
                                if(queryEvent.query.toLowerCase()){
                                    filters.push(company_name_filter['initialConfig']) ;
                                }

                                store_companies_m.proxy.extraParams = {
                                    filter: Ext.encode(filters),

                                };
                                Ext.Ajax.abortAll(); //cancel any previous requests
                                return true;
                            },
                            change: function() {

                            },
                            select: function(combo, record) {
                                var matching = store_companies_m.queryBy(
                                    function(rec, id) {
                                        if (rec.data.code == record.data.code) {
                                            // console.log(rec.data.code);
                                            Ext.getCmp('company_code'+page).setValue(rec.data.code);
                                            Ext.getCmp('companies_m_id'+pageid).setValue(rec.data.id);
                                            Ext.getCmp('combo_plant_name'+page).setValue(rec.data.name);
                                        }
                                    }
                                );

                                // var sel_model_ncs_char = Ext.getCmp('ncs_inc_char_grid').getSelectionModel();
                                // var record_ncs_char = sel_model_ncs_char.getSelection()[0];

                                // record_ncs_char.set("promt_id", record.data.promt_id);
                            }
                        },
                        minChars: 0,
                        // queryParam: 'cb_char',
                        queryMode: 'remote',
                        disabled:!ROLE.EditPlant,
                        readOnly:false,
                    },
                },
                {
                    text: 'Code Plant',
                    dataIndex: 'plant_code',
                    editor:{
                        xtype: 'textfield',
                    },
                    filter:{
                        type:'string',
                        // operator:'lt'
                    },
                },
                
                {
                    text: 'Status',
                    dataIndex: 'status',
                    filter:{
                        type:'string',
                        // operator:'lt'
                    },
                },

            ],
            tbar:[
                {
                    xtype:'button',
                    text: 'Add',
                    iconCls: 'add-data',
                    disabled:!ROLE.AddPlant,
                    handler: function() {
                        var data = [];
                        var order = 1 ;
                        var index = 0 ;
                        store_plant.each(function(r,i){
                            data.push(r.data);
                            order++ ;
                            index++ ;
                        });
                        // Create a model instance
                        var r = Ext.create('model_plant', {
                            flag :'Insert' ,
                        });

                        store_plant.insert(index, r);
                        editor_grid_plant.startEdit(r, 0);

                    }
                },
                {
                    xtype:'button',
                    text: 'Remove',
                    iconCls: 'row-delete',
                    disabled:!ROLE.RemovePlant,
                    handler: function() {
                        var records = grid_plant.getSelectionModel().getSelection()[0];
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
                                                    url: 'RemovePlant',
                                                    params:{
                                                        _token : csrf_token,
                                                        id :r.data.id,
                                                    },
                                                    success:function(response, request){
                                                        // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                                                        store_plant.load({
                                                            params:{
                                                                start:0,
                                                                limit:25
                                                            }
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
                    store: store_plant,
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
                editor_grid_plant,
            ],
            listeners: {
                select: function(selModel, record, index, options){

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
                                                grid_plant
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
