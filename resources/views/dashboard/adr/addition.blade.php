@extends('master')

@section('title','Addition')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid mt-3">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Addition</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item">Adr & History</li>
                        <li class="breadcrumb-item active">Addition</li>
                    </ol>
                </div><!-- /.col -->
                <p id="menu"></p>
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">

        <div class="card p-4 mb-5 m-2">
            <h4>Form Adition</h4>
            <hr>
            <form action="">
                <div class="form-group row">
                    <div class="col-sm-6">
                        <div class="row">
                            <label for="" class="col-sm-4">Select Adr</label>
                            <div class="col-sm-8">
                                <select class="js-example-data-ajax" onchange="selectAdr(this)" id="adr">
                                    <option value="">Select Adr</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="row">
                            <label for="" class="col-sm-2">Raw Data</label>
                            <div class="col-sm-10">
                                <input type="text" id="raw" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="" class="col-sm-2">Material/Service</label>
                    <div class="col-sm-10">
                        <select onchange="selectInc(this)" id="matSer" class="form-control ">
                            <option value="">Select Material/Service</option>
                            <option value="Material">Material</option>
                            <option value="Service">Service</option>
                        </select>
                    </div>
                    <!-- <div class="col-sm-6"></div> -->
                </div>
                <div class="form-group row">
                    <label for="" class="col-sm-2">INC</label>
                    <div class="col-sm-10">

                        <select class="js-example-basic-single2 " onchange="selectMgc(this)" id="inc">
                            <option value="">Select INC</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="" class="col-sm-2">MGC/SGC</label>
                    <div class="col-sm-10">

                        <select class="js-example-basic-single3 " id="mgc">
                            <option value="">Select MGC</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="" class="col-sm-2">Ref. No</label>
                    <div class="col-sm-10">
                        <input type="text" id="refNo" class="form-control ">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="" class="col-sm-2">Old. Mat No</label>
                    <div class="col-sm-10">
                        <input type="text" id="oldMatNo" class="form-control ">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="" class="col-sm-2">Manufacturing</label>
                    <div class="col-sm-10">
                        <input type="text" id="manufacturing" class="form-control ">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="" class="col-sm-2"></label>
                    <button type="button" onclick="saveData()" class="btn btn-primary col-sm-2">Submit</button>
                </div>
            </form>
        </div>

    </section>
    <!-- /.content -->

    <script>
        $(document).ready(function() {
            $("#main-menu-MNU1").addClass("nav-item menu-is-opening menu-open")
            $("#subchild-MNU2").addClass("nav-link active")
        });

        $(document).ready(function() {
            $('.js-example-basic-single').select2();
            $('.js-example-basic-single2').select2();
            $('.js-example-basic-single3').select2();
        });


        $("#adr").select2({

            ajax: {
                url: `/getAdditionHistoryD`,
                dataType: 'json',
                data: function(params) {
                    if (params.term == undefined) {
                        params.term = ""
                    }
                    var query = {
                        query: params.term,
                        action: "getAdditionHistoryD",
                        page: 1,
                        start: 0,
                        limit: 25,
                        filter: `[{"operator":"like","value":"${params.term}","property":"raw","type":"string"}]`
                    }
                    return query;
                },
                processResults: function(data) {
                    return {
                        results: $.map(data, function(item) {
                            return {
                                text: item.raw,
                                id: item.raw
                            }
                        })
                    };
                }
            }
        })

        function selectInc(val) {
            let matearialService = val.value;
            $("#inc").select2({

                ajax: {
                    url: `/getIncMgc`,
                    dataType: 'json',
                    data: function(params) {
                        if (params.term == undefined) {
                            params.term = ""
                        }
                        var query = {
                            query: params.term,
                            action: "getIncByMGC",
                            page: 1,
                            start: 0,
                            limit: 25,
                            filter: `[{"operator":"eq","value":"${matearialService}","property":"transaction_type","type":"string"},{"operator":"like","value":"${params.term}","property":"class_inc_name","type":"string"},{"operator":"eq","value":"Active","property":"is_active","type":"string"}]`
                        }
                        return query;
                    },
                    processResults: function(data) {
                        return {
                            results: $.map(data, function(item) {
                                return {
                                    text: item.class_inc_name,
                                    id: item.inc
                                }
                            })
                        };
                    }
                }
            })
        }

        function selectMgc(val) {
            let inc = val.value;
            let materialService = document.getElementById("matSer").value
            $("#mgc").select2({

                ajax: {
                    url: `/getMgcByInc`,
                    dataType: 'json',
                    data: function(params) {
                        if (params.term == undefined) {
                            params.term = ""
                        }
                        var query = {
                            query: params.term,
                            action: "getIncByMGC",
                            page: 1,
                            start: 0,
                            limit: 25,
                            filter: `[{"operator":"like","value":"${materialService}","property":"transaction_type","type":"string"},{"operator":"eq","value":"${inc}","property":"inc","type":"string"}]`
                        }
                        return query;
                    },
                    processResults: function(data) {
                        return {
                            results: $.map(data, function(item) {
                                return {
                                    text: item.name,
                                    id: item.groupclass
                                }
                            })
                        };
                    }
                }
            })
        }

        function selectAdr(val) {
            document.getElementById("raw").value = val.value;
        }

        function saveData() {
           
            let raw = document.getElementById("raw").value;
            let matSer = document.getElementById("matSer").value;
            let inc = document.getElementById("inc").value;
            let mgc = document.getElementById("mgc").value;
            let refNo = document.getElementById("refNo").value;
            let oldMatNo = document.getElementById("oldMatNo").value;
            let manufacturing = document.getElementById("manufacturing").value;

            if (raw != '' && matSer != '' && inc != '' && refNo != '' && oldMatNo != '' && manufacturing != '') {
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: '/CreateAddition',
                    data: {
                        data_grid: `[{"flag":"","norder":1,"id":"model_adr_entry-1","raw":"${raw}","transaction_type":"${matSer}","class_code":"${mgc}","inc_code":"${inc}","manuf":"${manufacturing}","refnbr":"${refNo}","old_mat_no":"${manufacturing}"}]`,
                        company_code : "",
                        _token : csrf_token
                    },
                    success: function(response) {
                        if (response.success == true) {
                            Toast.fire({
                                icon: 'success',
                                title: 'Submit success, Please check your request on menu history'
                            });
                            window.location = "/addition-history";
                        }
                    }
                })
            } else {
                Toast.fire({
                    icon: 'error',
                    title: 'Sorry, data cannot be null'
                });
            }
        }
        2
    </script>
    @endsection