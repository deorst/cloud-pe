import { combineReducers } from "redux";

import securities from './securities';
import companies from './companies';

const rootReducer = combineReducers({
    securities,
    companies
});

export default rootReducer;
