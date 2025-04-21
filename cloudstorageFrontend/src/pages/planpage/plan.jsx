import React, { useState,useEffect } from 'react';
import './Plan.css'
import PaymentForm from './buypan';
import axios from 'axios';
const Plan = () => {
  const [showpayment,setshowpayment] = useState(false)
  const [planname,setplanname] = useState("")
  const [amount,setamount] = useState(0)
  const [data, setdata] = useState(null); 

const getplan = ()=>{
    axios
      .get("http://localhost:3001/plan", { withCredentials: true })
      .then((res) => {
        setdata(res.data.plan);
      })
      .catch((err) => console.error("Error fetching user:", err));
    }

useEffect(() => {
    getplan()
  }, []);

  const payment = (planname,amount)=>{
    setshowpayment(true)
    setplanname(planname)
    setamount(amount)
  }

  return (
    <>
 <div className='contener'>
    <div class="flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front">
           <samp className='buy12'>Purchased</samp>
                <p class="title">Free</p>
                <p>5 GB SSD storage</p>
               
            </div>
            <div class="flip-card-back">
                <p class="title">Plan Free</p>
                <p>5 GB SSD storage</p>
            </div>
        </div>
    </div>
    
    <div class="flip-card">
        <div class="flip-card-inner">
           
            <div class="flip-card-front">
            {data =="Premium" ?  <samp className='buy12'>Purchased</samp> : ""} 
                <p class="title">Premium</p>
                <p>50 GB SSD storage</p>
                <p>US$ 4.99/mo</p>
            </div>
            <div class="flip-card-back">
                <p class="title">Plan Premium</p>
                <p>50 GB SSD storage</p>
                <p>US$ 4.99/mo</p>
                <p>+2 months free</p>
                <p>US$ 9.99/mo when you renew</p>
                <div className="buttons">
                {data =="Premium" ?  <button className="btn">Purchased</button> :    <button className="btn" onClick={()=>{payment("Premium",4.99)}}><span></span><p data-start="good luck!" data-text="Continue" data-title="Choose plan"></p></button>}
                </div>
            </div>
        </div>
    </div>
    
    <div class="flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front">
            {data =="Business" ?  <samp className='buy12'>Purchased</samp> : ""}
                <p class="title">Business</p>
                <p>200 GB SSD storage</p>
                <p>US$ 9.99/mo</p>
            </div>
            <div class="flip-card-back">
                <p class="title">Plan Business</p>
                <p>200 GB SSD storage</p>
                <p>US$ 9.99/mo</p>
                <p>+2 months free</p>
                <p>US$ 19.99/mo when you renew</p>
                <div className="buttons">
                {data =="Business" ?  <button className="btn">Purchased</button> :  <button className="btn" onClick={()=>{payment("Business",9.99)}}><span></span><p data-start="good luck!" data-text="Continue" data-title="Choose plan"></p></button>}
                </div>
            </div>
        </div>
    </div>
    
    <div class="flip-card">
        <div class="flip-card-inner">
            <div class="flip-card-front">
            {data =="Enterprise" ?  <samp className='buy12'>Purchased</samp> : ""}
                <p class="title">Enterprise</p>
                <p>1 TB SSD storage</p>
                <p>US$ 19.99/mo</p>
            </div>
            <div class="flip-card-back">
                <p class="title">Plan Enterprise</p>
                <p>1 TB SSD storage</p>
                <p>US$ 19.99/mo</p>
                <p>+2 months free</p>
                <p>US$ 39.99/mo when you renew</p>
                <div className="buttons">
                {data =="Enterprise" ?  <button className="btn">Purchased</button> :   <button className="btn" onClick={()=>{payment("Enterprise",19.99)}}><span></span><p data-start="good luck!" data-text="Continue" data-title="Choose plan"></p></button>}
                </div>
            </div>
        </div>
    </div>
</div>

<PaymentForm showpayment={showpayment}  setshowpayment={setshowpayment}  planname={planname} amount={amount} getplan={getplan}/>
    </>
  );
};

export default Plan;
