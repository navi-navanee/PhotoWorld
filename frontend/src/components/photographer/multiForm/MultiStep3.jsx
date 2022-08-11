import { bgcolor } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import *as api from '../../../api/Payment'

import Button from '@mui/material/Button';
import './step3.scss'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../../../features/photographer/auth/photographerauthSlice";



const Step3 = (props) => {
  const {  handleChange, back, next } = props;


  //...................................
  const { data } = props;

  console.log("final page data",data);

  const navigate=useNavigate()
  const dispatch=useDispatch()
 
  const { photographer, isLoading, isError, isSuccess, message } = useSelector(
   (state) => state.photographerauth)
 
   const {password, password2 } = data

   console.log("im the photographer",photographer);
 
   useEffect(() => {
     if(isError){
       toast.error(message)
     }
     if(isSuccess && photographer){
       navigate('/photographer/home')
     }
   },[photographer, isError, isSuccess, message, navigate, dispatch])
 

   
  const onSubmit = () => {
    // e.preventDefault()

    console.log("im clickeddddddd");

    if (password !== password2) {
      toast.error('Password do not match')
    } else {
      console.log("lastdata",data);
      dispatch(register(data))
    }
  }




  //........................................

  const [orderAmount, setOrderAmount] = useState(null);


  // async function fetchOrders () {
  //   const {data} =await axios.get('/list')
  // }
  
  useEffect(()=>{
    if(orderAmount){
      razorpay()
    }
  },[orderAmount])

  const cardA =(e)=>{  
    setOrderAmount(2000)
    if(orderAmount){
      razorpay()
    }  
  }

  const cardB =(e)=>{  
    setOrderAmount(4000)
    if(orderAmount){
      razorpay()
    }  
  }
  const cardC =(e)=>{  
    setOrderAmount(6000)
    if(orderAmount){
      razorpay()
    }  
  }



  const razorpay =()=>{
    loadRazorpay()
  }

  const loadRazorpay =(async () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load .Are you online?")
    };
    script.onload = async () => {
      try {
        const result = await api.createOrder({
          amount: orderAmount + "00",
        })
        console.log("im the result,...",result.data.order);
        const { amount , id: order_id, currency } = result.data.order
        const {data: { key: razorpayKey }} = await api.getRazorkey()
        const options = {
          key:razorpayKey,
          amount:amount,
          currency:currency,
          name:"PHOTOWORLD",
          description:`example transaction`,
          order_id:order_id,
          
          handler:async function(response){
            console.log("im the response",response);
            const result = await api.verifyAndPay({
              email:data.email,
              amount:amount,
              razorpayPaymentId:response.razorpay_payment_id,
              razorpayOrderId:response.razorpay_order_id,
              razorpaysignature:response.razorpay_signature,
            });
            alert("heloooooooooo",result)
                console.log("successsss...............................................");
                data.payment=orderAmount
                onSubmit()

          },
          prefill : {
            name:"PHOTOWORLD",
            email: 'navaneeth@gmail.com',
            contact:'9497502035'
          },note : {
            address:'example address',            
          },
          theme : {
            color:'#80c'
          }
        };
     
        const paymentObject =new window.Razorpay(options);
        paymentObject.open();
 

      } catch (error) {
        console.log("im errorr",error);
        alert(error)
    
      }
    }
    document.body.appendChild(script)
  })

  return (
    <form>
      <div class="container">
        <div class="cardmain">

          {/*  */}
          <div class="cardA ">
            <div class="card-body px-4 text-center">
              <h2 class="card-title "> 3 Month Plan</h2>
              <p class="card-text">
                Ipsa earum saepe tempora, neque laudantium non itaque ullam reiciendis dolore explicabo!
              </p>
              <div class="alert alert-light row plan ">
                <div class="col-6">
                  <div class="fw-bold">Plan Price : </div>
                  <div> ₹ 2000</div>
                </div>
              </div>
              <div class="btn ">
                {/* <a class="btn btn-primary btn-lg col-12 buy-now-btn  ">Proceed to payement</a> */}
                <Button  onClick={()=> cardA()} variant="text">Proceed to payement</Button>
              </div>
   
            </div>
          </div>
          {/*  */}
          {/*  */}
          <div class="cardA ">
            <div class="card-body px-4 text-center">
              <h2 class="card-title "> 6 Month Plan</h2>
              <p class="card-text">
                Ipsa earum saepe tempora, neque laudantium non itaque ullam reiciendis dolore explicabo!
              </p>
              <div class="alert alert-light row plan ">
                <div class="col-6">
                  <div class="fw-bold">Plan Price : </div>
                  <div> ₹ 4000</div>
                </div>
              </div>
              <div class="btn ">
                {/* <a class="btn btn-primary btn-lg col-12 buy-now-btn  ">Proceed to payement</a> */}
                <Button  onClick={()=> cardB()} variant="text">Proceed to payement</Button>
              </div>
            </div>
          </div>
          {/*  */}
          {/*  */}
          <div class="cardA ">
          <div class="card-body px-4 text-center">
              <h2 class="card-title "> 12 Month Plan</h2>
              <p class="card-text">
                Ipsa earum saepe tempora, neque laudantium non itaque ullam reiciendis dolore explicabo!
              </p>
              <div class="alert alert-light row plan ">
                <div class="col-6">
                  <div class="fw-bold">Plan Price : </div>
                  <div> ₹ 6000</div>
                </div>
              </div>
              <div class="btn ">
                {/* <a class="btn btn-primary btn-lg col-12 buy-now-btn  ">Proceed to payement</a> */}
                <Button onClick={()=> cardC()} variant="text">Proceed to payement</Button>
              </div>
   
            </div>
          </div>
          {/*  */}

        </div>
      </div>
      <div style={{textAlign:"center"}}>
       <Button style={{color: "blue", height: "2rem" }} onClick={back}>Back</Button>
      </div>
      {/* <button style={{ color: "blue", height: "2rem" }} onClick={next}>Next</button>
      <button onClick={onSubmit} type="submit">Submit</button> */}
    </form>
  );
};
export default Step3;