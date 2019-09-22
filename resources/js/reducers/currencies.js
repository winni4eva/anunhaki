
import {SAVE_CURRENCIES} from '../constants/types';

const currenciesReducerDefaultState = [];

export default (state = currenciesReducerDefaultState, action) => {
    switch (action.type) {
        case SAVE_CURRENCIES:
            let newState = {...state};
            newState.currencies = action.payload;
            return newState;
        default:
            return state;
    }
};