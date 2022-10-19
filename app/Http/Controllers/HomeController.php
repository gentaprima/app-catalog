<?php

namespace App\Http\Controllers;


use App\Models\Icons;
use DB;
use Auth;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data=array();
		$user_id  = Auth::user()->user_id;

        $sql = DB::table('users')->select(DB::raw('*'))
                ->join('companies_m', 'users.companies_m_id', '=', 'companies_m.id')
                ->join('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->where('users.user_id','=',$user_id);
        $data=array();
        foreach($sql->get() as $row)
        {
            $data['CompanyName'] = $row->name;
            $data['CompanyCode'] = $row->code;
            $data['UserType'] = $row->group_name;
            $data['RealName'] = $row->real_name;
        }
        return view('home',$data);
    }

       


}
