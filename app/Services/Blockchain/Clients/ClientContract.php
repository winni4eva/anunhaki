<?php

namespace App\Services\Blockchain\Clients;


interface ClientContract
{
    public function createWallet();

    public function createWalletAddress();
}