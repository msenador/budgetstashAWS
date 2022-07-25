import React, { useState } from 'react';
import { Box } from '@mui/system';
import ReactCardFlip from 'react-card-flip';
import Register from '../components/Register';
import Login from '../components/Login';

const Home = () => {
  const [flipCard, setFlipCard] = useState(false);

  return (
    <Box>
      <ReactCardFlip
        isFlipped={flipCard}
        flipDirection="horizontal"
        flipSpeedBackToFront="0" //seconds
        // eslint-disable-next-line prettier/prettier
        flipSpeedFrontToBack="0"
      >
        <Box key="front">
          <Register />
          <button onClick={() => setFlipCard(!flipCard)}>flip</button>
        </Box>

        <Box key="back">
          <Login />
          <button onClick={() => setFlipCard(!flipCard)}>flip</button>
        </Box>
      </ReactCardFlip>
    </Box>
  );
};

export default Home;
