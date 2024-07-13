import { useState } from 'react';
import styles from './AddFood.module.css';  
import { useUserContext } from '../../../context/userContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddFoodForm() {
  const { categories } = useUserContext();
  const [category, setSelectedCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [isSpecial, setisSpecial] = useState(false)
  const [image, setImage] = useState(null);
  const [foodImage, setFoodImage] = useState('');
  


  const handleFoodItem = async (e) => {
    e.preventDefault();
    try {
      // Upload image first
      const formData = new FormData();
      console.log(image);
      formData.append('image', image);
      const { data } = await axios.post('http://localhost:8000/api/v1/all/upload-image', formData);
      setFoodImage(data.public_id);
  
      // Once image is uploaded, make request to add food item
      const res = await axios.post(
        "http://localhost:8000/api/v1/food/addFood",
        { name, description, price, weight, foodImage: data.url, category, special : isSpecial},
        { headers: { Authorization: localStorage.getItem('token') } }
      );
  
      if (res.data.success) {
        toast.success(res.data.message);
        // Clear form fields after successful submission
        setName('');
        setPrice('');
        setDescription('');
        setWeight('');
        setImage(null);
        setSelectedCategory('');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the food item.");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Add New Food Items</h1>
      <form>
        <div className={styles.formContainer}>
        <div className={styles.formContainer1}>
          <div className={styles.inputContainer}>
            <label htmlFor="name">Name:</label>
            <input id="name" value={name} onChange={(e)=> setName(e.target.value)} type="text" placeholder="Name" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="price">Price:</label>
            <input id="price" value={price} onChange={(e)=> setPrice(e.target.value)} type="number" placeholder="Price" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="weight">Weight (grams):</label>
            <input id="weight" value={weight} onChange={(e)=> setWeight(e.target.value)} type="number" placeholder="Weight" />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="description">Description:</label>
            <textarea id="description" value={description} onChange={(e)=> setDescription(e.target.value)} type="text" placeholder="Description" />
          </div>

        </div>
          <div className={styles.inputContainer}>
            <label htmlFor="image">Image:</label>
            <input id="image" type="file" accept=".jpeg, .png, .jpg" onChange={(e)=>setImage(e.target.files[0])} />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="category">Category:</label>
            <select id="category" value={category} onChange={(e)=>setSelectedCategory(e.target.value)}>
              <option value="">Select Category</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
            <select id="category" value={isSpecial} onChange={(e)=>setisSpecial(e.target.value)}>
              <option value="false">select is unqiue</option>
              
                <option   value='true'>
                  True
                </option>
                <option   value='false'>
                  False
                </option>
              
            </select>
          </div>
        </div>
        <button onClick={(e)=>handleFoodItem(e)} type="submit">Add Food Item</button>
      </form>
    </div>
  );
}

export default AddFoodForm;
