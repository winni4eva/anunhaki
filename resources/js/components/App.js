import React, { PureComponent, Component } from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from '../actions/history';
import { Provider, connect } from 'react-redux';
import Cockpit from './Cockpit/Cockpit';
import Main from './Main/Main';
import Routes from './Routes/Routes';
import configureStore from '../store/configureStore';
import {getCountries} from '../actions/common'
import {LOG_IN, ACCESS_TOKEN, SAVE_COUNTRIES} from '../constants/types';
import {isValidString} from '../utils/validation';

const store = configureStore();

const setAuthHelper = (auth) => ({
    type: LOG_IN,
    payload: auth
});

const saveCountriesHelper = (countries) => ({
    type: SAVE_COUNTRIES,
    payload: countries
});

export default class App extends Component {
    
    _isMounted;

    constructor(props){
        super(props);
        this._isMounted = false;
    }
    
    componentDidMount() {
        this._isMounted = true;
        console.log(localStorage.getItem(ACCESS_TOKEN));
        const autheniticated = isValidString(localStorage.getItem(ACCESS_TOKEN)) && !!localStorage.getItem(ACCESS_TOKEN)
            ? true
            : false;
        store.dispatch(setAuthHelper(autheniticated));

        const countries = getCountries();
        if (countries) {
            store.dispatch(saveCountriesHelper(countries));
        }
    }

    render() {
        return (
            <ConnectedRouter history={history}>
                <p>{this.props.authentication.isAuthenticated? 'Yaay' : 'Naay'}</p>
                <Cockpit/>
                <Main>
                    <Routes/>
                </Main>
            </ConnectedRouter>
        );
    }
}

const mapStateToProps = state => {
    return { 
        authentication: state.authentication,
        countries: state.countries 
    };
};

const QHCoin = connect(mapStateToProps)(App);

if (document.getElementById('app')) {
    ReactDOM.render(<Provider store={store}><QHCoin /></Provider>, document.getElementById('app'));
}
