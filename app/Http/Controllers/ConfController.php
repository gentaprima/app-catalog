<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\BaseController;
use App\Models\BaseModel AS Model;
use Illuminate\Support\Facades\Input;
use Illuminate\Pagination\LengthAwarePaginator;

class ConfController extends BaseController
{
    public function ConfLink(Request $request)
    {
        $filters = $request->get('filter');
        $linkId = $request->get('link_id');
        /*$fn = DB::select("SELECT fnview FROM conf_link WHERE link_id = '".$linkId."'");
        foreach ($fn as $value){
          $sql = "SELECT * FROM ".$linkId ;
        }*/
        $sql = "SELECT * FROM ".$linkId ;
        $result = Model::buildSql($sql);;
        return \Response::json($result,200);
    }

    public function index()
    {
//        $data = array('master_bank' => MasterBank::all());
//        return \Response::json($data,200);
    }
    protected function store(Request $request)
    {
        $input = $request->all();
        dd($input);
        /*$masterBank               = new MasterBank();
        $masterBank->description  = $input['description'];
        // $masterBank->status       = $data['status'];

        if (! $masterBank->save()){
            $message =  App::abort(500);
            $success = false ;
        }else{
            $message =  'Ok';
            $success = true ;
        }
        $data = array(
            'success' => $success  ,
            'message' => $message
        );
        return \Response::json($data,200);*/
    }
}
