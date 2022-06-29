import { Box, Rating, Typography } from '@mui/material'
import React from 'react'


const CommentItem = ({ name, date, comment, rate }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: "column", sm:'row' }, p: 1 }}>
            <Box sx={{ width: { xs: '100%', sm:"25%" }, display: 'flex', flexDirection: { xs: "row", sm:'column' }, justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: "bold" }}>{name}</Typography>
                <Typography sx={{ color: 'gray' }}>{date}</Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Rating value={rate} size="small" readOnly sx={{ display: 'flex' }} />
                <Typography variant="span" sx={{ py: 1 }}>{comment}</Typography>
            </Box>
        </Box>
    )
}


const ProductComments = ({ comments }) => {
    return (
        <Box component={"ul"} sx={{ listStyle: 'none', p: 0 }}>
            {
                comments.map((item, index) =>
                    <Box component={"li"} key={index} sx={{ border: 1, borderColor: 'divider' }}>
                        <CommentItem comment={item.comment} date={item.date} name={item.displayName} rate={item.rate} />
                    </Box>
                )
            }
        </Box>

    )
}

export default ProductComments