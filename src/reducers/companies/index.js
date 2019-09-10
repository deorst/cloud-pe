import update from 'immutability-helper';
import {
    RECEIVE_COMPANIES,
    REQUEST_COMPANIES
} from "../../actions/companies";

import {
    RECEIVE_COMPANY,
    REQUEST_COMPANY,
    ADD_COMMENT,
    RECEIVE_NEWS,
    REQUEST_NEWS
} from "../../actions/company";

function companies( state={
    isFetching: false,
    query: '',
    items: {}
}, action ) {

    // Declare variable for future use.
    let comments;

    switch ( action.type ) {
        
        case REQUEST_COMPANY:
        case REQUEST_NEWS:
            return update( state, {
                isFetching: { $set: true }
            });
            
        case REQUEST_COMPANIES:
            return update( state, {
                isFetching: { $set: true },
                query: { $set: action.query ? action.query : '' }
            });
            
        case RECEIVE_COMPANIES:
            return update( state, {
                isFetching: { $set: false },
                items: { $set: action.companies }
            });
            
        case RECEIVE_COMPANY:
            comments = JSON.parse( sessionStorage.getItem( action.company.ticker )) || [];
            return update( state, {
                isFetching: { $set: false },
                items: { $merge: {[ action.company.ticker ]: { ...action.company, comments }}}
            });
            
        case ADD_COMMENT:
            comments = JSON.parse( sessionStorage.getItem( action.comment.ticker )) || [];
            comments.push({ name: action.comment.name, text: action.comment.text });
            sessionStorage.setItem( action.comment.ticker, JSON.stringify( comments ));
            return update( state, {
                items: {
                    [ action.comment.ticker ]: {
                        comments: {
                            $push: [{ name: action.comment.name, text: action.comment.text }]
                        }
                    }
                }
            });
            
        case RECEIVE_NEWS:
            return update( state, {
                isFetching: { $set: false },
                items: {
                    [ action.news.ticker ]: {
                        news: {
                            $set: action.news.data
                        }
                    }
                }
            });
            
        default:
            return state;
    }
}

export default companies;
