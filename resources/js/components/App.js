import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from '../actions/history';
import { Provider, connect } from 'react-redux';
import Cockpit from './Cockpit/Cockpit';
import Main from './Main/Main';
import Routes from './Routes/Routes';
import AuthRoutes from './Routes/AuthRoutes';
import configureStore from '../store/configureStore';
import {getCountries} from '../actions/common';
import {LOG_IN, ACCESS_TOKEN, SAVE_COUNTRIES} from '../constants/types';
import {isValidString} from '../utils/validation';

const store = configureStore();

const setAuthHelper = (auth) => ({
    type: LOG_IN,
    payload: auth
});

export default class App extends PureComponent {

    constructor(props){
        super(props);
    }
    
    componentDidMount() {
        const autheniticated = isValidString(localStorage.getItem(ACCESS_TOKEN)) && !!localStorage.getItem(ACCESS_TOKEN)
            ? true
            : false;
        store.dispatch(setAuthHelper(autheniticated));

        getCountries(store);
    }

    render() {
        return (
            <ConnectedRouter history={history}>
                <span>{
                    !this.props.authentication.isAuthenticated
                        ? <Redirect to='/login'/>
                        : null
                }</span>
                <p>{this.props.authentication.isAuthenticated? 'Yaay' : 'Naay'}</p>
                <Cockpit/>
                <Routes/>
                {this.props.authentication.isAuthenticated
                    ?    <Main>
                            <AuthRoutes/>
                        </Main>
                    : null
                }
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
