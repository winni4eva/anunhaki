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

    //protected $expressServerhost;

    //protected $apiVersion;

    protected $accessToken;

    protected $currency;

    protected $appEnvironment;

    protected $httpClient;

    public function __construct(string $accessToken, string $currency = 'tbtc', bool $appEnvironment = false)
    {
        $this->accessToken = $accessToken;
        $this->currency = $currency;
        $this->appEnvironment = $appEnvironment;
        $this->bitgo = new BitGoSDK($accessToken, $currency, $appEnvironment);
        $this->expressServerHost = config('crypto.host').':'.config('crypto.port');
        $this->apiVersion = config('crypto.bitgoApiVersion');
        //$this->bitGoExpress = new BitGoExpress(config('crypto.host'), config('crypto.port'), $currency);
        $this->httpClient = new Client(['headers' => ['Authorization'=>"Bearer {$accessToken}"]]);
    }

    public function createWallet() 
    {   
        try {
            // Check for wallet on bitgo if one exists, return cached wallet response
            // tdash
            $createWalletEndpoint = $this->expressServerHost.$this->apiVersion."/{$this->currency}/wallet/generate";
            $label = auth()->user()->email;
            $passphrase = auth()->user()->last_name;
            //$createWalletEndpoint = $this->expressServerHost.$this->apiVersion."/txlm/wallet/generate";
            $response = $this->httpClient->request('POST', $createWalletEndpoint, [
                'json' => [
                    'label' => $label,
                    'passphrase' => $passphrase,
                    'enterprise' => '5d74f776d8b63b7603c0de49837f7987'
                ]
            ]);
            
            // if($response->getStatusCode() == 200) {
            //     $data = $response->getBody()->getContents();
            //     logger($response->getStatusCode());
            //     logger($data);
            //     //cache data
            //     return true;
            // }
            logger($response->getStatusCode());
            logger($response->getBody()->getContents());
            // return false;
            //$this->bitGoExpress->accessToken = $this->accessToken;
            
            //$generateWallet = $this->bitGoExpress->generateWallet($label, $passphrase);
            //logger($generateWallet);
        } catch (\Exception $e) {
            logger('BitGo Client - Wallet Create Error');
            logger("Message: " . $e->getMessage());
            logger("File: " . $e->getFile());
            logger("Line: " . $e->getLine());
        }
    }

    public function getWallets() 
    {
        $getWalletsEndpoint = $this->expressServerHost.$this->apiVersion."/wallets";

        $response = $this->httpClient->request('GET', $getWalletsEndpoint);

        if($response->getStatusCode() == 200) {
            return $response->getBody()->getContents();
        }
        return false;
    }

    public function createWalletAddress(string $walletId): string 
    {
        $this->bitgo->walletId = 'btc';
        return $this->bitgo->createWalletAddress();
    }

    public function getCurrentUserProfile()
    {
        return $this->bitgo->getCurrentUserProfile();
    }

}