function enterFunct(f, e, ff) {
    if (e.getKey() == e.ENTER) {
        ff.focus();
    }
};
Ext.define('APP.view.authentication.login.Form', {
    extend: 'Ext.form.Panel',
    border: false,
    alias: 'widget.authentication.login.form',
    bodyPadding: '10 18 0 20',
    margin: '10 10 0 15',
    region  : 'center',
    frame:true,
    plain:false,
    border:false,
    alias: 'widget.authentication.login.form',
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
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                anchor: '100%'
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
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    fieldLabel: 'Remember Me',
                    inputValue:1,
                    name:'remember'
                },
                {
                    xtype: 'tbfill'
                },
                {
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
            ],
            
        });
        me.callParent( arguments );
    },
    updateErrorState: function(cmp, state) {
        
    },

    onTermsOfUseElementClick: function(e) {
        
    },

    acceptTermsOfUse: function() {
        // this.closeTermsOfUse(true);
    },

    declineTermsOfUse: function() {
        // this.closeTermsOfUse(false);
    },

    closeTermsOfUse: function(accepted) {
        // this.lookupReference('termsOfUseWindow').close();
        // this.lookupReference('acceptTerms').setValue(accepted);
    },
});