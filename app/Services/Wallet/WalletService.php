<?php

namespace App\Services\Wallet;

use App\Wallet;
use App\Currency;
use App\Services\Blockchain\BlockChainService;

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
                    ->with(['currency', 'addresses','user'])
                    ->get()
                    ->toArray();
    }

    public function saveWallet(array $wallet, string $passphrase): void 
    {   
        $currency = $this->currency->whereIdentifier($wallet['coin'])->first();

        $wallet = $this->wallet->create([
            'wallet_id' => $wallet['id'],
            'user_id' => auth()->user()->id,
            'currency_id' => $currency->id,
            'label' => $wallet['label'],
            'keys' => $wallet['keys'],
            'passphrase' => $passphrase,
            'key_signatures' => $wallet['keySignatures'],
            'dump' => $wallet
        ]);
    }

    public function createWallet()
    {
        return resolve(BlockChainService::class)->createWallet();
    }

    public function getWalletAddresses()
    {
        return resolve(BlockChainService::class)->getWalletAddresses();
    }

    public function updateWalletAddress(string $addressId, string $passphrase)
    {
        resolve(BlockChainService::class)->updateWalletAddress($addressId, $passphrase);
    }

    public function getWalletBalances(array $wallets)
    {
        $walletBalances = collect($wallets)->map(function($wallet){
            return [
                'wallet_id' => $wallet['wallet_id'],
                'currency' => $wallet['currency']['identifier']
            ];
        })->groupBy('currency')
        ->map(function($data, $currency){
            config(['crypto.currency' => $currency]);
            return resolve(BlockChainService::class)->listWallets();
        })->map(function($fetchedWallet){
            return $fetchedWallet['wallets'];
        })->map(function($filteredWallet) {
            return collect($filteredWallet)->map(function($wallet){
                return [
                    'wallet_id' => $wallet['id'],
                    'balance' => [
                        'balance' => $wallet['balance'],
                        'confirmedBalance' => $wallet['confirmedBalance'],
                        'spendableBalance' => $wallet['spendableBalance'],
                        'balanceUSD' => 0
                    ]
                ];
            })->all();
        })->flatten(1);

        return $walletBalances;
    }

}