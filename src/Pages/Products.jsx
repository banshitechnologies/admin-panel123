import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react'
import { MdSend } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useHorizontalScroll } from '../Components/SideScroll';

import '../css/products.css'
function Products() {
    const dispatch = useDispatch();
    const { logindata } = useSelector((state) => state.auth);
    const { packageame, offers, price, packageType } = useSelector((state) => state.order);
    const { allProducts, allPackage } = useSelector((state) => state.products);
    console.log(allPackage);
    const scrollRef = useHorizontalScroll();
    const [allOffers, setAlloffers] = useState();
    const [isOrder, setisOrder] = useState(false);
    const [details, setDetails] = useState({
        needs: [],
        isExistownLogo: false,
        ownLogo: [],
        colors: {
            firstChoice: '',
            secondChoice: '',
            thirdchoice: ''
        },
        referance: false,
        referanceImages: [],
        websiteLink: "",

    });


    const handlePtype = async (title) => {
       

        axios.post(`api/packages/getallpackagebytitle`, { packagetitle: title })
            .then(function (response) {
             
                dispatch({
                    type: "getPackages",
                    payload: response.data
                })

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getDataForOrder = async (data, packageame1, offers, amount, packageType) => {
        console.log(packageame1, offers, amount, packageType);
        setisOrder(true);
        dispatch({
            type: "getoffers",
            payload: data
        });
        dispatch({
            type: "packagetype",
            payload: data.name
        })
        const { data: { key } } = await axios.get('api/getkey')
        const { data: { order } } = await axios.post('api/payment/checkout', {
            amount
        })
        console.log(order);

        var options = {
            key: key,
            amount: order.amount,
            currency: "INR",
            name: "Washim",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id,
            callback_url: "https://banshiback.herokuapp.com/api/payment/paymentvarification",
            prefill: {
                name: logindata.details.username,
                email: logindata.details.email,
                contact: logindata.details.phonenumber
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                color: "#4bacdd"
            }
        };
        var rzp1 = new window.Razorpay(options);

        rzp1.open();

        try {
            console.log(logindata.details.name);
            const formdata = new FormData();
            formdata.append('userid', logindata.details._id);
            formdata.append('selectedPackage', packageame1);
            formdata.append('packageType', packageType);
            formdata.append('needs', offers);
            formdata.append('price', amount);
            formdata.append('isAlreadyExist', details.isExistownLogo);
            formdata.append('logo', details.ownLogo);
            formdata.append('colors', Object.values(details.colors));
            formdata.append('choice', details.referance);

            details.referanceImages.map((item) => {
                formdata.append('image', item);
            })
            formdata.append('dataFOrweb', details.websiteLink);
            formdata.append('description', "ggfdaf");
            formdata.append('order_id', order.id);

            await axios.post('api/orders/order',
                formdata
            ).then(function (response) {
                console.log(response);
            })
                .catch(function (error) {
                    console.log(error);
                });

        } catch (error) {
            console.log(error);
        }

    }


console.log(logindata);
    useEffect(() => {
        const getAllPackage = () => {
            axios.get('api/packages/getallpackages')
                .then(function (response) {
                    // handle success
                  
                    dispatch({
                        type: "getProducts",
                        payload: response.data
                    });

                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        getAllPackage();
        console.log(logindata);
    }, [isOrder, dispatch]);
    return (
        <div>
            <div className="row">
                <div className="productHeader">
                    <h1>Products</h1>
                </div>
                <nav aria-label="breadcrumb" className='margin-left mt-3'>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item" ><a href="/" className='text-decoration-none'>Home</a></li>
                        <li className="breadcrumb-item"><a href="/" className='text-decoration-none'>Library</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Data</li>
                    </ol>
                </nav>
                <div className="ourServices" ref={scrollRef}>
                    <div className='services_holder'>
                        {
                            allProducts ? allProducts.map((prdtitle, key) => (
                                <span key={key} onClick={() => handlePtype(prdtitle.packagetitle)}>{prdtitle.packagetitle}</span>
                            )) : ""
                        }
                    </div>

                </div>

                <h3 className="text-center mt-3 mb-3">{allPackage.length !== 0 ? allPackage.packagetitle : "Packages"}</h3>

                {
                    allPackage.length !== 0 ? allPackage.packagebody
                        .length > 0 ? <div className="col-md-4 col-sm-6">
                        <div className="pricing-table-3 basic">
                            <div className="pricing-table-header">
                                <h4><strong>{allPackage.packagebody
                                [0].name}</strong></h4>
                                <p>Loerm Ipsum Donor Sit Amet</p>
                            </div>
                            <div className="price"><strong>{allPackage.packagebody
                            [0].price}</strong> / PROJECT</div>
                            <div className="pricing-body">
                                <ul className="pricing-table-ul">

                                    <li><i><MdSend /></i>{allPackage.packagebody[0].offers}</li>

                                </ul><a className="view-more" onClick={() => getDataForOrder(allPackage.packagebody[0])}>Buy Now</a></div>
                        </div>
                    </div> : "Nothing to show"
                        : ""}
                        

                {
                    allPackage.length != 0 ? allPackage.packagebody.length >= 2 ? <div className="col-md-4 col-sm-6">
                        <div className="pricing-table-3 premium">
                            <div className="pricing-table-header">
                                <h4><strong>{allPackage.packagebody[1].name}</strong></h4>
                                <p>Loerm Ipsum Donor Sit Amet</p>
                            </div>
                            <div className="price"><strong>${allPackage.packagebody[1].price}</strong> / PROJECT</div>
                            <div className="pricing-body">
                                <ul className="pricing-table-ul">
                                    <li><i><MdSend /></i>{allPackage.packagebody[1].offers}</li>
                                </ul><a className="view-more" onClick={() => getDataForOrder(allPackage.packagebody[1], packageame, offers, allPackage.packagebody[1].price, allPackage.packagebody[1].name)}>Buy Now</a></div>
                        </div>
                    </div> : ""
                        : ""}
                {
                    allPackage.length !== 0 ? allPackage.packagebody.length >= 3 ? <div className="col-md-4 col-sm-12">
                        <div className="pricing-table-3 business">
                            <div className="pricing-table-header">
                                <h4><strong>{allPackage.packagebody[0].name}</strong></h4>
                                <p>Loerm Ipsum Donor Sit Amet</p>
                            </div>
                            <div className="price"><strong>${allPackage.packagebody[2].price}</strong> / PROJECT</div>
                            <div className="pricing-body">
                                <ul className="pricing-table-ul">
                                    <li><i><MdSend /></i>{allPackage.packagebody[2].offers}</li>
                                </ul><a className="view-more" onClick={() => getDataForOrder(allPackage.packagebody[2], packageame, offers, allPackage[0].packagebody[2].price, allPackage[0].packagebody[0].name)}>Buy Now</a></div>
                        </div>
                    </div> : ""
                        : ""}
            </div>
        </div>
    )
}

export default Products;
