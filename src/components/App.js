import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';

class App extends Component {
    makeFetch = () => {
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
                console.log(data);
            });
    };
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to
                    reload.
                </p>
                <button onClick={this.makeFetch}>Fetch</button>
            </div>
        );
    }
}

export default App;
