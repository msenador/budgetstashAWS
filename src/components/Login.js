import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Box } from '@mui/system';
import { TextField, Button } from '@mui/material';
import UserContext from '../context/UserContext';
import { PulseLoader } from 'react-spinners';
import Modal from 'react-modal';
import SpinnerModalContext from '../context/SpinnerModalContext';
import { MAIN_BLUE } from '../theme';
import { AccountCircle } from '@mui/icons-material';
import LockIcon from '@mui/icons-material/Lock';
import { getEnvironment } from '../globalHelpers/getEnvironment';

const BoxStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 250px;
  gap: 10px;
`;

const HRstyles = styled.hr`
  border: 2px solid black;
  width: 80%;
  margin-top: -20px;
`;

const PrimaryBorderTextField = styled(TextField)`
  & label.Mui-focused {
    color: #344966;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #344966;
    }
  }
`;

const spinnerCustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');

  const { setCurrentUser } = useContext(UserContext);
  const { spinnerModal, setSpinnerModal } = useContext(SpinnerModalContext);

  const handlePressEnter = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    setSpinnerModal(true);

    const requestBody = {
      email: email,
      password: password
    };

    try {
      const res = await fetch(
        // eslint-disable-next-line no-undef
        getEnvironment(process.env.REACT_APP_API_LOGIN, REACT_APP_API_LOGIN),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // eslint-disable-next-line no-undef
            'x-api-key': getEnvironment(process.env.REACT_APP_KEY_LOGIN, REACT_APP_KEY_LOGIN)
          },
          body: JSON.stringify(requestBody)
        }
      );

      switch (res.status) {
        case 400:
          setNotification('All fields are required');
          setSpinnerModal(false);
          return;
        case 404:
          setNotification('User not found');
          setSpinnerModal(false);
          return;
        case 402:
          setNotification('Incorrect email or password');
          setSpinnerModal(false);
          return;
        case 200:
          // eslint-disable-next-line no-case-declarations
          const data = await res.json();
          setCurrentUser(data.Items[0]);
          setSpinnerModal(false);
          return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <BoxStyled>
        <h1 style={{ textAlign: 'center' }}>Login</h1>
        <HRstyles />
        <Box sx={{ display: 'flex', alignItems: 'flex-end', margin: 'auto' }}>
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <PrimaryBorderTextField
            variant="standard"
            id="email-login"
            label="Enter Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handlePressEnter}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', margin: 'auto' }}>
          <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <PrimaryBorderTextField
            label="Enter Password"
            variant="standard"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handlePressEnter}
          />
        </Box>
      </BoxStyled>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        style={{ marginTop: '30px' }}>
        Login
      </Button>
      {notification && <div style={{ color: '#E24E1B' }}>*{notification}</div>}
      <Box style={{ textAling: 'center', marginTop: '15px' }}>Demo login credentials:</Box>
      <Box style={{ color: 'gray', marginTop: '5px' }}>
        <Box>Email: demo@budgetstash.com</Box>
        <Box>Password: Demo123!</Box>
      </Box>
      <Modal ariaHideApp={false} isOpen={spinnerModal} style={spinnerCustomStyles}>
        <PulseLoader color={MAIN_BLUE} />
      </Modal>
    </Box>
  );
};

export default Login;
