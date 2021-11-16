import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Products from './pages/Products';
import ProductInfo from './pages/ProductInfo';
import Cart from './pages/Cart';
import { getProductById, getProducts } from './utils/products';
import { useSelector } from 'react-redux';


function App() { 
  let [cartItems, setCartItems] = useState([]);
  let [totalCartCount, setTotalCartCount] = useState(0);
  function clearCart() {
    setCartItems([]);
    clearInCartCount();
  }

  function buy() {
    if(cartItems.length !== 0) {
      alert("Thanks for buying our products. Receipt is sent to your email address.");
      resetInCart();
      clearCart();
    } else {
      alert("Cart is empty.");
    }
  }

  function resetInCart() {
    getProducts().forEach(product => {
      cartItems.forEach(ci => {
        if(product.id === ci.id){
          product.count -= ci.inCart; 
        }
      });
    });
  }

  function addInCartByOne(productId) {
    cartItems.forEach(ci => {
      if(ci.id === productId) {
        ci.inCart += 1;
      }
    });
    setCartItems(cartItems => [...cartItems]);
  }

  function removeInCartByOne(productId) {
    cartItems.forEach(ci => {
      if(ci.id === productId) {
        ci.inCart -= 1;
      }
    });
    setCartItems(cartItems => [...cartItems]);
  }

  function calculateTotalCartCount() {
    let totalCartCnt = 0;
    cartItems.forEach(ci => {
      totalCartCnt += ci.inCart;
    });
    setTotalCartCount(totalCartCnt);
  }

  function clearInCartCount() {
    getProducts().forEach(p => {
      p.inCart = 0;
    });
  }

  useEffect(() => {
    calculateTotalCartCount();
  }, [cartItems]);
  
  return (
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Header />} />
            <Route path="/products/" element={<Products />} />
            <Route path="/cart/" element={<Cart totalCartCount={totalCartCount} buy={buy} clearCart={clearCart} addInCartByOne={addInCartByOne} removeInCartByOne={removeInCartByOne} />} />
            <Route path="/products/product/:productId" element={<ProductInfo totalCartCount={totalCartCount} cartItems={cartItems}/> } />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
