import React, {useState} from 'react'
import ReactImageFileToBase64 from "react-file-image-to-base64";
import { FaUpload, FaInfoCircle } from 'react-icons/fa';
import Select from 'react-select'


export const ManagerAddMealComponent = () => {
    const [image, setImage] = useState(null);

    const handleOnCompleted = files => {
        console.log(files);
        setImage(files[0]);
    };

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

  const portionOptions = [
    { value: 1, label: 'Felie' },
    { value: 2, label: 'Bucata' },
    { value: 3, label: 'Bol'},
    { value: 4, label: 'Castron'},
    { value: 5, label: 'Servire'}
  ]

  const categoryOptions = [
    { value: 1, label: 'Supa' },
    { value: 2, label: 'Garnitura' },
    { value: 3, label: 'Carne'},
    { value: 4, label: 'Desert'},
    { value: 5, label: 'Muratura'},
    { value: 6, label: 'Sos'}
  ]

const colourStyles = {
control: (styles) => ({ ...styles, backgroundColor: 'white', borderRadius: 12, border: '2px solid #01135d', height: 50, color: '#01135d' }),
};

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 50, paddingBottom: 50, gap: 50, color: '#01135d'}}>
        <h1>Adaugati o masa noua</h1>
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                <label><b>Denumire</b></label>
                <input 
                    type='text'
                    style={{height: 40, width: 400, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d', border: '2px solid #01135d'}}  
                ></input>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                <label><b>Descriere</b></label>
                <textarea 
                    style={{height: 120, width: 400, borderRadius: 12, fontSize: 16, padding: '10px 10px', color: '#01135d', border: '2px solid #01135d'}}    
                ></textarea>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                <label><b>Pret</b></label>
                <input 
                    type='number'
                    min={1}
                    style={{height: 40, width: 400, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d', border: '2px solid #01135d'}}  
                ></input>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                <label><b>Portie</b></label>
                <Select options={portionOptions} styles={colourStyles}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                <label><b>Categorie</b></label>
                <Select options={categoryOptions} styles={colourStyles}/>
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
            >
                <text><b>Adaugati</b></text> 
            </div>
        </div>
    </div>
  )
}