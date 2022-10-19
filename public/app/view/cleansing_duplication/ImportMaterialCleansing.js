valid_script = true;
// ROLE = Ext.decode('{"ProcApp":true,"StdApp":true,"RemoveRequestRevision":true,"AddRequestRevision":true,"Plant":true,"RemoveCrossReferences":true,"RemoveFuncLoctaion":true,"StockClass":true,"StockType":true,"UOM":true,"Category":true,"MaterialType":true,"ViewNotes":true,"ApplyChangeMaterial":true,"Cataloguer":true,"AddCrossReferences":true,"MovingType":true,"MaxStock":true,"RemoveMaterial":false,"AddMaterial":false,"AddRequestDeletion":true,"AppRequestDeletion":false,"AddAdditionSubmit":true,"AddFuncLocation":true,"ApproveRevisionReq":false,"INC":true,"MGC":true,"ApprovalRevision":false,"InvButtonCatalogNoHis":false}');
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
        var model_owner_code = Ext.define('model_owner_code', {
            extend: 'Ext.data.Model',
            // fields: ['itemnbr', 'sap_nbr', 'shortdesc', 'longdesc']
        });

        var store_owner_code = Ext.create('Ext.data.Store', {
            model: model_owner_code,
            proxy: {
                type: 'ajax',
                // url: 'cb_inc.php?',
                url: '/getUsers',
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
        // Import Data
        // ====================================================================================
		
   //	  var winImportDataCleansingMaterial =  Ext.widget('window',{
   //     var winIncM = Ext.widget('window', {
      var winImportDataCleansingMaterial = new Ext.Window({
	
            id: 'winImportDataCleansingMaterial'+page,
            layout: 'fit',
            constrain: true,
            autoHeight: true,
            plain: true,
            bodyPadding  : '5 5 0',
            border       : false,
            resizable    : false,
            modal        : true,
            autoShow     : false,
            defaultFocus : 'nome',
            buttonAlign : 'right',
            closable: false,
            frame: true,
            items : [
                {
                    bodyPadding: '10 10 0',
                    xtype:'form',
                    id:'formImportDataCleansingMaterial'+page,
                    items: [
                        {
                            xtype: 'filefield',
                            name: 'file_excel',
                            id: 'file_excel'+page,
                            fieldLabel: 'Excel File',
                            buttonText: 'Select File',
                            vtype:'FileDocument',
                            labelWidth: 70,
                            allowBlank:false,
                            msgTarget: 'side',
                            width: 300,
                            buttonText: '',
                            buttonConfig: {
                                iconCls: 'event-menu'
                            }
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel:'Owner',
                            labelWidth: 70,
                            width: 300,
                            matchFieldWidth: false,
                            forceSelection: true,
                            name: 'user_name',
                            displayField: 'user_name',
                            valueField: 'user_name',
                            store: store_owner_code,
                            pageSize: 15,
                            minChars : 0,
                            margin: '3 3 3 0',
                            disabled:false,
                            mode: 'remote',
                            triggerAction: 'all',
                            emptyText: 'Select Owner ...',
                            selectOnFocus: true,
                            itemId:'user_name'+page,
                            id:'user_name'+page,
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
                                    store_owner_code.proxy.extraParams = {
                                        filter: Ext.encode(filters),
                                    };
                                    store_owner_code.load({
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
                            xtype: 'displayfield',
                            value: "Don't have excel upload template ?<br> Click <a href='/getTemplateDataCleansing'><b>here</b></a> to download.",
                            width: 250,
                            hideLabel: true,
                            style: 'font-size: 11px; margin-top: 20px'
                        }

                    ],

                    buttons: [
                        {
                            text: 'ImportX',
                            autoDestroy: true,
                            baseCls: 'buttonStyle',
                            cls: 'x-btn-default-small',
                            iconCls: 'report-xls',
                            id:'ProsesImportDataCleansing'+page,
                            tooltip: 'Import Data Cleansing',
                            handler:function(){

                                Ext.MessageBox.show({
                                    msg: 'Process import data, Please wait...',
                                    progressText: 'Import...',
                                    width:300,
                                    wait:true,
                                    waitConfig: {interval:200},
                                    icon:'ext-mb-download',
                                    animEl: 'buttonID'
                                });

                                alert('line 217');
var formImportDataCleansingMaterial = Ext.getCmp('formImportDataCleansingMaterial'+page).form.submit({
                                    scope:this,
                                    url: '/SaveImportDataCleansing',
                                    method: 'POST',
                                    params:{
                                        _token : csrf_token,
                                        transaction_type:'Material',
                                    },
                                    success:function(response, request){
										alert('line 232');
                                        store_import_cleansing_material.reload();
                                        var result = Ext.util.JSON.decode(request.response.responseText);
                                       
                                        Ext.MessageBox.hide();
alert('line 237');
                                        winImportDataCleansingMaterial.animateTarget = 'AddImportDataCleansing'+page;
                                        winImportDataCleansingMaterial.hide();
                                        Ext.getCmp('file_excel'+page).reset();

                                        Ext.MessageBox.show(
                                            {
                                                title: 'Message',
                                                msg: 'Process completed: please check file '+result.fileresult ,
                                                buttons: Ext.MessageBox.OK,
                                                icon: Ext.MessageBox.INFO,
												fn: function(buttonValue, inputText, showConfig){											
														window.open('/getDataCleansing?filename='+result.fileresult);
													},
                                            }
                                        );                                        
                                        
                                        
                                    },

                                    failure:function(response, request){
                                        winImportDataCleansingMaterial.animateTarget = 'AddImportDataCleansing'+page;
alert('line 259'+response);
                                        winImportDataCleansingMaterial.hide();
                                        if(typeof request.response != 'undefined')
                                            var mess = request.response.responseText;
                                        else
											alert('line 264'+response);
                                            var mess = 'Fields marked in red can not be blank !';
											alert('line 265'+response+' '+mess);

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
                        },
                        {
                            text:'Cancel',
                            handler: function(){
                                winImportDataCleansingMaterial.animateTarget = 'AddImportDataCleansing'+page;
                                winImportDataCleansingMaterial.hide();
                                Ext.getCmp('file_excel'+page).reset();
                            }
                        }
                    ]
                },
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        winImportDataCleansingMaterial.animateTarget = 'AddImportDataCleansing'+page;
                        winImportDataCleansingMaterial.hide();
                        Ext.getCmp('file_excel'+page).reset();
                    }
                }
            ],
        });
               
        // ====================================================================================
        var model_import_cleansing_material = Ext.define('model_import_cleansing_material', {
            extend: 'Ext.data.Model',
            // fields: ['itemnbr', 'sap_nbr', 'shortdesc', 'longdesc']
        });

        var store_import_cleansing_material = Ext.create('Ext.data.Store', {
            model: model_import_cleansing_material,
            autoLoad:true,
            proxy: {
                type: 'ajax',
                // url: 'cb_inc.php?',
                url: '/getMultiViewCatalogM',
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
                    columns = meta.columns ;
                    // grid_import_cleansing_material.reconfigure(store,columns);
                },
                'beforeload': function(store) {
                    // store.proxy.extraParams.cb_inc = 'bolt';
                }
            }
        });

        var filters = [];
        var transaction_type = new Ext.util.Filter({
            operator: 'eq',
            value: 'Material',
            property: "transaction_type",
            type: "string",
        });
        filters.push(transaction_type['initialConfig']) ;
        var trx = new Ext.util.Filter({
            operator: 'eq',
            value: 'Cleansing',
            property: "trx",
            type: "string",
        });
        filters.push(trx['initialConfig']) ;
        store_import_cleansing_material.filter(filters);
        store_import_cleansing_material.proxy.extraParams = {
            filter: Ext.encode(filters),
            action:'getMultiView'
        };        
        var grid_import_cleansing_material = Ext.create('Ext.grid.Panel', {
            title: 'Data Cleansing Material',
            store: store_import_cleansing_material,
            frame: true,
            region: 'center',
            tbar: [
                {
                    text: 'Import Data',
                    autoDestroy: true,
                    baseCls: 'buttonStyle',
                    cls: 'x-btn-default-small',
                    iconCls: 'report-xls',
                    id:'AddImportDataCleansing'+page,
                    tooltip: 'Import Data Cleansing',
                    // disabled:!ROLE.AddImportDataCleansing,
                    scope: this,
                    handler: function(){
                        winImportDataCleansingMaterial.animateTarget = 'AddImportDataCleansing'+page;
                        winImportDataCleansingMaterial.setTitle("Import Data Cleansing Material"),
                        winImportDataCleansingMaterial.show();
                    }
                },
            ],
            columns: [
                {
                    header: 'id',
                    width: 60,
                    sortable: true,
                    dataIndex: 'id',
                    hidden:true

                },
                {
                    header: "SNC",
                    dataIndex: 'short_name_code',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    hidden:false,
                    filter:'string',
                    autoSizeColumn:true
                },
                // END SEND EMAIL MATERIAL
                {
                    header: "Catalogue No",
                    dataIndex: 'catalog_no',
                    width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                },
                {
                    header: "Short Description",
                    dataIndex: 'short_description',
                    width: 250,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:false
                },
                {
                    header: "ADR Number",
                    dataIndex: 'adr_no',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true
                },
                {
                    xtype       :'datecolumn' ,
                    text: "Addition Date",
                    dataIndex: 'addition_date',
                    autoSizeColumn:true,
                    width: 45,
                    sortable: true,
                    locked: false,
                    hidden: false,
                    align       : 'center',
                    renderer    :Ext.util.Format.dateRenderer('d M Y H:i','GMT'),
                    filter:'date',
                    // renderer: render_stat
                },
                {
                    text: "SAP No",
                    dataIndex: 'sap_material_code',
                    width: 150,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    // autoSizeColumn:true,
                    },
                {
                    xtype       :'datecolumn' ,
                    text: "SAP Check Date",
                    dataIndex: 'sap_material_code_date',
                    autoSizeColumn:true,
                    width: 45,
                    sortable: true,
                    locked: false,
                    hidden: false,
                    align       : 'center',
                    format      : 'd/m/Y' ,
                    renderer    :Ext.util.Format.dateRenderer('d M Y H:i','GMT'),
                    filter:'date',
                },
                {
                    text: "SAP Check Name",
                    dataIndex: 'sap_material_code_by',
                    width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true
                },
                {
                    text: "Material Owner",
                    dataIndex: 'owner',
                    width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true
                },
                {
                    text: "Status ADR",
                    dataIndex: 'adr_status',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true,
                    renderer: function(value, meta) {
                        if (value === 'FINISH') {
                            meta.tdCls = 'green';
                            return value ;
                        }

                        meta.tdCls = 'red';
                        return value;
                    }
                },
                {
                    text: "Item Status",
                    dataIndex: 'item_status',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true,
                    cls: 'custom-dirty',
                    renderer: function(value, meta) {
                        if (value === 'ORIGIN' || value.substring(0, 8) === 'REVISION') {
                            meta.tdCls = 'green';
                            return value ;
                        }

                        meta.tdCls = 'red';
                        return value;
                    }
                },
                {
                    text: "INC",
                    dataIndex: 'inc',
                    width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                },
                {
                    text: "MGC",
                    dataIndex: 'groupclass',
                    width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true,
                    
                },

                {
                    text: "Long Description",
                    dataIndex: 'long_description',
                    // width: 100,
                    width: 250,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:false
                },
                {
                    text: "Char value",
                    dataIndex: 'char_value',
                    // width: 100,
                    width: 250,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:false,
                    hidden:true,
                    disabled:true,
                },
                {
                    text: "Raw Data",
                    dataIndex: 'raw',
                    width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:false
                },
                {
                    text: "Material Type",
                    dataIndex: 'material_type',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true
                },
                {
                    text: "UOM",
                    dataIndex: 'uom',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true,
                },
                {
                    text: "Category",
                    dataIndex: 'category',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true,
                },
                {
                    text: "Cataloguer",
                    dataIndex: 'cataloguer',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true,
                },
                {
                    text: "Cataloguer Name",
                    dataIndex: 'cataloguer_by',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true
                },
                {
                    xtype       :'datecolumn' ,
                    text: "Cataloguer Check Date",
                    dataIndex: 'cataloguer_date',
                    autoSizeColumn:true,
                    width: 45,
                    sortable: true,
                    locked: false,
                    hidden: false,
                    align       : 'center',
                    format      : 'd/m/Y' ,
                    renderer    :Ext.util.Format.dateRenderer('d M Y H:i','GMT'),
                    // renderer: render_stat
                },
                {
                    text: "Old Material Number",
                    dataIndex: 'old_material_code',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true,
                },
                {
                    text: "Cross Reference",
                    dataIndex: 'refno',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true,
                },
                {
                    text: "Manufacturer",
                    dataIndex: 'manufactur',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true,
                },
                {
                    text: "Std App",
                    dataIndex: 'std_approval',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true,
                },
                {
                    text: "Std App Name",
                    dataIndex: 'std_approval_by',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true,
                },
                {
                    xtype       :'datecolumn' ,
                    text: "Std App Check Date",
                    dataIndex: 'std_approval_date',
                    autoSizeColumn:true,
                    width: 45,
                    sortable: true,
                    locked: false,
                    hidden: false,
                    align       : 'center',
                    format      : 'd/m/Y' ,
                    renderer    :Ext.util.Format.dateRenderer('d M Y H:i','GMT'),
                    // renderer: render_stat
                },
                {
                    text: "Proc App",
                    dataIndex: 'proc_approver',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true,
                },
                {
                    text: "Proc App Name",
                    dataIndex: 'proc_approver_by',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true
                },
                {
                    xtype       :'datecolumn' ,
                    text: "Proc App Check Date",
                    dataIndex: 'proc_approver_date',
                    autoSizeColumn:true,
                    width: 45,
                    sortable: true,
                    locked: false,
                    hidden: false,
                    align       : 'center',
                    format      : 'd/m/Y' ,
                    renderer    :Ext.util.Format.dateRenderer('d M Y H:i','GMT'),
                    // renderer: render_stat
                },
            ],
            viewConfig: {
                listeners: {
                    refresh: function(dataview) {
                        Ext.each(dataview.panel.columns, function(column) {
                            // if (column.autoSizeColumn === true)
                                // column.autoSize();
                                // Ext.grid.ColumnModel(column);
                            // if (column.dataIndex.created_at)
                            // console.log(column.dataIndex.created_at);
                        });

                        // my_date = Ext.Date.parse("2012-01-03 5:43:21 PM", "Y-m-d g:i:s A");
                        // console.log(my_date);
                    }
                }
            },
            bbar: [
                Ext.create('Ext.PagingToolbar', {
                    store: store_import_cleansing_material,
                    pageSize: 15,
                    // id: 'paging_multi',
                    displayInfo: true,
                    displayMsg: '{0} - {1} of {2}',
                    emptyMsg: "No records to display",
                    border:false,
                    listeners: {
                        beforechange: function() {

                            /*if (this.getStore().getModifiedRecords().length > 0) {
                                // console.log('store has dirty records');
                                Ext.MessageBox.alert('Warning', 'Save modified items first!');
                                return false;
                            } else {
                                return true;
                            }*/
                        }
                    }
                }),     
            ]       
            
        });

        // var cleaning_panel = Ext.create('Ext.Panel', {
        //     layout: {
        //         type: 'vbox',
        //         align: 'stretch',
        //     },
        //     bodyStyle: {
        //         background: '#D9D9D9'
        //     },
        //     items: [
        //         {
        //             xtype: 'panel',
        //             title: 'Data Cleansing',
        //             flex: 1,
        //             margin: '3 3 3 3',
        //             layout: 'border',
        //             items: [grid_import_cleansing_material]
        //         },
        //     ]
        // });

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
                                            title :'Material',
                                            iconCls: iconCls,
                                            border:false,
                                            layout: 'fit',
                                            items:[
                                                {
                                                    xtype:'form',
                                                    layout: 'border',
                                                    border:false,
                                                    id:'formImportCleansingMaterial'+page,
                                                    items:[grid_import_cleansing_material]
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
                    winImportDataCleansingMaterial= Ext.getCmp('winImportDataCleansingMaterial'+page);
                    if (winImportDataCleansingMaterial)
                        winImportDataCleansingMaterial.destroy();
                }
            }

        }

        OpenTab(main_content,MainTabId);
        Ext.getCmp('mainpanel').body.unmask();



    }
});
