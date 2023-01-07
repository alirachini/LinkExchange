<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Database\Seeders\StatusSeeder;
use Database\Seeders\CommentSeeder;
use Database\Seeders\RequestSeeder;
use Database\Seeders\WebsiteSeeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $Users = [
        //     [
        //         "first_name" => "Ali",
        //         "last_name" => "Ashaal",
        //         "password" => Hash::make("1q2w3e4r5t"),
        //         "email" => "alizaynashaal@gmail.com",
        //         "remember_token" => Str::random(10),
        //     ],
        //     [
        //         "first_name" => "Ali",
        //         "last_name" => "Masri",
        //         "password" => Hash::make("1q2w3e4r5t"),
        //         "email" => "alimassry20@gmail.com",
        //         "remember_token" => Str::random(10),
        //     ],
        //     [
        //         "first_name" => "Ali",
        //         "last_name" => "Rachini",
        //         "password" => Hash::make("1q2w3e4r5t"),
        //         "email" => "alirachini12345@gmail.com",
        //         "remember_token" => Str::random(10),
        //     ],
        //     [
        //         "first_name" => "sarah",
        //         "last_name" => "nasrallah",
        //         "password" => Hash::make("1q2w3e4r5t"),
        //         "email" => "sarahnasrallah23@gmail.com",
        //         "remember_token" => Str::random(10),
        //     ],
        // ];
        // foreach ($Users as $user) {
        //     User::create($user);
        // }
        // User::factory(10)->create();

        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call([
            UserSeeder::class,
            WebsiteSeeder::class,
            StatusSeeder::class,
            RequestSeeder::class,
            CommentSeeder::class,
        ]);
    }
}
