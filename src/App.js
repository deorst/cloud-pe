import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  Footer,
  NavbarComp
} from './components';

import {
  CompaniesCont,
  CompanyCont,
  LandingPageCont
} from './containers';

import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

function App() {
  return (
      <Container>
        <NavbarComp/>
        <Switch>
          <Route path='/companies/:ticker' component={ CompanyCont } />
          <Route path='/companies' component={ CompaniesCont } />
          <Route path='/' component={ LandingPageCont } />
        </Switch>
        <Footer />
      </Container>
  );
}

export default App;
