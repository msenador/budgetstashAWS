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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { REACT_APP_API_REGISTRATION, REACT_APP_KEY_REGISTRATION } from '../config';
import { getEnvironment } from '../globalHelpers.js/getEnvironment';

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

const registrationSuccessful = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center'
  }
};

const HRstyles = styled.hr`
  border: 2px solid black;
  width: 80%;
  margin-top: -20px;
`;

// eslint-disable-next-line react/prop-types
const Register = ({ openLoginModal }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState('');
  const [registrationSuccessfulModalOpen, setRegistrationSuccessfulModalOpen] = useState(false);

  const { spinnerModal, setSpinnerModal } = useContext(SpinnerModalContext);

  const validateEmailFormat = (email) => {
    const splitEmail = email.split('');
    if (!splitEmail.includes('@')) {
      setNotification('Invalid email');
      setSpinnerModal(false);
      return true;
    }
  };

  const passwordsDoNotMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setNotification('Passwords do not match');
      setSpinnerModal(false);
      return true;
    }
  };

  const passwordDidNotPassRegex = (password) => {
    // 1 lowercase, 1 uppercase, 1 number, 1 special character, at least 8 chars long
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})');
    if (!strongRegex.test(password)) {
      setNotification(
        'Password must have at least: 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character and be 8 characters long'
      );
      setSpinnerModal(false);
      return true;
    }
  };

  const submitRegistration = () => {
    setSpinnerModal(true);

    if (validateEmailFormat(email)) {
      return;
    }

    if (passwordsDoNotMatch(password, confirmPassword)) {
      return;
    }

    if (passwordDidNotPassRegex(password)) {
      return;
    }

    const requestBody = {
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword
    };
    // eslint-disable-next-line no-undef
    fetch(getEnvironment(process.env.REACT_APP_API_REGISTRATION, REACT_APP_API_REGISTRATION), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': getEnvironment(
          // eslint-disable-next-line no-undef
          process.env.REACT_APP_KEY_REGISTRATION,
          REACT_APP_KEY_REGISTRATION
        )
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
            setRegistrationSuccessfulModalOpen(true);
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
            type="password"
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
            type="password"
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

      <Modal
        ariaHideApp={false}
        isOpen={registrationSuccessfulModalOpen}
        onAfterClose={() => setRegistrationSuccessfulModalOpen(false)} //NEED THIS. Messes up logout if not used.
        style={registrationSuccessful}>
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1>Registration Successful</h1>
          <CheckCircleOutlineIcon color="success" fontSize="large" />
          <Button
            variant="contained"
            color="primary"
            onClick={openLoginModal}
            style={{ marginTop: '10px' }}>
            Login now!
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Register;
