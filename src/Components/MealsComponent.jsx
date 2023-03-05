import React, {useContext} from 'react'
import { SelectedCategoryContext } from '../App'
import { FaCartPlus } from 'react-icons/fa';

export const MealsComponent = () => {

    const selectedCategoryContext = useContext(SelectedCategoryContext);

  return (
    <div>
        <h1 style={{textAlign: 'center', color: '#01135d', fontSize: 36, marginTop: 50, marginBottom: 50}}>{selectedCategoryContext.selectedCategory}</h1>

        <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', columnGap: 100, rowGap: 50, paddingLeft: '5%', paddingRight: '5%', paddingBottom: 100}}>
            {[1,1,1,1,1,1].map(e => (
                <div className='Meals-mealContainer' style={{width: 450, height: 225, display: 'flex', boxShadow: '0px 5px 10px 3px #CFE1F2', borderRadius: 20, gap: 25, cursor: 'pointer'}}>
                    <div style={{paddingLeft: 20, width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', color: '#01135d'}}>
                        <h3>Nume meal</h3>
                        <text style={{fontSize: 13, textAlign: 'justify'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</text>
                        <h3>15.00 lei</h3>
                    </div>
                    <div style={{width: '50%', padding: 20, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div style={{height: 175, width: 200, borderRadius: 20, backgroundImage: `url(https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574)`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                        <div className='Meals-addToCart' style={{height: 60, width: 60, backgroundColor: 'white', borderTopLeftRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <FaCartPlus style={{height: 25, width: 25, marginTop: 10, marginLeft: 10, color: '#01135d'}}/>
                        </div>
                     </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}