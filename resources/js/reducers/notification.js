
import {SAVE_NOTIFICATION, REMOVE_NOTIFICATION} from '../constants/types';

const notificationsReducerDefaultState = [];

export default (state = notificationsReducerDefaultState, action) => {
    switch (action.type) {
        case SAVE_NOTIFICATION:
            let newState = {...state};
            newState.notification = action.payload;
            return newState;
        case REMOVE_NOTIFICATION:
            let removeState = {...state};
            removeState.notification = action.payload;
            return removeState;
        default:
            return state;
    }
};