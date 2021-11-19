import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Products from './pages/Products';
import SignUp from './pages/SignUp';
import ProductInfo from './pages/ProductInfo';
import Cart from './pages/Cart';
import Login from './pages/Login';

function App() {
  const isLogged = localStorage.getItem('username') === null ? false : true;
  console.log(isLogged);
  return (
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/products/" element={isLogged ? <Products /> : <Navigate to="/login"/>} />
            <Route path="/cart/" element={isLogged ? <Cart /> : <Navigate to="/login"/>} />
            <Route path="/signup/" element={<SignUp />} />
            <Route path="/login/" element={<Login />} />
            <Route path="/products/product/:productId" element={<ProductInfo /> } />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
