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

import styles from './app.module.css';

function App() {
  return (
      <div className={ styles.container }>
        <NavbarComp/>
        <Switch>
          <Route path='/companies/:ticker' component={ CompanyCont } />
          <Route path='/companies' component={ CompaniesCont } />
          <Route path='/' component={ LandingPageCont } />
        </Switch>
        <Footer />
      </div>
  );
}

export default App;
