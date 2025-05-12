<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->nullable()->index('user_id');
            $table->string('name');
            $table->text('description')->nullable();
            $table->enum('status', ['Pending', 'Completed'])->default('Pending');
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
