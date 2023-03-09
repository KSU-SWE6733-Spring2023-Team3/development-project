<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use function Symfony\Component\String\length;

use App\Models\User;

class UserController extends Controller
{


    /*
     * Error messages
     */

    // Name errors
    public const MISSING_NAME_ERR_MSG = '"Name" is required but could not be found.';
    public const INVALID_NAME_ERR_MSG = '"Name" contained invalid characters. Please make sure it only contains A-Z, "-", and "\'" characters';

    // Email errors
    public const MISSING_EMAIL_ERR_MSG = '"Email" is required but could not be found';
    public const INVALID_EMAIL_ERR_MSG = '"Email" contained invalid characters';

    //Password errors
    public const MISSING_PASSWORD_ERR_MSG = '"Password" is required but could not be found.';
    public const INVALID_PASSWORD_ERR_MSG = '"Password" did not meet minimum requirements. Please make sure it is at least 16 characters long.';


    // Unique Constraints
    public const EMAIL_EXISTS_ERR_MSG = "An account using this email address already exists!.";


    /*
     * Success messages
     */
    public const USER_CREATED_SUCCESS_MSG = "User created successfully!";



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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        // Get the basic data from the request
        $name = $request->input("name") ?? '';
        $email = $request->input("email") ?? '';
        $password = $request->input("password") ?? '';

        if(empty($name))
        {
            return response()->json([
                'error' => self::MISSING_NAME_ERR_MSG
                ], 200);
        }

        if(empty($email))
        {
            return response()->json([
                'error' => self::MISSING_EMAIL_ERR_MSG
                ], 200);
        }

        if(empty($password))
        {
            return response()->json([
                'error' => self::MISSING_PASSWORD_ERR_MSG
                ], 200);
        }

        Log::debug($name);

        Log::debug("Is valid name [ " . $this->isValidName($name) ? 'true' : 'false' ." ]");

        if(!$this->isValidName($name))
        {
            return response()->json([
                'error' => self::INVALID_NAME_ERR_MSG
            ], 200);
        }

        try
        {
            $this->validate($request, [
                'email' => 'email:rfc,dns'
            ]);
        }
        catch(\Illuminate\Validation\ValidationException $validationException)
        {
              Log::error('Validation exception encountered.');
              Log::debug($validationException->getCode());
              Log::debug($validationException->getMessage());

            return response()->json([
                'error' => self::INVALID_EMAIL_ERR_MSG
            ], 200);
        }



        if(!$this->isValidPassword($password))
        {
            return response()->json([
                'error' => self::INVALID_PASSWORD_ERR_MSG
            ], 200);
        }

        $userExists = User::where('email', $email)->first();
        if(!empty($userExists))
        {
            return response()->json([
                'error' => self::EMAIL_EXISTS_ERR_MSG,
            ], 200);
        }


        // Encrypt the password for storage
        $hashword = bcrypt($password);

        // Create the User in the database.
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => $hashword,
        ]);

        return response()->json(['success' => self::USER_CREATED_SUCCESS_MSG], 200);

    } // END store()

    private function isValidName(string $name): bool
    {
        $lowerStr = strtolower($name);
        $match = preg_match('/[^a-z.\-\'\s]/', $lowerStr);

        Log::debug($match);
        return $match === 0;
    }

    private function isValidPassword(string $password): bool
    {
        return strlen($password) >= 16;
    }


    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
