import React, { useRef } from 'react';
import styled from 'styled-components';
// import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  background-color: #344966;
  display: grid;
  grid-template-columns: 3fr 1fr 7fr;
  justify-items: center;
  grid-template-columns: 3fr;
  row-gap: 50px;
  height: 900px;
`;

const MissionStatementStyles = styled.div`
  font-size: 25px;
  color: white;
  width: 80%;
`;

const ContactUsStyles = styled.div`
  font-size: 25px;
  color: white;
  width: 80%;
  margin-top: -190px;
`;

const InputPositions = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
`;

const InputStyles = styled.input`
  border-radius: 5px;
  background: transparent;
  color: white;
  height: 30px;
  width: 100%;
`;

const TextAreaStyles = styled.textarea`
  resize: none;
  background: transparent;
  color: white;
  border-radius: 5px;
  height: 150px;
  width: 100%;
`;

const SendBtn = styled.button`
  border-radius: 5px;
  cursor: pointer;
  background-color: #84bc9c;
  background-image: -webkit-linear-gradient(283deg, rgba(255, 255, 255, 0.1) 50%, transparent 55%),
    -webkit-linear-gradient(top, rgba(255, 255, 255, 0.15), transparent);
  color: white !important;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  text-decoration: none !important;
  -webkit-transition: all 0.2s linear;
  width: 100%;
  height: 40px;
  margin-top: 20px;

  :active {
    top: 4px;
  }
`;

const MobileHRLine = styled.hr`
  -webkit-transform: rotate(90deg);
  height: 330px;
  margin-top: -150px;
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
  const notify = () => toast('Email sent!', { position: toast.POSITION.BOTTOM_RIGHT });
  const failEmailSent = () =>
    toast('Failed to send email', { position: toast.POSITION.BOTTOM_RIGHT });
  const form = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();
    let customerEmail = form.current.customerEmail.value;
    let emailSubject = form.current.emailSubject.value;
    let message = form.current.message.value;

    if (!customerEmail || !customerEmail.includes('@') || !emailSubject || !message) {
      failEmailSent();
    } else if (customerEmail && emailSubject && message) {
      notify();
    }

    // SENDS EMAILS - COMMENTED OUT on purpose
    // emailjs
    //   .sendForm(
    //     "service_1iy93ml",
    //     "template_xyptqb9",
    //     form.current,
    //     "user_e3T93vvxc8HW0qDwv0GLU"
    //   )
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //       notify();
    //     },
    //     (error) => {
    //       console.log(error.text);
    //       failEmailSent();
    //     }
    //   );
  };

  return (
    <Container>
      <MissionStatementStyles>
        <h5 style={{ fontStyle: 'italic', fontSize: '30px' }}>OUR MISSION</h5>
        <div style={{ fontSize: '20px' }}>
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
      <MobileHRLine />
      <ContactUsStyles>
        <h3 style={{ fontStyle: 'italic', marginBottom: '0', fontSize: '30px' }}>Contact Us</h3>
        <div style={{ fontSize: '15px', marginBottom: '20px', color: 'gray' }}>
          i.e. partnerships, questions, general support
        </div>
        <form ref={form}>
          <InputPositions>
            <InputStyles placeholder="Email" name="customerEmail" />
            <InputStyles placeholder="Subject" name="emailSubject" />
            <TextAreaStyles style={{ height: '100px' }} placeholder="Message" name="message" />
            <SendBtn onClick={sendEmail}>SEND</SendBtn>
            <ToastStyledContainer />
          </InputPositions>
        </form>
      </ContactUsStyles>
    </Container>
  );
};

export default Contact;
