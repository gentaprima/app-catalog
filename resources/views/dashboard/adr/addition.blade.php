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
            <div class="row">
                <div class="col-6">

                    <h4>Form Adition</h4>
                </div>
                <div class="col-6">

                    <button onclick="showImport()" data-toggle="modal" data-target="#modalImport" style="float: right;" class="btn btn-default"><i class="fas fa-file-import"></i> Import Data</button>
                </div>
            </div>
            <hr>
            <form action="">
                <div class="form-group row">
                    <div class="col-sm-6">
                        <div class="row">
                            <label for="" class="col-sm-4">Select Adr <span style="color: red;">*</span></label>
                            <div class="col-sm-7">
                                <select class="js-example-data-ajax" onchange="selectAdr(this)" id="adr">
                                    <option value="">Select Adr</option>
                                </select>
                            </div>
                            <div class="col-sm-1">
                                <button type="button" id="btnClearAdr" style="height: 37px;" class="btn btn-sm btn-default"><i class="fa fa-eraser"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="row">
                            <label for="" class="col-sm-2">Raw Data <span style="color: red;">*</span></label>
                            <div class="col-sm-10">
                                <input type="text" id="raw" class="form-control">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="" class="col-sm-2">Material/Service <span style="color: red;">*</span></label>
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
                    <label for="" class="col-sm-2">INC <span style="color: red;">*</span></label>
                    <div class="col-sm-10">

                        <select class="js-example-basic-single2 " onchange="selectMgc(this)" id="inc">
                            <option value="">Select INC</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="" class="col-sm-2">MGC/SGC <span style="color: red;">*</span></label>
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

    <div class="modal fade" id="modalImport" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="titleModalReference">Import Data ADR</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form">
                        <div class="form-group row">
                            <div class="col-sm-2">Excel File</div>
                            <div class="col-sm-10">
                                <input type="file" id="uploadExcel" class="form-control">
                            </div>
                        </div>
                    </div>
                    <span>Don't have excel upload template?</span><br>
                    <span>Click <a href="/getTemplateAddition">here</a> to download</span>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="closeModalDelete" data-dismiss="modal">Close</button>
                    <button onclick="uploadExcel()" type="button" id="deleteButton" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </div>

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

        $("#btnClearAdr").click(function() {
            $('#adr').val([]);
            $("#adr").select2({
                placeholder: "Select MGC",
            });
            $("#raw").val("");
            getSelectAdr();
        })

        getSelectAdr();

        function getSelectAdr() {
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
        }


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
            $('#mgc').val([]);
            $("#mgc").select2({
                placeholder: "Select MGC",
            });
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

            if (raw != '' && matSer != '' && inc != '' && mgc != '') {
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: '/CreateAddition',
                    data: {
                        data_grid: `[{"flag":"","norder":1,"id":"model_adr_entry-1","raw":"${raw}","transaction_type":"${matSer}","class_code":"${mgc}","inc_code":"${inc}","manuf":"${manufacturing}","refnbr":"${refNo}","old_mat_no":"${oldMatNo}"}]`,
                        company_code: companyCode,
                        _token: csrf_token
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

        function showImport(){
            document.getElementById("uploadExcel").value = "";
        }

        function uploadExcel() {
            const fileupload = $('#uploadExcel').prop('files')[0];
            let formData = new FormData();
            formData.append('file_excel', fileupload);
            formData.append('_token', csrf_token);


            Swal.fire({
                title: 'Are you sure?',
                text: "you want to process data!",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, process it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        type: 'POST',
                        url: "/SaveImportAddition",
                        data: formData,
                        cache: false,
                        processData: false,
                        contentType: false,
                        dataType: 'json',
                        success: function(response) {
                            if (response.success == true) {
                                Toast.fire({
                                    icon: 'success',
                                    title: response.message
                                });
                                $("#closeModalDelete").click();
                            } else {
                                Toast.fire({
                                    icon: 'error',
                                    title: response.message
                                });
                                $("#closeModalDelete").click();
                            }
                        },
                        // error: function() {
                        //     alert("Data Gagal Diupload");
                        // }
                    });
                }
            })
        }
    </script>
    @endsection