// import {Navigate} from "react-router-dom";
// import {useDispatch, useSelector} from "react-redux";
// import { showLoading, hideLoading } from "../redux/features/alertSlice";
// import {setUser } from '../redux/features/userSlice'
// import {useEffect} from 'react'
// import axios from "axios";

// // eslint-disable-next-line react/prop-types
// export default function ProtectedRoute({children}) {

//     const dispatch = useDispatch();
//     const {user} = useSelector(state => state.user);

//     // get user
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     const getUser = async() => {
//      try{
//         dispatch(showLoading());
//         const res = await axios.post('/api/v1/auth/getUserData',{}, {
//            headers:{
//             Authorization :localStorage.getItem('token')
//            }
//         });
//         dispatch(hideLoading());
//         if(res.data.success){
//             dispatch(setUser(res.data.data))
//         }else{
//             <Navigate to='/login'/>
//             // localStorage.clear()
//         }
//      }catch(error){
//         console.log("error");
//         console.log(error);
//         dispatch(hideLoading())
//         // localStorage.clear()
//      }

//     };

//     useEffect(()=>{
//         if(!user)
//         getUser();
//     },[getUser, user])


//     if (localStorage.getItem("token")) {
//         return children;
//     } else {
//         return <Navigate to='/login'/>
//     }

// }
