import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
    SectionContainer,
    SectionHeader
} from "../styled";

const
    Input = styled.input`
        border: 1px solid lightgrey;
        border-radius: 5px;
        height: 4em;
        padding: 1em;
        margin-bottom: 20px;
        font-family: "Avenir Next", Verdana, sans-serif;
        font-size: 1em;
        :focus {
            outline: none;
            border: 2px solid #04395E;
        }
    `,
    Textarea = styled( Input )`
        resize: vertical;
    `,
    Button = styled.button`
        width: 10em;
        height: 3em;
        margin: 1em;
        padding: 0.5em 1em;
        background-color: transparent;
        border: 2px solid #04395E;
        border-radius: 5px;
        color: #04395E;
        font-family: "Avenir Next", Verdana, sans-serif;
        font-size: 1em;
        :hover {
            border: 3px solid #04395E;
            font-weight: bolder;
        }
    `,
    BtnContainer = styled.div`
        display: flex;
        justify-content: space-around;
    `;

const AddCommentComp = props => {

    const { addComment, ticker } = props;

    const [ comment, setComment ] = useState({ name: '', text: '' });

    const handleCommentChange = ev => {
      setComment({ ...comment, [ ev.target.name ]: ev.target.value })
    };

    const submitComment = ev => {
      ev.preventDefault();
      if ( comment.name && comment.text ) {
          addComment({ ticker, ...comment });
          setComment({ name: '', text: '' });
      }
    };

    const cancelComment = ev => {
      ev.preventDefault();
      setComment({ name: '', text: '' });
    };

    return (
        <SectionContainer as="form">
          <SectionHeader>Add comment</SectionHeader>
          <Input
              type="text"
              placeholder="Name"
              value={ comment.name }
              name="name"
              onChange={ handleCommentChange }
          />
          <Textarea
              as="textarea"
              placeholder="Comment"
              value={ comment.text }
              name="text"
              onChange={ handleCommentChange }
          />
          <BtnContainer>
             <Button
                 type="submit"
                 onClick={ submitComment }
             >Submit</Button>
             <Button
                 onClick={ cancelComment }
             >Cancel</Button>
          </BtnContainer>
        </SectionContainer>
    )
};

AddCommentComp.propTypes = {
    addComment: PropTypes.func.isRequired,
    ticker: PropTypes.string.isRequired
};

export default AddCommentComp;