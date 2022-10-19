ROLE = Ext.decode('{"AddAddition":true,"ProcApp":true,"StdApp":true,"RemoveRequestRevision":true,"AddRequestRevision":true,"Plant":true,"RemoveCrossReferences":true,"RemoveFuncLoctaion":true,"StockClass":true,"StockType":true,"UOM":true,"Category":true,"MaterialType":true,"ViewNotes":true,"ApplyChangeMaterial":true,"Cataloguer":true,"AddCrossReferences":true,"MovingType":true,"MaxStock":true,"RemoveMaterial":false,"AddMaterial":false,"AddRequestDeletion":true,"AppRequestDeletion":false,"AddAdditionSubmit":true,"AddFuncLocation":true,"ApproveRevisionReq":false,"INC":true,"MGC":true,"ApprovalRevision":false,"InvButtonCatalogNoHis":false}');

valid_script = true;
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

        // Import Data
        // ====================================================================================
        var winADR = new Ext.Window({
            id: 'winADR'+page,
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
                    //fileUpload		: true,
                    id:'formImportExcelADR'+page,
                    items: [
                        {
                            xtype: 'filefield',
                            width:400,
                            name: 'file_excel',
                            id: 'file_excel'+page,
                            fieldLabel: 'Excel File',
                            buttonText: 'Select File',
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
                            xtype: 'displayfield',
                            value: "Don't have excel upload template ?<br> Click <a href='/getTemplateAddition'><b>here</b></a> to download.",
                            width: 250,
                            hideLabel: true,
                            style: 'font-size: 11px; margin-top: 20px'
                        }
                    ],

                    buttons: [
                        {
                            text: 'Import',
                            handler:function(){
                                var formImportADR = Ext.getCmp('formImportExcelADR'+page);
                                Ext.MessageBox.show({
                                    msg: 'Process import data, Please wait...',
                                    progressText: 'Import...',
                                    width:300,
                                    wait:true,
                                    waitConfig: {interval:200},
                                    icon:'ext-mb-download',
                                    animEl: 'buttonID'
                                });

                                formImportADR.form.submit({
                                    scope:this,
                                    url: 'SaveImportAddition',
                                    method: 'POST',
                                    params:{
                                        _token : csrf_token,
                                    },
                                    success:function(response, request){
                                        var result = Ext.util.JSON.decode(request.response.responseText);
                                        var searchMany = result.data.length;
                                        var dataR = [];
                                        var order = 1 ;
                                        var index = 0 ;
                                        var index1 = 0 ;
                                        for (var r = 0; r < searchMany; ){
                                            order++ ;
                                            index++ ;
                                            var row = Ext.create('model_adr_entry', {
                                                    flag :result.data[r].flag ,
                                                    raw :result.data[r].raw ,
                                                    transaction_type :result.data[r].transaction_type ,
                                                    class_code :result.data[r].class_code ,
                                                    inc_code :result.data[r].inc_code ,
                                                    manuf :result.data[r].manuf ,
                                                    refnbr :result.data[r].refnbr ,
                                                });
                                            store_adr.insert(index, row);
                                            r++;
                                        }

                                        // SET ADRStatusValue
                                        submitADRStatus = true;

                                        Ext.MessageBox.hide();

                                        winADR.hide();
                                        // var win_failed = new Ext.Window(
                                        //     {
                                        //         modal: true,
                                        //         title: 'foo',
                                        //         layout: 'fit',
                                        //         items: {
                                        //             xtype: 'grid',
                                        //             data: result.failed,
                                        //         } //other grid declaration stuff here.
                                        //     }
                                        // );
                                        // win_failed.show()
                                        Ext.MessageBox.show(
                                            {
                                                title : 'Message',
                                                msg:'Import Success!' ,
                                                buttons: Ext.MessageBox.OK,
                                                icon :  Ext.MessageBox.INFO,
                                                items: {
                                                    xtype: 'grid',
                                                    store: store_adr_failed,
                                                    columns: [
                                                        {
                                                            xtype:'rownumberer',
                                                            header: 'No',
                                                            sortable: true,
                                                            align: 'center',
                                                            flex: 1,
                                                        },
                                                        {
                                                            header: 'Raw data',
                                                            dataIndex: 'raw',
                                                            align: 'center',
                                                            flex: 4,
                                                            allowBlank: true,

                                                        },
                                                        {
                                                            header: 'INC',
                                                            dataIndex: 'inc_code',
                                                            align: 'center',
                                                            flex: 4,
                                                            allowBlank: true,

                                                        },
                                                    ]
                                                }
                                            }
                                        );
                                        // win_failed.show()
                                    },

                                    failure:function(response, request){
                                        winADR.hide();
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
                        },
                        {
                            text:'Cancel',
                            handler: function(){
                                winADR.hide();
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
                        winADR.animateTarget = 'btnUploadExcel'+page;
                        winADR.hide();
                        Ext.getCmp('file_excel'+page).reset();
                    }
                }
            ],
        });
        // ====================================================================================

//begin of bug 11     bukawindow(urlnya,tpp,idm);
    function OpenTab(main_content,MainTabId){
            Ext.getCmp('mainpanel').add(main_content);
            var tabPanel = Ext.getCmp('mainpanel');
            tabPanel.setActiveTab(MainTabId);
        }
        function bukawindow(vurl,vjns,vidm,vcatno){
                              //   alert('line 231 :'+ vpage);
                                       var leaf = true;
                                       var pageid =vidm;
                                       var page = vidm;   
                                       var title = vjns;
                                       var iconCls = 'app-grid';
                                       var handler = vurl;
                                       var winId = 'Window'+pageid;
                                       var MainTabId = 'MainTabId'+pageid;

                                       if(leaf && handler !== "") {
           
                                           var tabPanel = Ext.getCmp('mainpanel');
                                           var items = tabPanel.items.items;
                                           var exist = false;
                                           for (var i = 0; i < items.length; i++) {
                                               if (items[i].id == MainTabId) {
                                                   tabPanel.setActiveTab(MainTabId);
                                                   exist = true;
                                               }
                                           }
                                           if (!exist) {
                                                 Ext.getCmp('mainpanel').body.mask('Loading Menu ' +'--'+ title + ' ....', 'x-mask-loading');
                                                               Ext.Ajax.request({
                                                                   url : vurl,
                                                                   method: 'GET',
                                                                   params: {
                                                                       // path : rec.data.path,
                                                                       // page : pageid,
                                                                       // menuid :
                                                                   },
                                                                   success : function(response){
                                                                       // var MainTabId = 'MainTabId'+pageid;
                                                                       var tabPanel = Ext.getCmp('mainpanel');
                                                                       var items = tabPanel.items.items;
                                                                       var exist = false;
                                                                     //  alert(tabPanel);
                                                                       for(var i = 0; i < items.length; i++)
                                                                       {
                                                                           if(items[i].id == MainTabId){
                                                                               tabPanel.setActiveTab(MainTabId);
                                                                               alert(MainTabId);
                                                                               exist = true;
                                                                           }
                                                                       }
                                                                       if(leaf){
                                                                           if(!exist){
                                                                               // Ext.getCmp('mainpanel').body.unmask();
                                                                               data = response.responseText;
                                                                               eval(data);
                                                                               // console.log(valid_script);
                                                                               if (valid_script){
                                                                                   // Ext.getCmp('mainpanel').add(main_content);
                                                                                   // tabPanel.setActiveTab(id_panel);
                                                                               } else {
                                                                                   Ext.MessageBox.show({
                                                                                       title: 'Alert',
                                                                                       msg: 'Sorry Modules '+ message +' Not Found',
                                                                                       buttons: Ext.MessageBox.OK,
                                                                                       icon: Ext.MessageBox.ERROR
                                                                                   });
                                                                               }
                                                                           }else{
                                                                               Ext.getCmp('mainpanel').body.unmask();
                                                                           }
                                                                       }
                                                                      
                                                                   },
                                                                   failure:function(response,success){
                                                                       var jsonResp = Ext.JSON.decode(response.responseText);
                                                                       Ext.getCmp('mainpanel').body.unmask();
                                                                       Ext.MessageBox.show({
                                                                           title: 'Error',
                                                                           msg : response.status+" Page "+response.statusText+' \r\n\r\n\r\n'+jsonResp.exception,
                                                                           buttons: Ext.MessageBox.OK,
                                                                           icon: Ext.MessageBox.ERROR
                                                                       });
                                                                   },
                                                                   renderer: function (val, metadata, record) {
                                                                       metadata.style = 'cursor: pointer;';
                                                                       return val;
                                                                   }
                                                               });                                                
                                                   }
                                           }
                }      
       

//end of bug 11

        function padDigits(number, digits) {
            return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
        }

        ///////////////////////////////
        //      SCRIPT ADDITION     //
        //////////////////////////////
        // =====================================================================================
        var model_groupclass_m = Ext.define('model_groupclass_m', {
            extend: 'Ext.data.Model',
            fields: ['group_header','group_class_name', 'groupclass', 'name']
        });

        var store_groupclass_m = Ext.create('Ext.data.Store', {
            id: 'store_groupclass_m'+pageid,
            model: model_groupclass_m,
            groupField: 'group_header',
            proxy: {
                type: 'ajax',
                // url: 'cb_groupclass.php?',
                url: 'getMgcByInc',
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
                    property : 'groupclass',
                    direction: 'ASC'
                }
            ],
            listeners: {
                'beforeload': function(store) {
                    // store.proxy.extraParams.cb_groupclass = '';
                }
            }
        });


        var model_combo_inc_m = Ext.define('model_combo_inc_m', {
            extend: 'Ext.data.Model',
            fields: ['class_inc_name','class','inc', 'description']
        });


        var store_combo_inc_m = Ext.create('Ext.data.JsonStore', {
            id:'store_combo_inc_m'+pageid,
            model: model_combo_inc_m,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: 'getIncMgc',//action=getInc
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    messageProperty: 'message',
                    rootProperty: 'data',
                    totalProperty:'total',
                },
                params:{
                    _token : csrf_token,
                },
            },
            listeners: {
                beforeload: function(store) {

                }
            }
        });
        var model_adr_entry = Ext.define('model_adr_entry', {
            extend: 'Ext.data.Model',
            fields: ['flag','raw', 'transaction_type', 'class_code', 'inc_code','manuf','refnbr','old_mat_no']
        });

        var store_adr = Ext.create('Ext.data.Store', {
            storeId: 'adr_Store',
            model: model_adr_entry,
            proxy: {
                type: 'ajax',
                // url: base_url+'adr',
                url: '/Blank',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message'
                },
                params:{
                    _token : csrf_token,
                },
            },
            listeners: {
                'beforeload': function(store) {
                    store.proxy.extraParams.adr_no = '';
                }
            }
        });
        var store_adr_failed = Ext.create('Ext.data.Store', {
            storeId: 'store_adr_failed',
            model: model_adr_entry,
            proxy: {
                type: 'ajax',
                // url: base_url+'adr',
                url: '/Blank',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message'
                },
                params:{
                    _token : csrf_token,
                },
            },
            listeners: {
                'beforeload': function(store) {
                    store.proxy.extraParams.adr_no = '';
                }
            }
        });
