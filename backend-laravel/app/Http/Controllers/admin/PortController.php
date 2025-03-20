<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;

use App\Models\Port;
use Illuminate\Http\Request;

class PortController extends Controller
{
    //sizecontroller ko sata

    public function index(){
        $port=Port::orderBy('id','asc')->get();
        return response()->json([
            'status'=>200,
            'data'=> $port
        ]);
    }

}