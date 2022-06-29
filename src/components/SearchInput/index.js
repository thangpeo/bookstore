import { Box, Button, InputBase } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const [searchKey, setSearchKey] = useState("")
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/products?q=${searchKey}`)
    
  }
  const handleChange = (e) => {
    const { value } = e.target
    setSearchKey(value)
  }
  return (
    <Box
      component={"form"}
      bgcolor={"white"}
      onSubmit={handleSubmit}
      sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', my: 'auto', px:1 }}
    >

      <InputBase
        sx={{ flexGrow: 1, py: 4 + 'px', px: 1 }}
        placeholder="Tìm kiếm..."
        value={searchKey}
        name="search"
        onChange={handleChange}
      />
      <Button variant='contained' type='submit' color='primary' sx={{ p: 4 + 'px' }}>
        <SearchIcon color='inherit' />
      </Button>
    </Box>
  )
}

export default SearchInput  