import axios from 'axios';
import {ACCESS_TOKEN, LOG_IN} from '../constants/types';
import history from './history';
import configureStore from '../store/configureStore';

const store = configureStore();
const setAuthHelper = (auth) => ({
    type: LOG_IN,
    payload: auth
});

const access_token = localStorage.getItem(ACCESS_TOKEN);

const request = axios.create({
    baseURL: window.Laravel.base_url,
    timeout: 8000,
    headers: {
        'X-CSRF-TOKEN': window.Laravel.csrfToken, 
        'X-Requested-With': 'XMLHttpRequest', 
        Accept: 'application/json', 
        Authorization: `Bearer ${access_token}`
    },
    params: {}
});

request.interceptors.request.use(function (config) {
    // Start request loader
    return config;
}, function (error) {
    return Promise.reject(error)
})

request.interceptors.response.use(function (config) {
    // Stop request loader
     return config;
 }, function (error) {
     // Stop request loader
     if (error.response.status === 401) {
        console.log("send me to login")
        //localStorage.setItem(ACCESS_TOKEN, '');
        //store.dispatch(setAuthHelper(false));
        history.push('/login');
      }
     return Promise.reject(error)
 })

export default (method, endpoint, data = null) => {
    return request({
        method,
        url: endpoint,
        data
    })
};