import React from 'react'
import './footer.scss'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <section className='footer'>
        <div className="social">
            <InstagramIcon className='icon'/>
            <FacebookIcon  className='icon'/>
            <TwitterIcon  className='icon'/>
        </div>
        <div className='link'>

        <Link  to={""} style={{color:'blue'}}>Home  </Link>
        <Link to={""}  style={{color:'blue'}}>Service</Link>
        <Link to={""}  style={{color:'blue'}}>About</Link>
        <Link to={""}  style={{color:'blue'}}>Privacy Policy</Link>
        </div>
    </section>
  )
}

export default Footer