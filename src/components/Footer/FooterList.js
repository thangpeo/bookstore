import { Typography, Link as LinkMui, MenuList, MenuItem } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom'

const CustomLink  = styled(LinkMui)({})

const FooterList = ({ title, listItem }) => {
    return (
        <div>
            <Typography variant={'h6'} sx={{px :1}}>
                {title}
            </Typography>
            <MenuList>
                {
                    listItem.map((item, index) =>
                        <MenuItem key={index} sx={{whiteSpace: "normal", p: 1}}>
                            <LinkMui color="inherit" component={Link} to={item.to} underline={"none"} sx={{width: '100%', fontSize: 13}}>
                                {item.label}
                            </LinkMui>
                        </MenuItem>
                    )
                }
            </MenuList>
        </div>
    )
}

export default FooterList