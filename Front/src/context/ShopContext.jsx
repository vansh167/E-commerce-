import React, { createContext, useContext,  useState } from "react"
import { useEffect } from "react";
// import all_product from "../components/Assets/all_product";

const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 300+1; i++) {
    cart[i] = 0;
  }
  return cart;
}


const ShopContexProvider = (props) => {
  
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(()=>{
    fetch('http://localhost:4000/allproducts')
    .then((response)=>response.json())
    .then((data)=>setAll_Product(data))
  },[])
  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  }

  const getTotalCartAmount =  () => {
    
    let totalAmount = 0;
    for( const item in cartItems) {
      if(cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += itemInfo.new_price * cartItems[item]
      }
      console.log(totalAmount);
      
    }
    return totalAmount;
  }
const getTotalCartItem = () => {
  let totalItem = 0;
  for (const item in cartItems)
  {
    if(cartItems[item]>0)
    {
      totalItem+= cartItems[item];
    }
  }
  return totalItem;
}
  const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount,getTotalCartItem  };
  return (
    <>
      <ShopContext value={contextValue}>
        {props.children}
      </ShopContext>
    </>
  )
}

const useShopContext = () => useContext(ShopContext);

// eslint-disable-next-line react-refresh/only-export-components
export { ShopContexProvider, useShopContext };