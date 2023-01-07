<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Website;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Request as ModelsRequest;


class UserController extends Controller
{
    public function checkLoggedUser()
    {
        // return Auth::user();
        $user_data = Auth::user();
        return response()->json([
            "user_data" => $user_data,
        ]);

    }

     public function userScore()
    {
        $user_score = Auth::user()->score;
        return response()->json([
            "user_score" => $user_score,
        ]);
    }


    public function getuserwebsites()
    {
        $id = Auth::id();
        $user_websites = Website::orderBy("user_id", "desc")
            ->latest()
            ->whereIn("user_id", [$id])
            ->get();
        return response([
            "loggedInWebsites" => $user_websites,
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            "article_title" => "required",
            "URL" => "required",
            "link_to_article" => "required",
            "note" => "nullable",
        ]);

        $backlink = ModelsRequest::create([
            "article_title" => $request->article_title,
            "URL" => $request->URL,
            "link_to_article" => $request->link_to_article,
            "website_id_sender" => $request->website_id_sender,
            "website_id_receiver" => $request->website_id_receiver,
            "note" => $request->note,
            "amount" => $request->amount,
            "status_id" => 3,
        ]);


        $user = User::FindOrFail(Auth::id());
        $user->score = abs($user->score - $backlink->amount);
        $user->save();


        return response([
            'message' => 'Request Submitted',
            'request' => $backlink,
        ]);
    }

    public function updateAuthUser (Request $request, User $user, $id)
    {


        $user = User::findOrFail($id);

        $user->update([
        'first_name' => $request->first_name,
        'last_name' => $request->last_name,
        'email' => $request->email,
        'password' => Hash::make($request->password),


    ]);


        return response([
            'user'=> $user,
            'message'=> 'Updated Successfully'
        ]);
    }
}
