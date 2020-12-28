<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HashtagController;
use App\Http\Controllers\ConspiracyController;
use App\Http\Controllers\FollowerController;

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

Route::get('/hashtags', [HashtagController::class,'displayHashtags']);
Route::post('/addConspiracyAnonymously', [ConspiracyController::class,'addConspiracyAnonymously']);
Route::middleware('auth:sanctum')->post('/addConspiracy', [ConspiracyController::class,'addConspiracy']);
Route::middleware('auth:sanctum')->get('/conspiracies', [ConspiracyController::class,'displayConspiracies']);
Route::middleware('auth:sanctum')->get('/users', [ConspiracyController::class,'getUsers']);
Route::middleware('auth:sanctum')->post('/addFollower', [FollowerController::class,'addFollower']);
Route::middleware('auth:sanctum')->post('/addHashtag', [ConspiracyController::class,'addHashtag']);