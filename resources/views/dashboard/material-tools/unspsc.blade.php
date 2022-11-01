<?php

use Illuminate\Support\Facades\Auth;
?>
@extends('master')

@section('title', 'Material & Tools | UNSPSC')
@section('content')
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid mt-3">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">Material & Tools UNSPSC</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item"><a href="#">Home</a></li>
                            <li class="breadcrumb-item">Material & Tools</li>
                            <li class="breadcrumb-item active">UNSPSC</li>
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
                                            <select class="js-example-basic-single js-example-basic-type form-control"
                                                id="select-status">
                                                <option value="">Select Status</option>
                                            </select>
                                        </div>
                                    </div>
                                    <label for="" class="col-sm-3">INC: </label>
                                    <div class="col-sm-9">
                                        <div class="input-group mb-2">
                                            <select class="js-example-basic-single js-example-basic-type form-control"
                                                id="select-inc">
                                                <option value="">Select INC</option>
                                            </select>
                                        </div>
                                    </div>
                                    <label for="" class="col-sm-3">MGC: </label>
                                    <div class="col-sm-9">
                                        <div class="input-group mb-2">
                                            <select class="js-example-basic-single js-example-basic-type form-control"
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
                    <div class="card p-4 mb-1 m-2" style="height: 427px;max-height: 427px;">
                        <h4>Result Inc</h4>
                        <hr>
                        <div class="row">
                            <button type="button" class="btn btn-primary">
                                Add Inc &nbsp; <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="row mt-1">
                            <table class="table table-striped" id="tb-characteristic">
                                <thead>
                                    <tr>
                                        <th>Inc</th>
                                        <th>Item Name</th>
                                        <th>Status</th>
                                        <th>Remove</th>
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
                                            id="current_page" data-dt-idx="1" tabindex="0">1</a></li>
                                    <li>Dari</li>
                                    <li class="ml-2" id="total_page">25</li>
                                    <li class="paginate_button next prev " id="example1_previous" data-page="prev"><a
                                            href="#"" aria-controls="example1" id="link_next" data-dt-idx="0"
                                            tabindex="0"><i class="fa fa-chevron-left"></i></a></li>
                                    <li class="paginate_button next prev" id="next-step" data-page="next"><a id="link_next"
                                            href="#" aria-controls="example1" data-dt-idx="2" tabindex="0"><i
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
                                    <input type="number" class="form-control" id="inc" placeholder="">
                                </div>
                            </div>
                            <label for="" class="col-sm-3">Name: </label>
                            <div class="col-sm-9">
                                <div class="input-group mb-2">
                                    <input type="number" class="form-control" id="inc" placeholder="">
                                </div>
                            </div>
                            <label for="" class="col-sm-3">Short: </label>
                            <div class="col-sm-9">
                                <div class="input-group mb-2">
                                    <input type="number" class="form-control" id="short" placeholder="">
                                </div>
                            </div>
                            <label for="" class="col-sm-3">Desc: </label>
                            <div class="col-sm-9">
                                <div class="input-group mb-2">
                                    <input type="number" class="form-control" id="desc" placeholder="">
                                </div>
                            </div>
                            <label for="" class="col-sm-3">MGC: </label>
                            <div class="col-sm-9">
                                <div class="input-group mb-2">
                                    <select class="js-example-basic-single js-example-basic-type form-control"
                                        id="select-mgc">
                                        <option value="">Select MGC</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer bg-white ml-auto mr-0 pr-0">
                            <button id="btn-reset" type="button" class="btn btn-primary">
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
                            src="https://awsimages.detik.net.id/community/media/visual/2020/10/15/toyota-new-kijang-innova.png?w=700&q=90"
                            alt="">
                        <div class="card-footer bg-white ml-auto mr-0 pr-0">
                            <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
                                <ul class="pagination">
                                    <li>Halaman</li>
                                    <li class="paginate_button active mr-2"><a href="#" aria-controls="example1"
                                            id="current_page" data-dt-idx="1" tabindex="0">1</a></li>
                                    <li>Dari</li>
                                    <li class="ml-2" id="total_page">25</li>
                                    <li class="paginate_button next prev " id="example1_previous" data-page="prev"><a
                                            href="#"" aria-controls="example1" id="link_next" data-dt-idx="0"
                                            tabindex="0"><i class="fa fa-chevron-left"></i></a></li>
                                    <li class="paginate_button next prev" id="next-step" data-page="next"><a
                                            id="link_next" href="#" aria-controls="example1" data-dt-idx="2"
                                            tabindex="0"><i class="fa fa-chevron-right"></i></a></li>
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
    @endsection
