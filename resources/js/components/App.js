import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Cockpit from './Cockpit/Cockpit';
import Main from './Main/Main';
import Routes from './Routes/Routes';
import configureStore from '../store/configureStore';
import makeRequest from '../actions/request';
import {getWalletsEndpoint} from '../actions/endpoints';
import {GET_WALLETS} from '../constants/types';

const store = configureStore();

const addWalletsHelper = (wallets) => ({
    type: GET_WALLETS,
    payload: wallets
});

export default class App extends PureComponent {

    constructor(){
        super();
    }
    
    componentDidMount() {
        this.getWallets();
    }

    getWallets() {
        makeRequest('GET', getWalletsEndpoint)
            .then(response => {
                console.log(response);
                const wallets = response.data.wallets || [];
                store.dispatch(addWalletsHelper(wallets));
            })
            .catch(error => {
                console.log(error.response);
            });
    }

    render() {
        return (
            <BrowserRouter>
                <Cockpit/>
                <Main>
                    <Routes/>
                </Main>
            </BrowserRouter>
        );
    }
}



if (document.getElementById('app')) {
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
}
