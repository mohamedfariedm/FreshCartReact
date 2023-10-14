// import style from "./NavBar.module.css"
import React, { useContext} from 'react'
import { Link } from 'react-router-dom'
import image from '../../Assets/images/freshcart-logo.svg'
import { userContext } from '../../Context/UserContext'
import { cartContext } from '../../Context/CartContext'
export default function NavBar() {
  let{userToken,setUserToken}=useContext(userContext)
  let{count}=useContext(cartContext)


  return <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed container-fluid overflow-hidden z-3 p-3">
  <div className="container">
    <Link className="navbar-brand" to="/"><img src={image} alt="" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarSupportedContent">
      {userToken!==null?      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="WishList">Wish List</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="Brands">Brands</Link>
        </li>
      </ul>:""}

      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
      {userToken!==null?     <><li className="nav-item">
          <Link className="nav-link" aria-current="page" to="cart"><i className='fa-solid fa-cart-shopping fs-3'></i>
          {count<1?<span className={`bg-main p-1 rounded-1`}>0</span>:
          <span className={`bg-main p-1 rounded-1`}>{count}</span>
          }
          </Link>
        </li>
                <li className="nav-item">
                <Link onClick={()=>{localStorage.removeItem("userToken");setUserToken(null)}} className="nav-link" to="login">log Out</Link>
              </li></>   
        :<>        <li className="nav-item">
        <Link className="nav-link" to="login">log In</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="regisster">Register</Link>
      </li></>}



      </ul>
    </div>
  </div>
</nav>
        </>
}
