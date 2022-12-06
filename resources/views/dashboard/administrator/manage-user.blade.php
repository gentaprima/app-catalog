@extends('master')

@section('title','Administrators | Manage Users')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid mt-3">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Manage Users</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item">Administrator</li>
                        <li class="breadcrumb-item active">Manage Users</li>
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
                    <button id="btnAdd" data-toggle="modal" data-target="#modalForm" onclick="addData()" class="btn btn-outline-primary"><i class="fa fa-plus"></i> Add</button>
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
                        <th>Username</th>
                        <th>Email</th>
                        <th>Real Name</th>
                        <th>Password</th>
                        <th>Company</th>
                        <th>User Group</th>
                        <th>Active</th>
                        <th>Action</th>
                        <!-- <th>Date Created</th> -->
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

    <div class="modal fade" id="modalForm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="titlemodalForm">Add Value Abbreviation</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Username</label>
                            <div class="col-sm-10">
                                <input type="text" id="username" class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Email</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="email">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Real Name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="realname">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Password</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" id="password">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Select Company</label>
                            <div class="col-sm-10">
                                <select class="js-example-data-ajax" id="company">
                                    <option value="">Select Company</option>
                                </select>
                            </div>
                        </div>=
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Select Group</label>
                            <div class="col-sm-10">
                                <select class="js-example-basic-single2"  id="groupId">
                                    <option value="">Select Group</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Active?</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="isActive">
                                    <option value="">Select Active/Not Active</option>
                                    <option value="1">Active</option>
                                    <option value="0">Not Active</option>
                                </select>
                            </div>
                        </div>

                        <input type="hidden" id="idType">
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnCloseModalForm" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" id="btnApply" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        loadData();
        $(document).ready(function() {
            $("#main-menu-MNU100").addClass("nav-item menu-is-opening menu-open")
            $("#subchild-MNU102").addClass("nav-link active")
        });
        
        $(document).ready(function() {
            $('.js-example-basic-single').select2();
            $('.js-example-basic-single2').select2();
            // $('.js-example-basic-single3').select2();
        });

        var delayTimer;
        $('#searchDescription').keyup((e) => {
            clearTimeout(delayTimer);
            delayTimer = setTimeout(function() {
                // Do the ajax stuff
                loadData(1, 1, 25, e.currentTarget.value);
            }, 1000); // Will do the ajax stuff after 1000 ms, or 1 s
        });



        function doSearch(text) {
            clearTimeout(delayTimer);
            delayTimer = setTimeout(function() {
                // Do the ajax stuff
            }, 1000); // Will do the ajax stuff after 1000 ms, or 1 s
        }

        if (groupName != `Administrator's`) {
            document.getElementById("btnAdd").hidden = true;
        } else {
            document.getElementById("btnAdd").hidden = false;

        }


        getSelectCompany();

        function getSelectCompany() {
            $("#company").select2({

                ajax: {
                    url: `/getCompaniesMComboBox`,
                    dataType: 'json',
                    data: function(params) {
                        if (params.term == undefined) {
                            params.term = ""
                        }
                        var query = {
                            query: params.term,
                            page: 1,
                            start: 0,
                            limit: 25,
                            filter: `[{"operator":"like","value":"${params.term}","property":"name","type":"string"}]`
                        }
                        return query;
                    },
                    processResults: function(data) {
                        return {
                            results: $.map(data, function(item) {
                                return {
                                    text: item.name,
                                    id: item.id
                                }
                            })
                        };
                    }
                }
            })
        }

        function getGroup() {
            $("#company").select2({

                ajax: {
                    url: `/getUsersGroup`,
                    dataType: 'json',
                    data: function(params) {
                        if (params.term == undefined) {
                            params.term = ""
                        }
                        var query = {
                            query: params.term,
                            page: 1,
                            start: 0,
                            limit: 25,
                            filter: `[{"operator":"like","value":"${params.term}","property":"group_name","type":"string"}]`
                        }
                        return query;
                    },
                    processResults: function(data) {
                        return {
                            results: $.map(data, function(item) {
                                return {
                                    text: item.group_name,
                                    id: item.group_id
                                }
                            })
                        };
                    }
                }
            })

        }

        function addData() {
            document.getElementById("titlemodalForm").innerHTML = "Add Company"
            // document.getElementById("code").value = "";
            // document.getElementById("company").value = "";
            // // document.getElementById("status").value = "";
            // document.getElementById("btnApply").setAttribute("onclick", 'processAdd()');
            // document.getElementById("code").removeAttribute("readonly");
        }

        function updateData(code, company, id) {
            document.getElementById("code").setAttribute("readonly", true);
            document.getElementById("titlemodalForm").innerHTML = "Update Company"
            document.getElementById("code").value = code;
            document.getElementById("company").value = company;
            // document.getElementById("status").value = status;
            document.getElementById("idType").value = id;
            document.getElementById("btnApply").setAttribute("onclick", 'processUpdate()');
        }

        function processAdd() {
            // [{
            //     "user_id": "5f052979df265",
            //     "group_id": "USG3",
            //     "real_name": "Eryos Hendriiiiiii",
            //     "companies_m_id": "8",
            //     "user_name": "eryos.hendri",
            //     "email": "gentaprima600@gmail.com",
            //     "api_token": null,
            //     "last_login": "",
            //     "count_login": 0,
            //     "created_at": "2020-07-08 09:03:37",
            //     "updated_at": "2022-12-05 16:05:40",
            //     "is_active": 1,
            //     "email_asli": "eryos.hendri@ptssb.co.id",
            //     "password": "",
            //     "id": "APP.model.UsersModel-864"
            // }]
            let code = document.getElementById("code").value;
            let desc = document.getElementById("company").value;

            if (code == '' && desc == '') {
                Toast.fire({
                    icon: 'error',
                    title: 'Data cannot be null'
                });
            } else {
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: '/SaveCompaniesM',
                    data: {
                        _token: csrf_token,
                        entity_name: "material_type",
                        data_items: `[{"flag":"Insert","id":"model_companies_m-1","code":"${code}","name":"${desc}"}]`
                    },
                    success: function(response) {
                        if (response.success == true) {
                            $("#btnCloseModalForm").click();
                            Toast.fire({
                                icon: 'success',
                                title: response.message
                            });
                            loadData();
                        } else {
                            Toast.fire({
                                icon: 'error',
                                title: response.message
                            });

                        }
                    }
                })
            }
        }

        function processUpdate() {

            let code = document.getElementById("code").value;
            let desc = document.getElementById("desc").value;
            let id = document.getElementById("idType").value;
            const d = new Date();
            let date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();


            if (code == '' && characteristic == '' && status == '') {
                Toast.fire({
                    icon: 'error',
                    title: 'Data cannot be null'
                });
            } else {
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: '/SaveCompaniesM',
                    data: {
                        _token: csrf_token,
                        entity_name: "material_type",
                        data_items: `[{
                                        "id": ${parseInt(id)},
                                        "entity_name": "material_type",
                                        "entity_code_name": "${code} - ${desc}",
                                        "description": "${desc}",
                                        "code": "${code}",
                                        "attribute_definition": null,
                                        "created_at": "${date}",
                                        "created_by": null,
                                        "updated_at": "${date}",
                                        "updated_by": null,
                                        "deleted_at": null,
                                        "deleted_by": null
                                    }]`
                    },
                    success: function(response) {
                        if (response.success == true) {
                            $("#btnCloseModalForm").click();
                            Toast.fire({
                                icon: 'success',
                                title: response.message
                            });
                            loadData();
                        } else {
                            Toast.fire({
                                icon: 'error',
                                title: response.message
                            });

                        }
                    }
                })
            }
        }

        function deleteData(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        type: "POST",
                        dataType: 'json',
                        url: '/RemoveCompaniesM',
                        data: {
                            _token: csrf_token,
                            id: parseInt(id)
                        },
                        success: function(response) {
                            $("#closeModalDelete").click();
                            Toast.fire({
                                icon: 'success',
                                title: 'Success deleted company'
                            });
                            loadData();

                        }
                    })
                }
            })
        }

        function loadData(page = 1, start = 1, limit = 25, search = "") {
            $("#tableData tbody").empty();
            $.ajax({
                url: `/getManageUsers?page=${page}&start=${start}&limit=${limit}&filter=[{"operator":"like","value":"${search}","property":"real_name","type":"string"},{"operator":"like","value":"${search}","property":"user_name","type":"string"},{"operator":"like","value":"${search}","property":"email","type":"string"},{"operator":"like","value":"${search}","property":"name","type":"string"}]`,
                type: 'get',
                dataType: 'json',
                success: function(response) {
                    var totalPage = Math.ceil(response.total / 25)
                    document.getElementById("totalData").innerHTML = totalPage
                    document.getElementById("total_page").innerHTML = totalPage
                    if (totalPage == 1) {
                        $("#example1_next").addClass("paginate_button next prev disabledd")
                    }
                    for (let i = 0; i < response.data.length; i++) {
                        var tr = $("<tr>");
                        tr.append("<td>" + response.data[i].user_name + "</td>");
                        tr.append("<td>" + (response.data[i].email) + "</td>");
                        tr.append("<td>" + (response.data[i].real_name) + "</td>");
                        tr.append("<td>****</td>");
                        tr.append("<td>" + (response.data[i].name) + "</td>");
                        tr.append("<td>" + (response.data[i].group_name) + "</td>");
                        if (response.data[i].is_active == 1) {
                            tr.append("<td>Active</td>");
                        } else {
                            tr.append("<td>Not Active</td>");
                        }
                        if (groupName == `Administrator's`) {
                            tr.append(`<td>
                                        <center>
                                            <button data-toggle="modal" data-target="#modalForm" onclick="updateData('${response.data[i].code}','${response.data[i].name}','${response.data[i].id}')" class="btn btn-default btn-sm no-border"><i class="fa fa-edit"></i></button>
                                            <button onclick="deleteData('${response.data[i].id}')" class="btn btn-default btn-sm no-border"><i class="fa fa-trash"></i></button>
                                        </center>                        
                                     </td>`);
                        } else {
                            tr.append(`<td> </td>`);
                        }
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