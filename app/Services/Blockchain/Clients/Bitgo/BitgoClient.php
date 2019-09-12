<?php

namespace App\Services\Blockchain\Clients\Bitgo;

use neto737\BitGoSDK\BitGoSDK;
use neto737\BitGoSDK\BitGoExpress;
use App\Services\Blockchain\Clients\ClientContract;

class BitgoClient implements ClientContract
{
    protected $bitGo;

    protected $bitGoExpress;

     /**
     * BitgoClient Initialization
     * 
     * @param string $accessToken  The developer account token
     * @param int $currency         The currency or coin identifier
     * @param string $appEnvironment      The current app environment
     */
    public function __construct(string $accessToken, string $currency = 'tbtc', bool $appEnvironment = false)
    {
        $this->bitgo = new BitGoSDK($accessToken, $currency, $appEnvironment);
        $this->bitgo->walletId = config('crypto.walletId');
        $this->bitGoExpress = new BitGoExpress(config('crypto.host'), config('crypto.port'), $currency);
        $this->bitGoExpress->accessToken = $accessToken;
    }

    public function createWallet() 
    {   
        $label = $this->generateLabel();
        $passphrase = $this->generatePassPhrase();

        $response = $this->bitGoExpress->generateWallet($label, $passphrase);

        if(collect($response)->has('error')) {
            return $this->handleErrorResponse($response);
        }
        
        return $response;
    }

    public function getWalletAddresses()
    {
        $response = $this->bitgo->getWalletAddresses(); 
        
        if(collect($response)->has('error')) {
            return $this->handleErrorResponse($response);
        }

        return $response;
    }

    public function createWalletAddress() 
    {
        $response = $this->bitgo->createWalletAddress();
        
        if(collect($response)->has('error')) {
            return $this->handleErrorResponse($response);
        }

        return $response;
    }

    public function sendTransaction(string $recepientAddress, $amount)
    {
        $response = $this->bitGoExpress->verifyAddress($recepientAddress);

        if(collect($response)->has('error')) {
            return $this->handleErrorResponse($response);
        }

        $response = $this->bitGoExpress->sendTransaction($recepientAddress, $amount, $this->generatePassPhrase());
        logger($response);
        if(collect($response)->has('error')) {
            return $this->handleErrorResponse($response);
        }

        return $response;
    }

    public function getWalletTransactions() 
    {
        $response = $this->bitgo->getWalletTransactions();
        
        if(collect($response)->has('error')) {
            return $this->handleErrorResponse($response);
        }
        
        return $response;
    }

    protected function handleErrorResponse($response)
    {
        logger($response);
        return false;
    }

    protected function generateLabel()
    {
        $email = explode('@', auth()->user()->email); 
        $label = $email[0].'-'.now()->toDateTimeString('Y-m-d H:i:s');
        return $label;
    }

    protected function generatePassPhrase()
    {
        return auth()->user()->last_name;
    }
}