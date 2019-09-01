
import {LOG_IN, LOG_OUT} from '../constants/types';

const authenticationReducerDefaultState = {
    isAuthenticated: false
};

export default (state = authenticationReducerDefaultState, action) => {
    switch (action.type) {
        case LOG_IN:
            let newState = {...state};
            newState.isAuthenticated = action.payload;
            return newState;
        default:
            return state;
    }
};