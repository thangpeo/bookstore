import { Box, Typography } from '@mui/material'
import React from 'react'
import CatalogContentItem from './CatalogContentItem'


const CatalogTabPanel = ({ children, value, index, item, hasAllItem = false, ...other }) => {
    return <Box sx={{ flexGrow: 1 }}
        role="tabpanel"
        hidden={value !== index}
        {...other}>
        <Box sx={{width: '100%'}}>
            <Typography variant='h6' component={"h6"} sx={{ fontWeight: "bold", color: "inherit", px: 1, fontSize: 18 }}>
                {item.name}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                    hasAllItem && <CatalogContentItem href={`/products/${item._id}`}>
                        Tất cả sản phẩm
                    </CatalogContentItem>
                }
                {
                    item.types.map((type, index) =>
                        <CatalogContentItem href={`/products/${item._id}/${type._id}`} key={index}>
                            {type.name}
                        </CatalogContentItem>)
                }
            </Box>
        </Box>
    </Box>
}

export default CatalogTabPanel