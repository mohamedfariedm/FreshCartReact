import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/js/all.min'
import UserContextProvider from './Context/UserContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import WishListContextProvider from './Context/WishListContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClint=new QueryClient()
root.render(
    <WishListContextProvider>
<CartContextProvider>
        <QueryClientProvider client={queryClint}>
            <UserContextProvider>
                <App />
            </UserContextProvider>
            <Toaster/>
        </QueryClientProvider>
    </CartContextProvider>
    </WishListContextProvider>
    
);


