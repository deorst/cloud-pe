import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';
import { PROPS_LIST } from "../../CONFIG";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const CompanyComp = props => {

    const
        { ticker } = props.match.params,
        { companies } = props;

    props.fetchCompanyIfNeeded( ticker );

    // Display "Long Description" or not.
    const [ longDes, setLongDes ] = useState( false );
    const toggleDesLen = () => {
        setLongDes( !longDes );
    };

    return (
        <div className={ styles.container }>
            { !companies.hasOwnProperty( ticker ) ?
                <div></div>
                :
                <React.Fragment>
                    { Object.keys( PROPS_LIST ).map( key => {

                        // List all properties as long as it's not description.
                        if (( key !== 'short_description' ) && ( key !== 'long_description' )) {
                            return (
                                <div className={ styles.row } key={ key }>
                                    <div className={ styles.propKey }>
                                        { PROPS_LIST[key] }
                                    </div>
                                    <div className={ styles.propValue }>
                                        { companies[ ticker ][key] }
                                    </div>
                                </div>
                            )
                        }
                    } ) }

                    <div className={ styles.desContainer }>
                        <h4 className={ styles.header }>Description</h4>
                        <p className={ styles.desParagraph }>
                            { longDes ?
                                <Fragment>
                                    { companies[ ticker ].long_description }
                                    <button
                                        className={ styles.readMoreBtn }
                                        onClick={ toggleDesLen }
                                    >
                                        Show less
                                        <FontAwesomeIcon className={ styles.caret } icon={ faCaretUp }/>
                                    </button>
                                </Fragment>
                                :
                                <Fragment>
                                    { companies[ ticker ].short_description }
                                    <button
                                        className={ styles.readMoreBtn }
                                        onClick={ toggleDesLen }
                                    >
                                        Read more
                                        <FontAwesomeIcon className={ styles.caret } icon={ faCaretDown }/>
                                    </button>
                                </Fragment>
                            }
                        </p>
                    </div>
                </React.Fragment>
            }
        </div>
    )
};

CompanyComp.propTypes = {
    match: PropTypes.shape({ params: PropTypes.object.isRequired }).isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    companies: PropTypes.object.isRequired,
    fetchCompanyIfNeeded: PropTypes.func.isRequired
};

export default CompanyComp;
