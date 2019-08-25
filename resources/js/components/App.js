import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Cockpit from './Cockpit/Cockpit';

export default class App extends PureComponent {
    render() {
        return (
            <Cockpit/>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
