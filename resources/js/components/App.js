import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Cockpit from './Cockpit/Cockpit';
import Menu from './Menu/Menu';
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

    //style = {backgroundImage: "background-image: url('/img/card-left.jpg')"};

    render() {
        return (
            <Aux>
                <Cockpit/>
                <Menu
                    clicked={this.toggleMenuHandler}/> 

                <div className="flex mb-4">
                    <div className="w-full bg-white-500 h-12"></div>
                </div>
            </Aux>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
