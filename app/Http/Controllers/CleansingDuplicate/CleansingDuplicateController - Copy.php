<?php

namespace App\Http\Controllers\CleansingDuplicate;

use App\Helpers\AutoNumber;
use App\Models\AdrDItems;
use App\Models\AdrDItemsCharacteristics;
use App\Models\AdrDItemsCrossreferences;
use App\Models\AdrDItemsStatus;
use App\Models\AdrM;
use App\Models\AdrMStatus;
use App\Models\IncCharacteristics;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Response; 
use Illuminate\Foundation\Auth\User;
use UserGroup;
use Auth ;
use DB;
use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;
use Session;
use Excel;
use File;
use Reader;
use App\Models\IncM;
ini_set('memory_limit', '3000M');
ini_set('max_execution_time', '0');

class CleansingDuplicateController extends Controller
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
    public function getCleansingDuplicate(Request $request)
    {
        switch ($request->action){
            case 'ByLongDesc':
                $sql = "SELECT * FROM vw_cleansing_duplication_desc" ;
                $result = BaseModel::buildSql($sql);
                return \Response::json($result,200);
                break;
            case 'ByOldMaterialCode':
                $sql = "SELECT * FROM vw_cleansing_duplication_oldmaterial" ;
                $result = BaseModel::buildSql($sql);
                return \Response::json($result,200);
                break;
            case 'ByRefno':
                $sql = "SELECT * FROM vw_cleansing_duplication_refno" ;
                $result = BaseModel::buildSql($sql);
                return \Response::json($result,200);
                break;
        }
    }

    public function multi_diff($arr1,$arr2){
        $result = array();
        foreach ($arr1 as $k=>$v){
            if(!isset($arr2[$k])){
                $result[$k] = $v;
            } else {
                if(is_array($v) && is_array($arr2[$k])){
                    $diff = multi_diff($v, $arr2[$k]);
                    if(!empty($diff)){
                        $result[$k] = $diff;
                    }
                }
            }
        }
        return $result;
    }

    public function searchArrayKeyVal($sKey, $id, $array) {
       foreach ($array as $key => $val) {
           if ($val[$sKey] === $id) {
               return $key;
           }
       }
       return false;
    }

    public function SaveImportDataCleansing(Request $request){
        try {
			$adrM = new AdrM();
			$adr_d_items_count=0;
			
            if($request->hasFile('file_excel')){
                $excel = new Excel();
                $extension = File::extension($request->file_excel->getClientOriginalName());
                $path = $request->file('file_excel')->getRealPath();
                if ($extension == "xlsx" || $extension == "xls" || $extension == "csv") {
                    if($request->hasFile('file_excel')){
                        Excel::selectSheetsByIndex(0)->load($path, function ($sheet) use(&$adr_d_items_count, &$adrM) {
							$input = Input::all();
							$activesheet = $sheet->setActiveSheetIndex(0);
							
							DB::beginTransaction();
							
							$dataUserProfile = User::select(DB::raw("*"))
													->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
													->leftJoin('companies_m', 'users.companies_m_id', '=', 'companies_m.id')
													->where('user_name','=',$input['user_name'])
													->limit(1)
													->get();
							$table="adr_m";
							$primary="id";
							$years=date('Y');
							$prefix=$dataUserProfile->first()->getOriginal()['code'];
							$sprintf="%06s";
							$adr_no=AutoNumber::autonumber($table,$primary,$prefix,$years,$sprintf);

							$adrM->adr_no = $adr_no;
							$adrM->company_code = $prefix;
							$adrM->creator_id = $dataUserProfile->first()->getOriginal()['user_id'];
							$adrM->save();

							$adrMStatus = new AdrMStatus();
							$adrMStatus->adr_m_id = $adrM->id;
							$adrMStatus->adr_status ='FINISH';
							$adrMStatus->save();
							
							foreach ($sheet->toArray() as $key=>$rowRider) {
								$dataFileReader = $this->arrayToObject($rowRider);
								if (!empty(trim($dataFileReader->raw))) {
									/*Check INC & MGC*/
									$query = DB::table('vw_inc_m');
									$query->where('inc', "=", trim($dataFileReader->inc));
									$query->where('groupclass', "=", trim($dataFileReader->mgc));
									$query->where('transaction_type', "=", $input['transaction_type']);
									$query->where('is_active', 'Active');
									$search = $query->get();
									if (count($search) > 0) 
									{
										/*Check Material/Service Type*/

										$dataIncM = $this->arrayToObject($search[0]);
										$short_name_code = $dataIncM->short_name_code;
										$lenShortNameCode = strlen($short_name_code);
										
										$shortText = $short_name_code;
										$longText = $short_name_code;
										
										$posLongTextInc = strpos($dataFileReader->long_text, ':');
										if ($posLongTextInc === FALSE) {
											$posLongTextInc = $lenShortNameCode;
										}
										
										/*Check Long Teks*/
										if($short_name_code === substr($dataFileReader->long_text, 0,$posLongTextInc))
										{
											$itemsIncCharsValueArray = array();
											$posItemsIncCharsAll = strpos($dataFileReader->long_text, ':');
											
											if ($posItemsIncCharsAll > 0 ) {
												$itemsIncCharsAll = substr($dataFileReader->long_text, $posItemsIncCharsAll + 1);
												$itemsIncCharsAllArray = explode(';', $itemsIncCharsAll);
												
												$strValue = "";
												$strValueStop = false;
												$strLongValue = "";
												
												foreach ($itemsIncCharsAllArray as $incCharValue) {
													$incCharValueArray = explode(':', $incCharValue);
									
													if (! isset($incCharValueArray[1])) {
														$incCharValueArray[0] = $incCharValueArray[0].'[?]';
														$incCharValueArray[1] = '[BLANK ?]';
													}
													
													$itemsIncCharsValueArray[trim($incCharValueArray[0])] = trim($incCharValueArray[1]);
													
													if ( ! $strValueStop &&
														strlen($short_name_code .":". $strValue . trim($incCharValueArray[1])) <= 40) 
														$strValue .= trim($incCharValueArray[1]) . ";";
													else $strValueStop = true;
													
													$strLongValue .= trim($incCharValueArray[0]) .": ". trim($incCharValueArray[1]) . ";";
												}

												if ($strValue !== "") {
													$shortText .= ":" . trim($strValue, ";");
												}
												if ($strLongValue !== "") {
													$longText .= ":" . trim($strLongValue, ";");
												}
											}
											
											$dataIncChar = IncCharacteristics::select(DB::raw("*"))
												->where('inc','=',$dataFileReader->inc)
												->get()->all();
											$iChr=0;
											$incChar = array();
											foreach ($dataIncChar as $rowIncChar){
												$incChar[$iChr]['inc_m_id'] = $dataIncM->id;
												$incChar[$iChr]['inc_characteristics_id'] = $rowIncChar->id;
												$incChar[$iChr]['mrcode'] = $rowIncChar->mrcode;
												$incChar[$iChr]['characteristics'] = $rowIncChar->characteristics;
												if (array_key_exists ($rowIncChar->characteristics, $itemsIncCharsValueArray)) {
													$incChar[$iChr]['nvalue'] = $itemsIncCharsValueArray[$rowIncChar->characteristics];
													unset($itemsIncCharsValueArray[$rowIncChar->characteristics]);
												} else {
													$incChar[$iChr]['nvalue'] = null;
												}
												$iChr++;
											}
												
											if (count($itemsIncCharsValueArray) > 0) {
												
												$errorCharacteristics = implode(', ', array_map(
													function ($v, $k) { return sprintf("%s: %s", $k, $v); },
													$itemsIncCharsValueArray,
													array_keys($itemsIncCharsValueArray)
												));														
												
												$activesheet->setCellValueByColumnAndRow(10, ($key+2), 'FAILED: CHARACTERISTICS: '.$errorCharacteristics);
											} else 
											{
												
												$dataMaterialOwner = User::select(DB::raw("*,users.email as useremail"))
													->leftJoin('companies_m', 'users.companies_m_id', '=', 'companies_m.id')
													->where('user_name', '=', $input['user_name'])
													->limit(1)
													->get();
												if (count($dataMaterialOwner) > 0) {
													if ($adr_d_items_count > 0) DB::beginTransaction();
													
													$table = "adr_d_items";
													$primary = "catalog_no";
													$years = '';
													$prefix = "";
													$sprintf = "%0s";
													$catalog_no = AutoNumber::autonumber($table, $primary, $prefix, $years, $sprintf);

													$material_type = trim($dataFileReader->material_type);
													$sap_material_code = null;
													
													if ($material_type == 'ZOEM') {
														$sap_material_code = $dataFileReader->sap_code;
													} elseif (in_array($material_type, array('ZMAT', 'ZSER'))){
														$table = "adr_d_items";
														$primary = "sap_material_code";
														$years = '';
														$prefix = ($input['transaction_type'] == 'Material' ? 'G': 'S');
														$sprintf = "%017s";
														
														$sap_material_code = AutoNumber::autonumber($table, $primary, $prefix, $years, $sprintf);
													}
													
													if (isset($sap_material_code)){
														$adr_d_items = new AdrDItems();
														$adr_d_items->sap_material_code = $sap_material_code;
														$adr_d_items->sap_material_code_by_id = Auth::user()->user_id;
														$adr_d_items->sap_material_code_date = date("Y-m-d H:i:s");

														$adr_d_items->adr_m_id = $adrM->id;
														$adr_d_items->items_is_active = 'Validate';
														$adr_d_items->name_code = $dataIncM->item_name;
														$adr_d_items->short_name_code = $dataIncM->short_name_code;
														$adr_d_items->short_description = $shortText;
														$adr_d_items->long_description = $longText;
														$adr_d_items->raw = $dataFileReader->raw;
														$adr_d_items->transaction_type = $input['transaction_type'];
														$adr_d_items->catalog_no = $catalog_no;
														$adr_d_items->inc = $dataFileReader->inc;
														$adr_d_items->groupclass = $dataFileReader->mgc;
														$adr_d_items->material_type = $dataFileReader->material_type;
														$adr_d_items->uom = $dataFileReader->uom;
														$adr_d_items->category = $dataFileReader->category;

														$QueryCat = User::select(DB::raw("users.*"))
															->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
															->leftJoin('companies_m', 'users.companies_m_id', '=', 'companies_m.id')
															->where('group_name', '=', 'Cat')
															->where('users.companies_m_id', '=', $dataMaterialOwner->first()->getOriginal()['companies_m_id'])
															->limit(1)
															->get();
														$getCat = $this->arrayToObject($QueryCat->first()->getOriginal());

														$adr_d_items->cataloguer = 'Validate';
														$adr_d_items->catemail = $getCat->email;
														$adr_d_items->cataloguer_by_id = $getCat->user_id;
														$adr_d_items->cataloguer_date = date("Y-m-d H:i:s");

														$sttdApp = 'Std App ' . $dataFileReader->category;
														$QueryStdApp = User::select(DB::raw("users.*"))
															->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
															->leftJoin('companies_m', 'users.companies_m_id', '=', 'companies_m.id')
															->where('group_name', '=', $sttdApp)
															->limit(1)
															->get();

														$getStdApp = $this->arrayToObject($QueryStdApp->first()->getOriginal());

														$adr_d_items->std_approval = 'Validate';
														$adr_d_items->stdemail = $getStdApp->email;
														$adr_d_items->std_approval_by_id = $getStdApp->user_id;
														$adr_d_items->std_approval_date = date("Y-m-d H:i:s");

														$adr_d_items->proc_approver = 'Validate';
														$adr_d_items->procemail = Auth::user()->email;
														$adr_d_items->proc_approver_by_id = Auth::user()->user_id;
														$adr_d_items->proc_approver_date = date("Y-m-d H:i:s");

														$adr_d_items->created_by = $dataMaterialOwner->first()->getOriginal()['user_id'];
														$adr_d_items->useremail = $dataMaterialOwner->first()->getOriginal()['useremail'];
														$adr_d_items->trx = 'Cleansing';
														$adr_d_items->save();
														$adr_d_items_id = $adr_d_items->id;
														$adr_d_items_count++;
														
														$activesheet->setCellValueByColumnAndRow(0, ($key+2), $adr_d_items->sap_material_code);
														$activesheet->setCellValueByColumnAndRow(10, ($key+2), "SUCCESS: Catalogue No: " . $adr_d_items->catalog_no);
														
														$adrDItemsStatus = new AdrDItemsStatus();
														$adrDItemsStatus->adr_d_items_id = $adr_d_items_id;
														$adrDItemsStatus->item_status = 'ORIGIN';
														$adrDItemsStatus->save();
														//B


														if ($dataFileReader->cross_reference != null || $dataFileReader->old_material_number != null || $dataFileReader->manufacturer != null)
														{   $ItemArrCross = array();
															$crossReffArray = array($ItemArrCross);												$ItemArr  = array(); 
														//	$dtanya =  array('Manuf','RefNO','Material_Old');
														    $dtanya = array();$kolom2 = array();
															$kolom =  array($dtanya);
															$dtanya1 =  array();
															$kolom1 =  array($dtanya1);
															$i=0;
														   $ItemManufAllArray = explode(';', $dataFileReader->manufacturer);
														   $ItemRefnosAllArray = explode(';', $dataFileReader->cross_reference);
														   $ItemOldmatAllArray = explode(';', $dataFileReader->old_material_number);
													//	   $dtanya1= array_combine($ItemManufAllArray, $ItemRefnosAllArray,$ItemOldmatAllArray);
														 
														   foreach ($ItemManufAllArray as $crossReffArr )
														   { $kolom[$i]['Manuf']=$crossReffArr; $i++;} 
														   $i=0;
														   foreach ($ItemRefnosAllArray as  $crossReffArr )
														   { $kolom[$i]['RefNO']=$crossReffArr; $i++; }
														   
														   $i=0;
														   foreach ($ItemOldmatAllArray as  $crossReffArr )
														   { $kolom[$i]['Material_Old']=$crossReffArr; $i++;} 
														 
														   foreach ($kolom as $dtanya1)
														   { 
															foreach ($dtanya1 as $key => $kolom2)
															{  
																if ($key=="Manuf") { $manuf =$kolom2; }
																if ($key=="RefNO") { $refno =$kolom2; }
																if ($key=="Material_Old") 
																{ $mt =$kolom2; 
															
																$adr_cross = new AdrDItemsCrossreferences();
																$adr_cross->adr_d_items_id = $adr_d_items_id;
															    $adr_cross->refno  =  $refno; 
																$adr_cross->old_material_code =  $mt; 
																$adr_cross->manufactur = $manuf;
																$adr_cross->save();

																$manuf ="";  $refno ="";$mt ="";
															    }
															   }
														    }
														
														}
													 //END Of Bug No. 6
														foreach ($incChar as $rowIncChar) {
															$dataConvRowIncChar = $this->arrayToObject($rowIncChar);
															$adrDItemsCharacteristics = new AdrDItemsCharacteristics();
															$adrDItemsCharacteristics->adr_d_items_id = $adr_d_items_id;
															$adrDItemsCharacteristics->catalog_no = $catalog_no;
															$adrDItemsCharacteristics->inc_m_id = $dataConvRowIncChar->inc_m_id;
															$adrDItemsCharacteristics->inc_characteristics_id = $dataConvRowIncChar->inc_characteristics_id;
															$adrDItemsCharacteristics->mrcode = $dataConvRowIncChar->mrcode;
															$adrDItemsCharacteristics->nvalue = $dataConvRowIncChar->nvalue;																		
															$adrDItemsCharacteristics->save();
														}
														DB::commit();
													}
													else {
														$activesheet->setCellValueByColumnAndRow(10, ($key+2), 'FAILED: UNKNOWN MaterialType: "'.$dataFileReader->material_type.'"');
													}
												}
											}
										}else{
											$activesheet->setCellValueByColumnAndRow(10, ($key+2), 'FAILED: Long Text: '. substr($dataFileReader->long_text, 0, $posLongTextInc));
										}
									} else {
										$activesheet->setCellValueByColumnAndRow(10, ($key+2), 'FAILED: INC: ' . trim($dataFileReader->inc) .'; MGC: '. trim($dataFileReader->mgc));
										
									}
								}
							}
							if (isset($key)) $activesheet->setCellValueByColumnAndRow(10, 1, 'IMPORT RESULT');							
                        })
						->setFileName($adr_d_items_count>0 ? $adrM->adr_no : 'ImportError-' . date('Ymd') . $adrM->id)
						->save($extension, Storage::disk('public')->getAdapter()->getPathPrefix() . "\\files");
                    }
                }
            }
            $message =  'Process Success';
            $success = true ;
			$fileresult = '';
			
			if ($adr_d_items_count > 0) {
				$fileresult = $adrM->adr_no.'.'.$extension;
			}
			else {
				$fileresult = 'ImportError-' . date('Ymd') . $adrM->id .'.'. $extension;
			}
			
        } catch (\Illuminate\Database\QueryException $e) {
            $message =  $e->getMessage();
            $success = false ;
			$fileresult = '';
            DB::rollback();
        } catch (\Exception $e) {
            $message =  $e->getMessage();
            $success = false ;
			$fileresult = '';
        }
        $data = array(
            'success' => $success,
            'message' => $message,
			'fileresult' => $fileresult
        );
        return \Response::json($data,200);
    }

    public function getTemplateDataCleansing(Request $request){
        $file="./files/template_data Cleansing.xlsx";
        return Response::download($file);
    }    
	
    public function getDataCleansing(Request $request){
        $file="./files/".$request->filename;
        return Response::download($file);
    }   	
}
