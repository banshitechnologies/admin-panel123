
import './App.css';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Home from './Pages/Home';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Products from './Pages/Products';
import MyServices from './Pages/MyServices';
import Orders from './Pages/Orders';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import 'animate.css';
import PaymentSuccess from './Pages/PaymentSuccess';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Forgotpass from './Pages/Forgotpass';
function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const cookies = new Cookies();
  const [token, settoken] = useState();


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getLocation = async()=>{
     await axios.get('https://api.bigdatacloud.net/data/reverse-geocode-client').then((res)=>{
      dispatch({
        type:"CountryName",
        payload:res.data.countryCode
      })
      
    }).catch((err)=>{
      throw err
    })

  }
  useEffect(() => {
    const cookie = cookies.get('user');
    settoken(cookie);
    getLocation();
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    dispatch({
      type:'login',
      payload:userdata
    })
  }, [cookies, cookies.user, getLocation, location.pathname, token]);
  return (
    <div className="App">
      <div className="row margins">

        <div className={location.pathname === "/login" || location.pathname === "/register" ? "d-none" : "col-md-3"}>
          <Sidebar />
        </div>

        <div className={location.pathname === "/login" || location.pathname === "/register" ? "col-md-12" : "col-md-9"}>
          <div className="main">
            <Navbar />
            <Routes>
              <Route path='/login' element={token === undefined ? <Login/>: <Navigate to='/'/> } />
              <Route path='/register' element={token === undefined ? <Register />: <Navigate to='/'/>} />
              <Route path='/products' element={token !== undefined ? <Products /> : <Navigate to='/login'/>} />
              <Route path='/myservices' element={<MyServices />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/paymentsuccess' element={<PaymentSuccess />} />
              <Route path='/' element={token !== undefined ? <Home /> : <Navigate to='/login'/>} />
              <Route path='/forgetpass' element={Forgotpass}/>
            </Routes>
          </div>
        </div>
      </div>



    </div>
  );
}

export default App;
