<?php

namespace App\Http\Controllers\Inventory;

use App\Models\BaseModel;
use App\Models\InventoryPlant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Illuminate\Support\Facades\Input;
use Response;
use Auth;
use Illuminate\Foundation\Auth\User;


class InventoryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getCatalogMInventory(){
        $sql = "SELECT * FROM vw_catalog_m" ;
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result,200);
    }

    public function getInventoryPlant(){
        $sql = "SELECT * FROM vw_inventory_plant" ;
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result,200);
    }
    public function SaveInventory(Request $request)
    {
        //        DB::enableQueryLog();
        DB::beginTransaction();
        try {
            $input = Input::all();
            $row = Input::all();
            $user_id  = Auth::user()->user_id;
            $message ='';
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id','=',$user_id)
                ->get();
            $levelUser = $dataUserProfile[0]['group_name'];
            foreach ($input as $key => $value) {
                $data[$key] = $value;
            }
            foreach (array($data) as $row){

                $checkInventoryPlant = InventoryPlant::select(DB::raw("*"))
                    ->where('plant','=',$row['plant'])
                    ->where('adr_d_items_id','=',$row['adr_d_items_id'])
                    ->get();
                if(count($checkInventoryPlant) > 0){
                    $id = $checkInventoryPlant->first()->getattributes()['id'];
                    $UpdateInventoryPlant = InventoryPlant::find($id);
                    foreach ($row as $field=>$value){
                        $check = substr($value, 0, 6);
                        if($field !=='_token' ) {
                            if ($field !== 'adr_m_id') {
                                if ($field !== 'inventory_id') {
                                    if ($field !== 'sap_material_code') {
                                        if ($field !== 'sap_material_code_by') {
                                            if ($field !== 'sap_material_code_date') {
                                                if ($field !== 'short_description') {
                                                    if ($field !== 'long_description') {
                                                        if ($field !== 'status_user') {
                                                            if ($field !== 'inv_controll') {
                                                                if ($field !== 'inv_controll_by_id') {
                                                                    if ($field !== 'inv_controll_date') {
                                                                        if ($field !== 'EndApproval') {
                                                                            if ($field !== 'approver1') {
                                                                                if ($field !== 'approver1_by_id') {
                                                                                    if ($field !== 'approver1_date') {
                                                                                        if ($field !== 'approver2') {
                                                                                            if ($field !== 'approver2_by_id') {
                                                                                                if ($field !== 'approver2_date') {
                                                                                                    if ($field !== 'items_is_active') {
                                                                                                        if ($check !== 'Select') {
                                                                                                            $UpdateInventoryPlant->$field = $value;
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
                        if($field == 'items_is_active'){
                            if($levelUser == 'User'){
                                $UpdateInventoryPlant->items_is_active = 'Validate' ;
                                $senderName  = Auth::user()->real_name;
                                $emailSender = Auth::user()->email;

                                $UpdateInventoryPlant->inv_controll = null ;
                                $UpdateInventoryPlant->inv_controll_by_id = null ;
                                $UpdateInventoryPlant->inv_controll_date = null ;

                                $UpdateInventoryPlant->approver1 = null ;
                                $UpdateInventoryPlant->approver1_by_id = null;
                                $UpdateInventoryPlant->approver1_date = null ;   

                                $UpdateInventoryPlant->approver2 = null;
                                $UpdateInventoryPlant->approver2_by_id = null;
                                $UpdateInventoryPlant->approver2_date = null ;                                                             

                                $data = array(
                                    'from'=>$emailSender,
                                    'catalog_no'=>$row['catalog_no'],
                                    'sap_no'=>$row['sap_material_code'],
                                    'short_text'=>$row['short_description'],
                                    'plant'=>$row['plant'],
                                    'regard'=> $senderName
                                );
                                $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                $beautymail->send('emails.UserRequestInventory', $data, function($message) use ($row)
                                {
                                    $emailSender = Auth::user()->email;
                                    $to = User::select(DB::raw("users.*"))
                                        ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                                        ->leftJoin('companies_m', 'users.companies_m_id', '=', 'companies_m.id')
                                        ->where('group_name','=','Inv Controller')
                                        ->where('users.companies_m_id','=',Auth::user()->companies_m_id)
                                        ->get();
                                    $toIC = array();
                                    foreach ($to as $arrEmailRow){
                                        $toIC[] = $arrEmailRow->email ;
                                    }

                                    $message->from($emailSender ,'ABM E-Cataloguing Systems')
                                        ->to($toIC, 'ABM E-Cataloguing Systems')
                                        //->bcc('bqsoft77@gmail.com','Develoment')
                                        ->subject('Request Meterial Inventory');
                                });
                            }
                            if($levelUser == 'Inv Controller'){
                                if($row['inv_controll'] == 'Validate') {
                                    $UpdateInventoryPlant->inv_controll = $row['inv_controll'];
                                    $UpdateInventoryPlant->inv_controll_by_id = $user_id;
                                    $UpdateInventoryPlant->inv_controll_date = date("Y-m-d H:i:s");

                                    $UpdateInventoryPlant->approver1 = null ;
                                    $UpdateInventoryPlant->approver1_by_id = null;
                                    $UpdateInventoryPlant->approver1_date = null ;

                                    $UpdateInventoryPlant->approver2 = null;
                                    $UpdateInventoryPlant->approver2_by_id = null;
                                    $UpdateInventoryPlant->approver2_date = null ;                                    
                                        // $UpdateInventoryPlant->items_is_active = $row['inv_controll'];

                                    $senderName  = Auth::user()->real_name;
                                    $emailSender = Auth::user()->email;

                                    $data = array(
                                        'from'=>$emailSender,
                                        'dear'=>'Dear Approver 1',
                                        'catalog_no'=>$row['catalog_no'],
                                        'sap_no'=>$row['sap_material_code'],
                                        'short_text'=>$row['short_description'],
                                        'plant'=>$row['plant'],
                                        'status'=>$row['inv_controll'],
                                        'regard'=> $senderName
                                    );
                                    $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    $beautymail->send('emails.InventoryValidate', $data, function($message) use ($row)
                                    {
                                        $emailSender = Auth::user()->email;
                                        $input = Input::all();
                                        $to = User::select(DB::raw("users.*"))
                                            ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                                            ->leftJoin('companies_m', 'users.companies_m_id', '=', 'companies_m.id')
                                            ->where('group_name','=','Approver 1')
                                            ->where('users.companies_m_id','=',Auth::user()->companies_m_id)
                                            ->get();
                                        $toApp1 = array();
                                        foreach ($to as $arrEmailRow){
                                            $toApp1[] = $arrEmailRow->email ;
                                        }                                        
                                        $message->from($emailSender ,'ABM E-Cataloguing Systems')
                                            ->to($toApp1, 'ABM E-Cataloguing Systems')
                                            //->bcc('bqsoft77@gmail.com','Develoment')
                                            ->subject('Request Meterial Inventory');
                                    });
                                }else{
                                    $UpdateInventoryPlant->inv_controll = $row['inv_controll'] ;
                                    $UpdateInventoryPlant->inv_controll_by_id = $user_id ;
                                    $UpdateInventoryPlant->inv_controll_date = date("Y-m-d H:i:s") ;
                                    $UpdateInventoryPlant->items_is_active = $row['inv_controll'] ;

                                    $senderName  = Auth::user()->real_name;
                                    $emailSender = Auth::user()->email;

                                    $data = array(
                                        'from'=>$emailSender,
                                        'dear'=>'Dear User',
                                        'catalog_no'=>$row['catalog_no'],
                                        'sap_no'=>$row['sap_material_code'],
                                        'short_text'=>$row['short_description'],
                                        'plant'=>$row['plant'],
                                        'status'=>$row['inv_controll'],
                                        'regard'=> $senderName
                                    );
                                    $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    $beautymail->send('emails.InventoryNotValidate', $data, function($message)
                                    {
                                        $emailSender = Auth::user()->email;
                                        $input = Input::all();
                                        $InventoryPlant = InventoryPlant::select(DB::raw("users.email"))
                                            ->leftJoin('users', 'inventory_plant.created_by', '=', 'users.user_id')
                                            ->where('plant','=',$input['plant'])
                                            ->where('adr_d_items_id','=',$input['adr_d_items_id'])
                                            ->get();
                                        $toUser = $InventoryPlant->first()->getattributes()['email'];
                                        $message->from($emailSender ,'ABM E-Cataloguing Systems')
                                            ->to($toUser, 'ABM E-Cataloguing Systems')
                                            //->bcc('bqsoft77@gmail.com','Develoment')
                                            ->subject('Request Meterial Inventory');
                                    });
                                    
                                }
                            }
                            if($levelUser == 'Approver 1'){
                                if($row['approver1'] == 'Validate') {
                                    $UpdateInventoryPlant->approver1 = $row['approver1'];
                                    $UpdateInventoryPlant->approver1_by_id = $user_id;
                                    $UpdateInventoryPlant->approver1_date = date("Y-m-d H:i:s");

                                    $UpdateInventoryPlant->approver2 = null;
                                    $UpdateInventoryPlant->approver2_by_id = null;
                                    $UpdateInventoryPlant->approver2_date = null ;
                                    // $UpdateInventoryPlant->items_is_active = $row['approver1'];

                                    $senderName  = Auth::user()->real_name;
                                    $emailSender = Auth::user()->email;

                                    $data = array(
                                        'from'=>$emailSender,
                                        'dear'=>'Dear Approver 2',
                                        'catalog_no'=>$row['catalog_no'],
                                        'sap_no'=>$row['sap_material_code'],
                                        'short_text'=>$row['short_description'],
                                        'plant'=>$row['plant'],
                                        'status'=>$row['approver1'],
                                        'regard'=> $senderName
                                    );
                                    $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    $beautymail->send('emails.InventoryValidate', $data, function($message) use ($row)
                                    {
                                        $emailSender = Auth::user()->email;
                                        $input = Input::all();
                                        $to = User::select(DB::raw("users.*"))
                                            ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                                            ->leftJoin('companies_m', 'users.companies_m_id', '=', 'companies_m.id')
                                            ->where('group_name','=','Approver 2')
                                            ->where('users.companies_m_id','=',Auth::user()->companies_m_id)
                                            ->get();
                                        $toApp2 = array();
                                        foreach ($to as $arrEmailRow){
                                            $toApp2[] = $arrEmailRow->email ;
                                        }  
                                        $message->from($emailSender ,'ABM E-Cataloguing Systems')
                                            ->to($toApp2, 'ABM E-Cataloguing Systems')
                                            //->bcc('bqsoft77@gmail.com','Develoment')
                                            ->subject('Request Meterial Inventory');
                                    });
                                }else{
                                    $UpdateInventoryPlant->approver1 = $row['approver1'] ;
                                    $UpdateInventoryPlant->approver1_by_id = $user_id ;
                                    $UpdateInventoryPlant->approver1_date = date("Y-m-d H:i:s") ;
                                    // $UpdateInventoryPlant->items_is_active = $row['approver1'] ;

                                    $senderName  = Auth::user()->real_name;
                                    $emailSender = Auth::user()->email;

                                    $data = array(
                                        'from'=>$emailSender,
                                        'dear'=>'Dear Inventory Control',
                                        'catalog_no'=>$row['catalog_no'],
                                        'sap_no'=>$row['sap_material_code'],
                                        'short_text'=>$row['short_description'],
                                        'plant'=>$row['plant'],
                                        'status'=>$row['approver1'],
                                        'regard'=> $senderName
                                    );
                                    $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    $beautymail->send('emails.InventoryNotValidate', $data, function($message) use ($row)
                                    {
                                        $emailSender = Auth::user()->email;
                                        $input = Input::all();
                                        $InventoryPlant = InventoryPlant::select(DB::raw("users.email"))
                                            ->leftJoin('users', 'inventory_plant.inv_controll_by_id', '=', 'users.user_id')
                                            ->where('plant','=',$input['plant'])
                                            ->where('adr_d_items_id','=',$input['adr_d_items_id'])
                                            ->get();
                                        $toIC = $InventoryPlant->first()->getattributes()['email'];
                                        $message->from($emailSender ,'ABM E-Cataloguing Systems')
                                            ->to($toIC, 'ABM E-Cataloguing Systems')
                                            //->bcc('bqsoft77@gmail.com','Develoment')
                                            ->subject('Request Meterial Inventory');
                                    });
                                    
                                }
                            }
                            if($levelUser == 'Approver 2'){
                                if($row['approver2'] == 'Validate') {
                                    $UpdateInventoryPlant->approver2 = $row['approver2'];
                                    $UpdateInventoryPlant->approver2_by_id = $user_id;
                                    $UpdateInventoryPlant->approver2_date = date("Y-m-d H:i:s");
                                    // $UpdateInventoryPlant->items_is_active = $row['approver2'];

                                    $senderName  = Auth::user()->real_name;
                                    $emailSender = Auth::user()->email;

                                    $data = array(
                                        'from'=>$emailSender,
                                        'dear'=>'Dear User',
                                        'catalog_no'=>$row['catalog_no'],
                                        'sap_no'=>$row['sap_material_code'],
                                        'short_text'=>$row['short_description'],
                                        'plant'=>$row['plant'],
                                        'status'=>$row['approver2'],
                                        'regard'=> $senderName
                                    );
                                    $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    $beautymail->send('emails.InventoryValidate', $data, function($message) use ($row)
                                    {
                                        $emailSender = Auth::user()->email;
                                        $input = Input::all();

                                        $InventoryIC = InventoryPlant::select(DB::raw("users.email"))
                                            ->leftJoin('users', 'inventory_plant.inv_controll_by_id', '=', 'users.user_id')
                                            ->where('plant','=',$input['plant'])
                                            ->where('adr_d_items_id','=',$input['adr_d_items_id'])
                                            ->get();
                                        $toIC = $InventoryIC->first()->getattributes()['email'];                                        
                                        $InventoryPlant1 = InventoryPlant::select(DB::raw("users.email"))
                                            ->leftJoin('users', 'inventory_plant.approver1_by_id', '=', 'users.user_id')
                                            ->where('plant','=',$input['plant'])
                                            ->where('adr_d_items_id','=',$input['adr_d_items_id'])
                                            ->get();
                                        $toApp1 = $InventoryPlant1->first()->getattributes()['email'];                                  

                                        $InventoryPlant = InventoryPlant::select(DB::raw("users.email"))
                                            ->leftJoin('users', 'inventory_plant.created_by', '=', 'users.user_id')
                                            ->where('plant','=',$input['plant'])
                                            ->where('adr_d_items_id','=',$input['adr_d_items_id'])
                                            ->get();
                                        $toUser = $InventoryPlant->first()->getattributes()['email'];
                                        $cc = array($toIC , $toApp1);
                                        // var_dump($cc);
                                        $message->from($emailSender ,'ABM E-Cataloguing Systems')
                                            ->to($toUser, 'ABM E-Cataloguing Systems')
                                            ->cc($cc, 'ABM E-Cataloguing Systems')
                                            //->bcc('bqsoft77@gmail.com','Develoment')
                                            ->subject('Request Meterial Inventory');
                                    });
                                }else{
                                    $UpdateInventoryPlant->approver2 = $row['approver2'] ;
                                    $UpdateInventoryPlant->approver2_by_id = $user_id ;
                                    $UpdateInventoryPlant->approver2_date = date("Y-m-d H:i:s") ;
                                    // $UpdateInventoryPlant->items_is_active = $row['approver2'] ;

                                    $senderName  = Auth::user()->real_name;
                                    $emailSender = Auth::user()->email;

                                    $data = array(
                                        'from'=>$emailSender,
                                        'dear'=>'Dear Approver 1',
                                        'catalog_no'=>$row['catalog_no'],
                                        'sap_no'=>$row['sap_material_code'],
                                        'short_text'=>$row['short_description'],
                                        'plant'=>$row['plant'],
                                        'status'=>$row['approver2'],
                                        'regard'=> $senderName
                                    );
                                    $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    $beautymail->send('emails.InventoryNotValidate', $data, function($message) use ($row)
                                    {
                                        $emailSender = Auth::user()->email;
                                        $input = Input::all();
                                        $InventoryPlant = InventoryPlant::select(DB::raw("users.email"))
                                            ->leftJoin('users', 'inventory_plant.approver1_by_id', '=', 'users.user_id')
                                            ->where('plant','=',$input['plant'])
                                            ->where('adr_d_items_id','=',$input['adr_d_items_id'])
                                            ->get();
                                        $toApp2 = $InventoryPlant->first()->getattributes()['email'];
                                        $message->from($emailSender ,'ABM E-Cataloguing Systems')
                                            ->to($toApp2, 'ABM E-Cataloguing Systems')
                                            //->bcc('bqsoft77@gmail.com','Develoment')
                                            ->subject('Request Meterial Inventory');
                                    });
                                    
                                }
                            }
                        }
                    }
                    $UpdateInventoryPlant->save();

//                    var_dump(DB::getQueryLog());
                }else{
//                    var_dump('New Items');
                    $InventoryPlant = new InventoryPlant();
                    foreach ($row as $field=>$value){
                        $check = substr($value, 0, 6);
                        $arrRow[$field] = $value;
                        if($field !=='_token' ) {
                            if ($field !== 'adr_m_id') {
                                if ($field !== 'inventory_id') {
                                    if ($field !== 'sap_material_code') {
                                        if ($field !== 'sap_material_code_by') {
                                            if ($field !== 'sap_material_code_date') {
                                                if ($field !== 'short_description') {
                                                    if ($field !== 'long_description') {
                                                        if ($field !== 'status_user') {
                                                            if ($field !== 'inv_controll_by') {
                                                                if ($field !== 'inv_controll_date') {
                                                                    if ($field !== 'EndApproval') {
                                                                        if ($field !== 'items_is_active') {
                                                                            if ($check !== 'Select') {
                                                                                $InventoryPlant->$field = $value;
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
                        if($field == 'items_is_active'){
                            if($levelUser == 'User'){
                                $InventoryPlant->items_is_active = 'Validate' ;
                                $senderName  = Auth::user()->real_name;
                                $emailSender = Auth::user()->email;

                                $InventoryPlant->created_by = $user_id ;
                                $InventoryPlant->created_at = date("Y-m-d H:i:s") ; ;   

                                $InventoryPlant->inv_controll = null ;
                                $InventoryPlant->inv_controll_by_id = null ;
                                $InventoryPlant->inv_controll_date = null ;                                

                                $InventoryPlant->inv_controll = null ;
                                $InventoryPlant->inv_controll_by_id = null ;
                                $InventoryPlant->inv_controll_date = null ;

                                $InventoryPlant->approver1 = null ;
                                $InventoryPlant->approver1_by_id = null;
                                $InventoryPlant->approver1_date = null ;

                                $InventoryPlant->approver2 = null;
                                $InventoryPlant->approver2_by_id = null;
                                $InventoryPlant->approver2_date = null ;

                                $data = array(
                                    'from'=>$emailSender,
                                    'catalog_no'=>$row['catalog_no'],
                                    'sap_no'=>$row['sap_material_code'],
                                    'short_text'=>$row['short_description'],
                                    'plant'=>$row['plant'],
                                    'regard'=> $senderName
                                );
                                $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                $beautymail->send('emails.UserRequestInventory', $data, function($message) use ($row)
                                {
                                    $emailSender = Auth::user()->email;
                                    $to = User::select(DB::raw("users.*"))
                                        ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                                        ->leftJoin('companies_m', 'users.companies_m_id', '=', 'companies_m.id')
                                        ->where('group_name','=','Inv Controller')
                                        ->where('users.companies_m_id','=',Auth::user()->companies_m_id)
                                        ->get();
                                    $toIC = array();
                                    foreach ($to as $arrEmailRow){
                                        $toIC[] = $arrEmailRow->email ;
                                    }

                                    $message->from($emailSender ,'ABM E-Cataloguing Systems')
                                        ->to($toIC, 'ABM E-Cataloguing Systems')
                                        //->bcc('bqsoft77@gmail.com','Develoment')
                                        ->subject('Request Meterial Inventory');
                                });
                            }  
                        }                      
//                         if($field == 'inv_controll' && $check == 'Select'){
//                             $senderName  = Auth::user()->real_name;
//                             $emailSender = Auth::user()->email;

//                             $data = array(
//                                 'from'=>$emailSender,
//                                 'catalog_no'=>$row['catalog_no'],
//                                 'sap_no'=>$row['sap_material_code'],
//                                 'short_text'=>$row['short_description'],
//                                 'plant'=>$row['plant'],
//                                 'regard'=> $senderName
//                             );
//                             $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
//                             $beautymail->send('emails.UserRequestInventory', $data, function($message)
//                             {
//                                 $emailSender = Auth::user()->email;
// //                                    DB::enableQueryLog();
//                                 $to = User::select(DB::raw("users.*"))
//                                     ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
//                                     ->leftJoin('companies_m', 'users.companies_m_id', '=', 'companies_m.id')
//                                     ->where('group_name','=','Inv Controller')
//                                     ->where('users.companies_m_id','=',Auth::user()->companies_m_id)
//                                     ->get();
//                                 $toIC = array();
//                                 foreach ($to as $arrEmailRow){
//                                     $toIC[] = $arrEmailRow->email ;
//                                 }

//                                 $message->from($emailSender ,'ABM E-Cataloguing Systems')
//                                     ->to($toIC, 'ABM E-Cataloguing Systems')
//                                     ->bcc('bqsoft77@gmail.com','Develoment')
//                                     ->subject('Request Meterial Inventory');
//                             });
//                             $InventoryPlant->created_by = Auth::user()->user_id;
//                         }

                    }


                    $InventoryPlant->save();
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
}
