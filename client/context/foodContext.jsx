/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import {createContext, useContext, useState} from 'react'

const foodContext = createContext()

const FoodProvider = ({children}) => {
    const [food,setFood] = useState([]);
        return(
            <foodContext.Provider value={{food,setFood}}>
                {
                    children
                }
            </foodContext.Provider>
        )

}

const useFoodContext = ()=>{
    return useContext(foodContext)
}

export {FoodProvider, useFoodContext} ;