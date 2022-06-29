import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import React from 'react'
import convertImageBase64 from '../../utils/convertImageBase64'

const OrderProduct = ({ product }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* <Box
        component={'img'}
        src={convertImageBase64(order.img)}
        alt={""}
      /> */}
      <Typography component={"span"}></Typography>
      <Typography component={"span"}></Typography>
      <Typography component={"span"}></Typography>
      <Typography component={"span"}></Typography>
      <Typography component={"span"}></Typography>

    </Box>
  )
}

export default OrderProduct