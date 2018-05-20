import React, { Component } from 'react';
import Header from './Header';
import Pin from './Pin';

class Home extends Component {
    state = {
        pins: [],
        pageLink: 'http://api-dev.pinster.io/v1/pins'
    };

    fetchPins = () => {
        fetch(this.state.pageLink)
            .then(
                results => {
                    return results.json();
                },
                error => {
                    console.error(error);
                }
            )
            .then(response => {
                // Display the pins
                console.log(response.data);
                this.setState(prevState => {
                    return {
                        pins: [...prevState.pins, ...response.data],
                        pageLink: response.links.next
                    };
                });
            });
    };

    updatePins = updatedPins => {
        this.setState({
            pins: updatedPins.data,
            pageLink: updatedPins.links.self
        });
    };

    componentDidUpdate() {
        console.log(this.state);
    }

    componentDidMount() {
        this.fetchPins();
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
                    <button className="btn-load-more" onClick={this.fetchPins}>
                        Load more
                    </button>
                </main>
            </React.Fragment>
        );
    }
}

export default Home;
