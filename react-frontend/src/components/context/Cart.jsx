import { createContext, useEffect, useState } from "react";

export const CartContext=createContext();
export const CartProvider=({children})=>{
    // const [cartData,setCartData]=useState(JSON.parse(localStorage.getItem('cart'))||[]);
    const [cartData,setCartData]=useState([]);
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCartData(JSON.parse(storedCart));
        }
      }, []);
    const addToCart=(product,port=null)=>{
        let updatedCart=[...cartData];
        //If cart is empty 
        if(cartData.length==0){
            updatedCart.push({
                id:`${product.id}-${Math.floor(Math.random()*1000000)}`,
                product_id:product.id,
                port:port,
                title:product.title ,
                price:product.price,
                qty:1,
                image_url:product.image_url



            })

        }else{
            //If port not empty
            if(port!=null){
             const isProductExist=updatedCart.find(item=>
                item.product_id==product.id && item.port==port
             )
             //If product and port combination exist then increase qty
             if(isProductExist){
                updatedCart=updatedCart.map(item=>
                    (item.product_id==product.id && item.port==port)?{...item,qty:item.qty+1}:item
            )
             } else{
                //If product and port combination not exist then add new item
                updatedCart.push({
                    id:`${product.id}-${Math.floor(Math.random()*1000000)}`,
                    product_id:product.id,
                    port:port,
                    title:product.title ,
                    price:product.price,
                    qty:1,
                    image_url:product.image_url
    
    
    
                })
             }
            } else{
                //When port is null
                const isProductExist=updatedCart.find(item=>
                    item.product_id==product.id 
                 )
                 //When product found increase quantity
                 if(isProductExist){
                    updatedCart=updatedCart.map(item=>
                        (item.product_id==product.id)
                        ?{...item,qty:item.qty+1}:item
                )
                 } else{
                    //If product  not exist then add new item
                    updatedCart.push({
                        id:`${product.id}-${Math.floor(Math.random()*1000000)}`,
                        product_id:product.id,
                        port:port,
                        title:product.title ,
                        price:product.price,
                        qty:1,
                        image_url:product.image_url
                    })
                 }
            }
        }
     
       
        setCartData(updatedCart);
        localStorage.setItem('cart',JSON.stringify(updatedCart))
    }
    const subTotal=()=>{
        let subtotal=0;
        cartData.map(item=>{
            subtotal+=item.qty*item.price;
        })
        return subtotal;
    }
    const shipping=()=>{

        return 0;
    }
    const grandTotal=()=>{
        return subTotal()+shipping();
    }
    const updateCartItem=(itemId,newQty)=>{
        let updatedCart=[...cartData];
        updatedCart=updatedCart.map(item=>(
            item.id==itemId
        )?{...item,qty:newQty}:item)
        setCartData(updatedCart)
        localStorage.setItem('cart',JSON.stringify(updatedCart))
    }
    const deleteCartItem=(itemId)=>{
      let newCartData= cartData.filter(item=>item.id!=itemId)
       setCartData(newCartData)
       localStorage.setItem('cart',JSON.stringify(newCartData))
    }
    const getQty = () => {
        return cartData?.reduce((total, item) => total + (Number(item.qty) || 0), 0) || 0;
    };
    return(
<CartContext.Provider value={{ addToCart,cartData,setCartData,grandTotal,subTotal,shipping,updateCartItem,deleteCartItem,getQty }}>
    { children }
</CartContext.Provider>
    )
        
    
}
// import { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartData, setCartData] = useState([]);

//   // Initialize cartData from localStorage if it exists
//   useEffect(() => {
//     const storedCart = localStorage.getItem('cart');
//     if (storedCart) {
//       setCartData(JSON.parse(storedCart));
//     }
//   }, []);

//   const addToCart = (product, port = null) => {
//     let updatedCart = [...cartData];
    
//     if (port !== null) {
//       const existingProduct = updatedCart.find(item => item.product_id === product.id && item.port === port);
      
//       if (existingProduct) {
//         // If the product exists, increase quantity
//         updatedCart = updatedCart.map(item =>
//           item.product_id === product.id && item.port === port
//             ? { ...item, qty: item.qty + 1 }
//             : item
//         );
//       } else {
//         // Add new product if it doesn't exist in the cart
//         updatedCart.push({
//           id: `${product.id}-${Math.floor(Math.random() * 1000000)}`,
//           product_id: product.id,
//           port,
//           title: product.title,
//           price: product.price,
//           qty: 1,
//           image_url: product.image_url,
//         });
//       }
//     } else {
//       const existingProduct = updatedCart.find(item => item.product_id === product.id);

//       if (existingProduct) {
//         updatedCart = updatedCart.map(item =>
//           item.product_id === product.id ? { ...item, qty: item.qty + 1 } : item
//         );
//       } else {
//         updatedCart.push({
//           id: `${product.id}-${Math.floor(Math.random() * 1000000)}`,
//           product_id: product.id,
//           port,
//           title: product.title,
//           price: product.price,
//           qty: 1,
//           image_url: product.image_url,
//         });
//       }
//     }

//     setCartData(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const subTotal = () => {
//     return cartData.reduce((total, item) => total + item.qty * item.price, 0);
//   };

//   const shipping = () => {
//     return 0;
//   };

//   const grandTotal = () => {
//     return subTotal() + shipping();
//   };

//   const updateCartItem = (itemId, newQty) => {
//     let updatedCart = cartData.map(item =>
//       item.id === itemId ? { ...item, qty: newQty } : item
//     );
    
//     setCartData(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const deleteCartItem = (itemId) => {
//     const updatedCart = cartData.filter(item => item.id !== itemId);
//     setCartData(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//   };

//   const getQty = () => {
//     return cartData.reduce((total, item) => total + (Number(item.qty) || 0), 0);
//   };

//   return (
//     <CartContext.Provider value={{ addToCart, cartData, setCartData, grandTotal, subTotal, shipping, updateCartItem, deleteCartItem, getQty }}>
//       {children}
//     </CartContext.Provider>
//   );
// };
