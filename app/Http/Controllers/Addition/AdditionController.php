<?php

namespace App\Http\Controllers\Addition;


use App\Models\AdrDItemsDocument;
use App\Models\AdrDItemsImages;
use App\Models\AdrDItemsViewNotes;
use App\Models\EloquentBaseModel;
use App\Models\IncM;
use App\Models\RevisionAdrDItems;
use App\Models\RevisionAdrDItemsStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Input;
use Response;

use Validator;
use App\Helpers\AutoNumber;
use App\Http\Controllers\Controller;
use App\Models\AdrM;
use App\Models\AdrMStatus;
use App\Models\AdrDItems;
use App\Models\AdrDItemsStatus;
use App\Models\AdrDItemsCrossreferences;
use App\Models\AdrDItemsFuncLoc;
use App\Models\IncCharacteristics;
use App\Models\AdrDItemsCharacteristics;
// use User;
use Illuminate\Foundation\Auth\User;
use UserGroup;
use Auth;
use DB;
use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;
use Session;
use Excel;
use File;

class AdditionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function TestMail()
    {

        $mat_owner = self::getMaterialOwner('5baadd00a3830');
        $Note = self::getNote(3795);

        $data = array(
            'from' => 'ecat@abm-investama.co.id',
            'catalog_no' => 'X125TESTTTTT',
            'short_text' => 'NBAX',
            'Catagory' => 'O',
            'mat_owner' => $mat_owner,
            'Note' => $Note,
            'regard' => 'Achmad'
        );
        $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
        $beautymail->send('emails.UserRequest', $data, function ($message) {
            $emailSender = "richofaridi@arzaintdp.com";

            $message->from($emailSender, 'ABM E-Cataloguing Systems')
                ->to('richofaridi@gmail.com', 'ABM E-Cataloguing Systems')
                ->cc('richofaridi@arzaintdp.com')
                //->bcc('bqsoft77@gmail.com','Develoment')
                ->subject('TEST MAIL dari developmen');
        });
    }
    public function CreateAddition(Request $request)
    {
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;

            $input = Input::all();
            $table = "adr_m";
            $primary = "id";
            $years = date('Y');
            $prefix = $input['company_code'];
            $sprintf = "%06s";
            $adr_no = AutoNumber::autonumber($table, $primary, $prefix, $years, $sprintf);

            $adrM = new AdrM();
            $adrM->adr_no = $adr_no;
            $adrM->company_code = $prefix;
            $adrM->creator_id = $user_id;
            $adrM->save();
            $adr_m_id = $adrM->id;

            $adrMStatus = new AdrMStatus();
            $adrMStatus->adr_m_id = $adr_m_id;
            $adrMStatus->adr_status = 'ADDITION';
            $adrMStatus->save();

            if ($input['data_grid'] != '[]') {
                $sql = array();
                $sql_cross = array();
                $detail = json_decode(stripslashes($input['data_grid']));
                $i = 0;
                foreach ($detail as $row) {
                    $arrRow = array();
                    $arrRowCross = array();
                    $col = array();
                    $val = array();

                    $colCross = array();
                    $valCross = array();

                    $col[] = 'adr_m_id';
                    $val[] = $adr_m_id; // Mengacu pada nomor ADR yang terakhir terbentuk

                    $col[] =  'catalog_no';
                    $val[] = "'" . $adr_no . "'";

                    foreach ($row as $head => $value) {
                        if ($head != 'id') {
                            if ($head != 'adr_no') {
                                if ($head != 'item_status') {
                                    if ($head != 'class_code') {
                                        if ($head != 'inc_code') {
                                            if ($head != 'norder') {
                                                if ($head != 'manuf') {
                                                    if ($head != 'refnbr') {
                                                        $arrRow[$head] = $value;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if ($head == 'class_code') {
                            $arrRow['groupclass'] = $value;
                        }
                        if ($head == 'inc_code') {
                            $arrRow['inc'] = $value;
                        }

                        if ($head == 'manuf') {
                            $colCross[] =  'manufactur';
                            $valCross[] = "'" . $value . "'";
                            $arrRowCross['manufactur'] = $value;
                        }
                        if ($head == 'old_mat_no') {
                            $colCross[] =  'old_mat_no';
                            $valCross[] = "'" . $value . "'";
                            $arrRowCross['old_mat_no'] = $value;
                        }
                        if ($head == 'refnbr') {
                            $colCross[] =  'refno';
                            $valCross[] = "'" . $value . "'";
                            $arrRowCross['refno'] = $value;
                        }
                    }
                    if ($row->flag !== 'failed') {
                        $sql[] = $arrRow;
                        //                        if(!empty($row->manuf) || !empty($row->refnbr)) {
                        $sql_cross[$i] = $arrRowCross;
                        //                        }

                    }
                    $i++;
                }
                $d_items_id = array();
                foreach ($sql as $arrRow) {
                    $table = "adr_d_items";
                    $primary = "catalog_no";
                    $years = '';
                    $prefix = "";
                    $sprintf = "%0s";
                    $catalog_no = AutoNumber::autonumber($table, $primary, $prefix, $years, $sprintf);

                    $adr_d_items = new AdrDItems();
                    $adr_d_items->adr_m_id = $adr_m_id;
                    $adr_d_items->raw = $arrRow['raw'];
                    $adr_d_items->transaction_type = $arrRow['transaction_type'];
                    $adr_d_items->catalog_no = $catalog_no;
                    $adr_d_items->inc = $arrRow['inc'];
                    $adr_d_items->groupclass = $arrRow['groupclass'];
                    $adr_d_items->created_by = $user_id;
                    $adr_d_items->useremail = Auth::user()->email;
                    $adr_d_items->save();
                    $adr_d_items_id = $adr_d_items->id;
                    $d_items_id[] = $adr_d_items_id;

                    $adrDItemsStatus = new AdrDItemsStatus();
                    $adrDItemsStatus->adr_d_items_id = $adr_d_items_id;
                    $adrDItemsStatus->item_status = 'ON PROCESS';
                    $adrDItemsStatus->save();

                    $dataIncChar = IncCharacteristics::select(DB::raw("*"))
                        ->where('inc', '=', $arrRow['inc'])
                        ->get();
                    $iChr = 0;
                    foreach ($dataIncChar as $rowIncChar) {
                        $adrDItemsCharacteristics = new AdrDItemsCharacteristics();
                        $adrDItemsCharacteristics->adr_d_items_id = $adr_d_items_id;
                        $adrDItemsCharacteristics->catalog_no = $catalog_no;
                        $adrDItemsCharacteristics->inc_m_id = $rowIncChar->inc_m_id;
                        $adrDItemsCharacteristics->inc_characteristics_id = $rowIncChar->id;
                        $adrDItemsCharacteristics->mrcode = $rowIncChar->mrcode;
                        $adrDItemsCharacteristics->save();
                        $iChr++;
                    }
                }

                $r = 0;
                foreach ($sql_cross as $arrRow) {
                    if (!empty($arrRow['manufactur']) || !empty($arrRow['refno'])) {
                        $adr_d_items = new AdrDItemsCrossreferences();
                        $adr_d_items->adr_d_items_id = $d_items_id[$r];
                        $adr_d_items->refno = $arrRow['refno'];
                        $adr_d_items->manufactur = $arrRow['manufactur'];
                        $adr_d_items->old_material_code = $arrRow['old_mat_no'];
                        $adr_d_items->save();
                    }
                    $r++;
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
        return \Response::json($data, 200);
    }
    public function getAdditionHistoryM(Request $request)
    {
        // $sql = "SELECT * FROM vw_adr_m ";
        // $result = BaseModel::buildSql($sql);
        // return \Response::json($result,200);
        $sql = "SELECT * FROM vw_adr_m ";
        $result = BaseModel::buildSql($sql);
        if ($request->action == 'getAdrM') {

            return \Response::json($result, 200);
        } else {
            return \Response::json($result['data'], 200);
        }
    }
    public function getAdditionHistoryD(Request $request)
    {
        $sql = "SELECT * FROM vw_adr_d_items ";
        $result = BaseModel::buildSql($sql);
        // return \Response::json($result,200);
        return \Response::json($result['data'], 200);
    }

    public function getAdditionHistoryDTable(Request $request)
    {
        $sql = "SELECT * FROM vw_adr_d_items ";
        $result = BaseModel::buildSql($sql);
        // return \Response::json($result,200);
        return \Response::json($result, 200);
    }
    public function getTransferOwner(Request $request)
    {
        $sql = "SELECT * FROM vw_adr_d_items_transfer";
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result, 200);
    }
    public function getTransportOwner_p(Request $request)
    {
        $userlm = $request->input('OwnerCode');
        $userbr = $request->input('NewOwnerCode');
        $userproc = $request->input('UserProses');
        $pcode = $request->input('ProsesCode');
        $trxno = $request->input('trxno');
        $sql = "call p_transfer_data('$trxno','$userlm','$userbr','$userproc',$pcode)";
        $result = DB::select($sql);
        return \Response::json($result, 200);
    }
    public function SaveMaterialRaw(Request $request)
    {
        DB::beginTransaction();
        try {
            $input = Input::all();

            $catno = $request->input('catalog_no');
            $newRaw = $request->input('newRaw');
            if ($catno <> '' && $newRaw <> '') {
                AdrDItems::where('catalog_no', '=', $catno)
                    ->update(['raw' => $newRaw]);
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

    public function getAddtionCreator(Request $request)
    {
        $sql = "SELECT * FROM vw_adr_d_items";
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result, 200);
    }

    public function getMaterialOwner($catno)
    {
        $data = array();
        $row = array();
        $x = 0;
        $sql = "SELECT real_name FROM users WHERE user_id IN (SELECT created_by FROM adr_d_items WHERE catalog_no=$catno)";
        $result = BaseModel::buildSql($sql);;
        foreach ($result as $data) {
            if ($x == 0) {
                foreach ($data as $data2) {
                    $row = (array)$data2;
                    $realname = trim($row['real_name']);
                }
                $x++;
            }
        }
        return $realname;
    }
    public function getCatagory($catgo)
    {
        $Catgor = 'Anonymous';
        if ($catgo == 'O') {
            $Catgor = 'Operation';
        } elseif ($catgo == 'H') {
            $Catgor = 'Safety';
        } elseif ($catgo == 'I') {
            $Catgor = 'ITC';
        } elseif ($catgo == 'M') {
            $Catgor = 'Maintaining';
        } elseif ($catgo == 'T') {
            $Catgor = 'Trashipment';
        } elseif ($catgo == 'G') {
            $Catgor = 'Office Supplier';
        } else {
            $Catgor = 'Unidentified';
        }


        return $catgo . ' - ' . $Catgor;
    }
    public function getNote($catno)
    {
        $data = array();
        $row = array();
        $x = 0;
        $sql = "SELECT GROUP_CONCAT(notes SEPARATOR '// -') as Note FROM adr_d_items_view_notes WHERE adr_d_items_id IN  (SELECT id FROM adr_d_items WHERE catalog_no=$catno)";
        $result = BaseModel::buildSql($sql);;
        foreach ($result as $data) {
            if ($x == 0) {
                foreach ($data as $data2) {
                    $row = (array)$data2;
                    $note = trim($row['Note']);
                }
                $x++;
            }
        }
        return $note;
    }

    public function SingleViewApplyChanges(Request $request)
    {
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $message = '';
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id', '=', $user_id)
                ->get();
            $levelUser = $dataUserProfile[0]['group_name'];
            foreach ($input as $key => $value) {
                $data[$key] = $value;
            }
            $reason =  $data['reason'];

            unset($data['reason']);
            $sql_d_items = array();
            $adr_d_items = array($data);
            $i = 1;
            foreach ($adr_d_items as $row) {
                $col = array();
                $val = array();
                $arrRow = array();
                $adrDitems = AdrDItems::find($row['adr_d_items_id']);
                foreach ($row as $field => $value) {
                    $check = substr($value, 0, 6);
                    $arrRow[$field] = $value;
                    if ($field !== '_token') {
                        if ($field !== 'items_characteristic') {
                            if ($field !== 'adr_d_items_id') {
                                if ($field !== 'item_status') {
                                    if ($field !== 'adr_status') {
                                        if ($field !== 'category') {
                                            if ($field !== 'updated_by') {
                                                if ($field !== 'cataloguer') {
                                                    if ($field !== 'cataloguer_by') {
                                                        if ($field !== 'cataloguer_date') {
                                                            if ($field !== 'std_approval_by') {
                                                                if ($field !== 'std_approval') {
                                                                    if ($field !== 'std_approval_date') {
                                                                        if ($field !== 'proc_approver_by') {
                                                                            if ($field !== 'proc_approver') {
                                                                                if ($field !== 'proc_approver_date') {
                                                                                    if ($field !== 'items_is_active') {
                                                                                        if ($field !== 'sap_material_code_by') {
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
                                    }
                                }
                            }
                        }
                    }
                    if ($field == 'items_is_active') {
                        if ($levelUser == 'User') {

                            // NEW UPDATE

                            // NEW UPDATE


                            $adrDitems->items_is_active = 'Validate';
                            $senderName  = Auth::user()->real_name;
                            $emailSender = Auth::user()->email;

                            $adrDitems->category = $row['category'];
                            $adrDitems->updated_by = $user_id;
                            $adrDitems->updated_at = date("Y-m-d H:i:s");
                            $adrDitems->user_submit_date = $adrDitems->updated_at;

                            $adrDitems->cataloguer = null;
                            $adrDitems->cataloguer_by_id = null;
                            $adrDitems->cataloguer_date = null;

                            $adrDitems->std_approval = null;
                            $adrDitems->std_approval_by_id = null;
                            $adrDitems->std_approval_date = null;

                            $adrDitems->proc_approver = null;
                            $adrDitems->proc_approver_by_id = null;
                            $adrDitems->proc_approver_date = null;

                            $mat_owner = self::getMaterialOwner($row['catalog_no']);
                            $Note = self::getNote($row['catalog_no']);
                            $KataGot = self::getCatagory($row['category']);

                            $setFrom = 'ecat@abm-investama.co.id';
                            $titlesetFrom = 'ABM E-Cataloguing Systems';
                            $data = array(
                                'from' => $emailSender,
                                'catalog_no' => $row['catalog_no'],
                                'short_text' => $row['short_description'],
                                'Catagory' => $KataGot,
                                'mat_owner' => $mat_owner,
                                'Note' => $Note,
                                'regard' => $senderName
                            );
                            $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                            $beautymail->send('emails.UserRequest', $data, function ($message) use ($row) {
                                $emailSender = Auth::user()->email;
                                $to = User::select(DB::raw("users.*"))
                                    ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                                    ->leftJoin('companies_m', 'users.companies_m_id', '=', 'companies_m.id')
                                    ->where('group_name', '=', 'Cat')
                                    ->where('users.companies_m_id', '=', Auth::user()->companies_m_id)
                                    ->get();
                                $toCatalogue = array();
                                foreach ($to as $arrEmailRow) {
                                    $toCatalogue[] = $arrEmailRow->email;
                                }
                                $message->from($emailSender, 'ABM E-Cataloguing Systems')
                                    ->to($toCatalogue, 'ABM E-Cataloguing Systems')
                                    //->bcc('bqsoft77@gmail.com', 'Development')
                                    ->subject('Request ' . $row['transaction_type']);
                            });

                            if ($reason != null) {
                                DB::table('adr_d_notes_notvalidate')->insert([
                                    'adr_no' => $row['adr_d_items_id'],
                                    'catalog_no' => $row['catalog_no'],
                                    'item_status' => $row['item_status'],
                                    'transaction_type' => $row['transaction_type'],
                                    'sap_material_code' => $row['sap_material_code'],
                                    'reason' => $reason,
                                    'updated_at' => date("Y-m-d H:i:s"),
                                    'updated_by' => $row['updated_by']
                                ]);
                            }
                        }
                        if ($levelUser == 'Cat') {
                            // check disini
                            if ($row['cataloguer'] == 'Validate' && $row['std_approval'] == 'Validate') {

                                $adrDitems->cataloguer = $row['cataloguer'];
                                $adrDitems->cataloguer_by_id = $user_id;
                                $adrDitems->cataloguer_date = date("Y-m-d H:i:s");
                                $adrDitems->items_is_active = $row['cataloguer'];

                                // $mat_owner = self::getMaterialOwner($row['catalog_no']);
                                // $Note = self::getNote($row['catalog_no']);
                                // $setFrom = 'ecat@abm-investama.co.id';
                                // $titlesetFrom = 'ABM E-Cataloguing Systems';
                                // $data = array(
                                //     'from' => $dataUserProfile[0]['email'],
                                //     'catalog_no' => $row['catalog_no'],
                                //     'short_text' => $row['short_description'],
                                //     'Catagory' => self::getCatagory($row['category']),
                                //     'mat_owner' => $mat_owner,
                                //     'Note' => $Note,
                                //     'regard' => $dataUserProfile[0]['real_name']
                                // );

                                $adrDitems->std_approval = $row['std_approval'];
                                $adrDitems->std_approval_by_id = $user_id;
                                $adrDitems->std_approval_date = date("Y-m-d H:i:s");
                                $mat_owner = self::getMaterialOwner($row['catalog_no']);
                                $Note = self::getNote($row['catalog_no']);
                                $KataGot = self::getCatagory($row['category']);
                                $setFrom = 'ecat@abm-investama.co.id';
                                $titlesetFrom = 'ABM E-Cataloguing Systems';
                                $data = array(
                                    'from' => $dataUserProfile[0]['email'],
                                    'catalog_no' => $row['catalog_no'],
                                    'short_text' => $row['short_description'],
                                    'std' => $levelUser,
                                    'Catagory' => $KataGot,
                                    'mat_owner' => $mat_owner,
                                    'Note' => $Note,
                                    'regard' => $dataUserProfile[0]['real_name']
                                );
                                $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                $beautymail->send('emails.StdAppValidate', $data, function ($message) use ($row) {
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
                                        //->bcc('bqsoft77@gmail.com', 'Development')
                                        ->subject('Request ' . $row['transaction_type']);
                                });
                                if ($reason != null) {
                                    DB::table('adr_d_notes_notvalidate')->insert([
                                        'adr_no' => $row['adr_d_items_id'],
                                        'catalog_no' => $row['catalog_no'],
                                        'item_status' => $row['item_status'],
                                        'transaction_type' => $row['transaction_type'],
                                        'sap_material_code' => $row['sap_material_code'],
                                        'reason' => $reason,
                                        'updated_at' => date("Y-m-d H:i:s"),
                                        'updated_by' => $row['updated_by']
                                    ]);
                                }
                            } else if ($row['cataloguer'] == 'Validate') {
                                $adrDitems->cataloguer = $row['cataloguer'];
                                $adrDitems->cataloguer_by_id = $user_id;
                                $adrDitems->cataloguer_date = date("Y-m-d H:i:s");
                                $adrDitems->items_is_active = $row['cataloguer'];

                                $mat_owner = self::getMaterialOwner($row['catalog_no']);
                                $Note = self::getNote($row['catalog_no']);
                                $setFrom = 'ecat@abm-investama.co.id';
                                $titlesetFrom = 'ABM E-Cataloguing Systems';
                                $data = array(
                                    'from' => $dataUserProfile[0]['email'],
                                    'catalog_no' => $row['catalog_no'],
                                    'short_text' => $row['short_description'],
                                    'Catagory' => self::getCatagory($row['category']),
                                    'mat_owner' => $mat_owner,
                                    'Note' => $Note,
                                    'regard' => $dataUserProfile[0]['real_name']
                                );
                                $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                $beautymail->send('emails.CatValidate', $data, function ($message) use ($row) {
                                    $input = Input::all();
                                    $emailSender = Auth::user()->email;
                                    $type = $input['category'];
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
                                        //->bcc('bqsoft77@gmail.com', 'Development')
                                        ->subject('Request ' . $row['transaction_type']);
                                });
                                if ($reason != null) {
                                    DB::table('adr_d_notes_notvalidate')->insert([
                                        'adr_no' => $row['adr_d_items_id'],
                                        'catalog_no' => $row['catalog_no'],
                                        'item_status' => $row['item_status'],
                                        'transaction_type' => $row['transaction_type'],
                                        'sap_material_code' => $row['sap_material_code'],
                                        'reason' => $reason,
                                        'updated_at' => date("Y-m-d H:i:s"),
                                        'updated_by' => $row['updated_by']
                                    ]);
                                }
                            } else if ($row['cataloguer'] == 'Not Validate') {
                                $adrDitems->cataloguer = $row['cataloguer'];
                                $adrDitems->cataloguer_by_id = $user_id;
                                $adrDitems->cataloguer_date = date("Y-m-d H:i:s");
                                $adrDitems->items_is_active = $row['cataloguer'];

                                if ($dataUserProfile[0]['group_name'] == 'Cat') {
                                    $setFrom = 'ecat@abm-investama.co.id';
                                    $titlesetFrom = 'ABM E-Cataloguing Systems';
                                    $mat_owner = self::getMaterialOwner($row['catalog_no']);
                                    $Note = self::getNote($row['catalog_no']);
                                    $data = array(
                                        'from' => $dataUserProfile[0]['email'],
                                        'catalog_no' => $row['catalog_no'],
                                        'short_text' => $row['short_description'],
                                        'Catagory' => self::getCatagory($row['category']),
                                        'mat_owner' => $mat_owner,
                                        'Note' => $Note,
                                        'regard' => $dataUserProfile[0]['real_name']
                                    );
                                    $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    $beautymail->send('emails.CatNotValidate', $data, function ($message) use ($row) {
                                        $emailSender = Auth::user()->email;
                                        $input = Input::all();
                                        $query = DB::table('vw_catalog_m_owner');
                                        $query->where('catalog_no', "=", $row['catalog_no']);
                                        $search = $query->get();
                                        $toOwner = array();
                                        foreach ($search as $arrEmailRow) {
                                            $toOwner[] = $arrEmailRow->email;
                                        }
                                        $message
                                            ->from($emailSender, 'ABM E-Cataloguing Systems')
                                            ->to($toOwner, 'ABM E-Cataloguing Systems')
                                            //->bcc('bqsoft77@gmail.com', 'Development')
                                            ->subject('Request ' . $row['transaction_type']);
                                    });
                                }

                                // update reason
                                DB::table('adr_d_notes_notvalidate')->insert([
                                    'adr_no' => $row['adr_d_items_id'],
                                    'catalog_no' => $row['catalog_no'],
                                    'item_status' => $row['item_status'],
                                    'transaction_type' => $row['transaction_type'],
                                    'sap_material_code' => $row['sap_material_code'],
                                    'reason' => $reason,
                                    'updated_at' => date("Y-m-d H:i:s"),
                                    'updated_by' => $row['updated_by']
                                ]);
                            }
                        }
                        if (substr(strtolower($levelUser), 0, 3) == 'std') {
                            if ($row['std_approval'] == 'Validate') {
                                $adrDitems->std_approval = $row['std_approval'];
                                $adrDitems->std_approval_by_id = $user_id;
                                $adrDitems->std_approval_date = date("Y-m-d H:i:s");
                                $mat_owner = self::getMaterialOwner($row['catalog_no']);
                                $Note = self::getNote($row['catalog_no']);
                                $KataGot = self::getCatagory($row['category']);
                                $setFrom = 'ecat@abm-investama.co.id';
                                $titlesetFrom = 'ABM E-Cataloguing Systems';
                                $data = array(
                                    'from' => $dataUserProfile[0]['email'],
                                    'catalog_no' => $row['catalog_no'],
                                    'short_text' => $row['short_description'],
                                    'std' => $levelUser,
                                    'Catagory' => $KataGot,
                                    'mat_owner' => $mat_owner,
                                    'Note' => $Note,
                                    'regard' => $dataUserProfile[0]['real_name']
                                );
                                $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                $beautymail->send('emails.StdAppValidate', $data, function ($message) use ($row) {
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
                                        //->bcc('bqsoft77@gmail.com', 'Development')
                                        ->subject('Request ' . $row['transaction_type']);
                                });
                                if ($reason != null) {
                                    DB::table('adr_d_notes_notvalidate')->insert([
                                        'adr_no' => $row['adr_d_items_id'],
                                        'catalog_no' => $row['catalog_no'],
                                        'item_status' => $row['item_status'],
                                        'transaction_type' => $row['transaction_type'],
                                        'sap_material_code' => $row['sap_material_code'],
                                        'reason' => $reason,
                                        'updated_at' => date("Y-m-d H:i:s"),
                                        'updated_by' => $row['updated_by']
                                    ]);
                                }
                            } else {
                                // update cataloger not validate
                                $adrDitems->cataloguer = null;
                                // update cataloger not validate
                                $adrDitems->std_approval = $row['std_approval'];
                                $adrDitems->std_approval_by_id = $user_id;
                                $adrDitems->std_approval_date = date("Y-m-d H:i:s");
                                $adrDitems->items_is_active = $row['std_approval'];
                                $mat_owner = self::getMaterialOwner($row['catalog_no']);
                                $Note = self::getNote($row['catalog_no']);
                                $setFrom = 'ecat@abm-investama.co.id';
                                $titlesetFrom = 'ABM E-Cataloguing Systems';
                                $data = array(
                                    'from' => $dataUserProfile[0]['email'],
                                    'catalog_no' => $row['catalog_no'],
                                    'short_text' => $row['short_description'],
                                    'std' => $levelUser,
                                    'Catagory' => self::getCatagory($row['category']),
                                    'mat_owner' => $mat_owner,
                                    'Note' => $Note,
                                    'regard' => $dataUserProfile[0]['real_name']
                                );
                                $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                $beautymail->send('emails.StdAppNotValidate', $data, function ($message) use ($row) {
                                    $emailSender = Auth::user()->email;
                                    $input = Input::all();
                                    $query = DB::table('vw_catalog_m_owner');
                                    $query->where('catalog_no', "=", $row['catalog_no']);
                                    $search = $query->get();
                                    $toOwner = array();
                                    foreach ($search as $arrEmailRow) {
                                        $toOwner[] = $arrEmailRow->email;
                                    }
                                    $message
                                        ->from($emailSender, 'ABM E-Cataloguing Systems')
                                        ->to($toOwner, 'ABM E-Cataloguing Systems')
                                        //->bcc('bqsoft77@gmail.com', 'Development')
                                        ->subject('Request ' . $row['transaction_type']);
                                });

                                // update reason
                                DB::table('adr_d_notes_notvalidate')->insert([
                                    'adr_no' => $row['adr_d_items_id'],
                                    'catalog_no' => $row['catalog_no'],
                                    'item_status' => $row['item_status'],
                                    'transaction_type' => $row['transaction_type'],
                                    'sap_material_code' => $row['sap_material_code'],
                                    'reason' => $reason,
                                    'updated_at' => date("Y-m-d H:i:s"),
                                    'updated_by' => $row['updated_by']
                                ]);
                            }
                        }
                        if ($levelUser == 'Proc') {
                            if ($row['proc_approver'] == 'Validate') {
                                $adrDitems->proc_approver = $row['proc_approver'];
                                $adrDitems->proc_approver_by_id = $user_id;
                                $adrDitems->proc_approver_date = date("Y-m-d H:i:s");

                                if ($row['material_type'] !== 'ZOEM') {
                                    $table = "adr_d_items";
                                    $primary = "sap_material_code";
                                    $years = '';
                                    if ($row['transaction_type'] == 'Material') {
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
                                    $adrDItemsStatus->adr_d_items_id = $row['adr_d_items_id'];
                                    $adrDItemsStatus->item_status = 'ORIGIN';
                                    $adrDItemsStatus->save();
                                    $mat_owner = self::getMaterialOwner($row['catalog_no']);
                                    $Note = self::getNote($row['catalog_no']);
                                    $setFrom = 'ecat@abm-investama.co.id';
                                    $titlesetFrom = 'ABM E-Cataloguing Systems';
                                    $data = array(
                                        'from' => $dataUserProfile[0]['email'],
                                        'catalog_no' => $row['catalog_no'],
                                        'sap_material_code' => $generateSAPNO,
                                        'short_text' => $row['short_description'],
                                        'Catagory' => self::getCatagory($row['category']),
                                        'mat_owner' => $mat_owner,
                                        'Note' => $Note,
                                        'regard' => $dataUserProfile[0]['real_name']
                                    );
                                    $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                    $beautymail->send('emails.SAPMaterialCode', $data, function ($message) use ($row) {
                                        $emailSender = Auth::user()->email;
                                        $input = Input::all();
                                        $query = DB::table('vw_catalog_m_owner');
                                        $query->where('catalog_no', "=", $row['catalog_no']);
                                        $search = $query->get();
                                        $toOwner = array();
                                        foreach ($search as $arrEmailRow) {
                                            $toOwner[] = $arrEmailRow->email;
                                        }

                                        $queryCat = DB::table('adr_d_items');
                                        $queryCat->leftJoin('users', 'adr_d_items.cataloguer_by_id', '=', 'users.user_id');
                                        $queryCat->where('catalog_no', "=", $row['catalog_no']);
                                        $searchCat = $queryCat->get();
                                        $toCat = array();
                                        foreach ($searchCat as $arrEmailCat) {
                                            $toCat[] = $arrEmailCat->email;
                                        }

                                        $message
                                            ->from($emailSender, 'ABM E-Cataloguing Systems')
                                            ->to($toOwner, 'ABM E-Cataloguing Systems')
                                            // ->cc($toCat)
                                            //->bcc('bqsoft77@gmail.com', 'Development')
                                            ->subject('Request ' . $row['transaction_type']);
                                    });
                                    
                                } else {
                                    $adrDitems->sap_material_code = $row['sap_material_code'];
                                    $adrDitems->sap_material_code_by_id = $user_id;
                                    $adrDitems->sap_material_code_date = date("Y-m-d H:i:s");

                                    $adrDItemsStatus = new AdrDItemsStatus();
                                    $adrDItemsStatus->adr_d_items_id = $row['adr_d_items_id'];
                                    $adrDItemsStatus->item_status = 'ORIGIN';
                                    $adrDItemsStatus->save();
                                    if (!empty($row['sap_material_code'])) {
                                        $mat_owner = self::getMaterialOwner($row['catalog_no']);
                                        $Note = self::getNote($row['catalog_no']);
                                        $setFrom = 'ecat@abm-investama.co.id';
                                        $titlesetFrom = 'ABM E-Cataloguing Systems';
                                        $data = array(
                                            'from' => $dataUserProfile[0]['email'],
                                            'catalog_no' => $row['catalog_no'],
                                            'sap_material_code' => $row['sap_material_code'],
                                            'short_text' => $row['short_description'],
                                            'Catagory' => self::getCatagory($row['category']),
                                            'mat_owner' => $mat_owner,
                                            'Note' => $Note,
                                            'regard' => $dataUserProfile[0]['real_name']
                                        );
                                        $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                        $beautymail->send('emails.SAPMaterialCode', $data, function ($message) use ($row) {
                                            $emailSender = Auth::user()->email;
                                            $input = Input::all();
                                            $query = DB::table('vw_catalog_m_owner');
                                            $query->where('catalog_no', "=", $row['catalog_no']);
                                            $search = $query->get();
                                            $toOwner = array();
                                            foreach ($search as $arrEmailRow) {
                                                $toOwner[] = $arrEmailRow->email;
                                            }

                                            $queryCat = DB::table('adr_d_items');
                                            $queryCat->leftJoin('users', 'adr_d_items.cataloguer_by_id', '=', 'users.user_id');
                                            $queryCat->where('catalog_no', "=", $row['catalog_no']);
                                            $searchCat = $queryCat->get();
                                            $toCat = array();
                                            foreach ($searchCat as $arrEmailCat) {
                                                $toCat[] = $arrEmailCat->email;
                                            }
                                            $message
                                                ->from($emailSender, 'ABM E-Cataloguing Systems')
                                                ->to($toOwner, 'ABM E-Cataloguing Systems')
                                                // ->cc($toCat)
                                                //->bcc('bqsoft77@gmail.com', 'Development')
                                                ->subject('Request ' . $row['transaction_type']);
                                        });
                                    }
                                }
                                if ($reason != null) {
                                    DB::table('adr_d_notes_notvalidate')->insert([
                                        'adr_no' => $row['adr_d_items_id'],
                                        'catalog_no' => $row['catalog_no'],
                                        'item_status' => $row['item_status'],
                                        'transaction_type' => $row['transaction_type'],
                                        'sap_material_code' => $row['sap_material_code'],
                                        'reason' => $reason,
                                        'updated_at' => date("Y-m-d H:i:s"),
                                        'updated_by' => $row['updated_by']
                                    ]);
                                }
                            } else {
                                // update cataloger not validate
                                $adrDitems->cataloguer = null;
                                $adrDitems->std_approval = null;
                                // update cataloger not validate
                                $adrDitems->proc_approver = $row['proc_approver'];
                                $adrDitems->proc_approver_by_id = $user_id;
                                $adrDitems->proc_approver_date = date("Y-m-d H:i:s");
                                $adrDitems->items_is_active = $row['proc_approver'];
                                $mat_owner = self::getMaterialOwner($row['catalog_no']);
                                $Note = self::getNote($row['catalog_no']);
                                $setFrom = 'ecat@abm-investama.co.id';
                                $titlesetFrom = 'ABM E-Cataloguing Systems';
                                $data = array(
                                    'from' => $dataUserProfile[0]['email'],
                                    'catalog_no' => $row['catalog_no'],
                                    'short_text' => $row['short_description'],
                                    'Catagory' => self::getCatagory($row['category']),
                                    'mat_owner' => $mat_owner,
                                    'Note' => $Note,
                                    'regard' => $dataUserProfile[0]['real_name']
                                );
                                $beautymail = app()->make(\Snowfire\Beautymail\Beautymail::class);
                                $beautymail->send('emails.ProcNotValidate', $data, function ($message) use ($row) {
                                    $emailSender = Auth::user()->email;
                                    $input = Input::all();
                                    $query = DB::table('vw_catalog_m_owner');
                                    $query->where('catalog_no', "=", $row['catalog_no']);
                                    $search = $query->get();
                                    $toOwner = array();
                                    foreach ($search as $arrEmailRow) {
                                        $toOwner[] = $arrEmailRow->email;
                                    }
                                    $queryCat = DB::table('adr_d_items');
                                    $queryCat->leftJoin('users', 'adr_d_items.cataloguer_by_id', '=', 'users.user_id');
                                    $queryCat->where('catalog_no', "=", $row['catalog_no']);
                                    $searchCat = $queryCat->get();
                                    $toCat = array();
                                    foreach ($searchCat as $arrEmailCat) {
                                        $toCat[] = $arrEmailCat->email;
                                    }
                                    $message
                                        ->from($emailSender, 'ABM E-Cataloguing Systems')
                                        ->to($toOwner, 'ABM E-Cataloguing Systems')
                                        ->cc($toCat)
                                        //->bcc('bqsoft77@gmail.com', 'Development')
                                        ->subject('Request ' . $row['transaction_type']);
                                });
                                // update reason
                                DB::table('adr_d_notes_notvalidate')->insert([
                                    'adr_no' => $row['adr_d_items_id'],
                                    'catalog_no' => $row['catalog_no'],
                                    'item_status' => $row['item_status'],
                                    'transaction_type' => $row['transaction_type'],
                                    'sap_material_code' => $row['sap_material_code'],
                                    'reason' => $reason,
                                    'updated_at' => date("Y-m-d H:i:s"),
                                    'updated_by' => $row['updated_by']
                                ]);
                            }
                        }
                    }
                    if ($field == 'inc') {
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

                            if ($UpdateItemsIncChar) {
                                $UpdateItemsIncChar->inc_characteristics_id = $rowCharValue->id;
                                $UpdateItemsIncChar->nvalue = $rowCharValue->nvalue;
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
                // NEW UPDATE
                // DB::table('value_characteristic')->where('adr_d_items_id',$request->adr_d_items_id)->where('type_adr','Addition')->delete();
                // NEW UPDATE
                $adrDitems->save();
                $checkOnProcess = AdrDItemsStatus::select(DB::raw("count(adr_d_items_status.item_status) AS OnProcess"))
                    ->leftJoin('adr_d_items', 'adr_d_items_status.adr_d_items_id', '=', 'adr_d_items.id')
                    ->where('adr_d_items.adr_m_id', '=', $row['adr_m_id'])
                    ->where('adr_d_items_status.item_status', '=', 'ON PROCESS')
                    ->get();

                $checkOrigin = AdrDItemsStatus::select(DB::raw("count(adr_d_items_status.item_status) AS Origin"))
                    ->leftJoin('adr_d_items', 'adr_d_items_status.adr_d_items_id', '=', 'adr_d_items.id')
                    ->where('adr_d_items.adr_m_id', '=', $row['adr_m_id'])
                    ->where('adr_d_items_status.item_status', '!=', 'ON PROCESS')
                    ->get();

                $cekFNStatus = '';
                $insertFinish = false;

                $cekFNStatus = $checkOnProcess[0]['OnProcess'] - $checkOrigin[0]['Origin'];

                if ($cekFNStatus == 0) {
                    $adrMStatus = new AdrMStatus();
                    $adrMStatus->adr_m_id = $row['adr_m_id'];
                    $adrMStatus->adr_status = 'FINISH';
                    $adrMStatus->save();
                }
            }
            $message .=  'Process Succes';
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
    public function SaveItemsDocument(Request $request)
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
            foreach ($input as $key => $value) {
                if ($key != 'items_characteristics' && $key != 'action') {
                    $data[$key] = $value;
                }
            }
            if ($request->transaction_type == 'Material') {
                $target_dir = "material_document/";
                $initial = 'material_doc';
            } else {
                $target_dir = "service_document/";
                $initial = 'service_doc';
            }

            $temp_file_name = $_FILES['document_path']['tmp_name'];
            $original_file_name = $_FILES['document_path']['name'];

            // Find file extention
            $ext = explode('.', $original_file_name);
            $ext = $ext[count($ext) - 1];

            // Remove the extention from the original file name
            $file_name = str_replace($ext, '', $original_file_name);

            $new_name = date('mdY_His') . $initial . $input['catalog_no'] . "." . $ext;
            $target_file = $target_dir . $new_name;
            $uploadOk = 1;
            $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);



            // Check if image file is a actual image or fake image
            if (isset($input["SaveMaterialDocument"])) {
                $check = getimagesize($_FILES["document_path"]["tmp_name"]);
                if ($check !== false) {
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
                if (move_uploaded_file($_FILES["document_path"]["tmp_name"], $target_file)) {
                    $AdrDItemsDocument = new AdrDItemsDocument();
                    $AdrDItemsDocument->adr_d_items_id = $input['adr_d_items_id'];
                    $AdrDItemsDocument->catalog_no = $input['catalog_no'];
                    $AdrDItemsDocument->document_name = $input['document_name'];
                    $AdrDItemsDocument->url = $new_name;
                    $AdrDItemsDocument->save();
                }
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
    public function getItemsDocument(Request $request)
    {
        $sql = "SELECT * FROM adr_d_items_document ";
        $result = BaseModel::buildSql($sql);
        return \Response::json($result, 200);
    }
    public function DeleteItemsDocument(Request $request)
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
            AdrDItemsDocument::destroy($input['id']);
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

    public function test(Request $request)
    {
    }
    public function SaveItemsImages(Request $request)
    {
        // echo "kontol";
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id', '=', $user_id)
                ->get();
            $levelUser = $dataUserProfile[0]['group_name'];
            foreach ($input as $key => $value) {
                if ($key != 'items_characteristics' && $key != 'action') {
                    $data[$key] = $value;
                }
            }
            if ($request->transaction_type == 'Material') {
                $target_dir = "material_images/";
                $initial = 'material_img';
            } else {
                $target_dir = "service_images/";
                $initial = 'service_img';
            }


            $temp_file_name = $_FILES['images_path']['tmp_name'];
            $original_file_name = $_FILES['images_path']['name'];

            // Find file extention
            $ext = explode('.', $original_file_name);
            $ext = $ext[count($ext) - 1];

            // Remove the extention from the original file name
            $file_name = str_replace($ext, '', $original_file_name);

            $new_name = date('mdY_His') . $initial . $input['catalog_no'] . "." . $ext;
            $target_file = $target_dir . $new_name;
            $uploadOk = 1;
            $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);



            // Check if image file is a actual image or fake image
            if (isset($input["SaveMaterialImages"])) {
                $check = getimagesize($_FILES["images_path"]["tmp_name"]);
                if ($check !== false) {
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
                    $AdrDItemsImages = new AdrDItemsImages();
                    $AdrDItemsImages->adr_d_items_id = $input['adr_d_items_id'];
                    $AdrDItemsImages->catalog_no = $input['catalog_no'];
                    $AdrDItemsImages->description = $input['description'];
                    $AdrDItemsImages->images = $new_name;
                    $AdrDItemsImages->save();
                }
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
    public function getItemsImages(Request $request)
    {
        $sql = "SELECT * FROM adr_d_items_images ";
        $result = BaseModel::buildSql($sql);
        return \Response::json($result, 200);
    }
    public function DeleteItemsImages(Request $request)
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
            AdrDItemsImages::destroy($input['id']);
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
    public function SaveImportAddition(Request $request)
    {
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;
            $dataUserProfile = User::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('user_id', '=', $user_id)
                ->get();

            if ($request->hasFile('file_excel')) {
                $extension = File::extension($request->file_excel->getClientOriginalName());
                $path = $request->file('file_excel')->getRealPath();
                if ($extension == "xlsx" || $extension == "xls" || $extension == "csv") {
                    $data = Excel::load($path, function ($reader) {
                    })->get();
                    $failed = array();
                    if (!empty($data) && $data->count()) {
                        foreach ($data->toArray() as $key => $value) {
                            if (!empty($value)) {
                                $i = 0;
                                $insert = array();
                                DB::enableQueryLog();
                                foreach ($value as $v) {
                                    $query = DB::table('vw_inc_m');
                                    $query->where('inc', "=", trim($v['item_name_code']));
                                    $query->where('groupclass', "=", trim($v['group_class']));
                                    $query->where('is_active', 'Active');
                                    $search = $query->get();
                                    if (count($search) > 0) {
                                        $insert[] = [
                                            'flag' => '',
                                            'raw' => trim($v['raw_data']),
                                            'transaction_type' => $search[0]->transaction_type,
                                            'inc_code' => trim($v['item_name_code']),
                                            'class_code' => trim($v['group_class']),
                                            'manuf' => trim($v['manufacturer']),
                                            'refnbr' => trim($v['ref._no']),
                                        ];
                                    } else {
                                        if (!empty(trim($v['item_name_code'])) && !empty(trim($v['group_class']))) {
                                            $insert[] = [
                                                'flag' => 'failed',
                                                'raw' => trim($v['raw_data']),
                                                'transaction_type' => 'none',
                                                'inc_code' => trim($v['item_name_code']),
                                                'class_code' => trim($v['group_class']),
                                                'manuf' => trim($v['manufacturer']),
                                                'refnbr' => trim($v['ref._no']),
                                            ];
                                        }
                                    }
                                    $i++;
                                }
                            }
                        }
                        if (!empty($insert)) {
                        } else {
                            $insert = array();
                        }
                    }
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
            'data' => $insert,
            'success' => $success,
            'message' => $message
        );
        return \Response::json($data, 200);
    }
    public function getTemplateAddition(Request $request)
    {
        $file = "./files/template.addition.xlsx";
        return Response::download($file);
    }
    public function SaveViewNotes(Request $request)
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
            $i = 1;
            foreach (array($data) as $row) {
                if ($row['view_notes']) {
                    $detail = json_decode(stripslashes($row['view_notes']));
                    $AdrDItemsViewNotes = new AdrDItemsViewNotes();
                    foreach ($detail as $arrViewNotes) {
                        foreach ($arrViewNotes as $field => $value) {
                            if ($field !== 'id') {
                                if ($field !== 'created_at') {
                                    $AdrDItemsViewNotes->$field = $value;
                                }
                            }
                        }
                        $AdrDItemsViewNotes->adr_d_items_id = $row['adr_d_items_id'];
                        if ($arrViewNotes->id == 'last_insert_id') {
                            $AdrDItemsViewNotes->save();
                        }
                    }
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
        return \Response::json($data, 200);
    }
    public function ItemsDeletion(Request $request)
    {
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;

            $adrDitems = AdrDItems::find($input['adr_d_items_id']);
            $adrDitems->deleted_at = date("Y-m-d H:i:s");
            $adrDitems->deleted_by = $user_id;
            $adrDitems->save();

            $adrDItemsStatus = new AdrDItemsStatus();
            $adrDItemsStatus->adr_d_items_id = $input['adr_d_items_id'];
            $adrDItemsStatus->item_status = 'DELETION';
            $adrDItemsStatus->save();

            // Mark ADR as Finish
            $checkOnProcess = AdrDItemsStatus::select(DB::raw("count(adr_d_items_status.item_status) AS OnProcess"))
                ->leftJoin('adr_d_items', 'adr_d_items_status.adr_d_items_id', '=', 'adr_d_items.id')
                ->where('adr_d_items.adr_m_id', '=', $adrDitems->adr_m_id)
                ->where('adr_d_items_status.item_status', '=', 'ON PROCESS')
                ->get();

            $checkOrigin = AdrDItemsStatus::select(DB::raw("count(adr_d_items_status.item_status) AS Origin"))
                ->leftJoin('adr_d_items', 'adr_d_items_status.adr_d_items_id', '=', 'adr_d_items.id')
                ->where('adr_d_items.adr_m_id', '=', $adrDitems->adr_m_id)
                ->where('adr_d_items_status.item_status', '!=', 'ON PROCESS')
                ->get();

            $cekFNStatus = '';
            $insertFinish = false;

            $cekFNStatus = $checkOnProcess[0]['OnProcess'] - $checkOrigin[0]['Origin'];

            if ($cekFNStatus <= 0) {
                $adrMStatus = new AdrMStatus();
                $adrMStatus->adr_m_id = $adrDitems->adr_m_id;
                $adrMStatus->adr_status = 'FINISH';
                $adrMStatus->save();
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
    public function getReason(Request $request)
    {
        $sql = "SELECT * FROM vw_reason ";
        $result = BaseModel::buildSql($sql);
        return \Response::json($result, 200);
    }

    public function DeleteViewNotes(Request $request)
    {
        DB::beginTransaction();
        try {
            $input = Input::all();
            $user_id  = Auth::user()->user_id;

            AdrDItemsViewNotes::destroy($input['id']);
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

    public function downloadExcel(Request $request)
    {
        $filename = 'AdrHistory_' . date('YmdHis');
        $collection = new Collection(json_decode(stripslashes($request->data), true));
        $data = $collection->toArray();
        $arrData = array();
        if (is_array($data)) {
            $i = 1;
            foreach ($data  as $key => $row) {
                $arrData[] = array(
                    'adr_no' => $row['adr_no'],
                    'catalog_no' => $row['catalog_no'],
                    'item_status' => $row['item_status'],
                    'transaction_type' => $row['transaction_type'],
                    'sap_material_code' => $row['sap_material_code'],
                    'raw' => $row['raw'],
                    'name_code' => $row['name_code'],
                    'short_name_code' => $row['short_name_code'],
                    'short_description' => $row['short_description'],
                    'long_description' => $row['long_description'],
                    'inc' => $row['inc'],
                    'mgc' => $row['groupclass']
                );
                $i++;
            }
        }
        $excel =   Excel::create($filename, function ($excel) use ($arrData, $request) {
            $excel->sheet('Adr History', function ($sheet) use ($arrData, $request) {
                $sheet->cell('A1', function ($cell) use ($request) {
                    $cell->setValue('ADR Number');
                });
                $sheet->setCellValue('B1', $request->adr_no);
                $sheet->cell('A2', function ($cell) use ($request) {
                    $cell->setValue('ADR STATUS');
                });
                $sheet->cell('B2', $request->adr_status);
                $sheet->cell('A3', function ($cell) use ($request) {
                    $cell->setValue('ADR Date');
                });
                $sheet->cell('B3', $request->created_at);
                $sheet->cell('A4', function ($cell) use ($request) {
                    $cell->setValue('Creator');
                });
                $sheet->cell('B4', $request->creator);
                $excelData = array();
                $excelData[] = array(
                    'Catalogue No',
                    'Transaction Type',
                    'SAP No',
                    'Raw',
                    'Name Code',
                    'Long description',
                    'INC',
                    'MGC',
                    'Item Status'
                );
                $sheet->fromArray($excelData, null, 'A5', true, false);
                $i = 6;
                foreach ($arrData as $row) {
                    $sheet->cell('A' . $i, trim($row['catalog_no']));
                    $sheet->cell('B' . $i, trim($row['transaction_type']));
                    $sheet->cell('C' . $i, trim($row['sap_material_code']));
                    $sheet->cell('D' . $i, trim($row['raw']));
                    $sheet->cell('E' . $i, trim($row['short_name_code']));
                    $sheet->cell('F' . $i, trim($row['long_description']));
                    $sheet->cell('G' . $i, trim($row['inc']));
                    $sheet->cell('H' . $i, trim($row['mgc']));
                    $sheet->cell('I' . $i, trim($row['item_status']));
                    $i++;
                }
            });
        })->store('xlsx', false, true);
        return $filename . '.xlsx';
    }
    public function downloadFile($file)
    {
        $path = storage_path('exports/' . $file);
        return Response::download($path);
    }
}
