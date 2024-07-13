

import { useState } from 'react'
import { useUserContext } from '../../../context/userContext'
import styles from '../../styles/about.module.css'
import axios from 'axios'
import { toast } from 'react-toastify'
const Category = () => {
    const {categories} = useUserContext()
    const [catName, setcatName] = useState('')

    const createCategory=async()=>{
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post(`http://localhost:8000/api/v1/food/create-category`, {
                name : catName
            },{
                headers: {
                    Authorization: token
                }
            });
    
            if (res.data.success) { 
                    toast(res.data.message);
                    setcatName('')
            }else {
                    toast('Category Already Existed');
                }
            
        } catch (error) {
            toast(error.message);
        }
    }
    return (
    <div className={styles.mainCategory}>
        <h1>Category</h1>
    <h3>List of available Categories</h3>
        <div className={styles.displayCategory}>
        {
  categories.map((i) => {
    return (<p key={i._id}>{i.name}</p>);
  })
}

    </div>

    
        <div className={styles.createCategory}>
        <h3>Create new Category</h3>
        <input value={catName} onChange={(e)=>setcatName(e.target.value)} />
        <button onClick={createCategory}>Create</button>

    </div>
    </div>
  )
}

export default Category