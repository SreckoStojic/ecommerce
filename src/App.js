import './App.css';
import React from 'react';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Products from './components/Products';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Header />} />
          <Route path="/products/" element={<Products />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
