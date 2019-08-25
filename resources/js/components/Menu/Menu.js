import React from 'react';
import { Link } from 'react-router-dom';

const menu = (props) => { 
              return (
                <ul className="flex mb-4">
                    <li className="flex-1 mr-2">
                      <Link to={`/wallets`} className="text-center block border border-teal-500 rounded py-2 px-4 bg-teal-500 hover:bg-teal-200 text-white">
                          Wallets
                      </Link>
                    </li>
                    <li className="flex-1 mr-2">
                      <Link to={`/transactions`} className="text-center block border border-teal-500 rounded py-2 px-4 bg-teal-500 hover:bg-teal-200 text-white">
                        Transactions
                      </Link>
                    </li>
                </ul>
              );
            }

export default menu;