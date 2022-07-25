import React, { useContext } from 'react';
import { Box } from '@mui/system';
// import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button } from '@mui/material';
import UserContext from '../context/UserContext';

const Appbar = () => {
  const { logoutUser, currentUser } = useContext(UserContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Box style={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            {currentUser.email && (
              <Button variant="contained" color="primary" onClick={logoutUser}>
                Logout
              </Button>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
