<?php

namespace App\Http\Controllers\Dictionary;

use App\Models\BaseModel;
use App\Models\CharacteristicsM;
use App\Models\PlantM;
use App\Models\EntityM;
use App\Models\ValuationClassM;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Session;
use Response;
use Excel;
use File;
use Validator;
use App\Http\Controllers\Controller;

class DictionaryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function getEntity(){
        // $sql = "SELECT * FROM vw_entity_m" ;
        // $result = BaseModel::buildSql($sql);
        // return \Response::json($result,200);
        $sql = "SELECT * FROM vw_entity_m" ;
        $result = BaseModel::buildSql($sql);
        return \Response::json($result['data'],200);
    }

    public function getEntityData(){
        $sql = "SELECT * FROM vw_entity_m" ;
        $result = BaseModel::buildSql($sql);
        return \Response::json($result,200);
    }
    public function getAbbreviation(){
        $sql = "SELECT * FROM vw_entity_abbreviation" ;
        $result = BaseModel::buildSql($sql);
        return \Response::json($result,200);
    }

    public function ExportAbrevation()
    {
        $file="./files/";
       // $filename = $file.'Abbrevation_'.date('YmdHis').'.xlsx';
        $filename ='Abbrevation_'.date('YmdHis');
        $excel =   Excel::create($filename, function($excel) {
        $excel->sheet('Abbrevation', function($sheet)
            {
                $excelData = array();
                $excelData[] = array(
                     'NO',
                     'Description Code',
                     'Code'
                );
                $sheet->fromArray($excelData, null, 'B1', true, false);
            $i=1; $c=2;$x=0;
            $row = array();
            $datx = array();
            $sql = "SELECT Entity_code,entity_definition FROM entity_m WHERE entity_name='abbreviation' ORDER BY entity_code " ;
            $result = BaseModel::buildSql($sql);
            foreach ( $result as $datx ) {
             if ($x==0) {
                foreach ($datx as $data2){
                    $row=(array)$data2;
                    $sheet->setCellValueByColumnAndRow(1, $c, $i);
                    $sheet->setCellValueByColumnAndRow(2, $c, trim($row['entity_definition']));
                    $sheet->setCellValueByColumnAndRow(3, $c, trim($row['Entity_code']));
                    $i++;$c++;
                }
                $x++;
             }
            }
            });
        })->store('xlsx', false, true);
        return $filename.'.xlsx';
     //   return Response::download($filename);  
    }
    public function SaveEntityM(Request $request){
        DB::beginTransaction();
        try {
            $msg =  'Process Succes';
            $succ = true ;
            $input = Input::all();
            $entityname = $request->input('entity_name');
            if($input['data_items'] != '[]') {
                $sql = array();
                $sql_cross = array();
                $data_items = json_decode(stripslashes($input['data_items']));
                $i = 1;
                foreach ($data_items as $row) {
                    if(isset($row->flag) == 'Insert'){
                        $sql_entity = EntityM::where('entity_code','=',$row->code)
                                              -> where('entity_name','=',$entityname)
                                              -> orwhere('entity_definition','=',$row->description)
                                              ->first();
         
                     if ($sql_entity==null)
                       { $entity = new EntityM();
                        $entity->entity_name = $input['entity_name'] ;
                        $entity->entity_code  = $row->code;
                        $entity->entity_definition = $row->description;
                        $entity->save();
                       }
                       else{
                         $msg =  'Data Already Exists';
                         $succ = False ;
                      }
                    }else{
                        $entity = EntityM::find($row->id);
                        $entity->entity_code  = $row->code;
                        $entity->entity_definition = $row->description;
                        $entity->save();
                    }
                }
            }
            $message =  $msg;
            $success = $succ ;
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

    public function RemoveEntityM(){
        DB::beginTransaction();
        try {
            $input = Input::all();
            $id = EntityM::where('id','=',$input['id'])->first();
            if($id == null ){
                // $message =  app::abort(404);
                $message =  'error';
                $success = false ;
            }else{
                $message =  'Process Succes';
                $success = true ;
            }
            $id->delete();
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

    

    public  function getGroupClassM(Request $request){
        $sql = "SELECT * FROM vw_group" ;
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result,200);
    }
    public  function getPlant(Request $request){
        $sql = "SELECT * FROM vw_plant_m" ;
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result,200);
    }

    public function SavePlant(){
        DB::beginTransaction();
        try {
            $input = Input::all();
            $data_items = json_decode(stripslashes($input['data_items']));
            $i = 1;
            foreach ($data_items as $row) {
                $UpdatePlantM = PlantM::find($row->id);
                // if(count($UpdatePlantM) > 0 ){
                if($UpdatePlantM != null ){
                    $UpdatePlantM->plant_code = $row->plant_code ;
                    $UpdatePlantM->save();
                }else{
                    $InsertPlantM = new PlantM();
                    $InsertPlantM->companies_m_id = $row->companies_m_id ;
                    $InsertPlantM->plant_code = $row->plant_code ;
                    $InsertPlantM->plant_description = $row->plant_description ;
                    $InsertPlantM->save();
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

    public function RemovePlant(){
        DB::beginTransaction();
        try {
            $input = Input::all();
            $id = PlantM::where('id','=',$input['id'])->first();
            if($id == null ){
                $message =  app::abort(404);
                $success = false ;
            }else{
                $message =  'Process Succes';
                $success = true ;
            }
            $id->delete();
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

    public  function getValuationClass(Request $request){
        $sql = "SELECT * FROM vw_valuation_class_m" ;
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result,200);
    }

    public function SaveValuationClass(){
        DB::beginTransaction();
        try {
            $input = Input::all();
            $data_items = json_decode(stripslashes($input['data_items']));
            $i = 1;
            foreach ($data_items as $row) {
                $UpdateValuationClassM = ValuationClassM::find($row->id);
                if(count($UpdateValuationClassM) > 0 ){
                    $UpdateValuationClassM->valuation = $row->valuation ;
                    $UpdateValuationClassM->valuationdesc = $row->valuationdesc ;
                    $UpdateValuationClassM->save();
                }else{
                    $InsertValuationClassM = new ValuationClassM();
                    $InsertValuationClassM->companies_m_id = $row->companies_m_id ;
                    $InsertValuationClassM->valuation = $row->valuation ;
                    $InsertValuationClassM->valuationdesc = $row->valuationdesc ;
                    $InsertValuationClassM->save();
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

    public function RemoveValuationClass(){
        DB::beginTransaction();
        try {
            $input = Input::all();
            $id = ValuationClassM::where('id','=',$input['id'])->first();
            if($id == null ){
                $message =  app::abort(404);
                $success = false ;
            }else{
                $message =  'Process Succes';
                $success = true ;
            }
            $id->delete();
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

    public function getCharacteristicsM(Request $request){
        $sql = "SELECT * FROM vw_characteristics_m" ;
        $result = BaseModel::buildSql($sql);;
        return \Response::json($result,200);
    }

    public  function SaveCharacteristicsM(Request $request){
        DB::beginTransaction();
        try {
            $input = Input::all();
            $data_items = json_decode(stripslashes($input['data_items']));
            
            $i = 1;
            foreach ($data_items as $row) {
                $UpdateCharacteristicsM = CharacteristicsM::find($row->id);
                if(count($UpdateCharacteristicsM) > 0 ){
                    $UpdateCharacteristicsM->characteristic = $row->characteristic ;
                    $UpdateCharacteristicsM->save();
                }else{
                    $InsertCharacteristicsM = new CharacteristicsM();
                    $InsertCharacteristicsM->mrcode = $row->mrcode ;
                    $InsertCharacteristicsM->characteristic = $row->characteristic ;
                    $InsertCharacteristicsM->transaction_type = $row->transaction_type ;
                    $InsertCharacteristicsM->save();
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
    public  function RemoveCharacteristicsM(Request $request){
        DB::beginTransaction();
        try {
            $input = Input::all();
            $id = CharacteristicsM::where('id','=',$input['id'])->first();
            if($id == null ){
                $message =  app::abort(404);
                $success = false ;
            }else{
                $message =  'Process Succes';
                $success = true ;
            }
            $id->delete();
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
