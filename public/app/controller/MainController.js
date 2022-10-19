Ext.define('MyErp.controller.MainController', {
    extend: 'Ext.app.Controller',

    alias: 'controller.main',
    requires: [
        // 'MyErp.view.singleview.FormSingleview'
        // 'MyErp.view.singleview.FormSingleview'
    ],
    init: function() {
        var me = this;
        me.listen({
            component: {
                'dataview[name=MenuItems]': {
                    itemclick: me.changeCard
                },
                'button[navTo=menuCard]': {
                    click: me.changeCard
                }
            },
            controller: {

            },
            store: {

            }
        });
    },

    changeCard: function(tile) {
        // var newCard = tile.navTo || tile.selection.data.navTo;
        var title = tile.selection.data.title;
        var idPanel = 'center_content_tab' + tile.selection.data.id;
        var icon = tile.selection.data.iconcls;
        var pageid = tile.selection.data.id ;



        var tabPanel = Ext.getCmp('center_content');
        var items = tabPanel.items.items;
        var exist = false;

        for (var i = 0; i < items.length; i++) {
            if (items[i].id == idPanel) {
                tabPanel.setActiveTab(idPanel);
                exist = true;
            }
        }
        // console.log(icon);

        if (!exist) {
            Ext.getCmp('center_content').body.mask('Loading Modul '+ title +' ....','x-mask-loading');
            Ext.Ajax.request({
                url: 'handler-layout.php',
                method: 'GET',
                params: {
                    page : pageid
                },
                success: function(response) {
                    Ext.getCmp('center_content').body.unmask(); 
                    var main_content = idPanel;
                    valid_script = false;
                    var page = idPanel;
                    data = response.responseText;
                    eval(data);
                    if (valid_script) {
                        main_panel.add(main_content);
                        main_panel.setActiveTab(idPanel);
                        //Ext.example.msg('Main Menu', title);
                    } else {
                        Ext.MessageBox.show({
                            title: 'Alert',
                            msg: 'Sorry, No Content Avaible for ' + title + ' menu',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                },
                renderer: function(val, metadata, record) {
                    metadata.style = 'cursor: pointer;';
                    return val;
                }
            });
            
        }
        // console.log(tile.selection.data.menuid);
        /*var newCard = tile.navTo || tile.selection.data.navTo;
        tile.up('maindeck').getLayout().setActiveItem(newCard);*/
    }
});