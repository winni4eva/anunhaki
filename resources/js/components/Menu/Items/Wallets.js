import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import {getCurrencies} from '../../../actions/common';
import {postCreateWallet, getWallets, postCreateWalletAddress, postSendWalletFunds} from '../../../actions/wallet';
import { Link, withRouter } from 'react-router-dom';


const Wallets = ({...props}) => { 
    const {dispatch, currencies, notification, wallets} = props;
    const [enableSendFunds, toggleSendFunds] = useState(false);
    const [addressesTableData, toggleWalletAddresses] = useState([]);
    const [selectedSendFundWalletId, toggleSelectedFundWallet] = useState('');
    const [selectedSendFundCurrency, toggleSelectedCurrency] = useState('');
    const [selectedSendFundCoin, toggleSelectedCoin] = useState('');
    const notify = (msg) => toast.info(msg);

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

    const handleAddWalletAddress = (coinId, coinIdentifier, coinCurrency) => {
        const confirmed = confirm(`Do you want to add an address to the ${coinCurrency} wallet!`);
        if (confirmed) {
            postCreateWalletAddress({coinId, coinIdentifier}, dispatch);
            return;
        }
        notify('Wallet action cancelled successfully');
    }

    const handleDisplayAddresses = (e) => {
        const walletId = e.target.getAttribute('data-coin-id');
        const wallet = wallets.wallets.filter(wallet => {
            return wallet.wallet_id === walletId;
        })
        
        const walletAddresses = wallet[0]['addresses'];
        const tableData = walletAddresses.map((a, k) => {
            return <tr key={k} className="hover:bg-blue-lightest">
                <td className="py-4 px-6 border-b border-grey-light hover:bg-gray-200"><a style={style}>{a.addresss}</a></td>
                <td className="py-4 px-6 border-b border-grey-light">0.00</td>
            </tr>;
        });
        toggleWalletAddresses(tableData);
    }

    // const handleSendFundSelect = (e) => {
    //     const walletId = e.target.getAttribute('data-coin-id');
    //     const currency = e.target.getAttribute('data-coin-currency');
    //     const coin = e.target.getAttribute('data-coin');
    //     toggleSelectedFundWallet(walletId);
    //     toggleSelectedCurrency(currency);
    //     toggleSelectedCoin(coin);
    // }

    const handleSendFundSubmit = e => {
        if (e) e.preventDefault();
        const {target:{children:[recepientAddressInput, senderAddressInput,  amountInput]}} = e;
        const {value: recAddress} = recepientAddressInput;
        const {value: sendAddress} = senderAddressInput
        const {value: amount} = amountInput
        const walletId = selectedSendFundWalletId; 
        const coin = selectedSendFundCoin;
        if(!recAddress)
            return toast.error('Recepient address is required');
        if(!sendAddress)
            return toast.error('Senders address is required');
        if(!amount)
            return toast.error('Amount is required');
        
        const formData = {recAddress, sendAddress, amount, walletId, coin};
        postSendWalletFunds(formData, dispatch);
    }

    const handleWalletAction = e => {
        const coinId = e.target.getAttribute('data-coin-id');
        const coinIdentifier = e.target.getAttribute('data-coin');
        const walletId = e.target.getAttribute('data-wallet-id');
        const coinCurrency = e.target.getAttribute('data-coin-currency');

        const selectedAction = e.target.value;
        switch (selectedAction) {
            case 'add_address':
                handleAddWalletAddress(coinId, coinIdentifier, coinCurrency);
                break;
            case 'send_funds':
                toggleSelectedFundWallet(coinId);
                toggleSelectedCurrency(coinCurrency);
                toggleSelectedCoin(coinIdentifier);
                toggleSendFunds(true);
                break;
            case 'value':
                
                    break;
            default:
                break;
        }
    }

    // const handleDeleteWallet = e => {
    //     const confirmed = confirm(`Do you want to remove the selected wallet!`);
    //     if (confirmed) {
    //         const walletId = e.target.getAttribute('data-coin-id');
    //         const coin = e.target.getAttribute('data-coin');
    //         removeWallet(walletId, coin, dispatch);
    //     }
    // }

    if(Array.isArray(currencies.currencies)) {
        currencyOptions = currencies.currencies.map((c, key) => {
            return <option key={key} value={c.identifier}>{c.currency}</option>
        });
    }

    if(Array.isArray(wallets.wallets)) {
        walletsTableData = wallets.wallets.map((w, key) => {
            return <tr key={key} className="hover:bg-blue-lightest">
                <td className="py-4 px-6 border-b border-grey-light hover:bg-gray-200"><a data-coin-id={w.wallet_id} onClick={handleDisplayAddresses} style={style}>{w.label}</a></td>
                <td className="py-4 px-6 border-b border-grey-light">{`${w.currency.currency} - [${w.currency.identifier}]`}</td>
                <td className="py-4 px-9 border-b border-grey-light">
                    <select
                        data-coin-id={w.wallet_id} 
                        data-coin={w.currency.identifier}
                        data-coin-currency={w.currency.currency}
                        data-wallet-id={w.id}
                        className="block appearance-none w-full float-left bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        onChange={handleWalletAction}>
                        <option value=''>- pick -</option>
                        <option value='add_address'>add address</option>
                        <option value='send_funds'>send funds</option>
                        <option value='transactions'>view transactions</option>
                    </select>
                </td>
                {/* 
                <td className="py-4 px-6 border-b border-grey-light">
                    <button 
                        className="bg-gray-300 float-left w-1/2 hover:bg-white-700 text-black font-bold rounded"
                        onClick={(e) => {toggleSendFunds(true);handleSendFundSelect(e)}}
                        data-coin-currency={w.currency.currency} 
                        data-coin-id={w.wallet_id} 
                        data-coin={w.currency.identifier}>Send
                    </button>
                </td>
                <td>
                <Link to={`/transactions?wid=${w.id}`} className="block mt-4 lg:inline-block lg:mt-0 text-grey-darkest hover:text-red-900 mr-4 cursor-pointer">
                    <span className="font-semibold text-xl tracking-tight hover:text-red-900 cursor-pointer">history</span>
                </Link>
                </td> */}
                {/* <td className="py-4 px-6 border-b border-grey-light text-center">
                    <a data-coin-id={w.wallet_id} data-coin={w.currency.identifier} onClick={handleDeleteWallet} style={style}>❌</a>
                </td> */}
            </tr>;
        });
    }

    return (
    <div className="flex mb-4">
        <div className="w-1/2 bg-white-400 h-auto p-4">
            <div className="inline-block relative w-full">
                <div>
                    <select className="block appearance-none w-1/2 float-left bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mt-4 mr-2"
                        onChange={handleCurrencyChange}>
                        <option value=''>-- All coins/tokens --</option>
                        {currencyOptions}
                    </select>

                    <button className="bg-blue-500 w-1/4 float-left hover:bg-blue-700 text-white font-bold py-2 px-4 pull-right mt-4 rounded"
                        onClick={handleCreateWallet}>
                        Create Wallet
                    </button>
                </div>
                
                <table className="text-left m-4">
                    
                    <thead>
                        
                            {Array.isArray(walletsTableData) && walletsTableData.length > 0 ?
                            <tr>
                                <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Label</th>
                                <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Currency</th>
                                <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Action</th>
                                {/* <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Add Address</th>
                                <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Send Funds</th>
                                <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Transactions</th> */}
                                {/* <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Remove</th> */}
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
                {enableSendFunds ?
                <div>
                    <p>Send funds from {selectedSendFundCurrency} wallet</p>
                    <form onSubmit={handleSendFundSubmit}>
                        <input
                            type="text"
                            placeholder="Enter Recepient's Address" 
                            className="block appearance-none w-full float-left bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mt-4 mr-2"/>
                        <input
                            type="text"
                            placeholder={`Enter ${selectedSendFundCurrency} Address`} 
                            className="block appearance-none w-full float-left bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mt-4 mr-2"/>

                        <input
                            type="text"
                            placeholder="Enter Amount" 
                            className="block appearance-none w-1/2 float-left bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mt-4 mr-2"/>

                        <button className="bg-green-500 w-1/4 float-left hover:bg-green-300 text-white font-bold py-2 px-4 pull-right mt-4 rounded"
                            >
                            Send
                        </button>
                    </form>
                </div>
                : null}
                <table className="text-left m-4">
                    <thead>
                        <tr>
                            <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Addresses</th>
                            <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Balance</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {Array.isArray(addressesTableData) && addressesTableData.length > 0 ?
                            addressesTableData
                            : <tr>
                                <td className="text-blue-500 text-xs italic text-center ml-12"><h3>No addresses found for selected wallet!</h3></td>
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
    };
};

const Wallet = connect(mapStateToProps)(Wallets);

export default withRouter(Wallet);