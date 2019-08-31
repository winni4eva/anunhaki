
import {SAVE_COUNTRIES} from '../constants/types';

const countriesReducerDefaultState = [];

export default (state = countriesReducerDefaultState, action) => {
    switch (action.type) {
        case SAVE_COUNTRIES:
            let newState = {...state};
            newState.countries = action.payload;
            return newState;
        default:
            return state;
    }
};