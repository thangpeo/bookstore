import { Box, Button } from '@mui/material'
import React, { useState } from 'react'

const ButtonWithOutline = ({ref = null, borderTop = false, borderLeft = false, borderBottom = false, borderRight = false, color = 'primary', children, borderColor = 'primary' }) => {
    const [active, setActive] = useState(true)
    return (
        <Box sx={{
            borderWidth: {
                xs: "3px",
                sm:"4px"
            },
            borderColor:`${borderColor}`,
            borderTopStyle: `${borderTop ? 'solid' : 'none'}`,
            borderRightStyle: `${borderRight ? 'solid' : 'none'}`,
            borderBottomStyle: `${borderBottom ? 'solid' : 'none'}`,
            borderLeftStyle: `${borderLeft ? 'solid' : 'none'}`,
            
            
        }}>
            <Button color={color}>
                {children}
            </Button>
        </Box>
    )
}

export default ButtonWithOutline