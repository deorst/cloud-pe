import {
    API_KEY,
    API_ROOT,
    EXTRA_PROP,
    PROPS_LIST,
    NEWS_PAGE_SIZE
} from "../../CONFIG";

export const REQUEST_COMPANY = 'REQUEST_COMPANY';
function requestCompany() {
    return {
        type: REQUEST_COMPANY
    }
}

export const RECEIVE_COMPANY = 'RECEIVE_COMPANY';
function receiveCompany( company ) {
    return {
        type: RECEIVE_COMPANY,
        company,
        receivedAt: Date.now()
    }
}

export const ADD_COMMENT = 'ADD_COMMENT';
export function addComment( comment ) {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const REQUEST_NEWS = 'REQUEST_NEWS';
function requestNews() {
    return {
        type: REQUEST_NEWS
    }
}

export const RECEIVE_NEWS = 'RECEIVE_NEWS';
function receiveNews( news ) {
    return {
        type: RECEIVE_NEWS,
        news
    }
}

function fetchCompany( ticker ) {
    return function( dispatch ) {

        dispatch( requestCompany());

        return fetch( `${ API_ROOT }/companies/${ ticker }?api_key=${ API_KEY }` )
            .then( res => res.json() )
            .then( data => {
                const company = {};

                // Keep just the properties we need.
                Object.keys( PROPS_LIST ).forEach( prop => company[ prop ] = data[ prop ]);

                dispatch( receiveCompany( company ));
            })
            .catch( err => console.error( err ) );
    }
}

function fetchNews( ticker ) {
    return function( dispatch ) {
        dispatch( requestNews());

        return fetch( `${ API_ROOT }/companies/${ ticker }/news?page_size=${ NEWS_PAGE_SIZE }&api_key=${ API_KEY }`)
            .then( res => res.json())
            .then( data => {
                dispatch( receiveNews( { data: data.news, ticker: data.company.ticker } ));
            })
            .catch( err => console.error( err ));
    }
}

function shouldFetchCompany( state, ticker ) {
    const { companies } = state;

    if ( Object.keys( companies.items ).length === 0 ) {
        return true;
    } else if ( !companies.items.hasOwnProperty( ticker )) {
        return true;

    // Data for display in "Companies" and "Company" kept in the same place,
    // but for the former case it's just ticker and name, and many more properties
    // for the latter one. So I just override the part of the data to add new properties
    // for the company, and this "if statement" checks whether extra data exist in the store.
    // If not - request it from API.
    // For now - this "extra property" is legal_name, but may be anything else, if we decide
    // to stop displaying Legal Name. We can change it in any time in CONFIG.
    } else if (!companies.items[ ticker ].hasOwnProperty( EXTRA_PROP )) {
        return true;
    } else if ( companies.isFetching ) {
        return false;
    } else {
        return companies.didInvalidate;
    }
}

export function fetchCompanyIfNeeded( ticker ) {
    return ( dispatch, getState ) => {
        if ( shouldFetchCompany( getState(), ticker )) {
            return Promise.all([ dispatch( fetchCompany( ticker )), dispatch( fetchNews( ticker )) ]);
        } else {
            return Promise.resolve();
        }
    }
}

