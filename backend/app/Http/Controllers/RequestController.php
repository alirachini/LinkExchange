<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Request;
use App\Models\Website;
use Illuminate\Http\Request as Req;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreRequestRequest;
use App\Http\Requests\UpdateRequestRequest;

class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Http\Requests\StoreRequestRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreRequestRequest $request)
    {
        //
    }



    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateRequestRequest  $request
     * @param  \App\Models\Request  $request
     * @return \Illuminate\Http\Response
     */


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //
    }
    public function get_sent_requests_with_website_id($id)
    {
        $sentRequests = Request::where('website_id_sender', $id)
            ->with('website_sender')
            ->with('website_receiver')
            ->with('status')
            ->get();
        return response()->json($sentRequests);
    }
    public function get_received_requests_with_website_id($id)
    {
        $receivedRequests = Request::where('website_id_receiver', $id)
            ->with('website_sender')
            ->with('website_receiver')
            ->with('status')
            ->get();
        return response()->json($receivedRequests);
    }
    public function get_received_requests_with_user_id($id){
        $websites = website::where('user_id',$id)->get();
        $arr =[];
        $finalarr=[];
        foreach($websites as $website){
            $receivedRequests = Request::where('website_id_receiver',$website->id)
                                    ->with('website_sender')
                                    ->with('website_receiver')
                                    ->with('status')
                                    ->get();
        $arr[]=$receivedRequests;
        }
        for($x = 0; $x< count($arr); $x++)
        {
            if($arr[$x]->isnotEmpty())
            for($y = 0 ; $y < count($arr[$x]); $y++){
            $finalarr[]= $arr[$x][$y];}
        }
        return response()->json($finalarr);
    }
    public function get_sent_requests_with_user_id($id){
        $websites = website::where('user_id',$id)->get();
        $arr =[];
        $finalarr=[];
        foreach($websites as $website){
            $sentRequests = Request::where('website_id_sender',$website->id)
                                    ->with('website_sender')
                                    ->with('website_receiver')
                                    ->with('status')
                                    ->get();
            $arr[]=$sentRequests;
        }
        for($x = 0; $x< count($arr); $x++)
        {
            if($arr[$x]->isnotEmpty())
            for($y = 0 ; $y < count($arr[$x]); $y++){
            $finalarr[]= $arr[$x][$y];}
        }
        return response()->json($finalarr);
    }
    public function update_request_data(Req $request, $id){
        $title = $request->input('title');
        $url = $request->input('url');
        $linktoarticle = $request->input('link');
        $note = $request->input('note');
        $updateit = Request::where('id',$id)->update(['article_title'=>$title,'URL'=>$url,'link_to_article'=>$linktoarticle,'note'=>$note]);
        $updateitsucceed = Request::where('id',$id)->get();

    }
    public function acceptRequest($id){
        $request_to_accept= Request::where('id',$id)->update(['status_id'=>1]);
        $receivers = Request::where('id',$id)->with('website_receiver')->get();
        foreach( $receivers as $receiver){
            $receiverid = $receiver->website_receiver->user_id;
            $amount = $receiver->amount;
            $scorebefore = User::where('id',$receiverid)->get();
            foreach($scorebefore as $score){
                $scoreupdated = $score->score; 
                $finalscore = $scoreupdated + $amount;
                $userd = User::where('id',$receiverid)->update(['score'=>$finalscore]);
                $user = User::where('id',$receiverid)->get();  
            }
        }
        return response()->json($user);
    }
    public function reject_request($id){
        $request_to_reject= Request::where('id',$id)->update(['status_id'=>2]);
        $senders = Request::where('id',$id)->with('website_sender')->get();
        foreach($senders as $sender){
            $senderid = $sender->website_sender->user_id;
            $amount = $sender->amount;
            $scorebefore = User::where('id',$senderid)->get();
            foreach($scorebefore as $score){
                $scoreupdated = $score->score;
                $finalscore = $scoreupdated + $amount;
                $userd = User::where('id',$senderid)->update(['score'=>$finalscore]);
                $user = User::where('id',$senderid)->get();
            }
        }
        return response()->json($user);
    }
    public function get_requests_received_count($id)
    {
        $websites = website::where('user_id',$id)->get();
        $arr =[];
        $finalarr=[];
        foreach($websites as $website){
            $receivedRequests = Request::where('website_id_receiver',$website->id)
                                    ->where('status_id',3)
                                    ->with('website_sender')
                                    ->with('website_receiver')
                                    ->with('status')
                                    ->get();
        $arr[]=$receivedRequests;
        }
        for($x = 0; $x< count($arr); $x++)
        {
            if($arr[$x]->isnotEmpty())
            for($y = 0 ; $y < count($arr[$x]); $y++){
            $finalarr[]= $arr[$x][$y];}
        }
        $num = count($finalarr);
        return response()->json($num);
    }
}
