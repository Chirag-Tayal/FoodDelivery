import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import style from './Admin/style.module.css'
import { useUserContext } from "../../context/userContext";


const MyOrder = () => {

    const [myOrder, setmyOrder] = useState([]);
    const {user} = useUserContext()

  const getUserOrderList = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.post(`/order/get-my-order`, {userId :user?._id },{
            headers: {
                Authorization: token
            }
        });

        if (res.data.success) {
            console.log(res.data.data);
            setmyOrder(res.data.data);
        } else {
            toast.error(res.data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
};

  useEffect(() => {
    getUserOrderList();
  }, []);
  return (
    <div className={style.allOrder}>
    <h1>My Orders</h1>
    {myOrder.length ===0 && <p>As of now you have not ordered anything.</p>}
    { myOrder.length !==0 && <table>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Created At</th>
          <th>order Status</th>
          <th>Items name and qty</th>
          <th>Payment status</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
        {myOrder?.map((order,index) => (
          <tr key={order._id}  className={style.orderItem}>
           
            <td>{index + 1}</td>
            <td>{order?.createdAt}</td>
            <td>{order?.status}</td>
            <td> {order.items.map((item) => (
                    <li key={item.food._id}>{item.food.name} : {item?.qty}</li>
                  ))}</td>
            <td>{order?.payment ? "Paid" : "Not Paid"}</td>
            <td>${order?.totalAmount}</td>
            
          
         </tr>
        ))} 
      </tbody>
    </table>}
  </div>
);
}

export default MyOrder