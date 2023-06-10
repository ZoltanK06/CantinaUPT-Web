import React, { useContext, useEffect, useState } from 'react'
import { ManagerSelectedInstancesContext } from '../../App';
import { MdNoMeals, MdDelete, MdRestaurant } from 'react-icons/md'
import { CanteenApi } from '../../Helpers/Service/CanteenService';
import { LoadingComponent } from '../LoadingComponent';
import upload from '../../Assets/upload.svg'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const ManagerMealsComponent = () => {
    
    const managerSelectedInstancesContext = useContext(ManagerSelectedInstancesContext);
    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      CanteenApi.GetMealsOfCanteenByCategory(managerSelectedInstancesContext.managerSelectedCanteenId, managerSelectedInstancesContext.managerSelectedCategoryId)
      .then(res => setMeals(res.mealList))
      .then(() => setLoading(false))
      .catch(() => toast.error('S-a produs o eroare!'));
    }, [managerSelectedInstancesContext.managerSelectedCanteenId, managerSelectedInstancesContext.managerSelectedCategoryId])

    const deleteMeal = (mealId) => {
      CanteenApi.DeleteMealById(mealId)
      .then(() => {
        CanteenApi.GetMealsOfCanteenByCategory(managerSelectedInstancesContext.managerSelectedCanteenId, managerSelectedInstancesContext.managerSelectedCategoryId)
        .then(res => setMeals(res.mealList))
        .then(() => setLoading(false)) 
        .then(() => toast.success('Mancare stearsa cu succes!'))
        .catch(() => toast.error('S-a produs o eroare!'))
      })
      .catch(() => toast.error('S-a produs o eroare!'));
    }

    const changeMealsDisponibility = (mealId) => {
      setLoading(true);
      CanteenApi.ChangeMealsDisponibility(mealId)
      .then(() => {
        CanteenApi.GetMealsOfCanteenByCategory(managerSelectedInstancesContext.managerSelectedCanteenId, managerSelectedInstancesContext.managerSelectedCategoryId)
        .then(res => setMeals(res.mealList))
        .then(() => setLoading(false)) 
        .then(() => toast.success('Disponibilitate schimbata cu succes!'))
        .catch(() => toast.error('S-a produs o eroare!'))
      })
      .catch(() => toast.error('S-a produs o eroare!'));
    }

    return (
      <div>
        {loading === true && 
          <LoadingComponent />
        }
        {loading === false && meals.length > 0 &&
          <div>
              <h1 style={{textAlign: 'center', color: '#01135d', fontSize: 36, marginTop: 50, marginBottom: 50}}>{managerSelectedInstancesContext.managerSelectedCategory}</h1>
      
              <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', columnGap: 100, rowGap: 50, paddingLeft: '5%', paddingRight: '5%', paddingBottom: 100}}>
                  {meals.map(e => (
                      <div className='Meals-mealContainer' style={{width: 450, height: 250, display: 'flex', boxShadow: '0px 5px 10px 3px #CFE1F2', borderRadius: 20, gap: 25 }}>
                          <div style={{paddingLeft: 20, width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', color: '#01135d'}}>
                              <h3>{e.name}</h3>
                              <text style={{fontSize: 13, textAlign: 'justify'}}>{e.description}</text>
                              <div style={{height: 100, width: '100%', display: 'flex', justifyContent: 'flex-start', gap: 25, alignItems: 'center'}}>
                                {e.disponibility === true ?
                                  <MdNoMeals onClick={() => changeMealsDisponibility(e.id)} className='ManagerMeals-button' style={{height: 20, width: 20, border: '2px solid #01135d', padding: 10, borderRadius: 50, cursor: 'pointer'}}/>
                                :
                                  <MdRestaurant onClick={() => changeMealsDisponibility(e.id)} className='ManagerMeals-button' style={{height: 20, width: 20, border: '2px solid #01135d', padding: 10, borderRadius: 50, cursor: 'pointer'}}/>
                                }
                                <MdDelete onClick={() => deleteMeal(e.id)} className='ManagerMeals-button' style={{height: 20, width: 20, border: '2px solid #01135d', padding: 10, borderRadius: 50, cursor: 'pointer'}}/>
                              </div>
                          </div>
                          <div style={{width: '50%', padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <div style={{height: 175, width: 200, borderRadius: 20, backgroundImage: `url(${e.pictureURL})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}} />
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        }
        {loading === false && meals.length === 0 &&
          <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, paddingTop: 250}}>
            <img src={upload} alt='' style={{height: 400, width: 400}}/>
            <div style={{display: 'flex', gap: 12}}>
              <h2>Nu exista mancaruri de aceasta categorie inca.</h2>
              <h2 style={{color: '#0074cc', textDecoration: 'underline', cursor: 'pointer'}} onClick={() => navigate('/manager/add-meal')}>Apasati aici sa adaugati</h2>
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