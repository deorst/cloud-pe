import React from 'react';
import PropTypes from 'prop-types';

import AddCommentComp from "./AddCommentComp";
import CommentsComp from "./CommentsComp";
import BasicInfoComp from "./BasicInfoComp";
import DescriptionComp from "./DescriptionComp";
import NewsComp from "./NewsComp";
import { Container } from "../styled";

const CompanyComp = props => {

    const
        { ticker } = props.match.params,
        {
            addComment,
            companies,
            fetchCompanyIfNeeded
        } = props;

    fetchCompanyIfNeeded( ticker );

    return (
        <Container>

            <BasicInfoComp company={ companies[ ticker ]} />

            <DescriptionComp company={ companies[ ticker ]} />

            <AddCommentComp ticker={ ticker } addComment={ addComment }/>

            <CommentsComp company={ companies[ ticker ]} />

            <NewsComp company={ companies[ ticker ]} />

        </Container>
    )
};

CompanyComp.propTypes = {
    match: PropTypes.shape({ params: PropTypes.object.isRequired }).isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    companies: PropTypes.object.isRequired,
    fetchCompanyIfNeeded: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired
};

export default CompanyComp;
