import React, { useContext } from 'react'
import emptyCart from '../Assets/EmptyCart.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { FiPlus, FiMinus} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from '../App';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

export const CartComponent = () => {

    let navigate = useNavigate();
    const cartContext = useContext(CartContext);
    let cartItems = cartContext.cartItems;
    const [price, setPrice] = useState(cartItems.reduce((accumulator, current) => accumulator + current.price * current.count, 0));

    const updateCartLocalStorage = (cart, count) => {
      localStorage.removeItem('cart');
      localStorage.setItem('cart', JSON.stringify({items: cart, count: count}));
  }

    const incrementCount = (id) => {
      let updatedCartItems = cartItems.map(e => {
        if(e.id === id) {
          return {...e, count: e.count + 1};
        }
        else {
          return e;
        } 
      });
      updateCartLocalStorage(updatedCartItems, updatedCartItems.reduce((accumulator, current) => accumulator + current.count, 0));
      cartContext.setCartItems(updatedCartItems);
      cartContext.setCartItemsCount(updatedCartItems.reduce((accumulator, current) => accumulator + current.count, 0));
      setPrice(updatedCartItems.reduce((accumulator, current) => accumulator + current.price * current.count, 0));
    }

    const decrementCount = (id) => {
      if(cartItems.find(e => e.id === id).count === 1){
        deleteCartItem(id);
      }else{
        let updatedCartItems = cartItems.map(e => {
          if(e.id === id) {
            return {...e, count: e.count - 1};
          }
          else {
            return e;
          } 
        });
        updateCartLocalStorage(updatedCartItems, updatedCartItems.reduce((accumulator, current) => accumulator + current.count, 0));
        cartContext.setCartItems(updatedCartItems);
        cartContext.setCartItemsCount(updatedCartItems.reduce((accumulator, current) => accumulator + current.count, 0));
        setPrice(updatedCartItems.reduce((accumulator, current) => accumulator + current.price * current.count, 0));
      }
    }

    const deleteCartItem = (id) => {
      let updatedCartItems = cartItems.filter(e => e.id !== id);
      updateCartLocalStorage(updatedCartItems, updatedCartItems.reduce((accumulator, current) => accumulator + current.count, 0));
      cartContext.setCartItems(updatedCartItems);
      cartContext.setCartItemsCount(updatedCartItems.reduce((accumulator, current) => accumulator + current.count, 0));
      setPrice(updatedCartItems.reduce((accumulator, current) => accumulator + current.price * current.count, 0));
    }

  return (
    <>
      {cartItems.length === 0 &&
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
      {cartItems.length !== 0 &&
        <div>
          <h1 style={{textAlign: 'center', marginTop: 75, marginBottom: 75, color: '#01135d'}}>Cosul dumneavoastra</h1>
          <div style={{display: 'flex', paddingLeft: 150, paddingRight: 150, paddingBottom: 50, justifyContent: 'space-between'}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 25}}>
              {cartItems.map(e => (
                <div style={{width: 800, height: 175, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0px 5px 10px 3px #CFE1F2', borderRadius: 20, paddingLeft: 25, color: '#01135d', paddingRight: 25}}>
                  <div style={{display: 'flex', height: '100%', alignItems: 'center', gap: 25}}>
                    <img 
                      src={e.pictureURL} 
                      alt='' 
                      style={{width: 130, height: 130, borderRadius: 20}}  
                    />
                    <div style={{height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                      <h2>{e.name}</h2>
                      <h2>Pret: {e.price} lei</h2>
                    </div>
                  </div>
                  <div style={{display: 'flex', gap: 30, alignItems: 'center'}}>    
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
                      <IconButton style={{color: '#01135d', padding: 5, height: 40, width: 40}} color='primary'>
                        <FiPlus style={{height: 40, width: 40, cursor: 'pointer'}} onClick={() => incrementCount(e.id)} />
                      </IconButton>
                      <div style={{height: 40, width: 40, borderRadius: 50, backgroundColor: '#9BADFD', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#01135d', fontSize: 18, fontWeight: 'bold'}}>{e.count}</div>
                      <IconButton style={{color: '#01135d', padding: 5, height: 40, width: 40}} color='primary'>
                        <FiMinus style={{height: 40, width: 40, cursor: 'pointer'}} onClick={() => decrementCount(e.id)}/>
                      </IconButton>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer'}} onClick={() => deleteCartItem(e.id)}>
                      <Button startIcon={<RiDeleteBin6Line style={{height: 30, width: 30}}/>} style={{color: '#01135d', paddingTop: 0, paddingBottom: 0}}>
                        <h4>Stergeti</h4>
                      </Button>
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
                      <h3>{price} lei</h3>
                      <h3>20%</h3>
                    </div>
                  </div>
                  <div style={{height: 1, width: '100%', backgroundColor: '#01135d'}}/>
                  <div style={{display: 'flex', justifyContent: 'space-between', color: '#01135d'}}>
                      <h2>Total:</h2>
                      <h2>{price - 20*price/100} lei</h2>
                  </div>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: 25}}>
                      <button
                        className='Landing-continueButton' 
                        style={{height: 50, width: 300, border: 'none', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer'}}
                        onClick={() => {navigate('/payment')}}
                      >Pasul urmator</button>
                    </div>
                </div>
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
    </>
  )
}