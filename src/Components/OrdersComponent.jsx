import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import preparingOrder from '../Assets/PreparingOrder.svg'
import finishedOrder from '../Assets/FinishedOrder.svg'
import newUser from '../Assets/NewUser.svg'
import ReactLoading from 'react-loading';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AuthContext, SelectedInstancesContext } from '../App'
import { CanteenApi } from '../Helpers/Service/CanteenService'
import { LoadingComponent } from './LoadingComponent'
import { OrderDetailsModal } from './OrderDetailsModal'
import { HubConnectionBuilder } from '@microsoft/signalr'

export const OrdersComponent = () => {

    let navigate = useNavigate();

    const authContext = useContext(AuthContext);
    const selectedInstancesContext = useContext(SelectedInstancesContext);

    const [connection, setConnection] = useState(null);

    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    const [currentOrder, setCurrentOrder] = useState(null);

    useEffect(() => {
        if(authContext.isLogedIn === true){
            let userId = JSON.parse(localStorage.getItem('user')).id;
            CanteenApi.GetCurrentOrder(userId, selectedInstancesContext.selectedCanteenId)
                .then(res => {
                    if(res){
                        setCurrentOrder(res);
                    }else{
                        setCurrentOrder(null);
                    }
                    setLoading(false);
                })
                .catch(() => toast.error('S-a produs o eroare!'));
        }else{
            setLoading(false); 
        }
        const newConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:57678/hubs/orders')
        .withAutomaticReconnect()
        .build();

        setConnection(newConnection);
    }, [])

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                    connection.on('SeeOrderStatus', () => {
                        console.log('Intra si aici!');
                        let userId = JSON.parse(localStorage.getItem('user')).id;
                        CanteenApi.GetCurrentOrder(userId, selectedInstancesContext.selectedCanteenId)
                            .then(res => {
                                if(res){
                                    setCurrentOrder(res);
                                }else{
                                    setCurrentOrder(null);
                                }
                                setLoading(false);
                            })
                            .catch(() => toast.error('S-a produs o eroare!'));
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

  return (
    <div>
        {loading === true &&
            <LoadingComponent />
        }
        {loading === false &&
            <div>
                {(currentOrder !== null && currentOrder.status === 'Preparing') &&
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: '91vh'}}>
                        <h1 style={{color: '#01135d'}}>Comanda dumneavoastra este in curs de pregatire</h1>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <img src={preparingOrder} alt='' style={{height: 300, width: 300}}/>
                            <ReactLoading type={'spinningBubbles'} color={'#01135d'} height={50} width={75} />
                        </div>
                        <h1 style={{color: '#01135d'}}>Se va putea prelua in aproximativ {currentOrder.prepareTime} minute!</h1>
                        <button 
                            onClick={() => setOpenModal(true)}
                            className='Order-detailButton'
                            style={{height: 35, width: 100, borderRadius: 7, backgroundColor: '#01135d', border: 'none', paddingLeft: 20, paddingRight: 20, color: '#9BADFD', cursor: 'pointer', marginTop: -40}}>
                            <b>Detalii</b>
                        </button>

                        <OrderDetailsModal open={openModal} onClose={() => setOpenModal(false)} currentOrder={currentOrder} />
                    </div>
                }
                {(currentOrder !== null && currentOrder.status === 'Ready') &&
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: '91vh'}}>
                        <h1 style={{color: '#01135d'}}>Comanda dumneavoastra este pregatita</h1>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <img src={finishedOrder} alt='' style={{height: 300, width: 300}}/>
                        </div>
                        <h1 style={{color: '#01135d'}}>Puteti sa o ridicati de la cantina studenteasca!</h1>
                    </div>
                }
                {currentOrder === null &&
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: '91vh'}}>
                        <h1 style={{color: '#01135d'}}>Nu aveti nicio comanda in progres</h1>
                        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <img src={newUser} alt='' style={{height: 400, width: 400, marginTop: -50}}/>
                        </div>
                        <button 
                            className='Orders-startShopping' 
                            style={{height: 60, width: 500, border: 'none', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer'}}
                            onClick={() => {
                                navigate('/');
                            }}
                        >Incepeti cumparaturile</button>
                    </div>
                }
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