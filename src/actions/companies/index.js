import { API_KEY, API_ROOT } from "../../CONFIG";

export const REQUEST_COMPANIES = 'REQUEST_COMPANIES';
function requestCompanies( query ) {
    return {
        type: REQUEST_COMPANIES,
        query
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

export function fetchCompanies( query ) {
    
    const fetchURL = query
        ? `${ API_ROOT }/companies/search?query=${ query }&api_key=${ API_KEY }`
        : `${ API_ROOT }/companies?api_key=${ API_KEY }`;
    
    return function ( dispatch ) {
        dispatch( requestCompanies( query ) );
        return fetch( fetchURL )
            .then( res => res.json() )
            .then( data => {
                const companies = {};
                data.companies.forEach( ( { name, ticker } ) => companies[ticker] = { name, ticker } );
                dispatch( receiveCompanies( companies ) );
            } )
            .catch( err => console.error( err ) );
    }
}
