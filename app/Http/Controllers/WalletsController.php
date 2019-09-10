<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Blockchain\Clients\ClientContract;
use App\Http\Requests\Wallet as WalletRequest;
use App\Services\Blockchain\BlockChainService;
use App\Wallet;

class WalletsController extends Controller
{
    /**
     * Return all wallets.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $wallets = Wallet::authUserWallets()->with(['currency', 'addresses'])->get();

        return response()->json(compact('wallets'));
    }

    /**
     * Create a new wallet.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(WalletRequest $request)
    {
        config(['crypto.currency' => $request->get('coin')]);
        
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

        return response()->json(['message' => 'Wallet deleted successfully']);
    }
}
