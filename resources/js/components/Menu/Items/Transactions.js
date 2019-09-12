import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import queryString from 'query-string';
import {getWalletTransactions} from '../../../actions/wallet';

const Transactions = (props) => { 
  const {location, dispatch} = props;

  useEffect(() => {
    const parsedQueryString = queryString.parse(location.search);
    getWalletTransactions(parsedQueryString.wid, dispatch);
  }, []);

  return (
    <div className="flex mb-4">
        <div className="w-1/3 bg-gray-400 h-12"></div>
        <div className="w-1/3 bg-gray-500 h-12"></div>
        <div className="w-1/3 bg-gray-400 h-12"></div>
    </div>
  );
}

const mapStateToProps = state => {
  return { 
      wallets: state.wallets,
  };
};

const transactions = connect(mapStateToProps)(Transactions);

export default transactions;