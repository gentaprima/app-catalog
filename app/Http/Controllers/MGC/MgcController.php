<?php

namespace App\Http\Controllers\MGC;

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

class MgcController extends Controller
{
    public function getMgcByInc(){
        // $sql = "SELECT * FROM vw_mgcbyinc" ;
        // $result = BaseModel::buildSql($sql);;
        // return \Response::json($result,200);

        $sql = "SELECT * FROM vw_mgcbyinc" ;
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result['data'],200);
    }
}
