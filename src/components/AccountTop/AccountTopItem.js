import { SvgIcon, Typography, Link as LinkMui } from '@mui/material'
import { grey } from '@mui/material/colors'
import React from 'react'
import { Link } from 'react-router-dom'

const AccountTopItem = ({ to, icon, label, ...other }) => {
    return (
        <LinkMui
            sx={{
                display: 'flex',
                alignItems: 'center',
                "&>*": { p: 1 },
                borderTop: 1,
                borderColor: 'divider',
                px:1,
                "&:hover":{
                    bgcolor: grey[100]
                }
            }}
            underline={'none'}
            color={grey[700]}
            component={Link}
            to={to}
            {...other}
        >
            <SvgIcon component={icon} />
            <Typography variant='span'>{label}</Typography>
        </LinkMui>
    )
}

export default AccountTopItem