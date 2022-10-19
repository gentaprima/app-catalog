valid_script = true;
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
// Random Karakter
        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        }

        var chartran = '0123456789';

        var chartranCol = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        /*Characteristics Value*/
        var model_characteristic_nvalue = Ext.define('model_characteristic_nvalue', {
            extend: 'Ext.data.Model',
            // fields: ['group_header','group_class_name', 'groupclass', 'name']
        });

        var store_characteristics_nvalue = Ext.create('Ext.data.Store', {
            id: 'store_characteristics_nvalue'+page,
            model: model_characteristic_nvalue,
            // groupField: 'group_header',
            proxy: {
                type: 'ajax',
                // url: 'cb_groupclass.php?',
                url: '/getIncCharacteristicsValue',
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
                    property : 'inc_characteristics_id',
                    direction: 'ASC'
                }
            ],
            listeners: {
                'beforeload': function(store) {
                    // store.proxy.extraParams.cb_groupclass = '';
                }
            }
        });

        store_characteristics_nvalue.load({
            params:{
                start:0,
                limit:25
            }
        });

//COMBOBOX GROUPCLASS
        var model_groupclass_m = Ext.define('model_groupclass_m', {
            extend: 'Ext.data.Model',
            fields: ['group_header','group_class_name', 'groupclass', 'name']
        });

        var store_groupclass_m = Ext.create('Ext.data.Store', {
            id: 'store_groupclass_m'+page,
            model: model_groupclass_m,
            groupField: 'group_header',
            proxy: {
                type: 'ajax',
                // url: 'cb_groupclass.php?',
                url: '/getMgcByInc',
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
                    property : 'groupclass',
                    direction: 'ASC'
                }
            ],
            listeners: {
                'beforeload': function(store) {
                    // store.proxy.extraParams.cb_groupclass = '';
                }
            }
        });

        var store_sgc_m = Ext.create('Ext.data.Store', {
            id: 'store_sgc_m'+page,
            model: model_groupclass_m,
            groupField: 'group_header',
            proxy: {
                type: 'ajax',
                url: '/getGroupClassM',
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
                    property : 'groupclass',
                    direction: 'ASC'
                }
            ],
            listeners: {
                'beforeload': function(store) {
                    // store.proxy.extraParams.cb_groupclass = '';
                }
            }
        });

        var model_combo_inc_m = Ext.define('model_combo_inc_m', {
            extend: 'Ext.data.Model',
            fields: ['class_inc_name','class','inc', 'description']
        });


        var store_combo_inc_m = Ext.create('Ext.data.JsonStore', {
            id:'store_combo_inc_m'+page,
            model: model_combo_inc_m,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/getIncMgc',//action=getInc
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    messageProperty: 'message',
                    rootProperty: 'data',
                    totalProperty:'total',
                    // root: 'data',

                }
            },
            sorters: [
                {
                    property : 'inc',
                    direction: 'ASC'
                }
            ],
            listeners: {
                beforeload: function(store) {

                }
            }
        });

        var model_mgc_list = Ext.define('model_mgc_list', {
            extend: 'Ext.data.Model',
            fields: ['class_inc_name','class','inc', 'description']
        });


        var store_mgc_list = Ext.create('Ext.data.JsonStore', {
            id:'model_mgc_list'+page,
            model: model_mgc_list,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/getMgcByInc',//action=getInc
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    messageProperty: 'message',
                    rootProperty: 'data',
                    totalProperty:'total',
                    // root: 'data',

                }
            },
            sorters: [
                {
                    property : 'inc',
                    direction: 'ASC'
                }
            ],
            listeners: {
                beforeload: function(store) {

                }
            }
        });

        var model_characteristics_m = Ext.define('model_characteristics_m', {
            extend: 'Ext.data.Model',
            fields: ['rowid','mrcode','characteristic']
        });


        var store_characteristics_m = Ext.create('Ext.data.JsonStore', {
            id:'store_characteristics_m'+page,
            model: model_characteristics_m,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/getCharacteristicsM',//action=getInc
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    messageProperty: 'message',
                    rootProperty: 'data',
                    totalProperty:'total',
                    // root: 'data',

                }
            },
            listeners: {
                beforeload: function(store) {

                }
            }
        });






        // EDITOR INC
        var model_inc_m = Ext.define('model_inc_m', {
            extend: 'Ext.data.Model',
            fields: ['inc','item_name','is_active']
        });

        var store_inc_m = Ext.create('Ext.data.Store', {
            storeId: 'store_inc_m'+pageid,
            model: model_inc_m,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: false,
            groupField: 'inc',
            proxy: {
                type: 'ajax',
                url: '/getIncMDataTools',//action=getInc
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

        var editor_grid_inc_m =  Ext.create('Ext.grid.plugin.RowEditing', {
            licksToMoveEditor: 1,
            autoCancel: true,
            saveBtnText    : "Update",//My Save Button Text&quot;,
            saveBtnIcon: 'add-data',
            cancelBtnText: "Cancel", //Cancel Button Text&quot;,
            clicksToEdit: 2, //this changes from the default double-click activation to single click activation
            errorSummary: false //disables display of validation messages if the row is invalid
        });

        var grid_inc_m = Ext.create('Ext.grid.Panel', {
            title:'Result INC',
            border:false,
            region: 'center',
            store: store_inc_m,
            frame:true,
            plugins:[
                'gridfilters',
                editor_grid_inc_m
            ],
            columns: [
                {
                    text: 'INC',
                    dataIndex: 'inc',
                    autoSizeColumn:true,
                    flex: 2,
                    editor :{
                        xtype:'textfield'
                    }
                },
                {
                    text: 'Item Name',
                    dataIndex: 'item_name',
                    autoSizeColumn:true,
                    flex: 4,
                    editor :{
                        xtype:'textfield'
                    }
                },
                {
                    text: 'Status',
                    dataIndex: 'is_active',
                    autoSizeColumn:true,
                    flex: 2,
                    editor:{
                        xtype: 'combo',
                        labelWidth: 130,
                        width: 270,
                        forceSelection : true,
                        mode: 'remote',
                        triggerAction: 'all',
                        // emptyText:'Select Cataloguer...',
                        selectOnFocus:true,
                        id:'is_active'+ page,
                        name:           'is_active',
                        hiddenName:     'value',
                        displayField:   'value',
                        valueField:     'value',
                        minChars : 0,
                        store:          Ext.create('Ext.data.Store', {
                            fields : ['name', 'value'],
                            data   : [
                                {name : 'Active',   value: 'Active'},
                                {name : 'Deactive',  value: 'Deactive'},
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
                        disabled:!ROLE.IncOptional,
                    },
                    flex: 1,
                    // filter:'string',
                }
            ],
            tbar:[
                {
                    xtype:'button',
                    text: 'Add Inc',
                    iconCls: 'add-data',
                    disabled: !ROLE.AddIncService,
                    id: 'add_inc'+page,
                    hidden:!ROLE.AddIncService,
                    handler: function() {
                        winIncM.animateTarget = 'add_inc'+page;
                        winIncM.show();
                    }
                },
                {
                    xtype:'button',
                    text: 'Remove Inc',
                    iconCls: 'row-delete',
                    disabled: true,
                    id: 'remove_inc'+page,
                    hidden:!ROLE.RemoveIncService,
                    handler: function() {
                        var record = grid_inc_m.getSelectionModel().getSelection()[0];
                        if (record) {
                            var inc = record.data.inc;
                            Ext.Ajax.request({
                                scope:this,
                                url: '/DeleteInc',
                                method: 'POST',
                                dataType: 'html',
                                params:{
                                    _token : csrf_token,
                                    inc : inc,
                                },
                                success:function(response, request){
                                    store_inc_m.load({
                                        params:{
                                            start:0,
                                            limit:25
                                        }
                                    });

                                    Ext.MessageBox.show({
                                        title: 'Please wait',
                                        msg: 'Loading items...',
                                        progressText: 'Initializing...',
                                        width:300,
                                        progress:true,
                                        closable:false,
                                        animateTarget: 'mb6'
                                    });
                                    // this hideous block creates the bogus progress
                                    var f = function(v){
                                        return function(){
                                            if(v == 12){
                                                Ext.MessageBox.hide();
                                                Ext.MessageBox.show(
                                                    {
                                                        title : 'Message',
                                                        msg:'Process Successfully !' ,
                                                        buttons: Ext.MessageBox.OK,
                                                        icon :  Ext.MessageBox.INFO
                                                    }
                                                );
                                                removeData = [];
                                            }else{
                                                var i = v/11;
                                                Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% completed');
                                            }
                                        };
                                    };
                                    for(var i = 1; i < 13; i++){
                                        setTimeout(f(i), i*50);
                                    }
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
                            // store_inc_characteristics.remove(selection);
                        }
                    }
                },
            ],
            bbar:[
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_inc_m,
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
                    // console.log(record);
                    Ext.getCmp('detail_inc_m_id'+page).setValue(record.data.id);
                    Ext.getCmp('detail_inc'+page).setValue(record.data.inc);
                    Ext.getCmp('detail_item_name'+page).setValue(record.data.item_name);
                    Ext.getCmp('detail_short_name_code'+page).setValue(record.data.short_name_code);
                    Ext.getCmp('detail_decription'+page).setValue(record.data.description);
                    // INC
                    Ext.getCmp('remove_inc'+page).setDisabled(false);

                    // Char
                    Ext.getCmp('add_char'+page).setDisabled(false);
                    Ext.getCmp('remove_char'+page).setDisabled(false);
                    //
                    // Colloquial Name
                    Ext.getCmp('add_cn'+page).setDisabled(false);
                    Ext.getCmp('remove_cn'+page).setDisabled(false);

                    var filters = [];
                    var inc_filter = new Ext.util.Filter({
                        operator: 'eq',
                        value: record.data.inc,
                        property: "inc",
                        type: "string",
                    });
                    filters.push(inc_filter['initialConfig']) ;

                    store_mgc_list.proxy.extraParams = {
                        _token: csrf_token,
                        filter: Ext.encode(filters),
                        // action:'getIncImages'
                    }

                    store_mgc_list.reload({
                        params:{
                            start:0,
                            limit:25
                        },
                        callback : function(records, operation, success) {
                            if (success) {
                                var record = records[0];
                                if (store_mgc_list.getCount() > 0) {
                                    var mgc_list = [];
                                    store_mgc_list.each(function(rec) {
                                        // console.log(rec);
                                        mgc_list.push(rec.data.groupclass);
                                    });
                                    var mgcList = mgc_list.join(',');
                                    Ext.getCmp('mgc_list'+page).setValue(mgcList);
                                }
                            }
                        }
                    });

                    /**/

                    // console.log(mgcList);

                    store_inc_images.proxy.extraParams = {
                        filter: Ext.encode(filters),
                        // action:'getIncImages'
                    };
                    store_inc_images.load({
                        params:{
                            start:0,
                            limit:1
                        }
                    });

                    var filters = [];
                    var inc_filter = new Ext.util.Filter({
                        operator: 'eq',
                        value: record.data.inc,
                        property: "inc",
                        type: "string",
                    });
                    filters.push(inc_filter['initialConfig']) ;
                    store_inc_characteristics.proxy.extraParams = {
                        // action:'getIncCharacteristics'
                    };
                    store_inc_characteristics.filter(filters);
                    store_inc_characteristics.load({
                        params:{
                            start:0,
                            limit:25,

                        }
                    });
                    store_colloquial_name.proxy.extraParams = {
                        // filter: Ext.encode(filters),
                        // action: 'SearchIncColloquialName'
                    };
                    store_colloquial_name.filter(filters);
                    store_colloquial_name.load({
                        params:{
                            start:0,
                            limit:25
                        }
                    });
                }
            }
        });

        editor_grid_inc_m.on({
            scope: this,
            beforeedit: function(roweditor, context) {
            },
            afteredit: function(roweditor, context) {
                var row = grid_inc_m.getSelectionModel().getSelection()[0];
                var data = [] ;
                data.push(Ext.encode(row.data));
                Ext.Ajax.request({
                    scope:this,
                    url: 'SaveIncItem',
                    method: 'POST',
                    dataType: 'html',
                    params:{
                        _token : csrf_token,
                        data_items :'['+data+']',
                    },
                    success:function(response, request){
                        var filters = [];
                        var inc_filter = new Ext.util.Filter({
                            operator: 'eq',
                            value: 'Service',
                            property: "transaction_type",
                            type: "string",
                        });
                        filters.push(inc_filter['initialConfig']) ;
                        store_inc_m.proxy.extraParams = {
                            // filter: Ext.encode(filters),
                            action: 'getIncM'
                        };
                        store_inc_m.filter(filters);
                        store_inc_m.load({
                            params:{
                                start:0,
                                limit:25
                            }
                        });

                        Ext.MessageBox.show({
                            title: 'Please wait',
                            msg: 'Loading items...',
                            progressText: 'Initializing...',
                            width:300,
                            progress:true,
                            closable:false,
                            animateTarget: 'mb6'
                        });
                        // this hideous block creates the bogus progress
                        var f = function(v){
                            return function(){
                                if(v == 12){
                                    Ext.MessageBox.hide();
                                    Ext.MessageBox.show(
                                        {
                                            title : 'Message',
                                            msg:'Process Successfully !' ,
                                            buttons: Ext.MessageBox.OK,
                                            icon :  Ext.MessageBox.INFO
                                        }
                                    );
                                    Ext.getCmp('inc'+page).reset();
                                    store_combo_inc_m.reload();
                                    removeData = [];
                                }else{
                                    var i = v/11;
                                    Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% completed');
                                }
                            };
                        };
                        for(var i = 1; i < 13; i++){
                            setTimeout(f(i), i*50);
                        }
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
            },
            canceledit : function(){
                if (grid_inc_m.getSelectionModel().hasSelection()) {
                    var row = grid_inc_m.getSelectionModel().getSelection()[0];
                }
                // Reload if cancel
                var filters = [];
                var inc_filter = new Ext.util.Filter({
                    operator: 'eq',
                    value: 'Service',
                    property: "transaction_type",
                    type: "string",
                });
                filters.push(inc_filter['initialConfig']) ;
                store_inc_m.proxy.extraParams = {
                    // filter: Ext.encode(filters),
                    action: 'getIncM'
                };
                store_inc_m.filter(filters);
                store_inc_m.load({
                    params:{
                        start:0,
                        limit:25
                    }
                });
            }
        });
        
        var winIncM = Ext.widget('window', {
            // title: 'Form Inc',//+ ,
            header:false,
            id:'winIncM'+page,
            layout       : 'fit',
            constrain    : true,
            width: 450,
            height: 300,
            // x: 50,
            // y: 50,
            plain: false,
            // bodyPadding  : '5 5 0',
            border       : false,
            resizable    : false,
            modal        : true,
            autoShow     : false,
            defaultFocus : 'nome',
            buttonAlign : 'right',
            closable: false,
            items: [
                {
                    xtype:'form',
                    id:'formIncM'+page,
                    title: 'INC Detail',
                    frame:true,
                    collapsible: false,
                    defaults: {
                        labelWidth: 40
                    },
                    // margin: '0 3 3 3',
                    flex: 3,
                    border:false,
                    layout: {
                        type: 'anchor',
                        pack: 'start',
                        align: 'stretch',
                        frame:false,
                    },
                    items:[
                        {
                            xtype: 'textfield',
                            // id: 'detail_inc_m_id'+page,
                            fieldLabel: 'Inc M Id',
                            width: 150,
                            editable: false,
                            value: '',
                            hidden:true,
                        },
                        {
                            xtype: 'textfield',
                            // id: 'detail_inc'+page,
                            fieldLabel: 'INC',
                            name:'inc',
                            anchor: '30%',
                            editable: true,
                            value: '',
                            maxLength:9,
                        },
                        {
                            xtype: 'textfield',
                            // id: 'detail_item_name'+page,
                            fieldLabel: 'Name Code',
                            name:'inc_name',
                            width: '100%',
                            editable: true,
                            value: ''
                        },
                        {
                            xtype: 'textfield',
                            // id: 'detail_item_name'+page,
                            fieldLabel: 'Short Name',
                            name:'short_name_code',
                            width: '100%',
                            editable: true,
                            value: ''
                        },
                        {
                            xtype: 'textarea',
                            // id: 'detail_decription'+page,
                            fieldLabel: 'Desc.',
                            name:'description',
                            width: '100%',
                            height: 80,
                            editable: true,
                            value: ''
                        },
                        {
                            xtype: 'tagfield',
                            fieldLabel:'MGC',
                            anchor: '100%',
                            matchFieldWidth: false,
                            forceSelection: false,
                            name: 'groupclass[]',
                            displayField: 'groupclass',
                            valueField: 'groupclass',
                            store: store_sgc_m,
                            pageSize: 15,
                            minChars : 0,
                            disabled:false,
                            forceSelection: false,
                            mode: 'remote',
                            triggerAction: 'all',
                            emptyText: 'Select MGC ...',
                            selectOnFocus: true,
                            id:'mgc_entry'+page,
                            listConfig: {
                                loadingText: 'Searching...',
                                emptyText: 'No matching data found!',
                                getInnerTpl: function() {
                                    return '{group_class_name}';
                                }
                            },
                            multiSelect: true,
                            listeners: {
                                scope: this,
                                beforequery: function(queryEvent, eOpts ,value) {
                                    var filters = [];
                                    var transaction_type = new Ext.util.Filter({
                                        operator: 'eq',
                                        value: 'Service',
                                        property: "transaction_type",
                                        type: "string",
                                    });

                                    filters.push(transaction_type['initialConfig']) ;
                                    var groupclass_filter = new Ext.util.Filter({
                                        operator: 'like',
                                        value: queryEvent.query.toLowerCase(),
                                        property: "group_class_name",
                                        type: "string",
                                    });
                                    if(queryEvent.query.toLowerCase()){
                                        filters.push(groupclass_filter['initialConfig']) ;
                                    }
                                    store_sgc_m.proxy.extraParams = {
                                        filter: Ext.encode(filters),
                                    };
                                    store_sgc_m.load();
                                    Ext.Ajax.abortAll(); //cancel any previous requests
                                    return true;
                                },
                                select: function (combo , record ,o) {
                                    var matching = store_groupclass_m.queryBy(
                                        function(rec, id) {

                                            if (rec.data.groupclass == record.data.groupclass) {

                                            }
                                        }
                                    );

                                },
                            },
                            allowBlank:true,
                            value: '',
                            // readOnly:true,
                            // hidden:!ROLE.MGC
                        },
                    ],
                    tools: [
                        {
                            type: 'close',
                            handler: function () {
                                // frmEFakturRequestShow.animateTarget = 'AddDataM'+page;
                                winIncM.hide();
                            }
                        }
                    ],
                },
            ],
            buttons: [
                {
                    text: 'Reset',
                    iconCls: 'clear',
                    handler: function() {
                        Ext.getCmp('formIncM'+page).getForm().reset();
                    }
                },
                {
                    text: 'Save',
                    iconCls: 'icon-save',
                    handler: function() {
                        Ext.getCmp('formIncM'+page).form.submit({
                            scope:this,
                            url: 'SaveIncM',
                            method: 'POST',
                            dataType: 'json',
                            params:{
                                _token : csrf_token,
                                transaction_type : 'Service',
                            },
                            success:function(response, request){
                                Ext.MessageBox.show({
                                    title: 'Please wait',
                                    msg: 'Loading items...',
                                    progressText: 'Initializing...',
                                    width:300,
                                    progress:true,
                                    closable:false,
                                    animateTarget: 'mb6'
                                });
                                // this hideous block creates the bogus progress
                                var f = function(v){
                                    return function(){
                                        if(v == 12){
                                            Ext.MessageBox.hide();
                                            Ext.MessageBox.show(
                                                {
                                                    title : 'Message',
                                                    msg:'Process Successfully !' ,
                                                    buttons: Ext.MessageBox.OK,
                                                    icon :  Ext.MessageBox.INFO
                                                }
                                            );
                                            removeData = [];
                                        }else{
                                            var i = v/11;
                                            Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% completed');
                                        }
                                    };
                                };
                                for(var i = 1; i < 13; i++){
                                    setTimeout(f(i), i*50);
                                }
                                Ext.getCmp('formIncM'+page).reset();
                                winIncM.hide();
                                // store_inc_images.reload();
                                // winDetailIncImages.hide();
                                // Ext.getCmp('inc_images_description'+page).reset();
                                // Ext.getCmp('images_path'+page).reset();
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
            ]
            
        });
        var winCharacteristicValue = Ext.widget('window', {
            title: 'Characteristics Value',//+ ,
            id:'winCharacteristicValue'+page,
            layout       : 'fit',
            constrain    : true,
            // height       : 500,
            // width        : 650,
            width: 450,
            height: 300,
            // x: 50,
            // y: 50,
            plain: true,
            bodyPadding  : '5 5 0',
            border       : false,
            resizable    : false,
            modal        : true,
            autoShow     : false,
            defaultFocus : 'nome',
            buttonAlign : 'right',
            closable: false,
            // items :[form_search_efaktur],
            items: [
                {
                    xtype:'gridpanel',
                    title:'Value',
                    border:false,
                    region: 'center',
                    store: store_characteristics_nvalue,
                    frame:true,
                    columns: [
                        {
                            header: 'Value',
                            dataIndex: 'nvalue',
                            flex: 1
                        },
                    ],
                    bbar:[
                        Ext.create('Ext.PagingToolbar', {
                            border:false,
                            store: store_characteristics_nvalue,
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
                        itemclick: function(grid, record, item, index, e) {

                        }
                    }
                }
                // grid_inc_characteristics_value
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        // frmEFakturRequestShow.animateTarget = 'AddDataM'+page;
                        winCharacteristicValue.hide();
                    }
                }
            ],
        });

        var selectedValue;
        Ext.define('Init', {
            // selectedValue : '',
        });

        var grid_inc_characteristics_value = Ext.create('Ext.grid.Panel', {
            title:'Value',
            border:false,
            region: 'center',
            store: store_characteristics_nvalue,
            frame:true,
            columns: [
                {
                    header: 'Value',
                    dataIndex: 'nvalue',
                    flex: 1
                },
            ],
            bbar:[
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_characteristics_nvalue,
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
                itemclick: function(grid, record, item, index, e) {

                }
            }
        });

        var model_inc_characteristics = Ext.define('model_inc_characteristics', {
            extend: 'Ext.data.Model',
            fields: [
                'flag',
                'inc_m_id',
                'inc',
                'sequence',
                'sequence_old',
                'characteristics_m_id',
                'mrcode',
                'characteristics',
                'type']
        });

        var store_inc_characteristics = Ext.create('Ext.data.Store', {
            storeId: 'store_inc_characteristics',
            model: model_inc_characteristics,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/getIncCharacteristicsM',//action=getInc
                method: 'GET',
                reader: {
                    type: 'json',
                    keepRawData: true,
                    successProperty: 'success',
                    messageProperty: 'message',
                    rootProperty: 'data',
                    totalProperty:'total',
                }
            },
            listeners: {
                beforeload: function(store) {

                }
            },
            sorters: [{
                property: 'sequence',
                direction: 'ASC'
            }],

        });

        var editor_inc_characteristic =  Ext.create('Ext.grid.plugin.RowEditing', {
            licksToMoveEditor: 1,
            autoCancel: true,
            saveBtnText    : "Update",
            saveBtnIcon: 'add-data',
            cancelBtnText: "Cancel",
            clicksToEdit: 2,
            errorSummary: false,
            listeners: {
                cancelEdit: function(rowEditing, context) {
                    // Canceling editing of a locally added, unsaved record: remove it
                    if (context.record.phantom) {
                        store_inc_characteristics.remove(context.record);
                    }
                },
                afteredit: function(roweditor, context) {
                    Ext.MessageBox.show({
                        title: 'Please wait',
                        msg: 'Loading items...',
                        progressText: 'Initializing...',
                        width:300,
                        progress:true,
                        closable:false,
                        animateTarget: 'mb6'
                    });
                    var row = grid_inc_characteristic.getSelectionModel().getSelection()[0];
                    var data = [] ;
                    data.push(Ext.encode(row.data));
                    Ext.Ajax.request({
                        scope:this,
                        url: '/SaveIncCharacteristics',
                        method: 'POST',
                        dataType: 'json',
                        params:{
                            _token : csrf_token,
                            data_items :'['+data+']',
                        },
                        success:function(response, request){
                            // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                            var filters = [];
                            var inc_filter = new Ext.util.Filter({
                                operator: 'eq',
                                value: Ext.getCmp('detail_inc'+page).getValue(),
                                property: "inc",
                                type: "string",
                            });
                            filters.push(inc_filter['initialConfig']) ;
                            store_inc_characteristics.proxy.extraParams = {
                                filter: Ext.encode(filters),
                                action:'getIncCharacteristics'
                            };
                            store_inc_characteristics.load({
                                params:{
                                    start:0,
                                    limit:25
                                }
                            });
                            Ext.MessageBox.hide();
                            Ext.MessageBox.show(
                                {
                                    title : 'Message',
                                    msg:'Process Successfully !' ,
                                    buttons: Ext.MessageBox.OK,
                                    icon :  Ext.MessageBox.INFO
                                }
                            );

                            // this hideous block creates the bogus progress
                            /*var f = function(v){
                             return function(){
                             if(v == 12){

                             removeData = [];
                             }else{
                             var i = v/11;
                             Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% completed');
                             }
                             };
                             };
                             for(var i = 1; i < 13; i++){
                             setTimeout(f(i), i*50);
                             }*/
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

        });

        var grid_inc_characteristic = Ext.create('Ext.grid.Panel', {
            title:'Inc Characteristics',
            border:false,
            region: 'center',
            store: store_inc_characteristics,
            frame:true,
            plugins:[
                'gridfilters',
                editor_inc_characteristic
            ],
            columns: [
                {
                    header: 'No. ',
                    dataIndex: 'sequence',
                    autoSizeColumn:true,
                    flex: 1,
                    editor: {
                        xtype: 'numberfield',
                        id: 'sequence'+page,
                        disabled:!ROLE.EditCharacteristic,
                        allowBlank: true,
                        allowDecimals: false,
                    }
                },
                {
                    header: 'Characteristic',
                    dataIndex: 'mrcode_characteristic',
                    autoSizeColumn:true,
                    flex: 4,
                    filter:'string',
                    editor: {
                        xtype: 'combo',
                        id: 'combo_characteristic'+page,
                        allowBlank: true,
                        store: store_characteristics_m,
                        matchFieldWidth: false,
                        forceSelection: false,
                        editable:true,
                        selectOnFocus:true,
                        minChars : 0,
                        pageSize:15,
                        displayField: 'mrcode_characteristic',
                        valueField: 'mrcode_characteristic',
                        listConfig: {
                            getInnerTpl: function() {
                                return '{characteristics_m_id} <span style=" ">{mrcode_characteristic}</span>';//font-size: xx-small;
                            }
                        },
                        listeners: {
                            beforequery: function(queryEvent, eOpts ,value) {
                                var filters = [];
                                var characteristic_filter = new Ext.util.Filter({
                                    operator: 'like',
                                    value: queryEvent.query.toLowerCase(),
                                    property: "mrcode_characteristic",
                                    type: "string",
                                });
                                if(queryEvent.query.toLowerCase()){
                                    filters.push(characteristic_filter['initialConfig']) ;
                                }
                                var transaction_type_filter = new Ext.util.Filter({
                                    operator: 'eq',
                                    value: 'Service',
                                    property: "transaction_type",
                                    type: "string",
                                });
                                
                                filters.push(transaction_type_filter['initialConfig']) ;
                                store_characteristics_m.proxy.extraParams = {
                                    filter: Ext.encode(filters),

                                };
                                Ext.Ajax.abortAll(); //cancel any previous requests
                                return true;
                            },
                            change: function() {

                            },
                            select: function(combo, record) {
                                var matching = store_characteristics_m.queryBy(
                                    function(rec, id) {
                                        if (rec.data.mrcode_characteristic == record.data.mrcode_characteristic) {
                                            // console.log(rec.data.mrcode);
                                            Ext.getCmp('inc_char_mrcode'+page).setValue(rec.data.mrcode);
                                            Ext.getCmp('characteristics_m_id'+page).setValue(rec.data.id);
                                            Ext.getCmp('characteristics'+page).setValue(rec.data.characteristic);
                                        }
                                    }
                                );

                                // var sel_model_ncs_char = Ext.getCmp('ncs_inc_char_grid').getSelectionModel();
                                // var record_ncs_char = sel_model_ncs_char.getSelection()[0];

                                // record_ncs_char.set("promt_id", record.data.promt_id);
                            }
                        },
                        minChars: 0,
                        // queryParam: 'cb_char',
                        queryMode: 'remote',
                        disabled:!ROLE.EditCharacteristic,
                        readOnly:false,
                    }
                },
                {
                    xtype      : 'actioncolumn',
                    header      : 'Value',
                    align     : 'center',
                    sortable  : false,
                    hideable  : false,
                    resizable : false,
                    draggable : false,
                    dataIndex : 'ativo',
                    width     : 80,
                    items     : [
                        {
                            getClass: function(v, meta, rec) {
                                // return rec.get('ativo') == 1 ? 'icon-btn-enabled' : 'icon-btn-disabled';
                                return 'icon-btn-enabled';
                            },
                            // listeners:function(){

                            // }
                        }
                    ],
                    handler: function( view, rowIndex, colIndex, item, e, record, row ) {
                        // this.fireEvent( 'editaction', arguments );
                        // console.log(record);
                        var filters = [];
                        var inc_filter = new Ext.util.Filter({
                            operator: 'eq',
                            value: record.data.inc,
                            property: "inc",
                            type: "string",
                        });
                        filters.push(inc_filter['initialConfig']) ;
                        var characteristics_filter = new Ext.util.Filter({
                            operator: 'eq',
                            value: record.data.characteristics,
                            property: "characteristics",
                            type: "string",
                        });
                        filters.push(characteristics_filter['initialConfig']) ;
                        var mrcode_filter = new Ext.util.Filter({
                            operator: 'eq',
                            value: record.data.mrcode,
                            property: "mrcode",
                            type: "string",
                        });
                        filters.push(mrcode_filter['initialConfig']) ;

                        store_characteristics_nvalue.proxy.extraParams = {
                            filter: Ext.encode(filters),
                            action :'getIncCharacteristicsValue'
                        };
                        store_characteristics_nvalue.reload({
                            params:{
                                start:0,
                                limit:25
                            }
                        });

                        /*store_characteristics_nvalue.each( function (model) {
                         // var nvalue = model.get('nvalue');
                         // Ext.getCmp('nvalue'+page).setValue(nvalue);
                         // console.log( model.get('characteristics') );
                         }); */
                        // console.log(store_characteristics_nvalue.getData().items[0].data);
                        // winCharacteristicValue.animateTarget = this.id;
                        winCharacteristicValue.show();
                    }
                },
                {
                    header: 'Type',
                    dataIndex: 'type',
                    flex: 2,
                    editor: {
                        xtype: 'combo',
                        id: 'type'+page,
                        hiddenName:     'value',
                        displayField:   'name',
                        valueField:     'value',
                        minChars : 0,
                        store:          Ext.create('Ext.data.Store', {
                            fields : ['name', 'value'],
                            data   : [
                                {name : 'M - Mandatory',   value: 'M'},
                                {name : 'O - Optional',  value: 'O'},
                            ]
                        }),
                        disabled:!ROLE.EditCharacteristic,
                    }
                },
                {
                    header: 'characteristics_m_id',
                    dataIndex: 'characteristics_m_id',
                    flex: 1,
                    hidden: true,
                    hideable:false,
                    editor: {
                        xtype: 'textfield',
                        id: 'characteristics_m_id'+page,
                        // disabled:!ROLE.EditCharacteristic,
                        allowBlank: true,
                        // readOnly:false,
                    }
                },
                {
                    header: 'characteristics',
                    dataIndex: 'characteristics',
                    flex: 1,
                    hidden: true,
                    hideable:false,
                    editor: {
                        xtype: 'textfield',
                        id: 'characteristics'+page,
                        // disabled:!ROLE.EditCharacteristic,
                        allowBlank: true,
                        // readOnly:false,
                    }
                },
                {
                    text: 'id',
                    dataIndex: 'id',
                    flex: 1,
                    hidden: true,
                    hideable:false,

                },
                {
                    text: 'mrcode',
                    dataIndex: 'mrcode',
                    flex: 1,
                    hidden: true,
                    hideable:false,
                    editor: {
                        xtype: 'textfield',
                        id: 'inc_char_mrcode'+page,
                        // disabled:!ROLE.EditCharacteristic,
                        allowBlank: true,
                        // readOnly:false,
                    }
                }
            ],
            tbar:[
                {
                    xtype:'button',
                    text: 'Add Characteristic',
                    iconCls: 'add-data',
                    disabled: true,
                    id: 'add_char'+page,
                    hidden:!ROLE.AddCharacteristic,
                    handler: function() {
                        var data = [];
                        var order = 1 ;
                        var index = 0 ;
                        // var sequence = 1 ;
                        var sequence = parseInt(store_inc_characteristics.proxy.reader.rawData.sequenceMax);
                        if(sequence){
                            sequence = parseInt(store_inc_characteristics.proxy.reader.rawData.sequenceMax);
                        }else {
                            sequence = 1;
                        }
                        Ext.getCmp('sequence'+page).readOnly=false;
                        store_inc_characteristics.each(function(r,i){
                            data.push(r.data);
                            order++ ;
                            index++ ;
                        });
                        // Create a model instance
                        var r = Ext.create('model_inc_characteristics', {
                            id :'last_insert_id' ,
                            sequence : sequence,
                            inc_m_id : Ext.getCmp('detail_inc_m_id'+page).getValue(),
                            inc : Ext.getCmp('detail_inc'+page).getValue() ,
                            type: 'O',
                        });

                        store_inc_characteristics.insert(index, r);
                        editor_inc_characteristic.startEdit(r, 0);


                    }
                },
                {
                    xtype:'button',
                    text: 'Remove Characteristics',
                    iconCls: 'row-delete',
                    disabled: true,
                    id: 'remove_char'+page,
                    hidden:!ROLE.RemoveCharacteristic,
                    handler: function () {
                        Ext.MessageBox.show({
                            title: 'Please wait',
                            msg: 'Loading items...',
                            progressText: 'Initializing...',
                            width: 300,
                            progress: true,
                            closable: false,
                            animateTarget: 'mb6'
                        });
                        var record = grid_inc_characteristic.getSelectionModel().getSelection()[0];
                        if (record) {
                            var id = record.data.id;
                            Ext.Ajax.request({
                                scope: this,
                                // url : base_url+'singleview/process' ,
                                url: '/DeleteIncCharacteristics',
                                method: 'POST',
                                dataType: 'html',
                                params: {
                                    _token : csrf_token,
                                    id: id,
                                },
                                success: function (response, request) {
                                    // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                                    store_inc_characteristics.load({
                                        params: {
                                            start: 0,
                                            limit: 25
                                        }
                                    });

                                    Ext.MessageBox.hide();
                                    Ext.MessageBox.show(
                                        {
                                            title: 'Message',
                                            msg: 'Process Successfully !',
                                            buttons: Ext.MessageBox.OK,
                                            icon: Ext.MessageBox.INFO
                                        }
                                    );
                                },
                                failure: function (response, request) {
                                    if (typeof request.response != 'undefined')
                                        var mess = request.response.responseText;
                                    else
                                        var mess = 'Fields marked in red can not be blank !';
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
                            // store_inc_characteristics.remove(selection);
                        }
                    }
                }
            ],
            bbar:[
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_inc_characteristics,
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
                itemclick: function(grid, record, item, index, e) {

                }
            }
        });

        var model_colloquial_name = Ext.define('model_colloquial_name', {
            extend: 'Ext.data.Model',
            fields: ['inc','cn','colloquial_name']
        });

        var store_colloquial_name = Ext.create('Ext.data.Store', {
            storeId: 'store_colloquial_name',
            model: model_colloquial_name,
            remoteFilter:true,
            remoteSort:true,
            autoLoad: false,
            proxy: {
                type: 'ajax',
                url: '/getIncColloquialName',//action=getInc
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

        var editor_grid_colloquial_name =  Ext.create('Ext.grid.plugin.RowEditing', {
            licksToMoveEditor: 1,
            autoCancel: true,
            saveBtnText    : "Update",//My Save Button Text&quot;,
            saveBtnIcon: 'add-data',
            cancelBtnText: "Cancel", //Cancel Button Text&quot;,
            clicksToEdit: 2, //this changes from the default double-click activation to single click activation
            errorSummary: false //disables display of validation messages if the row is invalid
        });

        var grid_colloquial_name = Ext.create('Ext.grid.Panel', {
            title:'Colloquial Name',
            border:false,
            region: 'center',
            store: store_colloquial_name,
            frame:true,
            plugins:[
                'gridfilters',
                editor_grid_colloquial_name
            ],
            columns: [
                {
                    header: 'CN',
                    dataIndex: 'cn',
                    autoSizeColumn:true,
                    flex: 2,
                    editor: {
                        xtype: 'textfield',
                        id: 'cn'+page,
                        disabled:!ROLE.EditColloquialName,
                        allowBlank: true,
                        readOnly:true,
                    }
                },
                {
                    header: 'Colloquial Name',
                    dataIndex: 'colloquial_name',
                    autoSizeColumn:true,
                    flex: 4,
                    editor :{
                        xtype:'textfield',
                        disabled:!ROLE.EditColloquialName,
                    }
                },
                {
                    text: 'id',
                    dataIndex: 'id',
                    flex: 1,
                    hidden: true
                }
            ],
            tbar:[
                {
                    xtype:'button',
                    text: 'Add CN',
                    iconCls: 'add-data',
                    disabled: true,
                    id: 'add_cn'+page,
                    hidden:!ROLE.AddColloquialName,
                    handler: function() {
                        var data = [];
                        var order = 1 ;
                        var index = 0 ;
                        var str = randomString(5, chartranCol);
                        var cn = str.toUpperCase();
                        var inc = Ext.getCmp('detail_inc'+page).getValue();
                        store_colloquial_name.each(function(r,i){
                            data.push(r.data);
                            order++ ;
                            index++ ;
                        });
                        // Create a model instance
                        var r = Ext.create('model_colloquial_name', {
                            id :'insert_cn',
                            inc: inc,
                            cn : cn,
                            colloquial_name :''
                        });

                        store_colloquial_name.insert(index, r);
                        editor_grid_colloquial_name.startEdit(r, 0);

                    }
                },
                {
                    xtype:'button',
                    text: 'Remove CN',
                    iconCls: 'row-delete',
                    disabled: true,
                    id: 'remove_cn'+page,
                    hidden:!ROLE.RemoveColloquialName,
                    handler: function() {
                        var record = grid_colloquial_name.getSelectionModel().getSelection()[0];
                        if (record) {
                            var cn = record.data.cn;
                            Ext.Ajax.request({
                                scope:this,
                                // url : base_url+'singleview/process' ,
                                url: 'DeleteIncColloquialName',
                                method: 'POST',
                                dataType: 'html',
                                params:{
                                    _token : csrf_token,
                                    cn : cn,
                                },
                                success:function(response, request){
                                    // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                                    store_colloquial_name.load({
                                        params:{
                                            start:0,
                                            limit:25
                                        }
                                    });

                                    Ext.MessageBox.show({
                                        title: 'Please wait',
                                        msg: 'Loading items...',
                                        progressText: 'Initializing...',
                                        width:300,
                                        progress:true,
                                        closable:false,
                                        animateTarget: 'mb6'
                                    });
                                    // this hideous block creates the bogus progress
                                    var f = function(v){
                                        return function(){
                                            if(v == 12){
                                                Ext.MessageBox.hide();
                                                Ext.MessageBox.show(
                                                    {
                                                        title : 'Message',
                                                        msg:'Process Successfully !' ,
                                                        buttons: Ext.MessageBox.OK,
                                                        icon :  Ext.MessageBox.INFO
                                                    }
                                                );
                                                removeData = [];
                                            }else{
                                                var i = v/11;
                                                Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% completed');
                                            }
                                        };
                                    };
                                    for(var i = 1; i < 13; i++){
                                        setTimeout(f(i), i*50);
                                    }
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
                            // store_inc_characteristics.remove(selection);
                        }
                    }
                },
            ],
            bbar:[
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_colloquial_name,
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
                itemclick: function(grid, record, item, index, e) {

                }
            }
        });

        editor_grid_colloquial_name.on({
            scope: this,
            beforeedit: function(roweditor, context) {
            },
            afteredit: function(roweditor, context) {
                var row = grid_colloquial_name.getSelectionModel().getSelection()[0];
                var data = [] ;
                data.push(Ext.encode(row.data));
                Ext.Ajax.request({
                    scope:this,
                    url: 'SaveIncColloquialName',
                    method: 'POST',
                    dataType: 'json',
                    params:{
                        _token : csrf_token,
                        data_items :'['+data+']',
                    },
                    success:function(response, request){
                        var filters = [];
                        var inc_filter = new Ext.util.Filter({
                            operator: 'eq',
                            value: Ext.getCmp('detail_inc'+page).getValue(),
                            property: "inc",
                            type: "string",
                        });
                        filters.push(inc_filter['initialConfig']) ;
                        store_colloquial_name.proxy.extraParams = {
                            // filter: Ext.encode(filters),
                            // action: 'SearchIncColloquialName'
                        };
                        store_colloquial_name.filter(filters);
                        store_colloquial_name.load({
                            params:{
                                start:0,
                                limit:25
                            }
                        });

                        Ext.MessageBox.show({
                            title: 'Please wait',
                            msg: 'Loading items...',
                            progressText: 'Initializing...',
                            width:300,
                            progress:true,
                            closable:false,
                            animateTarget: 'mb6'
                        });
                        // this hideous block creates the bogus progress
                        var f = function(v){
                            return function(){
                                if(v == 12){
                                    Ext.MessageBox.hide();
                                    Ext.MessageBox.show(
                                        {
                                            title : 'Message',
                                            msg:'Process Successfully !' ,
                                            buttons: Ext.MessageBox.OK,
                                            icon :  Ext.MessageBox.INFO
                                        }
                                    );
                                    removeData = [];
                                }else{
                                    var i = v/11;
                                    Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% completed');
                                }
                            };
                        };
                        for(var i = 1; i < 13; i++){
                            setTimeout(f(i), i*50);
                        }
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
            },
            canceledit : function(){
                if (grid_colloquial_name.getSelectionModel().hasSelection()) {
                    var row = grid_colloquial_name.getSelectionModel().getSelection()[0];
                }
                // Reload if cancel
                var filters = [];
                var inc_filter = new Ext.util.Filter({
                    operator: 'eq',
                    value: Ext.getCmp('detail_inc'+page).getValue(),
                    property: "inc",
                    type: "string",
                });
                filters.push(inc_filter['initialConfig']) ;
                store_colloquial_name.proxy.extraParams = {
                    // filter: Ext.encode(filters),
                    // action: 'SearchIncColloquialName'
                };
                store_colloquial_name.filter(filters);
                store_colloquial_name.load({
                    params:{
                        start:0,
                        limit:25
                    }
                });
            }
        });

        Ext.define('ShortNameCode', {
            extend: 'Ext.form.field.Trigger',
            alias: 'widget.ShortNameCode',
            // triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
            // triggerCls:'accept',
            triggerCls:'icon-save',
            enableKeyEvents: true,
            disabled:!ROLE.EditShortNameCode,
            onTriggerClick: function() {
                Ext.Ajax.request({
                    scope:this,
                    // url : base_url+'singleview/process' ,
                    url: '/ChangeShortText',
                    method: 'POST',
                    dataType: 'html',
                    params:{
                        _token: csrf_token,
                        inc : Ext.getCmp('detail_inc'+page).getValue(),
                        short_name_code : Ext.getCmp('detail_short_name_code'+page).getValue()
                    },
                    success:function(response, request){
                        // Ext.getCmp('transaction_code'+page).setValue(request.result.transaction_code);
                        /*var filters = [];
                         var inc_filter = new Ext.util.Filter({
                         operator: 'eq',
                         value: Ext.getCmp('detail_inc'+page).getValue(),
                         property: "inc",
                         type: "string",
                         });
                         filters.push(inc_filter['initialConfig']) ;
                         store_inc_characteristics.proxy.extraParams = {
                         filter: Ext.encode(filters),
                         action:'getIncCharacteristics'
                         };
                         store_inc_characteristics.load({
                         params:{
                         start:0,
                         limit:25
                         }
                         });*/

                        Ext.MessageBox.show({
                            title: 'Please wait',
                            msg: 'Loading items...',
                            progressText: 'Initializing...',
                            width:300,
                            progress:true,
                            closable:false,
                            animateTarget: 'mb6'
                        });
                        // this hideous block creates the bogus progress
                        var f = function(v){
                            return function(){
                                if(v == 12){
                                    Ext.MessageBox.hide();
                                    Ext.MessageBox.show(
                                        {
                                            title : 'Message',
                                            msg:'Process Successfully !' ,
                                            buttons: Ext.MessageBox.OK,
                                            icon :  Ext.MessageBox.INFO
                                        }
                                    );
                                    removeData = [];
                                }else{
                                    var i = v/11;
                                    Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% completed');
                                }
                            };
                        };
                        for(var i = 1; i < 13; i++){
                            setTimeout(f(i), i*50);
                        }
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
        });

        var model_inc_images = Ext.define('model_inc_images', {
            extend: 'Ext.data.Model',
            fields: ['name','shortName', 'url']
        });

        var store_inc_images = Ext.create('Ext.data.Store', {
            id: 'store_inc_images'+page,
            model: model_inc_images,
            // groupField: 'group_header',
            proxy: {
                type: 'ajax',
                // url: 'cb_groupclass.php?',
                url: '/getIncImages',
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
                    property : 'id',
                    direction: 'ASC'
                }
            ],
            listeners: {
                'beforeload': function(store) {
                    // store.proxy.extraParams.cb_groupclass = '';
                }
            },
            pageSize:1,
        });


        var winDetailIncImages = new Ext.Window({
            // title:'Images',
            id: 'winDetailIncImages'+page,
            layout       : 'fit',
            constrain    : true,
            // height       : 500,
            // width        : 650,
            width: 450,
            height: 150,
            // x: 50,
            // y: 50,
            plain: true,
            bodyPadding  : '5 5 0',
            border       : false,
            resizable    : false,
            modal        : true,
            autoShow     : false,
            defaultFocus : 'nome',
            buttonAlign : 'right',
            closable: false,
            frame: true,
            items : [
                {
                    bodyPadding: '10 10 0',
                    xtype:'form',
                    id:'formIncImagesUplod'+page,
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'inc_images_description'+page,
                            name:'description',
                            fieldLabel: 'Description'
                        },
                        {
                            xtype: 'filefield',
                            emptyText: 'Select an image',
                            fieldLabel: 'Image',
                            name: 'images_path',
                            id:'images_path'+page,
                            buttonText: '',
                            buttonConfig: {
                                iconCls: 'upload-icon'
                            }
                        }
                    ],

                    buttons: [
                        {
                            text: 'Save',
                            handler:function(){
                                var formIncImagesUplod = Ext.getCmp('formIncImagesUplod'+page).getForm();
                                Ext.getCmp('formIncImagesUplod'+page).form.submit({
                                    scope:this,
                                    url: 'SaveIncImages',
                                    method: 'POST',
                                    dataType: 'json',
                                    params:{
                                        _token : csrf_token,
                                        inc : Ext.getCmp('detail_inc'+page).getValue(),
                                    },
                                    success:function(response, request){
                                        Ext.MessageBox.show({
                                            title: 'Please wait',
                                            msg: 'Loading items...',
                                            progressText: 'Initializing...',
                                            width:300,
                                            progress:true,
                                            closable:false,
                                            animateTarget: 'mb6'
                                        });
                                        // this hideous block creates the bogus progress
                                        var f = function(v){
                                            return function(){
                                                if(v == 12){
                                                    Ext.MessageBox.hide();
                                                    Ext.MessageBox.show(
                                                        {
                                                            title : 'Message',
                                                            msg:'Process Successfully !' ,
                                                            buttons: Ext.MessageBox.OK,
                                                            icon :  Ext.MessageBox.INFO
                                                        }
                                                    );
                                                    removeData = [];
                                                }else{
                                                    var i = v/11;
                                                    Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% completed');
                                                }
                                            };
                                        };
                                        for(var i = 1; i < 13; i++){
                                            setTimeout(f(i), i*50);
                                        }
                                        store_inc_images.reload();
                                        winDetailIncImages.hide();
                                        Ext.getCmp('inc_images_description'+page).reset();
                                        Ext.getCmp('images_path'+page).reset();
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
                        },
                    ]
                },
            ],
            tools: [
                {
                    type: 'close',
                    handler: function () {
                        winDetailIncImages.hide();
                        Ext.getCmp('inc_images_description'+page).reset();
                        Ext.getCmp('images_path'+page).reset();
                    }
                }
            ],
        });


        var gridMenuIncImages = Ext.create('Ext.menu.Menu', {
            items: [
                {
                    text: 'Menu',
                    iconCls:'',
                    // disabled:!ROLE.PRINT_DATA,
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                text: 'Delete Image',
                                iconCls: 'row-delete',
                                handler    : function() {
                                    var record = gridIncImages.getView().getSelectionModel().getSelection()[0];
                                    var id = record.data.id ;
                                    Ext.Ajax.request({
                                        scope:this,
                                        url: '/DeleteIncImages',
                                        method: 'POST',
                                        dataType: 'html',
                                        params:{
                                            _token : csrf_token,
                                            id : id,
                                        },
                                        success:function(response, request){
                                            store_inc_images.load({
                                                params:{
                                                    start:0,
                                                    limit:1
                                                }
                                            });

                                            Ext.MessageBox.show({
                                                title: 'Please wait',
                                                msg: 'Loading items...',
                                                progressText: 'Initializing...',
                                                width:300,
                                                progress:true,
                                                closable:false,
                                                animateTarget: 'mb6'
                                            });
                                            // this hideous block creates the bogus progress
                                            var f = function(v){
                                                return function(){
                                                    if(v == 12){
                                                        Ext.MessageBox.hide();
                                                        Ext.MessageBox.show(
                                                            {
                                                                title : 'Message',
                                                                msg:'Process Successfully !' ,
                                                                buttons: Ext.MessageBox.OK,
                                                                icon :  Ext.MessageBox.INFO
                                                            }
                                                        );
                                                        removeData = [];
                                                    }else{
                                                        var i = v/11;
                                                        Ext.MessageBox.updateProgress(i, Math.round(100*i)+'% completed');
                                                    }
                                                };
                                            };
                                            for(var i = 1; i < 13; i++){
                                                setTimeout(f(i), i*50);
                                            }
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
                                    // alert(id_data_espt_22);
                                    // fastreport('bp_pph_22_one.fr3','id='+id_data_espt_22,'pdf');
                                }
                            },
                        ]
                    }
                },
            ]
        });

        var gridIncImages = Ext.create('Ext.grid.Panel', {
            // xtype:'grid',
            // title:'Inc Images',
            width: 315,
            margin: '0 0 0 0',
            store:store_inc_images,
            hideHeaders:true,
            columns:[
                {
                    header:'Inc Images',
                    dataIndex: 'images',
                    // autoSizeColumn:true,
                    width:425,
                    height:200,
                    align:'center',
                    renderer: function(value){
                        return '<img src="inc_images/' + value + '" /  width="250" height="200" >';
                    },
                }
            ],
            bbar:[
                {
                    xtype:'button',
                    text:'Add Images',
                    iconCls:'add-data',
                    id:'addIncImages'+page,
                    hidden:!ROLE.AddIncService,					
                    handler:function(){
                        var title = Ext.getCmp('detail_inc'+page).getValue()+' - '+Ext.getCmp('detail_item_name'+page).getValue();
                        if(title){
                            Ext.getCmp('winDetailIncImages'+page).setTitle(title);
                            winDetailIncImages.animateTarget = 'addIncImages'+page;
                            winDetailIncImages.show();
                        }else{
                            alert('Pilih INC');
                        }

                    }
                },
                Ext.create('Ext.PagingToolbar', {
                    border:false,
                    store: store_inc_images,
                    displayInfo: false,
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
                beforequery: function(queryEvent, eOpts ,value) {
                    Ext.Ajax.abortAll(); //cancel any previous requests
                    return true;

                },
                beforeitemcontextmenu: function(view, record, item, index, e)
                {
                    e.stopEvent();
                    gridMenuIncImages.showAt(e.getXY());
                },
                itemclick: function(grid_delivery_order_m, record, item, index, e) {

                }
            },
        });

        var main_content = {
            id: MainTabId,
            ui: 'blue-panel',
            title: title,
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
                                            title :'UNSPSC Data Tools',
                                            iconCls: iconCls,
                                            border:false,
                                            layout: 'fit',
                                            bodyPadding: 1,
                                            items:[
                                                {
                                                    xtype:'form',
                                                    layout: 'border',
                                                    border:false,
                                                    id:'formNCS'+pageid,
                                                    defaults: {
                                                        collapsible: true,
                                                        split: true,
                                                        bodyPadding: 1,
                                                        // margin :' 3 3 3 3',
                                                    },
                                                    border:false,

                                                    items:[
                                                        {
                                                            collapsible: false,
                                                            region: 'west',
                                                            floatable: false,
                                                            width: 470,
                                                            scrollable: true,
                                                            fieldDefaults: {
                                                                labelAlign: 'right',
                                                                labelWidth: 115,
                                                                msgTarget: 'side'
                                                            },
                                                            layout: 'border',
                                                            // border:false,

                                                            items: [
                                                                {
                                                                    xtype:'panel',
                                                                    title: 'Filter',
                                                                    frame:true,
                                                                    margin: '3 0 3 0',
                                                                    region:'north',
                                                                    items:[
                                                                        {
                                                                            xtype: 'fieldset',
                                                                            title: 'Search Filter',
                                                                            defaultType: 'textfield',
                                                                            bodyPadding: 15,
                                                                            margin: '5 5 5 5',
                                                                            defaults: {
                                                                                anchor: '100%',
                                                                            },
                                                                            items: [
                                                                                // searchfilter,

                                                                                {
                                                                                    xtype: 'combo',
                                                                                    // msgTarget: 'side',
                                                                                    fieldLabel: 'Status',
                                                                                    anchor: '100%',
                                                                                    forceSelection : true,
                                                                                    mode: 'local',
                                                                                    triggerAction: 'all',
                                                                                    emptyText:'Select Optional...',
                                                                                    selectOnFocus:true,
                                                                                    id:'is_active_filter'+ page,
                                                                                    name:           'is_active',
                                                                                    hiddenName:     'value',
                                                                                    displayField:   'value',
                                                                                    valueField:     'value',
                                                                                    minChars : 0,
                                                                                    store:          Ext.create('Ext.data.Store', {
                                                                                        fields : ['name', 'value'],
                                                                                        data   : [
                                                                                            {name : 'Active',   value: 'Active'},
                                                                                            {name : 'Deactive',  value: 'Deactive'},
                                                                                        ]
                                                                                    }),
                                                                                    typeAhead: true,
                                                                                    allowBlank:true,
                                                                                    msgTarget: 'under',
                                                                                    value: '',
                                                                                },
                                                                                {
                                                                                    xtype: 'combo',
                                                                                    fieldLabel: 'INC',
                                                                                    // labelWidth: 30,
                                                                                    // width: 320,
                                                                                    // margin: '3 3 3 0',
                                                                                    anchor: '100%',
                                                                                    forceSelection: false,
                                                                                    mode: 'remote',
                                                                                    triggerAction: 'all',
                                                                                    emptyText: 'Select INC ...',
                                                                                    selectOnFocus: true,
                                                                                    id: 'inc'+page,
                                                                                    name: 'inc',
                                                                                    hiddenName: 'inc_code',
                                                                                    displayField: 'class_inc_name',
                                                                                    valueField: 'inc',
                                                                                    minChars: 0,
                                                                                    store: store_combo_inc_m,
                                                                                    pageSize: 15,
                                                                                    disabled:false,
                                                                                    listeners: {
                                                                                        scope: this,
                                                                                        beforequery: function(queryEvent, eOpts ,value) {

                                                                                            var filters = [];
                                                                                            var transaction_type = new Ext.util.Filter({
                                                                                                operator: 'eq',
                                                                                                value: 'Service',
                                                                                                property: "transaction_type",
                                                                                                type: "string",
                                                                                            });

                                                                                            filters.push(transaction_type['initialConfig']) ;

                                                                                            if(queryEvent.query.toLowerCase()){
                                                                                                var inc_filter = new Ext.util.Filter({
                                                                                                    operator: 'like',
                                                                                                    value: queryEvent.query.toLowerCase(),
                                                                                                    property: "class_inc_name",
                                                                                                    type: "string",
                                                                                                });

                                                                                            }else{
                                                                                                var inc_filter = new Ext.util.Filter({
                                                                                                    operator: 'like',
                                                                                                    value: '%',
                                                                                                    property: "class_inc_name",
                                                                                                    type: "string",
                                                                                                });

                                                                                            }
                                                                                            filters.push(inc_filter['initialConfig']) ;
                                                                                            store_combo_inc_m.proxy.extraParams = {
                                                                                                filter: Ext.encode(filters),
                                                                                                // action: 'getIncByMGC',
                                                                                                limit:queryEvent.combo.pageSize
                                                                                            };
                                                                                            // var el = store_combo_inc_m.proxy.extraParams.filter;
                                                                                            // console.log(eval(el));
                                                                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                                                                            return true;
                                                                                        },
                                                                                        select: function (combo , record ,o) {
                                                                                            var matching = store_combo_inc_m.queryBy(
                                                                                                function(rec, id) {
                                                                                                    if (rec.data.inc == record.data.inc) {
                                                                                                        // console.log('Disini '+record.data.inc)
                                                                                                        Ext.getCmp('mgc'+page).setReadOnly(false);
                                                                                                        Ext.getCmp('mgc'+page).focus();
                                                                                                        Ext.getCmp('mgc'+page).reset();
                                                                                                    }
                                                                                                });

                                                                                        },
                                                                                        change: function(t, record, o) {

                                                                                        }
                                                                                    },
                                                                                    allowBlank:true,
                                                                                    value: '',
                                                                                },
                                                                                {
                                                                                    xtype: 'combo',
                                                                                    fieldLabel:'SGC',
                                                                                    // labelWidth: 30,
                                                                                    // width: 205,
                                                                                    anchor: '100%',
                                                                                    matchFieldWidth: false,
                                                                                    forceSelection: false,
                                                                                    name: 'groupclass',
                                                                                    displayField: 'groupclass',
                                                                                    valueField: 'groupclass',
                                                                                    store: store_groupclass_m,
                                                                                    pageSize: 15,
                                                                                    minChars : 0,
                                                                                    disabled:false,
                                                                                    forceSelection: false,
                                                                                    mode: 'remote',
                                                                                    triggerAction: 'all',
                                                                                    emptyText: 'Select SGC ...',
                                                                                    selectOnFocus: true,
                                                                                    id:'mgc'+page,
                                                                                    listConfig: {
                                                                                        loadingText: 'Searching...',
                                                                                        emptyText: 'No matching data found!',
                                                                                        getInnerTpl: function() {
                                                                                            return '{group_class_name}';
                                                                                        }
                                                                                    },
                                                                                    listeners: {
                                                                                        scope: this,
                                                                                        beforequery: function(queryEvent, eOpts ,value) {
                                                                                            var filters = [];
                                                                                            var transaction_type = new Ext.util.Filter({
                                                                                                operator: 'eq',
                                                                                                value: 'Service',
                                                                                                property: "transaction_type",
                                                                                                type: "string",
                                                                                            });

                                                                                            var inc_filter = new Ext.util.Filter({
                                                                                                operator: 'eq',
                                                                                                value: Ext.getCmp('inc'+page).getValue(),
                                                                                                property: "inc",
                                                                                                type: "string",
                                                                                            });
                                                                                            filters.push(inc_filter['initialConfig']) ;

                                                                                            filters.push(transaction_type['initialConfig']) ;
                                                                                            var groupclass_filter = new Ext.util.Filter({
                                                                                                operator: 'like',
                                                                                                value: queryEvent.query.toLowerCase(),
                                                                                                property: "group_class_name",
                                                                                                type: "string",
                                                                                            });
                                                                                            if(queryEvent.query.toLowerCase()){
                                                                                                filters.push(groupclass_filter['initialConfig']) ;
                                                                                            }
                                                                                            store_groupclass_m.proxy.extraParams = {
                                                                                                filter: Ext.encode(filters),
                                                                                            };
                                                                                            store_groupclass_m.load({
                                                                                                params:{
                                                                                                    start:0,
                                                                                                    limit:25
                                                                                                }
                                                                                            });
                                                                                            Ext.Ajax.abortAll(); //cancel any previous requests
                                                                                            return true;
                                                                                        },
                                                                                        select: function (combo , record ,o) {
                                                                                            var matching = store_groupclass_m.queryBy(
                                                                                                function(rec, id) {

                                                                                                    if (rec.data.groupclass == record.data.groupclass) {

                                                                                                    }
                                                                                                }
                                                                                            );

                                                                                        },
                                                                                    },
                                                                                    allowBlank:true,
                                                                                    value: '',
                                                                                    readOnly:true,
                                                                                    // hidden:!ROLE.MGC
                                                                                },

                                                                                {
                                                                                    xtype:'textfield',
                                                                                    fieldLabel:'Name Code',
                                                                                    margin: '3 3 3 0',
                                                                                    id:'name_code'+page

                                                                                },
                                                                                {
                                                                                    xtype: 'checkboxfield',
                                                                                    name: 'acceptTerms',
                                                                                    reference: 'acceptTerms',
                                                                                    fieldLabel: 'Terms of Use',
                                                                                    hideLabel: true,
                                                                                    margin: '15 0 0 0',
                                                                                    boxLabel: 'Colloquial Name',
                                                                                    id:'cross_reference'+page
                                                                                },
                                                                            ],


                                                                        },
                                                                    ],
                                                                    buttons: [
                                                                        {
                                                                            text: 'Reset',
                                                                            iconCls: 'clear',
                                                                            handler: function() {
                                                                                this.up('form').getForm().reset();
                                                                                grid_inc_m.getStore().removeAll();
                                                                                grid_inc_characteristic.getStore().removeAll();
                                                                                gridIncImages.getStore().removeAll();
                                                                                grid_colloquial_name.getStore().removeAll();
                                                                                Ext.getCmp('detail_inc'+page).reset();
                                                                                Ext.getCmp('detail_item_name'+page).reset();
                                                                                Ext.getCmp('detail_short_name_code'+page).reset();
                                                                                Ext.getCmp('detail_decription'+page).reset();
                                                                                Ext.getCmp('mgc_list'+page).reset();

                                                                                // INC
                                                                                Ext.getCmp('add_inc'+page).setDisabled(true);
                                                                                Ext.getCmp('remove_inc'+page).setDisabled(true);
                                                                                // Char
                                                                                Ext.getCmp('add_char'+page).setDisabled(true);
                                                                                Ext.getCmp('remove_char'+page).setDisabled(true);
                                                                                // Colloquial Name
                                                                                Ext.getCmp('add_cn'+page).setDisabled(true);
                                                                                Ext.getCmp('remove_cn'+page).setDisabled(true);
                                                                            }
                                                                        },
                                                                        {
                                                                            text: 'Search',
                                                                            iconCls: 'search',
                                                                            // triggerCls: Ext.baseCSSPrefix + 'form-search-trigger',
                                                                            // cls:'buttonCls',
                                                                            handler: function() {
                                                                                Ext.getCmp('detail_inc'+page).setValue();
                                                                                Ext.getCmp('detail_item_name'+page).setValue();
                                                                                Ext.getCmp('detail_short_name_code'+page).setValue();
                                                                                Ext.getCmp('detail_decription'+page).setValue();
                                                                                Ext.getCmp('mgc_list'+page).setValue();
                                                                                // Ext.getCmp('is_active_filter'+page).setValue();

                                                                                var mgc = Ext.getCmp("mgc"+page).getValue();
                                                                                var inc = Ext.getCmp("inc"+page).getValue();
                                                                                var is_active = Ext.getCmp("is_active_filter"+page).getValue();
                                                                                var name_code = Ext.getCmp("name_code"+page).getValue();
                                                                                var xref = Ext.getCmp('cross_reference'+page).getValue();
                                                                                var getCN = false;

                                                                                // Char
                                                                                Ext.getCmp('add_char'+page).setDisabled(true);
                                                                                Ext.getCmp('remove_char'+page).setDisabled(true);
                                                                                // Colloquial Name
                                                                                Ext.getCmp('add_cn'+page).setDisabled(true);
                                                                                Ext.getCmp('remove_cn'+page).setDisabled(true);

                                                                                // Reset grid others
                                                                                grid_inc_m.getStore().removeAll();
                                                                                grid_inc_characteristic.getStore().removeAll();
                                                                                gridIncImages.getStore().removeAll();
                                                                                grid_colloquial_name.getStore().removeAll();


                                                                                var sorters = [];
                                                                                var inc_shorter = new Ext.util.Sorter({
                                                                                    property: "inc",
                                                                                    direction: "ASC",
                                                                                });
                                                                                sorters.push(inc_shorter['initialConfig']) ;

                                                                                var filters = [];
                                                                                var transaction_type = new Ext.util.Filter({
                                                                                    operator: 'eq',
                                                                                    value: 'Service',
                                                                                    property: "transaction_type",
                                                                                    type: "string",
                                                                                });
                                                                                filters.push(transaction_type['initialConfig']) ;
                                                                                var groupclass_filter = new Ext.util.Filter({
                                                                                    operator: 'eq',
                                                                                    value: mgc,
                                                                                    property: "groupclass",
                                                                                    type: "string",
                                                                                });
                                                                                if(mgc){
                                                                                    filters.push(groupclass_filter['initialConfig']) ;
                                                                                }

                                                                                var inc_filter = new Ext.util.Filter({
                                                                                    operator: 'eq',
                                                                                    value: inc,
                                                                                    property: "inc",
                                                                                    type: "string",
                                                                                });
                                                                                if(inc){
                                                                                    filters.push(inc_filter['initialConfig']) ;
                                                                                }
                                                                                var isActive_filter = new Ext.util.Filter({
                                                                                    operator: 'eq',
                                                                                    value: is_active,
                                                                                    property: "is_active",
                                                                                    type: "string",
                                                                                });

                                                                                if(is_active){
                                                                                    filters.push(isActive_filter['initialConfig']) ;
                                                                                }



                                                                                // var xref = Ext.getCmp('cross_reference'+page).getValue();
                                                                                if(xref){
                                                                                    var inc_name_code = new Ext.util.Filter({
                                                                                        operator: 'like',
                                                                                        // comparison: 'gt',
                                                                                        value: name_code,
                                                                                        property: "cross_references_name",
                                                                                        type: "string",
                                                                                    });
                                                                                    if(name_code){
                                                                                        filters.push(inc_name_code['initialConfig']) ;
                                                                                    }
                                                                                    store_inc_m.proxy.extraParams = {
                                                                                        filter: Ext.encode(filters),
                                                                                        action :'getIncMCN',
                                                                                        sort : Ext.encode(sorters),
                                                                                    };
                                                                                    store_inc_m.load({
                                                                                        params:{
                                                                                            start:0,
                                                                                            limit:25
                                                                                        }
                                                                                    });
                                                                                }else{
                                                                                    var inc_name_code = new Ext.util.Filter({
                                                                                        operator: 'like',
                                                                                        // comparison: 'gt',
                                                                                        value: name_code,
                                                                                        property: "inc_class_name",
                                                                                        type: "string",
                                                                                    });
                                                                                    if(name_code){
                                                                                        filters.push(inc_name_code['initialConfig']) ;
                                                                                    }
                                                                                    store_inc_m.filter(filters);
                                                                                    store_inc_m.proxy.extraParams = {
                                                                                        filter: Ext.encode(filters),
                                                                                        action :'getIncM' ,
                                                                                        sort : Ext.encode(sorters),
                                                                                    };

                                                                                    store_inc_m.load({
                                                                                        params:{
                                                                                            start:0,
                                                                                            limit:25,
                                                                                        }
                                                                                    });
                                                                                }


                                                                            }
                                                                        }
                                                                    ]
                                                                },
                                                                grid_inc_m

                                                            ],
                                                        },
                                                        {
                                                            // title: 'Main Content',
                                                            collapsible: false,
                                                            region: 'center',
                                                            // margin: '3 0 3 0',
                                                            frame: false,
                                                            border: false,
                                                            layout: 'border',
                                                            items: [
                                                                {
                                                                    region: 'north',
                                                                    height: 245,
                                                                    // border:false,
                                                                    frame:true,
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        pack: 'start',
                                                                        align: 'stretch'
                                                                    },
                                                                    border:false,
                                                                    items: [
                                                                        {
                                                                            xtype:'form',
                                                                            title: 'INC Detail',
                                                                            frame:true,
                                                                            collapsible: false,
                                                                            defaults: {
                                                                                labelWidth: 40
                                                                            },
                                                                            margin: '0 3 3 3',
                                                                            flex: 3,
                                                                            border:false,
                                                                            layout: {
                                                                                type: 'vbox',
                                                                                pack: 'start',
                                                                                align: 'stretch',
                                                                                frame:false,
                                                                            },
                                                                            items:[
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: 'detail_inc_m_id'+page,
                                                                                    fieldLabel: 'Inc M Id',
                                                                                    width: 150,
                                                                                    editable: false,
                                                                                    value: '',
                                                                                    hidden:true,
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: 'detail_inc'+page,
                                                                                    fieldLabel: 'INC',
                                                                                    width: 150,
                                                                                    editable: false,
                                                                                    value: ''
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: 'detail_item_name'+page,
                                                                                    fieldLabel: 'Name',
                                                                                    width: '100%',
                                                                                    editable: false,
                                                                                    value: ''
                                                                                },
                                                                                {
                                                                                    xtype: 'fieldcontainer',
                                                                                    layout: 'hbox',
                                                                                    items: [
                                                                                        {
                                                                                            xtype: 'ShortNameCode',
                                                                                            id: 'detail_short_name_code'+page,
                                                                                            fieldLabel: 'Short',
                                                                                            labelWidth: 40,
                                                                                            width: '100%',
                                                                                            editable:ROLE.EditShortNameCode,
                                                                                            maxLength: 40,
                                                                                            value: ''
                                                                                        },
                                                                                    ]
                                                                                },
                                                                                {
                                                                                    xtype: 'textarea',
                                                                                    id: 'detail_decription'+page,
                                                                                    fieldLabel: 'Desc.',
                                                                                    width: '100%',
                                                                                    height: 80,
                                                                                    editable: false,
                                                                                    value: ''
                                                                                },
                                                                                {
                                                                                    xtype: 'textfield',
                                                                                    id: 'mgc_list'+page,
                                                                                    fieldLabel: 'MGC',
                                                                                    width: '100%',
                                                                                    editable: false,
                                                                                    value: ''
                                                                                }
                                                                            ]
                                                                        },
                                                                        {
                                                                            xtype: 'splitter',
                                                                        },
                                                                        {
                                                                            xtype:'panel',
                                                                            flex: 3,
                                                                            // width:'50%',
                                                                            border:false,
                                                                            layout:'fit',
                                                                            frame:false,
                                                                            plain:false,
                                                                            items:[
                                                                                gridIncImages
                                                                            ]
                                                                        }
                                                                    ]
                                                                },
                                                                {
                                                                    region: 'center',
                                                                    layout: {
                                                                        type: 'hbox',
                                                                        pack: 'start',
                                                                        align: 'stretch'
                                                                    },
                                                                    border:false,
                                                                    frame:true,
                                                                    padding  : '1 1 1 1',
                                                                    items: [
                                                                        {
                                                                            xtype:'panel',
                                                                            flex: 3,
                                                                            // width:'50%',
                                                                            border:false,
                                                                            layout:'fit',
                                                                            frame:false,
                                                                            plain:false,
                                                                            items:[grid_inc_characteristic]
                                                                        },
                                                                        {
                                                                            xtype: 'splitter',
                                                                        },
                                                                        {
                                                                            xtype:'panel',
                                                                            flex: 3,
                                                                            // width:'50%',
                                                                            border:false,
                                                                            layout:'fit',
                                                                            frame:false,
                                                                            plain:false,
                                                                            items:[grid_colloquial_name]
                                                                        }
                                                                    ]
                                                                }
                                                            ]
                                                        },

                                                    ],

                                                }
                                            ]
                                        }
                                    ]
                                }),

                            ]
                        }),
                    ]
                }

            ],
            listeners:{
                destroy:function(){
                    winDetailIncImages= Ext.getCmp('winDetailIncImages'+page);
                    if (winDetailIncImages)
                        winDetailIncImages.destroy();
                    winCharacteristicValue= Ext.getCmp('winCharacteristicValue'+page);
                    if (winCharacteristicValue)
                        winCharacteristicValue.destroy();
                    winIncM= Ext.getCmp('winIncM'+page);
                    if (winIncM)
                        winIncM.destroy();
                }
            }

        }

        OpenTab(main_content,MainTabId);
        Ext.getCmp('mainpanel').body.unmask();



    }
});
