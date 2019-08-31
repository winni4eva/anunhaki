import * as Yup from 'yup';

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;

export const loginSchemaValidator = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string()
    .required('Password is required') 
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .max(15, 'Password is too long - should be 15 chars maximum')
    .matches(passwordRegex, 'Password must contain an uppercase letter, lowercase letter and a number')
});