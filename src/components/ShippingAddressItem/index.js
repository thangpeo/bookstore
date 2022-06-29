import { Box, Button, Divider, Stack } from '@mui/material'
import React from 'react'
import userApi from '../../api/userApi'

const ShippingAddressItem = ({ data, onRemoveClick, onEditClick}) => {
    const { province, district, ward, address, phone, receiverFullName, isDefault, _id } = data
    
    
    return (
        data && <Box sx={{ fontSize: 14, mb: 1, p: 1 }}>
            <p>{receiverFullName}</p>
            <p>{province}</p>
            <p>{district}</p>
            <p>{ward}</p>
            <p>{address}</p>
            <p>{phone}</p>
            <p>{isDefault}</p>

            {
                isDefault ?
                    <Button size='small' onClick={onEditClick}>Thay đổi thông tin</Button>
                    : <Stack
                        direction="row"
                        divider={<Divider orientation="vertical" flexItem />}
                        spacing={2}
                    >
                        <Button size='small' onClick={onEditClick}>Sửa địa chỉ</Button>
                        <Button size='small' color="error" onClick={onRemoveClick}>Xóa địa chỉ</Button>
                    </Stack>
            }
        </Box>
    )
}

export default ShippingAddressItem