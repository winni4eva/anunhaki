import makeRequest from './request';
import {postCreateWalletEndpoint} from './endpoints';
import {SAVE_NOTIFICATION, REMOVE_NOTIFICATION} from '../constants/types';

const saveNotificationHelper = (notice) => ({
    type: SAVE_NOTIFICATION,
    payload: notice
});


export const postCreateWallet = (data, dispatch) => {
    makeRequest('POST', postCreateWalletEndpoint, data)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            const { response: { data: { message } = {} } = {} } = error;
            const { response: { data: { errors } = {} } = {} } = error;
            dispatch(saveNotificationHelper({message,errors}));
        })
};