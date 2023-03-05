import React, {useState} from 'react'
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import Select from 'react-select'

export const AdminDeleteManagerComponent = () => {
    const [selectedManagerId, setSelectedManagerId] = useState(0);

    const options = [
        { value: 1, label: 'manager1@gmail.com' },
        { value: 2, label: 'manager2@gmail.com' },
        { value: 3, label: 'manager3@gmail.com' },
        { value: 4, label: 'manager4@gmail.com' }
      ]

    const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white', borderRadius: 12, border: '2px solid #01135d', height: 50, color: '#01135d' }),
    };

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 75, gap: 50, color: '#01135d'}}>
        <h1>Stergeti un manager existent</h1>
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>

            <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                <label><b>Selectati un manager</b></label>
                <Select options={options} styles={colourStyles} onChange={e => setSelectedManagerId(e.value)}/>
            </div>

            <div
                style={{height: 40, width: 400, border: 'none', padding: '5px 10px', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 24}}
                className='DeleteManager-deleteButton' 
            >
                <text><b>Stergeti</b></text> 
            </div>
        </div>
    </div>
  )
}
