import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import userApi from '../api/userApi';
import Helmet from '../components/Helmet';
import ShippingAddressForm from '../components/ShippingAddressForm';

const EditShippingAddress = () => {
    const { id } = useParams();
    const [shippingAddress, setShippingAddress] = useState(null)
    const userInfo = useSelector(state => state.userInfo)
    useEffect(() => {
        const getShippingAddressById = async (username, id) => {
            const { data } = await userApi.getShippingAddressById(username, id)
            if (Object.keys(data).length > 0) {
                setShippingAddress(shippingAddress)
            }
        }
        //   getShippingAddressById(userInfo.username, id)
    }, [id, userInfo, shippingAddress])


    return (
        <Helmet title="Thay đổi địa chỉ giao hàng">
            {
                shippingAddress ? <ShippingAddressForm title='Sửa địa chỉ' shippingAddress={shippingAddress} />
                    : <ShippingAddressForm title='Thêm địa chỉ mới' />
            }
        </Helmet>
    )
}

export default EditShippingAddress