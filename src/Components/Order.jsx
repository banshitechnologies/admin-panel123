import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import Resizer from "react-image-file-resizer";
import axios from 'axios';
function Order() {
    const { packageame, offers, price,packageType } = useSelector((state) => state.order);
    const { logindata } = useSelector((state) => state.auth);
    const [step, setStep] = useState(1);
    const [displayColorPicker, setdisplayColorPicker] = useState(true);
    const [color, setColor] = useState('#3F356F');
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
        websiteLink: ""
    });

    const handleInput = async (e) => {
        const { name, value, type, checked, files } = e.target;
        console.log(name, value, type, checked);
        if (name == "needs") {
            if (checked) {
                setDetails({ ...details, needs: [...details.needs, value] });
            } else {
                let newNeeds = details.needs;
                newNeeds = newNeeds.filter(item => item !== value);
                setDetails({ ...details, needs: [...newNeeds] })
            }
        } else if (name == "isExistownLogo") {
            if (checked) {
                setDetails({ ...details, isExistownLogo: true });
            } else {
                setDetails({ ...details, isExistownLogo: false });
            }
        } else if (name == "ownLogo") {
            try {
                const file = files[0];

                const image = await resizeFile(file);
                setDetails({ ...details, ownLogo: image })
                console.log(image);
            } catch (err) {
                console.log(err);
            }
        } else if (name === "referance") {
            if (checked) {
                setDetails({ ...details, referance: true });
            } else {
                setDetails({ ...details, referance: false });
            }
        } else if (name === "logoReferance") {
            try {
                let images = [];
                console.log(files.length);
                for (let index = 0; index < files.length; index++) {
                    const image = await resizeFile(files[index]);
                    console.log(files[index]);
                    images = [...images, image]
                }

                setDetails({ ...details, referanceImages: [...details.referanceImages, ...images] })

            } catch (error) {
                console.log(error);
            }
        }
    }

    // resize files
    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "file"
            );
        });

    const handleChange1 = (e) => {
        setDetails({ ...details, colors: { ...details.colors, firstChoice: e.hex } })
    }
    const handleChange2 = (e) => {
        setDetails({ ...details, colors: { ...details.colors, secondChoice: e.hex } })
    }
    const handleChange3 = (e) => {
        setDetails({ ...details, colors: { ...details.colors, thirdchoice: e.hex } })
    }
    useEffect(() => {
        console.log(packageame, price,packageType);
    });

    const handlePayment = async (packageame, amount,packageType,_id) => {
  
        const { data: { key } } = await axios.get('api/getkey')
        const { data: { order } } = await axios.post('api/payment/checkout', {
            amount
        })

        var options = {
            key: key, 
            amount: order.amount, 
            currency: "INR",
            name: "Washim",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id, 
            callback_url: "http://localhost:8800/api/payment/paymentvarification",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9999999999"
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


    }

   
    
    const styles = reactCSS({
        'default': {
            color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `${color}`,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <form action="" enctype="multipart/form-data"></form>
                        {
                            step === 1 ? <div className="needs d-flex align-items-center justify-content-center flex-column">
                                <h3 className="needHeader">Please tell Us your needs</h3>
                                {
                                    offers.length !== 0 ? offers.map((offer) => (
                                        <div class="form-check">
                                            <input className="form-check-input" onClick={handleInput} type="checkbox" name='needs' value={offer}
                                                id={offer} />
                                            <label class="form-check-label" for={offer}>
                                                {offer}
                                            </label>
                                        </div>
                                    )) : ""
                                }

                            </div> : step === 2 ?
                                <div className="logoNeed d-flex align-items-center justify-content-center flex-column">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="existLogo" name='isExistownLogo' checked={details.isExistownLogo} onChange={handleInput} />
                                        <label class="form-check-label" for="existLogo">
                                            Do You Have Any Logo?
                                        </label>
                                    </div>
                                    {
                                        details.isExistownLogo ? <div class="form-group any_logo_content">
                                            <label for="exampleFormControlFile1"></label>
                                            <input type="file" onChange={handleInput} name='ownLogo' class="form-control-file" id="exampleFormControlFile1" />
                                        </div> : ""
                                    }
                                </div> : step === 3 ?

                                    <div className="colorPickwe d-flex align-items-center justify-content-center flex-column">
                                        <h3 className='text-center mt-3 mb-3'>Choose Your Colour Combination</h3>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <SketchPicker color={details.colors.firstChoice} onChange={handleChange1} />
                                            </div>

                                            <div className="col-md-4">
                                                <SketchPicker color={details.colors.secondChoice} onChange={handleChange2} />
                                            </div>

                                            <div className="col-md-4">
                                                <SketchPicker color={details.colors.thirdchoice} onChange={handleChange3} />
                                            </div>
                                        </div>

                                    </div> : step === 4 ?
                                        <div className="imageReference d-flex align-items-center justify-content-center flex-column">
                                            <div class="form-check coustom_check">
                                                <input class="form-check-input" onChange={handleInput} type="checkbox" name='referance' value="referance" id="referance" />
                                                <label class="form-check-label" for="referance">
                                                    Do You Have Any referance?
                                                </label>
                                            </div>
                                            {
                                                details.referance ? <input class="form-control" name='logoReferance' onChange={handleInput} type="file" id="formFileMultiple" multiple /> : null
                                            }

                                        </div> : null


                        }

                        <div className="buttonSubmit d-flex align-items-center justify-content-center mt-3 mb-2">
                            {
                                step === 5 ? <button className='btn btn-info' onClick={() => handlePayment(packageame, price,packageType,logindata._id)}>Please Do Payment</button> : <button className='btn btn-info' onClick={(e) => setStep(step + 1)}>nextStep</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order