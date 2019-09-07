<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Blockchain\Clients\ClientContract;
use App\Http\Requests\Wallet;

class WalletsController extends Controller
{
    /**
     * Return all wallets.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Create a new wallet.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Wallet $wallet)
    {
        logger($wallet->all());
        // $accessToken = config('crypto.token');
        // $currency = request('currency'); 
        // $appEnvironment = app()->env == 'production' ? true : false;
        // //logger(compact('accessToken', 'currency', 'appEnvironment'));

        // $bitgo = app()->makeWith(ClientContract::class, compact('accessToken', 'currency', 'appEnvironment'));

        // $userProfile = $bitgo->getCurrentUserProfile();

        // return response()->json(compact('userProfile'));
    }
}
