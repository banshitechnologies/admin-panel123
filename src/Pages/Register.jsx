import React, { useState } from 'react';
import Logo from "../assets/logo_white.png";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../css/login.css';
import '../css/register.css';
import axios from 'axios';
import { useEffect } from 'react';

function Register() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { inputError } = useSelector((state) => state.auth);
    const { countryName, callingCode } = useSelector((state) => state.countrydetails);
    const [errorvalidation, setErrorValidation] = useState(false);
    const [error, setError] = useState("");
    const [submitAvailable, setsubmitAvailable] = useState({
        correctpass: false,
        correctemail: false,
        correctph: false

    });
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        pass: ""
    });

    const handleInput = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value

        setRegisterData({ ...registerData, [name]: value });

        if (name === "phoneNumber") {
            handlephoneValidation(value);
        } else if (name === "email") {
            emailValidation(value);
        } else if (name === "pass") {
            passwordValidation(value);
        }
    }


    const handlephoneValidation = (value) => {
        if (value.length === 10) {
            setError("");
            setsubmitAvailable({ ...submitAvailable, correctph: true });
        } else {
            setError("phone number must be ten digit");
            setsubmitAvailable({ ...submitAvailable, correctph: false });
        }
        if (value === "") {
            setError("");
        }
        if (submitAvailable.correctemail && submitAvailable.correctpass && submitAvailable.correctph) {
            setErrorValidation(true);
        } else {
            setErrorValidation(false);
        }
    }

    const getCallingCode = async (e, countryName) => {
        await axios.get(`https://api.bigdatacloud.net/data/country-info?code=${countryName}&localityLanguage=en&key=bdc_2ca9416fa6ec473392c7186f6e704fef`).then((res) => {
            dispatch({
                type: 'CallingCode',
                payload: res.data.callingCode
            })

        }).catch((err) => {
            throw (err);
        })
    }

    const passwordValidation = (value) => {
        console.log(value);
        if (value.length < 6) {
            setError("Enter Min 6 charecter Password");
            setsubmitAvailable({ ...submitAvailable, correctpass: false });
        } else {
            setError("")
            setsubmitAvailable({ ...submitAvailable, correctpass: true });
        }
        if (value === "") {
            setError("");
        }
        if (submitAvailable.correctemail && submitAvailable.correctpass && submitAvailable.correctph) {
            setErrorValidation(true);
        } else {
            setErrorValidation(false);
        }
    }

    const emailValidation = (value) => {
        console.log(value);
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!value || regex.test(value) === false) {
            setError("Email is not valid");
            setsubmitAvailable({ ...submitAvailable, correctemail: false });
        } else {
            setError("");
            setsubmitAvailable({ ...submitAvailable, correctemail: true });

        }

        if (value === "") {
            setError("");
        }

        if (submitAvailable.correctemail && submitAvailable.correctpass && submitAvailable.correctph) {
            setErrorValidation(true);
        } else {
            setErrorValidation(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (registerData.name && registerData.email && registerData.phoneNumber && registerData.pass !== "") {
            await axios.post('api/auth/register', {
                username: registerData.name,
                email: registerData.email,
                phonenumber: registerData.phoneNumber,
                password: registerData.pass
            })
                .then(function (response) {
                    dispatch({
                        type: "errorHandle",
                        payload: "Registration SucessFully"
                    })
                    setError("Registration SucessFully");
                    const myTimeout = setTimeout(myGreeting, 2000);

                    function myGreeting() {
                        history("/login");
                    }
                    
                })
                .catch(function (error) {
                    dispatch({
                        type: "errorHandle",
                        payload: "Invalid Input"
                    })
                    setError("Something Went Wrong");
                });
        } else {
            setError("Please fill the all field");
        }
    }

    useEffect(() => {
        if (submitAvailable.correctemail && submitAvailable.correctpass && submitAvailable.correctph) {
            setErrorValidation(true);
        } else {
            setErrorValidation(false);
        }
        console.log(errorvalidation);
        console.log(submitAvailable);
    })

    return (
        <div>
            <div className="container">
                <div className="row flex justify-content-center position_relative">
                    <div className="col-md-7 center">
                        <div className="row mt-4 height_100vh">
                            <div className="col-md-6 left_Side_main borderE">
                                <div className="logor pt-3 flex justify-center" >
                                    <img src={Logo} className="pt-3 pb-3" alt="logo" />
                                </div>

                                <div className="left_header">
                                    <h2>Wellcome !</h2>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos explicabo perspiciatis aspernatur placeat quasi !</p>
                                </div>
                            </div>
                            <div className="col-md-6 animate__animated animate__backInRight ">
                                <div className="order-2 order-lg-1">

                                    <p className="text-center h4 fw-bold mb-3 mx-1 mx-md-4 clr">Create Account</p>
                                    {
                                        error ?

                                            <div class="tooltip">{error}</div>
                                            : ""
                                    }
                                    <form style={{ maxWidth: "500px", margin: 'auto' }} className='justify-center'>
                                        <div className="input-container">
                                            <i className="fa fa-user icon"></i>
                                            <input className="input-field regInput" value={registerData.name} type="text" placeholder="Username" name="name" onChange={handleInput} />
                                        </div>

                                        <div className="input-container">
                                            <i className="fa fa-envelope icon"></i>
                                            <input className="input-field regInput" type="text" value={registerData.email} placeholder="Email" name="email" onChange={handleInput} />
                                        </div>

                                        <div className="input-container">
                                            <i className="fa fa-phone icon"></i>
                                            <input className="input-field regInput" type="text" value={registerData.phoneNumber} placeholder={callingCode === "" ? "phone" : "+" + callingCode} name="phoneNumber" onChange={handleInput} onFocus={(e) => getCallingCode(e, countryName)} />


                                        </div>
                                        <div className="input-container">
                                            <i className="fa fa-key icon"></i>
                                            <input className="input-field regInput" type="password" placeholder="Password" name="pass" onChange={handleInput} />
                                        </div>

                                        <div className="regbutton input-container">
                                            <button type="submit" className={errorvalidation === true ? "btnr mt-4" : "btnr mt-4 disable"} onClick={handleSubmit} disabled={!errorvalidation}>Register</button>
                                        </div>
                                        <p style={{ textAlign: 'center', paddingLeft: '45px', marginTop: '20px' }}>Alredy have an account ?  <Link to="/login">Login</Link></p>

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

export default Register
