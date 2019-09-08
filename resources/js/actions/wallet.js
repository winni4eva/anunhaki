import makeRequest from './request';
import {walletsEndpoint} from './endpoints';
import {SAVE_NOTIFICATION, REMOVE_NOTIFICATION, SAVE_WALLETS} from '../constants/types';

const saveNotificationHelper = (notice) => ({
    type: SAVE_NOTIFICATION,
    payload: notice
});

const saveWalletsHelper = (wallets) => ({
    type: SAVE_WALLETS,
    payload: wallets
});

export const getWallets = (dispatch) => {
    makeRequest('GET', walletsEndpoint)
        .then(response => {
            const {data: {wallets} = {} } = response;
            dispatch(saveWalletsHelper(wallets));
        })
        .catch(error => {
            const { response: { data: { message } = {} } = {} } = error;
            const { response: { data: { errors } = {} } = {} } = error;
            dispatch(saveNotificationHelper({message,errors}));
        })
};

export const postCreateWallet = (data, dispatch) => {
    makeRequest('POST', walletsEndpoint, data)
        .then(response => {
            console.log(response);
            dispatch(saveNotificationHelper(''));
        })
        .catch(error => {
            const { response: { data: { message } = {} } = {} } = error;
            const { response: { data: { errors } = {} } = {} } = error;
            dispatch(saveNotificationHelper({message,errors}));
        })
};