import React from 'react'
import Navbar from '../../../components/admin/navbar/Navbar'
import Photographer from '../../../components/admin/photographer/Photographer'
import Sidebar from '../../../components/admin/sidebar/Sidebar'
import '../list/list.scss'
const phtographer = () => {
  return (
    <div>
    <div className='list'>
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
       <Photographer/>
      </div>
    </div>
    </div>
  )
}

export default phtographer