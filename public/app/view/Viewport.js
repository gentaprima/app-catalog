var loadingDiv;
    loadingDiv = Ext.getDom('loadingSplash');
    loadingDiv.style.display = 'none';
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
/* var keepaliveHandler = new Ext.util.DelayedTask(function(){
    Ext.Ajax.request({
        url : '/keepalive',
        method : 'GET',
        success: function(response, options){
//dummy server call each 60 seconds
            keepaliveHandler.delay(60000);
        }
    });
});
var timeoutHandler = new Ext.util.DelayedTask(function(){
//invalidate session
    Ext.Ajax.request({
        url : '/logout',
        method : 'GET',
        success: function(response, options){
            Ext.MessageBox.show({
                title: MessagesMap.getMessage('session.closed'),
                msg: MessagesMap.getMessage('session.closed.message'),
                buttons: Ext.MessageBox.OK,
                fn: function() {
                    window.location.pathname = '/';                 
                },
                icon: Ext.MessageBox.WARNING
            });
        }
    });
});
 */
/*function idleTimer() {
    var t;
    //window.onload = resetTimer;
    window.onmousemove = resetTimer; // catches mouse movements
    window.onmousedown = resetTimer; // catches mouse movements
    window.onclick = resetTimer;     // catches mouse clicks
    window.onscroll = resetTimer;    // catches scrolling
    window.onkeypress = resetTimer;  //catches keyboard actions

    function logout() {
        window.location.href = '/logout';  //Adapt to actual logout script
    }

   function reload() {
          // window.location = self.location.href;  //Reloads the current page
   }

   function resetTimer() {
        clearTimeout(t);
        t = setTimeout(logout, 18000);  // time is in milliseconds (1000 is 1 second)
        t= setTimeout(reload, 3000);  // time is in milliseconds (1000 is 1 second)
    }
}*/
// idleTimer();

function idleLogout() {
    var t;
    window.onload = resetTimer;
    window.onmousemove = resetTimer;
    window.onmousedown = resetTimer; // catches touchscreen presses
    window.onclick = resetTimer;     // catches touchpad clicks
    window.onscroll = resetTimer;    // catches scrolling with arrow keys
    window.onkeypress = resetTimer;

    function logout() {	  
       window.location.href = '/logout';  //Adapt to actual logout script
	   
/* 		Ext.MessageBox.show({
			title: 'Session Closed',
			msg: 'Your session closed after 20 minutes inactive',
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.WARNING,
			fn: function() {
				window.location.pathname = '/logout';                 
			},			
		});       
		 */
/*     Ext.Ajax.request({
        url : '/logout',
        method : 'GET',
        success: function(response, options){
            Ext.MessageBox.show({
				title: 'Session Closed',
				msg: 'Your session closed after 20 minutes inactive',
                buttons: Ext.MessageBox.OK,
                fn: function() {
                    window.location.pathname = '/';                 
                },
                icon: Ext.MessageBox.WARNING
            });
        }
    }); */
		
    }

    function resetTimer() {
      if(isEmpty(username) == false){
        // console.log(username);
              
        // keepaliveHandler
        clearTimeout(t);
        t = setTimeout(logout, 1000 * 60 * 20);  // time is in milliseconds
      }else{
            
      }
        
    }
}

idleLogout();
// 
// console.log(Ext.ux);
/*if(Ext.ux.SystemProperties.isLogged) {
    keepaliveHandler.delay(60000);
    timeoutHandler.delay(Ext.ux.SystemProperties.timeout);
//check for mouse movements
    document.body.onmousemove = function(e) {
        timeoutHandler.delay(Ext.ux.SystemProperties.timeout);
    };  
}*/
/**
 * Main application Viewport
 * Uses a {@link Ext.layout.container.Border} layout for ccontent organization
 */
Ext.define('APP.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Border',
        'APP.view.layout.Header',
        'APP.view.layout.Navigation',
        'APP.view.layout.Mainpanel',
        // 'APP.view.layout.Footer'
    ],
    layout: {
        type: 'border'
    },
    items: [
        { xtype: 'layout.header' },
        { xtype: 'layout.navigation' },
        { xtype: 'layout.mainpanel' },
        {
            xtype:'panel',
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
                   text        : 'SAK - Sietem Aplikasi Katalog &copy; Copyright 2018',
                   disabled    : true,
                   style       :'color:blue'
               },
               '-',
               {
                    id : 'developed', 
                   text        : 'Developed By :',
                   disabled    : true,
                   style       :'color:blue'
               },
               {
                   id : 'company',  
                   text        : 'Itek Solusi Informasi',
                   disabled    : true,
                   style       :'color:blue'
               },
               
            ],
            
        }
        // { xtype: 'layout.footer' }
    ]
});