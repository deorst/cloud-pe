import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';
import { API_KEY } from "../../CONFIG";

const CompaniesComp = props => {

  const [ companies, setCompanies ] = useState([]);

  useEffect(() => {
   fetch( `https://api-v2.intrinio.com/companies?api_key=${ API_KEY }`)
     .then( res => res.json())
     .then( data => {
       setCompanies( data.companies );
     })
     .catch( err => {
       console.error( err );
     })
  }, []);

  return (
    <div className={ styles.container }>
      { companies.map( company => (
        <Link to={ `/companies/${ company.ticker }`} className={ styles.card } key={ company.id }>
          <strong>{ company.ticker }</strong> { company.name }
        </Link>
      ))}
    </div>
  )
};

export default CompaniesComp;