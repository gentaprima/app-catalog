/**
 * Base {@link Ext.data.Store} from which all other application stores will extend
 */
Ext.define('APP.store.AbstractStore', {
    extend: 'Ext.data.Store',
    requires: [
        'APP.proxy.Rest'
    ],
    /**
     * @cfg {String} restPath End point for store requests
     */
    restPath: null,
    constructor: function( cfg ){
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'Base',
            remoteSort: true,
            remoteFilter: true,
            remoteGroup: true,
            proxy: {
                type: 'baserest',
                api: {
                    read   : me.restPath + '/read',
                    create : me.restPath + '/create',
                    update : me.restPath + '/update',
                    destroy: me.restPath + '/destroy'
               }
            }
        }, cfg)]);
    }
})