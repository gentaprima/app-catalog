Ext.define('APP.store.UsersGroupStore', {
    extend: 'Ext.data.Store',
    alias: 'store.UsersGroupStore',
    model: 'APP.model.UsersGroupModel',
    storeId: 'UsersGroupStore',
    remoteFilter:true,
    remoteSort:true,
    autoLoad: true,
    autoSync: true,
    pageSize: null,
    proxy: {
        type: 'rest',
        url: '/UsersGroup',
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