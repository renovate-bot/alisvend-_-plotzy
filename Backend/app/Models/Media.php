<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Conspiracy;

class Media extends Model
{
    use HasFactory;

    public function conspiracies(){

        return $this->belongsTo(Conspiracy::class);
    }
}
