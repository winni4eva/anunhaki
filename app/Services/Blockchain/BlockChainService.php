<?php

namespace App\Services\Blockchain;

use App\Services\Blockchain\Clients\ClientContract;
use App\Wallet;
use App\Currency;
use App\Address;

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

        if(!$response) {
            return $response;
        }

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

        return (bool)$response;
    }

    public function createWalletAddress() 
    {
        $response = $this->client->createWalletAddress();

        if(!$response) {
            return $response;
        }

        $userId = auth()->user()->id;
        $wallet = Wallet::whereUserId($userId)->where('wallet_id', $response['wallet'])->first();
        Address::create([
            'wallet_id' => $wallet->id,
            'address_id' => $response['id'],
            'addresss' => $response['address'],
            'dump' => $response
        ]);

        return (bool)$response;
    }

    public function deleteWallet() 
    {
        $response = $this->client->deleteWallet();
    }

}