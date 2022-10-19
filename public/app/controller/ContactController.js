Ext.define('APP.controller.ContactController', {
    extend: 'APP.controller.AbstractController',

    //----------------------------------------------------------------
    // STORES
    //----------------------------------------------------------------
    stores: [
        'ContactDS'
    ],
    
    //----------------------------------------------------------------
    // VIEWS
    //----------------------------------------------------------------
    views: [
        'contact.ContactUI'
    ],
    
    //----------------------------------------------------------------
    // REFS
    //----------------------------------------------------------------
    refs: [
        {
            ref: 'CarList',
            selector: '[xtype=contact.contactUI]'
        }
    ],
    
    //----------------------------------------------------------------
    // CONSTRUCTOR
    //----------------------------------------------------------------
    init: function() {
        var me = this;
        me.listen({
            controller: {},
            component: {
                'grid[xtype=contact.contactUI]': {
                    beforerender: me.loadRecords
                }
            },
            global: {},
            store: {},
            proxy: {} 
        });
    },
    
    /**
     * Loads the component's store
     * @param {Ext.grid.Panel} grid
     * @param {Object} eOpts
     */
    loadRecords: function( cmp, eOpts ) {
        var me = this,
            store = cmp.getStore();
        // clear any fliters that have been applied
        store.clearFilter( true );
        // load the store
        store.load();
    }    
});