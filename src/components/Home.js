import React, { Component } from 'react';
import Header from './Header';
import CollectableListItem from './CollectableListItem';

class Home extends Component {
    state = {
        pins: [],
        pageLink: process.env.REACT_APP_API_URL + '/v1/pins'
    };

    fetchMorePins = () => {
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
            pins: [...this.state.pins, updatedPins.pin],
            pageLink: updatedPins.pageLink
        });
    };

    clearPins = () => {
        this.setState({
            pins: [],
            pageLink: null
        });
    };

    render() {
        return (
            <React.Fragment>
                <Header updatePins={this.updatePins} clearPins={this.clearPins} />
                <main className="container">
                    <div className="pin-collection">
                        {Object.keys(this.state.pins).map(key => (
                            <CollectableListItem
                                key={key}
                                uid={key}
                                collectableData={this.state.pins[key]}
                                uiType="pin-modal-toggle"
                                collectableType="pin"
                            />
                        ))}
                    </div>
                    <button className="btn-load-more" onClick={this.fetchMorePins}>
                        Load more
                    </button>
                </main>
            </React.Fragment>
        );
    }
}

export default Home;
