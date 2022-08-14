import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { CardContainer } from '../../globalStyles';
import { Icon } from '@iconify/react';
import { Button } from '@mui/material';

const Easy = () => {
  const [flip, setFlip] = useState(false);

  const description =
    "Don't worry! Our easy to use interface is user friendly on desktops, tablets, and mobile devices!";

  const handleFlip = () => {
    setFlip(!flip);
  };
  return (
    <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
      <CardContainer style={{ backgroundColor: 'aliceblue' }} key="front">
        <h1 style={{ textAlign: 'center' }}>User Friendly</h1>
        <Icon icon="zondicons:mobile-devices" style={{ fontSize: '150px', margin: 'auto' }} />
        <Button variant="contained" onClick={handleFlip} style={{ width: '200px', margin: 'auto' }}>
          Learn more
        </Button>
      </CardContainer>

      <CardContainer style={{ backgroundColor: 'aliceblue' }} key="back">
        <h2 style={{ textAlign: 'center' }}>Not tech savvy?</h2>
        <div style={{ fontFamily: 'Avenir Next', textAlign: 'center' }}>{description}</div>
        <Button variant="contained" onClick={handleFlip} style={{ width: '200px', margin: 'auto' }}>
          Back
        </Button>
      </CardContainer>
    </ReactCardFlip>
  );
};

export default Easy;
