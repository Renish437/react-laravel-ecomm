<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Exception;
use Illuminate\Http\Request;
use Stripe\PaymentIntent;
use Stripe\Stripe;

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
        $order->payment_method=$request->payment_method;
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
    public function createPaymentIntent(Request $request){
        try {
            if($request->amount>0){
            Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

            $paymentIntent = PaymentIntent::create([
                'amount'=>$request->amount,
                'currency'=>'USD',
                'payment_method_types'=>['card']
            ]);
            $clientSecret = $paymentIntent->client_secret;
               return response()->json([
                    'status'=>200,
                    'clientSecret'=>$clientSecret
                ]);
            }else{
                return response()->json([
                    'status'=>400,
                    'message'=>"Amount must be greater than 0"
                ]);
            }
        } catch (Exception $e) {
               return response()->json([
                    'status'=>500,
                    'message'=>$e->getMessage()
                ]);
        }
    }
}
