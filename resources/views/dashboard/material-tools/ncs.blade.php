<?php

use Illuminate\Support\Facades\Auth;
?>

@extends('master')

@section('title', 'NCS Data Tools')
@section('content')
    <style>
        .btn-circle.btn-xl {
            width: 70px;
            height: 70px;
            padding: 10px 16px;
            border-radius: 35px;
            font-size: 24px;
            line-height: 1.33;
        }

        .btn-circle {
            width: 25px;
            height: 25px;
            padding: 6px 0px;
            border-radius: 15px;
            text-align: center;
            line-height: 1.42857;
            background-color: #43b5d7;
            color: white;
            font-size: 9px;
        }
    </style>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid mt-3">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">NCS Data Tools</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item">Material & Service Tools </li>
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
                            <button class="btn btn-primary" data-title="Add Inc" data-toggle="modal" data-target="#add-inc">
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
                                        <th>Action</th>
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
                                        <a href="#" aria-controls="example1" id="link_next" data-dt-idx="0"
                                            tabindex="0"><i class="fa fa-chevron-left"></i></a>
                                    </li>
                                    <li class="paginate_button next next-inc prev" id="next-step" data-page="next"><a
                                            href="#" id="link_next" aria-controls="example1" data-dt-idx="2"
                                            tabindex="0"><i class="fa fa-chevron-right"></i></a></li>
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
                    <div class="card p-4 mb-1 m-2" style="height: 453px;max-height: 449px;">
                        <h4>Image</h4>
                        <hr>
                        <div class="row">
                            <button type="button" class="float-left ml-2 btn btn-primary" data-toggle="modal"
                                data-target="#add-image">
                                Add Image &nbsp; <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <img class="mt-1"
                            style="
                        max-height: 227px;
                        object-fit: scale-down;
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

                {{-- <div class="col-lg-6">
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
                                        <th>Check Remove</th>
                                        <th>Characteristic</th>
                                        <th>value</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>

                        </div>
                        <div class="card-footer bg-white ml-auto mr-0 pr-0">
                            <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                                <ul class="pagination">
                                    <li>Halaman</li>
                                    <li class="paginate_button active mr-2"><a href="#" aria-controls="example1"
                                            id="current_page_char" data-dt-idx="1" tabindex="0">1</a></li>
                                    <li>Dari</li>
                                    <li class="ml-2" id="total_page_char">25</li>
                                    <li class="paginate_button next next-char prev " id="example1_previous"
                                        data-page="prev">
                                        <a aria-controls="example1" id="link_next" data-dt-idx="0" tabindex="0"><i
                                                class="fa fa-chevron-left"></i></a>
                                    </li>
                                    <li class="paginate_button next next-char prev" id="next-step" data-page="next"><a
                                            id="link_next" aria-controls="example1" data-dt-idx="2" tabindex="0"><i
                                                class="fa fa-chevron-right"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> --}}


                <div class="col-lg-6">
                    <div class="card p-4 mb-1 m-2">
                        <h4>Inc Characteristic</h4>

                        <hr>
                        <div class="row">
                            <button class="btn btn-primary mr-2" data-toggle="modal" data-target="#add-inc">
                                Add Characteristic &nbsp; <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="row mt-1"style="max-height: 400px; overflow: auto">
                            <table class="table table-striped" id="tb-characteristic">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Check Remove</th>
                                        <th>Characteristic</th>
                                        <th>value</th>
                                        <th>Type</th>
                                        <th>Action</th>
                                    </tr>
                                <tbody style="height:137px">

                                </tbody>
                            </table>
                        </div>
                        <div class="card-footer bg-white ml-auto mr-0 pr-0">
                            <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                                <ul class="pagination">
                                    <li>Halaman</li>
                                    <li class="paginate_button active mr-2"><a href="#" aria-controls="example1"
                                            id="current_page_char" data-dt-idx="1" tabindex="0">1</a></li>
                                    <li>Dari</li>
                                    <li class="ml-2" id="total_page_char">25</li>
                                    <li class="paginate_button next next-char prev " id="example1_previous"
                                        data-page="prev">
                                        <a aria-controls="example1" id="link_next" data-dt-idx="0" tabindex="0"><i
                                                class="fa fa-chevron-left"></i></a>
                                    </li>
                                    <li class="paginate_button next next-char prev" id="next-step" data-page="next"><a
                                            id="link_next" aria-controls="example1" data-dt-idx="2" tabindex="0"><i
                                                class="fa fa-chevron-right"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {{-- <div class="col-lg-6">
                    <div class="card p-4 mb-1 m-2">
                        <h4>Colloquial Name</h4>
                        <hr>
                        <button type="button" class="float-left ml-2 btn btn-primary">
                            Add CN &nbsp; <i class="fas fa-plus"></i>
                        </button>
                        <div class="row mt-1"style="max-height: 400px; overflow: auto">
                            <table class="table table-striped mt-1 mx-2" id="tb-collo">
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
                        <div class="card-footer bg-white ml-auto mr-0 pr-0">
                            <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                                <ul class="pagination">
                                    <li>Halaman</li>
                                    <li class="paginate_button active mr-2"><a href="#" aria-controls="example1"
                                            id="current_page_collo" data-dt-idx="1" tabindex="0">1</a></li>
                                    <li>Dari</li>
                                    <li class="ml-2" id="total_page_collo">25</li>
                                    <li class="paginate_button next next-collo prev " id="example1_previous"
                                        data-page="prev">
                                        <a aria-controls="example1" id="link_next" data-dt-idx="0" tabindex="0"><i
                                                class="fa fa-chevron-left"></i></a>
                                    </li>
                                    <li class="paginate_button next next-collo prev" id="next-step" data-page="next"><a
                                            id="link_next" aria-controls="example1" data-dt-idx="2" tabindex="0"><i
                                                class="fa fa-chevron-right"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> --}}


                <div class="col-lg-6">
                    <div class="card p-4 mb-1 m-2">
                        <h4>Colloquial Name</h4>
                        <hr>
                        <div class="row">
                            <button class="btn btn-primary" data-toggle="modal" data-target="#add-cn">
                                Add CN &nbsp; <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="row mt-1"style="height: 203px; overflow: auto">
                            <table class="table table-striped" id="tb-collo">
                                <thead>
                                    <tr>
                                        <th>CN</th>
                                        <th>Colloquial Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                        <div class="card-footer bg-white ml-auto mr-0 pr-0">
                            <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                                <ul class="pagination">
                                    <li>Halaman</li>
                                    <li class="paginate_button active mr-2"><a href="#" aria-controls="example1"
                                            id="current_page_collo" data-dt-idx="1" tabindex="0">1</a></li>
                                    <li>Dari</li>
                                    <li class="ml-2" id="total_page_collo">25</li>
                                    <li class="paginate_button next next-collo prev " id="example1_previous"
                                        data-page="prev">
                                        <a aria-controls="example1" id="link_next" data-dt-idx="0" tabindex="0"><i
                                                class="fa fa-chevron-left"></i></a>
                                    </li>
                                    <li class="paginate_button next next-collo prev" id="next-step" data-page="next"><a
                                            id="link_next" aria-controls="example1" data-dt-idx="2" tabindex="0"><i
                                                class="fa fa-chevron-right"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <div class="modal fade" id="add-inc" role="dialog" aria-labelledby="add-inc" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="add-incLabel">Add Inc</h5>
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
                            <label for="exampleInputEmail1" id="title-short-name-add">Short Name:</label>
                            <input type="text" class="form-control" id="short-name-add">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1" id="title-desc-add">Desc:</label>
                            <textarea name="desc-add" id="desc-add" cols="30" rows="5" class="form-control"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="exampleInputEmail1" id="title-select-mgc-3">MGC:</label>
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

        <div class="modal fade" id="add-image" role="dialog" aria-labelledby="add-image" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="add-imageLabel">Add Image</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Description:</label>
                            <input type="text" class="form-control" id="description-in">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Image:</label>
                            <input type="file" accept="image/png, image/gif, image/jpeg" class="form-control"
                                id="image-in">
                        </div>



                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" id="btn-save-img-modal">Ok</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="value-char" role="dialog" aria-labelledby="value-char" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="value-charLabel">Value Characteristic</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        {{-- <div class="card p-4 mb-1 m-2"> --}}
                        {{-- <h4>Result Inc</h4>
                            <hr> --}}
                        {{-- <div class="row">
                                <button class="btn btn-primary" data-title="Add Inc" data-toggle="modal"
                                    data-target="#add-inc">
                                    Add Inc &nbsp; <i class="fas fa-plus"></i>
                                </button>
                            </div> --}}
                        <div class="row mt-1"style="height: 203px; overflow: auto">
                            <table class="table table-striped" id="tb-char-val">
                                <thead>
                                    <tr>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody style="height:137px">

                                </tbody>
                            </table>
                        </div>

                        {{-- </div> --}}

                        <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                            <ul class="pagination">
                                <li>Halaman</li>
                                <li class="paginate_button active mr-2"><a aria-controls="example1"
                                        id="current_page_char_value" data-dt-idx="1" tabindex="0">1</a></li>
                                <li>Dari</li>
                                <li class="ml-2" id="total_page_char_value">25</li>
                                <li class="paginate_button next next-char-value prev " id="example1_previous"
                                    data-page="prev">
                                    <a aria-controls="example1" id="link_next" data-dt-idx="0" tabindex="0"><i
                                            class="fa fa-chevron-left"></i></a>
                                </li>
                                <li class="paginate_button next next-char-value prev" id="next-step" data-page="next"><a
                                        id="link_next" aria-controls="example1" data-dt-idx="2" tabindex="0"><i
                                            class="fa fa-chevron-right"></i></a></li>
                            </ul>
                        </div>

                    </div>
                    <div class="modal-footer">

                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>



        <div class="modal fade" id="add-cn" role="dialog" aria-labelledby="add-cn" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="add-cnLabel">Add Colloquial Name</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleInputEmail1">CN :</label>
                            <input type="text" class="form-control" id="cn-id">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Colloquial Name:</label>
                            <input type="text" class="form-control" id="cn">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" id="btn-save-cn-modal">Ok</button>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" id="edit-cn" role="dialog" aria-labelledby="edit-cn" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="edit-cnLabel">Add Colloquial Name</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleInputEmail1">CN :</label>
                            <input type="text" class="form-control" id="cn-id-edit">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Colloquial Name:</label>
                            <input type="text" class="form-control" id="cn-name-edit">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" id="btn-edit-cn-modal">Ok</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="edit-inc" role="dialog" aria-labelledby="edit-inc" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="edit-incLabel">Edit Inc</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="exampleInputEmail1">INC</label>
                            <input type="text" class="form-control" id="incid-edit-inc">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Item Name</label>
                            <input type="text" class="form-control" id="name-edit-inc">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Item Name</label>
                            <select name="" class="form-control" id="status-edit-inc" name="status-edit-inc">
                                <option value="Active">Active</option>
                                <option value="Deactive">Deactive</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" id="btn-edit-inc-modal">Ok</button>
                    </div>
                </div>
            </div>
        </div>


        <script>
            var pageInc = 1;
            var totalPageImage = 0
            var totalPageChar = 0;
            var totalPageCollo = 0;
            var pageChar = 1;
            var pageImage = 1;
            var pageCollo = 1;
            var filter = "";
            var pageValChar = 1;
            var totalPageVal = 0;

            $("#btn-reset").click(function() {
                $("#tb-inc tbody").empty();
                $("#tb-characteristic tbody").empty();
                $("#tb-collo tbody").empty();
                pageInc = 0;
                totalPageImage = 0;
                totalPageChar = 0;
                totalPageCollo = 0;
                pageChar = 1;
                pageImage = 1;
                pageCollo = 1;
                filter = "";
                pageValChar = 1;
                totalPageVal = 0;
                $('#total_page_inc').text(1)
                $('#total_page_char').text(1)
                $('#total_page_collo').text(1)
                $('#total_page_image').text(1)
                $('#total_page_inc').text(1)

                $(':input').val('');
                $('#select-mgc-2').val(null).trigger('change');
                $('#select-inc').val(null).trigger('change');
                $('#select-mgc').val(null).trigger('change');
                $("#select-status").val(null).trigger('change');

            });

            function loadvalueChar(start = 0, limit = 25, page, id, value) {
                $.ajax({
                    url: "/getIncCharacteristicsValue",
                    method: "GET",
                    data: {
                        start: start,
                        limit: limit,
                        filter: '[{"operator":"eq","value":"' + id +
                            '","property":"inc","type":"string"},{"operator":"eq","value":"' + value +
                            '","property":"characteristics","type":"string"},{"operator":"eq","value":"ABPM","property":"mrcode","type":"string"}]',
                        action: 'getIncCharacteristicsValue',
                        page: page
                    }
                }).done(function(v) {
                    $("#tb-char-val tbody").empty();
                    chartIndex = 1;
                    v.data.forEach(function(v) {
                        var row = $('<tr class="tr-tab-1" >');
                        row.append(
                            '<td class=""> ' + v.nvalue + '</td></tr>'
                        );
                        $("#tb-char-val").append(row);
                    })
                    totalPageVal = Math.ceil(v.total / 25);
                    $('#total_page_char_value').text(totalPageVal)
                })
            }
            $('#value-char').on('show.bs.modal', function(event) {
                pageValChar = 1;
                $('#current_page_char_value').text(pageValChar);

                var button = $(event.relatedTarget);
                loadvalueChar(0, 25, 1, button.data('inc'), button.data("char"));
                $('.next-char-value').unbind('click')
                $('.next-char-value').click(function() {
                    if ($(this).data("page") === "next" && pageValChar <= totalPageVal) {
                        pageValChar += 1;
                    }
                    if ($(this).data("page") === "prev") {
                        pageValChar -= 1;
                    }
                    $('#current_page_char_value').text(pageValChar);
                    loadvalueChar(0, 25, pageValChar, button.data('inc'), button.data("char"));
                });
            });
            $('#edit-cn').on('show.bs.modal', function(event) {
                var button = $(event.relatedTarget);
                $('#cn-id-edit').val(button.data("cn"))
                $('#cn-name-edit').val(button.data("name"))
                $('#btn-edit-cn-modal').unbind('click')
                $('#btn-edit-cn-modal').click(function() {
                    $.ajax({
                        url: "/SaveIncColloquialName",
                        method: "POST",
                        data: {
                            _token: csrf_token,
                            data_items: '[{"id":6908,"inc":"' + $('#inc-id-detail').val() + '","cn":"' +
                                $('#cn-id-edit').val() + '","xref_inc":null,"colloquial_name":"' + $(
                                    '#cn-name-edit').val() +
                                '","language":null,"groupclass":"' + button.data("groupclass") +
                                '","item_name":"' + $('#name_inc')
                                .val() + '","short_name_code":"' + $('#short_inc').val() +
                                '","description":null,"inc_reff":"' + button.data("reff") +
                                '","is_active":"' + button.data("isactive") +
                                '","transaction_type":"Material"}]'
                        }
                    }).done(function(v) {
                        loadCollo(pageCollo)
                        Toast.fire(
                            v.success ? 'Successfully' : "Failed",
                            v.message,
                            v.success ? "success" : "error"
                        )
                    })
                })
            });
            $('#edit-inc').on('show.bs.modal', function(event) {
                var button = $(event.relatedTarget);
                $('#incid-edit-inc').val(button.data("id"))
                $('#name-edit-inc').val(button.data("name"))
                $("#status-edit-inc > [value=" + button.data("status") + "]").attr("selected", "true");
                $('#btn-edit-inc-modal').unbind("click")
                $('#btn-edit-inc-modal').click(function() {
                    $.ajax({
                        method: "POST",
                        url: "/SaveIncItem",
                        data: {
                            _token: csrf_token,
                            data_items: '[{"inc_class_name":"' + button.data('class') +
                                '","id":' + button.data('idinc') + ',"inc":"' + $('#incid-edit-inc')
                                .val() +
                                '","item_name":"' + $('#name-edit-inc').val() +
                                '","short_name_code":"' +
                                button.data("short") +
                                '","description":null,"transaction_type":"Material","is_active":"' + $(
                                    '#status-edit-inc').val() + '","groupclass":"' + button.data(
                                    "groupclass") + '"}]'
                        }

                    }).done(function(v) {
                        loadResultInc(1, 0, 25, filter);
                        Toast.fire(
                            v.success ? 'Successfully' : "Failed",
                            v.message,
                            v.success ? "success" : "error"
                        )
                    })
                })
            });

            function changeImage(input) {
                var reader;

                if (input.files && input.files[0]) {
                    reader = new FileReader();

                    reader.onload = function(e) {
                        path.innerHTML = input.value;
                    }

                    reader.readAsDataURL(input.files[0]);
                }
            }

            // $('#image-in').change(function(v)    {
            //     changeImage(this);
            // })

            loadInc(0, 25, pageInc);
            $('.js-example-basic-single').select2({
                tags: false
            });
            $("#btn-save-img-modal").click(function() {
                var xhr;
                var fd = new FormData();
                fd.append('images_path', $('#image-in')[0].files[0]);
                fd.append('_token', csrf_token);
                fd.append('inc', $("#inc-id-detail").val());
                fd.append('description', $('#description-in').val());
                xhr = new XMLHttpRequest();
                xhr.open('POST', '/SaveIncImages', true);
                xhr.onreadystatechange = function(response) {};
                xhr.send(fd);
                xhr.onload = function() {
                    loadImage(inc[1], 1, 1, 1)
                    var jsonResponse = JSON.parse(xhr.responseText);
                    Toast.fire(
                        jsonResponse.success ? 'Successfully' : "Failed",
                        jsonResponse.message,
                        jsonResponse.success ? "success" : "error"
                    )
                    // do something with jsonResponse
                };
            })

            $('#btn-save-cn-modal').click(function() {
                $.ajax({
                    method: "POST",
                    url: "/SaveIncColloquialName",
                    data: {
                        _token: csrf_token,
                        data_items: '[{"id":"insert_cn","inc":"' + $('#inc-id-detail').val() + '","cn":"' + $(
                            '#cn-id').val() + '","colloquial_name":"' + $('#cn').val() + '"}]'
                    }
                }).done(function(v) {
                    loadCollo(pageCollo)
                    Toast.fire(
                        v.success ? 'Successfully' : "Failed",
                        v.message,
                        v.success ? "success" : "error"
                    )
                })
            })


            $('#select-mgc-3').select2({
                multiple: true,
            });

            var MGCMultipleselect2 =
                $(document).ready(function() {
                    MGCMultipleselect2 = $('#select-mgc-2').select2({
                        multiple: true,
                    });
                });

            $('#test_id').val($("#test_id option:contains('Option 4')").val()).change();


            $('#select-inc').change(function() {
                $(".js-example-basic-mgc").empty();
                $(".js-example-basic-mgc").append('<option value="">Select Inc</option>');
                loadMgcByInc($(this).val(), 0, 25, 1);
            })
            $('#btn-search').click(function() {
                loadSearch(1, 0, 25);
                pageInc = 1;
                $('#current_page_inc').text(pageInc);
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
                $('#select-mgc-3').val().forEach(function(v) {
                    data["groupclass[" + i + "]"] = v;
                    console.log(v);
                    i++;
                })

                $.ajax({
                    method: "POST",
                    url: "/SaveIncM",
                    data: data
                }).done(function(v) {
                    Toast.fire(
                        v.success,
                        JSON.stringify(v.message),
                        v.success ? "success" : "error"
                    )
                    loadResultInc(1, 0, 25, filter);
                    $(this).attr("data-dismiss", "modal");
                })

            })
            // {{-- select-status,select-inc,select-mgc,name-code --}}
            var transactionType = "";

            function loadSearch(page, start, limit) {
                page = page == 0 ? 1 : page;

                var selectStatus = $('#select-status');
                var selectInc = $('#select-inc')
                var selectMgc = $('#select-mgc')
                var nameCode = $('#name-code')
                filter = "";
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
                $('.next-inc').unbind("click");
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


            function loadCharact(start, limit, page, property) {
                $.ajax({
                    method: "GET",
                    url: '/getIncCharacteristicsM?start=' + start + '&limit=' + limit +
                        '&page=' + page +
                        '&sort=[{"property":"sequence","direction":"ASC"}]&filter=[{"operator":"eq","value":"' +
                        inc[1] + '","property":"' + property + '","type":"string"}]'
                }).done(function(v) {
                    totalPageChar = Math.ceil(v.total / 25);
                    $("#total_page_char").text(totalPageChar)
                    $("#tb-characteristic tbody").empty();
                    chartIndex = 1;
                    $('#current_page_char').text(pageChar);
                    v.data.forEach(function(v) {
                        var row = $('<tr class="tr-tab-1" >');
                        row.append(
                            '<td class=""> ' + (chartIndex) + '</td></tr>'
                        );
                        row.append(
                            '<td class=""> ' + v.chekdel + '</td></tr>'
                        );
                        row.append(
                            '<td class=""> ' + v.characteristics + '</td></tr>'
                        );
                        row.append(
                            '<td class=""><button data-inc="' + $('#inc-id-detail').val() +
                            '" data-char="' + v.characteristics +
                            '"  type="button" data-toggle="modal" data-target="#value-char" class="btn btn-default btn-circle"><i class="fa fa-info"></i></td></tr>'
                        );
                        row.append(
                            '<td class="">' + v.type + '</td></tr>'
                        );
                        row.append(
                            '<td class="delete-in-char text-danger"><button data-id="' + v.id +
                            '" type="button" id="delete-char" class="btn btn-default delete-char"><i style="color:red" class="fa fa-trash"></i></button> <button class="btn btn-default" id="edit-char" ><i style="color:green" class="fa fa-edit"></i></button></td>'
                        );
                        $("#tb-characteristic").append(row);
                        chartIndex++;
                    })
                    $('.delete-char').click(function() {
                        $.ajax({
                            url: "/DeleteIncCharacteristics",
                            method: "POST",
                            data: {
                                _token: csrf_token,
                                id: $(this).data('id')
                            }
                        }).done(function(v) {
                            loadCharact(0, 25, 1, "inc");
                            Toast.fire(
                                v.success,
                                v.message,
                                v.success ? "success" : "error"
                            )
                        })
                    });
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
                        $('#select-mgc-3').append('<option value="' + vv.groupclass + '">' + vv
                            .name +
                            '</option>');
                    })
                })

            }

            function loadCollo(page = 1) {
                console.log('page colo ' + page)
                $.ajax({
                    url: '/getIncColloquialName?&start=0&limit=25&page=' + page +
                        '&filter=[{"operator":"eq","value":"' +
                        inc[1] + '","property":"inc","type":"string"}]'
                }).done(function(v) {
                    chartIndex = 1;
                    totalPageCollo = Math.ceil(v.total / 25);
                    $('#total_page_collo').text(totalPageCollo)
                    $("#tb-collo tbody").empty();
                    v.data.forEach(function(v) {
                        var row = $('<tr class="tr-tab-1" >');
                        row.append(
                            '<td class=""> ' + v.cn +
                            '</td></tr>'
                        );
                        row.append(
                            '<td class=""> ' + v
                            .colloquial_name +
                            '</td></tr>'
                        );

                        row.append(
                            '<td class="delete-in-collo text-danger"><button data-id="' + v.cn +
                            '" type="button" id="delete-collo" class="btn btn-default delete-collo"><i style="color:red" class="fa fa-trash"></i></button><button class="btn btn-default" id="edit-collo" data-toggle="modal" data-target="#edit-cn" data-groupclass="' +
                            v.groupclass + '" data-reff="' + v.inc_reff + '" data-isactive="' + v
                            .is_active + '" data-cn="' + v.cn + '" data-name="' + v.colloquial_name +
                            '" ><i style="color:green" class="fa fa-edit"></i></button></td>'
                        );

                        $("#tb-collo").append(row);
                        $('.delete-collo').click(function() {
                            $.ajax({
                                method: "POST",
                                url: "/DeleteIncColloquialName",
                                data: {
                                    _token: csrf_token,
                                    cn: $(this).data('id')
                                }
                            }).done(function(v) {
                                loadCollo(pageCollo);
                                Toast.fire(
                                    v.success,
                                    v.message,
                                    v.success ? "success" : "error"
                                )
                            })
                        })
                        chartIndex++;
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
                    // oldImage = v.data[0].images;
                    console.log("load Image")
                    console.log(v.data[0]);
                    $('#image-inc').attr("src", "/inc_images/" + v.data[0].images);
                    totalPageImage = v.total
                    $('#total_page_image').text(totalPageImage)
                    // if ($('#image-inc').attr("src") == "" || $('#image-inc').attr("src") == null) {
                    //     console.log("Awal" + v.data[0].images)
                    // } else {
                    //     console.log("pindah page" + v.data[0].images)
                    //     $('img[src="' + oldImage + '"]').attr("src", "/inc_images/" + v.data[0].images);
                    // }

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
                            '<td class=""> ' + v.item_name + '</td></tr>'
                        );
                        row.append(
                            '<td class=""> ' + v.is_active + '</td></tr>'
                        );

                        row.append(
                            '<td class="delete-in-result-inc text-danger"><button data-id="' + v.inc +
                            '" type="button" id="delete-result-inc" class="btn btn-default delete-result-inc"><i style="color:red" class="fa fa-trash"></i></button> <button data-toggle="modal" data-target="#edit-inc" data-id="' +
                            v.inc +
                            '" type="button" id="edit-result-inc" data-title="Edit Inc" data-groupclass="' +
                            v.groupclass + '"  data-idinc="' + v.id + '" data-short="' + v.short_name_code +
                            '" data-class="' + v.inc_class_name + '" data-id="' + v.inc +
                            '" data-name="' + v.item_name + '" data-status="' + v.is_active +
                            '" class="btn btn-default edit-result-inc"><i style="color:green" class="fa fa-edit"></i></td></button>'
                        );
                        $("#tb-inc").append(row);
                    })

                    $('.delete-result-inc').click(function() {
                        $.ajax({
                            method: "POST",
                            url: "/DeleteInc",
                            data: {
                                _token: csrf_token,
                                inc: $(this).data('id')
                            }
                        }).done(function(v) {
                            loadResultInc(1, 0, 25, filter);
                            Toast.fire(
                                v.success,
                                v.message,
                                v.success ? "success" : "error"
                            )
                        })
                    })

                    $('#current_page_inc').text(pageInc);
                    $('#total_page_inc').text(Math.ceil(val.total / 25))
                    $(".tr-tab-1").click(function(e) {
                        totalPageImage = 0
                        totalPageChar = 0;
                        totalPageCollo = 0;
                        pageChar = 1;
                        pageImage = 1;
                        pageCollo = 1;

                        $('#current_page_collo').text(pageCollo)
                        $('#current_page_image').text(pageImage)
                        $('#current_page_char').text(pageChar);
                        MGCMultipleselect2.empty()

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
                                    chartIndex = 1;
                                    $("#tb-collo tbody").empty();
                                    $("#inc-id-detail").val(inc[1]);
                                    $("#name_inc").val(v.data[0].item_name);
                                    $("#short_inc").val(v.data[0].item_name);
                                    $("#desc_inc").val(v.data[0].description);
                                    loadImage(inc[1], 1, 1, 1)
                                    $.ajax({
                                        method: "GET",
                                        url: '/getMgcByInc?start=0&limit=25&_token="' +
                                            csrf_token +
                                            '"&filter=[{"operator":"eq","value":"' +
                                            inc[1] +
                                            '","property":"inc","type":"string"}]&page=1&sort=[{"property":"inc","direction":"ASC"}]'
                                    }).done(function(val) {
                                        console.log(val);
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
                                    loadCharact(0, 25, 1, "inc");



                                })
                                var lastPageChar = 1;
                                $(".next-char").unbind('click');

                                $('.next-char').click(function() {
                                    lastPageChar =
                                        totalPageChar;
                                    if (pageChar <
                                        lastPageChar && $(
                                            this).data(
                                            "page") ===
                                        "next") {
                                        pageChar += 1;
                                        console.log("next");
                                    }
                                    if (pageChar != 1 && $(
                                            this).data(
                                            "page") ===
                                        "prev") {
                                        pageChar -= 1;
                                        console.log("prev");
                                    }

                                    $('#current_page_char')
                                        .text(pageChar);
                                    loadCharact(0, 25,
                                        pageChar,
                                        "inc");

                                });
                                loadCollo();
                                var lastPageCollo = 1;
                                var pageCollo = 1;
                                $('.next-collo').unbind("click")
                                $('.next-collo').click(function() {
                                    lastPageCollo =
                                        totalPageCollo;
                                    if (pageCollo <
                                        lastPageCollo && $(
                                            this).data(
                                            "page") ===
                                        "next") {
                                        pageCollo += 1;
                                        console.log("next");
                                    }
                                    if (pageCollo != 1 && $(
                                            this).data(
                                            "page") ===
                                        "prev") {
                                        pageCollo -= 1;
                                        console.log("prev");
                                    }
                                    $('#current_page_collo')
                                        .text(pageCollo);
                                    loadCollo(pageCollo);

                                });
                            })
                            loadImage(inc[1], 1, 0, 1);
                            $('.next-image').unbind("click")
                            $('.next-image').click(function() {
                                totalPageImage = totalPageImage / 1;
                                if (pageImage < totalPageImage && $(this).data("page") ===
                                    "next") {
                                    pageImage += 1;
                                }
                                if (pageImage != 1 && $(this).data("page") ===
                                    "prev") {
                                    pageImage -= 1;
                                }
                                $('#current_page_image').text(pageImage);
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
