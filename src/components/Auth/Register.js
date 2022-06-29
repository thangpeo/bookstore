import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import authApi from '../../api/authApi';

const schema = yup.object({
    lastName: yup.string().required("Không được để trống"),
    firstName: yup.string().required("Không được để trống"),
    username: yup.string().email("Email không đúng định dạng").required("Không được để trống"),
    password: yup.string().min(6, "mật khẩu phải có ít nhất 6 ký tự").required('Mật khẩu không được để trống'),
    repassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Không trùng khớp')
}).required();


const Register = ({ onRegisterSuccess }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            username: '',
            password: "",
            repassword: "",
            lastName: "",
            firstName: ""
        },
        resolver: yupResolver(schema),

    });
    const registerAccount = async (data) => {
        const response = await authApi.register(data)
        if (response.data) {
            if (onRegisterSuccess) {
                onRegisterSuccess()
            }
        }else{
            
        }
    }
    const onSubmit = (data) => {
        registerAccount(data)
    }
    return (
        <Box
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                p: 2,
            }}>
            <Controller
                name='firstName'
                control={control}
                render={({ field }) =>
                    <TextField fullWidth
                        label="Tên"
                        margin='normal'
                        error={errors.firstName ? true : false}
                        helperText={errors.firstName?.message}
                        {...field} />
                }
            />
            <Controller
                name='lastName'
                control={control}
                render={({ field }) =>
                    <TextField fullWidth
                        label="Họ"
                        margin='normal'
                        error={errors.lastName ? true : false}
                        helperText={errors.lastName?.message}
                        {...field} />
                }
            />
            <Controller
                name='username'
                control={control}
                render={({ field }) =>
                    <TextField fullWidth
                        label="Email"
                        margin='normal'
                        error={errors.username ? true : false}
                        helperText={errors.username?.message}
                        {...field} />
                }
            />
            <Controller
                name='password'
                control={control}
                render={({ field }) =>
                    <TextField fullWidth
                        type={"password"}
                        margin='normal'
                        label="Mật khẩu"
                        error={errors.password ? true : false}
                        helperText={errors.password?.message}
                        {...field} />
                }
            />
            <Controller
                name='repassword'
                control={control}
                render={({ field }) =>
                    <TextField
                        fullWidth
                        label="Nhập lại mật khẩu"
                        margin='normal'
                        error={errors.repassword ? true : false}
                        helperText={errors.repassword?.message}
                        {...field} />
                }
            />
            <Box sx={{ textAlign: 'center' }}>
                <Button variant='contained' type={"submit"}>Đăng ký</Button>
            </Box>
        </Box>
    )
}

export default Register