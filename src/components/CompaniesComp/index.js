import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useDebounce from "./useDebounce";
import styled from 'styled-components';
import { Container } from "../styled";
import Loader from 'react-loader-spinner';

const
    Card = styled( Link )`
        border: 1px solid rgba(4,57,94, 0.1);
        margin: 10px;
        padding: 20px;
        width: 80%;
        text-align: center;
        font-size: 11px;
        :hover {
            background-color: rgba(4,57,94, 0.1);
        }
    `,
    Input = styled.input`
        border: 1px solid rgba(4,57,94, 0.1);
        margin: 0 10px 10px 10px 10px;
        padding: 20px;
        width: 80%;
        text-align: center;
        font-size: 11px;
        background-color: rgba(4,57,94, 0.1);
        :focus {
            outline: 0;
            border: 2px solid #04395E;
        }
        text-align: left;
        font-size: 1em;
    `,
    Label = styled.label`
        font-family: "Avenir Next", sans;
    `
;

const CompaniesComp = props => {

    const { fetchCompanies } = props;
    
    const [ query, setQuery ] = useState( '' );
    
    const debouncedQuery = useDebounce( query, 2000 );
    
    useEffect(() => {
        fetchCompanies( debouncedQuery );
    }, [ debouncedQuery, fetchCompanies ]);
    
    const displaySpinner = () => {
        return (( query !== debouncedQuery ) || ( Object.values( props.companies ).length === 0 ));
    };

    return (
        <Container>
            <Label
                htmlFor="searchCompany">
                Search a company
            </Label>
            <Input
                id="searchCompany"
                type="text"
                placeholder="Apple Inc..."
                value={ query }
                onChange={ ev => setQuery( ev.target.value )}
            />
            { displaySpinner()
                ? <Loader
                    type="MutatingDots"
                    color="#04395E"
                />
                : <Fragment>
                    { Object.values( props.companies ).map( company => (
                        <Card to={ `/companies/${ company.ticker }` } key={ company.ticker }>
                            <strong>{ company.ticker }</strong> { company.name }
                        </Card>
                    ) ) }
                </Fragment>
            }
        </Container>
    )
};

CompaniesComp.defaultProps = {
    companies: {},
    fetchCompanies: () => console.error( 'fetchCompaniesIfNeeded() is not supplied' )
};

CompaniesComp.propTypes = {
    fetchCompanies: PropTypes.func.isRequired,
    companies: PropTypes.object.isRequired
};

export default CompaniesComp;