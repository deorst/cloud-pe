import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from "../index.module.css";

const AddCommentComp = props => {

    const { addComment, ticker } = props;

    const [ comment, setComment ] = useState({ name: '', text: '' });

    const handleCommentChange = ev => {
      setComment({ ...comment, [ ev.target.name ]: ev.target.value })
    };

    const submitComment = ev => {
      ev.preventDefault();
      addComment({ ticker, ...comment });
      setComment({ name: '', text: '' });
    };

    const cancelComment = ev => {
      ev.preventDefault();
      setComment({ name: '', text: '' });
    };

    return (
       <form className={ styles.sectionContainer }>
          <h4 className={ styles.sectionHeader }>Add comment</h4>
          <input
              type="text"
              placeholder="Name"
              className={ styles.input }
              value={ comment.name }
              name="name"
              onChange={ handleCommentChange }
          />
          <textarea
              className={ styles.input }
              placeholder="Comment"
              value={ comment.text }
              name="text"
              onChange={ handleCommentChange }
          />
          <div className={ styles.btnContainer }>
             <button
                 type="submit"
                 className={ styles.button }
                 onClick={ submitComment }
             >Submit</button>
             <button
                 className={ styles.button }
                 onClick={ cancelComment }
             >Cancel</button>
          </div>
       </form>
    )
};

AddCommentComp.propTypes = {
    addComment: PropTypes.func.isRequired,
    ticker: PropTypes.string.isRequired
};

export default AddCommentComp;