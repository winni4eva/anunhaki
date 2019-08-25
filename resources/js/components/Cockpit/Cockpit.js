import React from 'react';


const cockpit = (props) => {

    // const style = {
    //     backgroundColor: 'green',
    //     color: 'white',
    //     font: 'inherit',
    //     border: '1px solid blue',
    //     padding: '8px',
    //     cursor: 'pointer', 
    //   };

    // if(props.showPersons) {
    //     style.backgroundColor = 'red';
    // }

    // const classes = [];
    
    // if(props.persons.length === 1) {
    //   classes.push('redText');
    // }

    // if(props.persons.length > 1) {
    //   classes.push('bold');
    //   classes.push('blueText');
    // }

    return (
        <nav className="flex items-center justify-between flex-wrap bg-grey-lighter p-6 shadow-lg">
            
            <div className="flex items-center flex-no-shrink text-grey-darkest mr-6">
                <router-link to="/articles" className="no-underline text-blue">
                    <span className="font-semibold text-xl tracking-tight hover:text-red-900">QHCoin</span>
                </router-link>
            </div>
            
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white">
                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
    
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                </div>
                <div>
                    <router-link to="/register">
                        <a className="block mt-4 lg:inline-block lg:mt-0 text-grey-darkest hover:text-red-900 mr-4">
                            WALLETS
                        </a>
                    </router-link>
                    <router-link to="/register">
                        <a className="block mt-4 lg:inline-block lg:mt-0 text-grey-darkest hover:text-red-900 mr-4">
                            SIGNUP
                        </a>
                    </router-link>
                    <router-link to="/register">
                        <a className="block mt-4 lg:inline-block lg:mt-0 text-grey-darkest hover:text-red-900 mr-4">
                            LOGIN
                        </a>
                    </router-link>
                </div>
            </div>
        </nav>
    )
}

export default cockpit;