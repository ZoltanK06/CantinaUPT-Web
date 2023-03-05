import React, {useState} from 'react'
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import Select from 'react-select'

export const AdminEditManagerComponent = () => {
    const [selectedManagerId, setSelectedManagerId] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const options = [
        { value: 1, label: 'manager1@gmail.com' },
        { value: 2, label: 'manager2@gmail.com' },
        { value: 3, label: 'manager3@gmail.com' },
        { value: 4, label: 'manager4@gmail.com' }
      ]

    const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white', borderRadius: 12, border: '2px solid #01135d', height: 50, color: '#01135d' }),
    };

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 75, gap: 50, color: '#01135d'}}>
        <h1>Modificati detaliile unui manager existent</h1>
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>

            <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                <label><b>Selectati un manager</b></label>
                <Select options={options} styles={colourStyles} onChange={e => setSelectedManagerId(e.value)}/>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                <label><b>Nume utilizator</b></label>
                <input 
                    type='text'
                    style={{height: 40, width: 400, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d'}}  
                ></input>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                <label><b>Adresa email</b></label>
                <input 
                    type='email'
                    style={{height: 40, width: 400, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d'}}    
                ></input>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: 8, marginBottom: -30}}>
                <label><b>Parola</b></label>
                <input 
                    type={showPassword === false ? 'password' : 'text'}
                    style={{height: 40, width: 400, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d'}}    
                ></input>
                {showPassword === false && <FaEye style={{position: 'relative', left: 380, bottom: 48, height: 25, width: 25, cursor: 'pointer'}} onClick={() => setShowPassword(true)}/> }
                {showPassword === true && <FaEyeSlash style={{position: 'relative', left: 380, bottom: 48, height: 25, width: 25, cursor: 'pointer'}} onClick={() => setShowPassword(false)}/> }
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: 8, marginBottom: -30}}>
                <label><b>Confirmare parola</b></label>
                <input 
                    type={showConfirmPassword === false ? 'password' : 'text'}
                    style={{height: 40, width: 400, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d'}}    
                ></input>
                {showConfirmPassword === false && <FaEye style={{position: 'relative', left: 380, bottom: 48, height: 25, width: 25, cursor: 'pointer'}} onClick={() => setShowConfirmPassword(true)}/> }
                {showConfirmPassword === true && <FaEyeSlash style={{position: 'relative', left: 380, bottom: 48, height: 25, width: 25, cursor: 'pointer'}} onClick={() => setShowConfirmPassword(false)}/> }
            </div>

            <div
                style={{height: 40, width: 400, border: 'none', padding: '5px 10px', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 24}}
                className='EditManager-editButton' 
            >
                <text><b>Finalizati</b></text> 
            </div>
        </div>
    </div>
  )
}