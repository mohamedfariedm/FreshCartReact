import style from "./Category.module.css"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { ThreeDots } from  'react-loader-spinner'
export default function Category() {
  let [id,setId]=useState("6439d5b90049ad0b52b90048")
  let [varName,setVarName]=useState()
  useEffect(()=>{},[id,varName])
function getCategories(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}
function getSupCategories(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
}

let{data,isLoading}=useQuery(`getCategories`,getCategories)
let query=useQuery(`getsubCat`,getSupCategories,{enabled:false})
  return <>
  {isLoading&&query.isLoading?<div className={style.layer}>
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
  :
  data?.data.data.map((categorie)=><div key={categorie._id} onClick={()=>{setId(categorie._id);setVarName(categorie.name);query.refetch()}} className="col-md-4 p-3 text-center ">
  <div className='product border rounded-3 overflow-hideen'>
  <img src={categorie.image} height={300}  className='w-100' alt="" />
  <h2 className='h4 py-3 text-main fw-bold'>{categorie.name}</h2>
  </div>
</div>)
}
<div className="text-center">

<h1 className="h4 my-3 text-main fw-bold">{varName}</h1>
<div className="row">

{query.isLoading?<div className={style.layer}>
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
  </div> :varName?query.data?.data?.data.map((arr)=>
  <div key={arr._id} className="col-md-4 p-3 text-center">
  <div className='product border rounded-3 overflow-hideen'>
  <h2 className='h4 py-3  fw-bold'>
    {arr.name}
    </h2>
  </div>  </div>
):""}
</div>

</div>



        </>
}
