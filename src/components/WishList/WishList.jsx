// import style from "./WishList.module.css"
import React from 'react'
import WishComponent from '../WishComponent/WishComponent'

export default function WishList() {
  return <>
  <div className="container bg-body-tertiary p-5">
              <div className='d-flex justify-content-between align-items-center'>
                <p className='h2 fw-bold'>My Wish List</p>
              </div>
              <WishComponent/>
            </div>

        </>
}
