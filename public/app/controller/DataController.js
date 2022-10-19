Ext.define('MyErp.controller.DataController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.data',
    config: {
        refs: [
            { ref: 'maindeck', selector: 'maindeck' }
        ]
    },
    init: function () {
        var me = this;
        me.listen({
            component: {
                'datatoolbar button[toggleGroup=displayOption]': {
                    click: me.switchDataView
                }
            },
            controller: {

            },
            store: {

            }
        });
    },

    switchDataView: function (button) {
        var cardLayout = button.up('datacard').down('panel[name=toggleCard]').getLayout();
        var newCard = "template";
        if(cardLayout.getActiveItem().itemId == "template") {
            newCard = "grid";
        }
        cardLayout.setActiveItem(newCard);
    }
});
