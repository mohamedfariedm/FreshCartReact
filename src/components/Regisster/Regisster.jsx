import style from "./Regisster.module.css"
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ThreeDots } from  'react-loader-spinner'

export default function Regisster() {

  let navigate=useNavigate();
  let[isLoding,setIsLoding]=useState(false)
  let [eror,setEror]=useState(null)

  async function submition(values){
    setIsLoding(true);
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
    .catch((error)=>{setEror(error.response.data.message);setIsLoding(false)});
    if(data.message=="success"){
      navigate('/Login');
      setIsLoding(false)
    }
  }

  let validationSchema=yup.object({
    name:yup.string().min(3,"name more than 3 characters").max(15,"name less than 15 characters").required("name is requared"),
    email:yup.string().email("email unvalied").required(),
    password:yup.string().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,"password must have one spitial char and one capital char").required(),
    rePassword: yup.string().oneOf([yup.ref('password')],"not the same password").required(" is requerd"),
    phone: yup.string().matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/).required("is requard"),
  })

  let formik=useFormik({
    initialValues:{name:"",email:"",password:"",rePassword:"",phone:""},
    validationSchema,
    onSubmit:submition,
  })
  
  







  return <>
  <div className=' mx-auto p-5'>
<h3 className='mb-3 h2 fw-bold'>Regester Now</h3>
  {eror?<p className="alert alert-danger mt-2">{eror}</p>:""}
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name" >Name :</label>
      <input type="text" id='name' className='form-control mt-1'name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
      {formik.errors.name&&formik.touched.name?<p className="alert alert-danger mt-2">{formik.errors.name}</p>:""}
      <label htmlFor="email" >Email :</label>
      <input type="email" id='email' className='form-control mt-1 ' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
      {formik.errors.email&&formik.touched.email?<p className="alert alert-danger mt-2">{formik.errors.email}</p>:""}
      <label htmlFor="password" >Password :</label>
      <input type="password" id='password' className='form-control mt-1' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
      {formik.errors.password&&formik.touched.password?<p className="alert alert-danger mt-2">{formik.errors.password}</p>:""}
      <label htmlFor="repass" >RePassword :</label>
      <input type="password" id='repass' className='form-control mt-1' name='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} />
      {formik.errors.rePassword&&formik.touched.rePassword?<p className="alert alert-danger mt-2">{formik.errors.rePassword}</p>:""}
      <label htmlFor="phone" >Phone :</label>
      <input type="tel" id='phone' className='form-control mt-1' name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
      {formik.errors.phone&&formik.touched.phone?<p className="alert alert-danger mt-2">{formik.errors.phone}</p>:""}    
      <div className='text-end position-relative'>
      <button type='submit' className='btn btn-outline-dark p-2 mt-3'>Regester</button>
      {formik.errors.name&&formik.errors.email&&formik.errors.password&&formik.errors.rePassword&&formik.errors.phone?<div className={`${style.layerBlock}`}></div>:""}
      {formik.values.name&&formik.values.email&&formik.values.password&&formik.values.rePassword&&formik.values.phone?"":<div className={`${style.layerBlock}`}></div>}
    </div>
    </form>
  </div>
  {isLoding?<div className={style.layer}>
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
  </div>:""}

        </>
}
