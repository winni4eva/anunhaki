import makeRequest from './request';
import {walletsEndpoint, walletAddressEndpoint} from './endpoints';
import {SAVE_WALLETS,SAVE_TRANSACTIONS} from '../constants/types';
import { toast } from 'react-toastify';


const saveWalletsHelper = (wallets) => ({
    type: SAVE_WALLETS,
    payload: wallets
});

const saveTransactionsHelper = (tx) => ({
    type: SAVE_TRANSACTIONS,
    payload: tx
});

export const getWallets = (dispatch) => {
    makeRequest('GET', walletsEndpoint)
        .then(response => {
            const {data: {wallets} = {} } = response;
            dispatch(saveWalletsHelper(wallets));
            toast.success('Wallets fetched successfully');
        })
        .catch(error => {
            handleErrorNotification(error);
        })
};

export const removeWallet = (walletId, coin, dispatch) => {
    makeRequest('DELETE', `${walletsEndpoint}/${walletId}?coin=${coin}`)
        .then(response => {
            toast.success('Wallet removed successfully');
        })
        .catch(error => {
            handleErrorNotification(error);
        })
};

export const postCreateWallet = (data, dispatch) => {
    makeRequest('POST', walletsEndpoint, data)
        .then(response => {
            getWallets(dispatch);
            toast.success('Wallet created successfully');
        })
        .catch(error => {
            handleErrorNotification(error);
        })
};

export const postCreateWalletAddress = (data, dispatch) => {
    const postData = {walletId: data.coinId, coin: data.coinIdentifier};
    makeRequest('POST', `${walletAddressEndpoint}${data.coinId}/address?coin=${data.coinIdentifier}`, postData)
        .then(response => {
            getWallets(dispatch);
            toast.success('Wallet address added successfully');
        })
        .catch(error => {
            handleErrorNotification(error);
        })
};

export const postSendWalletFunds = (data, dispatch) => {
    makeRequest('POST', `${walletAddressEndpoint}${data.walletId}/fund`, data)
        .then(response => {
            getWallets(dispatch);
            toast.success('Coins sent successfully');
        })
        .catch(error => {
            handleErrorNotification(error);
        })
};

export const getWalletTransactions = (walletId, coin,dispatch) => {
    makeRequest('GET', `${walletsEndpoint}/${walletId}/transactions?coin=${coin}`)
        .then(response => {
            const {data: {transactions} = {} } = response;
            dispatch(saveTransactionsHelper(transactions));
            toast.success('Wallet transactions fetched successfully');
        })
        .catch(error => {
            handleErrorNotification(error);
        })
};

const handleErrorNotification = (error) => {
    const { response: { data: { message } = {} } = {} } = error;
    const { response: { data: { errors } = {} } = {} } = error;
    
    if(errors) {
        const err = errors[Object.keys(errors)[0]];
        if(err && Array.isArray(err)) {
            toast.error(err[0]);
            return;
        }
    }else if(message){
        toast.error(message);
        return;
    } else{
        toast.error('Something unusual happened');
    }
}