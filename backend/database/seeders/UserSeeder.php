<?php

namespace Database\Seeders;


use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $Users = [
            [
                "first_name" => "Ali",
                "last_name" => "Ashaal",
                "password" => Hash::make("1q2w3e4r5t"),
                "email" => "alizaynashaal@gmail.com",
                "remember_token" => Str::random(10),

            ],
            [
                "first_name" => "Ali",
                "last_name" => "Masri",
                "password" => Hash::make("1q2w3e4r5t"),
                "email" => "alimassry20@gmail.com",
                "remember_token" => Str::random(10),
            ],
            [
                "first_name" => "Ali",
                "last_name" => "Rachini",
                "password" => Hash::make("1q2w3e4r5t"),
                "email" => "alirachini12345@gmail.com",
                "remember_token" => Str::random(10),
            ],
            [
                "first_name" => "sarah",
                "last_name" => "nasrallah",
                "password" => Hash::make("1q2w3e4r5t"),
                "email" => "sarahnasrallah23@gmail.com",
                "remember_token" => Str::random(10),
            ],
        ];
        foreach ($Users as $user) {
            User::create($user);
        }
        // User::factory(10)->create();


    }
}

