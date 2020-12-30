<?php

namespace App\Models;

use App\Models\User;
use App\Models\Media;
use App\Models\Hashtag;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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

    public function user_hashtag(){

        return $this->belongsTo(Conspiracy::class);
 
     }
 


}
