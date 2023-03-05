import React, { useContext } from 'react'
import { ManagerSelectedCategoryContext } from '../App';
import { MdNoMeals, MdDelete } from 'react-icons/md'


export const ManagerMealsComponent = () => {
    
    const managerSelectedCategoryContext = useContext(ManagerSelectedCategoryContext);

    return (
      <div>
          <h1 style={{textAlign: 'center', color: '#01135d', fontSize: 36, marginTop: 50, marginBottom: 50}}>{managerSelectedCategoryContext.managerSelectedCategory}</h1>
  
          <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', columnGap: 100, rowGap: 50, paddingLeft: '5%', paddingRight: '5%', paddingBottom: 100}}>
              {[1,1,1,1,1,1].map(e => (
                  <div className='Meals-mealContainer' style={{width: 450, height: 250, display: 'flex', boxShadow: '0px 5px 10px 3px #CFE1F2', borderRadius: 20, gap: 25 }}>
                      <div style={{paddingLeft: 20, width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', color: '#01135d'}}>
                          <h3>Nume meal</h3>
                          <text style={{fontSize: 13, textAlign: 'justify'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</text>
                          <div style={{height: 100, width: '100%', display: 'flex', justifyContent: 'flex-start', gap: 25, alignItems: 'center'}}>
                            <MdNoMeals className='ManagerMeals-button' style={{height: 20, width: 20, border: '2px solid #01135d', padding: 10, borderRadius: 50, cursor: 'pointer'}}/>
                            <MdDelete className='ManagerMeals-button' style={{height: 20, width: 20, border: '2px solid #01135d', padding: 10, borderRadius: 50, cursor: 'pointer'}}/>
                          </div>
                      </div>
                      <div style={{width: '50%', padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <div style={{height: 175, width: 200, borderRadius: 20, backgroundImage: `url(https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}} />
                      </div>
                  </div>
              ))}
          </div>
      </div>
    )
}