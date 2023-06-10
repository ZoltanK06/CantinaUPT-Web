import React, {useContext, useEffect, useRef, useState} from 'react'
import ReactImageFileToBase64 from "react-file-image-to-base64";
import { FaUpload, FaInfoCircle } from 'react-icons/fa';
import Select from 'react-select'
import { ManagerSelectedInstancesContext } from '../../App';
import { CanteenApi } from '../../Helpers/Service/CanteenService';
import { LoadingComponent } from '../LoadingComponent';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


export const ManagerAddMealComponent = () => {

    const managerSelectedInstancesContext = useContext(ManagerSelectedInstancesContext);

    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [portionOptions, setPortionOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [portionId, setPortionId] = useState(null);
    const [categoryId, setCategoryId] = useState(null);

    const categoryIdRef = useRef(null);
    const portionIdRef = useRef(null);


    useEffect(() => {
        Promise.all([
            CanteenApi.GetCategoryOptions().then(res => setCategoryOptions(res.map(x => {return {value: x.id, label: x.categoryName} }))),
            CanteenApi.GetPortionOptions().then(res => setPortionOptions(res.map(x => {return {value: x.id, label: x.portionName} })))
        ]).then(() => setLoading(false))
        .catch(() => toast.error('S-a produs o eroare!'));
    }, [])

    const addMeal = () => {
        if(name.trim() !== '' && description.trim() !== '' && price !== 0 && portionId !== null && categoryId !== null && image !== null){
            setLoading(true);
            let meal = {
                Name: name,
                Description: description,
                Price: price,
                PictureURL: image.base64_file,
                PortionId: portionId,
                CategoryId: categoryId,
                CanteenId: managerSelectedInstancesContext.managerSelectedCanteenId
            }

            CanteenApi.AddMeal(meal).then(() => {
                setImage(null);
                setName('');
                setDescription('');
                setPrice(0);
                setPortionId(null);
                setCategoryId(null);
                categoryIdRef.current = null;
                portionIdRef.current = null;
                setLoading(false);
                toast.success('Mancare adaugata cu succes!');
            })
            .catch(() => toast.error('S-a produs o eroare!'));
        }else{
            toast.warning('Completati fiecare camp!');
        }
    }

    const handleOnCompleted = files => {
        setImage(files[0]);
    };

  const CustomisedButton = ({triggerInput}) => {
    return (
      <div>
        <div 
            onClick={triggerInput}
            style={{height: 40, width: 400, border: 'none', padding: '5px 10px', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, 
                    fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12}}
            className='Canteen-uploadButton'
        >
            <FaUpload />
            <text><b>Incarcati o imagine</b></text> 
        </div>
      </div>
    );
  };

const colourStyles = {
control: (styles) => ({ ...styles, backgroundColor: 'white', borderRadius: 12, border: '2px solid #01135d', height: 50, color: '#01135d' }),
};

  return (
    <div>
        {loading === true &&
            <LoadingComponent/>
        }
        {loading === false &&
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 50, paddingBottom: 50, gap: 50, color: '#01135d'}}>
                <h1>Adaugati o masa noua</h1>
                <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                        <label><b>Denumire</b></label>
                        <input 
                            onChange={e => setName(e.target.value)}
                            type='text'
                            style={{height: 40, width: 400, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d', border: '2px solid #01135d'}}  
                        ></input>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                        <label><b>Descriere</b></label>
                        <textarea 
                            onChange={e => setDescription(e.target.value)}
                            style={{height: 120, width: 400, borderRadius: 12, fontSize: 16, padding: '10px 10px', color: '#01135d', border: '2px solid #01135d'}}    
                        ></textarea>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                        <label><b>Pret</b></label>
                        <input 
                            onChange={e => setPrice(e.target.value)}
                            type='number'
                            min={1}
                            style={{height: 40, width: 400, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d', border: '2px solid #01135d'}}  
                        ></input>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                        <label><b>Portie</b></label>
                        <Select 
                            value={portionIdRef.current === null ? null : portionOptions.find(e => e.value === portionIdRef.current)}
                            options={portionOptions} 
                            styles={colourStyles} 
                            onChange={e => {
                                setPortionId(e.value)
                                portionIdRef.current = e.value
                                }}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                        <label><b>Categorie</b></label>
                        <Select
                            value={categoryIdRef.current === null ? null : portionOptions.find(e => e.value === categoryIdRef.current)} 
                            options={categoryOptions} 
                            styles={colourStyles} 
                            onChange={e => {
                                setCategoryId(e.value)
                                categoryIdRef.current = e.value
                                }}/>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                        <label><b>Imagine</b></label>
                        <ReactImageFileToBase64 
                            CustomisedButton={CustomisedButton} 
                            multiple={false} 
                            onCompleted={handleOnCompleted}
                        />
                        <div style={{display: 'flex', gap: 8, justifyContent: 'flex-start', alignItems: 'center'}}>
                            {image === null && <FaInfoCircle style={{height: 20, width: 20}} />}
                            <label>{image === null ? 'Puteti incarca doar imagini!' : 'Fisier: ' + image.file_name}</label>
                        </div>
                    </div>

                    <div
                        style={{height: 40, width: 400, border: 'none', padding: '5px 10px', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 24}}
                        className='AddCanteen-addButton' 
                        onClick={() => addMeal()}
                    >
                        <text><b>Adaugati</b></text> 
                    </div>
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