import React, { useState } from 'react';
import './Plan.css';
import axios from 'axios';

const PaymentForm = ({ showpayment , setshowpayment,planname,amount,getplan }) => {
  const [show, setShow] = useState(true);

  const handleSubmit = () => {
    axios
    .post(
      "http://localhost:3001/",
      { planname },
      { withCredentials: true } 
    )
    .then((res) => {
      setShow(false);
      getplan()
    })
    .catch((err) => {
      alert("Error in payment");
    });
  
  };

  if (!showpayment) return null;

  return (
    <div className='paymentmain'>
      {show ? (
        <div className='panbox'>
          <h2>Payment for plan</h2>
          <div>
            <p>Plan: {planname}</p>
            <p>Amount: ${amount}</p>
          </div>
          <button onClick={handleSubmit} className='paybtn'>
            Pay Now
          </button>
        </div>
      ) : (
        <div className='card12'>
          <img
            className='png'
            src='https://cdn3.iconfinder.com/data/icons/basicolor-arrows-checks/24/155_check_ok_sticker_success-512.png'
            alt='Payment Successful'
          />
          <h2 className='cookieHeading'>Payment Successful</h2>
          <p className='cookieDescription'>
            Thanks for joining us! We appreciate you upgrading your plan.
          </p>
          <div className='buttonContainer'>
            <button className='acceptButton' onClick={() =>{ setshowpayment(false) ,setShow(true)} }>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
