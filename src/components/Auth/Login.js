import { Box, Button, Link, TextField, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { login } from '../../redux/AuthSlice';

const schema = yup.object({
    username: yup.string().email("Không đúng định dạng").required("Không được để trống"),
    password: yup.string().required('Mật khẩu không được để trống'),
}).required();

const Login = ({ goToForgotPassword }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: ""
        },
        resolver: yupResolver(schema),

    });

    const { isLoading, error } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        dispatch(login(data))
    }


    return (
        <Box
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                p: 2,
            }}>
            {error && <Typography color="error">Sai tên tài khoản hoặc mật khẩu</Typography>}
            <Controller
                name="username"
                control={control}
                render={({ field }) =>
                    <TextField
                        fullWidth
                        label="Email"
                        margin='normal'
                        error={errors.username ? true : false}
                        helperText={errors.username?.message}
                        {...field} />}
            />
            <Controller
                name="password"
                control={control}
                render={({ field }) =>
                    <TextField
                        type={"password"}
                        fullWidth
                        margin='normal'
                        label="Mật khẩu"
                        error={errors.password ? true : false}
                        helperText={errors.password?.message}
                        {...field}
                    />}
            />


            <Link
                component={'div'}
                textAlign="right"
                underline="hover"
                onClick={goToForgotPassword}
                sx={{ alignSelf: 'end', mb: 1, cursor: 'pointer' }}>
                Quên mật khẩu?
            </Link>
            <Box sx={{ textAlign: 'center' }}>
                <Button type={'submit'} variant="contained" >Đăng nhập</Button>
            </Box>
        </Box>
    )
}

export default Login