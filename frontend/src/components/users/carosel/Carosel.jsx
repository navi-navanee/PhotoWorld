import React from 'react'

import './carosel.scss'

import SearchIcon from '@mui/icons-material/Search';




const Carosel = () => {

  const onSubmit=()=>{
    console.log("helooo");
  }
  return (
     <div className="content">
       <h1>Search photographer.....</h1>
       <div className="search">
            <input type="text" placeholder='search' style={{color:'white'}} />
            <SearchIcon onClick={onSubmit} style={{color:'red'}}/>
           </div>

    </div>
  )
}

export default Carosel