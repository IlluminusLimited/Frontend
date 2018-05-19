import React, { Component } from 'react';
// import logo from '../logo.svg';
import Header from './Header';
import Pin from './Pin';

class Home extends Component {
    state = {
        pins: []
    };

    makeFetch = () => {
        fetch('http://api-dev.pinster.io/v1/pins')
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
        this.makeFetch();
    }

    render() {
        return (
            <React.Fragment>
                <Header updatePins={this.updatePins} />
                <main className="container">
                    <div className="pin-collection">
                        {Object.keys(this.state.pins).map(key => (
                            <Pin
                                key={key}
                                uid={key}
                                pinData={this.state.pins[key]}
                                uiType="pin-modal-toggle"
                            />
                        ))}
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

export default Home;
