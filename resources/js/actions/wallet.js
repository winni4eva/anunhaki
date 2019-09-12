import makeRequest from './request';
import {walletsEndpoint, walletAddressEndpoint} from './endpoints';
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

export const removeWallet = (walletId, coin, dispatch) => {
    makeRequest('DELETE', `${walletsEndpoint}/${walletId}?coin=${coin}`)
        .then(response => {
            console.log(response);
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
            getWallets(dispatch);
            dispatch(saveNotificationHelper(''));
        })
        .catch(error => {
            const { response: { data: { message } = {} } = {} } = error;
            const { response: { data: { errors } = {} } = {} } = error;
            dispatch(saveNotificationHelper({message,errors}));
        })
};

export const postCreateWalletAddress = (data, dispatch) => {
    makeRequest('POST', `${walletAddressEndpoint}${data.walletId}/address?coin=${data.coin}`, data)
        .then(response => {
            getWallets(dispatch);
        })
        .catch(error => {
            const { response: { data: { message } = {} } = {} } = error;
            const { response: { data: { errors } = {} } = {} } = error;
            dispatch(saveNotificationHelper({message,errors}));
        })
};

export const postSendWalletFunds = (data, dispatch) => {
    makeRequest('POST', `${walletAddressEndpoint}${data.walletId}/fund`, data)
        .then(response => {
            console.log(response)
            //getWallets(dispatch);
        })
        .catch(error => {
            const { response: { data: { message } = {} } = {} } = error;
            const { response: { data: { errors } = {} } = {} } = error;
            dispatch(saveNotificationHelper({message,errors}));
        })
};

export const getWalletTransactions = (walletId, dispatch) => {
    makeRequest('GET', `${walletAddressEndpoint}${walletId}/fund?wid=${walletId}`)
        .then(response => {
            console.log(response)
            //const {data: {wallets} = {} } = response;
            //dispatch(saveWalletsHelper(wallets));
        })
        .catch(error => {
            const { response: { data: { message } = {} } = {} } = error;
            const { response: { data: { errors } = {} } = {} } = error;
            dispatch(saveNotificationHelper({message,errors}));
        })
};