import React from 'react'
import emptyCart from '../Assets/EmptyCart.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa'
import {RiDeleteBin6Line} from 'react-icons/ri'

export const CartComponent = () => {

    let navigate = useNavigate();
    const [cartStatus, setCartStatus] = useState('');

  return (
    <>
      {cartStatus === 'empty' &&
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly', height: '91vh'}}>
            <h1 style={{color: '#01135d'}}>Cosul dumneavoastra este gol</h1>
            <img src={emptyCart} alt='' style={{height: 300, width: 300}}/>
            <button 
                className='Cart-startShopping' 
                style={{height: 60, width: 500, border: 'none', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer'}}
                onClick={() => {
                    navigate('/');
                }}
            >Incepeti cumparaturile</button>
        </div>
      }
      {cartStatus !== 'empty' &&
        <div>
          <h1 style={{textAlign: 'center', marginTop: 75, marginBottom: 75, color: '#01135d'}}>Cosul dumneavoastra</h1>
          <div style={{display: 'flex', paddingLeft: 150, paddingRight: 150, paddingBottom: 50, justifyContent: 'space-between'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 25}}>
              {[1,1,1].map(e => (
                <div style={{width: 800, height: 175, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0px 5px 10px 3px #CFE1F2', borderRadius: 20, paddingLeft: 25, color: '#01135d', paddingRight: 25}}>
                  <div style={{display: 'flex', height: '100%', alignItems: 'center', gap: 25}}>
                    <img 
                      src='https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574' 
                      alt='' 
                      style={{width: 130, height: 130, borderRadius: 20}}  
                    />
                    <div style={{height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                      <h2>Nume mancare</h2>
                      <h2>Pret: 15.00lei</h2>
                    </div>
                  </div>
                  <div style={{display: 'flex', gap: 30, alignItems: 'center'}}>    
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <FaAngleUp style={{height: 40, width: 40, cursor: 'pointer'}} />
                      <div style={{height: 40, width: 40, borderRadius: 50, backgroundColor: '#9BADFD', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#01135d', fontSize: 18, fontWeight: 'bold'}}>1</div>
                      <FaAngleDown style={{height: 40, width: 40, cursor: 'pointer'}} />
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer'}}>
                      <RiDeleteBin6Line style={{height: 30, width: 30}}/>
                      <h4>Stergeti</h4>
                    </div>
                  </div>           
                </div>
              ))}
            </div>
            <div style={{width: '23%', height: 420, boxShadow: '0px 5px 10px 3px #CFE1F2', borderRadius: 20, padding: 35, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <h2 style={{textAlign: 'center', color: '#01135d'}}>Sumar comanda</h2>
                <div>
                  <div style={{display: 'flex', justifyContent: 'space-between', color: '#01135d'}}>
                    <div>
                      <h3>Subtotal:</h3>
                      <h3>Reducere aplicata:</h3>
                    </div>
                    <div>
                      <h3>15.00 lei</h3>
                      <h3>20%</h3>
                    </div>
                  </div>
                  <div style={{height: 1, width: '100%', backgroundColor: '#01135d'}}/>
                  <div style={{display: 'flex', justifyContent: 'space-between', color: '#01135d'}}>
                      <h2>Total:</h2>
                      <h2>12.00 lei</h2>
                  </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 25}}>
                      <button
                        className='Landing-continueButton' 
                        style={{height: 50, width: 300, border: 'none', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer'}}
                        onClick={() => {}}
                      >Finalizati comanda</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}