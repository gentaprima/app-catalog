valid_script = true;
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
        // alert(pageid);


        var main_content = {
            id: MainTabId,
            ui: 'blue-panel',
            title: title,
            closable: true,
            iconCls: iconCls,
            layout:'fit',
            autoHeight : true,
            border:false,
            items:[
                {
                    xtype:'panel',
                    layout:'border',
                    id:'MainPanel_'+MainTabId,
                    // padding : '3 3 3 3',
                    items:[
                        Ext.create('Ext.panel.Panel', {
                            border:true,
                            layout: 'fit',
                            region: 'center',
                            id:'MainContentPanel_'+MainTabId,
                            dockedItems: [
                                {
                                    xtype: 'header',
                                    style: ' backgroundColor:#FFFFFF; backgroundImage:none;text-align: right;font-color:white;font-weight: bold;font-size:25px;font-family: "Comic Sans MS", cursive, sans-serif',
                                    html: 'List '+title,
                                    id:'titleHeader'+pageid,
                                    padding : '5 5 15 5 ',
                                    frame: false,
                                    // dock: 'top' //top
                                }
                            ],
                            items:[


                            ]
                        }),
                    ]
                }

            ],
            listeners:{


                destroy:function(){

                }
            }

        }

        OpenTab(main_content,MainTabId);

        ///////////////////////
        // Store Master Template //
        ///////////////////////
        // var store_master_template = Ext.getStore('StoreMasterTemplate');

        window['ModelLayoutShcema_'+pageid] = Ext.create('Ext.data.Model', {
            id : 'ModelLayoutShcema_'+pageid,
            extend: 'Ext.data.Model',
            fields: []
        });

        var model_template = Ext.define('model_template', {
            extend: 'Ext.data.Model',
            fields: []
        });

        window['StoreLayoutShcema_'+pageid] = Ext.create('Ext.data.Store', {
            model: window['ModelLayoutShcema_'+pageid],
            autoLoad: true,
            remoteSort:true,
            proxy: {
                type: 'ajax',
                url: '/LayoutSchema',
                method: 'GET',
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'data',
                    messageProperty: 'message'
                },
                extraParams:{
                    pageId : pageid
                }
            },
            sorters: [
                {
                    property : 'rowid',
                    direction: 'ASC'
                }
            ],
            listeners: {
                load: function(store){
                    // store.getProxy().activeRequest.options.operation.response.responseText;

                    if(eval(store.data.length) > 0){
                        window['ContentTabPanel_'+pageid] = Ext.create('Ext.tab.Panel', {
                            id:'ContentTabPanel_'+pageid,
                            border:false,
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    ui: 'footer',
                                    fixed: true,
                                    id:'ContentTabToolBar_'+pageid,
                                    items: [

                                    ]
                                }
                            ],
                            items: [
                                {
                                    border:false,
                                    id:'ContentTabPanelLst_'+pageid,
                                    tabConfig: {
                                        title: 'Data '+title,
                                        tooltip: 'Data '+title,
                                    },
                                    // items:window['grid_'+pageid+'_m']
                                    items:[
                                        {
                                            region: 'center',
                                            stateId: 'ContentTabPanelDetail',
                                            iconCls: 'sitemap_color',
                                            id: 'ContentTabPanelDetailMenu'+pageid,
                                            // title: 'Menu Navigator',
                                            header:false,
                                            split: false,
                                            useArrows       : true,
                                            // width: 200,
                                            // minWidth: 175,
                                            // maxWidth: 400,
                                            collapsible: true,
                                            animCollapse: false,
                                            // margins: '0 0 0 5',
                                            border:false,
                                            fullscreen: true,
                                            cls:'x-accordion-hd-title',
                                            layout: {
                                                type: 'accordion',
                                                animate: true,
                                                multi: true,
                                                align: 'stretch',
                                                titleCollapse: true,
                                                activeOnTop: false
                                            },
                                            flex:3,
                                            listeners:{

                                            }

                                        },
                                    ]
                                }
                            ]
                        });


                        for (var i = 0; i < eval(store.data.length); i++) {
                            var layout_type = store.data.items[i].data.layout_type ;

                            var caption =store.data.items[i].data.caption;
                            var rowid = store.data.items[i].data.rowid;
                            var source_data = store.data.items[i].data.source_data;
                            var content_lst = store.data.items[i].data.content_lst;

                            switch (layout_type){

                                case'form_search':
                                    window['searchMainPanel_'+pageid] = Ext.create('Ext.panel.Panel',{
                                        id:'searchMainPanel_'+pageid,
                                        border:true,
                                        layout: 'fit',
                                        region: 'west',
                                        title : 'Searching',
                                        header:false,
                                        width:300,
                                        margin : '3 3 3 3',
                                        split:true,
                                        collapsible: true,
                                        animCollapse: true,
                                        items:[
                                            {
                                                xtype: 'fieldset',
                                                id:'IdfieldsetSearchMainPanel_'+pageid,
                                                title: caption,
                                                collapsible: false,
                                                region: 'west',
                                                frame:false,
                                                width:250,
                                                margin : '3 3 3 3',
                                                defaults: {
                                                    labelWidth: 89,
                                                    anchor: '100%',
                                                    layout: {
                                                        type: 'hbox',
                                                        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                                                    }
                                                },

                                            },
                                        ]
                                    });
                                    var searchLst = Ext.util.JSON.decode(content_lst);
                                    console.log(searchLst);
                                    var searchMany = searchLst.length;
                                    var widget = null;
                                    window['fieldsetSearchMainPanel_'+pageid] = [];
                                    for (var r = 0; r < searchMany; ){

                                        var name   = searchLst[r].name;
                                        var fieldLabel = searchLst[r].fieldlabel;
                                        var xtype   = searchLst[r].xtype;

                                        switch(searchLst[r].xtype){
                                            case 'numberfield':
                                                width =300 ;
                                                window['fieldsetSearchMainPanel_'+pageid+rowid] = Ext.create('Ext.form.FieldContainer',{
                                                        xtype: 'fieldcontainer',
                                                        combineErrors: true,
                                                        msgTarget: 'side',
                                                        fieldLabel: fieldLabel,
                                                        labelWidth: 50,
                                                        defaults: {
                                                            hideLabel: true
                                                        },
                                                        items: [
                                                            {
                                                                xtype: searchLst[r].xtype,
                                                                name: searchLst[r].name,
                                                                id: 'searchMainPanelfieldId_'+name+pageid + "_" + i,
                                                                // format: 'd-m-Y',
                                                                // labelWidth: 150,
                                                                width: searchLst[r].width,  // includes labelWidth
                                                                allowBlank: searchLst[r].allowBlank,
                                                                allowDecimals: true,
                                                                decimalPrecision: 1,
                                                            }
                                                        ]
                                                    }
                                                );
                                                window['fieldsetSearchMainPanel_'+pageid].push(window['fieldsetSearchMainPanel_'+pageid+rowid]);
                                                break;
                                            case 'datefield':
                                                width =300 ;
                                                window['fieldsetSearchMainPanel_'+pageid+rowid] = Ext.create('Ext.form.FieldContainer',{
                                                            xtype: 'fieldcontainer',
                                                            combineErrors: true,
                                                            msgTarget: 'side',
                                                            fieldLabel: fieldLabel,
                                                            labelWidth: 50,
                                                            defaults: {
                                                                hideLabel: true
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: searchLst[r].xtype,
                                                                    name: searchLst[r].name,
                                                                    id: 'searchMainPanelfieldId_'+name+pageid + "_" + i,
                                                                    format: 'd-m-Y',
                                                                    // labelWidth: 150,
                                                                    width: searchLst[r].width,  // includes labelWidth
                                                                    allowBlank: searchLst[r].allowBlank
                                                                }
                                                            ]
                                                        }
                                                    );
                                                window['fieldsetSearchMainPanel_'+pageid].push(window['fieldsetSearchMainPanel_'+pageid+rowid]);
                                                break;
                                            case 'combobox':
                                                if (typeof(searchLst[r].store) != "undefined") {

                                                    Ext.define('ComboBoxSearchLstModel', {
                                                        extend: 'Ext.data.Model',
                                                        fields  : ['rowid','name_value']
                                                    });
                                                    eval("var StoreCombosearchLstMainPanel_"+name+pageid+"_"+r+"= Ext.create('Ext.data.Store', {"+
                                                        "model: 'ComboBoxSearchLstModel',"+
                                                        "storeId :'StoreIdComboSearchLst'+name+pageid+'_'+r,"+
                                                        "id:'StoreIdComboSearchLst'+name+pageid,"+
                                                        "proxy: {"+
                                                        "type: 'ajax',"+
                                                        // url: 'cb_groupclass.php?',
                                                        "url: '/conf_link?link_id='+searchLst[r].store,"+
                                                        "method: 'GET',"+
                                                        "reader: {"+
                                                        "type: 'json',"+
                                                        "successProperty: 'success',"+
                                                        "root: 'data',"+
                                                        "messageProperty: 'message'"+
                                                        "}"+
                                                        "},"+
                                                        "sorters: [],"+
                                                        "listeners: {"+
                                                        "'beforeload': function (store) {"+
                                                        // console.log(store)
                                                        // "store.proxy.extraParams.filter = '';"+
                                                        "}"+
                                                        "}"+
                                                        "})");
                                                    width = 150;
                                                    window['fieldsetSearchMainPanel_'+pageid+rowid] = Ext.create('Ext.form.FieldContainer',{
                                                            xtype: 'fieldcontainer',
                                                            combineErrors: true,
                                                            msgTarget: 'side',
                                                            fieldLabel: searchLst[r].fieldlabel,
                                                            labelWidth: 50,
                                                            defaults: {
                                                                hideLabel: true
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: searchLst[r].xtype,
                                                                    name: searchLst[r].name,
                                                                    id: 'searchMainPanelfieldId_'+name+pageid + "_" + r,
                                                                    labelWidth: 150,
                                                                    width: width,  // includes labelWidth
                                                                    allowBlank: false,
                                                                    hiddenName: 'name_value',
                                                                    displayField: 'name_value',
                                                                    valueField: 'rowid',
                                                                    minChars: 0,
                                                                    mode: 'remote',
                                                                    triggerAction: 'all',
                                                                    emptyText: 'Select ' + searchLst[r].fieldlabel + ' ....',
                                                                    selectOnFocus: true,
                                                                    forceSelection: true,
                                                                    store: eval('StoreCombosearchLstMainPanel_' + name + pageid + '_' + r),
                                                                    allowBlank: searchLst[r].allowBlank,
                                                                    listConfig: {
                                                                        loadingText: 'Searching Data ' + fieldLabel + ' ....',
                                                                        emptyText: 'No matching data found!',
                                                                        getInnerTpl: function () {
                                                                            return '{name_value}';
                                                                        }
                                                                    },
                                                                    listeners: {
                                                                        scope: this,
                                                                        beforequery: function (queryEvent, eOpts, value) {
                                                                            window['filters' + name + pageid] = [];
                                                                            if (queryEvent.query.toLowerCase()) {
                                                                                window['cbSearchLstFilter' + name + pageid + '_' + r] = new Ext.util.Filter({
                                                                                    operator: 'like',
                                                                                    value: queryEvent.query.toLowerCase(),
                                                                                    property: "name_value",
                                                                                    type: "string",
                                                                                });
                                                                                window['filters' + name + pageid].push(window['cbSearchLstFilter' + name + pageid + '_' + r]['initialConfig']);
                                                                            }

                                                                            queryEvent.combo.config.store.proxy.extraParams = {
                                                                                filter: Ext.encode(window['filters' + name + pageid]),
                                                                            };
                                                                            Ext.Ajax.abortAll(); //cancel any previous requests*/
                                                                            return true;
                                                                        },
                                                                        select: function (combo, record, o) {

                                                                        },
                                                                    },
                                                                }
                                                            ]
                                                        }
                                                    );
                                                    window['fieldsetSearchMainPanel_'+pageid].push(window['fieldsetSearchMainPanel_'+pageid+rowid]);
                                                    // console.log(eval("StoreCombo"+name+pageid+"_"+i));
                                                }
                                                break;
                                        //
                                        }
                                        r++
                                    }
                                    break;

                                case'toolbar':

                                    window['ContentTabToolBar_'+pageid] = eval(content_lst);
                                    // Ext.getCmp('ContentTabToolBar_'+pageid).add(window['ContentTabToolBar_'+pageid]);
                                    break;
                                case'grid':

                                    var model_template = Ext.define('MetaChangeModel', {
                                        extend: 'Ext.data.Model',
                                        fields: []
                                    });
                                    window['StoreGrid_'+pageid+'_'+rowid] = Ext.create('Ext.data.Store', {
                                        model: 'MetaChangeModel',
                                        // groupField: 'group_header',
                                        autoLoad: true,
                                        remoteSort:true,
                                        remoteFilter:true,
                                        pageSize:2,
                                        proxy: {
                                            type: 'ajax',
                                            url: '/GridStore',
                                            method: 'GET',
                                            reader: {
                                                type: 'json',
                                                successProperty: 'success',
                                                root: 'data',
                                                messageProperty: 'message'
                                            },
                                            extraParams:{
                                                Action:'GridStore',
                                                store :source_data
                                            }
                                        },
                                        sorters: [
                                            /*{
                                                property : 'rowid',
                                                direction: 'ASC'
                                            },*/
                                        ],
                                        listeners: {
                                            metachange: function(store, meta) {
                                                var me = this;
                                                // console.log(me);
                                                // grid_MNU8_FCF12.reconfigure(meta.columns)

                                            }
                                        },
                                    });


                                    // var columns = Ext.util.JSON.decode(content_lst);
                                    //
                                    if(typeof (content_lst) != null || typeof (content_lst) != 'undefined'){
                                        // console.log(eval(content_lst));
                                    }

                                    // window['GridStore_'+pageid+'_'+rowid] =

                                    window['grid_'+pageid+'_'+rowid] = Ext.create('Ext.grid.Panel', {
                                        id:'gridId_'+pageid+'_'+rowid,
                                        layuot:'card',
                                        plugins: [
                                            'gridfilters'
                                        ],
                                        // region:'center',
                                        /*features	: [
                                         filterconfig
                                         ],*/
                                        autoHeight : false,
                                        columnLines: true,
                                        autoScroll : true,
                                        layout:'fit',
                                        cls:'x-grid-hd-title',
                                        // flex:3,
                                        // width: 500,
                                        // height: 330,
                                        header:true,
                                        frame: false,
                                        border:false,
                                        store: window['StoreGrid_'+pageid+'_'+rowid],
                                        iconCls: iconCls,
                                        columns: eval(content_lst),

                                        bbar:[
                                            Ext.create('Ext.PagingToolbar', {
                                                border:false,
                                                store: window['StoreGrid_'+pageid+'_'+rowid] ,
                                                displayInfo: false,
                                                displayMsg: 'Displaying record {0} - {1} of {2}',
                                                emptyMsg: "No records to display"
                                            }),
                                        ],
                                        viewConfig: {
                                            stripeRows: true,
                                            enableTextSelection: true,
                                            emptyText : 'No Record Found',
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
                                            onFocus: {
                                                element: 'el',
                                                fn: function(me){
                                                    // console.log(me.currentTarget.id);
                                                    console.log(me);
                                                }
                                            },
                                            onCellDblClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                                                // var clickedColumnName = record.getFields()[cellIndex-1].getName();
                                                // var clickedCellValue = record.get(clickedColumnName);
                                            }
                                        }
                                    });

                                // window['grid_'+pageid+'_'+rowid].getView().focusRow(row);
                                //     console.log(window['grid_'+pageid+'_'+rowid].focus());
                                    window['ContentTabPanelDetailMenuAccordion'+pageid] = [];
                                    
                                    window['ContentTabPanelDetailMenuAccordion'+pageid+'_'+rowid] = {
                                        title: caption,
                                        id: 'AccordionTindakan_'+pageid+'_'+rowid,
                                        items:window['grid_'+pageid+'_'+rowid],
                                        // layout:'form'
                                        listeners: {
                                            /*afterrender: function(me, eOpts) {
                                                me.header.el.on('mouseover', function () {
                                                    console.log(me.id);
                                                    // Ext.defer(function(){
                                                    //     if (me.collapsed) {me.expand();}
                                                    // }, 1000);
                                                });
                                            }*/
                                        }
                                    };

                                    // window['ContentTabPanelDetailMenuAccordion'+pageid].push(window['ContentTabPanelDetailMenuAccordion'+pageid+'_'+rowid]);
                                    // console.log('gridId_'+pageid+'_'+rowid);

                                    Ext.getCmp('ContentTabPanelDetailMenu'+pageid).add(window['ContentTabPanelDetailMenuAccordion'+pageid+'_'+rowid]);
                                    // console.log('--'+rowid);
                                    break;
                                case'toolbar_search':
                                    window['toolbarSearch_'+pageid] = Ext.create('Ext.form.FieldContainer',{
                                        combineErrors: true,
                                        msgTarget: 'under',
                                        defaults: {
                                            hideLabel: true
                                        },
                                        items: [

                                            {
                                                xtype: 'button',
                                                // text: 'Search',
                                                iconCls: 'search1',
                                                margin: '5 5 5 5',
                                                handler: function () {

                                                    // Ext.getCmp('gridId_' + pageid + '_m').setVisible(false);
                                                    // Ext.getCmp('formTemplate' + pageid).setVisible(true);
                                                    // Ext.getCmp('titleHeader' + pageid).update('Entry Form ' + title);
                                                }
                                            },

                                            {
                                                xtype: 'button',
                                                // text: 'Clear',
                                                iconCls: 'drop',
                                                margin: '5 5 5 5',
                                                handler: function () {
                                                    // Ext.getCmp('gridId_' + pageid + '_m').setVisible(false);
                                                    // Ext.getCmp('formTemplate' + pageid).setVisible(true);
                                                    // Ext.getCmp('titleHeader' + pageid).update('Entry Form ' + title);
                                                }
                                            },

                                            {
                                                xtype: 'button',
                                                // text: 'Clear',
                                                iconCls: 'drop',
                                                margin: '5 5 5 5',
                                                handler: function () {
                                                    // Ext.getCmp('gridId_' + pageid + '_m').setVisible(false);
                                                    // Ext.getCmp('formTemplate' + pageid).setVisible(true);
                                                    // Ext.getCmp('titleHeader' + pageid).update('Entry Form ' + title);
                                                }
                                            },

                                        ]
                                    });
                                break;

                            }

                            // console.log('-'+rowid);
                        }
                        if(typeof (window['searchMainPanel_'+pageid]) != "undefined"){
                            // console.log(window['searchMainPanel_'+pageid]);
                            Ext.getCmp('MainPanel_'+MainTabId).add(window['searchMainPanel_'+pageid]);
                            if(typeof (window['toolbarSearch_'+pageid])!= "undefined")
                            {
                                Ext.getCmp('IdfieldsetSearchMainPanel_'+pageid).add(window['toolbarSearch_'+pageid]);
                            }
                            if(typeof (window['fieldsetSearchMainPanel_'+pageid])!= "undefined"){
                                Ext.getCmp('IdfieldsetSearchMainPanel_'+pageid).add(window['fieldsetSearchMainPanel_'+pageid]);
                            }
                        }
                        if(typeof (window['ContentTabPanel_'+pageid]) != "undefined"){
                            Ext.getCmp('MainContentPanel_'+MainTabId).add(window['ContentTabPanel_'+pageid]);
                            if(typeof (window['ContentTabToolBar_'+pageid])!= "undefined"){
                                Ext.getCmp('ContentTabToolBar_'+pageid).add(window['ContentTabToolBar_'+pageid]);
                            }
                            // window['ContentTabPanelDetailMenuAccordion'+pageid]
                            // Ext.getCmp('ContentTabPanelDetailMenu'+pageid).add(window['ContentTabPanelDetailMenuAccordion'+pageid]);
                        }

                    }
                }
            },

        });


    Ext.getCmp('mainpanel').body.unmask();

        // genItems(myitems);
        // Ext.getCmp('formTemplate'+pageid).add(widget);
        // Ext.getCmp('formTemplate'+pageid).add(Ext.create("Ext.form.field.Text", {fieldLabel:"Last Name"}));




    }
});
