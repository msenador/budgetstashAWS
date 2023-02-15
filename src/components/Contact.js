import React, { useState } from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';
// import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getEnvironment } from '../globalHelpers/getEnvironment';

const Container = styled.div`
  margin-top: 100px;
  padding: 30px;
  height: 350px;
  background-color: #344966;
  display: grid;
  grid-template-columns: 3fr 1fr 7fr;
  justify-items: center;
  &.tablet {
    height: 400px;
  }
  &.phone {
    grid-template-columns: 3fr;
    row-gap: 50px;
    height: 700px;
  }
`;

const MissionStatementStyles = styled.div`
  font-size: 30px;
  color: white;
  width: 80%;
`;

const ContactUsStyles = styled.div`
  font-size: 25px;
  color: white;
  width: 80%;
  &.phone {
    margin-top: -305px;
  }
`;

const InputPositions = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const InputStyles = styled.input`
  width: 100%;
  border-radius: 5px;
  background: transparent;
  color: white;
  height: 20px;
  &.phone {
    height: 30px;
    width: 100%;
  }
`;

const TextAreaStyles = styled.textarea`
  width: 100%;
  resize: none;
  background: transparent;
  color: white;
  border-radius: 5px;
  &.phone {
    height: 150px;
    width: 100%;
  }
`;

const SendBtn = styled.button`
  width: 150px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #84bc9c;
  background-image: -webkit-linear-gradient(283deg, rgba(255, 255, 255, 0.1) 50%, transparent 55%),
    -webkit-linear-gradient(top, rgba(255, 255, 255, 0.15), transparent);
  color: white !important;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  text-decoration: none !important;
  -webkit-transition: all 0.2s linear;

  :active {
    top: 4px;
  }
  &.phone {
    width: 100%;
    height: 40px;
    margin-top: 20px;
  }
`;

const ToastStyledContainer = styled(ToastContainer)`
  // https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
  &&&.Toastify__toast-container {
  }
  .Toastify__toast {
    background: gray;
    color: white;
  }
  .Toastify__toast-body {
  }
  .Toastify__progress-bar {
    background: #84bc9c;
  }
`;

const Contact = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const notify = () => toast('Email sent!', { position: toast.POSITION.BOTTOM_RIGHT });
  const failEmailSent = () =>
    toast('Failed to send email', { position: toast.POSITION.BOTTOM_RIGHT });

  const emptyFields = (email, subject, message) => {
    if (!email || !subject || !message) {
      failEmailSent();
      return true;
    }
  };

  const validateEmailFormat = (email) => {
    const splitEmail = email.split('');
    if (!splitEmail.includes('@')) {
      failEmailSent();
      return true;
    }
  };

  const sendEmail = () => {
    if (emptyFields(email, subject, message)) {
      return;
    }

    if (validateEmailFormat(email)) {
      return;
    }

    const requestBody = {
      email: email,
      subject: subject,
      message: message
    };

    fetch(
      getEnvironment(
        // eslint-disable-next-line no-undef
        process.env.REACT_APP_API_CUSTOMER_SEND_EMAIL,
        REACT_APP_API_CUSTOMER_SEND_EMAIL
      ),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': getEnv(
            // eslint-disable-next-line no-undef
            process.env.REACT_APP_KEY_CUSTOMER_SEND_EMAIL,
            REACT_APP_KEY_CUSTOMER_SEND_EMAIL
          )
        },
        body: JSON.stringify(requestBody)
      }
    ).catch((err) => {
      console.log(err);
    });

    notify();

    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <Container>
      <MissionStatementStyles>
        <h5 style={{ fontStyle: 'italic' }}>OUR MISSION</h5>
        <div style={{ fontSize: '18px' }}>
          Our mission at BudgetStash is to provide the highest level of quality and support for
          preparation and implementation of budgetary decisions. Financial freedom is not for the
          money, it is for the time you get back, to spend your days doing what you love. It starts
          here, at BudgetStash.
        </div>
        <div
          style={{
            fontStyle: 'italic',
            fontSize: '15px',
            float: 'right',
            marginTop: '10px'
          }}>
          - Morian Senador, Founder
        </div>
      </MissionStatementStyles>
      <hr />
      <ContactUsStyles>
        <h3 style={{ fontStyle: 'italic', marginBottom: '0' }}>Contact Us</h3>
        <div style={{ fontSize: '15px', marginBottom: '20px', color: 'gray' }}>
          i.e. partnerships, questions, general support
        </div>
        <InputPositions>
          <InputStyles
            placeholder="Email"
            name="customerEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputStyles
            placeholder="Subject"
            name="emailSubject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <TextAreaStyles
            style={{ height: '100px' }}
            placeholder="Message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <SendBtn onClick={sendEmail}>SEND</SendBtn>
          <Box style={{ color: 'gray', fontSize: '15px' }}>
            **Please allow our team at least 24 hours to respond.
          </Box>
          <ToastStyledContainer />
        </InputPositions>
      </ContactUsStyles>
    </Container>
  );
};

export default Contact;
