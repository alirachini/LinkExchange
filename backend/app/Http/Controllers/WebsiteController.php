<?php

namespace App\Http\Controllers;

use App\Models\Website;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreWebsiteRequest;
use App\Http\Requests\UpdateWebsiteRequest;

class WebsiteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $websites = DB::table('websites')
            ->where('user_id', '!=', Auth::id())
            ->orderBy('domain_rating', 'desc')
            ->get();
        return response()->json(
            [
                "websites" => $websites
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $Website = new Website();
        $user_id = $request->input('user_id');
        $website_url = $request->input('website_url');
        $time_to_add = $request->input('time_to_add');
        $sample_url = $request->input('sample_url');
        $domain_rating = $request->input('domain_rating');


        $Website->user_id = $user_id;
        $Website->website_url = $website_url;
        $Website->time_to_add = $time_to_add;
        $Website->sample_url = $sample_url;
        $Website->domain_rating = $domain_rating;

        $Website->save();

        return response()->json([
            " Website was created"
        ]);
    }

    /**
     * Display the specified resource.
     * @param int $id
     * @param  \App\Models\Website  $website
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $website = website::where('user_id', $id)->with("user")->get();
        return response()->json([
            $website

        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Website  $website
     * @return \Illuminate\Http\Response
     */
    public function edit(Website $website)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @param  \App\Http\Requests\UpdateWebsiteRequest  $request
     * @param  \App\Models\Website  $website
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Website $website, $id)
    {
        $website = website::findOrFail($id);
        $inputswebsite = $request->except(['_method', 'token']);
        $website->update($inputswebsite);
        return response()->json([
            "website updated"
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Website  $website
     * @return \Illuminate\Http\Response
     */
    public function destroy(Website $website, $id)
    {
        $website = website::where('id', $id);
        $website->delete();
        return response()->json([
            "website has been deleted"
        ]);
    }
    public function getUser($id)
    {
        $website = User::where('id', $id)->get();
        return response()->json([
            $website

        ]);
    }
}

