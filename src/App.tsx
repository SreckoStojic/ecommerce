import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Products from './pages/Products';
import SignUp from './pages/SignUp';
import ProductInfo from './pages/ProductInfo';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardItem from './pages/DashboardItem';
import { handleLogin } from './utils/apiFunctions';
import PrivateRoute from './pages/PrivateRoute';
import { ReactElement } from 'react';

function App() : ReactElement {
  return (
      <BrowserRouter>
        <Routes>
            <Route 
              path="/"
              element={<Home />} 
            />
            <Route
              path="/products/" 
              element={
                <PrivateRoute>
                  <Products />
                </PrivateRoute>
              }
            />
            <Route 
              path="/cart/" 
              element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route 
              path="/dashboard/" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/signup/" element={<SignUp />} />
            <Route path="/login/" element={<Login handleLogin={handleLogin} />} />
            <Route path="/products/product/:productId" element={<ProductInfo /> } />
            <Route path="/dashboard/purchases/:purchaseId" element={<DashboardItem /> } />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
