import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Cockpit from './Cockpit/Cockpit';
import Main from './Main/Main';
import Routes from './Routes/Routes';
import configureStore from '../store/configureStore';
import {getCountries} from '../actions/common'
import {GET_WALLETS, LOG_IN, ACCESS_TOKEN} from '../constants/types';

const store = configureStore();

const setAuthHelper = (auth) => ({
    type: LOG_IN,
    payload: auth
});

export default class App extends PureComponent {

    constructor(){
        super();
    }
    
    componentDidMount() {
        store.dispatch(setAuthHelper(!!localStorage.getItem(ACCESS_TOKEN)));
        getCountries(store);
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
