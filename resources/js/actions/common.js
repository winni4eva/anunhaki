import makeRequest from './request';
import {getCountriesEndpoint, getCurrenciesEndpoint} from './endpoints';
import {SAVE_COUNTRIES, SAVE_CURRENCIES} from '../constants/types';

const saveCountriesHelper = (countries) => ({
    type: SAVE_COUNTRIES,
    payload: countries
});

const saveCurrenciesHelper = (currencies) => ({
    type: SAVE_CURRENCIES,
    payload: currencies
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
        makeRequest('GET', getCountriesEndpoint)
            .then(response => {
                const countries = response.data.countries;
                store.dispatch(saveCountriesHelper(countries));
            })
            .catch(error => {
                console.log(error.response);
            });
}

export const getCurrencies = (dispatch) => {
    makeRequest('GET', getCurrenciesEndpoint)
        .then(response => {
            const currencies = response.data.currencies;
            dispatch(saveCurrenciesHelper(currencies));
        })
        .catch(error => {
            console.log(error.response);
        });
}