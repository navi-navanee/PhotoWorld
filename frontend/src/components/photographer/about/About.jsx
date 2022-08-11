import { Button } from '@mui/material'
import { Container } from '@mui/system'
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import React, { useState } from 'react'
import './about.scss'
import { useDispatch, useSelector } from 'react-redux'
import { photographerDetails } from '../../../features/photographer/details/photographerSlice'

export const About = () => {
    const photographer = JSON.parse(localStorage.getItem('photographer'))
    const  dispatch =useDispatch()
    
    const data =useSelector(photographerDetails)
    const category =data.category
    return (
        <Container>
            <div className='about'>
            <div className='address'>
                    <h1>Address</h1>
                    <p> {data.phonenumber}</p>
                    <p> {data.address}</p>
                    <p> {data.city}</p>
                    <p> {data.state}</p>
                </div>
                <div className='overview'>
                    <h1>Overview</h1>
                    <p>
                        {data.overview}
                    </p>
                </div>
                
                <div className='service'>
                    <h1>Services</h1>
                    {category && category.map((item) =>(
                        <Button variant="outlined" color="error">
                        {item.label}
                    </Button>
                    ))}
                    
                </div>
                {/* <div>
                    <h1>Booking dates</h1>
                    <DatePicker
                     value={value}
                     onChange={setValue}
                        multiple
                        plugins={[
                            <DatePanel />
                         
                        ]}
                    />
                </div> */}
            </div>
        </Container>
       

    )
}
