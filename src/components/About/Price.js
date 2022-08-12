import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { Icon } from '@iconify/react';
import { FlipCardBtn, CardContainer } from '../../globalStyles';
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

const Price = () => {
  const [flip, setFlip] = useState(false);

  const handleFlip = () => {
    setFlip(!flip);
  };

  return (
    <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
      <CardContainer style={{ backgroundColor: 'aliceblue' }} key="front">
        <h1>Free to use</h1>
        <div>
          <Icon icon="dashicons:money-alt" style={{ fontSize: '187px', margin: 'auto' }} />
        </div>
        <CardBtnStyles onClick={handleFlip}>Learn more</CardBtnStyles>
      </CardContainer>

      <CardContainer style={{ backgroundColor: 'aliceblue' }} key="back">
        <h2>Our services are completely FREE!</h2>
        <div style={{ fontFamily: 'Avenir Next' }}>
          You should be saving money, not spending it! However, donations are always welcomed to
          help keep our budgeting services free of charge!
        </div>
        <CardBtnStyles onClick={handleFlip}>Back</CardBtnStyles>
      </CardContainer>
    </ReactCardFlip>
  );
};

export default Price;
