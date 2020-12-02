<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Conspiracy;

class Hashtag extends Model
{
    use HasFactory;

    public function user(){

        return $this->belongsTo(User::class);
    }

    public function conspiracies(){

        return $this->belongsToMany(Conspiracy::class);
    }
}
