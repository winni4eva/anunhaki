<?php

use Illuminate\Database\Seeder;
use App\Currency;

class CurrenciesTableSeeder extends Seeder
{

    protected $supportedCurrencies = [
        ['currency' => 'Bitcoin Testnet', 'identifier' => 'tbtc', 'environment' => 'local'],
        ['currency' => 'Bitcoin', 'identifier' => 'btc', 'environment' => 'production'],
        ['currency' => 'Bitcoin Cash Testnet', 'identifier' => 'tbch', 'environment' => 'local'],
        ['currency' => 'Bitcoin Cash', 'identifier' => 'bch', 'environment' => 'production'],
        ['currency' => 'Litecoin Testnet', 'identifier' => 'tltc', 'environment' => 'local'],
        ['currency' => 'Litecoin', 'identifier' => 'ltc', 'environment' => 'production'],
    ];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect($this->supportedCurrencies)->map(function($currency){
            Currency::firstOrCreate($currency);
        });
    }
}
