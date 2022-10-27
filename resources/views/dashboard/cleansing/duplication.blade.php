<?php

use Illuminate\Support\Facades\Auth;
?>
@extends('master')

@section('title','Cleansing & Duplication | Duplication')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid mt-3">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Duplication</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item">Cleansing & Duplication</li>
                        <li class="breadcrumb-item active">Duplication</li>
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
            <h4>List Duplication</h4>
            <div class="row mt-3">
                <label for="" class="col-sm-2">Search By</label>
                <div class="col-sm-4">
                    <select name="" id="searchBy" onchange="loadData(1,0,25,this)" class="form-control">
                        <option value="">Search By</option>
                        <option value="ByLongDesc">Long Desc</option>
                        <option value="ByRefno">Ref No</option>
                        <option value="ByOldMaterialCode">Old Material Code</option>
                    </select>
                </div>
            </div>
            <hr>
            <table id="tableData" class="table table-striped mt-3" style="display: table;">
                <thead>
                    <tr>
                        <th>Catalog No</th>
                        <th>SAP</th>
                        <th>Short Desc</th>
                        <th>Long Desc</th>
                        <th id="refNo">Ref No</th>
                        <th id="oldMaterial">Old Material Code</th>
                        <th id="manufactur">Manufacture</th>
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
            $("#main-menu-MNU39").addClass("nav-item menu-is-opening menu-open")
            $("#subchild-MNU42").addClass("nav-link active")
        });





        function loadData(page = 1, start = 0, limit = 25, value = "") {
            let searchBy = value.value;

            if (searchBy == 'ByLongDesc') {
                document.getElementById("refNo").hidden = true
                document.getElementById("oldMaterial").hidden = true
                document.getElementById("manufactur").hidden = true
            } else {
                document.getElementById("refNo").hidden = false
                document.getElementById("oldMaterial").hidden = false
                document.getElementById("manufactur").hidden = false

            }

            $("#example1_previous").removeClass("disabledd")
            $("#example1_next").removeClass("disabledd")
            $("#tableData tbody").empty();
            document.getElementById("page").innerHTML = parseInt(page)
            document.getElementById("start").innerHTML = parseInt(start)
            document.getElementById("current_page").innerHTML = parseInt(page)
            document.getElementById("example2_paginate").hidden = false


            // let action = 'getAdditionHistoryDTable';
            let sort = `[{"property":"created_at","direction":"DESC"}]`

            $.ajax({
                type: 'get',
                dataType: 'json',
                url: `/getCleansingDuplicate?filter=[]&page=${page}&start=${start}&limit=${limit}&action=${searchBy}`,
                success: function(response) {
                    var totalPage = Math.ceil(response.total / 25)
                    document.getElementById("totalData").innerHTML = totalPage
                    document.getElementById("total_page").innerHTML = totalPage
                    for (let i = 0; i < response.data.length; i++) {
                        var tr = $("<tr>");
                        tr.append("<td>" + response.data[i].catalog_no + "</td>");
                        if (response.data[i].sap_material_code == null) {
                            tr.append("<td></td>");
                        } else {
                            tr.append("<td>" + (response.data[i].sap_material_code) + "</td>");
                        }
                        tr.append("<td>" + (response.data[i].short_description) + "</td>");
                        tr.append("<td>" + (response.data[i].long_description) + "</td>");
                        if (searchBy == 'ByRefno' || searchBy == 'ByOldMaterialCode') {
                            tr.append("<td>" + (response.data[i].refno) + "</td>");
                            tr.append("<td>" + (response.data[i].old_material_code) + "</td>");
                            tr.append("<td>" + (response.data[i].manufactur) + "</td>");
                        }

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