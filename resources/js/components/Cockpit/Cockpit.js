import React from 'react';
import { Link } from 'react-router-dom';


const cockpit = (props) => {

    return (
        <nav className="flex items-center justify-between flex-wrap bg-grey-lighter p-6 shadow-lg mb-6">
            
            <div className="flex items-center flex-no-shrink text-grey-darkest mr-6">
                <Link to={`/`} className="block mt-4 lg:inline-block lg:mt-0 text-grey-darkest hover:text-red-900 mr-4 cursor-pointer">
                    <span className="font-semibold text-xl tracking-tight hover:text-red-900 cursor-pointer">QHCoin</span>
                </Link>
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
                    <Link to={`/register`} className="block mt-4 lg:inline-block lg:mt-0 text-grey-darkest hover:text-red-900 mr-4 cursor-pointer">
                        REGISTER
                    </Link>
                    <Link to={`/login`} className="block mt-4 lg:inline-block lg:mt-0 text-grey-darkest hover:text-red-900 mr-4 cursor-pointer">
                        LOGIN
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default cockpit;