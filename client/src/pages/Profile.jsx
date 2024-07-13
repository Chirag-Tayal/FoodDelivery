import { useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useUserContext } from '../../context/userContext';
import style from '../styles/auth.module.css';
import {useNavigate} from 'react-router-dom'

const Profile = () => {
    const { user, setUser } = useUserContext();
    const imagRef = useRef(null);
    const [image, setImage] = useState(null);
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [country, setCountry] = useState(user?.country || '');
    const [state, setState] = useState(user?.state || '');
    const [zipCode, setZipCode] = useState(user?.zipCode || '');
    const [city, setCity] = useState(user?.city || '');
    const [houseNo, sethouseNo] = useState(user?.houseNo || '')
    const [street, setstreet] = useState(user?.street|| '')
    const [pImage, setPImage] = useState(user?.profileImage || '');
    const [isImageUpdate, setisImageUpdate] = useState(false)
    const navigate= useNavigate()
    
    const updateProfile = async (e) => {
        e.preventDefault();

        try {
            let profileImageUrl = pImage;
           
               if(isImageUpdate){
                const formData = new FormData();
                formData.append('image', image);
                const res = await axios.post('http://localhost:8000/api/v1/all/upload-image', formData);
                if (res.data) {
                    console.log(pImage);
                    profileImageUrl = res.data.url;
                    setPImage(res.data.url);
                    console.log(pImage);
                }
               }
           
            
            
            const { data } = await axios.post("http://localhost:8000/api/v1/user/update-profile", {
                name,
                email,
                city,
                country,
                zipCode,
                state,
                profileImage: profileImageUrl,
                userId:user?._id,
                street,houseNo
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });

            if (data.success) {
                toast.success(data.message);
                setUser(data.data.user) 
                // location.reload()
                navigate('/')
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className={style.profile}>
            <div className={style.registerContent}>
                <img src={pImage} alt='Profile' onClick={() => imagRef.current.click()} />
                <input type='file' ref={imagRef} hidden accept='.jpeg, .png, .jpg' onChange={(e) =>{
                    setisImageUpdate(true)
                  
                     setImage(e.target.files[0])
                     
                }} />
                <div className={style.body}>
                    <div>
                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name.' type="text" />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email.' type="text" />
                    </div>
                    <div>
                        <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder='Country.' type="text" />
                        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder='City.' type="text" />
                    </div>
                    <div>
                        <input value={street} onChange={(e) => setstreet(e.target.value)} placeholder='street.' type="text" />
                        <input value={houseNo} onChange={(e) => sethouseNo(e.target.value)} placeholder='Zip code.' type="text" />
                    </div>
                    <div>
                        <input value={state} onChange={(e) => setState(e.target.value)} placeholder='State.' type="text" />
                        <input value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder='House No.' type="text" />
                    </div>
                    <button onClick={updateProfile}>Update Profile</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
