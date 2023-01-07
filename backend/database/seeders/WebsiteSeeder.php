<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Website;

class WebsiteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $Websites = [
            [
                "user_id" => 1,
                "website_url" => "www.ashaal.com",
                "time_to_add" => "20 hours",
                "sample_url" => "Ashaal",
                "domain_rating" => 65,
            ],
            [
                "user_id" => 1,
                "website_url" => "www.ashaalSecond.com",
                "time_to_add" => "3 days",
                "sample_url" => "AshaalSecond",
                "domain_rating" => 55,
            ],
            [
                "user_id" => 2,
                "website_url" => "www.masry.com",
                "time_to_add" => "4 hours",
                "sample_url" => "Masry",
                "domain_rating" => 60,
            ],
            [
                "user_id" => 3,
                "website_url" => "www.rachini.com",
                "time_to_add" => "5 days",
                "sample_url" => "Rachini",
                "domain_rating" => 44,
            ],
            [
                "user_id" => 4,
                "website_url" => "www.sara.com",
                "time_to_add" => "1 month",
                "sample_url" => "Sara",
                "domain_rating" => 40,
            ],
        ];
        foreach ($Websites as $website) {
            Website::create($website);
        }
    }
}
