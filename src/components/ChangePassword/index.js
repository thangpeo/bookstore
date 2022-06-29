import { Box, Typography, TextField, Button } from '@mui/material'
import React from 'react'
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import userApi from '../../api/userApi';

const schema = yup.object({
    password: yup.string().required(),
    newPassword: yup.string().required(),
    rePassword: yup.string()
        .oneOf([yup.ref('newPassword'), null], 'Không trùng khớp')

}).required();


const ChangePassword = () => {

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = async data => {
        try {
            await userApi.changePassword(data)
        } catch (error) {
            
        }
    }
    return (
        <Box sx={{ py: 1, px: 2, width: 400, maxWidth: '100%', mx: 'auto' }}>
            <Typography variant='h6'>Đổi mật khẩu</Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => <TextField label="Mật khẩu hiện tại" margin='normal' error={errors.password ? true : false}
                        helperText={errors.password?.message} {...field} />}
                />
                <Controller
                    name="newPassword"
                    control={control}
                    render={({ field }) => <TextField label="Mật khẩu mới" margin='normal' error={errors.newPassword ? true : false}
                        helperText={errors.newPassword?.message} {...field} />}
                />
                <Controller
                    name="rePassword"
                    control={control}
                    render={({ field }) => <TextField label="Nhập lại mật khẩu mới" margin='normal' error={errors.rePassword ? true : false}
                        helperText={errors.rePassword?.message} {...field} />}
                />
                <Box textAlign={"center"}>
                    <Button type="submit" variant="contained">Thay đổi thông tin</Button>
                </Box>
            </Box>
        </Box >
    )
}

export default ChangePassword