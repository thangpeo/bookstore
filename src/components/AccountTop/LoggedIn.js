import React from 'react'
import { Box } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import ReceiptIcon from '@mui/icons-material/Receipt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountTopItem from './AccountTopItem';
import AccountTopCustomer from './AccountTopCustomer';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/AuthSlice';

const accountPages = [
    {
        icon: ReceiptIcon,
        label: 'Đơn hàng của tôi',
        to: '/account/order'
    },
    {
        icon: FavoriteBorderIcon,
        label: 'Sản phẩm yêu thích',
        to: '/account/wishlist'
    },
    {
        icon: LogoutIcon,
        label: 'Đăng xuất',
        to: '/account/logout',
        doCallback(e, callback) {
            e.preventDefault()
            callback()
        }
    },
]

const LoggedIn = () => {
    const userInfo = useSelector(state => state.auth.userInfo)
    const dispatch = useDispatch()
    const doLogout = () => {
        dispatch(logout())
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: 400 }}>
            <Box>
                <AccountTopCustomer name={`${userInfo.firstName} ${userInfo.lastName}`} />
            </Box>
            <Box>
                {
                    accountPages.map((item, index) =>
                        <AccountTopItem
                            key={index}
                            icon={item.icon}
                            label={item.label}
                            to={item.to}
                            onClick={(e) => item.doCallback(e, doLogout)}
                        />
                    )
                }
            </Box>
        </Box>
    )
}

export default LoggedIn