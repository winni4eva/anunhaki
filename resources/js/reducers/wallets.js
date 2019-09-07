
import {REMOVE_WALLET, GET_WALLETS} from '../constants/types';

const walletReducerDefaultState = [];

export default (state = walletReducerDefaultState, action) => {
    switch (action.type) {
        case GET_WALLETS:
            let newState = {...state};
            newState.wallets = action.payload;
            return newState;
        case REMOVE_WALLET:
            return state;
        default:
            return state;
    }
};