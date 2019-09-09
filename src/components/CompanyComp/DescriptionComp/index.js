import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styles from "../index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

const DescriptionComp = props => {

    const { company } = props;

    // Display "Long Description" or not.
    const [ longDes, setLongDes ] = useState( false );
    const toggleDesLen = () => {
        setLongDes( !longDes );
    };

    if ( !company ) return null;

    return (
        <div className={ styles.sectionContainer }>
            <h4 className={ styles.sectionHeader }>Description</h4>
            <p className={ styles.desParagraph }>
                { longDes ?
                    <Fragment>
                        { company.long_description }
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
                        { company.short_description }
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

    )
};

DescriptionComp.propTypes = {
    company: PropTypes.object
};

export default DescriptionComp;