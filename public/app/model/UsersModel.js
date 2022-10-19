Ext.define('APP.model.UsersModel', {
    extend: 'Ext.data.Model',
    // idProperty : 'flag',
    fields: [
        {	
        	name: 'user_id',
        	type: 'string'
        },
        {
        	name: 'companies_m_id',
        	type: 'string'                        
        },
        {
        	name: 'group_id',
        	type: 'string'                        
        },
        {
            name: 'real_name',
            type: 'string'
        },
        {
            name: 'user_name',
            type: 'string'
        },
        {
            name: 'email',
            type: 'string'
        },
        {
            name: 'password',
            type: 'string'
        },
        {
            name: 'last_login',
            type: 'string'
        },
        {
            name: 'created_at',
            type: 'string'
        },
        {
            name: 'is_active',
            type: 'int'
        },		
    ]
});