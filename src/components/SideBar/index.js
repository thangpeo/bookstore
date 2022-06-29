import { Box, Drawer, IconButton, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import CatalogMenu from '../CatalogMenu';

const SideBar = ({ open = false, onClose }) => {
    return (
        <Drawer
            anchor={'left'}
            open={open}
            onClose={onClose}
        >
            <Box
                bgcolor={"primary.main"}
                color={"white"}
                sx={{
                    display: 'flex',
                    justifyContent: "space-between",
                    flexDirection: "row-reverse",
                    position: 'sticky',
                    top: 0,
                    p: 1
                }}>
                <IconButton onClick={onClose}>
                    <CloseIcon sx={{ color: "transparent" }} />
                </IconButton>
                <Typography variant='h6' component={"h6"} textAlign={"center"} flexGrow={1}>
                    Danh mục sản phẩm
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon sx={{ color: "white" }} />
                </IconButton>
            </Box>
            <CatalogMenu nonActiveTab/>
        </Drawer>
    )
}

export default SideBar