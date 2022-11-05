import React from 'react';
import rightimg from '../assets/right.png';
import { Link } from 'react-router-dom';
import '../css/paymentsuccess.css'
function PaymentSuccess() {
  return (
    <div>
       <div class="from_div">
      <header>
        <div class="header_contant">
          <h1>payment seccess !!</h1>
        </div>
      </header>
      <section>
         <div class="contant">
          <img src={rightimg} class="right_img" alt='rightimg'/>
        </div>
        <div class="back_div">
          <button class="back_btn"> <Link to='/'>Back to Dashboard</Link></button>
        </div>
      </section>
    </div>
    </div>
  )
}

export default PaymentSuccess
