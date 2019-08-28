import { createStore, combineReducers, applyMiddleware } from 'redux';
import walletsReducer from '../reducers/wallets';
import authenticationReducer from '../reducers/authentication';
//import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    wallets: walletsReducer,
    authentication: authenticationReducer,
});

export default () => {
    const store = createStore(
        rootReducer
    );

    return store;
};