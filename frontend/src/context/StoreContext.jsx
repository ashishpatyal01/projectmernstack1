
import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
 const [token, setToken] = useState(null); // You were missing this

  const url = "http://localhost:4000"; 
const [food_list,setFoodList] = useState([])
 const addtoCart =  async (itemId) => {
  if (!cartItems[itemId]) {
    setCartItems((prev) =>({...prev,[itemId]: 1}))
  }
else{
  setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1}))
}
if (token) {
  await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
}

  }

    const removeFromCart = async (itemId) =>{
    setCartItems((prev)=>({...prev,[itemId]:prev[itemId] -1}))
    if (token) {
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    }
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  }



const fetchFoodList = async () => {
   const response = await axios.get( url+"/api/food/list")
   setFoodList(response.data.data)
}

const loadCartData = async (token) => {
  try {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    setCartItems(response.data.cartData); // use the correct key: cartData
  } catch (error) {
    console.error("Failed to load cart:", error);
  }
};

  
useEffect(() => {
  const initialize = async () => {
    await fetchFoodList();
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      await loadCartData(savedToken);
    }
  };
  initialize();
}, []);


  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addtoCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;