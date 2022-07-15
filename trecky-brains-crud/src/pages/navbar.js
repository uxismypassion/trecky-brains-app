import { useState } from "react";
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip, ListItemIcon } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Navbar = () => {

  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerWidth = 240;

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        TECKY BRAINS
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <Link to={"/Usuarios"} style={{ textDecoration: 'none' }}>
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItemButton>
          </Link>
        </ListItem>
        {/* <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <EmojiEventsIcon />
            </ListItemIcon>
            <ListItemText primary="Mis Logros" />
          </ListItemButton>
        </ListItem> */}
        <ListItem>
          <Link to={"/Perfil"} style={{ textDecoration: 'none' }}>
            <ListItemButton>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Mi Perfil" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem>
          <Link to={"/Editar"} style={{ textDecoration: 'none' }}>
            <ListItemButton>
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="Editar Perfil" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Salir" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            TECKY BRAINS
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Tooltip title="Inicio">
              <Link to={"/Usuarios"} style={{ textDecoration: 'none' }}>
                <IconButton>
                  <HomeIcon fontSize="large"/>
                </IconButton>
              </Link>
            </Tooltip>
            {/* <Tooltip title="Mis Logros">
              <IconButton>
                <EmojiEventsIcon fontSize="large"/>
              </IconButton>
            </Tooltip> */}
            <Tooltip title="Mi Perfil">
              <Link to={"/Perfil"} style={{ textDecoration: 'none' }}>
                <IconButton>
                  <AccountCircleIcon fontSize="large"/>
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Editar Perfil">
              <Link to={"/Editar"} style={{ textDecoration: 'none' }}>
                <IconButton>
                  <ManageAccountsIcon fontSize="large"/>
                </IconButton>
              </Link>
            </Tooltip>
            <Tooltip title="Salir">
              <IconButton onClick={handleLogout}>
                <LogoutIcon fontSize="large"/>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>  
    </Box>
  );

};

export default Navbar;