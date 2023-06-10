import React, {useContext, useEffect, useState} from 'react'
import { SelectedInstancesContext, AuthContext, CartContext } from '../App'
import { FaCartPlus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { CanteenApi } from '../Helpers/Service/CanteenService';
import { LoadingComponent } from './LoadingComponent';
import { useNavigate } from 'react-router-dom';

export const MealsComponent = () => {

    const navigate = useNavigate();
    const selectedInstancesContext = useContext(SelectedInstancesContext);
    const authContext = useContext(AuthContext);
    const cartContext = useContext(CartContext);
    
    const [loading, setLoading] = useState(true);
    
    const [meals, setMeals] = useState([]);

    const updateCartLocalStorage = (cart, count) => {
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify({items: cart, count: count}));
    }

    const addToCart = (meal) => {
        if(meal.disponibility === true){
            if(authContext.isLogedIn === false){
                toast.warning('Va rugam sa va inregistrati pentru a continua!');
                navigate('/login');
            }else{
                let cartItem = cartContext.cartItems.find(e => e.id === meal.id);
                let updatedCartItems;
                if(cartItem !== undefined){
                    updatedCartItems = cartContext.cartItems.map(e => {
                        if(e.id === cartItem.id){
                            return {...e, count: e.count + 1};
                        }else{
                            return e;
                        }
                    });
                }else{
                    updatedCartItems = cartContext.cartItems.concat([{...meal, count: 1}]);
                }
                updateCartLocalStorage(updatedCartItems, cartContext.cartItemsCount + 1);
                cartContext.setCartItems(updatedCartItems);
                cartContext.setCartItemsCount(cartContext.cartItemsCount + 1);      
            }
        }
    }

    useEffect(() => {
        CanteenApi.GetMealsOfCanteenByCategory(selectedInstancesContext.selectedCanteenId, selectedInstancesContext.selectedCategoryId)
        .then(res => setMeals(res.mealList))
        .then(() => setLoading(false))
        .catch(() => toast.error('S-a produs o eroare!'));
    }, [selectedInstancesContext.selectedCanteenId, selectedInstancesContext.selectedCategoryId])

  return (
    <div>
        {loading === true && <LoadingComponent/>}
        {loading === false &&
            <div>
                <h1 style={{textAlign: 'center', color: '#01135d', fontSize: 36, marginTop: 50, marginBottom: 50}}>{selectedInstancesContext.selectedCategoryName}</h1>
            
                <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', columnGap: 100, rowGap: 50, paddingLeft: '5%', paddingRight: '5%', paddingBottom: 100}}>
                    {meals.map(meal => (
                        <div className='Meals-mealContainer' style={{width: 450, height: 225, display: 'flex', boxShadow: '0px 5px 10px 3px #CFE1F2', borderRadius: 20, gap: 25, cursor: 'pointer'}} onClick={() => addToCart(meal)}>
                            {meal.disponibility === false && 
                                <div style={{position: 'absolute', width: 450, height: 225, borderRadius: 20, backgroundColor: 'rgb(255, 255, 255, 0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <div style={{height: 55, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(1, 19, 93, 0.5)', paddingLeft: 32, paddingRight: 32}}><b style={{color: 'white', fontSize: 24}}>Indisponibil</b></div>
                                </div>
                            }
                            <div style={{paddingLeft: 20, width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', color: '#01135d'}}>
                                <h3>{meal.name}</h3>
                                <text style={{fontSize: 13, textAlign: 'justify'}}>{meal.description}</text>
                                <h3>{meal.price} lei</h3>
                            </div>
                            <div style={{width: '50%', padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <div style={{height: 175, width: 200, borderRadius: 20, backgroundImage: `url(${meal.pictureURL})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                                    <div 
                                        className={meal.disponibility === true ? 'Meals-addToCart' : ''} 
                                        style={{height: 60, width: 60, backgroundColor: 'white', borderTopLeftRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                                    >
                                        <FaCartPlus style={{height: 25, width: 25, marginTop: 10, marginLeft: 10, color: '#01135d'}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
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