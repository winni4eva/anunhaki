<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Address as AddressRequest;
use App\Services\Blockchain\BlockChainService;

class AddressController extends Controller
{
    /**
     * Create a new wallet.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(AddressRequest $request)
    {
        config(['crypto.currency' => $request->get('coin')]);
        config(['crypto.walletId' => $request->get('walletId')]);
        
        $response = resolve(BlockChainService::class)->createWalletAddress();

        if(!$response) {
            return response()->json(['message' => 'Error creating address'], 422);
        }

        return response()->json(['success' => 'Address created successfully']);
    }
}
