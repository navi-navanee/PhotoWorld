import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";
import { useSelector, useDispatch } from "react-redux";


const Pheader = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    console.log("clickeddd");
    navigate("/");
  };

  return (
    <header>
      <AppBar style={{backgroundColor:'black'}}  position="static" sx={{ color:"white" }}>
        <Toolbar>
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            PHOTOWORLD
          </Typography>
          <Tabs sx={{ marginLeft: "auto" }} textColor="inherit">
            
          </Tabs>
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default Pheader