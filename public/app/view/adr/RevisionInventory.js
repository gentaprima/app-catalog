valid_script = true;
ROLE = Ext.decode('{"ProcApp":true,"StdApp":true,"RemoveRequestRevision":true,"AddRequestRevision":true,"Plant":true,"RemoveCrossReferences":true,"RemoveFuncLoctaion":true,"StockClass":true,"StockType":true,"UOM":true,"Category":true,"MaterialType":true,"ViewNotes":true,"ApplyChangeInventory":true,"Cataloguer":true,"AddCrossReferences":true,"MovingType":true,"MaxStock":true,"RemoveMaterial":false,"AddMaterial":false,"AddRequestDeletion":true,"AppRequestDeletion":false,"AddAdditionSubmit":true,"AddFuncLocation":true,"ApproveRevisionReq":false,"INC":true,"MGC":true,"ApprovalRevision":false,"InvButtonCatalogNoHis":false}');
// HEAD FILE
// alert(pageid);
Ext.define('ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ViewMasterBankController',

    onAddClick: function(pageid) {
        Ext.Msg.alert('Add', 'The Add button was clicked'+pageid);
    },
    clickHandler: function(item, e, args)
    {

    },
    onRemoveClick: function (view, recIndex, cellIndex, item, e, record) {
        record.drop();
    },

});

