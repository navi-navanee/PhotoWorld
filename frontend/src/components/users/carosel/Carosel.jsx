import React, { useEffect } from 'react'

import './carosel.scss'

import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { filter, filterData } from '../../../features/user/details/userSlice';
import { useNavigate } from 'react-router-dom';




const Carosel = () => {

  
const navigate =useNavigate()

  return (
     <div className="content">
       <h1>Search photographer.....</h1>
       <div className="search">
            {/* <input type="text" placeholder='search' style={{color:'white'}} />
            <SearchIcon onClick={onSubmit} style={{color:'red'}}/> */}

            <button onClick={(e)=>{
              e.preventDefault();
              navigate('/filter')
            }}>
              Click here
            </button>
           </div>

    </div>
  )
}

export default Carosel