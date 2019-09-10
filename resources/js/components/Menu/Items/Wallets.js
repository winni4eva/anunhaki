import React, {useEffect} from 'react';
import { connect } from "react-redux";
import {getCurrencies} from '../../../actions/common';
import {postCreateWallet, getWallets, removeWallet, postCreateWalletAddress} from '../../../actions/wallet';
import {SAVE_ADDRESSES} from '../../../constants/types';

const setAddressHelper = (addresses) => ({
    type: SAVE_ADDRESSES,
    payload: addresses
});

const Wallets = ({...props}) => { 
    const {dispatch, currencies, notification, wallets, addresses} = props;
    let currencyOptions, walletsTableData, addressesTableData = [];
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

    const handleAddWalletAddress = e => {
        const confirmed = confirm(`Do you want to continue to add address!`);
        if (confirmed) {
            const walletId = e.target.getAttribute('data-coin-id');
            const coin = e.target.getAttribute('data-coin');
            postCreateWalletAddress({walletId, coin}, dispatch);
        }
    }

    const handleDisplayAddresses = (e) => {
        const walletId = e.target.getAttribute('data-coin-id');
        const wallet = wallets.wallets.filter(wallet => {
            return wallet.wallet_id === walletId;
        })
        dispatch(setAddressHelper(wallet[0]['addresses']));
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
                <td className="py-4 px-6 border-b border-grey-light hover:bg-gray-200"><a data-coin-id={w.wallet_id} onClick={handleDisplayAddresses} style={style}>{w.currency.currency}</a></td>
                <td className="py-4 px-6 border-b border-grey-light">{w.currency.identifier}</td>
                <td className="py-4 px-6 border-b border-grey-light">
                    <button 
                        className="bg-gray-300 float-left w-1/2 hover:bg-white-700 text-black font-bold rounded" 
                        onClick={handleAddWalletAddress}
                        data-coin-id={w.wallet_id} 
                        data-coin={w.currency.identifier}>Add
                    </button>
                </td>
                <td className="py-4 px-6 border-b border-grey-light text-center">
                    <a data-coin-id={w.wallet_id} data-coin={w.currency.identifier} onClick={handleDeleteWallet} style={style}>❌</a>
                </td>
            </tr>;
        });
    }

    if(Array.isArray(addresses.addresses)) {
        addressesTableData = addresses.addresses.map((a, k) => {
            return <tr key={k} className="hover:bg-blue-lightest">
                <td className="py-4 px-6 border-b border-grey-light hover:bg-gray-200"><a style={style}>{a.addresss}</a></td>
                <td className="py-4 px-6 border-b border-grey-light">
                    <button 
                        className="bg-gray-300 float-left w-1/2 hover:bg-white-700 text-black font-bold rounded" 
                        data-address-id={a.id} 
                        data-wallet-id={a.wallet_id}>Send
                    </button>
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
                        
                            {Array.isArray(walletsTableData) && walletsTableData.length > 0 ?
                            <tr>
                                <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Currency</th>
                                <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Identifier</th>
                                <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Add Address</th>
                                <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Remove</th>
                            </tr>
                            : 
                                <tr>
                                <th className="text-blue-500 text-xs italic mt-24 text-center">Create your first wallet!</th>
                                </tr>
                            }
                    </thead>
                    <tbody>
                        {Array.isArray(walletsTableData) && walletsTableData.length > 0 ?
                            walletsTableData
                            : null
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <div className="w-1/2 bg-white-500 h-auto p-4">
            <div className="inline-block relative w-full">
                <table className="text-left m-4">
                    <thead>

                        <tr>
                            <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Addresses</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {Array.isArray(addressesTableData) && addressesTableData.length > 0 ?
                            addressesTableData
                            : <tr>
                                <td className="text-blue-500 text-xs italic text-center ml-12"><h3>No addresses found!</h3></td>
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
        currencies: state.currencies,
        notification: state.notification,
        addresses: state.addresses, 
    };
};

const Wallet = connect(mapStateToProps)(Wallets);

export default Wallet;