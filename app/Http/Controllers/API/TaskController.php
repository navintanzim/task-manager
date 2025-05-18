<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\libraries\Encryption;

class TaskController extends Controller
{
    public function index(Request $request)
    {
    

    $tasks = $request->user()->tasks()->latest()->get()->map(function ($task) {
    $taskArray = $task->toArray();
    $taskArray['id'] = Encryption::safe_b64encode($task->id);
    return $taskArray;
    })->values();

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

    public function show($encoded_taskId)
    {
        $taskId = Encryption::safe_b64decode($encoded_taskId);
        
        if (!$taskId || !is_numeric($taskId)) {
        return response()->json(['error' => 'Invalid ID'], 404);
        }
        $task = Task::find($taskId);

        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        return response()->json($task);
    }

    public function update(Request $request, $encoded_taskId)
    {

        $taskId = Encryption::safe_b64decode($encoded_taskId);
        $task = Task::find($taskId);

        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|string|in:Pending,Completed',
        ]);

        

       $task->name = $validated['name'];
       $task->description = $validated['description'];
       $task->status = $validated['status'];
       $task->save();

        return response()->json($task);
    }

    public function destroy($id)
    {
        taskId = Encryption::safe_b64decode($id);
        $task = Task::findOrFail($taskId);
        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }

}
