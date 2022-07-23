import { Box } from '@mui/system';
import React from 'react';
import Register from '../components/Register';
import Login from '../components/Login';

const Home = () => {
  return (
    <Box>
      Home
      <Register />
      <Login />
    </Box>
  );
};

export default Home;
