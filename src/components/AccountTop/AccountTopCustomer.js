import ChevronRight from '@mui/icons-material/ChevronRight'
import { Avatar, Box, Link as LinkMui, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import { Link } from 'react-router-dom'

const AccountTopCustomer = ({name}) => {
    return (
        <LinkMui
            component={Link}
            to="/account"
            underline='none'
            sx={{
                display: 'flex',
                alignItems: "center",
                p: 1,
                cursor: 'pointer',
                "& > *": { p: 1 },
                "&:hover": { bgcolor: grey[100] }

            }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>T</Avatar>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="span" sx={{ fontWeight: 'bold', fontSize: 18, mb: 1 }}>
                    {name}
                </Typography>
                <Typography variant="span" color={grey[700]}>
                    Thành viên
                </Typography>
            </Box>
            <ChevronRight sx={{color: grey[700]}}/>
        </LinkMui>
    )
}

export default AccountTopCustomer