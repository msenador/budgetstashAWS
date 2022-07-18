import React from 'react';
import { Box } from '@mui/system';
import { Routes, Route } from 'react-router-dom';
import Appbar from './components/Appbar';
import Home from './pages/Home';

const App = () => {
  return (
    <Box>
      <Appbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Box>
  );
};

export default App;
