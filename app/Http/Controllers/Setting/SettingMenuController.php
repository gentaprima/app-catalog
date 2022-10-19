<?php

namespace App\Http\Controllers\Setting;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
//use App\Models\SettingMenuModel;
use App\Models\Menu;
use Illuminate\Support\Facades\DB;
use App\Models\DynamicModel;
use App\Helpers\AutoNumber;

class SettingMenuController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /*public function SettingTreeMenu(){
        $data = Menu::orderBy('sort_id','ASC')->get();
        $tree = $this->buildTree($data, 'parent_id', 'id');
        return $tree;
    }*/

    function buildTree($flat, $pidKey, $idKey = null)
    {
        $grouped = array();
        foreach ($flat as $sub){
            $grouped[$sub[$pidKey]][] = $sub;
        }

        $fnBuilder = function($siblings) use (&$fnBuilder, $grouped, $idKey) {
            foreach ($siblings as $k => $sibling) {
                $id = $sibling[$idKey];
                if(isset($grouped[$id])) {
                    $sibling['children'] = $fnBuilder($grouped[$id]);
                }
                $siblings[$k] = $sibling;
            }

            return $siblings;
        };

        $tree = $fnBuilder($grouped[0]);

        return $tree;
    }

    public function index(Request $request){
        $source_data = $request->get('source_data');
        $menu_id = $request->get('menu_id');
        // dd('ABCD');
        switch ($source_data){
            case'menu_event':
                $model = new DynamicModel;
                $model->setTable($source_data);
                $result = $model->where('menu_id','=',$menu_id)->get();
                return $result;
//                dd($post);
                break;
            case'menu':
                $data = Menu::orderBy('sort_id','ASC')->get();
                $tree = $this->buildTree($data, 'parent_id', 'id');
                return $tree;
                break;

        }
    }

    protected function store(Request $request)
    {
        $source_data = $request->get('source_data');
        $menu_id = $request->get('menu_id');
        switch ($source_data){
            case'menu_event':
                $input = $request->all();
                $model = new DynamicModel;
                $model->setTable($source_data);
                $model->menu_id  = $input['menu_id'];
                $model->event_name  = $input['event_name'];
                if (! $model->save()){
                    $message =  App::abort(500);
                    $success = false ;
                }else{
                    $message =  'Ok';
                    $success = true ;
                }
                $data = array(
                    'success' => $success  ,
                    'message' => $message
                );
                return \Response::json($data,200);
            break;
			
            case'menu':
                $input = $request->all();
				$model = new Menu;
				if ($input['menu_id']=='') {
					$model->id = AutoNumber::autonumber('menu', 'id', 'MNU', '', '%0s');
				}
				else $model->find($input['menu_id']);
                $model->parent_id  = $input['parent_id'];
                $model->text  = $input['text'];
                $model->leaf  = isset($input['isMenu'])?$input['isMenu']:'false';
                $model->published  = isset($input['published'])?$input['published']:'false';
                //$model->checked  = $input['published'];
                // $model->iconcls  = $input['iconcls']?$input['iconcls']:null;
                $model->handler  = $input['handler']?$input['handler']:null;
                $model->ajax  = $input['ajax']?$input['ajax']:null;
                $model->report  = $input['report']?$input['report']:null;
                /*
                
                
                $model->published  = $input['published']?$input['published']:null;*/
                if (! $model->save()){
                    $message =  App::abort(500);
                    $success = false ;
                }else{
                    $message =  'Ok';
                    $success = true ;
                }
                $data = array(
                    'success' => $success  ,
                    'message' => $message
                );
                return \Response::json($data,200);
                break;

        }

    }

    public function update(Request $request)
    {
        $source_data = $request->get('source_data');
        $menu_id = $request->get('menu_id');
        switch ($source_data){
            case'menu_event':
                $input = $request->all();
                $id = 'MNE9';
                $model = new DynamicModel;
                $model->setTable($source_data);
                $model->exists = true;
                $model->rowid = $id;
                $model->event_name = $input['event_name'];

                if (! $model->save()){
                    $message =  App::abort(500);
                    $success = false ;
                }else{
                    $message =  'Ok';
                    $success = true ;
                }
                $data = array(
                    'success' => $success  ,
                    'message' => $message
                );
                return \Response::json($model,200);

                break;

        }
        /*$input = Input::all();
        $MasterArea = MasterArea::find($id);
        $MasterArea->id  = $input['id'];
        $MasterArea->description = $input['description'];

        if (! $MasterArea->save()){
            $message =  App::abort(500);
            $success = false ;
        }else{
            $message =  'Ok';
            $success = true ;
        }
        $data = array(
            'success' => $success  ,
            'message' => $message
        );
        return \Response::json($data,200);*/
    }

    public function destroy($id)
    {

        $id = MasterArea::where('id','=',$id)->first();
        if($id == null ){
            $message =  app::abort(404);
            $success = false ;
        }else{
            $message =  'Ok';
            $success = true ;
        }
        $id->delete();
        $data = array(
            'success' => $success  ,
            'message' => $message
        );
        return \Response::json($data,200);
    }

}
