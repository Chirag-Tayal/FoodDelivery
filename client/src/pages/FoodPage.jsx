import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { CiSquarePlus } from "react-icons/ci";
import { CiSquareMinus } from "react-icons/ci";

import styles from '../styles/FoodSingle.module.css';

const FoodPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const [foodDetails, setFoodDetails] = useState(null);
    const [quantity, setquantity] = useState(1)

    const getFoodItemById = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:8000/api/v1/food/get-food-item/${id}`, {
                headers: {
                    Authorization: token
                }
            });

            if (res.data.success) {
                setFoodDetails(res.data.data.FoodItem);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getFoodItemById();
    }, [id]); // Trigger the effect whenever 'id' changes

    return (
        <div className={styles.mainContainer}>
            <div>{location.pathname}</div>
            <div className={styles.body}>
                <div className={styles.image}>
                    <img src={foodDetails?.foodImage} alt="food" />
                </div>
                <div className={styles.descrition}>
                <p><b>{foodDetails?.name}</b></p>
                <p>Price: $<i>{foodDetails?.price}.</i></p>
                    <p>{foodDetails?.description}</p>
                    <div>
                        <h4>Quantity</h4>
                       <div><span onClick={()=>{
                        setquantity(quantity + 1 )
                       }}><CiSquarePlus/></span> {quantity} <span onClick={()=>{
                        if(quantity > 1){
                            setquantity(quantity - 1 )
                        }
                       }}><CiSquareMinus/></span></div>
                    </div>
                    <div>
                        <button>Favrouites</button>
                        <button>Add to cart</button>
                    </div>
                </div>

            </div> 
            <div className={styles.details}>
                        <p>category: {foodDetails?.category?.name}</p>
                        <p>Price: {foodDetails?.price}</p>
                        <p>weight: {foodDetails?.weight}</p>
            </div>
        </div>
    );
};

export default FoodPage;
