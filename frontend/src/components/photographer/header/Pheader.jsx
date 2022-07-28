import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../../features/photographer/auth/photographerauthSlice';



const Pheader = () => {



  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout())
    console.log("clickeddd");
    navigate("/photographer");
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  

  return (
    
    <header>
      <AppBar style={{backgroundColor:'black'}}  position="static" sx={{ color:"white" }}>
        <Toolbar style={{display:"flex",justifyContent:"space-between"}}>
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            PHOTOWORLD
          </Typography>

          {/* <Tabs sx={{ marginLeft: "auto" }}  textColor="inherit">
          <Tab label="logout"  onClick={onLogout}   {...a11yProps(0)} />
          </Tabs> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            onClick={onLogout}
            style ={{cursor:"pointer"}}
          >
            LOGOUT
          </Typography>

        </Toolbar>
      </AppBar>
    </header>
  )
}

export default Pheader