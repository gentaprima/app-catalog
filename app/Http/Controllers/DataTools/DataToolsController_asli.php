<?php

namespace App\Http\Controllers\DataTools;

use App\Models\IncCharacteristics;
use App\Models\IncM;
use App\Models\IncMImages;
use App\Models\GroupClassD;
use App\User;
use App\Models\IncColloquialName;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use DB;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Input;
use Response;

use Validator;
//use App\Http\Requests;
use App\Models\vwGetInc as vwGetInc;
use App\Models\BaseModel;
//use App\MasterArea as MasterArea;

class DataToolsController extends Controller
{
    function getIncCharacteristicsM(Request $request){
        DB::enableQueryLog();
        $sql = "SELECT * FROM vw_inc_characteristics" ;
        $result = BaseModel::buildSql($sql);
        $qrySequence = IncCharacteristics::select(DB::raw("MAX(sequence)+1 AS sequenceMax"));
        $clause = BaseModel::buildFilter($request->filter);
        if(isset($clause)){
            foreach ($clause as $key=>$str){
                $whereParts = array();
                for($i=0;$i<sizeof($str['field']);$i++)
                {
                    $whereParts[$i] = array($str['field'][$i],$str['operator'][$i],$str['value'][$i]);
                }
            }
        }
        $qrySequence->where($whereParts);
        $seqDataMax = $qrySequence->get();
        $result['sequenceMax']=$seqDataMax[0]['sequenceMax'];
        return \Response::json($result,200);
        /*$query = IncCharacteristics::select(DB::raw("*,sequence AS sequence_old"));
        $clause = BaseModel::buildFilter($request->filter);
        if(isset($clause)){
            foreach ($clause as $key=>$str){
                $whereParts = array();
                for($i=0;$i<sizeof($str['field']);$i++)
                {
                    $whereParts[$i] = array($str['field'][$i],$str['operator'][$i],$str['value'][$i]);
                }
            }
        }
        $query->where($whereParts);
        $dataAll = $query->get();
        if(count($dataAll) > 0 ){
            $query->offset($request->start)
                  ->limit($request->limit)
                  ->orderBy('id','ASC');
            $data = $query->get();
            $ttlRecord = count($dataAll);
            $qrySequence = IncCharacteristics::select(DB::raw("MAX(sequence)+1 AS sequenceMax"));
            $qrySequence->where($whereParts);
            $seqDataMax = $qrySequence->get();
        }else{
            $data = array();
            $seqDataMax = 0;
            $ttlRecord = 0 ;
        }
        $result = BaseModel::buildMetaData($data,$ttlRecord);
        $result['sequenceMax']=$seqDataMax[0]['sequenceMax'];
        return \Response::json($result,200);*/
    }

