import React from 'react'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export const SaveCardModal = ({
    open,
    onNoClicked,
    onYesClicked
}) => {
  return (
    <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 500, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 24}}>
                <h3>Doriti sa salvati acest card pentru viitoare tranzactii?</h3>
                <div style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                    <button 
                        className="Modal-noButton" 
                        style={{height: 35, width: 100, borderRadius: 7, backgroundColor: '#9BADFD', border: 'none', paddingLeft: 20, paddingRight: 20, color: '#01135d', cursor: 'pointer', marginLeft: 4}} 
                        onClick={() => onNoClicked()}><b>Nu</b></button>
                    <button 
                        className="Modal-yesButton" 
                        style={{height: 35, width: 100, borderRadius: 7, backgroundColor: '#01135d', border: 'none', paddingLeft: 20, paddingRight: 20, color: '#9BADFD', cursor: 'pointer', marginRight: 36}} 
                        onClick={() => onYesClicked()}><b>Da</b></button>
                </div>
            </div>
        </Box>
    </Modal>
  )
}