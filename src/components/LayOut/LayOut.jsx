// import style from "./LayOut.module.css"
import React from 'react'
import NavBar from '../NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import { Offline} from "react-detect-offline";

export default function LayOut() {
  return <>
            <NavBar/>
              <section className='py-5'>
                <div className='container py-5'>
                  <Outlet/>
                </div>
              </section>

                <div>
                  <Offline>
                    <div className="network">
                    <i className='fas fa-wifi'></i>
                    you are offline
                    </div>
                  </Offline>
              </div>
        </>
}
