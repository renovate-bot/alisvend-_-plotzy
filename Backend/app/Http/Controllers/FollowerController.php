<?php

namespace App\Http\Controllers;

use App\Models\Follower;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class FollowerController extends Controller
{
    public function addFollower(Request $request){
        $follower = new Follower();

        $follower->requester_id = $request->requester_id;
        $follower->requestee_id = $request->requestee_id;
       
        $follower->save();

    }

    public function getFollowers(){
        $followers = Follower::where('requester_id',Auth::id())->orWhere('requestee_id',Auth::id())->with('requestee')->get();
        return $followers;

    }

    public function getSuggested(){

        $suggested = Follower::where('requester_id',Auth::id())->get('requestee_id');

       return DB::table('users')->where('id','<>',Auth::id())->whereNotIn('users.id',$suggested)->select(DB::raw('username,id,profile_pic '))->get();



    }

    public function updateFollower(){


    }
    
    public function deleteFollower(){


    }
}
