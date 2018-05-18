import React, {Component} from 'react';
// import logo from '../logo.svg';
import Pin from './Pin';

class App extends Component {
    state = {
        pins: []
    };

    makeFetch() {
        fetch('http://localhost:3000/v1/pins')
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
                    {
                        Object.keys(this.state.pins).map(key => (
                            <Pin key={key} pinData={this.state.pins[key]}/>
                        ))
                    }
                </div>
            </main>
        );
    }
}

export default App;
