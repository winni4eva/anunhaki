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

Route::resource('countries', 'CountriesController', ['only' => ['index']]);
Route::group(
    ['namespace' => 'Auth'], 
    function () {
        Route::get('logout', 'LoginController@logout');
        Route::post('register', 'RegisterController@register');
        Route::post('login', 'LoginController@login');
        Route::get('send-two-factor-token', 'LoginController@sendtwoFactorToken')->middleware(['api']);
        Route::post('post-two-factor-token', 'LoginController@postTwoFactorToken')->middleware(['api']);
    }
);
Route::group(
    ['middleware' => 'api'],
    function () {
        Route::resource('countries', 'CountriesController', ['only' => ['index']]);
    }
);

// ========== Cleanup
Route::get('wallets', function(){
    $wallets = [
        ['id'=>123,'name'=>'BTC'], 
        ['id'=>345,'name'=>'LTC']
    ];
    return response()->json(compact('wallets'));
});
// ========== Cleanup
