import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import queryString from 'query-string';
import {getWalletTransactions} from '../../../actions/wallet';

const Transactions = ({...props}) => { 
  const {location, dispatch, tx} = props;
  const style = {cursor: "pointer"};
  useEffect(() => {
    const {wid, coin} = queryString.parse(location.search);
    getWalletTransactions(wid, coin, dispatch);
  }, []);

  return (
    <div className="flex mb-4">
        <div className="w-full bg-white-500 h-auto p-4">
          <div className="inline-block relative w-full">
                <table className="text-left m-4">
                    <thead>
                        <tr>
                            <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Date</th>
                            <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">ID</th>
                            <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Confirmations</th>
                            <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Address</th>
                            <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Amount</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {Array.isArray(tx.tx) ?
                            tx.tx.map((tran, k) => {
                              return <tr key={k} className="hover:bg-blue-lightest">
                              <td className="py-4 px-6 border-b border-grey-light hover:bg-gray-200"><a style={style}>{tran.date}</a></td>
                              <td className="py-4 px-6 border-b border-grey-light">{tran.id.substring(0,12)} ...</td>
                              <td className="py-4 px-6 border-b border-grey-light">{tran.confirmations}</td>
                              <td className="py-4 px-6 border-b border-grey-light">{tran.address}</td>
                              <td className="py-4 px-6 border-b border-grey-light">{tran.value}</td>
                          </tr>;
                            })
                            : <tr>
                                <td className="text-blue-500 text-xs italic text-center ml-12"><h3>Fetching transactions found for selected wallet!</h3></td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div> 
        </div>
    </div>
  );
}

const mapStateToProps = state => {
  return { 
      wallets: state.wallets,
      tx: state.transactions,
  };
};

const transactions = connect(mapStateToProps)(Transactions);

export default transactions;