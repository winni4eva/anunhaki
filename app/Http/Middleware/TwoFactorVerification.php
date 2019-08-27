<?php

namespace App\Http\Middleware;

use Closure;
use Aloha\Twilio\Twilio;
use Carbon\Carbon;
use App\Notifications\TwoFactorVerficationNotification;

class TwoFactorVerification
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
        $user = \App\User::first();
        //auth()->loginUsingId($user->id);
        //auth()->user()

        if($user->token_2fa_expiry > Carbon::now()){
            return $next($request);
        } 
        
        $user->token_2fa = mt_rand(100000, 999999);
        $user->save();

        $user->notify(new TwoFactorVerficationNotification($user));
        // If you want to use email instead just 
        // send an email to the user here ..
        return redirect('/2fa');
    }
}
