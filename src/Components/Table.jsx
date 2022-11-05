import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

function Table() {
    const [orderDetails,setOrderDetails] = useState();
    

    const getorder = (userid)=>{
        axios.post('/api/orders/getallorderbyuser', {
            userid: userid,
           })
           .then(function (response) {
             console.log(response);
             setOrderDetails(response.data);
           })
           .catch(function (error) {
             console.log(error);
           })
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userdata'));
        getorder(data.details._id);
    },[]);
    
    return (
        <div>
            <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Index</th>
                        <th scope="col">UserID</th>
                        <th scope="col">Payment Id</th>
                        <th scope="col">OrderId</th>
                        <th scope="col">Price</th>
                        <th scope="col">Product Name</th>
                        <th scope='col'>Purches date</th>
                    </tr>
                </thead>
                <tbody>
                    
                   {
                   orderDetails ? orderDetails.map((order,key)=>(
                        <tr className="table-primary">
                        <th scope="row">{key}</th>
                        <td>{order._id}</td>
                        <td>{order.razorpay_payment_id}</td>
                        <td>{order.razorpay_order_id}</td>
                        <td>{order.price}</td>
                        <td>{order.selectedpackage}</td>
                        <td>{order.createdAt}</td>
                    </tr>
                   )) : ""
                   }
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default Table
