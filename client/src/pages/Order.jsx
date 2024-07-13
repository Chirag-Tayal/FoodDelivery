import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/cartContext";
import { useUserContext } from "../../context/userContext";
import { useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../styles/order.module.css"; 

const Order = () => {
  const { cartItems } = useCartContext();
  const { user } = useUserContext();
  const navigate = useNavigate()
  const itemPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemPrice * 0.18;
  const shipingPrice = itemPrice > 2000 ? 0 : 20;
  const totalPrice = itemPrice + taxPrice + shipingPrice;

  const stripe = useStripe();

  const handleOrder = async () => {
    const orderItems = cartItems.map((item) => ({
      food: item._id,
      qty: item.qty,
    }));
    try {
      const { data } = await axios.post(
        "/order/create-order",
        {
          user: user?._id,
          items: orderItems,
          totalAmount: totalPrice,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        const res = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
        console.log(res);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


//   handleOrderPaylater

const handleOrderPaylater = async () => {
    const orderItems = cartItems.map((item) => ({
      food: item._id,
      qty: item.qty,
    }));
    try {
      const { data } = await axios.post(
        "/order/create-order-cod",
        {
          user: user?._id,
          items: orderItems,
          totalAmount: totalPrice,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate('/')
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.orderContainer}>
      {cartItems?.length !== 0 && (
        <div className={styles.orderDetails}>
          <p>Items Price: {itemPrice}</p>
          <p>Tax Price: {taxPrice}</p>
          <p>Shipping Price: {shipingPrice}</p>
          <p>Total Price: {totalPrice}</p>
          <button className={styles.orderButton} onClick={handleOrder}>
            Pay {totalPrice}
          </button>
          <button className={styles.payLaterButton} onClick={handleOrderPaylater}>
            Pay later
          </button>
        </div>
      )}
    </div>
  );
};

export default Order;