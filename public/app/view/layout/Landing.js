/*window.onbeforeunload = function(e) {
    return 'Refresh Browser ?';
};*/
/**
 * Generic landing page for application
 */
Ext.define('APP.view.layout.Landing', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.layout.landing',
    title: 'Welcome!',
    bodyPadding: 10,
    html: "<p>Welcome to the Cataloguing System ! (<span style='background-color: #ffff00;'>DEVELOPMENT</span>)</p> <p>Video tutorial penggunaan dapat dilihat di link berikut: <a title='Tutorial List' href='https://tmtgroup-my.sharepoint.com/:f:/g/personal/reza_pahlevi_abm-investama_co_id/ErqBWXbXEepNqdhTXPlonRcBpg-EDUXHSw7Fd56Rt2YJ2w?e=aGGHUr' target='_blank' rel='noopener'>Tutorial List</a></p>",
    initComponent: function(){
        var me = this;
        Ext.applyIf(me,{
            items:[
                {
                    xtype:'image',
                    src:''
                }
            ]
        });
        me.callParent( arguments );
    } 
});