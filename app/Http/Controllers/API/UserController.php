<?php


namespace App\Http\Controllers\API;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User as Users;
use Illuminate\Support\Facades\Auth;
use Validator;
use Session;
use DB;

class UserController extends Controller
{


    public $successStatus = 200;


    public function createUser(Request $request){
        $validator = Validator::make($request->all(), [
            'real_name' => 'required',
            'email' => 'required|email',
            'companies_m_id' => 'required',
            'user_name' => 'required',
            'password' => 'required',
            'c_password' => 'required|same:password'
        ]);


        if ($validator->fails()) {
            return response()->json([
                'status'=>false,
                'message'=>$validator->errors()->first()
            ], 401);            
        }


        $getDataUsers = DB::table("users")->where("user_name",$request->user_name)->first();
        if($getDataUsers != null){
            return response()->json([
                'status'=>false,
                'message'=>"username already used"
            ],401);
        }

        $getDataUsersTemp = DB::table("users_temp")->where("user_name",$request->user_name)->first();
        if($getDataUsersTemp != null){
            return response()->json([
                'status'=>false,
                'message'=>"username already used"
            ],401);
        }

        $cekDataTemp = DB::table('users_temp')->orderBy('id','desc')->first();
        if($cekDataTemp == null){
            $autoIncrement = 1;
        }else{
            $autoIncrement = $cekDataTemp->id + 1;
        }

        DB::table('users_temp')->insert([
            'id' => $autoIncrement,
            'real_name' => $request->real_name,
            'user_name' => $request->user_name,
            'email' => $request->email,
            'companies_m_id' => $request->companies_m_id,
            'password' => $request->password,
            'api_token' => $request->api_token,
            'remember_token' => $request->remember_token
        ]);

        return response()->json([
            'status' => true,
            'message' =>"Successfully creating user"
        ]);

    }


    /**
     * login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request){
            $data = array(
              'success' => true ,
              'message' => 'Ok',
              '_token'=> $restUser->createToken('abm@ecatalogue')->accessToken,
            );
            // var_dump($request);
            return response()->json($data,$this->successStatus);
			
/* 		$dataUserProfile = User::where([
								['user_name', 	'=', request('username')],
								['is_active', 	'=', 1],
							])
							->first();
		if ($dataUserProfile) {
				Auth::login(request('username');
				$data = array(
				  'success' => true ,
		
                  'message' => 'Ok',
				  '_token'=> $restUser->createToken('abm@ecatalogue')->accessToken,
				);
				return response()->json($data,$this->successStatus);				
		} */
		
        if(Auth::attempt(['user_name' => request('username'), 'password' => request('password')])){
            $restUser = Auth::user();
            $success['token'] =  $restUser->createToken('abm@ecatalogue')->accessToken;
            // dd($user->first()->getOriginal());
            // $data = Array ( '_token' => 'P1VsHQZQdpguhWN82n9znnfuvG2aAf7fCk8SJtUV' ,'email' => demo1006@gmail.com [password] => 123456 ) 
            // dd($user);
            // Session::push('user', $data);  //$data is an array and user is a session key.
            $dataUserProfile = Users::select(DB::raw("*"))
                ->leftJoin('users_group', 'users.group_id', '=', 'users_group.group_id')
                ->leftJoin('companies_m', 'users.companies_m_id', '=', 'companies_m.id')
                ->where('users.user_id','=',$restUser->user_id)
                ->get();
            $RestProfile = $dataUserProfile->first()->getOriginal();
            // $_SESSION['CompanyName']= $RestProfile['name'];
            // $_SESSION['CompanyCode']= $RestProfile['code'];
            // $_SESSION['usertype']= $RestProfile['group_name'];
            // $_SESSION['realname']= $RestProfile['real_name'];
            // $_SESSION['userid']= $RestProfile['user_id'];
            // $_SESSION['username']= $RestProfile['user_name'];
            // Session::put('CompanyName', $RestProfile['name']);
            // Session::put('CompanyName', $RestProfile['name']);
            // Session::put('CompanyName', $RestProfile['name']);
            // Session::put('CompanyName', $RestProfile['name']);
            // Session::put('CompanyName', $RestProfile['name']);
            // Session::put('CompanyName', $RestProfile['name']);
            // $session = Session::get('CompanyName');
            // var_dump($session);
            // return response()->json(['success' => $success], $this->successStatus);
            // 
            // $request->session()->regenerate();

            // $this->clearLoginAttempts($request);

            $data = array(
              'success' => true ,
              'message' => 'Ok',
              '_token'=> $restUser->createToken('abm@ecatalogue')->accessToken,
            );
            // var_dump($request);
            return response()->json($data,$this->successStatus);
        }
	
		return response()->json(['error'=>'Unauthorised'], 401);
    }

    public function getLogout()
    {
        Auth::logout();

        //do something here

        return redirect('/');
    }


    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);


        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);            
        }


        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = Users::create($input);
        $success['token'] =  $user->createToken('MyApp')->accessToken;
        $success['name'] =  $user->name;


        return response()->json(['success'=>$success], $this->successStatus);
    }


    /**
     * details api
     *
     * @return \Illuminate\Http\Response
     */
    public function details()
    {
        $user = Auth::user();
        return response()->json(['success' => $user], $this->successStatus);
    }
}