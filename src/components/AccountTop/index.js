import React, { useState } from 'react'
import { DropdownContent, DropdownWrapper } from '../CustomDropdown'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AnonymousUser from './AnonymousUser';
import LoggedIn from './LoggedIn';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

const AccountTop = ({ ...other }) => {
    const [openDropdown, setOpenDropdown] = useState(false)
    const { isLoggedIn } = useSelector(state => state.auth)

    const showDropdown = () => {
        setOpenDropdown(true)
    }
    const closeDropdown = () => {
        setOpenDropdown(false)
    }
    return (
        <DropdownWrapper onMouseEnter={showDropdown} onMouseLeave={closeDropdown} {...other}>
            <IconButton component={Link} to={`/${isLoggedIn ? 'account' : 'login'}`} color="inherit" sx={{ p: 2, "&:hover": { bgcolor: 'unset' } }}>
                <AccountCircleIcon />
            </IconButton>
            <DropdownContent open={openDropdown} width={200}>
                {!isLoggedIn ? <AnonymousUser /> : <LoggedIn />}
            </DropdownContent>
        </DropdownWrapper>
    )
}

export default AccountTop