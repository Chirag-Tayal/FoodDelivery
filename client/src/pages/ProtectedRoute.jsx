import { toast } from 'react-toastify'
import {useUserContext} from '../../context/userContext';
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'


export default function ProtectedRoute({children}) {
    const {user, setUser, categories, setcategories} = useUserContext()

    const getUser = async() => {
        try {
            const res =await axios.post("/user/get-user",
            {
                token : localStorage.getItem('token')
            },
            
             { headers:{
              Authorization :localStorage.getItem('token')
             }}
      
      )

      if(res.data.success){
        setUser(res.data.data.user)
      }else{
        <Navigate to='/login' />
        // localStorage.clear()
      }
        } catch (error) {
            // localStorage.clear()
            toast(error.message)
        }
    };
    const getAllCategories = async() => {
        try {
            const res =await axios.get("http://localhost:8000/api/v1/food/get-all-categories",
             { headers:{
              Authorization :localStorage.getItem('token')
             }}
      
      )


      if(res.data.success){
        if(categories?.length === 0){
            setcategories(res.data.data.categories)
      }}
        } catch (error) {
            toast(error.message)
        }
    }

    useEffect(()=>{
        if(!user){
            getUser()
            getAllCategories()
        }

    },[user])



    if(localStorage.getItem('token')){
        return children
    }else{
        <Navigate to='/login' />
    }
}