import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useContext } from 'react';
import { NotFound } from './NotFound';
import { UserContext } from '../context/UserContext';
import { useState } from 'react';
import { useEffect } from 'react';
import { deleteSelectedPosts, readPostsRows } from '../utility/crudUtility';
import { Loader } from '../components/Loader';

const columns = [
  { field: 'id', headerName: 'post id', width: 250 },
  {
    field: 'title',
    headerName: 'post title',
    width: 150,
    //editable: true,
  },
  {
    field: 'author',
    headerName: 'author',
    width: 150,
    //editable: true,
  },
  {
    field: 'userId',
    headerName: 'Author\'s id',
    //type: 'number',
    width: 350,
    //editable: true,
  },
 /* {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },*/
];



export const Admin=()=> {
  const [rows,setRows]=useState([])
  const [selection,setSelection]=useState([])
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    readPostsRows(setRows)

  },[])



  const  {role}=useContext(UserContext)
  if(role!='admin')
      return <NotFound />
      console.log(selection)

  const handleDelete=async ()=>{
    setLoading(true)
    await deleteSelectedPosts(selection)
    setLoading(false)
  }




  return (
    <div className='container'>
    <Box sx={{ height: 400, width: '100%' }}>
     {rows && <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={(id)=>setSelection(id)}
      />}
    </Box>
    <button className='btn btn-danger m-2' onClick={handleDelete}>
          Delete post(s)
    </button>
    {loading && <Loader />}
    </div>

  );
}
