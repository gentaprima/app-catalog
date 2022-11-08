@extends('master')

@section('title','Revision | Material')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid mt-3">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Material</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item">Adr & History</li>
                        <li class="breadcrumb-item">Revision</li>
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

        <div class="card p-4 mb-5 m-2">
            <div class="row">
                <div class="col-sm-6">
                    <a href="/form-revision-material" class="btn btn-outline-primary" id="btnReqRevision"><i class="fa fa-plus"></i> Add Rev Request</a>
                    <a href="/form-revision-material" class="btn btn-outline-primary" id="btnApproveRevision"><i class="fa fa-plus"></i> Approve Rev Request</a>
                </div>
            </div>
            <table id="tableData" class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Req. Revision No</th>
                        <th>Adr No</th>
                        <th>Catalogue No</th>
                        <th>SAP No</th>
                        <th>Request Date</th>
                        <th>Last Update</th>
                        <th>Update By</th>
                        <th>Status</th>
                        <th>History</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
            <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                <ul class="pagination">
                    <li>Halaman</li>
                    <li class="paginate_button active mr-2"><a href="#" aria-controls="example1" id="current_page" data-dt-idx="1" tabindex="0">1</a></li>
                    <li>Dari</li>
                    <li class="ml-2" id="total_page">1</li>
                    <li class="paginate_button next prev disabledd" id="example1_previous"><a href="#" onclick="prevPage()" aria-controls="example1" id="link_prev" data-dt-idx="0" tabindex="0"><i class="fa fa-chevron-left"></i></a></li>
                    <li class="paginate_button next prev" id="example1_next"><a id="link_next" onclick="nextPage()" href="#" aria-controls="example1" data-dt-idx="2" tabindex="0"><i class="fa fa-chevron-right"></i></a></li>
                </ul>
            </div>
        </div>
        <p hidden="true" id="page">1</p>
        <p hidden="true" id="start">25</p>
        <p hidden="true" id="limit">25</p>
        <p hidden="true" id="totalData"></p>
        <div class="modal fade" id="modalDetail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="titleModalReference">Delete Data</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h4>Material Item Revision</h4>
                        <hr>
                        <table id="tableMaterial" class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>INC</th>
                                    <th>MGC</th>
                                    <th>Material Type</th>
                                    <th>UOM</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                        <hr>
                        <h4>Reason</h4>
                        <hr>
                        <table id="tableReason" class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Users</th>
                                    <th>Reason</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                        <hr>
                        <div class="row">
                            <div class="col-6">
                                <h4>Characteristic New</h4>
                                <hr>
                                <div class="scrollwrapperCharacteristic">
                                    <table id="tableDataCharacteristic" class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Characteristic</th>
                                                <th>Value</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="col-6">
                                <h4>Characteristic Old</h4>
                                <hr>
                                <div class="scrollwrapperCharacteristic">
                                    <table id="tableDataCharacteristicOld" class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>No</th>
                                                <th>Characteristic</th>
                                                <th>Value</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="closeModalDelete" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- /.content -->

    <script>
        loadData(1);
        $(document).ready(function() {
            $("#main-menu-MNU1").addClass("nav-item menu-is-opening menu-open")
            $("#subchild-MNU3").addClass("nnav-item menu-open")
            $("#children-MNU28").addClass("nav-link active")
        });

        if (groupName == 'User') {
            document.getElementById("btnReqRevision").hidden = false
            document.getElementById("btnApproveRevision").hidden = true
        } else {
            document.getElementById("btnReqRevision").hidden = true
            document.getElementById("btnApproveRevision").hidden = false
        }

        function loadData(page = 1, start = 1, limit = 25) {
            $("#tableData tbody").empty();
            $.ajax({
                url: `/getRevisionRequestM?page=${page}&start=${start}&limit=${limit}&filter=[{"operator":"eq","value":"Material","property":"transaction_type","type":"string"}]&sort=[{"property":"id","direction":"DESC"}]`,
                type: 'get',
                dataType: 'json',
                success: function(response) {
                    var totalPage = Math.ceil(response.total / 25)
                    document.getElementById("totalData").innerHTML = totalPage
                    document.getElementById("total_page").innerHTML = totalPage
                    for (let i = 0; i < response.data.length; i++) {
                        var tr = $("<tr>");
                        tr.append("<td>" + response.data[i].request_no + "</td>");
                        tr.append("<td>" + (response.data[i].adr_no) + "</td>");
                        tr.append("<td>" + (response.data[i].catalog_no) + "</td>");
                        tr.append("<td>" + (response.data[i].sap_material_code) + "</td>");
                        tr.append("<td>" + (response.data[i].created_at) + "</td>");
                        tr.append("<td>" + (response.data[i].updated_at) + "</td>");
                        tr.append("<td>" + (response.data[i].process_by) + "</td>");
                        tr.append("<td>" + (response.data[i].process_status) + "</td>");
                        tr.append(`<td>
                                        <center>
                                            <button style='border:none;' onclick="viewDetail('${response.data[i].request_no}','${response.data[i].id}','${response.data[i].adr_d_items_id}','${response.data[i].inc_m_id}')" data-toggle="modal" data-target="#modalDetail" class='btn btn-sm btn-default'>
                                                <i class='fa fa-table'></i> 
                                            </button>
                                        </center>
                                    </td>`);
                        $("#tableData").append(tr);
                    }
                }
            })
        }

        function viewDetail(requestNo, id,adrDItem,incMId) {
            document.getElementById("titleModalReference").innerHTML = 'View Detail No.' + requestNo;
            loadMaterialItem(id);
            loadReason(id);
            loadCharacteristicNew(id);
            loadCharacteristicOld(id,adrDItem,incMId);
        }

        function loadCharacteristicOld(id,adrDItem,incMId) {
            $("#tableDataCharacteristicOld tbody").empty();
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: `/getAuditAdrDItemsChar?_token=${csrf_token}&page=1&start=0&limit=300&inc_m_id=${incMId}&adr_d_items_id=${adrDItem}&revision_adr_d_items_id=${id}`,
                success: function(response) {
                    let data = response.data;
                    let x = 1;
                    for (let i = 0; i < data.length; i++) {
                        var tr = $("<tr>");
                        tr.append("<td>" + x++ + "</td>");
                        tr.append("<td>" + data[i].characteristics + "</td>");
                        if (data[i].nvalue != null) {
                            tr.append("<td>" + (data[i].nvalue) + "</td>");
                        } else {
                            tr.append("<td></td>");

                        }
                        $("#tableDataCharacteristicOld").append(tr);
                    }
                }
            })
        }

        function loadCharacteristicNew(id) {
            $("#tableDataCharacteristic tbody").empty();
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: `/getRevisionAdrDItemsChar?_token=${csrf_token}&page=1&start=0&limit=300&filter=[{"operator":"eq","value":${id},"property":"revision_adr_d_items_id","type":"numeric"}]`,
                success: function(response) {
                    let data = response.data;
                    let x = 1;
                    for (let i = 0; i < data.length; i++) {
                        var tr = $("<tr>");
                        tr.append("<td>" + x++ + "</td>");
                        tr.append("<td>" + data[i].characteristics + "</td>");
                        if (data[i].nvalue != null) {
                            tr.append("<td>" + (data[i].nvalue) + "</td>");
                        } else {
                            tr.append("<td></td>");

                        }
                        $("#tableDataCharacteristic").append(tr);
                    }
                }
            })
        }

        function loadReason(id) {
            $("#tableReason tbody").empty();
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: `/getReason?_token=${csrf_token}&page=1&start=0&limit=300&filter=[{"operator":"eq","value":"revision_adr_d_items","property":"table_name","type":"string"},{"operator":"eq","value":${id},"property":"table_id","type":"numeric"}]`,
                success: function(response) {
                    let data = response.data;
                    for (let i = 0; i < data.length; i++) {
                        var tr = $("<tr>");
                        tr.append("<td>" + data[i].real_name + "</td>");
                        tr.append("<td>" + (data[i].description) + "</td>");
                        $("#tableReason").append(tr);
                    }
                }
            })
        }

        function loadMaterialItem(id) {
            $("#tableMaterial tbody").empty();
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: `/getRevisionRequestD?_token=${csrf_token}&page=1&start=0&limit=25&filter=[{"operator":"eq","value":${id},"property":"revision_adr_d_items_id","type":"numeric"}]`,
                success: function(response) {
                    let data = response.data;

                    for (let i = 0; i < data.length; i++) {
                        var tr = $("<tr>");
                        tr.append("<td>" + data[i].type + "</td>");
                        tr.append("<td>" + (data[i].inc) + "</td>");
                        tr.append("<td>" + (data[i].groupclass) + "</td>");
                        tr.append("<td>" + (data[i].material_type) + "</td>");
                        tr.append("<td>" + (data[i].uom) + "</td>");
                        tr.append("<td>" + (data[i].category) + "</td>");
                        $("#tableMaterial").append(tr);
                    }
                }
            })
        }

        function nextPage() {
            $("#tableData tbody").empty();
            var page = document.getElementById("page").innerHTML;
            var start = document.getElementById("start").innerHTML;

            loadData(parseInt(page) + 1, parseInt(start) + 25);

            document.getElementById("page").innerHTML = parseInt(page) + 1
            document.getElementById("start").innerHTML = parseInt(start) + 25
            document.getElementById("current_page").innerHTML = parseInt(page) + 1
            $("#example1_previous").removeClass("disabledd")
            if (document.getElementById("page").innerHTML == document.getElementById("totalData").innerHTML) {
                $("#example1_next").addClass("paginate_button next prev disabledd")
            }
        }

        function prevPage() {
            $("#tableData tbody").empty();
            var page = document.getElementById("page").innerHTML;
            var start = document.getElementById("start").innerHTML;

            loadData(parseInt(page) - 1, parseInt(start) - 25);

            document.getElementById("page").innerHTML = parseInt(page) - 1
            document.getElementById("start").innerHTML = parseInt(start) - 25
            document.getElementById("start").innerHTML = parseInt(start) + 25
            document.getElementById("current_page").innerHTML = parseInt(page) - 1
            // console.log(document.getElementById("page"));
            if (document.getElementById("page").innerHTML == "1") {
                $("#example1_previous").addClass("paginate_button next prev disabledd")
            }
        }
    </script>
    @endsection