Ext.application({
    name: 'APP',
    controllers: [
        'MasterBankController'
    ],
    stores:[
        // 'StoreMasterTemplate'
    ],
    requires: [
        // 'Ext.selection.CellModel'
        // 'Ext.util.Point',
        // 'Ext.util.History',
        // 'APP.domain.Proxy'
    ],
    launch: function(){
        var page = pageid;

        ///////////////////////////////
        // Store Material Catalog M //
        //////////////////////////////
        var model_inventoryl_catalog_m = Ext.define('model_inventoryl_catalog_m', {
            extend: 'Ext.data.Model',
        });
        var store_catalog_m = Ext.create('Ext.data.Store', {
            storeId: 'funloc_Store',
            model: model_inventoryl_catalog_m,
            proxy: {
                type: 'ajax',
                url: '/getCatalogM',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message'
                }
            },
            listeners: {

            }
        });
        var filters = [];
        var catalog_no = new Ext.util.Filter({
            operator: 'eq',
            value:  "0",
            property: "catalog_no",
            type: "string",
        });

        function validate(val){
            if(val == true){
                return false;
            }else{
                return true ;
            }
        }
        //////////////////
        // MRP Workflow //
        //////////////////
        function MRPWorkFlow(){
            // Ext.getCmp('InventoryRibbonUser'+page).addCls('RibbonRed');
            // Ext.getCmp('InventoryRibbonIC'+page).addCls('RibbonRed');
            // Ext.getCmp('InventoryRibbonAPPR1'+page).addCls('RibbonRed');
            // Ext.getCmp('InventoryRibbonAPPR2'+page).addCls('RibbonRed');
            // Ext.getCmp('InventoryRibbonAPPR3'+page).addCls('RibbonRed');
            // Ext.getCmp('InventoryRibbonAPPR4'+page).addCls('RibbonRed');
            // Ext.getCmp('InventoryRibbonAPPR5'+page).addCls('RibbonRed');
            Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonGrey');
            Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonYellow');
            Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonGreen');
            Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonRed');
            Ext.getCmp('InventoryRibbonUser'+page).addCls('RibbonGrey');

            Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonGrey');
            Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonYellow');
            Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonGreen');
            Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonRed');
            Ext.getCmp('InventoryRibbonIC'+page).addCls('RibbonGrey');

            Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonGrey');
            Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonYellow');
            Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonGreen');
            Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonRed');
            Ext.getCmp('InventoryRibbonAPPR1'+page).addCls('RibbonGrey');

            Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonGrey');
            Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonYellow');
            Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonGreen');
            Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonRed');
            Ext.getCmp('InventoryRibbonAPPR2'+page).addCls('RibbonGrey');

            Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonGrey');
            Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonYellow');
            Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonGreen');
            Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonRed');
            Ext.getCmp('InventoryRibbonAPPR3'+page).addCls('RibbonGrey');

            Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonGrey');
            Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonYellow');
            Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonGreen');
            Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonRed');
            Ext.getCmp('InventoryRibbonAPPR4'+page).addCls('RibbonGrey');

            Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonGrey');
            Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonYellow');
            Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonGreen');
            Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonRed');
            Ext.getCmp('InventoryRibbonAPPR5'+page).addCls('RibbonGrey');

            if(store_inventory_plant.getCount() > 0){

                var record = store_inventory_plant.getData().items[0];
                if(record.data.status_user == 1){

                    Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonGrey');
                    Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonYellow');
                    Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonGreen');
                    Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonRed');
                    Ext.getCmp('InventoryRibbonUser'+page).addCls('RibbonGreen');

                    if(record.data.status_ic == 1){


                        Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonGrey');
                        Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonYellow');
                        Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonGreen');
                        Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonRed');
                        Ext.getCmp('InventoryRibbonIC'+page).addCls('RibbonGreen');

                        Ext.getCmp('InventoryRibbonAPPR1'+page).setDisabled(true);
                        Ext.getCmp('InventoryRibbonAPPR2'+page).setDisabled(true);
                        Ext.getCmp('InventoryRibbonAPPR3'+page).setDisabled(true);
                        Ext.getCmp('InventoryRibbonAPPR4'+page).setDisabled(true);
                        Ext.getCmp('InventoryRibbonAPPR5'+page).setDisabled(true);

                        // Ext.getCmp('approver1'+page).setReadOnly(true);
                        // Ext.getCmp('approver2'+page).setReadOnly(true);
                        // Ext.getCmp('approver3'+page).setReadOnly(true);
                        // Ext.getCmp('approver4'+page).setReadOnly(true);
                        // Ext.getCmp('approver5'+page).setReadOnly(true);

                        var safety_stock = Ext.getCmp('safety_stock'+page).getValue();
                        var unit_price = Ext.getCmp('unit_price'+page).getValue();
                        var ttl = parseInt(safety_stock * unit_price) ;

                        if(company_code === record.data.company_code){
                            mrpReadOnly = true ;
                            InventoryApplyChanges = true;
                            inv_controll = true;
                            switch (true) {
                                case (ttl <= 10000000):
                                    Ext.getCmp('InventoryRibbonAPPR1'+page).setDisabled(false);
                                    if(user_level == "Approver 1" ){
                                        switch (true) {
                                            case (record.data.status_app1 == 0):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = false;
                                                inv_controll = true;
                                                approver1 = false ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                            case (record.data.status_app1 == 1):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = true;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                        }

                                    }
                                    break;
                                case (ttl >= 10000001 ) && (ttl <= 50000000):
                                    Ext.getCmp('InventoryRibbonAPPR1'+page).setDisabled(false);
                                    Ext.getCmp('InventoryRibbonAPPR2'+page).setDisabled(false);
                                    if(user_level == "Approver 1"){
                                        switch (true) {
                                            case (record.data.status_ic == 0):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = true;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                            case (record.data.status_app1 == 0):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = false;
                                                inv_controll = true;
                                                approver1 = false ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                            case (record.data.status_app1 == 1):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = true;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                        }
                                    }
                                    if(user_level == "Approver 2"){
                                        switch (true) {
                                            case (record.data.status_ic == 0):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = true;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                            case (record.data.status_app1 == 0):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = true;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                            case (record.data.status_app2 == 1):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = true;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                            case (record.data.status_app2 == 0):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = false;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = false ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                        }
                                    }
                                    if(user_level == "Approver 3"){
                                        switch (true) {
                                            case (record.data.status_ic == 0):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = true;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                            case (record.data.status_app1 == 0):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = true;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                            case (record.data.status_app2 == 0):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = true;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                            case (record.data.status_app3 == 1):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = true;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                            case (record.data.status_app3 == 0):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = false;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = false ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                        }
                                    }
                                    break;
                                case (ttl > 50000000):
                                    Ext.getCmp('InventoryRibbonAPPR1'+page).setDisabled(false);
                                    Ext.getCmp('InventoryRibbonAPPR2'+page).setDisabled(false);
                                    Ext.getCmp('InventoryRibbonAPPR3'+page).setDisabled(false);
                                    if(user_level == "Approver 1"){
                                        switch (true) {
                                            case (record.data.status_ic == 0):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = true;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                            case (record.data.status_app1 == 0):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = false;
                                                inv_controll = true;
                                                approver1 = false ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                            case (record.data.status_app1 == 1):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = true;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;

                                        }
                                    }
                                    if(user_level == "Approver 2"){
                                        switch (true) {
                                            case (record.data.status_ic == 0):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = true;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                            case (record.data.status_app1 == 0):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = true;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                            case (record.data.status_app2 == 1):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = true;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                            case (record.data.status_app2 == 0):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = false;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = false ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                        }
                                    }
                                    if(user_level == "Approver 3"){
                                        switch (true) {
                                            case (record.data.status_ic == 0):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = true;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                            case (record.data.status_app1 == 0):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = true;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                            case (record.data.status_app2 == 0):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = true;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                            case (record.data.status_app3 == 1):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = true;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = true ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                            case (record.data.status_app3 == 0):
                                                mrpReadOnly = true ;
                                                InventoryApplyChanges = false;
                                                inv_controll = true;
                                                approver1 = true ;
                                                approver2 = true ;
                                                approver3 = false ;
                                                approver4 = true ;
                                                approver5 = true ;
                                                break;
                                        }
                                    }
                                    break;
                            }
                        }else{
                            mrpReadOnly = true ;
                            InventoryApplyChanges = true;
                            inv_controll = true;
                            approver1 = true ;
                            approver2 = true ;
                            approver3 = true ;
                            approver4 = true ;
                            approver5 = true ;
                        }

                        if(record.data.status_app1 == 1){

                            Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonGrey');
                            Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonYellow');
                            Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonGreen');
                            Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonRed');
                            Ext.getCmp('InventoryRibbonAPPR1'+page).addCls('RibbonGreen');

                            // InventoryApplyChanges = false;

                            if(record.data.status_app2 == 1){

                                // InventoryApplyChanges = false;

                                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonGrey');
                                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonYellow');
                                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonGreen');
                                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonRed');
                                Ext.getCmp('InventoryRibbonAPPR2'+page).addCls('RibbonGreen');

                                if(record.data.status_app3 == 1){

                                    // InventoryApplyChanges = false;

                                    Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonGrey');
                                    Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonYellow');
                                    Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonGreen');
                                    Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonRed');
                                    Ext.getCmp('InventoryRibbonAPPR3'+page).addCls('RibbonGreen');

                                    if(record.data.status_app4 == 1){

                                        // InventoryApplyChanges = false;

                                        Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonGrey');
                                        Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonYellow');
                                        Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonGreen');
                                        Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonRed');
                                        Ext.getCmp('InventoryRibbonAPPR4'+page).addCls('RibbonGreen');

                                        if(record.data.status_app5 == 1){

                                            // InventoryApplyChanges = false;

                                            Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonGrey');
                                            Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonYellow');
                                            Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonGreen');
                                            Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonRed');
                                            Ext.getCmp('InventoryRibbonAPPR5'+page).addCls('RibbonGreen');

                                        }

                                    }

                                }

                            }
                        }

                    }else{
                        Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonGrey');
                        Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonYellow');
                        Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonGreen');
                        Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonRed');
                        Ext.getCmp('InventoryRibbonUser'+page).addCls('RibbonGreen');

                        Ext.getCmp('InventoryRibbonAPPR1'+page).setDisabled(true);
                        Ext.getCmp('InventoryRibbonAPPR2'+page).setDisabled(true);
                        Ext.getCmp('InventoryRibbonAPPR3'+page).setDisabled(true);
                        Ext.getCmp('InventoryRibbonAPPR4'+page).setDisabled(true);
                        Ext.getCmp('InventoryRibbonAPPR5'+page).setDisabled(true);

                        mrpReadOnly = true ;
                        InventoryApplyChanges = true;
                        if(company_code === record.data.company_code ){
                            if(user_level === "Inv Controller"){
                                mrpReadOnly = false ;
                                InventoryApplyChanges = false;
                                inv_controll = false;
                                approver1 = true ;
                                approver2 = true ;
                                approver3 = true ;
                                approver4 = true ;
                                approver5 = true ;
                                console.log('disini kah');
                            }else{
                                mrpReadOnly = true ;
                                InventoryApplyChanges = true;
                                inv_controll = true;
                                approver1 = true ;
                                approver2 = true ;
                                approver3 = true ;
                                approver4 = true ;
                                approver5 = true ;
                            }
                        }
                        // mrpReadOnly = true ;
                        // InventoryApplyChanges = true;
                        // inv_controll = true;
                        approver1 = true ;
                        approver2 = true ;
                        approver3 = true ;
                        approver4 = true ;
                        approver5 = true ;

                    }
                }else{
                    if(user_level == "User"){
                        mrpReadOnly = false ;
                        InventoryApplyChanges = false;
                        inv_controll = true;
                        approver1 = true ;
                        approver2 = true ;
                        approver3 = true ;
                        approver4 = true ;
                        approver5 = true ;
                    }else{
                        mrpReadOnly = true ;
                        InventoryApplyChanges = true;
                        inv_controll = true;
                        approver1 = true ;
                        approver2 = true ;
                        approver3 = true ;
                        approver4 = true ;
                        approver5 = true ;
                    }

                    Ext.getCmp('InventoryRibbonAPPR1'+page).setDisabled(true);
                    Ext.getCmp('InventoryRibbonAPPR2'+page).setDisabled(true);
                    Ext.getCmp('InventoryRibbonAPPR3'+page).setDisabled(true);
                    Ext.getCmp('InventoryRibbonAPPR4'+page).setDisabled(true);
                    Ext.getCmp('InventoryRibbonAPPR5'+page).setDisabled(true);
                }
            }else{
                Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonUser'+page).addCls('RibbonGrey');

                Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonIC'+page).addCls('RibbonGrey');

                Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonAPPR1'+page).addCls('RibbonGrey');

                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonAPPR2'+page).addCls('RibbonGrey');

                Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonAPPR3'+page).addCls('RibbonGrey');

                Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonAPPR4'+page).addCls('RibbonGrey');

                Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonAPPR5'+page).addCls('RibbonGrey');

                if(user_level == "User"){
                    mrpReadOnly = true ;
                    InventoryApplyChanges = false;
                    inv_controll = true;
                    approver1 = true ;
                    approver2 = true ;
                    approver3 = true ;
                    approver4 = true ;
                    approver5 = true ;
                }else{
                    mrpReadOnly = true ;
                    InventoryApplyChanges = true;
                    inv_controll = true;
                    approver1 = true ;
                    approver2 = true ;
                    approver3 = true ;
                    approver4 = true ;
                    approver5 = true ;
                }

                Ext.getCmp('InventoryRibbonAPPR1'+page).setDisabled(true);
                Ext.getCmp('InventoryRibbonAPPR2'+page).setDisabled(true);
                Ext.getCmp('InventoryRibbonAPPR3'+page).setDisabled(true);
                Ext.getCmp('InventoryRibbonAPPR4'+page).setDisabled(true);
                Ext.getCmp('InventoryRibbonAPPR5'+page).setDisabled(true);


            }

            Ext.getCmp('movingtype'+page).focus();
            Ext.getCmp('movingtype'+page).setReadOnly(mrpReadOnly);

            Ext.getCmp('stocktype'+page).focus();
            Ext.getCmp('stocktype'+page).setReadOnly(mrpReadOnly);

            Ext.getCmp('stockclass'+page).focus();
            Ext.getCmp('stockclass'+page).setReadOnly(mrpReadOnly);

            Ext.getCmp('max_stock'+page).focus();
            Ext.getCmp('max_stock'+page).setReadOnly(mrpReadOnly);

            Ext.getCmp('valuation_class'+page).focus();
            Ext.getCmp('valuation_class'+page).setReadOnly(mrpReadOnly);

            Ext.getCmp('hs_code'+page).focus();
            Ext.getCmp('hs_code'+page).setReadOnly(mrpReadOnly);



            Ext.getCmp('repair_fabric'+page).focus();
            Ext.getCmp('repair_fabric'+page).setReadOnly(mrpReadOnly);

            Ext.getCmp('import_facility'+page).focus();
            Ext.getCmp('import_facility'+page).setReadOnly(mrpReadOnly);



            Ext.getCmp('anual_usage'+page).focus();
            Ext.getCmp('anual_usage'+page).setReadOnly(mrpReadOnly);

            Ext.getCmp('lead_time'+page).focus();
            Ext.getCmp('lead_time'+page).setReadOnly(mrpReadOnly);


            Ext.getCmp('firstorderqty'+page).focus();
            Ext.getCmp('firstorderqty'+page).setReadOnly(mrpReadOnly);

            Ext.getCmp('unit_price'+page).focus();
            Ext.getCmp('unit_price'+page).setReadOnly(mrpReadOnly);



            Ext.getCmp('initial_time_usage'+page).focus();
            Ext.getCmp('initial_time_usage'+page).setReadOnly(mrpReadOnly);

            Ext.getCmp('currency'+page).focus();
            Ext.getCmp('currency'+page).setReadOnly(mrpReadOnly);

            Ext.getCmp('lot_size'+page).focus();
            Ext.getCmp('lot_size'+page).setReadOnly(mrpReadOnly);

            Ext.getCmp('shelflifetype'+page).focus();
            Ext.getCmp('shelflifetype'+page).setReadOnly(mrpReadOnly);

            Ext.getCmp('safety_stock'+page).focus();
            Ext.getCmp('safety_stock'+page).setReadOnly(mrpReadOnly);

            Ext.getCmp('hazardtype'+page).focus();
            Ext.getCmp('hazardtype'+page).setReadOnly(mrpReadOnly);

            Ext.getCmp('inv_controll'+page).focus();
            Ext.getCmp('inv_controll'+page).setReadOnly(inv_controll);

            Ext.getCmp('approver1'+page).focus();
            Ext.getCmp('approver1'+page).setReadOnly(approver1);

            Ext.getCmp('approver2'+page).focus();
            Ext.getCmp('approver2'+page).setReadOnly(approver2);

            Ext.getCmp('approver3'+page).focus();
            Ext.getCmp('approver3'+page).setReadOnly(approver3);

            Ext.getCmp('approver4'+page).focus();
            Ext.getCmp('approver4'+page).setReadOnly(approver4);

            Ext.getCmp('approver5'+page).focus();
            Ext.getCmp('approver5'+page).setReadOnly(approver5);

            Ext.getCmp('btnInventoryApplyChanges'+page).setDisabled(InventoryApplyChanges);

            /*var str = record.data.item_status;
             var item_status = str.substring(0, 8);
             switch(item_status ){
             case "":
             break;
             }*/
            // Status User

        }

        ////////////////////////
        // Check Material MRP //
        ////////////////////////
        function CheckMaterialMRP(record){
            Ext.getBody().mask("loading MRP item...");
            Ext.getCmp('movingtype'+page).reset();
            Ext.getCmp('movingtype'+page).setReadOnly(true);

            Ext.getCmp('stocktype'+page).reset();
            Ext.getCmp('stocktype'+page).setReadOnly(true);

            Ext.getCmp('stockclass'+page).reset();
            Ext.getCmp('stockclass'+page).setReadOnly(true);

            Ext.getCmp('max_stock'+page).reset();
            Ext.getCmp('max_stock'+page).setReadOnly(true);

            Ext.getCmp('inv_controll'+page).reset();
            Ext.getCmp('inv_controll'+page).setReadOnly(true);

            Ext.getCmp('valuation_class'+page).reset();
            Ext.getCmp('valuation_class'+page).setReadOnly(true);

            Ext.getCmp('hs_code'+page).reset();
            Ext.getCmp('hs_code'+page).setReadOnly(true);

            Ext.getCmp('approver1'+page).reset();
            Ext.getCmp('approver1'+page).setReadOnly(true);

            Ext.getCmp('repair_fabric'+page).reset();
            Ext.getCmp('repair_fabric'+page).setReadOnly(true);

            Ext.getCmp('import_facility'+page).reset();
            Ext.getCmp('import_facility'+page).setReadOnly(true);

            Ext.getCmp('approver2'+page).reset();
            Ext.getCmp('approver2'+page).setReadOnly(true);

            Ext.getCmp('anual_usage'+page).reset();
            Ext.getCmp('anual_usage'+page).setReadOnly(true);

            Ext.getCmp('lead_time'+page).reset();
            Ext.getCmp('lead_time'+page).setReadOnly(true);

            Ext.getCmp('approver3'+page).reset();
            Ext.getCmp('approver3'+page).setReadOnly(true);

            Ext.getCmp('firstorderqty'+page).reset();
            Ext.getCmp('firstorderqty'+page).setReadOnly(true);

            Ext.getCmp('unit_price'+page).reset();
            Ext.getCmp('unit_price'+page).setReadOnly(true);

            Ext.getCmp('approver4'+page).reset();
            Ext.getCmp('approver4'+page).setReadOnly(true);

            Ext.getCmp('initial_time_usage'+page).reset();
            Ext.getCmp('initial_time_usage'+page).setReadOnly(true);

            Ext.getCmp('currency'+page).reset();
            Ext.getCmp('currency'+page).setReadOnly(true);

            Ext.getCmp('approver5'+page).reset();
            Ext.getCmp('approver5'+page).setReadOnly(true);

            Ext.getCmp('lot_size'+page).reset();
            Ext.getCmp('lot_size'+page).setReadOnly(true);

            Ext.getCmp('shelflifetype'+page).reset();
            Ext.getCmp('shelflifetype'+page).setReadOnly(true);

            Ext.getCmp('safety_stock'+page).reset();
            Ext.getCmp('safety_stock'+page).setReadOnly(true);

            Ext.getCmp('hazardtype'+page).reset();
            Ext.getCmp('hazardtype'+page).setReadOnly(true);

            Ext.getCmp('inventory_owner'+page).reset();

            Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonGrey');
            Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonYellow');
            Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonGreen');
            Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonRed');
            Ext.getCmp('InventoryRibbonUser'+page).addCls('RibbonGrey');

            Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonGrey');
            Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonYellow');
            Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonGreen');
            Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonRed');
            Ext.getCmp('InventoryRibbonIC'+page).addCls('RibbonGrey');

            Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonGrey');
            Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonYellow');
            Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonGreen');
            Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonRed');
            Ext.getCmp('InventoryRibbonAPPR1'+page).addCls('RibbonGrey');

            Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonGrey');
            Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonYellow');
            Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonGreen');
            Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonRed');
            Ext.getCmp('InventoryRibbonAPPR2'+page).addCls('RibbonGrey');

            Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonGrey');
            Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonYellow');
            Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonGreen');
            Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonRed');
            Ext.getCmp('InventoryRibbonAPPR3'+page).addCls('RibbonGrey');

            Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonGrey');
            Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonYellow');
            Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonGreen');
            Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonRed');
            Ext.getCmp('InventoryRibbonAPPR4'+page).addCls('RibbonGrey');

            Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonGrey');
            Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonYellow');
            Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonGreen');
            Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonRed');
            Ext.getCmp('InventoryRibbonAPPR5'+page).addCls('RibbonGrey');

            var filters = [];
            var mrpFilter = new Ext.util.Filter({
                operator: 'eq',
                value: record,
                property: "plant",
                type: "string",
            });

            filters.push(mrpFilter['initialConfig']) ;

            var adr_d_items_id = new Ext.util.Filter({
                operator: 'eq',
                value: Ext.getCmp("adr_d_items_id"+page).getValue(),
                property: "adr_d_items_id",
                type: "numeric",
            });
            filters.push(adr_d_items_id['initialConfig']) ;

            var approver2 = new Ext.util.Filter({
                operator: 'eq',
                value:'Validate',
                property: "approver2",
                type: "string",
            });
            filters.push(approver2['initialConfig']) ;

            store_inventory_plant.reload({
                    params:{
                        filter: Ext.encode(filters),
                    },
                    callback : function(records, operation, success) {
                        if(success){
                            Ext.getBody().unmask();
                            var record = records[0];
                            if(store_inventory_plant.getCount() > 0){
                                // Ext.getCmp('status_user'+page).setValue(record.data.status_user);
                                // alert(record.data.exist_plant);
                                // if(record.data.exist_plant == 1){
                                //   Ext.Msg.show({
                                //       title   : 'Data Search',
                                //       msg     : 'Plant is in the process of revision!',
                                //       buttons : Ext.Msg.OK,
                                //       // iconCls : 'warningMessage',
                                //       icon :  Ext.MessageBox.INFO,
                                //   });

                                // }else{
                                Ext.getCmp('movingtype'+page).setValue(record.data.movingtype);
                                Ext.getCmp('stocktype'+page).setValue(record.data.stocktype);
                                Ext.getCmp('stockclass'+page).setValue(record.data.stockclass);
                                Ext.getCmp('max_stock'+page).setValue(record.data.max_stock);
                                Ext.getCmp('valuation_class'+page).setValue(record.data.valuationclass);
                                Ext.getCmp('hs_code'+page).setValue(record.data.hs_code);
                                Ext.getCmp('repair_fabric'+page).setValue(record.data.repair_fabric);
                                Ext.getCmp('import_facility'+page).setValue(record.data.import_facility);
                                Ext.getCmp('anual_usage'+page).setValue(record.data.anual_usage);
                                Ext.getCmp('lead_time'+page).setValue(record.data.lead_time);
                                Ext.getCmp('firstorderqty'+page).setValue(record.data.firstorderqty);
                                Ext.getCmp('unit_price'+page).setValue(record.data.unit_price);
                                Ext.getCmp('initial_time_usage'+page).setValue(record.data.initial_time_usage);
                                Ext.getCmp('currency'+page).setValue(record.data.currency);
                                Ext.getCmp('lot_size'+page).setValue(record.data.lot_size);
                                Ext.getCmp('shelflifetype'+page).setValue(record.data.shelflifetype);
                                Ext.getCmp('safety_stock'+page).setValue(record.data.safety_stock);
                                Ext.getCmp('hazardtype'+page).setValue(record.data.hazardtype);
                                Ext.getCmp('inventory_owner'+page).setValue(record.data.inventory_owner);

                                Ext.getCmp('inv_controll'+page).setValue(record.data.inv_controll);
                                Ext.getCmp('approver1'+page).setValue(record.data.approver1);
                                Ext.getCmp('approver2'+page).setValue(record.data.approver2);
                                Ext.getCmp('approver3'+page).setValue(record.data.approver3);
                                Ext.getCmp('approver4'+page).setValue(record.data.approver4);
                                Ext.getCmp('approver5'+page).setValue(record.data.approver5);

                                MRPWorkFlow();

                                // }

                                // Ext.getCmp('approver1'+page).setReadOnly(true);
                                // Ext.getCmp('approver2'+page).setReadOnly(true);
                                // Ext.getCmp('approver3'+page).setReadOnly(true);
                                // Ext.getCmp('approver4'+page).setReadOnly(true);
                                // Ext.getCmp('approver5'+page).setReadOnly(true);

                            }else{

                                MRPWorkFlow();

                                /*Ext.getCmp('approver1'+page).setReadOnly(true);
                                 Ext.getCmp('approver2'+page).setReadOnly(true);
                                 Ext.getCmp('approver3'+page).setReadOnly(true);
                                 Ext.getCmp('approver4'+page).setReadOnly(true);
                                 Ext.getCmp('approver5'+page).setReadOnly(true);*/

                            }
                        }
                    }
                }
            );
        }

        ////////////////////////////
        // Material MRP Mandatory //
        ////////////////////////////
        function MRPMandatory() {
            var plant = Ext.getCmp('plant'+page).getValue();
            var movingtype = Ext.getCmp('movingtype'+page).getValue();
            var stocktype = Ext.getCmp('stocktype'+page).getValue();
            if(plant){
                if(movingtype && stocktype){
                    if(movingtype == 'A' && stocktype == 'A'){
                        editable = validate(true) ;
                        mandatory = validate(true) ;
                    }else if(movingtype == 'A' && stocktype == 'B'){
                        editable = validate(true) ;
                        mandatory = validate(true) ;
                    }else if(movingtype == 'A' && stocktype == 'C'){
                        editable = validate(true) ;
                        mandatory = validate(true) ;
                    }else if(movingtype == 'B' && stocktype == 'A'){
                        editable = validate(true) ;
                        mandatory = validate(true) ;
                    }else if(movingtype == 'C' && stocktype == 'A'){
                        editable = validate(true) ;
                        mandatory = validate(true) ;
                    }else if(movingtype == 'D' && stocktype == 'A'){
                        editable = validate(true) ;
                        mandatory = validate(true) ;
                    }else{
                        editable = validate(true) ;
                        mandatory = validate(false) ;

                    }
                    if(ROLE.ValuationClass){
                        Ext.getCmp('valuation_class'+page).setReadOnly(editable);
                        Ext.getCmp('valuation_class'+page).allowBlank=mandatory;
                        // Ext.getCmp('valuation_class'+page).focus();
                    }
                    if(ROLE.MaxStock){
                        Ext.getCmp('max_stock'+page).setReadOnly(editable);
                        Ext.getCmp('max_stock'+page).allowBlank=mandatory;
                    }
                    if(ROLE.SafetyStock){
                        Ext.getCmp('safety_stock'+page).setReadOnly(editable);
                        Ext.getCmp('safety_stock'+page).allowBlank=mandatory;
                    }
                    if(ROLE.LeadTime){
                        Ext.getCmp('lead_time'+page).setReadOnly(editable);
                        Ext.getCmp('lead_time'+page).allowBlank=mandatory;
                    }
                    if(ROLE.UnitPrice){
                        Ext.getCmp('unit_price'+page).setReadOnly(editable);
                        Ext.getCmp('unit_price'+page).allowBlank=mandatory;
                    }
                    if(ROLE.Currency){
                        Ext.getCmp('currency'+page).setReadOnly(editable);
                        Ext.getCmp('currency'+page).allowBlank=mandatory;
                    }
                    if(ROLE.StockClass)
                        Ext.getCmp('stockclass'+page).setReadOnly(editable);
                    if(ROLE.HSCode)
                        Ext.getCmp('hs_code'+page).setReadOnly(editable);

                    if(ROLE.RepairFabric)
                        Ext.getCmp('repair_fabric'+page).setReadOnly(editable);
                    if(ROLE.ImportFacility)
                        Ext.getCmp('import_facility'+page).setReadOnly(editable);

                    if(ROLE.AnualUsage)
                        Ext.getCmp('anual_usage'+page).setReadOnly(editable);

                    if(ROLE.FirstOrderQty)
                        Ext.getCmp('firstorderqty'+page).setReadOnly(editable);

                    if(ROLE.InitiatTimeUsage)
                        Ext.getCmp('initial_time_usage'+page).setReadOnly(editable);

                    if(ROLE.LotSize)
                        Ext.getCmp('lot_size'+page).setReadOnly(editable);
                    if(ROLE.ShelfLife)
                        Ext.getCmp('shelflifetype'+page).setReadOnly(editable);
                    if(ROLE.SafetyStock)
                        Ext.getCmp('safety_stock'+page).setReadOnly(editable);
                    if(ROLE.Hazard)
                        Ext.getCmp('hazardtype'+page).setReadOnly(editable);
                }
            }else{
                Ext.MessageBox.show(
                    {
                        title : 'Message',
                        msg:'Please Select Plant !' ,
                        buttons: Ext.MessageBox.OK,
                        icon :  Ext.MessageBox.INFO
                    }
                );
                Ext.getCmp('movingtype'+page).clearValue();
                Ext.getCmp('stocktype'+page).clearValue();
            }

        }

        ////////////////////////////
        // SearchMaterialCataloNo //
        ////////////////////////////
        function SearchMaterialCatalogNo(){
            var val = Ext.getCmp('catalog_no'+page).getValue();
            Ext.getBody().mask("loading material item...");
            if(val){
                Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonUser'+page).addCls('RibbonGrey');

                Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonIC'+page).addCls('RibbonGrey');

                Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonAPPR1'+page).addCls('RibbonGrey');

                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonAPPR2'+page).addCls('RibbonGrey');

                Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonAPPR3'+page).addCls('RibbonGrey');

                Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonAPPR4'+page).addCls('RibbonGrey');

                Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonAPPR5'+page).addCls('RibbonGrey');

                Ext.getCmp('plant'+page).setReadOnly(true);
                Ext.getCmp('plant'+page).reset();
                Ext.getCmp('plant'+page).allowBlank = true;

                Ext.getCmp('stocktype'+page).setReadOnly(true);
                Ext.getCmp('stocktype'+page).reset();
                Ext.getCmp('stocktype'+page).allowBlank = true;

                Ext.getCmp('stocktype'+page).setReadOnly(true);
                Ext.getCmp('stocktype'+page).reset();
                Ext.getCmp('stocktype'+page).allowBlank = true;

                Ext.getCmp('movingtype'+page).reset();
                Ext.getCmp('movingtype'+page).setReadOnly(true);

                Ext.getCmp('stocktype'+page).reset();
                Ext.getCmp('stocktype'+page).setReadOnly(true);

                Ext.getCmp('stockclass'+page).reset();
                Ext.getCmp('stockclass'+page).setReadOnly(true);

                Ext.getCmp('max_stock'+page).reset();
                Ext.getCmp('max_stock'+page).setReadOnly(true);

                Ext.getCmp('inv_controll'+page).reset();
                Ext.getCmp('inv_controll'+page).setReadOnly(true);

                Ext.getCmp('valuation_class'+page).reset();
                Ext.getCmp('valuation_class'+page).setReadOnly(true);

                Ext.getCmp('hs_code'+page).reset();
                Ext.getCmp('hs_code'+page).setReadOnly(true);

                Ext.getCmp('approver1'+page).reset();
                Ext.getCmp('approver1'+page).setReadOnly(true);

                Ext.getCmp('repair_fabric'+page).reset();
                Ext.getCmp('repair_fabric'+page).setReadOnly(true);

                Ext.getCmp('import_facility'+page).reset();
                Ext.getCmp('import_facility'+page).setReadOnly(true);

                Ext.getCmp('approver2'+page).reset();
                Ext.getCmp('approver2'+page).setReadOnly(true);

                Ext.getCmp('anual_usage'+page).reset();
                Ext.getCmp('anual_usage'+page).setReadOnly(true);

                Ext.getCmp('lead_time'+page).reset();
                Ext.getCmp('lead_time'+page).setReadOnly(true);

                Ext.getCmp('approver3'+page).reset();
                Ext.getCmp('approver3'+page).setReadOnly(true);

                Ext.getCmp('firstorderqty'+page).reset();
                Ext.getCmp('firstorderqty'+page).setReadOnly(true);

                Ext.getCmp('unit_price'+page).reset();
                Ext.getCmp('unit_price'+page).setReadOnly(true);

                Ext.getCmp('approver4'+page).reset();
                Ext.getCmp('approver4'+page).setReadOnly(true);

                Ext.getCmp('initial_time_usage'+page).reset();
                Ext.getCmp('initial_time_usage'+page).setReadOnly(true);

                Ext.getCmp('currency'+page).reset();
                Ext.getCmp('currency'+page).setReadOnly(true);

                Ext.getCmp('approver5'+page).reset();
                Ext.getCmp('approver5'+page).setReadOnly(true);

                Ext.getCmp('lot_size'+page).reset();
                Ext.getCmp('lot_size'+page).setReadOnly(true);

                Ext.getCmp('shelflifetype'+page).reset();
                Ext.getCmp('shelflifetype'+page).setReadOnly(true);

                Ext.getCmp('safety_stock'+page).reset();
                Ext.getCmp('safety_stock'+page).setReadOnly(true);

                Ext.getCmp('hazardtype'+page).reset();
                Ext.getCmp('hazardtype'+page).setReadOnly(true);

                Ext.getCmp('inventory_owner'+page).reset();

                // Ext.getCmp('addMaterialDocument'+page).hide();
                // Ext.getCmp('addMaterialIncImages'+page).hide();

                Ext.getCmp('sap_inventoryl_code'+page).setReadOnly(true);
                Ext.getCmp('btnInventoryApplyChanges'+page).setDisabled(true);

                var filters = [];
                var catalog_no = new Ext.util.Filter({
                    operator: 'eq',
                    value:  val,
                    property: "catalog_no",
                    type: "string",
                });
                filters.push(catalog_no['initialConfig']) ;
                var status_sap = new Ext.util.Filter({
                    operator: 'eq',
                    value:  '1',
                    property: "status_sap",
                    type: "numeric",
                });
                filters.push(status_sap['initialConfig']) ;
                var transaction_type = new Ext.util.Filter({
                    operator: 'eq',
                    value:  'Material',
                    property: "transaction_type",
                    type: "string",
                });
                filters.push(transaction_type['initialConfig']) ;
                store_catalog_m.proxy.extraParams = {
                    _token : csrf_token,
                };
                store_catalog_m.reload({
                    params:{
                        _token : csrf_token,
                        filter: Ext.encode(filters),
                    },
                    callback : function(records, operation, success) {
                        if(success){
                            var record = records[0];
                            if(store_catalog_m.getCount() > 0){
                                Ext.getBody().unmask();
                                Ext.getCmp('adr_d_items_id'+page).setValue(record.data.adr_d_items_id);
                                Ext.getCmp('catalog_no'+page).setValue(record.data.catalog_no);
                                Ext.getCmp('sap_inventoryl_code'+page).setValue(record.data.sap_inventoryl_code);
                                Ext.getCmp('short_description'+page).setValue(record.data.short_description);
                                Ext.getCmp('long_description'+page).setValue(record.data.long_description);
                                Ext.getCmp('owner'+page).setValue(record.data.owner);
                                Ext.getCmp('plant'+page).setReadOnly(false);
                                MRPWorkFlow();
                            }else{
                                MRPWorkFlow();

                                Ext.getCmp('plant'+page).setReadOnly(true);
                                Ext.getCmp('plant'+page).reset();
                                Ext.getCmp('plant'+page).allowBlank = true;

                                Ext.getCmp('stocktype'+page).setReadOnly(true);
                                Ext.getCmp('stocktype'+page).reset();
                                Ext.getCmp('stocktype'+page).allowBlank = true;

                                Ext.getCmp('stocktype'+page).setReadOnly(true);
                                Ext.getCmp('stocktype'+page).reset();
                                Ext.getCmp('stocktype'+page).allowBlank = true;

                                Ext.getCmp('movingtype'+page).reset();
                                Ext.getCmp('movingtype'+page).setReadOnly(true);

                                Ext.getCmp('stocktype'+page).reset();
                                Ext.getCmp('stocktype'+page).setReadOnly(true);

                                Ext.getCmp('stockclass'+page).reset();
                                Ext.getCmp('stockclass'+page).setReadOnly(true);

                                Ext.getCmp('max_stock'+page).reset();
                                Ext.getCmp('max_stock'+page).setReadOnly(true);

                                Ext.getCmp('inv_controll'+page).reset();
                                Ext.getCmp('inv_controll'+page).setReadOnly(true);

                                Ext.getCmp('valuation_class'+page).reset();
                                Ext.getCmp('valuation_class'+page).setReadOnly(true);

                                Ext.getCmp('hs_code'+page).reset();
                                Ext.getCmp('hs_code'+page).setReadOnly(true);

                                Ext.getCmp('approver1'+page).reset();
                                Ext.getCmp('approver1'+page).setReadOnly(true);

                                Ext.getCmp('repair_fabric'+page).reset();
                                Ext.getCmp('repair_fabric'+page).setReadOnly(true);

                                Ext.getCmp('import_facility'+page).reset();
                                Ext.getCmp('import_facility'+page).setReadOnly(true);

                                Ext.getCmp('approver2'+page).reset();
                                Ext.getCmp('approver2'+page).setReadOnly(true);

                                Ext.getCmp('anual_usage'+page).reset();
                                Ext.getCmp('anual_usage'+page).setReadOnly(true);

                                Ext.getCmp('lead_time'+page).reset();
                                Ext.getCmp('lead_time'+page).setReadOnly(true);

                                Ext.getCmp('approver3'+page).reset();
                                Ext.getCmp('approver3'+page).setReadOnly(true);

                                Ext.getCmp('firstorderqty'+page).reset();
                                Ext.getCmp('firstorderqty'+page).setReadOnly(true);

                                Ext.getCmp('unit_price'+page).reset();
                                Ext.getCmp('unit_price'+page).setReadOnly(true);

                                Ext.getCmp('approver4'+page).reset();
                                Ext.getCmp('approver4'+page).setReadOnly(true);

                                Ext.getCmp('initial_time_usage'+page).reset();
                                Ext.getCmp('initial_time_usage'+page).setReadOnly(true);

                                Ext.getCmp('currency'+page).reset();
                                Ext.getCmp('currency'+page).setReadOnly(true);

                                Ext.getCmp('approver5'+page).reset();
                                Ext.getCmp('approver5'+page).setReadOnly(true);

                                Ext.getCmp('lot_size'+page).reset();
                                Ext.getCmp('lot_size'+page).setReadOnly(true);

                                Ext.getCmp('shelflifetype'+page).reset();
                                Ext.getCmp('shelflifetype'+page).setReadOnly(true);

                                Ext.getCmp('safety_stock'+page).reset();
                                Ext.getCmp('safety_stock'+page).setReadOnly(true);

                                Ext.getCmp('hazardtype'+page).reset();
                                Ext.getCmp('hazardtype'+page).setReadOnly(true);

                                Ext.getCmp('owner'+page).reset();

                                Ext.getCmp('InventoryRibbonAPPR1'+page).setDisabled(false);
                                Ext.getCmp('InventoryRibbonAPPR2'+page).setDisabled(false);
                                Ext.getCmp('InventoryRibbonAPPR3'+page).setDisabled(false);
                                Ext.getCmp('InventoryRibbonAPPR4'+page).setDisabled(false);
                                Ext.getCmp('InventoryRibbonAPPR5'+page).setDisabled(false);


                                Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonGrey');
                                Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonYellow');
                                Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonGreen');
                                Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonRed');
                                Ext.getCmp('InventoryRibbonUser'+page).addCls('RibbonGrey');

                                Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonGrey');
                                Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonYellow');
                                Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonGreen');
                                Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonRed');
                                Ext.getCmp('InventoryRibbonIC'+page).addCls('RibbonGrey');

                                Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonGrey');
                                Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonYellow');
                                Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonGreen');
                                Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonRed');
                                Ext.getCmp('InventoryRibbonAPPR1'+page).addCls('RibbonGrey');

                                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonGrey');
                                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonYellow');
                                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonGreen');
                                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonRed');
                                Ext.getCmp('InventoryRibbonAPPR2'+page).addCls('RibbonGrey');

                                Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonGrey');
                                Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonYellow');
                                Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonGreen');
                                Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonRed');
                                Ext.getCmp('InventoryRibbonAPPR3'+page).addCls('RibbonGrey');

                                Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonGrey');
                                Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonYellow');
                                Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonGreen');
                                Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonRed');
                                Ext.getCmp('InventoryRibbonAPPR4'+page).addCls('RibbonGrey');

                                Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonGrey');
                                Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonYellow');
                                Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonGreen');
                                Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonRed');
                                Ext.getCmp('InventoryRibbonAPPR5'+page).addCls('RibbonGrey');
                                var form_inventoryl_plant = Ext.getCmp('formMRPRevision'+pageid);
                                form_inventoryl_plant.getForm().getFields().each (function (field) {
                                    if(field.id !='catalog_no'+page){
                                        // field.setReadOnly(true);
                                        field.reset();
                                    }
                                });

                                Ext.Msg.show({
                                    title   : 'Data Search',
                                    msg     : 'No Record Found',
                                    buttons : Ext.Msg.OK,
                                    // iconCls : 'warningMessage',
                                    icon :  Ext.MessageBox.INFO,
                                });
                                Ext.getBody().unmask();
                            }
                        }
                    }
                });

            }else{
                Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonUser'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonUser'+page).addCls('RibbonGrey');

                Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonIC'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonIC'+page).addCls('RibbonGrey');

                Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonAPPR1'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonAPPR1'+page).addCls('RibbonGrey');

                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonAPPR2'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonAPPR2'+page).addCls('RibbonGrey');

                Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonAPPR3'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonAPPR3'+page).addCls('RibbonGrey');

                Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonAPPR4'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonAPPR4'+page).addCls('RibbonGrey');

                Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonGrey');
                Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonYellow');
                Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonGreen');
                Ext.getCmp('InventoryRibbonAPPR5'+page).removeCls('RibbonRed');
                Ext.getCmp('InventoryRibbonAPPR5'+page).addCls('RibbonGrey');

                Ext.getCmp('InventoryRibbonAPPR1'+page).setDisabled(false);
                Ext.getCmp('InventoryRibbonAPPR2'+page).setDisabled(false);
                Ext.getCmp('InventoryRibbonAPPR3'+page).setDisabled(false);
                Ext.getCmp('InventoryRibbonAPPR4'+page).setDisabled(false);
                Ext.getCmp('InventoryRibbonAPPR5'+page).setDisabled(false);

                Ext.getCmp('plant'+page).setReadOnly(true);
                Ext.getCmp('plant'+page).reset();
                Ext.getCmp('plant'+page).allowBlank = true;

                Ext.getCmp('stocktype'+page).setReadOnly(true);
                Ext.getCmp('stocktype'+page).reset();
                Ext.getCmp('stocktype'+page).allowBlank = true;

                Ext.getCmp('stocktype'+page).setReadOnly(true);
                Ext.getCmp('stocktype'+page).reset();
                Ext.getCmp('stocktype'+page).allowBlank = true;

                Ext.getCmp('movingtype'+page).reset();
                Ext.getCmp('movingtype'+page).setReadOnly(true);

                Ext.getCmp('stocktype'+page).reset();
                Ext.getCmp('stocktype'+page).setReadOnly(true);

                Ext.getCmp('stockclass'+page).reset();
                Ext.getCmp('stockclass'+page).setReadOnly(true);

                Ext.getCmp('max_stock'+page).reset();
                Ext.getCmp('max_stock'+page).setReadOnly(true);

                Ext.getCmp('inv_controll'+page).reset();
                Ext.getCmp('inv_controll'+page).setReadOnly(true);

                Ext.getCmp('valuation_class'+page).reset();
                Ext.getCmp('valuation_class'+page).setReadOnly(true);

                Ext.getCmp('hs_code'+page).reset();
                Ext.getCmp('hs_code'+page).setReadOnly(true);

                Ext.getCmp('approver1'+page).reset();
                Ext.getCmp('approver1'+page).setReadOnly(true);

                Ext.getCmp('repair_fabric'+page).reset();
                Ext.getCmp('repair_fabric'+page).setReadOnly(true);

                Ext.getCmp('import_facility'+page).reset();
                Ext.getCmp('import_facility'+page).setReadOnly(true);

                Ext.getCmp('approver2'+page).reset();
                Ext.getCmp('approver2'+page).setReadOnly(true);

                Ext.getCmp('anual_usage'+page).reset();
                Ext.getCmp('anual_usage'+page).setReadOnly(true);

                Ext.getCmp('lead_time'+page).reset();
                Ext.getCmp('lead_time'+page).setReadOnly(true);

                Ext.getCmp('approver3'+page).reset();
                Ext.getCmp('approver3'+page).setReadOnly(true);

                Ext.getCmp('firstorderqty'+page).reset();
                Ext.getCmp('firstorderqty'+page).setReadOnly(true);

                Ext.getCmp('unit_price'+page).reset();
                Ext.getCmp('unit_price'+page).setReadOnly(true);

                Ext.getCmp('approver4'+page).reset();
                Ext.getCmp('approver4'+page).setReadOnly(true);

                Ext.getCmp('initial_time_usage'+page).reset();
                Ext.getCmp('initial_time_usage'+page).setReadOnly(true);

                Ext.getCmp('currency'+page).reset();
                Ext.getCmp('currency'+page).setReadOnly(true);

                Ext.getCmp('approver5'+page).reset();
                Ext.getCmp('approver5'+page).setReadOnly(true);

                Ext.getCmp('lot_size'+page).reset();
                Ext.getCmp('lot_size'+page).setReadOnly(true);

                Ext.getCmp('shelflifetype'+page).reset();
                Ext.getCmp('shelflifetype'+page).setReadOnly(true);

                Ext.getCmp('safety_stock'+page).reset();
                Ext.getCmp('safety_stock'+page).setReadOnly(true);

                Ext.getCmp('hazardtype'+page).reset();
                Ext.getCmp('hazardtype'+page).setReadOnly(true);

                Ext.getCmp('owner'+page).reset();

                Ext.Msg.show({
                    title   : 'Data Search',
                    msg     : 'Catalog No Can Not Be Empty',
                    buttons : Ext.Msg.OK,
                    // iconCls : 'warningMessage',
                    icon :  Ext.MessageBox.INFO,
                });
                Ext.getBody().unmask();
                // CheckMaterialMRP(0);
            }
        }

        ////////////////////////////
        // Material Catalog Field //
        ////////////////////////////
        Ext.define('materialcatalogfield', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.materialcatalogfield',
            enableKeyEvents: true,
            initComponent: function() {
                this.setTriggers({
                    picker: {
                        cls:Ext.baseCSSPrefix + 'form-search-trigger',
                        handler: 'onTriggerClick',
                        scope: 'this'
                    },
                });
                this.callParent(arguments);
            },
            onTriggerClick: function() {
                SearchMaterialCatalogNo();
            }
        });

        ////////////////////////////////
        // Combo Twin Trigger Material //
        /////////////////////////////////
        Ext.define('combotwintrigger', {
            extend: 'Ext.form.field.ComboBox',
            alias: 'widget.combotwintrigger',
            initComponent: function() {
                var me = this ;
                this.setTriggers({
                    picker: {
                        handler: 'onTriggerClick',
                        scope: 'this'
                    },
                    picker1: {
                        cls: 'x-form-search-trigger',
                        id:'btnTrigger'+me.name+'_'+page,
                        handler: function(){
                            console.log(me.id)
                            var title = 'History '+me.fieldLabel ;
                            var winHistoryId = 'win_history_'+me.id;
                            var gridHistoryId = 'grid_history_'+me.id;
                            // var store_history = 'store_history_'+m.name;
                            var x = me.getPosition()[0]+me.width;
                            var y =  me.getPosition()[1];
                            var winHistory = Ext.getCmp(winHistoryId);
                            if (winHistory)
                                winHistory.destroy();
                            var gridHistory = Ext.getCmp(gridHistoryId);
                            if (gridHistory)
                                gridHistory.destroy();
                            window['model_history_'+me.id] = Ext.define('model_history_'+me.id, {
                                extend: 'Ext.data.Model',
                            });
                            window['store_history_'+me.id]  = Ext.create('Ext.data.Store', {
                                storeId: 'store_cross_references',
                                model: window['model_history_'+me.id] ,
                                remoteFilter:true,
                                remoteSort:true,
                                autoLoad: false,
                                proxy: {
                                    type: 'ajax',
                                    url: 'ajax.handler.byname.php?name=catalog',//action=getInc
                                    method: 'GET',
                                    reader: {
                                        type: 'json',
                                        successProperty: 'success',
                                        messageProperty: 'message',
                                        rootProperty: 'data',
                                        totalProperty:'total',
                                        root:'data'
                                    }
                                },
                                listeners: {
                                    beforeload: function(store) {

                                    }
                                }
                            });
                            var filters = [];
                            var adr_d_items_id = new Ext.util.Filter({
                                operator: 'eq',
                                value: Ext.getCmp('adr_d_items_id'+page).getValue(),
                                property: "adr_d_items_id",
                                type: "numeric",
                            });
                            filters.push(adr_d_items_id['initialConfig']) ;
                            /*window[me.name] = new Ext.util.Filter({
                             operator: 'eq',
                             value: me.name,
                             property: "field",
                             type: "string",
                             });
                             filters.push(window[me.name]['initialConfig']) ;*/
                            window['store_history_'+me.id].proxy.extraParams = {
                                filter: Ext.encode(filters),
                                action:'getHistory'
                            };
                            window['store_history_'+me.id].load({
                                params:{
                                    start:0,
                                    limit:25
                                }
                            });
                            Ext.create('Ext.Window',{
                                id:winHistoryId,
                                // title:title,
                                header:false,
                                closable:false,
                                floating: true,
                                width:'300',
                                height:'230',
                                layout:'fit',
                                items:[
                                    Ext.create('Ext.grid.Panel', {
                                        id:gridHistoryId,
                                        title: title,
                                        // title:title,
                                        region: 'fit',
                                        store: window['store_history_'+me.id] ,
                                        // height :200,
                                        frame:false,
                                        margins: '5 5 5 5',
                                        columns: [
                                            {
                                                header:'Revision',
                                                dataIndex:'revision'
                                            },
                                            {
                                                header:'Old Value',
                                                dataIndex:me.name
                                            }
                                        ],
                                        bbar:[
                                            Ext.create('Ext.PagingToolbar', {
                                                border:false,
                                                store: window['store_history_'+me.id] ,
                                                displayInfo: false,
                                                displayMsg: 'Displaying record {0} - {1} of {2}',
                                                emptyMsg: "No records to display"
                                            }),
                                        ],
                                        viewConfig: {
                                            stripeRows: true
                                        },

                                        listeners: {

                                        },
                                        tools: [
                                            {
                                                type: 'close',
                                                handler: function () {
                                                    var winHistory = Ext.getCmp(winHistoryId);
                                                    // winHistory.animateTarget = 'btnTrigger'+me.name+'_'+page,
                                                    winHistory.hide();
                                                }
                                            }
                                        ],
                                    })
                                ],
                                /*tools: [
                                 {
                                 type: 'close',
                                 handler: function () {
                                 var winHistory = Ext.getCmp(winHistoryId);
                                 // winHistory.animateTarget = 'btnTrigger'+me.name+'_'+page,
                                 winHistory.hide();
                                 }
                                 }
                                 ],*/
                                listeners: {
                                    show: function() {
                                        // this.setX(w -this.getWidth());
                                        // this.setY(h -this.getHeight());
                                    },
                                    beforeclose:function(){
                                        // getCmp()
                                        // Ext.getCmp(winHistoryId).destroy();
                                    },
                                    afterclose:function(){
                                        // Ext.getCmp(winHistoryId).destroy();
                                    }
                                },
                            }).showAt(x,y);
                        },
                        scope: 'this'
                    }
                });
                this.callParent(arguments);
            },
        });
        //////////////////
        // Material MRP //
        //////////////////
        var model_inventory_plant = Ext.define('model_inventory_plant', {
            extend: 'Ext.data.Model',
        });
        var store_inventory_plant = Ext.create('Ext.data.Store', {
            storeId: 'store_inventory_plant'+page,
            model: store_inventory_plant,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/getInventoryPlant',//action=getInc
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    messageProperty: 'message',
                    rootProperty: 'data',
                    totalProperty:'total',
                    root:'data'
                }
            },
            listeners: {
                beforeload: function(store) {

                }
            }
        });

        ////////////////////
        // Material Plant //
        ////////////////////
        var model_inventoryl_plant = Ext.define('model_inventoryl_plant', {
            extend: 'Ext.data.Model',
            fields: ['code', 'description']
        });
        var store_plant = Ext.create('Ext.data.Store', {
            storeId: 'store_plant'+page,
            model: model_inventoryl_plant,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/getPlant',//action=getInc
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    messageProperty: 'message',
                    rootProperty: 'data',
                    totalProperty:'total',
                    root:'data'
                }
            },
            listeners: {
                beforeload: function(store) {

                }
            }
        });
        var filters = [];
        var CompanyCodeFilter = new Ext.util.Filter({
            operator: 'eq',
            value: company_code,
            property: "company_code",
            type: "string",
        });
        filters.push(CompanyCodeFilter['initialConfig']) ;
        store_plant.filter(filters);
        store_plant.reload({
            params:{
                start:0,
                limit:25
            }
        });

        //////////////////////////
        // Material Moving Type //
        //////////////////////////
        var model_inventoryl_moving_type = Ext.define('model_inventoryl_moving_type', {
            extend: 'Ext.data.Model',
            // fields: ['code', 'description']
        });
        var store_moving_type = Ext.create('Ext.data.Store', {
            storeId: 'store_moving_type',
            model: model_inventoryl_moving_type,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/getMovingType',//action=getInc
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    messageProperty: 'message',
                    rootProperty: 'data',
                    totalProperty:'total',
                    root:'data'
                }
            },
            listeners: {

            }
        });

        /////////////////////////
        // Material Stock Type //
        /////////////////////////
        var model_inventoryl_stock_type = Ext.define('model_inventoryl_stock_type', {
            extend: 'Ext.data.Model',
            // fields: ['code', 'description']
        });
        var store_stock_type = Ext.create('Ext.data.Store', {
            storeId: 'store_stock_type',
            model: model_inventoryl_stock_type,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/getStockType',//action=getInc
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    messageProperty: 'message',
                    rootProperty: 'data',
                    totalProperty:'total',
                    root:'data'
                }
            },
            listeners: {
                beforeload: function(store) {

                }
            }
        });

        //////////////////////////
        // Material Stock Class //
        //////////////////////////
        var model_inventoryl_stock_class = Ext.define('model_inventoryl_stock_class', {
            extend: 'Ext.data.Model',//Meta Data Model
        });
        var store_stock_class = Ext.create('Ext.data.Store', {
            model: model_inventoryl_stock_class,
            // groupField: 'group_header',
            proxy: {
                type: 'ajax',
                // url: 'cb_groupclass.php?',
                url: '/getStockClass',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message'
                }
            },
            sorters: [
                {
                    property : 'stockclass',
                    direction: 'ASC'
                }
            ],
            listeners: {

            }
        });

        //////////////////////////////
        // Material Valuation Class //
        //////////////////////////////
        var model_inventoryl_valuation_class = Ext.define('model_inventoryl_valuation', {
            extend: 'Ext.data.Model',//Meta Data Model
        });
        var store_valuation_class = Ext.create('Ext.data.Store', {
            model: model_inventoryl_valuation,
            // groupField: 'group_header',
            proxy: {
                type: 'ajax',
                // url: 'cb_groupclass.php?',
                url: '/getValuationClass',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message'
                }
            },
            sorters: [
                {
                    property : 'valuation',
                    direction: 'ASC'
                }
            ],
            listeners: {

            }
        });

        ///////////////////////
        // Material Currency //
        ///////////////////////
        var model_inventoryl_currency = Ext.define('model_inventoryl_currency', {
            extend: 'Ext.data.Model',//Meta Data Model
        });
        var store_currency = Ext.create('Ext.data.Store', {
            model: model_inventoryl_currency,
            // groupField: 'group_header',
            proxy: {
                type: 'ajax',
                // url: 'cb_groupclass.php?',
                url: '/getCurrency',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message'
                }
            },
            sorters: [
                {
                    property : 'currency_id',
                    direction: 'ASC'
                }
            ],
            listeners: {
                'beforeload': function(store) {
                    // store.proxy.extraParams.cb_groupclass = '';
                }
            }
        });

        /////////////////////////
        // Material Shelf life //
        /////////////////////////
        var model_inventoryl_shelflife = Ext.define('model_inventoryl_shelflife', {
            extend: 'Ext.data.Model',//Meta Data Model
        });
        var store_shelflife = Ext.create('Ext.data.Store', {
            model: model_inventoryl_shelflife,
            // groupField: 'group_header',
            proxy: {
                type: 'ajax',
                // url: 'cb_groupclass.php?',
                url: '/getShelfLife',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message'
                }
            },
            sorters: [
                {
                    property : 'valuation',
                    direction: 'ASC'
                }
            ],
            listeners: {

            }
        });


        //////////////////////
        // Material Hazard  //
        //////////////////////
        var model_inventoryl_hazard = Ext.define('model_inventoryl_hazard', {
            extend: 'Ext.data.Model',//Meta Data Model
        });
        var store_hazard = Ext.create('Ext.data.Store', {
            model: model_inventoryl_hazard,
            // groupField: 'group_header',
            proxy: {
                type: 'ajax',
                // url: 'cb_groupclass.php?',
                url: '/getHazardType',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'results',
                    messageProperty: 'message'
                }
            },
            sorters: [
                {
                    property : 'hazardtype',
                    direction: 'ASC'
                }
            ],
            listeners: {

            }
        });

        Ext.define('comboboxplant', {
            extend: 'Ext.form.field.ComboBox',
            alias: 'widget.comboboxplant',
            initComponent: function() {
                this.setTriggers({
                    picker: {
                        handler: 'onTriggerClick',
                        scope: 'this'
                    },
                });
                this.callParent(arguments);
            },
        });

        // =====================================================================
        // model revision request
        // =====================================================================
        var model_revision_request = Ext.define('model_revision_request', {
            extend: 'Ext.data.Model',
            fields: ['id','adr_no', 'catalog_no', 'sap_inventoryl_code', 'real_name','deleted_at', 'updated_at', 'updated_by', 'item_status', 'type_revision']
        });

        var store_revision_request = Ext.create('Ext.data.Store', {
            storeId: 'store_revision_request',
            model: model_revision_request,
            proxy: {
                type: 'ajax',
                url: 'getRevisionRequest',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    messageProperty: 'message',
                    rootProperty: 'data',
                    totalProperty:'total',
                    root:'data'
                }
            },
            listeners: {
                beforeload: function(store) {

                }
            }
        });

        var filters = [];
        var transaction_type = new Ext.util.Filter({
            operator: 'eq',
            value:  'Material',
            property: "transaction_type",
            type: "string",
        });
        filters.push(transaction_type['initialConfig']) ;
        store_revision_request.proxy.extraParams = {
            _token : csrf_token,
            filter: Ext.encode(filters),
        };
        store_revision_request.load({
            params:{
            }
        });
        // =====================================================================
        // --GRIDPANEL - REVISION
        // =====================================================================
        var grid_inventoryl_request_revision_m = Ext.create('Ext.grid.Panel', {
            store: store_revision_request,
            layout:'fit',
            margin: '0 0 0 0',
            border:true,
            padding : '1 1 1 1',
            tbar:[
                {
                    // xtype:'button',
                    cls: 'x-btn-default-small',
                    text:'Add Rev Request',
                    border:false,
                    iconCls:'add-data',
                    baseCls: 'buttonStyle',
                    hidden:!ROLE.AddRequestRevision,
                    disabled:!ROLE.AddRequestRevision,
                    id:'AddRequestRevision'+page,
                    handler:function(){
                        var form_revision_material = Ext.getCmp('formMRPRevision'+page);
                        form_revision_material.getForm().reset();


                        winInventoryRevision.animateTarget = 'AddRequestRevision'+page;
                        winInventoryRevision.show();
                    }
                },
                {
                    cls: 'x-btn-default-small',
                    text:'Approve Request',
                    border:false,
                    iconCls:'add-data',
                    hidden:!ROLE.ApprovalRevision,
                    disabled:!ROLE.ApprovalRevision,
                    id:'ApprovalRevision'+page,
                    handler:function(){
                        var form_revision_material = Ext.getCmp('formMRPRevision'+page);
                        form_revision_material.getForm().reset();


                        winInventoryRevision.animateTarget = 'AddRequestRevision'+page;
                        winInventoryRevision.show();
                    }
                },
            ],
            columns: [
                {
                    header: 'ID',
                    dataIndex: 'id',
                    align: 'center',
                    hidden:true,
                    flex: 3,
                    editor:{
                        xtype: 'textfield'
                    },
                    filter:{
                        type: 'string'
                    },
                },
                {
                    header: 'Req. Revision No',
                    dataIndex: 'request_no',
                    align: 'center',
                    flex: 3,
                    editor:{
                        xtype: 'textfield'
                    },
                    filter:{
                        type: 'string'
                    },
                },
                {
                    header: 'Catalogue No',
                    dataIndex: 'catalog_no',
                    align: 'center',
                    flex: 3,
                    editor:{
                        xtype: 'textfield'
                    },
                    filter:{
                        type: 'string'
                    },
                },
                {
                    header: 'SAP No',
                    dataIndex: 'sap_inventoryl_code',
                    align: 'center',
                    // flex: 3,
                    autoSizeColumn :true,
                    editor:{
                        xtype: 'textfield'
                    },
                    filter:{
                        type: 'string'
                    },
                },
                {
                    header: 'Request Date',
                    xtype:"datecolumn",
                    format:"d M Y H:i",
                    dataIndex: 'created_at',
                    flex: 2,
                    autoSizeColumn:true,
                    editor:{
                        xtype: 'textfield'
                    },
                    filter:{
                        type: 'string'
                    },
                },
                {
                    header: 'Last Update',
                    xtype:"datecolumn",
                    format:"d M Y H:i",
                    dataIndex: 'updated_at',
                    flex: 2,
                    autoSizeColumn:true,
                    editor:{
                        xtype: 'textfield'
                    },
                    filter:{
                        type: 'string'
                    },
                },
                {
                    header: 'Update By',
                    dataIndex: 'process_by',
                    flex: 3,
                    align: 'center',
                    editor:{
                        xtype: 'textfield'
                    },
                    filter:{
                        type: 'string'
                    },
                },
                {
                    xtype:'actioncolumn',
                    header: 'History',
                    width:50,
                    align: 'center',
                    items: [
                        {
                            icon: 'images/application_view_detail.png',  // Use a URL in the icon config
                            tooltip: 'view reason revision',
                            handler: function(view, rowIndex, colIndex, item, e, record) {
                                var request_no = record.get('request_no');
                                var recordStatusHis = record.get('item_status');
                                var recordRevisionID = record.get('revision_id');
                                var viewInvHistory = "";

                                // alert(recordValHis);

                                if(record.get('cek_status') ==  0) {

                                    var mess = 'History not yet available !';
                                    Ext.MessageBox.hide();
                                    Ext.MessageBox.show(
                                        {
                                            title: 'Message',
                                            msg: mess,
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.INFO
                                        }
                                    );

                                }else{
                                    var filters = [];


                                    winInventoryRevision.setTitle("View Detail No."+request_no);
                                    winInventoryRevision.show();

                                }
                            }
                        }
                    ]
                },
                // FOR VIEW REASON
                {
                    xtype:'actioncolumn',
                    header: 'Reason',
                    width:50,
                    align: 'center',
                    items: [{
                        icon: 'images/note.png',  // Use a URL in the icon config
                        tooltip: 'view reason blocked / stopped',
                        handler: function(view, rowIndex, colIndex, item, e, record) {
                            /*var recordValRev = record.get('catalog_no');
                             winMaterialViewReasonRev.animateTarget = 'btnMaterialViewReasonRev'+page;
                             winMaterialViewReasonRev.setTitle("Revision Reason Catalog No."+recordValRev),
                             winMaterialViewReasonRev.show();
                             var filters = [];
                             var adr_d_items_id_filterRev = new Ext.util.Filter({
                             operator: 'eq',
                             value: recordValRev,
                             property: "adr_d_items_id",
                             type: "string",
                             });
                             filters.push(adr_d_items_id_filterRev['initialConfig']) ;
                             store_inventoryl_view_reasonRev.proxy.extraParams = {
                             filter: Ext.encode(filters),
                             action:'getViewNotesRev'
                             };
                             store_inventoryl_view_reasonRev.load({
                             params:{
                             // action : 'getInc',
                             // filter: Ext.encode(filters),
                             }
                             });*/
                        }
                    }
                    ]
                }
            ],
            bbar:[
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_revision_request,
                    displayInfo: true,
                    displayMsg: 'Displaying record {0} - {1} of {2}',
                    emptyMsg: "No records to display"
                }),

            ],
            viewConfig: {
                stripeRows: true,
                enableTextSelection: true,
                listeners: {
                    refresh: function(dataview) {
                        Ext.each(dataview.panel.columns, function(column) {
                            if (column.autoSizeColumn === true)
                                column.autoSize();
                            Ext.grid.ColumnModel(column);
                        })
                    }
                }
            },
            listeners: {
                select: function(selModel, record, index, options){

                }
            }
        });
        /////////////////////////////////////////////////
        // Window Inventory Revision History //
        ////////////////////////////////////////////////
        var winInventoryRevision = Ext.widget('window', {
            id:'winInventoryRevision'+page,
            title:'Form Request For Revision',
            layout       : 'fit',
            constrain    : true,
            height:Ext.getBody().getViewSize().height*0.99,
            width:Ext.getBody().getViewSize().width*0.99 ,
            plain: true,
            // margin: '10 10 13 10',
            bodyPadding  : '5 5 5 5',
            border       : false,
            resizable    : false,
            modal        : true,
            autoShow     : false,
            defaultFocus : 'nome',
            buttonAlign : 'right',
            closable: false,
            frame: true,
            items: [
                {
                    xtype:'form',
                    border:false,
                    id:'formMRPRevision'+pageid,
                    height:550,
                    autoHeight:true,
                    layout:'border',
                    fieldDefaults: {
                        readOnly : true //all fiels are in readOnly mode
                    },
                    padding : '1 1 1 1',
                    margin : '1 1 1 1',
                    items:[
                        {
                            region:'center',
                            autoScroll:true,
                            split:true,
                            collapsible:true,
                            header:false,
                            border:true,
                            padding : '1 1 1 1',
                            margin : '1 1 1 1',
                            items: [
                                {
                                    layout: {
                                        type  : 'vbox',
                                        align : 'stretch'
                                    },
                                    xtype: 'fieldset',
                                    title: 'Material Item',
                                    // width: 780,
                                    flex:4,
                                    // height:400,
                                    autoScroll: true,
                                    collapsible: false,
                                    margin: '5 5 5 5',
                                    padding : '1 1 1 1',
                                    border:true,
                                    items: [
                                        {
                                            xtype: 'panel',
                                            margin: '0 0 0 5',
                                            layout: {
                                                type: 'hbox',
                                                align: 'center',
                                                border: false,
                                                // pack: 'center'
                                            },
                                            border: false,
                                            items: [
                                                {
                                                    xtype:'materialcatalogfield',
                                                    margin: '3 3 3 0',
                                                    fieldLabel: 'Catalogue no',
                                                    emptyText: 'Item No',
                                                    maxLength:18,
                                                    labelWidth:130,
                                                    width: 350,
                                                    id:'catalog_no'+page,
                                                    name: 'catalog_no',
                                                    value: '',
                                                    readOnly:false,
                                                    listeners : {
                                                        render : function(cmp) {
                                                            cmp.getEl().on('keypress', function(e) {
                                                                if (e.getKey() == e.ENTER) {
                                                                    SearchMaterialCatalogNo();
                                                                    // submitform();
                                                                }
                                                            });
                                                        }
                                                    }
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            margin: '0 0 0 5',
                                            layout: 'hbox',
                                            border:false,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    id: 'adr_d_items_id'+page,
                                                    name:'adr_d_items_id',
                                                    width: 350,
                                                    editable: true,
                                                    value: '',
                                                    readOnly:true,
                                                    hidden:true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    id: 'inventory_id'+page,
                                                    name:'inventory_id',
                                                    width: 350,
                                                    editable: true,
                                                    value: '',
                                                    readOnly:true,
                                                    hidden:true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    margin: '3 3 3 0',
                                                    fieldLabel: 'SAP Material Code.',
                                                    maxLength:18,
                                                    labelWidth:130,
                                                    width: 350,
                                                    id: 'sap_inventoryl_code'+page,
                                                    name:'sap_inventoryl_code',
                                                    editable: true,
                                                    value: '',
                                                    readOnly:true,
                                                    // hidden:!ROLE.SAPMaterialCode,
                                                },
                                                {
                                                    xtype:'textfield',
                                                    name:'sap_inventoryl_code_by',
                                                    id:'sap_inventoryl_code_by'+page,
                                                    hidden:true,
                                                },
                                                {
                                                    xtype:'textfield',
                                                    name:'sap_inventoryl_code_date',
                                                    id:'sap_inventoryl_code_date'+page,
                                                    hidden:true,
                                                },
                                                {
                                                    xtype: 'tbfill'
                                                },

                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            margin:'0 0 0 5',
                                            layout: 'hbox',
                                            border:false,
                                            items: [
                                                {
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Short Desc.',
                                                    labelWidth: 130,
                                                    // maxLength:40,
                                                    width: 500,
                                                    editable: false,
                                                    value: '',
                                                    margin: '3 3 3 0',
                                                    id:'short_description'+page,
                                                    name:'short_description'
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            margin:'0 0 0 5',
                                            layout: 'hbox',
                                            border:false,
                                            items: [
                                                {
                                                    xtype: 'textarea',
                                                    fieldLabel: 'Long Desc.',
                                                    // id: 'se_longdesc',
                                                    labelWidth: 130,
                                                    width: 739,
                                                    // height: 50,
                                                    editable: false,
                                                    value: '',
                                                    margin: '0 3 3 0',
                                                    id:'long_description'+page,
                                                    name:'long_description'
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            margin:'0 0 0 5',
                                            layout: 'hbox',
                                            border:false,
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    id: 'owner'+page,
                                                    labelWidth: 130,
                                                    width: 300,
                                                    fieldLabel: 'Material Owner',
                                                    value: ''
                                                },
                                            ]
                                        },

                                    ]
                                },
                                {
                                    layout: {
                                        type: 'vbox',
                                        pack: 'start',
                                        align: 'stretch'
                                    },
                                    xtype: 'fieldset',
                                    title: 'Company Code',
                                    // width: 780,
                                    flex:4,
                                    autoScroll: true,
                                    collapsible: false,
                                    margin: '5 5 5 5',
                                    padding : '1 1 1 1',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border:false,
                                            margin: '0 0 0 5',
                                            items: [
                                                {
                                                    xtype:'textfield',
                                                    name:'status_user',
                                                    id:'status_user'+page,
                                                    hidden:true,
                                                    value:"1"
                                                },
                                                {
                                                    xtype: 'comboboxplant',
                                                    msgTarget: 'side',
                                                    fieldLabel: 'Plant',
                                                    labelWidth: 130,
                                                    width: 270,
                                                    forceSelection : false,
                                                    mode: 'remote',
                                                    triggerAction: 'all',
                                                    emptyText:'Select Plant...',
                                                    selectOnFocus:false,
                                                    margin: '3 3 3 0',
                                                    id:'plant'+ page,
                                                    name:           'plant',
                                                    hiddenName:     'plant_code',
                                                    displayField:   'plant_code',
                                                    valueField:     'plant_code',
                                                    minChars : 0,
                                                    store : store_plant,
                                                    typeAhead: false,
                                                    allowBlank:true,
                                                    msgTarget: 'under',
                                                    matchFieldWidth: false,
                                                    pageSize:25,
                                                    listConfig: {
                                                        loadingText: 'Searching...',
                                                        getInnerTpl: function() {
                                                            return '{plant_code} <span style="font-size: xx-small; ">{name}</span>';
                                                        },
                                                    },
                                                    listeners: {
                                                        scope: this,
                                                        beforequery: function(queryEvent, eOpts ,value) {
                                                            var filters = [];
                                                            var CompanyCodeFilter = new Ext.util.Filter({
                                                                operator: 'eq',
                                                                value: company_code,
                                                                property: "company_code",
                                                                type: "string",
                                                            });
                                                            filters.push(CompanyCodeFilter['initialConfig']) ;

                                                            var plant = new Ext.util.Filter({
                                                                operator: 'like',
                                                                value: queryEvent.query.toLowerCase(),
                                                                property: "plant",
                                                                type: "string",
                                                            });
                                                            if(queryEvent.query.toLowerCase()){
                                                                filters.push(plant['initialConfig']) ;
                                                            }

                                                            store_plant.filter(filters);

                                                            store_plant.load({
                                                                params:{
                                                                    start:0,
                                                                    limit:queryEvent.combo.pageSize
                                                                }
                                                            });

                                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                                            return true;
                                                        },
                                                        select: function (t,record,o) {
                                                            CheckMaterialMRP(record.data.plant_code);
                                                            MRPMandatory();
                                                        }

                                                    },
                                                    value: '',
                                                    readOnly:true,
                                                    hidden:!ROLE.Plant,
                                                    /*initComponent: function() {
                                                     var me = this;
                                                     console.log(me);
                                                     },*/
                                                    /*initComponent: function() {
                                                     this.setTriggers({
                                                     clearTrigger: {
                                                     cls: 'x-form-clear-trigger',
                                                     handler: 'onClearClick',
                                                     hidden: true,
                                                     scope: 'this'
                                                     },
                                                     picker: {
                                                     handler: 'onTriggerClick',
                                                     scope: 'this'
                                                     }
                                                     });
                                                     this.callParent(arguments);
                                                     },*/
                                                },
                                                /*{
                                                 xtype: 'splitter'
                                                 },*/
                                                {
                                                    xtype: 'combo',
                                                    fieldLabel: 'Moving Type',
                                                    labelWidth: 90,
                                                    width: 230,
                                                    forceSelection : false,
                                                    mode: 'remote',
                                                    triggerAction: 'all',
                                                    emptyText:'Select Moving Type ...',
                                                    selectOnFocus:false,
                                                    margin: '3 3 3 0',
                                                    id:'movingtype'+ page,
                                                    name:           'movingtype',
                                                    hiddenName:     'code',
                                                    displayField:   'code',
                                                    valueField:     'code',
                                                    minChars : 0,
                                                    pageSize:15,
                                                    matchFieldWidth: false,
                                                    listConfig: {
                                                        loadingText: 'Searching...',
                                                        getInnerTpl: function() {
                                                            return '{code} <span style="font-size: xx-small; "> {description}</span>';
                                                        }
                                                    },
                                                    store: store_moving_type,
                                                    typeAhead: false,
                                                    allowBlank:true,
                                                    msgTarget: 'under',
                                                    listeners: {
                                                        scope: this,
                                                        beforequery: function(queryEvent, eOpts ,value) {
                                                            var filters = [];
                                                            var MovingTypeFilter = new Ext.util.Filter({
                                                                operator: 'like',
                                                                value: queryEvent.query.toLowerCase(),
                                                                property: "description",
                                                                type: "string",
                                                            });
                                                            if(queryEvent.query.toLowerCase()){
                                                                filters.push(MovingTypeFilter['initialConfig']) ;
                                                            }
                                                            var entity_name = new Ext.util.Filter({
                                                                operator: 'like',
                                                                value: 'movingtype',
                                                                property: "entity_name",
                                                                type: "string",
                                                            });
                                                            filters.push(entity_name['initialConfig']) ;
                                                            store_moving_type.proxy.extraParams = {
                                                                filter: Ext.encode(filters),
                                                            };
                                                            store_moving_type.load({
                                                                params:{
                                                                    start:0,
                                                                    limit:25
                                                                }
                                                            });

                                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                                            return true;
                                                        },
                                                        select: function (t,record,o) {
                                                            MRPMandatory();
                                                        }

                                                    },
                                                    value: '',
                                                    hidden:!ROLE.MovingType,
                                                    readOnly:true,
                                                },
                                                /*{
                                                 xtype: 'splitter'
                                                 },*/
                                                {
                                                    xtype: 'combo',
                                                    fieldLabel: 'Stock Type',
                                                    labelWidth: 80,
                                                    width: 230,
                                                    forceSelection : false,
                                                    mode: 'remote',
                                                    triggerAction: 'all',
                                                    emptyText:'Select Stock Type ...',
                                                    selectOnFocus:false,
                                                    margin: '3 3 3 0',
                                                    id:'stocktype'+ page,
                                                    name:           'stocktype',
                                                    hiddenName:     'code',
                                                    displayField:   'code',
                                                    valueField:     'code',
                                                    minChars : 0,
                                                    pageSize:15,
                                                    matchFieldWidth: false,
                                                    listConfig: {
                                                        loadingText: 'Searching...',
                                                        getInnerTpl: function() {
                                                            return '<span style="font-size: xx-small; ">{description}</span>';
                                                        }
                                                    },
                                                    store: store_stock_type,
                                                    typeAhead: false,
                                                    allowBlank:true,
                                                    msgTarget: 'under',
                                                    listeners: {
                                                        scope: this,
                                                        beforequery: function(queryEvent, eOpts ,value) {
                                                            var filters = [];

                                                            var StockTypeFilter = new Ext.util.Filter({
                                                                operator: 'like',
                                                                value: queryEvent.query.toLowerCase(),
                                                                property: "description",
                                                                type: "string",
                                                            });
                                                            if(queryEvent.query.toLowerCase()){
                                                                filters.push(StockTypeFilter['initialConfig']) ;
                                                            }
                                                            var entity_name = new Ext.util.Filter({
                                                                operator: 'like',
                                                                value: 'stocktype',
                                                                property: "entity_name",
                                                                type: "string",
                                                            });
                                                            filters.push(entity_name['initialConfig']) ;

                                                            store_stock_type.proxy.extraParams = {
                                                                filter: Ext.encode(filters),
                                                                action :'getStockType'
                                                            };

                                                            store_stock_type.reload({
                                                                params:{
                                                                    start:0,
                                                                    limit:25
                                                                }
                                                            });
                                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                                            return true;
                                                        },
                                                        select: function (t,record,o) {
                                                            MRPMandatory();
                                                        }

                                                    },
                                                    value: '',
                                                    readOnly:true,
                                                    hidden:!ROLE.StockType,
                                                },
                                            ]
                                        }
                                    ]
                                },
                                {
                                    layout: {
                                        type: 'vbox',
                                        pack: 'start',
                                        align: 'stretch'
                                    },
                                    xtype: 'fieldset',
                                    title: 'Inventory Category',
                                    flex:4,
                                    // width: 780,
                                    autoScroll: true,
                                    collapsible: false,
                                    margin: '5 5 5 5',
                                    padding : '1 1 1 1',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border:false,
                                            margin: '0 0 0 5',
                                            items: [
                                                {
                                                    xtype:'tbfill',
                                                    hidden:ROLE.StockClass,
                                                },
                                                {
                                                    xtype: 'combo',
                                                    msgTarget: 'side',
                                                    fieldLabel: 'Stock Class',
                                                    labelWidth: 130,
                                                    width: 270,
                                                    forceSelection : false,
                                                    mode: 'remote',
                                                    triggerAction: 'all',
                                                    emptyText:'Select Stock Clas...',
                                                    selectOnFocus:false,
                                                    margin: '3 3 3 0',
                                                    id:'stockclass'+ page,
                                                    name:           'stockclass',
                                                    hiddenName:     'code',
                                                    displayField:   'code',
                                                    valueField:     'code',
                                                    minChars : 0,
                                                    pageSize:15,
                                                    // matchFieldWidth: false,
                                                    listConfig: {
                                                        loadingText: 'Searching...',
                                                        getInnerTpl: function() {
                                                            return '{code} <span style="font-size: xx-small; ">{description}</span>';
                                                        }
                                                    },
                                                    store: store_stock_class,
                                                    typeAhead: false,
                                                    allowBlank:true,
                                                    msgTarget: 'under',
                                                    listeners: {
                                                        scope: this,
                                                        beforequery: function(queryEvent, eOpts ,value) {
                                                            var filters = [];
                                                            var entity_name = new Ext.util.Filter({
                                                                operator: 'eq',
                                                                value: 'stockclass',
                                                                property: "entity_name",
                                                                type: "string",
                                                            });
                                                            filters.push(entity_name['initialConfig']) ;

                                                            var StockClassFilter = new Ext.util.Filter({
                                                                operator: 'like',
                                                                value: queryEvent.query.toLowerCase(),
                                                                property: "entity_code_name",
                                                                type: "string",
                                                            });
                                                            if(queryEvent.query.toLowerCase()){
                                                                filters.push(StockClassFilter['initialConfig']) ;
                                                            }


                                                            store_stock_class.proxy.extraParams = {
                                                                filter: Ext.encode(filters),
                                                            };

                                                            store_stock_class.reload({
                                                                params:{
                                                                    start:0,
                                                                    limit:25
                                                                }
                                                            });
                                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                                            return true;
                                                        },
                                                        change: function (t,record,o) {

                                                        }

                                                    },
                                                    value: '',
                                                    readOnly:true,
                                                    hidden:!ROLE.StockClass,
                                                    // hidden:true,
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    // msgTarget: 'side',
                                                    fieldLabel: 'Max Stock',
                                                    labelWidth: 90,
                                                    width: 230,
                                                    allowDecimals: true,
                                                    decimalPrecision: 1,
                                                    margin: '3 3 3 0',
                                                    id:'max_stock'+page,
                                                    name:'max_stock',
                                                    value: '',
                                                    hidden:!ROLE.MaxStock,
                                                    readOnly:true,
                                                },
                                                {
                                                    xtype: 'combo',
                                                    msgTarget: 'side',
                                                    fieldLabel: 'Valuation Class',
                                                    labelWidth: 90,
                                                    width: 230,
                                                    forceSelection : false,
                                                    mode: 'remote',
                                                    triggerAction: 'all',
                                                    emptyText:'Select Valuation Clas...',
                                                    selectOnFocus:false,
                                                    margin: '3 3 3 0',
                                                    id:'valuation_class'+ page,
                                                    name:           'valuationclass',
                                                    hiddenName:     'valuation',
                                                    displayField:   'valuation',
                                                    valueField:     'valuation',
                                                    minChars : 0,
                                                    pageSize:15,
                                                    matchFieldWidth: false,
                                                    listConfig: {
                                                        loadingText: 'Searching...',
                                                        getInnerTpl: function() {
                                                            return '{valuation} <span style="font-size: xx-small; ">{valuationdesc}</span>';
                                                        }
                                                    },
                                                    store: store_valuation_class,
                                                    typeAhead: false,
                                                    allowBlank:true,
                                                    msgTarget: 'under',
                                                    listeners: {
                                                        scope: this,
                                                        scope: this,
                                                        beforequery: function(queryEvent, eOpts ,value) {
                                                            var val = isEmpty(queryEvent.query.toLowerCase());
                                                            console.log(val);
                                                            var filters = [];
                                                            if(val == false){
                                                                var ValuationClassFilter = new Ext.util.Filter({
                                                                    operator: 'like',
                                                                    value: queryEvent.query.toLowerCase(),
                                                                    property: "valuationdesc",
                                                                    type: "string",
                                                                });

                                                                filters.push(ValuationClassFilter['initialConfig']) ;
                                                            }

                                                            var CompanyCodeFilter = new Ext.util.Filter({
                                                                operator: 'eq',
                                                                value: company_code,
                                                                property: "company_code",
                                                                type: "string",
                                                            });
                                                            filters.push(CompanyCodeFilter['initialConfig']) ;
                                                            store_valuation_class.proxy.extraParams = {
                                                                filter: Ext.encode(filters),
                                                            };
                                                            store_valuation_class.reload({
                                                                params:{
                                                                    start:0,
                                                                    limit:25
                                                                }
                                                            });

                                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                                            return true;
                                                        },
                                                        change: function (t,record,o) {

                                                        }

                                                    },
                                                    value: '',
                                                    // disabled:!ROLE.ValuationClass,
                                                    readOnly:true
                                                },
                                                {
                                                    xtype: 'combo',
                                                    // msgTarget: 'side',
                                                    fieldLabel: 'Inv Contr',
                                                    labelWidth: 80,
                                                    width: 230,
                                                    forceSelection : false,
                                                    mode: 'remote',
                                                    triggerAction: 'all',
                                                    emptyText:'Select Inventory Controller ...',
                                                    selectOnFocus:false,
                                                    margin: '3 3 3 0',
                                                    id:'inv_controll'+ page,
                                                    name:           'inv_controll',
                                                    hiddenName:     'value',
                                                    displayField:   'value',
                                                    valueField:     'value',
                                                    minChars : 0,
                                                    store:          Ext.create('Ext.data.Store', {
                                                        fields : ['name', 'value'],
                                                        data   : [
                                                            {name : 'Validate',   value: 'Validate'},
                                                            {name : 'Not Validate',  value: 'Not Validate'},
                                                        ]
                                                    }),
                                                    typeAhead: false,
                                                    allowBlank:true,
                                                    msgTarget: 'under',
                                                    listeners: {
                                                        change: function (t,record,o) {

                                                        }

                                                    },
                                                    value: '',
                                                    readOnly:true
                                                    // disabled:!ROLE.InvController,
                                                },

                                                {
                                                    xtype:'textfield',
                                                    name:'inv_controll_by_id',
                                                    id:'inv_controll_by_id'+page,
                                                    hidden:true,
                                                },
                                                {
                                                    xtype:'textfield',
                                                    name:'inv_controll_date',
                                                    id:'inv_controll_date'+page,
                                                    hidden:true,
                                                },

                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border:false,
                                            margin: '0 0 0 5',
                                            items: [

                                                {
                                                    xtype: 'numberfield',
                                                    msgTarget: 'side',
                                                    fieldLabel: 'HS Code',
                                                    labelWidth: 130,
                                                    width: 270,
                                                    allowDecimals: true,
                                                    decimalPrecision: 1,
                                                    margin: '3 3 3 0',
                                                    id:'hs_code'+page,
                                                    name:'hs_code',
                                                    value: '',
                                                    // disabled:!ROLE.HSCode,
                                                    readOnly:true
                                                },
                                                {
                                                    xtype: 'combo',
                                                    msgTarget: 'side',
                                                    fieldLabel: 'Repair/Fabric',
                                                    labelWidth: 90,
                                                    width: 230,
                                                    forceSelection : true,
                                                    mode: 'remote',
                                                    triggerAction: 'all',
                                                    emptyText:'Select Repair...',
                                                    selectOnFocus:true,
                                                    margin: '3 3 3 0',
                                                    id:'repair_fabric'+ page,
                                                    name:           'repair_fabric',
                                                    hiddenName:     'repair_fabric',
                                                    displayField:   'name',
                                                    valueField:     'value',
                                                    minChars : 0,
                                                    store:          Ext.create('Ext.data.Store', {
                                                        fields : ['name', 'value'],
                                                        data   : [
                                                            {name : 'Yes', value: 'Yes'},
                                                            {name : 'No',  value: 'No'},
                                                        ]
                                                    }),
                                                    typeAhead: true,
                                                    allowBlank:true,
                                                    msgTarget: 'under',
                                                    listeners: {
                                                        change: function (t,record,o) {

                                                        }

                                                    },
                                                    value: '',
                                                    // disabled:!ROLE.RepairFabric,
                                                    readOnly:true
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    // msgTarget: 'side',
                                                    fieldLabel: 'Import Facility',
                                                    labelWidth: 90,
                                                    width: 230,
                                                    // allowDecimals: true,
                                                    // decimalPrecision: 1,
                                                    margin: '3 3 3 0',
                                                    id:'import_facility'+page,
                                                    name:'import_facility',
                                                    value: '',
                                                    // disabled:!ROLE.ImportFacility,
                                                    readOnly:true
                                                },
                                                {
                                                    xtype: 'combo',
                                                    msgTarget: 'side',
                                                    fieldLabel: 'Approver 1',
                                                    labelWidth: 80,
                                                    width: 230,
                                                    forceSelection : false,
                                                    mode: 'remote',
                                                    triggerAction: 'all',
                                                    emptyText:'Select Approver 1 ...',
                                                    selectOnFocus:true,
                                                    margin: '3 3 3 0',
                                                    id:'approver1'+ page,
                                                    name:           'approver1',
                                                    hiddenName:     'approver1',
                                                    displayField:   'value',
                                                    valueField:     'value',
                                                    minChars : 0,
                                                    store:          Ext.create('Ext.data.Store', {
                                                        fields : ['name', 'value'],
                                                        data   : [
                                                            {name : 'Validate',   value: 'Validate'},
                                                            {name : 'Not Validate',  value: 'Not Validate'},
                                                        ]
                                                    }),
                                                    typeAhead: true,
                                                    allowBlank:true,
                                                    msgTarget: 'under',
                                                    listeners: {
                                                        change: function (t,record,o) {

                                                        }

                                                    },
                                                    value: '',
                                                    // disabled:!ROLE.Approver1,
                                                    readOnly:true
                                                },
                                                {
                                                    xtype:'textfield',
                                                    name:'approver1_by_id',
                                                    id:'approver1_by_id'+page,
                                                    hidden:true,
                                                },
                                                {
                                                    xtype:'textfield',
                                                    name:'approver1_date',
                                                    id:'approver1_date'+page,
                                                    hidden:true,
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            border:false,
                                            margin: '0 0 0 5',
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    msgTarget: 'side',
                                                    fieldLabel: 'Anual Usage',
                                                    labelWidth: 130,
                                                    width: 270,
                                                    allowDecimals: true,
                                                    decimalPrecision: 1,
                                                    margin: '3 3 3 0',
                                                    id:'anual_usage'+page,
                                                    name:'anual_usage',
                                                    value: '',
                                                    // disabled:!ROLE.AnualUsage,
                                                    readOnly:true
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    msgTarget: 'side',
                                                    fieldLabel: 'Lead Time',
                                                    labelWidth: 90,
                                                    width: 230,
                                                    allowDecimals: true,
                                                    decimalPrecision: 1,
                                                    margin: '3 3 3 0',
                                                    id:'lead_time'+page,
                                                    name:'lead_time',
                                                    value: '',
                                                    // disabled:!ROLE.LeadTime,
                                                    readOnly:true
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    // msgTarget: 'side',
                                                    fieldLabel: '1 Orde Qty',
                                                    labelWidth: 90,
                                                    width: 230,
                                                    allowDecimals: true,
                                                    decimalPrecision: 1,
                                                    margin: '3 3 3 0',
                                                    id:'firstorderqty'+page,
                                                    name:'firstorderqty',
                                                    value: '',
                                                    // disabled:!ROLE.FirstOrderQty,
                                                    readOnly:true
                                                },
                                                {
                                                    xtype: 'combo',
                                                    msgTarget: 'side',
                                                    fieldLabel: 'Approver 2',
                                                    labelWidth: 80,
                                                    width: 230,
                                                    forceSelection : true,
                                                    mode: 'remote',
                                                    triggerAction: 'all',
                                                    emptyText:'Select Approver 2 ...',
                                                    selectOnFocus:true,
                                                    margin: '3 3 3 0',
                                                    id:'approver2'+ page,
                                                    name:           'approver2',
                                                    hiddenName:     'approver2',
                                                    displayField:   'value',
                                                    valueField:     'value',
                                                    minChars : 0,
                                                    store:          Ext.create('Ext.data.Store', {
                                                        fields : ['name', 'value'],
                                                        data   : [
                                                            {name : 'Validate',   value: 'Validate'},
                                                            {name : 'Not Validate',  value: 'Not Validate'},
                                                        ]
                                                    }),
                                                    typeAhead: true,
                                                    allowBlank:true,
                                                    msgTarget: 'under',
                                                    listeners: {
                                                        change: function (t,record,o) {

                                                        }

                                                    },
                                                    value: '',
                                                    // disabled:!ROLE.Approver2,
                                                    readOnly:true
                                                },
                                                {
                                                    xtype:'textfield',
                                                    name:'approver2_by_id',
                                                    id:'approver2_by_id'+page,
                                                    hidden:true,
                                                },
                                                {
                                                    xtype:'textfield',
                                                    name:'approver2_date',
                                                    id:'approver2_date'+page,
                                                    hidden:true,
                                                },

                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            margin: '0 0 0 5',
                                            border:false,
                                            items: [
                                                {
                                                    xtype: 'numberfield',
                                                    // msgTarget: 'side',
                                                    fieldLabel: 'Unit Price',
                                                    labelWidth: 130,
                                                    width: 270,
                                                    allowDecimals: true,
                                                    decimalPrecision:2,
                                                    decimalSeparator: '.',
                                                    currencySymbol: '' ,
                                                    margin: '3 3 3 0',
                                                    id:'unit_price'+page,
                                                    name:'unit_price',
                                                    value: '',
                                                    // disabled:!ROLE.UnitPrice,
                                                    readOnly:true,
                                                    enableKeyEvents: true,
                                                    useThousandSeparator: true,
                                                    thousandSeparator: ',',
                                                    alwaysDisplayDecimals: false,
                                                    align:'right',
                                                    listeners:{
                                                        keyup: function(field){
                                                            // var val = Ext.util.Format.number(field.value, '0,000.00')
                                                            // Ext.getCmp('unit_price'+page).setValue(val);
                                                            // console.log(field.value)
                                                            // alert(field)
                                                        }
                                                    }
                                                    // renderer:Ext.util.Format.number(value, '0,000.00');
                                                    /*renderer: function (value) {
                                                     alert(value);
                                                     return Ext.util.Format.number(value, '0,000.00'); ;
                                                     }*/
                                                },

                                                {
                                                    xtype: 'combo',
                                                    // msgTarget: 'side',
                                                    fieldLabel: 'Currency',
                                                    labelWidth: 90,
                                                    width: 230,
                                                    allowDecimals: true,
                                                    decimalPrecision: 1,
                                                    margin: '3 3 3 0',
                                                    id:'currency'+ page,
                                                    name:           'currency',
                                                    hiddenName:     'code',
                                                    displayField:   'code',
                                                    valueField:     'code',
                                                    minChars : 0,
                                                    pageSize:15,
                                                    matchFieldWidth: false,
                                                    listConfig: {
                                                        loadingText: 'Searching...',
                                                        getInnerTpl: function() {
                                                            return '{code} <span style="font-size: xx-small; ">{entity_code_name}</span>';
                                                        }
                                                    },
                                                    store: store_currency,
                                                    typeAhead: false,
                                                    allowBlank:true,
                                                    msgTarget: 'under',
                                                    listeners: {
                                                        scope: this,
                                                        beforequery: function(queryEvent, eOpts ,value) {
                                                            var filters = [];
                                                            var entity_name = new Ext.util.Filter({
                                                                operator: 'eq',
                                                                value: 'currency',
                                                                property: "entity_name",
                                                                type: "string",
                                                            });
                                                            filters.push(entity_name['initialConfig']) ;

                                                            var CurrencyFilter = new Ext.util.Filter({
                                                                operator: 'like',
                                                                value: queryEvent.query.toLowerCase(),
                                                                property: "entity_code_name",
                                                                type: "string",
                                                            });
                                                            if(queryEvent.query.toLowerCase()){
                                                                filters.push(CurrencyFilter['initialConfig']) ;
                                                            }
                                                            store_currency.proxy.extraParams = {
                                                                filter: Ext.encode(filters),
                                                                action :'getEntity'
                                                            };

                                                            store_currency.reload({
                                                                params:{
                                                                    start:0,
                                                                    limit:25
                                                                }
                                                            });
                                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                                            return true;
                                                        },
                                                        change: function (t,record,o) {

                                                        }

                                                    },
                                                    value: '',
                                                    // disabled:!ROLE.Currency,
                                                    readOnly:true
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    msgTarget: 'side',
                                                    fieldLabel: 'Lot Size',
                                                    labelWidth: 90,
                                                    width: 230,
                                                    allowDecimals: true,
                                                    margin: '3 3 3 0',
                                                    id:'lot_size'+page,
                                                    name:'lot_size',
                                                    value: '',
                                                    // disabled:!ROLE.LotSize,
                                                    readOnly:true
                                                },
                                                {
                                                    xtype: 'combo',
                                                    msgTarget: 'side',
                                                    fieldLabel: 'Approver 3',
                                                    labelWidth: 80,
                                                    width: 230,
                                                    forceSelection : true,
                                                    mode: 'remote',
                                                    triggerAction: 'all',
                                                    emptyText:'Select Approver 3 ...',
                                                    selectOnFocus:true,
                                                    margin: '3 3 3 0',
                                                    id:'approver3'+ page,
                                                    name:           'approver3',
                                                    hiddenName:     'approver3',
                                                    displayField:   'value',
                                                    valueField:     'value',
                                                    minChars : 0,
                                                    store:          Ext.create('Ext.data.Store', {
                                                        fields : ['name', 'value'],
                                                        data   : [
                                                            {name : 'Validate',   value: 'Validate'},
                                                            {name : 'Not Validate',  value: 'Not Validate'},
                                                        ]
                                                    }),
                                                    typeAhead: true,
                                                    allowBlank:true,
                                                    msgTarget: 'under',
                                                    listeners: {
                                                        change: function (t,record,o) {

                                                        }

                                                    },
                                                    value: '',
                                                    // disabled:!ROLE.Approver3,
                                                    readOnly:true,
                                                    hidden:true,
                                                },
                                                {
                                                    xtype:'textfield',
                                                    name:'approver3_by_id',
                                                    id:'approver3_by_id'+page,
                                                    hidden:true,
                                                },
                                                {
                                                    xtype:'textfield',
                                                    name:'approver3_date',
                                                    id:'approver3_date'+page,
                                                    hidden:true,
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            margin: '0 0 0 5',
                                            border:false,
                                            items: [

                                                /*Ext.create('Ext.ux.NumericField',
                                                 {
                                                 fieldLabel: 'Unit Price',
                                                 labelWidth: 90,
                                                 width: 230,
                                                 decimalPrecision:2,
                                                 decimalSeparator: '.',
                                                 currencySymbol: '' ,
                                                 name:'unit_price',
                                                 allowNegative: true,
                                                 hideTrigger:false,
                                                 id:'unit_price'+page ,
                                                 value: '',
                                                 hidden:false,
                                                 }),*/
                                                {
                                                    xtype: 'numberfield',
                                                    msgTarget: 'side',
                                                    fieldLabel: 'Initial time usage',
                                                    labelWidth: 130,
                                                    width: 270,
                                                    allowDecimals: true,
                                                    decimalPrecision: 1,
                                                    margin: '3 3 3 0',
                                                    id:'initial_time_usage'+page,
                                                    name:'initial_time_usage',
                                                    value: '',
                                                    // disabled:!ROLE.InitialTimeUsage,
                                                    readOnly:true
                                                },
                                                {
                                                    xtype: 'numberfield',
                                                    // msgTarget: 'side',
                                                    fieldLabel: 'Safety Stock',
                                                    labelWidth: 90,
                                                    width: 230,
                                                    allowDecimals: true,
                                                    margin: '3 3 3 0',
                                                    id:'safety_stock'+page,
                                                    name:'safety_stock',
                                                    value: '',
                                                    // hidden:!ROLE.SafetyStock,
                                                    readOnly:true
                                                },
                                                {
                                                    xtype:'displayfield',
                                                    margin: '3 3 3 0',
                                                    width: 230,

                                                },
                                                {
                                                    xtype: 'combo',
                                                    msgTarget: 'side',
                                                    fieldLabel: 'Approver 4',
                                                    labelWidth: 80,
                                                    width: 230,
                                                    forceSelection : true,
                                                    mode: 'remote',
                                                    triggerAction: 'all',
                                                    emptyText:'Select Approver 4 ...',
                                                    selectOnFocus:true,
                                                    margin: '3 3 3 0',
                                                    id:'approver4'+ page,
                                                    name:           'approver4',
                                                    hiddenName:     'approver4',
                                                    displayField:   'value',
                                                    valueField:     'value',
                                                    minChars : 0,
                                                    store:          Ext.create('Ext.data.Store', {
                                                        fields : ['name', 'value'],
                                                        data   : [
                                                            {name : 'Validate',   value: 'Validate'},
                                                            {name : 'Not Validate',  value: 'Not Validate'},
                                                        ]
                                                    }),
                                                    typeAhead: true,
                                                    allowBlank:true,
                                                    msgTarget: 'under',
                                                    listeners: {
                                                        change: function (t,record,o) {

                                                        }

                                                    },
                                                    value: '',
                                                    // disabled:!ROLE.Approver3,
                                                    readOnly:true,
                                                    hidden:true,
                                                },
                                                {
                                                    xtype:'textfield',
                                                    name:'approver4_by_id',
                                                    id:'approver4_by_id'+page,
                                                    hidden:true,
                                                },
                                                {
                                                    xtype:'textfield',
                                                    name:'approver4_date',
                                                    id:'approver4_date'+page,
                                                    hidden:true,
                                                },

                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            margin: '0 0 0 5',
                                            border:false,
                                            items: [

                                                {
                                                    xtype: 'combo',
                                                    // msgTarget: 'side',
                                                    fieldLabel: 'Shelf Life',
                                                    labelWidth: 90,
                                                    width: 230,
                                                    allowDecimals: true,
                                                    decimalPrecision: 1,
                                                    margin: '3 3 3 0',
                                                    id:'shelflifetype'+ page,
                                                    name:           'shelflifetype',
                                                    hiddenName:     'code',
                                                    displayField:   'code',
                                                    valueField:     'code',
                                                    minChars : 0,
                                                    pageSize:15,
                                                    matchFieldWidth: false,
                                                    listConfig: {
                                                        loadingText: 'Searching...',
                                                        getInnerTpl: function() {
                                                            return '{code} <span style="font-size: xx-small; ">{entity_code_name}</span>';
                                                        }
                                                    },
                                                    store: store_shelflife,
                                                    typeAhead: false,
                                                    allowBlank:true,
                                                    msgTarget: 'under',
                                                    listeners: {
                                                        scope: this,
                                                        beforequery: function(queryEvent, eOpts ,value) {
                                                            var filters = [];
                                                            var entity_name = new Ext.util.Filter({
                                                                operator: 'eq',
                                                                value: 'shelflife',
                                                                property: "entity_name",
                                                                type: "string",
                                                            });
                                                            filters.push(entity_name['initialConfig']) ;

                                                            var ShelfLifeFilter = new Ext.util.Filter({
                                                                operator: 'like',
                                                                value: queryEvent.query.toLowerCase(),
                                                                property: "entity_code_name",
                                                                type: "string",
                                                            });
                                                            if(queryEvent.query.toLowerCase()){
                                                                filters.push(ShelfLifeFilter['initialConfig']) ;
                                                            }
                                                            store_shelflife.proxy.extraParams = {
                                                                filter: Ext.encode(filters),
                                                                action :'getEntity'
                                                            };

                                                            store_shelflife.reload({
                                                                params:{
                                                                    start:0,
                                                                    limit:25
                                                                }
                                                            });
                                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                                            return true;
                                                        },
                                                        change: function (t,record,o) {

                                                        }

                                                    },
                                                    value: '',
                                                    hidden:!ROLE.ShelfLife,
                                                    readOnly:true
                                                },

                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            margin: '0 0 0 5',
                                            border:false,
                                            items: [
                                                {
                                                    xtype: 'combo',
                                                    msgTarget: 'side',
                                                    fieldLabel: 'Hazard Type',
                                                    labelWidth: 130,
                                                    width: 270,
                                                    allowDecimals: true,
                                                    decimalPrecision: 1,
                                                    margin: '3 3 3 0',
                                                    id:'hazardtype'+page,
                                                    name:'hazardtype',
                                                    hiddenName:     'code',
                                                    displayField:   'code',
                                                    valueField:     'code',
                                                    minChars : 0,
                                                    pageSize:15,
                                                    matchFieldWidth: false,
                                                    listConfig: {
                                                        loadingText: 'Searching...',
                                                        getInnerTpl: function() {
                                                            return '{code} <span style="font-size: xx-small; ">{entity_code_name}</span>';
                                                        }
                                                    },
                                                    store: store_hazard,
                                                    typeAhead: false,
                                                    allowBlank:true,
                                                    msgTarget: 'under',
                                                    listeners: {
                                                        scope: this,
                                                        beforequery: function(queryEvent, eOpts ,value) {
                                                            var filters = [];
                                                            var entity_name = new Ext.util.Filter({
                                                                operator: 'eq',
                                                                value: 'hazard',
                                                                property: "entity_name",
                                                                type: "string",
                                                            });
                                                            filters.push(entity_name['initialConfig']) ;

                                                            var HazardFilter = new Ext.util.Filter({
                                                                operator: 'like',
                                                                value: queryEvent.query.toLowerCase(),
                                                                property: "entity_code_name",
                                                                type: "string",
                                                            });
                                                            if(queryEvent.query.toLowerCase()){
                                                                filters.push(HazardFilter['initialConfig']) ;
                                                            }
                                                            store_hazard.proxy.extraParams = {
                                                                filter: Ext.encode(filters),
                                                                action :'getEntity'
                                                            };

                                                            store_hazard.reload({
                                                                params:{
                                                                    start:0,
                                                                    limit:25
                                                                }
                                                            });

                                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                                            return true;
                                                        },
                                                        change: function (t,record,o) {

                                                        }

                                                    },
                                                    value: '',
                                                    readOnly:true,
                                                    hidden:!ROLE.Hazard,
                                                },
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            margin: '0 0 0 5',
                                            border:false,
                                            items:[
                                                {
                                                    xtype: 'displayfield',
                                                    id: 'inventory_owner'+page,
                                                    labelWidth: 130,
                                                    width: 300,
                                                    fieldLabel: 'MRP Owner',
                                                    value: ''
                                                },
                                                {
                                                    xtype:'displayfield',
                                                    margin: '3 3 3 0',
                                                    width: 230,

                                                },
                                                {
                                                    xtype:'displayfield',
                                                    margin: '3 3 3 0',
                                                    width: 202,

                                                },
                                                {
                                                    xtype: 'combo',
                                                    msgTarget: 'side',
                                                    fieldLabel: 'Approver 5',
                                                    labelWidth: 80,
                                                    width: 230,
                                                    forceSelection : true,
                                                    mode: 'remote',
                                                    triggerAction: 'all',
                                                    emptyText:'Select Approver 5 ...',
                                                    selectOnFocus:true,
                                                    margin: '3 3 3 0',
                                                    id:'approver5'+ page,
                                                    name:           'approver5',
                                                    hiddenName:     'approver5',
                                                    displayField:   'value',
                                                    valueField:     'value',
                                                    minChars : 0,
                                                    store:          Ext.create('Ext.data.Store', {
                                                        fields : ['name', 'value'],
                                                        data   : [
                                                            {name : 'Validate',   value: 'Validate'},
                                                            {name : 'Not Validate',  value: 'Not Validate'},
                                                        ]
                                                    }),
                                                    typeAhead: true,
                                                    allowBlank:true,
                                                    msgTarget: 'under',
                                                    listeners: {
                                                        change: function (t,record,o) {

                                                        }

                                                    },
                                                    value: '',
                                                    // disabled:!ROLE.Approver3,
                                                    readOnly:true,
                                                    hidden:true,
                                                },
                                                {
                                                    xtype:'textfield',
                                                    name:'approver5_by_id',
                                                    id:'approver5_by_id'+page,
                                                    hidden:true,
                                                },
                                                {
                                                    xtype:'textfield',
                                                    name:'approver5_date',
                                                    id:'approver5_date'+page,
                                                    hidden:true,
                                                },

                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            layout: 'hbox',
                                            margin: '0 0 0 5',
                                            border:false,
                                            items:[

                                                {
                                                    xtype: 'displayfield',
                                                    id: 'InventoryRibbonUser'+page,
                                                    width: 82,
                                                    value: 'USER',
                                                    style: 'text-align: center;font-color:white;font-weight: bold;',
                                                    cls:'RibbonGrey',

                                                    // hidden:true,
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    id: 'InventoryRibbonIC'+page,
                                                    width: 82,
                                                    value: 'IC',
                                                    style: 'text-align: center;font-color:white;font-weight: bold;',
                                                    cls:'RibbonGrey',
                                                    // hidden:true,
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    id: 'InventoryRibbonAPPR1'+page,
                                                    width: 82,
                                                    value: 'APPR 1',
                                                    style: 'text-align: center;font-color:white;font-weight: bold;',
                                                    cls:'RibbonGrey',
                                                    // hidden:true,
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    id: 'InventoryRibbonAPPR2'+page,
                                                    width: 82,
                                                    value: 'APPR 2',
                                                    style: 'text-align: center;font-color:white;font-weight: bold;',
                                                    cls:'RibbonGrey',
                                                    // hidden:true,
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    id: 'InventoryRibbonAPPR3'+page,
                                                    width: 82,
                                                    value: 'APPR 3',
                                                    style: 'text-align: center;font-color:white;font-weight: bold;',
                                                    cls:'RibbonGrey',
                                                    hidden:true,
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    id: 'InventoryRibbonAPPR4'+page,
                                                    width: 82,
                                                    value: 'APPR 4',
                                                    style: 'text-align: center;font-color:white;font-weight: bold;',
                                                    cls:'RibbonGrey',
                                                    hidden:true,
                                                },
                                                {
                                                    xtype: 'displayfield',
                                                    id: 'InventoryRibbonAPPR5'+page,
                                                    width: 82,
                                                    value: 'APPR 5',
                                                    style: 'text-align: center;font-color:white;font-weight: bold;',
                                                    cls:'RibbonGrey',
                                                    hidden:true,
                                                },

                                            ]
                                        }
                                    ]
                                },
                            ]
                        },

                    ]
                },

            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        // winInventoryRevision.animateTarget = 'btnMaterialViewReasonHis'+page;
                        winInventoryRevision.hide();
                    }
                }
            ],
        });
        var main_content = {
            id: MainTabId,
            ui: 'blue-panel',
            title: 'Revision '+title,
            closable: true,
            iconCls: iconCls,
            layout:'fit',
            autoHeight : true,
            border:false,
            padding : '1 1 1 1',
            items:[
                {
                    xtype:'panel',
                    layout:'border',
                    id:'MainPanel_'+MainTabId,
                    border:false,
                    items:[
                        Ext.create('Ext.panel.Panel', {
                            border:false,
                            layout: 'fit',
                            region: 'center',
                            id:'MainContentPanel_'+MainTabId,
                            items:[
                                Ext.create('Ext.tab.Panel', {
                                    id: 'ContentTabPanel_' + pageid,
                                    border: false,
                                    items:[
                                        {
                                            title :'Revision Inventory',
                                            iconCls: iconCls,
                                            border:false,
                                            layout: 'fit',
                                            items:[
                                                grid_inventoryl_request_revision_m

                                            ]
                                        }
                                    ]
                                }),

                            ]
                        }),
                    ]
                }

            ],
            bbar: [
                '-',
                {
                    xtype: 'button',
                    text: 'view notes',
                    iconCls:'browse',
                    margin: '0 0 0 10',
                    id:'btnMaterialViewNotes'+page,
                    hidden:!ROLE.ViewNotes,
                    disabled:true,
                    handler: function() {
                        winMaterialViewNotes.animateTarget = 'btnMaterialViewNotes'+page;
                        winMaterialViewNotes.setTitle("Material View Notes Catalog No."+Ext.getCmp('catalog_no'+page).getValue()),
                            winMaterialViewNotes.show();
                        var filters = [];
                        var adr_d_items_id_filter = new Ext.util.Filter({
                            operator: 'eq',
                            value: Ext.getCmp('adr_d_items_id'+page).getValue(),
                            property: "adr_d_items_id",
                            type: "string",
                        });
                        filters.push(adr_d_items_id_filter['initialConfig']) ;
                        store_view_notes.proxy.extraParams = {
                            filter: Ext.encode(filters),
                            action:'getViewNotes'
                        };
                        store_view_notes.load({
                            params:{
                                // action : 'getInc',
                                // filter: Ext.encode(filters),
                            }
                        });

                    }
                },
                {
                    xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    margin: '3 3 3 0',
                    iconCls:'accept',
                    text: 'Apply changes',
                    hidden:!ROLE.ApplyChangeInventory,
                    id:'btnInventoryApplyChanges'+page,
                    disabled:true,
                    handler: function() {
                        var plant = Ext.getCmp('plant'+page).getValue();
                        var movingtype = Ext.getCmp('movingtype'+page).getValue();
                        var stocktype = Ext.getCmp('stocktype'+page).getValue();
                        var MRPIC = Ext.getCmp('inv_controll'+page).getValue();
                        var MRPApprover1 = Ext.getCmp('approver1'+page).getValue();
                        var MRPApprover2 = Ext.getCmp('approver2'+page).getValue();
                        var MRPApprover3 = Ext.getCmp('approver3'+page).getValue();
                        var MRPApprover4 = Ext.getCmp('approver4'+page).getValue();
                        var MRPApprover5 = Ext.getCmp('approver5'+page).getValue();

                        if(isEmpty(plant) == true || isEmpty(movingtype) || isEmpty(stocktype) == true  ){
                            Ext.MessageBox.show({
                                title : 'Message',
                                msg:'Please Mandatory Check' ,
                                buttons: Ext.MessageBox.OK,
                                icon :  Ext.MessageBox.WARNING
                            });
                            return true;
                        }

                        if(user_level == "Inv Controller"){
                            if(isEmpty(MRPIC) == true ){
                                Ext.MessageBox.show({
                                    title : 'Warning',
                                    msg:'Please Select Inv Controller' ,
                                    buttons: Ext.MessageBox.OK,
                                    icon :  Ext.MessageBox.WARNING
                                });
                                return true;
                            }
                            if(MRPIC == "Not Validate" ){
                                Ext.getCmp('inv_controll'+page).clearValue();
                                Ext.getCmp('status_user'+page).setValue("0");
                            }
                        }

                        if(user_level == "Approver 1"){
                            if(isEmpty(MRPApprover1) == true ){
                                Ext.MessageBox.show({
                                    title : 'Warning',
                                    msg:'Please Select Approver 1' ,
                                    buttons: Ext.MessageBox.OK,
                                    icon :  Ext.MessageBox.WARNING
                                });
                                return true;
                            }
                            if(MRPApprover1 == "Not Validate" ){
                                Ext.getCmp('approver1'+page).clearValue();
                                Ext.getCmp('inv_controll'+page).clearValue();
                            }
                        }
                        if(user_level == "Approver 2"){
                            if(isEmpty(MRPApprover2) == true ){
                                Ext.MessageBox.show({
                                    title : 'Warning',
                                    msg:'Please Select Approver 2' ,
                                    buttons: Ext.MessageBox.OK,
                                    icon :  Ext.MessageBox.WARNING
                                });
                                return true;
                            }
                            if(MRPApprover2 == "Not Validate" ){
                                Ext.getCmp('approver1'+page).clearValue();
                                Ext.getCmp('approver2'+page).clearValue();
                            }
                        }
                        if(user_level == "Approver 3"){
                            if(isEmpty(MRPApprover3) == true ){
                                Ext.MessageBox.show({
                                    title : 'Warning',
                                    msg:'Please Select Approver 3' ,
                                    buttons: Ext.MessageBox.OK,
                                    icon :  Ext.MessageBox.WARNING
                                });
                                return true;
                            }
                            if(MRPApprover3 == "Not Validate" ){
                                Ext.getCmp('approver2'+page).clearValue();
                                Ext.getCmp('approver3'+page).clearValue();
                            }
                        }
                        if(user_level == "Approver 4"){
                            if(isEmpty(MRPApprover4) == true ){
                                Ext.MessageBox.show({
                                    title : 'Warning',
                                    msg:'Please Select Approver 4' ,
                                    buttons: Ext.MessageBox.OK,
                                    icon :  Ext.MessageBox.WARNING
                                });
                                return true;
                            }
                            if(MRPApprover4 == "Not Validate" ){
                                Ext.getCmp('approver3'+page).clearValue();
                                Ext.getCmp('approver4'+page).clearValue();
                            }
                        }

                        if(user_level == "Approver 5"){
                            if(isEmpty(MRPApprover5) == true ){
                                Ext.MessageBox.show({
                                    title : 'Warning',
                                    msg:'Please Select Approver 5' ,
                                    buttons: Ext.MessageBox.OK,
                                    icon :  Ext.MessageBox.WARNING
                                });
                                return true;
                            }
                            if(MRPApprover5 == "Not Validate" ){
                                Ext.getCmp('approver4'+page).clearValue();
                                Ext.getCmp('approver5'+page).clearValue();
                            }
                        }
                        Ext.MessageBox.show({
                            msg: 'Saving your data, please wait...',
                            progressText: 'Saving...',
                            width:300,
                            wait:true,
                            waitConfig: {interval:200},
                            icon:'ext-mb-download',
                            animEl: 'buttonID'
                        });
                        var form_inventoryl_plant = Ext.getCmp('formMRPRevision'+pageid);
                        form_inventoryl_plant.form.submit({
                            scope:this,
                            url: '/SaveInventory',
                            method: 'POST',
                            dataType: 'html',
                            params:{
                                _token : csrf_token,
                            },
                            success:function(response, request){
                                var plant = Ext.getCmp("plant"+page).getValue();
                                SearchMaterialCatalogNo();
                                if(isEmpty(plant) == false){
                                    Ext.getCmp("plant"+page).setValue(plant);
                                    CheckMaterialMRP(plant);
                                }

                                Ext.MessageBox.hide();

                                Ext.MessageBox.show(
                                    {
                                        title : 'Message',
                                        msg:'Process Successfully !' ,
                                        buttons: Ext.MessageBox.OK,
                                        icon :  Ext.MessageBox.INFO
                                    }
                                );

                            },
                            failure:function(response, request){
                                if(typeof request.response != 'undefined')
                                    var mess = request.response.responseText;
                                else
                                    var mess = 'Fields marked in red can not be blank !' ;
                                Ext.MessageBox.show(
                                    {
                                        title: 'Message',
                                        msg: mess,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                    }
                                );

                            },
                        });
                    }
                }
            ],
            listeners:{


                destroy:function(){
                    // // ==================================================================
                    // // Revision
                    // // ==================================================================
                    winInventoryRevision = Ext.getCmp('winInventoryRevision'+page);
                    if (winInventoryRevision){
                        winInventoryRevision.destroy();
                    }

                }
            }

        }

        OpenTab(main_content,MainTabId);
        Ext.getCmp('mainpanel').body.unmask();



    }
});
