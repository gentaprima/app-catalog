<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <link rel="icon" href={{asset('images/icon/abm-logo-ico.ico')}} type="image/x-icon" />

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }} | </title>

    <!-- Styles -->
    {{--<link href="{{ asset('css/app.css') }}" rel="stylesheet">--}}
    <link href="{{ asset('css/loader.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('libs/ext/build/classic/theme-classic/resources/theme-classic-all.css') }}" rel="stylesheet">
    <script src="{{ asset('libs/ext/build/ext-all.js') }}"></script>
    <script src="{{ asset('libs/ext/build/src/ux/Exporter-all.js') }}"></script>
    <script src="{{ asset('libs/ext/build/src/ux/form/field/Currency.js') }}"></script>
    <!-- <script src="{{ asset('app/app.js') }}"></script> -->
    <script>
        var csrf_token = "{{ csrf_token() }}";
        var AppName = "{{ config('app.name', 'APPName') }}";
        var CompanyName = "{{  isset($CompanyName) ? $CompanyName : 'ABM Investama' }}";
        var CompanyCode = "{{  isset($CompanyCode) ? $CompanyCode : '' }}";
        var company_code = "{{  isset($CompanyCode) ? $CompanyCode : '' }}";
        var base_url = "";
        var usertype = "{{  isset($UserType) ? $UserType : 'Guest' }}";
        var user_level = "{{  isset($UserType) ? $UserType : 'Guest' }}";
        var realname = "{{  isset($RealName) ? $RealName : 'No Name' }}";
        var APP_TITLE = "E-Catalog";
    </script>
    <style type="text/css">

        .x-grid3-simple-totals .x-grid3-row-last {
            margin-bottom: 21px;
        }

        .x-grid3-simple-totals .x-grid-total-row {
            /*position: absolute;
            bottom: 15px;*/
            left: 0;
            /*background: #F9F9F9 url(../../resources/images/default/grid/grid3-hrow.gif);*/
        }

        .x-grid3-simple-totals .x-grid-total-row td {
            border-left: 1px solid #EEEEEE;
            border-right: 1px solid #D0D0D0;
            padding-left: 0px;
            padding-right: 0px;
        }

        .x-grid-checkheader {
            height: 14px;
            background-image: url('images/unchecked.gif');
            background-position: 50% -2px;
            background-repeat: no-repeat;
            background-color: transparent;
        }

        .x-grid-checkheader-checked {
            background-image: url('images/checked.gif');
        }

        .x-grid-checkheader-disabled {
            background-image: url('images/unchecked-disabled.gif');
        }

        .x-grid-checkheader-checked-disabled {
            background-image: url('images/checked-disabled.gif');
        }

        .x-grid-checkheader-editor .x-form-cb-wrap {
            text-align: center;
        }
        .red {
            background-color: red ;
            color:white;
        }

        .green  {
            background-color: green ;
            color:white;
        }
        .grey {
            background-color: grey ;
            color:white;
        }
        .yellow {
            background-color: yellow ;
            color:white;
        }
        .statusRed{
            background-position:center  !important;
            width: auto !important;
            background-repeat: no-repeat;
            background-image: url("images/red_indicator.png") !important;
        }
        .statusYellow{
            background-position:center  !important;
            width: auto !important;
            background-repeat: no-repeat;
            background-image: url("images/yellow_indicator.png") !important;
        }
        .statusGreen{
            background-position:center  !important;
            width: auto !important;
            background-repeat: no-repeat;
            background-image: url("images/green_indicator.png") !important;
        }
        .x-action-col-cell img.icon-red {
            background-image: url("images/red_indicator.ico");
            background-repeat: no-repeat;
            background-size: 10px;
            width: 10px;
            height: 10px;
        }
        .x-action-col-cell img.icon-yellow {
            background-image: url("images/yellow_indicator.ico");
            background-repeat: no-repeat;
            background-size: 10px;
            width: 10px;
            height: 10px;
        }
        .x-action-col-cell img.icon-green {
            background-image: url("images/green_indicator.ico");
            background-repeat: no-repeat;
            background-size: 10px;
            width: 10px;
            height: 10px;
        }
        .grouped-list .x-boundlist-item {
            padding: 1px 3px 0 10px;
        }
        .grouped-list .group-header {
            padding: 4px;
            font-weight: bold;
            border-bottom: 1px solid #ddd;
        }
        .x-column-header {
            /*border-right: 1px solid #7e7e7e;*/
            /*color:blue;*/
            text-align: center;
            /*your style here*/
        }
        .failed-row {
            background-color: #ffe2e2;
            color: #900;
        }
        .icon-red  {
            background-image: url("images/red_indicator.ico");
            background-repeat: no-repeat;
            background-size: 10px;
            width: 10px;
            height: 10px;
        }
        .icon-yellow  {
            background-image: url("images/yellow_indicator.ico");
            background-repeat: no-repeat;
            background-size: 10px;
            width: 10px;
            height: 10px;
        }
        .icon-green  {
            background-image: url("images/green_indicator.ico");
            background-repeat: no-repeat;
            background-size: 10px;
            width: 10px;
            height: 10px;
        }
        .RibbonGrey {
            font-weight: bold;
            background-image: url('images/RibbonGrey.png');
            /*background-position: 50% -2px;*/
            background-repeat: no-repeat;
            background-color: transparent;
        }
        .RibbonYellow {
            font-weight: bold;
            background-image: url('images/RibbonYellow.png');
            /*background-position: 50% -2px;*/
            background-repeat: no-repeat;
            background-color: transparent;
        }
        .RibbonGreen {
            font-weight: bold;
            background-image: url('images/RibbonGreen.png');
            /*background-position: 50% -2px;*/
            background-repeat: no-repeat;
            background-color: transparent;
        }
        .RibbonRed {
            font-weight: bold;
            background-image: url('images/RibbonRed.png');
            /*background-position: 50% -2px;*/
            background-repeat: no-repeat;
            background-color: transparent;
        }
        .buttonCls:active {
            /*background: #000000; */
            font-size: 14px;
            background-color: #5cb4ff;
            vertical-align: center;
            border: 2px solid;
            border-color: #5cb4ff;
        }
        .buttonCls {
            /*background: #ff0000; */
            color: #ff0000;
            font-size: 14px;
            vertical-align: center;
            border: 2px solid;
        !important
        }
        .btn-style .x-btn-center .x-btn-text {
            color: #ff0000;
        }
        /* Galery Ima */
        .galleria-image-nav-right:hover, .galleria-image-nav-left:hover {
            opacity: .8;
            -ms-filter: "alpha(opacity=80)";
            filter: alpha(opacity=80);
        }


        .galleria-image-nav-left, .galleria-image-nav-right {
            cursor: pointer;
            width: 23px;
            height: 56px;
            /*position: absolute;
            z-index: 2;*/
            background-position: 0 0;
            background-image: url(images/slideshow-arrows.png);
            background-repeat: no-repeat;
        }


        .galleria-image-nav-left {
            -moz-border-radius-topleft: 3px;
            -moz-border-radius-bottomleft: 3px;
            -webkit-border-radius: 3px 0 0 3px;
            border-radius: 3px 0 0 3px;
        }


        .galleria-image-nav-right {
            /*position: absolute;*/
            -moz-border-radius-topright: 3px;
            -moz-border-radius-bottomright: 3px;
            -webkit-border-radius: 0 3px 3px 0;
            border-radius: 0 3px 3px 0;
            left: auto;
            right: 0;
            background-position: -23px 0;
            z-index: 2;
        }


        .galleria-image-nav-left:active
        {
            background-position:-46px top;
        }


        .galleria-image-nav-right:active
        {
            background-position:-69px top;
        }


        .galleria .x-list-normal .x-list-item:first-child .x-list-item-label {
            border-top: 0;
        }


        .galleria .x-list-normal .x-list-item .x-list-item-label {
            border-top: 0;
        }


        .galleria .x-list-normal .x-list-item:last-child .x-list-item-label {
            border-bottom: 0;
        }


        .galleria .x-list-item
        {
            background: white;
            padding: 2px;
            border: 1px solid #BABABA;
            height: 46px;
            width: 46px;
            margin: 5px 0 5px 5px;
            float: left;
            cursor: pointer;
            /*z-index: 2;*/
        }


        .galleria .x-list-item img
        {
            display: block;
            width: 40px;
            height: 40px;
            top: 0px;
            left: 0px;
            position:absolute;
            top: 2px!important;
            left: 2px!important;
        }


        .galleria .gallery-image-selected {
            background: #EE2A96;
            border-color: #AE0061;
            -moz-box-shadow: 0 0 4px 3px rgba(255,94,188,0.6);
            -webkit-box-shadow: 0 0 4px 3px rgba(255,94,188,0.6);
            box-shadow: 0 0 4px 3px rgba(255,94,188,0.6);
        }


        .galleria .x-img {
            background-repeat: no-repeat;
            background-size: auto 100%;
            background-position: center;
            border:solid 1px #d0d0d0;
        }

        .custom-dirty .x-grid-dirty-cell {
            background-color: #ffa;
            background-image: url(/static/lib/silk/bullet_red.png);
            background-position: right center;
            color: #090;
        }

        .myBgCls{
            height: 104px !important;
            width: 2048px !important;
            background-image: url('') !important;
            border: none !important;
            background-color: transparent !important;
        }
        .abp-badge {
            position: relative;
            overflow: visible;
        }

        .abp-badge[data-abp-badge]:after {
            content: attr(data-abp-badge);
            position: absolute;
            font-size: 10px;
            top: -10px;
            right: 2px;
            width: auto;
            font-weight: bold;
            color: white;
            text-shadow: rgba(0, 0, 0, 0.5) 0 -0.08em 0;
            -webkit-border-radius: 3px;
            border-radius: 3px;
            padding: 1px 4px;
            background-image: none;
            background-color: #C00;
            background-image: -webkit-gradient(linear, 50% 0%, 50% 100%, color-stop(0%, #ff1a1a), color-stop(3%, #e60000), color-stop(100%, #b30000));
            background-image: -webkit-linear-gradient(top, #ff1a1a,#e60000 3%,#b30000);
            background-image: linear-gradient(top, #ff1a1a,#e60000 3%,#b30000);
            -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 0.1em 0.1em;
            box-shadow: rgba(0, 0, 0, 0.3) 0 0.1em 0.1em;
        }
        .abp-badge.hide-badge[data-abp-badge]:after {
            display: none!important;
        }
        /*<div id="tool-1092-toolEl" data-ref="toolEl" class=" x-tool-tool-el x-tool-img x-tool-expand-bottom" role="presentation"></div>*/
        .x-accordion-hd-title .x-accordion-hd .x-tool-over .x-tool-collapse-top,
        .x-accordion-hd-title .x-accordion-hd .x-tool-over .x-tool-collapse-bottom,
        .x-accordion-hd-title .x-accordion-hd .x-tool-collapse-top,
        .x-accordion-hd-title .x-accordion-hd .x-tool-collapse-bottom {
            background-position: 0 -570px;
        }

        /*.x-accordion-hd-title .x-accordion-hd .x-tool-over .x-tool-expand-top,
        .x-accordion-hd-title .x-accordion-hd .x-tool-over .x-tool-expand-bottom,
        .x-accordion-hd-title .x-accordion-hd .x-tool-expand-top,
        .x-accordion-hd-title .x-accordion-hd .x-tool-expand-bottom {
            !*background-position: 0 525px;*!
            background-position: 0 -210px;
        }*/
        .x-accordion-hd-title .x-tool-expand-top,
        .x-accordion-hd-title .x-tool-collapse-top {
            background-position: 0 -210px;
        }

        .x-accordion-hd-title .x-tool-expand-bottom,
        .x-accordion-hd-title .x-tool-collapse-bottom {
            background-position: 0 -195px;
        }
        .x-accordion-hd-title .x-title-text{
            backgroundColor:#FFFFFF !important;
            backgroundImage:none !important;
            text-align: left !important;
            font-color:white !important;
            font-weight: bold !important;
            font-size:13px !important;
            font-family: "Comic Sans MS", cursive, sans-serif !important;
            padding:5px 5px 5px 5px;
        }
        .x-grid-hd-title .x-title-text{
            backgroundColor:#FFFFFF !important;
            backgroundImage:none !important;
            text-align: left !important;
            font-color:white !important;
            font-weight: bold !important;
            /*font-size:13px !important;*/
            font-family: "Comic Sans MS", cursive, sans-serif !important;
            padding:0px 0px 0px 0px;
        }
        .buttonStyle
        {
            /*border:  10px 10px 10px 10px;*/
        }

        .failed-row .x-grid-cell {
            background-color: #ffe2e2;
            color: #900;
        }

        .icon-btn-enabled {
            background-image:url('images/icon/btn/enabled.png')!important;
        }

        .icon-btn-disabled {
            background-image:url('images/icon/btn/disabled.png')!important;
        }

        .icon-btn-clear {
            background-image:url('images/icon/btn/clear.png')!important;
        }

        .icon-btn-male {
            background-image:url('images/icon/btn/male.png')!important;
            background-position: left;
            background-repeat: no-repeat;
            padding-left: 14px;
        }

        .icon-btn-female {
            background-image:url('images/icon/btn/female.png')!important;
            background-position: left;
            background-repeat: no-repeat;
            padding-left: 14px;
        }

    </style>
    <script type="text/javascript">
        Ext.define('PagingToolbar', {
            extend: 'Ext.toolbar.Paging',
            alias: 'widget.resizer.pagingtoolbar',
            toolbarResizer: null,

            initComponent: function () {
                var me = this;
                me.callParent(arguments);

                var pluginClassName = "PagingToolbarResizer";

                me.toolbarResizer = Ext.create(pluginClassName);

                if (Ext.isEmpty(me.plugins)) {
                    me.plugins = [me.toolbarResizer];
                }
                else {
                    var pushTbResizer = true;
                    Ext.each(me.plugins, function (plugin) {
                        if (Ext.getClassName(plugin) == pluginClassName) {
                            pushTbResizer = false;
                        }
                    });
                    if (pushTbResizer) {
                        me.plugins.push(me.toolbarResizer);
                    }
                }
            },

            bindStore: function (store, initial, propertyName) {
                var me = this;
                me.callParent(arguments);

                if (!Ext.isEmpty(me.toolbarResizer) && !Ext.isEmpty(me.toolbarResizer.recordsPerPageCmb) && !Ext.isEmpty(store)) {
                    me.toolbarResizer.recordsPerPageCmb.setValue(store.pageSize);
                }
            }
        });
    </script>
    <script type="text/javascript">
        Ext.define('PagingToolbarResizer', {
            extend: 'Ext.AbstractPlugin',
            alias: 'plugin.pagingtoolbarresizer',

            options: [25, 100, 500, 1000],

            mode: 'remote',

            displayText: 'Records per Page',

            recordsPerPageCmb: null,

            constructor: function (config) {

                Ext.apply(this, config);

                this.callParent(arguments);
            },

            init: function (pagingToolbar) {
                var me = this;
                var comboStore = me.options;

                me.recordsPerPageCmb = Ext.create('Ext.form.field.ComboBox', {
                    typeAhead: false,
                    triggerAction: 'all',
                    forceSelection: true,
                    lazyRender: true,
                    editable: false,
                    mode: me.mode,
                    value: pagingToolbar.store.pageSize,
                    width: 80,
                    store: comboStore,
                    listeners: {
                        select: function (combo, value, i) {
                            pagingToolbar.store.pageSize = value.data.field1;
                            pagingToolbar.store.load();
                        }
                    }
                });


                var index = pagingToolbar.items.indexOf(pagingToolbar.refresh);
                pagingToolbar.insert(++index, me.displayText);
                pagingToolbar.insert(++index, me.recordsPerPageCmb);
                pagingToolbar.insert(++index, '-');

                //destroy combobox before destroying the paging toolbar
                pagingToolbar.on({
                    beforedestroy: function () {
                        me.recordsPerPageCmb.destroy();
                    }
                });

            }
        });
    </script>
</head>
<body>
    <div id="loadingSplash" >
        <div id="loadingSplashTop"></div>
        <div id="loadingSplashBottom"></div>
        <div class="loading-fading-circle" id="loadingSplashCircles">
            <div class="loading-circle-1 loading-circle"></div>
            <div class="loading-circle-2 loading-circle"></div>
            <div class="loading-circle-3 loading-circle"></div>
            <div class="loading-circle-4 loading-circle"></div>
            <div class="loading-circle-5 loading-circle"></div>
            <div class="loading-circle-6 loading-circle"></div>
            <div class="loading-circle-7 loading-circle"></div>
            <div class="loading-circle-8 loading-circle"></div>
            <div class="loading-circle-9 loading-circle"></div>
            <div class="loading-circle-10 loading-circle"></div>
            <div class="loading-circle-11 loading-circle"></div>
            <div class="loading-circle-12 loading-circle"></div>
        </div>
    </div>
    <!-- Authentication Links -->
    @if (Auth::guest())
        <script type="text/javascript">
            var userid = "";
            var username = "";
        </script>
    @else
        <script type="text/javascript">
            var userid = "{{ Auth::user()->user_id }}";
            var username = "{{ Auth::user()->user_name }}";
        </script>
    @endif
    <div id="app">
        @yield('content')
    </div>    
</body>
</html>
