import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

export const LoadingComponent = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column', position: 'absolute', top: '45%', left: '48%', justifyContent: 'center', alignItems: 'center'}}>
        <CircularProgress style={{height: 60, width: 60}}/>
        <h3 style={{color: '#1976d2'}}>Loading</h3>
    </div>
  )
}