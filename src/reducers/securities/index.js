import { RECEIVE_SECURITIES, REQUEST_SECURITIES } from "../../actions/securities";

function securities( state={
    isFetching: false,
    didInvalidate: false,
    items: []
}, action ) {
    switch ( action.type ) {
        case REQUEST_SECURITIES:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_SECURITIES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.securities,
                lastUpdated: action.receivedAt
            });
        default:
            return state;
    }
}

export default securities;
