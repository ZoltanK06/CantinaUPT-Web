import React, {useState, useEffect, useRef} from 'react'
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import Select from 'react-select'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { CanteenApi } from '../../../Helpers/Service/CanteenService';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { LoadingComponent } from '../../LoadingComponent';

export const AdminEditManagerComponent = () => {

    const [loading, setLoading] = useState(true);
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [keepOldPassword, setKeepOldPassword] = useState(true);

    const [managers, setManagers] = useState([]);
    const [managerOptions, setManagerOptions] = useState([]);

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedManagerId, setSelectedManagerId] = useState(null);
    const [selectedCanteenId, setSelectedCanteenId] = useState(null);
    const managerIdRef = useRef(null);
    const canteenIdRef = useRef(null);

    const canteenOptions = [
        { value: 2, label: 'Cantina Studenteasca' },
        { value: 1, label: 'Cantina 1MV' }
      ]

    const selectManager = (managerId) => {
        let selectedManager = managers.find(e => e.id === managerId);
        
        setSelectedManagerId(managerId);
        managerIdRef.current = managerId;
        let canteenId = selectedManager.canteen.id;
        setSelectedCanteenId(canteenId);
        canteenIdRef.current = canteenId;
        setUserName(selectedManager.username);
        setEmail(selectedManager.email);
        setPassword(selectedManager.password);
        setConfirmPassword(selectedManager.password);
    }

    const selectCanteen = (canteenId) => {
        setSelectedCanteenId(canteenId);
        canteenIdRef.current = canteenId;
    }

    const updateManager = () => {
        setLoading(true);
        if(selectedManagerId !== null){
            let manager;
            if(keepOldPassword || (!keepOldPassword && password.trim() !== '' && password.trim() === confirmPassword.trim())){
                manager = {
                    username: userName,
                    email: email,
                    password: keepOldPassword === true ? null : password,
                    roleId: 3,
                    canteenId: selectedCanteenId
                };
                CanteenApi.UpdateUser(manager)
                    .then(() => {
                        toast.success('Manager editat cu succes!');
                        setSelectedManagerId(null);
                        managerIdRef.current = null;
                        setSelectedCanteenId(null);
                        canteenIdRef.current = null;
                        setUserName('');
                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');
                        setKeepOldPassword(true);
                    })
                    .then(() => {
                        CanteenApi.GetAllManagers()
                            .then(res => {
                                setManagerOptions(res.map(e => {return {value: e.id, label: e.email}}))
                                setManagers(res);
                            })
                            .then(() => setLoading(false))
                            .catch(() => toast.error('S-a produs o eroare!'));})
                    .catch(() => toast.warning('S-a produs o eroare!'));
            }else{
                toast.warning('Asigurati-va ca parolele au fost completate si coincid!');
            }
        }else{
            toast.warning('Selectati un manager!');
        }
    }

    useEffect(() => {
        CanteenApi.GetAllManagers()
        .then(res => {
            setManagerOptions(res.map(e => {return {value: e.id, label: e.email}}))
            setManagers(res);
        })
        .then(() => setLoading(false))
        .catch(() => toast.error('S-a produs o eroare!'));
    }, []);

    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: 'white', borderRadius: 12, border: '2px solid #01135d', height: 50, color: '#01135d' }),
    };

  return (
    <div>
        {loading === true &&
         <LoadingComponent />
        }
        {loading === false &&
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 75, gap: 50, color: '#01135d'}}>
                <h1>Modificati detaliile unui manager existent</h1>
                <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>

                    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                        <label><b>Selectati un manager</b></label>
                        <Select 
                            options={managerOptions} 
                            styles={colourStyles} 
                            value={managerIdRef.current === null ? null : managerOptions.find(e => e.value === managerIdRef.current)}
                            onChange={e => selectManager(e.value)}/>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', gap: 8, width: 424}}>
                        <label><b>Selectati o cantina</b></label>
                        <Select 
                            options={canteenOptions} 
                            styles={colourStyles} 
                            value={canteenIdRef.current === null ? null : canteenOptions.find(e => e.value === canteenIdRef.current)}
                            onChange={e => {
                                selectCanteen(e.value);
                            }}/>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                        <label><b>Nume utilizator</b></label>
                        <input 
                            type='text'
                            style={{height: 40, width: 400, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d'}}  
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                        ></input>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                        <label><b>Adresa email</b></label>
                        <input 
                            type='email'
                            style={{height: 40, width: 400, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d'}} 
                            value={email}
                            onChange={e => setEmail(e.target.value)}   
                        ></input>
                    </div>
                    <div style={{display: 'flex', width: 424, justifyContent: 'flex-start'}}>
                        <FormControlLabel control={<Switch defaultChecked value={keepOldPassword} onChange={e => setKeepOldPassword(e.target.checked)}/>} label="Pastrati parola veche" />
                    </div>
                    
                    {keepOldPassword === false &&
                    <>
                        <div style={{display: 'flex', flexDirection: 'column', gap: 8, marginBottom: -30}}>
                            <label><b>Parola</b></label>
                            <input 
                                type={showPassword === false ? 'password' : 'text'}
                                style={{height: 40, width: 400, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d'}}    
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            ></input>
                            {showPassword === false && <FaEye style={{position: 'relative', left: 380, bottom: 48, height: 25, width: 25, cursor: 'pointer'}} onClick={() => setShowPassword(true)}/> }
                            {showPassword === true && <FaEyeSlash style={{position: 'relative', left: 380, bottom: 48, height: 25, width: 25, cursor: 'pointer'}} onClick={() => setShowPassword(false)}/> }
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', gap: 8, marginBottom: -30}}>
                            <label><b>Confirmare parola</b></label>
                            <input 
                                type={showConfirmPassword === false ? 'password' : 'text'}
                                style={{height: 40, width: 400, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d'}}    
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            ></input>
                            {showConfirmPassword === false && <FaEye style={{position: 'relative', left: 380, bottom: 48, height: 25, width: 25, cursor: 'pointer'}} onClick={() => setShowConfirmPassword(true)}/> }
                            {showConfirmPassword === true && <FaEyeSlash style={{position: 'relative', left: 380, bottom: 48, height: 25, width: 25, cursor: 'pointer'}} onClick={() => setShowConfirmPassword(false)}/> }
                        </div>
                    </>
                    }

                    <div
                        style={{height: 40, width: 400, border: 'none', padding: '5px 10px', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 24}}
                        className='EditManager-editButton' 
                        onClick={() => updateManager()}
                    >
                        <text><b>Finalizati</b></text> 
                    </div>
                </div>
            </div>
    }
    
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