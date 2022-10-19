/**
 * {@link Ext.data.Model} for Security User
 */
Ext.define('APP.model.security.User', {
    extend: 'Ext.data.Model',
    fields: [
        {
            name: 'Username',
            type: 'string',
            persist: false
        },
        {
            name: 'Roles',
            type: 'string',
            persist: false
        }
    ],
    inRole: function( RoleID ) {
        var me = this;
        return Ext.Array.contains( me.get( 'Roles' ), RoleID );
    } 
});