<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class)->create(['phone_number' => env('2FA_PHONE_NUBER'), 'option_2fa' => 'email']);
    }
}
