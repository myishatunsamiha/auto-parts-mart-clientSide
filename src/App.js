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


function App() {
  return (
    <div className='bgImg max-w-7xl mx-auto'>
      <Navbar></Navbar>

      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="login" element={<Login />} ></Route>
        <Route path="signup" element={<Signup />} ></Route>
        <Route path="appointment" element={<RequireAuth><Purchase /></RequireAuth>} />

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
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
}

export default App;
