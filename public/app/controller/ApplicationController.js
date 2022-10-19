/**
 * Main controller for all top-level application functionality
 */
Ext.define('APP.controller.ApplicationController', {
    extend: 'APP.controller.AbstractController',
    views: [
        'Viewport',
        'layout.Navigation',
        'layout.Mainpanel',
        'layout.Landing',
        // 'layout.Footer'
    ],
    refs: [
        {
            ref: 'Viewport',
            selector: '[xtype=viewport]'
        },
        {
            ref: 'Menu',
            selector: '[xtype=layout.menu]'
        },
        {
            ref: 'CenterRegion',
            selector: '[xtype=layout.mainpanel]'
        }
    ],
    init: function() {
        this.listen({
            controller: {
                '#ApplicationController': {
                    tokenchange: this.dispatch
                }
            },
            component: {
                'menu[xtype=layout.menu] menuitem': {
                    // click: this.addHistory
                } 
            },
            global: {
                aftervalidateloggedin: this.setupApplication
            },
            store: {},
            proxy: {
                '#baserest': {
                    // requestcomplete: this.handleRESTResponse
                }
            } 
        });
    },
    /**
     * Entry point for our application. Will render the viewport, and do any other setup required for our application
     */
    setupApplication: function() {
        var me = this;
        // create the viewport, effectively creating the view for our application
        Ext.create( 'APP.view.Viewport' );
         // init Ext.util.History on app launch; if there is a hash in the url,
        // our controller will load the appropriate content
        Ext.util.History.init(function(){
            // var hash = document.location.hash;
            // me.fireEvent( 'tokenchange', hash.replace( '#', '' ) );
        })
        // add change handler for Ext.util.History; when a change in the token
        // occurs, this will fire our controller's event to load the appropriate content
        Ext.util.History.on( 'change', function( token ){
            // me.fireEvent( 'tokenchange', token );
        });
    },
    /**
     * Add history token to Ext.util.History
     * @param {Ext.menu.Item} item
     * @param {Object} e
     * @param {Object} opts
     */
    addHistory: function( item, e, opts ) {
        var me = this,
            token = item.itemId;
        if( !Ext.isEmpty( token ) && token != 'logout' ) {
            Ext.util.History.add( token );
        }
    },
    /**
     * Handles token change and directs creation of content in center region
     * @param {String} token
     */
    dispatch: function( token ) {
        var me = this,
            allowedRole = 1,
            config;
            // alert(token);
        // switch on token to determine which content to create
        switch( token ) {
            default:
                config = {
                    xtype: 'layout.landing'
                };
            break;
        }
        // me.updateCenterRegion( config );
    },
    /**
     * Updates center region of app with passed configuration
     * @param {Object} config
     * @private
     */
    updateCenterRegion: function( config ) {
        // var me = this,
        // mainpanel = me.getCenterRegion();

        // remove all existing content
        // center.removeAll( true );
        // add new content
        // mainpanel.add( config );
    },
    
    /**
     * After a REST response is completed, this method will marshall the response data and inform other methods with relevant data
     * @param {Object} request
     * @param {Boolean} success The actual success of the AJAX request. For success of {@link Ext.data.Operation}, see success property of request.operation
     */
    handleRESTResponse: function( request, success ) {
        var me = this,
            rawData = request.proxy.reader.rawData;
        // in all cases, let's hide the body mask
        Ext.getBody().unmask();
        // if proxy success
        if( success ) {
            // if operation success
            if( request.operation.wasSuccessful() ) {

            }
            // if operation failure
            else {
                // switch on operation failure type
                switch( rawData.type ) {
                    case 'validation':
                        me.showValidationMessage( rawData.data, rawData.success, rawData.message, rawData.type );
                        break;
                    case 'notloggedin':
                        me.showLoggedOutMessage( rawData.message );
                        break;
                }
            }
        }
        // otherwise, major failure...
        else {

        }
    },
    /**
     * Displays errors from JSON response and tries to mark offending fields as invalid
     * @param {Array} data
     * @param {Boolean} success
     * @param {String} message
     * @param {String} type
     */
    showValidationMessage: function( data, success, message, type ) {
        var me = this,
            errorString = '<ul>';
        // looping over the errors
        for( var i in data ) {
            var error = data[ i ];
            errorString += '<li>' + error.message + '</li>';
            // match form field with same field name
            var fieldMatch = Ext.ComponentQuery.query( 'field[name=' + error.field + ']' );
            // match?
            if( fieldMatch.length ) {
                // add extra validaiton message to the offending field
                fieldMatch[ 0 ].markInvalid( error.message );
            }
        }
        errorString += '</ul>';
        // display error messages in modal alert
        Ext.Msg.alert( message, errorString );
    },
    /**
     * Displays errors from JSON response and tries to mark offending fields as invalid
     * @param {String} message
     */
    showLoggedOutMessage: function( message ) {
        // display error messages in modal alert
        Ext.Msg.alert( 'Attention', message, function() {
            // reload page
            window.location.reload( true );
        });        
    },
    
    buildSendToTip : function () {
        return Ext.create('Ext.tip.Tip', {
            html: this.getSendTos(),
            closable: true,
            width: 400, // initial width needed to make the sizing work,
            maxWidth: 500
        });
    },
    
    closeSendToTip : function() {
        if (this.sendToTip.isVisible()) {
            this.sendToTip.hide();
        }
    },
    
    /**
     * When the user clicks in the send to box, pop open a tooltip that
     * shows the complete list of the user ids this email is going to.
     * The tip should cover the send to trigger field, right aligining
     * with it, up to a maximum of 500px.
     */
    onSendToClick : function() {
        var width = this.sendTo.inputEl.getWidth(),
            position = this.sendTo.inputEl.getXY(),
            xpos;
        
        // Figure out how wide the tip should be, the max is 500
        if ( width > 500 ) {
            xpos = position[0] + (width-500);
            position[0] = xpos;
            width = 500;
        }
        
        this.sendToTip.setWidth(width);
        this.sendToTip.doLayout();
        this.sendToTip.showAt(position);
    },
    
    /**
     * Build a nicely formatted list of the user ids.
     */
    getSendTos : function() {
        var str = this.userIds.join(", ");
        return str;
    },

    onMsgBodyChange : function(field) {
        var fbar = this.getDockedComponent('bToolbar'),
            sendBtn = fbar.child('#sendbtn');
        if (field.getValue().length > 0) {
            sendBtn.enable();
        } else {
            sendBtn.disable();
        }

    },

    onCancel : function () {
        this.close();
    },
    
    onEmail : function () {
        var formPanel = this.getComponent('emailform');
        if (formPanel.getForm().isValid()) {
            this.el.mask('Please wait', 'x-mask-loading');
            formPanel.getForm().submit({
                url: 'email/post/url/here',
                timeout: 300,
                scope: this,
                success: this.onEmailSuccess,
                failure: this.onEmailFailure
            });
        }
    },
    
    onEmailSuccess : function() {
        this.close();
    },
    
    onEmailFailure : function (form, action) {
        this.el.unmask();
        Ext.Msg.alert('Send Email', action.result.message);
    },
    
    sendToTipClean : function() {
        this.sendToTip.destroy();
    },
    
    /**
     * Extra initialization of the email window that works best after the
     * show event.  Initialize the value show for max chars allowed.  This assumes the
     * maxLength field is configured on the text area.
     */
    extraInit : function() {
        var body = this.down('#emailbody'),
            ctr = this.down('#textCtr');
        
        ctr.setValue(body.maxLength);
        body.focus(false, true);
    },
    
    /**
     * Update the 'Allowed chars remaining' text as the user types. Once the
     * limit is reached, the Ext validation tip will display under the 
     * text area and the allowed char remaining field will be hidden. Also,
     * enable or disable the send button.
    */
    updateTextCtr : function(body) {
        var ctr = this.down('#textCtr'),
            text = body.getValue(),
            maxLength = body.maxLength,
            sendBtn = this.down('#sendbtn');

        if (text.length > maxLength) {
            ctr.hide();
        } else {
            if ( !ctr.isVisible() ) {
                ctr.show();
            }
            ctr.setValue(maxLength - text.length);
        }

        // Send button enabled only when there is a message body
        if (text.length > 0) {
            sendBtn.enable();
        } else {
            sendBtn.disable();
        }
    }
     
    // also destroying the tip on the window destroy event
});