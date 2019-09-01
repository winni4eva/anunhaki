import makeRequest from './request';
import {getWalletsEndpoint, getCountriesEndpoint} from './endpoints';
import {SAVE_COUNTRIES} from '../constants/types';

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

export const getCountries = async () => {
    try {
        const response = await makeRequest('GET', getCountriesEndpoint);
        const {data} = response;
        return data.countries;
    } catch (error) {
        console.log(error);
        return false;
    }
}