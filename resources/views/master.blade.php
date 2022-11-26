<!DOCTYPE html>
<html lang="en" style="overflow-x: hidden;">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title')</title>

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="{{asset('css_dashboard/plugins/fontawesome-free/css/all.min.css')}}">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Tempusdominus Bootstrap 4 -->
    <link rel="stylesheet" href="{{asset('css_dashboard/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css')}}">
    <!-- iCheck -->
    <link rel="stylesheet" href="{{asset('css_dashboard/plugins/icheck-bootstrap/icheck-bootstrap.min.css')}}">
    <!-- JQVMap -->
    <link rel="stylesheet" href="{{asset('css_dashboard/plugins/jqvmap/jqvmap.min.css')}}">
    <!-- Theme style -->
    <link rel="stylesheet" href="{{asset('css_dashboard/dist/css/adminlte.min.css')}}">
    <link rel="stylesheet" href="{{asset('css_dashboard/style.css')}}">
    <!-- overlayScrollbars -->
    <link rel="stylesheet" href="{{asset('css_dashboard/plugins/overlayScrollbars/css/OverlayScrollbars.min.css')}}">
    <!-- Daterange picker -->
    <link rel="stylesheet" href="{{asset('css_dashboard/plugins/daterangepicker/daterangepicker.css')}}">
    <!-- summernote -->
    <link rel="stylesheet" href="{{asset('css_dashboard/plugins/summernote/summernote-bs4.min.css')}}">
    <script src="{{asset('css_dashboard/plugins/jquery/jquery.min.js')}}"></script>
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.css">
    <script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.js"></script>
    <script>
        var csrf_token = "<?php echo e(csrf_token()); ?>";
        const companyCode = localStorage.getItem('companyCode');
        const realName = localStorage.getItem('realName');
        const userName = localStorage.getItem('username');
        const groupName = localStorage.getItem('groupName');
        const userId = localStorage.getItem('userId');
    </script>
    <style>
        .modal:nth-of-type(even) {
            z-index: 1052 !important;
        }

        /* .modal-backdrop.show:nth-of-type(even) {
            z-index: 1051 !important;
        } */

        #realName {
            position: relative;
            top: -10px;
            font-weight: bold;
        }

        .nav-link p {
            font-size: 15px !important;
        }

        .select2.select2-container.select2-container--default {
            width: 100% !important;
            margin-left: -7px !important;
        }

        .select2-container .select2-selection--single {
            height: 37px !important;
        }

        .select2-container--default .select2-selection--single .select2-selection__arrow {
            top: 7px !important;
        }

        .select2.select2-container.select2-container--default {
            margin-left: 0px !important;
        }

        #btnSearch:hover {
            cursor: pointer;
        }

        .btn-outline-primary {
            background-color: #fff !important;
            color: #C1C12E !important;
            border-color: #C1C12E !important;
        }

        .btn-outline-primary:hover {
            background-color: #C1C12E !important;
            color: #fff !important;
            border-color: #C1C12E !important;
        }

        #tableDataCharacteristic {
            /* display: block;
            white-space: nowrap;
            table-layout: fixed; */
            width: 100%;
            border: 1px solid blue;
        }

        #tableDataCharacteristicOld {
            /* display: block;
            white-space: nowrap;
            table-layout: fixed; */
            width: 100%;
            border: 1px solid blue;
        }

        /* .multiple-table td{
            word-wrap: break-word;
            white-space: initial;
        } */

        .select2-selection__choice__display {
            color: black;
        }

        .select2-selection__choice {
            border: none;
        }


        #tableDataReason td{
            word-wrap: break-word;
            white-space: initial;
        }
        #tableDataCharacteristic td {
            word-wrap: break-word;
            white-space: initial;
        }

        #tableDataCharacteristicOld td {
            word-wrap: break-word;
            white-space: initial;
        }


        #tableData td {
            word-wrap: break-word;
            white-space: initial;
        }

        #dataTableDetail td {
            word-wrap: break-word;
            white-space: initial;
        }

        #tableDataReference {
            display: block;
            overflow-x: auto;
            white-space: nowrap;
        }

        #tableDataHistory {
            width: 100%;
            border: 1px solid blue;
        }

        .scrollwrapper {
            overflow: auto;
        }

        .scrollwrapperCharacteristic {
            overflow: auto;
            max-height: 400px;
        }


        /* .container-table {
            overflow: scroll;
            max-height: 400px;
            max-width: 700px;
        } */

        table {
            border-collapse: collapse;
        }

        table th,
        table td {
            max-width: 300px;
            padding: 8px 16px;
            border: 1px solid #ddd;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        table thead {
            position: sticky;
            inset-block-start: 0;
            background-color: #ddd;
        }

        #flowBoxes {
            margin: auto;
            max-width: 100%;

        }

        #flowBoxes div {
            display: inline-block;
            position: relative;
            height: 25px;
            line-height: 25px;
            padding: 0 20px;
            border: 1px solid #ccc;
            margin-right: 2px;
            background-color: white;
        }

        #flowBoxes div.right:after {
            content: '';
            border-top: 1px solid #ccc;
            border-right: 1px solid #ccc;
            width: 18px;
            height: 18px;
            position: absolute;
            right: 0;
            top: -1px;
            background-color: white;
            z-index: 150;

            -webkit-transform: translate(10px, 4px) rotate(45deg);
            -moz-transform: translate(10px, 4px) rotate(45deg);
            -ms-transform: translate(10px, 4px) rotate(45deg);
            -o-transform: translate(10px, 4px) rotate(20deg);
            transform: translate(10px, 4px) rotate(45deg);
        }

        #flowBoxes div.left:before {
            content: '';
            border-top: 1px solid #ccc;
            border-right: 1px solid #ccc;
            width: 18px;
            height: 18px;
            position: absolute;
            left: 0;
            top: -1px;
            background-color: white;
            z-index: 50;

            -webkit-transform: translate(-10px, 4px) rotate(45deg);
            -moz-transform: translate(-10px, 4px) rotate(45deg);
            -ms-transform: translate(-10px, 4px) rotate(45deg);
            -o-transform: translate(-10px, 4px) rotate(20deg);
            transform: translate(-10px, 4px) rotate(45deg);
        }

        #flowBoxes .active {
            background-color: green;
            color: white;
        }

        #flowBoxes .notactive {
            background-color: red;
            color: white;
        }

        #flowBoxes div.active:after {
            background-color: green;
        }

        #flowBoxes div.notactive:after {
            background-color: red;
        }
    </style>
    <style>
        .colored-toast.swal2-icon-success {
            background-color: #a5dc86 !important;
        }

        .colored-toast.swal2-icon-error {
            background-color: #f27474 !important;
        }

        .colored-toast.swal2-icon-warning {
            background-color: #f8bb86 !important;
        }

        .no-border {
            border: none;
        }

        .search {
            background-color: #b9b9b93b;
            color: #FFF;
            width: 300px;
            float: right;
            border-radius: 10px;
        }

        .border-search {
            border-top-right-radius: 0px !important;
            border-bottom-right-radius: 0px !important;
        }
    </style>
