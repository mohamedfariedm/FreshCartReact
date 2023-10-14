import axios from "axios";
import style from "./ProductDetails.module.css"
import React, { useContext } from 'react'
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { useQuery } from "react-query";
import { ThreeDots } from  'react-loader-spinner'
import toast from "react-hot-toast";
import { cartContext } from "../../Context/CartContext";

export default function ProductDetails() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    focusOnSelect: true,
    fade: true,
  };
  let {id}=useParams();
  function getProductDetails(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
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
  
  let {data,isLoading}=useQuery(`spacificProduct`,getProductDetails);
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
  </div>:  <div className="container">
            <div className="row align-items-center ">
              <div className="col-lg-4">
              <div>
        <Slider {...settings}>
          {data?.data.data.images.map((image)=>          <div key={image}>
            <img className={`w-100 ${style.heig}` } src={image} alt="" />
          </div>)}


        </Slider>
      </div>

              </div>
              <div className="col-lg-8 ">
                <h3 className="h4 fw-bold pt-5 px-2">{data?.data.data.title}</h3>
                <p className="px-2">{data?.data.data.description}</p>
                <div className="justify-content-between align-items-center d-flex px-2">
                <span>{data?.data.data.price} EGP</span>
                <span><i className="fa fa-star rating-color"></i>{data?.data.data.ratingsAverage}</span>
                </div>
                <div className="text-center d-flex justify-content-between align-items-center mt-4">
                <span href="" className="form-control btn bg-main  text-white w-75 ms-lg-5 " onClick={()=>addProductToCart(id)} >+ Add</span>
                <i className="fa-solid fa-heart h3 "></i>
                </div>
              </div>
            </div>
  </div>}

        </>
}
