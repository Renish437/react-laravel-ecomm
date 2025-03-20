<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //
    public function index(){
        $orders=Order::orderBy('created_at','desc')->get();
        return response()->json([
            'status'=>200,
            'data'=>$orders
        ],200);
    }
    public function details($id){
        $orders=Order::with('items','items.product')->find($id);
        if($orders==null){
            return response()->json([
                'status'=>404,
                'message'=>'Order not found'
            ],404);
        }
        return response()->json([
            'status'=>200,
            'data'=>$orders
        ],200);
    }
}
