<?php

namespace App\Services\Blockchain\Clients;


interface ClientContract
{
    public function createWallet();

    public function getWalletAddresses();

    public function createWalletAddress();

    public function sendTransaction(string $recepientAddress, int $amount);

    public function getWalletTransactions();
}