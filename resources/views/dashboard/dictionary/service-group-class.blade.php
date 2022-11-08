@extends('master')

@section('title','Dictionary | Service Group Class')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid mt-3">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Service Group Class</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item">Dictionary</li>
                        <li class="breadcrumb-item active">Service Group Class</li>
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
                    <!-- <button id="btnAdd" data-toggle="modal" data-target="#modalForm" onclick="addData()" class="btn btn-outline-primary"><i class="fa fa-plus"></i> Add</button> -->
                </div>
                <div class="col-sm-6">
                    <div class="input-group mb-3 search">
                        <input type="search" class="form-control border-search" id="searchDescription" placeholder="Telusuri ..." aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <span class="input-group-text" id="basic-addon2"><i class="fa fa-search"></i></span>
                        </div>
                    </div>
                </div>
            </div>
            <table id="tableData" class="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Group Class</th>
                        <th>Name</th>   
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
    </section>
    <!-- /.content -->

  

    <script>
        loadData();
        $(document).ready(function() {
            $("#main-menu-MNU10").addClass("nav-item menu-is-opening menu-open")
            $("#subchild-MNU38").addClass("nav-link active")
        });

        $('#searchDescription').keyup((e) => {
            loadData(1, 1, 25, e.currentTarget.value);
        });

        

       

        function loadData(page = 1, start = 1, limit = 25, search = "") {
            $("#tableData tbody").empty();
            $.ajax({
                url: `/getGroupClassM?action=getGroup&page=${page}&start=${start}&limit=${limit}&filter=[{"operator":"eq","value":"Service","property":"transaction_type","type":"string"},{"operator":"like","value":"${search}","property":"group_class_name","type":"string"}]&group={"property":"group_header","direction":"ASC"}`,
                type: 'get',
                dataType: 'json',
                success: function(response) {
                    var totalPage = Math.ceil(response.total / 25)
                    document.getElementById("totalData").innerHTML = totalPage
                    document.getElementById("total_page").innerHTML = totalPage
                    if(totalPage == 1){
                        $("#example1_next").addClass("paginate_button next prev disabledd")
                    }
                    for (let i = 0; i < response.data.length; i++) {
                        var tr = $("<tr>");
                        tr.append("<td>" + response.data[i].groupclass + "</td>");
                        tr.append("<td>" + (response.data[i].group_name) + "</td>");
                        
                       
                        $("#tableData").append(tr);
                    }
                }
            })
        }

        function nextPage() {
            $("#tableData tbody").empty();
            var page = document.getElementById("page").innerHTML;
            var start = document.getElementById("start").innerHTML;
            let search = document.getElementById("searchDescription").value
            loadData(parseInt(page) + 1, parseInt(start) + 25, 25, search);

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
            let search = document.getElementById("searchDescription").value

            loadData(parseInt(page) - 1, parseInt(start) - 25, 25, search);

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