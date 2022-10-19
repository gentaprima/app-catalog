/**
 * Abstract REST proxy 
 */
Ext.define('APP.proxy.Rest', {
    extend: 'Ext.data.proxy.Ajax',
    alias: 'proxy.baserest',
    type: 'ajax',
    actionMethods: {
    	create   : 'POST',
    	read    : 'POST',
    	update  : 'POST',
    	destroy : 'POST'
    },
    writer: {
        type: 'json',
        writeAllFields: true
    },
    reader: {
        type: 'json',
        root: 'data',
        totalProperty: 'count'
    },
    afterRequest: function( request, success ) {
        var me = this;
        // fire requestcomplete event
        me.fireEvent( 'requestcomplete', request, success );
    }    
});