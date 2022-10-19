//////////////////////////////////////////
// MasterLokasiController Untuk All View //
//////////////////////////////////////////
Ext.define('APP.controller.MasterLokasiController', {
    extend: 'Ext.app.Controller', 
    init: function() {
        this.control({
            'window button[handler=AddMasterLokasi]' : {
                click : this.handleAddMasterLokasi
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
    handleAddMasterLokasi: function(btn) {
        var store_master_lokasi = Ext.getStore('StoreMasterLokasi');
        store_master_lokasi.suspendAutoSync();
        
        var grid_master_lokasi = Ext.getCmp('GridMasterLokasi'+btn.pageid);
        rec = new APP.model.MasterLokasi({
            description: '',
        });
        store_master_lokasi.insert(0, rec);
        grid_master_lokasi.findPlugin('cellediting').startEdit(rec, 0);

        store_master_lokasi.resumeAutoSync();
    },
});