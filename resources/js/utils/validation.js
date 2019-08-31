import * as Yup from 'yup';

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
  password_confirmation: passwordValidationRule.required('Password confirmation is required'), 
  phone_number: '',
});