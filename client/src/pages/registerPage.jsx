import {Link, useNavigate} from 'react-router-dom';
import style from '../styles/auth.module.css';
import { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const RegisterPage = () => {

  const [image, setimage] = useState({})
  const [name, setname] = useState('')
  const [password, setpassword] = useState('')
  const [email, setemail] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const imagRef = useRef(null) 
  const [pImage, setpImage] = useState()
  const navigate= useNavigate();



  const handleRegister=async(e)=>{
    e.preventDefault();
    if(password !== confirmPassword){
      toast('password arenot matched.')
    }

    
    try {
      const formData = new FormData();

    formData.append('image',image)
    const res =await axios.post('http://localhost:8000/api/v1/all/upload-image', formData)

    if(res.data.success){
      console.log(res);
      setpImage({
        url:res.data.url,
        public_id: res.data.public_id
      })
    }
      
     
      
      const {data} =await axios.post("http://localhost:8000/api/v1/user/register",{
        name, email, password, confirmPassword,profileImage: res.data.url
      }) 
      if(data.success){
        console.log(data.data.token);
        localStorage.setItem('token',data.data.token);
        toast(data.message)
        navigate('/')
      }else{
        toast(data.message)
      }
      

    } catch (error) {
      toast(error.message)
      
    }


  }
  return (
    <div className={style.registerContainer}>

            <div className={style.registerContent}>
                    <img src={pImage && pImage.url ? pImage.url : 'https://placehold.co/200x60'} alt='logo brand' onClick={() => imagRef.current.click()}/>
                    <input type='file'  ref={imagRef}hidden accept='.jpeg, .png, .jpg' onChange={(e)=>setimage(e.target.files[0])}/>
                    
               
                <div className={style.body}>
                <label >Name : <br/><input value={name} onChange={(e) =>setname(e.target.value)} placeholder='Enter your name.' type="text" /> </label>
                <label >Email : <br/><input type="text" value={email} onChange={(e) =>setemail(e.target.value)} placeholder='Enter your Email.'/> </label>
                <label >Password : <br/><input value={password} onChange={(e) =>setpassword(e.target.value)} placeholder='Enter your password.' type="text" /> </label>
                <label >confirm Password : <br/><input value={confirmPassword} onChange={(e) =>setconfirmPassword(e.target.value)} placeholder='Enter your confirm Password.' type="password" /> </label>
                <button onClick={(e) => handleRegister(e)}  > register </button>
                </div>
                <Link to='/login'>
                    <p>Already Account</p>
                </Link>
            </div>

        </div>
  )
}

export default RegisterPage