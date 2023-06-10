import React from 'react'
import { RiEditCircleFill, RiAddCircleFill, RiDeleteBin5Fill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

export const AdminCanteenComponent = () => {
    
    let navigate = useNavigate();

  return (
    <div style={{height: '91vh', display: 'flex', paddingLeft: '10%', paddingRight: '10%', alignItems: 'center', justifyContent: 'space-between', gap: 64}}>
        <div style={{width: 400, display: 'flex', padding: '50px 0px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 75, boxShadow: '0px 5px 20px 25px #CFE1F2', borderRadius: 20}}>
            <RiAddCircleFill style={{height: 100, width: 100, color: '#01135d'}}/>
            <text style={{fontSize: 24, fontWeight: 'bold', color: '#01135d'}}>Adaugati cantina noua</text>
            <button 
                className='Landing-continueButton' 
                style={{height: 50, width: 300, border: 'none', borderRadius: 10, backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer'}}
                onClick={() => {
                    navigate('/admin/canteen/add');
                }}
            >Continua</button>
        </div>
        <div style={{width: 400, display: 'flex', padding: '50px 0px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 75, boxShadow: '0px 5px 20px 25px #CFE1F2', borderRadius: 20}}>
            <RiEditCircleFill style={{height: 100, width: 100, color: '#01135d'}}/>
            <text style={{fontSize: 24, fontWeight: 'bold', color: '#01135d'}}>Editati cantina existenta</text>
            <button 
                className='Landing-continueButton' 
                style={{height: 50, width: 300, border: 'none', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer'}}
                onClick={() => {
                    navigate('/admin/canteen/edit');
                }}
            >Continua</button>
        </div>
        <div style={{width: 400, display: 'flex', padding: '50px 0px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 75, boxShadow: '0px 5px 20px 25px #CFE1F2', borderRadius: 20}}>
            <RiDeleteBin5Fill style={{height: 100, width: 100, color: '#01135d'}}/>
            <text style={{fontSize: 24, fontWeight: 'bold', color: '#01135d'}}>Stergeti cantina existenta</text>
            <button 
                className='Landing-continueButton' 
                style={{height: 50, width: 300, border: 'none', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer'}}
                onClick={() => {
                    navigate('/admin/canteen/delete');
                }}
            >Continua</button>
        </div>
    </div>
  )
}
