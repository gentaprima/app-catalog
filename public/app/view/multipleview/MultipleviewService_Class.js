valid_script = true;
// ROLE = Ext.decode('{"ProcApp":true,"StdApp":true,"RemoveRequestRevision":true,"AddRequestRevision":true,"Plant":true,"RemoveCrossReferences":true,"RemoveFuncLoctaion":true,"StockClass":true,"StockType":true,"UOM":true,"Category":true,"ServiceType":true,"ViewNotes":true,"ApplyChangeService":true,"Cataloguer":true,"AddCrossReferences":true,"MovingType":true,"MaxStock":true,"RemoveService":false,"AddService":false,"AddRequestDeletion":true,"AppRequestDeletion":false,"AddAdditionSubmit":true,"AddFuncLocation":true,"ApproveRevisionReq":false,"INC":true,"MGC":true,"ApprovalRevision":false,"InvButtonCatalogNoHis":false}');
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


var MetaDataModel = Ext.define('MetaDataModel', {
	extend: 'Ext.data.Model',
});

////////////////////////
// Service Multiview //
////////////////////////
// console.log(ROLE);
var ServiceCharacteristicsEditor = false ;
var ServiceCrossRef = false;
var ServiceFuncLoc = false;
var delimiter = ";";
var sparator  = ":";
var base_url = '';
var serviceLock = false ;
var mandatory = false ;
var ServiceGridEditor = false ;
var ServiceApplyChanges = true;
var MTempcat = "";
var MChangescat = "";
var STempcat = "";
var SChangescat = "";

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
		url: 'getMgcByInc',
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
	fields: ['id','adr_d_items_id','inc','inc_characteristics_id','characteristic', 'nvalue']
});
var store_inc_char_value_entry = Ext.create('Ext.data.Store', {
	model: model_inc_char_value_entry,
	proxy: {
		type: 'ajax',
		url: 'getStore',
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
		url: 'getIncMgc',
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
		url: 'getServiceType',
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
// service UOM //
//////////////////
var model_service_uom = Ext.define('model_service_uom', {
	extend: 'Ext.data.Model',//Meta Data Model
});

var store_service_uom = Ext.create('Ext.data.Store', {
	model: model_service_uom,
	// groupField: 'group_header',
	proxy: {
		type: 'ajax',
		url: 'getUOM',
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
		url: 'getCategory',
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
// Grid Service INC Characteristics //
///////////////////////////////////////
function update_desc_from_characteristics() {
					var desc_temp = "";
					var desclong_temp = "";
					//var charValue_temp = "";

					var namecodeval = Ext.getCmp('service_name_code'+page).getValue();
					var namecodeval_short = Ext.getCmp('service_short_name_code'+page).getValue();
					// console.log(namecodeval_short);
					desc_temp = desc_temp + namecodeval_short ;
					desclong_temp = desclong_temp + namecodeval_short ;
					//charValue_temp = charValue_temp ;

					var char_count = store_service_item_char.getCount();

					if (char_count >= 1) {
						var nvalue =  [];
						var valchar =  [];
						var items_char_value = [];
						var r = 1;
						for (i = 0; i < char_count; i++) {
							var inc_characteristics_id = store_service_item_char.getAt(i).data.id;
							var adr_d_items_id = Ext.getCmp('service_adr_d_items_id'+page).getValue();
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
						//charValue_temp = items_char_value.join(',');

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
					//Ext.getCmp('service_char_value'+page).setValue(charValue_temp);
					/**/

					var selectedRecord = grid_service_multiview_m.getSelectionModel().getSelection()[0];
					var row = grid_service_multiview_m.store.indexOf(selectedRecord);
					var recordSet = store_service_multiview_m.getAt(row);
					recordSet.set("short_description", Ext.getCmp('service_short_description'+page).getValue());
					recordSet.set("long_description", Ext.getCmp('service_long_description'+page).getValue());
					//recordSet.set("char_value", Ext.getCmp('service_char_value'+page).getValue());


					// console.log(store_inc_char_value_entry);
					var selectedRecord = Ext.getCmp('grid_service_multiview_m'+page).getSelectionModel().getSelection()[0];
					var rs = store_service_item_char.getModifiedRecords();
					for (var x = 0, ln = rs.length; x < ln; x++) {
						var row = Ext.create('model_inc_char_value_entry', {
							adr_d_items_id: rs[x].data.adr_d_items_id,
							inc:selectedRecord.data.inc,
							inc_m_id:rs[x].data.inc_m_id,
							id :rs[x].data.adr_d_items_id+'_'+rs[x].data.id ,
							inc_characteristics_id :rs[x].data.id ,
							characteristics :rs[x].data.characteristics ,
							nvalue :rs[x].data.nvalue ,
						});
						store_inc_char_value_entry.insert(index_char_value,row);
						index_char_value++;
					}			
}

var model_service_item_char = Ext.define('model_service_item_char', {
	extend: 'Ext.data.Model',
	fields: ['sequence', 'flag' ,'characteristics', 'nvalue', 'type']
});
var store_service_item_char = Ext.create('Ext.data.Store', {
	storeId: 'store_service_item_char'+page,
	id :'store_service_item_char'+page,
	model: model_service_item_char,
	proxy: {
		type: 'ajax',
		url: 'getItemsIncCharacteristics',
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
var grid_service_inc_characteristic = Ext.create('Ext.grid.Panel', {
	title: 'Characteristic',
	region: 'center',
	height:200,
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
				
				grid_service_inc_characteristic.getSelectionModel().select(rowIndex);
				
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
				// id:'adr_d_items_characteristic_value'+page,
				allowBlank: true,
				// maxLength:30,
				readOnly:false,
				listeners: {
					change : function(){
						var row = Ext.getCmp('service_adr_items_char_grid'+page).getSelectionModel().getSelection()[0];
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
		url: 'getItemsIncCharacteristicsValue',
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
		url: 'getItemsCrossReferences',
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
			text: 'Add X References',
			iconCls: 'add-data',
			id:'btnServiceAddCrossReferences'+page,
			hidden:!ROLE.AddCrossReferences,
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
			text: 'Remove X References',
			iconCls: 'row-delete',
			id:'btnServiceRemoveCrossReferences'+page,
			hidden:!ROLE.RemoveCrossReferences,
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
		url: 'getItemsFuncloc',
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
			hidden:!ROLE.AddFuncLocation,
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
			hidden:!ROLE.RemoveFuncLocation,
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
// Service Windows View Option //
//////////////////////////////////
var winServiceViewOption = Ext.widget('window', {
	iconCls:'view_option',
	title: 'View Options',//+ ,
	id:'winServiceViewOption'+page,
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
			id:'formServiceViewOption'+page,
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
					id:'servicevwOption'+page,
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
					Ext.getBody().mask("loading service Grid...");
					var fp = Ext.getCmp('formServiceViewOption'+page);
					if(fp.getForm().isValid()){
						ServiceViewOptions(fp.getForm().getValues().vwOption);
						// console.log(fp.getForm().getValues().vwOption);
						// alert(fp.getForm().getValues(true));
						// Ext.Msg.alert('Submitted Values', 'The following will be sent to the server: <br />'+
						//     fp.getForm().getValues(true).replace(/&/g,', '));
					}
					winServiceViewOption.animateTarget = 'btnServiceViewOption'+page;
					winServiceViewOption.hide();
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
					winServiceViewOption.animateTarget = 'btnServiceViewOption'+page;
					winServiceViewOption.hide();
				}
			}]

		})

	],
	tools: [
		{
			type: 'close',
			handler: function () {
				winServiceViewOption.animateTarget = 'btnServiceViewOption'+page;
				winServiceViewOption.hide();
			}
		}
	],
});

////////////////////////////
// SearchServiceCataloNo //
////////////////////////////
function SearchServiceCatalogNo(val){
	Ext.getBody().mask("loading service item...");
	if(val){
		Ext.getCmp('service_owner'+page).reset();
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
			action:'getCatalogM',
		};
		store_service_catalog_m.reload({
			params:{
				filter: Ext.encode(filters),
			},
			callback : function(records, operation, success) {
				if(success){
					var record = records[0];
					if(store_service_catalog_m.getCount() > 0){
						store_service_item_char.removeAll();
						store_service_cross_references.removeAll();
						store_service_funloc.removeAll();
						store_service_view_notes.removeAll();
						Ext.getCmp('btnServiceApplyChanges'+page).setDisabled(true);
						Ext.getCmp('btnServiceViewNotes'+page).setDisabled(false);
						Ext.getCmp('service_catalog_no'+page).setValue(record.data.catalog_no);
						Ext.getCmp('service_adr_m_id'+page).setValue(record.data.adr_m_id);
						Ext.getCmp('service_adr_d_items_id'+page).setValue(record.data.adr_d_items_id);
						Ext.getCmp('service_adr_m_status'+page).setValue(record.data.adr_status);
						Ext.getCmp('service_adr_d_items_status'+page).setValue(record.data.item_status);
						Ext.getCmp('service_raw'+page).setValue(record.data.raw);
						Ext.getCmp('sap_service_code'+page).setValue(record.data.sap_material_code);
						Ext.getCmp('service_name_code'+page).setValue(record.data.inc_name_code);
						Ext.getCmp('service_short_name_code'+page).setValue(record.data.short_name_code);
						Ext.getCmp('service_short_description'+page).setValue(record.data.short_description);
						Ext.getCmp('service_long_description'+page).setValue(record.data.long_description);
						Ext.getCmp('service_owner'+page).setValue(record.data.owner);
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



						store_service_item_char.proxy.extraParams = {
							/*filter: Ext.encode(filters),
							 adr_d_items_id: record.data.adr_d_items_id,
							 sort: Ext.encode(sorters),*/
							inc_m_id:record.data.inc_m_id,
							adr_d_items_id: record.data.adr_d_items_id,
							sort: Ext.encode(sorters),
						};
						store_service_item_char.load({
							params:{
								start:0,
								limit:300,

							}
						});

						var filters = [];
						var adr_d_items_id_filter = new Ext.util.Filter({
							operator: 'eq',
							value: record.data.adr_d_items_id,
							property: "adr_d_items_id",
							type: "numeric",
						});
						filters.push(adr_d_items_id_filter['initialConfig']) ;
						store_service_cross_references.proxy.extraParams = {
							filter: Ext.encode(filters),
						};
						store_service_cross_references.load({
							params:{
								start:0,
								limit:300,
							}
						});
						store_service_funloc.proxy.extraParams = {
							filter: Ext.encode(filters),
						};
						store_service_funloc.load({
							params:{
								start:0,
								limit:300,
							},

						});
						store_service_view_notes.proxy.extraParams = {
							filter: Ext.encode(filters),
						};
						store_service_view_notes.load({
							params:{
								start:0,
								limit:300,
							}
						});
						if(record.data.item_status === "STOPPED" || record.data.item_status === "BLOCKED") {
							ServiceGridEditor = false;
							ServiceApplyChanges = false;
							ServiceCharacteristicsEditor = false;
						}else{
							ServiceWorkFlow();
						}
						Ext.getBody().unmask();
					}else{
						store_service_item_char.removeAll();
						store_service_cross_references.removeAll();
						store_service_funloc.removeAll();
						store_service_view_notes.removeAll();

						/*Ext.getCmp('btnServiceViewDocument'+page).setDisabled(true);
						 Ext.getCmp('btnServiceViewRaw'+page).setDisabled(true);
						 Ext.getCmp('btnServiceViewImages'+page).setDisabled(true);
						 Ext.getCmp('btnServiceViewNotes'+page).setDisabled(true);*/

						Ext.Msg.show({
							title   : 'Data Search',
							msg     : 'No Record Found',
							buttons : Ext.Msg.OK,
							// iconCls : 'warningMessage',
							icon :  Ext.MessageBox.INFO,
						});
						Ext.getBody().unmask();


						/*form_service_single_view.getForm().getFields().each (function (field) {
						 if(field.id !='catalog_no'+page){
						 // field.setReadOnly(true);
						 field.reset();
						 }
						 });*/
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
		// CheckServiceMRP(0);
	}
}

///////////////////////////
// Materla Data Workflow //
///////////////////////////
function ServiceWorkFlow(){
	// ServiceStatusStyle();
	var record = store_service_catalog_m.getData().items[0];
	var str = record.data.item_status;
	var item_status = str.substring(0, 8);
	var std_app_category = "Std App "+record.data.category ;
	switch(true ){
		case (record.data.item_status === "ON PROCESS"):
		case (record.data.item_status === "BLOCKED"):
		case (record.data.item_status === "STOPPED"):
		case (record.data.item_status === "ORIGIN"):
		case (item_status === "REVISION"):

			////////////////
			//Status User //
			////////////////
			if(record.data.status_user === 1){
				ServiceGridEditor = false;
				ServiceCharacteristicsEditor = false ;
				ServiceApplyChanges = true;
				ServiceCrossRef = true;
				ServiceFuncLoc = true;
				if (company_code === record.data.company_code ){
					ServiceCrossRef = false;
					ServiceFuncLoc = false;
				}


				if (company_code === record.data.company_code && user_level === "Cat") {
					ServiceGridEditor = true;
					ServiceCharacteristicsEditor = true ;
					ServiceApplyChanges = false;

				}


			}else{

				if (company_code === record.data.company_code  ) {
					ServiceGridEditor = true;
					ServiceCharacteristicsEditor = true ;
					ServiceApplyChanges = false;
					ServiceFuncLoc = false;
					ServiceApplyChanges = false;
				}


			}
			// console.log(record.data.status_cat);
			if(record.data.status_cat === 1){

				ServiceGridEditor = false;
				ServiceCharacteristicsEditor = false ;
				ServiceApplyChanges = true;
				if(user_level === std_app_category ){
					ServiceGridEditor = true;
					ServiceCharacteristicsEditor = false ;
					ServiceApplyChanges = false;
				}




			}else{

			}

			if(record.data.status_stdapp === 1){

				ServiceGridEditor = false;
				ServiceCharacteristicsEditor = false ;
				ServiceApplyChanges = true;

				// Ext.getCmp('service_std_approval'+page).setServiceGridEditor(ServiceGridEditor);
				// Ext.getCmp('service_std_approval'+page).focus();

				if(user_level === "Proc"){
					ServiceGridEditor = true;
					ServiceCharacteristicsEditor = false ;
					ServiceApplyChanges = false;
					if(record.data.material_type == 'ZOEM'){

					}
					// console.log('disini'+record.data.material_type);
				}

			}else{

			}

			if(record.data.status_proc === 1){


				ServiceGridEditor = true;
				ServiceCharacteristicsEditor = false ;
				ServiceApplyChanges = true;

				if(user_level === "Proc" && record.data.status_sap === 0){
					ServiceGridEditor = true;
					ServiceCharacteristicsEditor = false ;
					ServiceApplyChanges = false;
				}

			}else{

			}

			if(record.data.status_sap === 1){


				ServiceGridEditor = false;
				ServiceCharacteristicsEditor = false ;
				ServiceApplyChanges = true;
				ServiceCrossRef = true;
				ServiceFuncLoc = true;
				if (company_code === record.data.company_code && user_level === "Cat") {

					ServiceCrossRef = false;
					ServiceFuncLoc = false;

				}

			}else{


				ServiceCrossRef = false;
				ServiceFuncLoc = false;

			}

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

			
			Ext.getCmp('btnServiceApplyChanges'+page).setDisabled(ServiceApplyChanges);
			break;
		default:

			break;
	}

}

////////////////////////////////////
// Search Service Grid Multiview //
////////////////////////////////////
function SearchServiceMultiview(){
	var namecode = Ext.getCmp('SearchServiceNameCodeMultiView'+page).getValue();
	var shortdesc = Ext.getCmp('SearchServiceShortDescMultiView'+page).getValue();
	var rawData = Ext.getCmp('SearchServiceRawDataMultiView'+page).getValue();
	var service_old_code = Ext.getCmp('SearchServiceOldCode'+page).getValue();
	var service_type = Ext.getCmp('SearchServiceType'+page).getValue();
	var service_category = Ext.getCmp('SearchServiceCategory'+page).getValue();
	var service_manufactur = Ext.getCmp('SearchServiceManufactur'+page).getValue();
	var service_refno = Ext.getCmp('SearchServiceRefno'+page).getValue();
	var service_funloc = Ext.getCmp('SearchServiceFuncLoc'+page).getValue();
	// In Search
	Ext.getCmp('btnServiceApplyChanges'+page).setDisabled(true);

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
	var ServiceOldCodeDataFilter = new Ext.util.Filter({
		operator: 'like',
		value:  service_old_code,
		property: "old_material_code",
		type: "string",
	});
	if(isEmpty(service_old_code) == false){
		filters.push(ServiceOldCodeDataFilter['initialConfig']) ;
	}

	var ServiceTypeDataFilter = new Ext.util.Filter({
		operator: 'like',
		value:  service_type,
		property: "material_type",
		type: "string",
	});
	if(isEmpty(service_type) == false){
		filters.push(ServiceTypeDataFilter['initialConfig']) ;
	}

	var ServiceCategoryDataFilter = new Ext.util.Filter({
		operator: 'like',
		value:  service_category,
		property: "category",
		type: "string",
	});
	if(isEmpty(service_category) == false){
		filters.push(ServiceCategoryDataFilter['initialConfig']) ;
	}

	var ServiceRefnoDataFilter = new Ext.util.Filter({
		operator: 'like',
		value:  service_refno,
		property: "refno",
		type: "string",
	});
	if(isEmpty(service_refno) == false){
		filters.push(ServiceRefnoDataFilter['initialConfig']) ;
	}

	var ServiceManufacturDataFilter = new Ext.util.Filter({
		operator: 'like',
		value:  service_manufactur,
		property: "manufactur",
		type: "string",
	});
	if(isEmpty(service_manufactur) == false){
		filters.push(ServiceManufacturDataFilter['initialConfig']) ;
	}

	var ServiceFunclocDataFilter = new Ext.util.Filter({
		operator: 'like',
		value:  service_funloc,
		property: "funcloc",
		type: "string",
	});
	if(isEmpty(service_funloc) == false){
		filters.push(ServiceFunclocDataFilter['initialConfig']) ;
	}

	var transaction_type = new Ext.util.Filter({
		operator: 'eq',
		value: 'Service',
		property: "transaction_type",
		type: "string",
	});

	filters.push(transaction_type['initialConfig']) ;
	store_service_multiview_m.filter(filters);
	store_service_multiview_m.load({
		params:{
			start:0,
			limit:25
		}
	});

}

//////////////////////////
// Service View Option //
//////////////////////////
function ServiceViewOptions(val) {
	Ext.Array.each(grid_service_multiview_m.getColumns(), function(column, index) {
		if (index > 5) {
			column.setVisible(false);
		}
	}, this);

	if (val === 'User') {
		grid_service_multiview_m.down('[dataIndex=short_description]').setVisible(true);
		// grid_service_multiview_m.down('[dataIndex=long_description]').setVisible(true);
		grid_service_multiview_m.down('[dataIndex=sap_material_code]').setVisible(true);
		grid_service_multiview_m.down('[dataIndex=groupclass]').setVisible(true);
		grid_service_multiview_m.down('[dataIndex=inc]').setVisible(true);
		grid_service_multiview_m.down('[dataIndex=material_type]').setVisible(true);
		grid_service_multiview_m.down('[dataIndex=uom]').setVisible(true);
		grid_service_multiview_m.down('[dataIndex=category]').setVisible(true);
	}

	if (val === 'Cat') {
		grid_service_multiview_m.down('[dataIndex=short_description]').setVisible(true);
		// grid_service_multiview_m.down('[dataIndex=long_description]').setVisible(true);
		grid_service_multiview_m.down('[dataIndex=sap_material_code]').setVisible(true);
		grid_service_multiview_m.down('[dataIndex=groupclass]').setVisible(true);
		grid_service_multiview_m.down('[dataIndex=inc]').setVisible(true);
		grid_service_multiview_m.down('[dataIndex=material_type]').setVisible(true);
		grid_service_multiview_m.down('[dataIndex=uom]').setVisible(true);
		grid_service_multiview_m.down('[dataIndex=category]').setVisible(true);
		grid_service_multiview_m.down('[dataIndex=cataloguer]').setVisible(true);

	}
	if (val === 'Std App') {
		grid_service_multiview_m.down('[dataIndex=short_description]').setVisible(true);
		// grid_service_multiview_m.down('[dataIndex=long_description]').setVisible(true);
		grid_service_multiview_m.down('[dataIndex=sap_material_code]').setVisible(true);
		grid_service_multiview_m.down('[dataIndex=std_approval]').setVisible(true);
	}
	if (val === 'Proc App') {
		grid_service_multiview_m.down('[dataIndex=short_description]').setVisible(true);
		// grid_service_multiview_m.down('[dataIndex=long_description]').setVisible(true);
		grid_service_multiview_m.down('[dataIndex=sap_material_code]').setVisible(true);
		grid_service_multiview_m.down('[dataIndex=proc_approver]').setVisible(true);
	}
	if (val === 'SAP') {
		grid_service_multiview_m.down('[dataIndex=short_description]').setVisible(true);
		// grid_service_multiview_m.down('[dataIndex=long_description]').setVisible(true);
		grid_service_multiview_m.down('[dataIndex=sap_material_code]').setVisible(true);
	}
	if (val === 'default') {
		Ext.Array.each(grid_service_multiview_m.getColumns(), function(column, index) {
			if (index > 0) {
				column.setVisible(true);
			}
		}, this);

	}
	Ext.getBody().unmask();
};

/////////////////////////////////
// Service Multiview Selected //
/////////////////////////////////
var ServiceItemSelect = Ext.create('Ext.selection.RowModel', {
	listeners: {
		selectionchange: function(sm, selectedRecord) {
			var record = selectedRecord[0];
			if(record){
				SearchServiceCatalogNo(record.data.catalog_no);
				MTempcat = record.data.catalog_no;
				// alert(Changescat + ' - ' + Tempcat);


				// if(MChangescat != ""){
				//   if(MTempcat != MChangescat){
				//     // START PROCESS
				//     Ext.MessageBox.show({
				//         title:'Changes Service Process',
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
				//               SearchServiceMultiview();
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
			// update_service_multiview_desc();
		}
	}
});
///////////////////////////////
// Store Service Catalog M //
//////////////////////////////
var model_service_catalog_m = Ext.define('model_service_catalog_m', {
	extend: 'Ext.data.Model',
});
var store_service_catalog_m = Ext.create('Ext.data.Store', {
	storeId: 'funloc_Store',
	model: model_service_catalog_m,
	proxy: {
		type: 'ajax',
		url: 'getCatalogM',
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
		url: 'getItemsViewNotes',
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
					// store_service_view_notes.remove(record);
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
				// console.log(parms);
				Ext.Ajax.request({
					scope:this,
					url: 'SaveViewNotesSV',
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
				winServiceViewNotes.animateTarget = 'btnServiceViewNotes'+page;
				winServiceViewNotes.hide();
			}
		}
	],
});

//////////////////////////////////
// Service Windows View Option //
//////////////////////////////////
var winServiceMoreSearch = Ext.widget('window', {
	// iconCls:'view_option',
	// title: 'View Options',//+ ,
	id:'winServiceMoreSearch'+page,
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
			id:'formServiceMoreSearch'+page,
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
							fieldLabel: 'Old Service Code',
							id: 'SearchServiceOldCode'+page,
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
							fieldLabel: 'Service Type',
							labelAlign: 'top',
							labelWidth: 130,
							width: 230,
							forceSelection : true,
							mode: 'remote',
							triggerAction: 'all',
							selectOnTab: true,
							lazyRender: true,
							listClass: 'x-combo-list-small',
							emptyText:'Select Type...',
							selectOnFocus:false,
							margin: '3 3 3 0',
							id: 'SearchServiceType'+page,
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
									/*store_service_type.load({
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
							// hidden:!ROLE.ServiceType,
						},
						{
							xtype: 'combobox',
							// msgTarget: 'side',
							fieldLabel: 'Category',
							labelAlign: 'top',
							labelWidth: 90,
							width: 230,
							forceSelection : true,
							mode: 'remote',
							triggerAction: 'all',
							selectOnTab: true,
							lazyRender: true,
							listClass: 'x-combo-list-small',
							emptyText:'Select Category ...',
							selectOnFocus:false,
							margin: '3 3 3 0',
							id: 'SearchServiceCategory'+page,
							name:           'category',
							hiddenName:     'category',
							displayField:   'code',
							valueField:     'code',
							minChars : 0,
							pageSize:25,
							matchFieldWidth: false,
							listConfig: {
								loadingText: 'Searching...',
								emptyText: 'No matching data found!',
								getInnerTpl: function() {
									return '{code} <span style="font-size: xx-small; ">{description}</span>';
								}
							},
							store:store_service_category,
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
										value: 'servicecategory',
										property: "entity_name",
										type: "string",
									});

									filters.push(entity_name['initialConfig']) ;

									store_service_category.proxy.extraParams = {
										filter: Ext.encode(filters),
										action :'getEntity'
									};

									/*store_service_category.load({
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
							id: 'SearchServiceRefno'+page,
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
							id: 'SearchServiceManufactur'+page,
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
							id: 'SearchServiceFuncLoc'+page,
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
						}
					]

				},

			],
			tools: [
				{
					type: 'close',
					handler: function () {
						winServiceMoreSearch.animateTarget = 'btnMoreSearch'+page;
						winServiceMoreSearch.hide();
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
				// Ext.getBody().mask("loading service multi...");
				var fp = Ext.getCmp('formServiceMoreSearch'+page);
				if(fp.getForm().isValid()){
					SearchServiceMultiview();
					// ServiceViewOptions(fp.getForm().getValues().vwOption);
					// console.log(fp.getForm().getValues().vwOption);
					// alert(fp.getForm().getValues(true));
					// Ext.Msg.alert('Submitted Values', 'The following will be sent to the server: <br />'+
					//     fp.getForm().getValues(true).replace(/&/g,', '));
				}
				winServiceMoreSearch.animateTarget = 'btnMoreSearch'+page;
				winServiceMoreSearch.hide();
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
				Ext.getCmp('formServiceMoreSearch'+page).getForm().reset();
				winServiceMoreSearch.animateTarget = 'btnMoreSearch'+page;
				winServiceMoreSearch.hide();

			}
		}
	],
});

///////////////////////////////
// Grid Service Multiview M //
///////////////////////////////
var store_service_multiview_m = Ext.create('Ext.data.Store', {
	storeId:'store_service_multiview_m'+page,
	model: MetaDataModel,
	remoteSort: true,
	remoteFilter: true,
	sorters: [{
		property: 'adr_d_items_id'
	}],
	autoLoad: false,
	proxy: {
		type: 'ajax',
		url: 'getMultiViewCatalogM',
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
			var grid = Ext.getCmp("grid_service_multiview_m"+page);
			if(isEmpty(grid) == false){
				Ext.getCmp("grid_service_multiview_m"+page).mask('Loading', 'x-mask-loading');
			}

		},
		load: function(store, records, success, operation) {
			Ext.getCmp("grid_service_multiview_m"+page).unmask();
			
		}

	},
});

var filters = [];
var transaction_type = new Ext.util.Filter({
	operator: 'eq',
	value: 'Service',
	property: "transaction_type",
	type: "string",
});
filters.push(transaction_type['initialConfig']) ;
store_service_multiview_m.filter(filters);
store_service_multiview_m.proxy.extraParams = {
	action:'getMultiView'
};
store_service_multiview_m.on('exception',function( store, records, options ){
	// do something about the record exception
},this);
var grid_service_multiview_m = Ext.create('Ext.grid.Panel', {
	store: store_service_multiview_m,
	height: 500,
	id: "grid_service_multiview_m"+page,
	selModel: ServiceItemSelect,
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
						if (rec.get('status_user') != '1') {
							return 'icon-red';
						} else {
							return 'icon-green';
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
						if (rec.get('status_cat') != '1') {
							return 'icon-red';
						} else {
							return 'icon-green';
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
						if (rec.get('status_stdapp') != '1') {
							return 'icon-red';
						} else {
							return 'icon-green';
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
						if (rec.get('status_proc') != '1') {
							return 'icon-red';
						} else {
							return 'icon-green';
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
						if (rec.get('status_sap') != '1') {
							return 'icon-red';
						} else {
							return 'icon-green';
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
			editor : {
				xtype: 'textfield',
				allowBlank:false,
				listeners:{
					change:function(record){
						Ext.getCmp('sap_service_code'+page).setValue(record.lastValue);
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
			text: "Service Owner",
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
				store: store_service_inc,
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
						var selectedRecord = grid_service_multiview_m.getSelectionModel().getSelection()[0];
						var row = grid_service_multiview_m.store.indexOf(selectedRecord);
						var record = store_service_multiview_m.getAt(row);

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
							value: 'Service',
							property: "transaction_type",
							type: "string",
						});
						filters.push(transaction_type_filter['initialConfig']) ;

						// if(queryEvent.query.toLowerCase()){
						store_service_inc.proxy.extraParams = {
							filter: Ext.encode(filters),
						};
						store_service_inc.load({
							params:{
								start:0,
								limit:25
							}
						});
						Ext.Ajax.abortAll(); //cancel any previous requests
						return true;
					},
					select: function(t, record, o) {
						var matching = store_service_inc.queryBy(
							function(rec, id) {
								if (rec.data.inc == record.data.inc) {
									var selectedRecord = grid_service_multiview_m.getSelectionModel().getSelection()[0];
									var row = grid_service_multiview_m.store.indexOf(selectedRecord);
									var recordSet = store_service_multiview_m.getAt(row);
									recordSet.set("short_description", record.data.short_name_code);
									recordSet.set("long_description", record.data.short_name_code);
									recordSet.set("groupclass", '');
									recordSet.set("inc_m_id", record.data.id);
									/*if(recordSet.data.name_code){
									 Ext.getCmp('service_name_code'+page).setValue(record.data.name_code);
									 }else{
									 Ext.getCmp('service_name_code'+page).setValue(record.data.inc_name_code);
									 }*/
									Ext.getCmp('service_name_code'+page).setValue(record.data.item_name);
									// Ext.getCmp('service_name_code'+page).setValue(selectedRecord[0].data.name_code);
									Ext.getCmp('service_short_name_code'+page).setValue(record.data.short_name_code);
									Ext.getCmp('service_short_description'+page).setValue(record.data.short_name_code);
									Ext.getCmp('service_long_description'+page).setValue(record.data.short_name_code);


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


									store_service_item_char.proxy.extraParams = {
										/*filter: Ext.encode(filters),
										 adr_d_items_id: selectedRecord.data.adr_d_items_id,
										 sort: Ext.encode(sorters),
										 changesData : changes,*/
										inc_m_id:record.data.id,
										adr_d_items_id: selectedRecord.data.adr_d_items_id,
										sort: Ext.encode(sorters),
									};

									store_service_item_char.load({
										params:{
											start:0,
											limit:300
										}
									});

									var filters = [];
									var groupclassType_filter = new Ext.util.Filter({
										operator: 'eq',
										value: 'Service',
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
							value: 'Service',
							property: "transaction_type",
							type: "string",
						});
						filters.push(transaction_type['initialConfig']) ;
						var selectedRecord = grid_service_multiview_m.getSelectionModel().getSelection()[0];
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
		{
			text: "Char value",
			dataIndex: 'char_value',
			// width: 100,
			width: 250,
			sortable: true,
			locked: false,
			filter:'string',
			autoSizeColumn:false,
			hidden:true
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
			text: "Service Type",
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
				hiddenName:     'value',
				displayField:   'code',
				valueField:     'code',
				minChars: 0,
				store: store_service_type,
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
							value: 'service_type',
							property: "entity_name",
							type: "string",
						});

						filters.push(entity_name['initialConfig']) ;

						store_service_type.proxy.extraParams = {
							filter: Ext.encode(filters),
							action :'getEntity' ,
							limit:queryEvent.combo.pageSize
						};

						Ext.Ajax.abortAll(); //cancel any previous requests
						return true;
					},
					select: function(t, record, o) {
						var matching = store_service_type.queryBy(
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
				hiddenName:     'value',
				displayField:   'code',
				valueField:     'code',
				minChars: 0,
				store: store_service_uom,
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

						store_service_uom.proxy.extraParams = {
							filter: Ext.encode(filters),
							action :'getEntity' ,
							limit:queryEvent.combo.pageSize
						};

						Ext.Ajax.abortAll(); //cancel any previous requests
						return true;
					},
					select: function(t, record, o) {
						var matching = store_service_type.queryBy(
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
				hiddenName:     'value',
				displayField:   'code',
				valueField:     'code',
				minChars: 0,
				store: store_service_category,
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
							value: 'servicecategory',
							property: "entity_name",
							type: "string",
						});

						filters.push(entity_name['initialConfig']) ;

						store_service_category.proxy.extraParams = {
							filter: Ext.encode(filters),
							action :'getEntity' ,
							limit:queryEvent.combo.pageSize
						};

						Ext.Ajax.abortAll(); //cancel any previous requests
						return true;
					},
					select: function(t, record, o) {
						var matching = store_service_type.queryBy(
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
			// renderer: render_stat
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
			editor:{
				xtype: 'combo',
				labelWidth: 130,
				width: 270,
				forceSelection : true,
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
				allowBlank:true,
				msgTarget: 'under',
				listeners: {
					change: function (t,record,o) {

					},
					select:function(record){
						if(record == 'Not Validate'){
							var selectedRecord = Ext.getCmp('grid_service_multiview_m'+page).getSelectionModel().getSelection()[0];
							var row = Ext.getCmp('grid_service_multiview_m'+page).store.indexOf(selectedRecord);
							var recordSet = store_service_multiview_m.getAt(row);
							recordSet.set("category", '');
							recordSet.set("cataloguer", '');

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
			// renderer: render_stat
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
					var record = store_service_catalog_m.getData().items[0];
					var std_app_category = "Std App "+record.data.category ;
					var record = e.record ;
					var fields = e.field ;
					MChangescat = record.data.catalog_no;
					// alert(Changescat);
					switch(true) {
						case (user_level === "User"):
							if (fields === 'groupclass' || fields === 'inc' || fields === 'material_type' || fields === 'uom' || fields === 'category' ){
								return ServiceGridEditor ;
							}else{
								return false ;
							}
							break;
						case (user_level ==="Cat"):
							if (fields === 'groupclass' || fields === 'inc' || fields === 'material_type' || fields === 'uom' || fields === 'category' || fields === 'cataloguer' ){
								return ServiceGridEditor ;

							}else{
								return false ;
							}
							break;
						case (user_level === std_app_category) :
							if (fields === 'std_approval'){
								return ServiceGridEditor ;
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
											return ServiceGridEditor ;
										}else{
											return false ;
										}
									}else{
										if (fields === 'proc_approver'){
											return ServiceGridEditor ;
										}else{
											return false ;
										}
									}

									break;
								case 1:
									if (fields === 'sap_material_code'){
										return ServiceGridEditor ;
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
			id: 'SearchServiceNameCodeMultiView'+page,
			margin: '0 15 0 0',
			allowBlank: true,
			listeners: {
				specialkey: function(field, e) {
					if (e.getKey() === e.ENTER) {
						SearchServiceMultiview();
					}
				}
			}
		},
		{
			xtype: 'textfield',
			fieldLabel: 'Short Desc',
			labelWidth: 80,
			width: 200,
			id: 'SearchServiceShortDescMultiView'+page,
			margin: '0 15 0 0',
			allowBlank: true,
			listeners: {
				specialkey: function(field, e) {
					if (e.getKey() === e.ENTER) {
						SearchServiceMultiview();
					}
				}
			}
		},
		{
			xtype: 'textfield',
			fieldLabel: 'Raw Data',
			labelWidth: 80,
			width: 200,
			id: 'SearchServiceRawDataMultiView'+page,
			margin: '0 15 0 0',
			allowBlank: true,
			listeners: {
				specialkey: function(field, e) {
					if (e.getKey() === e.ENTER) {
						SearchServiceMultiview();
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
				winServiceMoreSearch.animateTarget = 'btnMoreSearch'+page;
				winServiceMoreSearch.show();
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
				Ext.getCmp('SearchServiceNameCodeMultiView'+page).reset();
				Ext.getCmp('SearchServiceShortDescMultiView'+page).reset();
				Ext.getCmp('SearchServiceRawDataMultiView'+page).reset();
				Ext.getCmp('formServiceMoreSearch'+page).getForm().reset();
				// Ext.getCmp('create_service_dialog').close();
				SearchServiceMultiview();
				// console.log(store_service_multiview_m.filters.items);
				grid_service_multiview_m.store.clearFilter();
				var filters = [];
				var transaction_type = new Ext.util.Filter({
					operator: 'eq',
					value: 'Service',
					property: "transaction_type",
					type: "string",
				});
				filters.push(transaction_type['initialConfig']) ;
				store_service_multiview_m.filter(filters);
				store_service_multiview_m.proxy.extraParams = {
					action:'getMultiView'
				};
				store_service_multiview_m.load({
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
				// Ext.getCmp('create_service_dialog').close();
				SearchServiceMultiview();
			}
		},
		"-",
		/*{
		 xtype: 'exporterbutton',
		 store: store_service_multiview_m

		 }*/
		{
			xtype: 'button',
			text: 'Export',
			iconCls:'report-xls',
			margin: '0 15 0 0',
			handler: function() {
				var allRecords = Ext.pluck(store_service_multiview_m.data.items, 'data') ;
				Ext.Ajax.request({
					url: 'ExportMV/xlsx',
					method: 'POST',
					autoAbort: false,
					params:{
						transaction_type : 'Service',
						data : Ext.encode(allRecords),
						_token: csrf_token,
						filter: store_service_multiview_m.getProxy().extraParams.filter,
						page: store_service_multiview_m.lastOptions.page ,
						start: store_service_multiview_m.lastOptions.start ,
						limit: store_service_multiview_m.lastOptions.limit
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
			store: store_service_multiview_m,
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
			id:'btnServiceViewOption'+page,
			handler: function() {
				winServiceViewOption.show();
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
// Form Service Multiview Detail //
////////////////////////////////////
var form_service_multiview_d = Ext.create('Ext.form.Panel', {
	border:false,
	region:'south',
	height:250,
	autoScroll:true,
	layout:'border',
	id:'form_service_multiview_d'+page,
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
					title: 'Service Item',
					width: 500,
					// height:400,
					autoScroll: true,
					collapsible: false,
					margin: '0 10 0 10',
					border:true,
					items: [
						{
							xtype: 'textfield',
							id: 'service_adr_m_status'+page,
							name:'adr_status',
							width: 350,
							editable: true,
							value: '',
							readOnly:true,
							hidden:true
						},
						{
							xtype: 'textfield',
							id: 'service_adr_d_items_status'+page,
							name:'item_status',
							width: 350,
							editable: true,
							value: '',
							readOnly:true,
							hidden:true
						},
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
							id: 'service_catalog_no'+page,
							name:'catalog_no',
							fieldLabel: 'Catalog No.',
							editable: false,
							// width: 100,
							value: ''
						},
						{
							xtype: 'textfield',
							id: 'sap_service_code'+page,
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
							id: 'service_raw'+page,
							name:'raw',
							editable: false,
							margin: '0 10 10 0',
							height: '100%',
							flex: 1,
							value: ''
						},
						{
							xtype: 'textfield',
							id: 'service_name_code'+page,
							fieldLabel: 'Short Name Code.',
							name:'name_code',
							editable: false,
							// width: 100,
							value: '',
							hidden:false,
						},
						{
							xtype: 'textfield',
							id: 'service_short_name_code'+page,
							fieldLabel: 'Service Short Name Code.',
							name:'short_name_code',
							editable: false,
							// width: 100,
							value: '',
							hidden:true,
						},
						{
							xtype: 'textfield',
							id: 'service_short_description'+page,
							fieldLabel: 'Short Description',
							name:'short_description',
							editable: false,
							// width: 100,
							value: ''
						},
						{
							xtype: 'textareafield',
							fieldLabel: 'Long Desc.',
							// id: 'service_multi_sel_long'+page,
							id:'service_long_description'+page,
							name:'long_description',
							editable: false,
							margin: '0 10 10 0',
							height: '100%',
							flex: 1,
							value: ''
						},
/*                                 {
							xtype: 'textareafield',
							fieldLabel: 'characteristic value',
							// id: 'service_multi_sel_long'+page,
							id:'service_char_value'+page,
							name:'service_char_value',
							editable: false,
							margin: '0 10 10 0',
							height: '100%',
							flex: 1,
							value: '',
							hidden:true,
						}, */
						{
							xtype: 'displayfield',
							id: 'service_owner'+page,
							labelWidth: 130,
							width: 300,
							fieldLabel: 'Service Owner',
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
				grid_service_inc_characteristic,
				{
					xtype: 'splitter',
				},
				grid_service_cross_references,
				{
					xtype: 'splitter',
				},
				grid_service_funcloc
			]
		}
	],
	bbar:[
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
				winServiceViewNotes.setTitle("Service View Notes Catalog No."+Ext.getCmp('service_catalog_no'+page).getValue()),
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
			xtype:'button',
			text:'Apply Changes',
			id:'btnServiceApplyChanges'+page,
			iconCls:'accept',
			disabled:true,
			// hidden:!ROLE.ServiceApplyChanges,
			handler:function(){
				var grid_service_multiview_m = Ext.getCmp('grid_service_multiview_m'+page).getSelectionModel().getSelection()[0];
				var service_items_char = Ext.encode(Ext.pluck(store_service_item_char.data.items, 'data'));
				var service_type = grid_service_multiview_m.data.material_type ;
				var uom = grid_service_multiview_m.data.uom ;
				var category = grid_service_multiview_m.data.category ;
				var cataloguer = grid_service_multiview_m.data.cataloguer ;
				var std_approval = grid_service_multiview_m.data.std_approval ;
				var proc_approver = grid_service_multiview_m.data.proc_approver ;
				var sap_service_code = grid_service_multiview_m.data.sap_material_code ;

				var CatApp = grid_service_multiview_m.data.cataloguer ;
				var StdApp = grid_service_multiview_m.data.std_approval ;
				var ProcApp = grid_service_multiview_m.data.proc_approver ;
				var SAPServiceCode = grid_service_multiview_m.data.sap_material_code ;
				var catalogNo = grid_service_multiview_m.data.catalog_no;

				// START SEND EMAIl
				// var tiperequest = grid_service_multiview_m.data.transaction_type;
				// var toemail = grid_service_multiview_m.data.email_user;
				// var email_cat = grid_service_multiview_m.data.email_cat;
				// var email_std = grid_service_multiview_m.data.email_std;
				// var email_proc = grid_service_multiview_m.data.email_proc;
				// var short_name = grid_service_multiview_m.data.short_description;
				// END SEND EMAIl

				var evts=0;
				var rprs=0;
				/*store_service_item_char.each(function(record) {
				 var type = record.get('type');
				 var nvalue = record.get('nvalue') ;
				 if(type == "M" && isEmpty(nvalue) == true) {
				 if(record.get('nvalue')) rprs+=1;
				 else evts+=1;
				 }
				 });*/
				// console.log(grid_service_multiview_m.data.sap_service_code);
				if(isEmpty(service_type) == false && service_type == 'ZOEM'){

				}else{
					store_service_item_char.each(function(record) {
						var type = record.get('type');
						var nvalue = record.get('nvalue') ;
						if(type == "M" && isEmpty(nvalue) == true) {
							if(record.get('nvalue')) rprs+=1;
							else evts+=1;
						}
					});
				}
				if(isEmpty(service_type) == true || isEmpty(uom) ||  evts > 0 ){
					Ext.MessageBox.show({
						title : 'Message',
						msg:'Please Mandatory Check' ,
						buttons: Ext.MessageBox.OK,
						icon :  Ext.MessageBox.WARNING
					});
					return true;
				}
				if(isEmpty(category) == true ){
					Ext.MessageBox.show({
						title : 'Warning',
						msg:'Please Select Category' ,
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
						var selectedRecord = Ext.getCmp('grid_service_multiview_m'+page).getSelectionModel().getSelection()[0];
						var row = Ext.getCmp('grid_service_multiview_m'+page).store.indexOf(selectedRecord);
						var recordSet = store_service_multiview_m.getAt(row);
						recordSet.set("category", '');
						recordSet.set("cataloguer", '');
						category = "";
						cataloguer = "";
						// category = '';

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
						var selectedRecord = Ext.getCmp('grid_service_multiview_m'+page).getSelectionModel().getSelection()[0];
						var row = Ext.getCmp('grid_service_multiview_m'+page).store.indexOf(selectedRecord);
						var recordSet = store_service_multiview_m.getAt(row);
						recordSet.set("category", '');
						recordSet.set("cataloguer", '');
						recordSet.set("std_approval", '');
						category = "";
						cataloguer = "";
						std_approval = "";
						// Ext.getCmp('service_category'+page).allowBlank = true;
						// Ext.getCmp('service_category'+page).clearValue();
						// Ext.getCmp('service_cataloguer'+page).setValue();
						// Ext.getCmp('service_std_approval'+page).clearValue();
						/*Ext.getCmp('service_category'+page).clearValue();
						 Ext.getCmp('service_cataloguer'+page).clearValue();
						 Ext.getCmp('service_std_approval'+page).clearValue();*/
					}
				}
				if(user_level == "Proc"){
					if(isEmpty(ProcApp) == true ){
						Ext.MessageBox.show({
							title : 'Warning',
							msg:'Please Select Proc Approval' ,
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
							return true;
						}else{
							var selectedRecord = Ext.getCmp('grid_service_multiview_m'+page).getSelectionModel().getSelection()[0];
							var row = Ext.getCmp('grid_service_multiview_m'+page).store.indexOf(selectedRecord);
							var recordSet = store_service_multiview_m.getAt(row);
							recordSet.set("category", '');
							recordSet.set("cataloguer", '');
							recordSet.set("std_approval", '');
							recordSet.set("proc_approver", '');
							category = "";
							cataloguer = "";
							std_approval = "";
							proc_approver = "";
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
				var data = [];
				var rs = store_service_multiview_m.getModifiedRecords();
				for (var i = 0, ln = rs.length; i < ln; i++) {
					data.push(rs[i].data);
				}
				// console.dir(data);
				form_service_multiview_d.form.submit({
					scope:this,
					url: 'ApplyChangeMultiView',
					method: 'POST',
					dataType: 'html',
					params:{
						_token : csrf_token,
						transaction_type:'Service',
						items_characteristic : Ext.encode(Ext.pluck(store_inc_char_value_entry.data.items, 'data')),
						data_detail: Ext.encode(data),
					},
					success:function(response, request){
						store_inc_char_value_entry.removeAll();
						// Ext.getCmp('btnServiceApplyChanges'+page).setDisabled(true);
						MChangescat = "";
						// SearchServiceCatalogNo(catalogNo);
						// alert(proc_approver);
						// alert(std_approval);
						var currentPage = store_service_multiview_m.lastOptions.page ;
						var currentLimit = store_service_multiview_m.lastOptions.limit ;                                
						store_service_multiview_m.load({
							params:{
								start:currentPage,
								limit:currentLimit
							}
						});
						store_service_item_char.load({
							params:{
								start:0,
								limit:300
							}
						});
						store_service_cross_references.load({
							params:{
								start:0,
								limit:300
							}
						});
						store_service_funloc.load({
							params:{
								start:0,
								limit:300
							}
						});

						// reset page
						store_service_uom.currentPage = 1;
						store_service_uom.load({
							params:{
								start:0,
								limit:25
							}
						});
						// reset page

						Ext.MessageBox.hide();
						// Ext.getCmp('create_service_dialog').close();
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
		}
	]
});


Ext.define('APP.Application', {
    name: 'APP',
	extend: 'Ext.app.Application',
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
                                            title :'Service',
                                            iconCls: iconCls,
                                            border:false,
                                            layout: 'fit',
                                            items:[
                                                {
                                                    xtype:'form',
                                                    layout: 'border',
                                                    border:false,
                                                    id:'formServiceMV'+pageid,
                                                    items:[grid_service_multiview_m,form_service_multiview_d]
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
                    winServiceViewNotes= Ext.getCmp('winServiceViewNotes'+page);
                    if (winServiceViewNotes)
                        winServiceViewNotes.destroy();
                }
            }

        }

        OpenTab(main_content,MainTabId);
        Ext.getCmp('mainpanel').body.unmask();
    }
});

Ext.application('APP.Application');
