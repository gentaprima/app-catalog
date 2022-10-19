<?php

namespace App\Http\Controllers\Setting;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\BaseModel;
use App\Models\CompaniesM;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Response;

class CompaniesMController extends Controller
{
	public function getCompaniesM(Request $request){
        $sql = "SELECT * FROM vw_companies_m" ;
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result,200);
    }

 	public  function SaveCompaniesM(Request $request){
        DB::beginTransaction();
        try {
            $input = Input::all();
            $data_items = json_decode(stripslashes($input['data_items']));
            
            $i = 1;
            foreach ($data_items as $row) {
                $UpdateCompaniesM = CompaniesM::find($row->id);
                if(count($UpdateCompaniesM) > 0 ){
                    $UpdateCompaniesM->name = $row->name ;
                    $UpdateCompaniesM->save();
                }else{
                    $InsertCompaniesM = new CompaniesM();
                    $InsertCompaniesM->code = $row->code ;
                    $InsertCompaniesM->name = $row->name ;
                    $InsertCompaniesM->save();
                }
            }
            $message =  'Process Succes';
            $success = true ;
            DB::commit();
        } catch (\Illuminate\Database\QueryException $e) {
            // something went wrong with the transaction, rollback
            $message =  $e->getMessage();
            $success = false ;
            DB::rollback();
        } catch (\Exception $e) {
            // something went wrong elsewhere, handle gracefully
            $message =  $e->getMessage();
            $success = false ;
            DB::rollback();
        }
        $data = array(
            'success' => $success  ,
            'message' => $message
        );
        return \Response::json($data,200);
        
    }
    public  function RemoveCompaniesM(Request $request){
        DB::beginTransaction();
        try {
            $input = Input::all();
            $id = CompaniesM::where('id','=',$input['id'])->first();
            if($id == null ){
                $message =  app::abort(404);
                $success = false ;
            }else{
                $message =  'Process Succes';
                $success = true ;
            }
            $id->delete();
            DB::commit();
        } catch (\Illuminate\Database\QueryException $e) {
            // something went wrong with the transaction, rollback
            $message =  $e->getMessage();
            $success = false ;
            DB::rollback();
        } catch (\Exception $e) {
            // something went wrong elsewhere, handle gracefully
            $message =  $e->getMessage();
            $success = false ;
            DB::rollback();
        }
        $data = array(
            'success' => $success  ,
            'message' => $message
        );
        return \Response::json($data,200);
    }
}
