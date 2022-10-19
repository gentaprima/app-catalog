ROLE = Ext.decode('{"AddCompaniesM":true,"RemoveCompaniesM":true,"EditCompaniesM":true}');
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
        // 'StoreMasterTemplate'
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
        // var store_master_template = Ext.getStore('StoreMasterTemplate');
        // Ext.getCmp('transaction_code'+page).setValue()
        Ext.Ajax.request({
            scope:this,
            url: '/getUserProfile',
            method: 'POST',
            dataType: 'json',
            params:{
                _token : csrf_token,
            },
            success:function(response, request){
                Ext.getCmp('winProfile'+page).body.unmask();
                var record = Ext.decode(response.responseText);
                Ext.getCmp('user_name'+page).setValue(record.data.user_name);
                Ext.getCmp('email'+page).setValue(record.data.email);
                Ext.getCmp('real_name'+page).setValue(record.data.real_name);
            },
            failure:function(response, request){
                if(typeof request.response != 'undefined')
                    var mess = request.response.responseText;
                else
                    var mess = 'Fields marked in red can not be blank !' ;
                /*Ext.MessageBox.show(
                    {
                        title: 'Message',
                        msg: mess,
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    }
                );*/
                    Ext.getCmp('winProfile'+page).body.unmask();
                    Ext.MessageBox.alert('Alert','Error On Loading User');                                            

            },
        });         
        
        var userPic = {
           bodyStyle: 'padding:0px',
           xtype: 'box',
           region:'west',
           width: 130,
           autoEl: { tag: 'div',
                     html: '<img id="pic" src=images/user-info.png style="background:transparent;" />'
            }

        };
        
        var winProfile = Ext.widget('window', {
            title:'User Profile',
            id:'winProfile'+page,
            constrain    : true,
            layout:'border',
            width:475,
            height:250,
            iconCls:'chk-pwd',
            title:'User Profile',
            // x: 50,
            // y: 50,
            plain: false,
            border       : true,
            resizable    : false,
            modal        : false,
            autoShow     : true,
            defaultFocus : 'nome',
            buttonAlign : 'right',
            closable: false,
            items:[
                userPic,
                {
                    xtype: 'form',
                    region: 'center', 
                    labelAlign:'left',
                    id:'userForm'+page,
                    labelWidth: 70,
                    autoHeight:true,
                    // frame:true,
                    border:false,
                    // bodyStyle: 'background-color:#dfe8f5;',
                    bodyStyle: 'background-color: transparent;',
                    // bodyStyle:'padding: 30 0 0 0; background: url('+ Ext.BLANK_IMAGE_URL +');',
                    defaultType:'textfield',
                    defaults: {anchor: '97%',labelSeparator:''},
                    padding : '13 3 3 3',
                    items : [
                            {
                                fieldLabel: 'User Name',
                                name: 'user_name',
                                id:'user_name'+page,
                                readOnly:true
                            },
                            {
                                fieldLabel:'Real Name',
                                name: 'real_name',
                                id:'real_name'+page,
                                allowBlank:false
                            },
                            {
                                fieldLabel:'Email',
                                name: 'email',
                                id:'email'+page,
                                readOnly:true
                            },                            
                            {
                                fieldLabel:'New Password',
                                name:'password',
                                id:'new_password'+page,
                                inputType:'password',
                                allowBlank:false
                            }                            
                    ],
                    dockedItems: [
                            {
                                cls: Ext.baseCSSPrefix + 'dd-drop-ok',
                                xtype: 'container',
                                dock: 'bottom',
                                layout: {
                                    type: 'hbox',
                                    align: 'right'
                                },
                                padding: '10 10 5',
                                items: [
                                    {
                                        xtype: 'component',
                                        flex: 1,
                                    },
                                    {
                                        xtype: 'button',
                                        text:'Save',
                                        iconCls:'icon-save',
                                        itemId: 'login',
                                        border: true,
                                        handler:function() {
                                            if (Ext.getCmp('userForm'+page).getForm().isValid()) {
                                                Ext.getCmp('winProfile'+page).body.mask('Loading Data','x-mask-loading');
                                                form = Ext.getCmp('userForm'+page).getForm(); 
                                                form.submit({
                                                    url:'/ChangePassword',
                                                    params: {
                                                        _token : csrf_token,
                                                    },
                                                    success:function(response) {
                                                        Ext.getCmp('winProfile'+page).body.unmask();
                                                        // Ext.example.msg('Save','Data has been changed'); 
                                                        result = Ext.decode(response.responseText);
                                                        if(result.success){
                                                            var location = window.location ;
                                                            window.location.href = location.origin+'/logout' ;
                                                        } else {
                                                            Ext.getCmp('winProfile').body.unmask();
                                                            Ext.create('Ext.window.MessageBox', {
                                                                alwaysOnTop: true,
                                                                closeAction: 'destroy'
                                                            }).show({
                                                                icon: Ext.MessageBox.INFO,
                                                                title: 'Message',
                                                                buttons: Ext.Msg.OK,
                                                                message:result.message
                                                            });                              
                                                        }                                                        
                                                    },
                                                    failure:function(response){
                                                        result = Ext.decode(response.responseText);
                                                        Ext.getCmp('winProfile'+page).body.unmask();
                                                        Ext.create('Ext.window.MessageBox', {
                                                            alwaysOnTop: true,
                                                            closeAction: 'destroy'
                                                        }).show({
                                                            icon: Ext.MessageBox.ERROR,
                                                            title: 'Message',
                                                            buttons: Ext.Msg.OK,
                                                            message:result.message
                                                        });
                                                    }
                                                });                             
                                            }
                                            
                                        }
                                    },
                                    {
                                        xtype: 'button',
                                        text:'Reload User',
                                        id:'load-user',
                                        itemId: 'LoginReset',
                                        iconCls: 'clear',
                                        border: true,
                                        handler:function() {
                                            Ext.getCmp('winProfile'+page).body.mask('Loading Data','x-mask-loading');
                                            Ext.Ajax.request({
                                                scope:this,
                                                url: '/getUserProfile',
                                                method: 'POST',
                                                dataType: 'json',
                                                params:{
                                                    _token : csrf_token,
                                                },
                                                success:function(response, request){
                                                    Ext.getCmp('winProfile'+page).body.unmask();
                                                    var record = Ext.decode(response.responseText);
                                                    Ext.getCmp('user_name'+page).setValue(record.data.user_name);
                                                    Ext.getCmp('real_name'+page).setValue(record.data.real_name);
                                                    Ext.getCmp('email'+page).setValue(record.data.email);
                                                },
                                                failure:function(response, request){
                                                    if(typeof request.response != 'undefined')
                                                        var mess = request.response.responseText;
                                                    else
                                                        var mess = 'Fields marked in red can not be blank !' ;
                                                        Ext.getCmp('winProfile'+page).body.unmask();
                                                        Ext.MessageBox.alert('Alert','Error On Loading User');                                            

                                                },
                                            });                                    

                                        } 
                                    },
                                ]
                            }
                        ],                    
                    /*buttons: [
                            {
                                text:'Save',
                                iconCls:'icon-save',
                                scale:'medium',
                                handler:function() {
                                    if (Ext.getCmp('userForm'+page).getForm().isValid()) {
                                        Ext.getCmp('winProfile'+page).body.mask('Loading Data','x-mask-loading');
                                        form = Ext.getCmp('userForm'+page).getForm(); 
                                        form.submit({
                                            url:'ChangeProfile',
                                            params: {
                                                _token : csrf_token,
                                            },
                                            success:function() {
                                                Ext.getCmp('winProfile'+page).body.unmask();
                                                Ext.example.msg('Save','Data has been changed'); 
                                            },
                                            failure:function(){
                                                Ext.getCmp('winProfile'+page).body.unmask();
                                                Ext.MessageBox.alert('Alert','Error On Save User');
                                            }
                                        });                             
                                    }
                                    
                                }
                            },{
                                text:'Reload User',
                                id:'load-user',
                                scale:'medium',
                                iconCls:'drop',
                                handler:function() {
                                    Ext.getCmp('winProfile'+page).body.mask('Loading Data','x-mask-loading');
                                    Ext.Ajax.request({
                                        scope:this,
                                        url: '/getUserProfile',
                                        method: 'POST',
                                        dataType: 'json',
                                        params:{
                                            _token : csrf_token,
                                        },
                                        success:function(response, request){
                                            Ext.getCmp('winProfile'+page).body.unmask();
                                            var record = Ext.decode(response.responseText);
                                            Ext.getCmp('user_name'+page).setValue(record.data.user_name);
                                            Ext.getCmp('real_name'+page).setValue(record.data.real_name);
                                        },
                                        failure:function(response, request){
                                            if(typeof request.response != 'undefined')
                                                var mess = request.response.responseText;
                                            else
                                                var mess = 'Fields marked in red can not be blank !' ;
                                                Ext.getCmp('winProfile'+page).body.unmask();
                                                Ext.MessageBox.alert('Alert','Error On Loading User');                                            

                                        },
                                    });                                    

                                }                   
                            }
                    ],*/
                    listeners: {
                        render: function() {
                            // btn_load = Ext.getCmp('load-user');
                            // btn_load.handler.call(btn_load); 
                            
                        }
                    }                    
                }
            ]       
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
            items:[
                {
                    xtype:'panel',
                    layout:'border',
                    id:'MainPanel_'+MainTabId,
                    // padding : '3 3 3 3',
                    border:false,
                    items:[
                        Ext.create('Ext.panel.Panel', {
                            border:false,
                            layout: 'fit',
                            region: 'center',
                            id:'MainContentPanel_'+MainTabId,
                            dockedItems: [
                                {
                                    xtype: 'header',
                                    style: ' backgroundColor:#FFFFFF; backgroundImage:none;text-align: right;font-color:white;font-weight: bold;font-size:25px;font-family: "Comic Sans MS", cursive, sans-serif',
                                    html: 'List '+title,
                                    id:'titleHeader'+pageid,
                                    padding : '5 5 15 5 ',
                                    frame: false,
                                    // dock: 'top' //top
                                }
                            ],
                            items:[
                                {
                                    xtype:'tabpanel',
                                    border:false,
                                    padding : '1 1 1 1',
                                    items:[
                                        {
                                            title:'User Profile',
                                            layout:'fit',
                                            border:false,
                                            padding : '1 1 1 1',
                                            iconCls : 'chk-pwd',
                                            items:[
                                                // winProfile
                                            ]

                                        },

                                    ]
                                }

                            ]
                        }),
                    ]
                }

            ],
            listeners:{
                destroy:function(){
                    winProfile= Ext.getCmp('winProfile'+page);
                    if (winProfile)
                        winProfile.destroy();                    
                }
            }

        }

        OpenTab(main_content,MainTabId);
    }
});
