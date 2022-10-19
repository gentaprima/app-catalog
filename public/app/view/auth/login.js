Ext.require(['*']);
Ext.onReady(function()
{
  function enterFunct(f, e, ff) {
    if (e.getKey() == e.ENTER){
      ff.focus();
    }
  }
  Ext.QuickTips.init();
  var me = this;
  var reloadIcon = false;
  var iconStore = Ext.create('Ext.data.JsonStore',{
      proxy: {
          type: 'ajax',
          url: '/Icons',
          reader: {
              type: 'json',
              root: 'data',
              totalProperty: 'total'
          }
      },
      root: 'data',
      fields: [
          {name:'id'},
          {name:'title'},
          {name:'clsname'},
          {name:'icon'}
      ],
      remoteSort: true,
      sorters: [
          {
              property : 'rowid',
              direction: 'ASC'
          },
      ],
      listeners: {
          load: function(store) {
              var iconcss ;
              iconStore.each(function(r,i){
                      var row = r.data;
                      iconcss +=" ";
                      iconcss += Ext.String.format('.{0} { background-image: url(../../images/icon/{1}) !important; }',row.clsname,row.icon);
                  }
              );
              if (reloadIcon)
                  Ext.util.CSS.removeStyleSheet('iconcss');
              Ext.util.CSS.createStyleSheet(iconcss, 'iconcss');
              reloadIcon = false;
          }
      }

  });

  iconStore.load({params:{start: 0, limit:1000}});  

  Ext.create('Ext.Window', {
    title : APP_TITLE,
    title: 'Login to Application!',
    iconCls : 'abm-icon',
    id:'WinLogin',
    layout: {
        type: 'hbox',
        pack: 'start',
        align: 'stretch'
    },
    width : 350,
    height  : 295,
    closable: false,
    headerPosition: 'top',
    modal: false,
    resizable: false,
    closable: false,
    draggable: false,
    buttonAlign: 'right',
    bodyStyle: 'background:#dfe8f6;',
    items : [
      {
        xtype: 'panel',
        border: false,
        region: 'center',
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
          {
            xtype:'form',
            border: false,
            id:'formForgot',
            bodyPadding: '10 18 0 20',
            margin: '10 10 0 15',
            region  : 'center',
            frame:true,
            plain:false,
            border:false,
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
                labelSeparator: "",
                allowBlank: false,
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
            xtype:'form',
            border: false,
            bodyPadding: '10 18 0 20',
            margin: '10 10 0 15',
            region  : 'center',
            frame:true,
            plain:false,
            border:false,
            method: 'POST',
            id:'formLogin',
            fieldDefaults: {
                labelWidth: 110,
                labelAlign: 'left',
                msgTarget: 'none',
                invalidCls: '' //unset the invalidCls so individual fields do not get styled as invalid
            },
            listeners: {
                validitychange: 'updateErrorState',
                errorchange: 'updateErrorState'
            },        
            items: [
              {
                  xtype: 'textfield',
                  name: 'Username',
                  fieldLabel: 'Username',
                  value: '',
                  allowBlank: false,
                  labelSeparator: "",
                  // minLength: 6,
                  emptyText:'Username',
                  listeners: {
                      specialkey: function(o, e) {
                          enterFunct(o, e, Ext.getCmp('Password'));
                      },
                  }
              },
              {
                  xtype: 'textfield',
                  name: 'Password',
                  inputType: 'password',
                  fieldLabel: 'password',
                  value: '',
                  allowBlank: false,
                  labelSeparator: "",
                  id: 'Password',
                  emptyText:'Password',
                  listeners: {
                      
                  }
              },
/*               {
                  xtype: 'checkboxfield',
                  anchor: '100%',
                  fieldLabel: 'Remember Me',
                  inputValue:1,
                  name:'remember'
              }, */
              {
                  xtype: 'tbfill'
              },
/*               {
                  xtype: 'button',
                  id: 'passwordRecoveryButton',
                  text: 'Forgot Password',
                  style: 'border-color: red',
                  align:'right',
                  listeners: {
                    click: function(button, event){
                      Ext.getCmp('formForgot').show();
                      Ext.getCmp('formLogin').hide();
                      Ext.getCmp('login').hide();
                      Ext.getCmp('btnForgot').show();
                    }
                  }

              },                
 */            ],
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
                      var formForgot = Ext.getCmp('formForgot');
                      var form = Ext.getCmp('formForgot').getForm();
                      if(form.isValid()){
                        Ext.MessageBox.show({
                            msg: 'Forgot Password, please wait...',
                            progressText: 'Process...',
                            width:300,
                            wait:true,
                            waitConfig: {interval:200},
                            icon:'ext-mb-download',
                            animEl: 'buttonID'
                        });                          
                        formForgot.form.submit({
                            scope:this,
                            url: 'password/email',
                            method: 'POST',
                            dataType: 'html',
                            params:{
                                _token : csrf_token,
                            },
                            success:function(response, request){
                                var result = Ext.util.JSON.decode(request.response.responseText);
                                Ext.MessageBox.hide();
                                Ext.create('Ext.window.MessageBox', {
                                    alwaysOnTop: true,
                                    closeAction: 'destroy'
                                }).show({
                                    icon: Ext.MessageBox.INFO,
                                    title: 'Message',
                                    buttons: Ext.Msg.OK,
                                    message:result.message
                                });
                              var location = window.location ;
                              window.location.href = location.origin+'/login' ;                                  
                            },
                            failure:function(response, request){
                                Ext.MessageBox.hide();
                                if(typeof request.response != 'undefined')
                                    var mess = request.response.responseText;
                                else
                                  var mess = 'Fields marked in red can not be blank !' ;
                                  Ext.create('Ext.window.MessageBox', {
                                      alwaysOnTop: true,
                                      closeAction: 'destroy'
                                  }).show({
                                      icon: Ext.MessageBox.ERROR,
                                      title: 'Message',
                                      buttons: Ext.Msg.OK,
                                      message:mess
                                  }); 

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
                handler: function(){
                  Ext.getCmp('WinLogin').body.mask('Loading Menu Login ....','x-mask-loading');
                  var formLogin = Ext.getCmp('formLogin');
                  var values = formLogin.getValues();
                  Ext.Ajax.request({
                      url:'login',
                      params:{
                              _token : csrf_token,
                              username : values.Username, 
                              password : values.Password
                      },
                      success: function(response) {
                          Ext.getCmp('WinLogin').body.unmask();
                          result = Ext.decode(response.responseText);
                          if(result.success){
                              var location = window.location ;
                              window.location.href = location.origin+'/home' ;
                          } else {
                            Ext.getCmp('WinLogin').body.unmask();
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
                      }
                  });
                }
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
  }).show();
  var loadingDiv;
    loadingDiv = Ext.getDom('loadingSplash');
    loadingDiv.style.display = 'none';

});
    
  