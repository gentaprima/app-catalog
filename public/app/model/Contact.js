Ext.define('APP.model.Contact', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'ID_CONTACT'         , type: 'integer'                       },
        {name: 'FIRST_NAME'  , type: 'string'                        },
        {name: 'LAST_NAME'   , type: 'string'                        },
        {name: 'BIRTH_DATE'  , type: 'date'                          },
        {name: 'MAIL_ADDRESS', type: 'string'                        }
    ]
});