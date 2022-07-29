import React, { useEffect } from 'react'
import './body.scss'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Container } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { wedding, weddingImage, weddingImageLoading } from '../../../features/user/details/userSlice';
import Spinner from '../../spinner/Spinner';
import { useNavigate } from 'react-router-dom';




export const Body = () => {

  const dispatch = useDispatch()

const loading = useSelector(weddingImageLoading)

const {data} = useSelector(weddingImage)
const navigate =useNavigate()

console.log("im the main.....",data);


useEffect(() => {

  dispatch(wedding())

}, [ dispatch])


if (loading) {
  return <Spinner />
}


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  const onSubmit = (e) =>{
    console.log("im clicked",e);

    // dispatch(singleSearch(e))
    navigate(`/singlePhotographer/${e}`)

  }



  return (
    <div className='App'>
      <Container>

        <h1 style={{marginTop: "2rem",marginBottom:"1rem"}}>Wedding</h1>
        <Slider {...settings}>
          {data&&data?.map(item => (
            <div style={{ marginTop: "3rem" }} className="card">
              <div className="card-top">
                <img onClick={() => onSubmit(item.userId)} src={item.image} alt="sadfas" />
              </div>
              <div className="card-bottom"></div>
              {/* <h4>{item.like}</h4> */}
            </div>
          ))}
        </Slider>

      </Container>
    </div>
  )
}
