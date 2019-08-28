import React from 'react';
import { connect } from 'react-redux';
import axios from '../../actions/request';
import {loginEndpoint} from '../../actions/endpoints';

const login = ({props}) => { 
              return (
                <div className="flex justify-end w-full my-9 clearfix">
                    <form onSubmit={onLoginSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-auto my-24">  
                        <h3>SignIn</h3>     
                        <span className="block sm:inline text-red-dark my-2">
                        <span className="block sm:inline text-red-dark my-2">
                            Adam
                        </span>
                        </span>
                        <div className="mb-4 my-6">
                            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
                                id="email" 
                                name="email"
                                type="email" 
                                placeholder="chloe@gmail.com"
                                onChange={handleEmailChange}/>
                            <p 
                                className="text-red-dark text-xs italic">
                            </p>
                        </div>
                        
                        <div className="mb-6">
                            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input 
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                id="password" 
                                name="password"
                                type="password" 
                                placeholder="****"
                                onChange={handlePasswordChange}/>
                            <p className="text-red-dark text-xs italic">
                            </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                        <button type={"submit"} id="login-submit-button" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-black-700 rounded">
                            Sign In
                        </button>
                        </div>
                    </form>
                </div>
              );
            }
    let errors = undefined;
    
    const handleEmailChange = e => {
        const email = e.target.value;
        const btn = document.querySelector('#login-submit-button');
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const validEmail = emailRegex.test(String(email).toLowerCase());

        if (!validEmail || email.length === 0 || email.length < 4) {
            if (elementContainsClass(btn, 'bg-blue-500') || elementContainsClass(btn, 'hover:bg-blue-700')) {
                btn.classList.remove('bg-blue-500', 'hover:bg-blue-700');
            }
            btn.classList.add('bg-gray-500', 'hover:bg-gray-700');
            btn.disabled = true;
            return;
        }

        if (elementContainsClass(btn, 'bg-gray-500') || elementContainsClass(btn, 'hover:bg-gray-700')) {
            btn.classList.remove('bg-gray-500', 'hover:bg-gray-700');
        }
        
        btn.disabled = false;
        btn.classList.add('bg-blue-500', 'hover:bg-blue-700');
        return;
    }

    const elementContainsClass = (e, cssClass) => {
        return e.classList.contains(cssClass);
    }

    const handlePasswordChange = e => {
        console.log(e.target.value);
        const password = e.target.value;
    }

    const onLoginSubmit = e => {
        e.preventDefault();
        console.log(e);
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email);
        console.log(password);
        // if(password.length === 0){
        //     this.setState(() => ({passwordHelp: "Password cannot be empty"}));
        // }else{
        //     this.setState(() => ({passwordHelp: undefined}));
        // }

        // if(email.length === 0){
        //     this.setState(() => ({usernameHelp: "Username cannot be empty"}));
        // }else{
        //     this.setState(() => ({usernameHelp: undefined}));
        // }

        //if(email.length > 0 && password.length > 0){
            //this.setState(() => ({isLoading: true}));
            const data = {email, password};

            axios.post(loginEndpoint, data)
                .then(response => {
                    console.log(response)
                    // window.localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
                    // window.localStorage.setItem(REFRESH_TOKEN, response.data.refresh_token);
                    //this.props.dispatch(loginUser());
                    //this.loadCartService();
                })
                .catch(error => {
                    console.log(error.response.data);
                    errors = error.response.data;
                    // this.setState(() => ({
                    //     invalidCredentials: true,
                    //     isLoading: false
                    // }))
                });
        //}
    };

const mapStateToProps = state => {
    return { authentication: state.authentication };
};

const Login = connect(mapStateToProps)(login);

export default Login;