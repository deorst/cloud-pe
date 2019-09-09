import React from 'react';
import PropTypes from 'prop-types';

import styles from "../index.module.css";

const CommentsComp = props => {

    const { company } = props;

    if (
        !company
        || !company.hasOwnProperty( 'comments' )
        || !company.comments.length > 0
    ) return null;

    return (
        <div className={ styles.sectionContainer }>
            <h4 className={ styles.sectionHeader }>Comments</h4>
            { company.comments.map(( comment, idx ) => (
                <div className={ styles.comment } key={ idx }>
                    <div><strong>{ comment.name }</strong></div>
                    <p className={ styles.commentText }>{ comment.text }</p>
                </div>
            ))}
        </div>

    )
};

CommentsComp.propTypes = {
    company: PropTypes.object
};

export default CommentsComp;