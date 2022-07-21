 import React from 'react'
import './listItem.scss'

const ListItem = ({item:{image,name,price,state,_id}}) => {
  console.log(price);

  const onSubmit = (e) =>{
    console.log("im clicked",e);
    
  }

  return (
    <div className="listItem-wrap">
        <img onClick={()=>onSubmit(_id)}  src={image} alt="item" />
        <header>
            <h4>{name}</h4>
            {/* <span>🌟{rating}</span> */}
            <span>🌟{state}</span>
        </header>
        <footer>
            <p><b>₹{price}</b></p>
        </footer>
    </div>
  )
}

export default ListItem