import React from 'react'
import { Typography, Link } from '@mui/material'

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link as LinkRouter } from "react-router-dom"

const CatalogContentItem = ({ href = '#', children }) => {
    return (
        <Link
            component={LinkRouter}
            to={href}
            underline={"hover"}
            sx={{
                width: {
                    xs: '100%',
                    sm: '50%',
                    lg: '25%'
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: '4px',
                fontSize: 14
            }}>
            <Typography variant={"span"} sx={{ px: '8px', py: '12px' }}>{children}</Typography>
            <ChevronRightIcon color="inherit"
                sx={{
                    display: {
                        xs: 'block',
                        sm: 'none'
                    }
                }}
            />
        </Link>
    )
}

export default CatalogContentItem