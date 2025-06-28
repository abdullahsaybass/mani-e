import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/User/Register';
import Cartpage from './pages/cartpage/Cartpage';
import Login from './components/User/Login';
import Trackorderpage from './pages/trackorderpage/Trackorderpage';
import Contactpage from './pages/contact/Contactpage';
import Women from './pages/productpage/Women';
import Productpage from './pages/Sproduct/Productpage';
import AdminPanel from './Admin/Admin';
import AddProduct from './Admin/Addproduct/AddProduct';
import OrderList from './Admin/order/Order';
import BuyNow from './components/Buy/Buy';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cartpage" element={<Cartpage />} />
      <Route path="/trackorder" element={<Trackorderpage />} />
      <Route path="/contact" element={<Contactpage />} />
      <Route path="/women" element={<Women />} />
      <Route path="/product/:id" element={<Productpage />} />
       <Route path="/buy-now" element={<BuyNow />} />


      {/* Admin Panel Routes */}
      <Route path="/admin" element={<AdminPanel />}>
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="orderlist" element={<OrderList />} />
      </Route>
    </Routes>
  );
}

export default App;
