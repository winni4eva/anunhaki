import makeRequest from './request';
import {postCreateWalletEndpoint} from './endpoints';
import {SAVE_COUNTRIES, SAVE_CURRENCIES} from '../constants/types';




export const postCreateWallet = (data, dispatch) => {
    makeRequest('POST', postCreateWalletEndpoint, JSON.stringify(data))
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error)
        })
};