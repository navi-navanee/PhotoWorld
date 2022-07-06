import { Button } from '@mui/material'
import { Container } from '@mui/system'
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import React from 'react'
import './about.scss'


export const About = () => {



    return (
        <Container>
            <div className='about'>
                <div className='overview'>
                    <h1>Overview</h1>
                    <p>We are a professional photography services company based in Chennai . We have been running a professional photography business for 7 years, specializing in Reception, Theme Wedding, Kashmiri Wedding, Brahmin Wedding, Jain Wedding, Punjabi Wedding, Rajasthani Wedding, Bengali Wedding, Muslim Wedding, Indian Wedding, Christian Wedding, North Indian Wedding, Pre-wedding Shoots, Bridal Portraits, Candid Wedding, South Indian Wedding, Concept Wedding, Couple Portraits, Engagement, Tamil Wedding, Hindu Wedding, Gujarati Wedding, Destination Wedding, Contemporary Wedding , Marwadi Wedding, Wedding, Birthday, New Born, Kindergarten, Kids Portraits, Graduation Ceremony, School Events, Babies & Kids, Show & Pageant, Model Portfolio, Celebrity & Glamour, Portraits, Fashion & Portfolio, Convocation, Housewarming, Maternity, Anniversary, Special Occasion, Concerts, Expo/Exhibitions, Campaigns, Team Building Event, Conferences and Corporate Events photography. We undertake customized photography requirements. Some of our products and services include HD Videos, Montage, T-Shirt, Shortfilms, Enlargement, Cinematography, Promo Videos, Calendar, Documentary, Frames, CD / DVD, Poster, Brochure, Lamination, Photobook, Live Streaming, Blueray Disc, Coffee Table Book, Coffee Mug and HD Highlights. We provide services in Tamil Nadu, All Over India and All Over World. We are proficient in Tamil, Telugu, English, Hindi and Malayalam.

                    </p>
                </div>

                <div className='language'>

                    <h1>Language known</h1>
                    <Button variant="outlined" color="error">
                        Malayalm
                    </Button>

                </div>

                <div className='service'>
                    <h1>Services</h1>
                    <Button variant="outlined" color="error">
                        Wedding
                    </Button>
                    <Button variant="outlined" color="error">
                        cinematography
                    </Button>
                </div>
                <div>
                    <h1>Booking dates</h1>
                    <DatePicker
                        multiple
                        plugins={[
                            <DatePanel />
                         
                        ]}
                    />
                </div>
            </div>
        </Container>
       

    )
}
