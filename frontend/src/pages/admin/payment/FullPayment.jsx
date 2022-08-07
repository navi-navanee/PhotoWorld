import React from 'react'
import Payment from '../../../components/admin/fullPayment/Payment'
import Navbar from '../../../components/admin/navbar/Navbar'
import Sidebar from '../../../components/admin/sidebar/Sidebar'
import '../list/list.scss'
const FullPayment = () => {
  return (
    <div>
          <div className='list'>
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
       <Payment/>
      </div>
    </div>
    </div>
  )
}

export default FullPayment