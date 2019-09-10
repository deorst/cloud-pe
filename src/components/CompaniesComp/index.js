import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useDebounce from "./useDebounce";
import styles from './index.module.css';

const CompaniesComp = props => {

    const { fetchCompanies } = props;
    
    const [ query, setQuery ] = useState( '' );
    
    const debouncedQuery = useDebounce( query, 2000 );
    
    useEffect(() => {
        fetchCompanies( debouncedQuery );
    }, [ debouncedQuery, fetchCompanies ]);

    return (
        <div className={ styles.container }>
            <input
                type="text"
                value={ query }
                onChange={ ev => setQuery( ev.target.value )}
                className={ styles.card }
            />
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
    fetchCompanies: () => console.error( 'fetchCompaniesIfNeeded() is not supplied' )
};

CompaniesComp.propTypes = {
    fetchCompanies: PropTypes.func.isRequired,
    companies: PropTypes.object.isRequired
};

export default CompaniesComp;