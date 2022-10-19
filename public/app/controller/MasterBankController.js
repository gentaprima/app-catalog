//////////////////////////////////////////
// MasterBankController Untuk All View //
//////////////////////////////////////////
Ext.define('APP.controller.MasterBankController', {
    extend: 'Ext.app.Controller', 
    init: function() {
        this.control({
            'window button[handler=AddMasterBank]' : {
                click : this.handleAddMasterBank
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
    handleAddMasterBank: function(btn) {
        var store_master_bank = Ext.getStore('StoreMasterBank');
        store_master_bank.suspendAutoSync();
        
        var grid_master_bank = Ext.getCmp('GridMasterBank'+btn.pageid);
        rec = new APP.model.MasterBank({
            description: '',
        });
        store_master_bank.insert(0, rec);
        grid_master_bank.findPlugin('cellediting').startEdit(rec, 0);

        store_master_bank.resumeAutoSync();
    },
});