<?php

namespace Database\Seeders;

use App\Models\Request;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $Requests = [
            [
                "website_id_sender" => 1,
                "website_id_receiver" => 3,
                "status_id" => 3,
                "article_title" => "request to backlink from masri",
                "URL" => "/ashaal-electronics/",
                "link_to_article" => "www.link.com",
                "note" => "I need some changes",
                "amount" => 55,

            ],
            [
                "website_id_sender" => 3,
                "website_id_receiver" => 2,
                "status_id" => 1,
                "article_title" => "request to backlink from ashaal",
                "URL" => "/masry-teaching/",
                "link_to_article" => "www.biology.com",
                "note" => "great website",
                "amount" => 50,

            ],
            [
                "website_id_sender" => 4,
                "website_id_receiver" => 5,
                "status_id" => 2,
                "article_title" => "request to backlink from sarah",
                "URL" => "/rachini-brand/",
                "link_to_article" => "www.brands.com",
                "note" => "please consider my request",
                "amount" => 65,
            ],
            [
                "website_id_sender" => 5,
                "website_id_receiver" => 4,
                "status_id" => 3,
                "article_title" => "request to backlink from rachini",
                "URL" => "/sarah-online/",
                "link_to_article" => "www.online.com",
                "note" => "waiting for your response",
                "amount" => 30,
            ],
        ];
        foreach ($Requests as $request) {
            Request::create($request);
        }
    }
}
