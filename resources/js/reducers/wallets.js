
import {REMOVE_WALLET, SAVE_WALLETS} from '../constants/types';

const walletReducerDefaultState = [];

export default (state = walletReducerDefaultState, action) => {
    switch (action.type) {
        case SAVE_WALLETS:
            let newState = {...state};
            newState.wallets = action.payload;
            return newState;
        case REMOVE_WALLET:
            return state;
        default:
            return state;
    }
};