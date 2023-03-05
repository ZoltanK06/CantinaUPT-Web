import './App.css';
import { LoginComponent } from './Components/LoginComponent';
import { LandingPageComponent } from './Components/LandingPageComponent';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { NavbarComponent } from './Components/NavbarComponent';
import { MenuComponent } from './Components/MenuComponent';
import { useState, createContext } from 'react';
import { MealsComponent } from './Components/MealsComponent';
import { CartComponent } from './Components/CartComponent';
import { OrdersComponent } from './Components/OrdersComponent';
import { AdminComponent } from './Components/AdminComponent';
import { AdminCanteenComponent } from './Components/AdminCanteenComponent';
import { AdminManagerComponent } from './Components/AdminManagerComponent';
import { AdminAddCanteenComponent } from './Components/AdminAddCanteenComponent';
import { AdminEditCanteenComponent } from './Components/AdminEditCanteenComponent';
import { AdminDeleteCanteenComponent } from './Components/AdminDeleteCanteenComponent';
import { AdminAddManagerComponent } from './Components/AdminAddManagerComponent';
import { AdminEditManagerComponent } from './Components/AdminEditManagerComponent';
import { AdminDeleteManagerComponent } from './Components/AdminDeleteManagerComponent';
import { ManagerComponent } from './Components/ManagerComponent';
import { ManagerMealTypesComponent } from './Components/ManagerMealTypesComponent';
import { ManagerMealsComponent } from './Components/ManagerMealsComponent';
import { ManagerAddMealComponent } from './Components/ManagerAddMealComponent';

export const SelectedCanteenContext = createContext();
export const SelectedCategoryContext = createContext();
export const ManagerSelectedCategoryContext = createContext();

function App() {

  const [selectedCanteenId, setSelectedCanteenId] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('empty-string');
  const [managerSelectedCategory, setManagerSelectedCategory] = useState('empty-string');

  return (
    <SelectedCanteenContext.Provider value={{selectedCanteenId, setSelectedCanteenId}}>
    <SelectedCategoryContext.Provider value={{selectedCategory, setSelectedCategory}}>
    <ManagerSelectedCategoryContext.Provider value={{managerSelectedCategory, setManagerSelectedCategory}}>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path='/' element={<LandingPageComponent />} />
          <Route path='/login' element={<LoginComponent />} />
          <Route path={'/canteenId=' + selectedCanteenId + '/menu'} element={<MenuComponent />} />
          <Route path={'/canteenId=' + selectedCanteenId + '/' + selectedCategory.toLowerCase()}  element={<MealsComponent />} />
          <Route path='/cart' element={<CartComponent />} />
          <Route path='/orders' element={<OrdersComponent />} />
          <Route path='/admin' element={<AdminComponent />}/>
          <Route path='/admin/canteen' element={<AdminCanteenComponent />}/>
          <Route path='/admin/canteen/add' element={<AdminAddCanteenComponent />}/>
          <Route path='/admin/canteen/edit' element={<AdminEditCanteenComponent />}/>
          <Route path='/admin/canteen/delete' element={<AdminDeleteCanteenComponent />}/>
          <Route path='/admin/manager' element={<AdminManagerComponent />}/>
          <Route path='/admin/manager/add' element={<AdminAddManagerComponent />}/>
          <Route path='/admin/manager/edit' element={<AdminEditManagerComponent />}/>
          <Route path='/admin/manager/delete' element={<AdminDeleteManagerComponent />}/>
          <Route path='/manager' element={<ManagerComponent />}/>
          <Route path='/manager/meal-types' element={<ManagerMealTypesComponent />}/>
          <Route path={'/manager/' + managerSelectedCategory.toLowerCase()}  element={<ManagerMealsComponent />} />
          <Route path='/manager/add-meal' element={<ManagerAddMealComponent />}/>
        </Routes>
      </Router>
    </ManagerSelectedCategoryContext.Provider>
    </SelectedCategoryContext.Provider>
    </SelectedCanteenContext.Provider>
  );
}

export default App;
