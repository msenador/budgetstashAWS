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
      setSpinnerModal(false);
    }
  };

  const handleLogin = async () => {
    setSpinnerModal(true);

    const requestBody = {
      email: email,
      password: password
    };

    try {
      const res = await fetch('https://80uthhqr2j.execute-api.us-east-1.amazonaws.com/prod/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '3LvSDGxwh95e4vtIu61Xi4uY94wnM0kj9CvuRslE'
        },
        body: JSON.stringify(requestBody)
      });

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
      }

      const data = await res.json();
      setCurrentUser(data.Items[0]);
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
      <Modal ariaHideApp={false} isOpen={spinnerModal} style={spinnerCustomStyles}>
        <PulseLoader color={MAIN_BLUE} />
      </Modal>
    </Box>
  );
};

export default Login;
