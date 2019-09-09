import React, {useEffect} from 'react';
import { connect } from "react-redux";
import {getCurrencies} from '../../../actions/common';
import {postCreateWallet, getWallets, removeWallet} from '../../../actions/wallet';

const Wallets = ({...props}) => { 
    const {dispatch, currencies, notification, wallets} = props;
    let currencyOptions, walletsTableData = [];
    let selectedCurrency;
    const style = {cursor: "pointer"};

    useEffect(() => {
        getCurrencies(dispatch);
        getWallets(dispatch);
    }, []);

    const handleCurrencyChange = e => {
        selectedCurrency = e.target.value;
    }

    const handleCreateWallet = () => {
        if (!selectedCurrency) {
            alert('Select a coin to create a wallet');
            return;
        }
        const confirmed = confirm(`Do you want to proceed!`);
        if (confirmed) {
            const data = {coin: selectedCurrency};
            postCreateWallet(data, dispatch);
            selectedCurrency='';
        }
    }

    const handleDeleteWallet = e => {
        const confirmed = confirm(`Do you want to remove the selected wallet!`);
        if (confirmed) {
            const walletId = e.target.getAttribute('data-coin-id');
            const coin = e.target.getAttribute('data-coin');
            removeWallet(walletId, coin, dispatch);
        }
    }

    if(Array.isArray(currencies.currencies)) {
        currencyOptions = currencies.currencies.map((c, key) => {
            return <option key={key} value={c.identifier}>{c.currency}</option>
        });
    }

    if(Array.isArray(wallets.wallets)) {
        walletsTableData = wallets.wallets.map((w, key) => {
            return <tr key={key} className="hover:bg-blue-lightest">
                <td className="py-4 px-6 border-b border-grey-light">{w.currency.currency}</td>
                <td className="py-4 px-6 border-b border-grey-light">{w.currency.identifier}</td>
                <td className="py-4 px-6 border-b border-grey-light text-center">
                    <a data-coin-id={w.wallet_id} data-coin={w.currency.identifier} onClick={handleDeleteWallet} style={style}>❌</a>
                </td>
            </tr>;
        });
    }

    const getErrors = () => {
        const { notification: { errors: { coin } = {} } = {} } = notification;
        const { notification: { message } = '' } = notification;
        return [message, coin];
    }

    return (
    <div className="flex mb-4">
        <div className="w-1/2 bg-white-400 h-auto p-4">
            <div className="inline-block relative w-full">
                <h4 className="text-red-500 text-xs italic">{getErrors()[1] || getErrors()[0]}</h4>
                <select className="block appearance-none w-1/2 float-left bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mt-4 mr-2"
                    onChange={handleCurrencyChange}>
                    <option value=''>-- All coins/tokens --</option>
                    {currencyOptions}
                </select>

                <button className="bg-blue-500 w-1/4 float-left hover:bg-blue-700 text-white font-bold py-2 px-4 pull-right mt-4 rounded"
                    onClick={handleCreateWallet}>
                    Create Wallet
                </button>

                <table className="text-left m-4">
                    <thead>
                        <tr>
                            <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Currency</th>
                            <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Identifier</th>
                            <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {walletsTableData}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="w-1/2 bg-white-500 h-64"></div>
    </div>
    );
}

const mapStateToProps = state => {
    return { 
        wallets: state.wallets,
        currencies: state.currencies,
        notification: state.notification 
    };
};

const Wallet = connect(mapStateToProps)(Wallets);

export default Wallet;