import axios from 'axios';
import React, { createContext } from 'react'

 export let wishListContext=createContext();
export default function WishListContextProvider({children}) {

    let userToken=localStorage.getItem(`userToken`)
    let headers={token:userToken}

async function addProductToWishlist(id){
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:id},{headers})
    .then((responce)=>responce).catch((error)=>error)
}
async function displayWishlist(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
    .then((responce)=>responce).catch((error)=>error)
}
async function removeFromeWishlist(id){
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers})
    .then((responce)=>responce).catch((error)=>error)
}


  return <wishListContext.Provider value={{addProductToWishlist,displayWishlist,removeFromeWishlist}} >
        {children}
  </wishListContext.Provider>
}
