import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Collapse, List, ListItem, ListItemIcon, ListItemText, Link as LinkMui } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const hover = {
    "&:hover": {
        cursor: 'pointer'
    }
}

const CategoryListItem = ({ category }) => {
    const [open, setOpen] = React.useState(false)
    const navigate = useNavigate()
    const handleClick = () => {
        setOpen(!open);
    };
    return (
        category && <> <ListItem>
            <ListItemText primary={category.name} onClick={() => navigate(`/products/${category._id}`)}
                sx={hover}
                primaryTypographyProps={{fontSize: 16}}
            />
            {
                category.types && <ListItemIcon onClick={handleClick} sx={hover}>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemIcon>
            }
        </ListItem>
            {category.types && <Collapse in={open}>
                <List component="div" disablePadding>
                    {
                        category.types.map((type, i) => {
                            return <ListItem key={i} sx={{ pl: 4 }}>
                                <ListItemText primary={type.name} onClick={() => navigate(`/products/${category._id}/${type._id}`)}
                                    sx={{...hover}}
                                    primaryTypographyProps={{fontSize: 14}}
                                />
                            </ListItem>
                        })
                    }
                </List>
            </Collapse>}
        </>
    )
}

export default CategoryListItem