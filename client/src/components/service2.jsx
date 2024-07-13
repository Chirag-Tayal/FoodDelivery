import style from '../styles/component.module.css'
import service from '../assets/service.svg'
import { Link } from 'react-router-dom'
const Service2 = ({is}) => {
  return (
    <div className={style.service}>
          
            <div className={style.body}>
                <h1>Delight in Every Bite: Our Culinary Spectrum</h1>

                <p>
                    Embark on a journey through a myriad of culinary services that redefine the art
                    of dining. At TasteHarbor, our commitment to excellence is reflected in the
                    diverse range of offerings on our Services page. From seamless online ordering
                    to personalized dining experiences, we curate a spectrum of services that cater
                    to every palate and preference. Explore the array of services designed to
                    elevate your culinary adventures and make each dining moment exceptional.
                    Discover a world where convenience meets culinary delight, and let us redefine
                    the way you experience food. Welcome to Our Culinary Spectrum – where every
                    service is crafted to satiate your appetite for extraordinary dining.
                </p>
                {!is && <button>
                    <Link to='/about'>about us</Link>
                </button>}

            </div>
            <div className={style.img}>
                <img src={service} alt='header img'/>
            </div>

        </div>
  )
}

export default Service2