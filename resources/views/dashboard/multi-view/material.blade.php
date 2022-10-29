<?php

use Illuminate\Support\Facades\Auth;
?>
@extends('master')

@section('title', 'Multiple View | Material')
@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid mt-3">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Multiple View Material</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item">Multiple View</li>
                            <li class="breadcrumb-item active">Material</li>
                        </ol>
                    </div><!-- /.col -->
                    <p id="menu"></p>
                </div><!-- /.row -->
            </div><!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->

        <!-- Main content -->
        <section class="content">
            <div class="card p-4 mb-1 m-2">
                <div class="card-header px-0">
                    <h3 class="card-title">
                        <button type="button" class="btn btn-primary mr-1">
                            Export All &nbsp; <i class="fas fa-file-export"></i>
                        </button>
                        <button id="btn-export" type="button" class="btn btn-primary mr-1">
                            Export &nbsp; <i class="fas fa-file-export"></i>
                        </button>
                        <button id="btn-reset" type="button" class="btn btn-primary">
                            Reset &nbsp; <i class="fas fa-filter"></i>
                        </button>
                        <button type="button" id="btn-search" class="btn btn-primary mx-1">
                            Search &nbsp; <i class="fas fa-search"></i>
                        </button>
                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#filterModal">
                            More Search &nbsp; <i class="fas fa-search"></i>
                        </button>
                    </h3>
                    <div class="card-tools mt-2">
                        <div class="input-group input-group-sm" style="width: 300px;">
                            Short Desc : &nbsp;
                            <input type="text" name="table_search" id="short-desc-search"
                                class="form-control float-right" placeholder="Search">
                            <div class="input-group-append">
                                <button type="submit" class="btn btn-default">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="card-tools mr-2 mt-2">
                        <div class="input-group input-group-sm" style="width: 300px;">
                            Raw Desc : &nbsp;
                            <input type="text" name="table_search" id="raw-search" class="form-control float-right"
                                placeholder="Search">
                            <div class="input-group-append">
                                <button type="submit" class="btn btn-default">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-6 table-responsive">
                        <table class="table table-striped w-100" id="material-table">
                            <thead>
                                <tr class="d-flex">
                                    <th class="col-2 text-center">User</th>
                                    <th class="col-2 text-center">Cat</th>
                                    <th class="col-2 text-center">Std App</th>
                                    <th class="col-2 text-center">Proc App</th>
                                    <th class="col-2 text-center">SAP</th>
                                    <th class="col-3 text-center">Catalogue No</th>
                                    <th class="col-3 text-center">Short Description</th>
                                    <th class="col-3 text-center">ADR Number</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <div class="col-lg-6 table-responsive">
                        <table class="table table-striped" id="material-table2">
                            <thead>
                                <tr class="d-flex">
                                    <th class="col-1 text-center">Addition Date</th>
                                    <th class="col-1 text-center">SAP No</th>
                                    <th class="col-1 text-center">SAP Check Data</th>
                                    <th class="col-1 text-center">SAP Check Name</th>
                                    <th class="col-1 text-center">Material Owner</th>
                                    <th class="col-1 text-center">Submit Date</th>
                                    <th class="col-1 text-center">Status Adr</th>
                                    <th class="col-1 text-center">Item Status</th>
                                    <th class="col-1 text-center">Sync Status</th>
                                    <th class="col-1 text-center">Inc</th>
                                    <th class="col-1 text-center">MGC</th>
                                    <th class="col-1 text-center">Long Description</th>
                                    <th class="col-1 text-center">Raw Data</th>
                                    <th class="col-1 text-center">Material Type</th>
                                    <th class="col-1 text-center">UOM</th>
                                    <th class="col-1 text-center">Category</th>
                                    <th class="col-1 text-center">Cataloguer</th>
                                    <th class="col-1 text-center">Cataloguer Name</th>
                                    <th class="col-1 text-center">Cataloguer Check Date</th>
                                    <th class="col-1 text-center">Std App</th>
                                    <th class="col-1 text-center">Std Name App</th>
                                    <th class="col-1 text-center">Std App Check Date</th>
                                    <th class="col-1 text-center">Proc App</th>
                                    <th class="col-1 text-center">Proc App Name</th>
                                    <th class="col-1 text-center">Proc App Check Date</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                        <ul class="pagination">
                            <li>Halaman</li>
                            <li class="paginate_button active mr-2"><a href="#" aria-controls="example1"
                                    id="current_page" data-dt-idx="1" tabindex="0">1</a></li>
                            <li>Dari</li>
                            <li class="ml-2" id="total_page">25</li>
                            <li class="paginate_button next prev " id="example1_previous" data-page="prev"><a
                                    href="#"" aria-controls="example1" id="link_next" data-dt-idx="0"
                                    tabindex="0"><i class="fa fa-chevron-left"></i></a></li>
                            <li class="paginate_button next prev" id="next-step" data-page="next"><a id="link_next"
                                    href="#" aria-controls="example1" data-dt-idx="2" tabindex="0"><i
                                        class="fa fa-chevron-right"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="card p-4 mb-5 m-2">
                <div class="row">
                    <div class="col-lg-6">
                        <h4>Material Item</h4>
                        <hr>
                        <form action="">
                            <div class="form-group row">
                                <label for="" class="col-sm-3">Catologue No : </label>
                                <div class="col-sm-9">
                                    <div class="input-group mb-2">
                                        <input type="number" readonly class="form-control" id="catalog-no"
                                            placeholder="">
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="" class="col-sm-3">SAP No : </label>
                                <div class="col-sm-9">
                                    <input readonly type="text" class="form-control" id="sap-no">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="" class="col-sm-3">Raw : </label>
                                <div class="col-sm-9">
                                    <textarea readonly type="text" class="form-control" rows="5" id="raw"></textarea>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="" class="col-sm-3">Short Name Code : </label>
                                <div class="col-sm-9">
                                    <input readonly type="text" class="form-control" id="short-name">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="" class="col-sm-3">Short Description : </label>
                                <div class="col-sm-9">
                                    <input readonly type="text" class="form-control" id="short-desc">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="" class="col-sm-3">Long Desc : </label>
                                <div class="col-sm-9">
                                    <textarea readonly type="text" class="form-control" rows="5" id="long-desc"></textarea>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="" class="col-sm-3">Material Owner : </label>
                                <div class="col-sm-9">
                                    <label for="" id="material-owner"></label>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div class="col-lg-6 table-responsive" style="overflow: scroll;height:650px">
                        <h4>Characteristic</h4>
                        <hr>
                        <table class="table table-striped" id="tb-characteristic">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Characteristic</th>
                                    <th>Hist</th>
                                    <th>Value</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                        <h4>Cross References</h4>
                        <hr>
                        <table class="table table-striped" id="tb-crossref">
                            <thead>
                                <tr>
                                    <th>No. Ref.</th>
                                    <th>Old Material Code</th>
                                    <th>Manufacture/Vendor</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                        <h4>Functional Locations</h4>
                        <hr>
                        <table class="table table-striped" id="tb-functional">
                            <thead>
                                <tr>
                                    <th>Loc Name</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
        <input type="hidden" id="page" value="1">
        <div class="modal fade" id="filterModal" role="dialog" aria-labelledby="filterModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="filterModalLabel">More Search</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Old Material Code:</label>
                            <input type="text" class="form-control" id="material-code">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Material Type:</label>
                            <select class="js-example-basic-single js-example-basic-type" id="select-type">

                                <option value="">Select Type</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Category:</label>
                            <select class="js-example-basic-single js-example-basic-category" id="select-category">
                                <option value="">Select Category</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Ref No:</label>
                            <input type="text" class="form-control" id="ref-no">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Manufacture:</label>
                            <input type="text" class="form-control" id="manufacture">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Functional Location:</label>
                            <input type="text" class="form-control" id="functional">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Category:</label>
                            <select class="js-example-basic-single js-example-basic-filter-date" id="select-filter-date">
                                <option value="">Additional Date</option>
                                <option value="">SAP Chek Date</option>
                                <option value="">User Submit</option>
                                <option value="">Cataloguer Chek Date</option>
                                <option value="">STD APP Chek Date</option>
                                <option value="">Proc APP Chek Date</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">On Date:</label>
                            <input type="date" class="form-control" id="on-date">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" id="btn-filter">Ok</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- /.content -->
        <script>
            $('.js-example-basic-single').select2({
                tags: false
            });
            $('#btn-reset').click(function(){
                location.reload();
            })
            $.ajax({
                method: "GET",
                url: '/getMaterialType?query=&filter=[{"operator":"eq","value":"material_type","property":"entity_name","type":"string"}]&action=getEntity&page=1&start=0&limit=25',
                dataType: "json",
            }).done(function(v) {
                v.forEach(function(v) {
                    $(".js-example-basic-type").append('<option value="' + v.code + '">' + v.entity_code_name +
                        '</option>');

                })
            })
            $.ajax({
                method: "GET",
                url: '/getCategory?query=&filter=[{"operator":"eq","value":"itemcategory","property":"entity_name","type":"string"}]&action=getEntity&page=1&start=0&limit=25',
                dataType: "json",
            }).done(function(v) {
                v.forEach(function(v) {
                    $(".js-example-basic-category").append('<option value="' + v.code + '">' + v
                        .entity_code_name + '</option>');

                })
            })
            // {"operator":"like","value":"old","property":"old_material_code","type":"string"}
            $('#btn-filter').click(function() {

                if ($('#material-code').val() != null && $('#material-code').val() != "") {
                    likeFilter += '{"operator":"like","value":"' + $('#material-code').val() +
                        '","property":"old_material_code","type":"string"}';
                }
                var selectType = $("#select-type option:selected").val();
                console.log(selectType);
                if (selectType != null && selectType != "") {
                    likeFilter += '{"operator":"like","value":"' + selectType +
                        '","property":"type","material_type":"string"}';
                }

                var selectCategory = $("#select-category option:selected").val();

                if (selectCategory != null && selectCategory != "") {
                    likeFilter += '{"operator":"like","value":"' + selectCategory +
                        '","property":"category","type":"string"},';
                }

                if ($('#ref-no').val() != null && $('#ref-no').val() != "") {
                    likeFilter += '{"operator":"like","value":"' + $('#ref-no').val() +
                        '","property":"refno","type":"string"},';
                }

                if ($('#manufacture').val() != null && $('#manufacture').val() != "") {
                    likeFilter += '{"operator":"like","value":"' + $('#manufacture').val() +
                        '","property":"manufactur","type":"string"},';
                }

                if ($('#functional').val() != null && $('#functional').val() != "") {
                    likeFilter += '{"operator":"like","value":"' + $('#functional').val() +
                        '","property":"funcloc","type":"string"},';
                }

                if ($('#on-date').val() != null && $('#on-date').val() != "") {
                    likeFilter += '{"operator":"eq","value":"' + $('#on-date').val() +
                        '","property":"std_approval_datef","type":"string"},';
                }
                loadData(0, 25);
                // $.ajax({
                //     method: "GET",
                //     url: '/getMultiViewCatalogM?start=0&limit=25&action=getMultiView&page=1&sort=[{"property":"adr_d_items_id","direction":"ASC"}]&filter=["'+moreFilter+']'
                // })
                // [{"operator":"like","value":"old","property":"old_material_code","type":"string"},{"operator":"like","value":"ZMAT","property":"material_type","type":"string"},{"operator":"like","value":"H","property":"category","type":"string"},{"operator":"like","value":"dsa","property":"refno","type":"string"},{"operator":"like","value":"dadsa","property":"manufactur","type":"string"},{"operator":"like","value":"dsadsa","property":"funcloc","type":"string"},{"operator":"eq","value":"2022-10-11","property":"std_approval_datef","type":"string"},{"operator":"eq","value":"Material","property":"transaction_type","type":"string"}]
            })
            totalData = 0;
            likeFilter = "";
            exportData = "";
            // loadData(0, 25);
            var page = $('#page');
            page.val(1);
            $('.next').click(function() {
                var start = $('#current_page');
                pageCurr = $(this).data("page");
                if (pageCurr == "next") {
                    page.val(parseInt(page.val()) + 1);
                }
                if (pageCurr == "prev") {
                    page.val(parseInt(page.val()) - 1);
                }
                loadData(page.val(), start);
                start.html(page.val());
            })

            $('#short-desc-search').keypress(function(e) {
                var key = e.which;
                if (key == 13) // the enter key code
                {
                    likeFilter = ',{"operator": "like","value": "' + $(this).val() +
                        '","property": "short_description","type": "string"}';
                    page = 1;
                    loadData(0, 25)
                }
            });
            $('#raw-search').keypress(function(e) {
                var key = e.which;
                if (key == 13) // the enter key code
                {
                    likeFilter = ',{"operator": "like","value": "' + $(this).val() +
                        '","property": "raw","type": "string"}';
                    page = 1;
                    loadData(0, 25)
                }
            });
            $('#btn-search').click(function(e) {
                if ($('#raw-search').val() != null && $('#raw-search').val() != "") {
                    likeFilter += ',{"operator": "like","value": "' + $('#short-desc-search').val() +
                        '","property": "raw","type": "string"}';
                }
                if ($('#short-desc-search').val() != null && $('#short-desc-search').val() != "") {
                    likeFilter += ',{"operator": "like","value": "' + $('#short-desc-search').val() +
                        '","property": "short_description","type": "string"}';
                }
                page = 1
                loadData(0, 25)
                likeFilter = "";
            })
            // {"operator":"like","value":"PLATE:ASTM A36;45MM","property":"short_description","type":"string"}
            console.log("EXPORT DATA" + exportData.toString());
            $('#btn-export').click(function() {
                $.ajax({
                    method: "POST",
                    url: "/ExportMV/xlsx",
                    data: {
                        'transaction_type': 'Material',
                        'data': JSON.stringify(exportData),
                        '_token': 'vgCCbWBT8X7Miwg2mBqKhc1iscrXpGHxd31FkihY',
                        'filter': '',
                        'page': '1',
                        'start': '0',
                        'limit': '25',
                        _token: csrf_token,
                    },
                }).done(function(result) {
                    window.open("/downloadFile/" + result);
                });
            });

            function loadData(page, start) {
                page = page == 0 ? 1 : page;
                $.ajax({
                    method: "GET",
                    url: '/getMultiViewCatalogM?action=getMultiView&page=' + parseInt(page) +
                        '&start=25&limit=25&sort=[{"property":"adr_d_items_id","direction":"ASC"}]&filter=[{"operator":"eq","value":"Material","property":"transaction_type","type":"string"}' +
                        likeFilter.toString() + ']',
                    dataType: "json"
                }).done(function(result) {
                    console.log(result);
                    totalData = result.total;
                    $('#total_page').html(Math.ceil(totalData / 25));
                    $("#material-table tbody").empty();
                    $("#material-table2 tbody").empty();
                    exportData = result.data;
                    result.data.forEach(element => {
                        var rowMaterial2 = $('<tr class="d-flex tr-tab-2">');
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.addition_date + '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.sap_material_code + '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.sap_material_code_date +
                            '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.sap_material_code_by +
                            '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.owner + '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.user_submit_date + '</td></tr>'
                        )
                        rowMaterial2.append(
                            element.adr_status === "FINISH" ?
                            '<td class="col-1 text-center"> <span class="badge bg-success">' + element
                            .adr_status + '</span></td></tr>' :
                            '<td class="col-1 text-center"> <span class="badge bg-danger">' + element
                            .adr_status + '</span></td></tr>'
                        )
                        rowMaterial2.append(
                            element.item_status === "ORIGIN" ?
                            '<td class="col-1 text-center"> <span class="badge bg-success">' + element
                            .item_status + '</span></td></tr>' :
                            '<td class="col-1 text-center"> <span class="badge bg-danger">' + element
                            .item_status + '</span></td></tr>'
                        )


                        rowMaterial2.append(
                            element.sync_status === "success" ?
                            '<td class="col-1 text-center"> <span class="badge bg-success">' + element
                            .sync_status + '</span></td></tr>' :
                            '<td class="col-1 text-center"> <span class="badge bg-danger">' + element
                            .sync_status + '</span></td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.inc + '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.groupclass + '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.long_description + '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.raw + '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.material_type + '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.uom + '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.category + '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.cataloguer + '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.cataloguer_by + '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.cataloguer_date + '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.proc_approver + '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.std_approval_by + '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.std_approval_date + '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.proc_approver + '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.proc_approver_by + '</td></tr>'
                        )
                        rowMaterial2.append(
                            '<td class="col-1 text-center">' + element.proc_approver_date + '</td></tr>'
                        )

                        $("#material-table2").append(rowMaterial2);


                        var rowMaterial = $('<tr class="d-flex tr-tab-1">');
                        rowMaterial.append(
                            element.status_user == 1 ?
                            '<td style="font-size:12px" class="col-2 text-center"><i class="fas fa-circle nav-icon text-success"></i></td>' :
                            '<td style="font-size:12px" class="col-2 text-center"><i class="fas fa-circle nav-icon text-danger"></i></td>'
                        )
                        rowMaterial.append(
                            element.status_cat == 1 ?
                            '<td style="font-size:12px" class="col-2 text-center"><i class="fas fa-circle nav-icon text-success"></i></td>' :
                            '<td style="font-size:12px" class="col-2 text-center"><i class="fas fa-circle nav-icon text-danger"></i></td>'
                        )
                        rowMaterial.append(
                            element.status_stdapp == 1 ?
                            '<td style="font-size:12px" class="col-2 text-center"><i class="fas fa-circle nav-icon text-success"></i></td>' :
                            '<td style="font-size:12px" class="col-2 text-center"><i class="fas fa-circle nav-icon text-danger"></i></td>'
                        )
                        rowMaterial.append(
                            element.status_proc == 1 ?
                            '<td style="font-size:12px" class="col-2 text-center"><i class="fas fa-circle nav-icon text-success"></i></td>' :
                            '<td style="font-size:12px" class="col-2 text-center"><i class="fas fa-circle nav-icon text-danger"></i></td>'
                        )
                        rowMaterial.append(
                            element.status_sap == 1 ?
                            '<td style="font-size:12px" class="col-2 text-center"><i class="fas fa-circle nav-icon text-success"></i></td>' :
                            '<td style="font-size:12px" class="col-2 text-center"><i class="fas fa-circle nav-icon text-danger"></i></td>'
                        )
                        rowMaterial.append('<td class="col-3 text-center">' + element.catalog_no + ' </td>')
                        rowMaterial.append('<td class="col-3 text-center">' + element.short_description +
                            '</td>')
                        rowMaterial.append('<td class="col-3 text-center">' + element
                            .adr_no + '</td>')

                        $("#material-table").append(rowMaterial);
                    });
                    // $(".item-model-number .value").each(function() {
                    //     var value = $(this).text();
                    //     console.log(value);
                    // })
                    $(".tr-tab-1").click(
                        function(e) {
                            $(this).each(function() {
                                var value = $(this).text();
                                console.log(value);
                                // var value = "3146"
                                //Characteristics
                                $("#tb-characteristic tbody").empty();
                                $.ajax({
                                    method: "GET",
                                    url: '/getCatalogM?filter=[{"operator":"eq","value":"' +
                                        value.split(" ")[0] +
                                        '","property":"catalog_no","type":"string"},{"operator":"eq","value":"Active","property":"is_active","type":"string"},{"operator":"eq","value":"Material","property":"transaction_type","type":"string"}]&action=getCatalogM&page=1&start=0&limit=25',
                                    dataType: "json"
                                }).done(function(v) {
                                    var data = v.data[0];
                                    $('#catalog-no').val(data.catalog_no);
                                    $('#sap-no').val(data.sap_material_code);
                                    $('#raw').val(data.raw);
                                    $('#short-name').val(data.short_name_code);
                                    $('#short-desc').val(data.short_description);
                                    $('#long-desc').val(data.long_description);
                                    $('#material-owner').html(data.owner);
                                    $.ajax({
                                        method: "GET",
                                        url: '/getItemsIncCharacteristics?start=0&limit=300&inc_m_id=' +
                                            data.inc_m_id +
                                            '&adr_d_items_id=4&catalog_no=4&sort=[{"property":"sequence","direction":"ASC"}]&page=1',
                                        dataType: "json"
                                    }).done(function(v) {

                                        if (v.data != null && v.data.length > 0) {
                                            v.data.forEach(function(row) {
                                                var rowChar = $(
                                                    '<tr class="tr-tab-2">');
                                                rowChar.append('<td>' + row
                                                    .sequence +
                                                    ' </td>');
                                                rowChar.append('<td>' + row
                                                    .characteristics +
                                                    ' </td>');
                                                rowChar.append(
                                                    '<td><iclass="fas fa-info nav-icon text-danger"></i></td>'
                                                );
                                                rowChar.append('<td>' + row
                                                    .nvalue +
                                                    ' </td>');
                                                rowChar.append('<td>' + row
                                                    .type +
                                                    ' </td>');
                                                $("#tb-characteristic").append(
                                                    rowChar);
                                            })
                                        }

                                    })
                                    //Cross Ref
                                    $("#tb-crossref tbody").empty();
                                    $.ajax({
                                        method: "GET",
                                        url: '/getItemsCrossReferences?start=0&limit=300&filter=[{"operator":"eq","value":' +
                                            value.split(" ")[0] +
                                            ',"property":"adr_d_items_id","type":"numeric"}]&page=1',
                                        dataType: "json"
                                    }).done(function(val) {
                                        if (val.data.length > 0) {
                                            val.data.forEach(function(row) {
                                                var rowCrossRef = $(
                                                    '<tr class="tr-tab-3">'
                                                );

                                                rowCrossRef.append('<td>' + row
                                                    .refno +
                                                    ' </td>');

                                                rowCrossRef.append('<td>' + row
                                                    .old_material_code +
                                                    ' </td>');

                                                rowCrossRef.append('<td>' + row
                                                    .manufactur +
                                                    ' </td>');

                                                rowCrossRef.append('<td>' + row
                                                    .type +
                                                    ' </td>');

                                                $("#tb-crossref")
                                                    .append(rowCrossRef);
                                            })
                                        }
                                    })
                                    //Functional Location
                                    $("#tb-functional tbody").empty();
                                    $.ajax({
                                        method: "GET",
                                        url: '/getItemsFuncloc?_dc=1666812249332&start=0&limit=300&filter=[{"operator":"eq","value":2,"property":"adr_d_items_id","type":"numeric"}]&page=1',
                                        dataType: "json"
                                    }).done(function(v) {
                                        if (v.data != null && v.data.length > 0) {
                                            v.data.forEach(function(row) {
                                                var rowChar = $(
                                                    '<tr class="tr-tab-3">'
                                                );
                                                rowChar.append('<td>' + row
                                                    .name +
                                                    ' </td>');

                                                rowChar.append('<td>' + row
                                                    .description +
                                                    ' </td>');

                                                $("#tb-functional")
                                                    .append(rowChar);
                                            })
                                        }
                                    })
                                })
                            })
                        }
                    )
                });
            }
        </script>

    @endsection
