import * as Yup from 'yup';
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js';

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
const emailValidationRule = Yup.string().email('Email is invalid').required('Email is required');
const passwordValidationRule = Yup.string()
  .min(6, 'Password is too short - should be 6 chars minimum.')
  .max(15, 'Password is too long - should be 15 chars maximum')
  .matches(passwordRegex, 'Password must contain an uppercase letter, lowercase letter and a number');

export const loginSchemaValidator = Yup.object().shape({
  email: emailValidationRule,
  password: passwordValidationRule.required('Password is required') ,
});

export const registerSchemaValidator = Yup.object().shape({ 
  first_name: Yup.string().min(3).required('First name is required'), 
  last_name: Yup.string().min(3).required('Last name is required'), 
  email: emailValidationRule, 
  password: passwordValidationRule.required('Password is required'), 
  //password_confirmation: passwordValidationRule.required('Password confirmation is required'), 
  phone_country: Yup.string().required('Phone country is required'),
  phone_number: Yup.string().test('validate-phone-number', 'Invalid phone number', function(value) {
    const { path, createError, options } = this;
    const selectedCountry = options.parent.phone_country;
    if(value && selectedCountry) {
      const phoneNumber = parsePhoneNumberFromString(value, selectedCountry);

      if(!phoneNumber.isValid()) {
        return false;
        //createError({ path, message: 'Phone number is not valid' });
      } else if (phoneNumber.country !== selectedCountry) {
        return false;
      } else {
        const phoneInput = document.querySelector('#phone_number');
        phoneInput.value = phoneNumber.formatInternational();
        return true;
      }
    }
    return false;
  }).required('Phone is required'),
});

export const isValidString = value => Yup.string(value).required()