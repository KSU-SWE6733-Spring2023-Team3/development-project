<?php

namespace App\Http\Controllers;

use App\Models\Age;
use App\Models\Gender;
use App\Models\Photo;
use App\Models\UserInterest;
use App\Models\ZipCode;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use function Symfony\Component\String\length;

use App\Models\User;
use Vinelab\NeoEloquent\Eloquent\Model;

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
    public const USER_CREATE_FAILED_ERR_MSG = "Failed to create user.";

    /*
     * Success messages
     */
    public const USER_CREATED_SUCCESS_MSG = "User created successfully!";



    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $userGenderIdentity = $user->identifiesAs()->first();
        $userAge = $user->age()->first();
        $userPreferencesCollection = $user->preference()->get();
        $userZip = $user->zipCode()->first();
        $userAgeRange = $user->ageRange()->get();


        $userActivityArr = [];

        $userInterests = $user->interests()->get();
        foreach($userInterests as $userInterest)
        {
            $userActivityArr[] = $userInterest->activity()->first()->name;
        }

        $userPreferences = [];
        foreach($userPreferencesCollection as $pref)
        {
            $userPreferences[] = $pref->value;
        }

        $ageRangeStart = 0;
        $ageRangeEnd = 1;
        foreach($userAgeRange as $ageRange)
        {
            if($ageRange->value < $ageRangeStart) {
                $ageRangeStart = $ageRange->value;
            } elseif($ageRangeEnd < $ageRange->value) {
                $ageRangeEnd = $ageRange->value;
            }

        }


        /**
         * Broad-spectrum matching algorithm here.
         *
         * Get all of the users who:
         *   - Are in the same zip code
         *   - Are of the identity the user prefers
         *   - Are in the age range the user has set
         *   - Share an interest with the user
         *
         * TODO: Match up the reverse, where the users selected are also
         *   - Prefer users of the Users identity
         *   - Are interested in people of the Users age
         */
        $initialUserPool = User::
        whereHas('zipCode', function($q) use ($userZip) {
            $q->where('value', '=', $userZip->value);
        })
            ->whereHas('preference', function($q) use ($userPreferences, $userGenderIdentity) {
                $q->where('value', "IN", $userPreferences);
            })
//            ->whereHas('ageRange', function($q) use ($ageRangeStart, $ageRangeEnd) {
//                $q->where('value', '>', $ageRangeStart)->where('value','<', $ageRangeEnd);
//            })
            ->whereHas('interests', function($userInterestNodeQuery) use ($userActivityArr) {
                $userInterestNodeQuery->whereHas('activity', function($activityNodeQuery) use ($userActivityArr) {
                    $activityNodeQuery->where('name', 'IN', $userActivityArr);
                });
            })
            ->get()->unique()->take(5)
            ;

        return response($initialUserPool, 200);

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


    public function metadata(Request $request)
    {
        $zip = $request->input("zip");
        $gender = $request->input("gender");
        $preferences = $request->input('preferences');
        $age = $request->input('age');


        $user = $request->user();

        $zipNode = ZipCode::where('value', $zip)->first();
        $user->zipCode()->save($zipNode);

        $genderNode = Gender::where('value', $gender)->first();
        $user->identifiesAs->save($genderNode);

        $preferencesNodes = Gender::whereIn('value', $preferences)->get();
        foreach($preferencesNodes as $preferenceNode)
        {
            $user->preferences()->save($preferenceNode);
        }

        $ageNode = Age::where('value', $age)->first();
        $user->age()->save($ageNode);


        return response()->json([
            'success' => 'Everything was saved successfully!'
        ], 200);


    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

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
        $hashword = Hash::make($password);


        // Create the User in the database.
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => $hashword,
        ]);

        // Handle the profile photo
        $base64EncodedPhotoData = $request->input('profilePicture');

        if(!empty($base64EncodedPhotoData))
        {
            $photo = $this->storeProfilePhoto($base64EncodedPhotoData);


            if(isset($photo))
            {
                $user->photos()->save($photo);
                $user->profilePhoto()->save($photo);
            }
        }

        $credentials = [
            'email' => $email,
            'password' => $password
        ];

        if(Auth::attempt($credentials))
        {
            $request->session()->regenerate();
            return response()->json(['success' => self::USER_CREATED_SUCCESS_MSG], 200);
        }
        return response()->json(['error' => self::USER_CREATE_FAILED_ERR_MSG], 200);

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


    private function storeProfilePhoto(string $base64EncodedPhotoString)
    {

        $base64Image = explode(";base64", $base64EncodedPhotoString );
        $image = explode("image/", $base64Image[0]);




        $imageType = $image[1];
        $image_base64 = base64_decode($base64Image[1]);
        $filePath = uniqid() . "." . $imageType;

        Storage::put($filePath, $image_base64);

        $photo = Photo::create([
            'file_name' => $filePath,
            'file_path' => $filePath,
        ]);


        return $photo;
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
