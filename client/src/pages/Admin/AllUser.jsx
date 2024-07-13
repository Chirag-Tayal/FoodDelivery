import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import style from './style.module.css'

const AllUser = () => {
    const [allUsers, setallUsers] = useState([])

    const getUsers = async() => {
        try {
            const res =await axios.get("/user/get-All-users",
            
             { headers:{
              Authorization :localStorage.getItem('token')
             }}
      
      )

      if(res.data.success){
        setallUsers(res.data.data.users)
      }else{
       toast.error(res.data.message)
      }
        } catch (error) {
            toast.error(error.message)
        }
    };

    useEffect(()=>{
        getUsers()
    },[])
  return (
    <div className={style.mainContainer}>

        <h1>All User</h1>
        <div className={style.details}>
            {
                allUsers && allUsers.map((user)=>{
                    return(
                        <div  className={style.detail} key={user._id}>
                        <p>Name : {user?.name}</p>  <p>Email : {user?.email}</p>
                        <img src={user?.profileImage} alt="pro" />
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default AllUser