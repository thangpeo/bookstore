import { Box, Button, Collapse, Typography } from '@mui/material'
import React from 'react'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const minHeightCollapse = 160

const ProductFilter = ({ title, children, alwaysShow = false }) => {
    const [expand, setExpand] = React.useState(false)
    const [needExpand, setNeedExpand] = React.useState(false)
    const filterItemContainerRef = React.useRef(null)
    const collapseRef = React.useRef(null)
    const expandMore = () => {
        setExpand(true)
    }
    const expandLess = () => {
        setExpand(false)
    }
    React.useEffect(() => {
        if (filterItemContainerRef.current) {
            const heightFilterItems = filterItemContainerRef.current.clientHeight
            if (heightFilterItems > minHeightCollapse) {
                setNeedExpand(heightFilterItems > minHeightCollapse)
            } else {
                collapseRef.current.style.minHeight = heightFilterItems + "px"
            }
        }
    }, [filterItemContainerRef, children])



    return (
        <Box sx={{ borderTop: 1, borderBottom: 1, borderColor: 'divider', borderCollapse: true, p: 1 }}>
            <Typography gutterBottom sx={{ fontSize: 16, fontWeight: 'bold' }}>
                {title}
            </Typography>
            <Collapse ref={collapseRef} orientation='vertical' collapsedSize={`${minHeightCollapse}px`} in={alwaysShow ? alwaysShow : expand}>
                <Box ref={filterItemContainerRef} sx={{ display: 'flex', flexDirection: ' column' }}>
                    {children}
                </Box>
            </Collapse>
            {!alwaysShow && needExpand && <Button
                startIcon={expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                onClick={expand ? expandLess : expandMore}
            >
                {expand ? "Ẩn bớt" : "Xem thêm"}
            </Button>}
        </Box>
    )
}

export default ProductFilter