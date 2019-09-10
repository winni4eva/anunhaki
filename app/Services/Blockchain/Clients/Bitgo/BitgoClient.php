<?php

namespace App\Services\Blockchain\Clients\Bitgo;

use neto737\BitGoSDK\BitGoSDK;
use neto737\BitGoSDK\BitGoExpress;
use App\Services\Blockchain\Clients\ClientContract;
use GuzzleHttp\Client;

class BitgoClient implements ClientContract
{
    protected $bitGo;

    protected $bitGoExpress;

    public function __construct(string $accessToken, string $currency = 'tbtc', bool $appEnvironment = false)
    {
        $this->bitgo = new BitGoSDK($accessToken, $currency, $appEnvironment);
        $this->bitgo->walletId = config('crypto.walletId');
        $this->bitGoExpress = new BitGoExpress(config('crypto.host'), config('crypto.port'), $currency);
        $this->bitGoExpress->accessToken = $accessToken;
    }

    public function createWallet() 
    {   
        $label = auth()->user()->email;
        $passphrase = auth()->user()->last_name;

        $response = $this->bitGoExpress->generateWallet($label, $passphrase);

        if(collect($response)->has('error')) {
            logger($response);
            return false;
        }
        
        return $response;
    }

    public function createWalletAddress() 
    {
        $response = $this->bitgo->createWalletAddress();
        
        if(collect($response)->has('error')) {
            logger($response);
            return false;
        }

        return $response;
    }

    public function deleteWallet() 
    {
        // $getWalletsEndpoint = $this->expressServerHost.$this->apiVersion."/{$this->currency}/wallet/{$walletId}";

        // $response = $this->httpClient->delete($getWalletsEndpoint);

        // if($response->getStatusCode() == 200) {
        //     return $response->getBody()->getContents();
        // }
        // return false;
    }
}