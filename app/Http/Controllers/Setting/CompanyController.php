<?php

namespace App\Http\Controllers\Setting;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\CompanyModel;
use App\Models\BaseModel;
use Illuminate\Support\Facades\DB;

class CompanyController extends Controller
{
    public function index(Request $request)
    {
        $action = $request->get('Action');
        switch ($action) {
            case 'GridStore':
                /*$coy= CompanyModel::All();
                $result = array();
                foreach ($coy as $key=>$fields) {
                    foreach($fields AS $row){
                        $result[] =  array(
                            'name' => $fields,
//                            'dataIndex' => $key,
                        );
                    }


                }*/
//                $data = array('getdept()' => CompanyModel::all());
//                $result = CompanyModel::orderBy('rowid')->get();
//                $company = new CompanyModel;
//                $company->from('menu')->where('id','=','MNU11')->get();
//                    dd($company);
//                    return $result;
//                $meteData = $this->buildMetaData($result);
//                return \Response::json($company,200);
//                return \App\Models\BaseModel::buildMetaData($result,10);
//                $table = BaseModel::getTableName('ref_hus');
//                dd($table);
//                $address = new BaseModel;
//                $address->setTable('menu');
//                $address->foo = 'bar';?
//                $address->save();
//                dd($address);
                $user = CompanyModel::from("getdep()");
//                var_dump($user);/
                /*foreach ($user as $key=>$value){
                    dd($value->builder);
                }*/

            break;
            default:
                # code...
                break;
        }

    }

    protected function store(Request $request)
    {
        $input = $request->all();
        $BaseModel               = new BaseModel();
        $BaseModel->setTable('mdepartements');
        $BaseModel->refhusid = $input['svRefHus'];
        $BaseModel->name_value = $input['svNama'];
        $BaseModel->delflag = 1;
        $BaseModel->created_at = strtotime($input['svDate']);
//        $d = new DateTime($input['svDate']);
//        dd(Carbon::Now('d-m-Y','')));
        DB::transaction(function() use ($BaseModel) {

//            $BaseModel->save();

            /*
             * insert new record for question category
             */
//            $questionCategory->question_id = $question->id;
//            $questionCategory->save();
        });
//        $BaseModel->name_value       = $input['svNama'];

        /*if (!$BaseModel->save()){
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

    public function update($id)
    {
        $input = Input::all();
        $MasterArea = MasterArea::find($id);
        $MasterArea->id  = $input['id'];
        $MasterArea->description = $input['description'];

        if (! $MasterArea->save()){
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
        return \Response::json($data,200);
    }

    public function destroy($id)
    {

        $id = MasterArea::where('id','=',$id)->first();
        if($id == null ){
            $message =  app::abort(404);
            $success = false ;
        }else{
            $message =  'Ok';
            $success = true ;
        }
        $id->delete();
        $data = array(
            'success' => $success  ,
            'message' => $message
        );
        return \Response::json($data,200);
    }
}
