<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\TaskController;
use Illuminate\Support\Facades\Auth;

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

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::get('/tasks', [TaskController::class, 'index']);
    Route::get('/tasks/{taskId}', [TaskController::class, 'show']);
    Route::put('/tasks/{taskId}', [TaskController::class, 'update']);
    Route::delete('/tasks/{taskId}', [TaskController::class, 'destroy']);
    Route::get('/user', fn(Request $request) => $request->user());

    Route::post('/logout', function (Request $request) {
    Auth::guard('web')->logout();
    return response()->json(['message' => 'Logged out']);
    });

});

Route::get('/test', function (Request $request) {
    return response()->json(['message' => 'testing!']);
});
Route::post('/login', [\App\Http\Controllers\Auth\AuthenticatedSessionController::class, 'store']);
Route::post('/register', [\App\Http\Controllers\Auth\RegisteredUserController::class, 'store']);

// Created by: Mashrure Tanzim (https://github.com/navintanzim/task-manager)
