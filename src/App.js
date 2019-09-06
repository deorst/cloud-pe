import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import {
  CompaniesComp,
  CompanyComp,
  Footer,
  LandingPageComp,
  NavbarComp
} from './components';
import styles from './app.module.css';

function App() {
  return (
    <Router>
      <div className={ styles.container }>
        <NavbarComp/>
        <Switch>
          <Route path='/companies/:companyName' component={ CompanyComp } />
          <Route path='/companies' component={ CompaniesComp } />
          <Route path='/' component={ LandingPageComp } />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
