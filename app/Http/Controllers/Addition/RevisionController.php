<?php

namespace App\Http\Controllers\Addition;

use App\Models\AdrDItemsCrossreferences;
use App\Models\AuditAdrDItems;
use App\Models\AuditAdrDItemsCharacteristics;
use App\Models\AuditAdrDItemsCrossreferences;
use App\Models\AuditAdrDItemsFuncLoc;
use App\Models\EloquentBaseModel;
use App\Models\Reason;
use App\Models\RevisionAdrDItems;
use App\Models\RevisionAdrDItemsCharacteristic;
use App\Models\RevisionAdrDItemsCrossreferences;
use App\Models\RevisionAdrDItemsFuncloc;
use App\Models\RevisionAdrDItemsStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Input;
use Response;

use Validator;
use App\Helpers\AutoNumber;
use App\Http\Controllers\Controller;
use App\Models\AdrM;
use App\Models\AdrMStatus;
use App\Models\AdrDItems ;
use App\Models\AdrDItemsStatus ;
use App\Models\AdrDItemsCcrossreferences ;
use App\Models\AdrDItemsFuncLoc;
use App\Models\IncCharacteristics;
use App\Models\AdrDItemsCharacteristics;
// use User;
use Illuminate\Foundation\Auth\User;
use UserGroup;
use Auth ;
use DB;
use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;

class RevisionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function getRevisionRequestM(){
        DB::enableQueryLog();

        $sql = "SELECT * FROM vw_revision_request_m ";
        $result = BaseModel::buildSql($sql);
        // var_dump(DB::getQueryLog());

