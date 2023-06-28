import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CanteenApi } from '../Helpers/Service/CanteenService';
import Alert from '@mui/material/Alert';
import { AuthContext, SelectedInstancesContext, ManagerSelectedInstancesContext } from '../App';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const LoginComponent = () => {

    let navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const selectedInstancesContext = useContext(SelectedInstancesContext);
    const managerSelectedInstancesContext = useContext(ManagerSelectedInstancesContext);

    const [userNameOrEmail, setUserNameOrEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = () => {
        if(userNameOrEmail.trim() === '' || password.trim() === ''){
            toast.warning('Completati fiecare camp!');
        }else{
            CanteenApi.Login(userNameOrEmail, password).then(res => {
                localStorage.setItem('user', JSON.stringify({ token: res.token, role: res.role, id: res.userId, canteenId: res.canteenId, expiry: new Date().setHours(new Date().getHours() + 12) }));
                authContext.setIsLogedIn(true);
                authContext.setUserRole(res.role);
                if(res.role === 'Admin'){
                    navigate('/admin');
                }else if(res.role === 'Manager'){
                    managerSelectedInstancesContext.setManagerSelectedCanteenId(res.canteenId);
                    navigate('/manager'); 
                }else{
                    selectedInstancesContext.setSelectedCanteenId(res.canteenId);
                    navigate('/');
                } 
            })
            .catch(error => {
                toast.error('S-a produs o eroare!');
            })
        }
    }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '91vh'}}>
         <div style={{width: '100%', maxWidth: 450, borderRadius: 10, padding: 50, paddingBottom: 100, paddingTop: 50, marginBottom: 40, backgroundColor: '#fff', boxShadow: '0px 10px 20px 10px #CFE1F2', textAlign: 'center'}}>
            <h2 style={{color: '#01135d', marginBottom: 50}}>Autentificati-va</h2>
            <div>
                <div style={{marginBottom: 24, textAlign: 'left', width: 410}}>
                    <label style={{display: 'inline-block', marginBottom: '0.5rem', color: '#888888'}} htmlFor="login-email">Nume utilizator / Email </label>
                    <input 
                        onChange={e => {
                            setUserNameOrEmail(e.target.value); 
                        }}
                        style={{width: '100%', outline: 'none', padding: '8px 16px', border: '1px solid #e0e6e8', borderRadius: 4, fontSize: '1rem', color: '#7C7C7C', transition: 'box-shadow 0.2s'}} 
                        type="text" 
                        placeholder="Nume utilizator / nume@email.com" 
                        id="login-email" 
                    />
                </div>
                <div style={{marginBottom: 24, textAlign: 'left', width: 410}}>
                    <label style={{display: 'inline-block', marginBottom: '0.5rem', color: '#888888'}} htmlFor="login-password">Parola</label>
                    <input 
                        onChange={e => {
                            setPassword(e.target.value); 
                        }}
                        style={{width: '100%', outline: 'none', padding: '8px 16px', border: '1px solid #e0e6e8', borderRadius: 4, fontSize: '1rem', color: '#7C7C7C', transition: 'box-shadow 0.2s'}} 
                        type="password" 
                        placeholder="Parola" 
                        id="login-password"
                    />
                </div>
                <button 
                    className='Login-loginButton' 
                    style={{height: 40, width: '98%', border: 'none', borderRadius: 5,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', marginBottom: 20, marginTop: 24}}
                    onClick={() => login()}
                >Autentificati-va</button>
            </div>
            <span>Nu aveti cont?
                <span className='link' style={{marginLeft: 5, color: '#0074cc', cursor: 'pointer'}} onClick={() => navigate('/register')}>Inregistrati-va</span>
            </span>
        </div>

        <ToastContainer  
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            style={{marginTop: 50}}
        />

    </div>
  )
}