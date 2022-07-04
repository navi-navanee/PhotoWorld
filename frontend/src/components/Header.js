import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/user/auth/authSlice";

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
            {user ? (
              <Tab label="logout" onClick={onLogout} />
            ) : (
              <>
                <Tab label="Login" to="/login" component={Link} />
                <Tab label="Register" to="/Register" component={Link} />
              </>
            )}
          </Tabs>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
