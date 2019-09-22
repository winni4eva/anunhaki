import React from 'react';
import { connect } from 'react-redux';
import {postRegister} from '../../actions/auth'
import {registerSchemaValidator} from '../../utils/validation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

const register = ({...props}) => { 
    const {countries} = props;

    return (
        <div className="justify-end m-auto w-1/2 my-9 clearfix">
        
              <Formik
                initialValues={{ first_name: '', last_name: '', email: '', password: '' , phone_number: '', phone_country: ''}}
                validationSchema={registerSchemaValidator}
                onSubmit={(values, actions) => {
                    const phoneNumber = parsePhoneNumberFromString(values.phone_number, values.phone_country);
                    values['phone_number'] = phoneNumber.formatInternational();
                    postRegister(values, actions, props);
                }}
              >
                {({ touched, errors, isSubmitting, values, handleChange, handleBlur }) => (
                  <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-auto my-24">
                    <h3>Register</h3>
                    {
                        errors.message 
                            ?   <span className="text-red-500 text-xs italic">{errors.message}</span>
                            : null
                    }

                    <div className="mb-4 my-6">
                      <label htmlFor="first_name" className="block text-grey-darker text-sm font-bold mb-2">First Name</label>
                      <Field
                        type="text"
                        name="first_name"
                        placeholder="adam"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:shadow-outline ${
                          touched.first_name && errors.first_name ? "border-red-500 focus:outline-none" : ""
                        }`}
                        autoFocus
                      />
                      <ErrorMessage
                        component="p"
                        name="first_name"
                        className="text-red-500 text-xs italic"
                      />
                    </div>

                    <div className="mb-4 my-6">
                      <label htmlFor="last_name" className="block text-grey-darker text-sm font-bold mb-2">Last Name</label>
                      <Field
                        type="text"
                        name="last_name"
                        placeholder="winni"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:shadow-outline ${
                          touched.last_name && errors.last_name ? "border-red-500 focus:outline-none" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="p"
                        name="last_name"
                        className="text-red-500 text-xs italic"
                      />
                    </div>

                    <div className="mb-4 my-6">
                      <label htmlFor="email" className="block text-grey-darker text-sm font-bold mb-2">Email</label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="adam@winni.com"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:shadow-outline ${
                          touched.email && errors.email ? "border-red-500 focus:outline-none" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="p"
                        name="email"
                        className="text-red-500 text-xs italic"
                      />
                    </div>
  
                    <div className="mb-4 my-6">
                      <label htmlFor="password" className="block text-grey-darker text-sm font-bold mb-2">Password</label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:shadow-outline ${
                          touched.password && errors.password ? "is-invalid" : ""
                        }`}
                      />
                      <ErrorMessage
                        component="span"
                        name="password"
                        className="text-red-500 text-xs italic"
                      />
                    </div>

                    <div className="mb-4 my-6">
                        <label htmlFor="phone_number" className="block text-grey-darker text-sm font-bold mb-2">Phone Number</label>
                        <select
                            name="phone_country"
                            value={values.phone_country}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`shadow appearance-none border rounded w-3/12 py-2 px-3 mr-2 text-grey-darker leading-tight focus:shadow-outline ${
                                touched.phone_country && errors.phone_country ? "is-invalid" : ""
                              }`}
                            >
                              <option value=''>- select country -</option>
                            {Array.isArray(countries.countries) ?
                              countries.countries.map(country => <option key={country.iso} value={country.iso}>{country.nicename}</option>)
                              : null
                            }
                        </select>
                        <ErrorMessage
                            component="span"
                            name="phone_country"
                            className="text-red-500 text-xs italic"
                        />
                        {errors.phone_country &&
                            touched.phone_country &&
                            <div className="input-feedback">
                            {errors.phone_country}
                            </div>}

                        <Field
                            type="text"
                            name="phone_number"
                            placeholder="0243 344 556"
                            className={`shadow appearance-none border rounded w-6/12 py-2 px-3 text-grey-darker leading-tight focus:shadow-outline ${
                            touched.phone_number && errors.phone_number ? "border-red-500 focus:outline-none" : ""
                            }`}
                            id="phone_number"
                        />
                        <ErrorMessage
                            component="p"
                            name="phone_number"
                            className="text-red-500 text-xs italic"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                        type="submit"
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black-700 rounded"
                        disabled={isSubmitting}
                        >
                        {isSubmitting ? "Please wait..." : "Register"}
                        </button>
                    </div>    
                  </Form>
                )}
              </Formik>
        </div>
      );
}


const mapStateToProps = state => {
    return { 
        authentication: state.authentication,
        countries: state.countries 
    };
};

const Register = connect(mapStateToProps)(register);

export default Register;