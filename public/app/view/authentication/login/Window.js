Ext.define('APP.view.authentication.login.Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.authentication.login.window',
    title: 'Login to Application!',
    iconCls : 'abm-icon',
    id:'WinLogin',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    width	: 350,
    height	: 295,
    closable: false,
    headerPosition: 'top',
    modal: false,
    resizable: false,
    closable: false,
    draggable: false,
    buttonAlign: 'right',
    bodyStyle: 'background:#dfe8f6;',
    items:[
        /*{
            xtype: 'tbspacer',
            flex: 3
        },*/
        /*{
            xtype: 'panel',
            width: 130,
            region: 'north',
            border: false,
            padding:'13 0 0 0',
            html: '<img src="images/logo_genesys.png" align="middle" width="50%" height="50%"/>',
            bodyStyle: 'background:#dfe8f6;',
        },*/ 
        {
            xtype: 'panel',
            border: false,
            region: 'center',
            // bodyPadding: '5 0 0 10',
            bodyStyle: 'background:#dfe8f6;',
            items: [
                {
                    xtype: 'box',
                    region:'west',
                    width: 130,
                    margin: '5 10 10 10',
                    autoEl: {
                        tag: 'div',
                        html: '<img id="pic" src=images/abm-logo.png style="background:transparent;" />'
                    }
                },
                /*{
                    xtype: 'panel',
                    width: 300,
                    height:90,
                    region: 'north',
                    border: false,
                    padding:'5 5 5 5',
                    // html: '<img src="images/logo_genesys.png" width="100%" height="80%"/>',
                    bodyStyle: 'background:#dfe8f6;',
                },*/
                {
                    xtype:'form',
                    border: false,
                    id:'formForgot',
                    alias: 'widget.authentication.login.form',
                    bodyPadding: '10 18 0 20',
                    margin: '10 10 0 15',
                    region  : 'center',
                    frame:true,
                    plain:false,
                    border:false,
                    alias: 'widget.authentication.login.form',
                    method: 'POST',
                    hidden:true,
                    fieldDefaults: {
                        labelWidth: 110,
                        labelAlign: 'left',
                        msgTarget: 'none',
                        invalidCls: '' //unset the invalidCls so individual fields do not get styled as invalid
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            name: 'email',
                            fieldLabel: 'Email',
                            value: '',
                            allowBlank: false,
                            labelSeparator: "",
                            // minLength: 6,
                            emptyText:'Email',
                            listeners: {
                                specialkey: function(o, e) {
                                    // enterFunct(o, e, Ext.getCmp('Password'));
                                },
                            }
                        },                        
                    ]
                },
                {
                    xtype: 'authentication.login.form'
                }
            ]
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
                    text: 'Submit',
                    itemId: 'btnForgot',
                    id: 'btnForgot',
                    iconCls: 'login',
                    border: true,
                    hidden:true,
                    handler: function() {
                        Ext.MessageBox.show({
                            msg: 'Forgot Password, please wait...',
                            progressText: 'Process...',
                            width:300,
                            wait:true,
                            waitConfig: {interval:200},
                            icon:'ext-mb-download',
                            animEl: 'buttonID'
                        });                        
                        var formForgot = Ext.getCmp('formForgot');
                        var form = Ext.getCmp('formForgot').getForm();
                        if(form.isValid()){
                            formForgot.form.submit({
                                scope:this,
                                url: 'password/email',
                                method: 'POST',
                                dataType: 'html',
                                params:{
                                    _token : csrf_token,
                                },
                                success:function(response, request){
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
                    // handler: doLogin
                },                
                {
                    xtype: 'button',
                    text: 'Login',
                    itemId: 'login',
                    id: 'login',
                    iconCls: 'login',
                    border: true,
                    // handler: doLogin
                },
                {
                    xtype: 'button',
                    text: 'Clear',
                    itemId: 'LoginReset',
                    iconCls: 'clear',
                    border: true,
                    handler: function() {
                        Ext.getCmp('formForgot').hide();
                        Ext.getCmp('formLogin').show();
                        Ext.getCmp('login').show();
                        Ext.getCmp('btnForgot').hide();
                        /*var sb = Ext.getCmp('sbWinLogin');
                        sb.setStatus({
                            text: 'Ready',
                            iconCls: 'x-status-valid',
                            clear: true // auto-clear after a set interval
                        });*/
                    }
                },
            ]
        }
    ],

});