import React, { useState, useContext } from 'react';
import bcrypt from 'bcryptjs';
import styled from 'styled-components';
import { Box } from '@mui/system';
import { TextField, Button } from '@mui/material';
import UserContext from '../context/UserContext';

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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');

  const { setCurrentUser, currentUser } = useContext(UserContext);

  const missingInputs = (email, password) => {
    if (!email || !password) {
      setNotification('All fields required');
      return true;
    }
  };

  const userDoesNotExist = (user) => {
    if (!user) {
      setNotification('User does not exist.');
      setCurrentUser([]);
      return true;
    }
  };

  const userValid = (inputPassword, dbEncryptedPW, user) => {
    if (bcrypt.compareSync(inputPassword, dbEncryptedPW)) {
      setCurrentUser(user[0]);
      setNotification('Logged in');
      return true;
    }
  };

  const incorrectCredentials = () => {
    setCurrentUser([]);
    setNotification('Email or password is incorrect');
  };

  const handleLogin = async () => {
    if (missingInputs(email, password)) {
      return;
    }

    try {
      const res = await fetch('https://80uthhqr2j.execute-api.us-east-1.amazonaws.com/prod/login', {
        'Content-Type': 'application/json'
        // 'x-api-key': '3LvSDGxwh95e4vtIu61Xi4uY94wnM0kj9CvuRslE' // NOT WORKING
      });
      const data = await res.json();
      const user = data.filter((user) => user.email === email);

      if (userDoesNotExist(user[0])) {
        return;
      } else if (userValid(password, user[0].password, user)) {
        return;
      } else {
        incorrectCredentials();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box>
      <BoxStyled>
        <h1>Login</h1>
        {currentUser ? <h1>Welcome {currentUser.username}</h1> : <h1>No USER</h1>}
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
      </BoxStyled>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      {notification && <div>{notification}</div>}
    </Box>
  );
};

export default Login;