    function getIncColloquialName(){
        $sql = "SELECT * FROM vw_searchinccolloquialname" ;
        $result = BaseModel::buildSql($sql);
        return \Response::json($result,200);
    }
    function getIncMDataTools(Request $request){
        switch ($request->action){
            case 'getIncM':
                DB::enableQueryLog();
                $sql = "SELECT * FROM vw_inc_m " ;
                $result = BaseModel::buildSql($sql);
//                var_dump(DB::getQueryLog());
                break;
            case 'getIncMCN':
                $sql = "SELECT * FROM vw_inc_mcn" ;
                $result = BaseModel::buildSql($sql);
                break;
            default:
                $result = array();
            break;    

        }
        return \Response::json($result,200);


    }
    function SaveIncColloquialName(){
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id','=',$user_id)
                ->get();
            $levelUser = $dataUserProfile[0]['group_name'];

            $data_items = $input['data_items'];
            // var_dump($data_items);
            if ($data_items != '[]'){
                $sql1 = array();
                $checkDetail1 = "" ;
                $data_items = json_decode($input['data_items']);
                $i=1;
                $updates = array();

                foreach ($data_items as $row){
                    if($row->id !== 'insert_cn'){
                        IncColloquialName::where('id','=',$row->id)
                                            ->where('cn','=',$row->cn)
                                            ->update(['colloquial_name'=>$row->colloquial_name]);
                    }
                    if($row->id == 'insert_cn') {
                        $IncColloquialName = new IncColloquialName();
                        $IncColloquialName->inc = $row->inc;
                        $IncColloquialName->cn = $row->cn;
                        $IncColloquialName->colloquial_name = $row->colloquial_name;
                        $IncColloquialName->save();
                    }
                    $i++;


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
    public function DeleteIncColloquialName(Request $request)
    {
//        DB::enableQueryLog();
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id','=',$user_id)
                ->get();
            $levelUser = $dataUserProfile[0]['group_name'];
            foreach ($input as $key => $value) {
                if($key !='material_char' && $key !='action') {
                    $data[$key] = $value;
                }
            }

            IncColloquialName::Where('cn','=',$input['cn'])->delete();

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

    function getIncCharacteristicsValue(){
        $sql = "SELECT * FROM inc_characteristics_value" ;
        $result = BaseModel::buildSql($sql);
        return \Response::json($result,200);
    }
    function ChangeShortText(){
        DB::enableQueryLog();
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id','=',$user_id)
                ->get();
            $levelUser = $dataUserProfile[0]['group_name'];
            foreach ($input as $key => $value) {
                if($key !='material_char' && $key !='action') {
                    $data[$key] = $value;
                }
            }

            $incM = IncM::find($input['inc']);
            $incM->short_name_code = $input['short_name_code'];
            $incM->save();
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
    function DeleteIncImages(){
        DB::enableQueryLog();
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id','=',$user_id)
                ->get();
            $levelUser = $dataUserProfile[0]['group_name'];
            foreach ($input as $key => $value) {
                if($key !='material_char' && $key !='action') {
                    $data[$key] = $value;
                }
            }

            IncMImages::destroy($input['id']);

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
    function SaveIncImages(Request $request){
        DB::enableQueryLog();
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id','=',$user_id)
                ->get();
            $levelUser = $dataUserProfile[0]['group_name'];
            foreach ($input as $key => $value) {
                if($key !='material_char' && $key !='action') {
                    $data[$key] = $value;
                }
            }
            $target_dir = "inc_images/";

            $temp_file_name = $_FILES['images_path']['tmp_name'];
            $original_file_name = $_FILES['images_path']['name'];

            // Find file extention
            $ext = explode ('.', $original_file_name);
            $ext = $ext [count ($ext) - 1];

            // Remove the extention from the original file name
            $file_name = str_replace ($ext, '', $original_file_name);

            $new_name = date('mdY_His').'_Inc_'.$input['inc'].".".$ext;
            $target_file = $target_dir.$new_name;
            $uploadOk = 1;
            $imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);



            // Check if image file is a actual image or fake image
            if(isset($input["SaveIncImages"])) {
                $check = getimagesize($_FILES["images_path"]["tmp_name"]);
                if($check !== false) {
                    echo "File is an image - " . $check["mime"] . ".";
                    $uploadOk = 1;
                } else {
                    echo "File is not an image.";
                    $uploadOk = 0;
                }
            }
            if ($uploadOk == 0) {
                echo "Sorry, your file was not uploaded.";
                // if everything is ok, try to upload file
            } else {
                if (move_uploaded_file($_FILES["images_path"]["tmp_name"], $target_file)) {
                    $IncMImages= new IncMImages;
                    $IncMImages->inc = $input['inc'];
                    $IncMImages->description = $input['description'];
                    $IncMImages->images = $new_name;
                    $IncMImages->save();

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

    function SaveIncCharacteristics(Request $request){
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id','=',$user_id)
                ->get();
            $levelUser = $dataUserProfile[0]['group_name'];

            $sql = array();
            $incCharacteristicMrow = array();
            $data_items = json_decode(stripslashes($input['data_items']));
            foreach ($data_items as $row){
                $arrRowCross=array();
                foreach ($row as $head=>$value){
                    $arrRowCross[$head] = $value;
                }
                $incCharacteristicMrow[] = $arrRowCross;
            }
            $i = 0 ;
            foreach ($incCharacteristicMrow as $arrRow){
                if($arrRow['id'] !== "last_insert_id"){
                    if($arrRow['sequence_old'] !== $arrRow['sequence'] ){
                        DB::enableQueryLog();
						
		//				IncCharacteristics::where('inc','=',$arrRow['inc'])
         //                   ->where('sequence','>=',$arrRow['sequence'])
          //                  ->update(['sequence'=> 'sequence+1']);
						
          //              IncCharacteristics::where('inc','=',$arrRow['inc'])
           //                 ->where('sequence','=',$arrRow['sequence'])
           //                 ->update(['sequence'=>$arrRow['sequence_old']]);
						
			//			IncCharacteristics::where('inc','=',$arrRow['inc'])
             //               ->where('sequence','>',$arrRow['sequence_old'])
             //               ->update(['sequence'=> increment('sequence')]);
                       
						//IncCharacteristics::where('inc','=',$arrRow['inc'])
                          //  ->where('id','=',$arrRow['id'])
                            //->update(['sequence'=>$arrRow['sequence'] ,'type'=>$arrRow['type'] ]);
							
//                        var_dump('B');
                    }else{
                        $incCharacteristic = IncCharacteristics::find($arrRow['id']);
                        $incCharacteristic->type = $arrRow['type'];
                        $incCharacteristic->save();
//                        var_dump('C');
                    }

//
                }else{
                    $incCharacteristic = new IncCharacteristics();
                    $incCharacteristic->inc_m_id = $arrRow['inc_m_id'];
                    $incCharacteristic->inc = $arrRow['inc'];
                    $incCharacteristic->characteristics_m_id = $arrRow['characteristics_m_id'];
                    $incCharacteristic->characteristics = $arrRow['characteristics'];
                    $incCharacteristic->type = $arrRow['type'];
                    $incCharacteristic->mrcode = $arrRow['mrcode'];
                    $incCharacteristic->sequence = $arrRow['sequence'];
                    $incCharacteristic->save();
//                    var_dump('AXX');

                      // 
                }

                $i++;
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

    function DeleteIncCharacteristics(Request $request){
        DB::enableQueryLog();
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id','=',$user_id)
                ->get();
            $levelUser = $dataUserProfile[0]['group_name'];

            IncCharacteristics::destroy($input['id']);
            

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

    public function SaveIncItem(Request $request)
    {
        DB::enableQueryLog();
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id','=',$user_id)
                ->get();
            $levelUser = $dataUserProfile[0]['group_name'];

            $data_items = $input['data_items'];
            if ($data_items != '[]'){
                $sql1 = array();
                $checkDetail1 = "" ;
                $data_items = json_decode($input['data_items']);
                $i=1;
                $updates = array();

                foreach ($data_items as $row){
                    $col = array();
                    $val = array();
                    $updates = array();
                    $incGroupClassD = new GroupClassD();
                    $incMNew = new IncM();
                    // $incM = IncM::where('inc','=',$row->inc);
                    foreach ($row as $head=>$value){
                        if($row->id !== 'insert_inc'){
                            if($head == 'is_active'){
                                $updates = array($head=>$value);
                            }
                            // =======================================================
                            /*if($head !== 'rowid'){
                                if($head !== 'short_name_code'){
                                    if($head !== 'description'){
                                        if($head !== 'inc'){
                                            if($head !== 'inc_class_name'){
                                                if($head !== 'mgc_list'){
                                                    if($head !== 'transaction_type'){
                                                        if($head !== 'id'){
                                                            $col[] = $head;
                                                            $val[] = $value;
                                                            $incM->$head = $value
                                                            // $updates[] = '`'.$head.'`'."="."'". mysql_real_escape_string($value) ."'";
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }*/
                            // =======================================================
                        }else{
                            // =======================================================
                            if($head !== 'id'){
                                if($head !== 'rowid'){
                                    if($head !== 'short_name_code'){
                                        if($head !== 'description'){
                                            if($head !== 'inc_class_name'){
                                                if($head !== 'mgc_list'){
                                                    if($head !== 'groupclass'){
                                                        $incMNew->$head = $value ;
                                                        if($head == 'inc'){
                                                            $incGroupClassD->$head = $value ;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            // =======================================================
                        }
                    }
                    $i++;
                    if($row->id != 'insert_inc'){
                        $incM = IncM::where('inc','=',$row->inc)->update($updates);
                    }else{
                        $incMNew->save();
                        $incGroupClassD->groupclass = $row->groupclass;
                        $incGroupClassD->save();
                    }

                    
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

    public function DeleteInc(Request $request)
    {
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id','=',$user_id)
                ->get();
            $levelUser = $dataUserProfile[0]['group_name'];

            IncM::Where('inc','=',$input['inc'])->delete();
            GroupClassD::Where('inc','=',$input['inc'])->delete();
            

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

    public function SaveIncMNew(REQUEST $request){
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id','=',$user_id)
                ->get();
            $levelUser = $dataUserProfile[0]['group_name'];

            $IncM = new IncM();
            $IncM->inc = $input['inc'];
            $IncM->inc_name = $input['inc_name'];
            $IncM->item_name = $input['inc_name'];
            $IncM->short_name_code = $input['short_name_code'];
            $IncM->description = $input['description'];
            $IncM->transaction_type = $input['transaction_type'];
            $IncM->save();
            
            
            foreach ($input['groupclass'] as $key => $value) {
                $GroupClassD = new GroupClassD();
                $GroupClassD->inc = $input['inc'];
                $GroupClassD->groupclass = $value;
                $GroupClassD->save();
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
}
