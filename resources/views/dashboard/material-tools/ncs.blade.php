<?php

use Illuminate\Support\Facades\Auth;
?>

@extends('master')

@section('title', 'Material & Tools | NCS')
@section('content')
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid mt-3">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Material & Tools NCS</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item">Material & Tools</li>
                            <li class="breadcrumb-item active">NCS</li>
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

                <div class="col-lg-6">
                    <div class="card p-4 mb-1 m-2"
                        style="
                                 height: 427px;
                    max-height: 427px;">
                        <div class="row">
                            <h4>Search Filter</h4>
                            <hr>
                            <form action="">
                                <div class="form-group row">
                                    <label for="" class="col-sm-3">Status: </label>
                                    <div class="col-sm-9">
                                        <div class="input-group mb-2">
                                            <select class="js-example-basic-single js-example-basic-status form-control"
                                                id="select-status">
                                                <option value="">Select Status</option>
                                                <option value="Active">Active</option>
                                                <option value="Deactive">Deactive</option>
                                            </select>

                                        </div>
                                    </div>
                                    <label for="" class="col-sm-3">INC: </label>
                                    <div class="col-sm-9">
                                        <div class="input-group mb-2">
                                            <select class="js-example-basic-single js-example-basic-inc form-control"
                                                id="select-inc">
                                                <option value="">Select INC</option>
                                            </select>
                                        </div>
                                    </div>
                                    <label for="" class="col-sm-3">MGC: </label>
                                    <div class="col-sm-9">
                                        <div class="input-group mb-2">
                                            <select class="js-example-basic-single js-example-basic-mgc form-control"
                                                id="select-mgc">
                                                <option value="">Select MGC</option>
                                            </select>
                                        </div>
                                    </div>
                                    <label for="" class="col-sm-3">Name Code: </label>
                                    <div class="col-sm-9">
                                        <div class="input-group mb-2">
                                            <input type="text" class="form-control" id="name-code" placeholder="">
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                        <div class="card-footer bg-white ml-auto mr-0 pr-0">
                            <button id="btn-reset" type="button" class="btn btn-primary">
                                Reset &nbsp; <i class="fas fa-filter"></i>
                            </button>
                            <button type="button" id="btn-search" class="btn btn-primary mx-1">
                                Search &nbsp; <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="card p-4 mb-1 m-2">
                        <h4>Result Inc</h4>
                        <hr>
                        <div class="row">
                            <button class="btn btn-primary" data-toggle="modal" data-target="#add-inc">
                                Add Inc &nbsp; <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="row mt-1"style="height: 203px; overflow: auto">
                            <table class="table table-striped" id="tb-inc">
                                <thead>
                                    <tr>
                                        <th>Inc</th>
                                        <th>Item Name</th>
                                        <th>Status</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody style="height:137px">

                                </tbody>
                            </table>
                        </div>
                        <div class="card-footer bg-white ml-auto mr-0 pr-0">
                            <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                                <ul class="pagination">
                                    <li>Halaman</li>
                                    <li class="paginate_button active mr-2"><a href="#" aria-controls="example1"
                                            id="current_page_inc" data-dt-idx="1" tabindex="0">1</a></li>
                                    <li>Dari</li>
                                    <li class="ml-2" id="total_page_inc">25</li>
                                    <li class="paginate_button next next-inc prev " id="example1_previous" data-page="prev">
                                        <a aria-controls="example1" id="link_next" data-dt-idx="0" tabindex="0"><i
                                                class="fa fa-chevron-left"></i></a>
                                    </li>
                                    <li class="paginate_button next next-inc prev" id="next-step" data-page="next"><a
                                            id="link_next" aria-controls="example1" data-dt-idx="2" tabindex="0"><i
                                                class="fa fa-chevron-right"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card p-4 mb-1 m-2">
                        <h4>INC Detail</h4>
                        <hr>
                        <div class="form-group row">
                            <label for="" class="col-sm-3">INC: </label>
                            <div class="col-sm-9">
                                <div class="input-group mb-2">
                                    <input type="text" readonly class="form-control" id="inc-id-detail"
                                        placeholder="">
                                </div>
                            </div>
                            <label for="" class="col-sm-3">Name: </label>
                            <div class="col-sm-9">
                                <div class="input-group mb-2">
                                    <input type="text" readonly class="form-control" id="name_inc" placeholder="">
                                </div>
                            </div>
                            <label for="" class="col-sm-3">Short: </label>
                            <div class="col-sm-9">
                                <div class="input-group mb-2">
                                    <input type="text" class="form-control" id="short_inc" placeholder="">
                                    <div class="input-group-append">
                                        <button type="submit" id="save-short-desc" class="btn btn-default">
                                            <i class="fas fa-save"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <label for="" class="col-sm-3">Desc: </label>
                            <div class="col-sm-9">
                                <div class="input-group mb-2">
                                    <textarea type="text" readonly class="form-control" id="desc_inc" placeholder=""> </textarea>
                                </div>
                            </div>
                            <label for="" class="col-sm-3">MGC: </label>
                            <div class="col-sm-9">
                                <div class="input-group mb-2">
                                    <select multiple="multiple" class="js-example-basic-multiple js-example-basic-type"
                                        id="select-mgc-2">
                                        <option value="">Select MGC</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-white ml-auto mr-0 pr-0">
                            <button id="btn-save-inc" type="button" class="btn btn-primary">
                                Save &nbsp; <i class="fas fa-save"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="card p-4 mb-1 m-2" style="height: 427px;max-height: 427px;">
                        <h4>Image</h4>
                        <hr>
                        <div class="row">
                            <button type="button" class="float-left ml-2 btn btn-primary">
                                Add Image &nbsp; <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <img class="mt-1"
                            style="
                        width: 383px;
                        max-height: 383px;
                        object-fit: cover;
                        ;"
                            id="image-inc" alt="" src="">
                        <div class="card-footer bg-white ml-auto mr-0 pr-0">
                            <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                                <ul class="pagination">
                                    <li>Halaman</li>
                                    <li class="paginate_button active mr-2"><a aria-controls="example1"
                                            id="current_page_image" data-dt-idx="1" tabindex="0">1</a></li>
                                    <li>Dari</li>
                                    <li class="ml-2" id="total_page_image">25</li>
                                    <li class="paginate_button next next-image prev " id="example1_previous"
                                        data-page="prev"><a aria-controls="example1" id="link_next" data-dt-idx="0"
                                            tabindex="0"><i class="fa fa-chevron-left"></i></a></li>
                                    <li class="paginate_button next next-image prev" id="next-step" data-page="next"><a
                                            id="link_next" aria-controls="example1" data-dt-idx="2" tabindex="0"><i
                                                class="fa fa-chevron-right"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-lg-6">
                    <div class="card p-4 mb-1 m-2">
                        <h4>Inc Characteristic</h4>
                        <hr>
                        <div class="row">
                            <button type="button" class="float-left ml-2 btn btn-primary">
                                Add Characteristic &nbsp; <i class="fas fa-plus"></i>
                            </button>
                            <button type="button" class="float-left ml-2 btn btn-primary">
                                Remove All Checked &nbsp; <i class="fas fa-minus"></i>
                            </button>
                            <table class="table table-striped mt-1 mx-2" id="tb-characteristic">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Chek Remove</th>
                                        <th>Characteristic</th>
                                        <th>value</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card p-4 mb-1 m-2">
                        <h4>Colloquial Name</h4>
                        <hr>
                        <div class="row">
                            <button type="button" class="float-left ml-2 btn btn-primary">
                                Add CN &nbsp; <i class="fas fa-plus"></i>
                            </button>
                            <table class="table table-striped mt-1 mx-2" id="tb-characteristic">
                                <thead>
                                    <tr>
                                        <th>CN</th>
                                        <th>Colloquial Name</th>
                                        <th>Remove CN</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="modal fade" id="add-inc" role="dialog" aria-labelledby="add-inc" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="add-incLabel">Inc Detail</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Inc:</label>
                            <input type="text" class="form-control" id="inc-add">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Name Code:</label>
                            <input type="text" class="form-control" id="name-code-add">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Short Name:</label>
                            <input type="text" class="form-control" id="short-name-add">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Desc:</label>
                            <textarea name="desc-add" id="desc-add" cols="30" rows="5" class="form-control"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1">MGC:</label>
                            <select multiple="multiple" class="js-example-basic-multiple js-example-basic-type-add"
                                id="select-mgc-3">
                                <option value="">Select MGC</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" id="btn-save-inc-modal">Ok</button>
                    </div>
                </div>
            </div>
        </div>

        <script>
            var pageInc = 1;
            loadInc(0, 25, pageInc);
            $('.js-example-basic-single').select2({
                tags: false
            });

            var MGCMultipleselect2 =
                $(document).ready(function() {
                    MGCMultipleselect2 = $('.js-example-basic-multiple').select2({
                        multiple: true,
                    });
                    // MGCMultipleselect2Add = $('.js-example-basic-multiple-add').select2({
                    //     multiple: true,
                    // });
                });

            $('#test_id').val($("#test_id option:contains('Option 4')").val()).change();


            $('#select-inc').change(function() {
                $(".js-example-basic-mgc").empty();
                $(".js-example-basic-mgc").append('<option value="">Select Inc</option>');
                loadMgcByInc($(this).val(), 0, 25, 1);
            })
            $('#btn-search').click(function() {
                loadSearch(1, 0, 25);
            })

            $('#save-short-desc').click(function() {
                $.ajax({
                    method: "POST",
                    url: "/ChangeShortText",
                    data: {
                        inc: $('#inc-id-detail').val(),
                        short_name_code: $("#short_inc").val(),
                        _token: csrf_token,
                    }
                }).done(function(v) {
                    Toast.fire(
                        v.success ? 'Successfully' : "Failed",
                        v.message,
                        v.success ? "success" : "error"
                    )
                });
            });

            $('#btn-save-inc-modal').click(function() {
                var data = {
                    _token: csrf_token,
                    transaction_type: "Material",
                    "textfield-1075-inputEl": "",
                    inc: $('#inc-add').val(),
                    inc_name: $('#name-code-add').val(),
                    short_name_code: $('#short-name-add').val(),
                    description: $("#desc-add").val(),
                }
                var i = 0;
                MGCMultipleselect2.val().forEach(function(v) {
                    data["groupclass[" + i + "]"] = v;
                    console.log(v);
                    i++;
                })

                // $.ajax({
                //     method: "POST",
                //     url: "/SaveIncM",
                //     data: data
                // }).done(function(v) {
                //     Toast.fire(
                //         v.success,
                //         JSON.stringify(v.message),
                //         v.success ? "success" : "error"
                //     )
                //     $(this).attr("data-dismiss", "modal");
                // })

            })
            // {{-- select-status,select-inc,select-mgc,name-code --}}
            var transactionType = "";

            function loadSearch(page, start, limit) {
                page = page == 0 ? 1 : page;
                var filter = "";
                var selectStatus = $('#select-status');
                var selectInc = $('#select-inc')
                var selectMgc = $('#select-mgc')
                var nameCode = $('#name-code')
                if (selectStatus.val() != null && selectStatus.val() != "") {
                    filter += '{"operator":"eq","value":"' + selectStatus.val() + '","property":"is_active","type":"string"},';
                }

                if (selectInc.val() != null && selectInc.val() != "") {
                    filter += '{"operator":"eq","value":"' + selectInc.val() + '","property":"inc","type":"string"},';
                }

                if (selectMgc.val() != null && selectMgc.val() != "") {
                    filter += '{"operator":"eq","value":"' + selectMgc.val() + '","property":"groupclass","type":"string"},';
                }
                // if (selectMgc.val() != null && selectMgc.val() != "") {
                //     filter += '{"operator":"like","value":"' + nameCode.val() +
                //         '","property":"cross_references_name","type":"string"},';
                // }

                if (nameCode.val() != null && nameCode.val() != "") {
                    filter += '{"operator":"like","value":"' + nameCode.val() +
                        '","property":"inc_class_name","type":"string"},';
                }

                filter += '{"operator":"eq","value":"Material","property":"transaction_type","type":"string"}';
                loadResultInc(1, start, 25, filter);
                $('.next-inc').click(function() {
                    if ($(this).data("page") === "next") {
                        pageInc += 1;
                    }
                    if ($(this).data("page") === "prev") {
                        pageInc -= 1;
                    }

                    loadResultInc(pageInc, 0, 25, filter);

                });
            }

            function loadCharact(start, limit, property) {
                $.ajax({
                    method: "GET",
                    url: '/getIncCharacteristicsM?start=' + start + '&limit=' + limit +
                        '&page=1&sort=[{"property":"sequence","direction":"ASC"}]&filter=[{"operator":"eq","value":"' +
                        inc[1] + '","property":"' + property + '","type":"string"}]'
                }).done(function(v) {
                    console.log(v);
                })
            }

            $('#btn-save-inc').click(function() {
                // console.log(MGCMultipleselect2.val().toString());
                var data = {
                    _token: csrf_token,
                    transaction_type: transactionType,
                    inc: inc[1],
                    "detail_item_nameMNU26-inputEl": $("#name_inc").val(),
                    "detail_short_name_codeMNU26-inputEl": $('#short_inc').val(),
                    "mgc_list1MNU26-inputEl": MGCMultipleselect2.val().toString()
                };
                var i = 0;
                MGCMultipleselect2.val().forEach(function(v) {
                    data["groupclass[" + i + "]"] = v;
                    i++;
                })
                $.ajax({
                    method: "POST",
                    url: "/SaveMCG",
                    data: data,
                    success: function(msg) {
                        Toast.fire(
                            true,
                            JSON.stringify(msg),
                            "success"
                        )
                        console.log(msg);
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {

                        Toast.fire(
                            false,
                            XMLHttpRequest.responseText,
                            "error"
                        )
                        console.log(JSON.stringify(XMLHttpRequest.responseText));

                    },
                }).done(function(v) {
                    Toast.fire(
                        v.success,
                        v.message,
                        "error"
                    )
                });
            });

            function loadMgcByInc(inc, start, limit, page) {
                $.ajax({
                    method: "GET",
                    url: '/getMgcByInc?&filter=[{"operator":"eq","value":"' + inc +
                        '","property":"inc","type":"string"},{"operator":"eq","value":"Material","property":"transaction_type","type":"string"}]&page=' +
                        page + '&start=' + start + '&limit=' + limit + ''
                }).done(function(val) {
                    val.forEach(function(v) {
                        $(".js-example-basic-mgc").append('<option value="' + v.id + '">' + v.group_class_name +
                            '</option>');
                    })
                });
            }
            $('#select-mgc-2').change(function() {
                console.log($(this).text());
            })
            // function 
            // $('#js-example-basic-type').click(function() {
            loadMGCAll(0, 25, 1);
            // })

            function loadMGCAll(start, limit, page) {
                $.ajax({
                    method: "GET",
                    url: '/getGroupClassM?query=&filter=[{"operator":"eq","value":"Material","property":"transaction_type","type":"string"}]&page=' +
                        page + '&start=' + start + '&limit=' + limit,
                    data: {
                        _token: csrf_token
                    }
                }).done(function(v) {
                    v.data.forEach(function(vv) {
                        $('.js-example-basic-type').append('<option value="' + vv.groupclass + '">' + vv
                            .name +
                            '</option>');
                    })
                })

            }

            $('.delete-inc-data').click(function() {
                // deleteInc();
                console.log("OJK");
            })

            function deleteInc() {
                $('.delete-inc').each(function() {
                    console.log("test" + $(this).data('id'));
                })
                $.ajax({
                    url: '/DeleteInc',
                    method: 'POST',
                    data: {
                        _token: csrf_token,
                    }
                })
            }

            function loadImage(inc, page, start, limit) {
                $.ajax({
                    method: "GET",
                    url: '/getIncImages?start=' + start + '&limit=1&filter=[{"operator":"eq","value":"' + inc +
                        '","property":"inc","type":"string"}]&page=' + page
                }).done(function(v) {
                    oldImage = v.data[0].images;
                    if ($('#image-inc').attr("src") == "" || $('#image-inc').attr("src") == null) {
                        console.log("Awal" + v.data[0].images)
                        $('#image-inc').attr("src", "/inc_images/" + v.data[0].images);
                    } else {
                        console.log("pindah page" + v.data[0].images)
                        $('img[src="' + oldImage + '"]').attr("src", "/inc_images/" + v.data[0].images);
                    }
                })
            }

            function loadResultInc(page, start, limit, filter) {
                $.ajax({
                    method: "GET",
                    url: '/getIncMDataTools?start=' + start + '&limit=' + limit + '&filter=[' +
                        filter +
                        ']&action=getIncM&sort=[{"property":"inc","direction":"ASC"}]&grouper=[{"property":"inc","root":"data"}]&page=' +
                        page + '&group={"property":"inc","direction":"ASC"}'
                }).done(function(val) {
                    $("#tb-inc tbody").empty();
                    val.data.forEach(function(v) {
                        var row = $('<tr class="tr-tab-1" >');
                        row.append(
                            '<td class=""> ' + v.inc + '</td></tr>'
                        );
                        row.append(
                            '<td class=""> ' + v.inc_class_name + '</td></tr>'
                        );
                        row.append(
                            '<td class=""> ' + v.is_active + '</td></tr>'
                        );

                        row.append(
                            '<td class="delete-inc-data text-danger" data-id="' + v.inc +
                            '" > <i class="fas fa-trash"></i></td></tr>'
                        );
                        $("#tb-inc").append(row);
                    })
                    $('#current_page_inc').text(pageInc);
                    $('#total_page_inc').text(Math.ceil(val.total / 25))
                    $(".tr-tab-1").click(function(e) {
                        $(this).each(function() {
                            var value = $(this).text();
                            inc = value.split(" ");
                            namePick = value.split("-");
                            $.ajax({
                                url: '/getMgcByInc?start=0&limit=25&filter=[{"operator":"eq","value":"' +
                                    inc[1] +
                                    '","property":"inc","type":"string"}]&page=1&sort=[{"property":"inc","direction":"ASC"}]',
                                data: {
                                    _token: csrf_token
                                }
                            }).done(function(v) {
                                $.ajax({
                                    url: '/getIncColloquialName?&start=0&limit=25&page=1&filter=[{"operator":"eq","value":"' +
                                        inc[1] + '","property":"inc","type":"string"}]'
                                }).done(function(v) {
                                    $("#inc-id-detail").val(inc[1]);
                                    $("#name_inc").val(v.data[0].item_name);
                                    $("#short_inc").val(v.data[0].item_name);
                                    $("#desc_inc").val(v.data[0].description);
                                    $.ajax({
                                        method: "GET",
                                        url: '/getMgcByInc?start=0&limit=25&_token="' +
                                            csrf_token +
                                            '"&filter=[{"operator":"eq","value":"' +
                                            inc[1] +
                                            '","property":"inc","type":"string"}]&page=1&sort=[{"property":"inc","direction":"ASC"}]'
                                    }).done(function(val) {
                                        transactionType = val[0]
                                            .transaction_type;
                                        console.log(transactionType);
                                        val.forEach(function(v) {
                                            var option = new Option(v
                                                .name, v.id,
                                                true, true);
                                            MGCMultipleselect2.append(
                                                    option)
                                                .trigger('change');
                                        })

                                    });
                                })
                                loadCharact(0, 25, "inc");
                            })
                            loadImage(inc[1], 1, 0, 1);
                            var pageImage = 1;
                            $('.next-image').click(function() {
                                if ($(this).data("page") === "next") {
                                    pageImage += 1;
                                }
                                if ($(this).data("page") === "prev") {
                                    pageImage -= 1;
                                }

                                loadImage(inc[1], pageImage, pageImage - 1, 1);
                            });
                        });

                    });
                });
            }

            function loadInc(start, limit, page) {
                console.log('/getIncMgc?query=&filter=&limit=' +
                    limit + '&page=' + page + '&start=' + start + '&sort=[{"property":"inc","direction":"ASC"}]');
                $.ajax({
                    method: "GET",
                    url: '/getIncMgc?query=&filter=[{"operator":"eq","value":"Material","property":"transaction_type","type":"string"},{"operator":"like","value":"%","property":"class_inc_name","type":"string"}]&limit=' +
                        limit + '&page=' + page + '&start=' + start + '&sort=[{"property":"inc","direction":"ASC"}]',
                    dataType: "json"
                }).done(function(v) {
                    $(".js-example-basic-inc").empty();
                    $(".js-example-basic-inc").append('<option value="">Select Inc</option>');
                    v.forEach(function(val) {
                        $(".js-example-basic-inc").append('<option value="' + val.inc + '">' + val
                            .class_inc_name +
                            '</option>');
                    })
                })
            }

            $('#add-inc').click(function() {


            });
        </script>
    @endsection
