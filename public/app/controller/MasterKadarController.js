//////////////////////////////////////////
// MasterKadarController Untuk All View //
//////////////////////////////////////////
Ext.define('APP.controller.MasterKadarController', {
    extend: 'Ext.app.Controller', 
    init: function() {
        this.control({
            'window button[handler=AddMasterKadar]' : {
                click : this.handleAddMasterKadar
            },
            /*'window actioncolumn[handler=onRemoveClick]' : {
                itemClick : this.handleRemoveMasterKadar
            },*/
            // 'actioncolumn': {
            //      itemClick: this.onActionColumnItemClick
            //  }
        });
    },
    /**/
    handleAddMasterKadar: function(btn) {
        /*Ext.override(Ext.grid.RowNumberer, {

            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                console.log(store.indexOf(record) + 1);
                var rowspan = this.rowspan;
                if (rowspan){
                    metaData.tdAttr = 'rowspan="' + rowspan + '"';
                }

                metaData.tdCls = Ext.baseCSSPrefix + 'grid-cell-special';
                
                // console.log(store.indexOfTotal(record));
                // console.log(store.getTotalCount());
                // console.log(store.data.items.length);
                // console.log(record);
                // console.log('**');
                
                //return store.indexOfTotal(record) + 1;
                return store.indexOf(record) + 1;
            }
        });*/
        var model_master_kadar = Ext.define('model_master_kadar', {
            extend: 'Ext.data.Model',
            fields: [
                {name: 'rownumberer', type: 'integer'},
                {name: 'description', type: 'string'},
            ]
        });
        var store_master_kadar = Ext.getStore('StoreMasterKadar');
        store_master_kadar.suspendAutoSync();
        
        var grid_master_kadar = Ext.getCmp('GridMasterKadar'+btn.pageid);
        /*rec = new APP.model.MasterKadar({
            description: '',
        });
        store_master_kadar.insert(0, rec);*/
        

        /*var index = store_master_kadar.getCount();
        var record = Ext.create('model_master_kadar', {
            // norder : parseInt(index) + 1 ,
            xtype: 'rownumberer' ,
            description :'new name' ,
        });
        store_master_kadar.insert(0, record);*/

        // grid_master_kadar.findPlugin('cellediting').startEdit(record, 0);

        myrec = { 'description': 'new name'};
        store_master_kadar.insert(0,myrec);
        // console.log('-----------------------');
        // console.log(store.data.items.length);

        store_master_kadar.resumeAutoSync();
    },
});