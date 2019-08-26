
import {REMOVE_WALLET, GET_WALLETS} from '../constants/types';

const walletReducerDefaultState = [];

export default (state = walletReducerDefaultState, action) => {
    //console.log(state);
    //console.log(action);
    switch (action.type) {
        case GET_WALLETS:
            let newState = {...state};
            newState.wallets = action.payload;
            console.log(newState);
            return newState;
        case REMOVE_WALLET:
            return state;
        default:
            return state;
    }
};