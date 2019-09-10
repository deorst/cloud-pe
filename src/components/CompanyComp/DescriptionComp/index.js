import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import styled from 'styled-components';

import {
    SectionContainer,
    SectionHeader
} from "../styled";

const
    DescriptionParagraph = styled.p`
        text-align: justify;
        text-justify: inter-word;
        text-indent: 50px;
        font-family: "Avenir Next", Verdana, sans-serif;
    `,
    ReadMoreBtn = styled.button`
        border: none;
        font-family: "Avenir Next", Verdana, sans-serif;
        font-size: 1em;
        margin: 0 5px;
        font-weight: bold;
        :focus {
            outline: none;
        }
    `
;

const DescriptionComp = props => {

    const { company } = props;

    // Display "Long Description" or not.
    const [ longDes, setLongDes ] = useState( false );
    const toggleDesLen = () => {
        setLongDes( !longDes );
    };

    if ( !company ) return null;

    return (
        <SectionContainer>
            <SectionHeader>Description</SectionHeader>
            <DescriptionParagraph>
                { longDes ?
                    <Fragment>
                        { company.long_description }
                        <ReadMoreBtn onClick={ toggleDesLen }>
                            Show less
                            <FontAwesomeIcon icon={ faCaretUp }/>
                        </ReadMoreBtn>
                    </Fragment>
                    :
                    <Fragment>
                        { company.short_description }
                        <ReadMoreBtn onClick={ toggleDesLen }>
                            Read more
                            <FontAwesomeIcon icon={ faCaretDown }/>
                        </ReadMoreBtn>
                    </Fragment>
                }
            </DescriptionParagraph>
        </SectionContainer>
    )
};

DescriptionComp.propTypes = {
    company: PropTypes.object
};

export default DescriptionComp;