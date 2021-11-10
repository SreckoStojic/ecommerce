import './App.css';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Products from './pages/Products';
import ProductInfo from './pages/ProductInfo';
import Cart from './pages/Cart';
import { getProductById, getProducts } from './utils/products';

function App() { 
  let [cartItems, setCartItems] = useState([]);
  let [totalCartCount, setTotalCartCount] = useState(0);

  function addItemToCart(productId) {
    let found = false;
    const product = getProductById(productId);
    if(cartItems.length === 0) {
      if(product.count > 0){
        product.inCart += 1;
        setCartItems(cartItems => [...cartItems, product]);
      }
    } else {
      cartItems.forEach(ci => {
        if(ci.id === product.id){
          if(ci.inCart < ci.count && ci.count > 0){
            ci.inCart += 1;
            setCartItems(cartItems => [...cartItems]);
          }
          found = true;
        }
      });
      if(found === false) {
        if(product.count > 0){
          product.inCart += 1;
          setCartItems(cartItems => [...cartItems, product]);
        }
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
          <Route exact path="/" element={<Header totalCartCount={totalCartCount}/>} />
          <Route path="/products/" element={<Products totalCartCount={totalCartCount} cartItems={cartItems} addItemToCart={addItemToCart} />} />
          <Route path="/cart/" element={<Cart totalCartCount={totalCartCount} cartItems={cartItems} buy={buy} removeItemFromCart={removeItemFromCart} clearCart={clearCart} addInCartByOne={addInCartByOne} removeInCartByOne={removeInCartByOne} />} />
          <Route path="/products/product/:productId" element={<ProductInfo totalCartCount={totalCartCount} cartItems={cartItems} addItemToCart={addItemToCart} /> } />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
