import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { SelectedInstancesContext } from '../App';
import { CanteenApi } from '../Helpers/Service/CanteenService';
import { LoadingComponent } from './LoadingComponent';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export const LandingPageComponent = () => {

    let navigate = useNavigate();
    const selectedInstancesContext = useContext(SelectedInstancesContext);
    const [canteens, setCanteens] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        CanteenApi.GetCanteens()
        .then(res => setCanteens(res))
        .then(setLoading(false))
        .catch(() => toast.error('S-a produs o eroare!'));
    }, [])

  return (
    <div>
        {loading === true &&
            <LoadingComponent />
        }
        {loading === false &&
            <div style={{height: '91vh', display: 'flex', paddingLeft: '20%', paddingRight: '20%', alignItems: 'center', justifyContent: 'space-between', gap: 64}}>
                <div style={{width: 450, height: 500, paddingBottom: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0px 5px 20px 25px #CFE1F2', borderRadius: 20}}>
                    <img src={canteens[1]?.pictureURL} alt='' style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, width: 450, height: '50%' }} />
                    <text style={{fontSize: 24, fontWeight: 'bold', color: '#01135d'}}>{canteens[1]?.name}</text>
                    <button 
                        className='Landing-continueButton' 
                        style={{height: 50, width: 300, border: 'none', borderRadius: 10, backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer'}}
                        onClick={() => {
                            selectedInstancesContext.setSelectedCanteenId(canteens[1]?.id);
                            navigate('/canteenId=' + canteens[1]?.id + '/menu');
                        }}
                    >Continua</button>
                </div>
                <div style={{width: 450, height: 500, paddingBottom: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0px 5px 20px 25px #CFE1F2', borderRadius: 20}}>
                    <img src={canteens[0]?.pictureURL} alt='' style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, width: 450, height: '50%'  }} />
                    <text style={{fontSize: 24, fontWeight: 'bold', color: '#01135d'}}>{canteens[0]?.name}</text>
                    <button 
                        className='Landing-continueButton' 
                        style={{height: 50, width: 300, border: 'none', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer'}}
                        onClick={() => {
                            selectedInstancesContext.setSelectedCanteenId(canteens[0]?.id);
                            navigate('/canteenId=' + canteens[0]?.id + '/menu');
                        }}
                    >Continua</button>
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