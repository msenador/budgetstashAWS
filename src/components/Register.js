import React, { useState, useContext } from 'react';
import { Box } from '@mui/system';
import styled from 'styled-components';
import { TextField, Button } from '@mui/material';
import { PulseLoader } from 'react-spinners';
import Modal from 'react-modal';
import SpinnerModalContext from '../context/SpinnerModalContext';
import { MAIN_BLUE } from '../theme';
import { AccountCircle } from '@mui/icons-material';
import BadgeIcon from '@mui/icons-material/Badge';
import LockIcon from '@mui/icons-material/Lock';
import SyncLockIcon from '@mui/icons-material/SyncLock';

const BoxStyled = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 250px;
  gap: 10px;
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

const HRstyles = styled.hr`
  border: 2px solid black;
  width: 80%;
  margin-top: -20px;
`;

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState('');

  const { spinnerModal, setSpinnerModal } = useContext(SpinnerModalContext);

  const submitRegistration = () => {
    setSpinnerModal(true);

    const requestBody = {
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword
    };

    fetch('https://80uthhqr2j.execute-api.us-east-1.amazonaws.com/prod/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'O7a8DXIjpl5e2hWDOt9jQ32PU2ve37G1aLWQvzvB'
      },
      body: JSON.stringify(requestBody)
    })
      .then((response) => {
        switch (response.status) {
          case 400:
            setNotification('All fields required.');
            setSpinnerModal(false);
            break;
          case 402:
            setNotification('Passwords do not match');
            setSpinnerModal(false);
            break;
          case 409:
            setNotification('Email address already exists.');
            setSpinnerModal(false);
            break;
          case 200:
            setNotification('Registration Successful!');
            setSpinnerModal(false);
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePressEnter = (e) => {
    if (e.key === 'Enter') {
      submitRegistration();
      setSpinnerModal(false);
    }
  };

  return (
    <Box>
      <BoxStyled>
        <h1>Register</h1>
        <HRstyles />
        <Box sx={{ display: 'flex', alignItems: 'flex-end', margin: 'auto' }}>
          <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <PrimaryBorderTextField
            variant="standard"
            id="username-register"
            label="Enter Username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handlePressEnter}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', margin: 'auto' }}>
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <PrimaryBorderTextField
            variant="standard"
            id="email-register"
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
            variant="standard"
            id="password-register"
            label="Enter Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handlePressEnter}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', margin: 'auto' }}>
          <SyncLockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <PrimaryBorderTextField
            variant="standard"
            id="confirmPassword-register"
            label="Confirm Password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={handlePressEnter}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={submitRegistration}
          style={{ marginTop: '30px' }}>
          Register
        </Button>
        {notification && <Box style={{ color: '#E24E1B' }}>*{notification}</Box>}
      </BoxStyled>
      <Modal
        ariaHideApp={false}
        isOpen={spinnerModal}
        onAfterClose={() => setSpinnerModal(false)} //NEED THIS. Messes up logout if not used.
        style={spinnerCustomStyles}>
        <PulseLoader color={MAIN_BLUE} />
      </Modal>
    </Box>
  );
};

export default Register;
