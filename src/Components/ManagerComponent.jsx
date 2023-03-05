import React from 'react'
import { useNavigate } from 'react-router-dom';
import { GiMeal, GiCookingPot } from 'react-icons/gi'

export const ManagerComponent = () => {
  let navigate = useNavigate();

  return (
    <div style={{height: '91vh', display: 'flex', paddingLeft: '20%', paddingRight: '20%', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{width: 450, display: 'flex', padding: '50px 0px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 75, boxShadow: '0px 5px 20px 25px #CFE1F2', borderRadius: 20}}>
            <GiMeal style={{height: 100, width: 100, color: '#01135d'}}/>
            <text style={{fontSize: 24, fontWeight: 'bold', color: '#01135d'}}>Lista mancarurilor</text>
            <button 
                className='Landing-continueButton' 
                style={{height: 50, width: 300, border: 'none', borderRadius: 10, backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer'}}
                onClick={() => {
                    navigate('/manager/meal-types');
                }}
            >Continua</button>
        </div>
        <div style={{width: 450, display: 'flex', padding: '50px 0px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 75, boxShadow: '0px 5px 20px 25px #CFE1F2', borderRadius: 20}}>
            <GiCookingPot style={{height: 100, width: 100, color: '#01135d'}}/>
            <text style={{fontSize: 24, fontWeight: 'bold', color: '#01135d'}}>Adauga mancare noua</text>
            <button 
                className='Landing-continueButton' 
                style={{height: 50, width: 300, border: 'none', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer'}}
                onClick={() => {
                    navigate('/manager/add-meal');
                }}
            >Continua</button>
        </div>
    </div>
  )
}