Ext.define('APP.store.UsersStore', {
    extend: 'Ext.data.Store',
    alias: 'store.UsersStore',
    model: 'APP.model.UsersModel',
    storeId: 'UsersStore',
//    remoteFilter:true,
//    remoteSort:true,
	sorters: [{
		direction:'ASC',
	}],
    autoLoad: true,
    autoSync: true,
    pageSize: null,
    proxy: {
        type: 'ajax',
        url: '/Users',
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