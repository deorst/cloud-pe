import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const
    Container = styled.div`
        height: 80px;
        background-color: #04395E;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
    `,
    BrandLink = styled( Link )`
        font-family: 'Impact', sans-serif;
        color: white;
        font-size: 30px;
    `,
    CompaniesLink = styled( Link )`
        color: white;
        font-family: 'Avenir Next', sans-serif;
    `;
    


const NavbarComp = props => {
  return (
    <Container>
      <BrandLink to="/">
        Cloud-PE
      </BrandLink>
      <CompaniesLink to='/companies'>Companies</CompaniesLink>
    </Container>
  )
};

export default NavbarComp;
