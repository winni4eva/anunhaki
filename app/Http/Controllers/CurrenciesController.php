<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Currency;

class CurrenciesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        logger(auth()->user()->email);
        $currencies = Currency::getEnvironmentCurrencies()->get();

        return response()->json(compact('currencies'));
    }
}
