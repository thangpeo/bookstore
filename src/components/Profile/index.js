import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import userApi from '../../api/userApi';
import { useSelector } from 'react-redux';

const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),

}).required();

const Profile = () => {
    const userInfo = useSelector(state => state.auth.userInfo)
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
        }
    });
    const onSubmit = async data => {
        try {
            await userApi.updateInfo({ ...userInfo, ...data, })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Box sx={{ py: 1, px: 2, width: 400, maxWidth: '100%', mx: 'auto' }}>
            <Typography variant='h6'>Thông tin tài khoản</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => <TextField label="First name" margin='normal' error={errors.firstName ? true : false}
                        helperText={errors.firstName?.message} {...field} />}
                />
                <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => <TextField label="Last name" margin='normal' error={errors.lastName ? true : false}
                        helperText={errors.lastName?.message} {...field} />}
                />
                <Box textAlign={"center"}>
                    <Button type="submit" variant="contained">Thay đổi thông tin</Button>
                </Box>
            </Box>
        </Box >
    )
}

export default Profile