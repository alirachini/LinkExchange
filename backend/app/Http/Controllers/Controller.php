<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
}


/*
<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\RegisterRequest;
use Auth;

class AuthController extends Controller
{
    public function Login(Request $request){
        try{
        if(Auth::attempt($request->only('email','password'))){
            $user = Auth::user();
            $token = $user ->createToken('app')->accessToken;

            return response([
                'message'=>'Succesfully Login',
                'token'=> $token,
                'user'=> $user,
            ],200);
        }


        } catch(Exception $exception) {
            return response([
                'message'=>$exception->getMessage()
            ],400);
        }
        return response([
            'message'=>'Invalid Email or Password'
        ],401);
    }


    public function Register(RegisterRequest $request){

        try{
           $user = User::create([
            'first_name'=> $request->first_name,
            'last_name'=> $request->last_name,
            'email'=>$request->email,
            'password'=> Hash::make($request->password)
           ]);
           $token = $user->createToken('app')->accessToken;
          return response([
            'message'=> "Registration Successfull",
            'token'=>$token,
            'user'=>$user
          ],200);  
         } catch(Exception $exception) {
                return response([
                    'message'=>$exception->getMessage()
                ],400);
            }
    }


}




LRequest:

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
 /*   public function authorize() 
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
 /*   public function rules()
    {
        return [
            'first_name'=> 'required|max:55',
            'last_name'=> 'required|max:55',
            'email'=> 'required|unique:users|min:5|max:60',
            'password'=> 'required|min:8|confirmed'
        ];
    }
}


*/