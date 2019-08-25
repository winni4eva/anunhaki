import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cockpit from './Cockpit/Cockpit';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Main from './Main/Main';
import Menu from './Menu/Menu';
import Wallets from './Menu/Items/Wallets';
import Transactions from './Menu/Items/Transactions';
import Aux from '../hoc/Aux';

export default class App extends PureComponent {
    state = {
        wallets: [
          {id: 'gsadqwu', name: 'BTC'},
          {id: 'sajhdsa', name: 'LTC'},
          {id: 'ahshkhasd', name: 'BCH'},
        ],
        menu: 'wallets'
    };

    toggleMenuHandler = (event) => {
        event.preventDefault();
        this.setState({menu: event.target.textContent.toLowerCase()});
    }

    walletSelectHandler = (event) => {
        event.preventDefault();
        console.log(event.target.value);
    }

    render() {
        let menu;
        if (!this.state.menu || this.state.menu === 'wallets') {
            menu = <Wallets wallets={this.state.wallets} walletSelected={this.walletSelectHandler}/>;
        } else if (this.state.menu === 'transactions') {
            menu = <Transactions/>;
        }
        return (
                <BrowserRouter>
                    <Cockpit/>
                    <Main>
                        <Route path="/" render={() =>(
                            <Menu
                            clicked={this.toggleMenuHandler}/>
                        )}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/wallets" component={Wallets}/>
                        <Route path="/transactions" component={Transactions}/>
                    </Main>
                </BrowserRouter>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
