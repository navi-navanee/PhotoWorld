import { createTheme } from '@mui/material/styles'
import { deepPurple ,amber } from '@mui/material/colors'
 
const theme =createTheme({

    palette: {
        primary : {
            main: deepPurple[500]
        },
        secondary : {
            main:amber[500],
            contrastText:deepPurple[900]
        }
    }
})

export default theme
