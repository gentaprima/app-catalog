valid_script = true;
 ROLE = Ext.decode('{"ProcApp":true,"StdApp":true,"RemoveRequestRevision":true,"AddRequestRevision":true,"Plant":true,"RemoveCrossReferences":true,"RemoveFuncLoctaion":true,"StockClass":true,"StockType":true,"UOM":true,"Category":true,"MaterialType":true,"ViewNotes":true,"ApplyChangeMaterial":true,"Cataloguer":true,"AddCrossReferences":true,"MovingType":true,"MaxStock":true,"RemoveMaterial":false,"AddMaterial":false,"AddRequestDeletion":true,"AppRequestDeletion":false,"AddAdditionSubmit":true,"AddFuncLocation":true,"ApproveRevisionReq":false,"INC":true,"MGC":true,"ApprovalRevision":false,"InvButtonCatalogNoHis":false}');
// HEAD FILE
// alert(pageid);
/* Ext.define('ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TransferOwnerController',

    onAddClick: function(pageid) {
        Ext.Msg.alert('Add', 'The Add button was clicked'+pageid);
    },
    clickHandler: function(item, e, args)
    {

    },
    onRemoveClick: function (view, recIndex, cellIndex, item, e, record) {
        record.drop();
    },
	
}); */


Ext.application({
    name: 'APP',
    controllers: [
//        'MasterBankController'
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

        ///////////////////////////
        // Workflow //
        ///////////////////////////
        function WorkFlow(){
            // StatusStyle();
            var record = store_material_catalog_m.getData().items[0];
            var str = record.data.is_active;
            readOnly = true;
            Submit = true;
        }      

		function loadTransferForm(record)
		{
			if (ROLE.ApprovalTransferOwnerCode) {
                    Ext.getCmp('trx_no'+page).setValue(record.data.trx_no);
                    
					store_old_owner_code.add({
											user_id:record.data.old_owner_code,
											user_name:record.data.old_user_name												
											});

                    Ext.ComponentQuery.query('#old_owner_code'+page)[0].setValue(record.data.old_owner_code);  
                    Ext.ComponentQuery.query('#old_owner_code'+page)[0].disabled = true;  

 					store_new_owner_code.add({
											user_id:record.data.new_owner_code,
											user_name:record.data.new_user_name												
											});
                    Ext.ComponentQuery.query('#new_owner_code'+page)[0].setValue(record.data.new_owner_code);  
					Ext.ComponentQuery.query('#new_owner_code'+page)[0].disabled = true;
					
					if (record.data.proc_approver !== null) {
						Ext.ComponentQuery.query('#material_proc_approver'+page)[0].setValue(record.data.proc_approver);  
						Ext.ComponentQuery.query('#material_proc_approver'+page)[0].disabled = true;
					}
					
                    winTransferOwnerCode.animateTarget = 'AddRequestRevision'+page;
                    winTransferOwnerCode.show();     
			}
		}
		
        var model_transfer_owner_code_m = Ext.define('model_transfer_owner_code_m', {
            extend: 'Ext.data.Model',
        });

        var store_transfer_owner_code_m = Ext.create('Ext.data.Store', {
            storeId: 'store_transfer_owner_code_m'+page,
            model: model_transfer_owner_code_m,
            autoLoad:true,
            proxy: {
                type: 'ajax',
                url: 'getTransferOwnerCodeM',
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

        var grid_transfer_owner_code_m = Ext.create('Ext.grid.Panel', {
            store: store_transfer_owner_code_m,
            layout:'fit',
            margin: '0 0 0 0',
            border:true,
            region:'center',
            padding : '1 1 1 1',
            tbar:[
                {
                    // xtype:'button',
                    cls: 'x-btn-default-small',
                    text:'Add Request Owner Code',
                    border:false,
                    iconCls:'add-data',
                    baseCls: 'buttonStyle',
              //      hidden:!ROLE.AddRequestTransferOwnerCode,
             //       disabled:!ROLE.AddRequestTransferOwnerCode,
                    id:'AddRequestTransferOwnerCode'+page,
                    handler:function(){
                        form_transfer_owner_code.getForm().reset();
                        winTransferOwnerCode.animateTarget = 'AddRequestRevision'+page;
                        winTransferOwnerCode.show();
                    }
                },
                {
                    cls: 'x-btn-default-small',
                    text:'Approve Owner Code',
                    border:false,
                    iconCls:'add-data',
                    hidden:true,
               //     hidden:!ROLE.ApprovalTransferOwnerCode,
               //     disabled:!ROLE.ApprovalTransferOwnerCode,
                    id:'ApprovalTransferOwnerCode'+page,
                    handler:function(){
						// alert('working');
						// console.log(record);
						var record = grid_transfer_owner_code_m.getSelectionModel().getSelection()[0];
						loadTransferForm(record);

                    }
                },
            ],
            columns:[
                {
                    header: 'id',
                    width: 60,
                    sortable: true,
                    dataIndex: 'id',
                    hidden:true

                },
                {
                    header: 'Trx No',
                    dataIndex: 'trx_no',
                    align: 'center',
                    flex: 1,
                    sortable: true,
                },
                {
                    header: 'From Owner Code',
                    dataIndex: 'old_user_name',
                    align: 'center',
                    flex: 1
                },
                {
                    header: 'To Owner Code',
                    dataIndex: 'new_user_name',
                    align: 'center',
                    flex: 1
                },
                {
                    xtype       :'datecolumn' ,
                    text: "Created",
                    dataIndex: 'created_at',
                    autoSizeColumn:true,
                    // width: 45,
                    flex: 1,
                    sortable: true,
                    locked: false,
                    hidden: false,
                    align       : 'center',
                    renderer    :Ext.util.Format.dateRenderer('d M Y H:i','GMT'),
                    filter:'date',
                    // renderer: render_stat
                },      
                {
                    xtype       :'datecolumn' ,
                    text: "Approved",
                    dataIndex: 'proc_approver_date',
                    autoSizeColumn:true,
                    // width: 45,
                    flex: 1,
                    sortable: true,
                    locked: false,
                    hidden: false,
                    align       : 'center',
                    renderer    :Ext.util.Format.dateRenderer('d M Y H:i','GMT'),
                    filter:'date',
                    // renderer: render_stat
                },                           
                {
                    header: 'Approval',
                    dataIndex: 'proc_approver',
                    align: 'center',
                    flex: 1
                },
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
                    store: store_transfer_owner_code_m,
                    displayInfo: true,
                    displayMsg: 'Displaying record {0} - {1} of {2}',
                    emptyMsg: "No records to display"
                }),
                {
                    xtype: 'tbfill'
                },
            ],

            listeners: {
                beforequery: function(queryEvent, eOpts ,value) {
                    Ext.Ajax.abortAll();
                    return true;

                },
                beforeitemcontextmenu: function(view, record, item, index, e)
                {

                },
                itemclick: function(grid_delivery_order_m, record, item, index, e) {

                },
                itemdblclick: function(dv, record, item, index, e) {
					loadTransferForm(record);
                }
            },
        }); 
            
        var model_old_owner_code = Ext.define('model_old_owner_code', {
            extend: 'Ext.data.Model',
			//fields: ['company_code', 'user_id','user_name']
            // fields: ['itemnbr', 'sap_nbr', 'shortdesc', 'longdesc']
        });

        var store_old_owner_code = Ext.create('Ext.data.Store', {
            model: model_old_owner_code,
            proxy: {
                type: 'ajax',
                url: '/getOldOwnerCode',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message'
                }
            },
            listeners: {
                metachange: function(store, meta) {
                    // columns = meta.columns ;
                    // grid_import_cleansing_material.reconfigure(store,columns);
                },
                'beforeload': function(store) {
                    // store.proxy.extraParams.cb_inc = 'bolt';
                }
            }
        });     
        var model_new_owner_code = Ext.define('model_new_owner_code', {
            extend: 'Ext.data.Model',
            // fields: ['itemnbr', 'sap_nbr', 'shortdesc', 'longdesc']
        });

        var store_new_owner_code = Ext.create('Ext.data.Store', {
            model: model_new_owner_code,
            proxy: {
                type: 'ajax',
                url: '/getNewOwnerCode',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message'
                }
            },
            listeners: {
                metachange: function(store, meta) {
                    // columns = meta.columns ;
                    // grid_import_cleansing_material.reconfigure(store,columns);
                },
                'beforeload': function(store) {
                    // store.proxy.extraParams.cb_inc = 'bolt';
                }
            }
        });                
        ///////////////////////////////
        // Form Transfer //
        //////////////////////////////
        var form_transfer_owner_code = Ext.create('Ext.form.Panel', {
            // height:550,
            // autoHeight:true,
            // layout:'fit',
            id:'form_transfer_owner_code'+page,
            fieldDefaults: {
                // readOnly : true ,//all fiels are in readOnly mode
                padding : '1 1 1 1',
                margin : '1 1 1 5',
            },
            items:[
                {
                    xtype:'textfield',
                    fieldLabel: 'Trx No',
                    name:'trx_no',
                    id:'trx_no'+page,
                    maxLength:18,
                    labelWidth:130,
                    readOnly : true 
                    
                },
                {
                    // xtype:'combobox',
                    // fieldLabel: 'Old Owner Code',
                    // emptyText: 'Old Owner Code',
                    // // maxLength:18,
                    // labelWidth:130,
                    xtype: 'combobox',
                    fieldLabel:'Old Owner Code',
                    labelWidth: 130,
                    width: 300,
                    matchFieldWidth: false,
                    forceSelection: true,
                    name: 'old_owner_code',
                    displayField: 'user_name',
                    valueField: 'user_id',
                    store: store_old_owner_code,
                    pageSize: 15,
                    minChars : 0,
                    padding : '1 1 1 1',
                    margin : '1 1 1 5',
                    disabled:false,
                    mode: 'remote',
                    triggerAction: 'all',
                    emptyText: 'Select Old Owner ...',
                    selectOnFocus: true,
                    itemId:'old_owner_code'+page,
                    id:'old_owner_code'+page,
                    listConfig: {
                        loadingText: 'Searching...',
                        emptyText: 'No matching data found!',
                        getInnerTpl: function() {
                            return '{user_name}';
                        }
                    },
                    listeners: {
                        scope: this,
                        beforequery: function(queryEvent, eOpts ,value) {
                            var filters = [];
                            var inc_filter = new Ext.util.Filter({
                                operator: 'like',
                                value: queryEvent.query.toLowerCase(),
                                property: "user_name",
                                type: "string",
                            });
                            if(queryEvent.query.toLowerCase()){
                                filters.push(inc_filter['initialConfig']) ;
                            }
                            var company_code = new Ext.util.Filter({
                                operator: 'eq',
                                value: CompanyCode,
                                property: "company_code",
                                type: "string",
                            });
                            filters.push(company_code['initialConfig']) ;
                            var is_active = new Ext.util.Filter({
                                operator: 'eq',
                                value: '1',
                                property: "is_active",
                                type: "numeric",
                            });
                            // filters.push(is_active['initialConfig']) ;

                            // if(queryEvent.query.toLowerCase()){
                            store_old_owner_code.proxy.extraParams = {
                                filter: Ext.encode(filters),
                            };
                            store_old_owner_code.load({
                                params:{
                                    // start:0,
                                    // limit:25
                                }
                            });
                            Ext.Ajax.abortAll(); //cancel any previous requests
                            return true;

                        },
                        select: function(t, record, o) {
                            // var matching = store_material_inc.queryBy(
                            //     function(rec, id) {

                            //         if (rec.data.inc == record.data.inc) {

                                        
                            //             return;
                            //         }
                            //     });

                        }
                    },                              
                    allowBlank:false,
                    // value: '',
                    // hidden:!ROLE.INC,
                    // readOnly:true                       
                    
                },
                {
                    // xtype:'combobox',
                    // fieldLabel: 'New Owner Code',
                    // emptyText: 'New Owner Code',
                    // // maxLength:18,
                    // labelWidth:130,
                    xtype: 'combobox',
                    fieldLabel:'New Owner Code',
                    labelWidth: 130,
                    width: 300,
                    matchFieldWidth: false,
                    forceSelection: true,
                    name: 'new_owner_code',
                    displayField: 'user_name',
                    valueField: 'user_id',
                    store: store_new_owner_code,
                    pageSize: 15,
                    minChars : 0,
                    padding : '1 1 1 1',
                    margin : '1 1 1 5',
                    disabled:false,
                    mode: 'remote',
                    triggerAction: 'all',
                    emptyText: 'Select New Owner ...',
                    selectOnFocus: true,
                    itemId:'new_owner_code'+page,
                    id:'new_owner_code'+page,
                    listConfig: {
                        loadingText: 'Searching...',
                        emptyText: 'No matching data found!',
                        getInnerTpl: function() {
                            return '{user_name}';
                        }
                    },
                    listeners: {
                        scope: this,
                        beforequery: function(queryEvent, eOpts ,value) {
                            var filters = [];
                            var inc_filter = new Ext.util.Filter({
                                operator: 'like',
                                value: queryEvent.query.toLowerCase(),
                                property: "user_name",
                                type: "string",
                            });
                            if(queryEvent.query.toLowerCase()){
                                filters.push(inc_filter['initialConfig']) ;
                            }
                            var company_code = new Ext.util.Filter({
                                operator: 'eq',
                                value: CompanyCode,
                                property: "company_code",
                                type: "string",
                            });
                            filters.push(company_code['initialConfig']) ;                            
                            var group_name = new Ext.util.Filter({
                                operator: 'eq',
                                value: 'User',
                                property: "group_name",
                                type: "string",
                            });
                            filters.push(group_name['initialConfig']) ;
                            var is_active = new Ext.util.Filter({
                                operator: 'eq',
                                value: '1',
                                property: "is_active",
                                type: "numeric",
                            });
                            filters.push(is_active['initialConfig']) ;

                            // if(queryEvent.query.toLowerCase()){
                            store_new_owner_code.proxy.extraParams = {
                                filter: Ext.encode(filters),
                            };
                            store_new_owner_code.load({
                                params:{
                                    // start:0,
                                    // limit:25
                                }
                            });
                            Ext.Ajax.abortAll(); //cancel any previous requests
                            return true;

                        },
                        select: function(t, record, o) {
                            // var matching = store_material_inc.queryBy(
                            //     function(rec, id) {

                            //         if (rec.data.inc == record.data.inc) {

                                        
                            //             return;
                            //         }
                            //     });

                        }
                    },                              
                    allowBlank:false,
                    // value: '',
                    // hidden:!ROLE.INC,
                    // readOnly:true                      
                },
                {
                    xtype: 'combobox',
                    msgTarget: 'side',
                    fieldLabel: 'Proc App',
                    labelWidth: 130,
                    // width: 230,
                    matchFieldWidth: false,
                    forceSelection : true,
                    mode: 'remote',
                    triggerAction: 'all',
                    //emptyText:'Select Approval ...',
                    selectOnFocus:true,
                    itemId:'material_proc_approver'+ page,
                    id:'material_proc_approver'+ page,
                    name:           'proc_approver',
                    hiddenName:     'value',
                    displayField:   'value',
                    valueField:     'value',
                    minChars : 0,
                    store:          Ext.create('Ext.data.Store', {
                        fields : ['name', 'value'],
                        data   : [
                            {name : 'Validate',   value: 'Validate'},
                            {name : 'Not Validate',  value: 'Not Validate'},
                        ]
                    }),
                    typeAhead: true,
                    allowBlank:true,
                    msgTarget: 'under',
                    listeners: {
                        change: function (t,record,o) {

                        }

                    },
                    value: '',
                    hidden:!ROLE.ApprovalTransferOwnerCode,
                    // hidden:!ROLE.ProcApp,
                    // readOnly:true
                },                
/*                 {
                    xtype: 'displayfield',
                    id: 'request_owner'+page,
                    labelWidth: 130,
                    width: 300,
                    fieldLabel: 'Transfer Code Owner',
                    value: ''
                }, */
                {
                    xtype: 'panel',
                    margin:'0 0 10 5',
                    layout: 'hbox',
                    border:false,
                    hidden:true,
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'MaterialRibbonCat'+page,
                            width: 82,
                            value: 'CAT',
                            style: 'text-align: center;font-color:white;font-weight: bold;',
                            cls:'RibbonGrey',
                            // hidden:true,
                        },
                        {
                            xtype: 'displayfield',
                            id: 'MaterialRibbonProccApp'+page,
                            width: 82,
                            value: 'Proc App',
                            // cls:'RibbonYellow',
                            style: 'text-align: center;font-color:white;font-weight: bold;',
                            cls:'RibbonGrey',
                            // hidden:true,
                        },
                    ]
                },                
            ]
        });
        // --WINDOWS - REVISION
        // =====================================================================
        var winTransferOwnerCode = new Ext.Window({
            title:'Form Transfer Owner Code',
            id: 'winTransferOwnerCode'+page,
            layout       : 'fit',
            constrain    : true,
            height:Ext.getBody().getViewSize().height*0.50,
            width:Ext.getBody().getViewSize().width*0.50 ,
            plain: true,
            // margin: '10 10 13 10',
            bodyPadding  : '5 5 5 5',
            border       : false,
            resizable    : false,
            modal        : true,
            autoShow     : false,
            defaultFocus : 'nome',
            buttonAlign : 'right',
            closable: false,
            frame: true,
            // padding : '1 1 1 1',
            items : [
                form_transfer_owner_code
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        winTransferOwnerCode.hide();
                        form_transfer_owner_code.getForm().reset();
                    }
                }
            ],
            bbar:[
                '->',
                {
                    cls: 'x-btn-default-small',
                    text: 'Submit',
                    baseCls: 'buttonStyle',
                    iconCls:'accept',
                    margin: '0 0 0 10',
                    id:'btnSubmit'+page,
                    // hidden:!ROLE.ViewNotes,
                    // disabled:true,
                    handler: function() {
						if (! Ext.ComponentQuery.query('#material_proc_approver'+page)[0].disabled)
						{
							Ext.MessageBox.show({
								msg: 'Process saving data, Please wait...',
								progressText: 'Transfer Owner Code...',
								width:300,
								wait:true,
								waitConfig: {interval:200},
								icon:'ext-mb-download',
								animEl: 'buttonID'
							});

							form_transfer_owner_code.form.submit({
								scope:this,
								url: 'SaveTranferOwnerCode',
								method: 'POST',
								params:{
									_token : csrf_token,
								},
								success:function(response, request){
									store_transfer_owner_code_m.reload();
									var result = Ext.util.JSON.decode(request.response.responseText);
								   
									Ext.MessageBox.hide();

									winTransferOwnerCode.animateTarget = 'AddRequestTransferOwnerCode'+page;
									winTransferOwnerCode.hide();
									// Ext.getCmp('file_excel'+page).reset();

									Ext.MessageBox.show(
										{
											title: 'Message',
											msg: 'Process success',
											buttons: Ext.MessageBox.OK,
											icon: Ext.MessageBox.INFO
										}
									);                                        
									
									
								},

								failure:function(response, request){
									winTransferOwnerCode.animateTarget = 'AddRequestTransferOwnerCode'+page;
									winTransferOwnerCode.hide();
									if(typeof request.response != 'undefined')
										var mess = request.response.responseText;
									else
										var mess = 'Fields marked in red can not be blank !';

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
						winTransferOwnerCode.hide();
                        form_transfer_owner_code.getForm().reset();
                    }
                }
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
                                            title :'Owner Code',
                                            iconCls: iconCls,
                                            border:false,
                                            layout: 'fit',
                                            items:[
                                                {
                                                    xtype:'form',
                                                    layout: 'border',
                                                    border:false,
                                                    id:'formTransferOwnerCode'+pageid,
                                                    items:[grid_transfer_owner_code_m]
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
                    winTransferOwnerCode= Ext.getCmp('winTransferOwnerCode'+page);
                    if (winTransferOwnerCode)
                        winTransferOwnerCode.destroy();
                }
            }
        }

        OpenTab(main_content,MainTabId);
        Ext.getCmp('mainpanel').body.unmask();
    }
});