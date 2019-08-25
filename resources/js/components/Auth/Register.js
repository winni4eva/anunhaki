import React from 'react';

const register = (props) => { 
              return (
                <div className="flex justify-end w-full my-6 clearfix">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 m-auto my-24">  
                        <h3>Register</h3>     
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
                            <button 
                                className="bg-blue hover:bg-blue-dark text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                                type="button">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
              );
            }

export default register;