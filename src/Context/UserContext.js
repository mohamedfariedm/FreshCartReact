import { createContext, useState } from "react";
import React from 'react'



export let userContext=createContext();

export default function UserContextProvider({children}) {
    let [userToken,setUserToken]=useState(null)
  return <userContext.Provider value={{userToken,setUserToken}} >
            {children}
  </userContext.Provider>
}
