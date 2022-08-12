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
        <h1>User Friendly</h1>
        <Icon icon="zondicons:mobile-devices" style={{ fontSize: '150px', margin: 'auto' }} />
        <CardBtnStyles onClick={handleFlip}>Learn more</CardBtnStyles>
      </CardContainer>

      <CardContainer style={{ backgroundColor: 'aliceblue' }} key="back">
        <h2>Not tech savvy?</h2>
        <div style={{ fontFamily: 'Avenir Next' }}>{description}</div>
        <CardBtnStyles onClick={handleFlip}>Back</CardBtnStyles>
      </CardContainer>
    </ReactCardFlip>
  );
};

export default Easy;
