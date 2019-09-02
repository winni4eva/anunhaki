<?php

namespace App\Services\Blockchain\Clients;


interface ClientContract
{
    public function createWallet(string $currency);

    public function createWalletAddress(string $walletId, string $currency);
}