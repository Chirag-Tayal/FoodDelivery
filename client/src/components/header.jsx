import style from '../styles/header.module.css'
import header from '../assets/header.svg' 
import { Link } from 'react-router-dom'
Link
const Header = () => {
 
    return (
        <div className={style.main}>
            <div className={style.body}>
                <h1>Delight in Every Bite: Your Culinary Journey Begins at TasteHarbor</h1>
                <p>
                    Welcome to TasteHarbor, your gateway to a world of culinary delights! Whether
                    you are craving the comforting classics or seeking the thrill of bold new
                    tastes, TasteHarbor is your destination for an unforgettable culinary adventure.
                    <br/>TasteHarbor - Where Taste Meets Convenience, and Every Bite is an Experience!
                </p>
                {/* <div className={style.search}>
                    <input type="text" placeholder="Search Food here..."/>
                    <button type="submit" className="search-button">🔍</button>
                </div> */}
                <button>
                    <Link to='/menu' >explore now</Link>
                </button>

            </div>
            <div className={style.img}>
                <img src={header} alt='header img'/>
            </div>

        </div>
    )
}

export default Header