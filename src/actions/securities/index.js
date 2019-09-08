import { API_KEY, API_ROOT, SECURITIES_PERIOD, SECURUTIES_LENGTH } from "../../CONFIG";

export const REQUEST_SECURITIES = 'REQUEST_SECURITIES';
function requestSecurities() {
    return {
        type: REQUEST_SECURITIES
    }
}

export const RECEIVE_SECURITIES = 'RECEIVE_SECURITIES';
function receiveSecurities( securities ) {
    return {
        type: RECEIVE_SECURITIES,
        securities,
        receivedAt: Date.now()
    }
}

function fetchSecurities() {
    return function( dispatch ) {
        dispatch( requestSecurities());

        return fetch( `${ API_ROOT }/securities?page_size=${ SECURUTIES_LENGTH }&api_key=${ API_KEY }` )
            .then( res => res.json() )
            .then( data => {

                // Leave just "name" and "ticker" properties, get rid of all the rest.
                return  data.securities.map(({ name, ticker }) => ({ name, ticker }));

            })
            .then( securities => {

                let reqDate = new Date();

                // The day before yesterday - to make sure the data exist.
                reqDate.setDate( reqDate.getDate() - SECURITIES_PERIOD );
                reqDate = reqDate.toISOString().split( 'T' )[ 0 ];

                // See "Redundant fetching" section in README.
                Promise.all( securities.map( security => {
                    return fetch( `${ API_ROOT }/securities/${ security.ticker }/prices?start_date=${ reqDate }&api_key=${ API_KEY }` )
                        .then( res => res.json())
                        .then( data => {

                            // Get the data for the last date, which is the first object in array.
                            const { open, close, high } = data.stock_prices[ 0 ];
                            security.open = open;
                            security.close = close;
                            security.high = high;
                        })
                        .catch( err => console.error( err ));
                }))
                    .then( () => {
                        dispatch( receiveSecurities( securities ))
                    });
            })
            .catch( err => console.error( err ) );
    }
}

function shouldFetchSecurities( state ) {
    const { securities } = state;
    if ( Object.keys( securities.items ).length === 0 ) {
        return true;
    } else if ( securities.isFetching ) {
        return false;
    } else {
        return securities.didInvalidate;
    }
}

export function fetchSecuritiesIfNeeded() {
    return ( dispatch, getState ) => {
        if ( shouldFetchSecurities( getState())) {
            return dispatch( fetchSecurities())
        } else {
            return Promise.resolve();
        }
    }
}
