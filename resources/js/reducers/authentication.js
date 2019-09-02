
import {LOG_IN, JWT_TOKEN, SEND_TOKEN_VIA} from '../constants/types';

const authenticationReducerDefaultState = {
    isAuthenticated: false,
    jwtToken: '',
    sendTokenVia: 'email',
};

export default (state = authenticationReducerDefaultState, action) => {
    switch (action.type) {
        case LOG_IN:
            let newLoginState = {...state};
            newLoginState.isAuthenticated = action.payload;
            return newLoginState;
        case JWT_TOKEN:
            let newJwtState = {...state};
            newJwtState.jwtToken = action.payload;
            return newJwtState;
        case SEND_TOKEN_VIA:
                let newViaState = {...state};
                newViaState.sendTokenVia = action.payload;
                return newViaState;
        default:
            return state;
    }
};