import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cockpit from './Cockpit/Cockpit';
import Main from './Main/Main';
import Routes from './Routes/Routes';
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
        return (
                <BrowserRouter>
                    <Cockpit/>
                    <Main>
                        <Routes/>
                    </Main>
                </BrowserRouter>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
