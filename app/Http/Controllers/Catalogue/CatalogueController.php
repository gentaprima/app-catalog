<?php

namespace App\Http\Controllers\Catalogue;

use App\Models\DeletionAdrDItems;
use App\Models\RevisionAdrDItems;
use App\Models\TransferOwnerCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Input;
use Response;

use Validator;
use App\Helpers\AutoNumber;
use App\Http\Controllers\Controller;
use App\Models\Adr_M as ADR_M;
use App\Models\Adr_D_Items;
use App\Models\AdrM;
use App\Models\AdrMStatus;
use App\Models\AdrDItems;
use App\Models\AdrDItemsStatus;
use App\Models\AdrDItemsCrossreferences;
use App\Models\AdrDItemsFuncLoc;
use App\Models\IncCharacteristics;
use App\Models\AdrDItemsCharacteristics;
use Illuminate\Foundation\Auth\User;
use Auth;
use DB;
use App\Models\BaseModel;
use Session;
use Excel;
use File;

class CatalogueController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function arrayToObject($array)
    {
        if (!is_array($array)) {
            return $array;
        }

        $object = new \stdClass();
        if (is_array($array) && count($array) > 0) {
            foreach ($array as $name => $value) {
                $name = strtolower(trim($name));
                if (!empty($name)) {
                    $object->$name = $this->arrayToObject($value);
                }
            }
            return $object;
        } else {
            return FALSE;
        }
    }

    public function getCatalogM_p(Request $request)
    {
        $catno2 = array();
        $tp1 = array();
        $tip = 'Service';
        $catno = 0;
        $clause = BaseModel::buildFilter($request->filter);
        if (isset($clause)) {
            foreach ($clause as $key => $str) {
                $whereParts = array();
                for ($i = 0; $i < sizeof($str['field']); $i++) {
                    $whereParts[$i] = array($str['field'][$i], $str['operator'][$i], $str['value'][$i]);
                    // $catno2 = array($str['value'][3]);
                }
            }
        }

        $catno2 = $whereParts[0];
        $catno = $catno2[2];
        $tp1 = $whereParts[2];
        $tip = $tp1[2];
        if ($catno == null) {
            $catno = 0;
        }
        $sql = "call p_catalog_m($catno,'$tip')";
        $result = DB::select($sql);
        return Response::json($result, 200);
    }
    public function getCatalogM()
    {
        $sql = "SELECT * FROM vvw_catalog_m";
        $result = BaseModel::buildSql($sql);;
        return Response::json($result, 200);
    }
    public function getMultiViewCatalogM()
    {
        $sql = "SELECT * FROM vw_mv_catalog_m";
        $result = BaseModel::buildSql($sql);
        return Response::json($result, 200);
    }
    public function getItemsIncCharacteristics(Request $request)
    {

        $sql = "
			SELECT 
				`inc_char`.`id` AS `id`,
				`inc_char`.`id` AS `inc_characteristics_id`,
				`inc_char`.`inc_m_id` AS `inc_m_id`,
				`inc_char`.`inc` AS `inc`,
				`inc_char`.`mrcode` AS `mrcode`,
				`inc_char`.`characteristics_m_id` AS `characteristics_m_id`,
				`inc_char`.`characteristics` AS `characteristics`,
				`inc_char`.`sequence` AS `sequence`,
				`inc_char`.`type` AS `type`,
				`adr_char`.`adr_d_items_id` AS `adr_d_items_id`,
				`adr_char`.`nvalue` AS `nvalue`,
				`adr_char`.`id` AS `adr_d_items_characteristic_id`
			FROM
				`inc_characteristics` `inc_char`
				LEFT JOIN `adr_d_items_characteristic` `adr_char` ON `inc_char`.`inc_m_id` = `adr_char`.`inc_m_id`
					AND `inc_char`.`id` = `adr_char`.`inc_characteristics_id` AND adr_d_items_id = :adr_d_items_id
			WHERE inc_char.inc_m_id = :inc_m_id
			ORDER BY `inc_char`.`sequence`
		";
        $items_inc_char = DB::select($sql, ['adr_d_items_id' => $request->adr_d_items_id, 'inc_m_id' => $request->inc_m_id]);
        $totalrecords = count($items_inc_char);

        $result = ($totalrecords > 0 ? BaseModel::buildMetaData($items_inc_char, $totalrecords) : []);

        /*         $items_inc_char = DB::table('vw_adr_items_characteristic')
                            ->where('vw_adr_items_characteristic.inc_m_id',$request->inc_m_id)
                            ->where('vw_adr_items_characteristic.adr_d_items_id',$request->adr_d_items_id)
                            ->orderBy('vw_adr_items_characteristic.sequence', 'asc')
                            ->get();
        if(count($items_inc_char)>0){
            $result = BaseModel::buildMetaData($items_inc_char,500);

        }else{
            $items_inc_char = DB::table('vw_inc_characteristics')
                                ->where('vw_inc_characteristics.inc_m_id',$request->inc_m_id)
                                ->orderBy('vw_inc_characteristics.sequence', 'asc')
                                ->get();
            if(count($items_inc_char) > 0){
                $result = BaseModel::buildMetaData($items_inc_char,500);
            }else{
                $result = [];
            }

        }
 */
        return \Response::json($result, 200);
    }
    public function getItemsIncCharacteristicsValue()
    {
        $sql = "SELECT * FROM vw_items_characteristics_value";
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result, 200);
    }

    public function getItemsCrossReferences()
    {
        $sql = "SELECT * FROM vw_adr_items_crossreferences";
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result, 200);
    }
    public function SaveItemsCrossReferences(Request $request)
    {
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id', '=', $user_id)
                ->get();
            $sql = array();
            $sql_cross = array();
            $cross_references = json_decode(stripslashes($input['cross_references']));
            foreach ($cross_references as $row) {
                $arrRow = array();
                $arrRowCross = array();

                $colCross = array();
                $valCross = array();

                foreach ($row as $head => $value) {
                    $arrRowCross[$head] = $value;
                }
                $sql_cross[] = $arrRowCross;
            }
            $i = 0;
            foreach ($sql_cross as $arrRow) {
                if (isset($arrRow['flag']) == 'Insert') {
                    $adr_d_items = new AdrDItemsCrossreferences();
                    $adr_d_items->adr_d_items_id = $input['adr_d_items_id'];
                    $adr_d_items->refno = $arrRow['refno'];
                    $adr_d_items->manufactur = $arrRow['manufactur'];
                    $adr_d_items->old_material_code = $arrRow['old_material_code'];
                    $adr_d_items->type = $arrRow['type'];
                    $adr_d_items->save();
                } else {
                    $adr_d_items = AdrDItemsCrossreferences::find($arrRow['id']);
                    $adr_d_items->adr_d_items_id = $input['adr_d_items_id'];
                    $adr_d_items->refno = $arrRow['refno'];
                    $adr_d_items->manufactur = $arrRow['manufactur'];
                    $adr_d_items->old_material_code = $arrRow['old_material_code'];
                    $adr_d_items->type = $arrRow['type'];
                    $adr_d_items->save();
                }

                $i++;
            }
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
            'message' => $message
        );
        return \Response::json($data, 200);
    }
    public function DeletedItemsCrossReference(Request $request)
    {
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id', '=', $user_id)
                ->get();
            $levelUser = $dataUserProfile[0]['group_name'];
            AdrDItemsCrossreferences::destroy($input['id']);
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
            'message' => $message
        );
        return \Response::json($data, 200);
    }
    public function getItemsFuncloc()
    {
        $sql = "SELECT * FROM adr_d_items_funcloc";
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result, 200);
    }
    public function SaveItemsFuncLoc(Request $request)
    {
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id', '=', $user_id)
                ->get();
            $sql = array();
            $sql_funcloc = array();
            $funcloc = json_decode(stripslashes($input['funcloc']));
            foreach ($funcloc as $row) {
                $arrRowFl = array();
                foreach ($row as $head => $value) {
                    $arrRowFl[$head] = $value;
                }
                $sql_funcloc[] = $arrRowFl;
            }
            $i = 0;
            foreach ($sql_funcloc as $arrRow) {
                if (isset($arrRow['flag']) == 'Insert') {
                    $adr_d_itemsFL = new AdrDItemsFuncLoc();
                    $adr_d_itemsFL->adr_d_items_id = $input['adr_d_items_id'];
                    $adr_d_itemsFL->name = $arrRow['name'];
                    $adr_d_itemsFL->description = $arrRow['description'];
                    $adr_d_itemsFL->save();
                } else {
                    $adr_d_itemsFL = AdrDItemsFuncLoc::find($arrRow['id']);
                    $adr_d_itemsFL->adr_d_items_id = $input['adr_d_items_id'];
                    $adr_d_itemsFL->name = $arrRow['name'];
                    $adr_d_itemsFL->description = $arrRow['description'];
                    $adr_d_itemsFL->save();
                }
                $i++;
            }
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
            'message' => $message
        );
        return Response::json($data, 200);
    }
    public function DeletedItemsFuncLoc(Request $request)
    {
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id', '=', $user_id)
                ->get();
            $levelUser = $dataUserProfile[0]['group_name'];
            AdrDItemsFuncLoc::destroy($input['id']);
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
            'message' => $message
        );
        return \Response::json($data, 200);
    }
    public function getItemsViewNotes()
    {
        $sql = "SELECT * FROM adr_d_items_view_notes";
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result, 200);
    }
    public function SaveTranferOwnerCode(Request $request)
    {
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id', '=', $user_id)
                ->get();
            foreach ($input as $key => $value) {
                $data[$key] = $value;
            }
            $transfer_owner_code = array($data);
            $i = 1;
            // DB::enableQueryLog();
            foreach ($transfer_owner_code as $data) {
                $row = $this->arrayToObject($data);
                if (!empty($row->trx_no)) {
                    $transferOwnerCode = TransferOwnerCode::where('trx_no', '=', $row->trx_no)
                        ->first();
                    if (!empty($row->proc_approver)) {
                        if ($row->proc_approver == 'Validate') {
                            /*Addition*/
                            AdrM::where('creator_id', '=', $transferOwnerCode->old_owner_code)
                                ->update(['creator_id' => $transferOwnerCode->new_owner_code]);
                            AdrDItems::where('created_by', '=', $transferOwnerCode->old_owner_code)
                                ->update(['created_by' => $transferOwnerCode->new_owner_code]);
                            /* Deletion */
                            DeletionAdrDItems::where('created_by', '=', $transferOwnerCode->old_owner_code)
                                ->update(['created_by' => $transferOwnerCode->new_owner_code]);
                            /* Revision */
                            RevisionAdrDItems::where('created_by', '=', $transferOwnerCode->old_owner_code)
                                ->update(['created_by' => $transferOwnerCode->new_owner_code]);
                        }
                        $transferOwnerCode->proc_approver = $row->proc_approver;
                        $transferOwnerCode->proc_approver_date = DB::raw('now()');
                        $transferOwnerCode->proc_approver_by = $user_id;
                        $transferOwnerCode->save();
                    }
                } else {
                    $table = "transfer_owner_code";
                    $primary = "trx_no";
                    $years = '';
                    $prefix = "";
                    $sprintf = "%0s";
                    $trx_no = AutoNumber::autonumber($table, $primary, $prefix, $years, $sprintf);
                    $tranferOwnerCode = new TransferOwnerCode();
                    foreach ($row as $field => $value) {
                        $check = substr($value, 0, 6);
                        $arrRow[$field] = $value;
                        if ($field !== '_token') {
                            if ($check !== 'Select') {
                                $tranferOwnerCode->$field = $value;
                            }
                        }
                        if ($field == 'old_owner_code') {
                            $tranferOwnerCode->trx_no = $trx_no;
                        }
                    }
                    $tranferOwnerCode->save();
                }
            }
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
            'message' => $message
        );
        return Response::json($data, 200);
    }
    public function getTransferOwnerCodeM()
    {
        $sql = "SELECT * FROM vw_transfer_owner_code_m";
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result, 200);
    }

    public function addValueCharacteristic(Request $request)
    {

        DB::table('value_characteristic')->where('adr_d_items_id', $request->adr_d_items_id)->delete();
        DB::table('value_characteristic')->insert($request->characteristic);
        $data = DB::table('value_characteristic')->where('adr_d_items_id', $request->adr_d_items_id)->where('type_adr', 'Addition')->get();
        return response()->json([
            'success' => true,
            'data' => $data
        ], 200);
    }

    public function updateAllValueCharacteristic(Request $request)
    {
        $data = $request->characteristic;
        foreach ($data as $key => $item) {
            $item["adr_d_items_id"] = $request->adr_d_items_id;
            $data[$key] = $item;
        }
        DB::table('value_characteristic')->where('adr_d_items_id', $request->adr_d_items_id)->delete();
        DB::table('value_characteristic')->insert($data);
        $getData = DB::table('value_characteristic')->where('adr_d_items_id', $request->adr_d_items_id)->where('type_adr', 'Addition')->get();
        return response()->json([
            'success' => true,
            'data' => $getData
        ], 200);
    }

    public function addValueCharacteristicRevision(Request $request)
    {
        DB::table('value_characteristic')->where('adr_d_items_id', $request->adr_d_items_id)->delete();
        DB::table('value_characteristic')->insert($request->characteristic);
        $data = DB::table('value_characteristic')->where('adr_d_items_id', $request->adr_d_items_id)->where('type_adr', 'Revision')->get();
        return response()->json([
            'success' => true,
            'data' => $data
        ], 200);
    }

    public function updateValueCharacteristic(Request $request)
    {
        DB::table('value_characteristic')->where('adr_d_items_id', $request->adr_d_items_id)->where('id_characteristic_value', $request->id)
            ->update([
                'nvalue' => $request->nValue
            ]);
        return response()->json([
            'success' => true
        ], 200);
    }

    public function getValueCharacteristicById($adrItems)
    {
        $data = DB::table('value_characteristic')->where('adr_d_items_id', $adrItems)->where('nvalue', '!=', null)->get();
        return response()->json([
            'success' => true,
            'data' => $data
        ], 200);
    }

    public function getAllValueCharacteristicById($adr)
    {
        $data = DB::table('value_characteristic')->where('adr_d_items_id', $adr)->where('type_adr', 'Addition')->get();
        return response()->json([
            'success' => true,
            'data' => $data
        ], 200);
    }

    public function getAllValueCharacteristicRevisionById($adr)
    {
        $data = DB::table('value_characteristic')->where('adr_d_items_id', $adr)->where('type_adr', 'Revision')->get();
        return response()->json([
            'success' => true,
            'data' => $data
        ], 200);
    }
}
