<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Conspiracy;
use App\Models\Bet;
class Hashtag extends Model
{
    use HasFactory;

    
    public function conspiracies(){

        return $this->hasMany(Conspiracy::class);
    }

    public function bets(){

        return $this->belongsToMany(Bet::class);
    }

}
