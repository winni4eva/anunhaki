
import {REMOVE_WALLET, GET_WALLETS} from '../constants/types';

const walletReducerDefaultState = [];

export default (state = walletReducerDefaultState, action) => {
    console.log(state);
    console.log(action);
    switch (action.type) {
        case GET_WALLETS:
            return [
                ...state,
                action.payload
            ];
        case REMOVE_WALLET:
            return state;
        default:
            return state;
    }
};