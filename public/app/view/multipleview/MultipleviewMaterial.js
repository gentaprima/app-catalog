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
        valid_script=true

        var MetaDataModel = Ext.define('MetaDataModel', {
            extend: 'Ext.data.Model',
        });

        ////////////////////////
        // Material Multiview //
        ////////////////////////
        // console.log(ROLE);
        var MaterialCharacteristicsEditor = false ;
        var MaterialCrossRef = false;
        var MaterialFuncLoc = false;
        var delimiter = ";";
        var sparator  = ":";
        var base_url = '';
        var materialLock = false ;
        var mandatory = false ;
        var MaterialGridEditor = false ;
        var MaterialApplyChanges = true;
        var MTempcat = "";
        var MChangescat = "";
        var STempcat = "";
        var SChangescat = "";

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

        var model_inc_char_value_entry = Ext.define('model_inc_char_value_entry', {
            extend: 'Ext.data.Model',
            fields: ['id','adr_d_items_id','inc','mrcode','inc_characteristics_id','characteristic', 'nvalue']
        });
        var store_inc_char_value_entry = Ext.create('Ext.data.Store', {
            model: model_inc_char_value_entry,
            proxy: {
                type: 'ajax',
                url: '/getStore',
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
        
        var model_inc_char_value_mandatory = Ext.define('model_inc_char_value_mandatory', {
            extend: 'Ext.data.Model',
            fields: [
                'catalog_no',
                'adr_d_items_id',
                'characteristics',
                'characteristics_m_id',
                'id',
                'inc_characteristics_id', 
                'inc_m_id', 
                'mrcode', 
                'sequence', 
                'nvalue', 
                'type'
            ]
        });
        var store_inc_char_value_mandatory = Ext.create('Ext.data.Store', {
            model: model_inc_char_value_mandatory,
            proxy: {
                type: 'ajax',
                url: '/getStore',
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
        //////////////////
        // Material INC //
        //////////////////
        var model_material_inc = Ext.define('model_cb_inc', {
            extend: 'Ext.data.Model',
            // fields: ['class_inc_name','class','inc', 'description']
        });
        var store_material_inc = Ext.create('Ext.data.Store', {
            model: model_material_inc,
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
        var model_material_type = Ext.define('model_material_type', {
            extend: 'Ext.data.Model',//Meta Data Model
        });
        var store_material_type = Ext.create('Ext.data.Store', {
            model: model_material_type,
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
        var model_material_uom = Ext.define('model_material_uom', {
            extend: 'Ext.data.Model',//Meta Data Model
        });

        var store_material_uom = Ext.create('Ext.data.Store', {
            model: model_material_uom,
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
        var model_material_category = Ext.define('model_material_category', {
            extend: 'Ext.data.Model',//Meta Data Model
        });

        var store_material_category = Ext.create('Ext.data.Store', {
            model: model_material_category,
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
        // Grid Material INC Characteristics //
        ///////////////////////////////////////
		function update_desc_from_characteristics() {
                            // console.log('Setelah EDIT');
                            var desc_temp = "";
                            var desclong_temp = "";

                            var namecodeval = Ext.getCmp('material_name_code'+page).getValue();
                            var namecodeval_short = Ext.getCmp('material_short_name_code'+page).getValue();
                            // console.log(namecodeval_short);
                            desc_temp = desc_temp + namecodeval_short ;
                            desclong_temp = desclong_temp + namecodeval_short ;

                            var char_count = store_material_item_char.getCount();

                            if (char_count >= 1) {
                                var nvalue =  [];
                                var valchar =  [];
                                var items_char_value = [];
                                var r = 1;
                                for (i = 0; i < char_count; i++) {
                                    var inc_characteristics_id = store_material_item_char.getAt(i).data.id;
                                    var adr_d_items_id = Ext.getCmp('material_adr_d_items_id'+page).getValue();
                                    var characteristic = store_material_item_char.getAt(i).data.characteristics.trim();
                                    var val = store_material_item_char.getAt(i).data.nvalue;
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
                            Ext.getCmp('material_short_description'+page).setValue(desc_temp);
                            Ext.getCmp('material_long_description'+page).setValue(desclong_temp);
                            /**/

                            var selectedRecord = grid_material_multiview_m.getSelectionModel().getSelection()[0];
                            var row = grid_material_multiview_m.store.indexOf(selectedRecord);
                            var recordSet = store_material_multiview_m.getAt(row);
                            recordSet.set("short_description", Ext.getCmp('material_short_description'+page).getValue());
                            recordSet.set("long_description", Ext.getCmp('material_long_description'+page).getValue());


                            // console.log(store_inc_char_value_entry);
                            // var selectedRecord = Ext.getCmp('grid_material_multiview_m'+page).getSelectionModel().getSelection()[0];
                            var rs = store_material_item_char.getModifiedRecords();
                            for (var x = 0, ln = rs.length; x < ln; x++) {
                                var row = Ext.create('model_inc_char_value_entry', {
                                    adr_d_items_id: selectedRecord.data.adr_d_items_id,
                                    inc:selectedRecord.data.inc,
                                    inc_m_id:rs[x].data.inc_m_id,
                                    mrcode:rs[x].data.mrcode,
                                    id :selectedRecord.data.adr_d_items_id+'_'+rs[x].data.id ,
                                    inc_characteristics_id :rs[x].data.inc_characteristics_id ,
                                    characteristics :rs[x].data.characteristics ,
                                    nvalue :rs[x].data.nvalue ,
                                });
                                store_inc_char_value_entry.insert(index_char_value,row);
                                index_char_value++;
                            }
                            // console.log(store_inc_char_value_entry);
			
		}
		
        var model_material_item_char = Ext.define('model_material_item_char', {
            extend: 'Ext.data.Model',
            fields: ['sequence', 'flag' ,'characteristics', 'nvalue', 'type']
        });
        var store_material_item_char = Ext.create('Ext.data.Store', {
            storeId: 'store_material_item_char'+page,
            id :'store_material_item_char'+page,
            model: model_material_item_char,
            proxy: {
                type: 'ajax',
                // url: 'se_charval.php?',
                url: '/getItemsIncCharacteristics',//&action=getIncCharacteristic
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
        var index_char_value = 0 ;
        var grid_material_inc_characteristic = Ext.create('Ext.grid.Panel', {
            title: 'Characteristic',
            region: 'center',
            height:200,
            // width :300,
            anchor:'100%',
            id: 'material_adr_items_char_grid'+page,
            store: store_material_item_char,
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

						grid_material_inc_characteristic.getSelectionModel().select(rowIndex);

                        winCharacteristicValue.show();
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
						fieldStyle: 'text-transform:uppercase',
                        // id:'adr_d_items_characteristic_value'+page,
                        allowBlank: true,
                        // maxLength:30,
                        readOnly:false,
                        listeners: {
                            change : function(obj, newValue){
								obj.setRawValue(newValue.toUpperCase());
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
							if (MaterialCharacteristicsEditor == true) {
								var selModel = grid_material_inc_characteristic.getSelectionModel();
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

        ///////////////////////////////////
        // Grid Material Cross Reference //
        ///////////////////////////////////
        var model_material_cross_references = Ext.define('model_material_cross_references', {
            extend: 'Ext.data.Model',
            fields: ['flag','refno','old_material_code','manufactur', 'type']
        });
        var store_material_cross_references = Ext.create('Ext.data.Store', {
            storeId: 'store_material_cross_references',
            model: model_material_cross_references,
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
        var grid_editor_material_cross_references =  Ext.create('Ext.grid.plugin.RowEditing', {
            licksToMoveEditor: 1,
            autoCancel: true,
            saveBtnText    : "Update",//My Save Button Text&quot;,
            saveBtnIcon: 'add-data',
            cancelBtnText: "Cancel", //Cancel Button Text&quot;,
            clicksToEdit: 2, //this changes from the default double-click activation to single click activation
            errorSummary: false //disables display of validation messages if the row is invalid

        });
        var grid_material_cross_references = Ext.create('Ext.grid.Panel', {
            title: 'Cross References',
            region: 'center',
            store: store_material_cross_references,
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
                grid_editor_material_cross_references
            ],
            tbar:[
                {
                    xtype:'button',
                    text: 'Add X References',
                    iconCls: 'add-data',
                    id:'btnMaterialAddCrossReferences'+page,
                    hidden:!ROLE.AddCrossReferences,
                    disabled:true,
                    handler: function() {
                        var data = [];
                        var order = 1 ;
                        var index = 0 ;
                        // var sequence = 1 ;
                        // var sequence = parseInt(store_material_cross_references.totalCount)+1 ;
                        // Ext.getCmp('sequence'+page).readOnly=true;
                        store_material_cross_references.each(function(r,i){
                            data.push(r.data);
                            order++ ;
                            index++ ;
                        });
                        // Create a model instance
                        var r = Ext.create('model_material_cross_references', {
                            flag :'Insert' ,
                            // sequence : sequence,
                            // inc : Ext.getCmp('detail_inc'+page).getValue() ,
                            // type: 'O',
                        });

                        store_material_cross_references.insert(0, r);
                        grid_editor_material_cross_references.startEdit(r, 0);

                    }
                },
                {
                    xtype:'button',
                    text: 'Remove X References',
                    iconCls: 'row-delete',
                    id:'btnMaterialRemoveCrossReferences'+page,
                    hidden:!ROLE.RemoveCrossReferences,
                    disabled:true,
                     handler: function() {
                        var records = grid_material_cross_references.getSelectionModel().getSelection()[0];
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
                            // store_material_cross_references.remove(records);
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
        grid_editor_material_cross_references.on({
            scope: this,
            beforeedit: function(roweditor, context) {

            },
            afteredit: function(roweditor, context) {
                var row = grid_material_cross_references.getSelectionModel().getSelection()[0];

                Ext.Ajax.request({
                    scope:this,
                    url: 'SaveItemsCrossReferences',
                    method: 'POST',
                    dataType: 'html',
                    params:{
                        _token : csrf_token,
                        adr_d_items_id: Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                        cross_references : "["+Ext.encode(row.data)+"]",
                    },
                    success:function(response, request){
                        // var row = grid_material_cross_references.getSelectionModel().getSelection()[0];
                        var result = Ext.util.JSON.decode(response.responseText);
                        var message = "";
                        if(result.success == true){
                            message = result.message ;

                        }else{
                            message = result.message ;
                        }
                        store_material_cross_references.load({
                            params:{
                                start:0,
                                limit:300,
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
                if (grid_material_inc_characteristic.getSelectionModel().hasSelection()) {
                    var row = grid_material_inc_characteristic.getSelectionModel().getSelection()[0];
                }
            }
        });

        /////////////////////////////////////
        // Grid Material Function Location //
        /////////////////////////////////////
        var model_material_funloc = Ext.define('model_material_funloc', {
            extend: 'Ext.data.Model',
            fields: ['flag', 'adr_d_items_id','name', 'description']
        });
        var store_material_funloc = Ext.create('Ext.data.Store', {
            storeId: 'funloc_Store',
            model: model_material_funloc,
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
        var grid_editor_material_funcloc =  Ext.create('Ext.grid.plugin.RowEditing', {
            licksToMoveEditor: 1,
            autoCancel: true,
            saveBtnText    : "Update",//My Save Button Text&quot;,
            saveBtnIcon: 'add-data',
            cancelBtnText: "Cancel", //Cancel Button Text&quot;,
            clicksToEdit: 2, //this changes from the default double-click activation to single click activation
            errorSummary: false //disables display of validation messages if the row is invalid

        });
        var grid_material_funcloc = Ext.create('Ext.grid.Panel', {
            title: 'Functional Locations',
            region: 'center',
            store: store_material_funloc,
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
                grid_editor_material_funcloc
            ],
            tbar:[
                {
                    xtype:'button',
                    text: 'Add FuncLoc',
                    iconCls: 'add-data',
                    id:'btnMaterialAddFuncLocation'+page,
                    hidden:!ROLE.AddFuncLocation,
                    disabled:true,
                    handler: function() {
                        var data = [];
                        var order = 1 ;
                        var index = 0 ;
                        store_material_funloc.each(function(r,i){
                            data.push(r.data);
                            order++ ;
                            index++ ;
                        });
                        // Create a model instance
                        var r = Ext.create('model_material_funloc', {
                            flag :'Insert' ,

                        });

                        store_material_funloc.insert(0, r);
                        grid_editor_material_funcloc.startEdit(r, 0);

                    }
                },
                {
                    xtype:'button',
                    text: 'Remove',
                    iconCls: 'row-delete',
                    id:'btnMaterialRemoveFuncLocation'+page,
                    hidden:!ROLE.RemoveFuncLocation,
                    disabled:true,
                    handler: function() {
                        var records = grid_material_funcloc.getSelectionModel().getSelection()[0];
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
                                        store_material_funloc.load({
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
        grid_editor_material_funcloc.on({
            scope: this,
            beforeedit: function(roweditor, context) {

            },
            afteredit: function(roweditor, context) {
                var row = grid_material_funcloc.getSelectionModel().getSelection()[0];
                Ext.Ajax.request({
                    scope:this,
                    url: 'SaveItemsFuncloc',
                    method: 'POST',
                    dataType: 'html',
                    params:{
                        _token : csrf_token,
                        adr_d_items_id: Ext.getCmp('material_adr_d_items_id'+page).getValue(),
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
                        store_material_funloc.load({
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
                if (grid_material_inc_characteristic.getSelectionModel().hasSelection()) {
                    var row = grid_material_inc_characteristic.getSelectionModel().getSelection()[0];
                }
            }
        });


        //////////////////////////////////
        // Material Windows View Option //
        //////////////////////////////////
        var winMaterialViewOption = Ext.widget('window', {
            iconCls:'view_option',
            title: 'View Options',//+ ,
            id:'winMaterialViewOption'+page,
            layout       : 'fit',
            constrain    : true,
            frame:true,
            plaint:true,
            width: 300,
            height: 200,
            plain: true,
            // bodyPadding  : '5 5 5 5',
            border       : false,
            resizable    : false,
            modal        : true,
            autoShow     : false,
            defaultFocus : 'nome',
            buttonAlign : 'right',
            closable: false,
            items: [
                Ext.create('Ext.FormPanel', {
                    id:'formMaterialViewOption'+page,
                    title: 'Option',
                    frame: true,
                    fieldDefaults: {
                        labelWidth: 110,
                        labelStyle: 'color:green;padding-left:4px'
                    },
                    width: 600,
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'radiogroup',
                            // margin: '3 3 3 3',
                            id:'materialvwOption'+page,
                            cls: 'x-check-group-alt',
                            columns: [100, 100],
                            vertical: true,
                            items: [
                                {boxLabel: 'User', name: 'vwOption', inputValue: 'User', checked: true},
                                {boxLabel: 'Cataloguer', name: 'vwOption', inputValue: 'Cat'},
                                {boxLabel: 'Std Approval', name: 'vwOption', inputValue: 'Std App'},
                                {boxLabel: 'Procurement', name: 'vwOption', inputValue: 'Proc App'},
                                {boxLabel: 'SAP', name: 'vwOption', inputValue: 'SAP'},
                                {boxLabel: 'Default', name: 'vwOption', inputValue: 'default'}
                            ]
                        },
                    ],
                    buttons: [{
                        text: 'Ok',
                        iconCls: 'accept',
                        handler: function(){
                            Ext.getBody().mask("loading material Grid...");
                            var fp = Ext.getCmp('formMaterialViewOption'+page);
                            if(fp.getForm().isValid()){
                                MaterialViewOptions(fp.getForm().getValues().vwOption);
                                // console.log(fp.getForm().getValues().vwOption);
                                // alert(fp.getForm().getValues(true));
                                // Ext.Msg.alert('Submitted Values', 'The following will be sent to the server: <br />'+
                                //     fp.getForm().getValues(true).replace(/&/g,', '));
                            }
                            winMaterialViewOption.animateTarget = 'btnMaterialViewOption'+page;
                            winMaterialViewOption.hide();
                           /*if(fp.getForm().isValid()){
                                Ext.Msg.alert('Submitted Values', 'The following will be sent to the server: <br />'+
                                    fp.getForm().getValues(true).replace(/&/g,', '));
                            }*/
                        }
                    },{
                        text: 'Cancel',
                        iconCls: 'cancel',
                        handler: function(){
                            // this.getForm().reset();
                            winMaterialViewOption.animateTarget = 'btnMaterialViewOption'+page;
                            winMaterialViewOption.hide();
                        }
                    }]

                })

            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        winMaterialViewOption.animateTarget = 'btnMaterialViewOption'+page;
                        winMaterialViewOption.hide();
                    }
                }
            ],
        });

        ////////////////////////////
        // SearchMaterialCataloNo //
        ////////////////////////////
        function SearchMaterialCatalogNo(val){
            Ext.getBody().mask("loading material item...");
            if(val){
                 Ext.getCmp('material_owner'+page).reset();
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
                    value:  'Material',
                    property: "transaction_type",
                    type: "string",
                });
                filters.push(transaction_type['initialConfig']) ;
                store_material_catalog_m.proxy.extraParams = {
                    action:'getCatalogM',
                };
                store_material_catalog_m.reload({
                    params:{
                        filter: Ext.encode(filters),
                    },
                    callback : function(records, operation, success) {
                        if(success){
                            var record = records[0];
                            if(store_material_catalog_m.getCount() > 0){
                                store_material_item_char.removeAll();
                                store_material_cross_references.removeAll();
                                store_material_funloc.removeAll();
                                store_material_view_notes.removeAll();
                                form_material_multiview_d.getForm().reset();
                                Ext.getCmp('btnMaterialApplyChanges'+page).setDisabled(true);
                                Ext.getCmp('btnMaterialViewNotes'+page).setDisabled(false);
                                Ext.getCmp('material_catalog_no'+page).setValue(record.data.catalog_no);
                                Ext.getCmp('material_adr_m_id'+page).setValue(record.data.adr_m_id);
                                Ext.getCmp('material_adr_d_items_id'+page).setValue(record.data.adr_d_items_id);
                                Ext.getCmp('material_adr_m_status'+page).setValue(record.data.adr_status);
                                Ext.getCmp('material_adr_d_items_status'+page).setValue(record.data.item_status);
                                Ext.getCmp('material_raw'+page).setValue(record.data.raw);
                                Ext.getCmp('sap_material_code'+page).setValue(record.data.sap_material_code);
                                Ext.getCmp('material_name_code'+page).setValue(record.data.inc_name_code);
                                Ext.getCmp('material_short_name_code'+page).setValue(record.data.short_name_code);
                                Ext.getCmp('material_short_description'+page).setValue(record.data.short_description);
                                Ext.getCmp('material_long_description'+page).setValue(record.data.long_description);
                                Ext.getCmp('material_owner'+page).setValue(record.data.owner);
                                var filters = [];

                                var inc_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record.data.inc,
                                    property: "inc",
                                    type: "string",
                                });
                                filters.push(inc_filter['initialConfig']) ;

                                var adr_d_items_id = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record.data.adr_d_items_id,
                                    property: "adr_d_items_id",
                                    type: "numeric",
                                });
                                filters.push(adr_d_items_id['initialConfig']) ;

                                var sorters = [];
                                var seq_shorter = new Ext.util.Sorter({
                                    property: "sequence",
                                    direction: "ASC",
                                });
                                sorters.push(seq_shorter['initialConfig']) ;



                                store_material_item_char.proxy.extraParams = {
                                    inc_m_id:record.data.inc_m_id,
                                    adr_d_items_id: record.data.adr_d_items_id,
                                    catalog_no: record.data.catalog_no,
                                    sort: Ext.encode(sorters),
                                };
                                store_material_item_char.load({
                                    params:{
                                        start:0,
                                        limit:300,
                                    },
                                    // callback : function(rec, operation, success) {
                                    //     if(success){
                                    //         var recIncChar = rec[0];
                                    //         if(store_material_item_char.getCount() > 0){
                                    //             var index_char_value_m = 0 ;
                                    //             store_material_item_char.each(function(recordIncChar) {
                                    //                 var type = recordIncChar.get('type');
                                    //                 var nvalue = recordIncChar.get('nvalue') ;
                                    //                 if(type == "M" && isEmpty(nvalue) == true) {
                                    //                     // var rs = store_material_item_char.getModifiedRecords();
                                    //                     // for (var x = 0, ln = rs.length; x < ln; x++) {
                                    //                     var row = Ext.create('model_inc_char_value_entry', {
                                    //                         catalog_no : record.data.catalog_no,
                                    //                         adr_d_items_id: recordIncChar.get('adr_d_items_id'),
                                    //                         inc:recordIncChar.get('inc'),
                                    //                         inc_m_id:recordIncChar.get('inc_m_id'),
                                    //                         id :recordIncChar.get('adr_d_items_id')+'_'+recordIncChar.get('id') ,
                                    //                         inc_characteristics_id :recordIncChar.get('inc_characteristics_id') ,
                                    //                         characteristics :recordIncChar.get('characteristics'),
                                    //                         // nvalue :rs[x].data.nvalue ,
                                    //                     });
                                    //                     store_inc_char_value_entry_check.insert(index_char_value_m,row);
                                    //                     index_char_value_m++;
                                    //                     // }
                                    //                     // console.log(recordIncChar);
                                    //                     // if(record.get('nvalue')) rprs+=1;
                                    //                     // else evts+=1;
                                    //                 }
                                    //             });
                                    //         }
                                    //     }
                                    // }
                                });
                                /*store_material_item_char.each(function(record) {
                                    var type = record.get('type');
                                    var nvalue = record.get('nvalue') ;
                                    if(type == "M" && isEmpty(nvalue) == true) {
                                        console.log(record);
                                        // if(record.get('nvalue')) rprs+=1;
                                        // else evts+=1;
                                    }
                                });*/
                                var filters = [];
                                var adr_d_items_id_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: record.data.adr_d_items_id,
                                    property: "adr_d_items_id",
                                    type: "numeric",
                                });
                                filters.push(adr_d_items_id_filter['initialConfig']) ;
                                store_material_cross_references.proxy.extraParams = {
                                    filter: Ext.encode(filters),
                                };
                                store_material_cross_references.load({
                                    params:{
                                        start:0,
                                        limit:300,
                                    }
                                });
                                store_material_funloc.proxy.extraParams = {
                                    filter: Ext.encode(filters),
                                };
                                store_material_funloc.load({
                                    params:{
                                        start:0,
                                        limit:300,

                                    },

                                });
                                store_material_view_notes.proxy.extraParams = {
                                    filter: Ext.encode(filters),
                                };
                                store_material_view_notes.load({
                                    params:{
                                        start:0,
                                        limit:300,

                                    }
                                });
                                if(record.data.item_status === "STOPPED" || record.data.item_status === "BLOCKED") {
                                  MaterialGridEditor = false;
                                  MaterialApplyChanges = false;
                                  MaterialCharacteristicsEditor = false;
                                }else{
                                  MaterialWorkFlow();
                                }
                                Ext.getBody().unmask();
                            }else{
                                store_material_item_char.removeAll();
                                store_material_cross_references.removeAll();
                                store_material_funloc.removeAll();
                                store_material_view_notes.removeAll();
                                form_material_multiview_d.getForm().reset();
                                Ext.Msg.show({
                                    title   : 'Data Search',
                                    msg     : 'No Record Found',
                                    buttons : Ext.Msg.OK,
                                    // iconCls : 'warningMessage',
                                    icon :  Ext.MessageBox.INFO,
                                });
                                Ext.getBody().unmask();

                            }
                        }
                    }
                });

            }else{


                Ext.Msg.show({
                    title   : 'Data Search',
                    msg     : 'Catalog No Can Not Be Empty',
                    buttons : Ext.Msg.OK,
                    // iconCls : 'warningMessage',
                    icon :  Ext.MessageBox.INFO,
                });
                Ext.getBody().unmask();
                // CheckMaterialMRP(0);
            }
        }

        ///////////////////////////
        // Materla Data Workflow //
        ///////////////////////////
        function MaterialWorkFlow(){
            // MaterialStatusStyle();
            var record = store_material_catalog_m.getData().items[0];
            var str = record.data.item_status;
            var item_status = str.substring(0, 8);
            var std_app_category = "Std App "+record.data.category ;
            switch(true ){
                case (record.data.item_status === "ON PROCESS"):
                case (record.data.item_status === "ORIGIN"):
                case (item_status === "REVISION"):

                    ////////////////
                    //Status User //
                    ////////////////
                    if(record.data.status_user === 1){
                        MaterialGridEditor = false;
                        MaterialCharacteristicsEditor = false ;
                        MaterialApplyChanges = true;
                        MaterialCrossRef = true;
                        MaterialFuncLoc = true;
                        if (company_code === record.data.company_code ){
                            MaterialCrossRef = false;
                            MaterialFuncLoc = false;
                        }


                        if (company_code === record.data.company_code && user_level === "Cat") {
                            MaterialGridEditor = true;
                            MaterialCharacteristicsEditor = true ;
                            MaterialApplyChanges = false;

                        }


                    }else{

                        if (company_code === record.data.company_code  ) {
                            MaterialGridEditor = true;
                            MaterialCharacteristicsEditor = true ;
                            MaterialApplyChanges = false;
                            MaterialFuncLoc = false;
                            MaterialApplyChanges = false;
                        }


                    }
                    // console.log(record.data.status_cat);
                    if(record.data.status_cat === 1 && record.data.status_user === 1){

                        MaterialGridEditor = false;
                        MaterialCharacteristicsEditor = false ;
                        MaterialApplyChanges = true;
                        if(user_level === std_app_category ){
                            MaterialGridEditor = true;
                            MaterialCharacteristicsEditor = false ;
                            MaterialApplyChanges = false;
                        }




                    }else{

                    }

                    if(record.data.status_stdapp === 1 && record.data.status_user === 1){

                        MaterialGridEditor = false;
                        MaterialCharacteristicsEditor = false ;
                        MaterialApplyChanges = true;

                        // Ext.getCmp('material_std_approval'+page).setMaterialGridEditor(MaterialGridEditor);
                        // Ext.getCmp('material_std_approval'+page).focus();

                        if(user_level === "Proc"){
                            MaterialGridEditor = true;
                            MaterialCharacteristicsEditor = false ;
                            MaterialApplyChanges = false;
                            if(record.data.material_type == 'ZOEM'){

                            }
                            // console.log('disini'+record.data.material_type);
                        }

                    }else{

                    }

                    if(record.data.status_proc === 1 && record.data.status_user === 1){


                        MaterialGridEditor = true;
                        MaterialCharacteristicsEditor = false ;
                        MaterialApplyChanges = true;

                        if(user_level === "Proc" && record.data.status_sap === 0){
                            MaterialGridEditor = true;
                            MaterialCharacteristicsEditor = false ;
                            MaterialApplyChanges = false;
                        }

                    }else{

                    }

                    if(record.data.status_sap === 1 && record.data.status_user === 1){


                        MaterialGridEditor = false;
                        MaterialCharacteristicsEditor = false ;
                        MaterialApplyChanges = true;
                        MaterialCrossRef = true;
                        MaterialFuncLoc = true;

                        if (company_code === record.data.company_code && user_level === "Cat") {
                            
                            MaterialCrossRef = false;
                            MaterialFuncLoc = false;

                        }

                        }else{


                        MaterialCrossRef = false;
                        MaterialFuncLoc = false;

                    }

                    Ext.getCmp('btnMaterialAddCrossReferences'+page).setDisabled(MaterialCrossRef);
                    Ext.getCmp('btnMaterialRemoveCrossReferences'+page).setDisabled(MaterialCrossRef);

                    Ext.getCmp('material_refno'+page).setReadOnly(MaterialCrossRef);
                    Ext.getCmp('old_material_code'+page).setReadOnly(MaterialCrossRef);

                    Ext.getCmp('material_manufactur'+page).setReadOnly(MaterialCrossRef);
                    Ext.getCmp('material_cross_references_type'+page).setReadOnly(MaterialCrossRef);

                    Ext.getCmp('btnMaterialAddFuncLocation'+page).setDisabled(MaterialFuncLoc);
                    Ext.getCmp('btnMaterialRemoveFuncLocation'+page).setDisabled(MaterialFuncLoc);

                    Ext.getCmp('material_func_loc_name'+page).setReadOnly(MaterialFuncLoc);
                    Ext.getCmp('material_func_loc_description'+page).setReadOnly(MaterialFuncLoc);

                    
                    Ext.getCmp('btnMaterialApplyChanges'+page).setDisabled(MaterialApplyChanges);
                break;
                default:

                break;
            }

        }

        ////////////////////////////////////
        // Search Material Grid Multiview //
        ////////////////////////////////////
        function SearchMaterialMultiview(){
            var namecode = Ext.getCmp('SearchMaterialNameCodeMultiView'+page).getValue();
            var shortdesc = Ext.getCmp('SearchMaterialShortDescMultiView'+page).getValue();
            var rawData = Ext.getCmp('SearchMaterialRawDataMultiView'+page).getValue();
            var material_old_code = Ext.getCmp('SearchMaterialOldCode'+page).getValue();
            var material_type = Ext.getCmp('SearchMaterialType'+page).getValue();
            var material_category = Ext.getCmp('SearchMaterialCategory'+page).getValue();
            var material_manufactur = Ext.getCmp('SearchMaterialManufactur'+page).getValue();
            var material_refno = Ext.getCmp('SearchMaterialRefno'+page).getValue();
            var material_funloc = Ext.getCmp('SearchMaterialFuncLoc'+page).getValue();
            var material_filter_colum = Ext.getCmp('SearchFilterOn'+page).getValue();
            var material_filter_date = Ext.Date.format(Ext.getCmp('on_filter_date'+page).getValue(), 'Y-m-d');
        
            // In Search
            Ext.getCmp('btnMaterialApplyChanges'+page).setDisabled(true);

            var filters = [];
            var namecodeFilter = new Ext.util.Filter({
                operator: 'like',
                value:  namecode,
                property: "inc_name_code",
                type: "string",
            });
            if(isEmpty(namecode) == false){
                filters.push(namecodeFilter['initialConfig']) ;
            }

            var shortdescFilter = new Ext.util.Filter({
                operator: 'like',
                value:  shortdesc,
                property: "short_description",
                type: "string",
            });
            if(isEmpty(shortdesc) == false){
                filters.push(shortdescFilter['initialConfig']) ;
            }
            var rawDataFilter = new Ext.util.Filter({
                operator: 'like',
                value:  rawData,
                property: "raw",
                type: "string",
            });
            if(isEmpty(rawData) == false){
                filters.push(rawDataFilter['initialConfig']) ;
            }
            var MaterialOldCodeDataFilter = new Ext.util.Filter({
                operator: 'like',
                value:  material_old_code,
                property: "old_material_code",
                type: "string",
            });
            if(isEmpty(material_old_code) == false){
                filters.push(MaterialOldCodeDataFilter['initialConfig']) ;
            }

            var MaterialTypeDataFilter = new Ext.util.Filter({
                operator: 'like',
                value:  material_type,
                property: "material_type",
                type: "string",
            });
            if(isEmpty(material_type) == false){
                filters.push(MaterialTypeDataFilter['initialConfig']) ;
            }

            var MaterialCategoryDataFilter = new Ext.util.Filter({
                operator: 'like',
                value:  material_category,
                property: "category",
                type: "string",
            });
            if(isEmpty(material_category) == false){
                filters.push(MaterialCategoryDataFilter['initialConfig']) ;
            }

            var MaterialRefnoDataFilter = new Ext.util.Filter({
                operator: 'like',
                value:  material_refno,
                property: "refno",
                type: "string",
            });
            if(isEmpty(material_refno) == false){
                filters.push(MaterialRefnoDataFilter['initialConfig']) ;
            }

            var MaterialManufacturDataFilter = new Ext.util.Filter({
                operator: 'like',
                value:  material_manufactur,
                property: "manufactur",
                type: "string",
            });
            if(isEmpty(material_manufactur) == false){
                filters.push(MaterialManufacturDataFilter['initialConfig']) ;
            }

            var MaterialFunclocDataFilter = new Ext.util.Filter({
                operator: 'like',
                value:  material_funloc,
                property: "funcloc",
                type: "string",
            });
            if(isEmpty(material_funloc) == false){
                filters.push(MaterialFunclocDataFilter['initialConfig']) ;
            }
/// task 4a begin
            var MaterialFuncColumFilter = new Ext.util.Filter({
                operator: 'eq',
                value:  material_filter_date,
                property: material_filter_colum,
                type: "string",
            });

         //   alert(' Colum :'+material_filter_date);
         //   alert(' Tgl :'+material_filter_colum);

            if((isEmpty(material_filter_date) == false) && (isEmpty(material_filter_colum) == false)) {
                filters.push(MaterialFuncColumFilter['initialConfig']) ;
            }
/// task 4 end
            var transaction_type = new Ext.util.Filter({
                operator: 'eq',
                value: 'Material',
                property: "transaction_type",
                type: "string",
            });

            filters.push(transaction_type['initialConfig']) ;
            store_material_multiview_m.filter(filters);
            store_material_multiview_m.load({
                params:{
                    start:0,
                    limit:25
                }
            });

        }

        //////////////////////////
        // Material View Option //
        //////////////////////////
        function MaterialViewOptions(val) {
            Ext.Array.each(grid_material_multiview_m.getColumns(), function(column, index) {
                if (index > 5) {
                    column.setVisible(false);
                }
            }, this);

            if (val === 'User') {
                grid_material_multiview_m.down('[dataIndex=short_description]').setVisible(true);
                // grid_material_multiview_m.down('[dataIndex=long_description]').setVisible(true);
                grid_material_multiview_m.down('[dataIndex=sap_material_code]').setVisible(true);
                grid_material_multiview_m.down('[dataIndex=groupclass]').setVisible(true);
                grid_material_multiview_m.down('[dataIndex=inc]').setVisible(true);
                grid_material_multiview_m.down('[dataIndex=material_type]').setVisible(true);
                grid_material_multiview_m.down('[dataIndex=uom]').setVisible(true);
                grid_material_multiview_m.down('[dataIndex=category]').setVisible(true);
            }

            if (val === 'Cat') {
                grid_material_multiview_m.down('[dataIndex=short_description]').setVisible(true);
                // grid_material_multiview_m.down('[dataIndex=long_description]').setVisible(true);
                grid_material_multiview_m.down('[dataIndex=sap_material_code]').setVisible(true);
                grid_material_multiview_m.down('[dataIndex=groupclass]').setVisible(true);
                grid_material_multiview_m.down('[dataIndex=inc]').setVisible(true);
                grid_material_multiview_m.down('[dataIndex=material_type]').setVisible(true);
                grid_material_multiview_m.down('[dataIndex=uom]').setVisible(true);
                grid_material_multiview_m.down('[dataIndex=category]').setVisible(true);
                grid_material_multiview_m.down('[dataIndex=cataloguer]').setVisible(true);

            }
            if (val === 'Std App') {
                grid_material_multiview_m.down('[dataIndex=short_description]').setVisible(true);
                // grid_material_multiview_m.down('[dataIndex=long_description]').setVisible(true);
                grid_material_multiview_m.down('[dataIndex=sap_material_code]').setVisible(true);
                grid_material_multiview_m.down('[dataIndex=std_approval]').setVisible(true);
            }
            if (val === 'Proc App') {
                grid_material_multiview_m.down('[dataIndex=short_description]').setVisible(true);
                grid_material_multiview_m.down('[dataIndex=sap_material_code]').setVisible(true);
                grid_material_multiview_m.down('[dataIndex=proc_approver]').setVisible(true);
            }
            if (val === 'SAP') {
                grid_material_multiview_m.down('[dataIndex=short_description]').setVisible(true);
                // grid_material_multiview_m.down('[dataIndex=long_description]').setVisible(true);
                grid_material_multiview_m.down('[dataIndex=sap_material_code]').setVisible(true);
                }
            if (val === 'default') {
                Ext.Array.each(grid_material_multiview_m.getColumns(), function(column, index) {
                    if (index > 0) {
                        column.setVisible(true);
                    }
                }, this);

            }
            Ext.getBody().unmask();
        };

        /////////////////////////////////
        // Material Multiview Selected //
        /////////////////////////////////
        var MaterialItemSelect = Ext.create('Ext.selection.RowModel', {
            listeners: {
                selectionchange: function(sm, selectedRecord) {
                    var record = selectedRecord[0];
                    if(record){
                        SearchMaterialCatalogNo(record.data.catalog_no);
                        MTempcat = record.data.catalog_no;
                        // alert(Changescat + ' - ' + Tempcat);


                        // if(MChangescat != ""){
                        //   if(MTempcat != MChangescat){
                        //     // START PROCESS
                        //     Ext.MessageBox.show({
                        //         title:'Changes Material Process',
                        //         msg:'Do you want to process previous change?',
                        //         buttons : Ext.MessageBox.YESNO,
                        //         closable: false,
                        //         icon :Ext.MessageBox.INFO,
                        //         fn:function(b){
                        //             if (b =='yes'){
                        //               // Lanjutkan!!
                        //               MChangescat = "";
                        //               MTempcat = "";
                        //             }else{
                        //               SearchMaterialMultiview();
                        //               MChangescat = "";
                        //               MTempcat = "";
                        //             }
                        //         }
                        //     });
                        //     // END PROCESS
                        //   }
                        // }
                    }else{

                    }

                },
                beforechange: function() {
                    // update_material_multiview_desc();
                }
            }
        });
        ///////////////////////////////
        // Store Material Catalog M //
        //////////////////////////////
        var model_material_catalog_m = Ext.define('model_material_catalog_m', {
            extend: 'Ext.data.Model',
        });
        var store_material_catalog_m = Ext.create('Ext.data.Store', {
            storeId: 'funloc_Store',
            model: model_material_catalog_m,
            proxy: {
                type: 'ajax',
                url: '/getCatalogM',
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
        store_material_catalog_m.proxy.extraParams = {
            action:'getCatalogM',
        };
        store_material_catalog_m.load({
            params:{
                filter: Ext.encode(filters),
            }
        });

        //////////////////////////////
        // Grid Material View Notes //
        //////////////////////////////
        var model_material_view_notes = Ext.define('model_material_view_notes', {
            extend: 'Ext.data.Model',
            fields: ['id','adr_d_items_id','user', 'created_at', 'notes']
        });
        var store_material_view_notes = Ext.create('Ext.data.Store', {
            storeId: 'store_material_view_notes'+page,
            model: model_material_view_notes,
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

        var grid_editor_material_view_notes =  Ext.create('Ext.grid.plugin.RowEditing', {
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
        var grid_material_view_notes = Ext.create('Ext.grid.Panel', {
            width: 343,
            height: 250,
            margin: '0 0 0 0',
            store:store_material_view_notes,
            hideHeaders:false,
            tbar:[
                {
                    xtype: 'button',
                    id: 'btnAddMaterialMultipleViewNotes'+page,
                    text: 'Add Note',
                    margin: '0 0 0 10',
                    iconCls:'add-data',
                    handler: function() {
                        var data = [];
                        var order = 1 ;
                        var index = 0 ;
                        var r = Ext.create('model_material_view_notes', {
                            user: username + ' (' + user_level + ')',
                            created_at : new Date(),
                            id:'last_insert_id',
                            // notes:''
                        });
                        store_material_view_notes.insert(index, r);
                        grid_editor_material_view_notes.startEdit(r, 0);
                    }
                },
                {
                    xtype: 'button',
                    id: 'btnRemoveMaterialViewNotes'+page,
                    text: 'Remove Note',
                    margin: '0 0 0 10',
                    iconCls:'row-delete',
                    handler: function() {
                        var record = grid_material_view_notes.getSelectionModel().getSelection()[0];
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
                                        store_material_view_notes.load({
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
                grid_editor_material_view_notes,
            ],
            bbar:[
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_material_view_notes,
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
                        var view_notes = Ext.encode(Ext.pluck(store_material_view_notes.data.items, 'data'));
                        parms = [];
                        var updatedRecords = store_material_view_notes.getUpdatedRecords();
                        Ext.each(updatedRecords,function(record){
                            parms.push(record.data);
                        });
                        var newRecords = store_material_view_notes.getNewRecords();
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
                                adr_d_items_id : Ext.getCmp('material_adr_d_items_id'+page).getValue(),
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

                                store_material_view_notes.proxy.extraParams = {
                                    filter: Ext.encode(filters),
                                    action:'getViewNotes'
                                };
                                store_material_view_notes.load({
                                    params:{
                                        // action : 'getInc',
                                        // filter: Ext.encode(filters),
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


        var winMaterialViewNotes = Ext.widget('window', {
            id:'winMaterialViewNotes'+page,
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
                grid_material_view_notes
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        winMaterialViewNotes.animateTarget = 'btnMaterialViewNotes'+page;
                        winMaterialViewNotes.hide();
                    }
                }
            ],
        });

        //////////////////////////////////
        // Material Windows View Option //
        //////////////////////////////////
        var winMaterialMoreSearch = Ext.widget('window', {
            // iconCls:'view_option',
            // title: 'View Options',//+ ,
            id:'winMaterialMoreSearch'+page,
            layout       : 'fit',
            constrain    : true,
            frame:true,
            plaint:true,
            width: 400,
            height: 450,
            plain: true,
            header: false,
            border: false,
            closable: false,
            draggable: false,
            // bodyPadding  : '5 5 5 5',
            border       : false,
            resizable    : false,
            modal        : true,
            autoShow     : false,
            defaultFocus : 'nome',
            buttonAlign : 'right',
            closable: false,
            items: [
                Ext.create('Ext.FormPanel', {
                    id:'formMaterialMoreSearch'+page,
                    title: 'More Search',
                    iconCls:'view_option',
                    frame: true,
                    border: false,
                    fieldDefaults: {
                        border: false,
                        // labelWidth: 110,
                        // labelStyle: 'color:green;padding-left:4px'
                    },
                    defaults: {
                        type: 'hbox',
                        pack: 'start',
                        align: 'stretch',
                        border:false,
                        frame:false,
                    },
                    items: [
                        {
                            flex: 1,
                            items: [
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Old Material Code',
                                    id: 'SearchMaterialOldCode'+page,
                                    labelAlign: 'top',
                                    width: '80%',
                                    editable: true,
                                    value: '',
                                    triggers: {
                                        clear: {
                                            type: 'clear',
                                            clearOnEscape: true
                                        }
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: 'Material Type',
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
                                    emptyText:'Select Type...',
                                    selectOnFocus:false,
                                    margin: '3 3 3 0',
                                    id: 'SearchMaterialType'+page,
                                    name:           'material_type',
                                    hiddenName:     'value',
                                    displayField:   'code',
                                    valueField:     'code',
                                    minChars : 0,
                                    listConfig: {
                                        loadingText: 'Searching...',
                                        emptyText: 'No matching data found!',
                                        getInnerTpl: function() {
                                            return '{entity_code_name} <span style="font-size: xx-small; ">{description}</span>';
                                        }
                                    },
                                    store: store_material_type,
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
                                                operator: 'eq',
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
                                            store_material_type.proxy.extraParams = {
                                                filter: Ext.encode(filters),
                                                action :'getEntity'
                                            };
                                            /*store_material_type.load({
                                                params:{
                                                    start:0,
                                                    limit:25
                                                }
                                            });*/
                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                            return true;
                                        },
                                        change: function (t,record,o) {
                                            // console.log(record);


                                        }

                                    },
                                    value: '',
                                    // readOnly:true,
                                    // hidden:!ROLE.MaterialType,
                                },
                                {
                                    xtype: 'combobox',
                                    // msgTarget: 'side',
                                    fieldLabel: 'Category',
                                    labelAlign: 'top',
                                    labelWidth: 90,
                                    width: 230,
                                    matchFieldWidth: false,
                                    forceSelection : true,
                                    mode: 'remote',
                                    triggerAction: 'all',
                                    selectOnTab: true,
                                    lazyRender: true,
                                    listClass: 'x-combo-list-small',
                                    emptyText:'Select Category ...',
                                    selectOnFocus:false,
                                    margin: '3 3 3 0',
                                    id: 'SearchMaterialCategory'+page,
                                    name:           'category',
                                    hiddenName:     'category',
                                    displayField:   'code',
                                    valueField:     'code',
                                    minChars : 0,
                                    pageSize:25,
                                    listConfig: {
                                        loadingText: 'Searching...',
                                        emptyText: 'No matching data found!',
                                        getInnerTpl: function() {
                                            return '{code} <span style="font-size: xx-small; ">{description}</span>';
                                        }
                                    },
                                    store:store_material_category,
                                    typeAhead: false,
                                    allowBlank:true,
                                    msgTarget: 'under',
                                    triggers: {
                                        clear: {
                                            type: 'clear',
                                            clearOnEscape: true
                                        }
                                    },
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

                                            store_material_category.proxy.extraParams = {
                                                filter: Ext.encode(filters),
                                                action :'getEntity'
                                            };

                                            /*store_material_category.load({
                                                params:{
                                                    start:0,
                                                    limit:25
                                                }
                                            });*/

                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                            return true;
                                        },
                                        change: function (t,record,o) {

                                        }

                                    },
                                    value: '',
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Ref No',
                                    id: 'SearchMaterialRefno'+page,
                                    labelAlign: 'top',
                                    width: '80%',
                                    editable: true,
                                    value: '',
                                    triggers: {
                                        clear: {
                                            type: 'clear',
                                            clearOnEscape: true
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Manufactur',
                                    id: 'SearchMaterialManufactur'+page,
                                    labelAlign: 'top',
                                    width: '80%',
                                    editable: true,
                                    value: '',
                                    triggers: {
                                        clear: {
                                            type: 'clear',
                                            clearOnEscape: true
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Functional Locations',
                                    id: 'SearchMaterialFuncLoc'+page,
                                    labelAlign: 'top',
                                    width: '80%',
                                    editable: true,
                                    value: '',
                                    triggers: {
                                        clear: {
                                            type: 'clear',
                                            clearOnEscape: true
                                        }
                                    }
                                },
                                {
                                    xtype: 'combobox',
                                    // msgTarget: 'side',
                                    fieldLabel: 'Filter Date',
                                    labelAlign: 'top',
                                    labelWidth: 90,
                                    width: 230,
                                    matchFieldWidth: false,
                                    forceSelection : true,
                                    mode: 'remote',
                                    triggerAction: 'all',
                                    selectOnTab: true,
                                    lazyRender: true,
                                    listClass: 'x-combo-list-small',
                                    emptyText:'Select Filter On ...',
                                    selectOnFocus:false,
                                    margin: '3 3 3 0',
                                    id: 'SearchFilterOn'+page,
                                    name:           'Name',
                                    hiddenName:     'value',
                                    displayField:   'name',
                                    valueField:     'value',
                                    minChars : 0,
                                    pageSize:25,
                                    store: Ext.create('Ext.data.Store', {
                                        id:'storeDataFilter',
                                        fields : ['name', 'value'],
                                        data   : [
                                            {name : 'Additional Date',   value: 'addition_datef'},
                                            {name : 'SAP Chek Date',  value: 'sap_material_code_datef'},
                                            {name : 'User Submit    ',  value: 'user_submit_datef'},
                                            {name : 'Cataloguer Chek Date',  value: 'cataloguer_datef'},
                                            {name : 'STD APP Chek Date',  value: 'std_approval_datef'},
                                            {name : 'Proc APP Chek Date',  value: 'proc_approver_datef'},
                                        ]
                                    }),
                                    value: '',
                                },
                                {
                                    xtype: 'datefield',
                                    anchor: '100%',
                                    fieldLabel: 'On Date',
                                    labelWidth: 69,
                                    id: 'on_filter_date'+page,
                                    // maxValue: new Date()
                                    // submitFormat: 'Y-m-d H:i:s',
                                    format: 'Y-m-d',
                                    // renderer    :Ext.util.Format.dateRenderer('d M Y H:i','GMT'),
                                    // submitFormat: 'Y-m-d',
                                },

                            ]

                        },

                    ],
                    tools: [
                        {
                            type: 'close',
                            handler: function () {
                                winMaterialMoreSearch.animateTarget = 'btnMoreSearch'+page;
                                winMaterialMoreSearch.hide();
                            }
                        }
                    ],

                })

            ],
            buttons: [
                {
                    text: 'Ok',
                    iconCls: 'accept',
                    handler: function(){
                        // Ext.getBody().mask("loading material multi...");
                        var fp = Ext.getCmp('formMaterialMoreSearch'+page);
                        if(fp.getForm().isValid()){
                            SearchMaterialMultiview();
                            // MaterialViewOptions(fp.getForm().getValues().vwOption);
                            // console.log(fp.getForm().getValues().vwOption);
                            // alert(fp.getForm().getValues(true));
                            // Ext.Msg.alert('Submitted Values', 'The following will be sent to the server: <br />'+
                            //     fp.getForm().getValues(true).replace(/&/g,', '));
                        }
                        winMaterialMoreSearch.animateTarget = 'btnMoreSearch'+page;
                        winMaterialMoreSearch.hide();
                       /*if(fp.getForm().isValid()){
                            Ext.Msg.alert('Submitted Values', 'The following will be sent to the server: <br />'+
                                fp.getForm().getValues(true).replace(/&/g,', '));
                        }*/
                    }
                },
                {
                    text: 'Cancel',
                    iconCls: 'cancel',
                    handler: function(){
                        Ext.getCmp('formMaterialMoreSearch'+page).getForm().reset();
                        winMaterialMoreSearch.animateTarget = 'btnMoreSearch'+page;
                        winMaterialMoreSearch.hide();

                    }
                }
            ],
        });

        ///////////////////////////////
        // Grid Material Multiview M //
        ///////////////////////////////
        var store_material_multiview_m = Ext.create('Ext.data.Store', {
            storeId:'store_material_multiview_m'+page,
            model: MetaDataModel,
            remoteSort: true,
            remoteFilter: true,
            sorters: [{
                property: 'adr_d_items_id'
            }],
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/getMultiViewCatalogM',//action=getInc
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    messageProperty: 'message',
                    rootProperty: 'data',
                    totalProperty:'total',
                    root:'data'
                },

            },
            listeners: {
                beforeload: function(store){
                    var grid = Ext.getCmp("grid_material_multiview_m"+page);
                    if(isEmpty(grid) == false){
                        Ext.getCmp("grid_material_multiview_m"+page).mask('Loading', 'x-mask-loading');
                    }

                },
                load: function(store, records, success, operation) {
                    Ext.getCmp("grid_material_multiview_m"+page).unmask();
                        // console.log(success);
                    /*var reader = store.getProxy().getReader(),
                        response = operation.getResponse();
                    var JsonData = response.responseText;
                    var resultJson = Ext.decode(JsonData,true);
                    if(isEmpty(resultJson) == false){
                        if(success){
                            var task = new Ext.util.DelayedTask(function(){
                                var grid = Ext.getCmp("grid_material_multiview_m"+page);
                                if(isEmpty(grid) == false){
                                    Ext.getCmp("grid_material_multiview_m"+page).unmask();
                                }
                            });
                            //start the task after 500 miliseconds
                            task.delay(200);
                        }
                    }*/

                }

            },
        });

        var filters = [];
        var transaction_type = new Ext.util.Filter({
            operator: 'eq',
            value: 'Material',
            property: "transaction_type",
            type: "string",
        });
        filters.push(transaction_type['initialConfig']) ;
        store_material_multiview_m.filter(filters);
        store_material_multiview_m.proxy.extraParams = {
            action:'getMultiView'
        };
        store_material_multiview_m.on('exception',function( store, records, options ){
            // do something about the record exception
        },this);
        var grid_material_multiview_m = Ext.create('Ext.grid.Panel', {
            store: store_material_multiview_m,
            height: 500,
            id: "grid_material_multiview_m"+page,
            selModel: MaterialItemSelect,
            region: 'center',
            loadMask: false,
            columns: [
                {
                    xtype: 'actioncolumn',
                    header: "User",
                    header:'User',
                    dataIndex: 'status_user',
                    // width: 45,
                    autoSizeColumn:true,
                    sortable: true,
                    locked: true,
                    hidden: false,
                    align:'center',
                    items:
                        [{
                            getClass: function(v, meta, rec) {
                                if (rec.get('status_user') === 1 ) {
                                    return 'icon-green';
                                } else {
                                    return 'icon-red';
                                }
                            }
                        }]
                },
                {
                    xtype: 'actioncolumn',
                    header: "Cat",
                    dataIndex: 'status_cat',
                    // width: 45,
                    autoSizeColumn:true,
                    sortable: true,
                    locked: true,
                    hidden: false,
                    align:'center',
                    items:
                        [{
                            getClass: function(v, meta, rec) {
                                if (rec.get('status_cat') === 1 && rec.get('status_user') === 1) {
                                    return 'icon-green';
                                } else {
                                    return 'icon-red';
                                }
                            }
                        }]
                },
                {
                    xtype: 'actioncolumn',
                    header: "Std App",
                    dataIndex: 'status_stdapp',
                    // width: 45,
                    autoSizeColumn:true,
                    sortable: true,
                    locked: true,
                    hidden: false,
                    align:'center',
                    items:
                        [{
                            getClass: function(v, meta, rec) {
                                if (rec.get('status_stdapp') === 1 && rec.get('status_user') === 1) {
                                    return 'icon-green';
                                } else {
                                    return 'icon-red';
                                }
                            }
                        }]
                },
                {
                    xtype: 'actioncolumn',
                    header: "Proc App",
                    dataIndex: 'status_proc',
                    // width: 45,
                    sortable: true,
                    autoSizeColumn:true,
                    locked: true,
                    hidden: false,
                    align:'center',
                    items:
                        [{
                            getClass: function(v, meta, rec) {
                                if (rec.get('status_proc') === 1 && rec.get('status_user') === 1) {
                                    return 'icon-green';
                                } else {
                                    return 'icon-red';
                                }
                            }
                        }]
                },
                {
                    xtype: 'actioncolumn',
                    header: "SAP",
                    dataIndex: 'status_sap',
                    // width: 45,
                    sortable: true,
                    autoSizeColumn:true,
                    locked: true,
                    hidden: false,
                    align:'center',
                    items:
                        [{
                            getClass: function(v, meta, rec) {
                                if (rec.get('status_sap') === 1 && rec.get('status_user') === 1) {
                                    return 'icon-green';
                                } else {
                                    return 'icon-red';
                                }
                            }
                        }]
                },
                // START SEND EMAIL MATERIAL
                {
                    header: "TT",
                    dataIndex: 'transaction_type',
                    // width: 100,
                    sortable: true,
                    locked: true,
                    hidden:true,
                    filter:'string',
                    autoSizeColumn:true
                },
                {
                    header: "SNC",
                    dataIndex: 'short_name_code',
                    // width: 100,
                    sortable: true,
                    locked: true,
                    hidden:true,
                    filter:'string',
                    autoSizeColumn:true
                },
                // END SEND EMAIL MATERIAL
                {
                    header: "Catalogue No",
                    dataIndex: 'catalog_no',
                    width: 100,
                    sortable: true,
                    locked: true,
                    filter:'string',
                },
                {
                    header: "Short Description",
                    dataIndex: 'short_description',
                    width: 250,
                    sortable: true,
                    locked: true,
                    filter:'string',
                    autoSizeColumn:false
                },
                {
                    header: "ADR Number",
                    dataIndex: 'adr_no',
                    // width: 100,
                    sortable: true,
                    locked: true,
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
                    filter:{
                        type: 'date',
                        dateFormat: 'Y-m-d',  
                            pickerDefaults: {
                            // any DatePicker configs
                        },
                        active: true 
                    }
                },
                {
                    text: "SAP No",
                    dataIndex: 'sap_material_code',
                    width: 150,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    // autoSizeColumn:true,
                    editor : {
                        xtype: 'textfield',
                        allowBlank:false,
                        listeners:{
                            change:function(record){
                                Ext.getCmp('sap_material_code'+page).setValue(record.lastValue);
                            }
                        }
                    }
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
                     filter:{
                        type: 'date',
                        dateFormat: 'Y-m-d',  
                            pickerDefaults: {
                            // any DatePicker configs
                        },
                        active: true 
                    }
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
                    xtype       :'datecolumn' ,
                    text: "Submit Date",
                    dataIndex: 'user_submit_date',
                    autoSizeColumn:true,
                    width: 45,
                    sortable: true,
                    locked: false,
                    hidden: false,
                    align       : 'center',
                    format      : 'd/m/Y' ,
                    renderer    :Ext.util.Format.dateRenderer('d M Y H:i','GMT'),
                 filter:{
                        type: 'date',
                        dateFormat: 'Y-m-d',  
                            pickerDefaults: {
                            // any DatePicker configs
                        },
                        active: true 
                    }
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
                    text: "Sync Status ",
                    dataIndex: 'sync_status',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true,
                    cls: 'custom-dirty',
                    renderer: function(value, meta) {
                        if (value === 'success') {
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
                    editor : {
                        xtype:'combo',
                        width:'200',
                        allowBlank:false,
                        matchFieldWidth: false,
                        forceSelection: true,
                        typeAhead: false,
                        selectOnFocus: false,
                        triggerAction: 'all',
                        mode: 'remote',
                        displayField: 'inc',
                        valueField: 'inc',
                        minChars: 0,
                        store: store_material_inc,
                        pageSize: 25,
                        lazyInit: false,
                        disabled:false,
                        listConfig: {
                            loadingText: 'Searching...',
                            emptyText: 'No matching data found!',
                            getInnerTpl: function() {
                                return '{class_inc_name}';
                            },
                        },
                        listeners: {
                            scope: this,
                            beforequery: function(queryEvent, eOpts ,value) {
                                var selectedRecord = grid_material_multiview_m.getSelectionModel().getSelection()[0];
                                var row = grid_material_multiview_m.store.indexOf(selectedRecord);
                                var record = store_material_multiview_m.getAt(row);

                                var filters = [];
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

                                var transaction_type_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: 'Material',
                                    property: "transaction_type",
                                    type: "string",
                                });
                                filters.push(transaction_type_filter['initialConfig']) ;

                                // if(queryEvent.query.toLowerCase()){
                                store_material_inc.proxy.extraParams = {
                                    filter: Ext.encode(filters),
                                };
                                store_material_inc.load({
                                    params:{
                                        start:0,
                                        limit:25
                                    }
                                });
                                Ext.Ajax.abortAll(); //cancel any previous requests
                                return true;
                            },
                            select: function(t, record, o) {
                                var matching = store_material_inc.queryBy(
                                    function(rec, id) {
                                        if (rec.data.inc == record.data.inc) {
                                            var selectedRecord = grid_material_multiview_m.getSelectionModel().getSelection()[0];
                                            var row = grid_material_multiview_m.store.indexOf(selectedRecord);
                                            var recordSet = store_material_multiview_m.getAt(row);
                                            recordSet.set("short_description", record.data.short_name_code);
                                            recordSet.set("long_description", record.data.short_name_code);
                                            recordSet.set("groupclass", '');
                                            recordSet.set("inc_m_id", record.data.id);
                                            /*if(recordSet.data.name_code){
                                             Ext.getCmp('material_name_code'+page).setValue(record.data.name_code);
                                             }else{
                                             Ext.getCmp('material_name_code'+page).setValue(record.data.inc_name_code);
                                             }*/
                                            Ext.getCmp('material_name_code'+page).setValue(record.data.item_name);
                                            // Ext.getCmp('material_name_code'+page).setValue(selectedRecord[0].data.name_code);
                                            Ext.getCmp('material_short_name_code'+page).setValue(record.data.short_name_code);
                                            Ext.getCmp('material_short_description'+page).setValue(record.data.short_name_code);
                                            Ext.getCmp('material_long_description'+page).setValue(record.data.short_name_code);


                                            var filters = [];
                                            var inc_filter = new Ext.util.Filter({
                                                operator: 'eq',
                                                value: rec.data.inc,
                                                property: "inc",
                                                type: "string",
                                            });
                                            filters.push(inc_filter['initialConfig']) ;


                                            if(rec.data.inc ==  selectedRecord.data.inc){
                                                var filter_adr_d_items_id = new Ext.util.Filter({
                                                    operator: 'eq',
                                                    value: selectedRecord.data.adr_d_items_id,
                                                    property: "adr_d_items_id",
                                                    type: "numeric",
                                                });
                                                filters.push(filter_adr_d_items_id['initialConfig']) ;
                                                var changes = false ;
                                            }else{
                                               var  changes = true ;
                                            }


                                            var sorters = [];
                                            var seq_shorter = new Ext.util.Sorter({
                                                property: "sequence",
                                                direction: "ASC",
                                            });
                                            sorters.push(seq_shorter['initialConfig']) ;


                                            store_material_item_char.proxy.extraParams = {
                                                inc_m_id:record.data.id,
                                                adr_d_items_id: selectedRecord.data.adr_d_items_id,
                                                catalog_no: selectedRecord.data.catalog_no,
                                                sort: Ext.encode(sorters),
                                            };

                                            store_material_item_char.load({
                                                params:{
                                                    start:0,
                                                    limit:300
                                                }
                                            });

                                            var filters = [];
                                            var groupclassType_filter = new Ext.util.Filter({
                                                operator: 'eq',
                                                value: 'Material',
                                                property: "transaction_type",
                                                type: "string",
                                            });
                                            // if(queryEvent.query.toLowerCase()){
                                            filters.push(groupclassType_filter['initialConfig']) ;

                                            var inc_filter = new Ext.util.Filter({
                                                operator: 'eq',
                                                value: record.data.inc,
                                                property: "inc",
                                                type: "string",
                                            });
                                            filters.push(inc_filter['initialConfig']) ;

                                            store_mgc.proxy.extraParams = {
                                                _token : csrf_token,
                                                filter: Ext.encode(filters),
                                            };
                                            store_mgc.load({
                                                params:{

                                                }
                                            });

                                            return;
                                        }
                                    });

                            }
                        }
                    }
                },
                {
                    text: "MGC",
                    dataIndex: 'groupclass',
                    width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    // autoSizeColumn:true,
                    editor : {
                        xtype: 'combobox',
                        allowBlank:false,
                        matchFieldWidth: false,
                        forceSelection: true,
                        typeAhead: true,
                        selectOnFocus: true,
                        triggerAction: 'all',
                        name: 'groupclass',
                        displayField: 'groupclass',
                        valueField: 'groupclass',
                        store: store_mgc,
                        pageSize: 25,
                        displayMsg: 'Displaying record {0} - {1} of {2}',
                        displayInfo: true,
                        minChars : 0,
                        margin: '0 13 0 0',
                        // disabled:true,
                        mode: 'remote',
                        emptyText: 'Select MGC ...',
                        listConfig: {
                            loadingText: 'Searching...',
                            emptyText: 'No matching data found!',

                            displayInfo: true,
                            getInnerTpl: function() {
                                return '{group_class_name}';
                            },
                        },
                        listeners: {
                            scope: this,
                            beforequery: function(queryEvent, eOpts ,value) {
                                // console.log();
                                var filters = [];
                                var groupclass_filter = new Ext.util.Filter({
                                    operator: 'like',
                                    value: queryEvent.query.toLowerCase(),
                                    property: "group_class_name",
                                    type: "string",
                                });
                                if(queryEvent.query.toLowerCase()){
                                    filters.push(groupclass_filter['initialConfig']) ;
                                }
                                var transaction_type = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: 'Material',
                                    property: "transaction_type",
                                    type: "string",
                                });
                                filters.push(transaction_type['initialConfig']) ;
                                var selectedRecord = grid_material_multiview_m.getSelectionModel().getSelection()[0];
                                var inc_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: selectedRecord.data.inc,
                                    property: "inc",
                                    type: "string",
                                });
                                filters.push(inc_filter['initialConfig']) ;
                                // store_mgc.filter(filters);
                                store_mgc.proxy.extraParams = {
                                    filter: Ext.encode(filters),
                                    limit:queryEvent.combo.pageSize
                                };
                                Ext.Ajax.abortAll(); //cancel any previous requests
                                return true;
                            },
                            select: function (combo , record ,o) {
                                var matching = store_mgc.queryBy(
                                    function(rec, id) {
                                        if (rec.data.groupclass == record.data.groupclass) {

                                        }
                                    });

                            },
                        },

                    }
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
/*                 {
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
                }, */
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
                    // autoSizeColumn:true
                    editor: {
                        xtype:'combo',
                        width:'200',
                        allowBlank:false,
                        matchFieldWidth: false,
                        forceSelection: true,
                        typeAhead: true,
                        selectOnFocus: false,
                        triggerAction: 'all',
                        mode: 'remote',
                        name:           'material_type',
                        displayField:   'code',
                        valueField:     'code',
                        minChars: 0,
                        store: store_material_type,
                        pageSize: 25,
                        disabled:false,
                        listConfig: {
                            loadingText: 'Searching...',
                            emptyText: 'No matching data found!',
                            getInnerTpl: function() {
                                return '{entity_code_name} <span style="font-size: xx-small; ">{description}</span>';
                            }
                        },
                        listeners: {
                            scope: this,
                            beforequery: function(queryEvent, eOpts ,value) {
                                var filters = [];

                                var entity_name = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: 'material_type',
                                    property: "entity_name",
                                    type: "string",
                                });

                                filters.push(entity_name['initialConfig']) ;

                                store_material_type.proxy.extraParams = {
                                    filter: Ext.encode(filters),
                                    action :'getEntity' ,
                                    limit:queryEvent.combo.pageSize
                                };

                                Ext.Ajax.abortAll(); //cancel any previous requests
                                return true;
                            },
                            select: function(t, record, o) {
                                var matching = store_material_type.queryBy(
                                function(rec, id) {
                                    if (rec.data.code == record.data.code) {


                                        return;
                                    }
                                });

                            }
                        }
                    },
                },
                {
                    text: "UOM",
                    dataIndex: 'uom',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true,
                    editor: {
                        xtype:'combo',
                        width:'200',
                        allowBlank:false,
                        matchFieldWidth: false,
                        forceSelection: true,
                        typeAhead: true,
                        selectOnFocus: false,
                        triggerAction: 'all',
                        mode: 'remote',
                        name:           'uom',
                        displayField:   'code',
                        valueField:     'code',
                        minChars: 0,
                        store: store_material_uom,
                        pageSize: 5,
                        disabled:false,
                        listConfig: {
                            loadingText: 'Searching...',
                            emptyText: 'No matching data found!',
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

                                store_material_uom.proxy.extraParams = {
                                    filter: Ext.encode(filters),
                                    action :'getEntity' ,
                                    limit:queryEvent.combo.pageSize
                                };

                                Ext.Ajax.abortAll(); //cancel any previous requests
                                return true;
                            },
                            select: function(t, record, o) {
                                var matching = store_material_type.queryBy(
                                function(rec, id) {
                                    if (rec.data.code == record.data.code) {


                                        return;
                                    }
                                });

                            }
                        }
                    },
                },
                {
                    text: "Category",
                    dataIndex: 'category',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true,
                    editor: {
                        xtype:'combo',
                        width:'200',
                        allowBlank:false,
                        matchFieldWidth: false,
                        forceSelection: true,
                        typeAhead: true,
                        selectOnFocus: false,
                        triggerAction: 'all',
                        mode: 'remote',
                        name:           'category',
                        displayField:   'code',
                        valueField:     'code',
                        minChars: 0,
                        store: store_material_category,
                        pageSize: 25,
                        disabled:false,
                        listConfig: {
                            loadingText: 'Searching...',
                            emptyText: 'No matching data found!',
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
                                    value: 'itemcategory',
                                    property: "entity_name",
                                    type: "string",
                                });

                                filters.push(entity_name['initialConfig']) ;

                                store_material_category.proxy.extraParams = {
                                    filter: Ext.encode(filters),
                                    action :'getEntity' ,
                                    limit:queryEvent.combo.pageSize
                                };

                                Ext.Ajax.abortAll(); //cancel any previous requests
                                return true;
                            },
                            select: function(t, record, o) {
                                var matching = store_material_type.queryBy(
                                function(rec, id) {
                                    if (rec.data.code == record.data.code) {


                                        return;
                                    }
                                });

                            }
                        }
                    },
                },
                {
                    text: "Cataloguer",
                    dataIndex: 'cataloguer',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true,
                    editor:{
                        xtype: 'combo',
                        labelWidth: 130,
                        width: 270,
                        matchFieldWidth: false,
                        forceSelection : true,
                        mode: 'remote',
                        triggerAction: 'all',
                        emptyText:'Select Cataloguer...',
                        selectOnFocus:true,
                        margin: '3 3 3 0',
                        name:           'cataloguer',
                        hiddenName:     'value',
                        displayField:   'value',
                        valueField:     'value',
                        minChars : 0,
                        typeAhead: true,
                        selectOnFocus: false,
                        triggerAction: 'all',
                        store:          Ext.create('Ext.data.Store', {
                            fields : ['name', 'value'],
                            data   : [
                                {name : 'Validate',   value: 'Validate'},
                                {name : 'Not Validate',  value: 'Not Validate'},
                            ]
                        }),
                        allowBlank:true,
                        msgTarget: 'under',
                        listeners: {
                            change: function (t,record,o) {

                            },
                            select:function(combo,record,Option){
                            }
                        },
                        value: '',
                        // hidden:!ROLE.Cataloguer,
                        // readOnly:true
                    }
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
                // {
                //     xtype       :'datecolumn' ,
                //     text: "Cataloguer Check Date",
                //     dataIndex: 'cataloguer_date',
                //     autoSizeColumn:true,
                //     width: 45,
                //     sortable: true,
                //     locked: false,
                //     hidden: false,
                //     align       : 'center',
                //     format      : 'd/m/Y' ,
                //     renderer    :Ext.util.Format.dateRenderer('d M Y m:s','GMT'),
                //     // renderer: render_stat
                // },
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
                   filter:{
                        type: 'date',
                        dateFormat: 'Y-m-d',  
                            pickerDefaults: {
                            // any DatePicker configs
                        },
                        active: true 
                    }
                },
                {
                    text: "Std App",
                    dataIndex: 'std_approval',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true,
                    editor:{
                        xtype: 'combo',
                        labelWidth: 130,
                        width: 270,
                        mode: 'remote',
                        triggerAction: 'all',
                        emptyText:'Select Std App...',
                        margin: '3 3 3 0',
                        name:           'std_approval',
                        hiddenName:     'value',
                        displayField:   'value',
                        valueField:     'value',
                        minChars : 0,
                        matchFieldWidth: false,
                        forceSelection: true,
                        typeAhead: true,
                        selectOnFocus: false,
                        triggerAction: 'all',
                        store:          Ext.create('Ext.data.Store', {
                            fields : ['name', 'value'],
                            data   : [
                                {name : 'Validate',   value: 'Validate'},
                                {name : 'Not Validate',  value: 'Not Validate'},
                            ]
                        }),
                        msgTarget: 'under',
                        listeners: {
                            change: function (t,record,o) {

                            }
                        },
                        value: '',
                        // hidden:!ROLE.Cataloguer,
                        // readOnly:true
                    }
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
                  filter:{
                        type: 'date',
                        dateFormat: 'Y-m-d',  
                            pickerDefaults: {
                            // any DatePicker configs
                        },
                        active: true 
                    }
                },
                {
                    text: "Proc App",
                    dataIndex: 'proc_approver',
                    // width: 100,
                    sortable: true,
                    locked: false,
                    filter:'string',
                    autoSizeColumn:true,
                    editor:{
                        xtype: 'combo',
                        labelWidth: 130,
                        width: 270,
                        matchFieldWidth: false,
                        forceSelection: true,
                        mode: 'remote',
                        triggerAction: 'all',
                        emptyText:'Select Cataloguer...',
                        selectOnFocus:true,
                        margin: '3 3 3 0',
                        name:           'proc_approver',
                        hiddenName:     'value',
                        displayField:   'value',
                        valueField:     'value',
                        minChars : 0,
                        typeAhead: true,
                        selectOnFocus: false,
                        triggerAction: 'all',
                        store:          Ext.create('Ext.data.Store', {
                            fields : ['name', 'value'],
                            data   : [
                                {name : 'Validate',   value: 'Validate'},
                                {name : 'Not Validate',  value: 'Not Validate'},
                            ]
                        }),
                        allowBlank:true,
                        msgTarget: 'under',
                        listeners: {
                            change: function (t,record,o) {

                            },
                            select:function(record){
                                if(record == 'Not Validate'){
                                    var selectedRecord = Ext.getCmp('grid_material_multiview_m'+page).getSelectionModel().getSelection()[0];
                                    var row = Ext.getCmp('grid_material_multiview_m'+page).store.indexOf(selectedRecord);
                                    var recordSet = store_material_multiview_m.getAt(row);
                                    // recordSet.set("category", '');
                                    // recordSet.set("cataloguer", '');

                                }
                           }

                        },
                        value: '',
                        // hidden:!ROLE.Cataloguer,
                        // readOnly:true
                    }
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
                    filter:{
                        type: 'date',
                        dateFormat: 'Y-m-d',  
                            pickerDefaults: {
                            // any DatePicker configs
                        },
                        active: true 
                    }
                },
            ],
            selType: 'cellmodel',
            plugins: [
                'gridfilters',
                {
                    ptype: 'cellediting',
                    clicksToEdit: 2,
                    listeners: {
                        beforeedit: function(editor, e, eOpts) {
                            var record = store_material_catalog_m.getData().items[0];
                            var std_app_category = "Std App "+record.data.category ;
                            var record = e.record ;
                            var fields = e.field ;
                            MChangescat = record.data.catalog_no;
                            // alert(Changescat);
                            switch(true) {
                                case (user_level === "User"):
                                    if (fields === 'groupclass' || fields === 'inc' || fields === 'material_type' || fields === 'uom' || fields === 'category' ){
                                        return MaterialGridEditor ;
                                    }else{
                                        return false ;
                                    }
                                    break;
                                case (user_level ==="Cat"):
                                    if (fields === 'groupclass' || fields === 'inc' || fields === 'material_type' || fields === 'uom' || fields === 'category' || fields === 'cataloguer' ){
                                        return MaterialGridEditor ;

                                    }else{
                                        return false ;
                                    }
                                    break;
                                case (user_level === std_app_category) :
                                    if (fields === 'std_approval'){
                                        return MaterialGridEditor ;
                                    }else{
                                        return false ;
                                    }
                                    break;
                                case (user_level === "Proc"):
                                    switch(record.data.status_proc){
                                        case 0:
                                            // console.log('Event  '+record.data.material_type);
                                            if(record.data.material_type =='ZOEM'){
                                                if (fields === 'proc_approver' || fields === 'sap_material_code'){
                                                    return MaterialGridEditor ;
                                                }else{
                                                    return false ;
                                                }
                                            }else{
                                                if (fields === 'proc_approver'){
                                                    return MaterialGridEditor ;
                                                }else{
                                                    return false ;
                                                }
                                            }

                                        break;
                                        case 1:
                                            if (fields === 'sap_material_code'){
                                                return MaterialGridEditor ;
                                            }else{
                                                return false ;
                                            }
                                        break;
                                    }
                                    break;
                                default:
                                    return false;
                                break;
                            }
                        },
                        afteredit: function(editor, e, eOpts) {

                        },

                    }
                },
            ],
            bind: {
                store: '{itemsStore}'
            },
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
            tbar: [
            {
                xtype: 'textfield',
                fieldLabel: 'Name Code',
                labelWidth: 80,
                width: 200,
                id: 'SearchMaterialNameCodeMultiView'+page,
                margin: '0 15 0 0',
                allowBlank: true,
                listeners: {
                    specialkey: function(field, e) {
                        if (e.getKey() === e.ENTER) {
                            SearchMaterialMultiview();
                        }
                    }
                },
                hidden:true
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Short Desc',
                labelWidth: 80,
                width: 200,
                id: 'SearchMaterialShortDescMultiView'+page,
                margin: '0 15 0 0',
                allowBlank: true,
                listeners: {
                    specialkey: function(field, e) {
                        if (e.getKey() === e.ENTER) {
                            SearchMaterialMultiview();
                        }
                    }
                }
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Raw Data',
                labelWidth: 80,
                width: 200,
                id: 'SearchMaterialRawDataMultiView'+page,
                margin: '0 15 0 0',
                allowBlank: true,
                listeners: {
                    specialkey: function(field, e) {
                        if (e.getKey() === e.ENTER) {
                            SearchMaterialMultiview();
                        }
                    }
                }
            },
            {
                xtype: 'button',
                text: 'More Search',
                id:'btnMoreSearch'+page,
                margin: '0 10 0 0',
                iconCls:'search',
                handler: function() {
                    winMaterialMoreSearch.animateTarget = 'btnMoreSearch'+page;
                    winMaterialMoreSearch.show();
                }
            },
            {
                xtype: 'tbfill'
            },
            {
                xtype: 'button',
                text: 'Reset',
                margin: '0 5 0 0',
                iconCls:'clear',
                handler: function() {
                    Ext.getCmp('SearchMaterialNameCodeMultiView'+page).reset();
                    Ext.getCmp('SearchMaterialShortDescMultiView'+page).reset();
                    Ext.getCmp('SearchMaterialRawDataMultiView'+page).reset();
                    Ext.getCmp('formMaterialMoreSearch'+page).getForm().reset();
                    // Ext.getCmp('create_material_dialog').close();
                    SearchMaterialMultiview();
                    // console.log(store_material_multiview_m.filters.items);
                    grid_material_multiview_m.store.clearFilter();
                    var filters = [];
                    var transaction_type = new Ext.util.Filter({
                        operator: 'eq',
                        value: 'Material',
                        property: "transaction_type",
                        type: "string",
                    });
                    filters.push(transaction_type['initialConfig']) ;
                    store_material_multiview_m.filter(filters);
                    store_material_multiview_m.proxy.extraParams = {
                        action:'getMultiView'
                    };
                    store_material_multiview_m.load({
                        params:{
                            start:0,
                            limit:25
                        }
                    });

                }
            },
            {
                xtype: 'button',
                text: 'Search',
                margin: '0 10 0 0',
                iconCls:'text_preview',
                handler: function() {
                    // Ext.getCmp('create_material_dialog').close();
                    SearchMaterialMultiview();
                }
            },
            "-",
            /*{
              xtype: 'exporterbutton',
              store: store_material_multiview_m

            }*/
            {
                xtype: 'button',
                text: 'Export',
                iconCls:'report-xls',
                margin: '0 15 0 0',
                handler: function() {
                    var allRecords = Ext.pluck(store_material_multiview_m.data.items, 'data') ;
                    Ext.Ajax.request({
                        url: 'ExportMV/xlsx',
                        method: 'POST',
                        autoAbort: false,
                        params:{
                            transaction_type : 'Material',
                            data : Ext.encode(allRecords),
                            _token: csrf_token,
                            filter: store_material_multiview_m.getProxy().extraParams.filter,
                            page: store_material_multiview_m.lastOptions.page ,
                            start: store_material_multiview_m.lastOptions.start ,
                            limit: store_material_multiview_m.lastOptions.limit
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
                }
            },
                        {
                xtype: 'button',
                text: 'Export All',
                iconCls:'report-xls',
                margin: '0 15 0 0',
                handler: function() {
                    var allRecords = Ext.pluck(store_material_multiview_m.data.items, 'data') ;
                    Ext.Ajax.request({
                        url: 'ExportMV_All/xlsx',
                        method: 'POST',
                        autoAbort: false,
                        params:{
                            transaction_type : 'Material',
                            data : Ext.encode(allRecords),
                            _token: csrf_token
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
                }
            }
            ],
            bbar: [
                {
                    xtype: 'resizer.pagingtoolbar',
                    store: store_material_multiview_m,
                    pageSize: 25,
                    // id: 'paging_multi',
                    displayInfo: true,
                    displayMsg: '{0} - {1} of {2}',
                    emptyMsg: "No records to display",
                    border:false,
                },
                "-",
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    text: 'View Option',
                    iconCls:'view_option',
                    id:'btnMaterialViewOption'+page,
                    handler: function() {
                        winMaterialViewOption.show();
                    }
                },

            ],
            listeners: [
                {
                    selectionchange: function(sm, selectedRecord) {
                        // console.log(selectedRecord);
                    },
                    beforerender: function() {

                    },
                    select: function(selModel, record, index, options){

                    },
                    itemclick: function(grid_presensi_karywan_m, record, item, index, e) {


                   }
                }
            ],
            // cls: 'mygrid-panel'
        });

        ////////////////////////////////////
        // Form Material Multiview Detail //
        ////////////////////////////////////
        var form_material_multiview_d = Ext.create('Ext.form.Panel', {
            border:false,
            region:'south',
            height:250,
            autoScroll:true,
            layout:'border',
            id:'form_material_multiview_d'+page,
            items: [
                {
                    region:'west',
                    autoScroll:true,
                    split:true,
                    collapsible:true,
                    header:false,
                    items: [
                        {
                            layout: {
                                type  : 'vbox',
                                align : 'stretch'
                            },
                            xtype: 'fieldset',
                            title: 'Material Item',
                            width: 500,
                            // height:400,
                            autoScroll: true,
                            collapsible: false,
                            margin: '0 10 0 10',
                            border:true,
                            items: [
                                {
                                    xtype:'textfield',
                                    id:'mandatory'+page,
                                    name:'mandatory',
                                    allowBlank:true,
                                    hidden:true
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'material_adr_m_status'+page,
                                    name:'adr_status',
                                    width: 350,
                                    editable: true,
                                    value: '',
                                    readOnly:true,
                                    hidden:true
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'material_adr_d_items_status'+page,
                                    name:'item_status',
                                    width: 350,
                                    editable: true,
                                    value: '',
                                    readOnly:true,
                                    hidden:true
                                },
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
                                    id: 'material_catalog_no'+page,
                                    name:'catalog_no',
                                    fieldLabel: 'Catalog No.',
                                    editable: false,
                                    // width: 100,
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'sap_material_code'+page,
                                    name:'sap_material_code',
                                    fieldLabel: 'SAP No.',
                                    editable: false,
                                    // width: 135,
                                    value: '',
                                    submitValue: false,
                                },
                                {
                                    xtype: 'textareafield',
                                    fieldLabel: 'Raw',
                                    id: 'material_raw'+page,
                                    name:'raw',
                                    editable: false,
                                    margin: '0 10 10 0',
                                    height: '100%',
                                    flex: 1,
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'material_name_code'+page,
                                    fieldLabel: 'Short Name Code.',
                                    name:'name_code',
                                    editable: false,
                                    // width: 100,
                                    value: '',
                                    hidden:false,
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'material_short_name_code'+page,
                                    fieldLabel: 'Material Short Name Code.',
                                    name:'short_name_code',
                                    editable: false,
                                    // width: 100,
                                    value: '',
                                    hidden:true,
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'material_short_description'+page,
                                    fieldLabel: 'Short Description',
                                    name:'short_description',
                                    editable: false,
                                    // width: 100,
                                    value: ''
                                },
                                {
                                    xtype: 'textareafield',
                                    fieldLabel: 'Long Desc.',
                                    // id: 'material_multi_sel_long'+page,
                                    id:'material_long_description'+page,
                                    name:'long_description',
                                    editable: false,
                                    margin: '0 10 10 0',
                                    height: '100%',
                                    flex: 1,
                                    value: ''
                                },
                                /*{
                                    xtype: 'textareafield',
                                    fieldLabel: 'characteristic value',
                                    // id: 'material_multi_sel_long'+page,
                                    id:'material_char_value'+page,
                                    name:'material_char_value',
                                    editable: false,
                                    margin: '0 10 10 0',
                                    height: '100%',
                                    flex: 1,
                                    value: '',
                                    hidden:true,
                                },*/
                                {
                                    xtype: 'displayfield',
                                    id: 'material_owner'+page,
                                    labelWidth: 130,
                                    width: 300,
                                    fieldLabel: 'Material Owner',
                                    value: ''
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
                    autoScroll:true,
                    // height:300,
                    items: [
                        grid_material_inc_characteristic,
                        {
                            xtype: 'splitter',
                        },
                        grid_material_cross_references,
                        {
                            xtype: 'splitter',
                        },
                        grid_material_funcloc
                    ]
                }
            ],
            bbar:[
                {
                        xtype: 'button',
                        text: 'view notes',
                        iconCls:'browse',
                        margin: '0 0 0 10',
                        id:'btnMaterialViewNotes'+page,
                        hidden:!ROLE.ViewNotes,
                        disabled:true,
                        handler: function() {
                            winMaterialViewNotes.animateTarget = 'btnMaterialViewNotes'+page;
                            winMaterialViewNotes.setTitle("Material View Notes Catalog No."+Ext.getCmp('material_catalog_no'+page).getValue()),
                            winMaterialViewNotes.show();
                            var filters = [];
                            var adr_d_items_id_filter = new Ext.util.Filter({
                                operator: 'eq',
                                value: Ext.getCmp('material_adr_d_items_id'+page).getValue(),
                                property: "adr_d_items_id",
                                type: "string",
                            });
                            filters.push(adr_d_items_id_filter['initialConfig']) ;
                            // console.log(filters);
                            store_material_view_notes.proxy.extraParams = {
                                filter: Ext.encode(filters),
                                action:'getViewNotes'
                            };
                            store_material_view_notes.load({
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
                    xtype:'button',
                    text:'Apply Changes',
                    id:'btnMaterialApplyChanges'+page,
                    iconCls:'accept',
                    disabled:true,
                    // hidden:!ROLE.MaterialApplyChanges,
                    handler:function(){
                        var grid_material_multiview_m = Ext.getCmp('grid_material_multiview_m'+page).getSelectionModel().getSelection()[0];
                        var material_items_char = Ext.encode(Ext.pluck(store_material_item_char.data.items, 'data'));
                        var material_type = grid_material_multiview_m.data.material_type ;
                        var uom = grid_material_multiview_m.data.uom ;
                        var category = grid_material_multiview_m.data.category ;
                        var cataloguer = grid_material_multiview_m.data.cataloguer ;
                        var std_approval = grid_material_multiview_m.data.std_approval ;
                        var proc_approver = grid_material_multiview_m.data.proc_approver ;
                        var sap_material_code = grid_material_multiview_m.data.sap_material_code ;

                        var CatApp = grid_material_multiview_m.data.cataloguer ;
                        var StdApp = grid_material_multiview_m.data.std_approval ;
                        var ProcApp = grid_material_multiview_m.data.proc_approver ;
                        var SAPMaterialCode = grid_material_multiview_m.data.sap_material_code ;
                        var catalogNo = grid_material_multiview_m.data.catalog_no;
                        // // START SEND EMAIl
                        // var tiperequest = grid_material_multiview_m.data.transaction_type;
                        // var toemail = grid_material_multiview_m.data.email_user;
                        // var email_cat = grid_material_multiview_m.data.email_cat;
                        // var email_std = grid_material_multiview_m.data.email_std;
                        // var email_proc = grid_material_multiview_m.data.email_proc;
                        // var short_name = grid_material_multiview_m.data.short_description;
                        // END SEND EMAIl
                        Ext.MessageBox.show({
                            msg: 'Saving your data, please wait...',
                            progressText: 'Saving...',
                            width:300,
                            wait:true,
                            waitConfig: {interval:200},
                            icon:'ext-mb-download',
                            animEl: 'buttonID'
                        });

                        // console.log(store_inc_char_value_entry_check.data.items);
                        var data = [];
                        var rs = store_material_multiview_m.getModifiedRecords();
                        for (var i = 0, ln = rs.length; i < ln; i++) {
                            var catalog_no = rs[i].data.catalog_no ;
                            window['catalog_no'] = rs[i].data.catalog_no ;
                            var inc = rs[i].data.inc ;
                            if(isEmpty(inc) == true ){
                                Ext.MessageBox.show({
                                    title : 'Message',
                                    msg:'Please Check Your INC Catalog No '+window['catalog_no'],
                                    buttons: Ext.MessageBox.OK,
                                    icon :  Ext.MessageBox.WARNING
                                });
                                return true;
                            }
                            var mgc = rs[i].data.groupclass ;
                            if(isEmpty(mgc) == true ){
                                Ext.MessageBox.show({
                                    title : 'Message',
                                    msg:'Please Check Your MGC Catalog No '+window['catalog_no'] ,
                                    buttons: Ext.MessageBox.OK,
                                    icon :  Ext.MessageBox.WARNING
                                });
                                return true;
                            }
                            var material_type = rs[i].data.material_type ;
                            if(isEmpty(material_type) == true ){
                                Ext.MessageBox.show({
                                    title : 'Message',
                                    msg:'Please Check Your Material Type Catalog No '+window['catalog_no'] ,
                                    buttons: Ext.MessageBox.OK,
                                    icon :  Ext.MessageBox.WARNING
                                });
                                return true;
                            }
                            var uom = rs[i].data.uom ;
                            if(isEmpty(uom) == true) {
                                Ext.MessageBox.show({
                                    title : 'Message',
                                    msg:'Please Check Your UOM Catalog No '+window['catalog_no'],
                                    buttons: Ext.MessageBox.OK,
                                    icon :  Ext.MessageBox.WARNING
                                });
                                return true;
                            }
                            if (user_level == 'User') {
                                var category = rs[i].data.category ;
                                if(isEmpty(category) == true) {
                                    Ext.MessageBox.show({
                                        title : 'Message',
                                        msg:'Please Check Your Category Catalog No '+window['catalog_no'] ,
                                        buttons: Ext.MessageBox.OK,
                                        icon :  Ext.MessageBox.WARNING
                                    });
                                    return true;
                                }
                            }
                            
                            if (user_level == 'Cat') {
                                var category = rs[i].data.category ;
                                if(isEmpty(category) == true) {
                                    Ext.MessageBox.show({
                                        title : 'Message',
                                        msg:'Please Check Your Category Catalog No '+window['catalog_no'] ,
                                        buttons: Ext.MessageBox.OK,
                                        icon :  Ext.MessageBox.WARNING
                                    });
                                    return true;
                                }

                                var cataloguer = rs[i].data.cataloguer ;
                                if(isEmpty(cataloguer) == true) {
                                    Ext.MessageBox.show({
                                        title : 'Message',
                                        msg:'Please Check Your Cataloger Catalog No '+window['catalog_no'] ,
                                        buttons: Ext.MessageBox.OK,
                                        icon :  Ext.MessageBox.WARNING
                                    });
                                    return true;
                                }
                            }
                            var std_app_category = "Std App "+record.data.category ;
                            if (user_level == std_app_category ) {
                                var category = rs[i].data.category ;
                                if(isEmpty(category) == true) {
                                    Ext.MessageBox.show({
                                        title : 'Message',
                                        msg:'Please Check Your Category Catalog No '+window['catalog_no'] ,
                                        buttons: Ext.MessageBox.OK,
                                        icon :  Ext.MessageBox.WARNING
                                    });
                                    return true;
                                }

                                var cataloguer = rs[i].data.cataloguer ;
                                if(isEmpty(cataloguer) == true) {
                                    Ext.MessageBox.show({
                                        title : 'Message',
                                        msg:'Please Check Your Cataloger Catalog No '+window['catalog_no'] ,
                                        buttons: Ext.MessageBox.OK,
                                        icon :  Ext.MessageBox.WARNING
                                    });
                                    return true;
                                }
                                
                                var std_approval = rs[i].data.std_approval ;
                                if(isEmpty(std_approval) == true) {
                                    Ext.MessageBox.show({
                                        title : 'Message',
                                        msg:'Please Check Your Std App Catalog No '+window['catalog_no'] ,
                                        buttons: Ext.MessageBox.OK,
                                        icon :  Ext.MessageBox.WARNING
                                    });
                                    return true;
                                }
                            }
                            if (user_level == 'Proc') {
                                var category = rs[i].data.category ;
                                if(isEmpty(category) == true) {
                                    Ext.MessageBox.show({
                                        title : 'Message',
                                        msg:'Please Check Your Category Catalog No '+window['catalog_no'] ,
                                        buttons: Ext.MessageBox.OK,
                                        icon :  Ext.MessageBox.WARNING
                                    });
                                    return true;
                                }

                                var cataloguer = rs[i].data.cataloguer ;
                                if(isEmpty(cataloguer) == true) {
                                    Ext.MessageBox.show({
                                        title : 'Message',
                                        msg:'Please Check Your Cataloger Catalog No '+window['catalog_no'] ,
                                        buttons: Ext.MessageBox.OK,
                                        icon :  Ext.MessageBox.WARNING
                                    });
                                    return true;
                                }
                                
                                var std_approval = rs[i].data.std_approval ;
                                if(isEmpty(std_approval) == true) {
                                    Ext.MessageBox.show({
                                        title : 'Message',
                                        msg:'Please Check Your Std App Catalog No '+window['catalog_no'] ,
                                        buttons: Ext.MessageBox.OK,
                                        icon :  Ext.MessageBox.WARNING
                                    });
                                    return true;
                                }

                                var proc_approver = rs[i].data.proc_approver ;
                                if(isEmpty(proc_approver) == true) {
                                    Ext.MessageBox.show({
                                        title : 'Message',
                                        msg:'Please Check Your Proc App Catalog No '+window['catalog_no'],
                                        buttons: Ext.MessageBox.OK,
                                        icon :  Ext.MessageBox.WARNING
                                    });
                                    return true;
                                }
                            }
                            window['goto'] = true ;
                            if(material_type !== 'ZOEM'){
                                window['model_material_item_char_check'+page] = Ext.define('model_material_item_char_check', {
                                    extend: 'Ext.data.Model',
                                    fields: ['sequence', 'flag' ,'characteristics', 'nvalue', 'type']
                                });
                                window['store_material_item_char_check_'+page+'_'+catalog_no] = Ext.create('Ext.data.Store', {
                                    storeId: 'store_material_item_char_check'+page+catalog_no,
                                    id :'store_material_item_char_check'+page+catalog_no,
                                    model: 'model_material_item_char_check',
                                    autoLoad:true,
                                    proxy: {
                                        type: 'ajax',
                                        url: '/getItemsIncCharacteristics',//&action=getIncCharacteristic
                                        method: 'GET',
                                        reader: {
                                            type: 'json',
                                            successProperty: 'success',
                                            root: 'results',
                                            messageProperty: 'message'
                                        }
                                    },
                                    listeners: {
                                        scope:this,
                                        beforeload: function(store) {
                                            
                                        },
                                        load: function() {

                                        }
                                    },
                                });
                                window['store_material_item_char_check_'+page+'_'+catalog_no].proxy.extraParams = {
                                    inc_m_id:rs[i].data.inc_m_id,
                                    adr_d_items_id: rs[i].data.adr_d_items_id,
                                    catalog_no: rs[i].data.catalog_no,
                                };
                                data_m = 0;
                                var mandatoryCheck = new Array();
                            }
                            data.push(rs[i].data);

                        }

                        var items_characteristic = Ext.pluck(store_inc_char_value_entry.data.items, 'data') ;
                        if(data.length > 0){
                            if(isEmpty(material_type) == false && material_type == 'ZOEM'){

                            }else{
                                var evts=0;
                                var rprs=0;
                                store_material_item_char.each(function(record) {
                                    var type = record.get('type');
                                    var nvalue = record.get('nvalue') ;
                                    if(type == "M" && isEmpty(nvalue) == true) {
                                        if(record.get('nvalue')) rprs+=1;
                                        else evts+=1;
                                    }
                                });
                            }
                            if(isEmpty(material_type) == true || isEmpty(uom) ||  evts > 0 ){
                                Ext.MessageBox.show({
                                    title : 'Message',
                                    msg:'Please Mandatory Check' ,
                                    buttons: Ext.MessageBox.OK,
                                    icon :  Ext.MessageBox.WARNING
                                });
                                return true;
                            }
                            if(form_material_multiview_d.isValid()){
                                form_material_multiview_d.form.submit({
                                    scope:this,
                                    url: '/ApplyChangeMultiView',
                                    method: 'POST',
                                    dataType: 'html',
                                    params:{
                                        _token : csrf_token,
                                        transaction_type:'Material',
                                        items_characteristic : Ext.encode(items_characteristic),
                                        data_detail: Ext.encode(data),
                                    },
                                    success:function(response, request){
                                      //   store_inc_char_value_entry.removeAll();
                                      //   // Ext.getCmp('btnMaterialApplyChanges'+page).setDisabled(true);
                                      //   MChangescat = "";
                                      //   // SearchMaterialCatalogNo(catalogNo);
                                      // // alert(proc_approver);
                                      // // alert(std_approval);
                                      //   store_material_multiview_m.reload();
                                      //   store_material_item_char.removeAll();
                                      //   store_material_cross_references.removeAll();
                                      //   store_material_funloc.removeAll();
                                      //   store_material_view_notes.removeAll();
                                      //   form_material_multiview_d.getForm().reset();
                                      //   /*store_material_item_char.load({
                                      //       params:{
                                      //           start:0,
                                      //           limit:300
                                      //       }
                                      //   });*/
                                      //   store_material_cross_references.reload({
                                      //       params:{
                                      //           start:0,
                                      //           limit:300
                                      //       }
                                      //   });
                                      //   store_material_funloc.reload({
                                      //       params:{
                                      //           start:0,
                                      //           limit:300
                                      //       }
                                      //   });

                                        // reset page
                                        /*store_material_uom.currentPage = 1;
                                        store_material_uom.load({
                                            params:{
                                                start:0,
                                                limit:25
                                            }
                                        });*/
                                        // reset page
                                        var currentPage = store_material_multiview_m.lastOptions.page ;
                                        var currentLimit = store_material_multiview_m.lastOptions.limit ;
                                        store_material_multiview_m.load({
                                            params:{
                                                start:currentPage,
                                                limit:currentLimit
                                            }
                                        });
                                        store_material_item_char.load({
                                            params:{
                                                start:0,
                                                limit:300
                                            }
                                        });
                                        store_material_cross_references.load({
                                            params:{
                                                start:0,
                                                limit:300
                                            }
                                        });
                                        store_material_funloc.load({
                                            params:{
                                                start:0,
                                                limit:300
                                            }
                                        });
                                        Ext.MessageBox.hide();
                                        // Ext.getCmp('create_material_dialog').close();
                                        Changerow = true;
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
                        }else{
                            Ext.MessageBox.confirm({
                                title : 'Message',
                                msg:'Data Not Found',
                                buttons: Ext.MessageBox.OK,
                                icon :  Ext.MessageBox.WARNING
                            });
                            return true;
                        }
                        // console.log(items_characteristic);
                        
                    }
                }
            ]
        });


        function checkedData(adr_d_items_id,inc_m_id,inc_characteristics_id,CatalogNo){
            // alert(CatalogNo);
            // var std_approval = rs[i].data.std_approval ;
            // if(isEmpty(std_approval) == true) {
                Ext.MessageBox.confirm({
                    title : 'Message',
                    msg:'Please Check Your Characteristics Catalog No '+CatalogNo ,
                    buttons: Ext.MessageBox.OK,
                    icon :  Ext.MessageBox.WARNING
                });
            return true;
            // }
        }
        var main_content = {
            id: MainTabId,
            ui: 'blue-panel',
            title: "Multiple View's "+title,
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
                                                    id:'formMaterialMV'+pageid,
                                                    items:[grid_material_multiview_m,form_material_multiview_d]
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
                    winCharacteristicValue= Ext.getCmp('winCharacteristicValue'+page);
                    if (winCharacteristicValue)
                        winCharacteristicValue.destroy();
                    winMaterialViewNotes= Ext.getCmp('winMaterialViewNotes'+page);
                    if (winMaterialViewNotes)
                        winMaterialViewNotes.destroy();
                }
            }

        }

        OpenTab(main_content,MainTabId);
        Ext.getCmp('mainpanel').body.unmask();

       

    }
});
