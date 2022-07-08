import React from 'react'
import Footer from '../../../components/photographer/footer/Footer'
import { Body } from '../../../components/users/body/Body'
import Carosel from '../../../components/users/carosel/Carosel'
import Header from '../../../components/users/header/Header'

function landing() {
  return (
    <div >
      <Header />
        <Carosel/>
        <Body/>
        <Footer/>
        
    </div>
  )
}

export default landing