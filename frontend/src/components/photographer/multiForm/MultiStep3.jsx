import { bgcolor } from "@mui/system";
import React from "react";
import './step3.scss'


const Step3 = (props) => {
  const { data, handleChange, back, next } = props;

  console.log("im data", data);



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
                    <div> ₹ 1000</div>
                  </div>
                </div>
                <div class="btn ">
                  <a class="btn btn-primary btn-lg col-12 buy-now-btn  ">Proceed to payement</a>
                </div>
              </div>
            </div>
            {/*  */}
                 {/*  */}
                 <div class="cardA ">
              <div class="card-body px-4 text-center">
                <h5 class="card-title  mt-1">Card title</h5>
                <p class="card-text text-muted mt-3">
                  Ipsa earum saepe tempora, neque laudantium non itaque ullam reiciendis dolore explicabo!
                </p>
                <div class="alert alert-light row plan ">
                  <div class="col-6">
                    <div class="fw-bold"> Anula Plan</div>
                    <div>$59.99/year</div>
                  </div>
                  <div class="col-3 d-flex align-items-center ">
                    <a href="#"> Change</a>
                  </div>
                </div>
                <div class="row ">
                  <a href="#" class="btn btn-primary btn-lg col-12 buy-now-btn  ">Proceed to payement</a>
                  <span class="text-secondary h6 mt-3 d-block">Cancel Order</span>
                </div>
              </div>
            </div>
            {/*  */}
                 {/*  */}
                 <div class="cardA ">
              <div class="card-body px-4 text-center">
                <h5 class="card-title  mt-1">Card title</h5>
                <p class="card-text text-muted mt-3">
                  Ipsa earum saepe tempora, neque laudantium non itaque ullam reiciendis dolore explicabo!
                </p>
                <div class="alert alert-light row plan ">
                  <div class="col-6">
                    <div class="fw-bold"> Anula Plan</div>
                    <div>$59.99/year</div>
                  </div>
                  <div class="col-3 d-flex align-items-center ">
                    <a href="#"> Change</a>
                  </div>
                </div>
                <div class="row ">
                  <a href="#" class="btn btn-primary btn-lg col-12 buy-now-btn  ">Proceed to payement</a>
                  <span class="text-secondary h6 mt-3 d-block">Cancel Order</span>
                </div>
              </div>
            </div>
            {/*  */}
     
        </div>
      </div>
      <button style={{ color: "blue", height: "2rem" }} onClick={back}>Back</button>
      <button style={{ color: "blue", height: "2rem" }} onClick={next}>Next</button>
    </form>
  );
};
export default Step3;