import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import walletsReducer from '../reducers/wallets';
import authenticationReducer from '../reducers/authentication';
import countriesReducer from '../reducers/countries';
import currenciesReducer from '../reducers/currencies';
import addressesReducer from '../reducers/addresses';
import notificationReducer from '../reducers/notification';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import history from '../actions/history';

const rootReducer = combineReducers({
    router: connectRouter(history),
    wallets: walletsReducer,
    authentication: authenticationReducer,
    countries: countriesReducer,
    currencies: currenciesReducer,
    addresses: addressesReducer,
    notification: notificationReducer,
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