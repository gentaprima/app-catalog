valid_script = true;
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
        'UsersStore',
        'CompanyStore',
        'CBUsersGroupStore'

    ],
    requires: [
        // 'Ext.selection.CellModel'
        // 'Ext.util.Point',
        // 'Ext.util.History',
        // 'APP.domain.Proxy'
    ],
    launch: function(){
        // alert(pageid);
        ///////////////////////
        // Store Master Template //
        ///////////////////////
        var store_users = Ext.getStore('UsersStore');
        var store_companies = Ext.getStore('CompanyStore');
        var store_cb_users_group = Ext.getStore('CBUsersGroupStore');


        var user_row_editing  = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: true,
            saveBtnText    : "Update",//My Save Button Text&quot;,
            saveBtnIcon: 'add-data',
            cancelBtnText: "Cancel", //Cancel Button Text&quot;,
            clicksToEdit: 2, //this changes from the default double-click activation to single click activation
            errorSummary: false, //disables display of validation messages if the row is invalid
            listeners: {
                cancelEdit: function(rowEditing, context) {
                    // Canceling editing of a locally added, unsaved record: remove it
                    if (context.record.phantom) {
                        store_users.remove(context.record);
                    }
                },
                beforeedit:function(editor, e, eOpts){
                    store_users.suspendAutoSync();
                },
             afteredit: function(roweditor, context) {
                var row = grid_user.getSelectionModel().getSelection()[0];
                var data = [] ;
				 
                data.push(Ext.encode(row.data));
                // console.log(row.get('sequence'));
			
                Ext.Ajax.request({
                    scope:this,
                    // url : base_url+'singleview/process' ,
                    url: '/SaveUser',
                    method: 'POST',
                    dataType: 'json',
                    params:{
                        _token : csrf_token,
                        data_items :'['+data+']',
                    },
                    success:function(response, request){
                        // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                        store_users.load({
                            // params:{
                            // start:0,
                            // limit:25
                            // }
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
           }
        });
        
		var grid_user = Ext.create('Ext.grid.Panel', 
			{
				id:'user-manager'+pageid,
				border:false,
				region: 'center',
				frame:true,
				plugins: [
					'gridfilters', 
					user_row_editing
				],
				
				store : store_users,
				columns:[
					{
						dataIndex : 'user_id',
						hidden : true,
						hideable : false,
						menuDisabled : true
					},
					{
						dataIndex:'user_name',
						header:'User Name',
						width:100,
						editor: {
							xtype:'textfield',
							// vtype:'alphanum',
							allowBlank:false
						},
						filter:'string',
					},
					{
						dataIndex:'email',
						header:'Email',
						width:100,
						editor: {
							xtype:'textfield',
							// vtype:'alphanum',
							allowBlank:false
						},
						filter:'string',
					},
					{
						dataIndex:'real_name',
						header:'Real Name',
						width:150,
						editor: {
							xtype:'textfield',
							allowBlank:false
						},
						filter:'string',
					},
					{
						dataIndex:'password',
						header:'Password',
						width:100,
						editor: {
							xtype:'textfield',
							allowBlank:true,
							inputType:'password'
						},
						sortable: false,
						renderer: function(val){
							return '*****'
							r = '';
							if (val !='')
								r =  '[hidden]';
							return r;
						}
					},
					{
						dataIndex:'companies_m_id',
						header:'Company',
						width:200,
						editor : {
							xtype : 'combo',
							typeAhead : true,
							triggerAction : 'all',
							store : store_companies,
							displayField : 'name',
							valueField : 'id',
//							lazyRender : true,
							mode: 'local',
							listClass : 'x-combo-list-small',
							allowBlank:false,							
						},
						renderer: function(id){
							var idx = store_companies.find('id', id);
							return ( idx===-1 ? id : store_companies.getAt(idx).get('name'));
						}
					},
					{
						dataIndex:'group_id',
						header:'Group User',
						width:160,
						editor : {
							xtype : 'combo',
							typeAhead : true,
							triggerAction : 'all',
							store : store_cb_users_group,
							displayField : 'group_name',
							valueField : 'group_id',
//							lazyRender : true,
							mode: 'local',
							listClass : 'x-combo-list-small',
							allowBlank:false,							
						},
						renderer: function(group_id){
							var idx = store_cb_users_group.find('group_id', group_id);
							return ( idx===-1 ? group_id : store_cb_users_group.getAt(idx).get('group_name'));
						}
					},
					{
						xtype: 'checkcolumn',
						dataIndex : 'is_active',
						header: 'Active?',
						width: 50,
						editor: {
							xtype: 'checkbox',
							cls: 'x-grid-checkheader-editor',
							inputValue: 1,
							uncheckedValue: 0
						}						
					},
					{
						dataIndex:'created_at',
						header:'Date Created',
						width:120
					},
					{
						dataIndex:'last_login',
						header:'Last Login',
						width:120
					},

				],
				tbar : [
					{
						text:'Add User',
						iconCls : 'user-add',
						tooltip : 'Add New User',
						handler: function() {
							var data = [];
							var order = 1 ;
							var index = 0 ;
							store_users.each(function(r,i){
								data.push(r.data);
								order++ ;
								index++ ;
							});
							// Create a model instance
							var r = Ext.create('APP.model.UsersModel', {
								flag :'insert',
								group_id : '',
								companies_m_id : '',							
								user_name : '',
								real_name : '',
								is_active : 1,
							});

							store_users.insert(index, r);
							user_row_editing.startEdit(r, 0);

						}
					},
					'-',
/* 					{
						text:'Delete User',
						iconCls : 'user-delete',
						tooltip : 'Remove User',
						handler : function() {


						}
					}, */
					],
				bbar : new Ext.PagingToolbar({
					id : 'UserManagerPagingBar'+pageid,
					store : store_users,
					// pageSize : parseInt(limit_combo.getValue()),
					// plugins : filterUser,
					displayInfo : true,
					displayMsg: 'Display {0} - {1} of {2}',
					emptyMsg: "No Data to display",
					items : [
						'-',
						{
							tooltip : {
								title : 'Clear Filter',
								text : 'Clear Searching Filter'
							},
							iconCls : 'drop',
							handler : function() {
								// filterUser.clearFilters();
							}
						},

						'-',
						'Display Per Page ',
					]
				}),

			})
		;
		
		
        var main_content = {
            id: MainTabId,
            ui: 'blue-panel',
            title: title,
            closable: true,
            iconCls: iconCls,
            layout:'fit',
            autoHeight : true,
            border:false,
            items:[
                {
                    xtype:'panel',
                    layout:'border',
                    id:'MainPanel_'+MainTabId,
                    // padding : '3 3 3 3',
                    items:[
                        Ext.create('Ext.panel.Panel', {
                            border:true,
                            layout: 'fit',
                            region: 'center',
                            id:'MainContentPanel_'+MainTabId,
                                                    items:[ 
														grid_user
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


        
        // genItems(myitems);
        // Ext.getCmp('formTemplate'+pageid).add(widget);
        // Ext.getCmp('formTemplate'+pageid).add(Ext.create("Ext.form.field.Text", {fieldLabel:"Last Name"}));

        


    }
});
