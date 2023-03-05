import React from 'react'
import { useNavigate } from 'react-router-dom'
import preparingOrder from '../Assets/PreparingOrder.svg'
import finishedOrder from '../Assets/FinishedOrder.svg'
import newUser from '../Assets/NewUser.svg'
import ReactLoading from 'react-loading';
import { useState } from 'react';

export const OrdersComponent = () => {

    let navigate = useNavigate();
    const [orderStatus, setOrderStatus] = useState('noOrders');

  return (
    <>
        {orderStatus === 'inProgress' &&
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: '91vh'}}>
                <h1 style={{color: '#01135d'}}>Comanda dumneavoastra este in curs de pregatire</h1>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img src={preparingOrder} alt='' style={{height: 300, width: 300}}/>
                    <ReactLoading type={'spinningBubbles'} color={'#01135d'} height={50} width={75} />
                </div>
                <h1 style={{color: '#01135d'}}>Se va putea prelua in aproximativ 15 minute!</h1>
            </div>
        }
        {orderStatus === 'done' &&
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: '91vh'}}>
                <h1 style={{color: '#01135d'}}>Comanda dumneavoastra este pregatita</h1>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img src={finishedOrder} alt='' style={{height: 300, width: 300}}/>
                </div>
                <h1 style={{color: '#01135d'}}>Puteti sa o ridicati de la cantina studenteasca!</h1>
            </div>
        }
        {orderStatus === 'noOrders' &&
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: '91vh'}}>
                <h1 style={{color: '#01135d'}}>Nu aveti nicio comanda</h1>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <img src={newUser} alt='' style={{height: 400, width: 400, marginTop: -50}}/>
                </div>
                <button 
                    className='Orders-startShopping' 
                    style={{height: 60, width: 500, border: 'none', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer'}}
                    onClick={() => {
                        navigate('/');
                    }}
                >Realizati-va prima comanda</button>
            </div>
        }
        {orderStatus === 'orders' &&
            <div style={{display: 'flex', flexDirection: 'column', gap: 50, justifyContent: 'center', alignItems: 'center', width: '100%', paddingBottom: 75}}>
                <h1 style={{marginTop: 75, marginBottom: 50, color: '#01135d'}}>Comenzile dumneavoastra</h1>
                {[1,1,1,1,1].map(e => (
                    <div style={{width: '75%', boxShadow: '0px 5px 10px 3px #CFE1F2', height: 125, borderRadius: 20}}>e</div>
                ))}
            </div>
        }
    </>
  )
}