</head>

<body class="hold-transition sidebar-mini layout-fixed" style="background-color: #f4f6f9;">
    <div class="wrapper">

        <!-- Preloader -->
        <div class="preloader flex-column justify-content-center align-items-center">
            <img class="animation__shake" src="{{asset('css_dashboard/dist/img/AdminLTELogo.png')}}" alt="AdminLTELogo" height="60" width="60">
        </div>

        <!-- Navbar -->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light shadow" style="border-bottom: none !important;height:70px;">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                </li>
                <li class="nav-item d-none d-sm-inline-block">
                    <a href="/" class="nav-link">Home</a>
                </li>
                <!-- <li class="nav-item d-none d-sm-inline-block">
                    <a href="#" class="nav-link">Contact</a>
                </li> -->
            </ul>

            <!-- Right navbar links -->
            <ul class="navbar-nav ml-auto">
                <!-- Navbar Search -->
                <!-- <li class="nav-item">
                    <a class="nav-link" data-widget="navbar-search" href="#" role="button">
                        <i class="fas fa-search"></i>
                    </a>
                    <div class="navbar-search-block">
                        <form class="form-inline">
                            <div class="input-group input-group-sm">
                                <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
                                <div class="input-group-append">
                                    <button class="btn btn-navbar" type="submit">
                                        <i class="fas fa-search"></i>
                                    </button>
                                    <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </li> -->
                <li class="nav-item dropdown">
                    <a class="nav-link" data-toggle="dropdown" href="#" style="height: 0px !important;" aria-expanded="false">
                        <img style="margin-top: -25px;border:3px solid #fff;height:50px;" class="img-size-50 img-circle" src="{{asset('css_dashboard/dist/img/avatar.png')}}" alt="">
                        <span id="realName"></span>
                        <!-- <img src="https://tvupi.redmilkproject.com/LOGO_TVUPI_PLAYSTORE_1.png" alt="User Avatar" style="margin-top: -25px;border:3px solid #fff;height:50px;" class="img-size-50 img-circle"> -->
                    </a>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right" style="margin-top: 30px; left: inherit; right: 0px;">
                        <div class="dropdown-divider"></div>
                        <!-- <a href="/profile" class="dropdown-item">
                            <i class="fas fa-user mr-2"></i> Profile
                        </a> -->
                        <div class="dropdown-divider"></div>
                        <a href="#" onclick="logout()" class="dropdown-item">
                            <i class="fas fa-share mr-2"></i> Logout
                        </a>

                    </div>
                </li>
                <!-- <span class="ml-2">test</span> -->

                <!-- Notifications Dropdown Menu -->
                <!-- <li class="nav-item dropdown">
                    <a class="nav-link" data-toggle="dropdown" href="#">
                        <i class="far fa-bell"></i>
                        <span class="badge badge-warning navbar-badge">15</span>
                    </a>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <span class="dropdown-item dropdown-header">15 Notifications</span>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <i class="fas fa-envelope mr-2"></i> 4 new messages
                            <span class="float-right text-muted text-sm">3 mins</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <i class="fas fa-users mr-2"></i> 8 friend requests
                            <span class="float-right text-muted text-sm">12 hours</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <i class="fas fa-file mr-2"></i> 3 new reports
                            <span class="float-right text-muted text-sm">2 days</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
                    </div>
                </li> -->
                <!-- <li class="nav-item">
                    <a class="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i class="fas fa-expand-arrows-alt"></i>
                    </a>
                </li> -->
                <!-- <li class="nav-item">
                    <a class="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
                        <i class="fas fa-th-large"></i>
                    </a>
                </li> -->
            </ul>
        </nav>
        <!-- /.navbar -->

        <!-- Main Sidebar Container -->
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <!-- Brand Logo -->
            <a href="index3.html" class="brand-link mb-3" style="height: 70px;border:none!important;">
                <img src="{{asset('/logo-transparent.png')}}" alt="AdminLTE Logo" class="brand-image bb-2" style="width: 128px;max-height:76px !important;">
                <span class="brand-text font-weight-light" style="color:#343a40">.</span>
            </a>

            <!-- Sidebar -->
            <div class="sidebar">
                <!-- Sidebar user panel (optional) -->


                <!-- Sidebar Menu -->
                <nav class="mt-4 pb-5">
                    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <div id="menu-group">

                        </div>



                    </ul>
                </nav>
                <!-- /.sidebar-menu -->
            </div>
            <!-- /.sidebar -->
        </aside>

        @yield('content')

    </div>
    <!-- /.content-wrapper -->
    <footer class="main-footer">
        <strong>Copyright &copy; <?= date('Y') ?> <a href="#">PT. Mifa Bersaudara</a>.</strong>
        All rights reserved.
        <!-- <div class="float-right d-none d-sm-inline-block">
                <b>Version</b> 3.2.0
            </div> -->
    </footer>

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
        <!-- Control sidebar content goes here -->
    </aside>
    <!-- /.control-sidebar -->
    </div>
    <!-- ./wrapper -->

    <!-- jQuery -->

    <!-- jQuery UI 1.11.4 -->

    <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
    <script>
        // $.widget.bridge('uibutton', $.ui.button)
    </script>
    <!-- Bootstrap 4 -->
    <script src="{{asset('css_dashboard/plugins/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
    <!-- ChartJS -->
    <script src="{{asset('css_dashboard/plugins/chart.js/Chart.min.js')}}"></script>
    <!-- Sparkline -->
    <script src="{{asset('css_dashboard/plugins/sparklines/sparkline.js')}}"></script>
    <!-- JQVMap -->
    <!-- <script src="{{asset('css_dashboard/plugins/jqvmap/jquery.vmap.min.js')}}"></script>
