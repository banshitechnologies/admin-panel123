
import './App.css';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Home from './Pages/Home';
import { BrowserRouter, Routes, Route,Navigate} from 'react-router-dom';
import Products from './Pages/Products';
import MyServices from './Pages/MyServices';
import Orders from './Pages/Orders';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import { CookiesProvider,useCookies } from 'react-cookie';
import 'animate.css';
import PaymentSuccess from './Pages/PaymentSuccess';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(['user']);
  setCookie('user', cookies.user, { path: '/' })
  useEffect(() => {
    
  console.log(cookies.user);
  },[cookies.user])
  
console.log(cookies.user);
  return (
    <div className="App">
      <CookiesProvider>
      <BrowserRouter>

<div className="row margins">
  <div className= "col-md-3">
    <Sidebar />
  </div>
  <div className="col-md-9">
    <div className="main">
      <Navbar />
      <Routes>
        <Route path='/login' element={ <Login/> }/>
        <Route path='/register' element={ <Register/>}/>
        <Route path='/products' element={ <Products /> } />
        <Route path='/myservices' element={ <MyServices /> } />
        <Route path='/orders' element={<Orders /> } />
        <Route path='/paymentsuccess' element={<PaymentSuccess/>}/>
        <Route path='/' element={ <Home />} />
        
      </Routes>
    </div>
  </div>
</div>

</BrowserRouter>
      </CookiesProvider>
    </div>
  );
}

export default App;
