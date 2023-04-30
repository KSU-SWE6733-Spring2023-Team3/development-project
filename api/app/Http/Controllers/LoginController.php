<?php

namespace App\Http\Controllers;

use App\Models\Provider;
use App\Models\User;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if(Auth::attempt($credentials))
        {
            $request->session()->regenerate();
            return response('Login success', 200);
        }


        return response('Failed', 200);
    }

    public function redirectToProvider($provider)
    {
        $validated = $this->validateProvider($provider);
        if(isset($validated))
        {
            return $validated;
        }

        return Socialite::driver($provider)->stateless()->redirect();
    }

    public function handleProviderCallback(Request $request, $provider)
    {
        $validated = $this->validateProvider($provider);

        if(isset($validated))
        {
            return $validated;
        }


        try
        {
            $user = Socialite::driver($provider)->stateless()->user();
        }
        catch(ClientException $clientException)
        {

            return response()->json(['error' => $clientException->getMessage()], 200);
        }



        $userCreated = User::firstOrCreate(
            [
                'email' => $user->email,
            ],
            [
                'email_verified_at' => now(),
                'name' => $user->name,
                'status' => true,
            ]);


        $userProviders = $userCreated->providers()->where('provider', $provider)->get();

        if(empty($userProviders))
        {
            $provider = Provider::create(
                [
                    'provider' => $provider
                ]
            );
            $provider->save();
            $userCreated->providers()->save($provider);
        }

        $request->session()->regenerate();
        return response()->json([
            'success' => $userCreated
        ], 200);
    }


    private function validateProvider($provider)
    {
        $supportedProvidersArr = [
            'github',
            'google',
        ];

        if(!in_array($provider, $supportedProvidersArr))
        {
            return response()->json(['error' => 'Please login using supported provider. Supported providers include [ ' . implode(',', $supportedProvidersArr) . ' ]']);
        }
    }
}
