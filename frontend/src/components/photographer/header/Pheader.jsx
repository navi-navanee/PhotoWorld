import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
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

  const onLanding = (()=>{
    navigate('/photographer/home')
  })

  const onProfile =() =>{

    navigate("/photographer/photographerprofile");
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
            style={{cursor:"pointer"}}
            onClick={onLanding}
          >
            PHOTOWORLD
          </Typography>

          <div>

           <Button style={{color:"white"}} variant="text" onClick={onProfile}>PROFILE</Button>
                    <Button style={{color:"white"}} variant="text" onClick={onLogout}>LOGOUT</Button>
          </div>
        </Toolbar>
      </AppBar>
    </header>
  )
}

export default Pheader