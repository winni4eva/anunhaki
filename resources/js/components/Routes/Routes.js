import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import TwoFactorAuth from '../TwoFactorAuth/TwoFactorAuth'

const routes = (props) => { 
    const {authentication} = props; 
    return (
        <Aux>
            <Redirect exact from="/" to="/login" />
            <Route name="login" path="/login" component={Login}/>
            <Route name="register" path="/register" component={Register}/>
            {authentication.isAuthenticated
                ? <Route path="/two-factor-auth" component={TwoFactorAuth}/>
                : null
            }
        </Aux>
    );
}

const mapStateToProps = state => {
    return { 
        authentication: state.authentication,
    };
};

const Routes = connect(mapStateToProps)(routes);

export default Routes;