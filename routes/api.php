<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(
    ['namespace' => 'Auth'], 
    function () {
        Route::get('logout', 'LoginController@logout');
        Route::post('register', 'RegisterController@register');
        Route::post('login', 'LoginController@login');
    }
);

Route::post('2fa', function(Request $request){
    logger($request->all());
    return response()->json(['Made It']);
});
Route::get('wallets', function(){
    $wallets = [
        ['id'=>123,'name'=>'BTC'], 
        ['id'=>345,'name'=>'LTC']
    ];
    return response()->json(compact('wallets'));
});

Route::group(
    ['middleware' => 'api'],
    function () {
        //Route::resource('articles', 'ArticleController', ['except' => ['index']]);
    }
);
