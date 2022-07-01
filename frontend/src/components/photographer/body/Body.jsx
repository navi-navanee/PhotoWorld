import React from 'react'
import './body.scss'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Container } from '@mui/system'
import image1 from '../../../images/1.jpg'
import image2 from '../../../images/2.jpg'
import image3 from '../../../images/3.jpg'
import image4 from '../../../images/4.jpg'
import image5 from '../../../images/5.jpg'

const data=[image1,image2,image3,image4,image5]

const Body = () => {

  return (
    <Container>
    <h1>Wedding Photos</h1>
    <Slider slidesToShow={4} 
    itemPadding={[10, 50]}
    >
      {
        data.map((item) => (
          <Card item={item}/>
        ))
      }
     
    </Slider>
    </Container>
  )
}

const Card= ({item}) => {
  return(
    <div className='' style={{textAlign:'center'}}>
        <img src={item} alt="" style={{width:"100%",height:"150px"}}/>
        <p>Likes 10❤️</p>
        <p>Dreamer</p>
    
    </div>
  )
}

export default Body