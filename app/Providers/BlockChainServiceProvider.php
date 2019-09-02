<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\Blockchain\Clients\ClientContract;
use App\Services\Blockchain\Clients\Bitgo;

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
        $this->app->bind(
            ClientContract::class,
            function($accessToken, $currency, $appEnvironment){
                return new Bitgo($accessToken, $currency, $appEnvironment);
            }
        );
    }
}
