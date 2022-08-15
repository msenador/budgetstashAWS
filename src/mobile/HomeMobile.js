import React, { useState } from 'react';
import '@animxyz/core';
import styled from 'styled-components';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Fade from '@mui/material/Fade';
import { animateScroll as scroll } from 'react-scroll';
import { Button } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Modal from 'react-modal';
import Login from '../components/Login';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import quotes from '../media/Quotes.json';
import FadeIn from 'react-fade-in';
import Register from '../components/Register';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Price from '../components/About/Price';
import Security from '../components/About/Security';
import Paperless from '../components/About/Paperless';
import Easy from '../components/About/Easy';
import { Icon } from '@iconify/react';
import ContactUsMobile from './ContactUsMobile';

const Logo = styled.img`
  margin-top: 50px;
  height: 110px;
`;

const Slogan = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
  font-size: 35px;
  font-weight: bold;
  margin-top: -507px;
  position: absolute;
  height: 300px;
  text-align: center;
`;

const CarouselStyles = styled(Carousel)`
  margin-top: -40px;
  .control-dots {
    margin-bottom: 90px;
  }
  .carousel-status {
    font-size: 0;
  }
`;

const RegisterBtnPosition = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  margin-top: -400px;
`;

const SignupButton = styled.button`
  margin-top: 180px;
  border-radius: 100px;
  height: 200px;
  width: 200px;
  background: white;
  padding: 10px 20px;
  font-size: 16px;
  color: black;
  outline: none;
  border: 2px dotted black;
  cursor: pointer;
  &:hover {
    background: white;
    transition: 0.3s;
    color: black;
  }
`;

const AboutUsHeader = styled.h1`
  text-align: center;
  font-size: 50px;
`;

const AboutSmallParagraph = styled.div`
  text-align: center;
  font-size: 20px;
  padding: 30px;
  margin-top: -35px;
`;

const ServicesBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 50px;
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
    height: '300px'
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

const HomeMobile = (props) => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);

  return (
    <Box>
      <AppBar>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button onClick={() => setLoginModalOpen(true)} style={{ color: 'white' }}>
            Login
          </Button>
          <Button style={{ color: 'white' }} onClick={() => scroll.scrollToBottom()}>
            Contact Us
          </Button>
        </Toolbar>
      </AppBar>

      <Box>
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
      </Box>

      <Box
        style={{ height: '500px', width: '390', backgroundColor: '#5ac8fa', marginTop: '20px' }}
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

      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top" onClick={() => scroll.scrollToTop()}>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

      <AboutUsHeader>What We Offer</AboutUsHeader>
      <AboutSmallParagraph>
        Our team believes in providing free and easy to use services to those who are taking steps
        to improve their financial stability. Our budgeting services are completely FREE! Donations
        are welcomed to help our team continue providing free budgeting services.
      </AboutSmallParagraph>

      <ServicesBox>
        <Price />
        <Security />
        <Paperless />
        <Easy />
      </ServicesBox>

      <ContactUsMobile />

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
        <Register />
      </Modal>
    </Box>
  );
};

export default HomeMobile;
