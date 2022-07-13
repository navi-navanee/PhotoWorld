import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Photographerlogin from '../../../components/photographer/pLogin/Photographerlogin'


const Plogin = () => {

  const navigate=useNavigate()

  const {photographer} = useSelector((state)=>state.photographerauth)
  
  useEffect(()=>{
    if(!photographer){
      navigate('/photographer')
    }
  },[photographer,navigate])

  return (
    <div>
      <Photographerlogin/>
    </div>
  )
}

export default Plogin