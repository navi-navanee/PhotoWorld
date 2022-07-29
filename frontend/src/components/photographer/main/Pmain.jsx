import React from 'react'
import Header from "../header/Pheader"
import './pmain.scss'
// import image from '../images/cover.jpg'
import { Link, Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import { Button } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { details, photographerDetails } from '../../../features/photographer/details/photographerSlice'
import Spinner from '../../spinner/Spinner'
import { isLoading } from '../../../features/photographer/details/photographerSlice'



const Pmain = () => {
    // const [ test,setTest]=useState("")

    const photographer = JSON.parse(localStorage.getItem('photographer'))
    console.log("im full photographer",photographer);

    const dispatch = useDispatch()
    const loading = useSelector(isLoading)
    const data= useSelector(photographerDetails)
    
    
  const category =data.category

  console.log("im  category",category);



    useEffect(() => {


        dispatch(details())

    }, [ dispatch])


    if (loading) {
        return <Spinner />
    }

    return (
        <>
            <div>
                <Header />
                <div className='cover-photo' >
                    <div className='left'>
                   <img src={data.image} alt="" />
                    </div>
                    <div className='right'>
                        <h1>{data.name}</h1>
                        <div className='address'>{data.address}</div>
                        <div className='phone'>9497502035</div>
                        <div className='right-button'>
                            <Button className='call' variant="outlined">call</Button>
                            <Button className='chat' variant="outlined">Chat</Button>
                        </div>
                        <div className='category'>
                         

                            {category && category.map((item) => (
                            
                                // <h1>{item.value ? item.label : "333333"}</h1>
                                <button>{item.label}</button>
                                
                           
                            ))}
                           

                        </div>
                    </div>

                </div>
                <nav>
                    <Link className='link' to={''} >About</Link >
                    <Link className='link' to={'album'}>Album</Link>
                    <Link className='link' to={'review'}>Review</Link>
                </nav>
                <Outlet />
                <Footer />
            </div>
            <div>

            </div>

        </>
    )
}

export default Pmain