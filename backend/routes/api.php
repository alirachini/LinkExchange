<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AhrefController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\WebsiteController;
use App\Models\Request;
use Symfony\Component\Routing\RequestContext;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
Public Routes
Laravel Passport Authentication
*/

Route::post('/login', [AuthController::class, 'Login']); // login Route
Route::post('/register', [AuthController::class, 'Register']); // Register Route
Route::post("/forget-password", [AuthController::class, "ForgetPassword"])->name('email.send');
Route::post("/reset-password", [AuthController::class, "ResetPassword"]);
Route::post("/send-verification", [AuthController::class, "sendVerify"]);
Route::post("/verify-account", [AuthController::class, "verifyAccount"]);
Route::get('/user', [UserController::class, 'checkLoggedUser'])->middleware('auth:api'); // check the authorization
Route::get('/user-website', [UserController::class, 'getuserwebsites'])->middleware('auth:api');
Route::post('/backlink', [UserController::class, 'store'])->middleware('auth:api');

Route::get("/website-dr", [AhrefController::class, "getData"]);
Route::get('/user-score', [UserController::class, 'userScore'])->middleware('auth:api');




Route::get('/statuses',[StatusController::class,'get_all_statuses']);
Route::get('/requestssent/{id}',[RequestController::class,'get_sent_requests_with_website_id']);
Route::get('/requestsreceived/{id}',[RequestController::class,'get_received_requests_with_website_id']);
Route::get('/comments/{id}',[CommentController::class,'get_comments_by_request']);
Route::get('/requestreceiveduser/{id}',[RequestController::class,'get_received_requests_with_user_id']);
Route::get('/requestsentuser/{id}',[RequestController::class,'get_sent_requests_with_user_id']);
Route::post('/requestupdate/{id}',[RequestController::class,'update_request_data']);
Route::post('/acceptrequest/{id}',[RequestController::class,'acceptRequest']);
Route::post('/rejectrequest/{id}',[RequestController::class,'reject_request']);
Route::post('/addcomment/{id}',[CommentController::class,'create_comment']);
Route::get('/receivedcount/{id}',[Requestcontroller::class,'get_requests_received_count']);

Route::get('/getWebsites', [WebsiteController::class, 'index'])->middleware('auth:api');; // get all websites
Route::post('/addWebsites', [WebsiteController::class, 'store']); // add a new website
Route::get('/getWebsites/{id}', [WebsiteController::class, 'show']); // get websites of user
Route::put('/editWebsites/{id}', [WebsiteController::class, 'update']); // edit website
Route::delete('/deleteWebsite/{id}', [WebsiteController::class, 'destroy']); // delete website


Route::get("/userWebsites/{id}", [UserController::class, "userWebsites"]);
Route::put("/profile/{id}", [UserController::class, "updateAuthUser"]);

Route::get('/getWebsites/{id}', [WebsiteController::class, 'show']); // get one website
Route::put('/editWebsites/{id}', [WebsiteController::class, 'update']); // edit website

Route::get("/getUser/{id}", [WebsiteController::class, "getUser"]);



