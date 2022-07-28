 import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { singleData, singleLoading, singleSearch } from '../../../../features/user/details/userSlice'
import Spinner from '../../../spinner/Spinner'
import './listItem.scss'




const ListItem = ({item:{image,name,price,state,_id}}) => {

const dispatch = useDispatch()
const navigate =useNavigate()


// const single =useSelector(singleData)
// const isLoading =useSelector(singleLoading)

// console.log("im single",single);


  const onSubmit = (e) =>{
    console.log("im clicked",e);

    // dispatch(singleSearch(e))
    
    navigate(`/singlePhotographer/${e}`)

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