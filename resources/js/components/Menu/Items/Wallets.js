import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import {getCurrencies} from '../../../actions/common';
import {postCreateWallet, getWallets, postCreateWalletAddress, postSendWalletFunds} from '../../../actions/wallet';
import { withRouter } from 'react-router-dom';


const Wallets = ({...props}) => { 
    const {dispatch, currencies, wallets, history} = props;
    const [enableSendFunds, toggleSendFunds] = useState(false);
    const [enableWalletPassphrase, toggleWalletPassphrase] = useState(false);
    const [addressesTableData, toggleWalletAddresses] = useState([]);
    const [selectedSendFundWalletId, toggleSelectedFundWallet] = useState('');
    const [selectedSendFundCurrency, toggleSelectedCurrency] = useState('');
    const [selectedSendFundCoin, toggleSelectedCoin] = useState('');
    const [selectedWalletPassphrase, toggleselectedWalletPassphrase] = useState('');
    const [selectedWalletCurrency, toggleSelectedWalletCurrency] = useState('');
    const notify = (msg) => toast.info(msg);

    let currencyOptions, walletsTableData = [];
    const style = {cursor: "pointer"};

    useEffect(() => {
        getCurrencies(dispatch);
        getWallets(dispatch);
    }, []);



    const handleCurrencyChange = e => {
        const selectedCurrency = e.target.value;
        toggleSelectedWalletCurrency(selectedCurrency);
        if(selectedCurrency){
            toggleWalletPassphrase(true);
        } else {
            toggleWalletPassphrase(false);
        }
    }

    const handlePassphraseChange = e => {
        const selectedPassphrase = e.target.value;
        toggleselectedWalletPassphrase(selectedPassphrase);
    }

    const handleCreateWallet = () => {
        if (!selectedWalletCurrency) {
            alert('Select a coin to create a wallet');
            return;
        }
        
        if (!selectedWalletPassphrase) {
            alert('Enter a passphrase to create a wallet');
            return;
        }
        const confirmed = confirm(`Do you want to proceed!`);
        if (confirmed) {
            const data = {coin: selectedWalletCurrency, passphrase: selectedWalletPassphrase};
            postCreateWallet(data, dispatch);
            toggleSelectedWalletCurrency('');
            toggleselectedWalletPassphrase('');
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
        });
        const label = wallet["0"].user.last_name;
        const walletAddresses = wallet[0]['addresses'];
        const tableData = walletAddresses.map((a, k) => {
            return <tr key={k} className="hover:bg-blue-lightest">
                <td className="py-4 px-6 border-b border-grey-light hover:bg-gray-200"><a style={style}>{a.addresss}</a></td>
                <td className="py-4 px-6 border-b border-grey-light">{label}</td>
            </tr>;
        });
        toggleWalletAddresses(tableData);
    }

    const handleSendFundSubmit = e => {
        if (e) e.preventDefault();
        const {target:{children:[addressInput,  amountInput, passphraseInput]}} = e;
        const {value: address} = addressInput;
        const {value: amount} = amountInput;
        const {value: passphrase} = passphraseInput;
        const walletId = selectedSendFundWalletId; 
        const coin = selectedSendFundCoin;
        if(!address)
            return toast.error('Recepient address is required');
        if(!amount)
            return toast.error('Amount is required');
        if(!passphrase)
            return toast.error('Passphrase is required');
        
        const formData = {address, amount, walletId, coin, passphrase};
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
            case 'transactions':
                history.push(`/transactions?wid=${walletId}&coin=${coinIdentifier}`);
                break;
            default:
                break;
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
                <td className="py-4 px-6 border-b border-grey-light hover:bg-gray-200"><a data-coin-id={w.wallet_id} onClick={handleDisplayAddresses} style={style}>{w.label}</a></td>
                <td className="py-4 px-6 border-b border-grey-light">{`${w.currency.currency} - [${w.currency.identifier}]`}</td>
                <td className="py-4 px-6 border-b border-grey-light">{w.balance.balance} / {w.balance.confirmedBalance} / {w.balance.spendableBalance}</td>
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

                    {enableWalletPassphrase ?
                        <input
                            type="text"
                            placeholder="Passphrase" 
                            onChange={handlePassphraseChange}
                            className="block appearance-none w-1/2 float-left bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mt-4 mr-2"/>
                            : null}
                </div>
                
                <table className="text-left m-4">
                    
                    <thead>
                        
                            {Array.isArray(walletsTableData) && walletsTableData.length > 0 ?
                            <tr>
                                <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Label</th>
                                <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Currency</th>
                                <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Bal/CBal/SBal</th>
                                <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Action</th>
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
                            placeholder="Enter Amount (USD)" 
                            className="block appearance-none w-1/2 float-left bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline mt-4 mr-2"/>
                        
                        <input
                            type="text"
                            placeholder="Passphrase" 
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
                            <th className="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Label</th>
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