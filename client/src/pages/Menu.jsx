/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/userContext';
import style from '../styles/Menu.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useFoodContext } from '../../context/foodContext';
// import { TbJewishStar } from "react-icons/tb";
import { TbJewishStarFilled } from "react-icons/tb";
// import { IoStarSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/cartContext';

const Menu = () => {
    const { categories } = useUserContext();
    const { food,setFood } = useFoodContext();
    const [activeCategory, setActiveCategory] = useState('All'); 
    
    const handleCategoryClick = (categoryName) => {
        setActiveCategory(categoryName);
    };

    const getFoods = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:8000/api/v1/food/get-all-foods?category=${activeCategory}`, {
                headers: {
                    Authorization: token
                }
            });
    
            if (res.data.success) {
                if (res.data.success) {
                    setFood(res.data.data.Foods);
                    console.log(activeCategory);
                    console.log(res.data.data.Foods);
                } else {
                    toast(res.data.message);
                }
            }
        } catch (error) {
            toast(error.message);
        }
    };

    useEffect(()=>{
        getFoods()

    },[activeCategory])
    
    return (
        <div className={style.mainContainer}>
            <div className={style.categories}>
                <button 
                    className={activeCategory === 'All' ? 'activeCategory' : ''}  
                    onClick={() => handleCategoryClick('All')} 
                >
                    All
                </button>
                {categories && categories.map((cat) => (
                    <button
                        key={cat._id}
                        className={activeCategory === cat.name ? 'activeCategory' : ''} 
                        onClick={() => handleCategoryClick(cat.name)} 
                    >
                        {cat.name}
                    </button>
                ))}
            </div>
            <div className={style.foodItems}>
            {
                food?.length === 0 && <p>No Food item present in the database.</p>
            }
              {
                 food.map((item) => <ItemComponent key={item._id} item={item} />)
                 }

            </div>
        </div>
    );
};






const ItemComponent = ({item}) => {

    const {addToCart} = useCartContext()
  return (
    <div className={style.foodItemContainer}>
    <Link to={`/menu/food/${item?._id}`}>
        <img src={item?.foodImage} alt='food image' />
    </Link>
        <p className={style.price}>$ {item?.price}.</p>
        <div className={style.foodItemDetails}>
             <p>{item?.name}</p>
             {/* <p>Rating :  <TbJewishStarFilled/></p>  */}
            <button onClick={()=>addToCart(item)}>Add to cart</button>  
        </div>
       
    </div>
  )
}
 
export default Menu;
