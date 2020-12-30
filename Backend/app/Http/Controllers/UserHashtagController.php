<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\user_hashtag;


class UserHashtagController extends Controller
{
    
    public function addHashtag(Request $request){

        
        $userhashtag = new user_hashtag();
        $userhashtag->user_id = Auth::id();
        $userhashtag->hashtag_id = $request->hashtag_id;
        $userhashtag->save();
    }
}
