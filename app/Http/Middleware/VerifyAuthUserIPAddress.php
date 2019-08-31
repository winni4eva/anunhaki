<?php

namespace App\Http\Middleware;

use Closure;

class VerifyAuthUserIPAddress
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(auth()->check()) {
            logger($request->all());
            logger(auth()->user()->white_listed_ips);
        }
        return $next($request);
    }
}
