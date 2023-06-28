import React, { useContext, useEffect, useState } from 'react'
import Card from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { SaveCardModal } from './SaveCardModal';
import { CanteenApi } from '../Helpers/Service/CanteenService';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { LoadingComponent } from './LoadingComponent';
import { BsCreditCardFill } from 'react-icons/bs'
import { CartContext, SelectedInstancesContext } from '../App';
import { HubConnectionBuilder } from '@microsoft/signalr';

export const PaymentComponent = () => {

  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const selectedInstancesContext = useContext(SelectedInstancesContext);

  const [loading, setLoading] = useState(true);
  const [connection, setConnection] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [existingCards, setExistingCards] = useState([]);
  
  const [cvc, setCvc] = useState('');
  const [expiry, setExpiry] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [focused, setFocused] = useState('');

  const [openModal, setOpenModal] = useState(false);

  let price =  cartContext.cartItems.reduce((accumulator, current) => accumulator + current.price * current.count, 0);

  const createOrder = () => {
    let OrderItemsDTO = cartContext.cartItems.map(cartItem => {return {Meal: {Id: cartItem.id}, Quantity: cartItem.count}});
    let Order = {
      Id: null,
      UserId: JSON.parse(localStorage.getItem('user')).id,
      OrderDate: new Date(),
      StatusId: 1,
      TotalPrice: price - 20*price/100,
      OrderItemsDTO: OrderItemsDTO,
      CanteenId: selectedInstancesContext.selectedCanteenId
    };

    return Order;
  }
  
  const onNoClicked = () => {
    setLoading(true);
    CanteenApi.AddOrder(createOrder())
      .then(() => {
        setOpenModal(false);
        sendOrder();
        cartContext.setCartItems([]);
        cartContext.setCartItemsCount(0);  
        localStorage.removeItem('cart');   
        setLoading(true); 
        toast.success('Comanda dumneavoastra va fi pregatita in cel mai scurt timp!');
        navigate('/orders');
    }).catch(() => toast.error('S-a produs o eroare!'));
  }

  const onYesClicked = () => {
    let card = {
      Number: number,
      Name: name,
      Expiry: createExpiryDate(),
      Cvc: cvc 
    }
    let userId = JSON.parse(localStorage.getItem('user')).id;
    CanteenApi.AddCard(userId, card)
    .then(() => {
      toast.success('Card salvat cu succes!');
      CanteenApi.AddOrder(createOrder())
        .then(() => {
          setOpenModal(false);
          sendOrder();
          cartContext.setCartItems([]);
          cartContext.setCartItemsCount(0);  
          localStorage.removeItem('cart');   
          setLoading(true); 
          toast.success('Comanda dumneavoastra va fi pregatita in cel mai scurt timp!');
          navigate('/orders');
        })
        .catch(() => toast.error('S-a produs o eroare!'));
    })
    .catch(() => toast.error('S-a produs o eroare!'));
    
  }

  const createExpiryDate = () => {
    if(parseInt(expiry.slice(0,2)) > 12){
      return false;
    }else{
      return new Date('20' + expiry.slice(3,5) + ' ' + expiry.slice(0,2));
    } 
  }

  const onPay = () => {
    if(paymentMethod === "newCard"){
      if(cvc.trim() !== '' && expiry.trim() !== '' && name.trim() !== '' && number.trim() !== ''){
        if(number.length !== 19){
          toast.warning('Numar incomplet!');
        }else if(!name.match(/^\w+\s\w+$/gm)){
          toast.warning('Nume gresit!');
        }else if(expiry.length !== 5){
          toast.warning('Data expirarii incorecta!');
        }else if(createExpiryDate() === false){
          toast.warning('Data invalida!');
        }else if(new Date() > createExpiryDate() && createExpiryDate() !== false){
          toast.warning('Card expirat!');
        }else if(cvc.length !== 3){
          toast.warning('CVC incomplet!');
        }else{
          setOpenModal(true);
        }
      }
      else{
        toast.warning('Completati fiecare camp!');
      }
    }else{
      setLoading(true);
      CanteenApi.AddOrder(createOrder())
        .then(() => {
          setOpenModal(false);
          sendOrder();
          cartContext.setCartItems([]);
          cartContext.setCartItemsCount(0);  
          localStorage.removeItem('cart');    
          toast.success('Comanda dumneavoastra va fi pregatita in cel mai scurt timp!');
          navigate('/orders');
        })
        .catch(() => toast.error('S-a produs o eroare!'));
    }
  }

  const clearNumber = (value = '') => {
    return value.replace(/\D+/g, '')
  }

  const formatExpirationDate = (value) => {
    const clearValue = clearNumber(value)
  
    if (clearValue.length >= 3) {
      return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`
    }
  
    return clearValue
  }

  const formatCreditCardNumber = (value) => {
    if (!value) {
      return value
    }
  
    const clearValue = clearNumber(value)
    let nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(4,8)} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`
    return nextValue.trim()
  }
    
  const formatCVC = (value) => {
    const clearValue = clearNumber(value)
    let maxLength = 3
    return clearValue.slice(0, maxLength)
  }

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:57678/hubs/orders')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {
                    console.log('Connected!');
                    let userId = JSON.parse(localStorage.getItem('user')).id;
                    CanteenApi.GetUsersCards(userId)
                      .then(res => setExistingCards(res))
                      .then(() => setLoading(false))
                      .catch(() => toast.error('S-a produs o eroare!'));
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

  const sendOrder = async () => {
      try {
          await connection.invoke('SendOrder');
      }
      catch(e) {
          console.log(e);
      }
  }

  return (
    <div>
      {loading === true && <LoadingComponent />}
      {loading === false &&
        <div style={{display: 'flex', justifyContent: 'space-evenly', gap: 64, alignItems: 'center', width: '100%', height: '91vh'}}>
            <div style={{width: '100%', maxWidth: 450, borderRadius: 10, padding: 50, paddingBottom: 50, paddingTop: 50, marginBottom: 40, backgroundColor: '#fff', boxShadow: '0px 10px 20px 10px #CFE1F2', textAlign: 'center'}}>
            <h2 style={{color: '#01135d', marginBottom: 32}}>Metode de plata</h2>
              <FormControl style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={existingCards.length > 0 ? "card-" + existingCards[0].id : "newCard"}
                  name="radio-buttons-group"
                  onChange={e => setPaymentMethod(e.target.value)}
                >
                  {existingCards.map(card => (
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24}}>
                      <FormControlLabel value={"card-" + card.id} control={<Radio />} label={"Card existent: **** **** **** " + card.number} />
                      <BsCreditCardFill style={{width: 20, height: 20}}/>
                    </div>
                  ))}
                  <FormControlLabel value="cash" control={<Radio />} label="Numerar la ridicare" />
                  <FormControlLabel value="newCard" control={<Radio />} label="Card nou" />
                </RadioGroup>
              </FormControl>
            </div>
            {paymentMethod === 'newCard' &&
              <div style={{width: '100%', maxWidth: 450, borderRadius: 10, padding: 50, paddingBottom: 50, paddingTop: 50, marginBottom: 40, backgroundColor: '#fff', boxShadow: '0px 10px 20px 10px #CFE1F2', textAlign: 'center'}}>
                  <h2 style={{color: '#01135d', marginBottom: 32}}>Detalii card</h2>
                  <Card
                    cvc={cvc}
                    expiry={expiry}
                    name={name}
                    number={number}
                    focused={focused}
                  />
                  <div style={{display: 'flex', flexDirection: 'column', gap: 24, marginTop: 24}}>
                      <div style={{textAlign: 'left', width: 410}}>
                          <label style={{display: 'inline-block', marginBottom: '0.5rem', color: '#888888'}} htmlFor="card-number">Card number</label>
                          <input 
                              style={{width: '100%', outline: 'none', padding: '8px 16px', border: '1px solid #e0e6e8', borderRadius: 4, fontSize: '1rem', color: '#7C7C7C', transition: 'box-shadow 0.2s'}} 
                              type="text" 
                              placeholder="xxxx xxxx xxxx xxxx" 
                              id="card-number" 
                              name='number'
                              value={number}
                              maxLength={19}
                              onChange={e => setNumber(formatCreditCardNumber(e.target.value))}
                              onFocus={e => setFocused(e.target.name)}
                          />
                      </div>
                      <div style={{textAlign: 'left', width: 410}}>
                          <label style={{display: 'inline-block', marginBottom: '0.5rem', color: '#888888'}} htmlFor="cardholder-name">Cardholder name</label>
                          <input 
                              style={{width: '100%', outline: 'none', padding: '8px 16px', border: '1px solid #e0e6e8', borderRadius: 4, fontSize: '1rem', color: '#7C7C7C', transition: 'box-shadow 0.2s'}} 
                              type="text" 
                              placeholder="First name Last name" 
                              id="cardholder-name"
                              name='name'
                              value={name}
                              onChange={e => setName(e.target.value)}
                              onFocus={e => setFocused(e.target.name)}
                          />
                      </div>
                      <div style={{width: 410, display: 'flex', gap: 12}}>
                        <div style={{textAlign: 'left'}}>
                            <label style={{display: 'inline-block', marginBottom: '0.5rem', color: '#888888'}} htmlFor="cardholder-name">Expiry</label>
                            <input 
                                style={{width: 181, outline: 'none', padding: '8px 16px', border: '1px solid #e0e6e8', borderRadius: 4, fontSize: '1rem', color: '#7C7C7C', transition: 'box-shadow 0.2s'}} 
                                type="tel" 
                                placeholder="MM/YY" 
                                id="expiry"
                                name='expiry'
                                value={expiry}
                                onChange={e => setExpiry(formatExpirationDate(e.target.value))}
                                onFocus={e => setFocused(e.target.name)}
                            />
                        </div>
                        <div style={{textAlign: 'left'}}>
                          <label style={{display: 'inline-block', marginBottom: '0.5rem', color: '#888888'}} htmlFor="cardholder-name">CVC</label>
                          <input 
                              style={{width: 181,outline: 'none', padding: '8px 16px', border: '1px solid #e0e6e8', borderRadius: 4, fontSize: '1rem', color: '#7C7C7C', transition: 'box-shadow 0.2s'}} 
                              type="text" 
                              placeholder="xxx" 
                              id="cvc"
                              name='cvc'
                              maxLength={3}
                              value={cvc}
                              onChange={e => setCvc(formatCVC(e.target.value))}
                              onFocus={e => setFocused(e.target.name)}
                          />
                        </div>
                      </div>
                  </div>
              </div>
            }
            <div style={{width: '100%', maxWidth: 450, borderRadius: 10, padding: 50, paddingBottom: 50, paddingTop: 50, marginBottom: 40, backgroundColor: '#fff', boxShadow: '0px 10px 20px 10px #CFE1F2', textAlign: 'center'}}>
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
                        onClick={() => onPay()}
                      >Finalizati comanda</button>
                    </div>
                </div>
            </div>
        </div>
      }
      
      <SaveCardModal
        open={openModal}
        onNoClicked={onNoClicked}
        onYesClicked={onYesClicked}
      />

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