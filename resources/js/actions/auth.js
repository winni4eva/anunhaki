import makeRequest from './request';
import {loginEndpoint, logoutEndpoint, registerEnpoint} from './endpoints';
import {LOG_IN, ACCESS_TOKEN} from '../constants/types';
import history from './history';

const setAuthHelper = (auth) => ({
    type: LOG_IN,
    payload: auth
});

export const getLogout = (props) => {
    const {dispatch} = props;
    //const {setSubmitting, setErrors} = actions;
    makeRequest('GET', logoutEndpoint)
        .then(response => {
            console.log("I was logged out");
            console.log(response)
            localStorage.setItem(ACCESS_TOKEN, '');
            dispatch(setAuthHelper(false));
            //setSubmitting(false);
            //setErrors({message: ''});
        })
        .catch(error => {
            console.log('Failed logging me out')
            console.log(error)
            const message = error.response.data.message;
            //dispatch(setAuthHelper(false));
            //setSubmitting(false);
            //setErrors({message});
        });
};

export const postLogin = (data, actions, props) => {
    const {dispatch} = props;
    const {setSubmitting, setErrors} = actions;
    makeRequest('POST', loginEndpoint, data)
        .then(response => {
            localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
            dispatch(setAuthHelper(true));
            setSubmitting(false);
            setErrors({message: ''});
            //history.push('/wallets');
            //window.location.reload(true);
        })
        .catch(error => {
            const message = error.response.data.message;
            localStorage.setItem(ACCESS_TOKEN, null);
            dispatch(setAuthHelper(false));
            setSubmitting(false);
            setErrors({message});
        });
};

export const postRegister = (data, actions, props) => {
    const {dispatch} = props;
    const {setSubmitting, setErrors} = actions;
    makeRequest('POST', registerEnpoint, data)
        .then(response => {
            //localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
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