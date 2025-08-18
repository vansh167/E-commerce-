import React, { createContext, useContext, useEffect, useState } from "react"
import all_product from "../components/Assets/all_product";

const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < all_product.length; i++) {
    cart[i] = 0;
  }
  return cart;
}

const ShopContexProvider = (props) => {

  const [cartItems, setCartItems] = useState(getDefaultCart());

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  }

  const getTotalCartAmount =  () => {
    debugger
    let totalAmount = 0;
    for( const item in cartItems) {
      if(cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += itemInfo.new_price * cartItems[item]
      }
      console.log(totalAmount);
      
      return totalAmount;
    }
  }

  const contextValue = { all_product, cartItems, addToCart, removeFromCart, getTotalCartAmount };
  // useEffect(() => {
  //   console.log(cartItems);

  // }, [cartItems])

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