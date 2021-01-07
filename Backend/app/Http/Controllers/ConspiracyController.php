<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Media;
use App\Models\Conspiracy;
use App\Models\user_hashtag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ConspiracyController extends Controller
{
    

    
    public function addConspiracyAnonymously(Request $request)
    {
        $conspiracy = new Conspiracy();

        $conspiracy->title = $request->title;
        $conspiracy->content = $request->content;
        $conspiracy->hashtag_id = $request->hashtag_id;
        $conspiracy->save();
    }




    public function addPhone(Request $request)
    {
        $user = Auth::id();
        User::where('id', $user)
            ->update(['phoneNumber' => $request->phoneNumber]);
    }

    public function addConspiracy(Request $request)
    {
        $conspiracy = new Conspiracy();
        $conspiracy->user_id = Auth::id();
        $conspiracy->title = $request->title;
        $conspiracy->content = $request->content;
        $conspiracy->hashtag_id = $request->hashtag_id;
        $conspiracy->long = $request->long;
        $conspiracy->lat = $request->lat;
        $conspiracy->save();
       
        $request->validate([
            'path' => 'nullable|mimes:jpeg,jpg,png',
        ]);

        if ($request->hasFile('path'))
        {
              $file      = $request->file('path');
              $filename  = $file->getClientOriginalName();
              $extension = $file->getClientOriginalExtension();
              $picture   = date('His').'-'.$filename;
              
            $file->move(public_path('img'), $picture);

              $media = new Media();
              $cid = $conspiracy->id;
              $media->conspiracy_id = $cid;
              $media->path = '/'.'img'.'/' . $picture;
              $media->save();
        }

        

      

    }

    
    public function addProfilePicture(Request $request)
    {
        $request->validate([
            'profile_pic' => 'nullable|mimes:jpeg,jpg,png',
        ]);

        if ($request->hasFile('profile_pic'))
        {
              $file      = $request->file('profile_pic');
              $filename  = $file->getClientOriginalName();
              $extension = $file->getClientOriginalExtension();
              $picture   = date('His').'-'.$filename;
              
            $file->move(public_path('img'), $picture);
            $user = Auth::id();
            
              User::where('id', $user)
                ->update(['profile_pic' => $request->profile_pic]);
        }
    }





    public function displayConspiraciesByHashtag(Request $request)
    {

        $user = Auth::id();
        $conspiracies = Conspiracy::where('user_id', $user)->where('hashtag_id', $request->hashtag_id);
        return $conspiracies;
    }

    public function displayConspiraciesByFollowers()
    {

        $user = Auth::id();
        $conspiracies = Conspiracy::where('user_id', $user)->with()->latest()->simplePaginate(6);
        
        return $conspiracies;
    }

    public function displayConspiracies( Request $request)
    {
        $user = Auth::id();
         $hashtagIds=user_hashtag::where('user_id','=',$user)->get('hashtag_id');
        
         $conspiracies = Conspiracy::with('hashtag')->with('media')->with('user')->whereIn('hashtag_id',$hashtagIds)->get();
         return $conspiracies;
       

    }


    public function displayConspiraciesForUser(Request $request)
    {
        $user = Auth::id();
         
        
         $conspiracies = Conspiracy::with('hashtag')->with('media')->with('user')->where('user_id',$user)->get();
         return $conspiracies;

    }

    public function updateConspiracy(Request $request)
    {
        Conspiracy::where('id', $request->get('id'))
            ->where('user_id', Auth::id())
            ->update(['status' => $request->get('status')]);
    }

    public function editName(Request $request)
    {
        User::where('id', Auth::id())
            
            ->update(['username' => $request->get('username')]);
    }


    public function deleteConspiracy(Request $request)
    {
        $task = Conspiracy::where('id', $request->get('taskId'));
        $task->delete();
    }



    public function getUsers(Request $request)
    {
        $user = Auth::id();
        $users = User::where('id','<>',$user)->whereRaw("username LIKE '%$request->val%'")->get();
        return $users;
    }

    public function getUserInfo(Request $request)
    {
        $user = Auth::id();
        $users = User::where('id',$user)->get();
        return $users;
    }


}
