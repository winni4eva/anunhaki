<?php

namespace App\Services\Blockchain\Clients\Bitgo;

use neto737\BitGoSDK\BitGoSDK;
use App\Services\Blockchain\Clients\ClientContract;

class BitgoClient implements ClientContract
{
    protected $bitGo;

    protected $host;

    public function __construct(string $accessToken, string $currency, bool $appEnvironment = false)
    {
        $this->bitgo = new BitGoSDK($accessToken, $currency, $appEnvironment);
    }

    public function createWallet(string $currency): string 
    {   
        //$this->bitgo->walletId = 'btc';
        //return $this->bitgo->createWallet();
    }

    public function createWalletAddress(string $walletId, string $currency): string 
    {
        $this->bitgo->walletId = 'btc';
        return $this->bitgo->createWalletAddress();
    }

    public function getCurrentUserProfile()
    {
        return $this->bitgo->getCurrentUserProfile();
    }

}