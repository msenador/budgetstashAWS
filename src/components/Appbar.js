import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import UserContext from '../context/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

const LogoutModalCustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
);

export default function MiniDrawer() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);
  const { currentUser, logoutUser } = React.useContext(UserContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const routeAccountSettings = () => {
    let path = `/account-settings`;
    navigate(path);
  };

  const routeContactUs = () => {
    let path = `/contactus`;
    navigate(path);
  };

  const routeHomeMobile = () => {
    let path = `/`;
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' })
            }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" margin="auto">
            Welcome {currentUser.username}!
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <img src="BudgetStash3.png" width="80%" />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List style={{ background: 'aliceblue' }}>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={routeHomeMobile}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={routeAccountSettings}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={'Account Settings'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={routeContactUs}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText primary={'Contact Us'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={() => setLogoutModalOpen(true)}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center'
                }}>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Modal
        ariaHideApp={false}
        onRequestClose={() => setLogoutModalOpen(false)}
        isOpen={logoutModalOpen}
        onAfterClose={() => setLogoutModalOpen(false)}
        style={LogoutModalCustomStyles}>
        <Box style={{ display: 'flex', flexDirection: 'column', zIndex: '99' }}>
          <Box>
            <h2>Are you sure you want to logout?</h2>
          </Box>
          <Box style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button variant="contained" onClick={logoutUser}>
              YES
            </Button>
            <Button variant="outlined" onClick={() => setLogoutModalOpen(false)}>
              CANCEL
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
