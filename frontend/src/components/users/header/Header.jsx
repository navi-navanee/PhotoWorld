
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Button,Toolbar, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../../features/user/auth/authSlice";
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    console.log("clickeddd");
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const onLanding = () => {
    console.log("im triggerd");
    navigate('/')
  }

  const onLogin =() =>{
    navigate("/login");
  }
  const onRegister =() =>{
    navigate("/Register");
  }
  const onProfile =() =>{

    navigate("/userprofile");
  }

  const onChat =() => {
    navigate('/messenger')
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
            onClick={onLanding}
            style={{cursor:"pointer"}}
          >
            PHOTOWORLD
          </Typography>
          <div>

          
            {user ? (
              // <Tab label="logout" onClick={onLogout} /><>
              <>
              <Button style={{color:"white"}} variant="text" onClick={onProfile}>Profile</Button>
              <Button style={{color:"white"}} variant="text" onClick={onChat}>Chat</Button>
              <Button style={{color:"white"}} variant="text" onClick={onLogout}>logout</Button>
              </>
            ) : (
              <>
                {/* <Tab label="Login" to="/login"  component={Link} />
                <Tab label="Register" to="/Register" component={Link} /> */}
                    
                    <Button style={{color:"white"}} variant="text" onClick={onLogin}>Login</Button>
                    <Button style={{color:"white"}} variant="text" onClick={onRegister}>Register</Button>
              </>
            )}
        </div>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
