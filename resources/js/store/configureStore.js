import { createStore, combineReducers, applyMiddleware } from 'redux';
import walletsReducer from '../reducers/wallets';
import authenticationReducer from '../reducers/authentication';
import countriesReducer from '../reducers/countries';
//import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    wallets: walletsReducer,
    authentication: authenticationReducer,
    countries: countriesReducer,
});

export default () => {
    const store = createStore(
        rootReducer
    );
    return store;
};