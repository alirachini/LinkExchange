<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Models\Website;
use App\Mail\ForgetMail;
use App\Mail\VerifyMail;
use Illuminate\Http\Request;
use PHPMailer\PHPMailer\SMTP;
use Illuminate\Support\Facades\DB;
use PHPMailer\PHPMailer\PHPMailer;
use Illuminate\Validation\Rules\In;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\RegisterRequest;
use Illuminate\Validation\Rules\Exists;

class AuthController extends Controller
{
    public function Login(Request $request)
    {
        try {
            if (Auth::attempt($request->only('email', 'password'))) {
                $user = Auth::user();
                $id = Auth::id();
                $user_websites = Website::orderBy("user_id", "desc")
                    ->latest()
                    ->whereIn("user_id", [$id])
                    ->get();
                $token = $user->createToken('app')->accessToken;
                return response([
                    'message' => 'Succesfully Login',
                    'token' => $token,
                    'user' => $user,
                    'websites' => $user_websites,
                ], 200);
            }
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage()
            ], 400);
        }
        return response([
            'message' => 'Invalid Email or Password'
        ], 401);
    }


    public function Register(RegisterRequest $request)
    {

        try {
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
            $token = $user->createToken('app')->accessToken;
            return response([
                'message' => "Registration Successfull",
                'token' => $token,
                'user' => $user
            ], 200);
        } catch (Exception $exception) {
            return response([
                'message' => $exception->getMessage()
            ], 400);
        }
    }


    public function ForgetPassword(Request $request)
    {
        $request->validate([
            "email" => "required|email",
        ]);
        $email = $request->input("email");
        $email_check = DB::table("users")
            ->where("email", $email)
            ->first();

        if (User::where("email", $email)->doesntExist()) {
            return response()->json(
                [
                    "message" => "Email Not Found",
                ],
                404
            );
        } else if ($email_check) {
            // generate Random Token
            $token = random_int(10, 100000);
            try {
                if (
                    DB::table("password_resets")
                    ->where("email", $email)
                    ->exists()
                ) {
                    return response()->json(
                        [
                            "message" => "Request Already sent",
                        ],
                        400
                    );
                }
                DB::table("password_resets")->insert([
                    "email" => $email,
                    "token" => $token,
                ]);

                // Mail send to user
                Mail::to($email)->send(new ForgetMail($token));
                return response()->json([
                    "message" => "Check your mail inbox",
                ]);
            } catch (Exception $exception) {
                return response()->json(
                    [
                        "message" => $exception->getMessage(),
                    ],
                    400
                );
            }
        }


        // $email = $request -> email;

        // require 'PHPMailer-master/vendor/autoload.php';

        // $mail = new PHPMailer(true);


        // $mail -> SMTPDebug =0;
        // $mail -> isSMTP();
        // $mail->Host = 'mailgun';
        // $mail -> SMTPAuth = true;
        // $mail->Username = 'postmaster@sandboxfbf230afd0aa469a97410eac9e2faaa4.mailgun.org';
        // $mail->Password = '223092fff9a172e66aa6d6c9c61d694d-07a637b8-7d061a67';
        // $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        // $mail->Port       = 587;
        // $mail -> setFrom('alimassry20@gmail.com');
        // $mail -> addAddress($email);
        // $mail -> isHTML(true);
        // $mail->Subject = 'Subject';
        // $mail -> Body = 'this is the body'; 
        // $mail->send();
        // echo "Mail Sent";



    }





    public function ResetPassword(Request $request)
    {
        $request->validate([
            "token" => "required",
            "email" => "required|email",
            "password" => "required|min:8|confirmed",
        ]);

        $email = $request->input("email");
        $token = $request->input("token");
        $password = Hash::make($request->input("password"));
        $email_check = DB::table("password_resets")
            ->where("email", $email)
            ->first();
        $pin_check = DB::table("password_resets")
            ->where("token", $token)
            ->first();

        if (!$email_check) {
            return response()->json(
                [
                    "message" => "Email Not Found",
                ],
                401
            );
        }
        if (!$pin_check) {
            return response()->json(
                [
                    "message" => "Pin Code Invalid",
                ],
                401
            );
        }
        DB::table("users")
            ->where("email", $email)
            ->update(["password" => $password]);
        DB::table("password_resets")
            ->where("email", $email)
            ->delete();
        return response()->json([
            "message" => "Password Changed Successfully",
        ]);
    }


    public function sendVerify(Request $request)
    {
        $request->validate([
            "email" => "required|email",
        ]);
        $email = $request->input("email");
        $email_check = DB::table("users")
            ->where("email", $email)
            ->first();

        if (User::where("email", $email)->doesntExist()) {
            return response()->json(
                [
                    "message" => "Email Not Found",
                ],
                404
            );
        } else if ($email_check) {
            // generate Random Token
            $token = random_int(10, 100000);
            try {
                DB::table("users")->where('email', $email)->update([
                    "pin" => $token,
                ]);



                // Mail send to user
                Mail::to($email)->send(new VerifyMail($token));
                return response()->json([
                    "message" => "Check your mail inbox",
                    "pin" => $token,
                ]);
            } catch (Exception $exception) {
                return response()->json(
                    [
                        "message" => $exception->getMessage(),
                    ],
                    400
                );
            }
        }
    }


    public function verifyAccount(Request $request)
    {
        $request->validate([
            "pin" => "required",
            "email" => "required|email",
        ]);

        $email = $request->input("email");
        $pin = $request->input("pin");
        $email_check = DB::table("users")
            ->where("email", $email)
            ->first();
        $pin_check = DB::table("users")
            ->where("pin", $pin)
            ->first();

        if (!$email_check) {
            return response()->json(
                [
                    "message" => "Email Not Found",
                ],
                401
            );
        }
        if (!$pin_check) {
            return response()->json(
                [
                    "message" => "Pin Code Invalid",
                ],
                401
            );
        }

        if ($email_check && $pin_check) {
            DB::table("users")
                ->where("email", $email)
                ->update(["email_verified_at" => now()]);
            return response()->json([
                "message" => "Account Verified",
            ]);
        }
    }
}
