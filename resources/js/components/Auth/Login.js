import React from 'react';
import { connect } from 'react-redux';
import axios from '../../actions/request';
import {loginEndpoint} from '../../actions/endpoints';
import FormInput from '../FormInput/FormInput';
import {LOG_IN} from '../../constants/types';

const setAuthHelper = (auth) => ({
    type: LOG_IN,
    payload: auth
});

//history, location, match, staticContext, authentication, dispatch 

const login = ({...props}) => { 
    return (
    <div className="flex justify-end w-full my-9 clearfix">
        <form onSubmit={onLoginSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-auto my-24">  
            <h3>SignIn {props.authentication.isAuthenticated || 'Falsy'}</h3>     
            <span id="errorSpan" className="block sm:inline text-red-600 my-2"></span>

            <FormInput 
                label="Email"
                labelClass="block text-grey-darker text-sm font-bold mb-2" 
                name="email"
                placeholder="chloe@gmail.com" 
                type="email"
                classList="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                //value={inputs.name.value} 
                onChange={handleEmailChange}
                // error={inputs.name.hasError ? 'Email is required' : ''}
                // data-test="login-form.email-input"
            />

            <FormInput 
                label="Password"
                labelClass="block text-grey-darker text-sm font-bold mb-2" 
                name="password"
                placeholder="******" 
                type="password"
                classList="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
                //value={inputs.name.value} 
                onChange={handlePasswordChange}
                // error={inputs.name.hasError ? 'Email is required' : ''}
                // data-test="login-form.email-input"
            />
            
            <div className="flex items-center justify-between">
            <button type={"submit"} onClick={() => props.dispatch(setAuthHelper(true))} id="login-submit-button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black-700 rounded">
                Sign In
            </button>
            </div>
        </form>
    </div>
    );
}

const inputValidationState = {email: false, password: false};

const handleEmailChange = e => {
    const email = e.target.value;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = emailRegex.test(String(email).toLowerCase());

    if (!validEmail) {
        console.log('Email Invalid')
        inputValidationState['email']=false;
        removeElementClass('bg-blue-500 hover:bg-blue-700');
        toggleButton('bg-gray-500 hover:bg-gray-700', true);
        displayErrorMessage('email must match chloe@mail.com');
        return;
    }
    console.log('Email valid')
    inputValidationState['email']=true;
    if(checkInputValidationState()){
        removeElementClass('bg-gray-500 hover:bg-gray-700');
        toggleButton('bg-blue-500 hover:bg-blue-700', false);
        displayErrorMessage();
    }
    return;
}

const handlePasswordChange = e => {
    const password = e.target.value;
    var passwRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    const validatePassword = password.match(passwRegex);

    if(!validatePassword) { 
        console.log('Pasword Invalid')
        inputValidationState['password']=false;
        removeElementClass('bg-blue-500 hover:bg-blue-700');
        toggleButton('bg-gray-500 hover:bg-gray-700', true);
        displayErrorMessage('password must be 6 to 20 characters <br/>must contain at least one numeric digit <br/>one uppercase and one lowercase letter');
        return;
    }
    
    inputValidationState['password']=true;
    if(checkInputValidationState()){
        console.log('Password valid')
        removeElementClass('bg-gray-500 hover:bg-gray-700');
        toggleButton('bg-blue-500 hover:bg-blue-700', false);
        displayErrorMessage();
    }
    return;
}

const checkInputValidationState = () => {
    const isValid = Object.values(inputValidationState).filter(valid=> {
        if(valid) return true;
    });
    if(isValid.length === 2) {
        return true;
    }
    return false;
}

const toggleButton = (classes, disable = true) => {
    const btn = document.querySelector('#login-submit-button');
    classes.split(' ').map(css => btn.classList.add(css));
    btn.disabled = disable;
}

const elementContainsClass = (e, cssClass) => {
    return e.classList.contains(cssClass);
}

const removeElementClass = (classes) => {
    const btn = document.querySelector('#login-submit-button');
    classes.split(' ').map(css => {
        if(elementContainsClass(btn, css)) {
            btn.classList.remove(css);
        }
    });
}

const displayErrorMessage = (message = null) => {
    const errorSpan = document.querySelector('#errorSpan');
    errorSpan.innerHTML = message;
}

const onLoginSubmit = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = {email, password};

    axios.post(loginEndpoint, data)
        .then(response => {
            displayErrorMessage();
            console.log(response.response.access_token);
        })
        .catch(error => {
            console.log(error.response.data);
            const message = error.response.data.message;
            displayErrorMessage(message);
        });
};

const mapStateToProps = state => {
    return { authentication: state.authentication };
};

const Login = connect(mapStateToProps)(login);

export default Login;