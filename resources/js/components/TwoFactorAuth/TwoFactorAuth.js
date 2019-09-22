import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {postTwoFactor,getTwoFactor} from '../../actions/auth'
import {twoFactorAuthValidator} from '../../utils/validation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SEND_TOKEN_VIA } from '../../constants/types';
import Aux from '../../hoc/Aux'

const sendToken = (via = 'email') => {
    console.log('Send Token Via '+ via);
    getTwoFactor(via);
}

const twoFactor = ({...props}) => { 
    const {authentication, history, dispatch} = props;
    sendToken();

    const setAuthHelper = (via) => ({
        type: SEND_TOKEN_VIA,
        payload: via
    });

    const handleViaChange = (e) => {
        const sendMethod = e.target.value;
        dispatch(setAuthHelper(sendMethod));
    }

    return (
        <Aux>
            <div className="flex justify-end w-full clearfix">
                <Formik
                    initialValues={{ token: '' }}
                    validationSchema={twoFactorAuthValidator}
                    onSubmit={(values, actions) => {
                        postTwoFactor(values, actions, props);
                    }}
                >
                    {({ touched, errors, isSubmitting, values, handleBlur }) => (
                    <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-auto my-24">
                        <h3>Check your {authentication.sendTokenVia} for two factor token</h3> 
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

                        <div className="mb-4 my-6">
                            {/* <label htmlFor="via" className="block text-grey-darker text-sm font-bold mb-2"></label> */}
                            <select
                                name="via"
                                value={values.via}
                                onChange={handleViaChange}
                                onBlur={handleBlur}
                                className={`shadow appearance-none border rounded w-6/12 py-2 px-3 mr-2 text-grey-darker leading-tight focus:shadow-outline ${
                                    touched.via && errors.via ? "is-invalid" : ""
                                }`}
                                >
                                <option key='default' value='email'>-send via-</option>
                                <option key='email' value='email'>email</option>
                                <option key='phone' value='phone'>phone</option>
                            </select>
                            <ErrorMessage
                                component="span"
                                name="via"
                                className="text-red-500 text-xs italic"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                            type="submit"
                            className="bg-blue-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black-700 rounded"
                            disabled={isSubmitting}
                            >
                            {isSubmitting ? "Please wait..." : "Verify"}
                            </button>
                        </div>    
                    </Form>
                    )}
                </Formik>
            </div>

            <div className="flex justify-end w-full clearfix">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-auto my-24">
                    <button
                        className="bg-green-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black-700 rounded"
                        onClick={(e)=>{sendToken(authentication.sendTokenVia)}}>
                        Resend
                    </button> 
                </div>              
            </div>
        </Aux>
      );
}


const mapStateToProps = state => {
    return { authentication: state.authentication };
};

const TwoFactor = connect(mapStateToProps)(twoFactor);

export default withRouter(TwoFactor);