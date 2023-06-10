import React, {useEffect, useRef, useState} from 'react'
import ReactImageFileToBase64 from "react-file-image-to-base64";
import { FaUpload, FaInfoCircle } from 'react-icons/fa';
import Select from 'react-select'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { CanteenApi } from '../../../Helpers/Service/CanteenService';
import { LoadingComponent } from '../../LoadingComponent';

export const AdminEditCanteenComponent = () => {
    
    const [loading, setLoading] = useState(true);
    const [keepOldImage, setKeepOldImage] = useState(true);

    const handleOnCompleted = files => {
        setImage(files[0]);
    };

    const [canteens, setCanteens] = useState([]);
    const [canteenOptions, setCanteenOptions] = useState([]);
    
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);
    const [selectedCanteenId, setSelectedCanteenId] = useState(null);
    const canteenIdRef = useRef(null);

    const selectCanteen = (canteenId) => {
        let canteen = canteens.find(e => e.id === canteenId);
        setSelectedCanteenId(canteenId);
        canteenIdRef.current = canteenId;
        setName(canteen.name);
        setAddress(canteen.location);
    }

    const updateCanteen = () => {
        if(selectedCanteenId !== null){
            setLoading(true);
            let canteen = {
                Name: name,
                Location: address,
                PictureURL: image === null ? null : image.base64_file
            }
            CanteenApi.UpdateCanteen(selectedCanteenId, canteen)
            .then(() => {
                setName('');
                setAddress('');
                setImage(null);
                setSelectedCanteenId(null);
                canteenIdRef.current = null;
                setLoading(false);
                setKeepOldImage(true);
                toast.success('Cantina editata cu succes!');
            })
            .catch(() => toast.error('S-a produs o eroare!'));
        }else{
            toast.warning('Selectati o cantina!');
        }
    }

    useEffect(() => {
        CanteenApi.GetCanteens() 
        .then(res => {
            setCanteens(res);
            setCanteenOptions(res.map(canteen => {return {label: canteen.name, value: canteen.id}}))
            setLoading(false);
        })
        .catch(() => toast.error('S-a produs o eroare!'));
    }, [])

  const CustomisedButton = ({triggerInput}) => {
    return (
      <div>
        <div 
            onClick={triggerInput}
            style={{height: 40, width: 400, border: 'none', padding: '5px 10px', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12}}
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
            <LoadingComponent />
        }
        {loading === false &&
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 100, gap: 50, color: '#01135d'}}>
                <h1>Modificati detaliile unei cantine existente</h1>
                <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                    
                    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                        <label><b>Selectati o cantina</b></label>
                        <Select 
                            options={canteenOptions} 
                            value={canteenIdRef.current === null ? null : canteenOptions.find(e => e.value === canteenIdRef.current)} 
                            styles={colourStyles} 
                            onChange={e => {
                                selectCanteen(e.value);
                            }}
                            />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                        <label><b>Denumire</b></label>
                        <input 
                            type='text'
                            style={{height: 40, width: 400, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d'}}  
                            value={name}
                            onChange={e => setName(e.target.value)}
                        ></input>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                        <label><b>Adresa</b></label>
                        <input 
                            type='text'
                            style={{height: 40, width: 400, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d'}}
                            value={address}
                            onChange={e => setAddress(e.target.value)}   
                        ></input>
                    </div>
                    <div style={{display: 'flex', width: 424, justifyContent: 'flex-start'}}>
                        <FormControlLabel control={<Switch defaultChecked value={keepOldImage} onChange={e => setKeepOldImage(e.target.checked)}/>} label="Pastrati imaginea veche" />
                    </div>
                    {keepOldImage === false &&
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
                    }

                    <div
                        style={{height: 40, width: 400, border: 'none', padding: '5px 10px', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 24}}
                        className='EditCanteen-editButton'
                        onClick={() => updateCanteen()} 
                    >
                        <text><b>Finalizati</b></text> 
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