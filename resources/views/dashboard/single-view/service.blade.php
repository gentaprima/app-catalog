<?php

use Illuminate\Support\Facades\Auth;
?>
@extends('master')

@section('title','Single View | Service')
@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid mt-3">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Single View Service</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item">Single View</li>
                        <li class="breadcrumb-item active">Service</li>
                    </ol>
                </div><!-- /.col -->
                <p id="menu"></p>
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">

        <div class="row">
            <div class="col-sm-7">
                <div class="card p-4 mb-5 m-2">
                    <h4>Service Item</h4>
                    <hr>
                    <div class="row" id="button" hidden="true">
                        <div class="col-sm-8">
                            <button class="btn btn-default"><i class="fa fa-table"></i> Raw</button>
                            <button class="btn btn-default"><i class="fa fa-table"></i> Document</button>
                            <button class="btn btn-default"><i class="fa fa-table"></i> Image</button>
                        </div>
                        <div class="col-sm-4">
                            <div class="row">
                                <span>Adr Status</span>
                                <span class="ml-auto" id="adrStatus">On Proccess</span>

                            </div>
                            <div class="row">
                                <span>Item Status</span>
                                <span class="ml-auto" id="itemStatus">On Proccess</span>

                            </div>
                        </div>
                    </div>
                    <hr>
                    <form action="">
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Catologue No</label>
                            <div class="col-sm-10">
                                <div class="input-group mb-2">
                                    <input type="number" class="form-control" id="catologueNo" placeholder="">
                                    <div class="input-group-prepend">
                                        <div id="btnSearch" onclick="searchCatolog()" class="input-group-text"><i class="fa fa-search"></i></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">SAP Material Code</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" readonly id="SAP">
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-6">
                                <div class="row">
                                    <label for="" class="col-sm-4">INC</label>
                                    <div class="col-sm-8">
                                        <select class="js-example-data-ajax" onchange="selectMgc(this)" id="inc">
                                            <option value="">Select INC</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="row">
                                    <label for="" class="col-sm-4">MGC</label>
                                    <div class="col-sm-8">
                                        <select class="js-example-basic-single3 " id="mgc">
                                            <option value="">Select MGC</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Name Code</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="nameCode" readonly>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Short Name Code</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="shortNameCode" readonly>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Short Desc</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="shortDesc" readonly>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Long Desc</label>
                            <div class="col-sm-10">
                                <textarea type="text" class="form-control" rows="5" id="longDesc" readonly></textarea>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Material</label>
                            <div class="col-sm-10">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <select readonly class="js-example-data-ajax" id="materialType">
                                            <option value="">Select Material Type</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-4">
                                        <select class="js-example-data-ajax" id="uom">
                                            <option value="">Select UOM</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-4">
                                        <select class="js-example-data-ajax" id="category">
                                            <option value="">Select Category</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Catologuer</label>
                            <div class="col-sm-10">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <select type="text" required class="form-control" id="cataloguer">
                                            <option value="">Select Cataologuer</option>
                                            <option value="Validate">Validate</option>
                                            <option value="Not Validate">Not Validate</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-4">
                                        <select type="text" class="form-control" id="stdApp">
                                            <option value="">Select Std App</option>
                                            <option value="Validate">Validate</option>
                                            <option value="Not Validate">Not Validate</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-4">
                                        <select type="text" class="form-control" id="procApp">
                                            <option value="">Select Proc Approver</option>
                                            <option value="Validate">Validate</option>
                                            <option value="Not Validate">Not Validate</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2"></label>
                            <div class="col-sm-10">
                                <div id="flowBoxes">
                                    <div class="left right" id="arrowUser">USER</div>
                                    <div class="left right" id="arrowCat">CAT</div>
                                    <div class="left right" id="arrowStd">Std App</div>
                                    <div class="left right" id="arrowProc">Proc App</div>
                                    <div class="left right" id="arrowSap">SAP</div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2"></label>
                            <div class="col-sm-10">
                                <button class="btn btn-primary" type="button" id="btnApply" onclick="applyChanges()">Apply Changes</button>
                            </div>
                        </div>
                        <input type="hidden" name="" id="useremail">
                        <input type="hidden" name="" id="catemail">
                        <input type="hidden" name="" id="stdemail">
                        <input type="hidden" name="" id="procemail">
                        <input type="hidden" name="" id="adr_status">
                        <input type="hidden" name="" id="adr_m_id">
                        <input type="hidden" name="" id="item_status">
                    </form>

                </div>
            </div>
            <div class="col-sm-5">
                <div class="card p-4 mb-5 m-2">
                    <h4>Characteristic</h4>
                    <hr>
                    <div class="scrollwrapperCharacteristic">
                        <table id="tableDataCharacteristic" class="table table-striped mt-3">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Characteristic</th>
                                    <th>Value</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>

                        </table>

                    </div>
                </div>
                <div class="card p-4 mb-5 m-2">
                    <h4>Cross Reference</h4>
                    <hr>
                    <button onclick="addReference()" id="btnAddReference" hidden="true" data-toggle="modal" data-target="#modalReference" class="btn btn-outline-primary" style="width: 60%;"><i class="fa fa-plus"></i> Add Reference</button>
                    <table id="tableDataReference" class="table table-striped mt-3">
                        <thead>
                            <tr>
                                <th>Ref No</th>
                                <th>Old Material</th>
                                <th>Manufature</th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="card p-4 mb-5 m-2">
                    <h4>Functional Location</h4>
                    <hr>
                    <button id="btnAddFunction" hidden="true" class="btn btn-outline-primary" data-toggle="modal" data-target="#modalFunct" onclick="addFunction()" style="width: 60%;"><i class="fa fa-plus"></i> Add FuncLoc</button>
                    <table id="tableDataFunction" class="table table-striped mt-3">
                        <thead>
                            <tr>
                                <th>Loc Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
        <p hidden="true" id="adrDItems"></p>
        <p hidden="true" id="incMId"></p>

    </section>

    <div class="modal fade" id="modalReference" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="titleModalReference">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Ref No</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="refNoReference">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Old Material</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="oldMaterialReference">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Manufacture</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="manufactureReference">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Type</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="typeReference">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnCloseModalReference" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" id="saveReference" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modalFunct" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="titleModalFunc">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Loc Name</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="locName">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Description</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="description">
                            </div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnCloseModalFunc" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" id="saveFunction" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modalAbbr" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="titleModalFunc">Add Value Abbreviation</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Abbr</label>
                            <div class="col-sm-10">
                                <div class="input-group mb-2">
                                    <input type="text" class="form-control" id="searchDescription" placeholder="Search Description">
                                    <div class="input-group-prepend">
                                        <div class="input-group-text"><i class="fa fa-search"></i></div>
                                    </div>
                                </div>
                                <table id="tableDataAbbr" class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Description</th>
                                            <th>Code</th>
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
                        </div>
                        <div class="form-group row">
                            <label for="" class="col-sm-2">Value</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="valueCharacteristic">
                                <input type="hidden" name="" id="idValueCharacteristic">
                                <input type="hidden" name="" id="descCharacteristic">
                            </div>
                        </div>

                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" id="btnCloseModalCharacteristic" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" onclick="addCharacteristic()" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="modalDelete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="titleModalReference">Delete Data</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h4 id="titleDelete">Are you sure to delete this data?</h4>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="closeModalDelete" data-dismiss="modal">Close</button>
                    <a onclick="processDeleteReference()" type="button" id="deleteButton" class="btn btn-primary">Delete</a>
                </div>
            </div>
        </div>
    </div>
    <!-- /.content -->

    <p hidden="true" id="page">1</p>
    <p hidden="true" id="start">10</p>
    <p hidden="true" id="limit">10</p>
    <p hidden="true" id="totalData"></p>

    <script>
        let inc = "";
        let shortDesc = "";
        let longDesc = "";
        let dataCharateristic = "";


        $(document).ready(function() {
            $('.js-example-basic-single').select2();
            $('.js-example-basic-single2').select2();
            $('.js-example-basic-single3').select2();
            $('.js-example-basic-single4').select2();
            $('.js-example-basic-single5').select2();
        });
        $(document).ready(function() {
            $("#main-menu-MNU6").addClass("nav-item menu-is-opening menu-open")
            $("#subchild-MNU8").addClass("nav-link active")
        });


        function searchCatolog() {
            let catologueNo = document.getElementById("catologueNo").value;
            document.getElementById("button").hidden = false
            document.getElementById("btnAddReference").hidden = false
            document.getElementById("btnAddFunction").hidden = false
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: `/getCatalogM_p?filter=[{"operator":"eq","value":"${catologueNo}","property":"catalog_no","type":"string"},{"operator":"eq","value":"Active","property":"is_active","type":"string"},{"operator":"eq","value":"Service","property":"transaction_type","type":"string"}]&action=getCatalogM_p&_token=${csrf_token}`,
                success: function(response) {
                    if (response.length > 0) {
                        let data = response;
                        checkUser(data[0].user_name);
                        checkApproval(data[0].company_code);
                        checkStatus(data[0].status_user, data[0].status_cat, data[0].status_stdapp,data[0].status_proc);
                        document.getElementById("adrStatus").innerHTML = data[0].adr_status;
                        document.getElementById("itemStatus").innerHTML = data[0].item_status;
                        document.getElementById("SAP").innerHTML = data[0].sap_material_code;
                        document.getElementById("inc").value = data[0].inc;
                        

                        document.getElementById("nameCode").value = data[0].item_name;
                        document.getElementById("shortNameCode").value = data[0].short_name_code;
                        document.getElementById("adrDItems").innerHTML = data[0].adr_d_items_id;
                        document.getElementById("incMId").innerHTML = data[0].inc_m_id;
                        document.getElementById("useremail").value = data[0].email_user;
                        document.getElementById("catemail").value = data[0].email_cat;
                        document.getElementById("procemail").value = data[0].email_proc;
                        document.getElementById("procemail").value = data[0].email_std;
                        document.getElementById("adr_status").value = data[0].adr_status;
                        document.getElementById("adr_m_id").value = data[0].adr_m_id;
                        document.getElementById("item_status").value = data[0].item_status;
                        document.getElementById("shortDesc").value = data[0].short_description;
                        document.getElementById("longDesc").value = data[0].long_description;
                        document.getElementById("SAP").value = data[0].sap_material_code;
                        if (data[0].cataloguer != null) {
                            document.getElementById("cataloguer").value = data[0].cataloguer;
                        }

                        if (data[0].std_approval != null) {
                            document.getElementById("stdApp").value = data[0].std_approval;
                        }

                        if(data[0].proc_approver != null){
                            document.getElementById("procApp").value = data[0].proc_approver;
                        }

                        getReference(data[0].adr_d_items_id);
                        getItemsFuncloc(data[0].adr_d_items_id);
                        // getCharacteristic(data[0].adr_d_items_id, data[0].inc_m_id);

                        var incSelect = $('#inc');
                        var option = new Option(data[0].class_inc_name, data[0].inc + '-' + data[0].inc_m_id + '-' + data[0].item_name + '-' + data[0].short_name_code, true, true);
                        incSelect.append(option).trigger('change');

                        var mgcSelect = $("#mgc")
                        var optiobMgc = new Option(data[0].group_class_name, data[0].groupclass, true, true)
                        mgcSelect.append(optiobMgc).trigger('change');

                        if (data[0].material_type != null) {
                            var materialType = $("#materialType")
                            var optiobMaterial = new Option(data[0].material_type, data[0].material_type, true, true)
                            materialType.append(optiobMaterial).trigger('change');
                        }

                        if (data[0].uom != null) {
                            var uom = $("#uom")
                            var optionUom = new Option(data[0].uom, data[0].uom, true, true)
                            uom.append(optionUom).trigger('change');
                        }

                        if (data[0].category != null) {
                            var category = $("#category")
                            var optionCategory = new Option(data[0].category, data[0].category, true, true)
                            category.append(optionCategory).trigger('change');
                        }
                        // check status

                        if (data[0].status_user == 1) {
                            $("#arrowUser").attr("class", "left right active")
                        } else {
                            $("#arrowUser").attr("class", "left right notactive")
                        }

                        if (data[0].status_cat == 1) {
                            $("#arrowCat").attr("class", "left right active")
                        } else {
                            $("#arrowCat").attr("class", "left right notactive")
                        }

                        if (data[0].status_stdapp == 1) {
                            $("#arrowStd").attr("class", "left right active")
                        } else {
                            $("#arrowStd").attr("class", "left right notactive")
                        }

                        if (data[0].status_sap == 1) {
                            $("#arrowSap").attr("class", "left right active")
                        } else {
                            $("#arrowSap").attr("class", "left right notactive")
                        }

                        if (data[0].status_proc == 1) {
                            $("#arrowProc").attr("class", "left right active")
                        } else {
                            $("#arrowProc").attr("class", "left right notactive")
                        }

                    } else {
                        Toast.fire({
                            icon: 'error',
                            title: 'Data not found'
                        });
                    }
                }

            })
        }

        function checkUser(username) {
            console.log(username + " " + userName);
            if (username != userName) {
                document.querySelectorAll("input[type='text']").forEach(input => {
                    input.disabled = true;
                })

                document.getElementById("materialType").setAttribute("disabled", true);
                document.getElementById("uom").setAttribute("disabled", true)
                document.getElementById("category").setAttribute("disabled", true)
                document.getElementById("btnApply").hidden = true

            } else {
                document.getElementById("btnApply").hidden = false
                document.querySelectorAll("input[type='text']").forEach(input => {
                    input.disabled = false;
                })


                document.getElementById("materialType").removeAttribute("disabled");
                document.getElementById("uom").removeAttribute("disabled");
            }
        }


        function checkApproval(company_code, ) {

            if (groupName == 'User') {
                document.getElementById("cataloguer").setAttribute("disabled", true)
                document.getElementById("stdApp").setAttribute("disabled", true)
                document.getElementById("procApp").setAttribute("disabled", true)
            } else if (groupName == 'Cat') {
                if (company_code == companyCode) {

                    document.getElementById("materialType").setAttribute("disabled", true);
                    document.getElementById("uom").setAttribute("disabled", true)
                    document.getElementById("category").setAttribute("disabled", true)

                    document.getElementById("cataloguer").removeAttribute("disabled")
                    document.getElementById("stdApp").setAttribute("disabled", true)
                    document.getElementById("procApp").setAttribute("disabled", true)
                    document.getElementById("btnApply").hidden = false
                } else {
                    document.getElementById("cataloguer").setAttribute("disabled", true);
                    document.getElementById("stdApp").setAttribute("disabled", true)
                    document.getElementById("procApp").setAttribute("disabled", true)

                }

            } else if (groupName == 'Std App T' || groupName == 'Std App O' || groupName == 'Std App M' || groupName == 'Std App I' || groupName == 'Std App H' || groupName == 'Std App G' || groupName == 'Std App S') {

                if (company_code == companyCode) {
                    document.getElementById("materialType").setAttribute("disabled", true);
                    document.getElementById("uom").setAttribute("disabled", true)
                    document.getElementById("category").setAttribute("disabled", true)

                    document.getElementById("cataloguer").setAttribute("disabled", true)
                    document.getElementById("stdApp").removeAttribute("disabled")
                    document.getElementById("procApp").setAttribute("disabled", true)
                    document.getElementById("btnApply").hidden = false

                } else {
                    document.getElementById("btnApply").hidden = true
                    document.getElementById("cataloguer").setAttribute("disabled", true);
                    document.getElementById("stdApp").setAttribute("disabled", true)
                    document.getElementById("procApp").setAttribute("disabled", true)
                }
            }
        }

        function checkStatus(status, statusCat, statusStd,statusProc) {
            if (status == "1" && groupName == 'User') {
                document.querySelectorAll("input[type='text']").forEach(input => {
                    input.disabled = true;
                })

                document.getElementById("materialType").setAttribute("disabled", true);
                document.getElementById("uom").setAttribute("disabled", true)
                document.getElementById("category").setAttribute("disabled", true)
                document.getElementById("inc").setAttribute("disabled", true)
                document.getElementById("mgc").setAttribute("disabled", true)

                document.getElementById("btnApply").hidden = true
            } else if (statusCat == "1" && groupName == 'Cat') {
                document.querySelectorAll("input[type='text']").forEach(input => {
                    input.disabled = true;
                })

                document.getElementById("materialType").setAttribute("disabled", true);
                document.getElementById("uom").setAttribute("disabled", true)
                document.getElementById("category").setAttribute("disabled", true)

                document.getElementById("cataloguer").setAttribute("disabled", true);
                document.getElementById("btnApply").hidden = true
            } else if (statusStd == '1' && groupName.substr(0, 3) == 'Std') {
                document.querySelectorAll("input[type='text']").forEach(input => {
                    input.disabled = true;
                })

                document.getElementById("materialType").setAttribute("disabled", true);
                document.getElementById("uom").setAttribute("disabled", true)
                document.getElementById("category").setAttribute("disabled", true)

                document.getElementById("stdApp").setAttribute("disabled", true)
                document.getElementById("btnApply").hidden = true
            } else if (status == 0 && groupName == 'User') {
                document.getElementById("btnApply").hidden = false
                document.querySelectorAll("input[type='text']").forEach(input => {
                    input.disabled = false;
                })


                document.getElementById("materialType").removeAttribute("disabled");
                document.getElementById("uom").removeAttribute("disabled");
                document.getElementById("category").removeAttribute("disabled");
                document.getElementById("cataloguer").setAttribute("disabled", true);
                document.getElementById("stdApp").setAttribute("disabled", true)
                document.getElementById("procApp").setAttribute("disabled", true)
                document.getElementById("inc").removeAttribute("disabled", true)
                document.getElementById("mgc").removeAttribute("disabled", true)
            } else if (statusCat == 0 && groupName == 'Cat') {
                document.getElementById("btnApply").hidden = false
                document.querySelectorAll("input[type='text']").forEach(input => {
                    input.disabled = false;
                })


                document.getElementById("materialType").removeAttribute("disabled");
                document.getElementById("uom").removeAttribute("disabled");
                document.getElementById("category").removeAttribute("disabled");
                document.getElementById("cataloguer").removeAttribute("disabled", true);
                document.getElementById("stdApp").setAttribute("disabled", true)
                document.getElementById("procApp").setAttribute("disabled", true)
            }else if(statusStd == 0 && groupName.substr(0, 3) == 'Std'){
                document.getElementById("btnApply").hidden = false
                document.querySelectorAll("input[type='text']").forEach(input => {
                    input.disabled = false;
                })


                document.getElementById("materialType").setAttribute("disabled",true);
                document.getElementById("inc").setAttribute("disabled",true);
                document.getElementById("mgc").setAttribute("disabled",true);
                document.getElementById("uom").setAttribute("disabled",true);
                document.getElementById("category").setAttribute("disabled",true);
                document.getElementById("cataloguer").setAttribute("disabled", true);
                document.getElementById("stdApp").removeAttribute("disabled")
                document.getElementById("procApp").setAttribute("disabled", true)
            }else if (statusProc == 0 && groupName == 'Proc') {
                document.querySelectorAll("input[type='text']").forEach(input => {
                    input.disabled = true;
                })

                document.getElementById("materialType").setAttribute("disabled", true);
                document.getElementById("uom").setAttribute("disabled", true)
                document.getElementById("category").setAttribute("disabled", true)
                document.getElementById("inc").setAttribute("disabled", true)
                document.getElementById("mgc").setAttribute("disabled", true)

                document.getElementById("cataloguer").setAttribute("disabled", true);
                document.getElementById("stdApp").setAttribute("disabled",true)
                document.getElementById("procApp").removeAttribute("disabled")

                document.getElementById("btnApply").hidden = false
            }else if(statusProc == 1 && groupName == 'Proc'){
                document.querySelectorAll("input[type='text']").forEach(input => {
                    input.disabled = true;
                })

                document.getElementById("materialType").setAttribute("disabled", true);
                document.getElementById("uom").setAttribute("disabled", true)
                document.getElementById("category").setAttribute("disabled", true)
                document.getElementById("inc").setAttribute("disabled", true)
                document.getElementById("mgc").setAttribute("disabled", true)

                document.getElementById("cataloguer").setAttribute("disabled", true);
                document.getElementById("stdApp").setAttribute("disabled",true)
                document.getElementById("procApp").setAttribute("disabled", true)

                document.getElementById("btnApply").hidden = true
            }
        }


        function applyChanges() {
            let catologueNo = document.getElementById("catologueNo").value;
            let materialType = document.getElementById("materialType").value;
            let uom = document.getElementById("uom").value;
            let category = document.getElementById("category").value;
            let adrDItems = document.getElementById("adrDItems").innerHTML
            let inc = document.getElementById("inc").value.split('-');
            let mgc = document.getElementById("mgc").value;
            let userEmail = document.getElementById("useremail").value;
            let catEmail = document.getElementById("catemail").value;
            let emailProc = document.getElementById("procemail").value;
            let stdEmail = document.getElementById("stdemail").value;
            let adrStatus = document.getElementById("adr_status").value;
            let adrMId = document.getElementById("adr_m_id").value;
            let itemStatus = document.getElementById("item_status").value
            let nameCode = document.getElementById("nameCode").value;
            let shortNameCode = document.getElementById("shortNameCode").value;
            let shortDesc = document.getElementById("shortDesc").value;
            let longDesc = document.getElementById("longDesc").value;
            let sap = document.getElementById("SAP").value;
            let cataloguer = document.getElementById("cataloguer").value;
            let stdApp = document.getElementById("stdApp").value;
            let procApp = document.getElementById("procApp").value;


            if (catologueNo == '' || materialType == '' || uom == '' || category == '') {

                Toast.fire({
                    icon: 'error',
                    title: 'Data cannot be null'
                });
            } else {
                if (groupName == 'User') {
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
                                materialApplyChange();
                            }
                        })
                } else if (groupName == 'Cat') {
                    if (cataloguer == '') {

                        Toast.fire({
                            icon: 'error',
                            title: 'Please select cataloguer'
                        });
                    } else {
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
                                materialApplyChange();
                            }
                        })
                    }
                } else if (groupName == 'Std App T' || groupName == 'Std App O' || groupName == 'Std App M' || groupName == 'Std App I' || groupName == 'Std App H' || groupName == 'Std App G' || groupName == 'Std App S') {
                    if (stdApp == '') {
                        Toast.fire({
                            icon: 'error',
                            title: 'Please select std approver'
                        });
                    } else {
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
                                materialApplyChange();
                            }
                        })
                    }
                }else if(groupName == 'Proc'){
                    if(procApp == ''){
                        Toast.fire({
                            icon: 'error',
                            title: 'Please select proc approver'
                        });
                    }else{
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
                                materialApplyChange();
                            }
                        })
                    }
                }

            }
        }

        function materialApplyChange() {
            if(dataCharateristic == ""){
                dataCharateristic = "[]";
            }

            let catologueNo = document.getElementById("catologueNo").value;
            let materialType = document.getElementById("materialType").value;
            let uom = document.getElementById("uom").value;
            let category = document.getElementById("category").value;
            let adrDItems = document.getElementById("adrDItems").innerHTML
            let inc = document.getElementById("inc").value.split('-');
            let mgc = document.getElementById("mgc").value;
            let userEmail = document.getElementById("useremail").value;
            let catEmail = document.getElementById("catemail").value;
            let emailProc = document.getElementById("procemail").value;
            let stdEmail = document.getElementById("stdemail").value;
            let adrStatus = document.getElementById("adr_status").value;
            let adrMId = document.getElementById("adr_m_id").value;
            let itemStatus = document.getElementById("item_status").value
            let nameCode = document.getElementById("nameCode").value;
            let shortNameCode = document.getElementById("shortNameCode").value;
            let shortDesc = document.getElementById("shortDesc").value;
            let longDesc = document.getElementById("longDesc").value;
            let sap = document.getElementById("SAP").value;
            let cataloguer = document.getElementById("cataloguer").value;
            let stdApp = document.getElementById("stdApp").value;
            let procApp = document.getElementById("procApp").value;

            $.ajax({
                type: "post",
                url: '/ServiceApplyChanges',
                dataType: 'json',
                data: {
                    items_characteristic: dataCharateristic,
                    catalog_no: catologueNo,
                    _token: csrf_token,
                    transaction_type: 'Service',
                    useremail: userEmail,
                    items_is_active: "",
                    catemail: catEmail,
                    procemail: emailProc,
                    adr_status: adrStatus,
                    stdemail: stdEmail,
                    adr_m_id: adrMId,
                    adr_d_items_id: adrDItems,
                    sap_material_code: sap,
                    item_status: itemStatus,
                    inc: inc[0],
                    groupclass: mgc,
                    name_code: nameCode,
                    short_name_code: shortNameCode,
                    short_description: shortDesc,
                    long_description: longDesc,
                    material_type: materialType,
                    uom: uom,
                    category: category,
                    cataloguer: cataloguer,
                    std_approval: stdApp,
                    proc_approver: procApp

                },
                success: function(response) {
                    if (response.success == true) {
                        Toast.fire({
                            icon: 'success',
                            title: response.message
                        });
                        searchCatolog();
                    } else {
                        Toast.fire({
                            icon: 'error',
                            title: response.message
                        });
                    }
                }
            })
        }

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
                        filter: `[{"operator":"eq","value":"Service","property":"transaction_type","type":"string"},{"operator":"eq","value":"Active","property":"is_active","type":"string"}]`
                    }
                    return query;
                },
                processResults: function(data) {
                    return {
                        results: $.map(data, function(item) {
                            return {
                                text: item.class_inc_name,
                                id: item.inc + '-' + item.id + '-' + item.name_code + '-' + item.short_name_code
                            }
                        })
                    };
                }
            }

        })
        $("#materialType").select2({

            ajax: {
                url: `/getServiceType`,
                dataType: 'json',
                data: function(params) {
                    if (params.term == undefined) {
                        params.term = ""
                    }
                    var query = {
                        query: params.term,
                        action: "getEntity",
                        page: 1,
                        start: 0,
                        limit: 25,
                        filter: `[{"operator":"like","value":"service_type","property":"entity_name","type":"string"}]`
                    }
                    return query;
                },
                processResults: function(data) {
                    return {
                        results: $.map(data, function(item) {
                            return {
                                text: item.entity_code_name,
                                id: item.code
                            }
                        })
                    };
                }
            }

        })
        $("#uom").select2({

            ajax: {
                url: `/getUOM`,
                dataType: 'json',
                data: function(params) {
                    if (params.term == undefined) {
                        params.term = ""
                    }
                    var query = {
                        query: params.term,
                        action: "getEntity",
                        page: 1,
                        start: 0,
                        limit: 25,
                        filter: `[{"operator":"eq","value":"UOM","property":"entity_name","type":"string"}]`
                    }
                    return query;
                },
                processResults: function(data) {
                    return {
                        results: $.map(data, function(item) {
                            return {
                                text: item.entity_code_name,
                                id: item.code
                            }
                        })
                    };
                }
            }

        })
        $("#category").select2({

            ajax: {
                url: `/getCategory`,
                dataType: 'json',
                data: function(params) {
                    if (params.term == undefined) {
                        params.term = ""
                    }
                    var query = {
                        query: params.term,
                        action: "getEntity",
                        page: 1,
                        start: 0,
                        limit: 25,
                        filter: `[{"operator":"eq","value":"servicecategory","property":"entity_name","type":"string"}]`
                    }
                    return query;
                },
                processResults: function(data) {
                    return {
                        results: $.map(data, function(item) {
                            return {
                                text: item.entity_code_name,
                                id: item.code
                            }
                        })
                    };
                }
            }

        })


        // Characteristic

        function addCharacteristic() {
            let adrdItems = document.getElementById("adrDItems").innerHTML;
            let idValueCharacteristic = document.getElementById("idValueCharacteristic").value;
            let descValueCharacteristic = document.getElementById("descCharacteristic").value;
            let valueCharacteristic = document.getElementById("valueCharacteristic").value;

            $.ajax({
                type: "post",
                dataType: 'json',
                url: '/update-value-characteristic',
                data: {
                    id: idValueCharacteristic,
                    adr_d_items_id: adrdItems,
                    nValue: valueCharacteristic,
                    _token: csrf_token
                },
                success: function(response) {
                    if (response.success == true) {
                        $("#btnCloseModalCharacteristic").click();
                        Toast.fire({
                            icon: 'success',
                            title: 'Success add new characteristic.'
                        });
                        loadDataCharacteristic(adrdItems);
                        loadAllDataCharacteristic(adrdItems);
                    }
                }
            })
        }

        function loadDataCharacteristic(adrdItems) {
            shortDesc = document.getElementById("shortNameCode").value + ":";
            longDesc = document.getElementById("shortNameCode").value + ":";
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: `/get-value-characteristic/${adrdItems}`,
                success: function(response) {
                    let data = response.data;
                    let shortNameCode = document.getElementById("shortNameCode").value;
                    let shortDescValue = "";
                    for (let i = 0; i < data.length; i++) {
                        shortDesc += data[i].nvalue + ';'
                        longDesc += data[i].characteristics + ":" + data[i].nvalue + ';'
                    }
                    document.getElementById("shortDesc").value = shortDesc;
                    document.getElementById("longDesc").value = longDesc;

                }
            })
        }

        function loadAllDataCharacteristic(adrDItems) {
            dataCharateristic = "";
            $("#tableDataCharacteristic tbody").empty();
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: `/get-value-characteristic-all/${adrDItems}`,
                async: false,
                success: function(response) {
                    // let data = JSON.parse(response).data;
                    let data = response.data;
                    let k = 1;
                    for (let i = 0; i < data.length; i++) {
                        var tr = $("<tr>");
                        tr.append("<td>" + k++ + "</td>");
                        tr.append("<td>" + data[i].characteristics + "</td>");
                        if (data[i].nvalue == null) {
                            tr.append("<td></td>");
                        } else {
                            tr.append("<td>" + (data[i].nvalue) + "</td>");
                        }
                        tr.append("<td>" + (data[i].type) + "</td>");
                        tr.append(`<td>
                            <center>
                                <button onclick="showAbbr('${data[i].id_characteristic_value}','${data[i].characteristics}')" data-toggle="modal" data-target="#modalAbbr" class="btn btn-default btn-xs"><i class='fa fa-edit'></i></button>
                            </center>
                            </td>`);
                        $("#tableDataCharacteristic").append(tr);
                    }
                    for (let i = 0; i < data.length; i++) {
                        data[i].id = data[i].id_characteristic_value;
                    }

                    data.forEach(object => {
                        delete object['id_characteristic_value'];
                    })
                   
                    dataCharateristic += JSON.stringify(response.data);
                }
            })
        }


        function addValueCharacteristic(data) {
            
            let adrDItems = document.getElementById("adrDItems").innerHTML;
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: '/add-value-characteristic',
                data: {
                    characteristic: data,
                    adr_d_items_id: adrDItems,
                    _token: csrf_token
                },
                success: function(response) {
                    let data = response.data;
                    let k = 1;
                    for (let i = 0; i < data.length; i++) {
                        var tr = $("<tr>");
                        tr.append("<td>" + k++ + "</td>");
                        tr.append("<td>" + data[i].characteristics + "</td>");
                        if (data[i].nvalue == null) {
                            tr.append("<td></td>");
                        } else {
                            tr.append("<td>" + (data[i].nvalue) + "</td>");
                        }
                        tr.append("<td>" + (data[i].type) + "</td>");
                        tr.append(`<td>
                            <center>
                                <button onclick="showAbbr('${data[i].id_characteristic_value}','${data[i].characteristics}')" data-toggle="modal" data-target="#modalAbbr" class="btn btn-default btn-xs"><i class='fa fa-edit'></i></button>
                            </center>
                            </td>`);
                        $("#tableDataCharacteristic").append(tr);
                    }
                }
            })
        }

        function updateAllValueCharacteristic(data) {
            let adrDItems = document.getElementById("adrDItems").innerHTML;
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: '/update-all-value-characteristic',
                data: {
                    characteristic: data,
                    adr_d_items_id: adrDItems,
                    _token: csrf_token
                },
                success: function(response) {
                    let data = response.data;
                    let k = 1;
                    for (let i = 0; i < data.length; i++) {
                        var tr = $("<tr>");
                        tr.append("<td>" + k++ + "</td>");
                        tr.append("<td>" + data[i].characteristics + "</td>");
                        if (data[i].nvalue == null) {
                            tr.append("<td></td>");
                        } else {
                            tr.append("<td>" + (data[i].nvalue) + "</td>");
                        }
                        tr.append("<td>" + (data[i].type) + "</td>");
                        tr.append(`<td>
                            <center>
                                <button onclick="showAbbr('${data[i].id_characteristic_value}','${data[i].characteristics}')" data-toggle="modal" data-target="#modalAbbr" class="btn btn-default btn-xs"><i class='fa fa-edit'></i></button>
                            </center>
                            </td>`);
                        $("#tableDataCharacteristic").append(tr);
                    }
                }
            })
        }

        function getCharacteristic(adrDItems, incMId,type = 'new') {
            $("#tableDataCharacteristic tbody").empty();
            dataCharateristic = "";
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: `/getItemsIncCharacteristics?start=0&limit=300&_token=${csrf_token}&inc_m_id=${incMId}&adr_d_items_id=${adrDItems}&sort=[{"property":"sequence","direction":"ASC"}]&page=1`,
                async: false,
                success: function(response) {
                    if (response.total > 0) {
                        dataCharateristic += JSON.stringify(response.data)
                        let data = response.data
                        for (let i = 0; i < data.length; i++) {
                            data[i].id_characteristic_value = data[i].id
                            data[i].type_adr = 'Addition'
                        }

                        data.forEach(object => {
                            delete object['id'];
                        })

                        addValueCharacteristic(response.data);
                        // if(type == 'new'){
                        // }else{
                        //     updateAllValueCharacteristic(response.data);
                        // }
                    }
                }
            })
        }

        $('#searchDescription').keyup((e) => {
            loadDataAbbr(1, 1, 10, e.currentTarget.value);
        });

        function showAbbr(id, descCharacteristic) {
            let adrDItems = document.getElementById("adrDItems").innerHTML;
            document.getElementById("idValueCharacteristic").value = id;
            document.getElementById("descCharacteristic").value = descCharacteristic;
            loadDataAbbr();
        }

        function loadDataAbbr(page = 1, start = 1, limit = 10, search = "") {
            $("#tableDataAbbr tbody").empty();
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: `/get-abbreviation?action=getAbbreviation&start=${start}&page=${page}&limit=${limit}&filter=[{"operator":"eq","value":"abbreviation","property":"entity_name","type":"string"},{"operator":"like","value":"${search}","property":"description","type":"string"}]`,
                success: function(response) {
                    var totalPage = Math.ceil(response.total / 10)
                    document.getElementById("totalData").innerHTML = totalPage
                    document.getElementById("total_page").innerHTML = totalPage
                    let k = 1;
                    for (let i = 0; i < response.data.length; i++) {
                        var tr = $("<tr>");
                        tr.append("<td>" + k++ + "</td>");
                        tr.append("<td>" + (response.data[i].description) + "</td>");
                        tr.append("<td>" + (response.data[i].code) + "</td>");
                        tr.append(`<td><center><i onclick="setValueCharacteristic('${response.data[i].code}')" class='fa fa-check'></i></center></td>`);
                        $("#tableDataAbbr").append(tr);
                    }
                }
            })
        }

        function setValueCharacteristic(code) {
            let adrdItems = document.getElementById("adrDItems").innerHTML;
            let idValueCharacteristic = document.getElementById("idValueCharacteristic").value;
            let descValueCharacteristic = document.getElementById("descCharacteristic").value;
            document.getElementById("valueCharacteristic").value = code;
        }

        function nextPage() {
            $("#tableData tbody").empty();
            let search = document.getElementById("searchDescription").value
            var page = document.getElementById("page").innerHTML;
            var start = document.getElementById("start").innerHTML;

            loadDataAbbr(parseInt(page) + 1, parseInt(start) + 10, 10, search);

            document.getElementById("page").innerHTML = parseInt(page) + 1
            document.getElementById("start").innerHTML = parseInt(start) + 10
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

            loadDataAbbr(parseInt(page) - 1, parseInt(start) - 10, 10, search);

            document.getElementById("page").innerHTML = parseInt(page) - 1
            document.getElementById("start").innerHTML = parseInt(start) - 10
            document.getElementById("start").innerHTML = parseInt(start) + 10
            document.getElementById("current_page").innerHTML = parseInt(page) - 1
            // console.log(document.getElementById("page"));
            if (document.getElementById("page").innerHTML == "1") {
                $("#example1_previous").addClass("paginate_button next prev disabledd")
            }
        }


        // Characteristic



        function selectMgc(val) {
            let inc = val.value.split('-');
            let adrDItems = document.getElementById("adrDItems").innerHTML;
            getCharacteristic(adrDItems, inc[1], 'update');
            document.getElementById("nameCode").value = inc[2];
            document.getElementById("shortNameCode").value = inc[3];
            document.getElementById("shortDesc").value = inc[3];
            document.getElementById("longDesc").value = inc[3];
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
                            filter: `[{"operator":"like","value":"Service","property":"transaction_type","type":"string"},{"operator":"eq","value":"${inc[0]}","property":"inc","type":"string"}]`
                        }
                        return query;
                    },
                    processResults: function(data) {
                        return {
                            results: $.map(data, function(item) {
                                return {
                                    text: item.group_class_name,
                                    id: item.groupclass
                                }
                            })
                        };
                    }
                }
            })
        }


        // Function
        function getItemsFuncloc(adrDItems) {
            $("#tableDataFunction tbody").empty();
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: `/getItemsFuncloc?start=0&limit=25&_token=${csrf_token}&page=1&filter=[{"operator":"eq","value":${adrDItems},"property":"adr_d_items_id","type":"numeric"}]`,
                success: function(response) {
                    let data = response.data;
                    for (let i = 0; i < data.length; i++) {
                        var tr = $("<tr>");
                        tr.append("<td>" + data[i].name + "</td>");
                        tr.append("<td>" + (data[i].description) + "</td>");
                        tr.append(`<td>
                            <center>
                                <button data-toggle="modal" data-target="#modalFunct" onclick="updateFunction('${data[i].name}','${data[i].description}','${data[i].id}')" class="btn btn-default btn-xs"><i class='fa fa-edit'></i></button>
                                <button  onclick="deleteFunction('${data[i].id}','${data[i].adrDItems}')" class="btn btn-default btn-xs"><i class='fa fa-trash'></i></button>
                            </center>
                            </td>`);
                        $("#tableDataFunction").append(tr);
                    }

                }
            })
        }

        function addFunction() {
            document.getElementById("titleModalFunc").innerHTML = "Add Function Location";
            document.getElementById("locName").value = "";
            document.getElementById("description").value = "";
            let buttonSave = document.getElementById("saveFunction");
            buttonSave.setAttribute("onclick", 'proccessAddFunction()');

        }

        function proccessAddFunction() {
            let locName = document.getElementById("locName").value;
            let adrDItems = document.getElementById("adrDItems").innerHTML;
            let description = document.getElementById("description").value;
            if (locName == '' && description == '') {
                Toast.fire({
                    icon: 'error',
                    title: 'Data cannot be null'
                });
            } else {
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: '/SaveItemsFuncloc',
                    data: {
                        _token: csrf_token,
                        adr_d_items_id: adrDItems,
                        funcloc: `[{"flag":"Insert","id":"model_material_funloc-1","name":"${locName}","description":"${description}"}]`
                    },
                    success: function(response) {
                        if (response.success == true) {
                            $("#btnCloseModalFunc").click();
                            Toast.fire({
                                icon: 'success',
                                title: 'Success add new function location.'
                            });
                            getItemsFuncloc(adrDItems);
                        }
                    }
                })
            }
        }

        function updateFunction(locName, description, id) {
            document.getElementById("titleModalFunc").innerHTML = "Update Function Location";
            document.getElementById("locName").value = locName;
            document.getElementById("description").value = description;
            let buttonSave = document.getElementById("saveFunction");
            buttonSave.setAttribute("onclick", `proccessUpdateFunction('${id}')`);
        }

        function deleteFunction(id, adrDItems) {
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
                        url: '/DeletedItemsFuncLoc',
                        data: {
                            _token: csrf_token,
                            id: id
                        },
                        success: function(response) {
                            Toast.fire({
                                icon: 'success',
                                title: 'Success deleted reference'
                            });
                            getItemsFuncloc(adrDItems);

                        }
                    })
                }
            })
        }

        function proccessUpdateFunction(id) {
            let locName = document.getElementById("locName").value;
            let adrDItems = document.getElementById("adrDItems").innerHTML;
            let description = document.getElementById("description").value;
            const d = new Date();
            let date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            if (locName == '' && description == '') {
                Toast.fire({
                    icon: 'error',
                    title: 'Data cannot be null'
                });
            } else {
                $.ajax({
                    type: 'post',
                    dataType: 'json',
                    url: '/SaveItemsFuncloc',
                    data: {
                        _token: csrf_token,
                        adr_d_items_id: adrDItems,
                        funcloc: ` [{
                                        "id": ${id},
                                        "adr_d_items_id": ${adrDItems},
                                        "name": "${locName}",
                                        "description": "${description}",
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
                            $("#btnCloseModalFunc").click();
                            Toast.fire({
                                icon: 'success',
                                title: 'Success update new function location.'
                            });
                            getItemsFuncloc(adrDItems);
                        }
                    }
                })
            }
        }

        // Function



        // Reference

        function getReference(adrDItems) {
            $("#tableDataReference tbody").empty();
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: `/getItemsCrossReferences?start=0&limit=300&_token=${csrf_token}&page=1&filter=[{"operator":"eq","value":${adrDItems},"property":"adr_d_items_id","type":"numeric"}]`,
                success: function(response) {
                    let data = response.data;
                    for (let i = 0; i < data.length; i++) {
                        var tr = $("<tr>");
                        tr.append("<td>" + data[i].refno + "</td>");
                        tr.append("<td>" + (data[i].old_material_code) + "</td>");
                        tr.append("<td>" + (data[i].manufactur) + "</td>");
                        tr.append("<td>" + (data[i].type) + "</td>");
                        tr.append(`<td>
                            <center>
                                <button onclick="updateReference('${data[i].id}','${data[i].refno}','${data[i].old_material_code}','${data[i].manufactur}','${data[i].type}')" data-toggle="modal" data-target="#modalReference" class="btn btn-default btn-xs"><i class='fa fa-edit'></i></button>
                                <button onclick="deleteReference('${data[i].id}','${adrDItems}')"  class="btn btn-default btn-xs"><i class='fa fa-trash'></i></button>
                            </center>
                            </td>`);
                        $("#tableDataReference").append(tr);
                    }

                }
            })
        }

        function addReference() {
            document.getElementById("titleModalReference").innerHTML = "Add Reference";
            document.getElementById("refNoReference").value = "";
            document.getElementById("oldMaterialReference").value = "";
            document.getElementById("manufactureReference").value = "";
            document.getElementById("typeReference").value = "";
            let buttonSave = document.getElementById("saveReference");
            buttonSave.setAttribute("onclick", 'proccessAddReference()');

        }

        function updateReference(id, refNo, oldMaterial, manufactur, type) {
            document.getElementById("titleModalReference").innerHTML = "Update Reference";
            document.getElementById("refNoReference").value = refNo;
            document.getElementById("oldMaterialReference").value = oldMaterial;
            document.getElementById("manufactureReference").value = manufactur;
            document.getElementById("typeReference").value = type;
            let buttonSave = document.getElementById("saveReference");
            buttonSave.setAttribute("onclick", `proccessUpdateReference('${id}')`);
        }

        function proccessUpdateReference(id) {

            let adrDItems = document.getElementById("adrDItems").innerHTML;
            let refNo = document.getElementById("refNoReference").value;
            let oldMaterial = document.getElementById("oldMaterialReference").value;
            let manufacture = document.getElementById("manufactureReference").value;
            let type = document.getElementById("typeReference").value;
            if (refNo == '' && oldMaterial == '' && manufacture == '' && type == '') {
                Toast.fire({
                    icon: 'error',
                    title: 'Data cannot be null'
                });
            } else {
                const d = new Date();
                let date = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                $.ajax({
                    type: 'POST',
                    dataType: "json",
                    url: '/SaveItemsCrossReferences',
                    data: {
                        _token: csrf_token,
                        adr_d_items_id: adrDItems,
                        cross_references: `[{
                                                "id": ${id},
                                                "adr_d_items_id": ${adrDItems},
                                                "refno": "${refNo}",
                                                "old_material_code": "${oldMaterial}",
                                                "manufactur": "${manufacture}",
                                                "type": "${type}",
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
                            $("#btnCloseModalReference").click();
                            Toast.fire({
                                icon: 'success',
                                title: 'Success update new reference.'
                            });
                            getReference(adrDItems);
                        }
                    }
                })
            }
        }

        function deleteReference(id, adrDItems) {
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
                        url: '/DeletedItemsCrossReference',
                        data: {
                            _token: csrf_token,
                            id: id
                        },
                        success: function(response) {
                            $("#closeModalDelete").click();
                            Toast.fire({
                                icon: 'success',
                                title: 'Success deleted reference'
                            });
                            getReference(adrDItems);

                        }
                    })
                }
            })

        }

        function proccessAddReference() {
            let adrDItems = document.getElementById("adrDItems").innerHTML;
            let refNo = document.getElementById("refNoReference").value;
            let oldMaterial = document.getElementById("oldMaterialReference").value;
            let manufacture = document.getElementById("manufactureReference").value;
            let type = document.getElementById("typeReference").value;
            if (refNo == '' && oldMaterial == '' && manufacture == '' && type == '') {
                Toast.fire({
                    icon: 'error',
                    title: 'Data cannot be null'
                });
            } else {
                $.ajax({
                    type: 'POST',
                    dataType: "json",
                    url: '/SaveItemsCrossReferences',
                    data: {
                        _token: csrf_token,
                        adr_d_items_id: adrDItems,
                        cross_references: `[{"flag":"Insert","id":"model_material_cross_references-5","refno":"${refNo}","old_material_code":"${oldMaterial}","manufactur":"${manufacture}","type":"${type}"}]`
                    },
                    success: function(response) {
                        if (response.success == true) {
                            $("#btnCloseModalReference").click();
                            Toast.fire({
                                icon: 'success',
                                title: 'Success add new reference.'
                            });
                            getReference(adrDItems);
                        }
                    }
                })
            }
        }

        // Referenrence
    </script>
    @endsection