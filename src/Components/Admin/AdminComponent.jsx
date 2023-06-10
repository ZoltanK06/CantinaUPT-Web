import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { MdFoodBank } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

export const AdminComponent = () => {

    let navigate = useNavigate();

  return (
    <div style={{height: '91vh', display: 'flex', paddingLeft: '20%', paddingRight: '20%', alignItems: 'center', justifyContent: 'space-between', gap: 64}}>
        <div style={{width: 450, display: 'flex', padding: '50px 0px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 75, boxShadow: '0px 5px 20px 25px #CFE1F2', borderRadius: 20}}>
            <MdFoodBank style={{height: 100, width: 100, color: '#01135d'}}/>
            <text style={{fontSize: 24, fontWeight: 'bold', color: '#01135d'}}>Cantine</text>
            <button 
                className='Landing-continueButton' 
                style={{height: 50, width: 300, border: 'none', borderRadius: 10, backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer'}}
                onClick={() => {
                    navigate('/admin/canteen');
                }}
            >Continua</button>
        </div>
        <div style={{width: 450, display: 'flex', padding: '50px 0px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 75, boxShadow: '0px 5px 20px 25px #CFE1F2', borderRadius: 20}}>
            <FaUserCircle style={{height: 100, width: 100, color: '#01135d'}}/>
            <text style={{fontSize: 24, fontWeight: 'bold', color: '#01135d'}}>Manageri</text>
            <button 
                className='Landing-continueButton' 
                style={{height: 50, width: 300, border: 'none', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer'}}
                onClick={() => {
                    navigate('/admin/manager');
                }}
            >Continua</button>
        </div>
    </div>
  )
}