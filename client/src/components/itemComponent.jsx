/* eslint-disable react/prop-types */
import { useState } from 'react';
import style from '../styles/component.module.css'
import { TbJewishStar } from "react-icons/tb";
import { TbJewishStarFilled } from "react-icons/tb";
// import { IoStarSharp } from "react-icons/io5";
import { useCartContext } from '../../context/cartContext';




const ItemComponent = ({item}) => {
  const {addToCart} = useCartContext()

    const [isWishList, setIsWishList] = useState(false)
  return (
    <div className={style.itemContainer}>
    {/* <p>{JSON.stringify(item)}</p> */}
        <img src={item?.foodImage} alt='burger'/>
        <i onClick={()=> setIsWishList(!isWishList)} className={style.wishList}>{
            isWishList ?  <TbJewishStarFilled/> : <TbJewishStar/> 
        }</i>
        <p className={style.price}> $ {item?.price}</p> 
        <h3>{item?.name}</h3>
        <button onClick={()=>addToCart(item)}>Add to cart</button>
    </div>
  )
}

export default ItemComponent