var statUser = new Ext.Toolbar.TextItem((realname=='')?'No User Login':realname);

function menuAdmin(pageid,title,iconCls){
    var id_panel = pageid +'-panel';
    var tabPanel = Ext.getCmp('mainpanel');
    var items = tabPanel.items.items;
    var exist = false;
    
    for(var i = 0; i < items.length; i++)
    {
        if(items[i].id == id_panel){
            tabPanel.setActiveTab(id_panel);
            exist = true;
        }
    }
    if(!exist){
        Ext.getCmp('mainpanel').body.mask('Loading Menu '+ title +' ....','x-mask-loading');
        Ext.Ajax.request({
            url : base_url+'handler-admin',
            params: {
                // path : rec.data.path,
                page : pageid,
                // menuid : 
            },
            success : function(response){
                Ext.getCmp('mainpanel').body.unmask(); 
                data = response.responseText;
                eval(data); 
                // console.log(valid_script);
                if (valid_script){      
                    Ext.getCmp('mainpanel').add(main_content);
                    tabPanel.setActiveTab(id_panel); 
                } else {
                    Ext.MessageBox.show({
                        title: 'Alert',
                        msg: 'Maaf modul '+ title +' tidak ditemukan',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.ERROR
                    });
                }
            },
            renderer: function (val, metadata, record) {
                metadata.style = 'cursor: pointer;'; 
                return val;
            }
        });
    }  
}

/*function createYourWindow(paramWinId){
  var yourWindow = someExtGetElement(paramWindowId) ;
      if ( !yourWindow ){
        // create your window here
        yourWindow = new Ext.Window ...
      }
      yourWindow.show()
}*/

function OpenTab(main_content,MainTabId){
    Ext.getCmp('mainpanel').add(main_content);
    var tabPanel = Ext.getCmp('mainpanel');
    tabPanel.setActiveTab(MainTabId); 
}

var actions = {
    'logout' : function(){
        pageAdmin ="";
        Ext.getCmp('stat-bar').setStatus({
            text: 'Logout',
            iconCls: 'x-status-busy'
        });                 
        Ext.Ajax.request({
            url:'logout',
            waitMsg:'Logout',
            params:{
                id:'logout',
                task: "logout"
            },
            success: function(response) {
                res = Ext.decode(response.responseText);
                if(res.success){
                    userid =0; 
                    window.location.reload( true );
                    Ext.fly(statUser.getEl()).update('No User Online');
                    Ext.getCmp('stat-bar').setStatus({
                        text: 'Offline',
                        iconCls: 'x-status-error'
                    });
                } else {
                    Ext.MessageBox.show({
                        title: 'Invalid',
                        msg: 'An Error to Logout User',
                        buttons: Ext.MessageBox.OK,
                        icon: Ext.MessageBox.WARNING
                    });                                     
                
                }
                
            }
        }); 
        // }
    },
    'user-profile': function() {

    },
    'user-group': function() {
        if (userid){
            menuAdmin('user-group','User Group','browse');
        }
    },
    'user-manager': function() {
        if (userid){
            menuAdmin('user-manager','User manager','user');
            // onTabChange();
            // onAfterRender();
        }
        // menuAdmin('user-manager');
    },
    'menu-manager': function(){
        if (userid){  
        // menuAdmin('menu-manager');
            // window.location.href = 'http://localhost:9696/taxis/public/administrator';
            // window.open('administrator', '_blank');
            // window.focus();
        }
    },
    'user-profile': function(){
        // if (userid)
        // menuAdmin('user-profile'); 

    }
};

function doAction(e, t){
    // alert(t.id);
    e.stopEvent();
    actions[t.id]();
}




Ext.define('model_menus',{
    extend  : 'Ext.data.Model',
    fields  : ['rowid','text','ajax','parent_id','iconcls','handler']
});
/**
 * West (sidebar) region for use within application
 */
