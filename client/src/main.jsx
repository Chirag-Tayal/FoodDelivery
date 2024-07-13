import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {UserProvider} from '../context/userContext.jsx'
import {FoodProvider} from '../context/foodContext.jsx'
import { CartProvider } from '../context/cartContext.jsx'

ReactDOM
    .createRoot(document.getElementById('root'))
    .render(
        <React.StrictMode>
        <BrowserRouter>
            <UserProvider>
                <FoodProvider>
                <CartProvider>
                    <App/>
                </CartProvider>
                </FoodProvider>
            </UserProvider>
        </BrowserRouter>
    </React.StrictMode>,)
