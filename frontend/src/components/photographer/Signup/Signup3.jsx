import { bgcolor } from "@mui/system";
import React, { useState } from "react";
import { useEffect } from "react";
import *as api from '../../../api/Payment'

import Button from '@mui/material/Button';
import './step3.scss'

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { register } from "../../../features/photographer/auth/photographerauthSlice";
import { Box, Step, StepLabel, Stepper } from "@mui/material";


const steps = [
    'Basic Information',
    'Contact Details',
    'Payment',
];


const Signup3 = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { photographer, form1, form2, isError, isSuccess, message } = useSelector(
        (state) => state.photographerauth)


    console.log("photoooo", photographer);

    console.log("myree", form1);
    console.log("poore", form2);

    const email = form1.email

    console.log("kunna", email);

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess && photographer) {
            navigate('/photographer/home')
        }
    }, [photographer, isError, isSuccess, message, navigate, dispatch])


    const [orderAmount, setOrderAmount] = useState(null);

    const onSubmit = () => {

        console.log("im hereeeeeeeeee");
        const Data = {
            ...form1,
            ...form2,
            payment: orderAmount
        };
        console.log("im findal data before", Data);
        dispatch(register(Data));
    }
    //........................................

    useEffect(() => {
        if (orderAmount) {
            razorpay()
        }
    }, [orderAmount])

    const cardA = (e) => {
        setOrderAmount(2000)
        if (orderAmount) {
            razorpay()
        }
    }
    const cardB = (e) => {
        setOrderAmount(4000)
        if (orderAmount) {
            razorpay()
        }
    }
    const cardC = (e) => {
        setOrderAmount(6000)
        if (orderAmount) {
            razorpay()
        }
    }

    const razorpay = () => {
        console.log("im triggerssssssd");
        loadRazorpay()
    }

    const loadRazorpay = (async () => {
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
                console.log("im the result,...", result.data.order);
                const { amount, id: order_id, currency } = result.data.order
                const { data: { key: razorpayKey } } = await api.getRazorkey()
                const options = {
                    key: razorpayKey,
                    amount: amount,
                    currency: currency,
                    name: "PHOTOWORLD",
                    description: `example transaction`,
                    order_id: order_id,

                    handler: async function (response) {
                        console.log("im the response", response);
                        const result = await api.verifyAndPay({
                            email: email,
                            amount: amount,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaysignature: response.razorpay_signature,
                        });
                        alert("heloooooooooo", result)
                        console.log("successsss...............................................");
                        onSubmit()

                    },
                    prefill: {
                        name: "PHOTOWORLD",
                        email: 'navaneeth@gmail.com',
                        contact: '9497502035'
                    }, note: {
                        address: 'example address',
                    },
                    theme: {
                        color: '#80c'
                    }
                };

                const paymentObject = new window.Razorpay(options);
                paymentObject.open();


            } catch (error) {
                console.log("im errorr", error);
                alert(error)

            }
        }
        document.body.appendChild(script)
    })

    return (
        <form>
            <Box sx={{ width: '100%' }}>
                <Stepper style={{ marginTop: "2rem" }} activeStep={2} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <div style={{ display: "flex", justifyContent: "center" }} class="container">
                <div class="cardmain">

                    {/*  */}
                    <div class="cardA ">
                        <div class="card-body px-4 text-center">
                            <h2 class="card-title "> 3 Month Plan</h2>
                            <p class="card-text">
                                Unlimited access for up to 3 Months
                            </p>
                            <div class="alert alert-light row plan ">
                                <div class="col-6">
                                    <div class="fw-bold">Plan Price : </div>
                                    <div> ₹ 2000</div>
                                </div>
                            </div>
                            <div class="btn ">
                                {/* <a class="btn btn-primary btn-lg col-12 buy-now-btn  ">Proceed to payement</a> */}
                                <Button onClick={() => cardA()} variant="text">Proceed to payement</Button>
                            </div>

                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div class="cardA ">
                        <div class="card-body px-4 text-center">
                            <h2 class="card-title "> 6 Month Plan</h2>
                            <p class="card-text">
                                Unlimited access for up to 6 Months              </p>
                            <div class="alert alert-light row plan ">
                                <div class="col-6">
                                    <div class="fw-bold">Plan Price : </div>
                                    <div> ₹ 4000</div>
                                </div>
                            </div>
                            <div class="btn ">
                                {/* <a class="btn btn-primary btn-lg col-12 buy-now-btn  ">Proceed to payement</a> */}
                                <Button onClick={() => cardB()} variant="text">Proceed to payement</Button>
                            </div>
                        </div>
                    </div>
                    {/*  */}
                    {/*  */}
                    <div class="cardA ">
                        <div class="card-body px-4 text-center">
                            <h2 class="card-title "> 12 Month Plan</h2>
                            <p class="card-text">
                                Unlimited access for up to 3 Months              </p>
                            <div class="alert alert-light row plan ">
                                <div class="col-6">
                                    <div class="fw-bold">Plan Price : </div>
                                    <div> ₹ 6000</div>
                                </div>
                            </div>
                            <div class="btn ">
                                {/* <a class="btn btn-primary btn-lg col-12 buy-now-btn  ">Proceed to payement</a> */}
                                <Button onClick={() => cardC()} variant="text">Proceed to payement</Button>
                            </div>

                        </div>
                    </div>
                    {/*  */}

                </div>
            </div>
        </form>
    );
};
export default Signup3;