<?php

use Illuminate\Database\Seeder;
class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new \App\User;
        $user->user_name = "Sucipto";
        $user->group_id = "USG4";
        $user->user_id = "BQ";
        $user->email = "bqsoft77@gmail.com.com";
        $user->password = Hash::make("rahasiakitaberdua");
        $user->api_token = str_random(100);
        $user->save();
    }
}