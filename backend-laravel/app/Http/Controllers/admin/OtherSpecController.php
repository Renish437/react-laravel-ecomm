<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\OtherSpec;
use Illuminate\Http\Request;

class OtherSpecController extends Controller
{
    //sizecontroller ko sata

    public function index(){
        $other_specs=OtherSpec::orderBy('ports','asc')->get();
        return response()->json([
            'status'=>200,
            'data'=>$other_specs
        ]);
    }

}
