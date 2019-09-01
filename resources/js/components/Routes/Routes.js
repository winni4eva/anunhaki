import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Aux from '../../hoc/Aux';
import Menu from '../Menu/Menu';
import Wallets from '../Menu/Items/Wallets';
import Transactions from '../Menu/Items/Transactions';
import Login from '../Auth/Login';
import Register from '../Auth/Register';

const routes = (props) => { 
    return (
        <Aux>
            <Route path={`/(wallets|transactions|)`} component={Menu}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/wallets" component={Wallets}/>
            <Route path="/transactions" component={Transactions}/>
        </Aux>
    );
}

export default routes;