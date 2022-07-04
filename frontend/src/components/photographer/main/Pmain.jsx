import React from 'react'
import Header from '../../Header'
import './pmain.scss'
import image from '../images/cover.jpg'
const Pmain = () => {
  return (
    <div>
       <Header/>
        <div className='cover-photo' >
            <div className='left'>
                <img src={image} alt="" />
            </div>
            <div className='right'>
                <div className='name'>Shadow</div>
                <div className='address'>Ernakulam kerala</div>
                <div className='phone'>9497502035</div>
                <div className='right-button'>
                    <button className='call'>call</button>
                    <button className='chat'>chat</button>
                </div>
                <div className='category'>
                    <button className=''>wedding</button>
                    <button className=''>photoshoot</button>
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Pmain