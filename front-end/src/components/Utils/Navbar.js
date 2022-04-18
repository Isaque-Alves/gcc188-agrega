import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Grid,
} from "@mui/material";
import logo from "../../assets/logo2.png";
import { makeStyles } from "@material-ui/styles";
import isAuthenticated from "../../api/sidebar/auth/isAuthenticated";
import { useNavigate } from "react-router-dom";
import { RemoveCookie } from "../../utils/CookieUtil";
import { getUser } from "../../services/api/Auth";

const useStyles = makeStyles({
  navbar: {
    backgroundColor: "#212121",
  },
});
const settings = ["Home", "Dash Admin", "Logout"];

export default function ResponsiveAppBar(props) {
  const classes = useStyles(props);
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (setting) => {
    if (setting == "Logout") {
      RemoveCookie("token");
      navigate("/login");
    } else if (setting == "Dash Admin") {
      navigate("/admin/usuarios");
    } else {
      navigate("/home");
    }
  };

  useEffect(() => {
    isAuthenticated().then((resp) => console.log(resp));
    getUser().then((resp) => {
      setAdmin(resp.data.admin);
    });
  }, []);

  return (
    <AppBar position="fixed" className={classes.navbar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                <Avatar alt="Remy Sharp" src={logo} />
              </Typography>

              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              >
                <Avatar alt="Remy Sharp" src={logo} />
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) =>
                    admin ? (
                      <MenuItem
                        key={setting}
                        onClick={() => handleClick(setting)}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ) : setting != "Dash Admin" ? (
                      <MenuItem
                        key={setting}
                        onClick={() => handleClick(setting)}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ) : null
                  )}
                </Menu>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
