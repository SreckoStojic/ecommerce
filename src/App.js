import './App.css';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Products from './pages/Products';
import ProductInfo from './pages/ProductInfo';
import Cart from './pages/Cart';

function App() { 
  return (
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Header />} />
            <Route path="/products/" element={<Products />} />
            <Route path="/cart/" element={<Cart />} />
            <Route path="/products/product/:productId" element={<ProductInfo /> } />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
