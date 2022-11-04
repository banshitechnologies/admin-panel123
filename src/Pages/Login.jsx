import React, { useEffect, useState } from 'react'
import Logo from "../assets/logo_white.png";
import '../css/login.css';
import { Link,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Login() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { logindata } = useSelector((state) => state.auth);
   
    const [login, setLogin] = useState({
        userName: "",
        password: "",
    })
    // const [userData,setUserData] = useState();
    const [loginError, setLoginError] = useState("");
    const [buttonAvailable,setButtonAvailable] = useState(true);
    const handleInput = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        setLogin({ ...login, [name]: value });

        if (login.password === "" || login.userName === "") {
            setButtonAvailable(true);
        }else{
            setButtonAvailable(false);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
      console.log("ok");
        if (login.userName !== "" && login.password !== "") {
            
            await axios.post('api/auth/login', {
                username: login.userName,
                password: login.password
            }).then(function (response) {
                
                    setLoginError("login Successfull");
                    const myTimeout = setTimeout(myGreeting, 3000);
                    localStorage.setItem('userdata',JSON.stringify(response.data));
                    const userdata = JSON.parse(localStorage.getItem('userdata'));
                    console.log(userdata);
                    dispatch({
                        type: "login",
                        payload: userdata
                    });
                    function myGreeting() {
                        history("/");
                    }
                })
                .catch(function (error) {
                    dispatch({
                        type: "login",
                        payload: null
                    })
                    console.log(error);
                    setLoginError("input invalid");
                    const myTimeout = setTimeout(myGreeting, 3000);

                    function myGreeting() {
                        setLoginError("");
                    }
                });
        }else{
            setLoginError("input field can't empty");
        }
    }

    useEffect(() => {
        
       if (login.password === "" || login.userName === "") {
        setButtonAvailable(true);
    }else{
        setButtonAvailable(false);
    }
    },[buttonAvailable, login, loginError]);
    return (
        <div>

            <div className="container">
                <div className="row flex justify-content-center align-items-center ">
                    <div className="col-md-7 center">
                        <div className="row mt-4 h-100vh">
                            <div className="col-md-6 left_Side_main borderE">
                                <div className="logor pt-3 flex justify-center" >
                                    <img src={Logo} className="pt-3 pb-3" alt="" />
                                </div>

                                <div className="left_header">
                                    <h2>Wellcome !</h2>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos explicabo perspiciatis aspernatur placeat quasi !</p>
                                </div>
                            </div>
                            <div className="col-md-6 animate__animated animate__backInRight">
                                <div className="order-2 order-lg-1">
                                    {
                                        loginError !== "" ? <div className="tooltip">{loginError}</div> : ""
                                    }
                                    <p className="text-center h4 fw-bold mb-3 mx-1 mx-md-4 clr mt-4">Login</p>
                                    <form style={{ maxWidth: "500px", margin: 'auto' }} className='justify-center'>
                                        <div className="input-container">
                                            <i className="fa fa-user icon"></i>
                                            <input className="input-field regInput" type="text" placeholder="Username" name="userName" value={login.userName} onChange={(e) => handleInput(e)} />
                                        </div>

                                        <div className="input-container">
                                            <i className="fa fa-key icon"></i>
                                            <input className="input-field regInput" type="password" placeholder="Password" name="password" value={login.password} onChange={(e) => handleInput(e)} />
                                        </div>

                                        <div className="regbutton flex justify-center">
                                            <button type="submit" class={buttonAvailable ? "btnr mt-4 disable":"btnr mt-4"} disabled={buttonAvailable} onClick={handleLogin}>Login</button>
                                        </div>
                                        <p style={{ textAlign: 'center', paddingLeft: '45px', marginTop: '20px' }}>Dont have an account ?  <Link to="/register">Register</Link></p>
                                        {/* <p style={{ textAlign: 'center', paddingLeft: '45px', marginTop: '20px' }}> <Link to="/forgetpass">Forgot Password?</Link></p> */}
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
