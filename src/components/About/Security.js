import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { FlipCardBtn, CardContainer } from '../../globalStyles';
import { Icon } from '@iconify/react';
import styled from 'styled-components';

const CardBtnStyles = styled(FlipCardBtn)`
  background-color: #84bc9c;
  width: 70%;
  color: black;
  font-style: italic;
  height: 30px;
  border-radius: 20px;
  align-self: center;
  text-decoration: none;
`;

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
        <CardBtnStyles onClick={handleFlip}>Learn more</CardBtnStyles>
      </CardContainer>

      <CardContainer style={{ backgroundColor: 'aliceblue' }} key="back">
        <h2>Secured by encryption</h2>
        <div style={{ fontFamily: 'Avenir Next' }}>
          We offer the best data security to our clients by utilizing AWS security services,
          allowing a safe space for your data to live.
        </div>
        <CardBtnStyles onClick={handleFlip}>Back</CardBtnStyles>
      </CardContainer>
    </ReactCardFlip>
  );
};

export default Security;
