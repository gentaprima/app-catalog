/*var taskbbar = {
    run: function(){
      Ext.getCmp("dateStatus").update(Ext.Date.format(new Date(), 'd-m-Y'));
      Ext.getCmp("timeStatus").update(Ext.Date.format(new Date(), 'G:i:s'));
      Ext.getCmp("application").update("SAK - Sietem Aplikasi Katalog &copy; Copyright 2018");
      Ext.getCmp("developed").update("Developed By");
      Ext.getCmp("company").update("Itek Solusi Informasi");
    },
    interval: 1000 //1 second
}*/
// var runner = new Ext.util.TaskRunner();
// runner.start(taskbbar);
/**
 * "Header" for the application (logo, title, etc.)
 */
Ext.define('APP.view.layout.Footer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.layout.footer',
    layout  : 'hbox',
    border  : false,
    frame   : false,
    // height  : 27,
    id      : 'appFooter',
    region  : 'south',
    // flex: 1 ,
    padding : 2 ,
    bbar    : [
       '->',
       {
           id : 'application', 
           // text        : 'ERP ( Enterprise Resource Planing ) &copy; Copyright 2013',
           disabled    : true,
           style       :'color:blue'
       },
       '-',
       {
            id : 'developed', 
           // text        : 'Developed By :',
           disabled    : true,
           style       :'color:blue'
       },
       {
           id : 'company',  
           // text        : 'PT.PBS',
           disabled    : true,
           style       :'color:blue'
       },
       '-',
       {
            id          : 'dateStatus',
            // text        : '01-01-1970',
            disabled    : true,
            style       :'color:blue',
            
       },'-',
       {
            id          : 'timeStatus',
            disabled    : true,
            text        : '00:00:00',
            style       :'color:blue',
            
        }
    ],                
    initComponent: function(){
        var me = this;
        Ext.applyIf(me,{
            
        });
        me.callParent( arguments );
    },
    run: function(){
        Ext.getCmp("dateStatus").update(Ext.Date.format(new Date(), 'd-m-Y'));
        Ext.getCmp("timeStatus").update(Ext.Date.format(new Date(), 'G:i:s'));
        Ext.getCmp("application").update("SAK - Sietem Aplikasi Katalog &copy; Copyright 2018");
        Ext.getCmp("developed").update("Developed By");
        Ext.getCmp("company").update("Itek Solusi Informasi");
      },
      interval: 1000 //1 second 
});