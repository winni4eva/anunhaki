import makeRequest from './request';
import {loginEndpoint, logoutEndpoint, registerEnpoint, twoFactorPostEndpoint, twoFactorGetEndpoint} from './endpoints';
import {LOG_IN, ACCESS_TOKEN, JWT_TOKEN} from '../constants/types';
import { toast } from 'react-toastify';

const setJwtHelper = (token) => ({
    type: JWT_TOKEN,
    payload: token
});

const setAuthHelper = (auth) => ({
    type: LOG_IN,
    payload: auth
});

export const getLogout = async () => {
    try {
        const {data} = await makeRequest('GET', logoutEndpoint);
        return data.message;
    } catch (error) {
        console.error(error.response);
        //handleErrorNotification(error);
        return false;
    }
};

export const postLogin = (postData, actions, props) => {
    const {dispatch, history} = props;
    const {setSubmitting, setErrors} = actions;

    makeRequest('POST', loginEndpoint, postData)
        .then(response => {
            const {data} = response;
            const {access_token} = data;
            localStorage.setItem(ACCESS_TOKEN, access_token);
            dispatch(setJwtHelper(access_token));
            dispatch(setAuthHelper(true));
            setSubmitting(false);
            setErrors({message: ''});
            history.push('/two-factor-auth');  
        })
        .catch(error => {
            setSubmitting(false);
            handleErrorNotification(error);
        })
};

export const postTwoFactor = (postData, actions, props) => {
    const {dispatch, history} = props;
    const {setSubmitting, setErrors} = actions;

    makeRequest('POST', twoFactorPostEndpoint, postData)
        .then(response => {
            setSubmitting(false);
            setErrors({message: ''});
            history.push('/wallets'); 
        })
        .catch(error => {
            setSubmitting(false);
            handleErrorNotification(error);
        })
};

export const getTwoFactor = (option = 'email') => {
    makeRequest('GET', twoFactorGetEndpoint+`?option_2fa=${option}`)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            handleErrorNotification(error);
        })
};

export const postRegister = (data, actions, props) => {
    const {dispatch, history} = props;
    const {setSubmitting, setErrors} = actions;
    makeRequest('POST', registerEnpoint, data)
        .then(response => {
            //localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
            dispatch(setAuthHelper(true));
            setSubmitting(false);
            setErrors({message: ''});
            history.push('/login'); 
        })
        .catch(error => {
            const message = error.response.data.message;
            localStorage.setItem(ACCESS_TOKEN, null);
            dispatch(setAuthHelper(false));
            setSubmitting(false);
            setErrors({message});
            handleErrorNotification(error);
        });
};

const handleErrorNotification = (error) => {
    const { response: { data: { message } = {} } = {} } = error;
    const { response: { data: { errors } = {} } = {} } = error;
    
    if(errors) {
        const err = errors[Object.keys(errors)[0]];
        if(err && Array.isArray(err)) {
            toast.error(err[0]);
            return;
        }
    }else if(message){
        toast.error(message);
        return;
    } else{
        toast.error('Something unusual happened');
    }
}

// const execute = (promise) => {
//     return promise.then(result => [null, result])
//                   .catch(error => [error]);
// }

// export const getLogout = async () => {
//     const [error, result] = await execute(makeRequest('GET', logoutEndpoint));
//     if(error) {
//         console.error(error);
//         return false;
//     }
//     const {data} = result;
//     return data.message;
// };

// export const getLogout = async () => {
//     try {
//         const {data} = await makeRequest('GET', logoutEndpoint);
//         return data.message;
//     } catch (error) {
//         console.error(error.response);
//         return false;
//     }
// };

// export const postLogin = async (postData) => {
//     try {
//         const {data} = await makeRequest('POST', loginEndpoint, postData);
//         return data.access_token;
//     } catch (error) {
//         console.error(error);
//         return false;
//     }
// };