import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CARD_STRUCTURE } from "../../CONFIG";

import styles from './index.module.css';


const LandingPageComp = props => {

    props.fetchSecuritiesIfNeeded();

    return (
        <div className={ styles.container }>
            <div className={ styles.cardRow }>
                { props.securities.map( security => {
                    return  (
                        <Link to={ `/companies/${ security.ticker }` } key={ security.ticker } className={ styles.card }>
                            { Object.keys( CARD_STRUCTURE ).map( key => {
                                return (
                                    <div key={ key } className={ styles.propLine }>
                                        <div className={ styles.propKey }>
                                            { CARD_STRUCTURE[key] }:
                                        </div>
                                        <div className={ styles.propValue }>
                                            { security[key] || 'Not available' }
                                        </div>
                                    </div>
                                )
                            } ) }
                        </Link>
                    )
                } ) }
            </div>
        </div>
    )
};

LandingPageComp.propTypes = {
    fetchSecuritiesIfNeeded: PropTypes.func.isRequired,
    securities: PropTypes.array.isRequired
};

export default LandingPageComp;

