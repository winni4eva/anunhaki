import React from 'react';
import { connect } from "react-redux";

const login = (props) => { 
              return (
                <div className="flex justify-end w-full my-6 clearfix">
                    <form onSubmit={onLoginSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-auto my-24">  
                        <h3>SignIn</h3>     
                        <span className="block sm:inline text-red-dark my-2" v-if="this.error && this.error.message">
                        </span>
                        <div className="mb-4 my-6">
                            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input 
                                v-model="login.email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
                                id="email" 
                                type="email" 
                                placeholder="chloe@gmail.com"/>
                            <p 
                                className="text-red-dark text-xs italic" 
                                v-if="this.error && this.error.errors && this.error.errors.email && Array.isArray(this.error.errors.email)">
                            </p>
                        </div>
                        
                        <div className="mb-6">
                            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input 
                                v-model="login.password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                                id="password" 
                                type="password" 
                                placeholder="***"/>
                            <p 
                                className="text-red-dark text-xs italic" 
                                v-if="this.error && this.error.errors && this.error.errors.password && Array.isArray(this.error.errors.password)">
                            </p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                        <button type={"submit"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                            Sign In
                        </button>
                        </div>
                    </form>
                </div>
              );
            }

    const onLoginSubmit = (e) => {
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
            // const data = {
            //     grant_type: "password",
            //     client_id: "2",
            //     client_secret: window.Laravel.client_secret,
            //     username: email,
            //     password: password,
            //     scope: "*"
            // };
            // axios.post(loginAPI, data)
            //     .then((response) => {
            //         window.localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
            //         window.localStorage.setItem(REFRESH_TOKEN, response.data.refresh_token);
            //         this.props.dispatch(loginUser());
            //         this.loadCartService();
            //     })
            //     .catch((error) => (
            //         this.setState(() => ({
            //             invalidCredentials: true,
            //             isLoading: false
            //         }))
            //     ));
        //}
    };

const mapStateToProps = state => {
    return { authentication: state.authentication };
};

const Login = connect(mapStateToProps)(login);

export default Login;