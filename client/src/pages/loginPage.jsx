import { Link, useNavigate } from 'react-router-dom';
import style from '../styles/auth.module.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:8000/api/v1/user/login", {
                email,
                password
            });
            console.log(data);
            if (data.success) {
                localStorage.setItem('token', data.data.token);
                toast.success(data.message);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("An error occurred while logging in.");
        }
    }

    return (
        <div className={style.loginContainer}>
            <div className={style.loginContent}>
                <Link to='/'>
                    <img src='https://placehold.co/200x60' alt='logo brand' />
                </Link>
                <div className={style.body}>
                    <label>Email:<br /><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email.' /></label>
                    <label>Password:<br /><input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password.' type="password" /></label>
                    <button onClick={handleLogin}>Sign in</button>
                </div>
                <Link to='/register'>
                    <p>Create an Account</p>
                </Link>
            </div>
        </div>
    )
}

export default LoginPage;
