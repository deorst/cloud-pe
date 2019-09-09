import React from 'react';
import { Link } from "react-router-dom";

import styles from './index.module.css';

const NavbarComp = props => {
  return (
    <div className={ styles.container }>
      <Link to="/" className={ styles.brand }>
        Cloud-PE
      </Link>
      <ul>
        <li><Link to='/companies' className={ styles.link }>Companies</Link></li>
      </ul>
    </div>
  )
};

export default NavbarComp;
