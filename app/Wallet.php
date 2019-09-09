<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    public function scopeAuthUserWallets($query)
    {
        $userId = auth()->user()->id;

        return $query->whereUserId($userId);
    }
}
