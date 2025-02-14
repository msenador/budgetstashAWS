import React, { useState } from 'react';
import '@animxyz/core';
import styled from 'styled-components';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import { animateScroll as scroll } from 'react-scroll';
import { Button } from '@mui/material';
import quotes from '../media/Quotes.json';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import FadeIn from 'react-fade-in';
import AboutUs from '../components/About/AboutUs';
import Contact from '../components/Contact';
import { Icon } from '@iconify/react';
import Modal from 'react-modal';
import Login from '../components/Login';
import Register from '../components/Register';

const Logo = styled.img`
  height: 130px;
  margin-left: 50px;
`;

const HomeVideo = styled.video`
  object-fit: cover;
  width: 100%;
  position: sticky;
  z-index: -1;
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

const Slogan = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  font-size: 35px;
  font-weight: bold;
  margin-top: -551px;
  position: absolute;
`;

const RegisterBtnPosition = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  margin-top: -500px;
`;

const SignupButton = styled.button`
  background-image: -webkit-linear-gradient(283deg, rgba(255, 255, 255, 0.1) 50%, transparent 55%),
    -webkit-linear-gradient(top, rgba(255, 255, 255, 0.15), transparent);
  border: 5px inset;
  margin-top: 74px;
  border-radius: 100px;
  height: 200px;
  width: 200px;
  background-color: darkorange;
  padding: 10px 20px;
  font-size: 16px;
  color: black;
  outline: none;
  cursor: pointer;
  margin-left: 60px;
  &:hover {
    background: white;
    transition: 0.3s;
    color: black;
  }
`;

const FooterContainer = styled.div`
  background-color: #84bc9c;
  height: 20px;
  font-style: italic;
  display: flex;
  justify-content: space-around;
  color: white;
  padding: 20px;
`;

const LoginModalCustomStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '50px',
    textAlign: 'center',
    height: '400px'
  }
};

const RegisterModalCustomStyles = {
  content: {
    height: '450px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '50px',
    textAlign: 'center'
  }
};

const ScrollTop = (props) => {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  });

  return (
    <Fade in={trigger}>
      <Box role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: '1' }}>
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
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  const openLoginModal = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };

  return (
    <Box>
      <AppBar>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button onClick={openLoginModal} style={{ color: 'white' }} data-testid="login-btn">
            Login
          </Button>
          <Button
            style={{ color: 'white' }}
            onClick={() => scroll.scrollToBottom()}
            data-testid="contactUs-btn">
            Contact Us
          </Button>
        </Toolbar>
      </AppBar>

      <CarouselBox>
        <Logo src="BudgetStash3.png" alt="BudgetStash Logo" />
        <CarouselStyles autoPlay interval={5500} infiniteLoop showThumbs={false}>
          {quotes &&
            quotes.map((quote, i) => (
              <Box style={{ marginTop: '45px' }} key={i}>
                <Box style={{ fontWeight: '500', fontStyle: 'italic', fontSize: '20px' }}>
                  {quote.quote}
                </Box>
                <Box style={{ marginTop: '20px', fontFamily: 'Avenir Next' }}>{quote.author}</Box>
              </Box>
            ))}
        </CarouselStyles>
      </CarouselBox>

      <Box style={{ textAlign: 'center', padding: '20px' }}>
        <Button variant="contained" onClick={() => openLoginModal()} data-testid="demo-btn">
          EXPLORE DEMO NOW
        </Button>
      </Box>

      <HomeVideo
        src="./lightBulbHand.mp4"
        autoPlay={true}
        loop={true}
        controls={false}
        playsInline
        muted
        type="video/mp4"
      />

      <Slogan data-testid="slogan">
        <FadeIn transitionDuration={4500}>
          <div>Be Confident.</div>
        </FadeIn>
        <FadeIn transitionDuration={4500} delay={1200}>
          <div>Be Free.</div>
        </FadeIn>
        <FadeIn transitionDuration={4500} delay={2500}>
          <div>Be Ready.</div>
        </FadeIn>
      </Slogan>

      <RegisterBtnPosition>
        <SignupButton onClick={() => setRegisterModalOpen(true)}>Join for free!</SignupButton>
      </RegisterBtnPosition>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top" onClick={() => scroll.scrollToTop()}>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

      <AboutUs />

      <Contact />

      <FooterContainer>
        <div>
          BudgetStash{' '}
          <span>
            <Icon icon="charm:copyright" color="white" />
          </span>{' '}
          2022
        </div>
      </FooterContainer>
      <Modal
        ariaHideApp={false}
        onRequestClose={() => setLoginModalOpen(false)}
        isOpen={loginModalOpen}
        onAfterClose={() => setLoginModalOpen(false)} //NEED THIS. Messes up logout if not used.
        style={LoginModalCustomStyles}>
        <Login />
      </Modal>
      <Modal
        ariaHideApp={false}
        onRequestClose={() => setRegisterModalOpen(false)}
        isOpen={registerModalOpen}
        onAfterClose={() => setRegisterModalOpen(false)} //NEED THIS. Messes up logout if not used.
        style={RegisterModalCustomStyles}>
        <Register openLoginModal={openLoginModal} />
      </Modal>
    </Box>
  );
};

export default Home;
