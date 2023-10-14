// import logo from './logo.svg';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import LayOut from './components/LayOut/LayOut';
import LogIn from './components/LogIn/LogIn';
import Products from './components/Products/Products';
import Regisster from './components/Regisster/Regisster';
import WishList from './components/WishList/WishList';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import NotFind from './components/NotFind/NotFind';
import { useContext, useEffect } from 'react';
import { userContext } from './Context/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Adress from './components/Adress/Adress';
import Orders from './components/Orders/Orders';
function App() {
  let {setUserToken}=useContext(userContext);
  useEffect(()=>{
    if(localStorage.getItem("userToken")!==null){
      setUserToken(localStorage.getItem("userToken"));
    }
  },[])
  let routers=createHashRouter([{
    path:"",element:<LayOut/>,children:[
      {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:"login",element:<LogIn/>},
      {path:"Products",element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:"productDetails/:id",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:"Regisster",element:<Regisster/>},
      {path:"WishList",element:<ProtectedRoute><WishList/></ProtectedRoute>},
      {path:"adress",element:<ProtectedRoute><Adress/></ProtectedRoute>},
      {path:"Brands",element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:"allorders",element:<ProtectedRoute><Orders/></ProtectedRoute>},
      {path:"Cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:"Categories",element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:"*",element:<NotFind/>},
    ]
  }])
  return <>
            <RouterProvider router={routers}>
            </RouterProvider>
  </>
}

export default App;
