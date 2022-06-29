import { Box } from '@mui/material'
import React, { useEffect, useRef } from 'react'

const InfinityList = ({ children, onReached, ...other }) => {
    const infinityListRef = useRef(null)
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (infinityListRef && infinityListRef.current) {
                if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
                    console.log("bottom reach")
                    onReached(infinityListRef.current)
                }
            }
        })
    }, [infinityListRef])

    return (
        <Box ref={infinityListRef} {...other}>
            {children}
        </Box>
    )
}
export default InfinityList