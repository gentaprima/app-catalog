<?php

namespace App\Http\Controllers\Catalogue;

use App\Models\AdrDItems;
use App\Models\AdrDItemsCharacteristics;
use App\Models\AdrDItemsStatus;
use App\Models\AdrMStatus;
use App\Models\IncCharacteristics;
use App\Models\SyncM;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Response;

use Validator;
use App\Helpers\AutoNumber;
use App\Http\Controllers\Controller;
use App\Models\Adr_M as ADR_M;
use App\Models\Adr_D_Items ;
use App\Models\AdrDItemsCcrossreferences ;
use Auth ;
use DB;
use App\Models\BaseModel;
use Session;
use Excel;
use File;

class SyncController extends Controller
{
	
    public function arrayToObject($array) {
        if (!is_array($array)) {
            return $array;
        }

        $object = new \stdClass();
        if (is_array($array) && count($array) > 0) {
            foreach ($array as $name=>$value) {
                $name = strtolower(trim($name));
                if (!empty($name)) {
                    $object->$name = $this->arrayToObject($value);
                }
            }
            return $object;
        }
        else {
            return FALSE;
        }
    }
	
    public function AutoSyncBatchFiles(Request $request)
    {
        DB::beginTransaction();
        try {
            $message = '';
            $AdrDItems = AdrDItems::select(DB::raw("adr_d_items.*"))
                ->where('sync_status','=','none')
                ->where('proc_approver','=','Validate')
                ->where('sap_material_code','!=','')
                ->get();

            if(count($AdrDItems) > 0) {
                $data_mat_mas = array();
                $data = array();
                foreach ($AdrDItems as $row){
                    $query = DB::table('vw_inc_m');
                    $query->where('inc', "=", $row->inc);
                    $searchIncM = $query->get();
                    $dataIncM = $this->arrayToObject($searchIncM[0]);

                    $lenShortNameCode = strlen($dataIncM->short_name_code . ':');
                    $short_text = $dataIncM->short_name_code . ':';
                    $long_text = $row->long_description;
                    $itemsIncCharsAll = substr($long_text, $lenShortNameCode);
                    $itemsIncCharsAllArray = explode(';', $itemsIncCharsAll);
                    $num_itemsIncCharsAllArray = count($itemsIncCharsAllArray[0]);
                    $arrSpec = array();
                    foreach($itemsIncCharsAllArray as $incCharValue) {
                        $num_incCharValueArray = explode(':', $incCharValue);
                        $xx = count($num_incCharValueArray[0]);
                        if($xx >= 1){
                            $arrSpec[] = $incCharValue ;
                        }
                    }
                    if(count($arrSpec) >=1){
                        $spec = $arrSpec;
                    }else{
                       $spec = array(); 
                    }
                    $data[]= array(
                        'sap_material_code' => $row->sap_material_code,
                        'material_type' =>$row->material_type,
                        'short_description' =>$row->short_description,
                        'short_text' => count($spec) > 1? $short_text : $dataIncM->short_name_code ,
                        'base_uom' =>$row->uom,
                        'material_group' =>$row->groupclass,
                        'spec' => $spec
                    );
                    $UpdateAdrDItems = AdrDItems::find($row->id);
                    $UpdateAdrDItems->sync_created_at = date("Y-m-d H:i:s");
                    $UpdateAdrDItems->sync_status = 'success' ;
                    $UpdateAdrDItems->save();
                }

                $content = \View::make('Template_MatMas')->with('data', $data);
                $content_longtext = \View::make('Template_MatMas_long_Text')->with('data', $data);


                // Set the name of the text file
                $filename = 'Mat_'.date('YmdHis').'.txt';
                $filename_longtext = 'MatLT_'.date('YmdHis').'.txt';
                /*Local Disk*/
                   // Storage::disk('local')->put($filename, $content);
                   // Storage::disk('local')->put($filename_longtext, $content_longtext);
                /*FTP*/
                Storage::disk('ftp')->put('subs\ABM\CATALOG\SYNC_MAT\/'.$filename, $content);
                Storage::disk('ftp')->put('subs\ABM\CATALOG\SYNC_MAT\/'.$filename_longtext, $content_longtext);
            }

            $message .=  'Process Succes';
            $success = true ;
            DB::commit();
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
//        return \Response::make($content, 200, $headers);
        return \Response::json($data,200);

    }

}
