<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\Blockchain\Clients\ClientContract;
use App\Http\Requests\Wallet as WalletRequest;
use App\Services\Blockchain\BlockChainService;
use App\Services\Wallet\WalletService;
use App\Services\Address\AddressService;

class WalletsController extends Controller
{
    protected $walletService;

    protected $addressService;

    public function __construct(WalletService $walletService, AddressService $addressService)
    {
        $this->walletService = $walletService;
        $this->addressService = $addressService;
    }

    /**
     * Return all wallets.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $wallets = $this->walletService->getWallets();

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
        $wallet = resolve(BlockChainService::class)->createWallet();
        $this->walletService->saveWallet($wallet);

        config(['crypto.walletId' => $wallet['id']]);
        $addresses = resolve(BlockChainService::class)->getWalletAddresses();

        $this->addressService->saveAddresses($addresses['addresses'], $wallet['id']);

        if(!$addresses) {
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
