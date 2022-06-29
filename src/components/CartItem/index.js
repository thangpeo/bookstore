import { Box, IconButton, Paper, Typography, Link as LinkMui } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { removeCartItem, updateCartItem } from '../../redux/CartSlice'
import convertImageBase64 from "../../utils/convertImageBase64"
import numberWithCommas from "../../utils/numberWithCommas"
import InputQuantity from '../InputQuantity'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from 'react-router-dom'

const CartItem = ({ product }) => {
  const { image, name, quantity, price } = product
  const dispatch = useDispatch()
  const onChange = (e, newValue) => {
    dispatch(updateCartItem({ ...product, quantity: newValue }))
  }
  const removeItem = () => {
    dispatch(removeCartItem(product))
  }
  // const onValueMinimum = () => {
  //   removeItem()
  // }
  return (
    <Paper sx={{ display: 'flex', flexDirection: { xs: "column", sm:'row' }, alignItems: 'center', mt: 1, p: 1, "&:hover": { bgcolor: 'rgba(0,0,0,0.01)' } }}>
      <Box sx={{ flexGrow: 1, display: 'flex', width: '100%' }}>
        <LinkMui component={Link} to={`/ProductDetail/${product._id}`}>
          <Box
            component={'img'}
            // src={convertImageBase64(image)}
            src={image}
            alt={name}
            sx={{ height: { xs: 60, sm:120 }, width: { xs: 60, sm:120 } }}
          />
        </LinkMui>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 1 }}>
          <Typography
            sx={{
              textDecoration: 'none', fontSize: { xs: 12, sm:15, color: 'black' },
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}
            component={Link}
            to={`/ProductDetail/${product._id}`}>
            {name}
          </Typography>
          <Typography color={"red"} sx={{ fontWeight: 'bold' }}>{numberWithCommas(price)} VNĐ</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <InputQuantity onChange={onChange} quantity={quantity} />
        <IconButton onClick={removeItem} sx={{ p: 1 }}>
          <DeleteOutlineIcon />
        </IconButton>
      </Box>
    </Paper>
  )
}

export default CartItem