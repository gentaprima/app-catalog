<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\BaseModel;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use App\Http\Controllers\ConfController;

class DynamicController extends Controller
{
    public function index(Request $request)
    {
        $action = $request->get('Action');
        switch ($action) {
            case 'MainGridStore':
                $menu_id = $request->get('pageid');
                $fn = DB::select("SELECT link_id,fnview FROM conf_link WHERE menu_id = '".$menu_id."' AND link_id IN('MainGridM','MainGridD')");
                $result = array();
                for($i=0;$i<sizeof($fn);$i++)
                {
                    $result[$fn[$i]->link_id]= $fn[$i]->fnview;
                }

              return \Response::json(array($result),200);
            break;
            case 'GridStore':
                $sql = "SELECT * FROM ".$request->get('store'); ;
                $result = BaseModel::buildSql($sql);;
                return \Response::json($result,200);
//                $result= (new ConfController)->ConfLink($request);
//                dd($result);
//                    return $result;
//                $meteData = $this->buildMetaData($result);
//                return $result ;
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
