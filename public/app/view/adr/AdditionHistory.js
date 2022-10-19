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
        var model_cb_creator = Ext.define('model_cb_creator', {
            extend: 'Ext.data.Model',
            // fields: ['real_name']
        });


        var store_cb_creator = Ext.create('Ext.data.Store', {
            model: model_cb_creator,
            groupField: 'real_name',
            remoteGroup:true,
            proxy: {
                type: 'ajax',
                url: '/getAddtionCreator',
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
                    store.proxy.extraParams.groupField = 'real_name';
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
                         alert('line 231 :'+ vidm);
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
                    header: 'ADR No',
                    dataIndex: 'adr_no',
                    flex: 2,
                    autoSizeColumn:true,
                },{
                    header: 'ADR Status',
                    dataIndex: 'adr_status',
                    flex: 2,
                    autoSizeColumn:true,
                },{
                    xtype:"datecolumn",
                    format:"d M Y H:i",
                    header: 'Created At',
                    dataIndex: 'created_at',
                    flex: 2,
                    autoSizeColumn:true,
                },{
                    header: 'Creator',
                    dataIndex: 'real_name',
                    flex: 2,
                    autoSizeColumn:true,
                },{
                    header: 'Company Code',
                    dataIndex: 'company_code',
                    flex: 2,
                    autoSizeColumn:true,
                },
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
            listeners: {
                itemclick: function(gid, record, item, index, e) {
                    Ext.getCmp('adr_m_id'+page).setValue(record.data.id);
                    Ext.getCmp('hist_adr_no'+page).setValue(record.data.adr_no);
                    Ext.getCmp('hist_adr_status'+page).setValue(record.data.adr_status);
                    Ext.getCmp('hist_adr_date'+page).setValue(record.data.created_at);
                    Ext.getCmp('hist_adr_creator'+page).setValue(record.data.real_name);
                    var filters = [];
                    var adr_m_id_filter = new Ext.util.Filter({
                        operator: 'eq',
                        value: record.data.id,
                        property: "adr_m_id",
                        type: "string",
                    });
                    filters.push(adr_m_id_filter['initialConfig']) ;
                    store_adr_item_list.proxy.extraParams = {
                        _token : csrf_token,
                        filter: Ext.encode(filters),
                        action : 'getAdrDItems'
                    };
                    store_adr_item_list.load({
                        params:{
                        }
                    });
                }
            }
        });

        var adr_item_list_grid = Ext.create('Ext.grid.Panel', {
            store: store_adr_item_list,
            id:'adr_item_list_grid'+page,
            region: 'center',
            autoScroll:true,
            columns: [
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
                    id: 'hist_adr_no'+page,
                    width: 190,
                    labelWidth: 80,
                    fieldLabel: 'ADR number',
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    id: 'hist_adr_status'+page,
                    width: 150,
                    labelWidth: 69,
                    fieldLabel: 'ADR Status',
                    value: ''
                },
                {
                    xtype: 'displayfield',
                    id: 'hist_adr_date'+page,
                    width: 250,
                    labelWidth: 60,
                    fieldLabel: 'ADR date',
                    renderer: Ext.util.Format.dateRenderer('d M Y H:i'),
                    value: '',
                },
                {
                    xtype: 'displayfield',
                    id: 'hist_adr_creator'+page,
                    width: 190,
                    labelWidth: 55,
                    fieldLabel: 'Creator',
                    value: ''
                },
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    text: 'export to spreadsheet',
                    iconCls:'report-xls',
                    handler: function() {
                        var adr_m_id = Ext.getCmp('adr_m_id'+page).getValue();
                        if(adr_m_id){
                            var limit  = Ext.getCmp('store_adr_item_list_paging').getStore().pageSize ;
                            var currentPage    = Ext.getCmp('store_adr_item_list_paging').getStore().currentPage ;
                            var allRecords = Ext.pluck(store_adr_item_list.data.items, 'data') ;
                            Ext.Ajax.request({
                                url: 'downloadExcel/xlsx',
                                method: 'POST',
                                autoAbort: false,
                                params:{
                                    adr_no : Ext.getCmp('hist_adr_no'+page).getValue(),
                                    adr_status : Ext.getCmp('hist_adr_status'+page).getValue(),
                                    created_at : Ext.getCmp('hist_adr_date'+page).getValue(),
                                    creator : Ext.getCmp('hist_adr_creator'+page).getValue(),
                                    data : Ext.encode(allRecords),
                                     _token: csrf_token,
                                    filter: store_adr_item_list.getProxy().extraParams.filter,
                                    page: store_adr_item_list.lastOptions.page ,
                                    start: store_adr_item_list.lastOptions.start ,
                                    limit: store_adr_item_list.lastOptions.limit
                                },
                                success: function(result) {
                                    // console.log(result.responseText);
                                    if(result.status == 204) {
                                        Ext.Msg.alert('Empty Report', 'There is no data');
                                    } else if(result.status == 200) {
                                        Ext.DomHelper.append(document.body, {
                                            tag: 'iframe',
                                            id:'downloadIframe',
                                            frameBorder: 0,
                                            width: 0,
                                            height: 0,
                                            css: 'display:none;visibility:hidden;height: 0px;',
                                            src: 'downloadFile/'+result.responseText
                                        });
                                    }
                                },
                                failure: function() {
                                    //failure here will automatically
                                    //log the user out as it should
                                }
                            });
                            
                            // PopUpMsg("Message"," Modul Inprogress");
                        }else{
                            // PopUpMsg("Message","Please Select ADR No");
                        }
                    }
                }
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
                    title: 'Search Addition',
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
                                    displayField: 'real_name',
                                    valueField: 'creator_id',
                                    store: store_cb_creator,
                                    forceSelection: false,
                                    minChars: 0,
                                    // queryParam: 'par_name',
                                    queryMode: 'remote',
                                    fieldLabel: 'Creator',
                                    editable: true,
                                    id: 'adr_his_creator'+page,
                                    width: 210,
                                    labelWidth: 69,
                                    listeners: {
                                        scope: this,
                                        beforequery: function(queryEvent, eOpts ,value) {
                                            var filters = [];
                                            var groupers = [];
                                            var adrCreatorFilter = new Ext.util.Filter({
                                                operator: 'like',
                                                value: queryEvent.query.toLowerCase(),
                                                property: "creator",
                                                type: "string",
                                            });
                                            if(queryEvent.query.toLowerCase()){
                                                filters.push(adrCreatorFilter['initialConfig']) ;
                                            }
                                            // groupBy.push('real_name');
                                            var GroupByRealName = new  Ext.create('Ext.util.Grouper', {
                                                property: 'real_name',
                                                root: 'data',
                                                transform: function(o){
                                                    if (o === 'Revenue') return 1;
                                                    if (o === 'Expense') return 2;
                                                    return 3;
                                                }
                                            });
                                            groupers.push(GroupByRealName['initialConfig']) ;

                                            store_cb_creator.proxy.extraParams = {
                                                filter: Ext.encode(filters),
                                                action:'getAdrM',
                                                grouper:Ext.encode(groupers),
                                            };

                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                            return true;
                                        },
                                        select: function (combo , record ,o) {

                                        }
                                    }

                                },
                                {
                                    xtype: 'datefield',
                                    anchor: '100%',
                                    fieldLabel: 'Start Date',
                                    labelWidth: 69,
                                    id: 'start_adr_date'+page,
                                    // maxValue: new Date()
                                    // submitFormat: 'Y-m-d H:i:s',
                                    format: 'd/m/Y',
                                    // renderer    :Ext.util.Format.dateRenderer('d M Y H:i','GMT'),
                                    // submitFormat: 'Y-m-d',
                                },
                                {
                                    xtype: 'datefield',
                                    anchor: '100%',
                                    fieldLabel: 'End Date',
                                    labelWidth: 69,
                                    id: 'end_adr_date'+page,
                                    // maxValue: new Date()
                                    // submitFormat: 'Y-m-d H:i:s',
                                    format: 'd/m/Y',
                                    // renderer    :Ext.util.Format.dateRenderer('d M Y H:i','GMT'),
                                    // submitFormat: 'Y-m-d',
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Company',
                                    id: 'adr_his_comp'+page,
                                    store: store_cb_adr_hist_comp,
                                    displayField: 'company_code',
                                    valueField: 'company_code',
                                    forceSelection: true,
                                    minChars: 0,
                                    queryMode: 'remote',
                                    width: 210,
                                    labelWidth: 69,
                                    editable: true,
                                    listeners: {
                                        scope: this,
                                        beforequery: function(queryEvent, eOpts ,value) {
                                            var filters = [];
                                            var groupers = [];
                                            var adrCompanyFilter = new Ext.util.Filter({
                                                operator: 'lt',
                                                value: queryEvent.query.toLowerCase(),
                                                property: "company_code",
                                                type: "string",
                                            });
                                            if(queryEvent.query.toLowerCase()){
                                                filters.push(adrCompanyFilter['initialConfig']) ;
                                            }
                                            // groupBy.push('real_name');
                                            var GroupByRealName = new  Ext.create('Ext.util.Grouper', {
                                                property: 'company_code',
                                            });
                                            groupers.push(GroupByRealName['initialConfig']) ;

                                            store_cb_adr_hist_comp.proxy.extraParams = {
                                                filter: Ext.encode(filters),
                                                action:'getAdrM',
                                                grouper:Ext.encode(groupers),
                                            };

                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                            return true;
                                        },
                                        select: function (combo , record ,o) {

                                        }
                                    },

                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'ADR Status',
                                    id: 'adr_his_type'+page,
                                    store: cb_adr_hist_type,
                                    queryMode: 'local',
                                    displayField: 'type',
                                    valueField: 'type',
                                    editable: true,
                                    width: 210,
                                    labelWidth: 69,
                                    editable: true
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
                                                Ext.getCmp('start_adr_date'+page).setValue();
                                                Ext.getCmp('end_adr_date'+page).setValue();
                                                Ext.getCmp('adr_his_comp'+page).setValue();
                                                Ext.getCmp('adr_his_type'+page).setValue();
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
                                                var filters = [];
                                                var adrCreatorFilter = new Ext.util.Filter({
                                                    operator: 'eq',
                                                    value: Ext.getCmp('adr_his_creator'+page).getValue(),
                                                    property: "creator_id",
                                                    type: "string",
                                                });
                                                if(Ext.getCmp('adr_his_creator'+page).getValue() ){
                                                    filters.push(adrCreatorFilter['initialConfig']) ;
                                                }
                                                var start_adr_date = Ext.getCmp('start_adr_date'+page).getValue();
                                                var adrStartDateFilter = new Ext.util.Filter({
                                                    operator: 'gt',
                                                    value: Ext.Date.format(start_adr_date, 'Y-m-d'),
                                                    property: "created_at",
                                                    type: "date",
                                                });

                                                var end_adr_date = Ext.getCmp('end_adr_date'+page).getValue();
                                                var adrEndDateFilter = new Ext.util.Filter({
                                                    operator: 'lt',
                                                    value: Ext.Date.format(end_adr_date, 'Y-m-d'),
                                                    property: "created_at",
                                                    type: "date",
                                                });
                                                // if(Ext.getCmp('start_adr_date'+page).getValue() && Ext.getCmp('start_adr_date'+page).getValue()){
                                                if(Ext.getCmp('start_adr_date'+page).getValue() ){
                                                    filters.push(adrStartDateFilter['initialConfig']) ;
                                                }

                                                if(Ext.getCmp('end_adr_date'+page).getValue()){
                                                    filters.push(adrEndDateFilter['initialConfig']) ;
                                                }

                                                // }
                                                var adrCompanyFilter = new Ext.util.Filter({
                                                    operator: 'eq',
                                                    value: Ext.getCmp('adr_his_comp'+page).getValue(),
                                                    property: "company_code",
                                                    type: "string",
                                                });
                                                if(Ext.getCmp('adr_his_comp'+page).getValue()){
                                                    filters.push(adrCompanyFilter['initialConfig']) ;
                                                }
                                                var adrTypeFilter = new Ext.util.Filter({
                                                    operator: 'eq',
                                                    value: Ext.getCmp('adr_his_type'+page).getValue(),
                                                    property: "adr_status",
                                                    type: "string",
                                                });
                                                if(Ext.getCmp('adr_his_type'+page).getValue()){
                                                    filters.push(adrTypeFilter['initialConfig']) ;
                                                }
                                                store_adr_hist.proxy.extraParams = {
                                                    _token : csrf_token,
                                                    filter: Ext.encode(filters),
                                                    action:'getAdrM'
                                                };
                                                store_adr_hist.load({
                                                    params: {
                                                    }
                                                });

                                                var filters = [];
                                                var adr_m_id_filter = new Ext.util.Filter({
                                                    operator: 'eq',
                                                    value: 0,
                                                    property: "adr_m_id",
                                                    type: "string",
                                                });
                                                filters.push(adr_m_id_filter['initialConfig']) ;
                                                store_adr_item_list.removeAll();

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
                            items: [adr_hist_grid]
                        },


                    ]
                },
                {
                    flex: 1,
                    xtype: 'fieldset',
                    margin: '5 5 5 5',
                    padding: '3 3 3 3' ,
                    title: 'Addition Detail',
                    layout: 'border',
                    items: [adr_item_list_grid]
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
                                            title :'Addition History',
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
