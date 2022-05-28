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


function App() {
  return (
    <div className='bgImg max-w-7xl mx-auto'>
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="login" element={<Login />} ></Route>
        <Route path="signup" element={<Signup />} ></Route>
        <Route path="purchase" element={<RequireAuth><Purchase /></RequireAuth>} />
        <Route path="dashboard" element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
          <Route index element={<MyProfile></MyProfile>}></Route>
          <Route path='myOrders' element={<MyOrders></MyOrders>}></Route>
          <Route path='addReview' element={<AddReview></AddReview>}></Route>
          <Route path='allOrders' element={<RequireAdmin><ManageAllOrders></ManageAllOrders></RequireAdmin>}></Route>
          <Route path='addProduct' element={<RequireAdmin><AddProduct></AddProduct></RequireAdmin>}></Route>
          <Route path='makeAdmin' element={<RequireAdmin><MakeAdmin></MakeAdmin></RequireAdmin>}></Route>
          <Route path='manageProducts' element={<RequireAdmin><ManageProducts></ManageProducts></RequireAdmin>}></Route>

        </Route>


      </Routes>


      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="appointment" element={<RequireAuth><Appointment /></RequireAuth>} />
        <Route path="dashboard" element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}>
          <Route index element={<MyAppointments></MyAppointments>}></Route>
          <Route path='review' element={<MyReview></MyReview>}></Route>
          <Route path='history' element={<MyHistory></MyHistory>}></Route>
          <Route path='payment/:id' element={<Payment></Payment>}></Route>
          <Route path='users' element={<RequireAdmin><Users></Users></RequireAdmin>}></Route>
          <Route path='addDoctor' element={<RequireAdmin><AddDoctor></AddDoctor></RequireAdmin>}></Route>
          <Route path='manageDoctors' element={<RequireAdmin><ManageDoctors></ManageDoctors></RequireAdmin>}></Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Routes> */}
      {/* <Footer></Footer> */}
      <ToastContainer />
    </div>
  );
}

export default App;
