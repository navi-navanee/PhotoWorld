

import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'

import Footer from '../../../components/photographer/footer/Footer'
import { Body } from '../../../components/users/body/Body'
import Carosel from '../../../components/users/carosel/Carosel'
import Header from '../../../components/users/header/Header'
// import { filter, filterData } from '../../../features/user/details/userSlice'

function Landing() {

//   const dispatch = useDispatch()
  
//   const data= useSelector(filterData)

//   console.log(data);

//   useEffect(() => {
//     dispatch(filter())

// }, [dispatch])

  return (
    <div >
      <Header />
        <Carosel/>
        <Body/>
        <Footer/>
        
    </div>
  )
}

export default Landing