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
   Route::post('/login', 'authenticate');
});


Route::controller(\App\Http\Controllers\UserController::class)->group(function() {
    Route::post('/user', 'store');
});

Route::middleware('auth:sanctum')->group( function () {
    Route::controller(\App\Http\Controllers\UserController::class)->group(function() {
       Route::get('/user', 'index');
    });

    Route::controller(App\Http\Controllers\LogoutController::class)->group(function() {
        Route::get('/logout', 'logout');
    });
});



