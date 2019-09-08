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
        $accessToken = config('crypto.token');
        $currency = request('coin'); 
        $appEnvironment = app()->env == 'production' ? true : false;

        $bitgo = app()->makeWith(ClientContract::class, compact('accessToken', 'currency', 'appEnvironment'));
        $response = $bitgo->createWallet();
        
        if(!$response) {
            return response()->json(['message' => 'Error creating wallet'], 422);
        }
        return response()->json(['success' => 'Wallet created successfully']);
    }
}
