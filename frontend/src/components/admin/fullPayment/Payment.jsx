
import { DataGrid } from '@mui/x-data-grid'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPayment, PaymentData, PaymentDataisloading, } from '../../../features/admin/userData/userSlice'
import Spinner from '../../spinner/Spinner'

const Payment = () => {

    const dispatch = useDispatch()
    
    const  {data}  = useSelector(PaymentData)
    const loading =useSelector(PaymentDataisloading)
    
    console.log("im the dataaa....",data);
    
    useEffect(() => {
        console.log("im worked");
        dispatch(fetchPayment())
      }, [dispatch])
    

    if(loading){
        <Spinner/>
      }
//............................

    const columns = [
        { field: '_id', headerName: 'PAYMENT_ID', width: 300 },
        { field: 'email', headerName: 'EMAIL', width: 300 },
        { field: 'createdAt', headerName: 'JOINED_DATE', width: 300 ,
    renderCell:(params) => {
        return (
            <div>{moment(params.createdAt).format(("MMM Do YY"))}</div>
        )
    }
    
    },
        {
          field: 'statuslabel', headerName: 'PAYMENT_METHODE', width: 300,
          renderCell: (params) => {
            return (
              <div>RAZORPAY</div>
            )
          }
    
        },
      ];
    
    
      const rows = data ? data : ""
  return (
    <div>
         <div className='datatable'>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        getRowId={(rows) => rows._id}
        rowsPerPageOptions={[10]}
      />
    </div>
    </div>
  )
}

export default Payment