valid_script = true;
// ROLE = Ext.decode('{"ProcApp":true,"StdApp":true,"RemoveRequestRevision":true,"AddRequestBlocked":true,"Plant":true,"RemoveCrossReferences":true,"RemoveFuncLoctaion":true,"StockClass":true,"StockType":true,"UOM":true,"Category":true,"ServiceType":true,"ViewNotes":true,"ApplyChangeService":true,"Cataloguer":true,"AddCrossReferences":true,"MovingType":true,"MaxStock":true,"RemoveService":false,"AddService":false,"AddRequestBlocked":true,"AppRequestBlocked":false,"AddAdditionSubmit":true,"AddFuncLocation":true,"ApproveRevisionReq":false,"INC":true,"MGC":true,"ApprovalBlocked":false,"InvButtonCatalogNoHis":false}');

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

//////////////////
// Service INC //
//////////////////
        var model_blocked_material_inc = Ext.define('model_cb_inc', {
            extend: 'Ext.data.Model',
            // fields: ['class_inc_name','class','inc', 'description']
        });
        var store_blocked_material_inc = Ext.create('Ext.data.Store', {
            model: model_blocked_material_inc,
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
        var model_blocked_material_type = Ext.define('model_blocked_material_type', {
            extend: 'Ext.data.Model',//Meta Data Model
        });
        var store_blocked_material_type = Ext.create('Ext.data.Store', {
            model: model_blocked_material_type,
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
        var model_blocked_material_uom = Ext.define('model_blocked_material_uom', {
            extend: 'Ext.data.Model',//Meta Data Model
        });

        var store_blocked_material_uom = Ext.create('Ext.data.Store', {
            model: model_blocked_material_uom,
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
        var model_blocked_material_category = Ext.define('model_blocked_material_category', {
            extend: 'Ext.data.Model',//Meta Data Model
        });

        var store_blocked_material_category = Ext.create('Ext.data.Store', {
            model: model_blocked_material_category,
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

///////////////////////////////////////
// Grid Service INC Characteristics Value //
///////////////////////////////////////
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
                url: '/getBlockedItemsIncCharacteristicsValue',
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

        store_characteristics_nvalue.load({
            params:{
                start:0,
                limit:25
            }
        });

        var winBlockedCharacteristicValue = Ext.widget('window', {
            title: 'Characteristics Value',//+ ,
            id:'winRevisionCharacteristicValue'+page,
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
                        itemclick: function(grid, record, item, index, e) {

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
                        winBlockedCharacteristicValue.hide();
                    }
                }
            ],
        });


///////////////////////////////////////
// Grid Service INC Characteristics //
///////////////////////////////////////
        var model_blocked_material_item_char = Ext.define('model_blocked_material_item_char', {
            extend: 'Ext.data.Model',
            fields: ['sequence', 'flag' ,'characteristics', 'nvalue', 'type']
        });
        var store_blocked_material_item_char = Ext.create('Ext.data.Store', {
            storeId: 'store_blocked_material_item_char'+page,
            id :'store_blocked_material_item_char'+page,
            model: model_blocked_material_item_char,
            proxy: {
                type: 'ajax',
                // url: 'se_charval.php?',
                url: 'getBlockedItemsIncCharacteristics',//&action=getIncCharacteristic
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

        var grid_blocked_material_inc_characteristic = Ext.create('Ext.grid.Panel', {
            title: 'Characteristic',
            region: 'center',
            height:200,
            collapsible:true,
            // width :300,
            anchor:'100%',
            id: 'material_adr_items_char_grid'+page,
            store: store_blocked_material_item_char,
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
                        // this.fireEvent( 'editaction', arguments );
                        // console.log(record);
                        var filters = [];
                        var inc_filter = new Ext.util.Filter({
                            operator: 'eq',
                            value: record.data.inc,
                            property: "inc",
                            type: "string",
                        });
                        filters.push(inc_filter['initialConfig']) ;
                        var characteristics_filter = new Ext.util.Filter({
                            operator: 'eq',
                            value: record.data.characteristics,
                            property: "characteristics",
                            type: "string",
                        });
                        filters.push(characteristics_filter['initialConfig']) ;
                        var mrcode_filter = new Ext.util.Filter({
                            operator: 'eq',
                            value: record.data.mrcode,
                            property: "mrcode",
                            type: "string",
                        });
                        // filters.push(mrcode_filter['initialConfig']) ;

                        store_characteristics_nvalue.proxy.extraParams = {
                            filter: Ext.encode(filters),
                            action :'getIncCharacteristicsValue'
                        };
                        store_characteristics_nvalue.reload({
                            params:{
                                start:0,
                                limit:25
                            }
                        });

                        /*store_characteristics_nvalue.each( function (model) {
                         // var nvalue = model.get('nvalue');
                         // Ext.getCmp('nvalue'+page).setValue(nvalue);
                         // console.log( model.get('characteristics') );
                         }); */
                        // console.log(store_characteristics_nvalue.getData().items[0].data);
                        // winBlockedCharacteristicValue.animateTarget = this.id;
                        winBlockedCharacteristicValue.show();
                        Ext.getBody().unmask();
                    }
                },
                {
                    header: 'Value',
                    dataIndex: 'nvalue',
                    // autoSizeColumn:true,
                    width:150,
                    editor: {
                        xtype: 'textfield',
                        // id:'adr_d_items_characteristic_value'+page,
                        allowBlank: true,
                        maxLength:30,
                        readOnly:false,
                        listeners: {
                            change : function(){
                                var row = Ext.getCmp('material_adr_items_char_grid'+page).getSelectionModel().getSelection()[0];
                                if(isEmpty(row.get('adr_d_items_characteristic_id')) == false){
                                    row.set('flag','Update');
                                }else{
                                    row.set('flag','Insert');
                                }
                            }
                        },
                    },
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
                            // console.log('Setelah EDIT');
                            var desc_temp = "";
                            var desclong_temp = "";

                            var namecodeval = Ext.getCmp('material_name_code'+page).getValue();
                            var namecodeval_short = Ext.getCmp('material_short_name_code'+page).getValue();
                            // console.log(namecodeval_short);
                            desc_temp = desc_temp + namecodeval_short ;
                            desclong_temp = desclong_temp + namecodeval_short ;

                            var char_count = store_blocked_material_item_char.getCount();

                            if (char_count >= 1) {
                                var nvalue =  [];
                                var valchar =  [];
                                var r = 1;
                                for (i = 0; i < char_count; i++) {
                                    var char = store_blocked_material_item_char.getAt(i).data.characteristics.trim();
                                    var val = store_blocked_material_item_char.getAt(i).data.nvalue;
                                    if(val){
                                        var cutt = true;
                                        if(r === 1){
                                            var StartChar = desc_temp + val ;
                                            if(StartChar.length < 39){
                                                desc_temp = desc_temp + ":";
                                            }
                                            desclong_temp = desclong_temp  + ":";
                                            if(StartChar.length == 41){
                                                Ext.getCmp('material_short_description'+page).setValue(Ext.getCmp('material_short_name_code'+page).getValue());
                                                cutt = false;
                                            }else if(StartChar.length > 41){
                                                Ext.getCmp('material_short_description'+page).setValue(Ext.getCmp('material_short_name_code'+page).getValue());
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

                                        valchar.push(char+sparator+' '+val);
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
                            Ext.getCmp('material_short_description'+page).setValue(desc_temp);
                            Ext.getCmp('material_long_description'+page).setValue(desclong_temp);

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
        var model_blocked_material_cross_references = Ext.define('model_blocked_material_cross_references', {
            extend: 'Ext.data.Model',
            fields: ['flag','refno','old_blocked_material_code','manufactur', 'type']
        });
        var store_blocked_material_cross_references = Ext.create('Ext.data.Store', {
            storeId: 'store_blocked_material_cross_references'+page,
            model: model_blocked_material_cross_references,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/getBlockedItemsCrossReferences',//action=getInc
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
        var grid_editor_blocked_material_cross_references =  Ext.create('Ext.grid.plugin.RowEditing', {
            licksToMoveEditor: 1,
            autoCancel: true,
            saveBtnText    : "Update",//My Save Button Text&quot;,
            saveBtnIcon: 'add-data',
            cancelBtnText: "Cancel", //Cancel Button Text&quot;,
            clicksToEdit: 2, //this changes from the default double-click activation to single click activation
            errorSummary: false //disables display of validation messages if the row is invalid

        });
        var grid_blocked_material_cross_references = Ext.create('Ext.grid.Panel', {
            title: 'Cross References',
            region: 'center',
            collapsible:true,
            store: store_blocked_material_cross_references,
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
                        id:'material_refno'+page,
                        allowBlank: true
                    }
                },
                {
                    text: 'Old Service Code',
                    dataIndex: 'old_material_code',
                    flex: 3,
                    editor: {
                        xtype: 'textfield',
                        id:'old_material_code'+page,
                        allowBlank: true
                    }
                },
                {
                    text: 'manufacturer/vendor',
                    dataIndex: 'manufactur',
                    flex: 3,
                    editor: {
                        xtype: 'textfield',
                        id:'material_manufactur'+page,
                        allowBlank: true
                    }
                }, {
                    text: 'type',
                    dataIndex: 'type',
                    flex: 1,
                    editor: {
                        xtype: 'textfield',
                        id:'material_cross_references_type'+page,
                        allowBlank: true
                    }
                }],
            viewConfig: {
                stripeRows: true
            },
            plugins:[
                grid_editor_blocked_material_cross_references
            ],
            tbar:[
                {
                    xtype:'button',
                    text: 'Add X References',
                    iconCls: 'add-data',
                    id:'btnServiceRevAddCrossReferences'+page,
                    hidden:!ROLE.AddCrossReferences,
                    disabled:true,
                    handler: function() {
                        var data = [];
                        var order = 1 ;
                        var index = 0 ;
                        // var sequence = 1 ;
                        // var sequence = parseInt(store_blocked_material_cross_references.totalCount)+1 ;
                        // Ext.getCmp('sequence'+page).readOnly=true;
                        store_blocked_material_cross_references.each(function(r,i){
                            data.push(r.data);
                            order++ ;
                            index++ ;
                        });
                        // Create a model instance
                        var r = Ext.create('model_blocked_material_cross_references', {
                            flag :'Insert' ,
                            // sequence : sequence,
                            // inc : Ext.getCmp('detail_inc'+page).getValue() ,
                            // type: 'O',
                        });

                        store_blocked_material_cross_references.insert(0, r);
                        grid_editor_blocked_material_cross_references.startEdit(r, 0);

                    }
                },
                {
                    xtype:'button',
                    text: 'Remove X References',
                    iconCls: 'row-delete',
                    id:'btnServiceRevRemoveCrossReferences'+page,
                    hidden:!ROLE.RemoveCrossReferences,
                    disabled:true,
                    handler: function() {
                        var records = grid_blocked_material_cross_references.getSelectionModel().getSelection()[0];
                        if (records) {
                            Ext.Ajax.request({
                                scope:this,
                                // url : base_url+'singleview/process' ,
                                url: 'DeletedCrossReference',
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
                                        store_blocked_material_cross_references.load({
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
                            // store_blocked_material_cross_references.remove(records);
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
        grid_editor_blocked_material_cross_references.on({
            scope: this,
            beforeedit: function(roweditor, context) {

            },
            afteredit: function(roweditor, context) {
                var row = grid_blocked_material_cross_references.getSelectionModel().getSelection()[0];
                Ext.Ajax.request({
                    scope:this,
                    url: 'UpdateCrossReference',
                    method: 'POST',
                    dataType: 'html',
                    params:{
                        _token : csrf_token,
                        adr_d_items_id: Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                        blocked_adr_d_items_id: Ext.getCmp('blocked_adr_d_items_id'+page).getValue(),
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
                        store_blocked_material_cross_references.load({
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
                if (grid_blocked_material_inc_characteristic.getSelectionModel().hasSelection()) {
                    var row = grid_blocked_material_inc_characteristic.getSelectionModel().getSelection()[0];
                }
            }
        });

/////////////////////////////////////
// Grid Service Function Location //
/////////////////////////////////////
        var model_blocked_material_funloc = Ext.define('model_blocked_material_funloc', {
            extend: 'Ext.data.Model',
            fields: ['flag', 'adr_d_items_id','name', 'description']
        });
        var store_blocked_material_funloc = Ext.create('Ext.data.Store', {
            storeId: 'funloc_Store'+page,
            model: model_blocked_material_funloc,
            proxy: {
                type: 'ajax',
                url: '/getBlockedItemsFuncloc',
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
        var grid_editor_blocked_material_funcloc =  Ext.create('Ext.grid.plugin.RowEditing', {
            licksToMoveEditor: 1,
            autoCancel: true,
            saveBtnText    : "Update",//My Save Button Text&quot;,
            saveBtnIcon: 'add-data',
            cancelBtnText: "Cancel", //Cancel Button Text&quot;,
            clicksToEdit: 2, //this changes from the default double-click activation to single click activation
            errorSummary: false //disables display of validation messages if the row is invalid

        });
        var grid_blocked_material_funcloc = Ext.create('Ext.grid.Panel', {
            title: 'Functional Locations',
            region: 'center',
            collapsible:true,
            store: store_blocked_material_funloc,
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
                        id:'material_func_loc_name'+page,
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
                        id:'material_func_loc_description'+page,
                        allowBlank: true
                    },
                    flex: 3
                }
            ],
            plugins:[
                grid_editor_blocked_material_funcloc
            ],
            tbar:[
                {
                    xtype:'button',
                    text: 'Add FuncLoc',
                    iconCls: 'add-data',
                    id:'btnServiceRevAddFuncLocation'+page,
                    hidden:!ROLE.AddFuncLocation,
                    disabled:true,
                    handler: function() {
                        var data = [];
                        var order = 1 ;
                        var index = 0 ;
                        store_blocked_material_funloc.each(function(r,i){
                            data.push(r.data);
                            order++ ;
                            index++ ;
                        });
                        // Create a model instance
                        var r = Ext.create('model_blocked_material_funloc', {
                            flag :'Insert' ,

                        });

                        store_blocked_material_funloc.insert(0, r);
                        grid_editor_blocked_material_funcloc.startEdit(r, 0);

                    }
                },
                {
                    xtype:'button',
                    text: 'Remove',
                    iconCls: 'row-delete',
                    id:'btnServiceRevRemoveFuncLocation'+page,
                    hidden:!ROLE.RemoveFuncLoctaion,
                    disabled:true,
                    handler: function() {
                        var records = grid_blocked_material_funcloc.getSelectionModel().getSelection()[0];
                        if (records) {
                            Ext.Ajax.request({
                                scope:this,
                                // url : base_url+'singleview/process' ,
                                url: 'DeletedFuncLoc',
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
                                        store_blocked_material_funloc.load({
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
        grid_editor_blocked_material_funcloc.on({
            scope: this,
            beforeedit: function(roweditor, context) {

            },
            afteredit: function(roweditor, context) {
                var row = grid_blocked_material_funcloc.getSelectionModel().getSelection()[0];
                Ext.Ajax.request({
                    scope:this,
                    url: 'UpdateFuncLoc',
                    method: 'POST',
                    dataType: 'html',
                    params:{
                        _token : csrf_token,
                        adr_d_items_id: Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                        blocked_adr_d_items_id: Ext.getCmp('blocked_adr_d_items_id'+page).getValue(),
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
                        store_blocked_material_funloc.load({
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
                if (grid_blocked_material_inc_characteristic.getSelectionModel().hasSelection()) {
                    var row = grid_blocked_material_inc_characteristic.getSelectionModel().getSelection()[0];
                }
            }
        });

//////////////////////////////////
// Windows Service Raw Source  //
//////////////////////////////////

        var winBlockedServiceRawSource = Ext.widget('window', {
            id:'winBlockedServiceRawSource'+page,
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
                    id: 'material_raw'+page,
                    width: 500,
                    editable: false,
                    html: '',
                },
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        winBlockedServiceRawSource.animateTarget = 'btnServiceViewRaw'+page;
                        winBlockedServiceRawSource.hide();
                    }
                }
            ],
        });

        /////////////////////////////////////
        // Windows Grid Service Documents //
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
                                handler    : function() {
                                    var record = grid_blocked_material_document.getView().getSelectionModel().getSelection()[0];
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
                                        url: 'ajax.handler.byname.php?name=adr',
                                        method: 'POST',
                                        dataType: 'html',
                                        params:{
                                            action:'DeleteServiceDocument',
                                            id : id,
                                        },
                                        success:function(response, request){
                                            store_blocked_material_document.load({
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
        var model_blocked_material_document = Ext.define('model_blocked_material_document', {
            extend: 'Ext.data.Model',
        });
        var store_blocked_material_document = Ext.create('Ext.data.Store', {
            id: 'store_blocked_material_document'+page,
            model: model_blocked_material_document,
            proxy: {
                type: 'ajax',
                url: '/getBlockedItemsDocument',
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
        var grid_blocked_material_document = Ext.create('Ext.grid.Panel', {
            width: 343,
            margin: '0 0 0 0',
            store:store_blocked_material_document,
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
                            return '<a target="_blank" href="'+base_url+'material_document/'+record.data.url+'"><span><img src="images/icon/arrow_down.png" /></span>'+ ' ' +record.data.url+'</a>';
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
                    hidden:!ROLE.AddDocumentRequest,
                    disabled:!ROLE.AddDocumentRequest,
                    handler:function(){
                        Ext.getCmp('formServiceDocumentUplod'+page).getForm().reset();
                        winBlockedDetailServiceDocument.animateTarget = 'addMatDocument'+page;
                        winBlockedDetailServiceDocument.show();
                    }
                },
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_blocked_material_document,
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
        Ext.apply(Ext.form.VTypes, {
            fileUpload: function(val, field) {
                var fileName = /^.*\.(docx|doc|xls|xlsx|pdf|cdr)$/i;
                return fileName.test(val);
            },
            fileUploadText: 'Image must be in .Doc,.XLS,.XLSX,.PDF,.CDR format'
        });
        var
            winBlockedDetailServiceDocument = new Ext.Window({
                // title:'Documens Catalog No. '+ Ext.getCmp('material_catalog_no'+page).getValue(),
                id: 'winBlockedDetailServiceDocument'+page,
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
                                id: 'material_document_name'+page,
                                name:'material_document_name',
                                fieldLabel: 'Document Name'
                            },
                            {
                                xtype: 'filefield',
                                width:400,
                                emptyText: 'Select as document',
                                fieldLabel: 'File Document',
                                name: 'document_path',
                                id:'document_path'+page,
                                vtype:'fileUpload',
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
                                        url: 'ajax.handler.byname.php?name=adr',
                                        method: 'POST',
                                        dataType: 'html',
                                        params:{
                                            action:'SaveServiceDocument',
                                            adr_d_items_id : Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                                            blocked_adr_d_items_id : Ext.getCmp('blocked_adr_d_items_id'+page).getValue(),
                                            catalog_no : Ext.getCmp('catalog_no'+page).getValue(),
                                        },
                                        success:function(response, request){
                                            store_blocked_material_document.load({
                                                params:{
                                                    start:0,
                                                    limit:25
                                                }
                                            });

                                            Ext.MessageBox.hide();

                                            winBlockedDetailServiceDocument.hide();

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
                                            // winBlockedDetailServiceDocument.hide();
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
                            winBlockedDetailServiceDocument.hide();
                        }
                    }
                ],
            });
        var winBlockedServiceDocument = Ext.widget('window', {
            // title: 'Document'+ Ext.getCmp('catalog_no'+page).getValue(),//+ ,
            id:'winBlockedServiceDocument'+page,
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
                grid_blocked_material_document
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        // frmEFakturRequestShow.animateTarget = 'AddDataM'+page;
                        winBlockedServiceDocument.hide();
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
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                text: 'Delete Image',
                                iconCls: 'row-delete',
                                handler    : function() {
                                    var record = grid_blocked_material_images.getView().getSelectionModel().getSelection()[0];
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
                                        url: 'ajax.handler.byname.php?name=adr',
                                        method: 'POST',
                                        dataType: 'html',
                                        params:{
                                            action:'DeleteServiceImages',
                                            id : id,
                                        },
                                        success:function(response, request){
                                            // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                                            store_blocked_material_images.load({
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
        var model_blocked_material_images = Ext.define('model_blocked_material_document', {
            extend: 'Ext.data.Model',
        });
        var store_blocked_material_images = Ext.create('Ext.data.Store', {
            id: 'store_blocked_material_images'+page,
            model: model_blocked_material_images,
            proxy: {
                type: 'ajax',
                url: '/getBlockedItemsImages',
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
        var grid_blocked_material_images = Ext.create('Ext.grid.Panel', {
            width: 343,
            height: 250,
            margin: '0 0 0 0',
            store:store_blocked_material_images,
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
                        return '<img src="material_images/' + value + '" / width="340" height="200">';
                    },
                }
            ],
            bbar:[
                {
                    xtype:'button',
                    text:'Add Images',
                    iconCls:'add-data',
                    id:'addServiceIncImages'+page,
                    hidden:false,
                    handler:function(){
                        winBlockedDetailServiceImagesSource.animateTarget = 'addServiceIncImages'+page;
                        winBlockedDetailServiceImagesSource.show();

                    }
                },
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_blocked_material_images,
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
        var winBlockedDetailServiceImagesSource = new Ext.Window({
            id: 'winBlockedDetailServiceImagesSource'+page,
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
                            id: 'material_images_description'+page,
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
                                    url: 'ajax.handler.byname.php?name=adr',
                                    method: 'POST',
                                    dataType: 'html',
                                    params:{
                                        action:'SaveServiceImages',
                                        adr_d_items_id : Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                                        blocked_adr_d_items_id : Ext.getCmp('blocked_adr_d_items_id'+page).getValue(),
                                        catalog_no : Ext.getCmp('catalog_no'+page).getValue(),
                                        // data_char: data_char,
                                    },
                                    success:function(response, request){
                                        store_blocked_material_images.load({
                                            params:{
                                                start:0,
                                                limit:1
                                            }
                                        });

                                        Ext.MessageBox.hide();

                                        winBlockedDetailServiceImagesSource.hide();

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
                        winBlockedDetailServiceImagesSource.animateTarget = 'addServiceIncImages'+page;
                        winBlockedDetailServiceImagesSource.hide();
                    }
                }
            ],
        });
        var winBlockedServiceImagesSource = Ext.widget('window', {
            id:'winBlockedServiceImagesSource'+page,
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
            items: [grid_blocked_material_images],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        winBlockedServiceImagesSource.animateTarget = 'btnServiceViewImages'+page;
                        winBlockedServiceImagesSource.hide();
                    }
                }
            ],
        });

//////////////////////////////
// Grid Service View Notes //
//////////////////////////////
        var model_blocked_material_view_notes = Ext.define('model_blocked_material_view_notes', {
            extend: 'Ext.data.Model',
            fields: ['id','adr_d_items_id','user', 'created_at', 'notes']
        });
        var store_blocked_material_view_notes = Ext.create('Ext.data.Store', {
            storeId: 'store_blocked_material_view_notes'+page,
            model: model_blocked_material_view_notes,
            proxy: {
                type: 'ajax',
                url: '/getBlockedItemsViewNotes',
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

        var grid_editor_blocked_material_view_notes =  Ext.create('Ext.grid.plugin.RowEditing', {
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
        var grid_blocked_material_view_notes = Ext.create('Ext.grid.Panel', {
            width: 343,
            height: 250,
            margin: '0 0 0 0',
            store:store_blocked_material_view_notes,
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
                        var r = Ext.create('model_blocked_material_view_notes', {
                            user: user_name + ' (' + user_level + ')',
                            created_at : new Date(),
                            id:'last_insert_id',
                            // notes:''
                        });
                        store_blocked_material_view_notes.insert(index, r);
                        grid_editor_blocked_material_view_notes.startEdit(r, 0);
                    }
                },
                {
                    xtype: 'button',
                    id: 'btnRemoveServiceViewNotes'+page,
                    text: 'Remove Note',
                    margin: '0 0 0 10',
                    iconCls:'row-delete',
                    handler: function() {
                        var record = grid_blocked_material_view_notes.getSelectionModel().getSelection()[0];
                        if (record) {
                            store_blocked_material_view_notes.remove(record);
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
                grid_editor_blocked_material_view_notes,
            ],
            bbar:[
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_blocked_material_view_notes,
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
                        var view_notes = Ext.encode(Ext.pluck(store_blocked_material_view_notes.data.items, 'data'));
                        parms = [];
                        var updatedRecords = store_blocked_material_view_notes.getUpdatedRecords();
                        Ext.each(updatedRecords,function(record){
                            parms.push(record.data);
                        });
                        var newRecords = store_blocked_material_view_notes.getNewRecords();
                        Ext.each(newRecords,function(record){
                            parms.push(record.data);
                        });
                        console.log(parms);
                        Ext.Ajax.request({
                            scope:this,
                            // url : base_url+'singleview/process' ,
                            url: 'ajax.handler.byname.php?name=view_notes',
                            method: 'POST',
                            dataType: 'html',
                            params:{
                                action:'SaveViewNotes',
                                view_notes: view_notes,
                                adr_d_items_id : Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                                blocked_adr_d_items_id : Ext.getCmp('blocked_adr_d_items_id'+page).getValue(),
                            },
                            success:function(response, request){
                                // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                                var filters = [];

                                var adr_d_items_id_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                                    property: "adr_d_items_id",
                                    type: "string",
                                });

                                filters.push(adr_d_items_id_filter['initialConfig']) ;

                                store_blocked_material_view_notes.proxy.extraParams = {
                                    filter: Ext.encode(filters),
                                    action:'getViewNotes'
                                };
                                store_blocked_material_view_notes.load({
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
                    // gridMenuServiceImages.showAt(e.getXY());
                },
                itemclick: function(grid_delivery_order_m, record, item, index, e) {

                }
            },
        });


        var winBlockedServiceViewNotes = Ext.widget('window', {
            id:'winBlockedServiceViewNotes'+page,
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
                grid_blocked_material_view_notes
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        winBlockedServiceViewNotes.animateTarget = 'btnServiceViewNotes'+page;
                        winBlockedServiceViewNotes.hide();
                    }
                }
            ],
        });


        ///////////////////////////////
        // Store Service Catalog M //
        //////////////////////////////
        var model_blocked_material_catalog_m = Ext.define('model_blocked_material_catalog_m', {
            extend: 'Ext.data.Model',
        });
        var store_blocked_material_catalog_m = Ext.create('Ext.data.Store', {
            storeId: 'store_blocked_material_catalog_m'+page,
            model: model_blocked_material_catalog_m,
            proxy: {
                type: 'ajax',
                url: '/getBlockedCatalogM',
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
        /*var is_active = new Ext.util.Filter({
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
        store_blocked_material_catalog_m.proxy.extraParams = {
            // action:'getCatalogM',
        };
        store_blocked_material_catalog_m.load({
            params:{
                filter: Ext.encode(filters),
            }
        });*/

        //////////////////////
        // Service Status Style //
        //////////////////////
        function BlockedServiceStatusStyle(){
            var record = store_blocked_material_catalog_m.getData().items[0];
            var str = record.data.adr_status;
            var adr_status = str.substring(0, 8);
            switch(true ){
                case (adr_status === "FINISH"):
                    Ext.getCmp('material_adr_status'+page).setFieldStyle('color: green;');
                    break;
                default:
                    Ext.getCmp('material_adr_status'+page).setFieldStyle('color: red;');
                    break;
            }
            if(isEmpty(record.data.revision_item_status) == false ){
                var str = record.data.revision_item_status;
            }else{
                var str = record.data.item_status;
            }
            var revision_item_status = str.substring(0, 8);
            switch(true ){
                /*case (record.data.item_status === "ORIGIN"):
                 // Ext.getCmp('material_item_status'+page).setFieldStyle('color: green;');
                 break;*/
                case (revision_item_status === "ORIGIN"):
                    Ext.getCmp('material_item_status'+page).setFieldStyle('color: green;');
                    break;
                case (revision_item_status === "REVISION"):
                    Ext.getCmp('material_item_status'+page).setFieldStyle('color: red;');
                    break;
                case (record.data.item_status === "SBU STOPPED"):
                case (record.data.item_status === "SBU BLOCKED"):
                case (record.data.item_status === "STOPPED"):
                case (record.data.item_status === "PRE BLOCKED"):
                    Ext.getCmp('material_item_status'+page).setFieldStyle('color: red;');
                    break;
                case (record.data.item_status == "BLOCKED"):
                    Ext.getCmp('material_item_status'+page).setFieldStyle('color: red;');
                    break;
                default:
                    Ext.getCmp('material_item_status'+page).setFieldStyle('color: red;');
                    break;
            }
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
        function BlockedServiceWorkFlow(){
            BlockedServiceStatusStyle();
            var record = store_blocked_material_catalog_m.getData().items[0];
            var str = record.data.item_status;
            var item_status = str.substring(0, 8);
            var std_app_category = "Std App "+record.data.category ;
            switch(true ){
                case (record.data.item_status === "ON PROCESS"):
                case (record.data.item_status.trim() === "BLOCKED"):
                case (record.data.item_status === "ORIGIN"):
                case (item_status === "REVISION"):
                ////////////////
                    //Status User //
                    ////////////////
                    if(!empty(record.data.blocked_adr_d_items_id)){
                        Ext.get('ServiceRibbonUser'+page).removeCls('RibbonGrey');
                        Ext.get('ServiceRibbonUser'+page).removeCls('RibbonYellow');
                        Ext.get('ServiceRibbonUser'+page).removeCls('RibbonRed');
                        Ext.get('ServiceRibbonUser'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonUser'+page).addCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonCat'+page).addCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonStdApp'+page).addCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonProccApp'+page).addCls('RibbonRed');

                        readOnly = true;
                        ServiceCharacteristicsEditor = false ;
                        ServiceBlockedChanges = true;
                        ServiceApproveBlocked= true;
                        ServiceCrossRef = true;
                        ServiceFuncLoc = true;
                        if (company_code === record.data.company_code ){
                            ServiceCrossRef = false;
                            ServiceFuncLoc = false;
                        }

                        if (company_code === record.data.company_code && user_level === "Cat") {
                            readOnly = false;
                            ServiceCharacteristicsEditor = false ;
                            ServiceBlockedChanges = false;
                            ServiceApproveBlocked= false;
                            Ext.getCmp('material_cataloguer'+page).setReadOnly(readOnly);
                            Ext.getCmp('material_cataloguer'+page).focus();
                        }


                    }else{

                        if (company_code === record.data.company_code ) {
                            readOnly = false;
                            ServiceCharacteristicsEditor = false ;
                            ServiceBlockedChanges = false;
                            ServiceFuncLoc = false;
                            ServiceApproveBlocked= false;
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
                    }

                    if(record.data.status_cat === 1){
                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonGrey');
                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonYellow');
                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonCat'+page).addCls('RibbonGreen');
                        readOnly = true;
                        ServiceCharacteristicsEditor = false ;
                        ServiceBlockedChanges = true;
                        ServiceApproveBlocked= true;
                        if(user_level === std_app_category ){
                            Ext.getCmp('material_std_approval'+page).setReadOnly(false);
                            Ext.getCmp('material_std_approval'+page).focus();
                            ServiceBlockedChanges = false;
                            ServiceApproveBlocked= false;
                        }



                        Ext.getCmp('material_cataloguer'+page).setReadOnly(readOnly);
                        Ext.getCmp('material_cataloguer'+page).focus();
                    }else{
                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonGrey');
                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonYellow');
                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonCat'+page).removeCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonCat'+page).addCls('RibbonRed');
                    }

                    if(record.data.status_stdapp === 1){
                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonStdApp'+page).addCls('RibbonGreen');
                        readOnly = true;
                        ServiceCharacteristicsEditor = false ;
                        ServiceBlockedChanges = true;
                        ServiceApproveBlocked = true;

                        Ext.getCmp('material_std_approval'+page).setReadOnly(readOnly);
                        Ext.getCmp('material_std_approval'+page).focus();

                        if(user_level === "Proc"){
                            Ext.getCmp('material_proc_approver'+page).setReadOnly(false);
                            Ext.getCmp('material_proc_approver'+page).focus();
                            ServiceBlockedChanges = false;
                            ServiceApproveBlocked = false;
                        }

                    }else{
                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonStdApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonStdApp'+page).addCls('RibbonRed');
                    }

                    if(record.data.status_proc === 1){
                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonProccApp'+page).addCls('RibbonGreen');

                        readOnly = true;
                        ServiceCharacteristicsEditor = false ;
                        ServiceBlockedChanges = true;
                        ServiceApproveBlocked = true;

                        Ext.getCmp('material_proc_approver'+page).setReadOnly(readOnly);
                        Ext.getCmp('material_proc_approver'+page).focus();

                        if(user_level === "Proc" && record.data.status_sap === 0){
                            Ext.getCmp('sap_material_code'+page).setReadOnly(false);
                            Ext.getCmp('sap_material_code'+page).focus();
                            ServiceBlockedChanges = false;
                            ServiceApproveBlocked = false;
                        }

                    }else{
                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('ServiceRibbonProccApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('ServiceRibbonProccApp'+page).addCls('RibbonRed');
                    }

                    Ext.getCmp('reason'+page).setReadOnly(false);
                    Ext.getCmp('reason'+page).focus();

                    Ext.getCmp('material_mgc'+page).setReadOnly(true);
                    Ext.getCmp('material_mgc'+page).focus();

                    Ext.getCmp('material_inc'+page).setReadOnly(true);
                    Ext.getCmp('material_inc'+page).focus();

                    Ext.getCmp('material_uom'+page).setReadOnly(true);
                    Ext.getCmp('material_uom'+page).focus();

                    Ext.getCmp('material_category'+page).setReadOnly(true);
                    Ext.getCmp('material_category'+page).focus();

                    // Ext.getCmp('btnServiceAddCrossReferences'+page).setDisabled(ServiceCrossRef);
                    // Ext.getCmp('btnServiceRemoveCrossReferences'+page).setDisabled(ServiceCrossRef);

                    Ext.getCmp('material_refno'+page).setReadOnly(true);
                    Ext.getCmp('old_material_code'+page).setReadOnly(true);

                    Ext.getCmp('material_manufactur'+page).setReadOnly(true);
                    Ext.getCmp('material_cross_references_type'+page).setReadOnly(true);

                    // Ext.getCmp('btnServiceAddFuncLocation'+page).setDisabled(ServiceFuncLoc);
                    // Ext.getCmp('btnServiceRemoveFuncLocation'+page).setDisabled(ServiceFuncLoc);

                    Ext.getCmp('material_func_loc_name'+page).setReadOnly(true);
                    Ext.getCmp('material_func_loc_description'+page).setReadOnly(true);

                    Ext.getCmp('btnRequestForBlocked'+page).setDisabled(ServiceBlockedChanges);
                    // Ext.getCmp('btnRequestBlocked'+page).setVisible(false);

                    Ext.getCmp('btnApprovalForBlocked'+page).setDisabled(ServiceApproveBlocked);
                    // Ext.getCmp('btnApprovalBlocked'+page).setVisible(false);

                    break;
                default:
                    Ext.getCmp('ServiceRibbonUser'+page).addCls('RibbonRed');
                    Ext.getCmp('ServiceRibbonCat'+page).addCls('RibbonRed');
                    Ext.getCmp('ServiceRibbonStdApp'+page).addCls('RibbonRed');
                    Ext.getCmp('ServiceRibbonProccApp'+page).addCls('RibbonRed');
                    break;

            }

        }

        ////////////////////////////
        // SearchBlockedServiceCatalogNo //
        ////////////////////////////
        function SearchBlockedServiceCatalogNo(){
            var val = Ext.getCmp('catalog_no'+page).getValue();
            Ext.getCmp('form_blocked_service'+page).mask("loading material item...");
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

                Ext.getCmp('material_inc'+page).setReadOnly(true);
                Ext.getCmp('material_inc'+page).reset();
                Ext.getCmp('material_inc'+page).allowBlank = true;
                store_blocked_material_inc.removeAll();


                Ext.getCmp('material_mgc'+page).setReadOnly(true);
                Ext.getCmp('material_mgc'+page).reset();
                Ext.getCmp('material_mgc'+page).allowBlank = true;
                store_mgc.removeAll();



                Ext.getCmp('material_type'+page).setReadOnly(true);
                Ext.getCmp('material_type'+page).reset();
                Ext.getCmp('material_type'+page).allowBlank = true;

                Ext.getCmp('material_uom'+page).setReadOnly(true);
                Ext.getCmp('material_uom'+page).reset();
                Ext.getCmp('material_uom'+page).allowBlank = true;

                Ext.getCmp('material_category'+page).setReadOnly(true);
                Ext.getCmp('material_category'+page).reset();
                Ext.getCmp('material_category'+page).allowBlank = true;

                Ext.getCmp('material_cataloguer'+page).setReadOnly(true);
                Ext.getCmp('material_cataloguer'+page).reset();
                Ext.getCmp('material_cataloguer'+page).allowBlank = true;

                Ext.getCmp('material_std_approval'+page).setReadOnly(true);
                Ext.getCmp('material_std_approval'+page).reset();
                Ext.getCmp('material_std_approval'+page).allowBlank = true;

                Ext.getCmp('material_proc_approver'+page).setReadOnly(true);
                Ext.getCmp('material_proc_approver'+page).reset();
                Ext.getCmp('material_proc_approver'+page).allowBlank = true;

                var filters = [];
                var catalog_no = new Ext.util.Filter({
                    operator: 'eq',
                    value:  val,
                    property: "catalog_no",
                    type: "string",
                });
                filters.push(catalog_no['initialConfig']) ;

                var transaction_type = new Ext.util.Filter({
                    operator: 'eq',
                    value:  'Service',
                    property: "transaction_type",
                    type: "string",
                });
                filters.push(transaction_type['initialConfig']) ;
                store_blocked_material_catalog_m.proxy.extraParams = {
                    _token : csrf_token,
                    action:'getBlockedCatalogM',
                };
                store_blocked_material_catalog_m.reload({
                    params:{
                        _token : csrf_token,
                        filter: Ext.encode(filters),
                    },
                    callback : function(records, operation, success) {
                        if(success){
                            var record = records[0];
                            if(store_blocked_material_catalog_m.getCount() > 0){
                                // console.log(record.data);
                                Ext.getCmp('form_blocked_service'+page).unmask();
                                Ext.getCmp('catalog_no'+page).setValue(record.data.catalog_no);
                                Ext.getCmp('items_is_active'+page).setValue(record.data.items_is_active);
                                Ext.getCmp('material_raw'+page).setValue(record.data.raw);
                                // Ext.getCmp('btnServiceViewDocument'+page).setDisabled(false);
                                // Ext.getCmp('btnServiceViewRaw'+page).setDisabled(false);
                                // Ext.getCmp('btnServiceViewImages'+page).setDisabled(false);
                                // Ext.getCmp('btnServiceViewNotes'+page).setDisabled(false);
                                Ext.getCmp('material_adr_m_id'+page).setValue(record.data.adr_m_id);
                                Ext.getCmp('material_adr_d_items_id'+page).setValue(record.data.adr_d_items_id);
                                Ext.getCmp('blocked_adr_d_items_id'+page).setValue(record.data.blocked_adr_d_items_id);
                                Ext.getCmp('material_adr_status'+page).setValue(record.data.adr_status);
                                Ext.getCmp('material_item_status' + page).setValue(record.data.item_status);
                                /*if(record.data.blocked_adr_d_items_id) {
                                 Ext.getCmp('material_item_status' + page).setValue(record.data.revision_item_status);
                                 }else{
                                 Ext.getCmp('material_item_status' + page).setValue(record.data.item_status);
                                 }*/
                                Ext.getCmp('sap_material_code'+page).setValue(record.data.sap_material_code);
                                Ext.getCmp('sap_material_code_by_id'+page).setValue(record.data.sap_material_code_by_id);
                                Ext.getCmp('sap_material_code_date'+page).setValue(record.data.sap_material_code_date);

                                Ext.getCmp('material_mgc'+page).setValue(record.data.groupclass);
                                Ext.getCmp('material_mgc'+page).focus();

                                Ext.getCmp('material_inc'+page).setValue(record.data.inc);
                                Ext.getCmp('material_inc'+page).focus();

                                if(record.data.item_name){
                                    Ext.getCmp('material_name_code'+page).setValue(record.data.item_name);
                                }else{
                                    Ext.getCmp('material_name_code'+page).setValue(record.data.inc_name_code);
                                }
                                Ext.getCmp('material_short_name_code'+page).setValue(record.data.short_name_code);
                                Ext.getCmp('material_short_description'+page).setValue(record.data.short_description);
                                Ext.getCmp('material_long_description'+page).setValue(record.data.long_description);

                                Ext.getCmp('material_type'+page).setValue(record.data.material_type);
                                Ext.getCmp('material_type'+page).focus();

                                Ext.getCmp('material_uom'+page).setValue(record.data.uom);
                                Ext.getCmp('material_uom'+page).focus();

                                Ext.getCmp('material_category'+page).setValue(record.data.category);
                                Ext.getCmp('material_category'+page).focus();
                                Ext.getCmp('material_updated_by'+page).setValue(record.data.updated_by);

                                Ext.getCmp('material_cataloguer'+page).setValue(record.data.cataloguer);
                                Ext.getCmp('material_cataloguer_by'+page).setValue(record.data.cataloguer_by);

                                Ext.getCmp('material_std_approval'+page).setValue(record.data.std_approval);
                                Ext.getCmp('material_std_approval_by'+page).setValue(record.data.std_approval_by);

                                Ext.getCmp('material_proc_approver'+page).setValue(record.data.proc_approver);
                                Ext.getCmp('material_proc_approver_by'+page).setValue(record.data.proc_approver_by);

                                Ext.getCmp('material_owner'+page).setValue(record.data.owner);

                                // START SEND EMAIL
                                Ext.getCmp('material_useremail'+page).setValue(record.data.email_user);
                                Ext.getCmp('material_catemail'+page).setValue(record.data.email_cat);
                                Ext.getCmp('material_stdemail'+page).setValue(record.data.email_std);
                                Ext.getCmp('material_procemail'+page).setValue(record.data.email_proc);

                                // Ext.getCmp('material_requesttype'+page).setValue(record.data.transaction_type);
                                // Ext.getCmp('material_useridcat'+page).setValue(record.data.user_id_cat);
                                // Ext.getCmp('material_useridproc'+page).setValue(record.data.user_id_proc);
                                // END SEND EMAIL

                                var filters = [];
                                var inc_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record.data.inc,
                                    property: "inc",
                                    type: "string",
                                });
                                filters.push(inc_filter['initialConfig']) ;

                                var rev_adr_d_items_id_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record.data.blocked_adr_d_items_id,
                                    property: "blocked_adr_d_items_id",
                                    type: "string",
                                });

                                var adr_d_items_id_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                                    property: "adr_d_items_id",
                                    type: "string",
                                });

                                if(isEmpty(record.data.blocked_adr_d_items_id) == false){
                                    filters.push(rev_adr_d_items_id_filter['initialConfig']) ;
                                }else{
                                    filters.push(adr_d_items_id_filter['initialConfig']) ;
                                }


                                var sorters = [];
                                var seq_shorter = new Ext.util.Sorter({
                                    property: "sequence",
                                    direction: "ASC",
                                });
                                sorters.push(seq_shorter['initialConfig']) ;

                                store_blocked_material_item_char.proxy.extraParams = {
                                    _token : csrf_token,
                                    // filter: Ext.encode(filters),
                                    adr_d_items_id : record.data.adr_d_items_id,
                                    inc_m_id : record.data.inc_m_id,
                                    sort: Ext.encode(sorters),
                                    blocked_adr_d_items_id : record.data.blocked_adr_d_items_id,
                                };
                                store_blocked_material_item_char.load({
                                    params:{
                                        start:0,
                                        limit:300,

                                    }
                                });

                                var filters_reason = [];
                                var table_name = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: 'deletion_adr_d_items',
                                    property: "table_name",
                                    type: "string",
                                });
                                filters_reason.push(table_name['initialConfig']) ;
                                var table_id = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record.data.blocked_adr_d_items_id,
                                    property: "table_id",
                                    type: "numeric",
                                });
                                filters_reason.push(table_id['initialConfig']) ;

                                store_blocked_material_reason.proxy.extraParams = {
                                    _token : csrf_token,
                                    filter: Ext.encode(filters_reason),
                                };
                                store_blocked_material_reason.load({
                                    params:{
                                        start:0,
                                        limit:300,

                                    }
                                });
                                var revId = Ext.getCmp('blocked_adr_d_items_id'+page).getValue();

                                var filters = [];
                                if(isEmpty(revId) == true){
                                    var id_filter = new Ext.util.Filter({
                                        operator: 'eq',
                                        value: record.data.id,
                                        property: "adr_d_items_id",
                                        type: "numeric",
                                    });
                                }else{
                                    var id_filter = new Ext.util.Filter({
                                        operator: 'eq',
                                        value: record.data.blocked_adr_d_items_id,
                                        property: "blocked_adr_d_items_id",
                                        type: "numeric",
                                    });
                                }

                                filters.push(id_filter['initialConfig']) ;

                                store_blocked_material_cross_references.proxy.extraParams = {
                                    _token : csrf_token,
                                    filter: Ext.encode(filters),
                                    adr_d_items_id : record.data.adr_d_items_id,
                                    blocked_adr_d_items_id : record.data.blocked_adr_d_items_id,
                                };

                                store_blocked_material_cross_references.load({
                                    params:{
                                        start:0,
                                        limit:300,
                                    }
                                });

                                store_blocked_material_funloc.proxy.extraParams = {
                                    _token : csrf_token,
                                    filter: Ext.encode(filters),
                                    blocked_adr_d_items_id : record.data.blocked_adr_d_items_id,
                                };

                                store_blocked_material_funloc.load({
                                    params:{
                                        start:0,
                                        limit:300,

                                    },

                                });
                                store_blocked_material_view_notes.proxy.extraParams = {
                                    _token : csrf_token,
                                    filter: Ext.encode(filters),
                                    blocked_adr_d_items_id : record.data.blocked_adr_d_items_id,
                                };
                                store_blocked_material_view_notes.load({
                                    params:{
                                        start:0,
                                        limit:300,

                                    }
                                });
                                BlockedServiceWorkFlow();
                            }else{
                                store_blocked_material_item_char.removeAll();
                                store_blocked_material_cross_references.removeAll();
                                store_blocked_material_funloc.removeAll();
                                store_blocked_material_view_notes.removeAll();

                                // Ext.getCmp('btnServiceViewDocument'+page).setDisabled(true);
                                // Ext.getCmp('btnServiceViewRaw'+page).setDisabled(true);
                                // Ext.getCmp('btnServiceViewImages'+page).setDisabled(true);
                                // Ext.getCmp('btnServiceViewNotes'+page).setDisabled(true);

                                Ext.getCmp('material_adr_status'+page).setValue('');
                                Ext.getCmp('material_item_status'+page).setValue('');

                                Ext.Msg.show({
                                    title   : 'Data Search',
                                    msg     : 'No Record Found',
                                    buttons : Ext.Msg.OK,
                                    // iconCls : 'warningMessage',
                                    icon :  Ext.MessageBox.INFO,
                                });
                                Ext.getCmp('form_blocked_service'+page).unmask();

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

                                form_blocked_service.getForm().getFields().each (function (field) {
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

                Ext.Msg.show({
                    title   : 'Data Search',
                    msg     : 'Catalog No Can Not Be Empty',
                    buttons : Ext.Msg.OK,
                    // iconCls : 'warningMessage',
                    icon :  Ext.MessageBox.INFO,
                });
                Ext.getCmp('form_blocked_service'+page).unmask();
                // CheckServiceMRP(0);
            }
        }

        ////////////////////////////
        // Service Catalog Field //
        ////////////////////////////
        Ext.define('materialcatalogfield', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.materialcatalogfield',
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
                SearchBlockedServiceCatalogNo();
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
                this.setTriggers({
                    picker: {
                        handler: 'onTriggerClick',
                        scope: 'this'
                    },
                    picker1: {
                        cls: 'x-form-search-trigger',
                        id:'btnTrigger'+me.name+'_'+page,
                        handler: function(){
                            // console.log(me.id)
                            var title = 'History '+me.fieldLabel ;
                            var winHistoryId = 'win_history_'+me.id;
                            var gridHistoryId = 'grid_history_'+me.id;
                            // var store_history = 'store_history_'+m.name;
                            var x = me.getPosition()[0]+me.width;
                            var y =  me.getPosition()[1];
                            // console.log()
                            var winHistory = Ext.getCmp(winHistoryId);
                            if (winHistory)
                                winHistory.destroy();
                            var gridHistory = Ext.getCmp(gridHistoryId);
                            if (gridHistory)
                                gridHistory.destroy();
                            window['model_history_'+me.id] = Ext.define('model_history_'+me.id, {
                                extend: 'Ext.data.Model',
                            });
                            window['store_history_'+me.id]  = Ext.create('Ext.data.Store', {
                                storeId: 'store_material_cross_references',
                                model: window['model_history_'+me.id] ,
                                remoteFilter:true,
                                remoteSort:true,
                                autoLoad: false,
                                proxy: {
                                    type: 'ajax',
                                    url: 'getHistory',//action=getInc
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
                            var adr_d_items_id = new Ext.util.Filter({
                                operator: 'eq',
                                value: Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                                property: "adr_d_items_id",
                                type: "numeric",
                            });
                            filters.push(adr_d_items_id['initialConfig']) ;
                            /*window[me.name] = new Ext.util.Filter({
                             operator: 'eq',
                             value: me.name,
                             property: "field",
                             type: "string",
                             });
                             filters.push(window[me.name]['initialConfig']) ;*/
                            window['store_history_'+me.id].proxy.extraParams = {
                                filter: Ext.encode(filters),
                                action:'getHistory'
                            };
                            window['store_history_'+me.id].load({
                                params:{
                                    start:0,
                                    limit:25
                                }
                            });
                            Ext.create('Ext.Window',{
                                id:winHistoryId,
                                // title:title,
                                header:false,
                                closable:false,
                                floating: true,
                                width:'300',
                                height:'230',
                                layout:'fit',
                                items:[
                                    Ext.create('Ext.grid.Panel', {
                                        // extend:'Ext.grid.Panel',
                                        // xtype:'nestedgrid',
                                        // requires:['Ext.grid.Panel','NestedGrid.ux.RowExpanderGrid'],
                                        id:gridHistoryId,
                                        title: title,

                                        autoHeight:true,
                                        store: Ext.data.StoreManager.lookup('orderstore'),
                                        columns: [
                                            { text: 'Order Id',  dataIndex: 'orderid' },
                                            { text: 'Amount', dataIndex: 'amt', flex: 1 },
                                            { text: 'Date', dataIndex: 'date' }
                                        ],
                                        plugins:[
                                            {

                                                ptype:'rowexpandergrid',
                                                gridConfig:{
                                                    store:'nestedStore1',
                                                    columns: [
                                                        {xtype: 'rownumberer'},
                                                        { text: "Product ID", dataIndex: 'productid' ,menuDisabled : false,resizable:true,editor:'textfield'},
                                                        { text: "Product Name", dataIndex: 'productName' ,menuDisabled : true,resizable:false,editor:'textfield'},
                                                        { text: "Qty", dataIndex: 'qty' ,menuDisabled : true,resizable:false,editor:'numberfield'}
                                                    ],
                                                    columnLines: false,
                                                    border:true,
                                                    // plugins:['rowediting'],
                                                    autoWidth: true,
                                                    autoHeight: true,
                                                    frame: false,
                                                    header:false,
                                                    dockedItems:{
                                                        xtype:'pagingtoolbar',
                                                        dock:'bottom',
                                                        layout:{pack:'center'},
                                                        store:'nestedStore1'
                                                    }

                                                }
                                            },
                                            {
                                                ptype:'viewport'
                                            }
                                        ],
                                        tools: [
                                            {
                                                type: 'close',
                                                handler: function () {
                                                    var winHistory = Ext.getCmp(winHistoryId);
                                                    // winHistory.animateTarget = 'btnTrigger'+me.name+'_'+page,
                                                    winHistory.hide();
                                                }
                                            }
                                        ],

                                    }),


                                    //  // Ext.create('NestedGrid',{});

                                ],
                                listeners: {
                                    show: function() {
                                        // this.setX(w -this.getWidth());
                                        // this.setY(h -this.getHeight());
                                    },
                                    beforeclose:function(){
                                        // getCmp()
                                        // Ext.getCmp(winHistoryId).destroy();
                                    },
                                    afterclose:function(){
                                        // Ext.getCmp(winHistoryId).destroy();
                                    }
                                },
                            }).showAt(x,y);
                        },
                        scope: 'this'
                    }
                });
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
                this.setTriggers({
                    picker: {
                        handler: 'onTriggerClick',
                        scope: 'this'
                    },
                    picker1: {
                        cls: 'x-form-search-trigger',
                        id:'btnTrigger'+me.name+'_'+page,
                        handler: function(){
                            // console.log(me)
                            var title = 'History '+me.fieldLabel ;
                            var winHistoryId = 'win_history_'+me.id;
                            var gridHistoryId = 'grid_history_'+me.id;
                            // var store_history = 'store_history_'+m.name;
                            var x = me.getPosition()[0]+me.width;
                            var y =  me.getPosition()[1];
                            var winHistory = Ext.getCmp(winHistoryId);
                            if (winHistory)
                                winHistory.destroy();
                            var gridHistory = Ext.getCmp(gridHistoryId);
                            if (gridHistory)
                                gridHistory.destroy();

                            window['model_history_'+me.id] = Ext.define('model_history_'+me.id, {
                                extend: 'Ext.data.Model',
                            });
                            window['store_history_'+me.id]  = Ext.create('Ext.data.Store', {
                                storeId: window['store_'+me.id],
                                model: window['model_history_'+me.id] ,
                                remoteFilter:true,
                                remoteSort:true,
                                autoLoad: false,
                                proxy: {
                                    type: 'ajax',
                                    url: '/getAuditAdrDItems',
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
                            window['filter'+me.name] = [];
                            window['material_adr_d_items_id'+me.name] = new Ext.util.Filter({
                                operator: 'eq',
                                value: Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                                property: "adr_d_items_id",
                                type: "numeric",
                            });
                            filters.push(window['filter'+me.name]['initialConfig']) ;

                            window['store_history_'+me.id].proxy.extraParams = {
                                filter: Ext.encode(window['filter'+me.name]),
                            };
                            window['store_history_'+me.id].load({
                                params:{

                                }
                            });

                            window['winHistory'+winHistoryId] = new  Ext.Window({
                                // title: 'Form Request For Blocked',
                                id: winHistoryId,
                                constrain: true,
                                header:false,
                                // width:'300',
                                // height:'230',
                                height:Ext.getBody().getViewSize().height*0.35,
                                width:Ext.getBody().getViewSize().width*0.25 ,
                                layout:'fit',
                                plain: true,
                                // margin: '10 10 13 10',
                                bodyPadding: '5 5 5 5',
                                border: false,
                                resizable: false,
                                modal: false,
                                autoShow: false,
                                defaultFocus: 'nome',
                                buttonAlign: 'right',
                                closable: false,
                                frame: true,
                                // padding : '1 1 1 1',
                                items: [
                                    Ext.create('Ext.grid.Panel', {
                                        id:gridHistoryId,
                                        title: title,
                                        // title:title,
                                        region: 'fit',
                                        store: window['store_history_'+me.id] ,
                                        // height :200,
                                        frame:false,
                                        margins: '5 5 5 5',
                                        columns: [
                                            {
                                                header:'Revision',
                                                dataIndex:'revision'
                                            },
                                            {
                                                header:'Old Value',
                                                dataIndex:me.name
                                            }
                                        ],
                                        bbar:[
                                            Ext.create('Ext.PagingToolbar', {
                                                border:false,
                                                store: window['store_history_'+me.id] ,
                                                displayInfo: false,
                                                displayMsg: 'Displaying record {0} - {1} of {2}',
                                                emptyMsg: "No records to display"
                                            }),
                                        ],
                                        viewConfig: {
                                            stripeRows: true
                                        },

                                        listeners: {
                                            mousedown:function(ev){
                                                var view = this.getView();
                                                if(!view.owns(ev.getTarget()))
                                                    view.close();
                                            }
                                        },
                                        tools: [
                                            {
                                                type: 'close',
                                                handler: function () {
                                                    var winHistory = Ext.getCmp(winHistoryId);
                                                    // winHistory.animateTarget = 'btnTrigger'+me.name+'_'+page,
                                                    winHistory.hide();
                                                }
                                            }
                                        ],
                                    }),
                                ],
                                // hideOnMaskTap:true,
                                listeners : {
                                    /*hide: function() {
                                     this.destroy();
                                     },
                                     global: {
                                     mousedown: 'dismissWindowCheck'
                                     }*/
                                    mousedown:function(ev){
                                        var view = this.getView();
                                        if(!view.owns(ev.getTarget()))
                                            view.close();
                                    }
                                },
                                /*dismissWindowCheck: function(ev){
                                 var view = this.getView();
                                 if(!view.owns(ev.getTarget()))
                                 view.close();
                                 }*/
                                /*tools: [
                                 {
                                 type: 'close',
                                 handler: function () {
                                 var winHistory = Ext.getCmp(winHistoryId);
                                 // winHistory.animateTarget = 'btnTrigger'+me.name+'_'+page,
                                 winHistory.hide();
                                 }
                                 }
                                 ],*/
                            }).showAt(x,y);
                        },
                        scope: 'this'
                    }
                });
                this.callParent(arguments);
            },
        });
        
        //////////////////
        // Reason //
        //////////////////
        var model_blocked_material_reason = Ext.define('model_blocked_material_reason', {
            extend: 'Ext.data.Model',
            // fields: ['class_inc_name','class','inc', 'description']
        });
        var store_blocked_material_reason = Ext.create('Ext.data.Store', {
            storeId: 'store_blocked_material_reason'+page,
            model: model_blocked_material_reason,
            proxy: {
                type: 'ajax',
                // url: 'cb_inc.php?',
                url: '/getReason',
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

        var grid_blocked_service_reason = Ext.create('Ext.grid.Panel', {
            title: 'Reason',
            // region: 'center',
            height:200,
            // collapsible:true,
            // width :300,
            anchor:'75%',
            id: 'grid_blocked_service_reason'+page,
            store: store_blocked_material_reason,
            sortableColumns: false,
            frame:true,
            margins: '5 5 5 5',
            columns: [
                {
                    header:'Users',
                    dataIndex:'real_name',
                    flex:1
                } ,
                {
                    header:'Reason',
                    dataIndex:'description',
                    flex:3,
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

        ///////////////////////////////
        // Form Service Single View //
        //////////////////////////////
        var form_blocked_service = Ext.create('Ext.form.Panel', {
            height:550,
            autoHeight:true,
            layout:'border',
            id:'form_blocked_service'+page,
            fieldDefaults: {
                readOnly : true //all fiels are in readOnly mode
            },
            padding : '1 1 1 1',
            margin : '1 1 1 1',
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
                                            xtype:'materialcatalogfield',
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
                                                            SearchBlockedServiceCatalogNo();
                                                            // submitform();
                                                        }
                                                    });
                                                }
                                            }
                                        },
                                        {
                                            xtype:'textfield',
                                            name:'items_is_active',
                                            id:'items_is_active'+page,
                                            hidden:true,
                                        },
                                        // START SEND EMAIL
                                        {
                                            xtype:'textfield',
                                            name:'useremail',
                                            id:'material_useremail'+page,
                                            hidden:true,
                                        },
                                        {
                                            xtype:'textfield',
                                            name:'catemail',
                                            id:'material_catemail'+page,
                                            hidden:true,
                                        },
                                        {
                                            xtype:'textfield',
                                            name:'stdemail',
                                            id:'material_stdemail'+page,
                                            hidden:true,
                                        },
                                        {
                                            xtype:'textfield',
                                            name:'procemail',
                                            id:'material_procemail'+page,
                                            hidden:true,
                                        },
                                        {
                                            xtype:'textfield',
                                            name:'requesttype',
                                            id:'material_requesttype'+page,
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
                                                    value: Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                                                    property: "adr_d_items_id",
                                                    type: "numeric",
                                                });
                                                filters.push(adr_d_items_id['initialConfig']) ;
                                                store_blocked_material_document.proxy.extraParams = {
                                                    filter: Ext.encode(filters),
                                                    action:'getServiceDocument'
                                                };
                                                store_blocked_material_document.load({
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
                                                    value: Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                                                    property: "adr_d_items_id",
                                                    type: "numeric",
                                                });
                                                filters.push(inc_filter['initialConfig']) ;
                                                store_blocked_material_images.proxy.extraParams = {
                                                    filter: Ext.encode(filters),
                                                    action:'getServiceImages'
                                                };
                                                store_blocked_material_images.load({
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
                                            id: 'material_adr_status'+page,
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
                                            id: 'material_adr_m_id'+page,
                                            name:'adr_m_id',
                                            width: 350,
                                            editable: true,
                                            value: '',
                                            readOnly:true,
                                            hidden:true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'material_adr_d_items_id'+page,
                                            name:'adr_d_items_id',
                                            width: 350,
                                            editable: true,
                                            value: '',
                                            readOnly:true,
                                            hidden:true
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'blocked_adr_d_items_id'+page,
                                            name:'blocked_adr_d_items_id',
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
                                            id: 'sap_material_code'+page,
                                            name:'sap_material_code',
                                            editable: true,
                                            value: '',
                                            readOnly:true,
                                            // hidden:!ROLE.SAPServiceCode,
                                        },
                                        {
                                            xtype:'textfield',
                                            name:'sap_material_code_by_id',
                                            id:'sap_material_code_by_id'+page,
                                            hidden:true,
                                        },
                                        {
                                            xtype:'textfield',
                                            name:'sap_material_code_date',
                                            id:'sap_material_code_date'+page,
                                            hidden:true,
                                        },
                                        {
                                            xtype: 'tbfill'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'material_item_status'+page,
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
                                            xtype: 'combotwintrigger',
                                            labelWidth: 130,
                                            width: 290,
                                            fieldLabel: 'INC',
                                            matchFieldWidth: false,
                                            forceSelection: false,
                                            mode: 'remote',
                                            triggerAction: 'all',
                                            emptyText: 'Select INC ...',
                                            selectOnFocus: true,
                                            id: 'material_inc'+page,
                                            name: 'inc',
                                            hiddenName: 'inc_code',
                                            displayField: 'inc',
                                            valueField: 'inc',
                                            minChars: 0,
                                            store: store_blocked_material_inc,
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
                                                    // console.log(Ext.getCmp('material_mgc'+page).getValue());
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

                                                     if(Ext.getCmp('material_mgc'+page).getValue()){
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
                                                    store_blocked_material_inc.proxy.extraParams = {
                                                        filter: Ext.encode(filters),
                                                        action: 'getIncByMGC'
                                                    };
                                                    store_blocked_material_inc.load({
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
                                                    var matching = store_blocked_material_inc.queryBy(
                                                        function(rec, id) {

                                                            if (rec.data.inc == record.data.inc) {

                                                                Ext.getCmp('material_name_code'+page).setValue(rec.data.item_name);
                                                                Ext.getCmp('material_short_name_code'+page).setValue(rec.data.short_name_code);
                                                                Ext.getCmp('material_short_description'+page).setValue(rec.data.short_name_code);
                                                                Ext.getCmp('material_long_description'+page).setValue(rec.data.short_name_code);

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

                                                                store_blocked_material_item_char.proxy.extraParams = {
                                                                    _token : csrf_token,
                                                                    filter: Ext.encode(filters),
                                                                    action:'getAdrItemsChar',
                                                                    adr_d_items_id: Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                                                                    sort: Ext.encode(sorters),
                                                                };

                                                                store_blocked_material_item_char.load({
                                                                    params:{
                                                                        start:0,
                                                                        limit:300
                                                                        // action : 'getInc',
                                                                        // filter: Ext.encode(filters),
                                                                    }
                                                                });

                                                                Ext.getCmp('material_mgc'+page).reset();
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
                                            allowBlank:false,
                                            value: '',
                                            hidden:!ROLE.INC,
                                            readOnly:true
                                        },
                                        {
                                            xtype: 'combotwintrigger',
                                            fieldLabel:'MGC',
                                            labelWidth: 30,
                                            width: 205,
                                            matchFieldWidth: false,
                                            forceSelection: false,
                                            name: 'groupclass',
                                            displayField: 'groupclass',
                                            valueField: 'groupclass',
                                            store: store_mgc,
                                            pageSize: 15,
                                            minChars : 0,
                                            margin: '0 13 0 5',
                                            disabled:false,
                                            forceSelection: false,
                                            mode: 'remote',
                                            triggerAction: 'all',
                                            emptyText: 'Select MGC ...',
                                            selectOnFocus: true,
                                            id:'material_mgc'+page,
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
                                                        value: Ext.getCmp('material_inc'+page).getValue(),
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
                                            allowBlank:false,
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
                                            id:'material_name_code'+page,
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
                                            id:'material_short_name_code'+page,
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
                                            id:'material_short_description'+page,
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
                                            id:'material_long_description'+page,
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
                                            xtype:'combotwintrigger',
                                            // xtype:'combobox',
                                            fieldLabel: 'Service Type',
                                            labelWidth: 130,
                                            width: 270,
                                            forceSelection : false,
                                            mode: 'remote',
                                            triggerAction: 'all',
                                            emptyText:'Select Type...',
                                            selectOnFocus:false,
                                            margin: '3 3 3 0',
                                            id:'material_type'+ page,
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
                                            store: store_blocked_material_type,
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
                                                        value: 'material_type',
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
                                                    store_blocked_material_type.proxy.extraParams = {
                                                        filter: Ext.encode(filters),
                                                        action :'getEntity'
                                                    };
                                                    store_blocked_material_type.load({
                                                        params:{
                                                            start:0,
                                                            limit:25
                                                        }
                                                    });
                                                    Ext.Ajax.abortAll(); //cancel any previous requests
                                                    return true;
                                                },
                                                change: function (t,record,o) {
                                                    // console.log(record);
                                                    var category = Ext.getCmp('material_category'+page).getValue();
                                                    var uom = Ext.getCmp('material_uom'+page).getValue();
                                                    if(category && uom){
                                                        // Ext.getCmp('btnApplyChanges'+page).setDisabled(false);
                                                    }
                                                    if(!record){
                                                        // Ext.getCmp('btnApplyChanges'+page).setDisabled(true);
                                                    }

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
                                            xtype: 'combotwintrigger',
                                            fieldLabel: 'UOM',
                                            labelWidth: 60,
                                            width: 230,
                                            forceSelection : false,
                                            mode: 'remote',
                                            triggerAction: 'all',
                                            emptyText:'Select UOM ...',
                                            selectOnFocus:false,
                                            margin: '3 3 3 0',
                                            id:'material_uom'+ page,
                                            name:           'uom',
                                            hiddenName:     'code',
                                            displayField:   'code',
                                            valueField:     'code',
                                            minChars : 0,
                                            queryParam: "query",
                                            queryMode: "remote",
                                            queryCaching: false,
                                            store: store_blocked_material_uom,
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
                                                        value: 'UOM',
                                                        property: "entity_name",
                                                        type: "string",
                                                    });

                                                    filters.push(entity_name['initialConfig']) ;

                                                    store_blocked_material_uom.proxy.extraParams = {
                                                        filter: Ext.encode(filters),
                                                        action :'getEntity'
                                                    };

                                                    store_blocked_material_uom.load({
                                                        params:{
                                                            start:0,
                                                            limit:25
                                                        }
                                                    });
                                                    Ext.Ajax.abortAll(); //cancel any previous requests
                                                    return true;
                                                },
                                                change: function (t,record,o) {
                                                    var category = Ext.getCmp('material_category'+page).getValue();
                                                    var material_type = Ext.getCmp('material_type'+page).getValue();
                                                    if(category && material_type){
                                                        // Ext.getCmp('btnApplyChanges'+page).setDisabled(false);
                                                    }
                                                    if(!record){
                                                        // Ext.getCmp('btnApplyChanges'+page).setDisabled(true);
                                                    }
                                                }

                                            },
                                            value: '',
                                            hidden:!ROLE.UOM,
                                            readOnly:true
                                        },
                                        {
                                            xtype: 'combotwintrigger',
                                            // msgTarget: 'side',
                                            fieldLabel: 'Category',
                                            labelWidth: 90,
                                            width: 230,
                                            forceSelection : false,
                                            mode: 'remote',
                                            triggerAction: 'all',
                                            emptyText:'Select Category ...',
                                            selectOnFocus:false,
                                            margin: '3 3 3 0',
                                            id:'material_category'+ page,
                                            name:           'category',
                                            hiddenName:     'category',
                                            displayField:   'code',
                                            valueField:     'code',
                                            minChars : 0,
                                            pageSize:15,
                                            matchFieldWidth: false,
                                            listConfig: {
                                                loadingText: 'Searching...',
                                                emptyText: 'No matching data found!',
                                                getInnerTpl: function() {
                                                    return '{code} <span style="font-size: xx-small; ">{description}</span>';
                                                }
                                            },
                                            store:store_blocked_material_category,
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
                                                        value: 'itemcategory',
                                                        property: "entity_name",
                                                        type: "string",
                                                    });

                                                    filters.push(entity_name['initialConfig']) ;

                                                    store_blocked_material_category.proxy.extraParams = {
                                                        filter: Ext.encode(filters),
                                                        action :'getEntity'
                                                    };

                                                    store_blocked_material_category.load({
                                                        params:{
                                                            start:0,
                                                            limit:25
                                                        }
                                                    });

                                                    Ext.Ajax.abortAll(); //cancel any previous requests
                                                    return true;
                                                },
                                                change: function (t,record,o) {
                                                    var category = Ext.getCmp('material_category'+page).getValue();
                                                    var material_type = Ext.getCmp('material_type'+page).getValue();
                                                    if(category && material_type){
                                                        // Ext.getCmp('btnApplyChanges'+page).setDisabled(false);
                                                    }
                                                    if(!record){
                                                        // Ext.getCmp('btnApplyChanges'+page).setDisabled(true);
                                                    }
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
                                    id:'material_updated_by'+page,
                                    hidden:true,
                                },
                                {
                                    xtype: 'panel',
                                    margin:'0 0 0 5',
                                    layout: 'hbox',
                                    border:false,
                                    items: [
                                        {
                                            xtype: 'combo',
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
                                            id:'material_cataloguer'+ page,
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
                                                    {name : 'Reject',  value: 'Rejected'},
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
                                            id:'material_cataloguer_by'+page,
                                            hidden:true,
                                        },
                                        {
                                            xtype:'textfield',
                                            name:'cataloguer_date',
                                            id:'material_cataloguer_date'+page,
                                            hidden:true,
                                        },
                                        {
                                            xtype: 'combo',
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
                                            id:'material_std_approval'+ page,
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
                                            id:'material_std_approval_by'+page,
                                            hidden:true,
                                        },
                                        {
                                            xtype:'textfield',
                                            name:'std_approval_date',
                                            id:'material_std_approval_date'+page,
                                            hidden:true,
                                        },
                                        {
                                            xtype: 'combo',
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
                                            hidden:!ROLE.ProcApp,
                                            readOnly:true
                                        },
                                        {
                                            xtype:'textfield',
                                            name:'proc_approver_by',
                                            id:'material_proc_approver_by'+page,
                                            hidden:true,
                                        },
                                        {
                                            xtype:'textfield',
                                            name:'proc_approver_date',
                                            id:'material_proc_approver_date'+page,
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
                                            id: 'material_owner'+page,
                                            labelWidth: 130,
                                            width: 300,
                                            fieldLabel: 'Service Owner',
                                            value: ''
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
                                            hidden:true,
                                        },
                                        /*{
                                         // xtype: '',
                                         iconCls:'chk-pwd'
                                         },

                                         */

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
                                            fieldLabel: 'Reason',
                                            labelWidth: 130,
                                            width: 739,
                                            editable: true,
                                            value: '',
                                            margin: '0 3 3 0',
                                            id:'reason'+page,
                                            name:'reason',
                                            allowBlank:false
                                        },

                                    ]
                                },
                                grid_blocked_service_reason

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
                            padding : '1 1 1 1',
                            items:[grid_blocked_material_inc_characteristic]
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
                            padding : '1 1 1 1',
                            items:[grid_blocked_material_cross_references]
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
                            padding : '1 1 1 1',
                            items:[grid_blocked_material_funcloc]
                        }
                    ]
                }
            ]

        });
        // --WINDOWS - REVISION
        // =====================================================================
        var winServiceBlocked = new Ext.Window({
            title:'Form Request For Blocked',
            id: 'winServiceBlocked'+page,
            layout       : 'fit',
            constrain    : true,
            height:Ext.getBody().getViewSize().height*0.99,
            width:Ext.getBody().getViewSize().width*0.99 ,
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
                form_blocked_service
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        winServiceBlocked.hide();
                        form_blocked_service.getForm().reset();
                        // store_REV.reload();
                        // ResetWindowRevision();
                        // ServiceResetFormWindowBotton();
                    }
                }
            ],
            bbar:[
                {
                    xtype: 'tbfill'
                },
                '-',
                {
                    // xtype:'button',
                    text:'Request For Blocked',
                    iconCls:'add-data',
                    hidden:!ROLE.AddRequestBlocked,
                    id:'btnRequestForBlocked'+page,
                    disabled:true,
                    handler: function() {
                        var material_char = Ext.encode(Ext.pluck(store_blocked_material_item_char.data.items, 'data'));
                        var INC = Ext.getCmp('material_inc'+page).getValue();
                        var MGC = Ext.getCmp('material_mgc'+page).getValue();
                        var CatApp = Ext.getCmp('material_cataloguer'+page).getValue();
                        var StdApp = Ext.getCmp('material_std_approval'+page).getValue();
                        var ProcApp = Ext.getCmp('material_proc_approver'+page).getValue();
                        var SAPServiceCode = Ext.getCmp('sap_material_code'+page).getValue();

                        var material_type = Ext.getCmp('material_type'+page).getValue() ;
                        var uom = Ext.getCmp('material_uom'+page).getValue();
                        var category = Ext.getCmp('material_category'+page).getValue() ;

                        var evts=0;
                        var rprs=0;
                        if(isEmpty(material_type) == false && material_type == 'ZOEM'){

                        }else{
                            store_blocked_material_item_char.each(function(record) {
                                var type = record.get('type');
                                var nvalue = record.get('nvalue') ;
                                if(type == "M" && isEmpty(nvalue) == true) {
                                    if(record.get('nvalue')) rprs+=1;
                                    else evts+=1;
                                }
                            });
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
                                Ext.getCmp('material_category'+page).allowBlank = true;
                                Ext.getCmp('material_category'+page).clearValue();
                                Ext.getCmp('material_updated_by'+page).reset();

                                Ext.getCmp('material_cataloguer'+page).setValue();
                                Ext.getCmp('material_cataloguer_by'+page).reset();
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
                                Ext.getCmp('material_category'+page).allowBlank = true;
                                Ext.getCmp('material_category'+page).clearValue();
                                Ext.getCmp('material_updated_by'+page).reset();

                                Ext.getCmp('material_cataloguer'+page).clearValue();
                                Ext.getCmp('material_cataloguer_by'+page).reset();

                                Ext.getCmp('material_std_approval'+page).clearValue();
                                Ext.getCmp('material_std_approval_by'+page).reset();
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
                                    Ext.getCmp('material_category'+page).allowBlank = true;
                                    Ext.getCmp('material_category'+page).clearValue();
                                    Ext.getCmp('material_updated_by'+page).reset();

                                    Ext.getCmp('material_cataloguer'+page).clearValue();
                                    Ext.getCmp('material_cataloguer_by'+page).reset();

                                    Ext.getCmp('material_std_approval'+page).clearValue();
                                    Ext.getCmp('material_std_approval_by'+page).reset();

                                    Ext.getCmp('material_proc_approver'+page).clearValue();
                                    Ext.getCmp('material_proc_approver_by'+page).reset();
                                }

                            }
                        }
                        Ext.MessageBox.show({
                            msg: 'Saving your data, please wait...',
                            progressText: 'Saving...',
                            width:300,
                            wait:true,
                            waitConfig: {interval:200},
                            icon:'ext-mb-download',
                            animEl: 'buttonID'
                        });


                        form_blocked_service.form.submit({
                            scope:this,
                            url: 'RequestItemsBlocked',
                            method: 'POST',
                            dataType: 'html',
                            params:{
                                _token : csrf_token,
                                transaction_type : 'Service',
                                items_characteristic : material_char,
                            },
                            success:function(response, request){
                                var responseText = Ext.util.JSON.decode(request.response.responseText);
                                Ext.MessageBox.hide();
                                Ext.create('Ext.window.MessageBox', {
                                    alwaysOnTop: true,
                                    closeAction: 'destroy'
                                }).show({
                                    icon: Ext.MessageBox.INFO,
                                    title: 'Message',
                                    buttons: Ext.Msg.OK,
                                    message:responseText.message
                                });
                                SearchBlockedServiceCatalogNo();
                                store_blocked_request.reload();

                            },
                            failure:function(response, request){
                                if(typeof request.response != 'undefined')
                                    var mess = request.response.responseText;
                                else
                                    var mess = 'Fields marked in red can not be blank !' ;
                                Ext.MessageBox.hide();
                                Ext.create('Ext.window.MessageBox', {
                                    alwaysOnTop: true,
                                    closeAction: 'destroy'
                                }).show({
                                    icon: Ext.MessageBox.ERROR,
                                    title: 'Message',
                                    buttons: Ext.Msg.OK,
                                    message: mess
                                });


                            },
                        });
                    }
                },
                '-',
                {
                    // xtype:'button',
                    text:'Approval For Blocked',
                    iconCls:'add-data',
                    hidden:!ROLE.ApprovalBlocked,
                    id:'btnApprovalForBlocked'+page,
                    disabled:true,
                    handler: function() {
                        var material_char = Ext.encode(Ext.pluck(store_blocked_material_item_char.data.items, 'data'));

                        var INC = Ext.getCmp('material_inc'+page).getValue();
                        var MGC = Ext.getCmp('material_mgc'+page).getValue();
                        var CatApp = Ext.getCmp('material_cataloguer'+page).getValue();
                        var StdApp = Ext.getCmp('material_std_approval'+page).getValue();
                        var ProcApp = Ext.getCmp('material_proc_approver'+page).getValue();
                        var SAPServiceCode = Ext.getCmp('sap_material_code'+page).getValue();

                        var material_type = Ext.getCmp('material_type'+page).getValue() ;
                        var uom = Ext.getCmp('material_uom'+page).getValue();
                        var category = Ext.getCmp('material_category'+page).getValue() ;

                        var evts=0;
                        var rprs=0;
                        store_blocked_material_item_char.each(function(record) {
                            var type = record.get('type');
                            var nvalue = record.get('nvalue') ;
                            if(type == "M" && isEmpty(nvalue) == true) {
                                if(record.get('nvalue')) rprs+=1;
                                else evts+=1;
                            }
                        });
                        // console.log(grid_material_multiview_m.data.sap_material_code);
                        if(isEmpty(INC) == true || isEmpty(MGC) == true || isEmpty(material_type) == true || isEmpty(uom) || true && isEmpty(category) == true || evts > 0 ){
                            Ext.MessageBox.show({
                                title : 'Message',
                                msg:'Please Mandatory Check' ,
                                buttons: Ext.MessageBox.OK,
                                icon :  Ext.MessageBox.WARNING
                            });
                            return true;
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
                                Ext.getCmp('material_category'+page).allowBlank = true;
                                Ext.getCmp('material_category'+page).clearValue();
                                Ext.getCmp('material_updated_by'+page).reset();

                                Ext.getCmp('material_cataloguer'+page).setValue();
                                Ext.getCmp('material_cataloguer_by'+page).reset();
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
                                Ext.getCmp('material_category'+page).allowBlank = true;
                                Ext.getCmp('material_category'+page).clearValue();
                                Ext.getCmp('material_updated_by'+page).reset();

                                Ext.getCmp('material_cataloguer'+page).clearValue();
                                Ext.getCmp('material_cataloguer_by'+page).reset();

                                Ext.getCmp('material_std_approval'+page).clearValue();
                                Ext.getCmp('material_std_approval_by'+page).reset();
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
                                    Ext.getCmp('material_category'+page).allowBlank = true;
                                    Ext.getCmp('material_category'+page).clearValue();
                                    Ext.getCmp('material_updated_by'+page).reset();

                                    Ext.getCmp('material_cataloguer'+page).clearValue();
                                    Ext.getCmp('material_cataloguer_by'+page).reset();

                                    Ext.getCmp('material_std_approval'+page).clearValue();
                                    Ext.getCmp('material_std_approval_by'+page).reset();

                                    Ext.getCmp('material_proc_approver'+page).clearValue();
                                    Ext.getCmp('material_proc_approver_by'+page).reset();
                                }

                            }
                        }
                        Ext.MessageBox.show({
                            msg: 'Saving your data, please wait...',
                            progressText: 'Saving...',
                            width:300,
                            wait:true,
                            waitConfig: {interval:200},
                            icon:'ext-mb-download',
                            animEl: 'buttonID'
                        });


                        form_blocked_service.form.submit({
                            scope:this,
                            url: 'ApproveItemsBlocked',
                            method: 'POST',
                            dataType: 'html',
                            params:{
                                _token : csrf_token,
                                transaction_type : 'Service',
                                items_characteristic : material_char,
                            },
                            success:function(response, request){

                                Ext.MessageBox.hide();

                                Ext.MessageBox.hide();
                                Ext.create('Ext.window.MessageBox', {
                                    alwaysOnTop: true,
                                    closeAction: 'destroy'
                                }).show({
                                    icon: Ext.MessageBox.INFO,
                                    title: 'Message',
                                    buttons: Ext.Msg.OK,
                                    message: 'Process Successfully !'
                                });
                                SearchBlockedServiceCatalogNo();
                                store_blocked_request.reload();

                            },
                            failure:function(response, request){
                                if(typeof request.response != 'undefined')
                                    var mess = request.response.responseText;
                                else
                                    var mess = 'Fields marked in red can not be blank !' ;
                                Ext.MessageBox.hide();
                                Ext.create('Ext.window.MessageBox', {
                                    alwaysOnTop: true,
                                    closeAction: 'destroy'
                                }).show({
                                    icon: Ext.MessageBox.ERROR,
                                    title: 'Message',
                                    buttons: Ext.Msg.OK,
                                    message: mess
                                });


                            },
                        });
                    }
                },
            ]
        });
        // =====================================================================
        // model revision request
        // =====================================================================
        var model_blocked_request = Ext.define('model_blocked_request', {
            extend: 'Ext.data.Model',
            fields: ['id','adr_no', 'catalog_no', 'sap_material_code', 'real_name','deleted_at', 'updated_at', 'updated_by', 'item_status', 'type_revision']
        });

        var store_blocked_request = Ext.create('Ext.data.Store', {
            storeId: 'store_blocked_request'+page,
            model: model_blocked_request,
            proxy: {
                type: 'ajax',
                url: 'getBlockedRequestM',
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
        var transaction_type = new Ext.util.Filter({
            operator: 'eq',
            value:  'Service',
            property: "transaction_type",
            type: "string",
        });
        filters.push(transaction_type['initialConfig']) ;
        store_blocked_request.proxy.extraParams = {
            _token : csrf_token,
            filter: Ext.encode(filters),
        };
        store_blocked_request.load({
            params:{
            }
        });
        // =====================================================================
        // --GRIDPANEL - REVISION
        // =====================================================================
        var grid_material_request_blocked_m = Ext.create('Ext.grid.Panel', {
            store: store_blocked_request,
            layout:'fit',
            margin: '0 0 0 0',
            border:true,
            padding : '1 1 1 1',
            tbar:[
                {
                    // xtype:'button',
                    cls: 'x-btn-default-small',
                    text:'Add Blocked Request',
                    border:false,
                    iconCls:'add-data',
                    baseCls: 'buttonStyle',
                    hidden:!ROLE.AddRequestBlocked,
                    disabled:!ROLE.AddRequestBlocked,
                    id:'btnAddRequestBlocked'+page,
                    handler:function(){
                        form_blocked_service.getForm().reset();

                        store_blocked_material_item_char.removeAll();
                        store_blocked_material_cross_references.removeAll();
                        store_blocked_material_funloc.removeAll();
                        store_blocked_material_view_notes.removeAll();

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
                        winServiceBlocked.animateTarget = 'AddRequestBlocked'+page;
                        winServiceBlocked.show();
                    }
                },
                {
                    cls: 'x-btn-default-small',
                    text:'Approve Request',
                    border:false,
                    iconCls:'add-data',
                    hidden:!ROLE.ApprovalBlocked,
                    disabled:!ROLE.ApprovalBlocked,
                    id:'btnApprovalBlocked'+page,
                    handler:function(){
                        form_blocked_service.getForm().reset();

                        store_blocked_material_item_char.removeAll();
                        store_blocked_material_cross_references.removeAll();
                        store_blocked_material_funloc.removeAll();
                        store_blocked_material_view_notes.removeAll();

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
                        winServiceBlocked.animateTarget = 'btnAddRequestBlocked'+page;
                        winServiceBlocked.show();
                    }
                },
            ],
            columns: [
                {
                    header: 'ID',
                    dataIndex: 'id',
                    align: 'center',
                    hidden:true,
                    flex: 3,
                    editor:{
                        xtype: 'textfield'
                    },
                    filter:{
                        type: 'string'
                    },
                },
                {
                    header: 'Req. Revision No',
                    dataIndex: 'request_no',
                    align: 'center',
                    flex: 3,
                    editor:{
                        xtype: 'textfield'
                    },
                    filter:{
                        type: 'string'
                    },
                },
                {
                    header: 'ADR No',
                    dataIndex: 'adr_no',
                    align: 'center',
                    flex: 3,
                    editor:{
                        xtype: 'textfield'
                    },
                    filter:{
                        type: 'string'
                    },
                },
                {
                    header: 'Catalogue No',
                    dataIndex: 'catalog_no',
                    align: 'center',
                    flex: 3,
                    editor:{
                        xtype: 'textfield'
                    },
                    filter:{
                        type: 'string'
                    },
                },
                {
                    header: 'SAP No',
                    dataIndex: 'sap_material_code',
                    align: 'center',
                    // flex: 3,
                    autoSizeColumn :true,
                    editor:{
                        xtype: 'textfield'
                    },
                    filter:{
                        type: 'string'
                    },
                },
                {
                    header: 'Request Date',
                    xtype:"datecolumn",
                    format:"d M Y H:i",
                    dataIndex: 'created_at',
                    flex: 2,
                    autoSizeColumn:true,
                    editor:{
                        xtype: 'textfield'
                    },
                    filter:{
                        type: 'string'
                    },
                },
                {
                    header: 'Last Update',
                    xtype:"datecolumn",
                    format:"d M Y H:i",
                    dataIndex: 'updated_at',
                    flex: 2,
                    autoSizeColumn:true,
                    editor:{
                        xtype: 'textfield'
                    },
                    filter:{
                        type: 'string'
                    },
                },
                {
                    header: 'Update By',
                    dataIndex: 'process_by',
                    flex: 3,
                    align: 'center',
                    editor:{
                        xtype: 'textfield'
                    },
                    filter:{
                        type: 'string'
                    },
                },
                {
                    header: 'Status',
                    dataIndex: 'process_status',
                    flex: 4,
                    align: 'center',
                    editor:{
                        xtype: 'textfield'
                    },
                    filter:{
                        type: 'string'
                    },
                },

            ],
            bbar:[
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_blocked_request,
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
                select: function(selModel, record, index, options){

                }
            }
        });

        // =====================================================================
        // model revision detail
        // =====================================================================
        var model_blocked_detail = Ext.define('model_blocked_detail', {
            extend: 'Ext.data.Model',
        });

        var store_blocked_detail = Ext.create('Ext.data.Store', {
            storeId: 'store_blocked_detail'+page,
            model: model_blocked_detail,
            proxy: {
                type: 'ajax',
                url: 'getRequestBlockedD',
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

        var store_blocked_items_inc_char_new = Ext.create('Ext.data.Store', {
            storeId: 'store_blocked_items_inc_char_new'+page,
            model: model_blocked_detail,
            proxy: {
                type: 'ajax',
                url: 'getBlockedAdrDItemsChar',
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

        var store_blocked_items_inc_char_old = Ext.create('Ext.data.Store', {
            storeId: 'store_blocked_items_inc_char_old'+page,
            model: model_blocked_detail,
            proxy: {
                type: 'ajax',
                url: 'getAuditAdrDItemsChar',
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

        var grid_material_blocked_detail = Ext.create('Ext.grid.Panel', {
            store: store_blocked_detail,
            layout:'fit',
            margin: '0 0 0 0',
            border:true,
            padding : '1 1 1 1',
            title:'Service Item Revision',
            // store:store_material_view_reasonHis,
            flex:1,
            align: 'stretch',
            columns:[
                {
                    header: 'id',
                    width: 60,
                    sortable: true,
                    dataIndex: 'id',
                    hidden:true

                },
                {
                    header: 'Type',
                    dataIndex: 'type',
                    align: 'center',
                    flex: 1,
                    sortable: true,
                },
                {
                    header: 'INC',
                    dataIndex: 'inc',
                    align: 'center',
                    flex: 1
                },
                {
                    header: 'MGC',
                    dataIndex: 'groupclass',
                    align: 'center',
                    flex: 1
                },
                {
                    header: 'Service Type',
                    dataIndex: 'material_type',
                    align: 'center',
                    flex: 1
                },
                {
                    header: 'UOM',
                    dataIndex: 'uom',
                    align: 'center',
                    flex: 1
                },
                {
                    header: 'Category',
                    dataIndex: 'category',
                    align: 'center',
                    flex: 1
                },
            ],
            iewConfig: {
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
                    Ext.Ajax.abortAll();
                    return true;

                },
                beforeitemcontextmenu: function(view, record, item, index, e)
                {

                },
                itemclick: function(grid_delivery_order_m, record, item, index, e) {

                }
            },
        });
        /////////////////////////////////////////////////
        // Window Service View Revision History //
        ////////////////////////////////////////////////
        var winServiceViewHis = Ext.widget('window', {
            id:'winServiceViewHis'+page,
            layout       : 'fit',
            constrain    : true,
            width: 800,
            height:Ext.getBody().getViewSize().height*0.99,
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
                    xtype : 'panel',
                    layout: {
                        type: 'vbox',
                        align : 'stretch',
                        pack  : 'start',
                    },
                    border:false,
                    items:[
                        grid_material_blocked_detail,
                        {
                            margin: '0 0 0 0',
                            border:false,
                            padding : '1 1 1 1',
                            flex: 1,
                            layout: {
                                type: 'hbox',
                                pack: 'start',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'grid',
                                    title:'Characteristic New',
                                    padding : '1 1 1 1',
                                    columns:[
                                        {
                                            xtype:'rownumberer',
                                            header: 'No',
                                            width:50,
                                            sortable: true,
                                        },
                                        {
                                            header: 'Characteristic',
                                            dataIndex: 'characteristics',
                                            autoSizeColumn:true,
                                            // align: 'center',
                                            flex: 2
                                        },
                                        {
                                            header: 'Value',
                                            dataIndex: 'nvalue',
                                            align: 'center',
                                            flex: 1
                                        }
                                    ],
                                    store:store_blocked_items_inc_char_new,
                                    flex:1,
                                    bbar:[
                                        Ext.create('Ext.PagingToolbar', {
                                            border:false,
                                            store: store_blocked_items_inc_char_new,
                                            displayInfo: true,
                                            displayMsg: 'Displaying record {0} - {1} of {2}',
                                            emptyMsg: "No records to display"
                                        }),
                                        {
                                            xtype: 'tbfill'
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
                                    listeners: {
                                        beforequery: function(queryEvent, eOpts ,value) {
                                            Ext.Ajax.abortAll();
                                            return true;

                                        },
                                        beforeitemcontextmenu: function(view, record, item, index, e)
                                        {

                                        },
                                        itemclick: function(grid_delivery_order_m, record, item, index, e) {

                                        }
                                    },
                                },
                                {
                                    xtype: 'grid',
                                    title:'Characteristic Old',
                                    padding : '1 1 1 1',
                                    columns:[
                                        {
                                            xtype:'rownumberer',
                                            header: 'No',
                                            width:50,
                                            sortable: true,
                                        },
                                        {
                                            header: 'Characteristic',
                                            dataIndex: 'characteristics',
                                            autoSizeColumn:true,
                                            // align: 'center',
                                            flex: 2
                                        },
                                        {
                                            header: 'Value',
                                            dataIndex: 'nvalue',
                                            align: 'center',
                                            flex: 1
                                        }
                                    ],
                                    store:store_blocked_items_inc_char_old,
                                    flex:1,
                                    bbar:[
                                        Ext.create('Ext.PagingToolbar', {
                                            border:false,
                                            store: store_blocked_items_inc_char_old,
                                            displayInfo: true,
                                            displayMsg: 'Displaying record {0} - {1} of {2}',
                                            emptyMsg: "No records to display"
                                        }),
                                        {
                                            xtype: 'tbfill'
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
                                    listeners: {
                                        beforequery: function(queryEvent, eOpts ,value) {
                                            Ext.Ajax.abortAll();
                                            return true;

                                        },
                                        beforeitemcontextmenu: function(view, record, item, index, e)
                                        {

                                        },
                                        itemclick: function(grid_delivery_order_m, record, item, index, e) {

                                        }
                                    },
                                }
                            ],
                        }
                    ]
                },

            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        // winServiceViewHis.animateTarget = 'btnServiceViewReasonHis'+page;
                        winServiceViewHis.hide();
                    }
                }
            ],
        });

        /////////////////////////////////////////////////
        // Window Service View Notes Revision History //
        ////////////////////////////////////////////////
        var winServiceViewReasonHis = Ext.widget('window', {
            id:'winServiceViewReasonHis'+page,
            layout       : 'fit',
            constrain    : true,
            width: 800,
            height:Ext.getBody().getViewSize().height*0.99,
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
                // grid_material_view_reasonHis
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        // winServiceViewHis.animateTarget = 'btnServiceViewReasonHis'+page;
                        winServiceViewReasonHis.hide();
                    }
                }
            ],
        });

        var main_content = {
            id: MainTabId,
            ui: 'blue-panel',
            title: 'Blocked '+title,
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
                                                    layout: 'fit',
                                                    border:false,
                                                    id:'formAdiitionNewItems'+pageid,
                                                    items:grid_material_request_blocked_m
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
                    // // ==================================================================
                    // // Revision
                    // // ==================================================================
                    winServiceBlocked = Ext.getCmp('winServiceBlocked'+page);
                    if (winServiceBlocked){
                        winServiceBlocked.destroy();
                    }
                    winServiceViewHis = Ext.getCmp('winServiceViewHis'+page);
                    if (winServiceViewHis){
                        winServiceViewHis.destroy();
                    }
                    winServiceViewReasonHis = Ext.getCmp('winServiceViewReasonHis'+page);
                    if (winServiceViewReasonHis){
                        winServiceViewReasonHis.destroy();
                    }


                }
            }

        }

        OpenTab(main_content,MainTabId);
        Ext.getCmp('mainpanel').body.unmask();



    }
});
