import { Box, IconButton, TextField } from '@mui/material'
import React from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const InputQuantity = (props) => {
    const { minValue = 1, onValueMinimum } = props
    const [quantity, setQuantity] = React.useState(props.quantity > 0 ? props.quantity : 1)
    const inputRef = React.useRef()
    const updateQuantity = (type) => {
        let newQuantity = quantity
        if (type === 'plus') {
            newQuantity = Number(quantity + 1)
            setQuantity(newQuantity)
            props.onChange(inputRef.current, newQuantity)
        } else {

            if (quantity === minValue) {
                if (props.onValueMinimum) {
                    props.onValueMinimum(inputRef.current)
                }
            } else {
                newQuantity = quantity - 1
                setQuantity(newQuantity)
                props.onChange(inputRef.current, newQuantity)
            }
        }

    }
    const handleQuantityChange = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            const checkNumber = Number(e.target.value)
            const newQuantity = checkNumber === 0 ? 1 : checkNumber
            setQuantity(newQuantity)
            props.onChange(inputRef.current, newQuantity)
        } else {
            e.target.value = quantity
        }

    }


    return (
        <Box sx={{ display: 'flex', py: 2,alignItems:'center' }}>
            <IconButton onClick={() => updateQuantity('minus')}>
                <RemoveIcon />
            </IconButton>
            <TextField size={"small"} inputRef={inputRef} value={quantity} onChange={handleQuantityChange}
                InputProps={{ inputProps: { style: { textAlign: "center", width: 50, padding: "4px 8px" }, } }}
            />
            <IconButton onClick={() => updateQuantity('plus')}>
                <AddIcon />
            </IconButton>
        </Box>
    )
}

export default InputQuantity