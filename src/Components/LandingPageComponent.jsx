import React from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { SelectedCanteenContext } from '../App';

export const LandingPageComponent = () => {

    let navigate = useNavigate();
    const selectedCanteenContext = useContext(SelectedCanteenContext);

  return (
    <div style={{height: '91vh', display: 'flex', paddingLeft: '20%', paddingRight: '20%', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{width: 450, height: 500, paddingBottom: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0px 5px 20px 25px #CFE1F2', borderRadius: 20}}>
            <img src='https://www.upt.ro/img/22020Cantina-studenteasca.jpg' alt='' style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, width: 450, height: '50%' }} />
            <text style={{fontSize: 24, fontWeight: 'bold', color: '#01135d'}}>Cantina studenteasca</text>
            <button 
                className='Landing-continueButton' 
                style={{height: 50, width: 300, border: 'none', borderRadius: 10, backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer'}}
                onClick={() => {
                    selectedCanteenContext.setSelectedCanteenId(1);
                    navigate('/canteenId=1/menu');
                }}
            >Continua</button>
        </div>
        <div style={{width: 450, height: 500, paddingBottom: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0px 5px 20px 25px #CFE1F2', borderRadius: 20}}>
            <img src='https://www.upt.ro/img/23197Fast-food1.jpg' alt='' style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, width: 450, height: '50%'  }} />
            <text style={{fontSize: 24, fontWeight: 'bold', color: '#01135d'}}>Fast food 1MV</text>
            <button 
                className='Landing-continueButton' 
                style={{height: 50, width: 300, border: 'none', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer'}}
                onClick={() => {
                    selectedCanteenContext.setSelectedCanteenId(2);
                    navigate('/canteenId=2/menu');
                }}
            >Continua</button>
        </div>
    </div>
  )
}