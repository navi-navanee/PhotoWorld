import React from 'react'
import './body.scss'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { data } from './data';
console.log(data);
export const Body = () => {
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
      };
  return (
      <div className='App'>
        <Slider {...settings}>
        {data.map(item => (
        <div className="card">
            <div className="card-top">
                <img src={item.linkImg} alt="sadfas" />
                <h1>{item.photographer}</h1>
            </div>
            <div className="card-bottom"></div>
            <h4>{item.like}</h4>
        </div>
        ))}
    </Slider>
    </div>
  )
}
