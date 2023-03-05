import React from 'react'
import uptLogo from '../Assets/LOGO_UPT.jpg'
import {useNavigate} from 'react-router-dom'
import { FaShoppingCart, FaHome, FaFileAlt } from 'react-icons/fa'

export const NavbarComponent = () => {
    let navigate = useNavigate();

  return (
    <div style={{height: 80, paddingRight: 40, backgroundColor: '#01135d', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <img src={uptLogo} alt='' style={{height: 80, cursor: 'pointer'}} onClick={() => navigate('/')} />
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '22%', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold'}}>
            <div style={{cursor: 'pointer', height: 40, alignItems: 'center', display: 'flex', gap: 7}} 
                onClick={() => navigate('/')}
            >
                <text>Acasa</text>
                <FaHome style={{height: 20, width: 20}}/>
            </div>
            <div style={{cursor: 'pointer', height: 40, alignItems: 'center', display: 'flex', gap: 7}} 
                onClick={() => navigate('/cart')}
            >
                <text>Cos</text>
                <FaShoppingCart style={{height: 20, width: 20}}/>
            </div>
            <div style={{cursor: 'pointer', height: 40, alignItems: 'center', display: 'flex', gap: 7}} 
                onClick={() => navigate('/orders')}
            >
                <text>Comenzi</text>
                <FaFileAlt style={{height: 20, width: 20}}/>
            </div>
            <button 
                className="Navbar-loginButton" 
                style={{height: 35, borderRadius: 7, backgroundColor: '#9BADFD', border: 'none', paddingLeft: 20, paddingRight: 20, color: '#01135d', cursor: 'pointer'}}
                onClick={() => navigate('/login')}
            >
                <b>Login</b>
            </button>
        </div>
    </div>
  )
}