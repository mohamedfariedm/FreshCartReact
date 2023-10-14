import style from "./LogIn.module.css"
import React, { useContext, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ThreeDots } from  'react-loader-spinner'
import { userContext } from "../../Context/UserContext"
export default function LogIn() {

  let navigate=useNavigate();
  let[isLoding,setIsLoding]=useState(false)
  let [eror,setEror]=useState(null)
  let {setUserToken}=useContext(userContext)

  async function submition(values){
    setIsLoding(true);
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .catch((error)=>{setEror(error.response.data.message);setIsLoding(false)});


    if(data.message=="success"){
      setIsLoding(false)
      localStorage.setItem("userToken",data.token);
      setUserToken(data.token)
      navigate('/');

    }
  }

  let validationSchema=yup.object({
    email:yup.string().email("email unvalied").required(),
    password:yup.string().matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,"password must have one spitial char and one capital char").required(),
  })

  let formik=useFormik({
    initialValues:{email:"",password:""},
    validationSchema,
    onSubmit:submition,
  })
  
  






  return <>
  <div className=' mx-auto p-5'>
<h3 className='mb-3 h2 fw-bold'>Log In</h3>
  {eror?<p className="alert alert-danger mt-2">{eror}</p>:""}
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email" >Email :</label>
      <input type="email" id='email' className='form-control mt-1 ' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
      {formik.errors.email&&formik.touched.email?<p className="alert alert-danger mt-2">{formik.errors.email}</p>:""}
      <label htmlFor="password" >Password :</label>
      <input type="password" id='password' className='form-control mt-1' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
      {formik.errors.password&&formik.touched.password?<p className="alert alert-danger mt-2">{formik.errors.password}</p>:""}
      <div className='text-end position-relative'>
      <button type='submit' className='btn btn-outline-dark p-2 mt-3'>Log in</button>
      {formik.errors.email&&formik.errors.password?<div className={`${style.layerBlock}`}></div>:""}
      {formik.values.email&&formik.values.password?"":<div className={`${style.layerBlock}`}></div>}
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
