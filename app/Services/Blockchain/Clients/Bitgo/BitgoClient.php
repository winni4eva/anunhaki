<?php

namespace App\Services\Blockchain\Clients\Bitgo;

use neto737\BitGoSDK\BitGoSDK;
use App\Services\Blockchain\Clients\ClientContract;
use Symfony\Component\HttpClient\HttpClient;

class BitgoClient implements ClientContract
{
    protected $bitGo;

    protected $expressServerhost;

    protected $apiVersion;

    protected $accessToken;

    protected $currency;

    protected $appEnvironment;

    protected $httpClient;

    public function __construct(string $accessToken, string $currency, bool $appEnvironment = false)
    {
        $this->accessToken = $accessToken;
        $this->currency = $currency;
        $this->appEnvironment = $appEnvironment;
        $this->bitgo = new BitGoSDK($accessToken, $currency, $appEnvironment);
        $this->expressServerHost = config('crypto.host');
        $this->apiVersion = config('crypto.bitgoApiVersion');
        $this->httpClient = HttpClient::create([
            'auth_bearer' => $accessToken,
        ]);
    }

    public function createWallet(): string 
    {   
        $createWalletEndpoint = $this->expressServerHost.$this->apiVersion."/{$this->currency}/wallet/generate";
        $response = $this->httpClient->request('GET', $createWalletEndpoint);
        
        if($response->getStatusCode() == 200) {
            $data = $response->getContent();
            //cache data
        }
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