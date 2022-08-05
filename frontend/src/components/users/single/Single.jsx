import React from 'react'
import Header from '../header/Header'
import { Link, Outlet,useNavigate,useParams } from 'react-router-dom'
import Footer from '../../photographer/footer/Footer'
import { Button } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { details, photographerDetails } from '../../../features/photographer/details/photographerSlice'
import Spinner from '../../spinner/Spinner'
import { isLoading } from '../../../features/photographer/details/photographerSlice'
import { singleData, singleFetch, singleFetchData, singleLoading, singleSearch } from '../../../features/user/details/userSlice'
import * as api from '../.././../api/messenger';


const Single = () => {
    const dispatch = useDispatch()
    const loading = useSelector(singleLoading)

    const { user } = useSelector((state) => state.auth)



    const navigate=useNavigate()


    let { id } = useParams();

    const {data}= useSelector(singleData)



    // const image= useSelector(singleFetchData)

    // const album=image ? image.data : '' 

    // console.log("i the imag",album);

    const photographer =data ?data._id : ''

    

    const category = data ? data.category : ''

    // console.log("im sigle data",data);



    
    useEffect(()=>{

        dispatch(singleSearch(id))
        dispatch(singleFetch(id))

    },[dispatch])



    if (loading) {
        return <Spinner />
    }

    const ChatWithPhotographer =async() =>{

        const data={
            senderId:user._id,
            receiverId: photographer,
          }
          let Data = await api.newConversation(data)
        console.log(",da=",Data)
        navigate('/messenger')
          return null;
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
                            <Button onClick={ChatWithPhotographer} className='chat' variant="outlined">Chat</Button>
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