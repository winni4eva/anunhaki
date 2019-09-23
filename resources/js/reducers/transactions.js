
import {SAVE_TRANSACTIONS} from '../constants/types';

const txReducerDefaultState = [];

export default (state = txReducerDefaultState, action) => {
    switch (action.type) {
        case SAVE_TRANSACTIONS:
            let newState = {...state};
            newState.tx = action.payload;
            return newState;
        default:
            return state;
    }
};