import React from 'react'

export const LoginComponent = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '91vh'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: 550, width: 450, borderRadius: 20, boxShadow: '0px 10px 20px 10px #CFE1F2'}}>
            <button style={{height: 50, width: 300, border: 'none', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', marginTop: 50}}>Sunt student</button>
        </div>
    </div>
  )
}