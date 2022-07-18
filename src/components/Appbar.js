import React from 'react';
import { Box } from '@mui/system';
// import styled from 'styled-components';
// import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import MenuIcon from '@mui/icons-material/Menu'; USE FOR MOBILE

const Appbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box style={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}></Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
