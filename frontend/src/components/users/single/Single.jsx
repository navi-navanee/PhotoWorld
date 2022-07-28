import React from 'react'
import Header from '../header/Header'
import { Link, Outlet,useParams } from 'react-router-dom'
import Footer from '../../photographer/footer/Footer'
import { Button } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { details, photographerDetails } from '../../../features/photographer/details/photographerSlice'
import Spinner from '../../spinner/Spinner'
import { isLoading } from '../../../features/photographer/details/photographerSlice'
import { singleData, singleLoading, singleSearch } from '../../../features/user/details/userSlice'


const Single = () => {
    const dispatch = useDispatch()
    const loading = useSelector(singleLoading)

    let { id } = useParams();

    console.log("im the sent id",id);

    const {data}= useSelector(singleData)

    const category = data ? data.category : ''

    console.log("im sigle data",data);

    
    useEffect(()=>{
        

        dispatch(singleSearch(id))

    },[dispatch])



    if (loading) {
        return <Spinner />
    }

    

  return (
    <>
        <div>
                <Header />
                <div className='cover-photo' >
                    <div className='left'>
                   <img src={data ? data.image : ''} alt="" />
                    </div>
                    <div className='right'>
                        <h1>{data ? data.name : ''}</h1>
                        <div className='address'>{data ? data.address : ''}</div>
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
                    <Link className='link' to={'singlealbum'}>Album</Link>
                    <Link className='link' to={'singlereview'}>Review</Link>
                </nav>
                <Outlet />
                <Footer />
            </div>
            <div>

            </div>
    </>
  )
}

export default Single