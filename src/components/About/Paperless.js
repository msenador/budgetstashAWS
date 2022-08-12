import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { CardContainer } from '../../globalStyles';
import { Icon } from '@iconify/react';
import { Button } from '@mui/material';

const Paperless = () => {
  const [flip, setFlip] = useState(false);

  const handleFlip = () => {
    setFlip(!flip);
  };
  return (
    <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
      <CardContainer style={{ backgroundColor: 'aliceblue' }} key="front">
        <h1>Paperless</h1>
        <Icon icon="healthicons:i-documents-denied" style={{ fontSize: '200px', margin: 'auto' }} />
        <Button variant="contained" onClick={handleFlip} style={{ width: '200px', margin: 'auto' }}>
          Learn more
        </Button>
      </CardContainer>

      <CardContainer style={{ backgroundColor: 'aliceblue' }} key="back">
        <h2>Save the trees</h2>
        <div style={{ fontFamily: 'Avenir Next' }}>
          Help us save the trees while keeping you organized! Download your budgetary expenses as a
          PDF and save it on your computer for easier storage.
        </div>
        <Button variant="contained" onClick={handleFlip} style={{ width: '200px', margin: 'auto' }}>
          Back
        </Button>
      </CardContainer>
    </ReactCardFlip>
  );
};

export default Paperless;
