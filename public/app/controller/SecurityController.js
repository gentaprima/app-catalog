/**
 * Controller for all security functionality
 */
Ext.define('APP.controller.SecurityController', {
    extend: 'APP.controller.AbstractController',
    requires: [
        'APP.security.crypto.SHA1'
    ],
    models: [
        'security.User'
    ],
    views: [
        'authentication.login.Form',
        'authentication.login.Window'
    ],
    refs: [
        {
            ref: 'LoginForm',
            selector: '[xtype=authentication.login.form]'
        },
        {
            ref: 'LoginWindow',
            selector: '[xtype=authentication.login.window]'
        }
    ],
    init: function() {
        this.listen({
            controller: {

            },
            component: {
                'loginwindow textfield': {
                    // specialkey: this.doLogin
                },
                '[xtype=authentication.login.window] textfield#Password': {
                    specialkey: function(o, e){
                        if (e.getKey() == e.ENTER) {
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
                                    }
                                }
                            });
                        }
                        
                    }
                },
                '[xtype=authentication.login.window] button#login': {
                    click: this.doLogin
                },
                '[xtype=authentication.login.window] button#register': {
                    click: this.doRegister
                },
                'menu[xtype=layout.menu] menuitem#logout': {
                    click: this.doLogout
                } 
            },
            global: {
                beforeviewportrender: this.processLoggedIn
            },
            store: {},
            proxy: {} 
        });
    },

    /**
     * Main method process security check
     */
    processLoggedIn: function() {
        var me = this;
        if(!userid){
            Ext.widget( 'authentication.login.window' ).show();
        }else{
            Ext.globalEvents.fireEvent( 'aftervalidateloggedin' );
        }
        
    },
    /**
     * Handles form submission for login
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     * @param {Object} eOpts
     */
    doLogin: function( button, e, eOpts ) {
        Ext.getCmp('WinLogin').body.mask('Loading Menu Login ....','x-mask-loading');
        var sb = Ext.getCmp('sbWinLogin');
        var me = this,
            win = button.up( 'window' ),
            form = Ext.getCmp('formLogin').getForm(),
            values = form.getValues(),
            hashedPassword;
        if( Ext.isEmpty( values.Username ) || Ext.isEmpty( values.Password ) ) {
            Ext.Msg.alert( 'Attention', 'Please complete the login form!' );
            Ext.getCmp('WinLogin').body.unmask();
            return false;
        }
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
                }
            }
        });
            
    },
    /**
     * Handles logout
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     * @param {Object} eOpts
     */
    doLogout: function( button, e, eOpts ) {
        var me = this;
        Ext.Msg.confirm( 'Attention', 'Are you sure you want to logout of Application?', function( button ) {
            if( button=='yes' ) {
                window.location.reload( true );
            }
        });
    },
    /**
     * Handles register
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     * @param {Object} eOpts
     */
    doRegister: function( button, e, eOpts ) {
        var me = this;
        Ext.Msg.alert('Status', 'Not implemented yet.');        
    }
});