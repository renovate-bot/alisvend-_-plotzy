<?php

namespace App\Http\Controllers;

use App\Models\Follower;
use Illuminate\Http\Request;

class FollowerController extends Controller
{
    public function addFollower(Request $request){
        $follower = new Follower();

        $follower->requester_id = $request->requester_id;
        $follower->requestee_id = $request->requestee_id;
       
        $follower->save();

    }

    public function displayFollowers(){


    }

    public function displayFollowerByID(){


    }

    public function updateFollower(){


    }
    
    public function deleteFollower(){


    }
}
