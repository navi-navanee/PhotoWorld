import React, { useEffect } from 'react'

import './carosel.scss'

import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { filter, filterData } from '../../../features/user/details/userSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';




const Carosel = () => {

  const onclick =((e) =>{
    e.preventDefault();
    navigate('/filter')
  })
  
const navigate =useNavigate()

  return (
     <div className="content">
       <h1>Search photographer.....</h1>
       <div className="search">
            <Button style={{color:"antiquewhite"}} onClick={onclick}>
              Click here
            </Button>
           </div>

    </div>
  )
}

export default Carosel