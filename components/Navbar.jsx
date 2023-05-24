import React from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai'

import { Cart } from './';
import { useCartContext} from '../context/CartContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useCartContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/" >Raccoon Ecommerce</Link>
      </p>

      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar