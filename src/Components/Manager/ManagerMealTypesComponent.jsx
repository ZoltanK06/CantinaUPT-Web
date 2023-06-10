import React, {useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { ManagerSelectedInstancesContext } from '../../App';
import { LoadingComponent } from '../LoadingComponent';
import { CanteenApi } from '../../Helpers/Service/CanteenService';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export const ManagerMealTypesComponent = () => {
    let navigate = useNavigate();

    const managerSelectedCategoryContext = useContext(ManagerSelectedInstancesContext);

    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      CanteenApi.GetAllCategoriesWithPictures()
      .then(res => setCategories(res))
      .then(() => setLoading(false))
      .catch(() => toast.error('S-a produs o eroare!'));
    }, [])
  
    return (
      <div>
        {loading === true && 
        <LoadingComponent />
        }
        {loading === false &&
          <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', rowGap: 50, columnGap: 100, marginTop: 125}}>
            {categories.map(category => (
              <div className='Menu-categoryContainer' style={{width: 700, height: 175, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0px 5px 10px 3px #CFE1F2', borderRadius: 20, paddingLeft: 50, color: '#01135d', cursor: 'pointer'}}
                  onClick={() => {
                      managerSelectedCategoryContext.setManagerSelectedCategoryName(category.categoryName);
                      managerSelectedCategoryContext.setManagerSelectedCategoryId(category.id);
                      navigate('/manager/' + category.categoryName.toLowerCase());
                }}
              >
                <h2>{category.categoryName}</h2>
                <div style={{height: 175, width: 200, borderTopRightRadius: 20, borderBottomRightRadius: 20, backgroundImage: `url(${category.pictureURL})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                  <div className='Menu-goToCategory' style={{height: 60, width: 60, backgroundColor: 'white', borderBottomRightRadius: 20, borderTopLeftRadius: 50, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <FaArrowRight style={{height: 25, width: 25}}/>
                  </div>
                </div>
              </div>
            ))}
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