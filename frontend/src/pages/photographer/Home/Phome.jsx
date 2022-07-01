import React from 'react'
import Body from '../../../components/photographer/body/Body'
import Carosel from '../../../components/photographer/carosel/Carosel'
import Footer from '../../../components/photographer/footer/Footer'
import Header from '../../../components/photographer/header/Header'
import './phome.scss'

const Phome = () => {
  return (
    <>
        <Header/>
    
      <Carosel/>
       <Body/>
       <Body/>
       <Body/>
       <Body/>
       <Body/>
  
      <Footer/>

  
    </>
  )
}

export default Phome