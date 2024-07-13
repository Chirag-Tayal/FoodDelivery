/* eslint-disable react/prop-types */

import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import { useCartContext } from "../../context/cartContext";
import { useUserContext } from "../../context/userContext";
import styles from "../styles/cart.module.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useCartContext();
  const { user } = useUserContext();
  const itemPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemPrice * 0.18;
  const shipingPrice = itemPrice > 2000 ? 0 : 20;
  const totalPrice = itemPrice + taxPrice + shipingPrice;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.top}>
        <p>Welcome to your cart page, {user?.name}</p>
        <p>Total Items: {cartItems?.length}</p>
      </div>
      <div className={styles.body}>
        {cartItems?.length ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Item name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr className={styles.cartItem} key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.category?.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <span onClick={() => addToCart(item)}>
                      <CiSquarePlus />
                    </span>
                    {item.qty}
                    <span onClick={() => removeFromCart(item)}>
                      <CiSquareMinus />
                    </span>
                  </td>
                  <td>{item.qty * item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
      {cartItems?.length !== 0 && (
        <div className={styles.foot}>
          <p>Shipping Price: {shipingPrice}</p>
          <p>Total Price: {totalPrice}</p>
          <button className={styles.Button}>
            <Link to="/order">Checkout</Link>
          </button>
        </div>
      )}
    </div>
  );
};





export default Cart;
