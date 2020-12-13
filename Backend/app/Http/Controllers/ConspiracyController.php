<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Conspiracy;
use App\Models\Media;
use Illuminate\Support\Facades\Auth;

class ConspiracyController extends Controller
{
    public function addConspiracy(Request $request){
        $conspiracy = new Conspiracy();
        $conspiracy->user_id = Auth::id();
        $conspiracy->title= $request->title;
        $conspiracy->content = $request->content;
        $conspiracy->hashtag_id = $request->hashtag_id;
        $conspiracy->save();

        // $media = new Media();
        // $media->path= $request->media;
        // $media->save();

    }
public function addConspiracyAnonymously(Request $request){
    $conspiracy = new Conspiracy();
    
    $conspiracy->title= $request->title;
    $conspiracy->content = $request->content;
    $conspiracy->hashtag_id = $request->hashtag_id;
    $conspiracy->save();
  
}
    public function displayConspiraciesByHashtag(Request $request){

        $user = Auth::id();
        $conspiracies = Conspiracy::where('user_id', $user)->where('hashtag_id',$request->hashtag_id)->latest()->simplePaginate(6);
        return $conspiracies;
    }

    public function displayConspiraciesByFollowers(){

        $user = Auth::id();
        $conspiracies = Conspiracy::where('user_id', $user)->with()->latest()->simplePaginate(6);
        return $conspiracies;
    }

    public function displayConspiracies(){

        $conspiracies=Conspiracy::get();
        return $conspiracies;
    }


    public function displayConspiracyByID(Request $request){
        //display a single conspiracy

    }

    public function updateConspiracy(Request $request){
        Conspiracy::where('id', $request->get('id'))
            ->where('user_id', Auth::id())
            ->update(['status' => $request->get('status')]);
    }


    public function deleteConspiracy(Request $request){
        $task = Conspiracy::where('id', $request->get('taskId'));
        $task->delete();

    }
}