        return \Response::json($result,200);
    }
    public function getRevisionRequestD(){

        $sql = "SELECT * FROM vw_revision_detail ";
        $result = BaseModel::buildSql($sql);

        return \Response::json($result,200);
    }
    public function getAuditAdrDItems(){

        $sql = "SELECT * FROM vw_history_adr_d_items ";
        $result = BaseModel::buildSql($sql);

        return \Response::json($result,200);
    }
    public function getRevisionAdrDItemsChar(){

        $sql = "SELECT
                    a.id,
                    a.inc_characteristics_id,
                    revision_adr_d_items_id,
                    a.mrcode,
                    b.characteristics,
                    a.nvalue
                FROM
                    `revision_adr_d_items_characteristic` a
                LEFT JOIN inc_characteristics b ON a.inc_characteristics_id = b.id";
        $result = BaseModel::buildSql($sql);

        return \Response::json($result,200);
    }
    public function getAuditAdrDItemsChar(REQUEST $request){

        // $sql = "SELECT
        //             a.id,
        //             a.inc_characteristics_id,
        //             revision_adr_d_items_id,
        //             a.mrcode,
        //             b.characteristics,
        //             a.nvalue
                    
        //         FROM
        //             `audit_adr_d_items_characteristic` a
        //         LEFT JOIN inc_characteristics b ON a.inc_characteristics_id = b.id";
        // $result = BaseModel::buildSql($sql);
        $items_inc_char = DB::table('vw_audit_adr_items_characteristic')
                                ->where('vw_audit_adr_items_characteristic.adr_d_items_id',$request->adr_d_items_id)
                                ->where('vw_audit_adr_items_characteristic.revision_adr_d_items_id',$request->revision_adr_d_items_id)
                                ->orderBy('vw_audit_adr_items_characteristic.sequence', 'asc')
                                ->get();
        if(count($items_inc_char) > 0){
            $result = BaseModel::buildMetaData($items_inc_char,500);
        }

        return \Response::json($result,200);
    }
    public function getRevisionCatalogM(Request $request){
        DB::enableQueryLog();
        $query = RevisionAdrDItems::select(DB::raw("*"));
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
//            $result = BaseModel::buildMetaData($search,10);
            $query = DB::table('vw_catalog_m_approval_revision');
            $query->where($whereParts);
            $query->offset(0)
                ->limit(1)
                ->orderBy('id','DESC');
            $data = $query->get();
            $result = BaseModel::buildMetaData($data,1);
            $result['success'] = true;
        }else{
            $query = DB::table('vw_catalog_m_new_revision');
            $query->where($whereParts);
//            $query->offset(0)
//                  ->limit(1)
//                  ->orderBy('id','DESC');
            $data = $query->get();
//            var_dump($data[0]);
//            var_dump( DB::getQueryLog());
            if(count($data) > 0){
                $str = substr($data[0]->item_status,0,8);
//                var_dump($str);
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

    public function SaveItemsRevision(Request $request){
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $adrDitemsUpdate = false ;
            $message ="";
            $email = true;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id','=',$user_id)
                ->get();
            $levelUser = $dataUserProfile[0]['group_name'];
            foreach ($input as $key => $value) {
                $data[$key] = $value;
            }
            $rev_adr_d_items = array($data);
            foreach ($rev_adr_d_items as $row){
                if(empty($row['revision_adr_d_items_id'])){
                    $message .= 'Created ';
                    $table="revision_adr_d_items_status";
                    $primary="request_no".$input['catalog_no'];
                    $years='';
                    $prefix='Rev.'.$input['catalog_no'].'.';
                    $sprintf="%02s";
                    $request_no =AutoNumber::autonumber($table,$primary,$prefix,$years,$sprintf);
                    $addRevDitems = array();
                    $add_rev_adr_d_items = new RevisionAdrDItems();
                    $add_rev_adr_d_items->request_no = $request_no;
                    $add_rev_adr_d_items->updated_by = $user_id;
                    foreach ($row as $field=>$value){
                        $check = substr($value, 0, 6);
                        if($field !=='_token' ){
                            if($field !=='requesttype' ) {
                                if ($field !== 'id') {
                                    if ($field !== 'item_status') {
                                        if ($field !== 'adr_status') {
                                            if ($field !== 'items_characteristic') {
                                                if ($field !== 'cataloguer_by') {
                                                    if ($field !== 'updated_by') {
                                                        if ($field !== 'sap_material_code_by') {
                                                            if ($field !== 'proc_approver_by') {
                                                                if ($field !== 'reason') {
                                                                    if (!empty($value || $value !== NULL)) {
                                                                        if ($check !== 'Select') {
                                                                         if ($field !== 'User_ID') {
                                                                            $add_rev_adr_d_items->$field = $value;
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
                            if ($levelUser == 'User') {
                                $add_rev_adr_d_items->items_is_active = 'Validate';
                                $senderName = Auth::user()->real_name;
                                $emailSender = Auth::user()->email;

                                $add_rev_adr_d_items->cataloguer = null;
                                $add_rev_adr_d_items->cataloguer_by_id = null;
                                $add_rev_adr_d_items->cataloguer_date = null;

                                $add_rev_adr_d_items->std_approval = null;
                                $add_rev_adr_d_items->std_approval_by_id = null;
                                $add_rev_adr_d_items->std_approval_date = null;

                                $add_rev_adr_d_items->proc_approver = null;
                                $add_rev_adr_d_items->proc_approver_by_id = null;
                                $add_rev_adr_d_items->proc_approver_date = null;

                                $mat_owner =self::getMaterialOwner($row['catalog_no']);
                                $Note= self::getNote($row['catalog_no']);
                                $KataGot=self::getCatagory($row['category']);
                                
                                $setFrom = 'ecat@abm-investama.co.id';
                                $titlesetFrom = 'ABM E-Cataloguing Systems';
                                $data = array(
                                    'from' => $emailSender,
                                    'catalog_no' => $row['catalog_no'],
                                    'short_text' => $row['short_description'],
                                    'Catagory'=>$KataGot,
                                    'Note'=>$Note,
                                    'mat_owner'=>$mat_owner,
                                    'regard' => $senderName
                                );
                                // if($email) {
                                //     $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                //     $beautymail->send('emails.UserRequest', $data, function ($message) use ($row) {
                                //         $emailSender = Auth::user()->email;
                                //         $to = User::select(DB::raw("users.*"))
                                //             ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                                //             ->leftJoin('companies_m', 'users.companies_m_id', '=', 'companies_m.id')
                                //             ->where('group_name', '=', 'Cat')
                                //             ->where('users.companies_m_id', '=', Auth::user()->companies_m_id)
                                //             ->get();
                                //         $toCatalogue = array();
                                //         foreach ($to as $arrEmailRow) {
                                //             $toCatalogue[] = $arrEmailRow->email;
                                //         }

                                //         $message->from($emailSender, 'ABM E-Cataloguing Systems')
                                //             ->to($toCatalogue, 'ABM E-Cataloguing Systems')
                                //             //->bcc('bqsoft77@gmail.com', 'Development')
                                //             ->subject('Request Revision ' . $row['transaction_type']);
                                //     });
                                // }
                            }
                        }

                    }

                    $add_rev_adr_d_items->save();
                    $rev_adr_d_items_id = $add_rev_adr_d_items->id;

                    if($row['adr_d_items_id']){
                        $CheckAdrDitems = AdrDItems::select(DB::raw("*"))
                            ->where('id', '=', $row['adr_d_items_id'])
                            ->get();
                        if(count($CheckAdrDitems) > 0 ){
                            $AddAuditAdrDItems = new AuditAdrDItems();
                            foreach ($CheckAdrDitems->first()->getOriginal() as $field=>$value){
                                if($field !== 'id') {
                                    if ($field !== 'is_status') {
                                        $AddAuditAdrDItems->$field = $value;
                                    }
                                }
                                if($field == 'id'){
                                    $AddAuditAdrDItems->adr_d_items_id = $value;
                                }
                            }
                            $AddAuditAdrDItems->revision_adr_d_items_id = $rev_adr_d_items_id;
                            $AddAuditAdrDItems->save();
                        }
                        $CheckAdrDItemsCharacteristic = AdrDItemsCharacteristics::select(DB::raw("*"))
                                                                                ->where('adr_d_items_id', '=', $row['adr_d_items_id'])
                                                                                ->get();
                        if(count($CheckAdrDItemsCharacteristic) > 0){

                            foreach ($CheckAdrDItemsCharacteristic as $rowChars){
                                $AddAdrDItemsCharacteristics = new AuditAdrDItemsCharacteristics();
                                foreach ($rowChars->getAttributes() as $field=>$value) {
                                    if($field !== 'id') {
                                        $AddAdrDItemsCharacteristics->$field = $value;
                                    }
                                }
                                $AddAdrDItemsCharacteristics->revision_adr_d_items_id = $rev_adr_d_items_id;
                                $AddAdrDItemsCharacteristics->save();
                            }

                        }
                    }

                    $table="revision_adr_d_items_status";
                    $primary="catalog_no".$row['catalog_no'];
                    $years='';
                    $prefix='REVISION ';
                    $sprintf="%01s";
                    $rev_adr_d_items_status =AutoNumber::autonumber($table,$primary,$prefix,$years,$sprintf);

                    $revAdrDItemsStatus= new RevisionAdrDItemsStatus();
                    $revAdrDItemsStatus->revision_adr_d_items_id = $rev_adr_d_items_id;
                    $revAdrDItemsStatus->item_status =$rev_adr_d_items_status;
                    $revAdrDItemsStatus->save();
                    if ($row['items_characteristic'] != '[]'){
                        $sql_d_items_char = array();
                        $updates_d_items_char = array();
                        $material_char = json_decode(stripslashes($row['items_characteristic']));
                        $ii=1;
                        $count_m = 0 ;
                        foreach ($material_char as $arrCharRow){
                            $arrRow= array();
                            foreach ($arrCharRow as $head=>$value){
                                if($head !== 'inc'){
                                    if($head !== 'type'){
                                        if($head !== 'characteristics'){
                                            if($head !== 'flag'){
                                                if($head !== 'sequence'){
                                                    $col[] =  '`'.$head.'`';
                                                    $val[] = "'".$value."'";
                                                    $arrRow[$head] = $value;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            $sql_d_items_char[] =$arrRow;
                            $AddRevisionAdrDItemsCharacteristic = new RevisionAdrDItemsCharacteristic();
                            foreach ($sql_d_items_char as $rowItemsChar){
                                $AddRevisionAdrDItemsCharacteristic->revision_adr_d_items_id = $rev_adr_d_items_id;
                                $AddRevisionAdrDItemsCharacteristic->catalog_no = $row['catalog_no'];
                                $AddRevisionAdrDItemsCharacteristic->inc_m_id = $rowItemsChar['inc_m_id'];
                                $AddRevisionAdrDItemsCharacteristic->inc_characteristics_id = $rowItemsChar['id'];
                                $AddRevisionAdrDItemsCharacteristic->mrcode = $rowItemsChar['mrcode'];
                                $AddRevisionAdrDItemsCharacteristic->nvalue = $rowItemsChar['nvalue'];
                            }
                            $AddRevisionAdrDItemsCharacteristic->save();

                        }
                    }
                    $checkCrossreferencesOld = AdrDItemsCrossreferences::select(DB::raw("*"))
                                                                        ->where('adr_d_items_id', '=', $row['adr_d_items_id'])
                                                                        ->get();
                    $iCross = 0;
                    foreach ($checkCrossreferencesOld as $rowItemsCrossreference) {
                        $AddRevisionAdrDItemsCrossreferences = new RevisionAdrDItemsCrossreferences();
                        $AddRevisionAdrDItemsCrossreferences->revision_adr_d_items_id = $rev_adr_d_items_id;
                        $AddRevisionAdrDItemsCrossreferences->refno = $rowItemsCrossreference['refno'];
                        $AddRevisionAdrDItemsCrossreferences->manufactur = $rowItemsCrossreference['manufactur'];
                        $AddRevisionAdrDItemsCrossreferences->old_material_code = $rowItemsCrossreference['old_material_code'];
                        $AddRevisionAdrDItemsCrossreferences->type = $rowItemsCrossreference['type'];
                        $AddRevisionAdrDItemsCrossreferences->save();
                        $iCross++;
                    }
                    $checkFuncLocOld = AdrDItemsFuncLoc::select(DB::raw("*"))
                                                        ->where('adr_d_items_id', '=', $row['adr_d_items_id'])
                                                        ->get();
                    $iFuncLoc = 0;
                    foreach ($checkFuncLocOld as $rowItemsFuncLoc) {
                        $AddAdrDItemsFuncLoc = new RevisionAdrDItemsFuncloc();
                        $AddAdrDItemsFuncLoc->revision_adr_d_items_id = $rev_adr_d_items_id;
                        $AddAdrDItemsFuncLoc->name = $rowItemsFuncLoc['name'];
                        $AddAdrDItemsFuncLoc->description = $rowItemsFuncLoc['description'];
                        $AddAdrDItemsFuncLoc->save();
                        $iFuncLoc++;
                    }
                    if($row['reason']){
                        $Reason = new Reason();
                        $Reason->table_name = 'revision_adr_d_items';
                        $Reason->table_id = $rev_adr_d_items_id;
                        $Reason->description = $row['reason'];
                        $Reason->created_by = $user_id;
                        $Reason->save();
                    }
                }else{
                    $revAdrDItems = RevisionAdrDItems::find($row['revision_adr_d_items_id']);
                    $arr_adr_d_items = array();
                    foreach ($row as $field=>$value){
                        $check = substr($value, 0, 6);
                        if($field !=='_token' ){
                            if($field !=='revision_adr_d_items_id') {
                                if ($field !== 'items_characteristic') {
                                    if ($field !== 'item_status') {
                                        if ($field !== 'adr_status') {
                                            if ($field !== 'category') {
                                                if ($field !== 'updated_by') {
                                                    if ($field !== 'cataloguer') {
                                                        if ($field !== 'cataloguer_by') {
                                                            if ($field !== 'std_approval') {
                                                                if ($field !== 'std_approval_by') {
                                                                    if ($field !== 'proc_approver') {
                                                                        if ($field !== 'proc_approver_by') {
                                                                            if ($field !== 'sap_material_code_by') {
                                                                                if ($field !== 'reason') {
                                                                                 if ($field !== 'User_ID') {
                                                                                    if (!empty($value || $value !== NULL)) {
                                                                                        if ($check !== 'Select') {
                                                                                            $revAdrDItems->$field = $value;
                                                                                            $arr_adr_d_items[] = array($field=>$value);
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
                        if ($field == 'items_characteristic') {
                            $check_items_inc_char = RevisionAdrDItemsCharacteristic::select(DB::raw("*"))
                                                                                    ->Join('inc_m', 'revision_adr_d_items_characteristic.inc_m_id', '=', 'inc_m.id')
                                                                                    ->where('revision_adr_d_items_id', '=', $row['revision_adr_d_items_id'])
                                                                                    ->where('inc', '=', $row['inc'])
                                                                                    ->get();

//                            var_dump(DB::getQueryLog());
                            if(count($check_items_inc_char)>0){

                                $items_char = array();
                                $items_characteristic = json_decode(stripslashes($row['items_characteristic']));
                                $ii=1;
                                $count_m = 0 ;
                                foreach ($items_characteristic as $arrCharRow){
                                    $arrRow= array();
                                    foreach ($arrCharRow as $head=>$value){
                                        if($head !== 'inc'){
                                            if($head !== 'type'){
                                                if($head !== 'characteristics'){
                                                    if($head !== 'flag'){
                                                        if($head !== 'sequence'){
                                                            $arrRow[$head] = $value;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    $items_char[] =$arrRow;
                                    foreach ($items_char as $rowItemsChar){
                                        RevisionAdrDItemsCharacteristic::select()
                                                                        ->where('inc_characteristics_id','=',$rowItemsChar['id'])
                                                                        ->where('revision_adr_d_items_id','=',$row['revision_adr_d_items_id'])
                                                                        ->update([ 'nvalue'=>$rowItemsChar['nvalue']]);
                                    }

                                }
                            }else{
                                RevisionAdrDItemsCharacteristic::select(DB::raw("*"))
                                                                ->where('revision_adr_d_items_id', '=', $row['revision_adr_d_items_id'])
                                                                ->delete();
                                $dataIncChar = IncCharacteristics::select(DB::raw("*"))
                                                                 ->where('inc','=',$row['inc'])
                                                                 ->get();
                                $iChr=0;
                                foreach ($dataIncChar as $rowIncChar){
                                    $adrDItemsCharacteristics= new RevisionAdrDItemsCharacteristic();
                                    $adrDItemsCharacteristics->revision_adr_d_items_id = $row['revision_adr_d_items_id'];
                                    $adrDItemsCharacteristics->catalog_no = $row['catalog_no'];
                                    $adrDItemsCharacteristics->inc_m_id = $rowIncChar->inc_m_id;
                                    $adrDItemsCharacteristics->inc_characteristics_id = $rowIncChar->id;
                                    $adrDItemsCharacteristics->mrcode = $rowIncChar->mrcode;
                                    $adrDItemsCharacteristics->save();
                                    $iChr++;
                                }

                                $items_char = array();
                                $material_char = json_decode(stripslashes($row['items_characteristic']));
                                $ii=1;
                                $count_m = 0 ;
                                foreach ($material_char as $arrCharRow){
                                    $arrRow= array();
                                    foreach ($arrCharRow as $head=>$value){
                                        if($head !== 'inc'){
                                            if($head !== 'type'){
                                                if($head !== 'characteristics'){
                                                    if($head !== 'flag'){
                                                        if($head !== 'sequence'){
                                                            $arrRow[$head] = $value;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    $items_char[] =$arrRow;
                                    foreach ($items_char as $rowItemsChar){
                                        AdrDItemsCharacteristics::select()
                                                                ->where('inc_characteristics_id','=',$rowItemsChar['id'])
                                                                ->where('revision_adr_d_items_id','=',$row['revision_adr_d_items_id'])
                                                                ->update([ 'nvalue'=>$rowItemsChar['nvalue']]);
                                    }

                                }
                            }

                        }
                        if ($field == 'items_is_active') {
                            if($levelUser == 'User'){
                                $revAdrDItems->items_is_active = 'Validate' ;
                                $senderName  = Auth::user()->real_name;
                                $emailSender = Auth::user()->email;

                                $revAdrDItems->category = $row['category'] ;

                                $revAdrDItems->cataloguer = null ;
                                $revAdrDItems->cataloguer_by_id = null ;
                                $revAdrDItems->cataloguer_date = null ;

                                $revAdrDItems->std_approval = null ;
                                $revAdrDItems->std_approval_by_id = null;
                                $revAdrDItems->std_approval_date = null ;

                                $revAdrDItems->proc_approver = null;
                                $revAdrDItems->proc_approver_by_id = null;
                                $revAdrDItems->proc_approver_date = null ;
                                $mat_owner =self::getMaterialOwner($row['catalog_no']);
                                $Note= self::getNote($row['catalog_no']);
                                $KataGot=self::getCatagory($row['category']);
                                $setFrom = 'ecat@abm-investama.co.id';
                                $titlesetFrom = 'ABM E-Cataloguing Systems';
                                $data = array(
                                    'from'=>$emailSender,
                                    'catalog_no'=>$row['catalog_no'],
                                    'short_text'=>$row['short_description'],
                                    'Catagory'=>$KataGot,
                                    'Note'=>$Note,
                                    'mat_owner'=>$mat_owner,
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
                                //         ->subject('Request Revision '.$row['transaction_type']);
                                // });
                            }
                            if($levelUser == 'Cat'){
                                if($row['cataloguer'] == 'Validate') {
                                    $revAdrDItems->cataloguer = $row['cataloguer'];
                                    $revAdrDItems->cataloguer_by_id = $user_id;
                                    $revAdrDItems->cataloguer_date = date("Y-m-d H:i:s");
                                    $revAdrDItems->items_is_active = $row['cataloguer'];
                                    $mat_owner =self::getMaterialOwner($row['catalog_no']);
                                    $Note= self::getNote($row['catalog_no']);
                                    $KataGot=self::getCatagory($row['category']);
                                   
                                    $setFrom = 'ecat@abm-investama.co.id';
                                    $titlesetFrom = 'ABM E-Cataloguing Systems';
                                    $data = array(
                                        'from' => $dataUserProfile[0]['email'],
                                        'catalog_no' => $row['catalog_no'],
                                        'short_text' => $row['short_description'],
                                        'Catagory'=>$KataGot,
                                        'Note'=>$Note,
                                        'mat_owner'=>$mat_owner,
                                        'regard' => $dataUserProfile[0]['real_name']
                                    );
                                    // $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    // $beautymail->send('emails.CatValidate', $data, function ($message) use($row) {
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
                                    //         ->subject('Request Revision '.$row['transaction_type']);
                                    // });
                                }else{
                                    $revAdrDItems->cataloguer = $row['cataloguer'] ;
                                    $revAdrDItems->cataloguer_by_id = $user_id ;
                                    $revAdrDItems->cataloguer_date = date("Y-m-d H:i:s") ;
                                    $revAdrDItems->items_is_active = $row['cataloguer'] ;

                                    if($dataUserProfile[0]['group_name'] == 'Cat'){
                                        $mat_owner =self::getMaterialOwner($row['catalog_no']);
                                        $Note= self::getNote($row['catalog_no']);
                                        $KataGot=self::getCatagory($row['category']);
                                        $setFrom = 'ecat@abm-investama.co.id';
                                        $titlesetFrom = 'ABM E-Cataloguing Systems';
                                        $data = array(
                                            'from'=>$dataUserProfile[0]['email'],
                                            'catalog_no'=>$row['catalog_no'],
                                            'short_text'=>$row['short_description'],
                                            'Catagory'=>$KataGot,
                                            'Note'=>$Note,
                                            'mat_owner'=>$mat_owner,
                                            'regard'=> $dataUserProfile[0]['real_name']
                                        );
                                        // $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                        // $beautymail->send('emails.CatNotValidate', $data, function($message) use($row)
                                        // {
                                        //     $emailSender = Auth::user()->email;
                                        //     $input = Input::all();
                                        //     $query = DB::table('vw_catalog_m_owner');
                                        //     $query->where('catalog_no',"=",$row['catalog_no']);
                                        //     $search = $query->get();
                                        //     $toOwner = array();
                                        //     foreach ($search as $arrEmailRow){
                                        //         $toOwner[] = $arrEmailRow->email ;
                                        //     }
                                        //     $message
                                        //         ->from($emailSender ,'ABM E-Cataloguing Systems')
                                        //         ->to($toOwner, 'ABM E-Cataloguing Systems')
                                        //         //->bcc('bqsoft77@gmail.com', 'Development')
                                        //         ->subject('Request Revision '.$row['transaction_type']);
                                        // });
                                    }
                                }
                            }
                            if(substr(strtolower($levelUser),0,3) == 'std'){
                                if($row['std_approval'] == 'Validate') {
                                    $revAdrDItems->std_approval = $row['std_approval'];
                                    $revAdrDItems->std_approval_by_id = $user_id;
                                    $revAdrDItems->std_approval_date = date("Y-m-d H:i:s");
                                    $revAdrDItems->items_is_active = $row['std_approval'];
                                    $mat_owner =self::getMaterialOwner($row['catalog_no']);
                                    $Note= self::getNote($row['catalog_no']);
                                    $KataGot=self::getCatagory($row['category']);
                                    $setFrom = 'ecat@abm-investama.co.id';
                                    $titlesetFrom = 'ABM E-Cataloguing Systems';
                                    $data = array(
                                        'from' => $dataUserProfile[0]['email'],
                                        'catalog_no' => $row['catalog_no'],
                                        'short_text' => $row['short_description'],
                                        'std' => $levelUser,
                                        'Catagory'=>$KataGot,
                                        'Note'=>$Note,
                                        'mat_owner'=>$mat_owner,
                                        'regard' => $dataUserProfile[0]['real_name']
                                    );
                                    // $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    // $beautymail->send('emails.StdAppValidate', $data, function ($message) use($row)  {
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
                                    //         ->subject('Request Revision '.$row['transaction_type']);
                                    // });
                                }else{

                                    $revAdrDItems->std_approval = $row['std_approval'];
                                    $revAdrDItems->std_approval_by_id = $user_id;
                                    $revAdrDItems->std_approval_date = date("Y-m-d H:i:s");
                                    $revAdrDItems->items_is_active = $row['std_approval'];
                                    $mat_owner =self::getMaterialOwner($row['catalog_no']);
                                    $Note= self::getNote($row['catalog_no']);
                                    $KataGot=self::getCatagory($row['category']);
                                    $setFrom = 'ecat@abm-investama.co.id';
                                    $titlesetFrom = 'ABM E-Cataloguing Systems';
                                    $data = array(
                                        'from'=>$dataUserProfile[0]['email'],
                                        'catalog_no'=>$row['catalog_no'],
                                        'short_text'=>$row['short_description'],
                                        'std'=>$levelUser,
                                        'std' => $levelUser,
                                        'Catagory'=>$KataGot,
                                        'Note'=>$Note,
                                        'mat_owner'=>$mat_owner,
                                        'regard'=> $dataUserProfile[0]['real_name']
                                    );
                                    // $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    // $beautymail->send('emails.StdAppNotValidate', $data, function($message) use($row)
                                    // {
                                    //     $emailSender = Auth::user()->email;
                                    //     $input = Input::all();
                                    //     $query = DB::table('vw_catalog_m_owner');
                                    //     $query->where('catalog_no',"=",$row['catalog_no']);
                                    //     $search = $query->get();
                                    //     $toOwner = array();
                                    //     foreach ($search as $arrEmailRow){
                                    //         $toOwner[] = $arrEmailRow->email ;
                                    //     }
                                    //     $message
                                    //         ->from($emailSender ,'ABM E-Cataloguing Systems')
                                    //         ->to($toOwner, 'ABM E-Cataloguing Systems')
                                    //         //->bcc('bqsoft77@gmail.com', 'Development')
                                    //         ->subject('Request Revision '.$row['transaction_type']);
                                    // });
                                }
                            }
                            if($levelUser == 'Proc'){
                                if($row['proc_approver'] == 'Validate') {

                                    $revAdrDItems->proc_approver = $row['proc_approver'];
                                    $revAdrDItems->proc_approver_by_id = $user_id;
                                    $revAdrDItems->proc_approver_date = date("Y-m-d H:i:s");
                                    $revAdrDItems->items_is_active = $row['proc_approver'];

                                    $adrDItemsStatus = new AdrDItemsStatus();
                                    $adrDItemsStatus->adr_d_items_id = $row['adr_d_items_id'];
                                    $adrDItemsStatus->item_status = $row['item_status'];
                                    $adrDItemsStatus->save();

                                    $adrDitems = AdrDItems::find($row['adr_d_items_id']);
                                    foreach ($row as $field=>$value) {
                                        $check = substr($value, 0, 6);
                                        if ($field !== '_token') {
                                            if ($field !== 'adr_d_items_id') {
                                                if ($field !== 'revision_adr_d_items_id') {
                                                    if ($field !== 'items_characteristic') {
                                                        if ($field !== 'item_status') {
                                                            if ($field !== 'adr_status') {
                                                                if ($field !== 'updated_by') {
                                                                    if ($field !== 'cataloguer_by') {
                                                                        if ($field !== 'std_approval_by') {
                                                                            if ($field !== 'proc_approver_by') {
                                                                                if ($field !== 'sap_material_code_by') {
                                                                                    if ($field !== 'reason') {
                                                                                     if ($field !== 'User_ID') {
                                                                                        if (!empty($value || $value !== NULL)) {
                                                                                            if ($check !== 'Select') {
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
                                        if($field == 'inc') {
											// DELETE dulu, mungkin saja ada ADR Characteristics yg sudah dihapus dari INC Characteristics
											$sql = "
												DELETE adr_char 
												FROM adr_d_items_characteristic adr_char
													LEFT JOIN inc_characteristics inc_char ON inc_char.inc_m_id = adr_char.inc_m_id AND inc_char.id = adr_char.inc_characteristics_id
												WHERE adr_d_items_id = :adr_d_items_id AND inc_char.id IS NULL
											";
											DB::statement($sql, ['adr_d_items_id' => $row['adr_d_items_id']]);

											// Update from INC Characteristics
											$sql = "
												SELECT c.inc_m_id, c.id, c.mrcode
												FROM inc_characteristics c
												LEFT JOIN adr_d_items_characteristic i ON c.inc_m_id=i.inc_m_id AND c.id=i.inc_characteristics_id 
													AND i.adr_d_items_id= :adr_d_items_id
												WHERE inc = :inc
													AND adr_d_items_id IS NULL
											";
											
											$dataIncChar = DB::select($sql, ['adr_d_items_id' => $row['adr_d_items_id'], 'inc' => $row['inc']]);
													
											foreach ($dataIncChar as $rowIncChar) {
												$adrDItemsCharacteristics = new AdrDItemsCharacteristics();
												$adrDItemsCharacteristics->adr_d_items_id = $row['adr_d_items_id'];
												$adrDItemsCharacteristics->catalog_no = $row['catalog_no'];
												$adrDItemsCharacteristics->inc_m_id = $rowIncChar->inc_m_id;
												$adrDItemsCharacteristics->inc_characteristics_id = $rowIncChar->id;
												$adrDItemsCharacteristics->mrcode = $rowIncChar->mrcode;
												$adrDItemsCharacteristics->save();
											};						
											
											// Fill Characteristics Value
											$data_char_value = json_decode(stripslashes($row['items_characteristic']));

											foreach ($data_char_value as $rowCharValue) {
												$UpdateItemsIncChar = AdrDItemsCharacteristics::select(DB::raw("*"))
																		->where('adr_d_items_id', '=', $row['adr_d_items_id'])
																		->where('inc_m_id', '=', $rowCharValue->inc_m_id)
																		->where('inc_characteristics_id', '=', $rowCharValue->id)
																		->first();
												
												if($UpdateItemsIncChar){
													$UpdateItemsIncChar->inc_characteristics_id = $rowCharValue->id;
													$UpdateItemsIncChar->nvalue = $rowCharValue->nvalue ;
													$UpdateItemsIncChar->save();
												}
											}											
											
                                            /* $searchAdrDItemsCharacteristics = AdrDItemsCharacteristics::select(DB::raw("*"))
                                                ->Join('inc_m', 'adr_d_items_characteristic.inc_m_id', '=', 'inc_m.id')
                                                ->where('adr_d_items_id', '=', $row['adr_d_items_id'])
                                                ->where('inc', '=', $row['inc'])
                                                ->get();
                                            if (count($searchAdrDItemsCharacteristics) > 0) {
                                                if ($row['items_characteristic'] != '[]') {
                                                    $data_char_value = json_decode(stripslashes($row['items_characteristic']));
                                                    $ii = 0;
                                                    $count_m = 0;
                                                    $arrayLongdesc = array();
                                                    foreach ($data_char_value as $rowCharValue) {
                                                        $serchKeyId = AdrDItemsCharacteristics::where('inc_m_id', '=', $rowCharValue->inc_m_id)
                                                            ->where('adr_d_items_id', '=', $row['adr_d_items_id'])
                                                            ->where('inc_characteristics_id', '=', $rowCharValue->inc_characteristics_id)->get();
                                                        $id = $serchKeyId->first()->getOriginal()['id'];
                                                        $UpdateItemsIncChar = AdrDItemsCharacteristics::find($id);
                                                        $UpdateItemsIncChar->nvalue = $rowCharValue->nvalue ;
                                                        $UpdateItemsIncChar->save();
                                                    }

                                                }
                                            } else {
                                                AdrDItemsCharacteristics::select(DB::raw("*"))
                                                    ->where('adr_d_items_id', '=', $row['adr_d_items_id'])
                                                    ->delete();
                                                $dataIncChar = IncCharacteristics::select(DB::raw("*"))
                                                    ->where('inc', '=', $row['inc'])
                                                    ->get();
                                                $iChr = 0;
                                                foreach ($dataIncChar as $rowIncChar) {
                                                    $adrDItemsCharacteristics = new AdrDItemsCharacteristics();
                                                    $adrDItemsCharacteristics->adr_d_items_id = $row['adr_d_items_id'];
                                                    $adrDItemsCharacteristics->catalog_no = $row['catalog_no'];
                                                    $adrDItemsCharacteristics->inc_m_id = $rowIncChar->inc_m_id;
                                                    $adrDItemsCharacteristics->inc_characteristics_id = $rowIncChar->id;
                                                    $adrDItemsCharacteristics->mrcode = $rowIncChar->mrcode;
                                                    $adrDItemsCharacteristics->save();
                                                    $iChr++;
                                                };

                                                $data_char_value = json_decode(stripslashes($row['items_characteristic']));
                                                $ii = 0;
                                                $count_m = 0;
                                                $arrayLongdesc = array();
                                                foreach ($data_char_value as $rowCharValue) {
                                                    $serchKeyId = AdrDItemsCharacteristics::where('inc_m_id', '=', $rowCharValue->inc_m_id)
                                                        ->where('adr_d_items_id', '=', $row['adr_d_items_id'])
                                                        ->where('inc_characteristics_id', '=', $rowCharValue->inc_characteristics_id)->get();
                                                    if(count($serchKeyId) > 0){
                                                        $id = $serchKeyId->first()->getOriginal()['id'];
                                                        $UpdateItemsIncChar = AdrDItemsCharacteristics::find($id);
                                                        $UpdateItemsIncChar->nvalue = $rowCharValue->nvalue ;
                                                        $UpdateItemsIncChar->save();
                                                    }
                                                }
                                            } */
                                        }
                                    }
                                    $adrDitems->save();
//                                    var_dump($adrDitems);


                                    $setFrom = 'ecat@abm-investama.co.id';
                                    $titlesetFrom = 'ABM E-Cataloguing Systems';

                                    $data = array(
                                        'from'=>$dataUserProfile[0]['email'],
                                        'catalog_no'=>$row['catalog_no'],
                                        'sap_material_code'=>$row['sap_material_code'],
                                        'short_text'=>$row['short_description'],
                                        'status'=>$row['item_status'],
                                        'Catagory'=>$row['category'],
                                        'Note'=>'Catatan test Note REVISION',
                                        'regard'=> $dataUserProfile[0]['real_name']
                                    );
                                    // $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    // $beautymail->send('emails.ProcStatusValidate', $data, function($message) use($row)
                                    // {
                                    //     $emailSender = Auth::user()->email;
                                    //     $input = Input::all();
                                    //     $query = DB::table('vw_catalog_m_owner');
                                    //     $query->where('catalog_no',"=",$row['catalog_no']);
                                    //     $search = $query->get();
                                    //     $toOwner = array();
                                    //     foreach ($search as $arrEmailRow){
                                    //         $toOwner[] = $arrEmailRow->email ;
                                    //     }
                                    //     $message
                                    //         ->from($emailSender ,'ABM E-Cataloguing Systems')
                                    //         ->to($toOwner, 'ABM E-Cataloguing Systems')
                                    //         //->bcc('bqsoft77@gmail.com', 'Development')
                                    //         ->subject('Request Revision '.$row['transaction_type']);
                                    // });

                                    // $message .= 'Proc Approval ';
                                }else{
                                    $revAdrDItems->proc_approver = $row['proc_approver'];
                                    $revAdrDItems->proc_approver_by_id = $user_id;
                                    $revAdrDItems->proc_approver_date = date("Y-m-d H:i:s");
                                    $revAdrDItems->items_is_active = $row['proc_approver'];

                                    $setFrom = 'ecat@abm-investama.co.id';
                                    $titlesetFrom = 'ABM E-Cataloguing Systems';
                                    $data = array(
                                        'from'=>$dataUserProfile[0]['email'],
                                        'catalog_no'=>$row['catalog_no'],
                                        'short_text'=>$row['short_description'],
                                        'Catagory'=>$row['category'],
                                        'Note'=>'Catatan test Note REVISION',
                                        'regard'=> $dataUserProfile[0]['real_name']
                                    );
                                    // $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    // $beautymail->send('emails.ProcNotValidate', $data, function($message) use($row)
                                    // {
                                    //     $emailSender = Auth::user()->email;
                                    //     $input = Input::all();
                                    //     $query = DB::table('vw_catalog_m_owner');
                                    //     $query->where('catalog_no',"=",$row['catalog_no']);
                                    //     $search = $query->get();
                                    //     $toOwner = array();
                                    //     foreach ($search as $arrEmailRow){
                                    //         $toOwner[] = $arrEmailRow->email ;
                                    //     }
                                    //     $message
                                    //         ->from($emailSender ,'ABM E-Cataloguing Systems')
                                    //         ->to($toOwner, 'ABM E-Cataloguing Systems')
                                    //         //->bcc('bqsoft77@gmail.com', 'Development')
                                    //         ->subject('Request Revision '.$row['transaction_type']);
                                    // });
                                }
                            }

                        }
                    }
                    DB::table('value_characteristic')->where('adr_d_items_id',$request->revision_adr_d_items_id)->where('type_adr','Revision')->delete();
                    if($row['reason']){
                        $Reason = new Reason();
                        $Reason->table_name = 'revision_adr_d_items';
                        $Reason->table_id = $row['revision_adr_d_items_id'];
                        $Reason->description = $row['reason'];
                        $Reason->created_by = $user_id;
                        $Reason->save();
                    }
                    $revAdrDItems->save();
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
//        var_dump(DB::getQueryLog());
        return \Response::json($data,200);
    }
    public function getRevisionItemsIncCharacteristics(Request $request){
		$sql = "
			SELECT
				inc_char.id AS id,
				inc_char.id AS inc_characteristics_id,
				inc_char.inc_m_id AS inc_m_id,
				inc_char.inc AS inc,
				inc_char.mrcode AS mrcode,
				inc_char.characteristics_m_id AS characteristics_m_id,
				inc_char.characteristics AS characteristics,
				inc_char.sequence AS sequence,
				inc_char.type AS type,
                rev_adr_char.revision_adr_d_items_id AS revision_adr_d_items_id,
				IF (rev_adr_char.revision_adr_d_items_id IS NULL, adr_char.nvalue, rev_adr_char.nvalue) AS nvalue,
				IF (rev_adr_char.revision_adr_d_items_id IS NULL, adr_char.id, rev_adr_char.id) AS adr_d_items_characteristic_id
			FROM
				inc_characteristics inc_char
				LEFT JOIN revision_adr_d_items_characteristic rev_adr_char ON inc_char.inc_m_id = rev_adr_char.inc_m_id
					AND inc_char.id = rev_adr_char.inc_characteristics_id AND revision_adr_d_items_id = :revision_adr_d_items_id
				LEFT JOIN adr_d_items_characteristic adr_char ON inc_char.inc_m_id = adr_char.inc_m_id
					AND inc_char.id = adr_char.inc_characteristics_id AND adr_d_items_id = :adr_d_items_id
			WHERE inc_char.inc_m_id = :inc_m_id 
			ORDER BY inc_char.sequence
		";
		$items_inc_char = DB::select($sql, ['revision_adr_d_items_id' => $request->revision_adr_d_items_id, 'adr_d_items_id' => $request->adr_d_items_id, 'inc_m_id' => $request->inc_m_id]);
		$totalrecords=count($items_inc_char);
		
		$result = ( $totalrecords > 0 ? BaseModel::buildMetaData($items_inc_char, $totalrecords) : [] );		
		
/*         // DB::enableQueryLog();
        $items_inc_char = DB::table('vw_revision_adr_items_characteristic')
                            ->where('vw_revision_adr_items_characteristic.inc_m_id','=',$request->inc_m_id)
                            ->where('vw_revision_adr_items_characteristic.revision_adr_d_items_id','=',$request->revision_adr_d_items_id)
                            ->where('vw_revision_adr_items_characteristic.revision_adr_d_items_id','!=','')
                            ->orderBy('vw_revision_adr_items_characteristic.sequence', 'asc')
                            ->get();
                            // dd($items_inc_char);
                            // var_dump(DB::getQueryLog());
        if(count($items_inc_char)>0){
            $result = BaseModel::buildMetaData($items_inc_char,500);

        }else{
            $items_inc_char = DB::table('vw_adr_items_characteristic')
                                ->where('vw_adr_items_characteristic.inc_m_id',$request->inc_m_id)
                                ->where('vw_adr_items_characteristic.adr_d_items_id',$request->adr_d_items_id)
                                ->orderBy('vw_adr_items_characteristic.sequence', 'asc')
                                ->get();
            if(count($items_inc_char) > 0){
                $result = BaseModel::buildMetaData($items_inc_char,500);
            }else{
                $items_inc_char_new = DB::table('vw_inc_characteristics')
                            ->where('vw_inc_characteristics.inc_m_id',$request->inc_m_id)
                            ->orderBy('vw_inc_characteristics.sequence', 'asc')
                            ->get();
                if(count($items_inc_char_new) > 0){
                    $result = BaseModel::buildMetaData($items_inc_char_new,500);
                }else{
                    $result = [];
                }
                // $result = [];
            }
            // dd($items_inc_char);

        } */
        return \Response::json($result,200);
    }
    public function getRevisionItemsCrossReferences(Request $request){
        $revision_adr_d_items_id = $request->revision_adr_d_items_id;
        if(!empty($revision_adr_d_items_id)){
            $sql = "SELECT * FROM vw_revision_adr_items_crossreferences" ;
            $result = BaseModel::buildSql($sql);;
        }else{
            $sql = "SELECT * FROM vw_adr_items_crossreferences" ;
            $result = BaseModel::buildSql($sql);

        }
        return \Response::json($result,200);
    }
    public function getRevisionItemsFuncloc(Request $request){
        $revision_adr_d_items_id = $request->revision_adr_d_items_id;
        if(!empty($revision_adr_d_items_id)){
            $sql = "SELECT * FROM revision_adr_d_items_funcloc" ;
            $result = BaseModel::buildSql($sql);;
        }else{
            $sql = "SELECT * FROM adr_d_items_funcloc" ;
            $result = BaseModel::buildSql($sql);

        }
        return \Response::json($result,200);
    }
    public function getRevisionItemsViewNotes(Request $request){
        $revision_adr_d_items_id = $request->revision_adr_d_items_id;
        if(!empty($revision_adr_d_items_id)){
            $sql = "SELECT * FROM vw_revision_adr_items_characteristic" ;
            $result = BaseModel::buildSql($sql);;
        }else{
            $sql = "SELECT * FROM view_notes" ;
            $result = BaseModel::buildSql($sql);

        }
        return \Response::json($result,200);
    }
}
