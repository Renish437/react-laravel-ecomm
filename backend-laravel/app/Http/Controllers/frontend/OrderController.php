<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    //
    public function saveOrder(Request $request){
        if(!empty($request->cart)){
             //save order in db
        $order=new Order();
        $order->name=$request->name;
        $order->email=$request->email;
        $order->address=$request->address;
        $order->mobile=$request->mobile;
        $order->state=$request->state;
        $order->zip=$request->zip;
        $order->city=$request->city;
        $order->grand_total=$request->grand_total;
        $order->sub_total=$request->sub_total;
        $order->shipping=$request->shipping;
        $order->discount=$request->discount;
        $order->payment_status=$request->payment_status;
        $order->status=$request->status;
        $order->user_id=$request->user()->id;
        $order->save();

        //save order-items in db
        foreach($request->cart as $item){
            $orderItem=new OrderItem();
            $orderItem->order_id=$order->id;
            $orderItem->price=$item['qty']*$item['price'];
            $orderItem->unit_price=$item['price'];
            $orderItem->qty=$item['qty'];
            $orderItem->product_id=$item['product_id'];
            $orderItem->port=$item['port'];
            $orderItem->name=$item['title'];
           
           
           
            $orderItem->save();

           
        }
        return response()->json([
            'status'=>200,
            'id'=>$order->id,
            'message'=>'You have placed your order successfully!',
        ]);
      }
        else{
            return response()->json([
                'status'=>400,
                'message'=>'Your cart is empty!',
            ],400);
        }
    }
}
