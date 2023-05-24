import React, { createContext, useContext, useState, useEffect } from 'react';
// hot toast notification when user add to cart
import { toast } from 'react-hot-toast';

const Context = createContext();

export const CartContext = ({ children }) => {
  // State to display cart menu and check out with stripe
  const [showCart, setShowCart] = useState(false);
  // Keep track of added items
  const [cartItems, setCartItems] = useState([]);
  // Keep track of total price
  const [totalPrice, setTotalPrice] = useState(0);
  // Keep track of all items quantity
  const [totalQuantities, setTotalQuantities] = useState(0);
  // Keep track of current displaying product quantity
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  // When user press add to cart
  const onAdd = (product, quantity) => {
    
    // Check if product is already in cart
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    // Update states
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    // If already in cart
    if(checkProductInCart) {
      // Get new array of items that has updated quantity
      const updatedCartItems = cartItems.map((cartProduct) => {
        // Update the product quantity that matches product._id
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      })

      // Update cart items state with new array
      setCartItems(updatedCartItems);
    } else {

      product.quantity = quantity;
      // Update cart items, using spread operator to add new product items
      setCartItems([...cartItems, { ...product }]);
    }

    // Toast noti when added
    toast.success(`${qty} ${product.name} added to the cart.`);
  } 

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - (foundProduct.price * foundProduct.quantity));
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuantity = (id, incOrDec) => {
    foundProduct = cartItems.find((item) => item._id === id)
    // index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id)

    if(incOrDec === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
    } else if(incOrDec === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
      }
    }
  }

  // Increment quantity
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  // Derement quantity
  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  }

  return (
    // Provider wraps children to provide context
    <Context.Provider
      // Pass value & function accross the entire app
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities 
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useCartContext = () => useContext(Context); 