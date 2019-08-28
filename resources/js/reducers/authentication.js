
import {LOG_IN, LOG_OUT} from '../constants/types';

const authenticationReducerDefaultState = {
    isAuthenticated: false
};

export default (state = authenticationReducerDefaultState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                isAuthenticated: true
            };
        case LOG_OUT:
            return {
                ...state,
                isAuthenticated: false
            };
        default:
            return state;
    }
};