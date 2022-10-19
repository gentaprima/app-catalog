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
  var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

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
                  html: '<img id="pic" src=../../images/abm-logo.png style="background:transparent;" />'
              }
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
            id:'formResetPassword',
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
                name: 'email',
                fieldLabel: 'Email :',
                afterLabelTextTpl: required,
                value: '',
                allowBlank: false,
                labelSeparator: "",
                // minLength: 6,
                emptyText:'Email',
                listeners: {
                    specialkey: function(o, e) {
                        // enterFunct(o, e, Ext.getCmp('Password'));
                    },
                },
                value:''
              },                
              {
                xtype : 'textfield',      
                fieldLabel: 'New Password :',
                afterLabelTextTpl: required,
                name: 'password',
                id  : 'password',
                inputType : 'password',
                emptyText:'Old Password',
                allowBlank: false ,
                listeners:{
                  // specialkey: function(o,e){enterFunct(o,e,Ext.getCmp('password'));}
                },
                value:''
              },
              {
                xtype : 'textfield',
                fieldLabel: 'Confirm Password:',
                afterLabelTextTpl: required,
                name: 'password_confirmation',
                id  : 'password_confirmation',
                inputType : 'password',
                emptyText:'New Password',
                allowBlank: false ,
                enableKeyEvents: true,
                value:'',
                validator: function() {
                   var formPanel = Ext.getCmp("formResetPassword").getForm();
                   // Save the fields we are going to insert values into
                   var pass1 = Ext.getCmp('password').getValue();
                   var pass2 = Ext.getCmp('password_confirmation').getValue();
                   // console.log("pass 1 = " + pass1 + "--pass 2 = " + pass2);

                    if (pass1 == pass2)
                        return true;

                    else 
                        return "Passwords do not match!";
                },
                listeners:{
                  specialkey: function(o, e){
                    if (e.getKey() == e.ENTER){
                      btn = Ext.getCmp('btn-resetPwd'); 
                      btn.handler.call(btn.scope); 
                    }
                  }, 
                  render:function(){
                    var css = '.ux-auth-warning {background:url("images/icon/error.png") no-repeat center left; padding: 2px; padding-left:20px; font-weight:bold;}';
                    Ext.util.CSS.createStyleSheet(css, this._cssId);
                    this.capsWarningTooltip = new Ext.ToolTip({
                      target: this.id,
                      anchor:'30%',
                      autoHide:true,
                      mustShow: false,
                      html: '<div class="ux-auth-warning">Caps Lock is On</div>' +
                            '<div>Having Caps Lock on may cause you to enter your password incorrectly.</div>' +
                            '<div>You should press Caps Lock to turn it off before entering your password.</div>',
                      listeners: {
                          beforeshow: function(){
                              return this.mustShow;
                          }
                      }
                    });
                    // this.capsWarningTooltip.disable();
                  },
                  keypress: {
                    fn: function(field, e) {
                      var charCode = e.getCharCode();
                      if((e.shiftKey && charCode >= 97 && charCode <= 122) ||
                        (!e.shiftKey && charCode >= 65 && charCode <= 90)) {
          
                        field.capsWarningTooltip.mustShow = true;
                        field.capsWarningTooltip.show();
                        //alert("here")
                      }
                      else {
                        if(field.capsWarningTooltip.hidden == false) {
                          field.capsWarningTooltip.mustShow = false;
                          field.capsWarningTooltip.hide();
                        }
                      }
                      
                    },
                    scope: this
                  },
          
                  blur: function(field) {
                    if(this.capsWarningTooltip.hidden == false) {
                      this.capsWarningTooltip.hide();
                    }
                  },
                } 
              }              
            ],
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
                  text: 'Reset Password',
                  itemId: 'btn-resetPwd',
                  id: 'btn-resetPwd',
                  iconCls: 'login',
                  border: true,
                  handler: function() {
                      Ext.MessageBox.show({
                          msg: 'Reset Password, please wait...',
                          progressText: 'Process...',
                          width:300,
                          wait:true,
                          waitConfig: {interval:200},
                          icon:'ext-mb-download',
                          animEl: 'buttonID'
                      });                        
                      var formResetPassword = Ext.getCmp('formResetPassword');
                      var form = Ext.getCmp('formResetPassword').getForm();
                      if(form.isValid()){
                          formResetPassword.form.submit({
                              scope:this,
                              method: 'POST',
                              dataType: 'html',
                              url: '../../password/reset',
                              params: {
                                _token : csrf_token,
                                token: token
                              },
                              success:function(response, request){
                                var result = Ext.util.JSON.decode(request.response.responseText);
                                Ext.MessageBox.hide();
                                /*Ext.MessageBox.show(
                                    {
                                        title : 'Message',
                                        msg: result.message,
                                        buttons: Ext.MessageBox.OK,
                                        icon :  Ext.MessageBox.INFO
                                    }
                                );*/
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
                              },
                              failure:function(response, request){
                                  if(typeof request.response != 'undefined')
                                      var mess = request.response.responseText;
                                  else
                                      var mess = 'Fields marked in red can not be blank !' ;
                                  Ext.getCmp('WinLogin').body.unmask();
                                  Ext.create('Ext.window.MessageBox', {
                                      alwaysOnTop: true,
                                      closeAction: 'destroy'
                                  }).show({
                                      icon: Ext.MessageBox.ERROR,
                                      title: 'Message',
                                      buttons: Ext.Msg.OK,
                                      message:mess
                                  });                                    
                                  /*Ext.MessageBox.show(
                                      {
                                          title: 'Message',
                                          msg: mess,
                                          buttons: Ext.MessageBox.OK,
                                          icon: Ext.MessageBox.ERROR
                                      }
                                  );*/

                              },
                          });
                      }                        
                  }
                  // handler: doLogin
              },                
              {
                  xtype: 'button',
                  text: 'Clear',
                  itemId: 'LoginReset',
                  iconCls: 'clear',
                  border: true,
                  handler: function() {
                      // Ext.getCmp('formForgot').hide();
                      // Ext.getCmp('formLogin').show();
                      // Ext.getCmp('login').show();
                      // Ext.getCmp('btnForgot').hide();
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
    
  