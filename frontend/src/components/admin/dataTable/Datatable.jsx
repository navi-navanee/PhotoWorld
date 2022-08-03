import React, { useEffect } from 'react'
import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { blockusers, fetchUser, selectAllUser, userBlock,reset } from '../../../features/admin/userData/userSlice';

import Switch from '@mui/material/Switch';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Datatable = () => {
  const dispatch = useDispatch()
  const { data } = useSelector(selectAllUser)
  const  modified  = useSelector(userBlock)
  useEffect(()=>{
    console.log("im modiiii",modified);
    if(modified){
      toast.success("User Status Changed")
      dispatch(fetchUser())
      dispatch(reset())
    }
  },[modified,dispatch])

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])

  const handleBlock = async (data) => {
    console.log("im changeee",data);
    dispatch(blockusers(data));
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    { field: 'name', headerName: 'First name', width: 250 },
    { field: 'email', headerName: 'email', width: 250 },
    {
      field: 'statuslabel', headerName: 'Status', width: 200,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>STATUS</div>
        )
      }

    },

    {
      field: 'status', headerName: 'BLOCK / UNBLOCK', width: 200,
      renderCell: (params) => {
        return (
          <div className={''}>
            <Switch  checked={params.row.status}
            onChange={(e) => handleBlock(params.id, e.target.checked)}
            />
          </div>
          
        )
      }
    },

    // {
    //   field: 'action', headerName: 'Action', width: 180, renderCell: () => {
    //     return (
    //       <div className='cellAction'>
    //         <div className="viewButton" onClick={heloo}>View</div>
    //         <div className="deleteButton">Delete</div>
    //       </div>
    //     )
    //   }
    // },

  ];

  const rows = data ? data : ""

  const heloo = () => {
    alert("heii")
  }

  return (
    <div className='datatable'>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        getRowId={(rows) => rows._id}
        rowsPerPageOptions={[10]}
      />
    </div>
  )
}

export default Datatable