import {isValidEmail, isValidPassword} from './validation';

export const handleEmailChange = e => {
    const email = e.target.value;

    if (!isValidEmail(email)) {
        e.setAttribute('data-input-valid', false);
        removeElementClass('bg-blue-500 hover:bg-blue-700');
        toggleButton('bg-gray-500 hover:bg-gray-700', true);
        displayErrorMessage('email must match chloe@mail.com');
        return;
    }

    displayErrorMessage();
    e.setAttribute('data-input-valid', true);
    if(checkInputValidationState()){
        removeElementClass('bg-gray-500 hover:bg-gray-700');
        toggleButton('bg-blue-500 hover:bg-blue-700', false);
    }
    return;
}

export const handlePasswordChange = e => {
    const password = e.target.value;

    if(!isValidPassword(password)) { 
        e.setAttribute('data-input-valid', false);
        removeElementClass('bg-blue-500 hover:bg-blue-700');
        toggleButton('bg-gray-500 hover:bg-gray-700', true);
        displayErrorMessage('password must be 6 to 20 characters <br/>must contain at least one numeric digit <br/>one uppercase and one lowercase letter');
        return;
    }

    e.setAttribute('data-input-valid', true);
    displayErrorMessage();
    if(checkInputValidationState()) {
        removeElementClass('bg-gray-500 hover:bg-gray-700');
        toggleButton('bg-blue-500 hover:bg-blue-700', false);
    }
    return;
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