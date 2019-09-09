<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Blockchain\Clients\ClientContract;
use App\Http\Requests\Wallet;
use App\Services\Blockchain\BlockChainService;
use App\Wallet as WalletModel;

class WalletsController extends Controller
{
    /**
     * Return all wallets.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $wallets = WalletModel::authUserWallets()->with('currency')->get();

        return response()->json(compact('wallets'));
    }

    /**
     * Create a new wallet.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Wallet $wallet)
    {
        config(['crypto.currency' => $wallet->get('coin')]);
        
        $response = resolve(BlockChainService::class)->createWallet();

        if(!$response) {
            return response()->json(['message' => 'Error creating wallet'], 422);
        }

        return response()->json(['success' => 'Wallet created successfully']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // $currency = request('coin'); 

        // $accessToken = config('crypto.token');
        // $currency = request('coin'); 
        // $appEnvironment = app()->env == 'production' ? true : false;

        // $bitgo = app()->makeWith(ClientContract::class, compact('accessToken', 'currency', 'appEnvironment'));
        // $response = $bitgo->deleteWallet($id);

        // if(!$response) {
        //     return response()->json(['message' => 'Error deleting wallet'], 422);
        // }
        return response()->json(['message' => 'Wallet deleted successfully']);
    }
}
