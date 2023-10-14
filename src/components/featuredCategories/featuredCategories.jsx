// import style from "./FeaturedCategories.module.css"
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import axios from 'axios'


export default function FeaturedCategories() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay:true,
    focusOnSelect: false,
    arrows:false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  let [categories,setCategories]=useState([])
  let [isLoading,setIsLoading]=useState([false])
  async function getAllProducts(){
    setIsLoading(true)
   let cat= await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
   setCategories(cat)
    setIsLoading(false)
  }

  useEffect(()=>{
    getAllProducts();
  },[])

  useEffect(()=>{
  },[categories])





  return <>
              <Slider {...settings}>
                {categories?.data?.data.map((categorie)=><div key={categorie._id} className="text-center px-0">
            <img className='w-100' height={250} src={categorie.image} alt="" />
            <p>{categorie.name}</p>
          </div>)}


                  </Slider>
        </>
}
