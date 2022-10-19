Ext.define('APP.model.UsersGroupModel', {
    extend: 'Ext.data.Model',
    // idProperty : 'flag',
    fields: [
        {	
        	name: 'group_id',
        	type: 'string'
        },
        {
        	name: 'group_name',
        	type: 'string'                        
        },
        {
            name: 'group_description',
            type: 'string'
        },
    ]
});