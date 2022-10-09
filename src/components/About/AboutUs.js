import React from 'react';
import styled from 'styled-components';
import Price from './Price';
import CustomerSatisfaction from './CustomerSatisfaction';
import Easy from './Easy';
import Paperless from './Paperless';

const SmallParagraph = styled.div`
  font-size: 25px;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  padding: 0 200px;
  font-family: 'Avenir Next';
  &.tablet {
    padding: 0 100px;
    margin-bottom: 20px;
  }
  &.phone {
    padding: 0 50px;
    margin-bottom: 20px;
  }
`;

const Header = styled.h1`
  margin-top: 20px;
  font-size: 55px;
  font-weight: bold;
  align-items: center;
  display: flex;
  justify-content: center;
  &.phone {
    font-size: 30px;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr;
  text-align: center;
  column-gap: 85px;
  row-gap: 65px;
  padding: 0 50px;
  &.tablet {
    grid-template-columns: 3fr 3fr;
    row-gap: 50px;
  }
  &.phone {
    grid-template-columns: 3fr;
    row-gap: 50px;
  }
`;

const AboutUs = () => {
  return (
    <>
      <Header>What We Offer</Header>
      <SmallParagraph>
        Our team believes in providing free and easy to use services to those who are taking steps
        to improve their financial stability. Our budgeting services are completely FREE! Donations
        are welcomed to help our team continue providing free budgeting services.
      </SmallParagraph>
      <div>
        <Content>
          <Price />
          <CustomerSatisfaction />
          <Paperless />
          <Easy />
        </Content>
      </div>
    </>
  );
};

export default AboutUs;
