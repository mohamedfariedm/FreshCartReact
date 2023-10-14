import style from "./Home.module.css"
import React from 'react'
import Slider from "react-slick";
import img0 from '../../Assets/images/Laptop-Wallpaers-HD.jpg'
import img1 from '../../Assets/images/photo-1491472253230-a044054ca35f.jpeg'
import img2 from '../../Assets/images/photo-1523275335684-37898b6baf30.jpeg'
import img3 from '../../Assets/images/pexels-math-90946.jpg'
import img4 from '../../Assets/images/photo-1505740420928-5e560c06d30e.jpeg'
import Products from "../Products/Products";
import FeaturedCategories from "../featuredCategories/featuredCategories";

export default function Home() {
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
  return <>
              <div className="container w-75 mx-auto">
                <div className="row g-0">
                  <div className="col-lg-6 py-4">
                  <Slider {...settings}>
          <div className="">
            <img className={`w-100 ${style.heig}` } src={img2} alt="" />
          </div>
          <div>
            <img className={`w-100 ${style.heig}` } src={img3} alt="" />
          </div>
          <div>
            <img className={`w-100 ${style.heig}` } src={img4} alt="" />
          </div>
                  </Slider>
                  </div>
                  <div className="col-lg-6 py-4">
                    <img src={img1} className={`w-100 ${style.heig1} ` } alt="" />
                    <img src={img0} className={`w-100 ${style.heig1}` } alt="" />
                  </div>
                </div>

      </div>
      <FeaturedCategories/>
      <Products/>

        </>
}
