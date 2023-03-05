import React, {useState} from 'react'
import Select from 'react-select'

export const AdminDeleteCanteenComponent = () => {

    const [selectedCanteenId, setSelectedCanteenId] = useState(0);

    const options = [
        { value: 1, label: 'Cantina Studenteasca' },
        { value: 2, label: 'Cantina 1MV' }
      ]

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white', borderRadius: 12, border: '2px solid #01135d', height: 50, color: '#01135d' }),
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 100, gap: 50, color: '#01135d'}}>
        <h1>Stergeti o cantina existenta</h1>
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
                <label><b>Selectati o cantina</b></label>
                <Select options={options} styles={colourStyles} onChange={e => setSelectedCanteenId(e.value)}/>
            </div>

            <div
                style={{height: 40, width: 400, border: 'none', padding: '5px 10px', borderRadius: 10,backgroundColor: '#01135d', color: '#D7DEFE', fontSize: 16, fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 24}}
                className='EditCanteen-editButton' 
            >
                <text><b>Stergeti</b></text> 
            </div>
        </div>
    </div>
  )
}