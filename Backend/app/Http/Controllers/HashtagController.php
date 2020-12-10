<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Hashtag;

class HashtagController extends Controller
{

public function displayHashtags(){
    
    $hashtags = Hashtag::get();
    return $hashtags;

}


}
