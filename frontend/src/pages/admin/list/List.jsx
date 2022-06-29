import React from 'react'
import Navbar from '../../../components/admin/navbar/Navbar'
import Sidebar from '../../../components/admin/sidebar/Sidebar'
import Datatable from '../../../components/dataTable/Datatable'
import './list.scss'

const List = () => {
  return (
    <div className='list'>
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default List