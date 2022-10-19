/**
 * "Header" for the application (logo, title, etc.)
 */
/*var inbox_notif = {
    run: function(){
        Ext.Ajax.request({
          url: base_url+'Iconcls',
          method: 'GET',
          // headers: { 'Content-Type': 'application/json' },
          // params : Ext.JSON.encode(formPanel.getValues()),
          success: function(conn, response, options, eOpts) {
              var result = Ext.JSON.decode(conn.responseText);
              // console.log(result);
              var count = parseInt(Ext.getCmp('count_notif').getValue())+1;
              Ext.getCmp('count_notif').setValue(count);
              Ext.getCmp('inbox_notif').setIconCls('email_go');
              Ext.getCmp('inbox_notif').setBadgeText(count);
              if (result.success) {
                  // Packt.util.Alert.msg('Success!', 'Stock was saved.');
                  // store.load();
                  // win.close();                      
              } else {
                  // Packt.util.Util.showErrorMsg(result.msg);
              }
          },
          failure: function(conn, response, options, eOpts) {
              // TODO get the 'msg' from the json and display it
              // Packt.util.Util.showErrorMsg(conn.responseText);
          }
      });
    },
    interval: 100000000 //1 second
};
var runner = new Ext.util.TaskRunner();
runner.start(inbox_notif);*/
Ext.define('Ext.ux.button.BadgeButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.badgebutton',
    mixins: ['Ext.ux.mixin.Badge']
});

var badgeButton = Ext.create('widget.badgebutton', {
    // renderTo: Ext.getBody(),
    // margin: 20,
    // xtype:'buttons',
    iconCls:'x-fa fa-envelope',
    // text: 'Messages',
    plugins: [
      {
          ptype: 'badgetext',
          align: 'right',
          text: '',
      }
    ],
});

/* for (var i = 1; i <= 20; i++) {
  (function(j) {
    Ext.defer(function() {
        badgeButton.setBadgeText('' + j);
    }, j * 250);
  })(i);
} */

var tbar_logout = Ext.create('Ext.toolbar.Toolbar', {
    // style: 'margin: 2px 10px; color: red;',
    border : false,
    cls: 'myBgCls',
    height:50,
    items : [
        {
            xtype:'textfield',
            hidden:true,
            id:'count_notif',
            value:1
        },
        badgeButton,
        // badgeButton,
        // badgeButton,
        /*{
            // xtype: 'button',
            iconCls:'x-fa fa-envelope',
            id:'inbox_notif',
            text:'<div style="color: white;background-color: transparent !important;">  </div>',
            handler: function(){
              // console.log('Check Email');
            },
            plugins: [
              {
                  ptype: 'badgetext',
                  align: 'right',
                  text: '',
              }
            ],
        },*/
        {
            xtype: 'image',
            style: 'color: white;border-radius: 20px;',
            height: 35,
            width: 35,
            alt:'current user image',
            src: 'resources/images/user-profile/2.png'
        },
        {
            xtype: 'tbtext',    
            style: 'color: white',             
            text: '<div>&nbsp;&nbsp;'+' Logged in as '+ username +' ( '+ usertype +' )</div>'
        },  
        {
            xtype: 'tbseparator'
        },
        {
          iconCls: 'fa-power-off',
          tooltip: 'Logout',
          handler: function(){
            document.location.href = base_url+'logout';
          }
      }
    ],
});
Ext.define('APP.view.layout.Header', {
    extend: Ext.Container,
    alias: 'widget.layout.header',
    id: "appHeader",
    height: 50,
    layout: {
        type: "hbox",
        align: "middle"
    },
    region: 'north',
    initComponent: function(){
        var me = this;
        Ext.applyIf(me,{
            items :[
                {
                    xtype: "component",
                    id: "app-header-title",
                    html: AppName+' | '+CompanyName,
                    flex: 1
                },
                tbar_logout

            ]
        });
        me.callParent( arguments );
    } 
});