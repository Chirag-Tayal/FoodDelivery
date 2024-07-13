import style from '../styles/recommededFoods.module.css'
import ItemComponent from './itemComponent'

const RecommendedFoods = () => {
  return (
    <div className={style.main}>
        <h1>RecommendedFoods</h1>
        <div className={style.content}>
            <ItemComponent/>
            <ItemComponent/>
            <ItemComponent/>
            <ItemComponent/>

        </div>
    </div>
  )
}

export default RecommendedFoods