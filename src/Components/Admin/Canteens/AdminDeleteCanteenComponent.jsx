import React, {useEffect, useRef, useState} from 'react'
import Select from 'react-select'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { CanteenApi } from '../../../Helpers/Service/CanteenService';
import { LoadingComponent } from '../../LoadingComponent';

export const AdminDeleteCanteenComponent = () => {

    const [loading, setLoading] = useState(true);

    const [selectedCanteenId, setSelectedCanteenId] = useState(null);
    const canteenIdRef = useRef(null);

    const [canteenOptions, setCanteenOptions] = useState([]);

    const getCanteens = () => {
        CanteenApi.GetCanteens() 
            .then(res => {
                setCanteenOptions(res.map(canteen => {return {label: canteen.name, value: canteen.id}}))
                setLoading(false);
            })
            .catch(() => toast.error('S-a produs o eroare!'));
    }

    const deleteCanteen = () => {
        if(selectedCanteenId !== null){
            setLoading(true);
            CanteenApi.DeleteCanteen(selectedCanteenId)
            .then(() => {
                setSelectedCanteenId(null);
                canteenIdRef.current = null;
                toast.success('Cantina stearsa cu succes!');
                getCanteens();
            })
            .catch(() => toast.error('S-a produs o eroare!'));
        }
        else{
            toast.warning('Selectati o cantina!');
        }
    }
    
    useEffect(() => {
        getCanteens();
    }, [])

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white', borderRadius: 12, border: '2px solid #01135d', height: 50, color: '#01135d' }),
  };

  return (
    <div>
        {loading === true &&
            <LoadingComponent />
        }
        {loading === false &&
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 100, gap: 50, color: '#01135d'}}>
                <h1>Stergeti o cantina existenta</h1>
                <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                    
                    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                        <label><b>Selectati o cantina</b></label>
                        <Select 
                            options={canteenOptions} 
                            styles={colourStyles} 
                            onChange={e => {
                                setSelectedCanteenId(e.value);
                                canteenIdRef.current = e.value;
                            }}
                        />
                    </div>

                    <div
                        style={{height: 40, width: 400, border: 'none', padding: '5px 10px', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 24}}
                        className='EditCanteen-editButton' 
                        onClick={() => deleteCanteen()}
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