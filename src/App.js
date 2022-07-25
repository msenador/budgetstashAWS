import React, { useContext, useEffect } from 'react';
import { Box } from '@mui/system';
import { Routes, Route } from 'react-router-dom';
import Appbar from './components/Appbar';
import Home from './pages/Home';
import UserContext from './context/UserContext';
import MemberContent from './pages/MemberContent';

const App = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      setCurrentUser(currentUser);
    } else {
      setCurrentUser([]);
    }
  }, [currentUser, setCurrentUser]);

  return (
    <Box>
      <Appbar />
      <Routes>
        <Route path="/" element={currentUser.username ? <MemberContent /> : <Home />} />
      </Routes>
    </Box>
  );
};

export default App;
