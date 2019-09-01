import makeRequest from './request';
import {loginEndpoint, logoutEndpoint, registerEnpoint} from './endpoints';
import {LOG_IN, ACCESS_TOKEN} from '../constants/types';

const setAuthHelper = (auth) => ({
    type: LOG_IN,
    payload: auth
});

export const getLogout = async () => {
    try {
        const response = await makeRequest('GET', logoutEndpoint);
        const {data} = response;
        return data.message;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const postLogin = async (postData) => {
    //const {dispatch} = props;
    //const {setSubmitting, setErrors} = actions;
    try {
        const response = await makeRequest('POST', loginEndpoint, postData);
        const {data} = response;
        return data.access_token;
    } catch (error) {
        console.log(error);
        return false;
    }

        // .then(response => {
        //     localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
        //     dispatch(setAuthHelper(true));
        //     setSubmitting(false);
        //     setErrors({message: ''});
        //     //history.push('/wallets');
        //     //window.location.reload(true);
        // })
        // .catch(error => {
        //     const message = error.response.data.message;
        //     localStorage.setItem(ACCESS_TOKEN, null);
        //     dispatch(setAuthHelper(false));
        //     setSubmitting(false);
        //     setErrors({message});
        // });
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