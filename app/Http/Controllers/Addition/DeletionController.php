<?php

namespace App\Http\Controllers\Addition;

use App\Models\AdrDItems;
use App\Models\AdrDItemsCrossreferences;
use App\Models\AdrDItemsFuncLoc;
use App\Models\AdrDItemsStatus;
use App\Models\BaseModel;
use App\Models\DeletionAdrDItems;
use App\Models\DeletionAdrDItemsCharacteristic;
use App\Models\DeletionAdrDItemsCrossreferences;
use App\Models\DeletionAdrDItemsFuncLoc;
use App\Models\DeletionAdrDItemsStatus;
use App\Models\Reason;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Helpers\AutoNumber;
use App\Helpers\ArrayToObject;
use DB;
use Illuminate\Support\Facades\Input;
use Illuminate\Foundation\Auth\User;
use UserGroup;
use Auth;

class DeletionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function ArrayToObject($array) {
        if (!is_array($array)) {
            return $array;
        }

        $object = new \stdClass();
        if (is_array($array) && count($array) > 0) {
            foreach ($array as $name=>$value) {
                $name = strtolower(trim($name));
                if (!empty($name)) {
                    $object->$name = $this->ArrayToObject($value);
                }
            }
            return $object;
        }
        else {
            return FALSE;
        }
    }
    public function getMaterialOwner($catno){
        $data =array(); $row = array();$x=0;
        $sql = "SELECT real_name FROM users WHERE user_id IN (SELECT created_by FROM adr_d_items WHERE catalog_no=$catno)";
        $result = BaseModel::buildSql($sql);;
        foreach ($result as $data){
                if ($x==0) {
                   foreach ($data as $data2){
                       $row=(array)$data2;
                       $realname =trim($row['real_name']);
                   }
                   $x++;
                }
          }
        return $realname;
    }
    public function getNote($catno){
        $data =array(); $row = array();$x=0;
        $sql = "SELECT GROUP_CONCAT(notes SEPARATOR '// -') as Note FROM adr_d_items_view_notes WHERE adr_d_items_id IN  (SELECT id FROM adr_d_items WHERE catalog_no=$catno)";
        $result = BaseModel::buildSql($sql);;
        foreach ($result as $data){
            if ($x==0) {
               foreach ($data as $data2){
                   $row=(array)$data2;
                   $note =trim($row['Note']);
               }
               $x++;
            }
      }
    return $note;
    }
    public function getCatagory($catgo){
        $Catgor='Anonymous';
           if ($catgo=='O'){$Catgor='Operation';}
           elseif ($catgo=='H'){$Catgor='Safety';}
           elseif ($catgo=='I'){$Catgor='ITC';}
           elseif ($catgo=='M'){$Catgor='Maintaining';}
           elseif ($catgo=='T'){$Catgor='Trashipment';}
           elseif ($catgo=='G'){$Catgor='Office Supplier';}
           else {$Catgor='Unidentified';}
    
    
            return $catgo.' - '.$Catgor;
        }
    public function getBlockedRequestM(Request $request){
        $sql = "SELECT * FROM vw_deletion_request_m ";
        $result = BaseModel::buildSql($sql);

        return \Response::json($result,200);
    }
    public function getDeletionCatalogM(Request $request){
        $result = array();
        DB::enableQueryLog();
        $query = DeletionAdrDItems::select(DB::raw("*"));
        $query->whereNull('proc_approver');
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
        $query->offset(0)
            ->limit(1)
            ->orderBy('id','DESC');
        $search = $query->get();

        if(count($search) > 0 ){
            $query = DB::table('vw_catalog_m_approval_deletion');
            $query->where($whereParts);
            $query->offset(0)
                ->limit(1)
                ->orderBy('id','DESC');
            $data = $query->get();
            $result = BaseModel::buildMetaData($data,1);
            $result['success'] = true;
        }else{

            $query = DB::table('vw_catalog_m_new_deletion');
            $query->where($whereParts);
            $data = $query->get();
            if(count($data) > 0){
                $str = substr($data[0]->item_status,0,8);
                switch ($str){
                    case "ORIGIN":
                    case "REVISION":
                        $result = BaseModel::buildMetaData($data,1);
                        $result['success'] = true;
                        break;
                    default :
                        $result = array();
                        $result['success'] = true;
                        break;
                }

            }else{
                $result = array();
            }

        }
        return \Response::json($result,200);
    }

    public function SaveItemsBlocked(){
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $adrDitemsUpdate = false ;
            $message ="";
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id','=',$user_id)
                ->get();
            $levelUser = $dataUserProfile[0]['group_name'];

            foreach ($input as $key => $value) {
                $data[$key] = $value;
            }
            $datax = $this->ArrayToObject($data);
            foreach (array($datax) as $row){
                $blocked_adr_d_items = DeletionAdrDItems::select(DB::raw("*"))
                    ->where('id','=',$row->blocked_adr_d_items_id)
                    ->get();
                if(count($blocked_adr_d_items) > 0){
                    $update_blocked_adr_d_items = DeletionAdrDItems::find($row->blocked_adr_d_items_id);
                    foreach ($row as $field=>$value){
                        $check = substr($value, 0, 6);
                        if($field !=='_token' ){
                            if($field !=='blocked_adr_d_items_id' ) {
                                if($field !=='reason' ) {
                                    if($field !=='updated_by' ) {
                                        if ($field !== 'items_is_active') {
                                            if ($field !== 'requesttype') {
                                                if ($field !== 'item_status') {
                                                    if ($field !== 'adr_status') {
                                                        if ($field !== 'items_characteristic') {
                                                            if ($field !== 'cataloguer') {
                                                                if ($field !== 'cataloguer_by') {
                                                                    if ($field !== 'std_approval') {
                                                                        if ($field !== 'std_approval_by') {
                                                                            if ($field !== 'sap_material_code_by') {
                                                                                if ($field !== 'proc_approver') {
                                                                                    if ($field !== 'proc_approver_by') {
                                                                                        if (!empty($value || $value !== NULL)) {
                                                                                            if ($check !== 'Select') {
                                                                                                $update_blocked_adr_d_items->$field = $value;
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
                        if ($field == 'items_is_active') {
                            if($levelUser == 'User'){
                                $update_blocked_adr_d_items->items_is_active = 'Validate' ;
                                $update_blocked_adr_d_items->updated_by = $user_id;
                                
                                $senderName  = Auth::user()->real_name;
                                $emailSender = Auth::user()->email;

                                $update_blocked_adr_d_items->category = $row->category ;
                                $update_blocked_adr_d_items->updated_by = $user_id ;
                                $update_blocked_adr_d_items->updated_at = date("Y-m-d H:i:s") ;

                                $update_blocked_adr_d_items->cataloguer = null ;
                                $update_blocked_adr_d_items->cataloguer_by_id = null ;
                                $update_blocked_adr_d_items->cataloguer_date = null ;

                                $update_blocked_adr_d_items->std_approval = null ;
                                $update_blocked_adr_d_items->std_approval_by_id = null;
                                $update_blocked_adr_d_items->std_approval_date = null ;

                                $update_blocked_adr_d_items->proc_approver = null;
                                $update_blocked_adr_d_items->proc_approver_by_id = null;
                                $update_blocked_adr_d_items->proc_approver_date = null ;

                                $mat_owner =self::getMaterialOwner($row->catalog_no);
                                $Note= self::getNote($row->catalog_no);
                                $KataGot=self::getCatagory($row->category);
    
                                $setFrom = 'ecat@abm-investama.co.id';
                                $titlesetFrom = 'ABM E-Cataloguing Systems';
                                $data = array(
                                    'from'=>$emailSender,
                                    'catalog_no'=>$row->catalog_no,
                                    'short_text'=>$row->short_description,
                                    'Catagory'=>$KataGot,
                                'mat_owner'=>$mat_owner,
                                'Note'=>$Note,
                                    'regard'=> $senderName
                                );
                                // $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                // $beautymail->send('emails.UserRequest', $data, function($message) use($row)
                                // {
                                //     $emailSender = Auth::user()->email;
                                //     $to = User::select(DB::raw("users.*"))
                                //         ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                                //         ->leftJoin('companies_m', 'users.companies_m_id', '=', 'companies_m.id')
                                //         ->where('group_name','=','Cat')
                                //         ->where('users.companies_m_id','=',Auth::user()->companies_m_id)
                                //         ->get();
                                //     $toCatalogue = array();
                                //     foreach ($to as $arrEmailRow){
                                //         $toCatalogue[] = $arrEmailRow->email ;
                                //     }

                                //     $message->from($emailSender ,'ABM E-Cataloguing Systems')
                                //         ->to($toCatalogue, 'ABM E-Cataloguing Systems')
                                //         //->bcc('bqsoft77@gmail.com', 'Development')
                                //         ->subject('Request Blocked '.$row->transaction_type);
                                // });
                            }
                            if($levelUser == 'Cat'){
                                if($row->cataloguer == 'Validate') {
                                    $update_blocked_adr_d_items->cataloguer = $row->cataloguer;
                                    $update_blocked_adr_d_items->cataloguer_by_id = $user_id;
                                    $update_blocked_adr_d_items->cataloguer_date = date("Y-m-d H:i:s");
                                    $update_blocked_adr_d_items->items_is_active = $row->cataloguer;
                                    $update_blocked_adr_d_items->updated_by = $user_id;
                                    $mat_owner =self::getMaterialOwner($row->catalog_no);
                                    $Note= self::getNote($row->catalog_no);
                                    $KataGot=self::getCatagory($row->category);        
                                    $setFrom = 'ecat@abm-investama.co.id';
                                    $titlesetFrom = 'ABM E-Cataloguing Systems';
                                    $data = array(
                                        'from' => $dataUserProfile[0]['email'],
                                        'catalog_no' => $row->catalog_no,
                                        'short_text' => $row->short_description,
                                        'Catagory'=>$KataGot,
                                        'mat_owner'=>$mat_owner,
                                        'Note'=>$Note,
                                        'regard' => $dataUserProfile[0]['real_name']
                                    );
                                    // $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    // $beautymail->send('emails.CatValidate', $data, function ($message) use($row)  {
                                    //     $input = Input::all();
                                    //     $emailSender = Auth::user()->email;
                                    //     $type = $input['category'];
                                    //     $sttdApp = 'Std App ' . $type;
                                    //     $to = User::select(DB::raw("users.*"))
                                    //         ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                                    //         ->where('group_name', '=', $sttdApp)
                                    //         ->get();
                                    //     $toStdApp = array();
                                    //     foreach ($to as $arrEmailRow) {
                                    //         $toStdApp[] = $arrEmailRow->email;
                                    //     }
                                    //     $message
                                    //         ->from($emailSender, 'ABM E-Cataloguing Systems')
                                    //         ->to($toStdApp, 'ABM E-Cataloguing Systems')
                                    //         //->bcc('bqsoft77@gmail.com', 'Development')
                                    //         ->subject('Request Blocked '.$row->transaction_type);
                                    // });
                                }else{
                                    $update_blocked_adr_d_items->cataloguer = $row->cataloguer ;
                                    $update_blocked_adr_d_items->cataloguer_by_id = $user_id ;
                                    $update_blocked_adr_d_items->cataloguer_date = date("Y-m-d H:i:s") ;
                                    $update_blocked_adr_d_items->items_is_active = $row->cataloguer ;
                                    $update_blocked_adr_d_items->updated_by = $user_id;

                                    if($dataUserProfile[0]['group_name'] == 'Cat'){
                                        $mat_owner =self::getMaterialOwner($row->catalog_no);
                                        $Note= self::getNote($row->catalog_no);
                                        $KataGot=self::getCatagory($row->category);            
                                        $setFrom = 'ecat@abm-investama.co.id';
                                        $titlesetFrom = 'ABM E-Cataloguing Systems';
                                        $data = array(
                                            'from'=>$dataUserProfile[0]['email'],
                                            'catalog_no'=>$row->catalog_no,
                                            'short_text'=>$row->short_description,
                                            'Catagory'=>$KataGot,
                                            'mat_owner'=>$mat_owner,
                                            'Note'=>$Note,
                                            'regard'=> $dataUserProfile[0]['real_name']
                                        );
                                        // $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                        // $beautymail->send('emails.CatNotValidate', $data, function($message) use($row)
                                        // {
                                        //     $emailSender = Auth::user()->email;
                                        //     $input = Input::all();
                                        //     $query = DB::table('vw_catalog_m_owner');
                                        //     $query->where('catalog_no',"=",$row->catalog_no);
                                        //     $search = $query->get();
                                        //     $toOwner = array();
                                        //     foreach ($search as $arrEmailRow){
                                        //         $toOwner[] = $arrEmailRow->email ;
                                        //     }
                                        //     $message
                                        //         ->from($emailSender ,'ABM E-Cataloguing Systems')
                                        //         ->to($toOwner, 'ABM E-Cataloguing Systems')
                                        //         //->bcc('bqsoft77@gmail.com', 'Development')
                                        //         ->subject('Request Blocked '.$row->transaction_type);
                                        // });
                                    }
                                }
                            }
                            if(substr(strtolower($levelUser),0,3) == 'std'){
                                if($row->std_approval == 'Validate') {
                                    $update_blocked_adr_d_items->std_approval = $row->std_approval;
                                    $update_blocked_adr_d_items->std_approval_by_id = $user_id;
                                    $update_blocked_adr_d_items->std_approval_date = date("Y-m-d H:i:s");
                                    $update_blocked_adr_d_items->items_is_active = $row->std_approval ;
                                    $update_blocked_adr_d_items->updated_by = $user_id;
                                    $mat_owner =self::getMaterialOwner($row->catalog_no);
                                    $Note= self::getNote($row->catalog_no);
                                    $KataGot=self::getCatagory($row->category);
        
                                    $setFrom = 'ecat@abm-investama.co.id';
                                    $titlesetFrom = 'ABM E-Cataloguing Systems';
                                    $data = array(
                                        'from' => $dataUserProfile[0]['email'],
                                        'catalog_no' => $row->catalog_no,
                                        'short_text' => $row->short_description,
                                        'std' => $levelUser,
                                        'Catagory'=>$KataGot,
                                        'mat_owner'=>$mat_owner,
                                        'Note'=>$Note,
                                        'regard' => $dataUserProfile[0]['real_name']
                                    );
                                    // $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    // $beautymail->send('emails.StdAppValidate', $data, function ($message) use($row) {
                                    //     $emailSender = Auth::user()->email;
                                    //     $to = User::select(DB::raw("users.*"))
                                    //         ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                                    //         ->where('group_name', '=', 'Proc')
                                    //         ->get();
                                    //     $toProc = array();
                                    //     foreach ($to as $arrEmailRow) {
                                    //         $toProc[] = $arrEmailRow->email;
                                    //     }
                                    //     $message
                                    //         ->from($emailSender, 'ABM E-Cataloguing Systems')
                                    //         ->to($toProc, 'ABM E-Cataloguing Systems')
                                    //         //->bcc('bqsoft77@gmail.com', 'Development')
                                    //         ->subject('Request Blocked '.$row->transaction_type);
                                    // });
                                }else{

                                    $update_blocked_adr_d_items->std_approval = $row->std_approval;
                                    $update_blocked_adr_d_items->std_approval_by_id = $user_id;
                                    $update_blocked_adr_d_items->std_approval_date = date("Y-m-d H:i:s");
                                    $update_blocked_adr_d_items->items_is_active = $row->std_approval ;
                                    $update_blocked_adr_d_items->updated_by = $user_id;
                                    $mat_owner =self::getMaterialOwner($row->catalog_no);
                                    $Note= self::getNote($row->catalog_no);
                                    $KataGot=self::getCatagory($row->category);
        
                                    $setFrom = 'ecat@abm-investama.co.id';
                                    $titlesetFrom = 'ABM E-Cataloguing Systems';
                                    $data = array(
                                        'from'=>$dataUserProfile[0]['email'],
                                        'catalog_no'=>$row->catalog_no,
                                        'short_text'=>$row->short_description,
                                        'Catagory'=>$KataGot,
                                        'mat_owner'=>$mat_owner,
                                        'Note'=>$Note,
                                        'regard'=> $dataUserProfile[0]['real_name']
                                    );
                                    // $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    // $beautymail->send('emails.StdAppNotValidate', $data, function($message) use($row)
                                    // {
                                    //     $emailSender = Auth::user()->email;
                                    //     $input = Input::all();
                                    //     $query = DB::table('vw_catalog_m_owner');
                                    //     $query->where('catalog_no',"=",$row->catalog_no);
                                    //     $search = $query->get();
                                    //     $toOwner = array();
                                    //     foreach ($search as $arrEmailRow){
                                    //         $toOwner[] = $arrEmailRow->email ;
                                    //     }
                                    //     $message
                                    //         ->from($emailSender ,'ABM E-Cataloguing Systems')
                                    //         ->to($toOwner, 'ABM E-Cataloguing Systems')
                                    //         //->bcc('bqsoft77@gmail.com', 'Development')
                                    //         ->subject('Request Blocked '.$row->transaction_type);
                                    // });
                                }
                            }
                            if($levelUser == 'Proc'){
                                if($row->proc_approver == 'Validate') {
                                    $update_blocked_adr_d_items->proc_approver = $row->proc_approver;
                                    $update_blocked_adr_d_items->proc_approver_by_id = $user_id;
                                    $update_blocked_adr_d_items->proc_approver_date = date("Y-m-d H:i:s");
                                    $update_blocked_adr_d_items->items_is_active = $row->proc_approver;
                                    $update_blocked_adr_d_items->updated_by = $user_id;

                                    $adrDItemsStatus = new AdrDItemsStatus();
                                    $adrDItemsStatus->adr_d_items_id = $row->adr_d_items_id;
                                    $adrDItemsStatus->item_status = 'BLOCKED';
                                    $adrDItemsStatus->save();
                                    $mat_owner =self::getMaterialOwner($row->catalog_no);
                                    $Note= self::getNote($row->catalog_no);
                                    $KataGot=self::getCatagory($row->category);
        
                                    $setFrom = 'ecat@abm-investama.co.id';
                                    $titlesetFrom = 'ABM E-Cataloguing Systems';
                                    $data = array(
                                        'from' => $dataUserProfile[0]['email'],
                                        'catalog_no' => $row->catalog_no,
                                        'sap_material_code' => $row->sap_material_code,
                                        'short_text' => $row->short_description,
                                        'status' => 'BLOCKED',
                                        'Catagory'=>$KataGot,
                                        'mat_owner'=>$mat_owner,
                                        'Note'=>$Note,
                                        'regard' => $dataUserProfile[0]['real_name']
                                    );
                                    // $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    // $beautymail->send('emails.ProcStatusValidate', $data, function ($message) use($row) {
                                    //     $emailSender = Auth::user()->email;
                                    //     $input = Input::all();
                                    //     $query = DB::table('vw_catalog_m_owner');
                                    //     $query->where('catalog_no',"=",$row->catalog_no);
                                    //     $search = $query->get();
                                    //     $toOwner = array();
                                    //     foreach ($search as $arrEmailRow){
                                    //         $toOwner[] = $arrEmailRow->email ;
                                    //     }
                                    //     $message
                                    //         ->from($emailSender ,'ABM E-Cataloguing Systems')
                                    //         ->to($toOwner, 'ABM E-Cataloguing Systems')
                                    //         //->bcc('bqsoft77@gmail.com', 'Development')
                                    //         ->subject('Request Blocked '.$row->transaction_type);
                                    // });

                                }else{
                                    $update_blocked_adr_d_items->proc_approver = $row->proc_approver;
                                    $update_blocked_adr_d_items->proc_approver_by_id = $user_id;
                                    $update_blocked_adr_d_items->proc_approver_date = date("Y-m-d H:i:s");
                                    $update_blocked_adr_d_items->items_is_active = $row->proc_approver ;
                                    $update_blocked_adr_d_items->updated_by = $user_id;
                                    $mat_owner =self::getMaterialOwner($row->catalog_no);
                                    $Note= self::getNote($row->catalog_no);
                                    $KataGot=self::getCatagory($row->category);
        
                                    $setFrom = 'ecat@abm-investama.co.id';
                                    $titlesetFrom = 'ABM E-Cataloguing Systems';
                                    $data = array(
                                        'from'=>$dataUserProfile[0]['email'],
                                        'catalog_no'=>$row->catalog_no,
                                        'short_text'=>$row->short_description,
                                        'Catagory'=>$KataGot,
                                        'mat_owner'=>$mat_owner,
                                        'Note'=>$Note,
                                        'regard'=> $dataUserProfile[0]['real_name']
                                    );
                                    // $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    // $beautymail->send('emails.ProcNotValidate', $data, function($message) use($row)
                                    // {
                                    //     $emailSender = Auth::user()->email;
                                    //     $input = Input::all();
                                    //     $query = DB::table('vw_catalog_m_owner');
                                    //     $query->where('catalog_no',"=",$row->catalog_no);
                                    //     $search = $query->get();
                                    //     $toOwner = array();
                                    //     foreach ($search as $arrEmailRow){
                                    //         $toOwner[] = $arrEmailRow->email ;
                                    //     }
                                    //     $message
                                    //         ->from($emailSender ,'ABM E-Cataloguing Systems')
                                    //         ->to($toOwner, 'ABM E-Cataloguing Systems')
                                    //         //->bcc('bqsoft77@gmail.com', 'Development')
                                    //         ->subject('Request Blocked '.$row->transaction_type);
                                    // });
                                }
                            }

                        }
                        if($field == 'reason'){
                            $Reason = new Reason();
                            $Reason->table_name = 'deletion_adr_d_items';
                            $Reason->table_id = $row->blocked_adr_d_items_id;
                            $Reason->description = $row->reason;
                            $Reason->created_by = $user_id;
                            $Reason->save();
                        }
                    }
                    $update_blocked_adr_d_items->save();
                }else{
                    $message .= 'Created ';
                    $table="deletion_adr_d_items_status";
                    $primary="request_no".$input['catalog_no'];
                    $years='';
                    $prefix='Block.'.$input['catalog_no'].'.';
                    $sprintf="%02s";
                    $request_no =AutoNumber::autonumber($table,$primary,$prefix,$years,$sprintf);
                    $addRevDitems = array();
                    $add_blocked_adr_d_items = new DeletionAdrDItems();
                    $add_blocked_adr_d_items->request_no = $request_no;
                    $add_blocked_adr_d_items->updated_by = $user_id;
                    foreach ($row as $field=>$value){
                        $check = substr($value, 0, 6);
                        if($field !=='_token' ){
                            if($field !=='blocked_adr_d_items_id' ) {
                                if ($field !== 'reason') {
                                    if ($field !== 'requesttype') {
                                        if ($field !== 'item_status') {
                                            if ($field !== 'adr_status') {
                                                if ($field !== 'items_characteristic') {
                                                    if ($field !== 'updated_by') {
                                                        if ($field !== 'cataloguer_by') {
                                                            if ($field !== 'sap_material_code_by') {
                                                                if ($field !== 'proc_approver_by') {
                                                                    if (!empty($value || $value !== NULL)) {
                                                                        if ($check !== 'Select') {
                                                                            $add_blocked_adr_d_items->$field = $value;
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
                        if ($field == 'items_is_active') {
                            if ($levelUser == 'User') {
                                $add_blocked_adr_d_items->items_is_active = 'Validate';
                                $add_blocked_adr_d_items->updated_by = $user_id;
                                $senderName = Auth::user()->real_name;
                                $emailSender = Auth::user()->email;

                                $add_blocked_adr_d_items->category = $row->category;
                                $add_blocked_adr_d_items->updated_by = $user_id;
                                $add_blocked_adr_d_items->updated_at = date("Y-m-d H:i:s");

                                $add_blocked_adr_d_items->cataloguer = null;
                                $add_blocked_adr_d_items->cataloguer_by_id = null;
                                $add_blocked_adr_d_items->cataloguer_date = null;

                                $add_blocked_adr_d_items->std_approval = null;
                                $add_blocked_adr_d_items->std_approval_by_id = null;
                                $add_blocked_adr_d_items->std_approval_date = null;

                                $add_blocked_adr_d_items->proc_approver = null;
                                $add_blocked_adr_d_items->proc_approver_by_id = null;
                                $add_blocked_adr_d_items->proc_approver_date = null;
                                $mat_owner =self::getMaterialOwner($row->catalog_no);
                                $Note= self::getNote($row->catalog_no);
                                $KataGot=self::getCatagory($row->category);
    
                                $setFrom = 'ecat@abm-investama.co.id';
                                $titlesetFrom = 'ABM E-Cataloguing Systems';
                                $data = array(
                                    'from' => $emailSender,
                                    'catalog_no' => $row->catalog_no,
                                    'short_text' => $row->short_description,
                                    'Catagory'=>$KataGot,
                                    'mat_owner'=>$mat_owner,
                                    'Note'=>$Note,
                                    'regard' => $senderName
                                );
                                // $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                // $beautymail->send('emails.UserRequest', $data, function ($message) use ($row) {
                                //     $emailSender = Auth::user()->email;
                                //     $to = User::select(DB::raw("users.*"))
                                //         ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                                //         ->leftJoin('companies_m', 'users.companies_m_id', '=', 'companies_m.id')
                                //         ->where('group_name', '=', 'Cat')
                                //         ->where('users.companies_m_id', '=', Auth::user()->companies_m_id)
                                //         ->get();
                                //     $toCatalogue = array();
                                //     foreach ($to as $arrEmailRow) {
                                //         $toCatalogue[] = $arrEmailRow->email;
                                //     }

                                //     $message->from($emailSender, 'ABM E-Cataloguing Systems')
                                //         ->to($toCatalogue, 'ABM E-Cataloguing Systems')
                                //         //->bcc('bqsoft77@gmail.com', 'Development')
                                //         ->subject('Request Blocked '.$row->transaction_type);
                                // });
                            }
                        }

                    }

                    $add_blocked_adr_d_items->save();
                    $blocked_adr_d_items_id = $add_blocked_adr_d_items->id;

                    $table="revision_adr_d_items_status";
                    $primary="catalog_no".$row->catalog_no;
                    $years='';
                    $prefix='BLOCKED ';
                    $sprintf="";
                    $blocked_adr_d_items_status =AutoNumber::autonumber($table,$primary,$prefix,$years,$sprintf);

                    $revAdrDItemsStatus= new DeletionAdrDItemsStatus();
                    $revAdrDItemsStatus->deletion_adr_d_items_id = $blocked_adr_d_items_id;
                    $revAdrDItemsStatus->item_status =$blocked_adr_d_items_status;
                    $revAdrDItemsStatus->save();

                    if($row->reason){
                        $Reason = new Reason();
                        $Reason->table_name = 'deletion_adr_d_items';
                        $Reason->table_id = $blocked_adr_d_items_id;
                        $Reason->description = $row->reason;
                        $Reason->created_by = $user_id;
                        $Reason->save();
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
    public function getBlockedItemsIncCharacteristics(Request $request){
        $items_inc_char = DB::table('vw_adr_items_characteristic')
            ->where('vw_adr_items_characteristic.inc_m_id',$request->inc_m_id)
            ->where('vw_adr_items_characteristic.adr_d_items_id',$request->adr_d_items_id)
            ->orderBy('vw_adr_items_characteristic.sequence', 'asc')
            ->get();
        if(count($items_inc_char) > 0){
            $result = BaseModel::buildMetaData($items_inc_char,500);
        }else{
            $result = [];
        }
        return \Response::json($result,200);
    }
    public function getBlockedItemsCrossReferences(Request $request){
        $sql = "SELECT * FROM vw_adr_items_crossreferences" ;
        $result = BaseModel::buildSql($sql);
        return \Response::json($result,200);
    }
    public function getBlockedItemsFuncloc(Request $request){
        $sql = "SELECT * FROM adr_d_items_funcloc" ;
        $result = BaseModel::buildSql($sql);
        return \Response::json($result,200);
    }
    public function getBlockedItemsViewNotes(Request $request){
    }

}
