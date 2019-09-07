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

Route::get('countries', 'CountriesController@index');
Route::group(
    ['namespace' => 'Auth'], 
    function () {
        Route::get('logout', 'LoginController@logout');
        Route::post('register', 'RegisterController@register');
        Route::post('login', 'LoginController@login');
    }
);

Route::group(
    ['namespace' => 'Auth', 'middleware', 'auth:api'], 
    function () {
        Route::get('send-two-factor-token', 'LoginController@sendtwoFactorToken');
        Route::post('post-two-factor-token', 'LoginController@postTwoFactorToken');
    }
);

Route::group(
    ['middleware' => 'auth:api'],
    function () {
        Route::get('currencies', 'CurrenciesController@index');
        Route::resource('wallets', 'WalletsController', ['only' => ['index','store']]);
    }
);
