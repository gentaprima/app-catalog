Ext.define('APP.store.ContactDS', {
    // extend: 'APP.store.AbstractStore',
    extend: 'Ext.data.Store',
    //----------------------------------------------------------------
    // REQUIRES
    //----------------------------------------------------------------
    requires: [
        'APP.model.Contact'
    ],
    
    //----------------------------------------------------------------
    // ALIASES
    //----------------------------------------------------------------
    alias: 'store.ContactDS',
    
    //----------------------------------------------------------------
    // PROPERTIES
    //----------------------------------------------------------------
    restPath: './index.php/contact',
    storeId: 'ContactDS',
    model: 'APP.model.Contact'
});