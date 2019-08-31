import React from 'react';
import { connect } from 'react-redux';
//import FormInput from '../FormInput/FormInput';
import {postLogin} from '../../actions/auth'
import {loginSchemaValidator} from '../../utils/validation';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const login = ({...props}) => { 
    return (
        <div className="flex justify-end w-full my-9 clearfix">
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginSchemaValidator}
                onSubmit={(values, actions) => {
                    postLogin(values, actions, props);
                }}
              >
                {({ touched, errors, isSubmitting }) => (
                  <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-auto my-24">
                    <h3>SignIn {props.authentication.isAuthenticated || 'Falsy'}</h3> 
                    {
                        errors.message 
                            ?   <span className="text-red-500 text-xs italic">{errors.message}</span>
                            : null
                    }
                    <div className="mb-4 my-6">
                      <label htmlFor="email" className="block text-grey-darker text-sm font-bold mb-2">Email</label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="adam@winni.com"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:shadow-outline ${
                          touched.email && errors.email ? "border-red-500 focus:outline-none" : ""
                        }`}
                        autoFocus
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

                    <div className="flex items-center justify-between">
                        <button
                        type="submit"
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black-700 rounded"
                        disabled={isSubmitting}
                        >
                        {isSubmitting ? "Please wait..." : "Login"}
                        </button>
                    </div>    
                  </Form>
                )}
              </Formik>
        </div>
      );
}


const mapStateToProps = state => {
    return { authentication: state.authentication };
};

const Login = connect(mapStateToProps)(login);

export default Login;