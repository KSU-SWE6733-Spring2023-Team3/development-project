<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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


        return back()->withErrors([
            'email' => "The provided credentials do not match our records",
        ]);
    }
}
