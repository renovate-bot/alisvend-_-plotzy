<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Hashtag;
use App\Models\Media;

class Conspiracy extends Model
{
    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class);
        
    }

    public function hashtag(){
        return $this->belongsTo(Hashtag::class);
        
    }

    public function media(){

        return $this->hasMany(Media::class);
    }


}
