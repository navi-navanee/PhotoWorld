import { Switch } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { blockPhotographer, fetchPhotographer, isloading, photographerBlock, photographerloading, photographerreset, selectAllPhotographer } from '../../../features/admin/userData/userSlice'
import Spinner from '../../spinner/Spinner'
import './photo.scss'

const Photographer = () => {



  const dispatch = useDispatch()
  const { data } = useSelector(selectAllPhotographer)
  const  modified  = useSelector(photographerBlock)
  const loading =useSelector(isloading)
  const ploading =useSelector(photographerloading)

  console.log("fuckk",ploading);


  useEffect(()=>{
    if(modified){
      toast.success("User Status Changed")
      dispatch(fetchPhotographer())
      dispatch(photographerreset())
    }
  },[modified,dispatch])

  useEffect(() => {
    dispatch(fetchPhotographer())
  }, [dispatch])

  const handleBlock = async (data) => {
    dispatch(blockPhotographer(data));
  };

  if(ploading){
    <Spinner/>
  }

  //...................................................

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
  ];


  const rows = data ? data : ""

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

export default Photographer