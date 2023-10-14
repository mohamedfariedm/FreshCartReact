import style from "./Product.module.css"
import React, { useContext, useEffect, useState } from 'react'
import Slider from "react-slick";
import axios from 'axios'
import { ThreeDots } from  'react-loader-spinner'
import { Link } from 'react-router-dom'
import { cartContext } from "../../Context/CartContext";
import toast from 'react-hot-toast';
import { wishListContext } from "../../Context/WishListContext";

export default function Product() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    focusOnSelect: true,
    fade: true,
    arrows:false,
  };

  let [arr,setArr]=useState([])
  let [isLoading,setIsLoading]=useState(false)

  let{addToCart,getCartcountfire}=useContext(cartContext)
async function addProductToCart(id){
  let responce=await addToCart(id);
  if(responce.data?.status==='success'){
    await getCartcountfire();
      toast.success("it has been successfuly add",{
        duration: 4000,
        position: 'top-right',
      });
  }else{
    toast.error("fail");
  }





}

  async function getAllProducts(){
    setIsLoading(true)
   let vog= await axios.get('https://ecommerce.routemisr.com/api/v1/products');
   setArr(vog);
    setIsLoading(false)
  }
  let[color,setColor]=useState('black')

  useEffect(()=>{
    getAllProducts();
  },[])

  useEffect(()=>{

  },[arr,color])

let {addProductToWishlist}=useContext(wishListContext)



  async function addToWishList(id){
    let responce = await addProductToWishlist(id);
    if(responce.data?.status==='success'){
        toast.success(responce.data.message,{
          duration: 4000,
          position: 'top-right',
        });
    }else{
      toast.error(responce.data.message);
    }

}
function removeFromeWishList(){
  console.log('hello')
}

   return<>

<div className='w-100 mx-auto p-5'>
  </div>

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
  </div>
  :arr?.data?.data.map((product)=><div className="col-lg-3 p-4" key={product.id}>
              
      <div className="row align-items-center justify-content-center product shadow-lg p-0 ">
        <Link to={`/productDetails/${product.id}`}>
              <div className="col-12 px-0 ">
              <div>
        <Slider {...settings}>
          {product.images.map((link)=>          <div key={link}>
            <img className={`w-100 ${style.heig}` } src={link} alt="" />
          </div>)}
        </Slider>
      </div>

              </div>
              <div className="col-12 ">
                <h3 className="h5 fw-bold pt-5 ">{product.title.split(" ").slice(0,2).join(" ")}</h3>
                <p className="px-2">{product.description.split(" ").slice(0,1).join(" ")}...</p>
                <div className="justify-content-between align-items-center d-flex px-2">
                <span>{product.price} EGP</span>
                <span><i className="fa fa-star rating-color"></i>{product.ratingsAverage}</span>
                </div>
              </div>
            </Link>
                <div className="text-center d-flex justify-content-between align-items-center mt-4">
                <span className="form-control btn bg-main  text-white w-75" onClick={()=>addProductToCart(product.id)} >+ Add</span>
                  <div className="blackHart d-block" onClick={(e)=> {e.target.classList.add('text-red');   addToWishList(product.id)} }>
                    <i className="fa-solid fa-heart h2 blackHart" ></i>
                  </div>              
                <div className="redHart d-none">
                    <i className="fa-solid fa-heart h2 text-danger"></i>
                </div>


                </div>
            </div>
      </div>)}






        </>
}
