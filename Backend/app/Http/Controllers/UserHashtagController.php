<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\user_hashtag;


class UserHashtagController extends Controller
{
    
    public function addHashtag(Request $request){
        user_hashtag::where('user_id', Auth::id())
            
        ->delete();

        foreach ($request->hashtags as $value) {
            if($value["checked"]==true){
       
        $userhashtag = new user_hashtag();
        $userhashtag->user_id = Auth::id();
        $userhashtag->hashtag_id = $value["id"];
        $userhashtag->save();
    }}
}


public function getCheckedHashtags(){

return user_hashtag::where('user_id',Auth::id())->get();


}




}
