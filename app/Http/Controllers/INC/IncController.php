<?php

namespace App\Http\Controllers\INC;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Input;
use Response;

use Validator;
//use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Models\vwGetInc as vwGetInc;
use App\Models\BaseModel;
//use App\MasterArea as MasterArea;

class IncController extends Controller
{
    public function getIncMgc(){
        // $sql = "SELECT * FROM vw_getincbymgc" ;
        // $result = BaseModel::buildSql($sql);;
        // return \Response::json($result,200);
        $sql = "SELECT * FROM vw_getincbymgc" ;
        $result = BaseModel::buildSql($sql);
        return \Response::json($result['data'],200);
        /*$dataInc = vwGetInc::select(DB::raw("*"))
                            ->offset(0)
                            ->limit(25)
                            ->get();
        return \Response::json(array('data'=>$dataInc),200);*/
    }

    public function getIncImages(){
        $sql = "SELECT * FROM inc_images" ;
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result,200);
        /*$dataInc = vwGetInc::select(DB::raw("*"))
                            ->offset(0)
                            ->limit(25)
                            ->get();
        return \Response::json(array('data'=>$dataInc),200);*/
    }
}
