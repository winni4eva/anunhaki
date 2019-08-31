import axios from 'axios';
import {ACCESS_TOKEN} from '../constants/types';

const access_token = localStorage.getItem(ACCESS_TOKEN);

const request = axios.create({
    baseURL: window.Laravel.base_url,
    timeout: 8000,
    headers: {
        'X-CSRF-TOKEN': window.Laravel.csrfToken, 
        'X-Requested-With': 'XMLHttpRequest', 
        Accept: 'application/json', 
        Authorization: `Bearer ${access_token}`
    }
});

export default (method, endpoint, data = null) => {
    return request({
        method,
        url: endpoint,
        data
    })
};