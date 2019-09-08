<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\Blockchain\Clients\ClientContract;
use App\Services\Blockchain\Clients\Bitgo\BitgoClient;

class BlockChainServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind(ClientContract::class, BitgoClient::class);
    }
}
