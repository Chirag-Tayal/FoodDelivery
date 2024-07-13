import axios from 'axios';
import style from '../styles/recommededFoods.module.css'
import ItemComponent from './itemComponent'
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const NewFoods = () => {

  const [food, setFood] = useState([])

  const getFoods = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/food/get-new-foods`, {
            headers: {
                Authorization: token
            }
        });

        if (res.data.success) {
            if (res.data.success) {
                setFood(res.data.data.Foods); 
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

},[])
  return (
    <div className={style.main}>
        <h1>New Foods</h1>
        <div className={style.content}>
          {
            food && food.map((item)=> <ItemComponent key={item._id} item={item}/>)
          }

        </div>
    </div>
  )
}

export default NewFoods