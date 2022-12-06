<?php

namespace App\Http\Controllers\Setting;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\UsersGroupModel;

class SettingUsersGroupController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $result = UsersGroupModel::all();

        if (!$result) {
            $message =  App::abort(500);
            $success = false;
        } else {
            $message =  'Ok';
            $success = true;
        }
        $data = array(
            'data' => $result,
            'success' => $success,
            'message' => $message
        );
        return \Response::json($data, 200);
    }

    public function getUsersGroup()
    {
        $sql = "SELECT * FROM users_group";
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result['data'], 200);
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
        DB::transaction(function () use ($BaseModel) {

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

        if (!$MasterArea->save()) {
            $message =  App::abort(500);
            $success = false;
        } else {
            $message =  'Ok';
            $success = true;
        }
        $data = array(
            'success' => $success,
            'message' => $message
        );
        return \Response::json($data, 200);
    }

    public function destroy($id)
    {

        $id = MasterArea::where('id', '=', $id)->first();
        if ($id == null) {
            $message =  app::abort(404);
            $success = false;
        } else {
            $message =  'Ok';
            $success = true;
        }
        $id->delete();
        $data = array(
            'success' => $success,
            'message' => $message
        );
        return \Response::json($data, 200);
    }
}
