import React from 'react'
import { Checkbox, FormControlLabel, Typography } from '@mui/material'

const FilterItem = ({ label, onChange, checked}) => {
    return (
        <FormControlLabel
            label={<Typography sx={{ fontSize: 14 }}>{label}</Typography>}
            control={
                <Checkbox onChange={onChange} size={"small"} checked={checked}/>
            }
        />
    )
}

export default FilterItem