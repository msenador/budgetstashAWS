import React, { useState, useContext } from 'react';
import { Box } from '@mui/system';
import styled from 'styled-components';
import { TextField, Button } from '@mui/material';
import { PulseLoader } from 'react-spinners';
import Modal from 'react-modal';
import SpinnerModalContext from '../context/SpinnerModalContext';
import { MAIN_BLUE } from '../theme';

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
            break;
          case 402:
            setNotification('Passwords do not match');
            break;
          case 409:
            setNotification('Email address already exists.');
            break;
          case 200:
            setNotification('Registration Successful!');
            break;
          default:
            setNotification('Registration');
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setSpinnerModal(false);
  };

  return (
    <Box>
      <BoxStyled>
        <h1>Register</h1>
        <PrimaryBorderTextField
          id="username"
          label="Enter Username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <PrimaryBorderTextField
          id="email"
          label="Enter Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PrimaryBorderTextField
          id="password"
          label="Enter Password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PrimaryBorderTextField
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {notification && <Box>{notification}</Box>}
        <Button variant="contained" color="primary" onClick={submitRegistration}>
          Register
        </Button>
      </BoxStyled>
      <Modal
        ariaHideApp={false}
        isOpen={spinnerModal}
        // eslint-disable-next-line prettier/prettier
        style={spinnerCustomStyles}
      >
        <PulseLoader color={MAIN_BLUE} />
      </Modal>
    </Box>
  );
};

export default Register;
