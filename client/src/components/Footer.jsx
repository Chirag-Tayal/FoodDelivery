import { Link } from 'react-router-dom'
import style from '../styles/navbar.module.css'
import logo from '../assets/logo.png'
const Footer = () => {
  return (
    <div className={style.footerMain}>
    <div className={style.footerDiv1}>
    <img src={logo} alt='logo brand'/>
   <address>
  Savory Bites Lane, Culinary Central,<br />
  Spiceville - 12345, Gastronomy District,<br />
  Flavorful Avenue, Tasty Town,<br />
  Epicurean Paradise, India.
</address>


    </div>
    <div className={style.footerDiv2}>
        <h2>services</h2>
        <ul>
            <li><a href='/'>Dummy services</a></li>
            <li><a href='/'>Dummy services</a></li>
            <li><a href='/'>Dummy services</a></li>
            <li><a href='/'>Dummy services</a></li>
        </ul>
    </div>
    <div className={style.footerDiv3}>
        <h2>company</h2>
        <ul>
            <li><Link to='about'>About Tasteharbor</Link></li>
            <li><Link to='/'>Home </Link></li>
        </ul>

    </div>
    <div className={style.footerDiv4}>
        <h2>Social Media</h2>
        <ul>
            <li><a href='/'>Dummmy Link</a></li>
            <li><a href='/'>Dummmy Link</a></li>
            <li><a href='/'>Dummmy Link</a></li>
            <li><a href='/'>Dummmy Link</a></li>
        </ul>
    </div>
    </div>
  )
}

export default Footer