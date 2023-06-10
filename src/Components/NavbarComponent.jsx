import React, { useContext } from 'react'
import uptLogo from '../Assets/LOGO_UPT.jpg'
import {useNavigate} from 'react-router-dom'
import { FaShoppingCart, FaHome, FaFileAlt } from 'react-icons/fa'
import { AuthContext, SelectedInstancesContext, ManagerSelectedInstancesContext, CartContext } from '../App'

export const NavbarComponent = () => {
    let navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const selectedInstancesContext = useContext(SelectedInstancesContext);
    const managerSelectedInstancesContext = useContext(ManagerSelectedInstancesContext);
    const cartContext = useContext(CartContext);

    const signOut = () => {
        localStorage.clear();
        authContext.setIsLogedIn(false);
        authContext.setUserRole(null);
        selectedInstancesContext.setSelectedCanteenId(0);
        selectedInstancesContext.setSelectedCategory('N/A');
        managerSelectedInstancesContext.setManagerSelectedCategoryName('N/A');
        managerSelectedInstancesContext.setManagerSelectedCategoryId(0);
        managerSelectedInstancesContext.setManagerSelectedCanteenId(0);
        navigate('/');
    }

  return (
    <div style={{height: 80, paddingRight: 40, backgroundColor: '#01135d', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <img src={uptLogo} alt='' style={{height: 80, cursor: 'pointer'}} onClick={() => navigate('/')} />
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', height: '100%'}}>
            {(authContext.userRole !== 'Admin' && authContext.userRole !== 'Manager') &&
            <>
                <div style={{cursor: 'pointer', height: '100%', alignItems: 'center', display: 'flex', gap: 7, width: 100, justifyContent: 'center'}} 
                    onClick={() => navigate('/')}
                >
                    <text>Acasa</text>
                    <FaHome style={{height: 20, width: 20}}/>
                </div>
                <div style={{cursor: 'pointer', height: '100%', alignItems: 'center', display: 'flex', gap: 7, width: 100, justifyContent: 'center'}} 
                    onClick={() => navigate('/cart')}
                >
                    <text>Cos</text>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <FaShoppingCart style={{height: 20, width: 20}}/>
                        {cartContext.cartItemsCount !== 0 &&
                            <div 
                                style={{position: 'absolute', marginBottom: '27px', marginLeft: '15px', backgroundColor: 'rgb(215, 222, 254)', color: '#01135d', borderRadius: '50px', height: '20px', width: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 13}}
                                >{cartContext.cartItemsCount}
                            </div>
                        }
                    </div>
                </div>
                <div style={{cursor: 'pointer', height: '100%', alignItems: 'center', display: 'flex', gap: 7, width: 100, justifyContent: 'center'}} 
                    onClick={() => navigate('/orders')}
                >
                    <text>Comenzi</text>
                    <FaFileAlt style={{height: 20, width: 20}}/>
                </div>
            </>
            }
            {authContext.isLogedIn === false &&
                <button 
                    className="Navbar-loginButton" 
                    style={{height: 35, width: 100, borderRadius: 7, backgroundColor: '#9BADFD', border: 'none', paddingLeft: 20, paddingRight: 20, color: '#01135d', cursor: 'pointer', marginLeft: 24}}
                    onClick={() => navigate('/login')}
                >
                    <b>Log in</b>
                </button>
            }
            {authContext.isLogedIn === true &&
                <button 
                    className="Navbar-loginButton" 
                    style={{height: 35, width: 100, borderRadius: 7, backgroundColor: '#9BADFD', border: 'none', paddingLeft: 20, paddingRight: 20, color: '#01135d', cursor: 'pointer'}}
                    onClick={() => signOut()}
                >
                    <b>Sign out</b>
                </button>
            }
        </div>
    </div>
  )
}