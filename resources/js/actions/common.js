import makeRequest from './request';
import {getWalletsEndpoint, getCountriesEndpoint} from './endpoints';
import {SAVE_COUNTRIES} from '../constants/types';

const saveCountriesHelper = (countries) => ({
    type: SAVE_COUNTRIES,
    payload: countries
});

// export const getWallets = () => {
//     return (dispatch, getState) => {
//         //const {authentication} = getState();
//         //if(authentication.isAuthenticated){
//             //const access_token = localStorage.getItem(ACCESS_TOKEN);
//             //const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};

//         axios.get(getWalletsEndpoint)
//             .then(response => {
//                 console.log(response);
//                 const wallets = response.data.wallets;
//                 dispatch(addWalletsHelper(wallets));
//             })
//             .catch(error => {
//                 console.log(error.response);
//             });
//         //}
//     }
// };

export const getCountries = (store) => {
        //const {authentication} = store.getState();
        //if(authentication.isAuthenticated){
            //const access_token = localStorage.getItem(ACCESS_TOKEN);
            //const headers = {Accept: "application/json", Authorization: `Bearer ${access_token}`};
        makeRequest('GET', getCountriesEndpoint)
            .then(response => {
                console.log(response);
                const countries = response.data.countries;
                store.dispatch(saveCountriesHelper(countries));
            })
            .catch(error => {
                console.log(error.response);
            });
}