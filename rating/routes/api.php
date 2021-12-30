<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\CustomerController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/ratings', RatingController::class);
Route::apiResource('/customers', CustomerController::class);
Route::get('/rating/movie_id/{movie_id}', [RatingController::class, 'getRatingByMovieId']);
Route::get('/customers/customer_id/{customer_id}', [CustomerController::class, 'getCustomerId']);




