import React, { Fragment } from 'react';
import { PROPS_LIST } from "../../../CONFIG";
import styled from 'styled-components';

import {
    SectionContainer,
    SectionHeader
} from "../styled";

const
    Row = styled.div`
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid lightgrey;
        padding-top: 10px;
    `,
    PropKey = styled.div`
        font-family: "Avenir Next", sans-serif;
        margin-right: 100px;
    `,
    PropValue = styled.div`
        font-family: Verdana, sans-serif;
        font-weight: 800;
    `
;

const BasicInfoComp = props => {

    const { company } = props;

    if ( !company ) return null;

    return (
        <SectionContainer>
            <SectionHeader>Basic Information</SectionHeader>
            { Object.keys( PROPS_LIST ).map( key => {
                // List all properties as long as it's not description.
                if (( key !== 'short_description' ) && ( key !== 'long_description' )) {
                    return (
                        <Row key={ key }>
                            <PropKey>
                                { PROPS_LIST[key] }
                            </PropKey>
                            <PropValue>
                                { company[ key ] }
                            </PropValue>
                        </Row>
                    )
                } else return <Fragment key={ key }></Fragment>;
            } ) }
        </SectionContainer>
    )
};

export default BasicInfoComp;