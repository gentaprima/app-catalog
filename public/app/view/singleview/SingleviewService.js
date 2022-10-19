valid_script = true;
BtnDataOwnerT = false;
Idxabbr =9000;
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
        var page = pageid;
        var char_count = 0 ;
        var desc_temp = "";
        var desclong_temp = "";
        var itemsPerPage = 15;

        //////////////////////////
        // Service Single View //
        //////////////////////////

        var ServiceCharacteristicsEditor = false ;
        var ServiceCrossRef = false;
        var ServiceFuncLoc = false;
        var delimiter = ";";
        var sparator  = ":";

        //////////////////////////
        // Service Group Class //
        //////////////////////////
        var model_mgc = Ext.define('model_mgc', {
            extend: 'Ext.data.Model',
        });

        var store_mgc = Ext.create('Ext.data.Store', {
            model: model_mgc,
            groupField: 'group_header',
            proxy: {
                type: 'ajax',
                // url: 'cb_groupclass.php?',
                url: '/getMgcByInc',
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
                    property : 'groupclass',
                    direction: 'ASC'
                }
            ],
            listeners: {

            }
        });
////////////
/////data transport///
//////


     var winDataTransport = Ext.widget('window', {
        id:'winDataTransport'+page,
        layout       : 'fit',
        constrain    : true,
        width: 450,
        height: 150,
        x: 50,
        y: 50,
        plain: true,
        bodyPadding  : '5 5 0',
        border       : false,
        resizable    : false,
        modal        : true,
        autoShow     : false,
        defaultFocus : 'nome',
        buttonAlign : 'right',
        closable: false,
        items: [   
            {
                xtype: 'textfield',
                margin: '5 10 5 10',
                labelAlign: 'top',
                fieldLabel: 'Flow Data Owner ',
                id: 'service_flowdata'+page,
                width: 500,
               editable: true,
                html: '',
            }
        ],
        tools: [
            {
                type: 'close',
                handler: function () {
                    winDataTransport.animateTarget = 'btnDataTransport'+page;
                    winDataTransport.hide();
                }
            }
        ],
    });

        //////////////////
        // Service INC //
        //////////////////
        var model_service_inc = Ext.define('model_cb_inc', {
            extend: 'Ext.data.Model',
            // fields: ['class_inc_name','class','inc', 'description']
        });
        var store_service_inc = Ext.create('Ext.data.Store', {
            model: model_service_inc,
            proxy: {
                type: 'ajax',
                // url: 'cb_inc.php?',
                url: '/getIncMgc',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message'
                }
            },
            listeners: {

            }
        });

        ///////////////////
        // Service Type //
        ///////////////////
        var model_service_type = Ext.define('model_service_type', {
            extend: 'Ext.data.Model',//Meta Data Model
        });
        var store_service_type = Ext.create('Ext.data.Store', {
            model: model_service_type,
            // groupField: 'group_header',
            proxy: {
                type: 'ajax',
                // url: 'cb_groupclass.php?',
                url: '/getServiceType',
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
                    direction: 'ASC'
                }
            ],
            listeners: {

            }
        });

        //////////////////
        // Service UOM //
        //////////////////
        var model_service_uom = Ext.define('model_service_uom', {
            extend: 'Ext.data.Model',//Meta Data Model
        });

        var store_service_uom = Ext.create('Ext.data.Store', {
            model: model_service_uom,
            // groupField: 'group_header',
            proxy: {
                type: 'ajax',
                // url: 'cb_groupclass.php?',
                url: '/getUOM',
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
                    property : 'uom',
                    direction: 'ASC'
                }
            ],
            listeners: {

            }
        });

        ///////////////////////
        // Service Category //
        ///////////////////////
        var model_service_category = Ext.define('model_service_category', {
            extend: 'Ext.data.Model',//Meta Data Model
        });

        var store_service_category = Ext.create('Ext.data.Store', {
            model: model_service_category,
            // groupField: 'group_header',
            proxy: {
                type: 'ajax',
                // url: 'cb_groupclass.php?',
                url: '/getCategory',
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
                    property : 'uom',
                    direction: 'ASC'
                }
            ],
            listeners: {
                'beforeload': function(store) {
                    // store.proxy.extraParams.cb_groupclass = '';
                }
            }
        });

  //////////////////////////////
        // Grid service Abbreviation //
        //////////////////////////////
        var model_service_abbr = Ext.define('model_service_abbr', {
            extend: 'Ext.data.Model',
            fields: ['entity_name','code', 'description']
        });
        var store_service_abbr = Ext.create('Ext.data.Store', {
            storeId: 'store_service_abbr'+page,
            model: model_service_abbr,
            proxy: {
                type: 'ajax',
                url: '/getAbbreviation',
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
                    // store.proxy.extraParams.itemnbr_param = current_matno;
                }
            }
        });

        var grid_service_abbr = Ext.create('Ext.grid.Panel', {
            width: 343,
            height: 250,
            title: 'Selected & Doubled Click',
            margin: '0 0 0 0',
            tbar: [{
                xtype: 'textfield',
                emptyText: 'filter',
                fieldLabel: 'Description',
                listeners: {
                    specialkey: function(field, e){
                        if (e.getKey() == e.ENTER) {
                            ndesc = field.getValue(); 
                      //      alert('Desc :'+ndesc);
                            var filters = [];
                            var entity_name_filter = new Ext.util.Filter({
                                operator: 'eq',
                                value: 'abbreviation',
                                property: "entity_name",
                                type: "string",
                            });
                            filters.push(entity_name_filter['initialConfig']) ;

                            if (ndesc) {
                                var entity_name_filter = new Ext.util.Filter({
                                    operator: 'like',
                                    value: ndesc,
                                    property: "description",
                                    type: "string",
                                });
                                filters.push(entity_name_filter['initialConfig']) ;
                            } 
                            store_service_abbr.proxy.extraParams = {
                                filter: Ext.encode(filters),
                                action:'getAbbreviation'
                            };
                            
                            store_service_abbr.load({
                                params:{
                                    // action : 'getInc',
                                    // filter: Ext.encode(filters),
                                }
                            });    


                        } 
                    }
                }
            }],
            store:store_service_abbr,
            hideHeaders:false,
            columns:[
                {
                    xtype:'rownumberer',
                    header: 'No',
                    width: 60,
                    sortable: true,
                    // dataIndex: 'norder',

                },
                {
                    text: 'Description',
                    dataIndex: 'description',
                    autoSizeColumn:true,
                    flex: 1,
                },
                {
                    text: 'Code',
                    dataIndex: 'code',
                    autoSizeColumn:true,
                    flex: 1,
                },            ],
          bbar:[
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_service_abbr,
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
            listeners: {
                beforequery: function(queryEvent, eOpts ,value) {
                   
                    Ext.Ajax.abortAll(); //cancel any previous requests
                    return true;

                },
                beforeitemcontextmenu: function(view, record, item, index, e)
                {
                    // e.stopEvent();
                    // gridMenuserviceImages.showAt(e.getXY());
                },
                
                itemdblclick: function(grid, record, rowIndex, index, e) {
              
                  if (ServiceCharacteristicsEditor)
                    {
                        var rowdata = store_service_abbr.data.items[index];
                        var isiAbbr = rowdata.data['code'];
                        var record = grid_service_inc_characteristic.store.getAt(Idxabbr);
                        record.set('nvalue', isiAbbr);
                    }
                 else { alert('No Change');}

                 winServiceAbbr.animateTarget = 'btnserviceAbbr'+page;
                 winServiceAbbr.hide();
               
                }
 
            },
        });


        var winServiceAbbr = Ext.widget('window', {
            id:'winserviceAbbr'+page,
            layout       : 'fit',
            constrain    : true,
            width: 500,
            height: 400,
            plain: true,
            bodyPadding  : '5 5 0',
            border       : false,
            resizable    : false,
            modal        : true,
            autoShow     : false,
            defaultFocus : 'nome',
            buttonAlign : 'right',
            closable: false,
            items: [
                grid_service_abbr
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        winServiceAbbr.animateTarget = 'btnserviceAbbr'+page;
                        winServiceAbbr.hide();
                    }
                }
            ],
        });


        //////////////////////////////
        // Grid Service Owner Code //
        //////////////////////////////
        var model_Service_OwnerCode = Ext.define('model_Service_OwnerCode', {
            extend: 'Ext.data.Model',
            fields: ['trx_no','catalog_no','old_owner_code', 'new_owner_code', 'tgl']
        });
        var store_Service_OwnerCode = Ext.create('Ext.data.Store', {
            storeId: 'store_Service_OwnerCode'+page,
            model: model_Service_OwnerCode,
            proxy: {
                type: 'ajax',
                url: '/geTrxCodeHisto',
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
                    // store.proxy.extraParams.itemnbr_param = current_matno;
                }
            }
        });

        var grid_Service_OwnerCode = Ext.create('Ext.grid.Panel', {
            width: 500,
            height: 250,
            margin: '0 0 0 0',
            store:store_Service_OwnerCode,
            hideHeaders:false,
            columns:[
                {
                    xtype:'rownumberer',
                    header: 'No',
                    width: 30,
                    sortable: true,
                    // dataIndex: 'norder',

                },
                {header: 'Procces At',
                    width: 150,
                    dataIndex: 'tgl',
                    flex: 1
                },
                {
                    header: 'Old Owner',
                    width: 150,
                    sortable: true,
                    dataIndex: 'old_owner_code',
                },
                {
                    header: 'New Owner',
                    width: 150,
                    dataIndex: 'new_owner_code',
                    // autoSizeColumn:true,
                    flex: 1
                },
                {
                    text: 'Trx No',
                    dataIndex: 'trx_no',
                    // autoSizeColumn:true,
                    flex: 5,
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
            listeners: {
                beforequery: function(queryEvent, eOpts ,value) {
                    /*queryEvent.combo.store.proxy.extraParams = {
                     'filter[0][field]':'user_name' ,
                     'filter[0][data][type]':'string' ,
                     'filter[0][data][value]':queryEvent.query,
                     'limit':queryEvent.combo.pageSize,
                     };*/
                    Ext.Ajax.abortAll(); //cancel any previous requests
                    return true;

                },
                beforeitemcontextmenu: function(view, record, item, index, e)
                {
                    // e.stopEvent();
                    // gridMenuServiceImages.showAt(e.getXY());
                },
                itemclick: function(grid_delivery_order_m, record, item, index, e) {

                }
            },
        });

        var winServiceOwnerCode = Ext.widget('window', {
            id:'winServiceOwnerCode'+page,
            layout       : 'fit',
            constrain    : true,
            width: 500,
            height: 200,
            plain: true,
            bodyPadding  : '5 5 0',
            border       : false,
            resizable    : false,
            modal        : true,
            autoShow     : false,
            defaultFocus : 'nome',
            buttonAlign : 'right',
            closable: false,
            items: [
                grid_Service_OwnerCode
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        winServiceOwnerCode.animateTarget = 'btnServiceOwnerCode'+page;
                        winServiceOwnerCode.hide();
                    }
                }
            ],
        });




        ///////////////////////////////////////
        // Grid Service INC Characteristics Value //
        ///////////////////////////////////////
		function update_desc_from_characteristics() {
                            // console.log('Setelah EDIT');
                            var desc_temp = "";
                            var desclong_temp = "";

                            var namecodeval = Ext.getCmp('service_name_code'+page).getValue();
                            var namecodeval_short = Ext.getCmp('service_short_name_code'+page).getValue();
                            // console.log(namecodeval_short);
                            desc_temp = desc_temp + namecodeval_short ;
                            desclong_temp = desclong_temp + namecodeval_short ;

                            var char_count = store_service_item_char.getCount();

                            if (char_count >= 1) {
                                var nvalue =  [];
                                var valchar =  [];
                                var r = 1;
                                for (i = 0; i < char_count; i++) {
                                    var characteristic = store_service_item_char.getAt(i).data.characteristics.trim();
                                    var val = store_service_item_char.getAt(i).data.nvalue;
                                    if(val){
                                        var cutt = true;
                                        if(r === 1){
                                            var StartChar = desc_temp + val ;
                                            if(StartChar.length < 39){
                                                desc_temp = desc_temp + ":";
                                            }
                                            desclong_temp = desclong_temp  + ":";
                                            if(StartChar.length == 41){
                                                Ext.getCmp('service_short_description'+page).setValue(Ext.getCmp('service_short_name_code'+page).getValue());
                                                cutt = false;
                                            }else if(StartChar.length > 41){
                                                Ext.getCmp('service_short_description'+page).setValue(Ext.getCmp('service_short_name_code'+page).getValue());
                                                cutt = false;
                                            }else{
                                                cutt = true;
                                            }
                                        }
                                        if(cutt){
                                            if(StartChar.length < 39){
                                                nvalue.push(val);
                                            }

                                        }

                                        valchar.push(characteristic+sparator+' '+val);
                                        r++;
                                    }

                                }
                                desc_temp = desc_temp+nvalue.join(delimiter);
                                desclong_temp = desclong_temp + valchar.join(delimiter);

                            }

                            if (desc_temp.length > 40) {
                                desc_temp = desc_temp.substr(0, 41);
                                var end_str = desc_temp.substr(40, 1);
                                if (end_str == ";") {
                                    desc_temp = desc_temp.substr(0, 40);
                                } else {
                                    var i = 39;
                                    while (desc_temp.substr(i, 1) != ";") {
                                        desc_temp = desc_temp.substr(0, i);
                                        i = i - 1;
                                    }
                                    desc_temp = desc_temp.substr(0, i);
                                }
                            }
                            Ext.getCmp('service_short_description'+page).setValue(desc_temp);
                            Ext.getCmp('service_long_description'+page).setValue(desclong_temp);
			
		}
        var model_characteristic_nvalue = Ext.define('model_characteristic_nvalue', {
            extend: 'Ext.data.Model',
            fields: ['sequence', 'flag' ,'characteristics', 'nvalue', 'type']
        });

        var store_characteristics_nvalue = Ext.create('Ext.data.Store', {
            id: 'store_characteristics_nvalue'+page,
            model: model_characteristic_nvalue,
            // groupField: 'group_header',
            proxy: {
                type: 'ajax',
                // url: 'cb_groupclass.php?',
                url: '/getItemsIncCharacteristicsValue',
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
                    property : 'inc_characteristics_id',
                    direction: 'ASC'
                }
            ],
            listeners: {
                'beforeload': function(store) {
                    // store.proxy.extraParams.cb_groupclass = '';
                }
            }
        });

        var winCharacteristicValue = Ext.widget('window', {
            title: 'Characteristics Value',//+ ,
            id:'winCharacteristicValue'+page,
            layout       : 'fit',
            constrain    : true,
            // height       : 500,
            // width        : 650,
            width: 450,
            height: 300,
            // x: 50,
            // y: 50,
            plain: true,
            bodyPadding  : '5 5 0',
            border       : false,
            resizable    : false,
            modal        : true,
            autoShow     : false,
            defaultFocus : 'nome',
            buttonAlign : 'right',
            closable: false,
            // items :[form_search_efaktur],
            items: [
                {
                    xtype:'gridpanel',
                    title:'Value',
                    border:false,
                    region: 'center',
                    store: store_characteristics_nvalue,
                    frame:true,
                    columns: [
                        {
                            header: 'Value',
                            dataIndex: 'nvalue',
                            flex: 1
                        },
                    ],
                    bbar:[
                        Ext.create('Ext.PagingToolbar', {
                            border:false,
                            store: store_characteristics_nvalue,
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
                    listeners: {
                        itemdblclick: function(grid, record, item, index, e) {
							winCharacteristicValue.hide();
							if (ServiceCharacteristicsEditor==true) {
								var selModel = grid_service_inc_characteristic.getSelectionModel();
								selModel.getSelection()[0].set('nvalue', record.data.nvalue);
								update_desc_from_characteristics();
							}
                        }
                    }
                }
                // grid_inc_characteristics_value
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        // frmEFakturRequestShow.animateTarget = 'AddDataM'+page;
                        winCharacteristicValue.hide();
                    }
                }
            ],
        });


        ///////////////////////////////////////
        // Grid service INC Characteristics //
        ///////////////////////////////////////
        var model_service_item_char = Ext.define('model_service_item_char', {
            extend: 'Ext.data.Model',
            fields: ['sequence', 'flag' ,'characteristics', 'nvalue', 'type']
        });
        var store_service_item_char = Ext.create('Ext.data.Store', {
            storeId: 'store_service_item_char',
            id :'store_service_item_char'+page,
            model: model_service_item_char,
            proxy: {
                type: 'ajax',
                // url: 'se_charval.php?',
                url: 'getItemsIncCharacteristics',//&action=getIncCharacteristic
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message'
                }
            },
            /*sorters: [
             {
             property : 'sequence',
             direction: 'ASC'
             }
             ],*/
            listeners: {
                beforeload: function(store) {

                },
                load: function() {

                }
            }
        });

        var grid_service_inc_characteristic = Ext.create('Ext.grid.Panel', {
            title: 'Characteristic',
            region: 'center',
            height:200,
            collapsible:true,
            // width :300,
            anchor:'100%',
            id: 'service_adr_items_char_grid'+page,
            store: store_service_item_char,
            sortableColumns: false,
            frame:true,
            margins: '5 5 5 5',
            selType: 'cellmodel',
            columns: [
                {
                    header: 'No .',
                    dataIndex: 'sequence',
                    width:75,
                    // autoSizeColumn:true,
                    // flex: 1
                },
                {
                    header: 'id',
                    dataIndex: 'id',
                    width:75,
                    locked: true,
                    hidden: true,
                    enableColumnHide : true,
                    menuDisabled : true,
                    sortable: false,
                    // display:false
                    // disabled:true
                    // autoSizeColumn:true,
                    // flex: 1
                },
                {
                    header: 'flag1',
                    dataIndex: 'flag',
                    locked: true,
                    hidden: true,
                    enableColumnHide : true,
                    menuDisabled : true,
                    sortable: false,
                    // hidden:true,
                    // enableHiding :true,
                    // display:false
                    // enableColumnHide: false
                    // EnableColumnHide:true
                    // disabled:true
                    // flex: 6
                },
                {
                    header: 'Characteristic',
                    dataIndex: 'characteristics',
                    autoSizeColumn:true,
                    // flex: 6
                },
                {
                    xtype      : 'actioncolumn',
                    header      : 'Hist',
                    align     : 'center',
                    sortable  : false,
                    hideable  : false,
                    resizable : false,
                    draggable : false,
                    dataIndex : 'ativo',
                    width     : 50,
                    items     : [
                        {
                            getClass: function(v, meta, rec) {
                                // return rec.get('ativo') == 1 ? 'icon-btn-enabled' : 'icon-btn-disabled';
                                return 'icon-btn-enabled';
                            },
                            // listeners:function(){

                            // }
                        }
                    ],
                    handler: function( view, rowIndex, colIndex, item, e, record, row ) {
                        var filters = [];

                        var characteristics_filter = new Ext.util.Filter({
                            operator: 'eq',
                            value: record.data.inc_characteristics_id,
                            property: "inc_characteristics_id",
                            type: "numeric",
                        });
                        filters.push(characteristics_filter['initialConfig']) ;

                        store_characteristics_nvalue.proxy.extraParams = {
                            filter: Ext.encode(filters),
                            grouper: '['+Ext.encode(
                                        {
                                            property: 'nvalue',
                                            direction: 'ASC'
                                        }
                                    )+']',                            
                        };
                        store_characteristics_nvalue.reload({
                            params:{
                                start:0,
                                limit:25
                            }
                        });
						
						grid_service_inc_characteristic.getSelectionModel().select(rowIndex);					
						
                        winCharacteristicValue.show();
                        Ext.getBody().unmask();
                        // this.fireEvent( 'editaction', arguments );
                        // console.log(record);
                        // var filters = [];
                        // var inc_filter = new Ext.util.Filter({
                        //     operator: 'eq',
                        //     value: record.data.inc,
                        //     property: "inc",
                        //     type: "string",
                        // });
                        // filters.push(inc_filter['initialConfig']) ;
                        // var characteristics_filter = new Ext.util.Filter({
                        //     operator: 'eq',
                        //     value: record.data.characteristics,
                        //     property: "characteristics",
                        //     type: "string",
                        // });
                        // filters.push(characteristics_filter['initialConfig']) ;
                        // var mrcode_filter = new Ext.util.Filter({
                        //     operator: 'eq',
                        //     value: record.data.mrcode,
                        //     property: "mrcode",
                        //     type: "string",
                        // });
                        // // filters.push(mrcode_filter['initialConfig']) ;
                        //
                        // store_characteristics_nvalue.proxy.extraParams = {
                        //     filter: Ext.encode(filters),
                        //     action :'getIncCharacteristicsValue'
                        // };
                        // store_characteristics_nvalue.reload({
                        //     params:{
                        //         start:0,
                        //         limit:25
                        //     }
                        // });
                        //
                        // /*store_characteristics_nvalue.each( function (model) {
                        //  // var nvalue = model.get('nvalue');
                        //  // Ext.getCmp('nvalue'+page).setValue(nvalue);
                        //  // console.log( model.get('characteristics') );
                        //  }); */
                        // // console.log(store_characteristics_nvalue.getData().items[0].data);
                        // // winCharacteristicValue.animateTarget = this.id;
                        // winCharacteristicValue.show();
                        // Ext.getBody().unmask();
                    }
                },
                {
                    header: 'Value',
                    dataIndex: 'nvalue',
                     maxLength:250,
                      enableKeyEvents: true,
                    // autoSizeColumn:true,
                    width:150,
                    editor: {
                        xtype: 'textfield',
						fieldStyle: 'text-transform:uppercase',
                        // id:'adr_d_items_characteristic_value'+page,
                        allowBlank: true,
                        // maxLength:30,
                        readOnly:false,
                        listeners: {
                            change : function(obj, newValue){
								obj.setRawValue(newValue.toUpperCase());
                                var row = Ext.getCmp('service_adr_items_char_grid'+page).getSelectionModel().getSelection()[0];
                                if(isEmpty(row.get('adr_d_items_characteristic_id')) == false){
                                    row.set('flag','Update');
                                }else{
                                    row.set('flag','Insert');
                                }
                                 
                                var panjang= obj.getValue();
                                var pjg =panjang.length;
                                if(pjg >= 250) 
                                {      alert('Words More then 250'); 
                                      obj.setRawValue(panjang.slice(0, panjang.length-(panjang.length-250)));
                                }

                            }
                        },
                    },
                },
                  {
                    xtype      : 'actioncolumn',
                    header      : 'Abbr',
                    id : 'btnGrd_abbr'+page,
                    align     : 'center',
                    sortable  : false,
                    hide      : ServiceCharacteristicsEditor,
                    resizable : false,
                    draggable : false,
                    dataIndex : 'ativo',
                    width     : 50,
                    items     : [
                        {
                            getClass: function(v, meta, rec) {
                                // return rec.get('ativo') == 1 ? 'icon-btn-enabled' : 'icon-btn-disabled';
                                return 'icon-btn-enabled';
                            },
                            // listeners:function(){

                            // }
                        }
                    ],
                    handler: function( view, rowIndex, colIndex, item, e, record, row ) {
                      winServiceAbbr.animateTarget = 'btnServiceAbbr'+page;
                      winServiceAbbr.setTitle("Abbreviation  For Catalog No : "+Ext.getCmp('catalog_no'+page).getValue()),
                      winServiceAbbr.show();
                        Idxabbr=rowIndex;

                        var filters = [];
                        var entity_name_filter = new Ext.util.Filter({
                            operator: 'eq',
                            value: 'abbreviation',
                            property: "entity_name",
                            type: "string",
                        });
                        filters.push(entity_name_filter['initialConfig']) ;
                        store_service_abbr.proxy.extraParams = {
                            filter: Ext.encode(filters),
                            action:'getAbbreviation'
                        };
                        store_service_abbr.load({
                            params:{
                                // action : 'getInc',
                                // filter: Ext.encode(filters),
                            }
                        });                    }
                    },
                {
                    header: 'Type',
                    dataIndex: 'type',
                    // flex: 2
                }
            ],
            selModel: 'cellmodel',
            plugins: [
                {
                    ptype: 'cellediting',
                    clicksToEdit: 2,
                    listeners: {
                        beforeedit: function() {
                            return ServiceCharacteristicsEditor;
                        },
                        afteredit: function() {
							update_desc_from_characteristics();
                        }
                    }
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
        });


        ///////////////////////////////////
        // Grid Service Cross Reference //
        ///////////////////////////////////
        var model_service_cross_references = Ext.define('model_service_cross_references', {
            extend: 'Ext.data.Model',
            fields: ['flag','refno','old_material_code','manufactur', 'type']
        });
        var store_service_cross_references = Ext.create('Ext.data.Store', {
            storeId: 'store_service_cross_references',
            model: model_service_cross_references,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/getItemsCrossReferences',//action=getInc
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
        var grid_editor_service_cross_references =  Ext.create('Ext.grid.plugin.RowEditing', {
            licksToMoveEditor: 1,
            autoCancel: true,
            saveBtnText    : "Update",//My Save Button Text&quot;,
            saveBtnIcon: 'add-data',
            cancelBtnText: "Cancel", //Cancel Button Text&quot;,
            clicksToEdit: 2, //this changes from the default double-click activation to single click activation
            errorSummary: false //disables display of validation messages if the row is invalid

        });
        var grid_service_cross_references = Ext.create('Ext.grid.Panel', {
            title: 'Cross References',
            region: 'center',
            collapsible:true,
            store: store_service_cross_references,
            height :200,
            frame:true,
            margins: '5 5 5 5',
            columns: [
                {
                    dataIndex:'flag',
                    hidden:true
                },
                {
                    text: 'ref. no.',
                    dataIndex: 'refno',
                    flex: 3,
                    editor: {
                        xtype: 'textfield',
                        id:'service_refno'+page,
                        allowBlank: true
                    }
                },
                {
                    text: 'Old Service Code',
                    dataIndex: 'old_material_code',
                    flex: 3,
                    editor: {
                        xtype: 'textfield',
                        id:'old_service_code'+page,
                        allowBlank: true
                    }
                },
                {
                    text: 'manufacturer/vendor',
                    dataIndex: 'manufactur',
                    flex: 3,
                    editor: {
                        xtype: 'textfield',
                        id:'service_manufactur'+page,
                        allowBlank: true
                    }
                }, {
                    text: 'type',
                    dataIndex: 'type',
                    flex: 1,
                    editor: {
                        xtype: 'textfield',
                        id:'service_cross_references_type'+page,
                        allowBlank: true
                    }
                }],
            viewConfig: {
                stripeRows: true
            },
            plugins:[
                grid_editor_service_cross_references
            ],
            tbar:[
                {
                    xtype:'button',
                    text: 'Add References',
                    iconCls: 'add-data',
                    id:'btnServiceAddCrossReferences'+page,
               //     hidden:!ROLE.AddCrossReferences,
                    disabled:true,
                    handler: function() {
                        var data = [];
                        var order = 1 ;
                        var index = 0 ;
                        // var sequence = 1 ;
                        // var sequence = parseInt(store_service_cross_references.totalCount)+1 ;
                        // Ext.getCmp('sequence'+page).readOnly=true;
                        store_service_cross_references.each(function(r,i){
                            data.push(r.data);
                            order++ ;
                            index++ ;
                        });
                        // Create a model instance
                        var r = Ext.create('model_service_cross_references', {
                            flag :'Insert' ,
                            // sequence : sequence,
                            // inc : Ext.getCmp('detail_inc'+page).getValue() ,
                            // type: 'O',
                        });

                        store_service_cross_references.insert(0, r);
                        grid_editor_service_cross_references.startEdit(r, 0);

                    }
                },
                {
                    xtype:'button',
                    text: 'Remove References',
                    iconCls: 'row-delete',
                    id:'btnServiceRemoveCrossReferences'+page,
                //    hidden:!ROLE.RemoveCrossReferences,
                    disabled:true,
                    handler: function() {
                        var records = grid_service_cross_references.getSelectionModel().getSelection()[0];
                        if (records) {
                            Ext.Ajax.request({
                                scope:this,
                                url: 'DeletedItemsCrossReference',
                                method: 'POST',
                                dataType: 'html',
                                params:{
                                    _token : csrf_token,
                                    id: records.data.id,
                                },
                                success:function(response, request){
                                    var result = Ext.util.JSON.decode(response.responseText);
                                    var message = "";
                                    // console.log(result.success);
                                    // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                                    if(result.success == true){
                                        store_service_cross_references.load({
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
                                                        msg:message,
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
                            // records.set('flag','Delete');
                            // store_service_cross_references.remove(records);
                        }
                    }
                },
                /*{
                 xtype:'button',
                 text: 'Apply Char',
                 iconCls: 'accept',
                 disabled:!ROLE.ApplyChangeCharacteristic,
                 },*/
            ],
            listeners: {
                beforerender: function() {
                    if (user_level != 'USER') {
                        // Ext.getCmp('se_ref_add').setVisible(false);
                        // Ext.getCmp('se_ref_remove').setVisible(false);
                    }
                    if (user_level == 'CAT') {
                        // Ext.getCmp('se_ref_add').setVisible(true);
                        // Ext.getCmp('se_ref_remove').setVisible(true);
                    }
                }
            }
        });
        grid_editor_service_cross_references.on({
            scope: this,
            beforeedit: function(roweditor, context) {

            },
            afteredit: function(roweditor, context) {
                var row = grid_service_cross_references.getSelectionModel().getSelection()[0];
                Ext.Ajax.request({
                    scope:this,
                    url: 'SaveItemsCrossReferences',
                    method: 'POST',
                    dataType: 'html',
                    params:{
                        _token : csrf_token,
                        adr_d_items_id: Ext.getCmp('service_adr_d_items_id'+page).getValue(),
                        cross_references : "["+Ext.encode(row.data)+"]",
                    },
                    success:function(response, request){
                        var result = Ext.util.JSON.decode(response.responseText);
                        var message = "";
                        if(result.success == true){
                            message = result.message ;

                        }else{
                            message = result.message ;
                        }
                        store_service_cross_references.load({
                            params:{
                                start:0,
                                limit:25,
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

                        var f = function(v){
                            return function(){
                                if(v == 12){
                                    Ext.MessageBox.hide();
                                    Ext.MessageBox.show(
                                        {
                                            title : 'Message',
                                            msg:message ,
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
                if (grid_service_inc_characteristic.getSelectionModel().hasSelection()) {
                    var row = grid_service_inc_characteristic.getSelectionModel().getSelection()[0];
                }
            }
        });

        /////////////////////////////////////
        // Grid Service Function Location //
        /////////////////////////////////////
        var model_service_funloc = Ext.define('model_service_funloc', {
            extend: 'Ext.data.Model',
            fields: ['flag', 'adr_d_items_id','name', 'description']
        });
        var store_service_funloc = Ext.create('Ext.data.Store', {
            storeId: 'funloc_Store',
            model: model_service_funloc,
            proxy: {
                type: 'ajax',
                url: '/getItemsFuncloc',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message'
                }
            },
            listeners: {

            }
        });
        var grid_editor_service_funcloc =  Ext.create('Ext.grid.plugin.RowEditing', {
            licksToMoveEditor: 1,
            autoCancel: true,
            saveBtnText    : "Update",//My Save Button Text&quot;,
            saveBtnIcon: 'add-data',
            cancelBtnText: "Cancel", //Cancel Button Text&quot;,
            clicksToEdit: 2, //this changes from the default double-click activation to single click activation
            errorSummary: false //disables display of validation messages if the row is invalid

        });
        var grid_service_funcloc = Ext.create('Ext.grid.Panel', {
            title: 'Functional Locations',
            region: 'center',
            collapsible:true,
            store: store_service_funloc,
            height :200,
            frame:true,
            margins: '5 5 5 5',
            columns:[
                {
                    dataIndex: 'flag',
                    hidden: true,
                    flex: 1
                },
                {
                    text: 'Loc. Name',
                    dataIndex: 'name',
                    editor: {
                        id:'service_func_loc_name'+page,
                        xtype: 'textfield',
                        allowBlank: true
                    },
                    flex: 2
                },
                {
                    text: 'description',
                    dataIndex: 'description',
                    editor: {
                        xtype: 'textfield',
                        id:'service_func_loc_description'+page,
                        allowBlank: true
                    },
                    flex: 3
                }
            ],
            plugins:[
                grid_editor_service_funcloc
            ],
            tbar:[
                {
                    xtype:'button',
                    text: 'Add FuncLoc',
                    iconCls: 'add-data',
                    id:'btnServiceAddFuncLocation'+page,
             //       hidden:!ROLE.AddFuncLocation,
                    disabled:true,
                    handler: function() {
                        var data = [];
                        var order = 1 ;
                        var index = 0 ;
                        store_service_funloc.each(function(r,i){
                            data.push(r.data);
                            order++ ;
                            index++ ;
                        });
                        // Create a model instance
                        var r = Ext.create('model_service_funloc', {
                            flag :'Insert' ,

                        });

                        store_service_funloc.insert(0, r);
                        grid_editor_service_funcloc.startEdit(r, 0);

                    }
                },
                {
                    xtype:'button',
                    text: 'Remove',
                    iconCls: 'row-delete',
                    id:'btnServiceRemoveFuncLocation'+page,
                 //   hidden:!ROLE.RemoveFuncLoctaion,
                    disabled:true,
                    handler: function() {
                        var records = grid_service_funcloc.getSelectionModel().getSelection()[0];
                        if (records) {
                            Ext.Ajax.request({
                                scope:this,
                                url: 'DeletedItemsFuncLoc',
                                method: 'POST',
                                dataType: 'html',
                                params:{
                                    _token : csrf_token,
                                    id: records.data.id,
                                },
                                success:function(response, request){
                                    var result = Ext.util.JSON.decode(response.responseText);
                                    var message = "";
                                    // console.log(result.success);
                                    // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                                    if(result.success == true){
                                        store_service_funloc.load({
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
                                                        msg:message,
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
                },
            ],
            // listeners: {
            //     beforerender: function() {
            //         if (user_level != 'USER') {
            //             // Ext.getCmp('se_funcloc_add').setVisible(false);
            //             // Ext.getCmp('se_funcloc_remove').setVisible(false);
            //         }
            //         if (user_level == 'CAT') {
            //             // Ext.getCmp('se_funcloc_add').setVisible(true);
            //             // Ext.getCmp('se_funcloc_remove').setVisible(true);/
            //         }
            //     }
            // }
        });
        grid_editor_service_funcloc.on({
            scope: this,
            beforeedit: function(roweditor, context) {

            },
            afteredit: function(roweditor, context) {
                var row = grid_service_funcloc.getSelectionModel().getSelection()[0];
                Ext.Ajax.request({
                    scope:this,
                    url: 'SaveItemsFuncloc',
                    method: 'POST',
                    dataType: 'html',
                    params:{
                        _token : csrf_token,
                        adr_d_items_id: Ext.getCmp('service_adr_d_items_id'+page).getValue(),
                        funcloc : "["+Ext.encode(row.data)+"]",
                    },
                    success:function(response, request){
                        var result = Ext.util.JSON.decode(response.responseText);
                        var message = "";
                        if(result.success == true){
                            message = result.message ;

                        }else{
                            message = result.message ;
                        }
                        store_service_funloc.load({
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
                // prdChange();
            },
            canceledit : function(){
                if (grid_service_inc_characteristic.getSelectionModel().hasSelection()) {
                    var row = grid_service_inc_characteristic.getSelectionModel().getSelection()[0];
                }
            }
        });

        //////////////////////////////////
        // Windows Service Raw Source  //
        //////////////////////////////////

        var winServiceRawSource = Ext.widget('window', {
            id:'winServiceRawSource'+page,
            layout       : 'fit',
            constrain    : true,
            width: 450,
            height: 250,
            x: 50,
            y: 50,
            plain: true,
            bodyPadding  : '5 5 0',
            border       : false,
            resizable    : false,
            modal        : true,
            autoShow     : false,
            defaultFocus : 'nome',
            buttonAlign : 'right',
            closable: false,
            items: [
                {
                    xtype: 'textfield',
                    margin: '5 10 5 10',
                    labelAlign: 'top',
                    fieldLabel: 'Raw Data ',
                    id: 'service_raw'+page,
                    width: 500,
                    editable: true,
                    html: '',
                },
            ],
			 buttons: [
                {
                    text: 'Save',
                    iconCls:'icon-save',
                    id: 'btnSavematerial_raw'+page,
                    disabled: false,
                handler:function(){
                  //  alert(' boleh proses ?'+BtnDataOwnerT);
                    if (!BtnDataOwnerT)
                            {
                            alert( 'You are Not Authorised');
                            winMaterialRawSource.hide();
                            }
                          else { 

                                Ext.MessageBox.show({
                                    msg: 'Saving your data, please wait...',
                                    progressText: 'Saving...',
                                    width:300,
                                    wait:true,
                                    waitConfig: {interval:200},
                                    icon:'ext-mb-download',
                                    animEl: 'buttonID'
                                });
                            Ext.Ajax.request({
                            url: 'SaveMaterialRaw',
                            method: 'GET',
                            autoAbort: false,
                            params:{
                                _token : csrf_token,
                                catalog_no : Ext.getCmp('catalog_no'+page).getValue(),
                                newRaw : Ext.getCmp('service_raw'+page).getValue(),
                                } ,
                            success:function(response, request){
                                
                                Ext.MessageBox.hide();

                                Ext.MessageBox.show(
                                    {
                                        alwaysOnTop: true,
                                        title : 'Message',
                                        msg:'Process Successfully !' ,
                                        buttons: Ext.MessageBox.OK,
                                        icon :  Ext.MessageBox.INFO
                                    }
                                );

                                winMaterialRawSource.hide();

                            },
                            failure:function(response, request){
                                // winDetailMaterialDocument.hide();
                                if(typeof request.response != 'undefined')
                                    var mess = request.response.responseText;
                                else
                                    var mess = 'Fields marked in red can not be blank !' ;
                                Ext.MessageBox.show(
                                    {
                                        alwaysOnTop: true,
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
                }   
                ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        winServiceRawSource.animateTarget = 'btnServiceViewRaw'+page;
                        winServiceRawSource.hide();
                    }
                }
            ],
        });

        /////////////////////////////////////
        // Windows Grid service Documents //
        /////////////////////////////////////
        var gridMenuServiceDocument = Ext.create('Ext.menu.Menu', {
            items: [
                {
                    text: 'Menu',
                    iconCls:'',
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                text: 'Delete Image',
                                iconCls: 'row-delete',
                                disabled:!ROLE.RemoveServiceItemsDocuments,
                                handler    : function() {
                                    var record = grid_service_document.getView().getSelectionModel().getSelection()[0];
                                    var id = record.data.id ;

                                    Ext.MessageBox.show({
                                        msg: 'Saving your data, please wait...',
                                        progressText: 'Saving...',
                                        width:300,
                                        wait:true,
                                        waitConfig: {interval:200},
                                        icon:'ext-mb-download',
                                        animEl: 'buttonID'
                                    });

                                    Ext.Ajax.request({
                                        scope:this,
                                        // url : base_url+'singleview/process' ,
                                        url: '/DeleteServiceDocument',
                                        method: 'POST',
                                        dataType: 'html',
                                        params:{
                                            _token : csrf_token,
                                            id : id,
                                        },
                                        success:function(response, request){
                                            store_service_document.load({
                                                params:{
                                                    start:0,
                                                    limit:25
                                                }
                                            });
                                            Ext.MessageBox.hide();
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
                            },
                        ]
                    }
                },
            ]
        });
        var model_service_document = Ext.define('model_service_document', {
            extend: 'Ext.data.Model',
        });
        var store_service_document = Ext.create('Ext.data.Store', {
            id: 'store_service_document'+page,
            model: model_service_document,
            proxy: {
                type: 'ajax',
                url: '/getServiceItemsDocument',
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
                    property : 'id',
                    direction: 'ASC'
                }
            ],
            listeners: {
                beforeload: function(store) {
                }
            },
            pageSize:25,
        });
        var grid_service_document = Ext.create('Ext.grid.Panel', {
            width: 343,
            margin: '0 0 0 0',
            store:store_service_document,
            columns:[
                {
                    header:'Document Name',
                    dataIndex:'document_name'
                },
                {
                    xtype:'actioncolumn',
                    // iconCls:'arrow-down',
                    renderer: function (val, obj, record) {
                        if(record.data.url != null ){
                            return '<a target="_blank" href="'+base_url+'service_document/'+record.data.url+'"><span><img src="images/icon/arrow_down.png" /></span>'+ ' ' +record.data.url+'</a>';
                        }
                    }
                }
            ],
            bbar:[
                {
                    xtype:'button',
                    text:'Add Document',
                    iconCls:'add-data',
                    id:'addMatDocument'+page,
                    hidden:false,
                    disabled:!ROLE.AddServiceItemsDocuments,
                    handler:function(){
                        Ext.getCmp('formServiceDocumentUplod'+page).getForm().reset();
                        winDetailServiceDocument.animateTarget = 'addMatDocument'+page;
                        winDetailServiceDocument.show();
                    }
                },
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_service_document,
                    displayInfo: false,
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
            listeners: {
                beforequery: function(queryEvent, eOpts ,value) {
                    Ext.Ajax.abortAll(); //cancel any previous requests
                    return true;

                },
                beforeitemcontextmenu: function(view, record, item, index, e)
                {
                    e.stopEvent();
                    gridMenuServiceDocument.showAt(e.getXY());
                },
                itemclick: function(grid_delivery_order_m, record, item, index, e) {

                }
            },
        });
        var winDetailServiceDocument = new Ext.Window({
                // title:'Documens Catalog No. '+ Ext.getCmp('service_catalog_no'+page).getValue(),
                id: 'winDetailServiceDocument'+page,
                layout       : 'fit',
                constrain    : true,
                width: 450,
                height: 150,
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
                        id:'formServiceDocumentUplod'+page,
                        items: [
                            {
                                xtype: 'textfield',
                                width:400,
                                id: 'service_document_name'+page,
                                name:'document_name',
                                fieldLabel: 'Document Name'
                            },
                            {
                                xtype: 'filefield',
                                width:400,
                                emptyText: 'Select as document',
                                fieldLabel: 'File Document',
                                name: 'document_path',
                                id:'document_path'+page,
                                vtype:'FileDocument',
                                buttonText: '',
                                buttonConfig: {
                                    iconCls: 'event-menu'
                                }
                            }
                        ],

                        buttons: [
                            {
                                text: 'Save',
                                iconCls:'icon-save',
                                handler:function(){
                                    var formServiceImagesUplod = Ext.getCmp('formServiceDocumentUplod'+page);
                                    // console.log(formServiceImagesUplod);
                                    Ext.MessageBox.show({
                                        msg: 'Saving your data, please wait...',
                                        progressText: 'Saving...',
                                        width:300,
                                        wait:true,
                                        waitConfig: {interval:200},
                                        icon:'ext-mb-download',
                                        animEl: 'buttonID'
                                    });

                                    formServiceImagesUplod.form.submit({
                                        scope:this,
                                        url: '/SaveServiceDocument',
                                        method: 'POST',
                                        dataType: 'html',
                                        params:{
                                            _token : csrf_token,
                                            transaction_type:'Service',
                                            adr_d_items_id : Ext.getCmp('service_adr_d_items_id'+page).getValue(),
                                            catalog_no : Ext.getCmp('catalog_no'+page).getValue(),
                                        },
                                        success:function(response, request){
                                            store_service_document.load({
                                                params:{
                                                    start:0,
                                                    limit:25
                                                }
                                            });

                                            Ext.MessageBox.hide();

                                            winDetailServiceDocument.hide();

                                            Ext.MessageBox.show(
                                                {
                                                    alwaysOnTop: true,
                                                    title : 'Message',
                                                    msg:'Process Successfully !' ,
                                                    buttons: Ext.MessageBox.OK,
                                                    icon :  Ext.MessageBox.INFO
                                                }
                                            );
                                        },
                                        failure:function(response, request){
                                            // winDetailServiceDocument.hide();
                                            if(typeof request.response != 'undefined')
                                                var mess = request.response.responseText;
                                            else
                                                var mess = 'Fields marked in red can not be blank !' ;
                                            Ext.MessageBox.show(
                                                {
                                                    alwaysOnTop: true,
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
                                text: 'Reset',
                                iconCls:'clear',
                                handler: function(){
                                    Ext.getCmp('formServiceDocumentUplod'+page).getForm().reset();
                                }
                            }
                        ]
                    },
                ],
                tools: [
                    {
                        type: 'close',
                        handler: function () {
                            // frmEFakturRequestShow.animateTarget = 'AddDataM'+page;
                            winDetailServiceDocument.hide();
                        }
                    }
                ],
            });
        var winServiceDocument = Ext.widget('window', {
            // title: 'Document'+ Ext.getCmp('catalog_no'+page).getValue(),//+ ,
            id:'winServiceDocument'+page,
            layout       : 'fit',
            constrain    : true,
            // height       : 500,
            // width        : 650,
            width: 450,
            height: 250,
            // x: 50,
            // y: 50,
            plain: true,
            bodyPadding  : '5 5 0',
            border       : false,
            resizable    : false,
            modal        : true,
            autoShow     : false,
            defaultFocus : 'nome',
            buttonAlign : 'right',
            closable: false,
            items: [
                grid_service_document
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        // frmEFakturRequestShow.animateTarget = 'AddDataM'+page;
                        winServiceDocument.hide();
                    }
                }
            ],
        });

        //////////////////////////////////
        // Windows Grid Service Images //
        //////////////////////////////////
        var gridMenuServiceImages = Ext.create('Ext.menu.Menu', {
            items: [
                {
                    text: 'Menu',
                    iconCls:'',
                    // disabled:!ROLE.PRINT_DATA,
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                text: 'Delete Image',
                                iconCls: 'row-delete',
                                disabled:!ROLE.RemoveServiceItemsImages,
                                handler    : function() {
                                    var record = grid_service_images.getView().getSelectionModel().getSelection()[0];
                                    var id = record.data.id ;

                                    Ext.MessageBox.show({
                                        msg: 'Saving your data, please wait...',
                                        progressText: 'Saving...',
                                        width:300,
                                        wait:true,
                                        waitConfig: {interval:200},
                                        icon:'ext-mb-download',
                                        animEl: 'buttonID'
                                    });

                                    Ext.Ajax.request({
                                        scope:this,
                                        // url : base_url+'singleview/process' ,
                                        url: '/DeleteServiceImages',
                                        method: 'POST',
                                        dataType: 'html',
                                        params:{
                                            _token : csrf_token,
                                            id : id,
                                        },
                                        success:function(response, request){
                                            // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                                            store_service_images.load({
                                                params:{
                                                    start:0,
                                                    limit:1
                                                }
                                            });
                                            Ext.MessageBox.hide();

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
                                    // alert(id_data_espt_22);
                                    // fastreport('bp_pph_22_one.fr3','id='+id_data_espt_22,'pdf');
                                }
                            },
                        ]
                    }
                },
            ]
        });
        var model_service_images = Ext.define('model_service_document', {
            extend: 'Ext.data.Model',
        });
        var store_service_images = Ext.create('Ext.data.Store', {
            id: 'store_service_images'+page,
            model: model_service_images,
            proxy: {
                type: 'ajax',
                url: '/getServiceItemsImages',
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
                    property : 'id',
                    direction: 'ASC'
                }
            ],
            listeners: {
                beforeload: function(store) {
                }
            },
            pageSize:1,
        });
        var grid_service_images = Ext.create('Ext.grid.Panel', {
            width: 343,
            height: 250,
            margin: '0 0 0 0',
            store:store_service_images,
            hideHeaders:true,
            columns:[
                {
                    // xtype:'images',
                    header:'Service Images',
                    dataIndex: 'images',
                    // autoSizeColumn:true,
                    width:340,
                    height:200,
                    renderer: function(value){
                        return '<img src="service_images/' + value + '" / width="340" height="200">';
                    },
                }
            ],
            bbar:[
                {
                    xtype:'button',
                    text:'Add Images',
                    iconCls:'add-data',
                    id:'addServiceItemsImages'+page,
                    disabled:!ROLE.AddServiceItemsImages,
                    handler:function(){
                        winDetailServiceImagesSource.animateTarget = 'addServiceItemsImages'+page;
                        winDetailServiceImagesSource.show();

                    }
                },
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_service_images,
                    displayInfo: false,
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
            listeners: {
                beforequery: function(queryEvent, eOpts ,value) {
                    /*queryEvent.combo.store.proxy.extraParams = {
                     'filter[0][field]':'user_name' ,
                     'filter[0][data][type]':'string' ,
                     'filter[0][data][value]':queryEvent.query,
                     'limit':queryEvent.combo.pageSize,
                     };*/
                    Ext.Ajax.abortAll(); //cancel any previous requests
                    return true;

                },
                beforeitemcontextmenu: function(view, record, item, index, e)
                {
                    e.stopEvent();
                    gridMenuServiceImages.showAt(e.getXY());
                },
                itemclick: function(grid_delivery_order_m, record, item, index, e) {

                }
            },
        });
        var winDetailServiceImagesSource = new Ext.Window({
            id: 'winDetailServiceImagesSource'+page,
            layout       : 'fit',
            constrain    : true,
            width: 450,
            height: 150,
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
                    // title: 'File Upload Form',
                    // frame: true,
                    bodyPadding: '10 10 0',
                    xtype:'form',
                    id:'formServiceImagesUplod'+page,
                    items: [
                        {
                            xtype: 'textfield',
                            width:400,
                            id: 'service_images_description'+page,
                            name:'description',
                            fieldLabel: 'Description'
                        },
                        {
                            xtype: 'filefield',
                            width:400,
                            emptyText: 'Select an image',
                            fieldLabel: 'Image',
                            name: 'images_path',
                            id:'images_path'+page,
                            vtype:'FileImages',
                            buttonText: '',
                            buttonConfig: {
                                iconCls: 'event-menu'
                            }
                        }
                    ],

                    buttons: [
                        {
                            text: 'Save',
                            iconCls:'icon-save',
                            handler:function(){
                                var formServiceImagesUplod = Ext.getCmp('formServiceImagesUplod'+page);

                                Ext.MessageBox.show({
                                    msg: 'Saving your data, please wait...',
                                    progressText: 'Saving...',
                                    width:300,
                                    wait:true,
                                    waitConfig: {interval:200},
                                    icon:'ext-mb-download',
                                    animEl: 'buttonID'
                                });

                                formServiceImagesUplod.form.submit({
                                    scope:this,
                                    url: '/SaveServiceImages',
                                    method: 'POST',
                                    dataType: 'html',
                                    params:{
                                        _token : csrf_token,
                                        transaction_type:'Service',
                                        adr_d_items_id : Ext.getCmp('service_adr_d_items_id'+page).getValue(),
                                        catalog_no : Ext.getCmp('catalog_no'+page).getValue(),
                                        // data_char: data_char,
                                    },
                                    success:function(response, request){
                                        store_service_images.load({
                                            params:{
                                                start:0,
                                                limit:1
                                            }
                                        });

                                        Ext.MessageBox.hide();

                                        winDetailServiceImagesSource.hide();

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
                            }
                        },
                        {
                            text: 'Reset',
                            iconCls:'clear',
                            handler: function(){
                                Ext.getCmp('formServiceImagesUplod'+page).getForm().reset();
                            }
                        }
                    ]
                },
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        winDetailServiceImagesSource.animateTarget = 'addServiceItemsImages'+page;
                        winDetailServiceImagesSource.hide();
                    }
                }
            ],
        });
        var winServiceImagesSource = Ext.widget('window', {
            id:'winServiceImagesSource'+page,
            layout       : 'fit',
            constrain    : true,
            plain: true,
            bodyPadding  : '0 0 0 0',
            border       : false,
            resizable    : false,
            modal        : true,
            autoShow     : false,
            defaultFocus : 'nome',
            buttonAlign : 'right',
            closable: false,
            items: [grid_service_images],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        winServiceImagesSource.animateTarget = 'btnSeviceViewImages'+page;
                        winServiceImagesSource.hide();
                    }
                }
            ],
        });

        //////////////////////////////
        // Grid Service View Notes //
        //////////////////////////////
        var model_service_view_notes = Ext.define('model_service_view_notes', {
            extend: 'Ext.data.Model',
            fields: ['id','adr_d_items_id','user', 'created_at', 'notes']
        });
        var store_service_view_notes = Ext.create('Ext.data.Store', {
            storeId: 'store_service_view_notes'+page,
            model: model_service_view_notes,
            proxy: {
                type: 'ajax',
                url: '/getItemsViewNotes',
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
                    // store.proxy.extraParams.itemnbr_param = current_matno;
                }
            }
        });

        var grid_editor_service_view_notes =  Ext.create('Ext.grid.plugin.RowEditing', {
            autoCancel: true,
            saveBtnText    : "Update",//My Save Button Text&quot;,
            saveBtnIcon: 'add-data',
            cancelBtnText: "Cancel", //Cancel Button Text&quot;,
            clicksToEdit: 2, //this changes from the default double-click activation to single click activation
            errorSummary: false, //disables display of validation messages if the row is invalid
            clicksToMoveEditor: 2,
            listeners:{
                canceledit: function(grid,obj){
                    // console.log(grid);
                    // if (grid.record.data.internalId <= 0) { // only remove new records
                    //     // store_notes.remove(grid.record);
                    // }
                }
            }
        });
        var grid_service_view_notes = Ext.create('Ext.grid.Panel', {
            width: 343,
            height: 250,
            margin: '0 0 0 0',
            store:store_service_view_notes,
            hideHeaders:false,
            tbar:[
                {
                    xtype: 'button',
                    id: 'btnAddServiceViewNotes'+page,
                    text: 'Add Note',
                    margin: '0 0 0 10',
                    iconCls:'add-data',
                    handler: function() {
                        // Create a model instance
                        var data = [];
                        var order = 1 ;
                        var index = 0 ;
                        var r = Ext.create('model_service_view_notes', {
                            user: username + ' (' + user_level + ')',
                            created_at : new Date(),
                            id:'last_insert_id',
                            // notes:''
                        });
                        store_service_view_notes.insert(index, r);
                        grid_editor_service_view_notes.startEdit(r, 0);
                    }
                },
                {
                    xtype: 'button',
                    id: 'btnRemoveServiceViewNotes'+page,
                    text: 'Remove Note',
                    margin: '0 0 0 10',
                    iconCls:'row-delete',
                    handler: function() {
                        var record = grid_service_view_notes.getSelectionModel().getSelection()[0];
                        if (record) {
                           Ext.Ajax.request({
                                scope:this,
                                url: 'DeleteViewNotesSV',
                                method: 'POST',
                                dataType: 'html',
                                params:{
                                    _token : csrf_token,
                                    id: record.data.id,
                                },
                                success:function(response, request){
                                    var result = Ext.util.JSON.decode(response.responseText);
                                    var message = "";
                                    // console.log(result.success);
                                    // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                                    if(result.success == true){
                                        store_service_view_notes.load({
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
                                                        msg:message,
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
                            // records.set('flag','Delete');
                            // store_service_cross_references.remove(records);
                        }  
                    }
                    // disabled: true
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
                    xtype:'rownumberer',
                    header: 'No',
                    width: 60,
                    sortable: true,
                    // dataIndex: 'norder',

                },
                {
                    header: 'User',
                    dataIndex: 'user',
                    // autoSizeColumn:true,
                    flex: 1
                },
                {
                    xtype:'datecolumn',
                    Header: 'Cretad At',
                    dataIndex: 'created_at',
                    renderer    :Ext.util.Format.dateRenderer('d M Y g:i','GMT'),
                    // autoSizeColumn:true,
                    flex: 1
                },
                {
                    text: 'note',
                    dataIndex: 'notes',
                    // autoSizeColumn:true,
                    flex: 5,
                    // width:500,
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                }
            ],
            plugins:[
                grid_editor_service_view_notes,
            ],
            bbar:[
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_service_view_notes,
                    displayInfo: true,
                    displayMsg: 'Displaying record {0} - {1} of {2}',
                    emptyMsg: "No records to display"
                }),
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    id: 'notes_apply'+page,
                    text: 'Apply changes',
                    margin: '0 0 0 10',
                    iconCls:'accept',
                    // disabled: true,
                    handler: function() {
                        Ext.MessageBox.show({
                            msg: 'Saving your data, please wait...',
                            progressText: 'Saving...',
                            width:300,
                            wait:true,
                            waitConfig: {interval:200},
                            icon:'ext-mb-download',
                            animEl: 'buttonID'
                        });
                        var view_notes = Ext.encode(Ext.pluck(store_service_view_notes.data.items, 'data'));
                        parms = [];
                        var updatedRecords = store_service_view_notes.getUpdatedRecords();
                        Ext.each(updatedRecords,function(record){
                            parms.push(record.data);
                        });
                        var newRecords = store_service_view_notes.getNewRecords();
                        Ext.each(newRecords,function(record){
                            parms.push(record.data);
                        });
                        console.log(parms);
                        Ext.Ajax.request({
                            scope:this,
                            // url : base_url+'singleview/process' ,
                            url: '/SaveViewNotesSV',
                            method: 'POST',
                            dataType: 'html',
                            params:{
                                _token : csrf_token,
                                view_notes: view_notes,
                                adr_d_items_id : Ext.getCmp('service_adr_d_items_id'+page).getValue(),
                            },
                            success:function(response, request){
                                // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                                var filters = [];

                                var adr_d_items_id_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: Ext.getCmp('service_adr_d_items_id'+page).getValue(),
                                    property: "adr_d_items_id",
                                    type: "string",
                                });

                                filters.push(adr_d_items_id_filter['initialConfig']) ;

                                store_service_view_notes.proxy.extraParams = {
                                    filter: Ext.encode(filters),
                                    action:'getViewNotes'
                                };
                                store_service_view_notes.load({
                                    params:{
                                        // action : 'getInc',
                                        // filter: Ext.encode(filters),
                                    }
                                });
                                console.log("disini");
                                Ext.MessageBox.hide();

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
            listeners: {
                beforequery: function(queryEvent, eOpts ,value) {
                    /*queryEvent.combo.store.proxy.extraParams = {
                     'filter[0][field]':'user_name' ,
                     'filter[0][data][type]':'string' ,
                     'filter[0][data][value]':queryEvent.query,
                     'limit':queryEvent.combo.pageSize,
                     };*/
                    Ext.Ajax.abortAll(); //cancel any previous requests
                    return true;

                },
                beforeitemcontextmenu: function(view, record, item, index, e)
                {
                    // e.stopEvent();
                    // gridMenuserviceImages.showAt(e.getXY());
                },
                itemclick: function(grid_delivery_order_m, record, item, index, e) {

                }
            },
        });


        var winServiceViewNotes = Ext.widget('window', {
            id:'winServiceViewNotes'+page,
            layout       : 'fit',
            constrain    : true,
            width: 1000,
            height: 300,
            plain: true,
            bodyPadding  : '5 5 0',
            border       : false,
            resizable    : false,
            modal        : true,
            autoShow     : false,
            defaultFocus : 'nome',
            buttonAlign : 'right',
            closable: false,
            items: [
                grid_service_view_notes
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        winServiceViewNotes.animateTarget = 'btnserviceViewNotes'+page;
                        winServiceViewNotes.hide();
                    }
                }
            ],
        });


        ///////////////////////////////
        // Store service Catalog M //
        //////////////////////////////
        var model_service_catalog_m = Ext.define('model_service_catalog_m', {
            extend: 'Ext.data.Model',
        });
        var store_service_catalog_m = Ext.create('Ext.data.Store', {
            storeId: 'funloc_Store',
            model: model_service_catalog_m,
            proxy: {
                type: 'ajax',
                url: '/getCatalogM_p',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message'
                }
            },
            listeners: {

            }
        });
        var filters = [];
        var catalog_no = new Ext.util.Filter({
            operator: 'eq',
            value:  "0",
            property: "catalog_no",
            type: "string",
        });
        filters.push(catalog_no['initialConfig']) ;
        var is_active = new Ext.util.Filter({
            operator: 'eq',
            value:  'Active',
            property: "is_active",
            type: "string",
        });
        filters.push(is_active['initialConfig']) ;
        var transaction_type = new Ext.util.Filter({
            operator: 'eq',
            value:  'Service',
            property: "transaction_type",
            type: "string",
        });
        filters.push(transaction_type['initialConfig']) ;
        store_service_catalog_m.proxy.extraParams = {
            action:'getCatalogM',
        };
        store_service_catalog_m.load({
            params:{
                filter: Ext.encode(filters),
            }
        });

        //////////////////////
        // Service Status Style //
        //////////////////////
        function ServiceStatusStyle(){
            var record = store_service_catalog_m.getData().items[0];
            var str = record.data.adr_status;
            var adr_status = str.substring(0, 8);
            switch(true ){
                case (adr_status === "FINISH"):
                    Ext.getCmp('service_adr_status'+page).setFieldStyle('color: green;');
                    break;
                default:
                    Ext.getCmp('service_adr_status'+page).setFieldStyle('color: red;');
                    break;
            }
            var str = record.data.item_status;
            var item_status = str.substring(0, 8);
            switch(true ){
                case (record.data.item_status === "ORIGIN"):
                    Ext.getCmp('service_item_status'+page).setFieldStyle('color: green;');
                    break;
                case (item_status === "REVISION"):
                    Ext.getCmp('service_item_status'+page).setFieldStyle('color: blue;');
                    break;
                case (record.data.item_status === "SBU STOPPED"):
                case (record.data.item_status === "SBU BLOCKED"):
                case (record.data.item_status === "STOPPED"):
                case (record.data.item_status === "PRE BLOCKED"):
                    Ext.getCmp('service_item_status'+page).setFieldStyle('color: red;');
                    break;
                case (record.data.item_status == "BLOCKED"):
                    Ext.getCmp('service_item_status'+page).setFieldStyle('color: red;');
                    break;
                default:
                    Ext.getCmp('service_item_status'+page).setFieldStyle('color: red;');
                    break;
            }
        }

////////////////////////
// Service Read Only //
////////////////////////
        function serviceReadOnly(value){

        }

        function validate(val){
            if(val == true){
                return false;
            }else{
                return true ;
            }
        }
        ///////////////////////////
        // Materla Data Workflow //
        ///////////////////////////
        function ServiceWorkFlow(){
            ServiceStatusStyle();
            var record = store_service_catalog_m.getData().items[0];
            var str = record.data.item_status;
            var item_status = str.substring(0, 8);
            var std_app_category = "Std App "+record.data.category ;
            readOnly = true;
            ServiceCharacteristicsEditor = false ;
            ServiceCrossRef = true;
            ServiceFuncLoc = true;
            ServiceApplyChanges = true;
            ServiceDeletion = true;
            switch(true ){
                case (record.data.item_status === "ON PROCESS"):
                case (record.data.item_status === "DELETION"):
                case (record.data.item_status === "BLOCKED"):
                case (record.data.item_status === "ORIGIN"):
                case (item_status === "REVISION"):

                    ////////////////
                    //Status User //
                    ////////////////
                    if(record.data.status_user === 1){

                        Ext.get('ServiceRibbonUser'+page).removeCls('RibbonGrey');
                        Ext.get('ServiceRibbonUser'+page).removeCls('RibbonYellow');
                        Ext.get('ServiceRibbonUser'+page).removeCls('RibbonRed');
                        Ext.get('ServiceRibbonUser'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonUser'+page).addCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonCat'+page).addCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonStdApp'+page).addCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonProccApp'+page).addCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonSAP'+page).addCls('RibbonRed');
                        readOnly = true;
                        ServiceCharacteristicsEditor = false ;
                        ServiceApplyChanges = true;
                        ServiceCrossRef = true;
                        ServiceFuncLoc = true;
                        ServiceDeletion= true;
                        if (company_code === record.data.company_code ){
                            ServiceCrossRef = false;
                            ServiceFuncLoc = false;
                        }


                        if (company_code === record.data.company_code && user_level === "Cat") {
                            readOnly = false;
                            ServiceCharacteristicsEditor = true ;
                            ServiceApplyChanges = false;
                            ServiceDeletion = false;
                            Ext.getCmp('service_cataloguer'+page).setReadOnly(readOnly);
                            Ext.getCmp('service_cataloguer'+page).focus();
                        }


                    }else{

                        if (company_code === record.data.company_code ) {
                            readOnly = false;
                            ServiceCharacteristicsEditor = true ;
                            ServiceApplyChanges = false;
                            ServiceFuncLoc = false;
                            ServiceApplyChanges = false;
                            ServiceDeletion= true;
                        }
                        if (company_code === record.data.company_code && user_level === "Cat") {
                            ServiceDeletion = false;
                        }

                        Ext.getCmp('ServiceRibbonUser'+page).removeCls('RibbonGrey');
                        Ext.getCmp('ServiceRibbonUser'+page).removeCls('RibbonYellow');
                        Ext.getCmp('ServiceRibbonUser'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonUser'+page).removeCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonUser'+page).addCls('RibbonRed');

                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonGrey');
                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonYellow');
                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonCat'+page).addCls('RibbonRed');

                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonStdApp'+page).addCls('RibbonRed');

                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonProccApp'+page).addCls('RibbonRed');

                        Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonGrey');
                        Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonYellow');
                        Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonSAP'+page).addCls('RibbonRed');
                    }

                    if(record.data.status_cat === 1 && record.data.status_user === 1){
                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonGrey');
                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonYellow');
                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonCat'+page).addCls('RibbonGreen');
                        readOnly = true;
                        ServiceCharacteristicsEditor = false ;
                        ServiceApplyChanges = true;
                        console.log(std_app_category);
                        if(user_level === std_app_category ){
                            Ext.getCmp('service_std_approval'+page).setReadOnly(false);
                            Ext.getCmp('service_std_approval'+page).focus();
                            ServiceApplyChanges = false;
                        }
                        if (company_code === record.data.company_code && user_level === "Cat") {
                            ServiceDeletion = false;
                        }


                        Ext.getCmp('service_cataloguer'+page).setReadOnly(readOnly);
                        Ext.getCmp('service_cataloguer'+page).focus();
                    }else{
                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonGrey');
                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonYellow');
                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonCat'+page).addCls('RibbonRed');
                    }

                    if(record.data.status_stdapp === 1 && record.data.status_user === 1){
                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonStdApp'+page).addCls('RibbonGreen');
                        readOnly = true;
                        ServiceCharacteristicsEditor = false ;
                        ServiceApplyChanges = true;

                        Ext.getCmp('service_std_approval'+page).setReadOnly(readOnly);
                        Ext.getCmp('service_std_approval'+page).focus();

                        if(user_level === "Proc"){
                            Ext.getCmp('service_proc_approver'+page).setReadOnly(false);
                            Ext.getCmp('service_proc_approver'+page).focus();
                            ServiceApplyChanges = false;
                        }
                        if (company_code === record.data.company_code && user_level === "Cat") {
                            ServiceDeletion = false;
                        }

                    }else{
                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonStdApp'+page).addCls('RibbonRed');
                    }

                    if(record.data.status_proc === 1 && record.data.status_user === 1){
                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonProccApp'+page).addCls('RibbonGreen');

                        readOnly = true;
                        ServiceCharacteristicsEditor = false ;
                        ServiceApplyChanges = true;

                        Ext.getCmp('service_proc_approver'+page).setReadOnly(readOnly);
                        Ext.getCmp('service_proc_approver'+page).focus();

                        if(user_level === "Proc" && record.data.status_sap === 0){
                            Ext.getCmp('sap_service_code'+page).setReadOnly(false);
                            Ext.getCmp('sap_service_code'+page).focus();
                            ServiceApplyChanges = false;
                        }

                    }else{
                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonProccApp'+page).addCls('RibbonRed');
                    }

                    if(record.data.status_sap === 1 && record.data.status_user === 1){
                        Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonGrey');
                        Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonYellow');
                        Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonSAP'+page).addCls('RibbonGreen');

                        readOnly = true;
                        ServiceCharacteristicsEditor = false ;
                        ServiceApplyChanges = true;
                        ServiceCrossRef = true;
                        ServiceFuncLoc = true;

                        Ext.getCmp('sap_service_code'+page).setReadOnly(readOnly);
                        Ext.getCmp('sap_service_code'+page).focus();
                        // CheckServiceMRP(0);
                        // if(user_level === "User"){

                        // }
                        if (company_code === record.data.company_code && user_level === "Cat") {
                            ServiceDeletion = true;
                        }

                    }else{
                        Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonGrey');
                        Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonYellow');
                        Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonSAP'+page).addCls('RibbonRed');

                        ServiceCrossRef = false;
                        ServiceFuncLoc = false;

                    }

                    if (company_code === record.data.company_code && user_level === "Cat") {
                        ServiceCrossRef = false;
                        ServiceFuncLoc = false;
                    }
					 if (record.data.status_proc===1 && user_level === "Proc") {
                        ServiceCrossRef = false;
                        ServiceFuncLoc = false;
                    } 
                    if (record.data.status_proc===0 && user_level === "Proc") {
                        ServiceCrossRef = true;
                        ServiceFuncLoc = true;
                    } 
                    if(record.data.item_status === "DELETION" || record.data.item_status === "BLOCKED"){
                        readOnly = true;
                        ServiceCharacteristicsEditor = false ;
                        ServiceCrossRef = true;
                        ServiceFuncLoc = true;
                        ServiceApplyChanges = true;
                        ServiceDeletion = true;

                        Ext.getCmp('service_cataloguer'+page).setReadOnly(readOnly);
                        Ext.getCmp('service_cataloguer'+page).focus();

                        Ext.getCmp('service_std_approval'+page).setReadOnly(readOnly);
                        Ext.getCmp('service_std_approval'+page).focus();

                        Ext.getCmp('service_proc_approver'+page).setReadOnly(readOnly);
                        Ext.getCmp('service_proc_approver'+page).focus();

                        Ext.getCmp('sap_service_code'+page).setReadOnly(readOnly);
                        Ext.getCmp('sap_service_code'+page).focus();
                    }

                    Ext.getCmp('service_mgc'+page).setReadOnly(readOnly);
                    Ext.getCmp('service_mgc'+page).focus();

                    Ext.getCmp('service_inc'+page).setReadOnly(readOnly);
                    Ext.getCmp('service_inc'+page).focus();

                    Ext.getCmp('service_type'+page).setReadOnly(readOnly);
                    Ext.getCmp('service_type'+page).focus();

                    Ext.getCmp('service_uom'+page).setReadOnly(readOnly);
                    Ext.getCmp('service_uom'+page).focus();

                    Ext.getCmp('service_category'+page).setReadOnly(readOnly);
                    Ext.getCmp('service_category'+page).focus();

                    Ext.getCmp('btnServiceAddCrossReferences'+page).setDisabled(ServiceCrossRef);
                    Ext.getCmp('btnServiceRemoveCrossReferences'+page).setDisabled(ServiceCrossRef);

                    Ext.getCmp('service_refno'+page).setReadOnly(ServiceCrossRef);
                    Ext.getCmp('old_service_code'+page).setReadOnly(ServiceCrossRef);

                    Ext.getCmp('service_manufactur'+page).setReadOnly(ServiceCrossRef);
                    Ext.getCmp('service_cross_references_type'+page).setReadOnly(ServiceCrossRef);

                    Ext.getCmp('btnServiceAddFuncLocation'+page).setDisabled(ServiceFuncLoc);
                    Ext.getCmp('btnServiceRemoveFuncLocation'+page).setDisabled(ServiceFuncLoc);

                    Ext.getCmp('service_func_loc_name'+page).setReadOnly(ServiceFuncLoc);
                    Ext.getCmp('service_func_loc_description'+page).setReadOnly(ServiceFuncLoc);

                    Ext.getCmp('btnServiceDeletion'+page).setDisabled(ServiceDeletion);
                    Ext.getCmp('btnServiceApplyChanges'+page).setDisabled(ServiceApplyChanges);

                    break;
                default:
                    Ext.getCmp('ServiceRibbonUser'+page).addCls('RibbonRed');
                    Ext.getCmp('ServiceRibbonCat'+page).addCls('RibbonRed');
                    Ext.getCmp('ServiceRibbonStdApp'+page).addCls('RibbonRed');
                    Ext.getCmp('ServiceRibbonProccApp'+page).addCls('RibbonRed');
                    Ext.getCmp('ServiceRibbonSAP'+page).addCls('RibbonRed');
                    break;
            }

        }

        ////////////////////////////
        // SearchServiceCataloNo //
        ////////////////////////////
        function SearchServiceCatalogNo(){
            var val = Ext.getCmp('catalog_no'+page).getValue();
            Ext.getBody().mask("loading Service item...");
            if(val){
                Ext.getCmp('ServiceRibbonUser'+page).removeCls('RibbonGrey');
                Ext.getCmp('ServiceRibbonUser'+page).removeCls('RibbonYellow');
                Ext.getCmp('ServiceRibbonUser'+page).removeCls('RibbonGreen');
                Ext.getCmp('ServiceRibbonUser'+page).removeCls('RibbonRed');
                Ext.getCmp('ServiceRibbonUser'+page).addCls('RibbonGrey');

                Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonGrey');
                Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonYellow');
                Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonGreen');
                Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonRed');
                Ext.getCmp('ServiceRibbonCat'+page).addCls('RibbonGrey');

                Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonGrey');
                Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonYellow');
                Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonGreen');
                Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonRed');
                Ext.getCmp('ServiceRibbonStdApp'+page).addCls('RibbonGrey');

                Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonGrey');
                Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonYellow');
                Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonGreen');
                Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonRed');
                Ext.getCmp('ServiceRibbonProccApp'+page).addCls('RibbonGrey');

                Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonGrey');
                Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonYellow');
                Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonGreen');
                Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonRed');
                Ext.getCmp('ServiceRibbonSAP'+page).addCls('RibbonGrey');

                Ext.getCmp('service_mgc'+page).setReadOnly(true);
                Ext.getCmp('service_mgc'+page).reset();
                Ext.getCmp('service_mgc'+page).allowBlank = true;
                store_mgc.removeAll();

                Ext.getCmp('service_inc'+page).setReadOnly(true);
                Ext.getCmp('service_inc'+page).reset();
                Ext.getCmp('service_inc'+page).allowBlank = true;
                store_service_inc.removeAll();

                Ext.getCmp('service_type'+page).setReadOnly(true);
                Ext.getCmp('service_type'+page).reset();
                Ext.getCmp('service_type'+page).allowBlank = true;

                Ext.getCmp('service_uom'+page).setReadOnly(true);
                Ext.getCmp('service_uom'+page).reset();
                Ext.getCmp('service_uom'+page).allowBlank = true;

                Ext.getCmp('service_category'+page).setReadOnly(true);
                Ext.getCmp('service_category'+page).reset();
                Ext.getCmp('service_category'+page).allowBlank = true;

                Ext.getCmp('service_cataloguer'+page).setReadOnly(true);
                Ext.getCmp('service_cataloguer'+page).reset();
                Ext.getCmp('service_cataloguer'+page).allowBlank = true;

                Ext.getCmp('service_std_approval'+page).setReadOnly(true);
                Ext.getCmp('service_std_approval'+page).reset();
                Ext.getCmp('service_std_approval'+page).allowBlank = true;

                Ext.getCmp('service_proc_approver'+page).setReadOnly(true);
                Ext.getCmp('service_proc_approver'+page).reset();
                Ext.getCmp('service_proc_approver'+page).allowBlank = true;

                Ext.getCmp('btnServiceViewDocument'+page).setDisabled(true);
                Ext.getCmp('btnServiceViewRaw'+page).setDisabled(true);
                Ext.getCmp('btnServiceViewImages'+page).setDisabled(true);
                Ext.getCmp('btnServiceViewNotes'+page).setDisabled(true);
				Ext.getCmp('btnHisDataTransport'+page).setDisabled(true);

                // Ext.getCmp('addServiceDocument'+page).hide();
                // Ext.getCmp('addServiceItemsImages'+page).hide();

                Ext.getCmp('sap_service_code'+page).setReadOnly(true);
                Ext.getCmp('btnServiceApplyChanges'+page).setDisabled(true);

                var filters = [];
                var catalog_no = new Ext.util.Filter({
                    operator: 'eq',
                    value:  val,
                    property: "catalog_no",
                    type: "string",
                });
                filters.push(catalog_no['initialConfig']) ;
                var is_active = new Ext.util.Filter({
                    operator: 'eq',
                    value:  'Active',
                    property: "is_active",
                    type: "string",
                });
                filters.push(is_active['initialConfig']) ;
                var transaction_type = new Ext.util.Filter({
                    operator: 'eq',
                    value:  'Service',
                    property: "transaction_type",
                    type: "string",
                });
                filters.push(transaction_type['initialConfig']) ;
                store_service_catalog_m.proxy.extraParams = {
                    _token : csrf_token,
                    action:'getCatalogM_p',
                };
                store_service_catalog_m.reload({
                    params:{

                        filter: Ext.encode(filters),
                    },
                    callback : function(records, operation, success) {
                        if(success){
                            var record = records[0];
                            if(store_service_catalog_m.getCount() > 0){
							  var vcreator_id =record.data.user_name;
                                if (vcreator_id==username) { BtnDataOwnerT=true;} else { BtnDataOwnerT=false; } 
 
                                Ext.getBody().unmask();
                                Ext.getCmp('catalog_no'+page).setValue(record.data.catalog_no);
                                Ext.getCmp('items_is_active'+page).setValue(record.data.items_is_active);
                                Ext.getCmp('service_raw'+page).setValue(record.data.raw);
                                Ext.getCmp('btnServiceViewDocument'+page).setDisabled(false);
                                Ext.getCmp('btnServiceViewRaw'+page).setDisabled(false);
                                Ext.getCmp('btnServiceViewImages'+page).setDisabled(false);
                                Ext.getCmp('btnServiceViewNotes'+page).setDisabled(false);
								Ext.getCmp('btnHisDataTransport'+page).setDisabled(false);
                                Ext.getCmp('service_adr_m_id'+page).setValue(record.data.adr_m_id);
                                Ext.getCmp('service_adr_d_items_id'+page).setValue(record.data.id);
                                Ext.getCmp('service_adr_status'+page).setValue(record.data.adr_status);
                                Ext.getCmp('service_item_status'+page).setValue(record.data.item_status);
                                Ext.getCmp('sap_service_code'+page).setValue(record.data.sap_material_code);
                                Ext.getCmp('sap_service_code_by'+page).setValue(record.data.sap_material_code_by);

                                // Ext.getCmp('service_inc'+page).setValue(record.data.inc);
                                // Ext.getCmp('service_inc'+page).focus();
                                var filters_inc = [];
                                var combo_inc_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record.data.inc,
                                    property: "inc",
                                    type: "string",
                                });
                                filters_inc.push(combo_inc_filter['initialConfig']) ;
                                store_service_inc.proxy.extraParams = {
                                    _token : csrf_token,
                                    filter: Ext.encode(filters_inc),
                                };
                                store_service_inc.load();
                                Ext.ComponentQuery.query('#service_inc'+page)[0].setValue(record.data.inc);

                                // Ext.getCmp('service_mgc'+page).setValue(record.data.groupclass);
                                // Ext.getCmp('service_mgc'+page).focus();
                                var filters_mgc = [];
                                var groupclassType_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: 'Service',
                                    property: "transaction_type",
                                    type: "string",
                                });
                                filters_mgc.push(groupclassType_filter['initialConfig']) ;

                                var groupclass_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record.data.groupclass ,
                                    property: "groupclass",
                                    type: "string",
                                });
                                filters_mgc.push(groupclass_filter['initialConfig']) ;

                                var inc_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record.data.inc,
                                    property: "inc",
                                    type: "string",
                                });
                                filters_mgc.push(inc_filter['initialConfig']) ;

                                store_mgc.proxy.extraParams = {
                                    filter: Ext.encode(filters_mgc),
                                };
                                store_mgc.load();
                                Ext.ComponentQuery.query('#service_mgc'+page)[0].setValue(record.data.groupclass);

                                

                                if(record.data.item_name){
                                    Ext.getCmp('service_name_code'+page).setValue(record.data.item_name);
                                }else{
                                    Ext.getCmp('service_name_code'+page).setValue(record.data.inc_name_code);
                                }
                                Ext.getCmp('service_short_name_code'+page).setValue(record.data.short_name_code);
                                Ext.getCmp('service_short_description'+page).setValue(record.data.short_description);
                                Ext.getCmp('service_long_description'+page).setValue(record.data.long_description);

                                // Ext.getCmp('service_type'+page).setValue(record.data.material_type);
                                // Ext.getCmp('service_type'+page).focus();
                                var filters_service_type = [];
                                var entity_name = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: 'service_type',
                                    property: "entity_name",
                                    type: "string",
                                });

                                filters_service_type.push(entity_name['initialConfig']) ;

                                var ServiceTypeFilter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record.data.material_type,
                                    property: "code",
                                    type: "string",
                                });
                                filters_service_type.push(ServiceTypeFilter['initialConfig']) ;
                                store_service_type.proxy.extraParams = {
                                    filter: Ext.encode(filters_service_type),
                                };
                                store_service_type.load();
                                Ext.ComponentQuery.query('#service_type'+page)[0].setValue(record.data.material_type);
                                // Ext.getCmp('service_type'+page).setValue(record.data.material_type);

                                // Ext.getCmp('service_uom'+page).setValue(record.data.uom);
                                // Ext.getCmp('service_uom'+page).focus();
                                //////////
                                // UOM  //
                                //////////
                                var filters_uom_filter = [];
                                var uom_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record.data.uom,
                                    property: "code",
                                    type: "string",
                                });
                                filters_uom_filter.push(uom_filter['initialConfig']) ;
                                var entity_name = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: 'uom',
                                    property: "entity_name",
                                    type: "string",
                                });
                                filters_uom_filter.push(entity_name['initialConfig']) ;
                                store_service_uom.proxy.extraParams = {
                                    filter: Ext.encode(filters_uom_filter),
                                };
                                store_service_uom.load();
                                Ext.ComponentQuery.query('#service_uom'+page)[0].setValue(record.data.uom);

                                // Ext.getCmp('service_category'+page).setValue(record.data.category);
                                // Ext.getCmp('service_category'+page).focus();
                                //////////////
                                // Catagory //
                                //////////////
                                var filters_category = [];
                                var CategoryFilter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record.data.category,
                                    property: "code",
                                    type: "string",
                                });
                                filters_category.push(CategoryFilter['initialConfig']) ;
                                var entity_name = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: 'servicecategory',
                                    property: "entity_name",
                                    type: "string",
                                });
                                filters_category.push(entity_name['initialConfig']) ;
                                store_service_category.proxy.extraParams = {
                                    filter: Ext.encode(filters_category),
                                };
                                store_service_category.load();
                                Ext.ComponentQuery.query('#service_category'+page)[0].setValue(record.data.category);

                                Ext.getCmp('service_updated_by'+page).setValue(record.data.updated_by);

                                Ext.getCmp('service_cataloguer'+page).setValue(record.data.cataloguer);
                                Ext.getCmp('service_cataloguer_by'+page).setValue(record.data.cataloguer_by);

                                Ext.getCmp('service_std_approval'+page).setValue(record.data.std_approval);
                                Ext.getCmp('service_std_approval_by'+page).setValue(record.data.std_approval_by);

                                Ext.getCmp('service_proc_approver'+page).setValue(record.data.proc_approver);
                                Ext.getCmp('service_proc_approver_by'+page).setValue(record.data.proc_approver_by);

                                Ext.getCmp('service_owner'+page).setValue(record.data.owner);

                                // START SEND EMAIL
                                Ext.getCmp('service_useremail'+page).setValue(record.data.email_user);
                                Ext.getCmp('service_catemail'+page).setValue(record.data.email_cat);
                                Ext.getCmp('service_stdemail'+page).setValue(record.data.email_std);
                                Ext.getCmp('service_procemail'+page).setValue(record.data.email_proc);

                                // Ext.getCmp('material_requesttype'+page).setValue(record.data.transaction_type);
                                // Ext.getCmp('service_useridcat'+page).setValue(record.data.user_id_cat);
                                // Ext.getCmp('service_useridproc'+page).setValue(record.data.user_id_proc);
                                // END SEND EMAIL

                                var filters = [];
                                var inc_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record.data.inc,
                                    property: "inc",
                                    type: "string",
                                });
                                filters.push(inc_filter['initialConfig']) ;

                                var adr_d_items_id_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record.data.id,
                                    property: "adr_d_items_id",
                                    type: "string",
                                });
                                filters.push(adr_d_items_id_filter['initialConfig']) ;

                                var sorters = [];
                                var seq_shorter = new Ext.util.Sorter({
                                    property: "sequence",
                                    direction: "ASC",
                                });
                                sorters.push(seq_shorter['initialConfig']) ;

                                store_service_item_char.proxy.extraParams = {
                                    _token : csrf_token,
                                    inc_m_id:record.data.inc_m_id,
                                    adr_d_items_id: Ext.getCmp('service_adr_d_items_id'+page).getValue(),
                                    sort: Ext.encode(sorters),
                                };
                                store_service_item_char.load({
                                    params:{
                                        start:0,
                                        limit:300,

                                    }
                                });

                                var filters = [];
                                var id_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record.data.id,
                                    property: "adr_d_items_id",
                                    type: "numeric",
                                });
                                filters.push(id_filter['initialConfig']) ;

                                store_service_cross_references.proxy.extraParams = {
                                    _token : csrf_token,
                                    filter: Ext.encode(filters),
                                };

                                store_service_cross_references.load({
                                    params:{
                                        start:0,
                                        limit:300,
                                    }
                                });

                                store_service_funloc.proxy.extraParams = {
                                    _token : csrf_token,
                                    filter: Ext.encode(filters),
                                };

                                store_service_funloc.load({
                                    params:{
                                        start:0,
                                        limit:300,

                                    },

                                });
                                store_service_view_notes.proxy.extraParams = {
                                    _token : csrf_token,
                                    filter: Ext.encode(filters),
                                    action:'getViewNotes'
                                };
                                store_service_view_notes.load({
                                    params:{
                                        start:0,
                                        limit:300,

                                    }
                                });
                                ServiceWorkFlow();
                            }else{
                                store_service_item_char.removeAll();
                                store_service_cross_references.removeAll();
                                store_service_funloc.removeAll();
                                store_service_view_notes.removeAll();

                                Ext.getCmp('btnServiceViewDocument'+page).setDisabled(true);
                                Ext.getCmp('btnServiceViewRaw'+page).setDisabled(true);
                                Ext.getCmp('btnServiceViewImages'+page).setDisabled(true);
                                Ext.getCmp('btnServiceViewNotes'+page).setDisabled(true);
								Ext.getCmp('btnHisDataTransport'+page).setDisabled(true);

                                Ext.getCmp('service_adr_status'+page).setValue('');
                                Ext.getCmp('service_item_status'+page).setValue('');

                                Ext.Msg.show({
                                    title   : 'Data Search',
                                    msg     : 'No Record Found',
                                    buttons : Ext.Msg.OK,
                                    // iconCls : 'warningMessage',
                                    icon :  Ext.MessageBox.INFO,
                                });
                                Ext.getBody().unmask();

                                Ext.getCmp('ServiceRibbonUser'+page).removeCls('RibbonGrey');
                                Ext.getCmp('ServiceRibbonUser'+page).removeCls('RibbonYellow');
                                Ext.getCmp('ServiceRibbonUser'+page).removeCls('RibbonGreen');
                                Ext.getCmp('ServiceRibbonUser'+page).removeCls('RibbonRed');
                                Ext.getCmp('ServiceRibbonUser'+page).addCls('RibbonGrey');

                                Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonGrey');
                                Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonYellow');
                                Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonGreen');
                                Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonRed');
                                Ext.getCmp('ServiceRibbonCat'+page).addCls('RibbonGrey');

                                Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonGrey');
                                Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonYellow');
                                Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonGreen');
                                Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonRed');
                                Ext.getCmp('ServiceRibbonStdApp'+page).addCls('RibbonGrey');

                                Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonGrey');
                                Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonYellow');
                                Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonGreen');
                                Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonRed');
                                Ext.getCmp('ServiceRibbonProccApp'+page).addCls('RibbonGrey');

                                Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonGrey');
                                Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonYellow');
                                Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonGreen');
                                Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonRed');
                                Ext.getCmp('ServiceRibbonSAP'+page).addCls('RibbonGrey');
                                var form_service_single_view = Ext.getCmp('formServiceSV'+pageid);
                                form_service_single_view.getForm().getFields().each (function (field) {
                                    if(field.id !='catalog_no'+page){
                                        // field.setReadOnly(true);
                                        field.reset();
                                    }
                                });
                            }
                        }
                    }
                });

            }else{
                Ext.getCmp('ServiceRibbonUser'+page).removeCls('RibbonGrey');
                Ext.getCmp('ServiceRibbonUser'+page).removeCls('RibbonYellow');
                Ext.getCmp('ServiceRibbonUser'+page).removeCls('RibbonGreen');
                Ext.getCmp('ServiceRibbonUser'+page).removeCls('RibbonRed');
                Ext.getCmp('ServiceRibbonUser'+page).addCls('RibbonGrey');

                Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonGrey');
                Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonYellow');
                Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonGreen');
                Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonRed');
                Ext.getCmp('ServiceRibbonCat'+page).addCls('RibbonGrey');

                Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonGrey');
                Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonYellow');
                Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonGreen');
                Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonRed');
                Ext.getCmp('ServiceRibbonStdApp'+page).addCls('RibbonGrey');

                Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonGrey');
                Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonYellow');
                Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonGreen');
                Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonRed');
                Ext.getCmp('ServiceRibbonProccApp'+page).addCls('RibbonGrey');

                Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonGrey');
                Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonYellow');
                Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonGreen');
                Ext.getCmp('ServiceRibbonSAP'+page).removeCls('RibbonRed');
                Ext.getCmp('ServiceRibbonSAP'+page).addCls('RibbonGrey');

                Ext.getCmp('btnServiceViewDocument'+page).setDisabled(true);
                Ext.getCmp('btnServiceViewRaw'+page).setDisabled(true);
                Ext.getCmp('btnServiceViewImages'+page).setDisabled(true);
                Ext.getCmp('btnServiceViewNotes'+page).setDisabled(true);
				Ext.getCmp('btnHisDataTransport'+page).setDisabled(true);

                Ext.Msg.show({
                    title   : 'Data Search',
                    msg     : 'Catalog No Can Not Be Empty',
                    buttons : Ext.Msg.OK,
                    // iconCls : 'warningMessage',
                    icon :  Ext.MessageBox.INFO,
                });
                Ext.getBody().unmask();
                // CheckServiceMRP(0);
            }
        }

        ////////////////////////////
        // Service Catalog Field //
        ////////////////////////////
        Ext.define('servicecatalogfield', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.servicecatalogfield',
            enableKeyEvents: true,
            initComponent: function() {
                this.setTriggers({
                    picker: {
                        cls:Ext.baseCSSPrefix + 'form-search-trigger',
                        handler: 'onTriggerClick',
                        scope: 'this'
                    },
                });
                this.callParent(arguments);
            },
            onTriggerClick: function() {
                SearchServiceCatalogNo();
            }
        });

        //////////////////
        // History INC Characteristic  //
        //////////////////
        Ext.define('combotwintriggerexpander', {
            extend: 'Ext.form.field.ComboBox',
            alias: 'widget.combotwintriggerexpander',
            initComponent: function() {
                var me = this ;

                this.callParent(arguments);
            },
        });
        ////////////////////////////////
        // Combo Twin Trigger Service //
        /////////////////////////////////
        Ext.define('combotwintrigger', {
            extend: 'Ext.form.field.ComboBox',
            alias: 'widget.combotwintrigger',
            initComponent: function() {
                var me = this ;

                this.callParent(arguments);
            },
        });

        var main_content = {
            id: MainTabId,
            ui: 'blue-panel',
            title: 'Single View '+title,
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
                                            title :'Service',
                                            iconCls: iconCls,
                                            border:false,
                                            layout: 'fit',
                                            items:[
                                                {
                                                    xtype:'form',
                                                    layout: 'border',
                                                    border:false,
                                                    id:'formServiceSV'+pageid,
                                                    items:[
                                                        {
                                                            region:'west',
                                                            autoScroll:true,
                                                            split:true,
                                                            collapsible:true,
                                                            header:false,
                                                            border:true,
                                                            padding : '1 1 1 1',
                                                            margin : '1 1 1 1',
                                                            items: [
                                                                {
                                                                    layout: {
                                                                        type  : 'vbox',
                                                                        align : 'stretch'
                                                                    },
                                                                    xtype: 'fieldset',
                                                                    title: 'Service Item',
                                                                    width: 780,
                                                                    flex:3,
                                                                    // height:400,
                                                                    autoScroll: true,
                                                                    collapsible: false,
                                                                    margin: '5 5 5 5',
                                                                    padding : '1 1 1 1',
                                                                    border:true,
                                                                    items: [
                                                                        {
                                                                            xtype: 'panel',
                                                                            margin: '0 0 0 5',
                                                                            layout: {
                                                                                type: 'hbox',
                                                                                align: 'center',
                                                                                border: false,
                                                                                // pack: 'center'
                                                                            },
                                                                            border: false,
                                                                            items: [
                                                                                {
                                                                                    xtype:'servicecatalogfield',
                                                                                    fieldLabel: 'Catalogue no',
                                                                                    emptyText: 'Item No',
                                                                                    maxLength:18,
                                                                                    labelWidth:130,
                                                                                    width: 350,
                                                                                    id:'catalog_no'+page,
                                                                                    name: 'catalog_no',
                                                                                    value: '',
                                                                                    readOnly:false,
                                                                                    listeners : {
                                                                                        render : function(cmp) {
                                                                                            cmp.getEl().on('keypress', function(e) {
                                                                                                if (e.getKey() == e.ENTER) {
                                                                                                    SearchServiceCatalogNo();
                                                                                                    // submitform();
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    }
                                                                                },
                                                                                // START SEND EMAIL
                                                                                {
                                                                                    xtype:'textfield',
                                                                                    name:'useremail',
                                                                                    id:'service_useremail'+page,
                                                                                    hidden:true,
                                                                                },
                                                                                {
                                                                                    xtype:'textfield',
                                                                                    name:'items_is_active',
                                                                                    id:'items_is_active'+page,
                                                                                    hidden:true,
                                                                                },
                                                                                {
                                                                                    xtype:'textfield',
                                                                                    name:'catemail',
                                                                                    id:'service_catemail'+page,
                                                                                    hidden:true,
                                                                                },
                                                                                {
                                                                                    xtype:'textfield',
                                                                                    name:'stdemail',
                                                                                    id:'service_stdemail'+page,
                                                                                    hidden:true,
                                                                                },
                                                                                {
                                                                                    xtype:'textfield',
                                                                                    name:'procemail',
                                                                                    id:'service_procemail'+page,
                                                                                    hidden:true,
                                                                                },
                                                                                {
                                                                                    xtype:'textfield',
                                                                                    name:'requesttype',
                                                                                    id:'service_requesttype'+page,
                                                                                    hidden:true,
                                                                                },
                                                                                {
                                                                                    xtype: 'tbfill'
                                                                                },
                                                                                {
                                                                                    xtype: 'button',
                                                                                    margin: '3 3 3 0',
                                                                                    iconCls:'browse',
                                                                                    text: 'Raw',
                                                                                    id:'btnServiceViewRaw'+page,
                                                                                    disabled:true,
                                                                                    handler: function() {
                                                                                        winServiceRawSource.animateTarget = 'btnServiceViewRaw'+page;
                                                                                        winServiceRawSource.show();
                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype: 'button',
                                                                                    margin: '3 3 3 0',
                                                                                    iconCls:'browse',
                                                                                    text: 'Document',
                                                                                    id:'btnServiceViewDocument'+page,
                                                                                    disabled:true,
                                                                                    handler: function() {
                                                                                        var filters = [];
                                                                                        var adr_d_items_id = new Ext.util.Filter({
                                                                                            operator: 'eq',
                                                                                            value: Ext.getCmp('service_adr_d_items_id'+page).getValue(),
                                                                                            property: "adr_d_items_id",
                                                                                            type: "numeric",
                                                                                        });
                                                                                        filters.push(adr_d_items_id['initialConfig']) ;
                                                                                        store_service_document.proxy.extraParams = {
                                                                                            filter: Ext.encode(filters),
                                                                                            action:'getServiceDocument'
                                                                                        };
                                                                                        store_service_document.load({
                                                                                            params:{
                                                                                                start:0,
                                                                                                limit:25
                                                                                            }
                                                                                        });
                                                                                        winServiceDocument.animateTarget = 'btnServiceDocument'+page;
                                                                                        Ext.getCmp('winServiceDocument'+page).setTitle("Documents Catalog No. "+ Ext.getCmp('catalog_no'+page).getValue());
                                                                                        winServiceDocument.show();

                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype: 'button',
                                                                                    margin: '3 3 3 0',
                                                                                    iconCls:'browse',
                                                                                    text: 'Image',
                                                                                    id:'btnServiceViewImages'+page,
                                                                                    disabled:true,
                                                                                    handler: function() {
                                                                                        winServiceImagesSource.animateTarget = 'btnServiceViewImages'+page;
                                                                                        Ext.getCmp('winServiceImagesSource'+page).setTitle("Images Catalog No. "+ Ext.getCmp('catalog_no'+page).getValue());
                                                                                        winServiceImagesSource.show();
                                                                                        var filters = [];
                                                                                        var inc_filter = new Ext.util.Filter({
                                                                                            operator: 'eq',
                                                                                            value: Ext.getCmp('service_adr_d_items_id'+page).getValue(),
                                                                                            property: "adr_d_items_id",
                                                                                            type: "numeric",
                                                                                        });
                                                                                        filters.push(inc_filter['initialConfig']) ;
                                                                                        store_service_images.proxy.extraParams = {
                                                                                            filter: Ext.encode(filters),
                                                                                            action:'getServiceImages'
                                                                                        };
                                                                                        store_service_images.load({
                                                                                            params:{
                                                                                                start:0,
                                                                                                limit:1
                                                                                            }
                                                                                        });
                                                                                    }
                                                                                },
                                                                                {
                                                                                    xtype: 'splitter'
                                                                                },
                                                                                {
                                                                                    xtype: 'displayfield',
                                                                                    id: 'service_adr_status'+page,
                                                                                    value: '',
                                                                                    width: 190,
                                                                                    labelWidth: 75,
                                                                                    fieldLabel: 'ADR status',
                                                                                    name:'adr_status',
                                                                                    fieldStyle: 'color: red;',
                                                                                    submitValue: true
                                                                                },
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            margin: '0 0 0 5',
                                                                            layout: 'hbox',
                                                                            border:false,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: 'service_adr_m_id'+page,
                                                                                    name:'adr_m_id',
                                                                                    width: 350,
                                                                                    editable: true,
                                                                                    value: '',
                                                                                    readOnly:true,
                                                                                    hidden:true
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: 'service_adr_d_items_id'+page,
                                                                                    name:'adr_d_items_id',
                                                                                    width: 350,
                                                                                    editable: true,
                                                                                    value: '',
                                                                                    readOnly:true,
                                                                                    hidden:true
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    fieldLabel: 'SAP Service Code.',
                                                                                    maxLength:18,
                                                                                    labelWidth:130,
                                                                                    width: 350,
                                                                                    id: 'sap_service_code'+page,
                                                                                    name:'sap_material_code',
                                                                                    editable: true,
                                                                                    value: '',
                                                                                    readOnly:true,
                                                                                    // hidden:!ROLE.SAPServiceCode,
                                                                                },
                                                                                {
                                                                                    xtype:'textfield',
                                                                                    name:'sap_material_code_by',
                                                                                    id:'sap_service_code_by'+page,
                                                                                    hidden:true,
                                                                                },
                                                                                {
                                                                                    xtype:'textfield',
                                                                                    name:'sap_material_code_date',
                                                                                    id:'sap_service_code_date'+page,
                                                                                    hidden:true,
                                                                                },
                                                                                {
                                                                                    xtype: 'tbfill'
                                                                                },
                                                                                {
                                                                                    xtype: 'displayfield',
                                                                                    id: 'service_item_status'+page,
                                                                                    name:'item_status',
                                                                                    width: 190,
                                                                                    labelWidth: 75,
                                                                                    fieldLabel: 'Item Status',
                                                                                    // fieldStyle: 'color: red;',
                                                                                    value: '',
                                                                                    submitValue: true
                                                                                },
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            margin: '0 0 0 5',
                                                                            layout: 'hbox',
                                                                            border:false,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'combobox',
                                                                                    labelWidth: 130,
                                                                                    width: 290,
                                                                                    fieldLabel: 'INC',
                                                                                    matchFieldWidth: false,
                                                                                    forceSelection: true,
                                                                                    mode: 'remote',
                                                                                    triggerAction: 'all',
                                                                                    emptyText: 'Select INC ...',
                                                                                    selectOnFocus: true,
                                                                                    itemId: 'service_inc'+page,
                                                                                    id: 'service_inc'+page,
                                                                                    name: 'inc',
                                                                                    hiddenName: 'inc_code',
                                                                                    displayField: 'inc',
                                                                                    valueField: 'inc',
                                                                                    minChars: 0,
                                                                                    store: store_service_inc,
                                                                                    pageSize: 5,
                                                                                    disabled:false,
                                                                                    listConfig: {
                                                                                        loadingText: 'Searching...',
                                                                                        emptyText: 'No matching data found!',
                                                                                        getInnerTpl: function() {
                                                                                            return '{class_inc_name}';
                                                                                        }
                                                                                    },
                                                                                    listeners: {
                                                                                        scope: this,
                                                                                        beforequery: function(queryEvent, eOpts ,value) {
                                                                                            // console.log(Ext.getCmp('service_mgc'+page).getValue());
                                                                                            // Ext.Ajax.abortAll(); //cancel any previous requests
                                                                                            var filters = [];
                                                                                            var transaction_type = new Ext.util.Filter({
                                                                                                operator: 'eq',
                                                                                                value: 'Service',
                                                                                                property: "transaction_type",
                                                                                                type: "string",
                                                                                            });
                                                                                            filters.push(transaction_type['initialConfig']) ;

                                                                                            /*var groupclass_filter = new Ext.util.Filter({
                                                                                             operator: 'eq',
                                                                                             value: Ext.getCmp('material_mgc'+page).getValue(),
                                                                                             property: "groupclass",
                                                                                             type: "string",
                                                                                             });

                                                                                             if(Ext.getCmp('service_mgc'+page).getValue()){
                                                                                             filters.push(groupclass_filter['initialConfig']) ;
                                                                                             }*/

                                                                                            var inc_filter = new Ext.util.Filter({
                                                                                                operator: 'like',
                                                                                                value: queryEvent.query.toLowerCase(),
                                                                                                property: "class_inc_name",
                                                                                                type: "string",
                                                                                            });
                                                                                            if(queryEvent.query.toLowerCase()){
                                                                                                filters.push(inc_filter['initialConfig']) ;
                                                                                            }
                                                                                            var is_active = new Ext.util.Filter({
                                                                                                operator: 'eq',
                                                                                                value: 'Active',
                                                                                                property: "is_active",
                                                                                                type: "string",
                                                                                            });
                                                                                            filters.push(is_active['initialConfig']) ;

                                                                                            // if(queryEvent.query.toLowerCase()){
                                                                                            store_service_inc.proxy.extraParams = {
                                                                                                filter: Ext.encode(filters),
                                                                                                action: 'getIncByMGC'
                                                                                            };
                                                                                            store_service_inc.load({
                                                                                                params:{
                                                                                                    start:0,
                                                                                                    limit:25
                                                                                                }
                                                                                            });
                                                                                            // }

                                                                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                                                                            return true;

                                                                                        },
                                                                                        select: function(t, record, o) {
                                                                                            var matching = store_service_inc.queryBy(
                                                                                                function(rec, id) {

                                                                                                    if (rec.data.inc == record.data.inc) {

                                                                                                        Ext.getCmp('service_name_code'+page).setValue(rec.data.item_name);
                                                                                                        Ext.getCmp('service_short_name_code'+page).setValue(rec.data.short_name_code);
                                                                                                        Ext.getCmp('service_short_description'+page).setValue(rec.data.short_name_code);
                                                                                                        Ext.getCmp('service_long_description'+page).setValue(rec.data.short_name_code);

                                                                                                        var filters = [];
                                                                                                        var inc_filter = new Ext.util.Filter({
                                                                                                            operator: 'eq',
                                                                                                            value: record.data.inc,
                                                                                                            property: "inc",
                                                                                                            type: "string",
                                                                                                        });
                                                                                                        filters.push(inc_filter['initialConfig']) ;

                                                                                                        var sorters = [];
                                                                                                        var seq_shorter = new Ext.util.Sorter({
                                                                                                            property: "sequence",
                                                                                                            direction: "ASC",
                                                                                                        });
                                                                                                        sorters.push(seq_shorter['initialConfig']) ;

                                                                                                        /*store_service_item_char.proxy.extraParams = {
                                                                                                            filter: Ext.encode(filters),
                                                                                                            action:'getAdrItemsChar',
                                                                                                            adr_d_items_id: Ext.getCmp('service_adr_d_items_id'+page).getValue(),
                                                                                                            sort: Ext.encode(sorters),
                                                                                                        };*/
                                                                                                        store_service_item_char.proxy.extraParams = {
                                                                                                            // filter: Ext.encode(filters),
                                                                                                            // action:'getAdrItemsChar',
                                                                                                            inc_m_id:record.data.id,
                                                                                                            adr_d_items_id: Ext.getCmp('service_adr_d_items_id'+page).getValue(),
                                                                                                            sort: Ext.encode(sorters),
                                                                                                        };

                                                                                                        store_service_item_char.load({
                                                                                                            params:{
                                                                                                                start:0,
                                                                                                                limit:300
                                                                                                                // action : 'getInc',
                                                                                                                // filter: Ext.encode(filters),
                                                                                                            }
                                                                                                        });

                                                                                                        Ext.getCmp('service_mgc'+page).reset();
                                                                                                        var filters = [];
                                                                                                        var groupclassType_filter = new Ext.util.Filter({
                                                                                                            operator: 'eq',
                                                                                                            value: 'Service',
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

                                                                                                        store_mgc.proxy.extraParams = {
                                                                                                            filter: Ext.encode(filters),
                                                                                                            action :'getGroupByInc' ,
                                                                                                        };
                                                                                                        store_mgc.load({
                                                                                                            params:{
                                                                                                                start:0,
                                                                                                                limit:25
                                                                                                                // action : 'getInc',
                                                                                                                // filter: Ext.encode(filters),
                                                                                                            }
                                                                                                        });
                                                                                                        return;
                                                                                                    }
                                                                                                });

                                                                                        }
                                                                                    },
                                                                                    allowBlank:true,
                                                                                    value: '',
                                                                                    hidden:!ROLE.INC,
                                                                                    readOnly:true
                                                                                },
                                                                                {
                                                                                    xtype: 'combobox',
                                                                                    fieldLabel:'SGC',
                                                                                    labelWidth: 30,
                                                                                    width: 205,
                                                                                    matchFieldWidth: false,
                                                                                    forceSelection: true,
                                                                                    name: 'groupclass',
                                                                                    displayField: 'groupclass',
                                                                                    valueField: 'groupclass',
                                                                                    store: store_mgc,
                                                                                    pageSize: 15,
                                                                                    minChars : 0,
                                                                                    margin: '0 13 0 5',
                                                                                    disabled:false,
                                                                                    mode: 'remote',
                                                                                    triggerAction: 'all',
                                                                                    emptyText: 'Select SGC ...',
                                                                                    selectOnFocus: true,
                                                                                    itemId:'service_mgc'+page,
                                                                                    id:'service_mgc'+page,
                                                                                    listConfig: {
                                                                                        loadingText: 'Searching...',
                                                                                        emptyText: 'No matching data found!',
                                                                                        getInnerTpl: function() {
                                                                                            return '{group_class_name}';
                                                                                        }
                                                                                    },
                                                                                    listeners: {
                                                                                        scope: this,
                                                                                        beforequery: function(queryEvent, eOpts ,value) {
                                                                                            var filters = [];
                                                                                            var transaction_type = new Ext.util.Filter({
                                                                                                operator: 'eq',
                                                                                                value: 'Service',
                                                                                                property: "transaction_type",
                                                                                                type: "string",
                                                                                            });

                                                                                            var inc_filter = new Ext.util.Filter({
                                                                                                operator: 'eq',
                                                                                                value: Ext.getCmp('service_inc'+page).getValue(),
                                                                                                property: "inc",
                                                                                                type: "string",
                                                                                            });
                                                                                            filters.push(inc_filter['initialConfig']) ;

                                                                                            filters.push(transaction_type['initialConfig']) ;
                                                                                            var groupclass_filter = new Ext.util.Filter({
                                                                                                operator: 'like',
                                                                                                value: queryEvent.query.toLowerCase(),
                                                                                                property: "group_class_name",
                                                                                                type: "string",
                                                                                            });
                                                                                            if(queryEvent.query.toLowerCase()){
                                                                                                filters.push(groupclass_filter['initialConfig']) ;
                                                                                            }
                                                                                            store_mgc.proxy.extraParams = {
                                                                                                filter: Ext.encode(filters),
                                                                                                action :'getGroupByInc' ,
                                                                                            };
                                                                                            store_mgc.load({
                                                                                                params:{
                                                                                                    start:0,
                                                                                                    limit:25
                                                                                                }
                                                                                            });
                                                                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                                                                            return true;
                                                                                        },
                                                                                        select: function (combo , record ,o) {
                                                                                            var matching = store_mgc.queryBy(
                                                                                                function(rec, id) {

                                                                                                    if (rec.data.groupclass == record.data.groupclass) {

                                                                                                    }
                                                                                                }
                                                                                            );

                                                                                        },
                                                                                    },
                                                                                    allowBlank:true,
                                                                                    value: '',
                                                                                    readOnly:true,
                                                                                    hidden:!ROLE.MGC
                                                                                },


                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            margin: '0 0 0 5',
                                                                            layout: 'hbox',
                                                                            border:false,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    fieldLabel: 'Name Code',
                                                                                    labelWidth: 130,
                                                                                    width: 500,
                                                                                    editable: false,
                                                                                    value: '',
                                                                                    margin: '3 3 3 0',
                                                                                    id:'service_name_code'+page,
                                                                                    name:'name_code',
                                                                                },

                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            margin: '0 0 0 5',
                                                                            layout: 'hbox',
                                                                            border:false,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    fieldLabel: 'Short Name Code',
                                                                                    labelWidth: 130,
                                                                                    width: 500,
                                                                                    editable: false,
                                                                                    value: '',
                                                                                    // margin: '3 3 3 0',
                                                                                    id:'service_short_name_code'+page,
                                                                                    name:'short_name_code'
                                                                                },
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            margin:'0 0 0 5',
                                                                            layout: 'hbox',
                                                                            border:false,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    fieldLabel: 'Short Desc.',
                                                                                    labelWidth: 130,
                                                                                    // maxLength:40,
                                                                                    width: 500,
                                                                                    editable: false,
                                                                                    value: '',
                                                                                    margin: '3 3 3 0',
                                                                                    id:'service_short_description'+page,
                                                                                    name:'short_description'
                                                                                },
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            margin:'0 0 0 5',
                                                                            layout: 'hbox',
                                                                            border:false,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'textarea',
                                                                                    fieldLabel: 'Long Desc.',
                                                                                    // id: 'se_longdesc',
                                                                                    labelWidth: 130,
                                                                                    width: 739,
                                                                                    // height: 50,
                                                                                    editable: false,
                                                                                    value: '',
                                                                                    margin: '0 3 3 0',
                                                                                    id:'service_long_description'+page,
                                                                                    name:'long_description'
                                                                                },
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            margin:'0 0 0 5',
                                                                            layout: 'hbox',
                                                                            border:false,
                                                                            items: [
                                                                                {
                                                                                    xtype:'combobox',
                                                                                    // xtype:'combobox',
                                                                                    fieldLabel: 'Service Type',
                                                                                    labelWidth: 130,
                                                                                    width: 270,
                                                                                    forceSelection : true,
                                                                                    mode: 'remote',
                                                                                    triggerAction: 'all',
                                                                                    emptyText:'Select Type...',
                                                                                    selectOnFocus:false,
                                                                                    margin: '3 3 3 0',
                                                                                    itemId:'service_type'+ page,
                                                                                    id:'service_type'+ page,
                                                                                    name:           'material_type',
                                                                                    hiddenName:     'value',
                                                                                    displayField:   'code',
                                                                                    valueField:     'code',
                                                                                    minChars : 0,
                                                                                    matchFieldWidth: false,
                                                                                    listConfig: {
                                                                                        loadingText: 'Searching...',
                                                                                        emptyText: 'No matching data found!',
                                                                                        getInnerTpl: function() {
                                                                                            return '{entity_code_name} <span style="font-size: xx-small; ">{description}</span>';
                                                                                        }
                                                                                    },
                                                                                    store: store_service_type,
                                                                                    typeAhead: false,
                                                                                    allowBlank:false,
                                                                                    pageSize : 5,
                                                                                    msgTarget: 'under',
                                                                                    listeners: {
                                                                                        scope: this,
                                                                                        beforequery: function(queryEvent, eOpts ,value) {
                                                                                            var filters = [];
                                                                                            var entity_name = new Ext.util.Filter({
                                                                                                operator: 'like',
                                                                                                value: 'service_type',
                                                                                                property: "entity_name",
                                                                                                type: "string",
                                                                                            });

                                                                                            filters.push(entity_name['initialConfig']) ;

                                                                                            var ServiceTypeFilter = new Ext.util.Filter({
                                                                                                operator: 'like',
                                                                                                value: queryEvent.query.toLowerCase(),
                                                                                                property: "code",
                                                                                                type: "string",
                                                                                            });
                                                                                            if(queryEvent.query.toLowerCase()){
                                                                                                filters.push(ServiceTypeFilter['initialConfig']) ;
                                                                                            }
                                                                                            store_service_type.proxy.extraParams = {
                                                                                                filter: Ext.encode(filters),
                                                                                                action :'getEntity'
                                                                                            };
                                                                                            store_service_type.load({
                                                                                                params:{
                                                                                                    start:0,
                                                                                                    limit:25
                                                                                                }
                                                                                            });
                                                                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                                                                            return true;
                                                                                        },
                                                                                        change: function (t,record,o) {
                                                                                            

                                                                                        },

                                                                                        /*onTrigger2Click: function() {
                                                                                         alert("Trigger 2!");
                                                                                         }*/

                                                                                    },
                                                                                    value: '',
                                                                                    hidden:!ROLE.ServiceType,
                                                                                    readOnly:true


                                                                                },
                                                                                {
                                                                                    xtype: 'combobox',
                                                                                    fieldLabel: 'UOM',
                                                                                    labelWidth: 60,
                                                                                    width: 230,
                                                                                    forceSelection : true,
                                                                                    mode: 'remote',
                                                                                    triggerAction: 'all',
                                                                                    emptyText:'Select UOM ...',
                                                                                    selectOnFocus:false,
                                                                                    margin: '3 3 3 0',
                                                                                    itemId:'service_uom'+ page,
                                                                                    id:'service_uom'+ page,
                                                                                    name:           'uom',
                                                                                    hiddenName:     'code',
                                                                                    displayField:   'code',
                                                                                    valueField:     'code',
                                                                                    minChars : 0,
                                                                                    queryParam: "query",
                                                                                    queryMode: "remote",
                                                                                    queryCaching: false,
                                                                                    store: store_service_uom,
                                                                                    typeAhead: false,
                                                                                    allowBlank:false,
                                                                                    msgTarget: 'under',
                                                                                    pageSize:15,
                                                                                    matchFieldWidth: false,
                                                                                    listConfig: {
                                                                                        loadingText: 'Searching...',
                                                                                        emptyText: 'No matching data found!',
                                                                                        width:250,
                                                                                        getInnerTpl: function() {
                                                                                            return '{code} <span style="font-size: xx-small; ">{description}</span>';
                                                                                        }
                                                                                    },
                                                                                    listeners: {
                                                                                        scope: this,
                                                                                        beforequery: function(queryEvent, eOpts ,value) {
                                                                                            var filters = [];
                                                                                            var uom_filter = new Ext.util.Filter({
                                                                                                operator: 'like',
                                                                                                value: queryEvent.query.toLowerCase(),
                                                                                                property: "code",
                                                                                                type: "string",
                                                                                            });

                                                                                            if(queryEvent.query.toLowerCase()){
                                                                                                filters.push(uom_filter['initialConfig']) ;
                                                                                            }

                                                                                            var entity_name = new Ext.util.Filter({
                                                                                                operator: 'eq',
                                                                                                value: 'uom',
                                                                                                property: "entity_name",
                                                                                                type: "string",
                                                                                            });

                                                                                            filters.push(entity_name['initialConfig']) ;

                                                                                            store_service_uom.proxy.extraParams = {
                                                                                                filter: Ext.encode(filters),
                                                                                            };

                                                                                            store_service_uom.load({
                                                                                                params:{
                                                                                                    start:0,
                                                                                                    limit:25
                                                                                                }
                                                                                            });
                                                                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                                                                            return true;
                                                                                        },
                                                                                        change: function (t,record,o) {
                                                                                            
                                                                                        }

                                                                                    },
                                                                                    value: '',
                                                                                    hidden:!ROLE.UOM,
                                                                                    readOnly:true
                                                                                },
                                                                                {
                                                                                    xtype: 'combobox',
                                                                                    fieldLabel: 'Category',
                                                                                    labelWidth: 90,
                                                                                    width: 230,
                                                                                    matchFieldWidth: false,
                                                                                    forceSelection : true,
                                                                                    mode: 'remote',
                                                                                    triggerAction: 'all',
                                                                                    emptyText:'Select Category ...',
                                                                                    selectOnFocus:false,
                                                                                    margin: '3 3 3 0',
                                                                                    itemId:'service_category'+ page,
                                                                                    id:'service_category'+ page,
                                                                                    name:           'category',
                                                                                    displayField:   'code',
                                                                                    valueField:     'code',
                                                                                    minChars : 0,
                                                                                    pageSize:15,
                                                                                    listConfig: {
                                                                                        loadingText: 'Searching...',
                                                                                        emptyText: 'No matching data found!',
                                                                                        getInnerTpl: function() {
                                                                                            return '{code} <span style="font-size: xx-small; ">{description}</span>';
                                                                                        }
                                                                                    },
                                                                                    store:store_service_category,
                                                                                    typeAhead: false,
                                                                                    allowBlank:false,
                                                                                    msgTarget: 'under',
                                                                                    listeners: {
                                                                                        scope: this,
                                                                                        beforequery: function(queryEvent, eOpts ,value) {
                                                                                            var filters = [];
                                                                                            var CategoryFilter = new Ext.util.Filter({
                                                                                                operator: 'like',
                                                                                                value: queryEvent.query.toLowerCase(),
                                                                                                property: "code",
                                                                                                type: "string",
                                                                                            });
                                                                                            if(queryEvent.query.toLowerCase()){
                                                                                                filters.push(CategoryFilter['initialConfig']) ;
                                                                                            }

                                                                                            var entity_name = new Ext.util.Filter({
                                                                                                operator: 'eq',
                                                                                                value: 'servicecategory',
                                                                                                property: "entity_name",
                                                                                                type: "string",
                                                                                            });

                                                                                            filters.push(entity_name['initialConfig']) ;

                                                                                            store_service_category.proxy.extraParams = {
                                                                                                filter: Ext.encode(filters),
                                                                                                action :'getEntity'
                                                                                            };

                                                                                            store_service_category.load({
                                                                                                params:{
                                                                                                    start:0,
                                                                                                    limit:25
                                                                                                }
                                                                                            });

                                                                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                                                                            return true;
                                                                                        },
                                                                                        change: function (t,record,o) {
                                                                                            
                                                                                        }

                                                                                    },
                                                                                    value: '',
                                                                                    readOnly:true,
                                                                                    hidden:!ROLE.Category,
                                                                                },
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype:'textfield',
                                                                            name:'updated_by',
                                                                            id:'service_updated_by'+page,
                                                                            hidden:true,
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            margin:'0 0 0 5',
                                                                            layout: 'hbox',
                                                                            border:false,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'combobox',
                                                                                    // msgTarget: 'side',
                                                                                    fieldLabel: 'Cataloguer',
                                                                                    labelWidth: 130,
                                                                                    width: 270,
                                                                                    forceSelection : true,
                                                                                    mode: 'remote',
                                                                                    triggerAction: 'all',
                                                                                    emptyText:'Select Cataloguer...',
                                                                                    selectOnFocus:true,
                                                                                    margin: '3 3 3 0',
                                                                                    itemId:'service_cataloguer'+ page,
                                                                                    id:'service_cataloguer'+ page,
                                                                                    name:           'cataloguer',
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
                                                                                    hidden:!ROLE.Cataloguer,
                                                                                    readOnly:true
                                                                                },
                                                                                {
                                                                                    xtype:'textfield',
                                                                                    name:'cataloguer_by',
                                                                                    id:'service_cataloguer_by'+page,
                                                                                    hidden:true,
                                                                                },
                                                                                {
                                                                                    xtype:'textfield',
                                                                                    name:'cataloguer_date',
                                                                                    id:'service_cataloguer_date'+page,
                                                                                    hidden:true,
                                                                                },
                                                                                {
                                                                                    xtype: 'combobox',
                                                                                    // msgTarget: 'side',
                                                                                    fieldLabel: 'Std App',
                                                                                    labelWidth: 60,
                                                                                    width: 230,
                                                                                    forceSelection : true,
                                                                                    mode: 'remote',
                                                                                    triggerAction: 'all',
                                                                                    emptyText:'Select Std App ...',
                                                                                    selectOnFocus:true,
                                                                                    margin: '3 3 3 0',
                                                                                    itemId:'service_std_approval'+ page,
                                                                                    id:'service_std_approval'+ page,
                                                                                    name:           'std_approval',
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
                                                                                    readOnly:true,
                                                                                    hidden:!ROLE.StdApp,
                                                                                },
                                                                                {
                                                                                    xtype:'textfield',
                                                                                    name:'std_approval_by',
                                                                                    id:'service_std_approval_by'+page,
                                                                                    hidden:true,
                                                                                },
                                                                                {
                                                                                    xtype:'textfield',
                                                                                    name:'std_approval_date',
                                                                                    id:'service_std_approval_date'+page,
                                                                                    hidden:true,
                                                                                },
                                                                                {
                                                                                    xtype: 'combobox',
                                                                                    msgTarget: 'side',
                                                                                    fieldLabel: 'Proc App',
                                                                                    labelWidth: 90,
                                                                                    width: 230,
                                                                                    forceSelection : true,
                                                                                    mode: 'remote',
                                                                                    triggerAction: 'all',
                                                                                    emptyText:'Select Approver ...',
                                                                                    selectOnFocus:true,
                                                                                    margin: '3 3 3 0',
                                                                                    itemId:'service_proc_approver'+ page,
                                                                                    id:'service_proc_approver'+ page,
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
                                                                                    hidden:!ROLE.ProcApp,
                                                                                    readOnly:true
                                                                                },
                                                                                {
                                                                                    xtype:'textfield',
                                                                                    name:'proc_approver_by',
                                                                                    id:'service_proc_approver_by'+page,
                                                                                    hidden:true,
                                                                                },
                                                                                {
                                                                                    xtype:'textfield',
                                                                                    name:'proc_approver_date',
                                                                                    id:'service_proc_approver_date'+page,
                                                                                    hidden:true,
                                                                                },
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            margin:'0 0 0 5',
                                                                            layout: 'hbox',
                                                                            border:false,
                                                                            items: [
                                                                                {
                                                                                    xtype: 'displayfield',
                                                                                    id: 'service_owner'+page,
                                                                                    labelWidth: 130,
                                                                                    width: 300,
                                                                                    fieldLabel: 'Service Owner',
                                                                                    value: ''
                                                                                },
																				  {
                                                                                    xtype: 'button',
                                                                                    margin: '3 3 3 0',
                                                                                    iconCls:'browse',
                                                                                    text: 'Hist. Owner',
                                                                                    id:'btnHisDataTransport'+page,
                                                                                    disabled:true,
																					hidden:false,
                                                                                    handler: function() {
                                                                                          
                                                                                        var catno =Ext.getCmp('catalog_no'+page).getValue();
                                                                                        if (catno) 
                                                                                          { 
                                                                                             winServiceOwnerCode.animateTarget = 'btnServiceOwnerCode'+page;
                                                                                             winServiceOwnerCode.setTitle("Owner Data Tranport, Catalog No."+Ext.getCmp('catalog_no'+page).getValue()),
                                                                                             winServiceOwnerCode.show();
                                                                                             var filters = [];
                                                                                             var adr_d_items_id_filter = new Ext.util.Filter({
                                                                                                 operator: 'eq',
                                                                                                 value: catno,
                                                                                                 property: "catalog_no",
                                                                                                 type: "string",
                                                                                             });
                                                                                             filters.push(adr_d_items_id_filter['initialConfig']) ;
                                                                                             store_Service_OwnerCode.proxy.extraParams = {
                                                                                                 filter: Ext.encode(filters),
                                                                                                 action:'geTrxCodeHisto'
                                                                                             };
                                                                                             store_Service_OwnerCode.load({
                                                                                                 params:{
                                                                                                     // action : 'getInc',
                                                                                                     // filter: Ext.encode(filters),
                                                                                                 }
                                                                                             });                                                                                
                                                                                        }
                                                                                  },
                                                                                 },
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'panel',
                                                                            margin:'0 0 10 5',
                                                                            layout: 'hbox',
                                                                            border:false,
                                                                            items: [

                                                                                {
                                                                                    xtype: 'displayfield',
                                                                                    id: 'ServiceRibbonUser'+page,
                                                                                    width: 82,
                                                                                    value: 'USER',
                                                                                    style: 'text-align: center;font-color:white;font-weight: bold;',
                                                                                    cls:'RibbonGrey',

                                                                                    // hidden:true,
                                                                                },
                                                                                {
                                                                                    xtype: 'displayfield',
                                                                                    id: 'ServiceRibbonCat'+page,
                                                                                    width: 82,
                                                                                    value: 'CAT',
                                                                                    style: 'text-align: center;font-color:white;font-weight: bold;',
                                                                                    cls:'RibbonGrey',
                                                                                    // hidden:true,
                                                                                },
                                                                                {
                                                                                    xtype: 'displayfield',
                                                                                    id: 'ServiceRibbonStdApp'+page,
                                                                                    width: 82,
                                                                                    value: 'Std App',
                                                                                    style: 'text-align: center;font-color:white;font-weight: bold;',
                                                                                    cls:'RibbonGrey',
                                                                                    // hidden:true,
                                                                                },
                                                                                {
                                                                                    xtype: 'displayfield',
                                                                                    id: 'ServiceRibbonProccApp'+page,
                                                                                    width: 82,
                                                                                    value: 'Proc App',
                                                                                    // cls:'RibbonYellow',
                                                                                    style: 'text-align: center;font-color:white;font-weight: bold;',
                                                                                    cls:'RibbonGrey',
                                                                                    // hidden:true,
                                                                                },
                                                                                {
                                                                                    xtype: 'displayfield',
                                                                                    id: 'ServiceRibbonSAP'+page,
                                                                                    width: 82,
                                                                                    value: 'SAP',
                                                                                    style: 'text-align: center;font-color:white;font-weight: bold;',
                                                                                    cls:'RibbonGrey',
                                                                                    // hidden:true,
                                                                                },
                                                                                /*{
                                                                                 // xtype: '',
                                                                                 iconCls:'chk-pwd'
                                                                                 },

                                                                                 */

                                                                            ]
                                                                        },
                                                                    ]
                                                                },

                                                            ]
                                                        },
                                                        {
                                                            region: 'center',
                                                            layout: {
                                                                type: 'vbox',
                                                                pack: 'start',
                                                                align: 'stretch'
                                                            },
                                                            border:false,
                                                            items: [
                                                                {
                                                                    xtype:'panel',
                                                                    flex: 3,
                                                                    // collapsible:true,
                                                                    // expanded:false,
                                                                    // width:'50%',
                                                                    border:false,
                                                                    layout:'fit',
                                                                    frame:false,
                                                                    plain:false,
                                                                    items:[grid_service_inc_characteristic]
                                                                },
                                                                {
                                                                    xtype: 'splitter',
                                                                },
                                                                {
                                                                    xtype:'panel',
                                                                    flex: 3,
                                                                    // collapsible:true,
                                                                    // expanded:false,
                                                                    // width:'50%',
                                                                    border:false,
                                                                    layout:'fit',
                                                                    frame:false,
                                                                    plain:false,
                                                                    items:[grid_service_cross_references]
                                                                },
                                                                {
                                                                    xtype: 'splitter',
                                                                },
                                                                {
                                                                    xtype:'panel',
                                                                    flex: 3,
                                                                    // collapsible:true,
                                                                    // expanded:false,
                                                                    // width:'50%',
                                                                    border:false,
                                                                    layout:'fit',
                                                                    frame:false,
                                                                    plain:false,
                                                                    items:[grid_service_funcloc]
                                                                }
                                                            ]
                                                        }
                                                    ]
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
            bbar: [
                '-',
                {
                    xtype: 'button',
                    text: 'view notes',
                    iconCls:'browse',
                    margin: '0 0 0 10',
                    id:'btnServiceViewNotes'+page,
                    hidden:!ROLE.ViewNotes,
                    disabled:true,
                    handler: function() {
                        winServiceViewNotes.animateTarget = 'btnServiceViewNotes'+page;
                        winServiceViewNotes.setTitle("Service View Notes Catalog No."+Ext.getCmp('catalog_no'+page).getValue()),
                            winServiceViewNotes.show();
                        var filters = [];
                        var adr_d_items_id_filter = new Ext.util.Filter({
                            operator: 'eq',
                            value: Ext.getCmp('service_adr_d_items_id'+page).getValue(),
                            property: "adr_d_items_id",
                            type: "string",
                        });
                        filters.push(adr_d_items_id_filter['initialConfig']) ;
                        store_service_view_notes.proxy.extraParams = {
                            filter: Ext.encode(filters),
                            action:'getViewNotes'
                        };
                        store_service_view_notes.load({
                            params:{
                                // action : 'getInc',
                                // filter: Ext.encode(filters),
                            }
                        });

                    }
                },
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    margin: '3 3 3 0',
                    iconCls:'accept',
                    text: 'Service Deletion',
                    // baseCls: 'buttonStyle',
                    hidden:!ROLE.ServiceDeletion,
                    id:'btnServiceDeletion'+page,
                    disabled:true,
                    handler: function() {
                        var form_service_single_view = Ext.getCmp('formServiceSV'+pageid);
                        var service_char = Ext.encode(Ext.pluck(store_service_item_char.data.items, 'data'));
                        var CatApp = Ext.getCmp('service_cataloguer'+page).getValue();
                        var StdApp = Ext.getCmp('service_std_approval'+page).getValue();
                        var ProcApp = Ext.getCmp('service_proc_approver'+page).getValue();
                        var SAPServiceCode = Ext.getCmp('sap_service_code'+page).getValue();

                        var inc = Ext.getCmp('service_inc'+page).getValue() ;
                        var sgc = Ext.getCmp('service_mgc'+page).getValue() ;
                        var service_type = Ext.getCmp('service_type'+page).getValue() ;
                        var uom = Ext.getCmp('service_uom'+page).getValue();
                        var category = Ext.getCmp('service_category'+page).getValue() ;

                        Ext.MessageBox.show({
                            title:'Warning',
                            msg:'Sure to deletion this data?',
                            buttons : Ext.MessageBox.YESNO,
                            //animEl:bt.id,
                            icon :Ext.MessageBox.WARNING,
                            fn:function(b){
                                if (b =='yes') {

                                    Ext.MessageBox.show({
                                        msg: 'Saving your data, please wait...',
                                        progressText: 'Saving...',
                                        width: 300,
                                        wait: true,
                                        waitConfig: {interval: 200},
                                        icon: 'ext-mb-download',
                                        animEl: 'buttonID'
                                    });

                                    form_service_single_view.form.submit({
                                        scope: this,
                                        url: '/ServiceDeletion',
                                        method: 'POST',
                                        dataType: 'html',
                                        params: {
                                            _token: csrf_token,
                                            transaction_type: 'Service',
                                            items_characteristic: service_char,
                                        },
                                        success: function (response, request) {
                                            SearchServiceCatalogNo();
                                            Ext.MessageBox.hide();

                                            Ext.MessageBox.show(
                                                {
                                                    title: 'Message',
                                                    msg: 'Process Successfully !',
                                                    buttons: Ext.MessageBox.OK,
                                                    icon: Ext.MessageBox.INFO
                                                }
                                            );

                                        },
                                        failure: function (response, request) {
                                            if (typeof request.response != 'undefined')
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
                            }
                        });
                    }
                },
                {
                    xtype: 'button',
                    margin: '3 3 3 0',
                    iconCls:'accept',
                    text: 'Apply changes',
                    // baseCls: 'buttonStyle',
                    hidden:!ROLE.ServiceApplyChanges,
                    id:'btnServiceApplyChanges'+page,
                    disabled:true,
                    handler: function() {
                        var form_service_single_view = Ext.getCmp('formServiceSV'+pageid);
                        var service_char = Ext.encode(Ext.pluck(store_service_item_char.data.items, 'data'));
                        var CatApp = Ext.getCmp('service_cataloguer'+page).getValue();
                        var StdApp = Ext.getCmp('service_std_approval'+page).getValue();
                        var ProcApp = Ext.getCmp('service_proc_approver'+page).getValue();
                        var SAPServiceCode = Ext.getCmp('sap_service_code'+page).getValue();

                        var inc = Ext.getCmp('service_inc'+page).getValue() ;
                        var sgc = Ext.getCmp('service_mgc'+page).getValue() ;
                        var service_type = Ext.getCmp('service_type'+page).getValue() ;
                        var uom = Ext.getCmp('service_uom'+page).getValue();
                        var category = Ext.getCmp('service_category'+page).getValue() ;

                        //////////////////////////
                        // /*START SEND EMAIl*/ //
                        //////////////////////////
                        var tiperequest = Ext.getCmp('service_requesttype'+page).getValue();
                        var toemail = Ext.getCmp('service_useremail'+page).getValue();
                        var email_cat = Ext.getCmp('service_catemail'+page).getValue();
                        var email_std = Ext.getCmp('service_stdemail'+page).getValue();
                        var email_proc = Ext.getCmp('service_procemail'+page).getValue();

                        if(isEmpty(inc) == true ){
                            Ext.MessageBox.show({
                                title : 'Message',
                                msg:'Please Check Your INC' ,
                                buttons: Ext.MessageBox.OK,
                                icon :  Ext.MessageBox.WARNING
                            });
                            return true;
                        }

                        if(isEmpty(sgc) == true ){
                            Ext.MessageBox.show({
                                title : 'Message',
                                msg:'Please Check Your SGC' ,
                                buttons: Ext.MessageBox.OK,
                                icon :  Ext.MessageBox.WARNING
                            });
                            return true;
                        }

                        if(isEmpty(service_type) == true ){
                            Ext.MessageBox.show({
                                title : 'Message',
                                msg:'Please Check Your Service Type' ,
                                buttons: Ext.MessageBox.OK,
                                icon :  Ext.MessageBox.WARNING
                            });
                            return true;
                        }

                        if(isEmpty(uom) == true) {
                            Ext.MessageBox.show({
                                title : 'Message',
                                msg:'Please Check Your UOM' ,
                                buttons: Ext.MessageBox.OK,
                                icon :  Ext.MessageBox.WARNING
                            });
                            return true;
                        }

                        if(isEmpty(category) == true) {
                            Ext.MessageBox.show({
                                title : 'Message',
                                msg:'Please Check Your Category' ,
                                buttons: Ext.MessageBox.OK,
                                icon :  Ext.MessageBox.WARNING
                            });
                            return true;
                        }

                        
                        if(service_type !== 'ZOEM'){
                            var evts=0;
                            var rprs=0;
                            store_service_item_char.each(function(record) {
                                var type = record.get('type');
                                var nvalue = record.get('nvalue') ;
                                if(type == "M" && isEmpty(nvalue) == true) {
                                    if(record.get('nvalue')) rprs+=1;
                                    else evts+=1;
                                }
                            });
                            if( evts > 0 ){
                                Ext.MessageBox.show({
                                    title : 'Message',
                                    msg:'Please Check Your Characteristics' ,
                                    buttons: Ext.MessageBox.OK,
                                    icon :  Ext.MessageBox.WARNING
                                });
                                return true;
                            }
                        }


                        if(user_level == "Cat"){
                            if(isEmpty(CatApp) == true ){
                                Ext.MessageBox.show({
                                    title : 'Warning',
                                    msg:'Please Select Cataloguer' ,
                                    buttons: Ext.MessageBox.OK,
                                    icon :  Ext.MessageBox.WARNING
                                });
                                return true;
                            }
                            if(CatApp == "Not Validate" ){
                                // Ext.getCmp('service_category'+page).allowBlank = true;
                                // Ext.getCmp('service_category'+page).clearValue();
                                // Ext.getCmp('service_updated_by'+page).reset();
                                //
                                // Ext.getCmp('service_cataloguer'+page).setValue();
                                // Ext.getCmp('service_cataloguer_by'+page).reset();
                            }
                        }

                        if(user_level.substring(0,3) == "Std"){
                            if(isEmpty(StdApp) == true ){
                                Ext.MessageBox.show({
                                    title : 'Warning',
                                    msg:'Please Select Std App' ,
                                    buttons: Ext.MessageBox.OK,
                                    icon :  Ext.MessageBox.WARNING
                                });
                                return true;
                            }
                            if(StdApp == "Not Validate" ){
                                // Ext.getCmp('service_category'+page).allowBlank = true;
                                // Ext.getCmp('service_category'+page).clearValue();
                                // Ext.getCmp('service_updated_by'+page).reset();
                                //
                                // Ext.getCmp('service_cataloguer'+page).clearValue();
                                // Ext.getCmp('service_cataloguer_by'+page).reset();
                                //
                                // Ext.getCmp('service_std_approval'+page).clearValue();
                                // Ext.getCmp('service_std_approval_by'+page).reset();
                                tipeProcess = 1;
                            }
                        }

                        if(user_level == "Proc"){
                            if(isEmpty(ProcApp) == true ){
                                Ext.MessageBox.show({
                                    title : 'Warning',
                                    msg:'Please Select Proc App' ,
                                    buttons: Ext.MessageBox.OK,
                                    icon :  Ext.MessageBox.WARNING
                                });
                                return true;
                            }

                            if(ProcApp == "Not Validate" ){
                                if(isEmpty(SAPServiceCode) == false){
                                    Ext.MessageBox.show(
                                        {
                                            title: 'Message',
                                            msg: 'Procurement Not Validate',
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.Warning
                                        }
                                    );
                                    return ;
                                }else{
                                    // Ext.getCmp('service_category'+page).allowBlank = true;
                                    // Ext.getCmp('service_category'+page).clearValue();
                                    // Ext.getCmp('service_updated_by'+page).reset();
                                    //
                                    // Ext.getCmp('service_cataloguer'+page).clearValue();
                                    // Ext.getCmp('service_cataloguer_by'+page).reset();
                                    //
                                    // Ext.getCmp('service_std_approval'+page).clearValue();
                                    // Ext.getCmp('service_std_approval_by'+page).reset();
                                    //
                                    // Ext.getCmp('service_proc_approver'+page).clearValue();
                                    // Ext.getCmp('service_proc_approver_by'+page).reset();
                                }

                            }
                        }

                        Ext.MessageBox.show({
                            title:'Warning',
                            msg:'Sure to Apply Changes this data?',
                            buttons : Ext.MessageBox.YESNO,
                            //animEl:bt.id,
                            icon :Ext.MessageBox.WARNING,
                            fn:function(b){
                                if (b =='yes') {

                                    Ext.MessageBox.show({
                                        msg: 'Saving your data, please wait...',
                                        progressText: 'Saving...',
                                        width:300,
                                        wait:true,
                                        waitConfig: {interval:200},
                                        icon:'ext-mb-download',
                                        animEl: 'buttonID'
                                    });
                                    // this hideous block creates the bogus progress

                                    form_service_single_view.form.submit({
                                        scope:this,
                                        url: '/ServiceApplyChanges',
                                        method: 'POST',
                                        dataType: 'html',
                                        params:{
                                            _token : csrf_token,
                                            transaction_type:'Service',
                                            items_characteristic : service_char,
                                        },
                                        success:function(response, request){
                                            SearchServiceCatalogNo();
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
                                }
                            }
                        });
                    }
                }
            ],
            listeners:{


                destroy:function(){
                    winServiceRawSource= Ext.getCmp('winServiceRawSource'+page);
                    if (winServiceRawSource)
                        winServiceRawSource.destroy();

                    winServiceDocument= Ext.getCmp('winServiceDocument'+page);
                    if (winServiceDocument)
                        winServiceDocument.destroy();

                    winDetailServiceDocument = Ext.getCmp('winDetailServiceDocument'+page);
                    if (winDetailServiceDocument)
                        winDetailServiceDocument.destroy();

                    winServiceImagesSource= Ext.getCmp('winServiceImagesSource'+page);
                    if (winServiceImagesSource)
                        winServiceImagesSource.destroy();

                    winDetailServiceImagesSource= Ext.getCmp('winDetailServiceImagesSource'+page);
                    if (winDetailServiceImagesSource)
                        winDetailServiceImagesSource.destroy();

                    winServiceViewNotes= Ext.getCmp('winServiceViewNotes'+page);
                    if (winServiceViewNotes)
                        winServiceViewNotes.destroy();

                    winCharacteristicValue= Ext.getCmp('winCharacteristicValue'+page);
                    if (winCharacteristicValue)
                        winCharacteristicValue.destroy();



                }
            }

        }

        OpenTab(main_content,MainTabId);
        Ext.getCmp('mainpanel').body.unmask();



    }
});