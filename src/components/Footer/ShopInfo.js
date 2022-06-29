import { Box, IconButton, Link as LinkMui, SvgIcon, Typography } from '@mui/material'
import React from 'react'
import FacebookIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';


const mediaChanels = [
    {
        icon: FacebookIcon,
        link: 'https://www.facebook.com/'
    },
    {
        icon: InstagramIcon,
        link: 'https://www.youtube.com/'
    },
    {
        icon: YouTubeIcon,
        link: 'https://www.youtube.com/'
    },
]

const MediaChanelItem = ({ link, icon }) => (
    <IconButton component={LinkMui} href={link}>
        <SvgIcon component={icon} fontSize={"large"} />
    </IconButton>
)

const ShopInfo = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                p:1
            }}
        >
            <Box
                component={'img'}
                src={"https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/logo.png"}
                alt="logo"
                sx={{ p: 1, mb: 1 }}
            />
            <Typography variant={"body2"} sx={{mb: 1}}>
                Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCMCông Ty Cổ Phần Phát Hà
                nh Sách TP HCM - FAHASA 60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam
            </Typography>
            <Typography variant={"body2"} sx={{mb: 1}}>
                Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi. KHÔNG hỗ tr
                ợ đặt mua và nhận hàng trực tiếp tại văn phòng cũng như tất cả Hệ
                Thống Fahasa trên toàn quốc.
            </Typography>
            <Box sx={{ display: 'flex' }}>
                {
                    mediaChanels.map((item, index) =>
                        <MediaChanelItem key={index} link={item.link} icon={item.icon} />
                    )
                }
            </Box>
        </Box>
    )
}

export default ShopInfo