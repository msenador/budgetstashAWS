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
        <CardBtnStyles onClick={handleFlip}>Learn more</CardBtnStyles>
      </CardContainer>

      <CardContainer style={{ backgroundColor: 'aliceblue' }} key="back">
        <h2>Save the trees</h2>
        <div style={{ fontFamily: 'Avenir Next' }}>
          Help us save the trees while keeping you organized! Download your budgetary expenses as a
          PDF and save it on your computer for easier storage.
        </div>
        <CardBtnStyles onClick={handleFlip}>Back</CardBtnStyles>
      </CardContainer>
    </ReactCardFlip>
  );
};

export default Paperless;
