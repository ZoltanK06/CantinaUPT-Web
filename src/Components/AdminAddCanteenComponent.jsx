import React, {useState} from 'react'
import ReactImageFileToBase64 from "react-file-image-to-base64";
import { FaUpload, FaInfoCircle } from 'react-icons/fa';

export const AdminAddCanteenComponent = () => {

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

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 100, gap: 50, color: '#01135d'}}>
        <h1>Adaugati o cantina noua</h1>
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                <label><b>Denumire</b></label>
                <input 
                    type='text'
                    style={{height: 40, width: 400, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d'}}  
                ></input>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                <label><b>Adresa</b></label>
                <input 
                    type='text'
                    style={{height: 40, width: 400, borderRadius: 12, fontSize: 16, padding: '5px 10px', color: '#01135d'}}    
                ></input>
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