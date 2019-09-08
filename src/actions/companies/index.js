import { API_KEY, API_ROOT, COMPANIES_LENGTH } from "../../CONFIG";

export const REQUEST_COMPANIES = 'REQUEST_COMPANIES';
function requestCompanies() {
    return {
        type: REQUEST_COMPANIES
    }
}

export const RECEIVE_COMPANIES = 'RECEIVE_COMPANIES';
function receiveCompanies( companies ) {
    return {
        type: RECEIVE_COMPANIES,
        companies,
        receivedAt: Date.now()
    }
}

function fetchCompanies() {
    return function( dispatch ) {
        dispatch( requestCompanies());

        return fetch( `${ API_ROOT }/companies?api_key=${ API_KEY }` )
            .then( res => res.json() )
            .then( data => {

                const companies = {};
                data.companies.forEach(({ name, ticker }) => companies[ ticker ] = { name, ticker });
                dispatch( receiveCompanies( companies ));

            })
            .catch( err => console.error( err ) );
    }
}

function shouldFetchCompanies( state ) {
    const { companies } = state;
    if ( Object.keys( companies.items ).length < COMPANIES_LENGTH ) {
        return true;
    } else if ( companies.isFetching ) {
        return false;
    } else {
        return companies.didInvalidate;
    }
}

export function fetchCompaniesIfNeeded() {
    return ( dispatch, getState ) => {
        if ( shouldFetchCompanies( getState())) {
            return dispatch( fetchCompanies())
        } else {
            return Promise.resolve();
        }
    }
}
