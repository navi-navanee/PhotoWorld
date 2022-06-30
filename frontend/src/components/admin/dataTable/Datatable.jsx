import React, { useEffect } from 'react'
import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { useSelector,useDispatch } from 'react-redux'; 
import { fetchUser, selectAllUser } from '../../../features/admin/userData/userSlice';


const Datatable = () => {
 

  const dispatch = useDispatch()


  const { data }=useSelector(selectAllUser)
 

 
 console.log(data);
  
  
  useEffect(()=>{
    
    dispatch(fetchUser())

  },[dispatch])
  


  const columns = [
    { field: '_id', headerName: 'ID', width: 180 },
    { field: 'name', headerName: 'First name', width: 180 },
    { field: 'email', headerName: 'email', width: 180 },
    { field: 'status', headerName: 'Status', width: 180 ,
    renderCell :(params) => {
      return(
        <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>
      )
    }
    
  },
  
    { field: 'action', headerName: 'Action', width: 180,renderCell :()=> {
      return(
        <div className='cellAction'>
          <div className="viewButton" onClick={heloo}>View</div>
          <div className="deleteButton">Delete</div>
        </div>
      )
    } },

  ];
  
  const rows = data ? data:""

  const heloo = ()=>{
    alert("heii")
  }
 

  return (
    <div className='datatable'>
         <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        getRowId={(rows)=>rows._id}
        rowsPerPageOptions={[10]}
      />
    </div>
  )
}

export default Datatable