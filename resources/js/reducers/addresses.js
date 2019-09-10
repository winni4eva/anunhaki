
import {SAVE_ADDRESSES} from '../constants/types';

const addressesReducerDefaultState = [];

export default (state = addressesReducerDefaultState, action) => {
    switch (action.type) {
        case SAVE_ADDRESSES:
            let newState = {...state};
            newState.addresses = action.payload;
            return newState;
        default:
            return state;
    }
};