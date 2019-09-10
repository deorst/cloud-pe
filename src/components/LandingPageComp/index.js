import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CARD_STRUCTURE } from "../../CONFIG";

import styled from 'styled-components';
import { Container } from "../styled";

const
    LandingContainer = styled( Container )`
        height: 100%;
    `,
    CardRow = styled.div`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    `,
    Card = styled( Link )`
        margin: 10px;
        padding: 10px;
        flex-basis: 17%;
        border: 1px solid rgba(4,57,94, 0.1);
        font-size: 11px;
        :hover {
            background-color: rgba(4,57,94, 0.1);
        }
        :focus {
            outline: 0;
            background-color: rgba(4,57,94, 0.4);
        }
    `,
    PropLine = styled.div`
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
    `,
    PropKey = styled.div`
        font-family: Avenir Next;
    `,
    PropValue = styled.div`
        font-family: 'Retina', Arial, Helvetica, sans-serif;
        font-weight: 800;
    `
;

const LandingPageComp = props => {

    props.fetchSecuritiesIfNeeded();

    return (
        <LandingContainer>
            <CardRow>
                { props.securities.map( security => {
                    return  (
                        <Card to={ `/companies/${ security.ticker }` } key={ security.ticker }>
                            { Object.keys( CARD_STRUCTURE ).map( key => {
                                return (
                                    <PropLine key={ key }>
                                        <PropKey>
                                            { CARD_STRUCTURE[key] }:
                                        </PropKey>
                                        <PropValue>
                                            { security[key] || 'Not available' }
                                        </PropValue>
                                    </PropLine>
                                )
                            } ) }
                        </Card>
                    )
                } ) }
            </CardRow>
        </LandingContainer>
    )
};

LandingPageComp.propTypes = {
    fetchSecuritiesIfNeeded: PropTypes.func.isRequired,
    securities: PropTypes.array.isRequired
};

export default LandingPageComp;

