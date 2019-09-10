import React from 'react';
import styled from 'styled-components';

const
    Container = styled.div`
        height: 30px;
        width: 100%;
        border-top: 1px solid lightgrey;
        font-family: "Avenir Next", sans-serif;
        font-size: 10px;
        text-align: center;
    `,
    Paragraph = styled.p`
        color: grey;
        margin: 5px 0;
    `;

const Footer = props => {
  return (
    <Container>
      <Paragraph>Dmitry Stadnik 2019, All rights reserved ;)</Paragraph>
    </Container>
  )
};

export default Footer;