var store_adr_seacrh = Ext.create('Ext.data.Store', {
            storeId: 'store_adr_failed',
            model: model_adr_entry,
            proxy: {
                type: 'ajax',
                // url: base_url+'adr',
                 url:'getAdditionHistoryD',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message'
                },
                params:{
                    _token : csrf_token,
                },
            },
            listeners: {
                            scope: this,
                            beforequery: function(queryEvent, eOpts ,value) {
                                var filters = [];
                                var raw_filter = new Ext.util.Filter({
                                    operator: 'like',
                                    value: queryEvent.query.toLowerCase(),
                                    property: "raw",
                                    type: "string",
                                });

                                filters.push(raw_filter['initialConfig']) ;
								if(queryEvent.query.toLowerCase()){
                                    store_adr.proxy.extraParams = {
                                        _token : csrf_token,
                                        filter: Ext.encode(filters),
                                        action :'getAdditionHistoryD' ,
                                    };
                                }
                            },
                        },
        });
        // Bikin Cart Product Item di dalam Grid
        var editor_adr_grid =  Ext.create('Ext.grid.plugin.RowEditing', {
            licksToMoveEditor: 1,
            autoCancel: true,
            saveBtnText    : "Update",//My Save Button Text&quot;,
            saveBtnIcon: 'add-data',
            cancelBtnText: "Cancel", //Cancel Button Text&quot;,
            clicksToEdit: 2, //this changes from the default double-click activation to single click activation
            errorSummary: false //disables display of validation messages if the row is invalid

        });

        var adr_grid = Ext.create('Ext.grid.Panel', {
            store: store_adr,
            layout:'fit',
            region: 'center',
            margin: '0 0 0 0',
            border:true,
            padding : '1 1 1 1',
            tbar:[
                {
                    text: 'Add item',
                    autoDestroy: true,
                    baseCls: 'buttonStyle',
                    cls: 'x-btn-default-small',
                    iconCls :'add-data',
                    disabled:!ROLE.AddAddition?!ROLE.AddAddition:true?!ROLE.AddAddition:true,
                    frame:true,
                    handler: function() {
                        store_groupclass_m.removeAll();
                        store_combo_inc_m.removeAll();
                        Ext.getCmp('transaction_type'+pageid).reset();
                        Ext.getCmp('mgc'+pageid).reset();
                        Ext.getCmp('inc'+pageid).reset();
                        var data = [];
                        var order = 1 ;
                        var index = 0 ;
                        store_adr.each(function(r,i){
                            data.push(r.data);
                            order++ ;
                            index++ ;
                        });

                        // Create a model instance
                        var r = Ext.create('model_adr_entry', {
                            flag:'',
                            norder :order ,
                        });
                        store_adr.insert(index, r);
                        editor_adr_grid.startEdit(r, 0);

                    }
                },
                {
                    text: 'Delete item',
                    autoDestroy: true,
                    baseCls: 'buttonStyle',
                    cls: 'x-btn-default-small',
                    iconCls :'row-delete',
                    disabled:!ROLE.RemoveAddition?!ROLE.RemoveAddition:true?!ROLE.RemoveAddition:true,
                    frame:true,
                    handler: function() {
                        var selection = adr_grid.getSelectionModel().getSelection()[0];
                        if (selection) {
                            store_adr.remove(selection);
                        }
                    }
                },
                {
                    text: 'Import Data',
                    autoDestroy: true,
                    baseCls: 'buttonStyle',
                    cls: 'x-btn-default-small',
                    iconCls: 'report-xls',
                    id:'btnUploadExcel'+page,
                    tooltip: 'Upload File Excel',
                    disabled:!ROLE.ImportAddition?!ROLE.ImportAddition:true?!ROLE.ImportAddition:true,
                    scope: this,
                    handler: function(){
                        winADR.animateTarget = 'btnUploadExcel'+page;
                        winADR.setTitle("Import Data ADR"),
                            winADR.show();
                    }
                },
                {
                    text: 'Reset Data',
                    autoDestroy: true,
                    baseCls: 'buttonStyle',
                    cls: 'x-btn-default-small',
                    iconCls:'clear',
                    id:'btnResetExcel'+page,
                    tooltip: 'Reset Data',
                    disabled:!ROLE.ResetAddition?!ROLE.ResetAddition:true?!ROLE.ResetAddition:true,
                    scope: this,
                    handler: function(){
                        Ext.MessageBox.show({
                            title:'Warning',
                            msg:'Sure to reset this data?',
                            buttons : Ext.MessageBox.YESNO,
                            //animEl:bt.id,
                            icon :Ext.MessageBox.WARNING,
                            fn:function(b){
                                if (b =='yes'){
                                    store_adr.removeAll();
                                }
                            }
                        });
                    }
                }
            ],
            columns: [
                {
                    xtype:'rownumberer',
                    header: 'No',
                    sortable: true,
                    align: 'center',
                    flex: 1,
                },
                					{
                    header: 'Search Raw',
                    dataIndex: 'raw1',
                    align: 'Left',	
					hidden: false,
                    flex: 4,
                    editor: {
                        xtype: 'combo',
                        anchor: '100%',
                        forceSelection: true,
                        mode: 'remote',
                        triggerAction: 'all',
                        emptyText: 'Select ADR ...',
                        selectOnFocus: true,
                        id:'raw_name1'+pageid,
                        name: 'raw1',
                        displayField: 'raw',
                        valueField: 'raw',
                        minChars: 0,
                        store: store_adr_seacrh,
                        pageSize: 15,
						 listeners: {
                            scope: this,
                            beforequery: function(queryEvent, eOpts ,value) {
                                var filters = [];
                                var raw_filter = new Ext.util.Filter({
                                    operator: 'like',
                                    value: queryEvent.query.toLowerCase(),
                                    property: "raw",
                                    type: "string",
                                });

                                filters.push(raw_filter['initialConfig']) ;
								if(queryEvent.query.toLowerCase()){
                                    store_adr_seacrh.proxy.extraParams = {
                                        _token : csrf_token,
                                        filter: Ext.encode(filters),
                                        action :'getAdditionHistoryD' ,
                                    };
                                }
                            },
							 select: function () {
								 var niselected =Ext.getCmp('raw_name1'+pageid).getValue();	
                            Ext.getCmp('raw_name'+page).setValue(niselected);
                               }
                        },
                        allowBlank:false,
                        value: '',
                    },
                },
                {
                    header: 'Raw data',
                    dataIndex: 'raw',
                    align: 'center',
                    flex: 6,
                    allowBlank: true,
                    editor:{
                        xtype: 'textfield',
                        allowBlank: false,
                        id:'raw_name'+pageid,
                    },
                    filter:{
                        type: 'string'
                    },
                },
                {
                    header: 'Material / Service',
                    dataIndex: 'transaction_type',
                    align: 'center',
                    flex: 3,
                    filter:{
                        type: 'string'
                    },
                    editor: {
                        xtype: 'combo',
                        allowBlank: false,
                        name:           'name',
                        hiddenName:     'value',
                        displayField:   'name',
                        valueField:     'value',
                        id:'transaction_type'+pageid,
                        minChars : 0,
                        store: Ext.create('Ext.data.Store', {
                            id:'storeMaterialService',
                            fields : ['name', 'value'],
                            data   : [
                                {name : 'Material',   value: 'Material'},
                                {name : 'Service',  value: 'Service'},
                            ]
                        }),
                        listeners : {
                            change: function(t, n, o) {
                                Ext.getCmp('inc'+pageid).setDisabled(false);
                                Ext.getCmp('inc'+pageid).reset();
                                Ext.getCmp('mgc'+pageid).reset();
                                var filters = [];
                                var transactionType_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: n ,
                                    property: "transaction_type",
                                    type: "string",
                                });
                                filters.push(transactionType_filter['initialConfig']) ;
                                var is_active = new Ext.util.Filter({
                                    operator: 'eq',
                                    value:  'Active',
                                    property: "is_active",
                                    type: "string",
                                });
                                filters.push(is_active['initialConfig']) ;

                                store_combo_inc_m.proxy.extraParams = {
                                    _token : csrf_token,
                                    filter: Ext.encode(filters),
                                    action :'getIncByMGC' ,

                                };
                                store_combo_inc_m.load({
                                    params:{

                                    }
                                });
                                Ext.getCmp('mgc'+pageid).reset();
                                var filters = [];
                                var groupclassType_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: Ext.getCmp('transaction_type'+pageid).getValue(),
                                    property: "transaction_type",
                                    type: "string",
                                });
                                // if(queryEvent.query.toLowerCase()){
                                filters.push(groupclassType_filter['initialConfig']) ;
                                // }
                                var inc_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record.data.inc,
                                    property: "inc",
                                    type: "string",
                                });
                                filters.push(inc_filter['initialConfig']) ;

                                store_groupclass_m.proxy.extraParams = {
                                    _token : csrf_token,
                                    filter: Ext.encode(filters),
                                    action :'getGroupByInc' ,
                                };
                                store_groupclass_m.load({
                                    params:{

                                    }
                                });
                            },
                            select: function (combo , record ,o) {
                                Ext.getCmp('inc'+pageid).setDisabled(false);
                                Ext.getCmp('inc'+pageid).reset();
                                store_combo_inc_m.load({
                                    params:{

                                    }
                                });
                                Ext.getCmp('mgc'+pageid).reset();
                                store_groupclass_m.load({
                                    params:{

                                    }
                                });
                                /*Ext.getCmp('inc'+pageid).setDisabled(false);
                                Ext.getCmp('inc'+pageid).reset();
                                Ext.getCmp('mgc'+pageid).reset();
                                var selection = adr_grid.getSelectionModel().getSelection()[0];
                                if (selection) {
                                    console.log(selection);
                                    // store_adr.remove(selection);
                                }*/
                                /*var selection = adr_grid.getSelectionModel().getSelection()[0];
                                var rec = adr_grid.getStore().getAt(0);
                                    rec.set("class_code", "");*/

                            }

                        }

                    }
                },

                {
                    header: 'INC',
                    dataIndex: 'inc_code',
                    align: 'center',
                    flex: 6,
                    editor: {
                        xtype: 'combo',
                        anchor: '100%',
                        forceSelection: true,
                        mode: 'remote',
                        triggerAction: 'all',
                        emptyText: 'Select INC ...',
                        selectOnFocus: true,
                        id: 'inc'+pageid,
                        name: 'inc',
                        hiddenName: 'inc_code',
                        displayField: 'class_inc_name',
                        valueField: 'inc',
                        minChars: 0,
                        store: store_combo_inc_m,
                        pageSize: 15,
                        disabled:true,
                        listeners: {
                            scope: this,
                            beforequery: function(queryEvent, eOpts ,value) {
                                Ext.getCmp('mgc'+pageid).reset();
                                var filters = [];
                                var transactionType_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: Ext.getCmp('transaction_type'+pageid).getValue() ,
                                    property: "transaction_type",
                                    type: "string",
                                });
                                filters.push(transactionType_filter['initialConfig']) ;

                                var inc_filter = new Ext.util.Filter({
                                    operator: 'like',
                                    value: queryEvent.query.toLowerCase(),
                                    property: "class_inc_name",
                                    type: "string",
                                });

                                filters.push(inc_filter['initialConfig']) ;

                                var is_active = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: 'Active',
                                    property: "is_active",
                                    type: "string",
                                });
                                filters.push(is_active['initialConfig']) ;

                                if(queryEvent.query.toLowerCase()){
                                    store_combo_inc_m.proxy.extraParams = {
                                        _token : csrf_token,
                                        filter: Ext.encode(filters),
                                        action :'getIncByMGC' ,
                                    };
                                }
                                store_groupclass_m.removeAll();
                                Ext.Ajax.abortAll(); //cancel any previous requests
                                return true;
                            },
                            select: function (combo , record ,o) {
                                var matching = store_combo_inc_m.queryBy(
                                    function(rec, id) {
                                        if (rec.data.inc == record.data.inc) {
                                            Ext.getCmp('mgc'+pageid).setDisabled(false);
                                            Ext.getCmp('mgc'+pageid).reset();
                                            var filters = [];
                                            var groupclassType_filter = new Ext.util.Filter({
                                                operator: 'eq',
                                                value: Ext.getCmp('transaction_type'+pageid).getValue(),
                                                property: "transaction_type",
                                                type: "string",
                                            });
                                            // if(queryEvent.query.toLowerCase()){
                                            filters.push(groupclassType_filter['initialConfig']) ;
                                            // }
                                            var inc_filter = new Ext.util.Filter({
                                                operator: 'eq',
                                                value: record.data.inc,
                                                property: "inc",
                                                type: "string",
                                            });
                                            filters.push(inc_filter['initialConfig']) ;

                                            store_groupclass_m.proxy.extraParams = {
                                                _token : csrf_token,
                                                filter: Ext.encode(filters),
                                                action :'getGroupByInc' ,
                                            };
                                            store_groupclass_m.load({
                                                params:{

                                                }
                                            });
                                            // console.log('Disini '+record.data.inc)
                                        }
                                    });

                            },
                            change: function(t, record, o) {
                                Ext.getCmp('mgc'+pageid).setDisabled(false);
                                Ext.getCmp('mgc'+pageid).reset();
                                var filters = [];
                                var groupclassType_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: Ext.getCmp('transaction_type'+pageid).getValue(),
                                    property: "transaction_type",
                                    type: "string",
                                });
                                // if(queryEvent.query.toLowerCase()){
                                filters.push(groupclassType_filter['initialConfig']) ;
                                // console.log(record);
                                // }
                                var inc_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record,
                                    property: "inc",
                                    type: "string",
                                });
                                filters.push(inc_filter['initialConfig']) ;

                                store_groupclass_m.proxy.extraParams = {
                                    _token : csrf_token,
                                    filter: Ext.encode(filters),
                                    action :'getGroupByInc' ,
                                };
                                store_groupclass_m.load({
                                    params:{

                                    }
                                });

                            }
                        },
                        allowBlank:false,
                        value: '',
                    },
                },
                {
                    header: 'MGC/SGC',
                    dataIndex: 'class_code',
                    align: 'center',
                    flex: 6,
                    filter:{
                        type: 'string'
                    },
                    editor :{
                        xtype: 'combo',
                        anchor: '100%',
                        forceSelection: true,
                        mode: 'remote',
                        triggerAction: 'all',
                        emptyText: 'Select MGC ...',
                        selectOnFocus: true,
                        id: 'mgc'+pageid,
                        name: 'mgc',
                        // hiddenName: 'groupclass',
                        displayField: 'name',
                        valueField: 'groupclass',
                        minChars: 0,
                        store: store_groupclass_m,
                        pageSize: 15,
                        disabled:true,
                        listeners: {
                            scope: this,
                            beforequery: function(queryEvent, eOpts ,value) {
                                var filters = [];
                                var groupclassType_filter = new Ext.util.Filter({
                                    operator: 'like',
                                    value: Ext.getCmp('transaction_type'+pageid).getValue(),
                                    property: "transaction_type",
                                    type: "string",
                                });

                                filters.push(groupclassType_filter['initialConfig']) ;

                                var groupclass_filter = new Ext.util.Filter({
                                    operator: 'like',
                                    value: queryEvent.query.toLowerCase(),
                                    property: "name",
                                    type: "string",
                                });
                                
                                if(queryEvent.query.toLowerCase()){
                                    filters.push(groupclass_filter['initialConfig']) ;
                                }

                                var inc_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: Ext.getCmp('inc'+pageid).getValue(),
                                    property: "inc",
                                    type: "string",
                                });
                                filters.push(inc_filter['initialConfig']) ;

                                store_groupclass_m.proxy.extraParams = {
                                    _token : csrf_token,
                                    filter: Ext.encode(filters),
                                    action :'getGroupByInc' ,
                                };
                                store_groupclass_m.load({
                                    params:{

                                    }
                                });
                                Ext.Ajax.abortAll(); //cancel any previous requests
                                return true;
                            },
                            select: function (combo , record ,o) {

                                var matching = store_groupclass_m.queryBy(
                                    function(rec, id) {

                                        if (rec.data.groupclass == record.data.groupclass) {
                                            
                                        }
                                    });

                            },
                            change: function(t, record, o) {


                            }
                        },
                        allowBlank:false,
                        value: '',
                        // disabled:!ROLE.MGC,
                    }
                },
                {
                    header: 'Ref. No',
                    dataIndex: 'refnbr',
                    align: 'center',
                    flex: 2,
                    allowBlank: true,
                    editor:{
                        xtype: 'textfield'
                    },
                    filter:{
                        type: 'string'
                    },
                },
                 {
                    header: 'Old. Mat No',
                    dataIndex: 'old_mat_no',
                    align: 'center',
                    flex: 2,
                    allowBlank: true,
                    editor:{
                        xtype: 'textfield'
                    },
                    filter:{
                        type: 'string'
                    },
                },
                {
                    header: 'Manuacturing',
                    dataIndex: 'manuf',
                    align: 'center',
                    flex: 2,
                    allowBlank: true,
                    editor:{
                        xtype: 'textfield'
                    },
                    filter:{
                        type: 'string'
                    },
                },

            ],
            selType: 'cellmodel',
            plugins: [editor_adr_grid],
            bbar: [{
                xtype: 'tbfill'
            }, {
                cls: 'x-btn-default-small',
                text: 'Submit ADR',
                iconCls :'event-menu',
                disabled:!ROLE.AddAdditionSubmit,
                handler: function() {
                    data_adr = Ext.encode(Ext.pluck(store_adr.data.items, 'data'));

                    var rawData = Ext.getCmp('raw_name'+pageid).getValue();
                    var manData = Ext.getCmp('transaction_type'+pageid).getValue();
                    var mgcData = Ext.getCmp('mgc'+pageid).getValue();
                    var incData = Ext.getCmp('inc'+pageid).getValue();
                    var evts=0;
                    var rprs=0;
                    store_adr.each(function(record) {
                        var inc_code = record.get('inc_code');
                        var raw = record.get('raw') ;
                        if(isEmpty(raw) == true &&isEmpty(inc_code) == true) {
                            if(record.get('inc_code')) rprs+=1;
                            else evts+=1;
                        }
                    });

                    if( evts > 0 ){
                        Ext.MessageBox.show({
                            title : 'Message',
                            msg:'Please Mandatory Check' ,
                            buttons: Ext.MessageBox.OK,
                            icon :  Ext.MessageBox.WARNING
                        });
                        return true;
                    }else{
                        Ext.MessageBox.show(
                            {
                                title: 'Message',
                                msg: 'Submit Data?',
                                buttonText: {
                                    yes: 'Oke',
                                    no: 'Batal'
                                },
                                icon: Ext.MessageBox.QUESTION,
                                fn: function(buttonIcon) {
                                    if (buttonIcon === "yes") {
                                        Ext.MessageBox.show({
                                            title: 'Please wait',
                                            msg: 'Loading items...',
                                            progressText: 'Initializing...',
                                            width: 300,
                                            progress: true,
                                            closable: false,
                                            animateTarget: 'mb6'
                                        });
                                        // this hideous block creates the bogus progress
                                        var f = function(v) {
                                            return function() {
                                                if (v == 12) {
                                                    /*Ext.MessageBox.hide();
                                                    Ext.MessageBox.show(
                                                        {
                                                            title: 'Message',
                                                            msg: 'Process Successfully !!',
                                                            buttons: Ext.MessageBox.OK,
                                                            icon: Ext.MessageBox.INFO
                                                        }
                                                    );*/
                                                } else {
                                                    var i = v / 11;
                                                    Ext.MessageBox.updateProgress(i, Math.round(100 * i) + '% completed');
                                                }
                                            };
                                        };
                                        for (var i = 1; i < 13; i++) {
                                            setTimeout(f(i), i * 50);
                                        }
                                        var formAdiitionNewItems = Ext.getCmp('formAdiitionNewItems'+pageid);
                                        // PROSES SUBMIT ADDITION
                                        formAdiitionNewItems.form.submit({
                                            scope:this,
                                            url: 'CreateAddition',
                                            method: 'POST',
                                            dataType: 'html',
                                            params:{
                                                _token : csrf_token,
                                                data_grid: data_adr,
                                                user_id: userid,
                                                company_code: CompanyCode
                                            },
                                            success:function(response, request){
                                             var result = Ext.util.JSON.decode(request.response.responseText);
                                             var tipex = request.result.tipe;
                                             var catno = request.result.catno;
                                                store_adr.removeAll();
                                                store_combo_inc_m.removeAll();
                                                store_groupclass_m.removeAll();
                                                Ext.getCmp('transaction_type'+pageid).reset();
                                                Ext.getCmp('mgc'+pageid).reset();
                                                Ext.getCmp('inc'+pageid).reset();
                                                Ext.MessageBox.hide();
                                               Ext.MessageBox.show(
                                                    {
                                                        title : 'Message',
                                                        msg:'SUBMIT SUCCESS PLEASE CHECK YOUR REQUSET ON MENU HISTORY' ,
                                                        buttons: Ext.MessageBox.OK,
                                                        icon :  Ext.MessageBox.INFO
                                                    }
                                                );

                                                    var urlnya ='app\\view\\adr\\AdditionHistory.js';
                                                    var tpp ='Addition History';
                                                    var idm='MNU5';
                                                                       
                                                bukawindow(urlnya,tpp,idm,catno);
                                            },
                                            failure:function(response, request){
                                                Ext.MessageBox.hide();
                                                // winDetailMaterialDocument.hide();
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
                                        // END PROSES
                                    }
                                }
                            }
                        );
                    }
                    // END PROSES
                }
            }],
            viewConfig: {
                stripeRows: true,
                getRowClass: function(record) {
                    if (isEmpty(record.data.flag) == false) {
                        return 'red';
                    }
                    // return record.get('flag') == 'failed' ? 'filed-row' : '';
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
                                            title :'Add New Items',
                                            iconCls: iconCls,
                                            border:false,
                                            layout: 'fit',
                                            items:[
                                                {
                                                    xtype:'form',
                                                    layout: 'fit',
                                                    border:false,
                                                    id:'formAdiitionNewItems'+pageid,
                                                    items:adr_grid
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
                    winADR = Ext.getCmp('winADR'+page);
                    if (winADR)
                        winADR.destroy();
                }
            }

        }

        OpenTab(main_content,MainTabId);
        Ext.getCmp('mainpanel').body.unmask();

       

    }
});

