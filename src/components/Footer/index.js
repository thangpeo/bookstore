import { Box, Container, Grid, Paper, SvgIcon, Typography } from '@mui/material'
import React from 'react'
import FooterList from './FooterList'
import ShopInfo from './ShopInfo'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const listFooterItem = [
    {
        title: 'Dịch vụ',
        listItem: [
            {
                label: 'Điều khoản dịch vụ',
                to: '/'
            },
            {
                label: 'Chính sách bảo mật',
                to: '/'
            },
            {
                label: 'Giới thiệu Fahaha',
                to: '/'
            },
            {
                label: 'Hệ thống trung tâm - nhà sách',
                to: '/'
            },
        ]
    },
    {
        title: 'Hỗ trợ',
        listItem: [
            {
                label: 'Chính sách đổi - trả - hoàn tiền',
                to: '/'
            },
            {
                label: 'Chính sách khách sỉ',
                to: '/'
            },
            {
                label: 'Phương thức vận chuyển',
                to: '/'
            },
            {
                label: 'Phương thức thanh toán và xuất hóa đơn',
                to: '/'
            },
        ]
    },
    {
        title: 'Tài khoản của tôi',
        listItem: [
            {
                label: 'Đăng nhập/Đăng ký',
                to: '/'
            },
            {
                label: 'Thay đổi địa chỉ khách hàng',
                to: '/'
            },
            {
                label: 'Chi tiết tài khoản',
                to: '/'
            },
            {
                label: 'Lịch sử mua hàng',
                to: '/'
            },
        ]
    },
]

const contacts = [
    {
        icon: LocationOnIcon,
        label: '60-62 Lê Lợi, Q.1, TP. HCM',
    },
    {
        icon: EmailIcon,
        label: 'cskh@fahasa.com.vn',
    },
    {
        icon: PhoneIcon,
        label: '09872635124',
    },
]


const Footer = () => {
    return (
        <Paper component={'footer'} sx={{ mt: 2, pb: 5}}>
            <Container disableGutters maxWidth={"lg"} sx={{ p: 1 }}>
                <Grid container spacing={0}>
                    <Grid item xs={12} md={4} sx={{ borderRight: { xs: 0, sm:1 }, borderColor: 'divider' }}>
                        <ShopInfo />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid container sx={{ p: 1 }} spacing={2}>
                            {
                                listFooterItem.map((item, index) =>
                                    <Grid key={index} item xs={12} md={4}>
                                        <FooterList key={index} title={item.title} listItem={item.listItem} />
                                    </Grid>
                                )
                            }
                        </Grid>
                        <Box sx={{ p: 1 }}>
                            <Typography component={"h6"} variant={"h6"} sx={{ p: 1 }}>Liên hệ</Typography>
                            <Box sx={{ display: { xs: 'block', sm:'flex' } }}>
                                {
                                    contacts.map((item, index) => {
                                        return <Box key={index} sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', mb: 1, fontSize: 12 }}>
                                            <SvgIcon component={item.icon} />
                                            <Typography variant={"span"} sx={{pl: 1}}>{item.label}</Typography>
                                        </Box>
                                    })
                                }
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}

export default Footer