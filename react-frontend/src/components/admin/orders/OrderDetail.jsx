import React, { useEffect, useState } from 'react'
import Sidebar from '../../common/Sidebar'
import { Link, useParams } from 'react-router-dom'
import { adminToken, apiUrl } from '../../common/Http';
import SkeletonTable from '../../common/Loader/SkeletonTable';
import Loader from '../../common/Loader/Loader';

const OrderDetail = () => {
    const [order, setOrder] = useState([]);
    const [items, setItems] = useState([]);
     const [loader, setLoader] = useState(false);
     const params = useParams();
      const fetchOrders = async () => {
           setLoader(true);
           const res = fetch(apiUrl + "/orders/"+params.id, {
             method: "GET",
             headers: {
               "Content-type": "application/json",
               Accept: "application/json",
               Authorization: `Bearer ${adminToken()} `,
             },
           })
             .then((res) => res.json())
             .then((result) => {
               console.log(result);
               if (result.status == 200) {
                 setOrder(result.data);
                 setItems(result.data.items);
                 setLoader(false);
               } else {
                 console.error("Something Went Wrong");
               }
             });
         };
         useEffect(() => {
           fetchOrders();
         }, []);
  return (
    <div className="container">
    <div className="row">
      <div className="d-flex justify-content-between mt-5 pb-3">
      <h4 className="h4 mb-0 pb-0">Orders</h4>
      <Link to='/admin/orders' className="btn btn-primary link">Back</Link>
      </div>
      <div className="col-md-3">
        <Sidebar />
      </div>
      <div className="col-md-9">
        <div className="row">
            <div className="col-md-9">
            <div className="card shadow mb-5">
        <div className="card-body p-4">
        {loader == true && <Loader/>}

        {
            loader == false &&
            <div>
<div className="row">
            <div className="col-md-4">
                <h3>Order Id: {order.id}</h3>
                {order.status === 'pending' && <span className="badge bg-warning">Pending</span>}
                  {order.status === 'shipped' && <span className="badge bg-success">Shipped</span>}
                  {order.status === 'delivered' && <span className="badge bg-success">Delivered</span>}
                  {order.status === 'cancelled' && <span className="badge bg-danger">Cancelled</span>}


            </div>
            <div className="col-md-4">
                <div className="text-secondary fw-bold">Date</div>
                <h4 className="pt-2">{order.created_at}</h4>
            </div>
            <div className="col-md-4">
                <div className="text-secondary">Payment Status</div>
                <h4 className="pt-2">
                {
                            order.payment_status=='paid'?
                            <span className="badge bg-success">Paid</span>:
                            <span className="badge bg-danger">Not paid</span>
                            }
                </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
                <div className='py-5'>
                <strong>{order.name}</strong>
                <div>{order.email}</div>
                <div>{order.mobile}</div>
                <div>{order.address}, {order.city}, {order.state} {order.zip} </div>
                </div>
            </div>
            <div className="col-md-4">
            <div className="text-secondary pt-5">Payment Status</div>
            <p>COD</p>
            </div>
            
          </div>
          <div class="row pt-5">
   <h3 class="pb-2"><strong>Items</strong></h3>
  
   {
    items.map((item)=>(
        <div key={item.id} class="row justify-content-end">
        <div class="col-lg-12">
           <div class="d-flex border-bottom justify-content-between mb-2 pb-2">
              <div class="d-flex">
                 {
                    item.product.image &&<img width="70" class="me-3" src={`${item.product.image_url}`} alt=""/>
                 }
                 <div class="d-flex flex-column">
                    <div class="mb-2"><span>{item.name}</span></div>
                    <div><button class="btn btn-size">{item.port}</button></div>
                 </div>
              </div>
              <div class="d-flex">
                 <div>X {item.qty}</div>
                 <div class="ps-3">${item.price}</div>
              </div>
           </div>
        </div>
     </div>
    ))
       
}
<div class="row justify-content-end">
      <div class="col-lg-12">
         <div class="d-flex border-bottom justify-content-between mb-2 pb-2">
            <div>Subtotal</div>
            <div>{order.sub_total}</div>
         </div>
         <div class="d-flex border-bottom justify-content-between mb-2 pb-2">
            <div>Shipping</div>
            <div>${order.shipping}</div>
         </div>
         <div class="d-flex border-bottom justify-content-between mb-2 pb-2">
            <div><strong>Grand Total</strong></div>
            <div>${order.grand_total}</div>
         </div>
      </div>
   </div>
   
</div>
            </div>
        }
          
        </div>
      </div>
            </div>
            <div className="col-md-3">
            <div className="card shadow">
        <div className="card-body p-4">
         
        </div>
      </div>
            </div>
        </div>
      
      </div>
    </div>
  </div>
  )
}

export default OrderDetail