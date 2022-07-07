
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/material'

const useStyles=makeStyles({
    root:{
        width:'100%',
        justifyContent:'space-between',
    },
})


const FilterListToggle = ({options,value,selectToggle}) => {
    const classes=useStyles()
  return (
    <ToggleButtonGroup
    value={value}
    onChange={selectToggle}
    className={Classes.root}
    >
        {options.map(({lable,id,value})=><ToggleButton className={classes.toggle} key={id} value={value}>
        {label}
        </ToggleButton>)}
    </ToggleButtonGroup>
  )
}

export default FilterListToggle