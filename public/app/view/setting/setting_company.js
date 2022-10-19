ROLE = Ext.decode('{"AddCompaniesM":true,"RemoveCompaniesM":true,"EditCompaniesM":true}');
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
        
        var model_companies_m = Ext.define('model_companies_m', {
            extend: 'Ext.data.Model',
            fields: ['id','code','name','status']
        });

        var store_companies_m = Ext.create('Ext.data.Store', {
            storeId: 'store_companies_m'+pageid,
            model: model_companies_m,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: true,
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

        var editor_grid_companies_m =  Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: true,
            saveBtnText    : "Update",//My Save Button Text&quot;,
            saveBtnIcon: 'add-data',
            cancelBtnText: "Cancel", //Cancel Button Text&quot;,
            clicksToEdit: 2, //this changes from the default double-click activation to single click activation
            errorSummary: false //disables display of validation messages if the row is invalid

        });

        var grid_companies_m = Ext.create('Ext.grid.Panel', {

            id:'grid_companies_m'+pageid,
            border:false,
            region: 'center',
            store: store_companies_m,
            frame:true,
            columns: [
                {
                    text: 'Company Code',
                    dataIndex: 'code',
                    filter:{
                        type:'string',
                        // operator:'lt'
                    },
                    editor:{
                        xtype: 'textfield',
                        id:'company_code'+pageid,
                        disabled:!ROLE.EditCompaniesM,
                    },
                },
                {
                    text: 'Company',
                    dataIndex: 'name',
                    autoSizeColumn:true,
                    flex: 1,
                    filter:'string',
                    editor:{
                        xtype: 'textfield',
                        id:'company_name'+pageid,
                        disabled:!ROLE.EditCompaniesM,
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
                    text: 'Add Company',
                    iconCls: 'add-data',
                    disabled:!ROLE.AddCompaniesM,
                    handler: function() {
                        var data = [];
                        var order = 1 ;
                        var index = 0 ;
                        store_companies_m.each(function(r,i){
                            data.push(r.data);
                            order++ ;
                            index++ ;
                        });
                        // Create a model instance
                        var r = Ext.create('model_companies_m', {
                            flag :'insert',
                            code :'',
                            name: '',
                        });

                        store_companies_m.insert(index, r);
                        editor_grid_companies_m.startEdit(r, 0);

                    }
                },
                {
                    xtype:'button',
                    text: 'Remove Company',
                    iconCls: 'row-delete',
                    disabled:!ROLE.RemoveCompaniesM,
                    handler: function() {
                        var records = grid_companies_m.getSelectionModel().getSelection()[0];
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
                                                    url: 'RemoveCompaniesM',
                                                    params:{
                                                        _token : csrf_token,
                                                        id :r.data.id,
                                                    },

                                                    success:function(response, request){
                                                        // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                                                        store_companies_m.load({
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
                    store: store_companies_m,
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
                editor_grid_companies_m
            ],
            listeners: {
                select: function(selModel, record, index, options){

                }

            }
        });

        editor_grid_companies_m.on({
            scope: this,
            beforeedit: function(roweditor, context) {

            },
            afteredit: function(roweditor, context) {
                var row = grid_companies_m.getSelectionModel().getSelection()[0];
                var data = [] ;
                data.push(Ext.encode(row.data));
                // console.log(row.get('sequence'));
                Ext.Ajax.request({
                    scope:this,
                    // url : base_url+'singleview/process' ,
                    url: '/SaveCompaniesM',
                    method: 'POST',
                    dataType: 'json',
                    params:{
                        _token : csrf_token,
                        data_items :'['+data+']',
                    },
                    success:function(response, request){
                        // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                        store_companies_m.load({
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
                if (grid_companies_m.getSelectionModel().hasSelection()) {
                    var row = grid_companies_m.getSelectionModel().getSelection()[0];
                }
                store_companies_m.load({
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
                                                grid_companies_m
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
