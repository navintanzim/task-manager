<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $tasks = $request->user()->tasks()->latest()->get();

        return response()->json($tasks);

    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:Pending,Completed',
        ]);

        $task = Task::create([
            'name' => $validated['name'],
            'description' => $validated['description'] ?? '',
            'status' => $validated['status'],
            'user_id' => $request->user()->id, // associate task with logged-in user
        ]);

        return response()->json([
            'message' => 'Task created successfully.',
            'task' => $task
        ], 201);
    }
}
