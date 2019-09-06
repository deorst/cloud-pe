import React, { Fragment, useState, useEffect } from 'react';
import styles from './index.module.css';
import { API_KEY, PROPS_LIST } from "../../CONFIG";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

const CompanyComp = props => {

    const [companyData, setCompanyData] = useState( {} );
    const [longDes, setLongDes] = useState( false );

    useEffect( () => {
        fetch( `https://api-v2.intrinio.com/companies/${ props.match.params.companyName }?api_key=${ API_KEY }` )
            .then( res => res.json() )
            .then( data => {
                setCompanyData( data );
            } )
            .catch( err => {
                console.error( err );
            } )
    }, [] );

    const toggleDesLen = () => {
        setLongDes( !longDes );
    };

    return (
        <div className={ styles.container }>
            { Object.keys( PROPS_LIST ).map( key => {

                if (( key !== 'short_description' ) && ( key !== 'long_description' )) {
                    return (
                        <div className={ styles.row } key={ key }>
                            <div className={ styles.propKey }>
                                { PROPS_LIST[key] }
                            </div>
                            <div className={ styles.propValue }>
                                { companyData[key] }
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
                            { companyData.long_description }
                            <button
                                className={ styles.readMoreBtn }
                                onClick={ toggleDesLen }
                            >
                                Read less
                                <FontAwesomeIcon className={ styles.caret } icon={ faCaretUp }/>
                            </button>
                        </Fragment>
                        :
                        <Fragment>
                            { companyData.short_description }
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
        </div>
    )
};

export default CompanyComp;
