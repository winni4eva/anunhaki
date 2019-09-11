<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Funds as FundsRequest;
use Facades\App\Services\Blockchain\BlockChainService;

class FundsController extends Controller
{
    /**
     * Create a new fund.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(FundsRequest $request)
    {
        logger($request->all());
        config(['crypto.currency' => $request->get('coin')]);
        
        $response = BlockChainService::createWallet();

        if(!$response) {
            return response()->json(['message' => 'Error sending funds'], 422);
        }

        return response()->json(['success' => 'Funds sent successfully']);
    }
}
