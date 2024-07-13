import {useState} from 'react';
import style from '../styles/navbar.module.css'
import {MdOutlineRestaurantMenu} from "react-icons/md";
import {IoMenuSharp} from "react-icons/io5";
import { Link } from 'react-router-dom';
import {useUserContext} from '../../context/userContext'
import {  useCartContext } from '../../context/cartContext';
import logo from '../assets/logo.png'

const Navbar = () => {
    const {user, } = useUserContext()
    const {cartItems } = useCartContext()
    const [mobile,
        setMobile] = useState(false);

    const adminMenu = [
        {
            name: "Home",
            path: "/",
            id: 1
        }, {
            name: "All Orders",
            path: "/allordes",
            id: 2
        }, {
            name: "Our Menu",
            path: "/menu",
            id: 3
        }, {
            name: "Add Food",
            path: "/addFood",
            id: 4
        }, {
            name: "Popluar Foods",
            path: "/popular",
            id: 5
        }, {
            name: "Why TasteHarbor ",
            path: "/about",
            id: 6
        }
    ];
    const userMenu = [
        {
            name: "Home",
            path: "/",
            id: 1
        }, {
            name: "Our Menu",
            path: "/menu",
            id: 3
        },  {
            name: "Popluar Foods",
            path: "/popular",
            id: 5
        },  {
            name: "My Orders",
            path: "/my-orders",
            id:7
        }, {
            name: "Why TasteHarbor  ",
            path: "/about",
            id: 6
        }
    ];

    const Menu = user?.role === 'user' ? userMenu : adminMenu
    return (
        <div className={style.main}>
            <div className={style.brand}>
               <Link to='/'> <img src={logo} alt='logo brand'/></Link>
            </div>
            <div className={`${style.menu} ${!mobile ? '' : style.mobileView}`}
>
                {Menu.map((link) => {
                    return (
                        <Link key={link.id} to={link.path}>{link.name}
                        </Link>
                    )
                })
}
{
    localStorage.getItem('token') && <Link to='/cart'>cart<sup> {cartItems.length}</sup></Link>
}
                {
                    localStorage.getItem('token') ? <div className={style.logout}>
                    <img src={user?.profileImage} alt='pro' />
                    <div className={style.user}>
                  
                    <ul>
                        <li><Link to='/profile'>profile</Link></li>
                       {user?.role==='admin' && <li><Link to='/allUsers'>All users</Link></li>}
                       {user?.role==='admin' && <li><Link to='/category'>category</Link></li>}
                        <li><Link onClick={()=>{
                            localStorage.clear()
                        }} to='/login'>Logout</Link></li>
                    </ul>
                </div></div> : <button  ><Link to='/login'>Login</Link></button>
                }
              

                
            </div>
            <p className={style.mobileBtn} onClick={() => setMobile(!mobile)}>
                    {!mobile
                        ? <IoMenuSharp/>
                        : <MdOutlineRestaurantMenu/>
}
                </p>
        </div>
    )
}

export default Navbar