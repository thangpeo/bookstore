import { Box, Paper } from '@mui/material'
import React from 'react'
import CatalogMenu from '../CatalogMenu'

const CatalogMenuDropdown = ({ open, error, loading, ...other }) => {

  if (error) {
    return null
  }
  return (
    open && <Box {...other}>
      <CatalogMenu/>
    </Box>

  )
}

export default CatalogMenuDropdown