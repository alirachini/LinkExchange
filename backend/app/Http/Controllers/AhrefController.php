<?php

namespace App\Http\Controllers;
use App\Models\User;
use App\Models\Ahref;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;

class AhrefController extends Controller
{

    public function getData(){
    $api_url= 'https://jsonplaceholder.typicode.com/todos/90';


    $response = Http::get($api_url);


    

    
    DB::table("websites")->update([
        "domain_rating" => $response['id'],
        
    ]);
    return response([
         'message' => 'Dr saved',
    ]);
    }
}
