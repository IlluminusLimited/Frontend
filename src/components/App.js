import React, { Component } from 'react';
// import logo from '../logo.svg';
import Header from './Header';
import Pin from './Pin';
import Loader from './Loader';

class Archive extends Component {
    state = {
        pins: []
    };

    makeFetch = () => {
        fetch('http://api-dev.pinster.io:3000/v1/pins')
            .then(
                results => {
                    return results.json();
                },
                error => {
                    console.log('error');
                    console.log(error);
                }
            )
            .then(response => {
                // Display the pins
                console.log(response.data);
                this.setState({
                    pins: response.data
                });
            });
    };

    updatePins = updatedPins => {
        this.setState({
            pins: updatedPins
        });
    };

    componentDidMount() {
        // this.makeFetch();
    }

    render() {
        return (
            <React.Fragment>
                <Header updatePins={this.updatePins} />
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
            </React.Fragment>
        );
    }
}

export default Archive;
