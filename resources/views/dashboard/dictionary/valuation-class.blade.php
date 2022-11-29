@extends('master')

@section('title','Dictionary | Valuation Class')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid mt-3">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">List Valuation Class</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item">Dictionary</li>
                        <li class="breadcrumb-item active">Valuation Class</li>
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
                        <th>Company Code</th>
                        <th>Company</th>
                        <th>Valuation</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
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
                            <label for="" class="col-sm-2">Code</label>
                            <div class="col-sm-10">
                                <input type="text" id="code" readonly class="form-control">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Select Company</label>
                            <div class="col-sm-10">
                                <select class="js-example-data-ajax" onchange="selectCompany(this)" id="company">
                                    <option value="">Select Company</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Valuation</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="valuation">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Description</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="valuationDesc">
                            </div>
                        </div>
                        <input type="hidden" id="idCompany">
                        <input type="hidden" id="nameCompany">

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
            $("#main-menu-MNU10").addClass("nav-item menu-is-opening menu-open")
            $("#subchild-MNU19").addClass("nav-link active")
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

        function addData() {
            $('#company').val([]);
            $("#company").select2({
                placeholder: "Select Company",
            });


            getSelectCompany();
            document.getElementById("titlemodalForm").innerHTML = "Add Plant"
            document.getElementById("code").value = "";
            document.getElementById("valuation").value = "";
            document.getElementById("valuationDesc").value = "";
            document.getElementById("btnApply").setAttribute("onclick", 'processAdd()');
        }

        function updateData(companyCode, name, valuation, valuationDesc, id, username, companiesId) {
            document.getElementById("titlemodalForm").innerHTML = "Update Plant"
            document.getElementById("code").value = companyCode;
            document.getElementById("valuation").value = valuation;
            document.getElementById("valuationDesc").value = valuationDesc;
            document.getElementById("idCompany").value = companiesId
            document.getElementById("nameCompany").value = name
            var companySelect = $("#company")
            let idComboBox = companiesId + '-' + name + '-' + companyCode
            var optionSCompany = new Option(name, idComboBox, true, true)
            companySelect.append(optionSCompany).trigger('change');

            document.getElementById("btnApply").setAttribute("onclick", `processUpdate('${username}','${id}')`);
        }


        function selectCompany(val) {
            let value = val.value;
            let splitString = value.split('-');
            document.getElementById("idCompany").value = splitString[0]
            document.getElementById("nameCompany").value = splitString[1]
            document.getElementById("code").value = splitString[2]
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
                                    id: item.id + '-' + item.name + '-' + item.code
                                }
                            })
                        };
                    }
                }
            })
        }



        function processAdd() {
            // [{
            //     "flag": "Insert",
            //     "id": "model_valuation_class-2",
            //     "companies_m_id": "2",
            //     "valuation": "2",
            //     "valuationdesc": "2"
            // }]
            let codeCompany = document.getElementById("code").value;
            let valuation = document.getElementById("valuation").value;
            let valuationDesc = document.getElementById("valuationDesc").value;
            let idCompany = document.getElementById("idCompany").value;
            let nameCompany = document.getElementById("nameCompany").value;

            if (codeCompany == '' && codePlant == '') {
                Toast.fire({
                    icon: 'error',
                    title: 'Data cannot be null'
                });
            } else {
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: '/SaveValuationClass',
                    data: {
                        _token: csrf_token,
                        data_items: `[{"flag":"Insert","id":"model_valuation_class-2","companies_m_id":"${idCompany}","valuation":"${valuation}","valuationdesc":"${valuationDesc}"}]`
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


        function processUpdate(username, id) {
            // [{
            //     "id": 430,
            //     "companies_m_id": "1",
            //     "valuation": "asdsdd",
            //     "valuationdesc": "asd",
            //     "acc_ref": null,
            //     "acc_ref_desc": null,
            //     "company_code": "ABM",
            //     "company_name": "PT. ABM Investama",
            //     "status": "Not Used"
            // }]
            let codeCompany = document.getElementById("code").value;
            let valuation = document.getElementById("valuation").value;
            let valuationDesc = document.getElementById("valuationDesc").value;
            let idCompany = document.getElementById("idCompany").value;
            let nameCompany = document.getElementById("nameCompany").value;

            const d = new Date();
            let date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();


            if (codeCompany == '' && valuation == '' && valuationDesc == '') {
                Toast.fire({
                    icon: 'error',
                    title: 'Data cannot be null'
                });
            } else {
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: '/SaveValuationClass',
                    data: {
                        _token: csrf_token,
                        data_items: `[{"company_name": "${nameCompany}","company_code": "${codeCompany}","id": ${id},"companies_m_id": "${idCompany}", "valuation": "${valuation}","valuationdesc": "${valuationDesc}","status": "Not Used","acc_ref": null,"acc_ref_desc": null}]`
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
                        url: '/RemoveValuationClass',
                        data: {
                            _token: csrf_token,
                            id: parseInt(id)
                        },
                        success: function(response) {
                            $("#closeModalDelete").click();
                            Toast.fire({
                                icon: 'success',
                                title: response.message
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
                url: `/getValuationClass?action=getValuationClass&page=${page}&start=${start}&limit=${limit}&filter=[{"operator":"like","value":"${search}","property":"company_name","type":"string"},{"operator":"like","value":"${search}","property":"company_code","type":"string"},{"operator":"like","value":"${search}","property":"valuation","type":"string"},{"operator":"like","value":"${search}","property":"valuationdesc","type":"string"},{"operator":"like","value":"${search}","property":"status","type":"string"}]`,
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
                        tr.append("<td>" + response.data[i].company_code + "</td>");
                        tr.append("<td>" + response.data[i].company_name + "</td>");
                        tr.append("<td>" + response.data[i].valuation + "</td>");
                        tr.append("<td>" + response.data[i].valuationdesc + "</td>");
                        tr.append("<td>" + response.data[i].status + "</td>");
                        if (groupName == `Administrator's`) {
                            tr.append(`<td>
                                        <center>
                                            <button data-toggle="modal" data-target="#modalForm" onclick="updateData('${response.data[i].company_code}','${response.data[i].company_name}','${response.data[i].valuation}','${response.data[i].valuationdesc}','${response.data[i].id}','${response.data[i].user_name}','${response.data[i].companies_m_id}','${response.data[i].plant_description}')" class="btn btn-default btn-sm no-border"><i class="fa fa-edit"></i></button>
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