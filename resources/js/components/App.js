import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from '../actions/history';
import { Provider } from 'react-redux';
import Cockpit from './Cockpit/Cockpit';
import Main from './Main/Main';
import Routes from './Routes/Routes';
import configureStore from '../store/configureStore';
import {getCountries} from '../actions/common'
import {LOG_IN, ACCESS_TOKEN} from '../constants/types';
import {isValidString} from '../utils/validation';

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
        console.log(localStorage.getItem(ACCESS_TOKEN));
        const autheniticated = isValidString(localStorage.getItem(ACCESS_TOKEN)) && !!localStorage.getItem(ACCESS_TOKEN)
            ? true
            : false;
        if(autheniticated) {
            console.log('Yaay');
        } else {
            console.log('Naaay');
        }
        store.dispatch(setAuthHelper(autheniticated));
        getCountries(store);
    }

    render() {
        return (
            <ConnectedRouter history={history}>
                <Cockpit/>
                <Main>
                    <Routes/>
                </Main>
            </ConnectedRouter>
        );
    }
}



if (document.getElementById('app')) {
    ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
}
