import React, {useContext} from 'react'
import {FaArrowRight} from 'react-icons/fa'
import { SelectedCanteenContext, SelectedCategoryContext } from '../App';
import { useNavigate } from 'react-router-dom';

export const MenuComponent = () => {

  let types = [{name: 'Supe', pic: 'https://food-images.files.bbci.co.uk/food/recipes/chickensoup_1918_16x9.jpg'}, {name: 'Carnuri', pic: 'https://www.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2016/11/04/Production/LocalLiving/Images/we-meatcheatsheet.jpg?t=20170517'}, {name: 'Garnituri', pic: 'https://static.onecms.io/wp-content/uploads/sites/44/2019/02/03/6343020.jpg'}, {name: 'Deserturi', pic: 'https://insanelygoodrecipes.com/wp-content/uploads/2021/04/Italian-Tiramisu-with-Mint-and-Chocolate.png'}, {name: 'Muraturi', pic: 'https://happykitchen.rocks/wp-content/uploads/2016/07/Russian-dill-pickles-in-a-bowl.jpg'}, {name: 'Sosuri', pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYkY2pMMCbGUsWfIxaXxDehh-kki1IhBtA_Q&usqp=CAU'}];
  let navigate = useNavigate();

  const selectedCategoryContext = useContext(SelectedCategoryContext);
  const selectedCanteenContext = useContext(SelectedCanteenContext);

  return (
    <div>
      <h1 style={{textAlign: 'center', color: '#01135d', fontSize: 36, marginTop: 50, marginBottom: 50}}>Meniu</h1>
      <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', rowGap: 50, columnGap: 100}}>
        {types.map(type => (
          <div className='Menu-categoryContainer' style={{width: 700, height: 175, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0px 5px 10px 3px #CFE1F2', borderRadius: 20, paddingLeft: 50, color: '#01135d', cursor: 'pointer'}}
            onClick={() => {
              selectedCategoryContext.setSelectedCategory(type.name);
              navigate('/canteenId=' + selectedCanteenContext.selectedCanteenId + '/' + type.name.toLowerCase());
            }}
          >
            <h2>{type.name}</h2>
            <div style={{height: 175, width: 200, borderTopRightRadius: 20, borderBottomRightRadius: 20, backgroundImage: `url(${type.pic})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
              <div className='Menu-goToCategory' style={{height: 60, width: 60, backgroundColor: 'white', borderBottomRightRadius: 20, borderTopLeftRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <FaArrowRight style={{height: 25, width: 25}}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}