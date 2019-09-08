<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Blockchain\Clients\ClientContract;
use App\Http\Requests\Wallet;
use App\Currency;

class WalletsController extends Controller
{
    /**
     * Return all wallets.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $accessToken = config('crypto.token');
        $currency = 'tbtc'; 
        $appEnvironment = app()->env == 'production' ? true : false;
        $key = auth()->user()->email.'-'.app()->env.'-'.'wallets';
    
        if ($wallets = cache($key)) {
            return response()->json(compact('wallets'));
        }

        $bitgo = app()->makeWith(ClientContract::class, compact('accessToken', 'currency', 'appEnvironment'));
        $wallets = $bitgo->getWallets();

        if (!$wallets) {
            return response()->json(['message' => 'Error fetching wallets']);
        }
        $arrWallets = json_decode($wallets, true);
        $arrWallets = collect($arrWallets)->get('wallets');
        $wallets = collect($arrWallets)->map(function($wallet){
            $currency = Currency::whereIdentifier($wallet['coin'])->first();
            return [
                'walletId' => $wallet['id'],
                'coin' => $wallet['coin'],
                'currency' => $currency->currency,
                'label' => $wallet['label'],
                'm' => $wallet['m'],
                'n' => $wallet['n'],
                'keys' => $wallet['keys'],
                'keySignatures' => $wallet['keySignatures']
            ];
        })->all();
        cache([$key => $wallets], now()->addSeconds(1800));
        return response()->json(compact('wallets'));
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
