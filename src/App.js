import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Products from './components/Products';
import ProductInfo from './components/ProductInfo';
import Cart from './components/Cart';
import { getProductById } from './data/products';

function App() { 
  let [cartItems, setCartItems] = useState([]);

  function addItemToCart(productId) {
    let found = false;
    const product = getProductById(productId);
    if(cartItems.length === 0) {
      setCartItems(cartItems => [...cartItems, product]);
    } else {
      cartItems.forEach(ci => {
        if(ci.id === product.id){
          ci.inCart += 1;
          found = true;
        }
      });
      if(found === false) {
        setCartItems(cartItems => [...cartItems, product]);
      }
    }
  }

  function removeItemFromCart(productId) {
    setCartItems(cartItems => cartItems.filter((product) => {
      return product.id !== productId;
    }));
  }

  function clearCart() {
    setCartItems([]);
  }

  function addInCartByOne(productId) {
    cartItems.forEach(ci => {
      if(ci.id === productId) {
        ci.inCart += 1;
        console.log(ci.inCart);
      }
    });
  }

  function removeInCartByOne(productId) {
    cartItems.forEach(ci => {
      if(ci.id === productId) {
        ci.inCart -= 1;
        console.log(ci.inCart);
      }
    });
  }

  useEffect(() => {
    
  }, [cartItems]);
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Header />} />
          <Route path="/products/" element={<Products cartItems={cartItems} addItemToCart={addItemToCart} />} />
          <Route path="/cart/" element={<Cart cartItems={cartItems} removeItemFromCart={removeItemFromCart} clearCart={clearCart} addInCartByOne={addInCartByOne} removeInCartByOne={removeInCartByOne} />} />
          <Route path="/products/product/:productId" element={<ProductInfo cartItems={cartItems} addItemToCart={addItemToCart} /> } />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
