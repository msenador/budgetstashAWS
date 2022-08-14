import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { Icon } from '@iconify/react';
import { CardContainer } from '../../globalStyles';
import { Button } from '@mui/material';

const Price = () => {
  const [flip, setFlip] = useState(false);

  const handleFlip = () => {
    setFlip(!flip);
  };

  return (
    <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
      <CardContainer style={{ backgroundColor: 'aliceblue' }} key="front">
        <h1 style={{ textAlign: 'center' }}>Free to use</h1>
        <div style={{ textAlign: 'center' }}>
          <Icon icon="dashicons:money-alt" style={{ fontSize: '187px', margin: 'auto' }} />
        </div>
        <Button variant="contained" onClick={handleFlip} style={{ width: '200px', margin: 'auto' }}>
          Learn more
        </Button>
      </CardContainer>

      <CardContainer style={{ backgroundColor: 'aliceblue' }} key="back">
        <h2 style={{ textAlign: 'center' }}>Our services are completely FREE!</h2>
        <div style={{ fontFamily: 'Avenir Next', textAlign: 'center' }}>
          You should be saving money, not spending it! However, donations are always welcomed to
          help keep our budgeting services free of charge!
        </div>
        <Button variant="contained" onClick={handleFlip} style={{ width: '200px', margin: 'auto' }}>
          Back
        </Button>
      </CardContainer>
    </ReactCardFlip>
  );
};

export default Price;
