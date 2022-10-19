valid_script = true;
 //ROLE = Ext.decode('{"ProcApp":true,"StdApp":true,"RemoveRequestRevision":true,"AddRequestRevision":true,"Plant":true,"RemoveCrossReferences":true,"RemoveFuncLoctaion":true,"StockClass":true,"StockType":true,"UOM":true,"Category":true,"MaterialType":true,"ViewNotes":true,"ApplyChangeMaterial":true,"Cataloguer":true,"AddCrossReferences":true,"MovingType":true,"MaxStock":true,"RemoveMaterial":false,"AddMaterial":false,"AddRequestDeletion":true,"AppRequestDeletion":false,"AddAdditionSubmit":true,"AddFuncLocation":true,"ApproveRevisionReq":false,"INC":true,"MGC":true,"ApprovalRevision":false,"InvButtonCatalogNoHis":false}');
vCatRole ='';
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
// Material Single View //
//////////////////////////

        var MaterialCharacteristicsEditor = false ;
        var MaterialCrossRef = false;
        var MaterialFuncLoc = false;
        var delimiter = ";";
        var sparator  = ":";

//////////////////////////
// Material Group Class //
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
// Material INC //
//////////////////
        var model_revision_material_inc = Ext.define('model_cb_inc', {
            extend: 'Ext.data.Model',
            // fields: ['class_inc_name','class','inc', 'description']
        });
        var store_revision_material_inc = Ext.create('Ext.data.Store', {
            model: model_revision_material_inc,
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
// Material Type //
///////////////////
        var model_revision_material_type = Ext.define('model_revision_material_type', {
            extend: 'Ext.data.Model',//Meta Data Model
        });
        var store_revision_material_type = Ext.create('Ext.data.Store', {
            model: model_revision_material_type,
            // groupField: 'group_header',
            proxy: {
                type: 'ajax',
                // url: 'cb_groupclass.php?',
                url: '/getMaterialType',
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
// Material UOM //
//////////////////
        var model_revision_material_uom = Ext.define('model_revision_material_uom', {
            extend: 'Ext.data.Model',//Meta Data Model
        });

        var store_revision_material_uom = Ext.create('Ext.data.Store', {
            model: model_revision_material_uom,
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
// Material Category //
///////////////////////
        var model_revision_material_category = Ext.define('model_revision_material_category', {
            extend: 'Ext.data.Model',//Meta Data Model
        });

        var store_revision_material_category = Ext.create('Ext.data.Store', {
            model: model_revision_material_category,
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
// Grid Material INC Characteristics Value //
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
                // url: '/getRevisionItemsIncCharacteristicsValue',
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

        store_characteristics_nvalue.load({
            params:{
                start:0,
                limit:25
            }
        });

        var winRevisionCharacteristicValue = Ext.widget('window', {
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
                        itemdblclick: function(grid, record, item, index, e) {
							winRevisionCharacteristicValue.hide();
							if (MaterialCharacteristicsEditor==true) {
								var selModel = grid_revision_material_inc_characteristic.getSelectionModel();
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
                        winRevisionCharacteristicValue.hide();
                    }
                }
            ],
        });


///////////////////////////////////////
// Grid Material INC Characteristics //
///////////////////////////////////////
		function update_desc_from_characteristics()
		{
                            var desc_temp = "";
                            var desclong_temp = "";

                            var namecodeval = Ext.getCmp('material_name_code'+page).getValue();
                            var namecodeval_short = Ext.getCmp('material_short_name_code'+page).getValue();
                            // console.log(namecodeval_short);
                            desc_temp = desc_temp + namecodeval_short ;
                            desclong_temp = desclong_temp + namecodeval_short ;

                            var char_count = store_revision_material_item_char.getCount();

                            if (char_count >= 1) {
                                var nvalue =  [];
                                var valchar =  [];
                                var r = 1;
                                for (i = 0; i < char_count; i++) {
                                    var char = store_revision_material_item_char.getAt(i).data.characteristics.trim();
                                    var val = store_revision_material_item_char.getAt(i).data.nvalue;
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

        var model_revision_material_item_char = Ext.define('model_revision_material_item_char', {
            extend: 'Ext.data.Model',
            fields: ['sequence', 'flag' ,'characteristics', 'nvalue', 'type']
        });
        var store_revision_material_item_char = Ext.create('Ext.data.Store', {
            storeId: 'store_revision_material_item_char'+page,
            id :'store_revision_material_item_char'+page,
            model: model_revision_material_item_char,
            proxy: {
                type: 'ajax',
                // url: 'se_charval.php?',
                url: 'getRevisionItemsIncCharacteristics',//&action=getIncCharacteristic
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

        var grid_revision_material_inc_characteristic = Ext.create('Ext.grid.Panel', {
            title: 'Characteristic',
            region: 'center',
            height:200,
            collapsible:true,
            // width :300,
            anchor:'100%',
            id: 'material_adr_items_char_grid'+page,
            store: store_revision_material_item_char,
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

						grid_revision_material_inc_characteristic.getSelectionModel().select(rowIndex);
						
                        /*store_characteristics_nvalue.each( function (model) {
                         // var nvalue = model.get('nvalue');
                         // Ext.getCmp('nvalue'+page).setValue(nvalue);
                         // console.log( model.get('characteristics') );
                         }); */
                        // console.log(store_characteristics_nvalue.getData().items[0].data);
                        // winRevisionCharacteristicValue.animateTarget = this.id;
                        winRevisionCharacteristicValue.show();
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
                        // maxLength:30,
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
                            return MaterialCharacteristicsEditor;
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
// Grid Material Cross Reference //
///////////////////////////////////
        var model_revision_material_cross_references = Ext.define('model_revision_material_cross_references', {
            extend: 'Ext.data.Model',
            fields: ['flag','refno','old_revision_material_code','manufactur', 'type']
        });
        var store_revision_material_cross_references = Ext.create('Ext.data.Store', {
            storeId: 'store_revision_material_cross_references'+page,
            model: model_revision_material_cross_references,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/getRevisionItemsCrossReferences',//action=getInc
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
        var grid_editor_revision_material_cross_references =  Ext.create('Ext.grid.plugin.RowEditing', {
            licksToMoveEditor: 1,
            autoCancel: true,
            saveBtnText    : "Update",//My Save Button Text&quot;,
            saveBtnIcon: 'add-data',
            cancelBtnText: "Cancel", //Cancel Button Text&quot;,
            clicksToEdit: 2, //this changes from the default double-click activation to single click activation
            errorSummary: false //disables display of validation messages if the row is invalid

        });
        var grid_revision_material_cross_references = Ext.create('Ext.grid.Panel', {
            title: 'Cross References',
            region: 'center',
            collapsible:true,
            store: store_revision_material_cross_references,
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
                    text: 'Old Material Code',
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
                grid_editor_revision_material_cross_references
            ],
            tbar:[
                {
                    xtype:'button',
                    text: 'Add X References',
                    iconCls: 'add-data',
                    id:'btnMaterialRevAddCrossReferences'+page,
                    hidden:!ROLE.AddCrossReferences,
                    disabled:true,
                    handler: function() {
                        var data = [];
                        var order = 1 ;
                        var index = 0 ;
                        // var sequence = 1 ;
                        // var sequence = parseInt(store_revision_material_cross_references.totalCount)+1 ;
                        // Ext.getCmp('sequence'+page).readOnly=true;
                        store_revision_material_cross_references.each(function(r,i){
                            data.push(r.data);
                            order++ ;
                            index++ ;
                        });
                        // Create a model instance
                        var r = Ext.create('model_revision_material_cross_references', {
                            flag :'Insert' ,
                            // sequence : sequence,
                            // inc : Ext.getCmp('detail_inc'+page).getValue() ,
                            // type: 'O',
                        });

                        store_revision_material_cross_references.insert(0, r);
                        grid_editor_revision_material_cross_references.startEdit(r, 0);

                    }
                },
                {
                    xtype:'button',
                    text: 'Remove X References',
                    iconCls: 'row-delete',
                    id:'btnMaterialRevRemoveCrossReferences'+page,
                    hidden:!ROLE.RemoveCrossReferences,
                    disabled:true,
                    handler: function() {
                        var records = grid_revision_material_cross_references.getSelectionModel().getSelection()[0];
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
                                        store_revision_material_cross_references.load({
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
                            // store_revision_material_cross_references.remove(records);
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
        grid_editor_revision_material_cross_references.on({
            scope: this,
            beforeedit: function(roweditor, context) {

            },
            afteredit: function(roweditor, context) {
                var row = grid_revision_material_cross_references.getSelectionModel().getSelection()[0];
                Ext.Ajax.request({
                    scope:this,
                    url: 'UpdateCrossReference',
                    method: 'POST',
                    dataType: 'html',
                    params:{
                        _token : csrf_token,
                        adr_d_items_id: Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                        revision_adr_d_items_id: Ext.getCmp('revision_adr_d_items_id'+page).getValue(),
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
                        store_revision_material_cross_references.load({
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
                if (grid_revision_material_inc_characteristic.getSelectionModel().hasSelection()) {
                    var row = grid_revision_material_inc_characteristic.getSelectionModel().getSelection()[0];
                }
            }
        });

/////////////////////////////////////
// Grid Material Function Location //
/////////////////////////////////////
        var model_revision_material_funloc = Ext.define('model_revision_material_funloc', {
            extend: 'Ext.data.Model',
            fields: ['flag', 'adr_d_items_id','name', 'description']
        });
        var store_revision_material_funloc = Ext.create('Ext.data.Store', {
            storeId: 'funloc_Store',
            model: model_revision_material_funloc,
            proxy: {
                type: 'ajax',
                url: '/getRevisionItemsFuncloc',
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
        var grid_editor_revision_material_funcloc =  Ext.create('Ext.grid.plugin.RowEditing', {
            licksToMoveEditor: 1,
            autoCancel: true,
            saveBtnText    : "Update",//My Save Button Text&quot;,
            saveBtnIcon: 'add-data',
            cancelBtnText: "Cancel", //Cancel Button Text&quot;,
            clicksToEdit: 2, //this changes from the default double-click activation to single click activation
            errorSummary: false //disables display of validation messages if the row is invalid

        });
        var grid_revision_material_funcloc = Ext.create('Ext.grid.Panel', {
            title: 'Functional Locations',
            region: 'center',
            collapsible:true,
            store: store_revision_material_funloc,
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
                grid_editor_revision_material_funcloc
            ],
            tbar:[
                {
                    xtype:'button',
                    text: 'Add FuncLoc',
                    iconCls: 'add-data',
                    id:'btnMaterialRevAddFuncLocation'+page,
                    hidden:!ROLE.AddFuncLocation,
                    disabled:true,
                    handler: function() {
                        var data = [];
                        var order = 1 ;
                        var index = 0 ;
                        store_revision_material_funloc.each(function(r,i){
                            data.push(r.data);
                            order++ ;
                            index++ ;
                        });
                        // Create a model instance
                        var r = Ext.create('model_revision_material_funloc', {
                            flag :'Insert' ,

                        });

                        store_revision_material_funloc.insert(0, r);
                        grid_editor_revision_material_funcloc.startEdit(r, 0);

                    }
                },
                {
                    xtype:'button',
                    text: 'Remove',
                    iconCls: 'row-delete',
                    id:'btnMaterialRevRemoveFuncLocation'+page,
                    hidden:!ROLE.RemoveFuncLoctaion,
                    disabled:true,
                    handler: function() {
                        var records = grid_revision_material_funcloc.getSelectionModel().getSelection()[0];
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
                                        store_revision_material_funloc.load({
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
        grid_editor_revision_material_funcloc.on({
            scope: this,
            beforeedit: function(roweditor, context) {

            },
            afteredit: function(roweditor, context) {
                var row = grid_revision_material_funcloc.getSelectionModel().getSelection()[0];
                Ext.Ajax.request({
                    scope:this,
                    url: 'UpdateFuncLoc',
                    method: 'POST',
                    dataType: 'html',
                    params:{
                        _token : csrf_token,
                        adr_d_items_id: Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                        revision_adr_d_items_id: Ext.getCmp('revision_adr_d_items_id'+page).getValue(),
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
                        store_revision_material_funloc.load({
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
                if (grid_revision_material_inc_characteristic.getSelectionModel().hasSelection()) {
                    var row = grid_revision_material_inc_characteristic.getSelectionModel().getSelection()[0];
                }
            }
        });

//////////////////////////////////
// Windows Material Raw Source  //
//////////////////////////////////

        var winRevisionMaterialRawSource = Ext.widget('window', {
            id:'winRevisionMaterialRawSource'+page,
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
                        winRevisionMaterialRawSource.animateTarget = 'btnMaterialViewRaw'+page;
                        winRevisionMaterialRawSource.hide();
                    }
                }
            ],
        });

        /////////////////////////////////////
        // Windows Grid Material Documents //
        /////////////////////////////////////
        var gridMenuMaterialDocument = Ext.create('Ext.menu.Menu', {
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
                                    var record = grid_revision_material_document.getView().getSelectionModel().getSelection()[0];
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
                                            action:'DeleteMaterialDocument',
                                            id : id,
                                        },
                                        success:function(response, request){
                                            store_revision_material_document.load({
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
        var model_revision_material_document = Ext.define('model_revision_material_document', {
            extend: 'Ext.data.Model',
        });
        var store_revision_material_document = Ext.create('Ext.data.Store', {
            id: 'store_revision_material_document'+page,
            model: model_revision_material_document,
            proxy: {
                type: 'ajax',
                url: '/getRevisionItemsDocument',
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
        var grid_revision_material_document = Ext.create('Ext.grid.Panel', {
            width: 343,
            margin: '0 0 0 0',
            store:store_revision_material_document,
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
                        Ext.getCmp('formMaterialDocumentUplod'+page).getForm().reset();
                        winRevisionDetailMaterialDocument.animateTarget = 'addMatDocument'+page;
                        winRevisionDetailMaterialDocument.show();
                    }
                },
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_revision_material_document,
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
                    gridMenuMaterialDocument.showAt(e.getXY());
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
            winRevisionDetailMaterialDocument = new Ext.Window({
                // title:'Documens Catalog No. '+ Ext.getCmp('material_catalog_no'+page).getValue(),
                id: 'winRevisionDetailMaterialDocument'+page,
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
                        id:'formMaterialDocumentUplod'+page,
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
                                    var formMaterialImagesUplod = Ext.getCmp('formMaterialDocumentUplod'+page);
                                    // console.log(formMaterialImagesUplod);
                                    Ext.MessageBox.show({
                                        msg: 'Saving your data, please wait...',
                                        progressText: 'Saving...',
                                        width:300,
                                        wait:true,
                                        waitConfig: {interval:200},
                                        icon:'ext-mb-download',
                                        animEl: 'buttonID'
                                    });

                                    formMaterialImagesUplod.form.submit({
                                        scope:this,
                                        url: 'ajax.handler.byname.php?name=adr',
                                        method: 'POST',
                                        dataType: 'html',
                                        params:{
                                            action:'SaveMaterialDocument',
                                            adr_d_items_id : Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                                            revision_adr_d_items_id : Ext.getCmp('revision_adr_d_items_id'+page).getValue(),
                                            catalog_no : Ext.getCmp('catalog_no'+page).getValue(),
                                        },
                                        success:function(response, request){
                                            store_revision_material_document.load({
                                                params:{
                                                    start:0,
                                                    limit:25
                                                }
                                            });

                                            Ext.MessageBox.hide();

                                            winRevisionDetailMaterialDocument.hide();

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
                                            // winRevisionDetailMaterialDocument.hide();
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
                                    Ext.getCmp('formMaterialDocumentUplod'+page).getForm().reset();
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
                            winRevisionDetailMaterialDocument.hide();
                        }
                    }
                ],
            });
        var winRevisionMaterialDocument = Ext.widget('window', {
            // title: 'Document'+ Ext.getCmp('catalog_no'+page).getValue(),//+ ,
            id:'winRevisionMaterialDocument'+page,
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
                grid_revision_material_document
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        // frmEFakturRequestShow.animateTarget = 'AddDataM'+page;
                        winRevisionMaterialDocument.hide();
                    }
                }
            ],
        });

//////////////////////////////////
// Windows Grid Material Images //
//////////////////////////////////
        var gridMenuMaterialImages = Ext.create('Ext.menu.Menu', {
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
                                    var record = grid_revision_material_images.getView().getSelectionModel().getSelection()[0];
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
                                            action:'DeleteMaterialImages',
                                            id : id,
                                        },
                                        success:function(response, request){
                                            // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                                            store_revision_material_images.load({
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
        var model_revision_material_images = Ext.define('model_revision_material_document', {
            extend: 'Ext.data.Model',
        });
        var store_revision_material_images = Ext.create('Ext.data.Store', {
            id: 'store_revision_material_images'+page,
            model: model_revision_material_images,
            proxy: {
                type: 'ajax',
                url: '/getRevisionItemsImages',
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
        var grid_revision_material_images = Ext.create('Ext.grid.Panel', {
            width: 343,
            height: 250,
            margin: '0 0 0 0',
            store:store_revision_material_images,
            hideHeaders:true,
            columns:[
                {
                    // xtype:'images',
                    header:'Material Images',
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
                    id:'addMaterialIncImages'+page,
                    hidden:false,
                    handler:function(){
                        winRevisionDetailMaterialImagesSource.animateTarget = 'addMaterialIncImages'+page;
                        winRevisionDetailMaterialImagesSource.show();

                    }
                },
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_revision_material_images,
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
                    gridMenuMaterialImages.showAt(e.getXY());
                },
                itemclick: function(grid_delivery_order_m, record, item, index, e) {

                }
            },
        });
        var winRevisionDetailMaterialImagesSource = new Ext.Window({
            id: 'winRevisionDetailMaterialImagesSource'+page,
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
                    id:'formMaterialImagesUplod'+page,
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
                                var formMaterialImagesUplod = Ext.getCmp('formMaterialImagesUplod'+page);

                                Ext.MessageBox.show({
                                    msg: 'Saving your data, please wait...',
                                    progressText: 'Saving...',
                                    width:300,
                                    wait:true,
                                    waitConfig: {interval:200},
                                    icon:'ext-mb-download',
                                    animEl: 'buttonID'
                                });

                                formMaterialImagesUplod.form.submit({
                                    scope:this,
                                    url: 'ajax.handler.byname.php?name=adr',
                                    method: 'POST',
                                    dataType: 'html',
                                    params:{
                                        action:'SaveMaterialImages',
                                        adr_d_items_id : Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                                        revision_adr_d_items_id : Ext.getCmp('revision_adr_d_items_id'+page).getValue(),
                                        catalog_no : Ext.getCmp('catalog_no'+page).getValue(),
                                        // data_char: data_char,
                                    },
                                    success:function(response, request){
                                        store_revision_material_images.load({
                                            params:{
                                                start:0,
                                                limit:1
                                            }
                                        });

                                        Ext.MessageBox.hide();

                                        winRevisionDetailMaterialImagesSource.hide();

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
                                Ext.getCmp('formMaterialImagesUplod'+page).getForm().reset();
                            }
                        }
                    ]
                },
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        winRevisionDetailMaterialImagesSource.animateTarget = 'addMaterialIncImages'+page;
                        winRevisionDetailMaterialImagesSource.hide();
                    }
                }
            ],
        });
        var winRevisionMaterialImagesSource = Ext.widget('window', {
            id:'winRevisionMaterialImagesSource'+page,
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
            items: [grid_revision_material_images],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        winRevisionMaterialImagesSource.animateTarget = 'btnMaterialViewImages'+page;
                        winRevisionMaterialImagesSource.hide();
                    }
                }
            ],
        });

//////////////////////////////
// Grid Material View Notes //
//////////////////////////////
        var model_revision_material_view_notes = Ext.define('model_revision_material_view_notes', {
            extend: 'Ext.data.Model',
            fields: ['id','adr_d_items_id','user', 'created_at', 'notes']
        });
        var store_revision_material_view_notes = Ext.create('Ext.data.Store', {
            storeId: 'store_revision_material_view_notes'+page,
            model: model_revision_material_view_notes,
            proxy: {
                type: 'ajax',
                url: '/getRevisionItemsViewNotes',
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

        var grid_editor_revision_material_view_notes =  Ext.create('Ext.grid.plugin.RowEditing', {
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
        var grid_revision_material_view_notes = Ext.create('Ext.grid.Panel', {
            width: 343,
            height: 250,
            margin: '0 0 0 0',
            store:store_revision_material_view_notes,
            hideHeaders:false,
            tbar:[
                {
                    xtype: 'button',
                    id: 'btnAddMaterialViewNotes'+page,
                    text: 'Add Note',
                    margin: '0 0 0 10',
                    iconCls:'add-data',
                    handler: function() {
                        // Create a model instance
                        var data = [];
                        var order = 1 ;
                        var index = 0 ;
                        var r = Ext.create('model_revision_material_view_notes', {
                            user: user_name + ' (' + user_level + ')',
                            created_at : new Date(),
                            id:'last_insert_id',
                            // notes:''
                        });
                        store_revision_material_view_notes.insert(index, r);
                        grid_editor_revision_material_view_notes.startEdit(r, 0);
                    }
                },
                {
                    xtype: 'button',
                    id: 'btnRemoveMaterialViewNotes'+page,
                    text: 'Remove Note',
                    margin: '0 0 0 10',
                    iconCls:'row-delete',
                    handler: function() {
                        var record = grid_revision_material_view_notes.getSelectionModel().getSelection()[0];
                        if (record) {
                            store_revision_material_view_notes.remove(record);
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
                grid_editor_revision_material_view_notes,
            ],
            bbar:[
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_revision_material_view_notes,
                    displayInfo: true,
                    displayMsg: 'Displaying record {0} - {1} of {2}',
                    emptyMsg: "No records to display"
                }),
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    id: 'notes_apply',
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
                        var view_notes = Ext.encode(Ext.pluck(store_revision_material_view_notes.data.items, 'data'));
                        parms = [];
                        var updatedRecords = store_revision_material_view_notes.getUpdatedRecords();
                        Ext.each(updatedRecords,function(record){
                            parms.push(record.data);
                        });
                        var newRecords = store_revision_material_view_notes.getNewRecords();
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
                                revision_adr_d_items_id : Ext.getCmp('revision_adr_d_items_id'+page).getValue(),
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

                                store_revision_material_view_notes.proxy.extraParams = {
                                    filter: Ext.encode(filters),
                                    action:'getViewNotes'
                                };
                                store_revision_material_view_notes.load({
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
                    // gridMenuMaterialImages.showAt(e.getXY());
                },
                itemclick: function(grid_delivery_order_m, record, item, index, e) {

                }
            },
        });


        var winRevisionMaterialViewNotes = Ext.widget('window', {
            id:'winRevisionMaterialViewNotes'+page,
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
                grid_revision_material_view_notes
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        winRevisionMaterialViewNotes.animateTarget = 'btnMaterialViewNotes'+page;
                        winRevisionMaterialViewNotes.hide();
                    }
                }
            ],
        });


        ///////////////////////////////
        // Store Material Catalog M //
        //////////////////////////////
        var model_revision_material_catalog_m = Ext.define('model_revision_material_catalog_m', {
            extend: 'Ext.data.Model',
        });
        var store_revision_material_catalog_m = Ext.create('Ext.data.Store', {
            storeId: 'funloc_Store',
            model: model_revision_material_catalog_m,
            proxy: {
                type: 'ajax',
                url: '/getRevisionCatalogM',
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
            value:  'Material',
            property: "transaction_type",
            type: "string",
        });
        filters.push(transaction_type['initialConfig']) ;
        store_revision_material_catalog_m.proxy.extraParams = {
            // action:'getCatalogM',
        };
        store_revision_material_catalog_m.load({
            params:{
                filter: Ext.encode(filters),
            }
        });

        //////////////////////
        // Material Status Style //
        //////////////////////
        function RevisionMaterialStatusStyle(){
            var record = store_revision_material_catalog_m.getData().items[0];
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
                case (record.data.item_status === "BLOCKED"):
                case (record.data.item_status === "DELETION"):
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

        ////////////////////////
        // Material Read Only //
        ////////////////////////
        function MaterialReadOnly(value){

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
        function RevisionMaterialWorkFlow(){
            RevisionMaterialStatusStyle();
            var record = store_revision_material_catalog_m.getData().items[0];
            var str = record.data.item_status;
            var item_status = str.substring(0, 8);
            var std_app_category = "Std App "+record.data.category ;
            readOnly = true;
            MaterialCharacteristicsEditor = false ;
            MaterialRevisionChanges = false;
            MaterialApproveRevision= false;
            MaterialCrossRef = false;
            MaterialFuncLoc = false;
            switch(true ){
                case (record.data.item_status === "ON PROCESS"):
                case (record.data.item_status === "BLOCKED"):
                case (record.data.item_status === "ORIGIN"):
                case (item_status === "REVISION"):
                    ////////////////
                    //Status User //
                    ////////////////
                    if(record.data.status_user === 1){

                        Ext.get('MaterialRibbonUser'+page).removeCls('RibbonGrey');
                        Ext.get('MaterialRibbonUser'+page).removeCls('RibbonYellow');
                        Ext.get('MaterialRibbonUser'+page).removeCls('RibbonRed');
                        Ext.get('MaterialRibbonUser'+page).removeCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonUser'+page).addCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonCat'+page).addCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonStdApp'+page).addCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonProccApp'+page).addCls('RibbonRed');

                        readOnly = true;
                        MaterialCharacteristicsEditor = false ;
                        MaterialRevisionChanges = true;
                        MaterialApproveRevision= true;
                        MaterialCrossRef = true;
                        MaterialFuncLoc = true;
                        if (company_code === record.data.company_code ){
                            MaterialCrossRef = false;
                            MaterialFuncLoc = false;
                        }


                        if (company_code === record.data.company_code && user_level === "Cat") {
                            readOnly = true;
                            MaterialCharacteristicsEditor = false ;
                            MaterialRevisionChanges = false;
                            MaterialApproveRevision= false;
                            Ext.getCmp('material_cataloguer'+page).setReadOnly(false);
                            Ext.getCmp('material_cataloguer'+page).focus();
                        }


                    }else{

                        if (company_code === record.data.company_code ) {
                            readOnly = false;
                            MaterialCharacteristicsEditor = true ;
                            MaterialRevisionChanges = false;
                            MaterialFuncLoc = false;
                            MaterialApproveRevision= false;
                        }

                        Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonGrey');
                        Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonYellow');
                        Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonUser'+page).addCls('RibbonRed');

                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonGrey');
                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonYellow');
                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonCat'+page).addCls('RibbonRed');

                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonStdApp'+page).addCls('RibbonRed');

                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonProccApp'+page).addCls('RibbonRed');
                    }

                    if(record.data.status_cat === 1 && record.data.status_user === 1){
                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonGrey');
                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonYellow');
                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonCat'+page).addCls('RibbonGreen');
                        readOnly = true;
                        MaterialCharacteristicsEditor = false ;
                        MaterialRevisionChanges = true;
                        MaterialApproveRevision= true;
                        if(user_level === std_app_category ){
                            Ext.getCmp('material_std_approval'+page).setReadOnly(false);
                            Ext.getCmp('material_std_approval'+page).focus();
                            MaterialRevisionChanges = false;
                            MaterialApproveRevision= false;
                        }



                        Ext.getCmp('material_cataloguer'+page).setReadOnly(readOnly);
                        Ext.getCmp('material_cataloguer'+page).focus();
                    }else{
                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonGrey');
                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonYellow');
                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonCat'+page).addCls('RibbonRed');
                    }

                    if(record.data.status_stdapp === 1 && record.data.status_user === 1){
                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonStdApp'+page).addCls('RibbonGreen');
                        readOnly = true;
                        MaterialCharacteristicsEditor = false ;
                        MaterialRevisionChanges = true;
                        MaterialApproveRevision = true;

                        Ext.getCmp('material_std_approval'+page).setReadOnly(readOnly);
                        Ext.getCmp('material_std_approval'+page).focus();

                        if(user_level === "Proc"){
                            Ext.getCmp('material_proc_approver'+page).setReadOnly(false);
                            Ext.getCmp('material_proc_approver'+page).focus();
                            MaterialRevisionChanges = false;
                            MaterialApproveRevision = false;
                        }

                    }else{
                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonStdApp'+page).addCls('RibbonRed');
                    }

                    if(record.data.status_proc === 1 && record.data.status_user === 1){
                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonProccApp'+page).addCls('RibbonGreen');

                        readOnly = true;
                        MaterialCharacteristicsEditor = false ;
                        MaterialRevisionChanges = true;
                        MaterialApproveRevision = true;

                        Ext.getCmp('material_proc_approver'+page).setReadOnly(readOnly);
                        Ext.getCmp('material_proc_approver'+page).focus();

                        if(user_level === "Proc" && record.data.status_sap === 0){
                            Ext.getCmp('sap_material_code'+page).setReadOnly(false);
                            Ext.getCmp('sap_material_code'+page).focus();
                            MaterialRevisionChanges = false;
                            MaterialApproveRevision = false;
                        }

                    }else{
                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonProccApp'+page).addCls('RibbonRed');
                    }

                    Ext.getCmp('reason'+page).setReadOnly(false);
                    Ext.getCmp('reason'+page).focus();

                    Ext.getCmp('material_inc'+page).setReadOnly(readOnly);
                    Ext.getCmp('material_inc'+page).focus();

                    Ext.getCmp('material_mgc'+page).setReadOnly(readOnly);
                    Ext.getCmp('material_mgc'+page).focus();

                    // Ext.getCmp('material_type'+page).setReadOnly(readOnly);
                    // Ext.getCmp('material_type'+page).focus();

                    Ext.getCmp('material_uom'+page).setReadOnly(readOnly);
                    Ext.getCmp('material_uom'+page).focus();

                    Ext.getCmp('material_category'+page).setReadOnly(readOnly);
                    Ext.getCmp('material_category'+page).focus();

                    // Ext.getCmp('btnMaterialAddCrossReferences'+page).setDisabled(MaterialCrossRef);
                    // Ext.getCmp('btnMaterialRemoveCrossReferences'+page).setDisabled(MaterialCrossRef);

                    Ext.getCmp('material_refno'+page).setReadOnly(MaterialCrossRef);
                    Ext.getCmp('old_material_code'+page).setReadOnly(MaterialCrossRef);

                    Ext.getCmp('material_manufactur'+page).setReadOnly(MaterialCrossRef);
                    Ext.getCmp('material_cross_references_type'+page).setReadOnly(MaterialCrossRef);

                    // Ext.getCmp('btnMaterialAddFuncLocation'+page).setDisabled(MaterialFuncLoc);
                    // Ext.getCmp('btnMaterialRemoveFuncLocation'+page).setDisabled(MaterialFuncLoc);

                    Ext.getCmp('material_func_loc_name'+page).setReadOnly(MaterialFuncLoc);
                    Ext.getCmp('material_func_loc_description'+page).setReadOnly(MaterialFuncLoc);

                    Ext.getCmp('btnRevisionRequest'+page).setDisabled(MaterialRevisionChanges);
                    // Ext.getCmp('btnRevisionRequest'+page).setVisible(false);

                    Ext.getCmp('btnApprovalRevision'+page).setDisabled(MaterialApproveRevision);
                    // Ext.getCmp('btnApprovalRevision'+page).setVisible(false);

                    break;
                default:
                    Ext.getCmp('MaterialRibbonUser'+page).addCls('RibbonRed');
                    Ext.getCmp('MaterialRibbonCat'+page).addCls('RibbonRed');
                    Ext.getCmp('MaterialRibbonStdApp'+page).addCls('RibbonRed');
                    Ext.getCmp('MaterialRibbonProccApp'+page).addCls('RibbonRed');
                    break;

            }

        }

        ////////////////////////////
        // SearchRevisionMaterialCatalogNo //
        ////////////////////////////
        function SearchRevisionMaterialCatalogNo(){
            var val = Ext.getCmp('catalog_no'+page).getValue();
            Ext.getCmp('form_revision_material'+page).mask("loading material item...");
            if(val){
                Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonGrey');
                Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonYellow');
                Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonGreen');
                Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonRed');
                Ext.getCmp('MaterialRibbonUser'+page).addCls('RibbonGrey');

                Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonGrey');
                Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonYellow');
                Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonGreen');
                Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonRed');
                Ext.getCmp('MaterialRibbonCat'+page).addCls('RibbonGrey');

                Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonGrey');
                Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonYellow');
                Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonGreen');
                Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonRed');
                Ext.getCmp('MaterialRibbonStdApp'+page).addCls('RibbonGrey');

                Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonGrey');
                Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonYellow');
                Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonGreen');
                Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonRed');
                Ext.getCmp('MaterialRibbonProccApp'+page).addCls('RibbonGrey');

                Ext.getCmp('reason'+page).setReadOnly(true);
                Ext.getCmp('reason'+page).reset();

                Ext.getCmp('material_inc'+page).setReadOnly(true);
                Ext.getCmp('material_inc'+page).reset();
                Ext.getCmp('material_inc'+page).allowBlank = true;
                store_revision_material_inc.removeAll();

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
                    value:  'Material',
                    property: "transaction_type",
                    type: "string",
                });
                filters.push(transaction_type['initialConfig']) ;
                store_revision_material_catalog_m.proxy.extraParams = {
                    _token : csrf_token,
                    action:'getRevisionCatalogM',
                };
                store_revision_material_catalog_m.reload({
                    params:{
                        _token : csrf_token,
                        filter: Ext.encode(filters),
                    },
                    callback : function(records, operation, success) {
                        if(success){
                            var record = records[0];
                            if(store_revision_material_catalog_m.getCount() > 0){
                                Ext.getCmp('form_revision_material'+page).unmask();
                                Ext.getCmp('catalog_no'+page).setValue(record.data.catalog_no);
                                Ext.getCmp('items_is_active'+page).setValue(record.data.items_is_active);
                                Ext.getCmp('material_raw'+page).setValue(record.data.raw);
                                // Ext.getCmp('btnMaterialViewDocument'+page).setDisabled(false);
                                // Ext.getCmp('btnMaterialViewRaw'+page).setDisabled(false);
                                // Ext.getCmp('btnMaterialViewImages'+page).setDisabled(false);
                                // Ext.getCmp('btnMaterialViewNotes'+page).setDisabled(false);
                                Ext.getCmp('material_adr_m_id'+page).setValue(record.data.adr_m_id);
                                Ext.getCmp('material_adr_d_items_id'+page).setValue(record.data.adr_d_items_id);
                                Ext.getCmp('revision_adr_d_items_id'+page).setValue(record.data.revision_adr_d_items_id);
                                Ext.getCmp('material_adr_status'+page).setValue(record.data.adr_status);
                                Ext.getCmp('material_item_status' + page).setValue(record.data.item_status);
                                /*if(record.data.revision_adr_d_items_id) {
                                    Ext.getCmp('material_item_status' + page).setValue(record.data.revision_item_status);
                                }else{
                                    Ext.getCmp('material_item_status' + page).setValue(record.data.item_status);
                                }*/
                                Ext.getCmp('sap_material_code'+page).setValue(record.data.sap_material_code);
                                Ext.getCmp('sap_material_code_by_id'+page).setValue(record.data.sap_material_code_by_id);
                                Ext.getCmp('sap_material_code_date'+page).setValue(record.data.sap_material_code_date);

                                

                                // Ext.getCmp('material_inc'+page).setValue(record.data.inc);
                                // Ext.getCmp('material_inc'+page).focus();
                                var filters_inc = [];
                                var combo_inc_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record.data.inc,
                                    property: "inc",
                                    type: "string",
                                });
                                filters_inc.push(combo_inc_filter['initialConfig']) ;
                                store_revision_material_inc.proxy.extraParams = {
                                    _token : csrf_token,
                                    filter: Ext.encode(filters_inc),
                                };
                                store_revision_material_inc.load();
                                Ext.ComponentQuery.query('#material_inc'+page)[0].setValue(record.data.inc);

                                // Ext.getCmp('material_mgc'+page).setValue(record.data.groupclass);
                                // Ext.getCmp('material_mgc'+page).focus();
                                var filters_mgc = [];
                                var groupclassType_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: 'Material',
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
                                Ext.ComponentQuery.query('#material_mgc'+page)[0].setValue(record.data.groupclass);

                                if(record.data.item_name){
                                    Ext.getCmp('material_name_code'+page).setValue(record.data.item_name);
                                }else{
                                    Ext.getCmp('material_name_code'+page).setValue(record.data.inc_name_code);
                                }
                                Ext.getCmp('material_short_name_code'+page).setValue(record.data.short_name_code);
                                Ext.getCmp('material_short_description'+page).setValue(record.data.short_description);
                                Ext.getCmp('material_long_description'+page).setValue(record.data.long_description);

                                // Ext.getCmp('material_type'+page).setValue(record.data.material_type);
                                // Ext.getCmp('material_type'+page).focus();
                                var filters_material_type = [];
                                var entity_name = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: 'material_type',
                                    property: "entity_name",
                                    type: "string",
                                });

                                filters_material_type.push(entity_name['initialConfig']) ;

                                var MaterialTypeFilter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record.data.material_type,
                                    property: "code",
                                    type: "string",
                                });
                                filters_material_type.push(MaterialTypeFilter['initialConfig']) ;
                                store_revision_material_type.proxy.extraParams = {
                                    filter: Ext.encode(filters_material_type),
                                };
                                store_revision_material_type.load();
                                Ext.ComponentQuery.query('#material_type'+page)[0].setValue(record.data.material_type);

                                // Ext.getCmp('material_uom'+page).setValue(record.data.uom);
                                // Ext.getCmp('material_uom'+page).focus();
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
                                store_revision_material_uom.proxy.extraParams = {
                                    filter: Ext.encode(filters_uom_filter),
                                };
                                store_revision_material_uom.load();
                                Ext.ComponentQuery.query('#material_uom'+page)[0].setValue(record.data.uom);
                                Ext.getCmp('material_uom'+page).focus();

                                // Ext.getCmp('material_category'+page).setValue(record.data.category);
                                // Ext.getCmp('material_category'+page).focus();
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
                                    value: 'itemcategory',
                                    property: "entity_name",
                                    type: "string",
                                });
                                filters_category.push(entity_name['initialConfig']) ;
                                store_revision_material_category.proxy.extraParams = {
                                    filter: Ext.encode(filters_category),
                                };
                                store_revision_material_category.load();
                                Ext.ComponentQuery.query('#material_category'+page)[0].setValue(record.data.category);

vCatRole =record.data.category;
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
								Ext.getCmp('material_userid'+page).setValue(record.data.user_name);
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
                                    value: record.data.revision_adr_d_items_id,
                                    property: "revision_adr_d_items_id",
                                    type: "string",
                                });

                                var adr_d_items_id_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                                    property: "adr_d_items_id",
                                    type: "string",
                                });

                                if(isEmpty(record.data.revision_adr_d_items_id) == false){
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

                                store_revision_material_item_char.proxy.extraParams = {
                                    _token : csrf_token,
                                    inc_m_id : record.data.inc_m_id,
                                    adr_d_items_id : record.data.adr_d_items_id,
                                    revision_adr_d_items_id : record.data.revision_adr_d_items_id,
                                };
                                store_revision_material_item_char.load({
                                    params:{
                                        start:0,
                                        limit:300,

                                    }
                                });

                                var filters_reason = [];
                                var table_name = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: 'revision_adr_d_items',
                                    property: "table_name",
                                    type: "string",
                                });
                                filters_reason.push(table_name['initialConfig']) ;
                                var table_id = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record.data.revision_adr_d_items_id ? record.data.revision_adr_d_items_id :0,
                                    property: "table_id",
                                    type: "numeric",
                                });
                                filters_reason.push(table_id['initialConfig']) ;

                                store_revision_material_reason.proxy.extraParams = {
                                    _token : csrf_token,
                                    filter: Ext.encode(filters_reason),
                                };
                                store_revision_material_reason.load({
                                    params:{
                                        start:0,
                                        limit:300,

                                    }
                                });

                                var revId = Ext.getCmp('revision_adr_d_items_id'+page).getValue();

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
                                        value: record.data.revision_adr_d_items_id,
                                        property: "revision_adr_d_items_id",
                                        type: "numeric",
                                    });
                                }

                                filters.push(id_filter['initialConfig']) ;

                                store_revision_material_cross_references.proxy.extraParams = {
                                    _token : csrf_token,
                                    filter: Ext.encode(filters),
                                    revision_adr_d_items_id : record.data.revision_adr_d_items_id,
                                };

                                store_revision_material_cross_references.load({
                                    params:{
                                        start:0,
                                        limit:300,
                                    }
                                });

                                store_revision_material_funloc.proxy.extraParams = {
                                    _token : csrf_token,
                                    filter: Ext.encode(filters),
                                    revision_adr_d_items_id : record.data.revision_adr_d_items_id,
                                };

                                store_revision_material_funloc.load({
                                    params:{
                                        start:0,
                                        limit:300,

                                    },

                                });
                                store_revision_material_view_notes.proxy.extraParams = {
                                    _token : csrf_token,
                                    filter: Ext.encode(filters),
                                    revision_adr_d_items_id : record.data.revision_adr_d_items_id,
                                };
                                store_revision_material_view_notes.load({
                                    params:{
                                        start:0,
                                        limit:300,

                                    }
                                });
                                RevisionMaterialWorkFlow();
                            }else{
                                store_revision_material_item_char.removeAll();
                                store_revision_material_cross_references.removeAll();
                                store_revision_material_funloc.removeAll();
                                store_revision_material_reason.removeAll();

                                // var filters_reason = [];
                                // var table_name = new Ext.util.Filter({
                                //     operator: 'eq',
                                //     value: 'revision_adr_d_items',
                                //     property: "table_name",
                                //     type: "string",
                                // });
                                // filters_reason.push(table_name['initialConfig']) ;
                                // var table_id = new Ext.util.Filter({
                                //     operator: 'eq',
                                //     value: 0,
                                //     property: "table_id",
                                //     type: "numeric",
                                // });
                                // filters_reason.push(table_id['initialConfig']) ;

                                // store_revision_material_reason.proxy.extraParams = {
                                //     _token : csrf_token,
                                //     filter: Ext.encode(filters_reason),
                                // };
                                // store_revision_material_reason.load({
                                //     params:{
                                //         start:0,
                                //         limit:300,

                                //     }
                                // });

                                // 

                                // Ext.getCmp('btnMaterialViewDocument'+page).setDisabled(true);
                                // Ext.getCmp('btnMaterialViewRaw'+page).setDisabled(true);
                                // Ext.getCmp('btnMaterialViewImages'+page).setDisabled(true);
                                // Ext.getCmp('btnMaterialViewNotes'+page).setDisabled(true);

                                Ext.getCmp('material_adr_status'+page).setValue('');
                                Ext.getCmp('material_item_status'+page).setValue('');

                                Ext.Msg.show({
                                    title   : 'Data Search',
                                    msg     : 'No Record Found',
                                    buttons : Ext.Msg.OK,
                                    // iconCls : 'warningMessage',
                                    icon :  Ext.MessageBox.INFO,
                                });
                                Ext.getCmp('form_revision_material'+page).unmask();

                                Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonGrey');
                                Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonYellow');
                                Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonGreen');
                                Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonRed');
                                Ext.getCmp('MaterialRibbonUser'+page).addCls('RibbonGrey');

                                Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonGrey');
                                Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonYellow');
                                Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonGreen');
                                Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonRed');
                                Ext.getCmp('MaterialRibbonCat'+page).addCls('RibbonGrey');

                                Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonGrey');
                                Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonYellow');
                                Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonGreen');
                                Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonRed');
                                Ext.getCmp('MaterialRibbonStdApp'+page).addCls('RibbonGrey');

                                Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonGrey');
                                Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonYellow');
                                Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonGreen');
                                Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonRed');
                                Ext.getCmp('MaterialRibbonProccApp'+page).addCls('RibbonGrey');

                                Ext.getCmp('MaterialRibbonSAP'+page).removeCls('RibbonGrey');
                                Ext.getCmp('MaterialRibbonSAP'+page).removeCls('RibbonYellow');
                                Ext.getCmp('MaterialRibbonSAP'+page).removeCls('RibbonGreen');
                                Ext.getCmp('MaterialRibbonSAP'+page).removeCls('RibbonRed');
                                Ext.getCmp('MaterialRibbonSAP'+page).addCls('RibbonGrey');

                                form_revision_material.getForm().getFields().each (function (field) {
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
                Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonGrey');
                Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonYellow');
                Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonGreen');
                Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonRed');
                Ext.getCmp('MaterialRibbonUser'+page).addCls('RibbonGrey');

                Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonGrey');
                Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonYellow');
                Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonGreen');
                Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonRed');
                Ext.getCmp('MaterialRibbonCat'+page).addCls('RibbonGrey');

                Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonGrey');
                Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonYellow');
                Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonGreen');
                Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonRed');
                Ext.getCmp('MaterialRibbonStdApp'+page).addCls('RibbonGrey');

                Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonGrey');
                Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonYellow');
                Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonGreen');
                Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonRed');
                Ext.getCmp('MaterialRibbonProccApp'+page).addCls('RibbonGrey');

                Ext.Msg.show({
                    title   : 'Data Search',
                    msg     : 'Catalog No Can Not Be Empty',
                    buttons : Ext.Msg.OK,
                    // iconCls : 'warningMessage',
                    icon :  Ext.MessageBox.INFO,
                });
                Ext.getCmp('form_revision_material'+page).unmask();
                // CheckMaterialMRP(0);
            }
        }

        ////////////////////////////
        // Material Catalog Field //
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
                SearchRevisionMaterialCatalogNo();
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
// Combo Twin Trigger Material //
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
                            window['catalog_no'+me.name] = new Ext.util.Filter({
                                operator: 'eq',
                                value: Ext.getCmp('catalog_no'+page).getValue(),
                                property: "catalog_no",
                                type: "string",
                            });
                            window['filter'+me.name].push(window['catalog_no'+me.name]['initialConfig']) ;

                            window['store_history_'+me.id].proxy.extraParams = {
                                filter: Ext.encode(window['filter'+me.name]),
                            };
                            window['store_history_'+me.id].load({
                                params:{

                                }
                            });

                            window['winHistory'+winHistoryId] = new  Ext.Window({
                                // title: 'Form Request For Revision',
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
                                                header:'Old Value',
                                                dataIndex:me.name
                                            },
                                            {
                                                header:'Description',
                                                dataIndex:'description'
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
        var model_revision_material_reason = Ext.define('model_revision_material_reason', {
            extend: 'Ext.data.Model',
            // fields: ['class_inc_name','class','inc', 'description']
        });
        var store_revision_material_reason = Ext.create('Ext.data.Store', {
            storeId: 'store_revision_material_reason'+page,
            model: model_revision_material_reason,
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

        var store_revision_material_reason_view = Ext.create('Ext.data.Store', {
            storeId: 'store_revision_material_reason_view'+page,
            model: model_revision_material_reason,
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

        var grid_revision_material_reason = Ext.create('Ext.grid.Panel', {
            title: 'Reason',
            // region: 'center',
            height:200,
            // collapsible:true,
            // width :300,
            anchor:'75%',
            id: 'grid_revision_material_reason'+page,
            store: store_revision_material_reason,
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
        // Form Material Single View //
        //////////////////////////////
        var form_revision_material = Ext.create('Ext.form.Panel', {
            height:550,
            autoHeight:true,
            layout:'border',
            id:'form_revision_material'+page,
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
                            title: 'Material Item',
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
                                                            SearchRevisionMaterialCatalogNo();
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
                                            id:'btnMaterialViewRaw'+page,
                                            disabled:true,
                                            handler: function() {
                                                winMaterialRawSource.animateTarget = 'btnMaterialViewRaw'+page;
                                                winMaterialRawSource.show();
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            margin: '3 3 3 0',
                                            iconCls:'browse',
                                            text: 'Document',
                                            id:'btnMaterialViewDocument'+page,
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
                                                store_revision_material_document.proxy.extraParams = {
                                                    filter: Ext.encode(filters),
                                                    action:'getMaterialDocument'
                                                };
                                                store_revision_material_document.load({
                                                    params:{
                                                        start:0,
                                                        limit:25
                                                    }
                                                });
                                                winMaterialDocument.animateTarget = 'btnMaterialDocument'+page;
                                                Ext.getCmp('winMaterialDocument'+page).setTitle("Documents Catalog No. "+ Ext.getCmp('catalog_no'+page).getValue());
                                                winMaterialDocument.show();

                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            margin: '3 3 3 0',
                                            iconCls:'browse',
                                            text: 'Image',
                                            id:'btnMaterialViewImages'+page,
                                            disabled:true,
                                            handler: function() {
                                                winMaterialImagesSource.animateTarget = 'btnMaterialViewImages'+page;
                                                Ext.getCmp('winMaterialImagesSource'+page).setTitle("Images Catalog No. "+ Ext.getCmp('catalog_no'+page).getValue());
                                                winMaterialImagesSource.show();
                                                var filters = [];
                                                var inc_filter = new Ext.util.Filter({
                                                    operator: 'eq',
                                                    value: Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                                                    property: "adr_d_items_id",
                                                    type: "numeric",
                                                });
                                                filters.push(inc_filter['initialConfig']) ;
                                                store_revision_material_images.proxy.extraParams = {
                                                    filter: Ext.encode(filters),
                                                    action:'getMaterialImages'
                                                };
                                                store_revision_material_images.load({
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
                                            id: 'revision_adr_d_items_id'+page,
                                            name:'revision_adr_d_items_id',
                                            width: 350,
                                            editable: true,
                                            value: '',
                                            readOnly:true,
                                            hidden:true
                                        },
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'SAP Material Code.',
                                            maxLength:18,
                                            labelWidth:130,
                                            width: 350,
                                            id: 'sap_material_code'+page,
                                            name:'sap_material_code',
                                            editable: true,
                                            value: '',
                                            readOnly:true,
                                            // hidden:!ROLE.SAPMaterialCode,
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
                                            forceSelection: true,
                                            mode: 'remote',
                                            triggerAction: 'all',
                                            emptyText: 'Select INC ...',
                                            selectOnFocus: true,
                                            itemId: 'material_inc'+page,
                                            id: 'material_inc'+page,
                                            name: 'inc',
                                            displayField: 'inc',
                                            valueField: 'inc',
                                            minChars: 0,
                                            store: store_revision_material_inc,
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
                                                        value: 'Material',
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
                                                    store_revision_material_inc.proxy.extraParams = {
                                                        filter: Ext.encode(filters),
                                                        // action: 'getIncByMGC'
                                                    };
                                                    store_revision_material_inc.load({
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
                                                    var matching = store_revision_material_inc.queryBy(
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

                                                                store_revision_material_item_char.proxy.extraParams = {
                                                                    _token : csrf_token,
                                                                    /*filter: Ext.encode(filters),
                                                                    action:'getAdrItemsChar',
                                                                    adr_d_items_id: Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                                                                    sort: Ext.encode(sorters),*/
                                                                    inc_m_id:record.data.id,
                                                                    revision_adr_d_items_id: Ext.getCmp('revision_adr_d_items_id'+page).getValue(),
                                                                    sort: Ext.encode(sorters),
                                                                };

                                                                store_revision_material_item_char.load({
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
                                                                    value: 'Material',
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
                                            emptyText: 'Select MGC ...',
                                            selectOnFocus: true,
                                            itemId:'material_mgc'+page,
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
                                                        value: 'Material',
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
                                            fieldLabel:'Material Type',
                                            labelWidth: 130,
                                            width: 270,
                                            matchFieldWidth: false,
                                            forceSelection: true,
                                            name: 'material_type',
                                            displayField: 'code',
                                            valueField: 'code',
                                            store: store_revision_material_type,
                                            pageSize: 15,
                                            minChars : 0,
                                            margin: '3 3 3 0',
                                            disabled:false,
                                            mode: 'remote',
                                            triggerAction: 'all',
                                            emptyText: 'Select Material Type ...',
                                            selectOnFocus: true,
                                            itemId:'material_type'+page,
                                            id:'material_type'+page,
                                            listConfig: {
                                                loadingText: 'Searching...',
                                                emptyText: 'No matching data found!',
                                                getInnerTpl: function() {
                                                    return '{entity_code_name}';
                                                }
                                            },
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

                                                    var MaterialTypeFilter = new Ext.util.Filter({
                                                        operator: 'like',
                                                        value: queryEvent.query.toLowerCase(),
                                                        property: "code",
                                                        type: "string",
                                                    });
                                                    if(queryEvent.query.toLowerCase()){
                                                        filters.push(MaterialTypeFilter['initialConfig']) ;
                                                    }
                                                    store_revision_material_type.proxy.extraParams = {
                                                        filter: Ext.encode(filters),
                                                        action :'getEntity'
                                                    };
                                                    store_revision_material_type.load({
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
                                            },
                                            value: '',
                                            hidden:!ROLE.MaterialType,
                                            readOnly:true


                                        },
                                        {
                                            xtype: 'combotwintrigger',
                                            fieldLabel: 'UOM',
                                            labelWidth: 60,
                                            width: 230,
                                            matchFieldWidth: false,
                                            forceSelection : true,
                                            mode: 'remote',
                                            triggerAction: 'all',
                                            emptyText:'Select UOM ...',
                                            selectOnFocus:false,
                                            margin: '3 3 3 0',
                                            itemId:'material_uom'+ page,
                                            id:'material_uom'+ page,
                                            name:           'uom',
                                            displayField:   'code',
                                            valueField:     'code',
                                            minChars : 0,
                                            store: store_revision_material_uom,
                                            typeAhead: true,
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

                                                    store_revision_material_uom.proxy.extraParams = {
                                                        filter: Ext.encode(filters),
                                                        action :'getEntity'
                                                    };

                                                    store_revision_material_uom.load({
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
                                            xtype: 'combotwintrigger',
                                            // msgTarget: 'side',
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
                                            itemId:'material_category'+ page,
                                            id:'material_category'+ page,
                                            name:           'category',
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
                                            store:store_revision_material_category,
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

                                                    store_revision_material_category.proxy.extraParams = {
                                                        filter: Ext.encode(filters),
                                                        action :'getEntity'
                                                    };

                                                    store_revision_material_category.load({
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
                                            matchFieldWidth: false,
                                            forceSelection : true,
                                            mode: 'remote',
                                            triggerAction: 'all',
                                            emptyText:'Select Cataloguer...',
                                            selectOnFocus:true,
                                            margin: '3 3 3 0',
                                            itemId:'material_cataloguer'+ page,
                                            id:'material_cataloguer'+ page,
                                            name:           'cataloguer',
                                            displayField:   'value',
                                            valueField:     'value',
                                            minChars : 0,
                                            store:          Ext.create('Ext.data.Store', {
                                                fields : ['name', 'value'],
                                                data   : [
                                                    {name : 'Validate',   value: 'Validate'},
                                                    {name : 'Not Validate',  value: 'Not Validate'},
                                                    // {name : 'Reject',  value: 'Rejected'},
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
                                            matchFieldWidth: false,
                                            forceSelection : true,
                                            mode: 'remote',
                                            triggerAction: 'all',
                                            emptyText:'Select Std App ...',
                                            selectOnFocus:true,
                                            margin: '3 3 3 0',
                                            itemId:'material_std_approval'+ page,
                                            id:'material_std_approval'+ page,
                                            name:           'std_approval',
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
                                            matchFieldWidth: false,
                                            forceSelection : true,
                                            mode: 'remote',
                                            triggerAction: 'all',
                                            emptyText:'Select Approver ...',
                                            selectOnFocus:true,
                                            margin: '3 3 3 0',
                                            itemId:'material_proc_approver'+ page,
                                            id:'material_proc_approver'+ page,
                                            name:           'proc_approver',
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
                                            fieldLabel: 'Material Owner',
                                            value: ''
                                        },
										  {
                                            xtype:'textfield',
                                            name:'User ID',
                                            id:'material_userid'+page,
                                            hidden:true,
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
                                            id: 'MaterialRibbonUser'+page,
                                            width: 82,
                                            value: 'USER',
                                            style: 'text-align: center;font-color:white;font-weight: bold;',
                                            cls:'RibbonGrey',

                                            // hidden:true,
                                        },
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
                                            id: 'MaterialRibbonStdApp'+page,
                                            width: 82,
                                            value: 'Std App',
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
                                        {
                                            xtype: 'displayfield',
                                            id: 'MaterialRibbonSAP'+page,
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
                                grid_revision_material_reason
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
                            items:[grid_revision_material_inc_characteristic]
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
                            items:[grid_revision_material_cross_references]
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
                            items:[grid_revision_material_funcloc]
                        }
                    ]
                }
            ]

        });
        // --WINDOWS - REVISION
        // =====================================================================
        var winMaterialRevision = new Ext.Window({
            title:'Form Request For Revision',
            id: 'winMaterialRevision'+page,
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
                form_revision_material
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        winMaterialRevision.hide();
                        form_revision_material.getForm().reset();
                        // store_REV.reload();
                        // ResetWindowRevision();
                        // MaterialResetFormWindowBotton();
                    }
                }
            ],
            bbar:[
                '-',
                {
                    xtype: 'tbfill'
                },
                {
                    // xtype:'button',
                    cls: 'x-btn-default-small',
                    margin: '3 3 3 0',
                    text:'Request For Revision',
                    iconCls:'add-data',
                    baseCls: 'buttonStyle',
                    hidden:!ROLE.AddRequestRevision,
                    // hidden:!ROLE.AddRequestRevision?!ROLE.AddRequestRevision:true?!ROLE.AddRequestRevision:true,
                    id:'btnRevisionRequest'+page,
                    disabled:true,
                    handler: function() {
						
					alert('User type :'+usertype);
					alert('User Name :'+username);
					alert('Catagory :'+vCatRole);
					//	('Cat','Proc','Std App M')
					stsproses=0;
					var RecUser = Ext.getCmp('material_userid'+page).getValue();
					
					if (usertype=='Cat' ) { stsproses=1;}
 				    else if ( usertype=='Proc' ) { stsproses=1;}
					else if ( usertype=='Std App M' && vCatRole=='M') { stsproses=1;}
					else if ( usertype=='Std App O' && vCatRole=='O') { stsproses=1;}
					else if ( usertype=='Std App T' && vCatRole=='T') { stsproses=1;}
					else if ( usertype=='Std App I' && vCatRole=='I') { stsproses=1;}
					else if ( usertype=='Std App H' && vCatRole=='H') { stsproses=1;}
					else if ( usertype=='Std App G' && vCatRole=='G') { stsproses=1;}
					else if ( RecUser==username) { stsproses=1;}
											
					if (stsproses==0 ) 
						{ Ext.MessageBox.show({
						   title : 'Message',
							msg:'Ur Not Owner!!' ,
							buttons: Ext.MessageBox.OK,
							icon :  Ext.MessageBox.WARNING
							});
						return true;
					}
                        
						var material_char = Ext.encode(Ext.pluck(store_revision_material_item_char.data.items, 'data'));
                        var inc = Ext.getCmp('material_inc'+page).getValue();
                        var mgc = Ext.getCmp('material_mgc'+page).getValue();
                        var CatApp = Ext.getCmp('material_cataloguer'+page).getValue();
                        var StdApp = Ext.getCmp('material_std_approval'+page).getValue();
                        var ProcApp = Ext.getCmp('material_proc_approver'+page).getValue();
                        var SAPMaterialCode = Ext.getCmp('sap_material_code'+page).getValue();

                        var material_type = Ext.getCmp('material_type'+page).getValue() ;
                        var uom = Ext.getCmp('material_uom'+page).getValue();
                        var category = Ext.getCmp('material_category'+page).getValue() ;

                        if(isEmpty(inc) == true ){
                            Ext.MessageBox.show({
                                title : 'Message',
                                msg:'Please Check Your INC' ,
                                buttons: Ext.MessageBox.OK,
                                icon :  Ext.MessageBox.WARNING
                            });
                            return true;
                        }

                        if(isEmpty(mgc) == true ){
                            Ext.MessageBox.show({
                                title : 'Message',
                                msg:'Please Check Your MGC' ,
                                buttons: Ext.MessageBox.OK,
                                icon :  Ext.MessageBox.WARNING
                            });
                            return true;
                        }

                        if(isEmpty(material_type) == true ){
                            Ext.MessageBox.show({
                                title : 'Message',
                                msg:'Please Check Your Material Type' ,
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

                        
                        if(material_type !== 'ZOEM'){
                            var evts=0;
                            var rprs=0;
                            store_revision_material_item_char.each(function(record) {
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
                                // Ext.getCmp('material_category'+page).allowBlank = true;
                                // Ext.getCmp('material_category'+page).clearValue();
                                // Ext.getCmp('material_updated_by'+page).reset();
                                //
                                // Ext.getCmp('material_cataloguer'+page).setValue();
                                // Ext.getCmp('material_cataloguer_by'+page).reset();
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
                                // Ext.getCmp('material_category'+page).allowBlank = true;
                                // Ext.getCmp('material_category'+page).clearValue();
                                // Ext.getCmp('material_updated_by'+page).reset();
                                //
                                // Ext.getCmp('material_cataloguer'+page).clearValue();
                                // Ext.getCmp('material_cataloguer_by'+page).reset();
                                //
                                // Ext.getCmp('material_std_approval'+page).clearValue();
                                // Ext.getCmp('material_std_approval_by'+page).reset();
                                // tipeProcess = 1;
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
                                if(isEmpty(SAPMaterialCode) == false){
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
                                    // Ext.getCmp('material_category'+page).allowBlank = true;
                                    // Ext.getCmp('material_category'+page).clearValue();
                                    // Ext.getCmp('material_updated_by'+page).reset();
                                    //
                                    // Ext.getCmp('material_cataloguer'+page).clearValue();
                                    // Ext.getCmp('material_cataloguer_by'+page).reset();
                                    //
                                    // Ext.getCmp('material_std_approval'+page).clearValue();
                                    // Ext.getCmp('material_std_approval_by'+page).reset();
                                    //
                                    // Ext.getCmp('material_proc_approver'+page).clearValue();
                                    // Ext.getCmp('material_proc_approver_by'+page).reset();
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


                        form_revision_material.form.submit({
                            scope:this,
                            url: 'RequestItemsRevision',
                            method: 'POST',
                            dataType: 'html',
                            params:{
                                _token : csrf_token,
                                transaction_type : 'Material',
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
                                SearchRevisionMaterialCatalogNo();
                                var filters = [];
                                var transaction_type = new Ext.util.Filter({
                                    operator: 'eq',
                                    value:  'Material',
                                    property: "transaction_type",
                                    type: "string",
                                });
                                filters.push(transaction_type['initialConfig']) ;
                                store_revision_request.proxy.extraParams = {
                                    _token : csrf_token,
                                    filter: Ext.encode(filters),
                                };
                                store_revision_request.load({
                                    params:{
                                    }
                                });

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
                    // LINE END FOR HANDLER
                },
                {
                    // xtype:'button',
                    cls: 'x-btn-default-small',
                    margin: '3 3 3 0',
                    text:'Approval For Revision',
                    iconCls:'add-data',
                    baseCls: 'buttonStyle',
                    // hidden:!ROLE.ApprovalRevision?!ROLE.ApprovalRevision:true?!ROLE.ApprovalRevision:true,
                    hidden:!ROLE.ApprovalRevision,
                    id:'btnApprovalRevision'+page,
                    disabled:true,
                    handler: function() {
                        var material_char = Ext.encode(Ext.pluck(store_revision_material_item_char.data.items, 'data'));

                        var INC = Ext.getCmp('material_inc'+page).getValue();
                        var MGC = Ext.getCmp('material_mgc'+page).getValue();
                        var CatApp = Ext.getCmp('material_cataloguer'+page).getValue();
                        var StdApp = Ext.getCmp('material_std_approval'+page).getValue();
                        var ProcApp = Ext.getCmp('material_proc_approver'+page).getValue();
                        var SAPMaterialCode = Ext.getCmp('sap_material_code'+page).getValue();

                        var material_type = Ext.getCmp('material_type'+page).getValue() ;
                        var uom = Ext.getCmp('material_uom'+page).getValue();
                        var category = Ext.getCmp('material_category'+page).getValue() ;

                        var evts=0;
                        var rprs=0;
                        store_revision_material_item_char.each(function(record) {
                            var type = record.get('type');
                            var nvalue = record.get('nvalue') ;
                            if(type == "M" && isEmpty(nvalue) == true) {
                                if(record.get('nvalue')) rprs+=1;
                                else evts+=1;
                            }
                        });
                        // console.log(grid_material_multiview_m.data.sap_material_code);
                        if(evts > 0 ){
                            Ext.MessageBox.show({
                                title : 'Message',
                                msg:'Please Characteristics Mandatory Check' ,
                                buttons: Ext.MessageBox.OK,
                                icon :  Ext.MessageBox.WARNING
                            });
                            return true;
                        }
                        if(isEmpty(INC) == true){
                            Ext.MessageBox.show({
                                title : 'Message',
                                msg:'Please Mandatory Check INC' ,
                                buttons: Ext.MessageBox.OK,
                                icon :  Ext.MessageBox.WARNING
                            });
                            return true;
                        }
                        if(isEmpty(MGC) == true){
                            Ext.MessageBox.show({
                                title : 'Message',
                                msg:'Please Mandatory Check MGC' ,
                                buttons: Ext.MessageBox.OK,
                                icon :  Ext.MessageBox.WARNING
                            });
                            return true;
                        }
                        if(isEmpty(uom) == true){
                            Ext.MessageBox.show({
                                title : 'Message',
                                msg:'Please Mandatory Check UOM' ,
                                buttons: Ext.MessageBox.OK,
                                icon :  Ext.MessageBox.WARNING
                            });
                            return true;
                        }
                        if(isEmpty(material_type) == true){
                            Ext.MessageBox.show({
                                title : 'Message',
                                msg:'Please Mandatory Check Materiel Type' ,
                                buttons: Ext.MessageBox.OK,
                                icon :  Ext.MessageBox.WARNING
                            });
                            return true;
                        }
                        if(isEmpty(category) == true){
                            Ext.MessageBox.show({
                                title : 'Message',
                                msg:'Please Mandatory Check Category' ,
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
                                // Ext.getCmp('material_category'+page).allowBlank = true;
                                // Ext.getCmp('material_category'+page).clearValue();
                                // Ext.getCmp('material_updated_by'+page).reset();

                                // Ext.getCmp('material_cataloguer'+page).setValue();
                                // Ext.getCmp('material_cataloguer_by'+page).reset();
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
                                // Ext.getCmp('material_category'+page).allowBlank = true;
                                // Ext.getCmp('material_category'+page).clearValue();
                                // Ext.getCmp('material_updated_by'+page).reset();

                                // Ext.getCmp('material_cataloguer'+page).clearValue();
                                // Ext.getCmp('material_cataloguer_by'+page).reset();

                                // Ext.getCmp('material_std_approval'+page).clearValue();
                                // Ext.getCmp('material_std_approval_by'+page).reset();
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
                                if(isEmpty(SAPMaterialCode) == false){
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
                                    // Ext.getCmp('material_category'+page).allowBlank = true;
                                    // Ext.getCmp('material_category'+page).clearValue();
                                    // Ext.getCmp('material_updated_by'+page).reset();

                                    // Ext.getCmp('material_cataloguer'+page).clearValue();
                                    // Ext.getCmp('material_cataloguer_by'+page).reset();

                                    // Ext.getCmp('material_std_approval'+page).clearValue();
                                    // Ext.getCmp('material_std_approval_by'+page).reset();

                                    // Ext.getCmp('material_proc_approver'+page).clearValue();
                                    // Ext.getCmp('material_proc_approver_by'+page).reset();
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


                        form_revision_material.form.submit({
                            scope:this,
                            url: 'ApproveItemsRevision',
                            method: 'POST',
                            dataType: 'html',
                            params:{
                                _token : csrf_token,
                                transaction_type : 'Material',
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
                                SearchRevisionMaterialCatalogNo();
                                var filters = [];
                                var transaction_type = new Ext.util.Filter({
                                    operator: 'eq',
                                    value:  'Material',
                                    property: "transaction_type",
                                    type: "string",
                                });
                                filters.push(transaction_type['initialConfig']) ;
                                store_revision_request.proxy.extraParams = {
                                    _token : csrf_token,
                                    filter: Ext.encode(filters),
                                };
                                store_revision_request.load({
                                    params:{
                                    }
                                });

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
                }
            ]
        });
        // =====================================================================
        // model revision request
        // =====================================================================
        var model_revision_request = Ext.define('model_revision_request', {
            extend: 'Ext.data.Model',
            fields: ['id','adr_no', 'catalog_no', 'sap_material_code', 'real_name','deleted_at', 'updated_at', 'updated_by', 'item_status', 'type_revision']
        });

        var store_revision_request = Ext.create('Ext.data.Store', {
            storeId: 'store_revision_request',
            model: model_revision_request,
            proxy: {
                type: 'ajax',
                url: 'getRevisionRequestM',
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
            value:  'Material',
            property: "transaction_type",
            type: "string",
        });
        filters.push(transaction_type['initialConfig']) ;
        store_revision_request.proxy.extraParams = {
            _token : csrf_token,
            filter: Ext.encode(filters),
        };
        store_revision_request.load({
            params:{
            }
        });
        // =====================================================================
        // --GRIDPANEL - REVISION
        // =====================================================================
        var grid_material_request_revision_m = Ext.create('Ext.grid.Panel', {
            store: store_revision_request,
            layout:'fit',
            margin: '0 0 0 0',
            border:true,
            padding : '1 1 1 1',
            tbar:[
                {
                    // xtype:'button',
                    cls: 'x-btn-default-small',
                    text:'Add Rev RequestX',
                    border:false,
                    iconCls:'add-data',
                    baseCls: 'buttonStyle',
                    hidden:!ROLE.AddRequestRevision,
                    disabled:!ROLE.AddRequestRevision,
                    id:'AddRequestRevision'+page,
                    handler:function(){
                        form_revision_material.getForm().reset();

                        store_revision_material_item_char.removeAll();
                        store_revision_material_cross_references.removeAll();
                        store_revision_material_funloc.removeAll();
                        store_revision_material_reason.removeAll();

                        Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonGrey');
                        Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonYellow');
                        Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonUser'+page).addCls('RibbonGrey');

                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonGrey');
                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonYellow');
                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonCat'+page).addCls('RibbonGrey');

                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonStdApp'+page).addCls('RibbonGrey');

                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonProccApp'+page).addCls('RibbonGrey');
                        winMaterialRevision.animateTarget = 'AddRequestRevision'+page;
                        winMaterialRevision.show();
                    }
                },
                {
                    cls: 'x-btn-default-small',
                    text:'Approve RequestX',
                    border:false,
                    iconCls:'add-data',
                    hidden:!ROLE.ApprovalRevision,
                    disabled:!ROLE.ApprovalRevision,
                    id:'ApprovalRevision'+page,
                    handler:function(){
                        form_revision_material.getForm().reset();

                        store_revision_material_item_char.removeAll();
                        store_revision_material_cross_references.removeAll();
                        store_revision_material_funloc.removeAll();
                        store_revision_material_reason.removeAll();

                        Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonGrey');
                        Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonYellow');
                        Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonUser'+page).removeCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonUser'+page).addCls('RibbonGrey');

                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonGrey');
                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonYellow');
                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonCat'+page).removeCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonCat'+page).addCls('RibbonGrey');

                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonStdApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonStdApp'+page).addCls('RibbonGrey');

                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonGrey');
                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonYellow');
                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonGreen');
                        Ext.getCmp('MaterialRibbonProccApp'+page).removeCls('RibbonRed');
                        Ext.getCmp('MaterialRibbonProccApp'+page).addCls('RibbonGrey');
                        winMaterialRevision.animateTarget = 'AddRequestRevision'+page;
                        winMaterialRevision.show();
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

                // FOR VIEW HISTORY
                {
                    xtype:'actioncolumn',
                    header: 'History',
                    width:50,
                    align: 'center',
                    items: [
                        {
                            icon: 'images/application_view_detail.png',  // Use a URL in the icon config
                            tooltip: 'view reason revision',
                            handler: function(view, rowIndex, colIndex, item, e, record) {
                                var request_no = record.get('request_no');
                                var adr_d_items_id = record.get('adr_d_items_id');
                                var inc_m_id = record.get('inc_m_id');
                                var recordStatusHis = record.get('item_status');
                                var recordRevisionID = record.get('revision_id');
                                var viewInvHistory = "";
                                // console.log(record)
                                // alert(recordValHis);

                                if(record.get('cek_status') ==  0) {

                                    var mess = 'History not yet available !';
                                    Ext.MessageBox.hide();
                                    Ext.MessageBox.show(
                                        {
                                            title: 'Message',
                                            msg: mess,
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.INFO
                                        }
                                    );

                                }else{
                                    var filters = [];
                                    var revision_adr_d_items_id = new Ext.util.Filter({
                                        operator: 'eq',
                                        value:  record.get('id'),
                                        property: "revision_adr_d_items_id",
                                        type: "numeric",
                                    });
                                    filters.push(revision_adr_d_items_id['initialConfig']) ;
                                    store_revision_detail.proxy.extraParams = {
                                        _token : csrf_token,
                                        filter: Ext.encode(filters),
                                    };
                                    store_revision_detail.load({
                                        params:{
                                        }
                                    });

                                    store_revision_items_inc_char_new.proxy.extraParams = {
                                        _token : csrf_token,
                                        filter: Ext.encode(filters),
                                    };
                                    store_revision_items_inc_char_new.load({
                                        params:{
                                        }
                                    });

                                    store_revision_items_inc_char_old.proxy.extraParams = {
                                        _token : csrf_token,
                                        inc_m_id :inc_m_id,
                                        adr_d_items_id : adr_d_items_id,
                                        revision_adr_d_items_id : record.get('id')
                                        // filter: Ext.encode(filters),
                                    };
                                    store_revision_items_inc_char_old.load({
                                        params:{
                                        }
                                    });

                                    var filters_reason = [];
                                    var table_name = new Ext.util.Filter({
                                        operator: 'eq',
                                        value: 'revision_adr_d_items',
                                        property: "table_name",
                                        type: "string",
                                    });
                                    filters_reason.push(table_name['initialConfig']) ;
                                    var table_id = new Ext.util.Filter({
                                        operator: 'eq',
                                        value: record.get('id') ? record.get('id'):0,
                                        property: "table_id",
                                        type: "numeric",
                                    });
                                    filters_reason.push(table_id['initialConfig']) ;

                                    store_revision_material_reason_view.proxy.extraParams = {
                                        _token : csrf_token,
                                        filter: Ext.encode(filters_reason),
                                    };
                                    store_revision_material_reason_view.load({
                                        params:{
                                            start:0,
                                            limit:300,

                                        }
                                    });

                                    winMaterialViewHis.setTitle("View Detail No."+request_no);
                                    winMaterialViewHis.show();

                                }
                            }
                        }
                    ]
                },
                
            ],
            bbar:[
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_revision_request,
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
        var model_revision_detail = Ext.define('model_revision_detail', {
            extend: 'Ext.data.Model',
        });

        var store_revision_detail = Ext.create('Ext.data.Store', {
            storeId: 'store_revision_detail'+page,
            model: model_revision_detail,
            proxy: {
                type: 'ajax',
                url: 'getRevisionRequestD',
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

        var store_revision_items_inc_char_new = Ext.create('Ext.data.Store', {
            storeId: 'store_revision_items_inc_char_new'+page,
            model: model_revision_detail,
            proxy: {
                type: 'ajax',
                url: 'getRevisionAdrDItemsChar',
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

        var store_revision_items_inc_char_old = Ext.create('Ext.data.Store', {
            storeId: 'store_revision_items_inc_char_old'+page,
            model: model_revision_detail,
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

        var grid_material_revision_detail = Ext.create('Ext.grid.Panel', {
            store: store_revision_detail,
            layout:'fit',
            margin: '0 0 0 0',
            border:true,
            padding : '1 1 1 1',
            title:'Material Item Revision',
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
                    header: 'Material Type',
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
        // Window Material View Revision History //
        ////////////////////////////////////////////////
        var winMaterialViewHis = Ext.widget('window', {
            id:'winMaterialViewHis'+page,
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
            autoScroll:true,
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
                        grid_material_revision_detail,
                        {
                            xtype: 'grid',
                            title:'Reason',
                            padding : '1 1 1 1',
                            title: 'Reason',
                            store: store_revision_material_reason_view,
                            sortableColumns: false,
                            frame:true,
                            margins: '5 5 5 5',
                            flex: 1,
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
                        },
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
                                    store:store_revision_items_inc_char_new,
                                    flex:1,
                                    bbar:[
                                        Ext.create('Ext.PagingToolbar', {
                                            border:false,
                                            store: store_revision_items_inc_char_new,
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
                                    store:store_revision_items_inc_char_old,
                                    flex:1,
                                    bbar:[
                                        Ext.create('Ext.PagingToolbar', {
                                            border:false,
                                            store: store_revision_items_inc_char_old,
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
                        },
                    ]
                },

            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        // winMaterialViewHis.animateTarget = 'btnMaterialViewReasonHis'+page;
                        winMaterialViewHis.hide();
                    }
                }
            ],
        });

        /////////////////////////////////////////////////
        // Window Material View Notes Revision History //
        ////////////////////////////////////////////////
        var winMaterialViewReasonHis = Ext.widget('window', {
            id:'winMaterialViewReasonHis'+page,
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
                        // winMaterialViewHis.animateTarget = 'btnMaterialViewReasonHis'+page;
                        winMaterialViewReasonHis.hide();
                    }
                }
            ],
        });

        var main_content = {
            id: MainTabId,
            ui: 'blue-panel',
            title: 'Revision '+title,
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
                                                    layout: 'fit',
                                                    border:false,
                                                    id:'formAdiitionNewItems'+pageid,
                                                    items:grid_material_request_revision_m
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
                    winMaterialRevision = Ext.getCmp('winMaterialRevision'+page);
                    if (winMaterialRevision){
                        winMaterialRevision.destroy();
                    }
                    winMaterialViewHis = Ext.getCmp('winMaterialViewHis'+page);
                    if (winMaterialViewHis){
                        winMaterialViewHis.destroy();
                    }
                    winMaterialViewReasonHis = Ext.getCmp('winMaterialViewReasonHis'+page);
                    if (winMaterialViewReasonHis){
                        winMaterialViewReasonHis.destroy();
                    }


                }
            }

        }

        OpenTab(main_content,MainTabId);
        Ext.getCmp('mainpanel').body.unmask();

       

    }
});
