Ext.define('APP.store.CompanyStore', {
    extend: 'Ext.data.Store',
    alias: 'store.CompanyStore',
    model: 'APP.model.CompanyModel',
    storeId: 'CompanyStore',
    remoteFilter:true,
    remoteSort:true,
    autoLoad: true,
    autoSync: true,
    pageSize: null,
    proxy: {
        type: 'rest',
        url: '/getCompaniesM',
        reader: {
            type: 'json',
            rootProperty: 'data'
        },
        writer: {
            type: 'json'
        },
    },
    listeners: {
        beforeload: function(store){
            store.getProxy().setExtraParam("_token", csrf_token);
        },
        afterload:function(store){
            
        }
    },

});