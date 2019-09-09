import React, { Fragment } from 'react';
import styles from "../index.module.css";
import { PROPS_LIST } from "../../../CONFIG";

const BasicInfoComp = props => {

    const { company } = props;

    if ( !company ) return null;

    return (
        <div className={ styles.sectionContainer }>
            <h4 className={ styles.sectionHeader }>Basic Information</h4>
            { Object.keys( PROPS_LIST ).map( key => {

                // List all properties as long as it's not description.
                if (( key !== 'short_description' ) && ( key !== 'long_description' )) {
                    return (
                        <div className={ styles.row } key={ key }>
                            <div className={ styles.propKey }>
                                { PROPS_LIST[key] }
                            </div>
                            <div className={ styles.propValue }>
                                { company[ key ] }
                            </div>
                        </div>
                    )
                } else return <Fragment key={ key }></Fragment>;
            } ) }
        </div>
    )
};

export default BasicInfoComp;