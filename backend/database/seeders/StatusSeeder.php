<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $Statuses = [
            [
                "request_status" => "Accept",

            ],
            [
                "request_status" => "Reject",
            ],
            [
                "request_status" => "Progress",
            ],
        ];
        foreach ($Statuses as $status) {
            Status::create($status);
        }
    }
}
