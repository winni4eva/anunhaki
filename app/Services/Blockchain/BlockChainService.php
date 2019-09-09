<?php

namespace App\Services\Blockchain;

use App\Services\Blockchain\Clients\ClientContract;
use App\Wallet;
use App\Currency;

class BlockChainService
{
    protected $client;

    public function __construct(ClientContract $client)
    {
        $this->client = $client;
    }

    public function createWallet() 
    {   
        $response = $this->client->createWallet();

        if($response) {
            $currency = Currency::whereIdentifier($response['coin'])->first();
            Wallet::create([
                'wallet_id' => $response['id'],
                'user_id' => auth()->user()->id,
                'currency_id' => $currency->id,
                'label' => $response['label'],
                'keys' => $response['keys'],
                'key_signatures' => $response['keySignatures'],
                'dump' => $response
            ]);
        }

        return $response;
    }

    public function getWallets() 
    {
        $response = $this->client->getWallets();
    }

    public function createWalletAddress() 
    {
        $response = $this->client->createWalletAddress();
    }

    public function deleteWallet() 
    {
        $response = $this->client->deleteWallet();
    }

}