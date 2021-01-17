<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LinkController extends Controller
{
    public function addLink(Request $request)
    {
        $link = new Link();
        $link->user_id = Auth::id();
     
        $link->content = $request->content;
     
        $link->save();
    }

    public function displayLinks( Request $request)
    {
        $user = Auth::id();
      
        
         $links = Link::orderBy('created_at', 'DESC')->get();
         return $links;
       

    }


}
