import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const CompaniesComp = props => {

    props.fetchCompaniesIfNeeded();

    return (
        <div className={ styles.container }>
            { Object.values( props.companies ).map( company => (
                <Link to={ `/companies/${ company.ticker }` } className={ styles.card } key={ company.ticker }>
                    <strong>{ company.ticker }</strong> { company.name }
                </Link>
            ) ) }
        </div>
    )
};

CompaniesComp.defaultProps = {
    companies: {},
    fetchCompaniesIfNeeded: () => console.error( 'fetchCompaniesIfNeeded() is not supplied' )
};

CompaniesComp.propTypes = {
    fetchCompaniesIfNeeded: PropTypes.func.isRequired,
    companies: PropTypes.object.isRequired
};

export default CompaniesComp;