import React, { useState } from 'react';
import '@animxyz/core';
import styled from 'styled-components';
import { Box } from '@mui/system';
import ReactCardFlip from 'react-card-flip';
import Register from '../components/Register';
import Login from '../components/Login';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
// import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import { animateScroll as scroll } from 'react-scroll';
import { Button } from '@mui/material';
import quotes from '../media/Quotes.json';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Logo = styled.img`
  height: 130px;
`;

const HomeVideo = styled.video`
  object-fit: cover;
  width: 100%;
  position: sticky;
  z-index: -1;
  margin-top: 17px;
  box-shadow: 1px 1px 20px -1px grey;
  height: 600px;
`;

const CarouselBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin-top: 70px;
`;

const CarouselStyles = styled(Carousel)`
  .control-dots {
    margin-bottom: 78px;
  }
  .carousel-status {
    font-size: 0;
  }
`;

const ScrollTop = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  });

  return (
    <Fade in={trigger}>
      <Box role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        {children}
      </Box>
    </Fade>
  );
};

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
};

const Home = (props) => {
  const [flipCard, setFlipCard] = useState(false);

  const flipRegisterLogin = () => {
    setFlipCard(!flipCard);
  };

  const handleLoginAppBar = () => {
    setFlipCard(true);
    scroll.scrollToTop();
  };

  return (
    <Box>
      <AppBar>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button onClick={handleLoginAppBar} style={{ color: 'white' }}>
            Login
          </Button>
          <Button style={{ color: 'white' }} onClick={() => scroll.scrollToBottom()}>
            Contact Us
          </Button>
        </Toolbar>
      </AppBar>

      <CarouselBox>
        <Logo src="BudgetStash3.png" alt="BudgetStash Logo" />
        <CarouselStyles autoPlay interval={3500} infiniteLoop>
          {quotes &&
            quotes.map((quote, i) => (
              <Box style={{ marginTop: '45px' }} key={i}>
                <Box style={{ fontWeight: '500', fontStyle: 'italic' }}>{quote.quote}</Box>
                <Box style={{ marginTop: '20px', fontFamily: 'Avenir Next' }}>{quote.author}</Box>
              </Box>
            ))}
        </CarouselStyles>
      </CarouselBox>
      <HomeVideo
        src="./lightBulbHand.mp4"
        autoPlay={true}
        loop={true}
        controls={false}
        playsInline
        muted
        type="video/mp4"
      />
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top" onClick={() => scroll.scrollToTop()}>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

      <Box>
        <ReactCardFlip
          isFlipped={flipCard}
          flipDirection="vertical"
          flipSpeedBackToFront="1" //seconds
          // eslint-disable-next-line prettier/prettier
          flipSpeedFrontToBack="1"
        >
          <Box key="front" style={{ border: '5px solid #84bc9c', borderRadius: '10px' }}>
            <Register />
            <button onClick={flipRegisterLogin}>flip</button>
          </Box>

          <Box key="back">
            <Login />
            <button onClick={flipRegisterLogin}>flip</button>
          </Box>
        </ReactCardFlip>
      </Box>
      <Box style={{ backgroundColor: 'red', height: '6000px' }}>stuff</Box>
    </Box>
  );
};

export default Home;
