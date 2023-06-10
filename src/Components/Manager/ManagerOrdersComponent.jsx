import React, { useState, useEffect, useContext } from 'react'
import { HubConnectionBuilder } from '@microsoft/signalr';
import { CanteenApi } from '../../Helpers/Service/CanteenService';
import { ManagerSelectedInstancesContext } from '../../App';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { MdDone } from 'react-icons/md';
import IconButton from '@mui/material/IconButton';
import { OrderDetailsModal } from '../OrderDetailsModal';
import { LoadingComponent } from '../LoadingComponent';

export const ManagerOrdersComponent = () => {

const selectedInstancesContext = useContext(ManagerSelectedInstancesContext);

const [connection, setConnection] = useState(null);
const [inProgressOrders, setInProgressOrders] = useState([]);
const [finishedOrders, setFinishedOrders] = useState([]);
const [chosenOrder, setChosenOrder] = useState(null);
const [openModal, setOpenModal] = useState(false);
const [loading, setLoading] = useState(true);

const markOrderFinished = (orderId) => {
    CanteenApi.UpdateOrderStatus(orderId, 2)
    .then(() => {
        toast.success('Comanda actualizata cu succes!');
        CanteenApi.GetOrdersForCanteen(selectedInstancesContext.managerSelectedCanteenId)
            .then(res => {
                setInProgressOrders(res.filter(e => e.status === 'Preparing'));
                setFinishedOrders(res.filter(e => e.status === 'Ready'));
            })
            .catch(() => toast.error('S-a produs o eroare!'));
    })
    .catch(() => toast.error('S-a produs o eroare!'));
}

const markOrderTaken = (orderId) => {
    CanteenApi.UpdateOrderStatus(orderId, 3)
    .then(() => {
        toast.success('Comanda actualizata cu succes!');
        CanteenApi.GetOrdersForCanteen(selectedInstancesContext.managerSelectedCanteenId)
            .then(res => {
                setInProgressOrders(res.filter(e => e.status === 'Preparing'));
                setFinishedOrders(res.filter(e => e.status === 'Ready'));
            })
            .catch(() => toast.error('S-a produs o eroare!'));
    })
    .catch(() => toast.error('S-a produs o eroare!'));
}

useEffect(() => {
    const newConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:57678/hubs/orders')
        .withAutomaticReconnect()
        .build();

    setConnection(newConnection);
    CanteenApi.GetOrdersForCanteen(selectedInstancesContext.managerSelectedCanteenId)
        .then(res => {
            setInProgressOrders(res.filter(e => e.status === 'Preparing'));
            setFinishedOrders(res.filter(e => e.status === 'Ready'));
            setLoading(false);
        })
        .catch(() => toast.error('S-a produs o eroare!'));
}, []);

useEffect(() => {
    if (connection) {
        connection.start()
            .then(result => {
                console.log('Connected!');

                connection.on('RecieveOrder', () => {
                    CanteenApi.GetOrdersForCanteen(selectedInstancesContext.managerSelectedCanteenId)
                        .then(res => {
                            setInProgressOrders(res.filter(e => e.status === 'Preparing'));
                            setFinishedOrders(res.filter(e => e.status === 'Ready'));
                        })
                        .catch(() => toast.error('S-a produs o eroare!'));
                });
            })
            .catch(e => console.log('Connection failed: ', e));
    }
}, [connection]);

  return (
    <div>
        {loading === true && <LoadingComponent/>}
        {loading === false &&
            <div style={{display: 'flex', justifyContent: 'center', gap: 256, paddingTop: 75, width: '100%'}}>
                <div style={{width: '30%', border: '1px solid #01135d', borderRadius: 12, height: '75vh', padding: 20, paddingLeft: 40, paddingRight: 40, display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center', color: '#01135d'}}>
                    <h2 style={{textDecoration: 'underline'}}>Comenzi in pregatire</h2>
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%', gap: 12, overflowY: 'auto', overflowX: 'hidden', alignItems: 'center'}}>
                        {inProgressOrders.map(order => (
                            <div style={{width: '90%', border: '1px solid #01135d', borderRadius: 12, height: 100, display: 'flex', paddingLeft: 20, paddingRight: 20, alignItems: 'center', justifyContent: 'space-between'}}>
                                <h3>Comanda nr: {order.orderNumber}</h3>
                                <div style={{display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', gap: 24}}>
                                    <text style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => {setChosenOrder(inProgressOrders.find(e => e.id === order.id)); setOpenModal(true);}}>Detalii</text>
                                    <IconButton style={{color: '#01135d', padding: 5, height: 40, width: 40}} color='primary' onClick={() => markOrderFinished(order.id)}>
                                        <MdDone style={{height: 40, width: 40, cursor: 'pointer'}}/>
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div style={{width: '30%', border: '1px solid #01135d', borderRadius: 12, height: '75vh', padding: 20, paddingLeft: 40, paddingRight: 40, display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center', color: '#01135d'}}>
                    <h2 style={{textDecoration: 'underline'}}>Comenzi pregatite</h2>
                    <div style={{display: 'flex', flexDirection: 'column', width: '100%', gap: 12, overflowY: 'auto', overflowX: 'hidden', alignItems: 'center'}}>
                        {finishedOrders.map(order => (
                            <div style={{width: '90%', border: '1px solid #01135d', borderRadius: 12, height: 100, display: 'flex', paddingLeft: 20, paddingRight: 20, alignItems: 'center', justifyContent: 'space-between'}}>
                                <h3>Comanda nr: {order.orderNumber}</h3>
                                <div style={{display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', gap: 24}}>
                                    <text style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => {setChosenOrder(finishedOrders.find(e => e.id === order.id)); setOpenModal(true);}}>Detalii</text>
                                    <IconButton style={{color: '#01135d', padding: 5, height: 40, width: 40}} color='primary' onClick={() => markOrderTaken(order.id)}>
                                        <MdDone style={{height: 40, width: 40, cursor: 'pointer'}}/>
                                    </IconButton>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <OrderDetailsModal open={openModal} onClose={() => setOpenModal(false)} currentOrder={chosenOrder} />
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