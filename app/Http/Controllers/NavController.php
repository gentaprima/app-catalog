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

    public function revisionService(){
        return view('dashboard/adr/revision-service');
    }

    public function addition(){
        return view('dashboard/adr/addition');
    }

    public function additionHistory(){
        return view('dashboard/adr/history');
    }

    public function deletionMaterial(){
        return view('dashboard/adr/deletion-material');
    }

    public function deletionService(){
        return view('dashboard/adr/deletion-service');
    }

    public function singleViewMaterial(){
        return view('dashboard/single-view/material');
    }
    
    public function singleViewMaterialById($id){
        $data['id'] = $id;
        return view('dashboard/single-view/material-by-id',$data);
    }
}
