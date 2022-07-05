import { Container, Rating } from '@mui/material'
import './review.scss'
import React from 'react'

const Review = () => {
  return (
    <div>
        <Container>
            <h2>Review</h2>
           <div className='review'>


            <div className='reviews'>
                <div>
                    <h1>Navaneeth</h1>
                    <div>11/02/1999</div>
                </div>
                <div>V felt so happy for choosing shadows for our wedding photography, u guys captured Al our beautiful moments & they made it very difficult for us to select some for a wedding album ??.Words can't describe the professionalism,talent and passion behind </div>
                <div>
                <Rating name="size-medium" defaultValue={2} />
                </div>
            </div>
            
            <div className='reviews'>
                <div>
                    <h1>Navaneeth</h1>
                    <div>11/02/1999</div>
                </div>
                <div>V felt so happy for choosing shadows for our wedding photography, u guys captured Al our beautiful moments & they made it very difficult for us to select some for a wedding album ??.Words can't describe the professionalism,talent and passion behind </div>
                <div>
                <Rating name="size-medium" defaultValue={2} />
                </div>
            </div>


           </div>
        </Container>
    </div>
  )
}

export default Review