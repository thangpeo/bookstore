import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import convertImageBase64 from '../../utils/convertImageBase64'

const BannerItem = ({ src, href = "/"}) => {
    return (
        <Box component={Link} to={href}>
                <Box
                    component={"img"}
                    src={convertImageBase64(src)}
                    alt={"banner"}
                    sx={{
                        width: "100%"
                    }}
                />
        </Box>
    )
}

export default BannerItem