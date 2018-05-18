import React, { Component } from 'react';
// import logo from '../logo.svg';
import Pin from './Pin';

class App extends Component {
    state = {
        pins: []
    };
    makeFetch() {
        fetch('http://api-dev.pinster.info/v1/pins')
            .then(
                results => {
                    return results.json();
                },
                error => {
                    console.log('error');
                    console.log(error);
                }
            )
            .then(data => {
                // Display the pins
                this.setState({
                    pins: data
                });
                console.log(data);
            });
    }
    componentDidMount() {
        this.makeFetch();
    }
    render() {
        return (
            <main className="container">
                {/* <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header> */}
                <div className="pin-collection">
                    {Object.keys(this.state.pins).map(key => (
                        <Pin key={key} pinData={this.state.pins[key]} />
                    ))}
                </div>
            </main>
        );
    }
}

export default App;
