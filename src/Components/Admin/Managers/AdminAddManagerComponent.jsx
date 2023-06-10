import React, {useRef, useState} from 'react'
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import Select from 'react-select'
import { CanteenApi } from '../../../Helpers/Service/CanteenService';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export const AdminAddManagerComponent = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [canteenId, setCanteenId] = useState(null);
    const canteenIdRef = useRef(null);

    const options = [
        { value: 2, label: 'Cantina Studenteasca' },
        { value: 1, label: 'Cantina 1MV' }
      ]

    const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white', borderRadius: 12, border: '2px solid #01135d', height: 50, color: '#01135d' }),
    };

    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const register = () => {
        if(username.trim() === '' || password.trim() === '' || email.trim() === '' || confirmPassword.trim() === '' || canteenId === null){
            toast.warning('Completati fiecare camp!')
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
            CanteenApi.Register(username, email, password, canteenId, 3)
            .then(() => {
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setCanteenId(0);
                canteenIdRef.current = null;
                toast.success('Manager nou adaugat cu succes!')
            })
            .catch(() => {
                toast.error('S-a produs o eroare!')
            })
        }
    }

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 0, paddingBottom: 50, gap: 50, color: '#01135d'}}>
        <h1>Adaugati un manager nou</h1>
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>

            <div style={{display: 'flex', flexDirection: 'column', gap: 8, width: 424}}>
                <label><b>Selectati o cantina</b></label>
                <Select 
                    options={options} 
                    styles={colourStyles} 
                    value={canteenIdRef.current === null ? null : options.find(e => e.value === canteenIdRef.current)}
                    onChange={e => {
                        setCanteenId(e.value)
                        canteenIdRef.current = e.value;
                    }}/>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: 8, width: 424}}>
                <label><b>Nume utilizator</b></label>
                <input 
                    value={username}
                    onChange={e => {
                        setUsername(e.target.value)
                    }}
                    type='text'
                    style={{height: 40, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d'}}  
                ></input>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 8, width: 424}}>
                <label><b>Adresa email</b></label>
                <input 
                    value={email}    
                    onChange={e => {
                        setEmail(e.target.value)
                    }}
                    type='email'
                    style={{height: 40, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d'}}    
                ></input>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: 8, marginBottom: -30, width: 424}}>
                <label><b>Parola</b></label>
                <input 
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value)
                    }}
                    type={showPassword === false ? 'password' : 'text'}
                    style={{height: 40, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d'}}    
                ></input>
                {showPassword === false && <FaEye style={{position: 'relative', left: 380, bottom: 48, height: 25, width: 25, cursor: 'pointer'}} onClick={() => setShowPassword(true)}/> }
                {showPassword === true && <FaEyeSlash style={{position: 'relative', left: 380, bottom: 48, height: 25, width: 25, cursor: 'pointer'}} onClick={() => setShowPassword(false)}/> }
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: 8, marginBottom: -30, width: 424}}>
                <label><b>Confirmare parola</b></label>
                <input 
                    value={confirmPassword}
                    onChange={e => {
                        setConfirmPassword(e.target.value)
                    }}
                    type={showConfirmPassword === false ? 'password' : 'text'}
                    style={{height: 40, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d'}}    
                ></input>
                {showConfirmPassword === false && <FaEye style={{position: 'relative', left: 380, bottom: 48, height: 25, width: 25, cursor: 'pointer'}} onClick={() => setShowConfirmPassword(true)}/> }
                {showConfirmPassword === true && <FaEyeSlash style={{position: 'relative', left: 380, bottom: 48, height: 25, width: 25, cursor: 'pointer'}} onClick={() => setShowConfirmPassword(false)}/> }
            </div>
            <div
                style={{height: 40, width: 404, border: 'none', padding: '5px 10px', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 24}}
                className='AddManager-addButton' 
                onClick={() => register()}
            >
                <text><b>Adaugati</b></text> 
            </div>
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