import './App.css';
import { LoginComponent } from './Components/LoginComponent';
import { RegisterComponent } from './Components/RegisterComponent';
import { LandingPageComponent } from './Components/LandingPageComponent';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { NavbarComponent } from './Components/NavbarComponent';
import { MenuComponent } from './Components/MenuComponent';
import { useState, createContext, useEffect } from 'react';
import { MealsComponent } from './Components/MealsComponent';
import { CartComponent } from './Components/CartComponent';
import { OrdersComponent } from './Components/OrdersComponent';
import { AdminComponent } from './Components/Admin/AdminComponent';
import { AdminCanteenComponent } from './Components/Admin/Canteens/AdminCanteenComponent';
import { AdminManagerComponent } from './Components/Admin/Managers/AdminManagerComponent';
import { AdminAddCanteenComponent } from './Components/Admin/Canteens/AdminAddCanteenComponent';
import { AdminEditCanteenComponent } from './Components/Admin/Canteens/AdminEditCanteenComponent';
import { AdminDeleteCanteenComponent } from './Components/Admin/Canteens/AdminDeleteCanteenComponent';
import { AdminAddManagerComponent } from './Components/Admin/Managers/AdminAddManagerComponent';
import { AdminEditManagerComponent } from './Components/Admin/Managers/AdminEditManagerComponent';
import { AdminDeleteManagerComponent } from './Components/Admin/Managers/AdminDeleteManagerComponent';
import { ManagerComponent } from './Components/Manager/ManagerComponent';
import { ManagerMealTypesComponent } from './Components/Manager/ManagerMealTypesComponent';
import { ManagerMealsComponent } from './Components/Manager/ManagerMealsComponent';
import { ManagerAddMealComponent } from './Components/Manager/ManagerAddMealComponent';
import { ProtectedRoute } from './Helpers/RouteProtector/ProtectedRoute';
import { PaymentComponent } from './Components/PaymentComponent'
import { ManagerOrdersComponent } from './Components/Manager/ManagerOrdersComponent';

export const SelectedInstancesContext = createContext();
export const ManagerSelectedInstancesContext = createContext();
export const AuthContext = createContext();
export const CartContext = createContext();

function App() {

  const [selectedCanteenId, setSelectedCanteenId] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedCategoryName, setSelectedCategoryName] = useState('N/A');
  const [managerSelectedCategoryName, setManagerSelectedCategoryName] = useState('N/A');
  const [managerSelectedCategoryId, setManagerSelectedCategoryId] = useState(0);
  const [managerSelectedCanteenId, setManagerSelectedCanteenId] = useState(0);
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {

    var userObject = JSON.parse(localStorage.getItem('user'));

    if(userObject !== null){
      var expirationTime = JSON.parse(localStorage.getItem('user')).expiry;

      if((new Date()).getTime() < expirationTime){
        let token = JSON.parse(localStorage.getItem('user')).token;
        let role = JSON.parse(localStorage.getItem('user')).role;
        let canteenId = JSON.parse(localStorage.getItem('user')).canteenId;
        if(role === 'Manager'){
          setManagerSelectedCanteenId(canteenId);
        }else{
          setSelectedCanteenId(canteenId);
        }
      
        if(token !== null){
          setIsLogedIn(true);
          setUserRole(role);
        }

        var cart = JSON.parse(localStorage.getItem('cart'));
        if(cart !== null){
          setCartItems(cart.items);
          setCartItemsCount(cart.count);
        }
      }
      else{
        localStorage.clear();
        setSelectedCanteenId(0);
        setSelectedCategoryName('N/A');
        setManagerSelectedCategoryName('N/A');
        setManagerSelectedCategoryId(0);
        setManagerSelectedCanteenId(0);
        setIsLogedIn(false);
        setUserRole(null);
      }
    }
    
  }, [])

  return (
    <SelectedInstancesContext.Provider value={{selectedCanteenId, setSelectedCanteenId, selectedCategoryName, setSelectedCategoryName, selectedCategoryId, setSelectedCategoryId}}>
    <ManagerSelectedInstancesContext.Provider value={{managerSelectedCategoryName, setManagerSelectedCategoryName, managerSelectedCategoryId, setManagerSelectedCategoryId, managerSelectedCanteenId, setManagerSelectedCanteenId}}>
    <AuthContext.Provider value={{isLogedIn, setIsLogedIn, userRole, setUserRole}}>
    <CartContext.Provider value={{cartItems, setCartItems, cartItemsCount, setCartItemsCount}}>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route element={<ProtectedRoute expectedRoles={['User','Student', null]} />}>
            <Route path='/' element={<LandingPageComponent />} />
            <Route path='/login' element={<LoginComponent />} />
            <Route path='/register' element={<RegisterComponent />} />
            <Route path={'/canteenId=' + selectedCanteenId + '/menu'} element={<MenuComponent />} />
            <Route path={'/canteenId=' + selectedCanteenId + '/' + selectedCategoryName.toLowerCase()}  element={<MealsComponent />} />
            <Route path='/cart' element={<CartComponent />} />
            <Route path='/orders' element={<OrdersComponent />} />
          </Route>
          <Route element={<ProtectedRoute expectedRoles={['User','Student']} />}>
            <Route path='/payment' element={<PaymentComponent />} />
          </Route>
          <Route element={<ProtectedRoute expectedRoles={['Admin']} />}>
            <Route path='/admin' element={<AdminComponent />}/>
            <Route path='/admin/canteen' element={<AdminCanteenComponent />}/>
            <Route path='/admin/canteen/add' element={<AdminAddCanteenComponent />}/>
            <Route path='/admin/canteen/edit' element={<AdminEditCanteenComponent />}/>
            <Route path='/admin/canteen/delete' element={<AdminDeleteCanteenComponent />}/>
            <Route path='/admin/manager' element={<AdminManagerComponent />}/>
            <Route path='/admin/manager/add' element={<AdminAddManagerComponent />}/>
            <Route path='/admin/manager/edit' element={<AdminEditManagerComponent />}/>
            <Route path='/admin/manager/delete' element={<AdminDeleteManagerComponent />}/>
          </Route>
          <Route element={<ProtectedRoute expectedRoles={['Manager']} />}>
            <Route path='/manager' element={<ManagerComponent />}/>
            <Route path='/manager/meal-types' element={<ManagerMealTypesComponent />}/>
            <Route path={'/manager/' + managerSelectedCategoryName.toLowerCase()}  element={<ManagerMealsComponent />} />
            <Route path='/manager/add-meal' element={<ManagerAddMealComponent />}/>
            <Route path='/manager/orders' element={<ManagerOrdersComponent />}/>
          </Route> 
        </Routes>
      </Router>
    </CartContext.Provider>
    </AuthContext.Provider>
    </ManagerSelectedInstancesContext.Provider>
    </SelectedInstancesContext.Provider>
  );
}

export default App;
