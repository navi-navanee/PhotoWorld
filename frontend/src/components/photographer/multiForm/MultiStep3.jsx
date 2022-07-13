import React from "react";
const Step3 = (props) => {
  const { data, handleChange, back } = props;
  console.log("im data",data);
  return (
    <form>
      <p>
        <label htmlFor="comments">PaYMENT</label>
        <textarea
          name="payment"
          value={data.payment}
          onChange={handleChange}
        ></textarea>
      </p>      
      <button onClick={back}>Back</button> 
      <button type="submit">Submit</button>
    </form>
  );
};
export default Step3;