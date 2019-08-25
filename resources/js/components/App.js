import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Cockpit from './Cockpit/Cockpit';
import Wallets from './Wallets/Wallet';
import Aux from '../hoc/Aux';

export default class App extends PureComponent {
    render() {
        return (
            <Aux>
                <Cockpit/>
                <Wallets/>
            </Aux>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
