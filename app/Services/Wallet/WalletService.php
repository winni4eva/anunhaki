<?php

namespace App\Services\Wallet;

use App\Wallet;
use App\Currency;

class WalletService
{
    protected $wallet;

    protected $currency;

    public function __construct(Wallet $wallet, Currency $currency)
    {
        $this->wallet = $wallet;
        $this->currency = $currency;
    }

    public function getWallets(): array
    {
        return $this->wallet->userWallets()
                    ->with(['currency', 'addresses'])
                    ->get()
                    ->toArray();
    }

    public function saveWallet(array $wallet): void 
    {   
        $currency = $this->currency->whereIdentifier($wallet['coin'])->first();

        $wallet = $this->wallet->create([
            'wallet_id' => $wallet['id'],
            'user_id' => auth()->user()->id,
            'currency_id' => $currency->id,
            'label' => $wallet['label'],
            'keys' => $wallet['keys'],
            'key_signatures' => $wallet['keySignatures'],
            'dump' => $wallet
        ]);
    }

}