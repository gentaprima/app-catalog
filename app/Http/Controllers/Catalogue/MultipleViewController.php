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

class MultipleViewController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

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

    public function ApplyChangeMultiView(){
        DB::beginTransaction();
        try {
            $message = '';
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id','=',$user_id)
                ->get();
            $levelUser = $dataUserProfile[0]['group_name'];
            foreach ($input as $key => $value) {
                if($key == 'data_detail' || $key == 'items_characteristic'){
                    $data[$key] = $value;
                }
            }
            $multiview = array($data);
            // $i=1;
            foreach ($multiview as $allRow){
                $data_detail = json_decode(stripslashes($allRow['data_detail']));
                foreach ($data_detail as $row) {
//                    DB::enableQueryLog();
                    $adrDitems = AdrDItems::find($row->adr_d_items_id);
                    foreach ($row as $field=>$value){
                        if($field !=='id' ){
                            if($field !=='description' ) {
                                if ($field !== 'items_characteristic') {
                                    if ($field !== 'adr_d_items_id') {
                                        if ($field !== 'item_status') {
                                            if ($field !== 'adr_status') {
                                                  if ($field !== 'updated_by') {
                                                        if ($field !== 'cataloguer_by') {
                                                            if ($field !== 'std_approval_by') {
                                                                if ($field !== 'proc_approver_by') {
                                                                    if ($field !== 'sap_material_code_by') {
                                                                        if ($field !== 'item_name') {
                                                                            if ($field !== 'adr_no') {
                                                                                if ($field !== 'creator_id') {
                                                                                    if ($field !== 'user_name') {
                                                                                        if ($field !== 'real_name') {
                                                                                            if ($field !== 'owner') {
                                                                                                if ($field !== 'user_id') {
                                                                                                    if ($field !== 'company_code') {
                                                                                                        if ($field !== 'status_user') {
                                                                                                            if ($field !== 'status_cat') {
                                                                                                                if ($field !== 'status_stdapp') {
                                                                                                                    if ($field !== 'status_proc') {
                                                                                                                        if ($field !== 'status_sap') {
                                                                                                                            if ($field !== 'refno') {
                                                                                                                                if ($field !== 'manufactur') {
                                                                                                                                    if ($field !== 'email_user') {
                                                                                                                                        if ($field !== 'email_cat') {
                                                                                                                                            if ($field !== 'email_std') {
                                                                                                                                                if ($field !== 'email_proc') {
                                                                                                                                                    if ($field !== 'inc_m_id') {
                                                                                                                                                        if ($field !== 'char_value') {
                                                                                                                                                            if ($field !== 'service_type') {
                                                                                                                                                                if ($field !== 'old_material_code') {
                                                                                                                                                                    if ($field !== 'is_active') {
                                                                                                                                                                        if ($field !== 'manufactur') {
                                                                                                                                                                            if ($field !== 'type') {
                                                                                                                                                                                if ($field !== 'funcloc') {
                                                                                                                                                                                    if (!empty($value || $value !== NULL)) {
//                                                                                                                                                                                    var_dump($field);
                                                                                                                                                                                        $adrDitems->$field = $value;
                                                                                                                                                                                    }
                                                                                                                                                                                }
                                                                                                                                                                            }
                                                                                                                                                                        }
                                                                                                                                                                    }
                                                                                                                                                                }
                                                                                                                                                            }
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                }
                                                                                                                                            }
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                  }
                                            }
                                        }
                                    }
                                }
                            }

                        }
                        if ($field == 'item_name') {
                            $adrDitems->name_code = $value;

                        }
                        if($field == 'inc_m_id') {
							// DELETE dulu, mungkin saja ada ADR Characteristics yg sudah dihapus dari INC Characteristics
							$sql = "
								DELETE adr_char 
								FROM adr_d_items_characteristic adr_char
									LEFT JOIN inc_characteristics inc_char ON inc_char.inc_m_id = adr_char.inc_m_id AND inc_char.id = adr_char.inc_characteristics_id
								WHERE adr_d_items_id = :adr_d_items_id AND inc_char.id IS NULL
							";
							DB::statement($sql, ['adr_d_items_id' => $row->adr_d_items_id]);
							
							// Update from INC Characteristics
							$sql = "
								SELECT c.inc_m_id, c.id, c.mrcode
								FROM inc_characteristics c
								LEFT JOIN adr_d_items_characteristic i ON c.inc_m_id=i.inc_m_id AND c.id=i.inc_characteristics_id 
									AND i.adr_d_items_id= :adr_d_items_id
								WHERE inc = :inc
									AND adr_d_items_id IS NULL
							";
							
							$dataIncChar = DB::select($sql, ['adr_d_items_id' => $row->adr_d_items_id, 'inc' => $row->inc]);
									
							foreach ($dataIncChar as $rowIncChar) {
								$adrDItemsCharacteristics = new AdrDItemsCharacteristics();
								$adrDItemsCharacteristics->adr_d_items_id = $row->adr_d_items_id;
								$adrDItemsCharacteristics->catalog_no = $row->catalog_no;
								$adrDItemsCharacteristics->inc_m_id = $rowIncChar->inc_m_id;
								$adrDItemsCharacteristics->inc_characteristics_id = $rowIncChar->id;
								$adrDItemsCharacteristics->mrcode = $rowIncChar->mrcode;
								$adrDItemsCharacteristics->save();
							};						
							
							// Fill Characteristics Value
							$data_char_value = json_decode(stripslashes($allRow['items_characteristic']));

							foreach ($data_char_value as $rowCharValue) {
								$UpdateItemsIncChar = AdrDItemsCharacteristics::select(DB::raw("*"))
														->where('adr_d_items_id', '=', $row->adr_d_items_id)
														->where('inc_m_id', '=', $rowCharValue->inc_m_id)
														->where('inc_characteristics_id', '=', $rowCharValue->inc_characteristics_id)
														->first();
								
								if($UpdateItemsIncChar){
									$UpdateItemsIncChar->inc_characteristics_id = $rowCharValue->inc_characteristics_id;
									$UpdateItemsIncChar->nvalue = $rowCharValue->nvalue ;
									$UpdateItemsIncChar->save();
								}
							}
							
                            /* $searchAdrDItemsCharacteristics = AdrDItemsCharacteristics::where('inc_m_id', '=', $value)
                            ->where('adr_d_items_id', '=', $row->adr_d_items_id)
                            ->get();
                            if (count($searchAdrDItemsCharacteristics) > 0) {
                                $data_char_value = json_decode(stripslashes($allRow['items_characteristic']));
                                foreach ($data_char_value as $rowCharValue) {
//                                    DB::enableQueryLog();
                                    $serchKeyId = AdrDItemsCharacteristics::where('inc_m_id', '=', $rowCharValue->inc_m_id)
                                        ->where('adr_d_items_id', '=', $row->adr_d_items_id)
                                        ->where('inc_characteristics_id', '=', $rowCharValue->inc_characteristics_id)
                                        ->get();
                                    if(count($serchKeyId) > 0){
                                         $id = $serchKeyId->first()->getOriginal()['id'];
                                         $UpdateItemsIncChar = AdrDItemsCharacteristics::find($id);
                                         $UpdateItemsIncChar->nvalue = $rowCharValue->nvalue ;
                                         $UpdateItemsIncChar->save();
                                    }
                                }
                            }else{
                                AdrDItemsCharacteristics::select(DB::raw("*"))
                                    ->where('adr_d_items_id', '=', $row->adr_d_items_id)
                                    ->delete();
                                $dataIncChar = IncCharacteristics::select(DB::raw("*"))
                                    ->where('inc', '=', $row->inc)
                                    ->get();
                                $iChr = 0;
                                foreach ($dataIncChar as $rowIncChar) {
                                    $adrDItemsCharacteristics = new AdrDItemsCharacteristics();
                                    $adrDItemsCharacteristics->adr_d_items_id = $row->adr_d_items_id;
                                    $adrDItemsCharacteristics->catalog_no = $row->catalog_no;
                                    $adrDItemsCharacteristics->inc_m_id = $rowIncChar->inc_m_id;
                                    $adrDItemsCharacteristics->inc_characteristics_id = $rowIncChar->id;
                                    $adrDItemsCharacteristics->mrcode = $rowIncChar->mrcode;
                                    $adrDItemsCharacteristics->save();
                                    $iChr++;
                                }

                                $data_char_value = json_decode(stripslashes($allRow['items_characteristic']));
                                foreach ($data_char_value as $rowCharValue) {
                                    $serchKeyId = AdrDItemsCharacteristics::where('inc_m_id', '=', $rowCharValue->inc_m_id)
                                        ->where('adr_d_items_id', '=', $row->adr_d_items_id)
                                        ->where('inc_characteristics_id', '=', $rowCharValue->inc_characteristics_id)
                                        ->get();
                                    if(count($serchKeyId) > 0){
                                        $id = $serchKeyId->first()->getOriginal()['id'];
                                        $UpdateItemsIncChar = AdrDItemsCharacteristics::find($id);
                                        $UpdateItemsIncChar->nvalue = $rowCharValue->nvalue ;
                                        $UpdateItemsIncChar->save();
                                    }   
                                }
                            } */
                        }
                        if($field == 'items_is_active'){
                            if($levelUser == 'User'){
                                $adrDitems->items_is_active = 'Validate' ;
                                $senderName  = Auth::user()->real_name;
                                $emailSender = Auth::user()->email;

                                $adrDitems->category = $row->category ;
                                $adrDitems->updated_by = $user_id ;
                                $adrDitems->updated_at = date("Y-m-d H:i:s") ;

                                $adrDitems->cataloguer = null ;
                                $adrDitems->cataloguer_by_id = null ;
                                $adrDitems->cataloguer_date = null ;

                                $adrDitems->std_approval = null ;
                                $adrDitems->std_approval_by_id = null;
                                $adrDitems->std_approval_date = null ;

                                $adrDitems->proc_approver = null;
                                $adrDitems->proc_approver_by_id = null;
                                $adrDitems->proc_approver_date = null ;

                                $setFrom = 'ecat@abm-investama.co.id';
                                $titlesetFrom = 'ABM E-Cataloguing Systems';
                                $data = array(
                                    'from'=>$emailSender,
                                    'catalog_no'=>$row->catalog_no,
                                    'short_text'=>$row->short_description,
                                    'regard'=> $senderName
                                );
                                $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                $beautymail->send('emails.UserRequest', $data, function($message) use($row)
                                {
                                    $emailSender = Auth::user()->email;
                                    $to = User::select(DB::raw("users.*"))
                                        ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                                        ->leftJoin('companies_m', 'users.companies_m_id', '=', 'companies_m.id')
                                        ->where('group_name','=','Cat')
                                        ->where('users.companies_m_id','=',Auth::user()->companies_m_id)
                                        ->get();
                                    $toCatalogue = array();
                                    foreach ($to as $arrEmailRow){
                                        $toCatalogue[] = $arrEmailRow->email ;
                                    }

                                    $message->from($emailSender ,'ABM E-Cataloguing Systems')
                                        ->to($toCatalogue, 'ABM E-Cataloguing Systems')
                                        ->bcc('bqsoft77@gmail.com', 'Development')
                                        ->subject('Request '.$row->transaction_type);
                                });
                            }
                            if($levelUser == 'Cat'){
                                if($row->cataloguer == 'Validate') {
                                    $adrDitems->cataloguer = $row->cataloguer;
                                    $adrDitems->cataloguer_by_id = $user_id;
                                    $adrDitems->cataloguer_date = date("Y-m-d H:i:s");
                                    $adrDitems->items_is_active = $row->cataloguer;

                                    $setFrom = 'ecat@abm-investama.co.id';
                                    $titlesetFrom = 'ABM E-Cataloguing Systems';
                                    $data = array(
                                        'from' => $dataUserProfile[0]['email'],
                                        'catalog_no' => $row->catalog_no,
                                        'short_text' => $row->short_description,
                                        'regard' => $dataUserProfile[0]['real_name']
                                    );
                                    $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    $beautymail->send('emails.CatValidate', $data, function ($message) use($row) {
                                        $input = Input::all();
                                        $emailSender = Auth::user()->email;
                                        $type = $row->category;
                                        $sttdApp = 'Std App ' . $type;
                                        $to = User::select(DB::raw("users.*"))
                                            ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                                            ->where('group_name', '=', $sttdApp)
                                            ->get();
                                        $toStdApp = array();
                                        foreach ($to as $arrEmailRow) {
                                            $toStdApp[] = $arrEmailRow->email;
                                        }
                                        $message
                                            ->from($emailSender, 'ABM E-Cataloguing Systems')
                                            ->to($toStdApp, 'ABM E-Cataloguing Systems')
                                            ->bcc('bqsoft77@gmail.com', 'Development')
                                            ->subject('Request '.$row->transaction_type);
                                    });
                                }else{
                                    $adrDitems->cataloguer = $row->cataloguer ;
                                    $adrDitems->cataloguer_by_id = $user_id ;
                                    $adrDitems->cataloguer_date = date("Y-m-d H:i:s") ;
                                    $adrDitems->items_is_active = $row->cataloguer ;

                                    if($dataUserProfile[0]['group_name'] == 'Cat'){
                                        $setFrom = 'ecat@abm-investama.co.id';
                                        $titlesetFrom = 'ABM E-Cataloguing Systems';
                                        $data = array(
                                            'from'=>$dataUserProfile[0]['email'],
                                            'catalog_no'=>$row->catalog_no,
                                            'short_text'=>$row->short_description,
                                            'regard'=> $dataUserProfile[0]['real_name']
                                        );
                                        $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                        $beautymail->send('emails.CatNotValidate', $data, function($message) use($row) {
                                            $emailSender = Auth::user()->email;
                                            $input = Input::all();
                                            $query = DB::table('vw_catalog_m_owner');
                                            $query->where('catalog_no',"=",$row->catalog_no);
                                            $search = $query->get();
                                            $toOwner = array();
                                            foreach ($search as $arrEmailRow){
                                                $toOwner[] = $arrEmailRow->email ;
                                            }
                                            $message
                                                ->from($emailSender ,'ABM E-Cataloguing Systems')
                                                ->to($toOwner, 'ABM E-Cataloguing Systems')
                                                ->bcc('bqsoft77@gmail.com', 'Development')
                                                ->subject('Request '.$row->transaction_type);
                                        });
                                    }
                                }
                            }
                            if(substr(strtolower($levelUser),0,3) == 'std'){
                                if($row->std_approval == 'Validate') {
                                    $adrDitems->std_approval = $row->std_approval;
                                    $adrDitems->std_approval_by_id = $user_id;
                                    $adrDitems->std_approval_date = date("Y-m-d H:i:s");

                                    $setFrom = 'ecat@abm-investama.co.id';
                                    $titlesetFrom = 'ABM E-Cataloguing Systems';
                                    $data = array(
                                        'from' => $dataUserProfile[0]['email'],
                                        'catalog_no' => $row->catalog_no,
                                        'short_text' => $row->short_description,
                                        'std' => $levelUser,
                                        'regard' => $dataUserProfile[0]['real_name']
                                    );
                                    $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    $beautymail->send('emails.StdAppValidate', $data, function ($message) use($row){
                                        $emailSender = Auth::user()->email;
                                        $to = User::select(DB::raw("users.*"))
                                            ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                                            ->where('group_name', '=', 'Proc')
                                            ->get();
                                        $toProc = array();
                                        foreach ($to as $arrEmailRow) {
                                            $toProc[] = $arrEmailRow->email;
                                        }
                                        $message
                                            ->from($emailSender, 'ABM E-Cataloguing Systems')
                                            ->to($toProc, 'ABM E-Cataloguing Systems')
                                            ->bcc('bqsoft77@gmail.com', 'Development')
                                            ->subject('Request '.$row->transaction_type);
                                    });
                                }else{

                                    $adrDitems->std_approval = $row->std_approval;
                                    $adrDitems->std_approval_by_id = $user_id;
                                    $adrDitems->std_approval_date = date("Y-m-d H:i:s");
                                    $adrDitems->items_is_active = $row->std_approval ;

                                    $setFrom = 'ecat@abm-investama.co.id';
                                    $titlesetFrom = 'ABM E-Cataloguing Systems';
                                    $data = array(
                                        'from'=>$dataUserProfile[0]['email'],
                                        'catalog_no'=>$row->catalog_no,
                                        'short_text'=>$row->short_description,
                                        'std'=>$levelUser,
                                        'regard'=> $dataUserProfile[0]['real_name']
                                    );
                                    $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    $beautymail->send('emails.StdAppNotValidate', $data, function($message) use($row) {
                                        $emailSender = Auth::user()->email;
                                        $input = Input::all();
                                        $query = DB::table('vw_catalog_m_owner');
                                        $query->where('catalog_no',"=",$row->catalog_no);
                                        $search = $query->get();
                                        $toOwner = array();
                                        foreach ($search as $arrEmailRow){
                                            $toOwner[] = $arrEmailRow->email ;
                                        }
                                        $message
                                            ->from($emailSender ,'ABM E-Cataloguing Systems')
                                            ->to($toOwner, 'ABM E-Cataloguing Systems')
                                            ->bcc('bqsoft77@gmail.com', 'Development')
                                            ->subject('Request '.$row->transaction_type);
                                    });
                                }
                            }
                            if($levelUser == 'Proc'){
                                if($row->proc_approver == 'Validate') {
                                    $adrDitems->proc_approver = $row->proc_approver;
                                    $adrDitems->proc_approver_by_id = $user_id;
                                    $adrDitems->proc_approver_date = date("Y-m-d H:i:s");

                                    if ($row->material_type !== 'ZOEM') {
                                        $table = "adr_d_items";
                                        $primary = "sap_material_code";
                                        $years = '';
                                        if ($row->transaction_type == 'Material') {
                                            $prefix = 'G';
                                        } else {
                                            $prefix = 'S';
                                        }

                                        $sprintf = "%017s";
                                        $generateSAPNO = AutoNumber::autonumber($table, $primary, $prefix, $years, $sprintf);

                                        $adrDitems->sap_material_code = $generateSAPNO;
                                        $adrDitems->sap_material_code_by_id = $user_id;
                                        $adrDitems->sap_material_code_date = date("Y-m-d H:i:s");

                                        $adrDItemsStatus = new AdrDItemsStatus();
                                        $adrDItemsStatus->adr_d_items_id = $row->adr_d_items_id;
                                        $adrDItemsStatus->item_status = 'ORIGIN';
                                        $adrDItemsStatus->save();

                                        $setFrom = 'ecat@abm-investama.co.id';
                                        $titlesetFrom = 'ABM E-Cataloguing Systems';
                                        $data = array(
                                            'from' => $dataUserProfile[0]['email'],
                                            'catalog_no' => $row->catalog_no,
                                            'sap_material_code' => $generateSAPNO,
                                            'short_text' => $row->short_description,
                                            'regard' => $dataUserProfile[0]['real_name']
                                        );
                                        $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                        $beautymail->send('emails.SAPMaterialCode', $data, function ($message) use($row){
                                            $emailSender = Auth::user()->email;
                                            $input = Input::all();
                                            $query = DB::table('vw_catalog_m_owner');
                                            $query->where('catalog_no',"=",$row->catalog_no);
                                            $search = $query->get();
                                            $toOwner = array();
                                            foreach ($search as $arrEmailRow){
                                                $toOwner[] = $arrEmailRow->email ;
                                            }

                                            $queryCat = DB::table('adr_d_items');
                                            $queryCat->leftJoin('users', 'adr_d_items.cataloguer_by_id', '=', 'users.user_id');
                                            $queryCat->where('catalog_no',"=",$row->catalog_no);
                                            $searchCat = $queryCat->get();
                                            $toCat = array();
                                            foreach ($searchCat as $arrEmailCat){
                                                $toCat[] = $arrEmailCat->email ;
                                            }                                             
                                            $message
                                                ->from($emailSender ,'ABM E-Cataloguing Systems')
                                                ->to($toOwner, 'ABM E-Cataloguing Systems')
                                                ->cc($toCat)
                                                ->bcc('bqsoft77@gmail.com', 'Development')
                                                ->subject('Request '.$row->transaction_type);
                                        });

                                    } else {

                                        $adrDitems->sap_material_code = $row->sap_material_code ;
                                        $adrDitems->sap_material_code_by_id = $user_id ;
                                        $adrDitems->sap_material_code_date = date("Y-m-d H:i:s") ;

                                        $adrDItemsStatus= new AdrDItemsStatus();
                                        $adrDItemsStatus->adr_d_items_id = $row->adr_d_items_id;
                                        $adrDItemsStatus->item_status ='ORIGIN';
                                        $adrDItemsStatus->save();

                                        if(!empty($row->sap_material_code)) {

                                            $setFrom = 'ecat@abm-investama.co.id';
                                            $titlesetFrom = 'ABM E-Cataloguing Systems';
                                            $data = array(
                                                'from' => $dataUserProfile[0]['email'],
                                                'catalog_no' => $row->catalog_no,
                                                'sap_material_code' => $row->sap_material_code,
                                                'short_text' => $row->short_description,
                                                'regard' => $dataUserProfile[0]['real_name']
                                            );
                                            $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                            $beautymail->send('emails.SAPMaterialCode', $data, function ($message) use ($row) {
                                                $emailSender = Auth::user()->email;
                                                $input = Input::all();
                                                $query = DB::table('vw_catalog_m_owner');
                                                $query->where('catalog_no', "=", $row->catalog_no);
                                                $search = $query->get();
                                                $toOwner = array();
                                                foreach ($search as $arrEmailRow) {
                                                    $toOwner[] = $arrEmailRow->email;
                                                }
                                                $queryCat = DB::table('adr_d_items');
                                                $queryCat->leftJoin('users', 'adr_d_items.cataloguer_by_id', '=', 'users.user_id');
                                                $queryCat->where('catalog_no',"=",$row->catalog_no);
                                                $searchCat = $queryCat->get();
                                                $toCat = array();
                                                foreach ($searchCat as $arrEmailCat){
                                                    $toCat[] = $arrEmailCat->email ;
                                                }                                                
                                                $message
                                                    ->from($emailSender, 'ABM E-Cataloguing Systems')
                                                    ->to($toOwner, 'ABM E-Cataloguing Systems')
                                                    ->cc($toCat)
                                                    ->bcc('bqsoft77@gmail.com', 'Development')
                                                    ->subject('Request '.$row->transaction_type);
                                            });
                                        }
                                    }
                                }else{
                                    $adrDitems->proc_approver = $row->proc_approver;
                                    $adrDitems->proc_approver_by_id = $user_id;
                                    $adrDitems->proc_approver_date = date("Y-m-d H:i:s");
                                    $adrDitems->items_is_active = $row->proc_approver ;

                                    $setFrom = 'ecat@abm-investama.co.id';
                                    $titlesetFrom = 'ABM E-Cataloguing Systems';
                                    $data = array(
                                        'from'=>$dataUserProfile[0]['email'],
                                        'catalog_no'=>$row->catalog_no,
                                        'short_text'=>$row->short_description,
                                        'regard'=> $dataUserProfile[0]['real_name']
                                    );
                                    $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    $beautymail->send('emails.ProcNotValidate', $data, function($message) use($row) {
                                        $emailSender = Auth::user()->email;
                                        $input = Input::all();
                                        $query = DB::table('vw_catalog_m_owner');
                                        $query->where('catalog_no',"=",$row->catalog_no);
                                        $search = $query->get();
                                        $toOwner = array();
                                        foreach ($search as $arrEmailRow){
                                            $toOwner[] = $arrEmailRow->email ;
                                        }
                                        $queryCat = DB::table('adr_d_items');
                                        $queryCat->leftJoin('users', 'adr_d_items.cataloguer_by_id', '=', 'users.user_id');
                                        $queryCat->where('catalog_no',"=",$row->catalog_no);
                                        $searchCat = $queryCat->get();
                                        $toCat = array();
                                        foreach ($searchCat as $arrEmailCat){
                                            $toCat[] = $arrEmailCat->email ;
                                        }                                        
                                        $message
                                            ->from($emailSender ,'ABM E-Cataloguing Systems')
                                            ->to($toOwner, 'ABM E-Cataloguing Systems')
                                            ->cc($toCat)
                                            ->bcc('bqsoft77@gmail.com', 'Development')
                                            ->subject('Request '.$row->transaction_type);
                                    });
                                }
                            }
                        }
                    }
                    $adrDitems->save();
                    if($row->adr_m_id) {
//                        DB::enableQueryLog();
                        $checkOnProcess = AdrDItemsStatus::select(DB::raw("count(adr_d_items_status.item_status) AS OnProcess"))
                            ->leftJoin('adr_d_items', 'adr_d_items_status.adr_d_items_id', '=', 'adr_d_items.id')
                            ->where('adr_d_items.adr_m_id', '=', $row->adr_m_id)
                            ->where('adr_d_items_status.item_status', '=', 'ON PROCESS')
                            ->get();

                        $checkOrigin = AdrDItemsStatus::select(DB::raw("count(adr_d_items_status.item_status) AS Origin"))
                            ->leftJoin('adr_d_items', 'adr_d_items_status.adr_d_items_id', '=', 'adr_d_items.id')
                            ->where('adr_d_items.adr_m_id', '=', $row->adr_m_id)
                            ->where('adr_d_items_status.item_status', '=', 'ORIGIN')
                            ->get();

                        $cekFNStatus = '';
                        $insertFinish = false;

                        $cekFNStatus = $checkOnProcess[0]['OnProcess'] - $checkOrigin[0]['Origin'];
//                        var_dump($cekFNStatus);
//                        var_dump(DB::getQueryLog());
                        if ($cekFNStatus == 0) {
                            $adrMStatus = new AdrMStatus();
                            $adrMStatus->adr_m_id = $row->adr_m_id;
                            $adrMStatus->adr_status = 'FINISH';
                            $adrMStatus->save();
                        }
                    }
                }
            }
            $message .=  'Process Succes';
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
    public function SyncBatchFiles(Request $request)
    {
        DB::beginTransaction();
        try {
            $message = '';
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id','=',$user_id)
                ->get();
            $levelUser = $dataUserProfile[0]['group_name'];
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
                    $UpdateAdrDItems->sync_created_by = $user_id;
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

   
                $table = "sync_m";
                $primary = "sync_m_no";
                $years = '';
                $prefix = "";
                $sprintf = "%0s";
                $sync_m_no = AutoNumber::autonumber($table, $primary, $prefix, $years, $sprintf);

                $SyncM = new SyncM();
                $SyncM->user_id = $user_id;
                $SyncM->created_at = date("Y-m-d H:i:s");
                $SyncM->sync_m_no = $sync_m_no;
                $SyncM->batch_files = $filename.' ; '.$filename_longtext ;
                $SyncM->save();
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

    public function getSyncM(REQUEST $request)
    {
        $sql = "SELECT sync_m.id, sync_m.user_id,sync_m.sync_m_no, sync_m.batch_files,sync_m.created_at,sync_m.updated_at,users.user_name,users.real_name FROM sync_m left join users on sync_m.user_id = users.user_id" ;
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result,200);
    }

    public function downloadExcel(Request $request)
    {
        $filename = 'MultipleView_'.date('YmdHis');
        Excel::create($filename, function($excel) use ($request) {
            $excel->sheet($request->transaction_type, function($sheet) use ($request)
            {
                $sheet->cell('A1', function($cell) use($request) {$cell->setValue('Mutilple Views '.$request->transaction_type);   });
//                $sheet->setCellValue('B1', $request->adr_no);
//                $sheet->cell('A2', function($cell) use($request) {$cell->setValue('ADR STATUS');   });
//                $sheet->cell('B2', $request->adr_status);
//                $sheet->cell('A3', function($cell) use($request) {$cell->setValue('ADR Date');   });
//                $sheet->cell('B3', $request->created_at);
//                $sheet->cell('A4', function($cell) use($request) {$cell->setValue('Creator');   });
//                $sheet->cell('B4', $request->creator);
                $excelData = array();
                $excelData[] = array(
                    'Catalogue No',
                    'Short Description',
                    'ADR Number',
                    'Addition Date',
                    'SAP No',
                    'SAP Check Date',
                    'SAP Check Name',
                    $request->transaction_type.' Owner',
                    'Submit Date',
                    'Status ADR',
                    'Item Status',
                    'Sync Status',
                    'INC',
                    'MGC',
                    'Long Description',
                    'Raw Data',
                    $request->transaction_type.' Type',
                    'UOM',
                    'Category',
                    'Cataloguer',
                    'Cataloguer Name',
                    'Cataloguer Check Date',
                    'Std App',
                    'Std App Name',
                    'Std App Check Date',
                    'Proc App',
                    'Proc App Name',
                    'Proc App Check Date'
                );
                $sheet->fromArray($excelData, null, 'A5', true, false);
//                $collection = new Collection(json_decode(stripslashes($request->data),true));
//                $data = $collection->toArray();
                $data = json_decode($request->data,true);
                $i=6;
				$c=0;
                foreach ($data as $row){
					$c=0;
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['catalog_no']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['short_description']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['adr_no']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['created_at']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['sap_material_code']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['sap_material_code_date']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['sap_material_code_by']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['owner']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['user_submit_date']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['adr_status']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['item_status']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['sync_status']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['inc']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['groupclass']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['long_description']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['raw']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['material_type']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['uom']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['category']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['cataloguer']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['cataloguer_by']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['cataloguer_date']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['std_approval']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['std_approval_by']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['std_approval_date']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['proc_approver']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['proc_approver_by']));
                    $sheet->setCellValueByColumnAndRow($c++, $i, trim($row['proc_approver_date']));
                    $i++;
                }
            });
        })->store('xlsx', false, true);
        return $filename.'.xlsx';
    }

    //Bigin Off BUg 12
    public function downloadExcel_all(Request $request)
    {   $file="./files/";
        $filename = $file.'MultipleViewAll_'.date('YmdHis').".csv";
        $handle = fopen($filename, 'w+');
        fputcsv($handle, array(
            'Catalogue No',
            'Short Description',
            'ADR Number',
            'Addition Date',
            'SAP No',
            'SAP Check Date',
            'SAP Check Name',
            'Material Owner',
            'Status ADR',
            'Item Status',
            'Sync Status',
            'INC',
            'MGC',
            'Long Description',
            'Raw Data',
            $request->transaction_type.' Type',
            'UOM',
            'Category',
            'Cataloguer',
            'Cataloguer Name',
            'Cataloguer Check Date',
            'Std App',
            'Std App Name',
            'Std App Check Date',
            'Proc App',
            'Proc App Name',
            'Proc App Check Date'
        ));
   $i=0;
        $filternya =$request -> input('transaction_type'); ;
             $datx = array();
             $row = array();
 $sql = "SELECT * FROM vw_mv_catalog_m WHERE items_is_active='Validate' and transaction_type='$filternya' " ;
            $result = BaseModel::buildSql($sql);
            $x=0;
     foreach ( $result as $datx ) {
       if ($x==0) {
        foreach ($datx as $data2){
         $row=(array)$data2;

      fputcsv($handle, array(
            trim($row['catalog_no']),
            trim($row['short_description']), 
            trim($row['adr_no']),
            trim($row['created_at']),
            trim($row['sap_material_code']),
            trim($row['sap_material_code_date']),
            trim($row['sap_material_code_by']),
            trim($row['owner']),
            trim($row['adr_status']), trim($row['item_status']), trim($row['sync_status']), trim($row['inc']),
            trim($row['groupclass']), trim($row['long_description']), trim($row['raw']),
            trim($row['material_type']), trim($row['uom']), trim($row['category']),
            trim($row['cataloguer']), trim($row['cataloguer_by']), trim($row['cataloguer_date']),
            trim($row['std_approval']), trim($row['std_approval_by']), trim($row['std_approval_date']),
            trim($row['proc_approver']), trim($row['proc_approver_by']), trim($row['proc_approver_date'])));
            
            $i++;
         }
      $x++;
        }
         }
           
         $headers = array(
                'Content-Type' => 'text/csv',
            );
fclose($filename);
return Response::download($filename);
     
/*
//  
//$path = storage_path($filename);
//$file="../public/".$filename;
 //   return Response::download($filename, 'tweets.csv', $headers);
 //   fclose($handle);

 $path = storage_path($filename);
$file="./files/template_data Cleansing.xlsx";
return response::download($path ,$filename, $headers); 
*/
}

    //END Off BUg 12



    

}