<script src="{{asset('css_dashboard/plugins/jqvmap/maps/jquery.vmap.usa.js')}}"></script> -->
    <!-- jQuery Knob Chart -->
    <script src="{{asset('css_dashboard/plugins/jquery-knob/jquery.knob.min.js')}}"></script>
    <!-- daterangepicker -->
    <script src="{{asset('css_dashboard/plugins/moment/moment.min.js')}}"></script>
    <script src="{{asset('css_dashboard/plugins/daterangepicker/daterangepicker.js')}}"></script>
    <!-- Tempusdominus Bootstrap 4 -->
    <script src="{{asset('css_dashboard/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js')}}"></script>
    <!-- Summernote -->
    <script src="{{asset('css_dashboard/plugins/summernote/summernote-bs4.min.js')}}"></script>
    <!-- overlayScrollbars -->
    <script src="{{asset('css_dashboard/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js')}}"></script>
    <!-- AdminLTE App -->
    <script src="{{asset('css_dashboard/dist/js/adminlte.js')}}"></script>

    <!-- AdminLTE for demo purposes -->
    <!-- <script src="{{asset('css_dashboard/dist/js/demo.js')}}"></script> -->
    <!-- AdminLTE dashboard demo (This is only for demo purposes) -->
    <script src="{{asset('css_dashboard/dist/js/pages/dashboard.js')}}"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>



    <script>
        document.getElementById("realName").innerHTML = realName + ' (' + groupName + ')';
        // LOAD MENU
        function logout() {
            localStorage.clear();
            window.location = '/logout';
        }

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
                popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        })

        var storeAccordion;
        let dataUsersMenu = [];
        $.ajax({
            url: '/RootMenu',
            type: 'get',
            dataType: 'json',
            async: false,
            success: function(response) {
                // storeAccordion = response.data
                for (let i = 0; i < response.data.length; i++) {
                    let dataMenuSubChild = [];

                    $.ajax({
                        url: `/TreeMenu?parent_id=${response.data[i].id}&node=root`,
                        type: 'get',
                        dataType: 'json',
                        async: false,
                        success: function(treeMenu) {
                            dataMenuSubChild.push(treeMenu);
                        }
                    })

                    let dataMenu = {
                        id: response.data[i].id,
                        text: response.data[i].text,
                        url: response.data[i].url,
                        route: response.data[i].route,
                        subChild: dataMenuSubChild[0]
                    }

                    dataUsersMenu.push(dataMenu);
                }
            }

        })
        for (let i = 0; i < dataUsersMenu.length; i++) {
            let route = dataUsersMenu[i].handler
            $("#menu-group").append(`<li class="nav-item " id="main-menu-${dataUsersMenu[i].id}">
                                <a href="#" class="nav-link {{ Request::is('${route}') ? 'active' : '' }}">
                                    <i class="nav-icon fas fa-tachometer-alt"></i>
                                    <p>
                                        ${dataUsersMenu[i].text}
                                        <i class="right fas fa-angle-left"></i>
                                    </p>
                                </a>
                                <ul class="nav nav-treeview" id="treeview-${dataUsersMenu[i].id}">
                            </ul>
                        </li>`)

            for (let j = 0; j < dataUsersMenu[i].subChild.length; j++) {

                if (dataUsersMenu[i].subChild[j].children.length > 0) {
                    // SET MAIN MENU
                    $("#treeview-" + dataUsersMenu[i].subChild[j].parent_id).append(
                        ` <li class="nav-item" id="subchild-${dataUsersMenu[i].subChild[j].id}">
                                    <a href="#" class="nav-link">
                                        <i class="far fa-circle nav-icon"></i>
                                        <p>
                                        ${dataUsersMenu[i].subChild[j].text}
                                            <i class="fas fa-angle-left right"></i>
                                        </p>
                                    </a>
                                    <ul class="nav nav-treeview" id="treeview-children-${dataUsersMenu[i].subChild[j].id}">
                                    </ul>
                                </li>`
                    )

                    for (let k = 0; k < dataUsersMenu[i].subChild[j].children.length; k++) {
                        // SET CHILDREN MENU
                        if (dataUsersMenu[i].subChild[j].children[k].published == "true") {
                            $("#treeview-children-" + dataUsersMenu[i].subChild[j].children[k].parent_id).append(
                                `<li class="nav-item">
                                                <a href="${dataUsersMenu[i].subChild[j].children[k].url}" class="nav-link" id="children-${dataUsersMenu[i].subChild[j].children[k].id}">
                                                    <i class="far fa-minus nav-icon"></i>
                                                    <p>${dataUsersMenu[i].subChild[j].children[k].text}</p>
                                                </a>
                                            </li>`
                            )
                        }
                    }
                } else {
                    // SET SUBCHILD MENU
                    $("#treeview-" + dataUsersMenu[i].subChild[j].parent_id).append(
                        `<li class="nav-item">
                            <a href="${dataUsersMenu[i].subChild[j].url}" class="nav-link"  id="subchild-${dataUsersMenu[i].subChild[j].id}">
                                <i class="far fa-circle nav-icon"></i>
                                <p>${dataUsersMenu[i].subChild[j].text}</p>
                            </a>
                        </li>`
                    )

                }




            }
        }
    </script>

</body>

</html>