import React, { useContext, useEffect } from 'react';
import { Box } from '@mui/system';
// import { Routes, Route } from 'react-router-dom';
// import Appbar from './components/Appbar';
// import Home from './pages/Home';
import UserContext from './context/UserContext';
// import MemberContent from './pages/MemberContent';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import HomeMobile from './mobile/HomeMobile';

const App = () => {
  // const matches = useMediaQuery('(min-width:600px)');
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('userEmail', JSON.stringify(currentUser));
      setCurrentUser(currentUser);
    } else {
      setCurrentUser([]);
    }
  }, [currentUser, setCurrentUser]);

  return (
    <Box>
      {/* {currentUser.username && <Appbar />}
      <Routes>
        <Route
          path="/"
          element={currentUser.username ? <MemberContent /> : matches ? <Home /> : <HomeMobile />}
        />
      </Routes> */}
      hi
    </Box>
  );
};

export default App;
