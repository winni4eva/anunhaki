import React from 'react';

const register = (props) => { 
              return (
                <div className="flex justify-end w-full max-w-md my-6 clearfix">
                  <h2>Admin SignUp</h2>
                  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                      <div className="mb-4">
                          <label className="block text-grey-darker text-sm font-bold mb-2" for="username">
                              Email
                          </label>
                          <input 
                              v-model="register.email"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" 
                              id="username" 
                              type="text" 
                              placeholder="chloe@gmail.com"/>
                      </div>
                      
                      <div className="mb-6">
                          <label className="block text-grey-darker text-sm font-bold mb-2" for="password">
                              Password
                          </label>
                          <input 
                              v-model="register.password"
                              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                              id="password" 
                              type="password" 
                              placeholder="***"
                              required/>
                      </div>
                      
                      <div className="flex items-center justify-between">
                          <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                              Sign Up
                          </button>
                      </div>
                  </form>
              </div>
              );
            }

export default register;