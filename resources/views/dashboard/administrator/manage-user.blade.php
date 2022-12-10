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
            <h4>New Users</h4>
            <div class="row">
                <div class="col-sm-6">
                    <!-- <button id="btnAdd" data-toggle="modal" data-target="#modalForm" onclick="addData()" class="btn btn-outline-primary"><i class="fa fa-plus"></i> Add</button> -->
                </div>
                <div class="col-sm-6">
                    <div class="input-group mb-3 search">
                        <input type="search" class="form-control border-search" id="searchUsernameTemp" placeholder="Telusuri ..." aria-label="Recipient's username" aria-describedby="basic-addon2">
                        <div class="input-group-append">
                            <span class="input-group-text" id="basic-addon2"><i class="fa fa-search"></i></span>
                        </div>
                    </div>
                </div>
                <table id="tableDataNewUsers" class="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Real Name</th>
                            <th>Password</th>
                            <th>Company</th>
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
                        <li class="paginate_button active mr-2"><a href="#" aria-controls="example1" id="current_page_new" data-dt-idx="1" tabindex="0">1</a></li>
                        <li>Dari</li>
                        <li class="ml-2" id="total_page_new">1</li>
                        <li class="paginate_button next prev disabledd" id="example1_previous_new"><a href="#" onclick="prevPageNewUsers()" aria-controls="example1" id="link_prev" data-dt-idx="0" tabindex="0"><i class="fa fa-chevron-left"></i></a></li>
                        <li class="paginate_button next prev" id="example1_next_new"><a id="link_next" onclick="nextPageNewUsers()" href="#" aria-controls="example1" data-dt-idx="2" tabindex="0"><i class="fa fa-chevron-right"></i></a></li>
                    </ul>
                </div>
            </div>
            <hr>
            <h4>Existing Users</h4>
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

        <p hidden="true" id="pageNew">1</p>
        <p hidden="true" id="startNew">25</p>
        <p hidden="true" id="limitNew">25</p>
        <p hidden="true" id="totalDataNew"></p>
    </section>
    <!-- /.content -->

    <div class="modal fade" id="modalForm" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <p id="notePassword">note : Leave empty if you don't want to change the password</p>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Select Company</label>
                            <div class="col-sm-10">
                                <select class="js-example-data-ajax" id="company">
                                    <option value="">Select Company</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Select Group</label>
                            <div class="col-sm-10">
                                <select class="js-example-data-array-selected" id="groupId">
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
                        <input type="hidden" id="userId">
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnCloseModalForm" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" id="btnApply" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modalFormConfirm" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="titlemodalForm">Confirmation User</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Username</label>
                            <div class="col-sm-10">
                                <input type="text" readonly id="usernameConfirm" class="form-control">
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="" class="col-sm-2">Select Group</label>
                            <div class="col-sm-10">
                                <select class="js-example-data-array-selected" id="groupIdConfirm">
                                    <option value="">Select Group</option>
                                </select>
                            </div>
                        </div>
                        <input type="hidden" id="realnameConfirm">
                        <input type="hidden" id="emailConfirm">
                        <input type="hidden" id="passwordConfirm">
                        <input type="hidden" id="companyConfirm">
                        <input type="hidden" id="idConfirm">
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnCloseModalFormConfirm" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" id="btnApplyConfirm" class="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        loadData();
        loadDataNewUsers();
        $(document).ready(function() {
            $("#main-menu-MNU100").addClass("nav-item menu-is-opening menu-open")
            $("#subchild-MNU103").addClass("nav-link active")
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
        $('#searchUsernameTemp').keyup((e) => {
            clearTimeout(delayTimer);
            delayTimer = setTimeout(function() {
                // Do the ajax stuff
                loadDataNewUsers(1, 1, 25, e.currentTarget.value);
            }, 1000); // Will do the ajax stuff after 1000 ms, or 1 s
        });





        if (groupName != `Administrator's`) {
            document.getElementById("btnAdd").hidden = true;
        } else {
            document.getElementById("btnAdd").hidden = false;

        }


        getSelectCompany();
        getGroup();

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
            $.ajax({
                type: "get",
                url: `/UsersGroup?_token=${csrf_token}`,
                dataType: "json",
                success: function(response) {
                    let dataGroup = []
                    for (let i = 1; i < response.data.length; i++) {
                        dataGroup.push({
                            id: response.data[i].group_id,
                            text: response.data[i].group_name
                        });
                    }
                    $(".js-example-data-array-selected").select2({
                        data: dataGroup
                    })
                }
            })

        }

        function addData() {
            document.getElementById("titlemodalForm").innerHTML = "Add Users"
            document.getElementById("username").value = "";
            document.getElementById("email").value = "";
            document.getElementById("realname").value = "";
            document.getElementById("password").value = "";
            document.getElementById("company").value = "";
            document.getElementById("groupId").value = "";
            document.getElementById("isActive").value = "";
            document.getElementById("notePassword").hidden = true;
            // document.getElementById("status").value = "";
            document.getElementById("btnApply").setAttribute("onclick", 'processAdd()');
            document.getElementById("username").removeAttribute("readonly");
            $('#companny').val([]);
            $("#companny").select2({
                placeholder: "Select Company",
            });
            $('#groupId').val([]);
            $("#groupId").select2({
                placeholder: "Select Group",
            });

            getGroup();
            getSelectCompany();
        }

        function updateData(username, email, realname, companyId, companyName, groupId, isActive, userId) {
            if (isActive == "") {
                isActive = 0;
            }
            document.getElementById("username").setAttribute("readonly", true);
            document.getElementById("titlemodalForm").innerHTML = "Update User"
            document.getElementById("username").value = username;
            document.getElementById("email").value = email;
            document.getElementById("realname").value = realname;
            document.getElementById("password").value = "";
            document.getElementById("isActive").value = isActive;
            document.getElementById("userId").value = userId;
            document.getElementById("notePassword").hidden = false;
            document.getElementById("btnApply").setAttribute("onclick", 'processUpdate()');

            var companySelect = $('#company');
            var option = new Option(companyName, companyId, true, true);
            companySelect.append(option).trigger('change');

            var groupSelect = $('#groupId');
            var option = new Option(groupName, groupId, true, true);
            groupSelect.append(option).trigger('change');

            $.ajax({
                type: 'get',
                url: `/getDetailUser?user_id=${userId}`,
                dataType: 'json',
                success: function(response) {
                    var companySelect = $('#company');
                    var option = new Option(response.group_name, companyId, true, true);
                    companySelect.append(option).trigger('change');

                }
            })
        }

        function processAdd() {


            let username = document.getElementById("username").value;
            let realname = document.getElementById("realname").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let isActive = document.getElementById("isActive").value;
            let company = document.getElementById("company").value;
            let groupId = document.getElementById("groupId").value;

            if (username == '' || realname == '' || email == '' || password == '' || isActive == '' || company == '' || groupId == '') {
                Toast.fire({
                    icon: 'error',
                    title: 'Data cannot be null'
                });
            } else {
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: '/SaveUser',
                    data: {
                        _token: csrf_token,
                        entity_name: "material_type",
                        data_items: `[{"flag":"insert","group_id":"${groupId}","companies_m_id":"${company}","user_name":"${username}","real_name":"${realname}","is_active":${isActive},"user_id":"","email":"${email}","password":"${password}","last_login":"","created_at":"","id":"APP.model.UsersModel-174"}]`
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
            const d = new Date();
            let date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

            let username = document.getElementById("username").value;
            let realname = document.getElementById("realname").value;
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;
            let isActive = document.getElementById("isActive").value;
            let company = document.getElementById("company").value;
            let groupId = document.getElementById("groupId").value;
            let userId = document.getElementById("userId").value;


            if (username == '' || realname == '' || email == '' || isActive == '' || company == '' || groupId == '') {
                Toast.fire({
                    icon: 'error',
                    title: 'Data cannot be null'
                });
            } else {
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: '/SaveUser',
                    data: {
                        _token: csrf_token,
                        entity_name: "material_type",
                        data_items: ` [{
                                        "user_id": "${userId}",
                                        "group_id": "${groupId}",
                                        "real_name": "${realname}",
                                        "companies_m_id": "${company}",
                                        "user_name": "${username}",
                                        "email": "${email}",
                                        "api_token": null,
                                        "last_login": "",
                                        "count_login": 0,
                                        "created_at": "${date}",
                                        "updated_at": "${date}",
                                        "is_active": ${isActive},
                                        "email_asli": null,
                                        "password": "${password}",
                                        "id": "APP.model.UsersModel-347"
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
                                            <button data-toggle="modal" data-target="#modalForm" onclick="updateData('${response.data[i].user_name}','${response.data[i].email}','${response.data[i].real_name}','${response.data[i].companies_m_id}','${response.data[i].name}','${response.data[i].group_id}','${response.data[i].is_active}','${response.data[i].user_id}')" class="btn btn-default btn-sm no-border"><i class="fa fa-edit"></i></button>
                                            
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
            $("#example1_next").removeClass("disabledd")
            if (document.getElementById("page").innerHTML == "1") {
                $("#example1_previous").addClass("paginate_button next prev disabledd")
            }
        }

        function loadDataNewUsers(page = 1, start = 1, limit = 25, search = "") {
            $("#tableDataNewUsers tbody").empty();
            $.ajax({
                url: `/getNewUsers?page=${page}&start=${start}&limit=${limit}&filter=[{"operator":"like","value":"${search}","property":"real_name","type":"string"},{"operator":"like","value":"${search}","property":"user_name","type":"string"},{"operator":"like","value":"${search}","property":"users_temp.email","type":"string"},{"operator":"like","value":"${search}","property":"name","type":"string"}]`,
                type: 'get',
                dataType: 'json',
                success: function(response) {
                    var totalPage = Math.ceil(response.total / 25)
                    console.log(totalPage);
                    document.getElementById("totalDataNew").innerHTML = totalPage
                    document.getElementById("total_page_new").innerHTML = totalPage
                    if (totalPage == 1 || totalPage == 0) {
                        $("#example1_next_new").addClass("paginate_button next prev disabledd")
                    }
                    for (let i = 0; i < response.data.length; i++) {
                        var tr = $("<tr>");
                        tr.append("<td>" + response.data[i].user_name + "</td>");
                        tr.append("<td>" + (response.data[i].email) + "</td>");
                        tr.append("<td>" + (response.data[i].real_name) + "</td>");
                        tr.append("<td>****</td>");
                        tr.append("<td>" + (response.data[i].name) + "</td>");
                        if (groupName == `Administrator's`) {
                            tr.append(`<td>
                                        <center>
                                            <button data-toggle="modal" data-target="#modalFormConfirm" onclick="confirmData('${response.data[i].user_name}','${response.data[i].real_name}','${response.data[i].email}','${response.data[i].companies_m_id}','${response.data[i].password}','${response.data[i].id}')" class="btn btn-default btn-sm no-border"><i class="fa fa-check"></i></button>
                                            <button onclick="deleteConfirmationUser('${response.data[i].id}')" class="btn btn-default btn-sm no-border"><i class="fa fa-trash"></i></button>
                                        </center>                        
                                     </td>`);
                        } else {
                            tr.append(`<td> </td>`);
                        }
                        $("#tableDataNewUsers").append(tr);
                    }
                }
            })
        }

        function nextPageNewUsers() {
            $("#tableDataNewUsers tbody").empty();
            var page = document.getElementById("page").innerHTML;
            var start = document.getElementById("start").innerHTML;
            let search = document.getElementById("searchUsernameTemp").value
            loadDataNewUsers(parseInt(page) + 1, parseInt(start) + 25, 25, search);

            document.getElementById("pageNew").innerHTML = parseInt(page) + 1
            document.getElementById("startNew").innerHTML = parseInt(start) + 25
            document.getElementById("current_page_new").innerHTML = parseInt(page) + 1
            $("#example1_previous_new").removeClass("disabledd")
            if (document.getElementById("page").innerHTML == document.getElementById("totalDataNew").innerHTML) {
                $("#example1_next_new").addClass("paginate_button next prev disabledd")
            }
        }

        function prevPageNewUsers() {
            $("#tableDataNewUsers tbody").empty();
            var page = document.getElementById("pageNew").innerHTML;
            var start = document.getElementById("startNew").innerHTML;
            let search = document.getElementById("searchUsernameTemp").value

            loadDataNewUsers(parseInt(page) - 1, parseInt(start) - 25, 25, search);

            document.getElementById("pageNew").innerHTML = parseInt(page) - 1
            document.getElementById("startNew").innerHTML = parseInt(start) - 25
            document.getElementById("startNew").innerHTML = parseInt(start) + 25
            document.getElementById("current_page_new").innerHTML = parseInt(page) - 1
            // console.log(document.getElementById("page"));
            $("#example1_next_new").removeClass("disabledd")
            if (document.getElementById("page").innerHTML == "1") {
                $("#example1_previous_new").addClass("paginate_button next prev disabledd")
            }
        }

        function confirmData(username, realname, email, company, password, id) {
            document.getElementById("usernameConfirm").value = username;
            document.getElementById("realnameConfirm").value = realname;
            document.getElementById("emailConfirm").value = email;
            document.getElementById("companyConfirm").value = company;
            document.getElementById("passwordConfirm").value = password;
            document.getElementById("idConfirm").value = id;
            document.getElementById("btnApplyConfirm").setAttribute("onclick", 'processConfirmation()');
        }

        function processConfirmation() {
            let username = document.getElementById("usernameConfirm").value
            let realname = document.getElementById("realnameConfirm").value
            let email = document.getElementById("emailConfirm").value
            let company = document.getElementById("companyConfirm").value
            let password = document.getElementById("passwordConfirm").value
            let groupId = document.getElementById("groupIdConfirm").value
            let idConfirm = document.getElementById("idConfirm").value

            if(groupId == ''){
                Toast.fire({
                    icon: 'error',
                    title: 'Data cannot be null'
                });
                return;
            }
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: '/SaveUser',
                data: {
                    _token: csrf_token,
                    entity_name: "material_type",
                    data_items: `[{"flag":"insert","group_id":"${groupId}","companies_m_id":"${company}","user_name":"${username}","real_name":"${realname}","is_active":1,"user_id":"","email":"${email}","password":"${password}","last_login":"","created_at":"","id":"APP.model.UsersModel-174"}]`
                },
                success: function(response) {
                    if (response.success == true) {
                        $("#btnCloseModalFormConfirm").click();
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
            $.ajax({
                type: "POST",
                dataType: 'json',
                url: '/deleteConfirmationUser',
                data: {
                    _token: csrf_token,
                    id: parseInt(idConfirm)
                },
                success: function(response) {
                    loadDataNewUsers();

                }
            })
        }

        function deleteConfirmationUser(id) {
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
                        url: '/deleteConfirmationUser',
                        data: {
                            _token: csrf_token,
                            id: parseInt(id)
                        },
                        success: function(response) {
                            $("#closeModalDelete").click();
                            Toast.fire({
                                icon: 'success',
                                title: 'Success deleting data'
                            });
                            loadDataNewUsers();

                        }
                    })
                }
            })
        }
    </script>
    @endsection