import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import queryString from 'query-string';

const Transactions = (props) => { 
  const {location} = props;

  useEffect(() => {
    const parsed = queryString.parse(location.search);
    console.log(parsed)
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