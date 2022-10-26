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
                        <button type="button" class="btn btn-primary mr-1">
                            Export &nbsp; <i class="fas fa-file-export"></i>
                        </button>
                        <button type="button" class="btn btn-primary">
                            Reset &nbsp; <i class="fas fa-filter"></i>
                        </button>
                        <button type="button" class="btn btn-primary mx-1">
                            Search &nbsp; <i class="fas fa-search"></i>
                        </button>
                        <button type="button" class="btn btn-primary">
                            More Search &nbsp; <i class="fas fa-search"></i>
                        </button>
                    </h3>
                    <div class="card-tools mt-2">
                        <div class="input-group input-group-sm" style="width: 300px;">
                            Short Desc : &nbsp;
                            <input type="text" name="table_search" class="form-control float-right" placeholder="Search">
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
                            <input type="text" name="table_search" class="form-control float-right" placeholder="Search">
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

        <!-- /.content -->
        <script>
            $.ajax({
                method: "GET",
                url: '/getMultiViewCatalogM?_dc=1666812249332&start=0&limit=25&action=getMultiView&page=1&sort=[{"property":"adr_d_items_id","direction":"ASC"}]&filter=[{"operator":"eq","value":"Service","property":"transaction_type","type":"string"}]',
                dataType: "json"
            }).done(function(result) {
                $("#material-table tbody").empty();
                $("#material-table2 tbody").empty();
                result.data.forEach(element => {
                    var rowMaterial2 = $('<tr class="d-flex tr-tab-2">');
                    rowMaterial2.append(
                        '<td class="col-1 text-center">' + element.addition_date + '</td></tr>'
                    )
                    rowMaterial2.append(
                        '<td class="col-1 text-center">' + element.sap_material_code + '</td></tr>'
                    )
                    rowMaterial2.append(
                        '<td class="col-1 text-center">' + element.sap_material_code_date + '</td></tr>'
                    )
                    rowMaterial2.append(
                        '<td class="col-1 text-center">' + element.sap_material_code_by + '</td></tr>'
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
                    rowMaterial.append('<td class="col-3 text-center">' + element.short_description + '</td>')
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
                            // var value = "3146"
                            //Characteristics
                            $("#tb-characteristic tbody").empty();
                            $.ajax({
                                method: "GET",
                                url: '/getCatalogM?_dc=1666710857918&filter=[{"operator":"eq","value":"' +
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
                                    url: '/getItemsIncCharacteristics?_dc=1666710857918&start=0&limit=300&inc_m_id=' +
                                        data.inc_m_id +
                                        '&adr_d_items_id=4&catalog_no=4&sort=[{"property":"sequence","direction":"ASC"}]&page=1',
                                    dataType: "json"
                                }).done(function(v) {
                                    
                                    if (v.data!=null && v.data.length > 0) {
                                        v.data.forEach(function(row) {
                                            var rowChar = $(
                                                '<tr class="tr-tab-2">');
                                            rowChar.append('<td>' + row.sequence +
                                                ' </td>');
                                            rowChar.append('<td>' + row
                                                .characteristics + ' </td>');
                                            rowChar.append(
                                                '<td><iclass="fas fa-info nav-icon text-danger"></i></td>'
                                            );
                                            rowChar.append('<td>' + row.nvalue +
                                                ' </td>');
                                            rowChar.append('<td>' + row.type +
                                                ' </td>');
                                            $("#tb-characteristic").append(rowChar);
                                        })
                                    }

                                })
                                //Cross Ref
                                $("#tb-crossref tbody").empty();
                                $.ajax({
                                    method: "GET",
                                    url: '/getItemsCrossReferences?_dc=1666710857918&start=0&limit=300&filter=[{"operator":"eq","value":'+value.split(" ")[0]+',"property":"adr_d_items_id","type":"numeric"}]&page=1',
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
                                    if (v.data !=null && v.data.length > 0) {
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
        </script>

    @endsection