Ext.define('APP.view.layout.Navigation', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.layout.navigation',
    region: 'west',
    title: 'Navigation',
    split:true,
    minWidth: 225,
    maxWidth: 250,
    collapsible:true,
    flex:1,
    layout: {
        type:'vbox',
        padding: 0,
        align:'stretch'
    },
    initComponent: function(){
        var me = this;
        var storeTreeSetting = Ext.create('Ext.data.TreeStore', {
            root: {
                expanded: true,
                children: [
                    { text: 'User Profile', leaf: true ,iconCls:'config',handler:'app/view/setting/user_profile.js',id:'Setting1'},
/*                     { text: 'Administrator',iconCls:'config',handler:'',id:'Setting2', expanded: true, children: [
                        { text: 'Setting Menu', leaf: true ,iconCls:'config',handler:'app/view/setting/setting_menu.js',id:'Setting3'},
                        { text: 'Setting Company', leaf: true,iconCls:'config',handler:'app/view/setting/setting_company.js', id:'Setting4'},
                        { text: 'Setting Group / User', leaf: true,iconCls:'config',handler:'app/view/setting/setting_user_group.js', id:'Setting5'},
             //           { text: 'Setting User', leaf: true,iconCls:'config',handler:'app/view/setting/setting_user.js', id:'Setting6'}
                    ] },
 */                    // { text: 'buy lottery tickets', leaf: true, iconCls:'',handler:'',id:'Setting5' }
                ]
            }
        });
        Ext.applyIf(me,{
            items: [
                {
                    region: 'center',
                    stateId: 'navigation-panel',
                    iconCls: 'sitemap_color',
                    id: 'RootMenu',
                    title: 'Menu Navigator',
                    header:false,
                    split: false,
                    width: 200,
                    minWidth: 175,
                    maxWidth: 400,
                    collapsible: false,
                    animCollapse: false,
                    // margins: '0 0 0 5',
                    border:false,
                    layout: 'accordion',
                    flex:3

                },
/*                 {
                    xtype : 'panel',
                    id: 'action-panel',
                    title: 'Setting',
                    region: 'south',
                    iconCls:'setting',
                    split       : true,
                    frame: false,
                    plain:false,
                    border:false,
                    collapsible:true,
                    flex:1.5,
                    autoScroll: true,
                    items : [
                        Ext.create('Ext.tree.Panel', {
                            ideCollapseTool : false,
                            animCollapse    : true,
                            animate         : true,
                            autoScroll      : true,
                            lines           : true,
                            border          : false,
                            iconCls         :'setting',
                            singleExpand    : true,
                            rootVisible     : false,
                            useArrows       : true,
                            header          :false,
                            // nodeType        :'node',
                            idchanged     : false,
                            append        : true,
                            store: storeTreeSetting,
                            listeners:{
                                itemclick   : function(view,rec)
                                {

                                    var n = rec ;
                                    var leaf = rec.get('leaf');
                                    var pageid = rec.get('id');
                                    var page = rec.get('id');
                                    var title = rec.get('text');
                                    var iconCls = rec.get('iconCls');
                                    var handler = rec.get('handler');
                                    var winId = 'Window'+pageid;
                                    var MainTabId = 'MainTabId'+pageid;
                                    console.log(rec);
                                    // Ext.getCmp('mainpanel').body.mask('Loading Menu '+ title +' ....','x-mask-loading');

                                    if(leaf && handler !== "") {
                                        var tabPanel = Ext.getCmp('mainpanel');
                                        var items = tabPanel.items.items;
                                        var exist = false;

                                        for (var i = 0; i < items.length; i++) {
                                            if (items[i].id == MainTabId) {
                                                tabPanel.setActiveTab(MainTabId);
                                                exist = true;
                                            }
                                        }
                                        if (!exist) {
                                            Ext.getCmp('mainpanel').body.mask('Loading Menu ' + title + ' ....', 'x-mask-loading');
                                            Ext.Ajax.request({
                                                url : base_url+handler,
                                                method: 'GET',
                                                params: {
                                                    // path : rec.data.path,
                                                    // page : pageid,
                                                    // menuid :
                                                },
                                                success : function(response){
                                                    // var MainTabId = 'MainTabId'+pageid;
                                                    var tabPanel = Ext.getCmp('mainpanel');
                                                    var items = tabPanel.items.items;
                                                    var exist = false;

                                                    for(var i = 0; i < items.length; i++)
                                                    {
                                                        if(items[i].id == MainTabId){
                                                            tabPanel.setActiveTab(MainTabId);
                                                            exist = true;
                                                        }
                                                    }
                                                    if(leaf){
                                                        if(!exist){
                                                            Ext.getCmp('mainpanel').body.unmask();
                                                            data = response.responseText;
                                                            eval(data);
                                                            // console.log(valid_script);
                                                            if (valid_script){
                                                                // Ext.getCmp('mainpanel').add(main_content);
                                                                // tabPanel.setActiveTab(id_panel);
                                                            } else {
                                                                Ext.MessageBox.show({
                                                                    title: 'Alert',
                                                                    msg: 'Sorry Modules '+ message +' Not Found',
                                                                    buttons: Ext.MessageBox.OK,
                                                                    icon: Ext.MessageBox.ERROR
                                                                });
                                                            }
                                                        }else{
                                                            Ext.getCmp('mainpanel').body.unmask();
                                                        }
                                                    }
                                                },
                                                failure:function(response,success){
                                                    var jsonResp = Ext.JSON.decode(response.responseText);
                                                    Ext.getCmp('mainpanel').body.unmask();
                                                    Ext.MessageBox.show({
                                                        title: 'Error',
                                                        msg : response.status+" Page "+response.statusText+' \r\n\r\n\r\n'+jsonResp.exception,
                                                        buttons: Ext.MessageBox.OK,
                                                        icon: Ext.MessageBox.ERROR
                                                    });
                                                },
                                                renderer: function (val, metadata, record) {
                                                    metadata.style = 'cursor: pointer;';
                                                    return val;
                                                }
                                            });
                                        }
                                    }
                                }
                            }
                        })
                    ]
                } */
            ]
        });

        function OpenTab(main_content,MainTabId){
            Ext.getCmp('mainpanel').add(main_content);
            var tabPanel = Ext.getCmp('mainpanel');
            tabPanel.setActiveTab(MainTabId);
        }


        var storeAccordion = Ext.create('Ext.data.JsonStore',{
            model   : 'model_menus',
            storeId : 'storeAccordion',
            proxy   : {
                type: 'ajax',
                url: '/RootMenu',
                reader: {
                    type: 'json',
                    root: 'data',
                    // noCache: false
                }
            }
        });
        storeAccordion.load(function(records){
            // console.log(records);
            var itemAccordions = [];
            
            Ext.each(records, function(record){
                window['StoreMenu'+record.data.id] = Ext.create('Ext.data.TreeStore',{
                    model   : 'model_menus',
                    proxy: {
                        type: 'ajax',
                        url: '/TreeMenu?parent_id='+record.data.id,
                        reader: {
                            type: 'json',
                            root: 'data',
                            // noCache: false
                        },

                    },
                    root: {
                        expanded: true,
                        children: []
                    },

                    listeners: {
                        beforeload: function (store, operation, eOpts) {
                            // console.log(operation);
                            var rowid = operation.node.get("rowid");
                            // console.log(rowid);
                            if (typeof(rowid) != "undefined"){
                                // operation.config.node.id = rowid;
                                // console.log(operation.config.node);
                            }

                        }
                    }
                    // expanded: false,
                    // folderSort: false,

                });

                // console.log(window['StoreMenu'+record.data.id]);

                window['treemenu'+record.data.id] = Ext.create('Ext.tree.Panel', {
                    id              : 'tree'+record.data.id,
                    ideCollapseTool : false,
                    animCollapse    : true,
                    animate         : true,
                    autoScroll      : true,
                    lines           : true,
                    border          : false,
                    iconCls         :'mymenu',
                    singleExpand    : true,
                    store           : window['StoreMenu'+record.data.id],
                    rootVisible     : false,
                    useArrows       : true,
                    header          :false,
                    // nodeType        :'node',
                    idchanged     : false,
                    append        : true,
                    /*items : [
                        {
                            xtype: 'treecolumn',
                            dataIndex: 'text'
                        }],*/
                    listeners   : {
                        load: function(){
                            // treePanel.body.musk();
                            tchange = true;
                            // refreshMessage();
                        },
                        beforeitemcontextmenu: function(view, record, item, index, e)
                        {
                            /*datarecord = record.data;
                            e.stopEvent();
                            kanan_menu.showAt(e.getXY());*/
                        },
                        itemclick   : function(view,rec)
                        {

                            var n = rec ;
                            var leaf = rec.get('leaf');
                            var pageid = rec.get('id');
                            var page = rec.get('id');
                            var title = rec.get('text');
                            var iconCls = rec.get('iconCls');
                            var handler = rec.get('handler');
                            var winId = 'Window'+pageid;
                            var MainTabId = 'MainTabId'+pageid;
                            // console.log(leaf);
                            // console.log(handler);
                            // Ext.getCmp('mainpanel').body.mask('Loading Menu '+ title +' ....','x-mask-loading');

                            if(leaf && handler !== "") {

                                var tabPanel = Ext.getCmp('mainpanel');
                                var items = tabPanel.items.items;
                                var exist = false;

                                for (var i = 0; i < items.length; i++) {
                                    if (items[i].id == MainTabId) {
                                        tabPanel.setActiveTab(MainTabId);
                                        exist = true;
                                    }
                                }
                                if (!exist) {
                                    window['model_role_event_'+page] = Ext.define('model_role_event', {
                                        extend: 'Ext.data.Model',
                                    });
                                    window['store_role_'+page] = Ext.create('Ext.data.Store', {
                                        id: 'storeId_role_'+page,
                                        model: window['model_role_event_'+page],
                                        proxy: {
                                            type: 'ajax',
                                            url: '/getRoleEvent',
                                            method: 'GET',
                                            reader: {
                                                type: 'json',
                                                successProperty: 'success',
                                                root: 'data',
                                                messageProperty: 'message'
                                            }
                                        },
                                        sorters: [
                                            {
                                                property : 'menu_id',
                                                direction: 'ASC'
                                            }
                                        ],
                                        listeners: {
                                            'beforeload': function(store) {
                                                // store.proxy.extraParams.cb_groupclass = '';
                                            }
                                        }
                                    });
                                    window['store_role_'+page].reload({
                                        params:{
                                            start:0,
                                            limit:300,
                                            menu_id:page
                                        },
                                        callback : function(records, operation, success) {
                                            if(success){
                                                var record = records[0];
                                                if(window['store_role_'+page].getCount() > 0){
                                                    window['store_role_'+page].each(function(rec) {
                                                        // console.log(rec.data);
                                                        var ROLE = rec.data;
                                                        Ext.getCmp('mainpanel').body.mask('Loading Menu ' + title + ' ....', 'x-mask-loading');
                                                        Ext.Ajax.request({
                                                            url : base_url+handler,
                                                            method: 'GET',
                                                            params: {
                                                                // path : rec.data.path,
                                                                // page : pageid,
                                                                // menuid :
                                                            },
                                                            success : function(response){
                                                                // var MainTabId = 'MainTabId'+pageid;
                                                                var tabPanel = Ext.getCmp('mainpanel');
                                                                var items = tabPanel.items.items;
                                                                var exist = false;

                                                                for(var i = 0; i < items.length; i++)
                                                                {
                                                                    if(items[i].id == MainTabId){
                                                                        tabPanel.setActiveTab(MainTabId);
                                                                        exist = true;
                                                                    }
                                                                }
                                                                if(leaf){
                                                                    if(!exist){
                                                                        // Ext.getCmp('mainpanel').body.unmask();
                                                                        data = response.responseText;
                                                                        eval(data);
                                                                        // console.log(valid_script);
                                                                        if (valid_script){
                                                                            // Ext.getCmp('mainpanel').add(main_content);
                                                                            // tabPanel.setActiveTab(id_panel);
                                                                        } else {
                                                                            Ext.MessageBox.show({
                                                                                title: 'Alert',
                                                                                msg: 'Sorry Modules '+ message +' Not Found',
                                                                                buttons: Ext.MessageBox.OK,
                                                                                icon: Ext.MessageBox.ERROR
                                                                            });
                                                                        }
                                                                    }else{
                                                                        Ext.getCmp('mainpanel').body.unmask();
                                                                    }
                                                                }
                                                            },
                                                            failure:function(response,success){
                                                                var jsonResp = Ext.JSON.decode(response.responseText);
                                                                Ext.getCmp('mainpanel').body.unmask();
                                                                Ext.MessageBox.show({
                                                                    title: 'Error',
                                                                    msg : response.status+" Page "+response.statusText+' \r\n\r\n\r\n'+jsonResp.exception,
                                                                    buttons: Ext.MessageBox.OK,
                                                                    icon: Ext.MessageBox.ERROR
                                                                });
                                                            },
                                                            renderer: function (val, metadata, record) {
                                                                metadata.style = 'cursor: pointer;';
                                                                return val;
                                                            }
                                                        });
                                                    })
                                                }else{
                                                    ROLE = Ext.decode('{}');
                                                    Ext.getCmp('mainpanel').body.mask('Loading Menu ' + title + ' ....', 'x-mask-loading');
                                                    Ext.Ajax.request({
                                                        url : base_url+handler,
                                                        method: 'GET',
                                                        params: {
                                                            // path : rec.data.path,
                                                            // page : pageid,
                                                            // menuid :
                                                        },
                                                        success : function(response){
                                                            // var MainTabId = 'MainTabId'+pageid;
                                                            var tabPanel = Ext.getCmp('mainpanel');
                                                            var items = tabPanel.items.items;
                                                            var exist = false;

                                                            for(var i = 0; i < items.length; i++)
                                                            {
                                                                if(items[i].id == MainTabId){
                                                                    tabPanel.setActiveTab(MainTabId);
                                                                    exist = true;
                                                                }
                                                            }
                                                            if(leaf){
                                                                if(!exist){
                                                                    // Ext.getCmp('mainpanel').body.unmask();
                                                                    data = response.responseText;
                                                                    eval(data);
                                                                    // console.log(valid_script);
                                                                    if (valid_script){
                                                                        // Ext.getCmp('mainpanel').add(main_content);
                                                                        // tabPanel.setActiveTab(id_panel);
                                                                    } else {
                                                                        Ext.MessageBox.show({
                                                                            title: 'Alert',
                                                                            msg: 'Sorry Modules '+ message +' Not Found',
                                                                            buttons: Ext.MessageBox.OK,
                                                                            icon: Ext.MessageBox.ERROR
                                                                        });
                                                                    }
                                                                }else{
                                                                    Ext.getCmp('mainpanel').body.unmask();
                                                                }
                                                            }
                                                        },
                                                        failure:function(response,success){
                                                            var jsonResp = Ext.JSON.decode(response.responseText);
                                                            Ext.getCmp('mainpanel').body.unmask();
                                                            Ext.MessageBox.show({
                                                                title: 'Error',
                                                                msg : response.status+" Page "+response.statusText+' \r\n\r\n\r\n'+jsonResp.exception,
                                                                buttons: Ext.MessageBox.OK,
                                                                icon: Ext.MessageBox.ERROR
                                                            });
                                                        },
                                                        renderer: function (val, metadata, record) {
                                                            metadata.style = 'cursor: pointer;';
                                                            return val;
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                    });

                                }
                            }
                        }
                    }

                });

                itemAccordions.push({
                    title   : record.data.text,
                    iconCls : record.data.iconCls,
                    xtype   : 'panel',
                    id      : "accordion-"+record.data.id,
                    autoScroll      : true,
                    items   : [{
                        xtype   : 'panel',
                        id      : 'treeMenu'+record.data.id,
                        //bodyPadding   : 5,
                        border  : false,

                        items   : window['treemenu'+record.data.id]
                    }]
                });

            });

            Ext.getCmp("RootMenu").add(itemAccordions);
                // Ext.getCmp("accordionMenu").insert(itemAccordions);
        });
        me.callParent( arguments );
    } 
});

