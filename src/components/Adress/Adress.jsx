// import style from "./Adress.module.css"
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext';

export default function Adress() {
  let{onlinePayment,cartID}=useContext(cartContext);

  async function handeelSubmit(values){
      let responce=await onlinePayment(cartID,'https://mohamedfariedm.github.io/FreshCartReact',values)
      window.location.href=responce?.data.session.url;
  }
  let formik=useFormik({
    initialValues:{
      "details": "",
      "phone": "",
      "city": ""
    },onSubmit:handeelSubmit
  })
  return <>
  <div className='container'>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="details" >details :</label>
      <input type="details" id='details' className='form-control mt-1 ' name='details' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} />
      <label htmlFor="phone" >phone :</label>
      <input type="phone" id='phone' className='form-control mt-1 ' name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
      <label htmlFor="city" >city :</label>
      <input type="city" id='city' className='form-control mt-1 ' name='city' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} />
      <button type='submit' className='btn btn-outline-info form-control mt-5'>pay now</button>
    </form>


  </div>
        </>
}
