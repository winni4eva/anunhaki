import makeRequest from './request';
import {walletsEndpoint} from './endpoints';
import {SAVE_NOTIFICATION, REMOVE_NOTIFICATION} from '../constants/types';

const saveNotificationHelper = (notice) => ({
    type: SAVE_NOTIFICATION,
    payload: notice
});

export const getWallets = (dispatch) => {
    makeRequest('GET', walletsEndpoint)
        .then(response => {
            console.log(response);
            //dispatch(saveNotificationHelper(''));
        })
        .catch(error => {
            console.log(error)
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