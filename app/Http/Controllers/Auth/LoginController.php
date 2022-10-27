<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
     */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * Get the needed authorization credentials from the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    protected function credentials(Request $request)
    {
        $field = filter_var($request->get($this->username()), FILTER_VALIDATE_EMAIL) ? $this->username() : 'user_name';
        return [
            $field => $request->get($this->username()),
            'password' => $request->password,
        ];
    }

    /**
     * Get the login username to be used by the controller.
     *
     * @return string
     */
    public function username()
    {
        return property_exists($this, 'username') ? $this->user_name : 'username';
    }

    public function keepalive(Request $request)
    {

        $message =  'Process Succes';
        $success = true;

        $data = array(
            'success' => $success,
            'message' => $message
        );
        return \Response::json($data, 200);
    }

    /**
     * Handle a login request to the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $this->validateLogin($request);

        // If the class is using the ThrottlesLogins trait, we can automatically throttle
        // the login attempts for this application. We'll key this by the username and
        // the IP address of the client making these requests into this application.
        if ($this->hasTooManyLoginAttempts($request)) {
            $this->fireLockoutEvent($request);

            return $this->sendLockoutResponse($request);
        }

        if ($this->attemptLogin($request)) {
            return $this->sendLoginResponse($request);
        }

        // If the login attempt was unsuccessful we will increment the number of attempts
        // to login and redirect the user back to the login form. Of course, when this
        // user surpasses their maximum number of attempts they will get locked out.
        $this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request);
    }

    /**
     * Validate the user login request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    protected function validateLogin(Request $request)
    {
        $this->validate($request, [
            $this->username() => 'required|string',
            'password' => 'required|string',
        ]);
    }

    /**
     * Attempt to log the user into the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function attemptLogin(Request $request)
    {
        $user = User::where('user_name', '=', $request->username)
            ->where('is_active', '=', 1)
            ->first();

        if ($user) {
            if ($this->attemptLDAP($request)) {
                $this->guard()->login($user);
                return true;
            }

            return $this->guard()->attempt(
                $this->credentials($request),
                $request->has('remember')
            );
        }

        return false;
    }

    protected function attemptLDAP(Request $request)
    {

        $ad_server = config('auth.ldap.server');
        $ad_domain = config('auth.ldap.domain');

        $ldaprdn  = $ad_domain . "\\" . $request->username;
        $ldappass = $request->password;

        try {
            // connect to ldap server
            $ldapconn = @ldap_connect($ad_server);
            if ($ldapconn) {
                // binding to ldap server
                return @ldap_bind($ldapconn, $ldaprdn, $ldappass);
            }
        } catch (Exception $e) {
        }

        return false;
    }

    /**
     * Send the response after the user was authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    protected function sendLoginResponse(Request $request)
    {
        $request->session()->regenerate();

        $this->clearLoginAttempts($request);
        // $user = User::where('user_name', '=', $request->username)
        //             ->where('is_active', '=', 1)
        //             ->first();

        $user = DB::table('vw_users')->where('user_name','=',$request->username)->where('is_active',1)->first();

        $data = array(
            'success' => true,
            'message' => 'Ok',
            'data' => $user
        );
        return response()->json($data, 200);

        /*return $this->authenticated($request, $this->guard()->user())
                ?: redirect()->intended($this->redirectPath());*/
    }

/**
     * The user has been authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    protected function authenticated(Request $request, $user)
    {
        //
    }

    /**
     * Get the failed login response instance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function sendFailedLoginResponse(Request $request)
    {
        $errors = [$this->username() => trans('auth.failed')];





        if ($request->expectsJson()) {
            $message = trans('auth.failed');
            $success = false;
        } else {
            $message =  'Ok';
            $success = true;
        }
        $data = array(
            'success' => $success,
            'message' => $message,
        );
        return response()->json($data, 200);
    }
}
