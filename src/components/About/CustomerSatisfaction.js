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

const CustomerSatisfaction = () => {
  const [flip, setFlip] = useState(false);

  const handleFlip = () => {
    setFlip(!flip);
  };

  return (
    <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
      <CardContainer style={{ backgroundColor: 'aliceblue' }} key="front">
        <h1 style={{ textAlign: 'center' }}>Customer Satisfaction</h1>
        <IconStyles icon="fa6-solid:people-group" />
        <Button variant="contained" onClick={handleFlip} style={{ width: '200px', margin: 'auto' }}>
          Learn more
        </Button>
      </CardContainer>

      <CardContainer style={{ backgroundColor: 'aliceblue' }} key="back">
        <h2 style={{ textAlign: 'center' }}>We are here for you</h2>
        <div style={{ fontFamily: 'Avenir Next', textAlign: 'center' }}>
          Our team is dedicated to providing our customers the best experience. Contact us to let us
          know how we can make your experience better! You have needs, and we have a contact form -
          USE IT!
        </div>
        <Button variant="contained" onClick={handleFlip} style={{ width: '200px', margin: 'auto' }}>
          Back
        </Button>
      </CardContainer>
    </ReactCardFlip>
  );
};

export default CustomerSatisfaction;
