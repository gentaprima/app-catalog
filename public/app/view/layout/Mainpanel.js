var tokenDelimiter = ':';
function onTabChange(tabPanel, tab) {
    var tabs = [],
        ownerCt = tabPanel.ownerCt, 
        oldToken, newToken;

    tabs.push(tab.id);
    tabs.push(tabPanel.id);

    while (ownerCt && ownerCt.is('tabpanel')) {
        tabs.push(ownerCt.id);
        ownerCt = ownerCt.ownerCt;
    }
    
    newToken = tabs.reverse().join(tokenDelimiter);
    
    oldToken = Ext.History.getToken();
   
    if (oldToken === null || oldToken.search(newToken) === -1) {
        Ext.History.add(newToken);
    }
}

// Handle this change event in order to restore the UI to the appropriate history state
function onAfterRender() {
    Ext.History.on('change', function(token) {
        var parts, length, i;
        
        if (token) {
            parts = token.split(tokenDelimiter);
            length = parts.length;
            
            // setActiveTab in all nested tabs
            for (i = 0; i < length - 1; i++) {
                Ext.getCmp(parts[i]).setActiveTab(Ext.getCmp(parts[i + 1]));
            }
        }
    });
    
    // This is the initial default state.  Necessary if you navigate starting from the
    // page without any existing history token params and go back to the start state.
    // var activeTab1 = Ext.getCmp('mainpanel').getActiveTab(),
    
        // activeTab2 = activeTab1.getActiveTab();
        
    // onTabChange(activeTab1, activeTab2);
}
/**
 * Main content region for application Tabs Layout
 */
Ext.define('APP.view.layout.Mainpanel', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.layout.mainpanel',
    region: 'center',
    layout: 'border',
    id:'mainpanel',
    initComponent: function(){
        var me = this;
        Ext.applyIf(me,{
            items   :[
                {
                    xtype: 'layout.landing'
                }
            ],
            listeners:{
                tabchange: onTabChange,
                afterrender: onAfterRender 
            }
        });
        me.callParent( arguments );
    } 
});