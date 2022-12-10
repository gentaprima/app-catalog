<?php

namespace App\Http\Controllers\Setting;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Models\BaseModel;
use Auth;
use DB;
use Session;
use Excel;
use File;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Hash;
use Response;

class SettingUsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $result = User::all();

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

    public function getManageUsers(Request $request)
    {
        $sql = "SELECT * FROM vw_users";
        $result = BaseModel::buildSqlValuationClass($sql);;
        return \Response::json($result, 200);
    }

    public  function SaveUser(Request $request)
    {
        DB::beginTransaction();
        try {
            $input = Input::all();
            // dd($input);
            $data_items = json_decode(stripslashes($input['data_items']));

            $i = 1;
            foreach ($data_items as $row) {
                $UpdateUsers = User::find($row->user_id);

                // if(count($UpdateUsers) == 0 ){
                if ($UpdateUsers == null) {
                    $UpdateUsers = new User();
                    $UpdateUsers->user_id = uniqid();
                    //					$UpdateUsers->password = Hash::make('password');
                }

                $UpdateUsers->group_id = $row->group_id;
                $UpdateUsers->companies_m_id = $row->companies_m_id;
                $UpdateUsers->user_name = $row->user_name;
                $UpdateUsers->email = $row->email;
                if ($row->password !== '')
                    $UpdateUsers->password = Hash::make($row->password);
                $UpdateUsers->real_name = $row->real_name;
                $UpdateUsers->is_active = $row->is_active;

                $UpdateUsers->save();
            }
            $message =  'Process Succes';
            $success = true;
            DB::commit();
        } catch (\Illuminate\Database\QueryException $e) {
            // something went wrong with the transaction, rollback
            $message =  $e->getMessage();
            $success = false;
            DB::rollback();
        } catch (\Exception $e) {
            // something went wrong elsewhere, handle gracefully
            $message =  $e->getMessage();
            $success = false;
            DB::rollback();
        }
        $data = array(
            'success' => $success,
            'message' => $message
        );
        return \Response::json($data, 200);
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

    public function getUsers()
    {
        $sql = "SELECT * FROM vw_users";
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result, 200);
    }
    public function getUsersComboBox()
    {
        $sql = "SELECT * FROM vw_users";
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result['data'], 200);
    }
    public function geTrxCode()
    {
        $sql = "SELECT * FROM vw_transfer_owner";
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result, 200);
    }
    public function geTrxCodeComboBox()
    {
        $sql = "SELECT * FROM vw_transfer_owner";
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result['data'], 200);
    }
    public function geTrxCodeHisto()
    {
        $sql = "SELECT * FROM vw_transferHisto_owner";
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result, 200);
    }
    public function getFlowOwnerCode(Request $request)
    {
        $catno = $request->input('catalog_no');
        $sql = "SELECT * FROM vw_flow_owner_code where catalog_no=$catno";
        $result = BaseModel::buildSql($sql);;
        $data = array();
        $row = array();
        $x = 0;
        foreach ($result as $data) {
            if ($x == 0) {
                foreach ($data as $data2) {
                    $row = (array)$data2;
                    $flowdata = trim($row['flow_Data']);
                }
                $x++;
            }
        }
        return $flowdata;
        //     return \Response::json($result,200);        
    }
    public function getOldOwner()
    {

        $sql = "SELECT * FROM vw_owner_code";
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result, 200);
    }

    public function getUserProfile()
    {
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id', '=', $user_id)
                ->get();
            $data = array('user_name' => $dataUserProfile[0]['user_name'], 'real_name' => $dataUserProfile[0]['real_name'], 'email' => $dataUserProfile[0]['email']);
            $message =  'Process Succes';
            $success = true;
            DB::commit();
        } catch (\Illuminate\Database\QueryException $e) {
            $message =  $e->getMessage();
            $success = false;
            DB::rollback();
        } catch (\Exception $e) {
            $message =  $e->getMessage();
            $success = false;
            DB::rollback();
        }
        $data = array(
            'success' => $success,
            'message' => $message,
            'data'  => $data
        );
        return \Response::json($data, 200);
    }

    public function getNewUsers()
    {
        $sql = "SELECT users_temp.*,companies_m.name FROM users_temp JOIN companies_m ON users_temp.companies_m_id = companies_m.id";
        $result = BaseModel::buildSqlValuationClass($sql);;
        return \Response::json($result, 200);
    }

    public function getDetailUser(Request $request)
    {
        $data = DB::table('vw_users')->where('user_id', $request->user_id)->first();
        return response()->json($data);
    }

    public function deleteConfirmationUser(Request $request)
    {
        DB::table('users_temp')->where('id', $request->id)->delete();
        $data = array(
            'success' => true,
            'message' => "Successfully deleting data."
        );
        return \Response::json($data, 200);
    }
}
