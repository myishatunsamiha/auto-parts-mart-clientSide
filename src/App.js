import logo from './logo.svg';
import './App.css';
import Navbar from './pages/Shared/Navbar';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home/Home';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login/Login';
import Footer from './pages/Shared/Footer';
import Signup from './pages/Login/Signup';
import RequireAuth from './pages/Login/RequireAuth';
import Purchase from './pages/Purchase/Purchase';
import Dashboard from './pages/Dashboard/Dashboard';
import MyProfile from './pages/Dashboard/MyProfile';
import AddReview from './pages/Dashboard/AddReview';
import MyOrders from './pages/Dashboard/MyOrders';
import RequireAdmin from './pages/Login/RequireAdmin';
import ManageAllOrders from './pages/Dashboard/ManageAllOrders';
import AddProduct from './pages/Dashboard/AddProduct';
import MakeAdmin from './pages/Dashboard/MakeAdmin';
import ManageProducts from './pages/Dashboard/ManageProducts';
import Payment from './pages/Dashboard/Payment';
import NotFound from './pages/NotFound/NotFound';
import Portfolio from './pages/Portfolio/Portfolio';
import Blogs from './pages/Blogs/Blogs';
import RequireNonAdmin from './pages/Login/RequireNonAdmin';



function App() {
  return (
    <div className='bgImg max-w-7xl mx-auto'>
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="login" element={<Login />} ></Route>
        <Route path="signup" element={<Signup />} ></Route>
        <Route path="blogs" element={<Blogs></Blogs>} ></Route>

        <Route path="portfolio" element={<Portfolio />} ></Route>
        <Route path="purchase/:id" element={<RequireAuth><Purchase /></RequireAuth>} />
        <Route path="dashboard" element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path='myOrders' element={<RequireNonAdmin><MyOrders></MyOrders></RequireNonAdmin>}></Route>
          <Route path='addReview' element={<RequireNonAdmin><AddReview></AddReview></RequireNonAdmin>}></Route>
          <Route path='payment/:id' element={<RequireNonAdmin><Payment></Payment></RequireNonAdmin>}></Route>
          <Route path='allOrders' element={<RequireAdmin><ManageAllOrders></ManageAllOrders></RequireAdmin>}></Route>
          <Route path='addProduct' element={<RequireAdmin><AddProduct></AddProduct></RequireAdmin>}></Route>
          <Route path='makeAdmin' element={<RequireAdmin><MakeAdmin></MakeAdmin></RequireAdmin>}></Route>
          <Route path='manageProducts' element={<RequireAdmin><ManageProducts></ManageProducts></RequireAdmin>}></Route>

        </Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>



      <ToastContainer />
    </div>
  );
}

export default App;
