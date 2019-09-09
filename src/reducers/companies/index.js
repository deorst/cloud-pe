import { RECEIVE_COMPANIES, REQUEST_COMPANIES } from "../../actions/companies";
import { RECEIVE_COMPANY, REQUEST_COMPANY, ADD_COMMENT } from "../../actions/company";

function companies( state={
    isFetching: false,
    didInvalidate: false,
    items: {}
}, action ) {

    // Declare variable for future use.
    let comments;

    switch ( action.type ) {
        case REQUEST_COMPANIES:
            return Object.assign( {}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_COMPANIES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.companies,
                lastUpdated: action.receivedAt
            });
        case REQUEST_COMPANY:
            return Object.assign({}, state, {
                isFetching: true,
                dedInvalidate: false
            });
        case RECEIVE_COMPANY:

            comments = JSON.parse( sessionStorage.getItem( action.company.ticker )) || [];

            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: {
                    ...state.items,
                    [ action.company.ticker ]: {
                        ...action.company,
                        comments
                    }
                },
                lastUpdated: action.receivedAt
            });
        case ADD_COMMENT:

            if ( state.items[ action.comment.ticker ].hasOwnProperty( 'comments' )) {
                comments = [
                    ...state.items[ action.comment.ticker ].comments,
                    {
                        name: action.comment.name,
                        text: action.comment.text
                    }
                ]
            } else {
                comments = [{
                    name: action.comment.name,
                    text: action.comment.text
                }]
            }

            sessionStorage.setItem( action.comment.ticker, JSON.stringify( comments ));

            return Object.assign( {}, state, {
                items: {
                    ...state.items,
                    [ action.comment.ticker ]: {
                        ...state.items[ action.comment.ticker ],
                        comments
                    }
                }
            });
        default:
            return state;
    }
}

export default companies;
