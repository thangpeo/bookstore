import { Box, Button, Modal } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { openModal } from '../../redux/AuthModalSlice'
import Auth from '../Auth'



const AnonymousUser = () => {
  const dispatch = useDispatch()

  const openLoggin = () => {
    dispatch(openModal('login'))
  }
  const openRegister = () => {
    dispatch(openModal('register'))
  }
  return (<>
    <Box sx={{ display: 'flex', flexDirection: 'column', px: 2, py: 1 }}>
      <Button variant='contained' color="primary" sx={{ mb: 1 }} disableElevation onClick={openLoggin}>
        Đăng nhập
      </Button>
      <Button variant='outlined' color="primary" sx={{ mb: 1 }} disableElevation onClick={openRegister}>
        Đăng ký
      </Button>
    </Box>

  </>
  )
}

export default AnonymousUser