import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import TwoFactorAuth from '../TwoFactorAuth/TwoFactorAuth'

const routes = (props) => { 
    const {authentication} = props; 
    return (
        <Aux>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            {authentication.jwtToken
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