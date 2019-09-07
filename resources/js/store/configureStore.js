import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import walletsReducer from '../reducers/wallets';
import authenticationReducer from '../reducers/authentication';
import countriesReducer from '../reducers/countries';
import currenciesReducer from '../reducers/currencies';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import history from '../actions/history';
//import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    router: connectRouter(history),
    wallets: walletsReducer,
    authentication: authenticationReducer,
    countries: countriesReducer,
    currencies: currenciesReducer,
});

export default () => {
    const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(
                routerMiddleware(history)
            )
        )
    );
    return store;
};