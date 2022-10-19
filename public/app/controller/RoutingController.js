Ext.define('MyErp.controller.RoutingController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.routing',
    refs: [
        {ref: 'maindeck', selector: 'maindeck'}
    ],

    routes: {
        'Page/:tab' : 'navToTab'
    },

    init: function () {
        var me = this;
        me.listen({
            component: {
                'tab': {
                    click: 'updateRoute'
                }
            },
            controller: {
                '*': {
                    unmatchedroute: 'showRouteError'
                }
            },
            store: {

            }
        });
    },

    navToTab: function (newTab) {
        var me = this;
        // var main = me.getMaindeck();
        // var routingCard = main.lookupReference('routingcard');
        // var tabPanel = routingCard.down('tabpanel');
        // main.getLayout().setActiveItem('routingCard');
        if (newTab == "Other") {
            // tabPanel.setActiveTab('Other');
        }
        else if (newTab == "Home"){
            // tabPanel.setActiveTab('Home');
        }
        else {
            // me.showRouteError(newTab);
        }
    },

    showRouteError: function (unmatchedroute) {
        //Avoids displaying the error when the route is null using browser navigation
        if (unmatchedroute) {
            Ext.Msg.alert('Page not found', 'Sorry, try "#Page/Home" or "#Page/Other".');
        }
    },

    updateRoute: function (tab) {
        this.redirectTo('Page/' + tab.card.itemId, true);
    }
});
