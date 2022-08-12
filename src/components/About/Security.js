import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { CardContainer } from '../../globalStyles';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { Button } from '@mui/material';

const IconStyles = styled(Icon)`
  font-size: 150px;
  margin: auto;
  &.tablet {
    margin-bottom: 15px;
  }
  &.phone {
    margin-bottom: 15px;
  }
`;

const Security = () => {
  const [flip, setFlip] = useState(false);

  const handleFlip = () => {
    setFlip(!flip);
  };

  return (
    <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
      <CardContainer style={{ backgroundColor: 'aliceblue' }} key="front">
        <h1>Guaranteed Security</h1>
        <IconStyles icon="fa-solid:user-lock" />
        <Button variant="contained" onClick={handleFlip} style={{ width: '200px', margin: 'auto' }}>
          Learn more
        </Button>
      </CardContainer>

      <CardContainer style={{ backgroundColor: 'aliceblue' }} key="back">
        <h2>Secured by encryption</h2>
        <div style={{ fontFamily: 'Avenir Next' }}>
          We offer the best data security to our clients by utilizing AWS security services,
          allowing a safe space for your data to live.
        </div>
        <Button variant="contained" onClick={handleFlip} style={{ width: '200px', margin: 'auto' }}>
          Back
        </Button>
      </CardContainer>
    </ReactCardFlip>
  );
};

export default Security;
