<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Task;

class TaskCreationTest extends TestCase
{

    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_example(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_authenticated_user_can_create_task()
    {
        // Create a user
        $user = User::factory()->create();

        //  login
        $this->actingAs($user, 'web');

        // create task
        $response = $this->postJson('/api/tasks', [
            'name' => 'Test Task',
            'description' => 'Test Description',
            'status' => 'Pending',
        ]);

        $response->assertStatus(201);
        $response->assertJsonFragment(['name' => 'Test Task']);

        $this->assertDatabaseHas('tasks', [
            'name' => 'Test Task',
            'description' => 'Test Description',
            'status' => 'Pending',
            'user_id' => $user->id,
        ]);
    }

}
