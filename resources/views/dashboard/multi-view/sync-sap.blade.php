@extends('master')

@section('title', 'Multiple View | Sync SAP Code')
@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid mt-3">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Sync SAP Code</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item">Multiple View</li>
                            <li class="breadcrumb-item active">Sync SAP Code</li>
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
                <h3 class="card-title"">
                    <button type="button" class="btn btn-primary mr-1" data-toggle="modal" data-target="#modal-batch"">
                        Add Batch &nbsp; <i class="fas fa-file-export"></i>
                    </button>
                </h3>
                <div class="row">
                    <div class="col-sm-6">
                        <!-- <button class="btn btn-outline-primary"><i class="fa fa-plus"></i> Addition</button> -->
                    </div>
                </div>
                <table id="tableData" class="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th>TRX</th>
                            <th>Batch Files</th>
                            <th>Created At</th>
                            <th>Created By</th>

                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
                <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                    <ul class="pagination">
                        <li>Halaman</li>
                        <li class="paginate_button active mr-2"><a href="#" aria-controls="example1" id="current_page"
                                data-dt-idx="1" tabindex="0">1</a></li>
                        <li>Dari</li>
                        <li class="ml-2" id="total_page">1</li>
                        <li class="paginate_button next prev" data-type="prev" id="example1_previous"><a href="#"
                                aria-controls="example1" id="link_prev" data-dt-idx="0" tabindex="0"><i
                                    class="fa fa-chevron-left"></i></a></li>
                        <li class="paginate_button next prev" data-type="next" id="example1_next"><a id="link_next"
                                href="#" aria-controls="example1" data-dt-idx="2" tabindex="0"><i
                                    class="fa fa-chevron-right"></i></a></li>
                    </ul>
                </div>
            </div>

        </section>

        <div class="modal fade" id="modal-batch" role="dialog" aria-labelledby="modal-batchLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-center w-100" id="modal-batchLabel">Sure to create batch file data ?
                        </h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-center">
                        <i class="fas fa-exclamation text-warning" style="font-size: 50px"></i>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                        <button id="btn-save" type="button" class="btn btn-primary">Yes</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- /.content -->
        <script>
            $(document).ready(function() {
                $("#main-menu-MNU33").addClass("nav-item menu-is-opening menu-open")
                $("#subchild-MNU45").addClass("nav-link active")
            });
            $('#tableData tbody').empty();
            var totalData = 0;
            loadData(1, 0, 25);
            var page = 1;
            $('#btn-save').click(function() {
                $.ajax({
                    method: "GET",
                    url: "/SyncBatchFiles?_dc=1666889013120",
                    data: {
                        _token: csrf_token,
                    }
                }).done(function(v) {
                    Toast.fire(
                        v.success ? 'Successfully' : "Failed",
                        v.message,
                        v.success ? "success" : "error"                        
                    )
                    $('#modal-batch').modal('hide')
                })
            })
            $('.next').click(function() {
                var type = $(this).data("type");
                if (type === "next") {
                    page++;
                }
                if (type === "prev") {
                    page--;
                }
                loadData(page, 0, 25);
                $("#current_page").val(page);

            })

            function loadData(page, start, limit) {
                $.ajax({
                    method: "GET",
                    url: "/getSyncM?page=" + page + "&start=" + start + "&limit=" + limit
                }).done(function(v) {
                    i = 1;
                    totalData = v.total;
                    $('#total_page').html(Math.ceil(totalData / 25));
                    v.data.forEach(function(val) {
                        var row = $('<tr class="tr-tab-2">');
                        row.append(
                            '<td class="text-center">' + val.id + '</td></tr>'
                        )
                        row.append(
                            '<td class="text-center">' + val.batch_files + '</td></tr>'
                        )
                        row.append(
                            '<td class="text-center">' + val.created_at + '</td></tr>'
                        )
                        row.append(
                            '<td class="text-center">' + val.real_name + '</td></tr>'
                        )

                        $("#tableData").append(row);
                        i++;
                    });
                });
            }
        </script>
    @endsection
