<?php

use Illuminate\Support\Facades\Route;

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

Route::controller(\App\Http\Controllers\LoginController::class)->group(function() {
    Route::get('/login/{provider}', 'redirectToProvider')->name('redirectToProvider');
    Route::get('/login/{provider}/callback', 'handleProviderCallback')->name('redirectToProviderCallback');
    Route::post('/login', 'authenticate')->name('login');
});

Route::controller(\App\Http\Controllers\UserController::class)->group(function() {
    Route::post('/user', 'store');
});

Route::middleware('auth:sanctum,throttle:1,1000')->group( function () {
    Route::controller(\App\Http\Controllers\UserController::class)->group(function() {
       Route::get('/user', 'index');
    });

    Route::controller(App\Http\Controllers\LogoutController::class)->group(function() {
        Route::get('/logout', 'logout');
    });

    Route::controller(App\Http\Controllers\UserInterestController::class)->group(function() {
        Route::post('/user/interest', 'store');
        Route::post('/user/profile', 'metadata');
        Route::get('/user/interest', 'list');
        Route::get('/user/interest/{email}', 'show');
        Route::get('/activity', 'activities');
        Route::get('/attitude', 'attitudes');
        Route::get('/skillLevel', 'skillLevels');
        Route::get('/matches/possible', 'getMatches');
    });

    Route::controller(\App\Http\Controllers\UserMessageController::class)->group(function() {
       Route::post('/user/message', 'store');
       Route::get('/user/messages', 'list');
       Route::get('/user/messages/{userID}', 'show');
    });
});


