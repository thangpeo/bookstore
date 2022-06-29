import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Auth from '../components/Auth'
import Helmet from '../components/Helmet'

const Login = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    if (isLoggedIn) {
        return <Navigate to="/account" replace />
    }
    return <Helmet title="Đăng nhập">
        <Auth />
    </Helmet>
}

export default Login