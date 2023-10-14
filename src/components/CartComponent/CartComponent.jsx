import style from "./CartComponent.module.css"
import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/CartContext'
import { ThreeDots } from  'react-loader-spinner'
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";

export default function CartComponent() {
let[cartDetails,setData]=useState([])
let[isLoading,setIsLoading]=useState(false)

  let {displayCartItem,removeFromCart,updateCart,deleteCartItem,setcount,getCartcountfire}=useContext(cartContext)
  async function clearCartItems(id){
    setIsLoading(true)
    let responce=await removeFromCart(id);
    if(responce.status==200){
      getCartcountfire()
      setData(responce.data)
      setIsLoading(false)
    }else{
      toast.error(`bad connection`,{duration:5000})
    }
  }

  async function updateCartItems(id,count){
    setIsLoading(true)
    let responce=await updateCart(id,count);
    if(responce.status==200){
      setData(responce.data)
      setIsLoading(false)
    }else{
      toast.error(`bad connection`,{duration:5000})
    }
  }


  async function deleteAllItems(){
    setIsLoading(true)
    let responce=await deleteCartItem()
    if(responce.status==200){
      getCartcountfire()
      setData(responce.data)
      setIsLoading(false)
    }else{
      toast.error(`bad connection`,{duration:5000})
    }
  }
  async function displayItems(){
    setIsLoading(true)
    let responce=await displayCartItem()
    if(responce.status==200){
      setData(responce.data)
      setIsLoading(false)
    }else{
      toast.error(`bad connection`,{duration:5000})
    }
  }
  useEffect(()=>{
    displayItems()
  },[])
  return <>
            {isLoading?<div className={style.layer}>
  <ThreeDots 
height="80" 
width="80" 
radius="9"
color="#4fa94d" 
ariaLabel="three-dots-loading"
wrapperStyle={{}}
wrapperClassName=""
visible={true}
 />
  </div>:<>              <div className="container bg-body-tertiary p-5">
              <div className='d-flex justify-content-between align-items-center'>
                <p className='h2 fw-bold'>Cart Shop</p>
                <Link to="/adress" className='btn btn-info'>Cheek Out</Link>
              </div>
              <div className='d-flex justify-content-between align-items-center pt-3'>
                <p className='fw-bold'>total price: <span className='text-main '>{cartDetails.data?.totalCartPrice}</span></p>
                <p className='fw-bold'>total number of items: <span className='text-main '>{cartDetails.numOfCartItems}</span></p>
              </div>


              {cartDetails?
              cartDetails?.data?.products.map((product)=>
              <div key={product._id}>
                <hr />
               <div  className="row justify-content-center align-items-center">
              <div className="col-md-2">
                <img className='w-100' src={product.product.imageCover} alt="" />
              </div>
              <div className="col-md-10 d-flex justify-content-between">
                <div>
                  <p className='h6 fw-bold '>{product.product.title}</p>
                  <p className='h6'>{product.price} EGP</p>
                  <p className='btn m-0 p-0 text-danger' onClick={()=>{console.log(product.product._id);   return clearCartItems(product.product._id)}}><i className='fa fa-trash me-3'></i>Remove</p>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                  <p className='btn btn-outline-success' onClick={()=>updateCartItems(product.product._id,product.count+1)}>+</p>
                  <p className='px-3'>{product.count}</p>
                  <p className='btn btn-outline-success'onClick={()=>{
                    if(product.count>1){
                      updateCartItems(product.product._id,product.count-1)
                    }else{
                      toast.error(`don't try this`)
                    }
                    
                    }}>-</p>
                </div>
              </div>
            </div>
            </div>
            ):""}





            <hr/>            <div className='text-center'>
              <p className='btn btn-outline-danger' onClick={()=>deleteAllItems()}> Clear Your Cart</p>
            </div>
            </div>
</>}





        </>
}
