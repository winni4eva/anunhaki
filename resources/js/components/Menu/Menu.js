import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";

const menu = ({...props}) => { 
  const {authentication} = props;

  return (
    <ul className="flex mb-4">
        <li className="flex-1 mr-2">
          <Link to={`/wallets`} className="text-center block border border-white-500 rounded py-2 px-4 bg-gray-700 hover:bg-gray-500 text-white">
              Wallets
          </Link>
        </li>
        <li className="flex-1 mr-2">
          <Link to={`/wallets`} className="text-center block border border-white-500 rounded py-2 px-4 bg-gray-700 hover:bg-gray-500 text-white">
            Transactions
          </Link>
        </li>
    </ul>
  );
}

const mapStateToProps = state => {
  return { 
      authentication: state.authentication,
  };
};

const Menu = connect(mapStateToProps)(menu);

export default Menu;