import axios from "axios";
import { createContext, useEffect, useState } from "react";
import React from 'react'





export let cartContext=createContext();

export default function CartContextProvider({children}) {

    let userToken=localStorage.getItem(`userToken`)
    let headers={token:userToken}


    async function addToCart(id){
            return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId:id},{headers})
            .then((responce)=>responce).catch((error)=>error)
    }

    async function removeFromCart(id){
            return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers})
            .then((responce)=>responce).catch((error)=>error)
    }
    async function updateCart(id,count){
            return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers})
            .then((responce)=>responce).catch((error)=>error)
    }



    async function displayCartItem(){
            return await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
            .then((responce)=>responce).catch((error)=>error)
    }

    let[cartID,setId]=useState(null);
    async function getCartId(){
        let {data}=await displayCartItem()
        setId(data?.data?._id)
        setcount(data?.data.products.length)
        console.log(count)
    }
    let[count,setcount]=useState(1);

    async function getCartcountfire(){
        let {data}=await displayCartItem()
        setcount(data?.data.products.length)
        console.log(count)
    }


useEffect(()=>{
        getCartId()
},[])

    async function deleteCartItem(){
            return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
            .then((responce)=>responce).catch((error)=>error)
    }


    async function onlinePayment(cartid,url,values){
            return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartid}?url=${url}`,
            {
                shippingAddress:values,
            },{headers})
            .then((responce)=>responce).catch((error)=>error)
    }


    async function getCartCount(){
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
    }



  return <cartContext.Provider value={{getCartcountfire,cartID,onlinePayment,count,getCartCount,addToCart,displayCartItem,removeFromCart,updateCart,deleteCartItem}}>
        {children}
  </cartContext.Provider>
}
