<?php

namespace App\Http\Controllers;

use App\Models\BaseModel;
use Illuminate\Http\Request;
use App\Models\Menu;
use App\Models\LayoutSchemaModel;
use DB;
use Auth;
use App\User;
use Illuminate\Support\Facades\Input;

class NavController extends Controller
{
    public function revisionMaterial()
    {
        return view('dashboard/adr/revision-material');
    }

    public function revisionService()
    {
        return view('dashboard/adr/revision-service');
    }

    public function addition()
    {
        return view('dashboard/adr/addition');
    }

    public function additionHistory()
    {
        return view('dashboard/adr/history');
    }

    public function deletionMaterial()
    {
        return view('dashboard/adr/deletion-material');
    }

    public function deletionService()
    {
        return view('dashboard/adr/deletion-service');
    }

    public function singleViewMaterial()
    {
        return view('dashboard/single-view/material');
    }

    public function singleViewMaterialById($id)
    {
        $data['id'] = $id;
        return view('dashboard/single-view/material-by-id', $data);
    }

    public function singleViewService()
    {
        return view('dashboard/single-view/service');
    }

    public function singleViewServiceById($id)
    {
        $data['id'] = $id;
        return view('dashboard/single-view/service-by-id', $data);
    }

    public function viewMaterialCharacteristic()
    {
        return view('/dashboard/dictionary/material-characteristic');
    }

    public function viewServiceCharacteristic()
    {
        return view('/dashboard/dictionary/service-characteristic');
    }

    public function viewMaterialGroupClass()
    {
        return view('/dashboard/dictionary/material-group-class');
    }

    public function viewServiceGroupClass()
    {
        return view('/dashboard/dictionary/service-group-class');
    }

    public function viewMaterialType()
    {
        return view('/dashboard/dictionary/material-type');
    }

    public function viewServiceType()
    {
        return view('/dashboard/dictionary/service-type');
    }


    public function viewMultipleViewService()
    {
        return view('/dashboard/multi-view/material');
    }
    public function viewMultipleViewMaterial()
    {
        return view('/dashboard/multi-view/service');
    }
    public function viewMultipleViewSyncSAP()
    {
        return view('/dashboard/multi-view/sync-sap');
    }
    public function formRevisionMaterial(){
        return view('dashboard/adr/form-revision-material');
    }
    
    public function formRevisionService(){
        return view('dashboard/adr/form-revision-service');
    }
    
    public function formDeletionMaterial(){
        return view('dashboard/adr/form-deletion-material');
    }
    
    public function formDeletionService(){
        return view('dashboard/adr/form-deletion-service');
    }
    
    public function transferOwnerCode(){
        return view('dashboard/single-view/transfer-owner-code');
    }
    
    public function transferBackOwnerCode(){
        return view('dashboard/single-view/transfer-back-owner-code');
    }

    public function cleansingDuplication(){
        return view('/dashboard/cleansing/duplication');
    }

    public function viewUom(){
        return view('/dashboard/dictionary/uom');
    }
    
    public function viewCategory(){
        return view('/dashboard/dictionary/category');
    }
    
    public function viewPlant(){
        return view('/dashboard/dictionary/plant');
    }
    public function viewMovingType(){
        return view('/dashboard/dictionary/moving-type');
    }
    public function viewMaterialToolsNcs(){
        return view('/dashboard/material-tools/ncs');
    }
    public function viewMaterialToolsUnspsc(){
        return view('/dashboard/material-tools/unspsc');
    }
}
