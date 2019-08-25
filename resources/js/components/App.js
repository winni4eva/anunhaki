import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Cockpit from './Cockpit/Cockpit';
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

    //style = {backgroundImage: "background-image: url('/img/card-left.jpg')"};

    render() {
        let menu;
        if (!this.state.menu || this.state.menu === 'wallets') {
            menu = <Wallets wallets={this.state.wallets} walletSelected={this.walletSelectHandler}/>;
        } else if (this.state.menu === 'transactions') {
            menu = <Transactions/>;
        }
        return (
            <Aux>
                <Cockpit/>
                <Menu
                    clicked={this.toggleMenuHandler}/> 
                {menu}
            </Aux>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
