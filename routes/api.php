<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/', function (Request $request) {
    $public_key_rsa = file_get_contents(env("PATH_PUBLIC_KEY", "/Users/phs/Documents/freelancer/app-catalog/public.key"));
    $token = e(csrf_token());

    $verify = openssl_verify(
        stripslashes(json_encode($request)),
        base64_decode($request->t),
        $public_key_rsa,
        'sha256WithRSAEncryption'
    );
    if ($verify != 1) {
        return response()->json([
            'message' => "Not Verified",
            "status" => false
        ], 404);
    }

    $request = Request::create(env("URL_LOGIN") . "/login", "POST", [
        "_token" => $token,
        "username" => $request->username,
        "password" => $request->password
    ]);

    $request->headers->set('X-CSRF-TOKEN', csrf_token());
    $response = app()->handle($request);
    Auth::logout();
    Session::flush();
    return $response->getContent();
});


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


//Route::post('login', 'API\UserController@login');
Route::post('register', 'API\UserController@register');
Route::post('/create-users', 'API\UserController@createUser');

Route::group(['middleware' => 'auth:api'], function () {
    Route::post('details', 'API\UserController@details');
});
