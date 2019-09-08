import { RECEIVE_COMPANIES, REQUEST_COMPANIES } from "../../actions/companies";
import { RECEIVE_COMPANY, REQUEST_COMPANY } from "../../actions/company";

function companies( state={
    isFetching: false,
    didInvalidate: false,
    items: {}
}, action ) {
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
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: {
                    ...state.items,
                    [ action.company.ticker ]: action.company,
                },
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
}

export default companies;
