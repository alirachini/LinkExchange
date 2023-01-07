<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Comment;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $Comments = [
            [
                "request_id" => 1,
                "commenter_id" => 1,
                "comment" => "see my link and give your feedback",

            ],
            [
                "request_id" => 1,
                "commenter_id" => 3,
                "comment" => "what about changes",

            ],
            [
                "request_id" => 3,
                "commenter_id" => 4,
                "comment" => "it will be great to have a backlink from your website",
            ],
            [
                "request_id" => 3,
                "commenter_id" => 5,
                "comment" => "will make tha changes as discused",
            ],
        ];
        foreach ($Comments as $comment) {
            Comment::create($comment);
        }
    }
}
