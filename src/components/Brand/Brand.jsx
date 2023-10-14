 import style from "./Brand.module.css"
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
export default function Brand() {
  function getAllBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
  let{data}=useQuery(`getBrands`,getAllBrands)
  console.log(data?.data.data)

let[imag,setImg]=useState("")
let[name,setName]=useState("")


  function subBrand(img,name){
    setImg(img)
    setName(name)
    document.querySelector('.layers').classList.replace('d-none','d-flex')

  }
  function closeLayer(){
    document.querySelector('.layers').classList.replace('d-flex','d-none')
  }
  return <>
  {data?.data.data.map((product)=>
       <div key={product._id} className="col-md-4 p-3 text-center ">        
       <div className='product border rounded-3 overflow-hideen' onClick={()=>subBrand(product.image,product.name)}>
       <img src={product.image} className='w-75' alt="" />
       <h2 className='h5 py-3  fw-bold'>{product.name}</h2>
       </div>
     </div>
  )}

  <div className={`${style.layerBrand} d-none justify-content-center align-items-center border layers`} onClick={closeLayer} >
    <div className={`${style.insideLayerBrand} text-end rounded-3`} onClick={(e)=>{e.stopPropagation()}}>
        <button className="fa  fs-4 p-2 btn z-3" onClick={(e)=>{closeLayer()}} ></button>
        <hr />
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-start ps-5">
            <h2 className="fw-bold text-main">{name}</h2 >
            <p>{name}</p>
          </div>
          <div className="text-start">
            <img src={imag} className="w-75" alt="" />
          </div>
        </div>
        <hr />
        <button className="btn btn-secondary mt-3 translate-middle" onClick={(e)=>{e.stopPropagation();closeLayer()}} >close</button>
    </div>
  </div>
   
        </>
}
