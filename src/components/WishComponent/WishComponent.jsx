import style from "./WishComponent.module.css"
import React, { useContext, useEffect, useState } from 'react'
import { wishListContext } from '../../Context/WishListContext'
import toast from 'react-hot-toast';
import { ThreeDots } from 'react-loader-spinner';

export default function WishComponent() {
  let{displayWishlist,removeFromeWishlist}=useContext(wishListContext)
let [product,setProduct]=useState([])
let [isloading,setIsLoading]=useState(false)
  async function display(){
    setIsLoading(true)
    let responce=await displayWishlist();
    if(responce?.data?.status==='success'){
      setProduct(responce.data.data)
      setIsLoading(false)
    }else{
      toast.error("fail");
    }
  }
  async function remove(id){
    let responce=await removeFromeWishlist(id);
    if(responce?.data?.status==='success'){
      await display()
    }else{
      toast.error("fail");
    }
  }
  useEffect(()=>{
    display()
  },[])
  return <>
  {isloading?<div className={style.layer}>
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
  </div>:product.map((product)=>
                <div key={product.id}>
                                    <div className="row justify-content-center align-items-center">
              <div className="col-md-2">
                <img className='w-100' src={product.imageCover} alt="" />
              </div>
              <div className="col-md-10 d-flex justify-content-between">
                <div>
                  <p className='h6 fw-bold '>Woman Standart Fit Knitted Cardigan</p>
                  <p className='h6'>{product.price} EGP</p>
                  <p className='btn m-0 p-0 text-danger' onClick={()=>remove(product.id)}><i className='fa fa-trash me-3'></i>Remove</p>
                </div>
                <div className='d-flex justify-content-center align-items-center'>
                  <p className='btn btn-outline-success'>Add To Cart</p>
                </div>
              </div>
            </div>
            <hr/>
                </div>

            )}

        </>
}
