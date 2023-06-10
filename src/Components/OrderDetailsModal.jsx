import React from 'react'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { VscChromeClose } from 'react-icons/vsc'

export const OrderDetailsModal = ({
    open,
    onClose,
    currentOrder
}) => {
  return (
    <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 750, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2}}>
            {currentOrder !== null &&
                <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                        <VscChromeClose style={{width: 30, height: 30, cursor: 'pointer', color: '#01135d'}} onClick={() => onClose()}/>
                    </div>
                    <h1 style={{textAlign: 'center', color: '#01135d'}}>Numar comanda: {currentOrder.orderNumber}</h1>
                    <div style={{display: 'flex', flexDirection: 'column', gap: 12, width: 650, paddingLeft: 20, paddingRight: 20, marginTop: 32}}>
                        {currentOrder.orderItemsDTO.map(orderItem => (
                            <div style={{width: '100%', height: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #01135d', borderRadius: 20, paddingLeft: 25, color: '#01135d', paddingRight: 25}}>
                                <div style={{display: 'flex', height: 100, alignItems: 'center', gap: 25}}>
                                    <img 
                                        src={orderItem.meal.pictureURL} 
                                        alt='' 
                                        style={{width: 75, height: 75, borderRadius: 20}}  
                                    />
                                    <div style={{height: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 20, paddingBottom: 20, gap: 20}}>
                                        <text><b>{orderItem.meal.name}</b></text>
                                        <text><b>Pret: {orderItem.meal.price} lei</b></text>
                                    </div>
                                </div>    
                                <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>   
                                    <VscChromeClose style={{width: 20, height: 20, marginTop: 4, fontWeight: 'bold'}}/>
                                    <text style={{fontSize: 24}}>{orderItem.quantity}</text>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h2 style={{textAlign: 'center', marginTop: 32, color: '#01135d', textDecoration: 'underline', marginBottom: 32}}>Pret total: {currentOrder.totalPrice} lei</h2>
                </div>
            }
        </Box>
    </Modal>
  )
}
