import update from 'immutability-helper';
import { RECEIVE_SECURITIES, REQUEST_SECURITIES } from "../../actions/securities";

function securities( state={
    isFetching: false,
    items: []
}, action ) {
    switch ( action.type ) {
        case REQUEST_SECURITIES:
            return update( state, {
                isFetching: { $set: true }
            });
        case RECEIVE_SECURITIES:
            return update( state, {
                isFetching: { $set: false },
                items: { $set: action.securities }
            });
        default:
            return state;
    }
}

export default securities;
