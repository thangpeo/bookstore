import { Backdrop, Box, Modal } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideModal } from '../../redux/AuthModalSlice'
import Auth from '../Auth'

const AuthModal = () => {
    const { open, type } = useSelector(state => state.authModal)

    const dispatch = useDispatch()
    

    return (
        <Modal
            keepMounted
            open={open}
            onClose={() => dispatch(hideModal())}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            sx={{
                height: '100%', overflow: 'auto'
            }}
        >
            <Box sx={{ mx: 'auto', position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)'}}>
                <Auth type={type} />
            </Box>
        </Modal>
    )
}

export default AuthModal