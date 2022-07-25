import { Box } from '@mui/system';
import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

const MemberContent = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Box>
      <h1>Welcome {currentUser.username}!</h1>
    </Box>
  );
};

export default MemberContent;
