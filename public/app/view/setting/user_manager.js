
valid_script = true;  
var page = id_panel ;
console.log(iconCls);
var main_content = {
    id: id_panel,
    title: title,
    closable: true,
    iconCls: iconCls,
    layout :'border',
    // items: [grid_request_e_faktur_m],
    listeners:{
        destroy:function(){
        // frmEFakturRequestShow = Ext.getCmp('frmEFakturRequestShow'+page);
        // if (frmEFakturRequestShow)
        //     frmEFakturRequestShow.destroy(); 
        }
    }
};

