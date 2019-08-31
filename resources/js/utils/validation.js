import * as Yup from 'yup';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;




// export const loginFormValidation = values => {
//     let errors = {};
//     if (values.email === '') {
//       errors.email = 'Email is required';
//     } else if(!isValidEmail(values.email)){
//         errors.email = 'Email field is invalid'
//     }

//     if (values.password === '') {
//       errors.password = "Password is required";
//     } else if (!isValidPassword(values.password)) {
//       errors.password = `
//           password must be 6 to 20 characters <br/>must contain at least one numeric digit <br/>one uppercase and one lowercase letter
//       `;
//     }
//     return errors;
// }
export const loginSchemaValidator = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required') 
    .min(6, 'Password is too short - should be 6 chars minimum.')
    .max(15, 'Password is too long - should be 15 chars maximum')
    .matches(passwordRegex, 'Password can only contain Latin letters.')
});