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

class MenuController extends Controller
{
    public function LayoutSchema(Request $request)
    {
        $page_id = $request->get('pageId');
        $items = LayoutSchemaModel::where('menu_id', $page_id)->get();;
        return \Response::json($items,200);
    }

    public function RootMenu()
    {
        // dd('ABCD');
//        $items = DB::select('select * from menu where id = parent_id');
//        DB::disconnect('pgsql');
        $items = Menu::RootMenu();
        return \Response::json(array('data'=>$items),200);
    }

    public function get_menu_child($parent=0){
        $menu = Menu::where('parent_id',$parent)->get();
        $parent = Menu::where('rowid',$parent)->first();

        $menu_0 = Menu::where('parent_id',0)->get();
        foreach ($menu_0 as $key) {
            get_menu_child($key->rowid);
        }
    }

    public function TreeMenu(Request $request)
    {
        $parent_id = $request->get('parent_id');
        $node = $request->get('node');
        if($node == 'root')
        {
            $parent = $parent_id;
        }else{
            $parent = $node;
        }
        $items = Menu::TreeMenu($parent);
        return \Response::json($items,200);


    }

    public function RoleMenuEvent(Request $request)
    {

    }

    public function RoleMenuEventGroup(Request $request)
    {

    }

    public function getRoleEvent(Request $request)
    {
        $input = Input::all();
        $user_id  = Auth::user()->user_id;
        $dataUserProfile = User::select(DB::raw("*"))
            ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
            ->where('user_id','=',$user_id)
            ->get();
        $levelUser = $dataUserProfile[0]['group_name'];

        /*$sql = "SELECT * FROM vw_role_event" ;
        $result = BaseModel::buildSql($sql);
        return \Response::json($result,200);*/

        $result = DB::table('vw_role_event')
//            ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
            ->where('menu_id','=',$request->menu_id)
            ->where('group_id','=',$dataUserProfile[0]['group_id'])
            ->get();
        $data = array();
        $items= array();
        $i=0;
        foreach ($result as $row){
            $is_active = $row->is_active == 1 ? true : false  ;
            $data[$row->event_name] = $is_active;
            $i++;
        }
        $items['data'] = $data;
        return \Response::json($items,200);
    }
}
