import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {postTwoFactor} from '../../actions/auth'
import {twoFactorAuthValidator} from '../../utils/validation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
//import { ACCESS_TOKEN, LOG_IN } from '../../constants/types';



const twoFactor = ({...props}) => { 
    const {authentication, history, dispatch} = props;

    // const setAuthHelper = (auth) => ({
    //     type: LOG_IN,
    //     payload: auth
    // });

    return (
        <div className="flex justify-end w-full my-9 clearfix">
              <Formik
                initialValues={{ token: '' }}
                validationSchema={twoFactorAuthValidator}
                onSubmit={(values, actions) => {
                    console.log(values);
                    postTwoFactor(values, actions, props);
                }}
              >
                {({ touched, errors, isSubmitting }) => (
                  <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-auto my-24">
                    <h3>Two Factor Authentication</h3> 
                    {
                        errors.message 
                            ? <span className="text-red-500 text-xs italic">{errors.message}</span>
                            : null
                    }
                    <div className="mb-4 my-6">
                      <label htmlFor="token" className="block text-grey-darker text-sm font-bold mb-2">Token</label>
                      <Field
                        type="text"
                        name="token"
                        placeholder="Enter Token"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:shadow-outline ${
                          touched.token && errors.token ? "border-red-500 focus:outline-none" : ""
                        }`}
                        autoFocus
                      />
                      <ErrorMessage
                        component="p"
                        name="token"
                        className="text-red-500 text-xs italic"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                        type="submit"
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black-700 rounded"
                        disabled={isSubmitting}
                        >
                        {isSubmitting ? "Please wait..." : "Verify"}
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

const TwoFactor = connect(mapStateToProps)(twoFactor);

export default withRouter(TwoFactor);