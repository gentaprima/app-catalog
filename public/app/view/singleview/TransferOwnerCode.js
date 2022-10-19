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
        page = pageid;
        vComboOwnwer = '';
        vComboNewOwnwer = '';

        var model_cb_creator = Ext.define('model_cb_creator', {
            extend: 'Ext.data.Model',
            // fields: ['real_name']
        });


        var store_cb_creator = Ext.create('Ext.data.Store', {
            model: model_cb_creator,
            proxy: {
                type: 'ajax',
                // url: 'cb_groupclass.php?',
                url: '/getUsers',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message'
                }
            },
            sorters: [
                {
                      property : 'real_name',
                      direction: 'ASC'
                }
            ],
            listeners: {
                'beforeload': function(store) {
                    // store.proxy.extraParams.cb_groupclass = '';
                }
            }

        });
        var model_cb_creatorX = Ext.define('model_cb_creatorX', {
            extend: 'Ext.data.Model',
            // fields: ['real_name']
        });


        var store_cb_creatorX = Ext.create('Ext.data.Store', {
            model: model_cb_creatorX,
            proxy: {
                type: 'ajax',
                // url: 'cb_groupclass.php?',
                url: '/getUsers',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message'
                }
            },
            sorters: [
                {
                      property : 'real_name',
                      direction: 'ASC'
                }
            ],
            listeners: {
                'beforeload': function(store) {
                    // store.proxy.extraParams.cb_groupclass = '';
                }
            }

        });

        var model_adr_hist_comp = Ext.define('model_adr_hist_comp', {
            extend: 'Ext.data.Model',
            // fields: ['real_name']
        });


        var store_cb_adr_hist_comp = Ext.create('Ext.data.Store', {
            model: model_adr_hist_comp,
            // groupField: 'company_code',
            remoteGroup:true,
            proxy: {
                type: 'ajax',
                url: '/getAddtionCompanyCode',//action=getInc
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message'
                }
            },
            listeners: {
                'beforeload': function(store) {
                    store.proxy.extraParams.groupField = 'company_code';
                }
            }
        });

        var cb_adr_hist_type = Ext.create('Ext.data.Store', {
            fields: ['type'],
            data: [{
                'type': 'ADDITION'
            }, {
                'type': 'FINISH'
            }, ]
        });

        //begin of bug 11     bukawindow(urlnya,tpp,idm);
 function OpenTab(main_content,MainTabId){
    Ext.getCmp('mainpanel').add(main_content);
    var tabPanel = Ext.getCmp('mainpanel');
    tabPanel.setActiveTab(MainTabId);
}
function bukawin(vurl,vjns,vidm,vcatno){
                    //     alert('line 231 :'+ vidm);
                               var leaf = true;
                               var pageid =vidm;
                               var page = vidm;   
                               var title = vjns;
                               var iconCls = 'app-grid';
                               var handler = vurl;
                               var winId = 'Window'+pageid;
                               var MainTabId = 'MainTabId'+pageid;

                               window['model_role_event_'+vidm] = Ext.define('model_role_event', {
                                extend: 'Ext.data.Model',
                            });
                            window['store_role_'+vidm] = Ext.create('Ext.data.Store', {
                                id: 'storeId_role_'+vidm,
                                model: window['model_role_event_'+vidm],
                                proxy: {
                                    type: 'ajax',
                                    url: '/getRoleEvent',
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
                                        property : 'menu_id',
                                        direction: 'ASC'
                                    }
                                ],
                                listeners: {
                                    'beforeload': function(store) {
                                        // store.proxy.extraParams.cb_groupclass = '';
                                    }
                                }
                            });
                            window['store_role_'+vidm].reload({
                                params:{
                                    start:0,
                                    limit:300,
                                    menu_id:vidm
                                },
                                callback : function(records, operation, success) {
                                    if(success){
                                        var record = records[0];
                                        if(window['store_role_'+vidm].getCount() > 0){
                                            window['store_role_'+vidm].each(function(rec) {
                                                // console.log(rec.data);
                                                var ROLE = rec.data;
                                            //    alert('line 497 : '+base_url+handler+' Pagnya: '+page);
                                                Ext.getCmp('mainpanel').body.mask('Loading MenuX line 496 ' + title + ' ....', 'x-mask-loading');
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
                                                    //    alert(tabPanel+'  items: '+items);
                                                        for(var i = 0; i < items.length; i++)
                                                        {
                                                            if(items[i].id == MainTabId){
                                                                tabPanel.setActiveTab(MainTabId);
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
                                                        Ext.getCmp('catalog_no'+page).setValue(vcatno);
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
                                            })    
                                        }  
                                    } 
                                }
                            });
                                                 
        }

//end of bug 11
        ///////////////////////////////
        //       SCRIPT HISTORY      //
        //////////////////////////////
        var model_adr_item_list = Ext.define('model_adr_item_list', {
            extend: 'Ext.data.Model',
            fields: ['adr_m_id', 'catalog_no','sap_material_code', 'raw', 'transaction_type', 'groupclass', 'inc', 'longdesc','adr_status','adr_item_status']
        });

        var store_adr_item_list = Ext.create('Ext.data.Store', {
            storeId: 'adr_item_list_Store',
            model: model_adr_item_list,
            proxy: {
                type: 'ajax',
                // url: 'adr_item_list.php?',
                // url: base_url+'adr/getAdrDItems',
                url: '/getAdditionHistoryD',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'data',
                    messageProperty: 'message'
                }
            },
            listeners: {
                'beforeload': function(store) {
                    store.proxy.extraParams.par_adr = '';
                }
            }
        });

        Ext.define('DisplayDateField', {
            extend: 'Ext.form.field.Display',

            alias: 'widget.displaydatefield',  //or in stead of alias : xtype:'displaydatefield'

            config:{
                format:"d-m-Y H:i"
            },

            renderer:function(pValue,pDisplayField){
                return Ext.util.Format.date(pValue,this.format);
            }});

        var model_adr_hist = Ext.define('model_adr_hist', {
            extend: 'Ext.data.Model',
            // fields: ['adr_no', 'adr_type', 'created_at', 'creator']
        });

        var store_adr_hist = Ext.create('Ext.data.Store', {
            storeId: 'adr_hist_Store',
            model: model_adr_hist,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/getAdditionHistoryM',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message'
                }
            },
            sorters: [
                {
                    property : 'created_at',
                    direction: 'DESC'
                }
            ],
            listeners: {
                metachange: function(store, meta) {
                    // columns = meta.columns ;
                    // adr_hist_grid.reconfigure(store,columns);
                },
                'beforeload': function(store) {
                }
            }
        });


        var adr_hist_grid = Ext.create('Ext.grid.Panel', {
            store: store_adr_hist,
            region: 'center',
            columns: [
                {
                    header: 'Detil Data Transport',
                    dataIndex: 'detil',
                    flex: 2,
                    autoSizeColumn:true,
                }
            ],
            viewConfig: {
                listeners: {
                    refresh: function(dataview) {
                        Ext.each(dataview.panel.columns, function(column) {
                            // if (column.autoSizeColumn === true)
                                // column.autoSize();
                        });
                    }
                }
            },
            bbar:[
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_adr_hist,
                    id: 'store_adr_hist_paging',
                    displayInfo: true,
                    displayMsg: 'Displaying record {0} - {1} of {2}',
                    emptyMsg: "No records to display"
                }),
            ],
        });

        var adr_item_list_grid = Ext.create('Ext.grid.Panel', {
            store: store_adr_item_list,
            id:'adr_item_list_grid'+page,
            region: 'center',
            autoScroll:true,
            columns: [
                {
                    header: 'Created BY',
                    dataIndex: 'created_by',
                    autoSizeColumn:true,
                },
                {
                    header: 'Catalogue No',
                    dataIndex: 'catalog_no',
                    autoSizeColumn:true,
                },
                {
                    header: 'SAP number',
                    dataIndex: 'sap_material_code',
                    autoSizeColumn:true,
                },
                {
                    header: 'Raw',
                    dataIndex: 'raw',
                    autoSizeColumn:true,
                },
                {
                    header: 'long description',
                    dataIndex: 'long_description',
                    autoSizeColumn:true,
                },
                {
                    header: 'Transaction Type',
                    dataIndex: 'transaction_type',
                    autoSizeColumn:true,
                },
                {
                    header: 'INC',
                    dataIndex: 'inc',
                    autoSizeColumn:true,
                },
                {
                    header: 'MGC/SGC',
                    dataIndex: 'groupclass',
                    autoSizeColumn:true,
                },
                {
                    header: 'Item status',
                    dataIndex: 'item_status',
                    autoSizeColumn:true,
                }
            ],
            tbar: [
                {
                    xtype:'textfield',
                    id:'adr_m_id'+page,
                    hidden:true
                },
                {
                    xtype: 'displayfield',
                    id: 'Detail_Data_Transport'+page,
                    width: 290,
                    labelWidth: 80,
                    fieldLabel: 'Detail Data Transport',
                    value: ''
                },
                {
                    xtype: 'tbfill'
                },
              
            ],
            bbar:[
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_adr_item_list,
                    id: 'store_adr_item_list_paging',
                    displayInfo: true,
                    displayMsg: 'Displaying record {0} - {1} of {2}',
                    emptyMsg: "No records to display"
                }),
            ],
            viewConfig: {
                listeners: {
                    refresh: function(dataview) {
                        Ext.each(dataview.panel.columns, function(column) {
                            if (column.autoSizeColumn === true)
                                column.autoSize();
                        });
                    }
                }
            },
            listeners: {
                itemclick: function(gid, record, item, index, e) {
                    var tipex = record.data.transaction_type;
                    var catno = record.data.catalog_no;
                    if ( tipex=='Material'){
                        var urlnya ='app\\view\\singleview\\SingleviewMaterial.js';
                        var tpp ='Material';
                        var idm='MNU7';
                    }else {
                        var urlnya ='app\\view\\singleview\\SingleviewService.js';
                        var tpp ='Service';
                        var idm='MNU8';
                    }
             //     alert('mau masuk windows baru'+urlnya+' jenis: '+tpp+ 'menu :'+idm+' cat no:'+catno);
                    bukawin(urlnya,tpp,idm,catno);
                }
            }
        });

        function getFieldNilai(combo, nameIn, nameOut){
           // alert('combonih getFieldNilai :'+ combo);
          //  alert('nameIn :' +nameIn);
         //   alert('nameOut: '+nameOut);
            
            try{
                 var r = combo.getStore().find(nameIn,combo.getValue());
            //     alert('hasilnya: '+r);
                 return combo.getStore().getAt(r).get(nameOut);
            }
            catch(err){
                 return'error';
            }
       }
        // =====================================================================================
        ///////////////////////////////
        //     SCRIPT CONTAINER     //
        //////////////////////////////
        // =====================================================================================
        var tab_data_tools = {
            id: 'dataToolPanelHistory'+page,
            ui: 'blue-panel',
            // title: 'ADR History',
            closable: false,
            iconCls: 'browse',

            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            dockedItems: [
                {
                    xtype: 'header',
                    style: ' backgroundColor:#FFFFFF; backgroundImage:none;text-align: center;font-color:white;font-weight: bold;font-size:15px;font-family: "Comic Sans MS", cursive, sans-serif',
                    html: 'List '+title,
                    id:'titleHeader'+pageid,
                    padding : '1 1 1 1 ',
                    frame: false,
                    // dock: 'top' //top
                }
            ],
            items: [
                {
                    flex: 1,
                    xtype: 'fieldset',
                    margin: '5 5 5 5',
                    title: 'Search Data Transport',
                    layout: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch'
                    },
                    items: [
                        {
                            width: 220,
                            layout: {
                                type: 'vbox',
                                pack: 'start',
                                align: 'stretch'
                            },
                            border:false,
                            items: [
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Owner Code',
                                    labelAlign: 'top',
                                    labelWidth: 130,
                                    width: 230,
                                    matchFieldWidth: false,
                                    forceSelection : true,
                                    mode: 'remote',
                                    triggerAction: 'all',
                                    selectOnTab: true,
                                    lazyRender: true,
                                    listClass: 'x-combo-list-small',
                                    emptyText:'Select Owner...',
                                    selectOnFocus:false,
                                    margin: '3 3 3 0',
                                    id: 'SearchOwnerTransfer',
                                    name:           'ComboOwner',
                                    hiddenName:     'real_name',
                                    displayField:   'real_name',
                                    valueField:     'user_id',
                                    minChars : 0,
                                    listConfig: {
                                        loadingText: 'Searching...',
                                        emptyText: 'No matching data found!',
                                        getInnerTpl: function() {
                                            return '{real_name} <span style="font-size: xx-small; ">{user_name}</span>';
                                        }
                                    },
                                    store: store_cb_creatorX,
                                    typeAhead: false,
                                    allowBlank:true,
                                    pageSize : 25,
                                    msgTarget: 'under',
                                    triggers: {
                                        clear: {
                                          type: 'clear',
                                          ideWhenEmpty: false,
                                          clearOnEscape: true
                                        }
                                    },
                                    listeners: {
                                        scope: this,
                                        beforequery: function(queryEvent, eOpts ,value) {
                                            var filters = [];
                                            var entity_name = new Ext.util.Filter({
                                                operator: 'like',
                                                value: queryEvent.query.toLowerCase(),
                                                property: "real_name",
                                                type: "string",
                                            });

                                            filters.push(entity_name['initialConfig']) ;

                                            store_cb_creatorX.proxy.extraParams = {
                                                filter: Ext.encode(filters),
                                                action :'getUsers'
                                            };
                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                            return true;
                                        },
                                        change: function (t,record,o) {
                                            // console.log(record);

                                        },
                                        select: function(combo) {
                                            vComboOwnwer =combo.getValue();
                                          // Ext.Msg.alert('Value', 'Value: ' + combo.getValue());
                                          //  Ext.Msg.alert('Value', 'alertnya combo: ' + vComboOwnwer);

                                        }
                                    }

                                },
                                /* */
                                {
                                    xtype:'panel',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'start',
                                        align: 'stretch'
                                    },
                                    border:false,
                                    items:[
                                        {
                                            xtype: 'tbfill'
                                        },
                                        {
                                            xtype:'button',
                                            text: 'Reset',
                                            iconCls: 'clear',
                                            width:100,
                                            handler: function() {
                                                Ext.getCmp('adr_his_creator'+page).setValue();
                                                                                  // this.up('form').getForm().reset();
                                            }
                                        },
                                        {
                                            xtype: 'tbfill'
                                        },
                                        {
                                            xtype:'button',
                                            text:'Search',  
                                            width:100,
                                            iconCls:'search',
                                            handler: function() {
                                                var userid=vComboOwnwer;
                                             //   alert('userid : '+userid);
                                                var filters = [];
                                                var adrCreatorFilter = new Ext.util.Filter({
                                                    operator: 'eq',
                                                    value: userid,
                                                    property: "created_by",
                                                    type: "string",
                                                });
                                                //if(Ext.getCmp('SearchOwner'+page).getValue() ){
                                                    filters.push(adrCreatorFilter['initialConfig']) ;
                                                //}
                                               // alert ('ini idx:'+userid);
                                                store_adr_item_list.proxy.extraParams = {
                                                    _token : csrf_token,
                                                    filter: Ext.encode(filters),
                                                    action:'getAdditionHistoryD'
                                                };
                                             //   alert ('ini id 696:'+userid);
                                                store_adr_item_list.load({
                                                    params: {
                                                    }
                                                });
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'New Owner Code',
                                    labelAlign: 'top',
                                    labelWidth: 130,
                                    width: 230,
                                    matchFieldWidth: false,
                                    forceSelection : true,
                                    mode: 'remote',
                                    triggerAction: 'all',
                                    selectOnTab: true,
                                    lazyRender: true,
                                    listClass: 'x-combo-list-small',
                                    emptyText:'Select New Owner...',
                                    selectOnFocus:false,
                                    margin: '3 3 3 0',
                                    id: 'SearchNewOwner'+page,
                                    name:           'real_name',
                                    hiddenName:     'real_name',
                                    displayField:   'user_name',
                                    valueField:     'user_id',
                                    minChars : 0,
                                    listConfig: {
                                        loadingText: 'Searching...',
                                        emptyText: 'No matching data found!',
                                        getInnerTpl: function() {
                                            return '{real_name} <span style="font-size: xx-small; ">{user_name}</span>';
                                        }
                                    },
                                    store: store_cb_creator,
                                    typeAhead: false,
                                    allowBlank:true,
                                    pageSize : 25,
                                    msgTarget: 'under',
                                    triggers: {
                                        clear: {
                                          type: 'clear',
                                          ideWhenEmpty: false,
                                          clearOnEscape: true
                                        }
                                    },
                                    listeners: {
                                        scope: this,
                                        beforequery: function(queryEvent, eOpts ,value) {
                                            var filtersx = [];
                                            var entity_namex = new Ext.util.Filter({
                                                operator: 'like',
                                                value: queryEvent.query.toLowerCase(),
                                                property: "real_name",
                                                type: "string",
                                            });

                                            filtersx.push(entity_namex['initialConfig']) ;

                                            store_cb_creator.proxy.extraParams = {
                                                filter: Ext.encode(filtersx),
                                                action :'getUsers'
                                            };
                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                            return true;
                                        },
                                        change: function (t,record,o) {
                                            // console.log(record);
                                        }
                                        ,
                                        select: function(combo) {
                                            vComboNewOwnwer =combo.getValue();
                                          // Ext.Msg.alert('Value', 'Value: ' + combo.getValue());
                                          //  Ext.Msg.alert('Value', 'alertnya combo: ' + vComboOwnwer);

                                        }
                                    }

                                },

                                /* */
                                {
                                    xtype:'panel',
                                    layout: {
                                        type: 'hbox',
                                        pack: 'start',
                                        align: 'stretch'
                                    },
                                    border:false,
                                    items:[
                                        {
                                            xtype:'button',
                                            text:'Proses Transport',
                                            width:200,
                                            iconCls:'search',
                                            handler: function() {
                                        Ext.Ajax.request({
                                            url: 'getTransportOwner_p',
                                            method: 'GET',
                                            autoAbort: false,
                                            params:{
                                                OwnerCode : vComboOwnwer,
                                                NewOwnerCode : vComboNewOwnwer,
                                                UserProses : username,
                                                ProsesCode : 1,
                                                trxno : null,
                                                _token: csrf_token,
                                            },
                    success:function(response, request){
                                                    var result = Ext.util.JSON.decode(response.responseText);
                                                    var message = "";
                                                    // console.log(result.success);
                                                    // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                                                    if(result.success == true){
                                                        store_material_cross_references.load({
                                                            params:{
                                                                start:0,
                                                                limit:25
                                                            }
                
                                                        });
                                                        message = result.message ;
                
                                                    }else{
                                                        message = result.message ;
                                                    }
                
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
                                                                        msg:'Transfer Completed',
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
                                        }
                        
                                    ]
                                }
                            
                            ]
                        },
                        {
                            flex: 1,
                            xtype: 'fieldset',
                            margin: '0 0 10 10',
                            padding: '1 1 1 1',
                            border:false,
                            layout: 'border',
                            items: [adr_item_list_grid]
                        },
                    ]
                }
            ]
        }

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
                                            title :'Data Tranport',
                                            iconCls: iconCls,
                                            border:false,
                                            layout: 'fit',
                                            items:tab_data_tools
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

                }
            }

        }

        OpenTab(main_content,MainTabId);
        Ext.getCmp('mainpanel').body.unmask();

       

    }
});
