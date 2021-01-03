<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('profile_pic')->nullable();
            $table->unsignedInteger('score')->default(0);
            $table->string('hashtag')->default('000000');
            $table->boolean('isAnonymous')->default(false);
            $table->date('dob');
            $table->enum('gender', ['female', 'male','other']);
            $table->rememberToken();
            $table->timestamps();
            $table->unsignedInteger('phoneNumber')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
