import React, { useContext, useEffect } from 'react';
import { Box } from '@mui/system';
import { Routes, Route } from 'react-router-dom';
import Appbar from './components/Appbar';
import Home from './pages/Home';
import UserContext from './context/UserContext';
import MemberContent from './pages/MemberContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import HomeMobile from './mobile/HomeMobile';
import MemberContentMobile from './mobile/MemberContentMobile';
import AppbarMobile from './mobile/AppbarMobile';
import AccountSettings from './components/AccountSettings';
import AccountSettingsMobile from './mobile/AccountSettingsMobile';

const App = () => {
  const mobile = useMediaQuery('(min-width:600px)');
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
      <Routes>
        <Route
          path="/"
          element={
            currentUser.username ? (
              mobile ? (
                <Box>
                  <Appbar />
                  <MemberContent />
                </Box>
              ) : (
                <Box>
                  <AppbarMobile />
                  <MemberContentMobile />
                </Box>
              )
            ) : mobile ? (
              <Home />
            ) : (
              <HomeMobile />
            )
          }
        />

        <Route
          path="/account-settings"
          element={
            currentUser.username ? (
              mobile ? (
                <Box>
                  <Appbar />
                  <AccountSettings />
                </Box>
              ) : (
                <Box>
                  <AppbarMobile />
                  <AccountSettingsMobile />
                </Box>
              )
            ) : mobile ? (
              <Home />
            ) : (
              <HomeMobile />
            )
          }
        />
      </Routes>
    </Box>
  );
};

export default App;
