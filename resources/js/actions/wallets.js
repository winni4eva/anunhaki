import axios from './request';
import {getWalletsEndpoint} from './endpoints';
import {GET_WALLETS} from '../constants/types';

const addWalletsHelper = (wallets) => ({
    type: GET_WALLETS,
    payload: wallets
});

export const getWallets = () => {
    console.log("Made It Here");
    return (dispatch, getState) => {
        //const {authentication} = getState();
        //if(authentication.isAuthenticated){
            //const access_token = localStorage.getItem(ACCESS_TOKEN);
            //const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};

        axios.get(getWalletsEndpoint)
            .then(response => {
                console.log(response);
                const wallets = response.data.wallets;
                dispatch(addWalletsHelper(wallets));
            })
            .catch(error => {
                console.log(error.response);
            });
        //}
    }
};