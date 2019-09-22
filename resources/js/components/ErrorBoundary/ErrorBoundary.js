import React, {Component} from 'react';

class ErrorBoundary extends Component {

    state = {
        hasError: false,
        errorMessage: ''
    };

    compenentDidCatch = (err, info) => {
        this.compenentDidCatch.setState({
            hasError: true,
            errorMessage: err
        })
    }

    render() {
        if(this.state.hasError) {
            return <h1>Something Went wrong!</h1>
        } else {
            return this.props.children;
        }
        
    }
}

export default ErrorBoundary;