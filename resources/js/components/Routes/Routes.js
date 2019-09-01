import React from 'react';
import { Route } from 'react-router-dom';
import Aux from '../../hoc/Aux';
import Login from '../Auth/Login';
import Register from '../Auth/Register';

const routes = (props) => { 
    return (
        <Aux>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Aux>
    );
}

export default routes;