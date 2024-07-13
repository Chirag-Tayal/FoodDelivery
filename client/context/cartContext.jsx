/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import {
    createContext,
    useContext,
    useState
} from 'react'
import { toast } from 'react-toastify';

const CartContext = createContext()

const CartProvider = ({
    children
}) => {
    const [cartItems, setcartItems] = useState([]);

    const addToCart = (food) => {
        const exist = cartItems.find((item) => item._id === food._id);
        if (exist) {
            setcartItems(cartItems.map((item) => item._id === food._id ? {
                ...exist,
                qty: exist.qty + 1
            } : item))
        }else{
            setcartItems([...cartItems,{
                ...food, qty:1
            } ])
        }
        toast('added to cart')
    }
    const removeFromCart = (food) => {
        const exist = cartItems.find((item) => item._id === food._id);
        if (exist.qty === 1) {
            setcartItems(cartItems.filter((item) => item._id !== food._id ))
        }else{
            setcartItems(cartItems.map((item) => item._id === food._id ? {
                ...exist,
                qty: exist.qty - 1
            } : item))
        }
    }
    return ( <CartContext.Provider value = {
            {
                cartItems,addToCart, removeFromCart
            }
        } > {
            children
        } </CartContext.Provider>
    )

}

const useCartContext = () => {
    return useContext(CartContext)
}

export {
    CartProvider,
    useCartContext
};