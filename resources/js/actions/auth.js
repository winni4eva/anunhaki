import makeRequest from './request';
import {loginEndpoint} from './endpoints';
import {LOG_IN, ACCESS_TOKEN} from '../constants/types';

const setAuthHelper = (auth) => ({
    type: LOG_IN,
    payload: auth
});

export const postLogin = (data, actions, props) => {
    const {dispatch} = props;
    const {setSubmitting, setErrors} = actions;
    makeRequest('POST', loginEndpoint, data)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
            dispatch(setAuthHelper(true));
            setSubmitting(false);
            setErrors({message: ''});
        })
        .catch(error => {
            const message = error.response.data.message;
            localStorage.setItem(ACCESS_TOKEN, null);
            dispatch(setAuthHelper(false));
            setSubmitting(false);
            setErrors({message});
        });
};