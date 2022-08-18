import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import UserContext from '../context/UserContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Modal from 'react-modal';
import LogoutIcon from '@mui/icons-material/Logout';
import PhoneIcon from '@mui/icons-material/Phone';

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

const AppbarMobile = () => {
  const { currentUser, logoutUser } = React.useContext(UserContext);

  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <img src="BudgetStash3.png" width="80%" />
      <Divider />
      <Box style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <Button onClick={handleAccountSettings} style={{ margin: '5px 0px' }}>
          <AccountCircleIcon />
          <ListItemText primary={'Account Settings'} style={{ marginLeft: '15px' }} />
        </Button>

        <Button onClick={handleContacUs} style={{ margin: '5px 0px' }}>
          <PhoneIcon />
          <ListItemText primary={'Contact Us'} style={{ marginLeft: '15px' }} />
        </Button>

        <Button onClick={() => setLogoutModalOpen(true)} style={{ margin: '5px 0px' }}>
          <LogoutIcon />
          <ListItemText primary={'Logout'} style={{ marginLeft: '15px' }} />
        </Button>
      </Box>
    </Box>
  );

  const handleAccountSettings = () => {
    // console.log('ACCOUNT SEETTINGS ONLY');
  };

  const handleContacUs = () => {
    //
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome {currentUser.username}!
          </Typography>
          {/* <Button color="inherit">Logout</Button> */}
        </Toolbar>
      </AppBar>
      <div style={{ position: 'absolute', marginTop: '-54px', width: '57px', height: '50px' }}>
        {[''].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}>
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>
      <Modal
        ariaHideApp={false}
        onRequestClose={() => setLogoutModalOpen(false)}
        isOpen={logoutModalOpen}
        onAfterClose={() => setLogoutModalOpen(false)}
        style={LogoutModalCustomStyles}>
        <Box style={{ display: 'flex', flexDirection: 'column' }}>
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
};

export default AppbarMobile;
