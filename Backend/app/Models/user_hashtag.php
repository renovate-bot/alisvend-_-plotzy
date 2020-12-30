<?php

namespace App\Models;

use App\Models\Hashtag;
use App\Models\Conspiracy;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class user_hashtag extends Model
{
    use HasFactory;

    public function conspiracies()
    {

        $this->hasManyThrough(Conspiracy::class, Hashtag::class);
    }
}
