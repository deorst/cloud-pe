import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
    SectionContainer,
    SectionHeader
} from "../styled";

const
    Comment = styled.div`
        margin-bottom: 1em;
    `,
    CommentText = styled.p`
        font-family: "Avenir Next", Verdana, sans-serif;
    `
;

const CommentsComp = props => {

    const { company } = props;

    if (
        !company
        || !company.hasOwnProperty( 'comments' )
        || !company.comments.length > 0
    ) return null;

    return (
        <SectionContainer>
            <SectionHeader>Comments</SectionHeader>
            { company.comments.map(( comment, idx ) => (
                <Comment key={ idx }>
                    <div><strong>{ comment.name }</strong></div>
                    <CommentText>{ comment.text }</CommentText>
                </Comment>
            ))}
        </SectionContainer>

    )
};

CommentsComp.propTypes = {
    company: PropTypes.object
};

export default CommentsComp;