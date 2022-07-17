import { bgcolor } from "@mui/system";
import React from "react";


const Step3 = (props) => {
  const { data, handleChange, back, next } = props;

  console.log("im data",data);



  return (
    <form>
      <div>
        <label htmlFor="comments">Payment:</label>
        <textarea
          name="comments"
          value={data.comments}
          onChange={handleChange}
        ></textarea>
      </div>      
      <button style={{color:"blue" , height:"2rem"}} onClick={back}>Back</button> 
      <button style={{color:"blue" , height:"2rem"}} onClick={next}>Next</button>
    </form>
  );
};
export default Step3;