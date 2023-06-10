import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { CanteenApi } from '../Helpers/Service/CanteenService';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const RegisterComponent = () => {

    let navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const register = () => {
        if(username.trim() === '' || password.trim() === '' || email.trim() === '' || confirmPassword.trim() === ''){
            toast.warning('Completati fiecare camp!');
        }
        else if(username.length < 6){
            toast.warning('Numele de utilizator trebuie sa aibe cel putin 6 caractere!');
        }
        else if(!email.match(mailformat)){
            toast.warning('Email-ul este invalid!');
        }
        else if(password.length < 6){
            toast.warning('Parola trebuie sa aibe cel putin 6 caractere!');
        }
        else if(password !== confirmPassword){
            toast.warning('Parolele difera!')
        }
        else{
            CanteenApi.Register(username, email, password, 0, 1)
            .then(() => {
                navigate('/login');
            })
            .catch(() => toast.error('S-a produs o eroare!'));
        }
    }


  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '91vh'}}>
         <div style={{width: '100%', maxWidth: 450, borderRadius: 10, padding: 50, paddingBottom: 100, paddingTop: 50, marginBottom: 40, backgroundColor: '#fff', boxShadow: '0px 10px 20px 10px #CFE1F2', textAlign: 'center'}}>
            <h2 style={{color: '#01135d', marginBottom: 50}}>Register</h2>
            <div>
                <div style={{marginBottom: 24, textAlign: 'left', width: 410}}>
                    <label style={{display: 'inline-block', marginBottom: '0.5rem', color: '#888888'}} htmlFor="register-username">Username</label>
                    <input 
                        onChange={e => {
                            setUsername(e.target.value);
                        }}
                        style={{width: '100%', outline: 'none', padding: '8px 16px', border: '1px solid #e0e6e8', borderRadius: 4, fontSize: '1rem', color: '#7C7C7C', transition: 'box-shadow 0.2s'}} 
                        type="text" 
                        placeholder="username" 
                        id="register-username" 
                    />
                </div>
                <div style={{marginBottom: 24, textAlign: 'left', width: 410}}>
                    <label style={{display: 'inline-block', marginBottom: '0.5rem', color: '#888888'}} htmlFor="register-email">Email</label>
                    <input 
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                        style={{width: '100%', outline: 'none', padding: '8px 16px', border: '1px solid #e0e6e8', borderRadius: 4, fontSize: '1rem', color: '#7C7C7C', transition: 'box-shadow 0.2s'}} 
                        type="text" 
                        placeholder="name@email.com" 
                        id="register-email"
                    />
                </div>
                <div style={{marginBottom: 24, textAlign: 'left', width: 410}}>
                    <label style={{display: 'inline-block', marginBottom: '0.5rem', color: '#888888'}} htmlFor="register-password">Password</label>
                    <input
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                        style={{width: '100%', outline: 'none', padding: '8px 16px', border: '1px solid #e0e6e8', borderRadius: 4, fontSize: '1rem', color: '#7C7C7C', transition: 'box-shadow 0.2s'}} 
                        type="password" 
                        placeholder="Password" 
                        id="register-password"
                    />
                </div>
                <div style={{marginBottom: 24, textAlign: 'left', width: 410}}>
                    <label style={{display: 'inline-block', marginBottom: '0.5rem', color: '#888888'}} htmlFor="register-confirm-password">Confirm Password</label>
                    <input 
                        onChange={e => {
                            setConfirmPassword(e.target.value);
                        }}
                        style={{width: '100%', outline: 'none', padding: '8px 16px', border: '1px solid #e0e6e8', borderRadius: 4, fontSize: '1rem', color: '#7C7C7C', transition: 'box-shadow 0.2s'}} 
                        type="password" 
                        placeholder="Password" 
                        id="register-confirm-password"
                    />
                </div>
                <button 
                    onClick={() => register()}
                    className='Register-loginButton' 
                    style={{height: 40, width: '98%', border: 'none', borderRadius: 5,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', marginBottom: 20, marginTop: 24}}
                >Sign up</button>
            </div>
            <span>Already have an account?
                <span className='link' style={{marginLeft: 5, color: '#0074cc', cursor: 'pointer'}} onClick={() => navigate('/login')}>Log in</span>
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