import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import style from './style.module.css'

const AllOrders = () => {
  const [allOrders, setAllOrder] = useState([]);

  const getFoodItemById = async () => {
    try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/order/get-all-orders`, {
            headers: {
                Authorization: token
            }
        });

        if (res.data.success) {
          setAllOrder(res.data.data);
        } else {
            toast.error(res.data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
};

const handleStatus =async (id) => {
  console.log(id);
  try {
    const token = localStorage.getItem('token');
    const res = await axios.post(`/order/mark-order`, {
      orderId : id
    },{
        headers: {
            Authorization: token
        }
    });

    if (res.data.success) {
      toast.success(res.data.message);
    } else {
        toast.error(res.data.message);
    }
} catch (error) {
    toast.error(error.message);
}
}

useEffect(() => {
  getFoodItemById();
}, []);

return (
  <div className={style.allOrder}>
    <h1>All Orders</h1>
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Created At</th>
          <th>Order Items</th>
          <th>Status</th>
          <th>Payment Status</th>
          <th>Total Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {allOrders.map((order) => (
          <tr key={order._id}  className={style.orderItem}>
           
            <td>{order?.user['name']}</td>
            <td>{order?.createdAt}</td>
            <td> {order.items.map((item) => (
                    <li key={item.food._id}>{item.food.name} : {item?.qty}</li>
                  ))}</td>
            <td>{order?.status}</td>
            <td>{order?.payment ? "Paid" : "Not Paid"}</td>
            <td>${order?.totalAmount}</td>
            <td><button  onClick={() => handleStatus(order._id)}> {order?.status == 'Delivered' ? "Delivered" : "Change Status"}
 </button></td>
          
         </tr>
        ))} 
      </tbody>
    </table>
  </div>
);
}

export default AllOrders;


