import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
    SectionContainer,
    SectionHeader
} from "../styled";

const
    Input = styled.input`
        border: 1px solid ${ props => props.error ? 'red' : 'lightgrey'}
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
    `,
    Label = styled.label`
        font-family: "Avenir Next", sans;
    `;

const AddCommentComp = props => {
    
    const { addComment, ticker } = props;
    
    const [comment, setComment] = useState( { name: '', text: '' } );
    const [error, setError] = useState( false );
    
    const handleCommentChange = ev => {
        setError( false );
        setComment( { ...comment, [ev.target.name]: ev.target.value } )
    };
    
    const submitComment = ev => {
        ev.preventDefault();
        
        // Just checking whether input field is empty,
        // no check on validity.
        if ( comment.name && comment.text ) {
            addComment( { ticker, ...comment } );
            setComment( { name: '', text: '' } );
        } else setError( true );
    };
    
    const cancelComment = ev => {
        ev.preventDefault();
        setError( false );
        setComment( { name: '', text: '' } );
    };
    
    return (
        <SectionContainer as="form">
            <SectionHeader>Add comment</SectionHeader>
            <Label htmlFor="name">Name</Label>
            <Input
                id="name"
                type="text"
                placeholder="John Smith"
                value={ comment.name }
                name="name"
                onChange={ handleCommentChange }
                error={ error }
            />
            <Label htmlFor="text">Comment</Label>
            <Textarea
                id="text"
                as="textarea"
                placeholder="Type something you'd like..."
                value={ comment.text }
                name="text"
                onChange={ handleCommentChange }
                error={ error }
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