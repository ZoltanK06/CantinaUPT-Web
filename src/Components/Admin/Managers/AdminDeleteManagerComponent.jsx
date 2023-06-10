import React, {useEffect, useRef, useState} from 'react'
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import Select from 'react-select'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { CanteenApi } from '../../../Helpers/Service/CanteenService';
import { LoadingComponent } from '../../LoadingComponent';

export const AdminDeleteManagerComponent = () => {

    const [loading, setLoading] = useState(true);
    const [selectedManagerId, setSelectedManagerId] = useState(null);
    const managerIdRef = useRef(null);

    const [managers, setManagers] = useState([]);

    const deleteUser = (userId) => {
        if(selectedManagerId !== null){
            CanteenApi.DeleteUser(userId)
                .then(() => toast.success('Manager sters cu succes!'))
                .then(() => {
                    setSelectedManagerId(null);
                    managerIdRef.current = null;
                })
                .then(() => {
                    CanteenApi.GetAllManagers()
                        .then(res => setManagers(res.map(e => {return {value: e.id, label: e.email}})))
                        .then(() => setLoading(false))
                        .catch(() => toast.error('S-a produs o eroare!'));
                    })
            .catch(() => toast.error('S-a produs o eroare!'));
        }
        else{
            toast.warning('Alegeti un manager!');
        }
        
    }

    useEffect(() => {
        CanteenApi.GetAllManagers()
        .then(res => setManagers(res.map(e => {return {value: e.id, label: e.email}})))
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
                <h1>Stergeti un manager existent</h1>
                <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                        <label><b>Selectati un manager</b></label>
                        <Select 
                            value={managerIdRef.current === null ? null : managers.find(e => e.id === managerIdRef.current)} 
                            options={managers} 
                            styles={colourStyles} 
                            onChange={e => {
                                setSelectedManagerId(e.value)
                                managerIdRef.current = e.value;
                            }}/>
                    </div>

                    <div
                        style={{height: 40, width: 400, border: 'none', padding: '5px 10px', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 24}}
                        className='DeleteManager-deleteButton' 
                        onClick={() => deleteUser(selectedManagerId)}
                    >
                        <text><b>Stergeti</b></text> 
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
