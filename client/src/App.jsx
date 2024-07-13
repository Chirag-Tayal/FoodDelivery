import { Routes,Route } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Home from './pages/home'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './pages/ProtectedRoute'
import AddFood from './pages/Admin/AddFood'
import Menu from './pages/Menu'
import FoodPage from './pages/FoodPage'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import Order from './pages/Order' 


import {loadStripe} from '@stripe/stripe-js';
import { 
  Elements, 
} from '@stripe/react-stripe-js';
import AllOrders from './pages/Admin/AllOrders'
import axios from 'axios'
import MyOrder from './pages/MyOrder'
import About from './pages/About'
import AllUser from './pages/Admin/AllUser'
import Popular from './pages/Popular'
import Category from './pages/Admin/Category'

axios.defaults.baseURL ='http://localhost:8000/api/v1/'

function App() { 
  const stripePromise = loadStripe('pk_test_51Or05pSD9GFPRtaaCJ90Cs3TMpKrrmCKC9rMxGTcEk6ZmrcLzynyXBjDBjUbU5Ar68KySQiS9D6BD3x8XGtCSgI900XtRCWlWo')


  return (
    <>
     <Navbar/>
     <Routes>
      <Route path='/' element={<ProtectedRoute><Home/> </ProtectedRoute>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/addFood' element={<ProtectedRoute><AddFood/> </ProtectedRoute>}/>
      <Route path='/menu' element={<ProtectedRoute><Menu/> </ProtectedRoute>}/>
      <Route path='/profile' element={<ProtectedRoute><Profile/> </ProtectedRoute>}/>
      <Route path='/category' element={<ProtectedRoute><Category/> </ProtectedRoute>}/>
      <Route path='/about' element={<ProtectedRoute><About/> </ProtectedRoute>}/>
      <Route path='/allUsers' element={<ProtectedRoute><AllUser/> </ProtectedRoute>}/>
          <Route path='/cart' element={<ProtectedRoute><Cart/> </ProtectedRoute>}/>
      <Route path='/success' element={<ProtectedRoute><Success/> </ProtectedRoute>}/>
      <Route path='/cancel' element={<ProtectedRoute><Cancel/> </ProtectedRoute>}/>
      <Route path='/popular' element={<ProtectedRoute><Popular/> </ProtectedRoute>}/>
      <Route path='/allordes' element={<ProtectedRoute><AllOrders/> </ProtectedRoute>}/>
      <Route path='/my-orders' element={<ProtectedRoute><MyOrder/> </ProtectedRoute>}/>
      <Route path='/order' element={<ProtectedRoute>
        <Elements stripe={stripePromise}><Order/></Elements>
       </ProtectedRoute>}/>
      <Route path='/menu/food/:id' element={<ProtectedRoute><FoodPage/> </ProtectedRoute>}/>
     </Routes>
     <Footer/>
     <ToastContainer />
    </>
  )
}

export default App
