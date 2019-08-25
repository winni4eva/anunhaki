import React from 'react';

const menu = (props) => { 
              return (
                <ul className="flex">
                    <li className="flex-1 mr-2">
                        <a onClick={props.clicked} className="text-center block border border-teal-500 rounded py-2 px-4 bg-teal-500 hover:bg-teal-200 text-white" href="#">Wallets</a>
                    </li>
                    <li className="flex-1 mr-2">
                        <a onClick={props.clicked} className="text-center block border border-teal-500 rounded py-2 px-4 bg-teal-500 hover:bg-teal-200 text-white" href="#">Transactions</a>
                    </li>
                </ul>
              );
            }

export default menu;