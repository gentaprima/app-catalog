<?php

use Illuminate\Support\Facades\Auth;
?>
@extends('master')

@section('title','Single View | Transfer Back Owner Code')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid mt-3">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Transfer Back Owner Code</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item">Single View</li>
                        <li class="breadcrumb-item active">Transfer Back Owner Code</li>
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
            <h4>List Transfer Back Owner Code</h4>
            <hr>
            <form action="">
                <div class="form-group row">
                    <label for="" class="col-sm-2">Trx Code</label>
                    <div class="col-sm-10">
                        <select class="js-example-data-ajax" id="ownerCode">
                            <option value="">Select Trx Code</option>
                        </select>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="" class="col-sm-2"></label>
                    <div class="col-sm-10">
                        <button class="btn btn-primary" onclick="loadData()" type="button">Search</button>
                        <button class="btn btn-default ml-1" onclick="reset()" id="btnReset" type="reset" style="border:none;">Reset</button>
                    </div>
                </div>

                <div class="form-group row">
                    <label for="" class="col-sm-2">New Owner Code</label>
                    <div class="col-sm-10">
                        <select class="js-example-data-ajax" id="newOwnerCode">
                            <option value="">Select New Owner</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="" class="col-sm-2"></label>
                    <div class="col-sm-10">
                        <button class="btn btn-primary" onclick="prosesTransport()" type="button">Proccess Transport</button>

                    </div>
                </div>


            </form>
            <hr>
            <table id="tableData" class="table table-striped mt-3" style="display: table;">
                <thead>
                    <tr>
                        <th>Created By</th>
                        <th>Catalogue</th>
                        <th>SAP</th>
                        <th>RAW</th>
                        <th>Long Desc</th>
                        <th>Transaction Type</th>
                        <th>INC</th>
                        <th>NGC</th>
                        <th>Item Status</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate" hidden="true">
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
        <p hidden="true" id="userId"><?= Auth::user()->user_id; ?></p>
        <p hidden="true" id="page">1</p>
        <p hidden="true" id="start">25</p>
        <p hidden="true" id="limit">25</p>
        <p hidden="true" id="totalData"></p>

        <div class="modal fade" id="modalDetail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="titleModalReference">Detail</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table id="dataTableDetail" class="table table-striped" style="display: table;">
                            <thead>
                                <tr>
                                    <th>Catologue No</th>
                                    <th>SAP Number</th>
                                    <th>Raw</th>
                                    <th>Long Description</th>
                                    <th>Transction Type</th>
                                    <th>INC</th>
                                    <th>MGC/SGC</th>
                                    <th>Item Status</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="btnCloseModalReference" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" id="saveReference" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- /.content -->

    <script>
        $(document).ready(function() {
            $('.js-example-basic-single').select2();
            $('.js-example-basic-single2').select2();
            $('.js-example-basic-single3').select2();
        });
        $(document).ready(function() {
            $("#main-menu-MNU6").addClass("nav-item menu-is-opening menu-open")
            $("#subchild-MNU47").addClass("nav-link active")
        });


        $('#btnReset').click(function() {
            $('#creator').val([]);
            $("#creator").select2({
                placeholder: "Select Creator",
            });


            getSelectCreator();
            document.getElementById("startDate").value = ""
            document.getElementById("endDate").value = ""
            document.getElementById("company").value = ""
            document.getElementById("adrStatus").value = ""
        });

        function getSelectCreator() {
            $("#ownerCode").select2({
                ajax: {
                    url: `/geTrxCodeComboBox`,
                    dataType: 'json',
                    data: function(params) {
                        if (params.term == undefined) {
                            params.term = ""
                        }
                        var query = {
                            query: params.term,
                            action: "geTrxCode",
                            page: 1,
                            start: 0,
                            limit: 25,
                            filter: `[{"operator":"like","value":"${params.term}","property":"new_owner_code","type":"string"},{"operator":"eq","value":1,"property":"is_active","type":"string"}]`
                        }
                        return query;
                    },
                    processResults: function(data) {
                        return {
                            results: $.map(data, function(item) {
                                return {
                                    text: item.trx_no + ' - ' + item.new_owner_code,
                                    id: item.trx_no
                                }
                            })
                        };
                    }
                }
            })
        }

        function getSelectNewCreator() {
            $("#newOwnerCode").select2({
                ajax: {
                    url: `/getUsersComboBox`,
                    dataType: 'json',
                    data: function(params) {
                        if (params.term == undefined) {
                            params.term = ""
                        }
                        var query = {
                            query: params.term,
                            action: "getUsers",
                            page: 1,
                            start: 0,
                            limit: 25,
                            filter: `[{"operator":"like","value":"${params.term}","property":"real_name","type":"string"}]`
                        }
                        return query;
                    },
                    processResults: function(data) {
                        return {
                            results: $.map(data, function(item) {
                                return {
                                    text: item.real_name + ' - ' + item.user_name,
                                    id: item.user_id
                                }
                            })
                        };
                    }
                }
            })
        }


        getSelectCreator();
        getSelectNewCreator();

        function loadData(page = 1, start = 0, limit = 25) {
            $("#example1_previous").removeClass("disabledd")
            $("#example1_next").removeClass("disabledd")
            $("#tableData tbody").empty();
            document.getElementById("page").innerHTML = parseInt(page)
            document.getElementById("start").innerHTML = parseInt(start)
            document.getElementById("current_page").innerHTML = parseInt(page)
            document.getElementById("example2_paginate").hidden = false
            let userId = document.getElementById("ownerCode").value;

            let filter = [];
            // Params
            // let filter = `[,,,]`;

            if (userId != '') {
                filter.push(`{"operator":"eq","value":"${userId}","property":"created_by","type":"string"}`)
            }
            let stringFilter = '[' + filter.join(',') + ']';
            let action = 'getAdditionHistoryDTable';
            let sort = `[{"property":"created_at","direction":"DESC"}]`

            $.ajax({
                type: 'get',
                dataType: 'json',
                url: `/getAdditionHistoryDTable?filter=${stringFilter}&page=${page}&start=${start}&limit=${limit}&action=${action}`,
                success: function(response) {
                    var totalPage = Math.ceil(response.total / 25)
                    document.getElementById("totalData").innerHTML = totalPage
                    document.getElementById("total_page").innerHTML = totalPage
                    for (let i = 0; i < response.data.length; i++) {
                        var tr = $("<tr>");
                        tr.append("<td>" + response.data[i].created_by + "</td>");
                        tr.append("<td>" + (response.data[i].catalog_no) + "</td>");
                        if (response.data[i].sap_material_code == null) {
                            tr.append("<td></td>");
                        } else {
                            tr.append("<td>" + (response.data[i].sap_material_code) + "</td>");
                        }
                        tr.append("<td>" + (response.data[i].raw) + "</td>");
                        tr.append("<td>" + (response.data[i].long_description) + "</td>");
                        tr.append("<td>" + (response.data[i].transaction_type) + "</td>");
                        tr.append("<td>" + (response.data[i].inc) + "</td>");
                        tr.append("<td>" + (response.data[i].groupclass) + "</td>");
                        tr.append("<td>" + (response.data[i].item_status) + "</td>");

                        $("#tableData").append(tr);
                    }
                    if (document.getElementById("page").innerHTML == document.getElementById("totalData").innerHTML) {
                        $("#example1_next").addClass("paginate_button next prev disabledd")
                    }
                    if (document.getElementById("page").innerHTML == "1") {
                        $("#example1_previous").addClass("paginate_button next prev disabledd")
                    }
                }

            })
        }

        function prosesTransport() {
            let trxNo = document.getElementById("ownerCode").value;
            let newOwnerCode = document.getElementById("newOwnerCode").value;


            if (ownerCode == '' || newOwnerCode == '') {
                Toast.fire({
                    icon: 'error',
                    title: 'Sorry, data cannot be null'
                });
            } else {
                $.ajax({
                    type: 'get',
                    dataType: 'json',
                    url: '/getTransportOwner_p',
                    data: {
                        OwnerCode: 'XXXXXX',
                        NewOwnerCode: newOwnerCode,
                        UserProses: userName,
                        ProsesCode: 2,
                        trxno: trxNo,
                        _token: csrf_token
                    },
                    success: function(response) {
                        if (response.length > 0) {
                            Toast.fire({
                                icon: 'success',
                                title: 'Success Transfer Owner Code'
                            });
                        }
                    }
                })
            }


        }

        function showDetail(id) {
            $("#dataTableDetail tbody").empty();
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: `/getAdditionHistoryD?token=${csrf_token}&action=getAdrDItems&page=1&start=0&limit=25&filter=[{"operator":"eq","value":${id},"property":"adr_m_id","type":"string"}]`,
                success: function(response) {
                    for (let i = 0; i < response.length; i++) {
                        var tr = $("<tr>");
                        if (response[i].transaction_type == 'Material') {
                            tr.append(`<td>
                                <center><a href="/single-view/material/${response[i].catalog_no}">${response[i].catalog_no}</a></center>
                            </td>`);
                        } else {
                            tr.append(`<td>
                                <center><a href="/single-view/service/${response[i].catalog_no}">${response[i].catalog_no}</a></center>
                            </td>`);

                        }
                        if (response[i].sap_material_code == null) {
                            tr.append("<td></td>");
                        } else {
                            tr.append("<td>" + (response[i].sap_material_code) + "</td>");

                        }
                        tr.append("<td>" + (response[i].raw) + "</td>");
                        tr.append("<td>" + (response[i].long_description) + "</td>");
                        tr.append("<td>" + (response[i].transaction_type) + "</td>");
                        tr.append("<td>" + (response[i].inc) + "</td>");
                        tr.append("<td>" + (response[i].groupclass) + "</td>");
                        tr.append("<td>" + (response[i].item_status) + "</td>");
                        $("#dataTableDetail").append(tr);
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