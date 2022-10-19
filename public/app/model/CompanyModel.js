Ext.define('APP.model.CompanyModel', {
    extend: 'Ext.data.Model',
    fields: [
        {	
        	name: 'id',
        	type: 'string'
        },
        {
        	name: 'code',
        	type: 'string'                        
        },
        {
        	name: 'name',
        	type: 'string'                        
        },
        {
            name: 'status',
            type: 'string'
        },
    ]
});