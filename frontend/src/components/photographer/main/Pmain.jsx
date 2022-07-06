import React from 'react'
import Header from '../../Header'
import './pmain.scss'
import image from '../images/cover.jpg'
import { Link,Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import { Button } from '@mui/material'

const Pmain = () => {

  return (
    <>
    <div>
       <Header/>
        <div className='cover-photo' >
            {/* <div className='left'>
                <img src={image} alt="" />
            </div> */}
            <div className='right'>
                <h1>Shadow</h1>
                <div className='address'>Ernakulam kerala</div>
                <div className='phone'>9497502035</div>
                <div className='right-button'>
                    {/* <button className='call'>call</button>
                    <button className='chat'>chat</button> */}
                    <Button className='call' variant="outlined">call</Button>
                    <Button className='chat' variant="outlined">Chat</Button>
                </div>
                <div className='category'>
                    <button className=''>wedding</button>
                    <button className=''>photoshoot</button>
                </div>
            </div>
            
        </div>
        <nav>
            <Link className='link' to={''}>About</Link>
            <Link className='link' to={'album'}>Album</Link>
            <Link className='link' to={'review'}>Review</Link>
        </nav>
        <Outlet/>  
        <Footer/>
    </div>
    <div>

    </div>

    </>
  )
}

export default Pmain